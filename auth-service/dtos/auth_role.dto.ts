// auth_role.dto.ts

// DTO for creating a new role
export class CreateRoleDto {
    name: string;
    permissions: string[]; // List of permissions associated with the role
}

// DTO for updating role details
export class UpdateRoleDto {
    name?: string; // Optional for updating the name
    permissions?: string[]; // Optional for updating permissions
}

// Response DTO for role details
export class RoleResponseDto {
    id: string | undefined;
    name: string | undefined;
    permissions: string[] | undefined;

    constructor(role: Partial<RoleResponseDto>) {
        this.id = role.id;
        this.name = role.name;
        this.permissions = role.permissions;
    }
}
