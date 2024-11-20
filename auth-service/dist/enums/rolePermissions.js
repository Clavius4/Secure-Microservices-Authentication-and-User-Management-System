"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = void 0;
const Roles_1 = require("./Roles");
const Permissions_1 = require("./Permissions");
exports.RolePermissions = {
    [Roles_1.Roles.ADMIN]: [
        Permissions_1.Permissions.CREATE_USER,
        Permissions_1.Permissions.DELETE_USER,
        Permissions_1.Permissions.MANAGE_ROLE,
        Permissions_1.Permissions.ASSIGN_ROLE,
    ],
    [Roles_1.Roles.USER]: [
        Permissions_1.Permissions.READ_USER,
        Permissions_1.Permissions.UPDATE_USER
    ],
};
