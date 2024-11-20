import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from "./config/database";
import routes from "./routes/routes";
import redisPublisher from './redis/redis.client.pub'; // Import Redis Publisher

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', routes);
app.use('/roles', routes);

// Initialize Redis and Database, then Start Server
const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        // Initialize Redis Publisher
        await redisPublisher.connect();
        console.log("Redis Publisher connected");

        // Initialize Database
        await AppDataSource.initialize();
        console.log("Database connected");

        // Start the Express Server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error("Error during initialization", err);
        process.exit(1); // Exit if any critical initialization fails
    }
};

// Start the server
startServer();

export default app;
