// services/AuthUserService.ts
import { AuthUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {UserRepository} from "../repositories/auth.user.repo";

export class AuthUserService {
    // Registration method
    async register(userData: Partial<AuthUser>): Promise<AuthUser> {
        const user = await UserRepository.create(userData);
        await UserRepository.save(user);
        return user;
    }

    // Login method, expecting email and password as parameters
    async login(email: string, password: string): Promise<string | null> {
        const user = await UserRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }
        return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
    }
}
