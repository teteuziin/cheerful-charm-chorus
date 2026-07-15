import { Request, Response } from "express";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const result = await this.authService.login({
        username,
        password,
      });

      res.status(200).json(result);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro interno do servidor.";

      res.status(401).json({
        success: false,
        message,
      });
    }
  }
}