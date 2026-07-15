import mysql from "mysql2/promise";
import env from "./env";

export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  charset: "utf8mb4",
});

export async function testDatabaseConnection(): Promise<void> {
  try {
    const connection = await pool.getConnection();

    await connection.ping();

    console.log("✅ MySQL conectado com sucesso.");

    connection.release();
  } catch (error) {
    console.error("❌ Erro ao conectar ao MySQL.");
    console.error(error);

    process.exit(1);
  }
}
