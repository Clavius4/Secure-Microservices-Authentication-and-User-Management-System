// controllers/auth.controller.ts
import { Request, Response } from 'express';
import {AuthServiceImpl} from "../servicesImpl/authServiceImpl";
import {CreateUserDto, LoginUserDto} from "../dtos/auth_user.dto";
import {redisPublisher} from "../config/redis";


const authService = new AuthServiceImpl();

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const userDto: CreateUserDto = req.body;
            const user = await authService.register(userDto);

            // Publish a message to user-management about the new user
            await redisPublisher.publish('user.created', JSON.stringify(user));

            res.status(201).json(user);
        } catch (error) {
            // @ts-ignore
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const loginDto: LoginUserDto = req.body;
            const { user, token } = await authService.login(loginDto);
            res.status(200).json({ user, token });
        } catch (error) {
            // @ts-ignore
            res.status(401).json({ message: error.message });
        }
    }
}
