import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    application: "TrevoOne API",
    version: "1.0.0",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`
==========================================
🚀 TrevoOne API iniciada com sucesso!
==========================================
URL: http://localhost:${PORT}
Status: ONLINE
==========================================
`);
});
