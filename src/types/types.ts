export interface IUser {
  id: string;
  email: string;
  role: Role;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export const ROLES_KEY = 'roles';
