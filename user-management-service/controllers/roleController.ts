import { Request, Response } from 'express';
import {RoleService} from "../services/role.service";



const roleService = new RoleService();

export const syncRoles = async (_req: Request, res: Response) => {
    await roleService.syncRoles();
    res.status(200).send('Roles synchronized successfully');
};
