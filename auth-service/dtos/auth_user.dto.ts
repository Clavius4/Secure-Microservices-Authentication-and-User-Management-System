// auth_user.dto.ts
import { RoleUser } from '../models/User';

// DTO for user registration
export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: RoleUser; // Optional, defaults to 'user' in User entity
}

// DTO for user login
export class LoginUserDto {
    email: string;
    password: string;
}

// DTO for updating user details
export class UpdateUserDto {
    name?: string; // Optional
    photo?: string; // Optional
}

// Response DTO for excluding sensitive fields like password and verificationCode
export class UserResponseDto {
    id: string | undefined;
    name: string | undefined;
    email: string | undefined;
    role: RoleUser | undefined;
    photo: string | undefined;
    verified: boolean | undefined;

    constructor(user: Partial<UserResponseDto>) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.photo = user.photo;
        this.verified = user.verified;
    }
}
