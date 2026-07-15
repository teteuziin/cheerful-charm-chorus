import { pool } from "../config/database.js";

export interface UserRecord {
  id: number;
  uuid: string;
  organization_id: number;
  first_name: string;
  last_name: string | null;
  full_name: string;
  username: string;
  email: string;
 password_hash: string;
  status: string;
}

export class UserRepository {
  async findByLogin(login: string): Promise<UserRecord | null> {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM users
      WHERE (username = ? OR email = ?)
        AND status = 'active'
      LIMIT 1
      `,
      [login, login]
    );

    const users = rows as UserRecord[];

    return users.length > 0 ? users[0] : null;
  }

  async updateLastLogin(id: number): Promise<void> {
    await pool.query(
      `
      UPDATE users
      SET last_login_at = NOW()
      WHERE id = ?
      `,
      [id]
    );
  }
}