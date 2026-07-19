export const roles = [
  "owner",
  "administrator",
  "archivist",
  "cataloger",
  "volunteer",
  "reviewer",
  "read_only_researcher"
] as const;

export type Role = (typeof roles)[number];

export const permissions = {
  "records:read": roles,
  "records:create": ["owner", "administrator", "archivist", "cataloger"],
  "records:review": ["owner", "administrator", "archivist", "reviewer"],
  "records:publish": ["owner", "administrator", "archivist"],
  "records:delete": ["owner", "administrator"],
  "media:upload": ["owner", "administrator", "archivist", "cataloger"],
  "media:approve_derivatives": ["owner", "administrator", "archivist", "reviewer"],
  "submissions:review": ["owner", "administrator", "archivist", "reviewer"],
  "system:admin": ["owner", "administrator"]
} as const satisfies Record<string, readonly Role[]>;

export type Permission = keyof typeof permissions;

export function hasPermission(role: Role, permission: Permission) {
  return (permissions[permission] as readonly Role[]).includes(role);
}

export function roleFromHeader(value: string | null): Role {
  if (value && roles.includes(value as Role)) return value as Role;
  return "read_only_researcher";
}
