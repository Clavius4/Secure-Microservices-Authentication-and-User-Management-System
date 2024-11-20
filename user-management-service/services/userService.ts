import { AppDataSource } from "../config/database";
import { UserProfile } from "../models/User";
import redisPublisher from "../redis/redis.client.pub";

const userRepository = AppDataSource.getRepository(UserProfile);

export class UserService {
    async createUser(data: Partial<UserProfile>) {
        const user = userRepository.create(data);
        // Publish event
        await redisPublisher.publish("user_created", JSON.stringify(user));
        return await userRepository.save(user);
    }

    async getUserById(id: string) {
        const user = await userRepository.findOne({
            where: { id },
            relations: ["roles"], // This will now load the related UserRole entities
        });

        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }

        return user;
    }

    async updateUser(id: string, updates: Partial<UserProfile>) {
        const existingUser = await this.getUserById(id);

        if (!existingUser) {
            throw new Error(`User with ID ${id} not found`);
        }

        await userRepository.update(id, updates);
        return await this.getUserById(id);
    }

    async softDeleteUser(id: string) {
        const existingUser = await this.getUserById(id);

        if (!existingUser) {
            throw new Error(`User with ID ${id} not found`);
        }

        await userRepository.softDelete(id);
    }
}
