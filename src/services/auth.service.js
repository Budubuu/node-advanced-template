import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repositories/auth.repository.js';
import {
  HASH_SALT_ROUNDS,
  ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  signUp = async (email, password, name) => {
    const existedUser = await this.authRepository.findUserByEmail(email);

    if (existedUser) {
      throw new Error('EMAIL_DUPLICATED');
    }

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
    return this.authRepository.createUser(email, hashedPassword, name);
  };

  signIn = async (email, password) => {
    const user = await this.authRepository.findUserByEmail(email);
    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      throw new Error('UNAUTHORIZED');
    }

    const payload = { id: user.id };
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
  };
}
