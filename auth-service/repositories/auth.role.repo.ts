// repositories/RoleRepository.ts
import { AppDataSource } from '../config/database';
import { AuthRole } from '../models/Role';

export const RoleRepository = AppDataSource.getRepository(AuthRole);
