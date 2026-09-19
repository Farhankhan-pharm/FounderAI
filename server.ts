/**
 * Express Server with Full API Layer and Vite Middleware
 * Implements all endpoints specified in the Founder Intelligence Architecture.
 */

import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { db, featureFlags } from './server/db';
import { StartupAnalysisOrchestrator } from './server/agents/orchestrator';
import { consultFounderMentor } from './server/agents/founderMentorAgent';
import { discoverStartupOpportunities } from './server/agents/opportunityDiscoveryAgent';
import { exportAnalysisToMarkdown, exportSourcesToCSV } from './server/export';
import { researchManager } from './server/research/provider';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // ==========================================
  // API ROUTES
  // ==========================================

  // 1. Health & Configuration
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Founder Intelligence Platform AI Research Engine',
      timestamp: new Date().toISOString(),
      activeSearchProvider: researchManager.getActiveProvider().name,
    });
  });

  app.get('/api/config', (req: Request, res: Response) => {
    const hasGeminiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY';
    const hasSearchKey = !!process.env.SEARCH_API_KEY;

    res.json({
      featureFlags,
      hasGeminiKey,
      hasSearchKey,
      activeSearchProvider: researchManager.getActiveProvider().name,
    });
  });

  // 2. Projects CRUD
  app.get('/api/projects', (req: Request, res: Response) => {
    const projects = db.listProjects();
    res.json(projects);
  });

  app.post('/api/projects', (req: Request, res: Response) => {
    const project = db.createProject(req.body);
    res.status(201).json(project);
  });

  app.get('/api/projects/:id', (req: Request, res: Response) => {
    const project = db.getProject(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    const latestAnalysis = db.getLatestAnalysis(project.id);
    res.json({
      project,
      latestAnalysis,
      sourcesCount: db.getSources(project.id).length,
      experimentsCount: db.getExperiments(project.id).length,
    });
  });

  app.put('/api/projects/:id', (req: Request, res: Response) => {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(updated);
  });

  app.delete('/api/projects/:id', (req: Request, res: Response) => {
    const success = db.deleteProject(req.params.id);
    res.json({ success });
  });

  // 3. Analysis Orchestration & Job Status (Sections 28, 29)
  app.post('/api/projects/:id/analyze', (req: Request, res: Response) => {
    const project = db.getProject(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    // Launch asynchronous job
    const jobId = StartupAnalysisOrchestrator.startAnalysisJob(project.id);
    res.status(202).json({
      jobId,
      status: 'QUEUED',
      message: 'Research pipeline initiated. Poll /api/projects/:id/jobs/:jobId for updates.',
    });
  });

  app.get('/api/projects/:id/jobs/:jobId', (req: Request, res: Response) => {
    const job = db.getJob(req.params.jobId);
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.json(job);
  });

  app.get('/api/projects/:id/analysis', (req: Request, res: Response) => {
    const analysis = db.getLatestAnalysis(req.params.id);
    if (!analysis) {
      res.status(404).json({ error: 'No analysis found for this project' });
      return;
    }
    res.json(analysis);
  });

  // 4. Research Sources & Evidence Exploration
  app.get('/api/projects/:id/sources', (req: Request, res: Response) => {
    const sources = db.getSources(req.params.id);
    res.json(sources);
  });

  app.get('/api/projects/:id/evidence', (req: Request, res: Response) => {
    const latestAnalysis = db.getLatestAnalysis(req.params.id);
    if (!latestAnalysis) {
      res.json([]);
      return;
    }
    const evidence = db.getEvidence(latestAnalysis.id);
    res.json(evidence.length > 0 ? evidence : latestAnalysis.evidence);
  });

  // 5. Ad-Hoc Research Trigger
  app.post('/api/projects/:id/research', async (req: Request, res: Response) => {
    const { query } = req.body;
    if (!query) {
      res.status(400).json({ error: 'Search query is required' });
      return;
    }

    try {
      const results = await researchManager.searchAcrossProviders(query, { maxResults: 5 });
      res.json({ query, results });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Search execution failed' });
    }
  });

  // 6. AI Founder Mentor Chat (Sections 30, 31)
  app.get('/api/projects/:id/chat', (req: Request, res: Response) => {
    const messages = db.getChatMessages(req.params.id);
    res.json(messages);
  });

  app.post('/api/projects/:id/chat', async (req: Request, res: Response) => {
    const { content } = req.body;
    const project = db.getProject(req.params.id);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    if (!content || typeof content !== 'string') {
      res.status(400).json({ error: 'Message content is required' });
      return;
    }

    // Record user message
    const userMsg = db.addChatMessage(project.id, {
      projectId: project.id,
      role: 'user',
      content,
    });

    const history = db.getChatMessages(project.id);
    const latestAnalysis = db.getLatestAnalysis(project.id);

    try {
      const mentorResult = await consultFounderMentor(project, latestAnalysis, history, content);

      const assistantMsg = db.addChatMessage(project.id, {
        projectId: project.id,
        role: 'assistant',
        content: mentorResult.content,
        references: mentorResult.references,
      });

      res.json({
        userMessage: userMsg,
        reply: assistantMsg,
      });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Mentor consultation failed' });
    }
  });

  // 7. Opportunity Discovery Engine (Sections 32, 33)
  app.post('/api/opportunities/discover', async (req: Request, res: Response) => {
    try {
      const opportunities = await discoverStartupOpportunities(req.body);
      res.json(opportunities);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Opportunity discovery failed' });
    }
  });

  // 8. Validation Experiments
  app.get('/api/projects/:id/experiments', (req: Request, res: Response) => {
    const experiments = db.getExperiments(req.params.id);
    res.json(experiments);
  });

  app.post('/api/experiments', (req: Request, res: Response) => {
    const { projectId, hypothesis, method, targetParticipants, successCriteria, failureCriteria, priority, status } = req.body;
    if (!projectId || !hypothesis) {
      res.status(400).json({ error: 'projectId and hypothesis are required' });
      return;
    }

    const experiment = db.saveExperiment(projectId, {
      id: req.body.id || `exp_${Date.now()}`,
      projectId,
      hypothesis,
      method: method || 'CUSTOMER_INTERVIEWS',
      targetParticipants: targetParticipants || 10,
      successCriteria: successCriteria || [],
      failureCriteria: failureCriteria || [],
      estimatedTime: req.body.estimatedTime || '14 days',
      priority: priority || 'HIGH',
      status: status || 'PROPOSED',
    });

    res.status(201).json(experiment);
  });

  // 9. Export System (Section 40)
  app.get('/api/projects/:id/export/:format', (req: Request, res: Response) => {
    const project = db.getProject(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    const analysis = db.getLatestAnalysis(project.id);
    if (!analysis) {
      res.status(400).json({ error: 'No analysis report available to export. Run an analysis first.' });
      return;
    }

    const { format } = req.params;
    if (format === 'markdown' || format === 'md') {
      const md = exportAnalysisToMarkdown(project, analysis);
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${project.name.toLowerCase().replace(/\s+/g, '_')}_analysis.md"`);
      res.send(md);
      return;
    }

    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${project.name.toLowerCase().replace(/\s+/g, '_')}_report.json"`);
      res.json({ project, analysis });
      return;
    }

    if (format === 'csv') {
      const csv = exportSourcesToCSV(analysis.researchSources);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${project.name.toLowerCase().replace(/\s+/g, '_')}_sources.csv"`);
      res.send(csv);
      return;
    }

    res.status(400).json({ error: 'Supported export formats: markdown, json, csv' });
  });

  // ==========================================
  // VITE MIDDLEWARE (Development vs Production)
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FounderAI Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[FounderAI Server] Startup Error:', err);
  process.exit(1);
});
