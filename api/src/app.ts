import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";

const app = express();

// Segurança
app.use(helmet());

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body Parser
app.use(express.json());

// Rotas da API
app.use(routes);

// Rota principal
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    application: "TrevoOne API",
    version: "1.0.0",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

export default app;