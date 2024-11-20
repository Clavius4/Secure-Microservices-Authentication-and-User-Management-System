import {AppDataSource} from "../config/database";
import UserRole from "../models/Role";


const roleRepository = AppDataSource.getRepository(UserRole);

export class RoleService {
    async syncRoles() {
        const roles = ['Admin', 'User', 'Moderator']; // Example roles
        const existingRoles = await roleRepository.find();

        const newRoles = roles.filter(
            (role) => !existingRoles.find((existing) => existing.name === role)
        );

        for (const role of newRoles) {
            const newRole = roleRepository.create({ name: role });
            await roleRepository.save(newRole);
        }
    }
}
