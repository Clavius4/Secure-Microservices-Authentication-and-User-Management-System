// database.ts
import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import {UserProfile} from "../models/User";
import UserRole from "../models/Role";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [UserProfile, UserRole],
});
