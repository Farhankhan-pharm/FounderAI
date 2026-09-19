import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  Tag,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { ChatMessage, StartupProject, StartupAnalysis } from '../../types';

interface FounderMentorTabProps {
  project: StartupProject;
  analysis?: StartupAnalysis;
}

export const FounderMentorTab: React.FC<FounderMentorTabProps> = ({ project, analysis }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch initial chat history
    fetch(`/api/projects/${project.id}/chat`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        }
      })
      .catch((err) => console.error('Failed to load chat history:', err));
  }, [project.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    setInput('');
    setIsLoading(true);

    // Optimistic user message
    const tempUserMsg: ChatMessage = {
      id: `temp_${Date.now()}`,
      projectId: project.id,
      role: 'user',
      content: textToSend,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const res = await fetch(`/api/projects/${project.id}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: textToSend }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev.filter((m) => m.id !== tempUserMsg.id), data.userMessage, data.reply]);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'What is the single riskiest assumption in my model?',
    'Should I charge $25/mo or $50/mo based on competitor data?',
    'How should I design my first 14-day concierge pilot?',
    'Are these unit economics realistic with a $60 CAC?',
  ];

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-xs flex flex-col h-[700px] overflow-hidden">
      {/* Mentor Header */}
      <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 tracking-tight">
              AI Founder Mentor (Evidence-Backed Advisor)
            </h3>
            <p className="text-xs text-zinc-700">
              Challenges assumptions • References your data • Recommends validation experiments
            </p>
          </div>
        </div>

        <div className="text-right text-[11px] text-zinc-700 hidden sm:block">
          <span className="font-semibold text-zinc-800">Grounding Context: </span>
          <span>{project.name} ({analysis ? `Score ${analysis.overallScore}/100` : 'Context Ready'})</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-zinc-50/50">
        {messages.length === 0 && (
          <div className="text-center py-10 max-w-md mx-auto">
            <Bot className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-zinc-900">
              Consult Your Startup Intelligence Advisor
            </h4>
            <p className="text-xs text-zinc-700 mt-1 mb-6">
              I will not flatter your idea or give generic SaaS advice. I will challenge your assumptions,
              audit unit economics, and help design validation experiments based on real data.
            </p>

            <div className="space-y-2 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                Suggested questions:
              </span>
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full p-2.5 bg-white hover:bg-zinc-100/80 rounded-lg border border-zinc-200 text-xs text-left text-zinc-800 font-medium transition-colors flex items-center justify-between"
                >
                  <span>"{prompt}"</span>
                  <Sparkles className="w-3 h-3 text-zinc-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-md bg-zinc-900 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-xl p-3.5 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-zinc-900 text-white shadow-2xs'
                  : 'bg-white border border-zinc-200 text-zinc-900 shadow-2xs'
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>

              {/* Reference Badges */}
              {msg.references && msg.references.length > 0 && (
                <div className="mt-3 pt-2 border-t border-zinc-100 flex flex-wrap gap-1.5">
                  {msg.references.map((ref, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-sm bg-zinc-100 text-zinc-800 border border-zinc-200 text-[10px] font-semibold flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-zinc-600" />
                      <span>{ref.label}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-md bg-zinc-200 flex items-center justify-center text-zinc-700 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-md bg-zinc-900 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 text-xs text-zinc-700 shadow-2xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-zinc-600" />
              <span>Analyzing evidence & formulating advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips Bar */}
      {messages.length > 0 && (
        <div className="px-4 py-2 bg-white border-t border-zinc-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase text-zinc-700 shrink-0">
            Quick prompts:
          </span>
          {samplePrompts.slice(0, 2).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] text-zinc-800 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/80 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-zinc-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about pricing, competitors, or experiments for ${project.name}...`}
            className="flex-1 bg-zinc-50 border border-zinc-300 text-zinc-900 text-xs rounded-lg px-3.5 py-2.5 focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
