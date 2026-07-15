import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../config/env.js";
import { UserRepository } from "../repositories/UserRepository.js";

export interface LoginDTO {
  username: string;
  password: string;
}

export class AuthService {
  private userRepository = new UserRepository();

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByLogin(data.username);

    if (!user) {
      throw new Error("Usuário ou senha inválidos.");
    }

    const passwordValid = await bcrypt.compare(
      data.password,
      user.password_hash
    );

    if (!passwordValid) {
      throw new Error("Usuário ou senha inválidos.");
    }

    await this.userRepository.updateLastLogin(user.id);

    const expiresIn = 7 * 24 * 60 * 60; // 7 dias em segundos

    const token = jwt.sign(
      {
        id: user.id,
        uuid: user.uuid,
        organizationId: user.organization_id,
        username: user.username,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn,
      }
    );

    return {
      token,
      refreshToken: null,
      expiresAt: Date.now() + expiresIn * 1000,
      user: {
        id: String(user.id),
        uuid: user.uuid,
        name: user.full_name,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        email: user.email,
        role: "student",
        companyId: String(user.organization_id),
        avatarUrl: null,
      },
    };
  }
}