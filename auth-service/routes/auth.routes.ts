// routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from "../controllers/authUserController";
import { RoleController } from "../controllers/authRoleController";
import { RoleUser } from "../models/User";
import {authenticate, authorize} from "../middlewares/auth";

const router = Router();

// User Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Role Routes (Admin Access Only)
router.post('/role', authenticate, authorize([RoleUser.ADMIN]), RoleController.createRole);
router.put('/role/:id', authenticate, authorize([RoleUser.ADMIN]), RoleController.updateRole);

export default router;
