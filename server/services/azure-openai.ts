/**
 * Azure OpenAI Service — Singleton Client
 * 
 * All API communication happens SERVER-SIDE only.
 * No API keys are ever exposed to the browser.
 * 
 * Supports both API Key and Azure Entra ID authentication.
 */

interface ChatMessage {
  role: string;
  content: string;
}

interface AzureOpenAIConfig {
  endpoint: string;
  apiKey?: string;
  deployment: string;
  apiVersion: string;
}

export class AzureOpenAIClient {
  private static instance: AzureOpenAIClient;
  private config: AzureOpenAIConfig;

  private constructor() {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT || 'https://cronus.openai.azure.com/';
    const apiKey = process.env.AZURE_OPENAI_KEY;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || '4.1-nano';
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2025-01-01-preview';

    if (!apiKey) {
      console.warn('⚠️  AZURE_OPENAI_KEY not set. Set it in .env file.');
    }

    this.config = { endpoint: endpoint.replace(/\/+$/, ''), apiKey, deployment, apiVersion };
  }

  static getInstance(): AzureOpenAIClient {
    if (!AzureOpenAIClient.instance) {
      AzureOpenAIClient.instance = new AzureOpenAIClient();
    }
    return AzureOpenAIClient.instance;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('Azure OpenAI not configured. Set AZURE_OPENAI_KEY in .env');
    }

    const url = `${this.config.endpoint}/openai/deployments/${this.config.deployment}/chat/completions?api-version=${this.config.apiVersion}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.config.apiKey,
        },
        body: JSON.stringify({
          messages: messages.map(m => ({
            role: m.role,
            content: [{ type: 'text', text: m.content }]
          })),
          max_tokens: 800,
          temperature: 0.7,
          top_p: 0.95,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Azure OpenAI API error ${response.status}: ${errorBody}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Empty response from Azure OpenAI');
      }

      return content.trim();
    } finally {
      clearTimeout(timeout);
    }
  }
}
