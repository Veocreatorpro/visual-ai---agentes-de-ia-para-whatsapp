import { Request, Response, NextFunction } from 'express';

/**
 * 🛡️ Input Sanitization
 * Strips dangerous characters and limits message length
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, 500)                           // max 500 chars
    .replace(/<[^>]*>/g, '')                  // strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // strip control chars
    .replace(/javascript:/gi, '')             // strip JS protocol
    .replace(/on\w+=/gi, '')                  // strip event handlers
    .trim();
}

/**
 * 🛡️ Request Validation Middleware
 * Validates chat request body structure and content
 */
export function validateChatRequest(req: Request, res: Response, next: NextFunction) {
  const { message, sessionId } = req.body;

  // Validate message exists and is string
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensagem é obrigatória.' });
  }

  // Validate message length
  if (message.trim().length === 0) {
    return res.status(400).json({ error: 'Mensagem não pode ser vazia.' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: 'Mensagem muito longa (máx: 1000 caracteres).' });
  }

  // Validate sessionId format if provided
  if (sessionId && typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'SessionId inválido.' });
  }

  if (sessionId && sessionId.length > 50) {
    return res.status(400).json({ error: 'SessionId inválido.' });
  }

  // Detect injection patterns
  const suspiciousPatterns = [
    /ignore\s+(previous|all|above)\s+instructions/i,
    /you\s+are\s+now/i,
    /system\s*:\s*/i,
    /\{\{.*\}\}/,           // template injection
    /\$\{.*\}/,             // template literal injection
  ];

  const cleanedMessage = message.trim();
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(cleanedMessage)) {
      console.warn(`[SECURITY] Suspicious input blocked: "${cleanedMessage.slice(0, 100)}"`);
      return res.status(400).json({ error: 'Conteúdo não permitido.' });
    }
  }

  next();
}
