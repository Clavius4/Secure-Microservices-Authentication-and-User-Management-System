// repositories/UserRepository.ts
import { AppDataSource } from '../config/database';
import { AuthUser } from '../models/User';

export const UserRepository = AppDataSource.getRepository(AuthUser);
