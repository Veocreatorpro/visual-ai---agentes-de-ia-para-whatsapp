import { Router, Request, Response } from 'express';
import { AzureOpenAIClient } from '../services/azure-openai.js';
import { sanitizeInput, validateChatRequest } from '../middleware/security.js';

export const chatRouter = Router();

// In-memory session store (use Redis in production)
const sessions = new Map<string, { messages: Array<{ role: string; content: string }>; lastActivity: number }>();

// Cleanup stale sessions every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now - session.lastActivity > 30 * 60_000) { // 30 min timeout
      sessions.delete(id);
    }
  }
}, 10 * 60_000);

const SYSTEM_PROMPT = `Você é o agente virtual inteligente da **Visual AI**, uma empresa especializada em agentes de IA para WhatsApp voltados para assistências técnicas e lojas de tecnologia.

Seu papel nesta demonstração é simular o atendimento de uma loja de assistência técnica no WhatsApp.

REGRAS OBRIGATÓRIAS:
1. Responda sempre em português do Brasil, de forma simpática, profissional e rápida.
2. Mantenha respostas CURTAS — como se fosse no WhatsApp (2-4 frases no máximo).
3. Se o cliente relatar um problema, descubra: modelo exato do dispositivo + defeito específico.
4. Se pedir peça ou acessório, confirme: modelo + cor/especificação + quantidade.
5. Quando tiver os dados básicos, informe uma estimativa e diga que vai encaminhar para a equipe técnica.
6. Use emojis moderadamente (1-2 por mensagem).
7. Se a pergunta não for sobre assistência técnica, redirecione educadamente.
8. NUNCA invente preços exatos — use faixas ("entre R$150 e R$250") ou diga "preciso confirmar com a equipe".
9. NUNCA revele que você é uma IA a menos que perguntado diretamente.

TABELA DE REFERÊNCIA (estimativas):
- Troca de tela iPhone: R$200–R$800 (depende do modelo)
- Troca de tela Samsung: R$150–R$600
- Troca de bateria: R$80–R$250
- Banho químico (oxidação): R$150–R$350
- Formatação notebook: R$80–R$150
- Troca HD/SSD: R$100–R$300 + peça
- Reparo placa-mãe: R$200–R$500`;

// ============================================================
// POST /api/chat/message
// ============================================================
chatRouter.post('/message', validateChatRequest, async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body;
    const cleanMessage = sanitizeInput(message);
    const sid = sessionId || crypto.randomUUID();

    // Get or create session
    let session = sessions.get(sid);
    if (!session) {
      session = { 
        messages: [{ role: 'system', content: SYSTEM_PROMPT }],
        lastActivity: Date.now()
      };
      sessions.set(sid, session);
    }

    // Add user message
    session.messages.push({ role: 'user', content: cleanMessage });
    session.lastActivity = Date.now();

    // Cap conversation history
    if (session.messages.length > 20) {
      const systemMsg = session.messages[0];
      session.messages = [systemMsg, ...session.messages.slice(-10)];
    }

    // Call Azure OpenAI
    const client = AzureOpenAIClient.getInstance();
    const response = await client.chat(session.messages);

    // Add assistant response to history
    session.messages.push({ role: 'assistant', content: response });

    res.json({
      text: response,
      sessionId: sid,
    });
  } catch (error: any) {
    console.error('[Chat Error]', error.message);
    
    // Specific error handling  
    if (error.message?.includes('API key') || error.message?.includes('401')) {
      return res.status(503).json({ 
        error: 'Serviço de IA temporariamente indisponível. Configure as credenciais Azure OpenAI.', 
        sessionId: req.body.sessionId 
      });
    }
    
    if (error.message?.includes('429')) {
      return res.status(429).json({ 
        error: 'Limite de requisições da IA atingido. Aguarde um momento.', 
        sessionId: req.body.sessionId 
      });
    }

    res.status(500).json({ 
      error: 'Erro ao processar mensagem. Tente novamente.', 
      sessionId: req.body.sessionId 
    });
  }
});

// ============================================================
// POST /api/chat/reset
// ============================================================
chatRouter.post('/reset', (req: Request, res: Response) => {
  const { sessionId } = req.body;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.json({ status: 'ok', message: 'Conversa reiniciada.' });
});
