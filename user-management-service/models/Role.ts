import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from './Base_entity';

@Entity('roles')
export default class UserRole extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name!: string;
}
