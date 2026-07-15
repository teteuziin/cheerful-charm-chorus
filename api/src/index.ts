import dotenv from "dotenv";
import app from "./app.js";
import { testDatabaseConnection } from "./config/database.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 3001;

async function startServer() {
  try {
    await testDatabaseConnection();

    app.listen(PORT, () => {
      console.log(`
==========================================
🚀 TrevoOne API iniciada com sucesso!
==========================================
URL: http://localhost:${PORT}
Status: ONLINE
Banco: CONECTADO
==========================================
`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar a API.");
    console.error(error);
    process.exit(1);
  }
}

startServer();