import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { chatRouter } from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT || 3001;

// 🛡️ Helmet
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// 🛡️ CORS — allow all origins in dev, restrict in prod
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Request-ID'],
  credentials: true,
  maxAge: 86400,
}));

// Handle preflight
app.options('*', cors());

// Rate Limiting
const chatLimiter = rateLimit({
  windowMs: 60_000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições. Tente novamente em 1 minuto.' },
});

app.use(express.json({ limit: '5kb' }));

// Routes
app.use('/api/chat', chatLimiter, chatRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV !== 'production' ? err.message : 'Erro interno.',
  });
});

app.listen(PORT, () => {
  console.log(`\n🛡️  Visual AI Server — Port ${PORT}`);
  console.log(`   Azure: ${process.env.AZURE_OPENAI_ENDPOINT ? '✅' : '⚠️  Not configured'}\n`);
});

export default app;
