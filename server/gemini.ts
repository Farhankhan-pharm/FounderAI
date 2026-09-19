/**
 * Google Gemini API Client Wrapper
 * Implements GoogleGenAI SDK with server-side User-Agent telemetry,
 * automatic retry with exponential backoff, and transparent model fallback.
 */

import { GoogleGenAI } from '@google/genai';

let geminiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

export const GEMINI_MODELS = {
  FLASH: 'gemini-3.8-flash',
  FLASH_LITE: 'gemini-3.1-flash-lite',
  FLASH_LATEST: 'gemini-flash-latest',
  PRO: 'gemini-3.1-pro-preview',
};

export interface SafeGenerateContentParams {
  contents: any;
  config?: any;
  model?: string;
  maxRetries?: number;
}

/**
 * Executes a Gemini generateContent call with automated retries and multi-model fallback.
 * Prevents 503 (UNAVAILABLE) and 429 (RESOURCE_EXHAUSTED) from halting execution.
 */
export async function safeGenerateContent(params: SafeGenerateContentParams): Promise<{ text: string | undefined } | null> {
  const ai = getGeminiClient();
  if (!ai) {
    return null;
  }

  const requestedModel = params.model || GEMINI_MODELS.FLASH;
  // Ordered fallback models to try if the primary encounters high demand (503/429)
  const candidateModels = Array.from(new Set([
    requestedModel,
    GEMINI_MODELS.FLASH_LITE,
    GEMINI_MODELS.FLASH_LATEST,
    GEMINI_MODELS.FLASH,
  ]));

  const maxRetries = params.maxRetries ?? 2;

  for (const modelName of candidateModels) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: params.contents,
          config: params.config,
        });

        if (response && response.text !== undefined) {
          return response;
        }
      } catch (err: any) {
        const errMsg = err?.message || String(err);
        const isTransient =
          errMsg.includes('503') ||
          errMsg.includes('UNAVAILABLE') ||
          errMsg.includes('high demand') ||
          errMsg.includes('429') ||
          errMsg.includes('RESOURCE_EXHAUSTED') ||
          errMsg.includes('ECONNRESET');

        if (isTransient) {
          const isOverloaded =
            errMsg.includes('503') ||
            errMsg.includes('UNAVAILABLE') ||
            errMsg.includes('high demand');

          const modelMaxAttempts = isOverloaded ? 1 : maxRetries;
          if (attempt < modelMaxAttempts) {
            const delay = 400 * Math.pow(2, attempt);
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue; // retry once
          } else {
            // Immediately fail over to next model in candidateModels
            break;
          }
        } else {
          // Non-transient error (e.g. format or token limit)
          console.warn(`[Gemini] Call to ${modelName} failed with non-transient error: ${errMsg.slice(0, 120)}`);
          break; // break to next model or return
        }
      }
    }
  }

  return null;
}
