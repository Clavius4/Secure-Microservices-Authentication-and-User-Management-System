// database.ts
import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";
import { AuthUser } from "../models/User";
import { AuthRole } from "../models/Role";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [AuthUser, AuthRole],
});

// Initialize the DataSource
AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((error) => console.error("Database connection error", error));
