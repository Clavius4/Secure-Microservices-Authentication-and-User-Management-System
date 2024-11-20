import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/database';
import { AuthController } from './controllers/authUserController';
import {initRedisSubscriber, shutdownRedisSubscriber} from "./redis/redis.client.sub";

dotenv.config();

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Basic routing for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Auth Service!');
});

// Auth routes
app.post('/register', AuthController.register);
app.post('/login', AuthController.login);

// Initialize Redis Subscriber
const initializeServices = async () => {
    try {
        // Connect to Redis Subscriber
        console.log('Initializing Redis Subscriber...');
        initRedisSubscriber();
        console.log('Redis Subscriber initialized.');
    } catch (error) {
        console.error('Error initializing Redis Subscriber:', error);
        process.exit(1);
    }

    try {
        // Initialize TypeORM connection
        console.log('Connecting to database...');
        await AppDataSource.initialize();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Error during database connection:', error);
        process.exit(1);
    }
};

// Start the server
const startServer = async () => {
    // await initializeServices();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await AppDataSource.destroy(); // Close database connection
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await AppDataSource.destroy(); // Close database connection
    await shutdownRedisSubscriber(); // Disconnect Redis subscriber
    process.exit(0);
});


startServer();
