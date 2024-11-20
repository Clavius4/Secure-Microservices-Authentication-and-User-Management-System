import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Base from "./Base_entity";

export enum RoleUser {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('auth_users')
export class AuthUser extends Base {
    @Column()
    name: string;

    @Index('email_index')
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: RoleUser,
        default: RoleUser.USER,
    })
    role: RoleUser;

    @Column({
        default: 'default.png',
    })
    photo: string;

    @Column({
        default: false,
    })
    verified: boolean;

    @Index('verificationCode_index')
    @Column({
        type: 'text',
        nullable: true,
    })
    verificationCode!: string | null;

    // Hash password before saving the user entity
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    static async comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }

    static createVerificationCode() {
        const verificationCode = crypto.randomBytes(32).toString('hex');
        const hashedVerificationCode = crypto
            .createHash('sha256')
            .update(verificationCode)
            .digest('hex');

        return { verificationCode, hashedVerificationCode };
    }

    // Exclude sensitive fields when serializing
    toJSON() {
        const { password, verificationCode, ...rest } = this;
        return rest;
    }
}
