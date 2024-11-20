// services/auth.serviceImpl.ts
import bcrypt from 'bcryptjs';
import { CreateUserDto, LoginUserDto } from '../dtos/auth_user.dto';
import { AppDataSource } from '../config/database';
import { AuthUserService } from "../services/auth.user.service";
import { AuthUser } from "../models/User";
import { generateToken } from "../utils/jwt";
import { CreateRoleDto, UpdateRoleDto } from "../dtos/auth_role.dto";

export class AuthServiceImpl implements AuthUserService {
    private userRepository = AppDataSource.getRepository(AuthUser); // Use AppDataSource.getRepository

    async register(userDto: CreateUserDto): Promise<AuthUser> {
        const { name, email, password, role } = userDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) throw new Error('User already exists');

        const user = this.userRepository.create({
            name,
            email,
            password, // Pass raw password
            role,
        });
        return await this.userRepository.save(user); // @BeforeInsert will hash the password
    }


    // @ts-ignore
    async login(loginDto: LoginUserDto): Promise<{ user: AuthUser; token: string }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        console.log('Stored hashed password:', user.password);
        console.log('Entered password:', password);

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('Incorrect password');
        }

        const token = generateToken({ userId: user.id, role: user.role });
        return { user, token };
    }



    async createRole(roleDto: CreateRoleDto) {
        // Role creation logic here
    }

    async updateRole(id: string, roleDto: UpdateRoleDto) {
        // Role updating logic here
    }
}
