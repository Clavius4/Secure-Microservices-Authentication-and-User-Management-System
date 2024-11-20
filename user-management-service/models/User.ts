import {Entity, Column, Index, BeforeInsert, OneToMany, JoinTable, ManyToMany} from 'typeorm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import BaseEntity from './Base_entity';
import UserBase from "./Base_entity";
import UserRole from "./Role";



export enum RoleUser {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class UserProfile extends BaseEntity {

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @ManyToMany(() => UserRole)
    @JoinTable()
    roles!: UserRole[];
}
