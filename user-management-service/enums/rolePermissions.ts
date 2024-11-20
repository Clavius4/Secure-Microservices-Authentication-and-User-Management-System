import { Roles } from "./Roles";
import { Permissions } from "./Permissions";

export const RolePermissions = {
    [Roles.ADMIN]: [
        Permissions.CREATE_USER,
        Permissions.DELETE_USER,
        Permissions.MANAGE_ROLE,
        Permissions.ASSIGN_ROLE,
    ],
    [Roles.USER]: [
        Permissions.READ_USER,
        Permissions.UPDATE_USER
    ],
}
