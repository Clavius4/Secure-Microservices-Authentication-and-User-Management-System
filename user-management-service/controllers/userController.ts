import { Request, Response } from 'express';
import {UserService} from "../services/userService";
import {publishMessage} from "../redis/redis.client.pub";



const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
    const { name, email, roles } = req.body;
    const user = await userService.createUser({ name, email, roles });
    res.status(201).json(user);
};

export const readUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const user = await userService.updateUser(id, updates);
    let roles;
    await publishMessage('role.updated', {
        userId: id,
        roles,
    });
    res.status(200).json(user);
};

export const softDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await userService.softDeleteUser(id);
    res.status(204).send();
};
