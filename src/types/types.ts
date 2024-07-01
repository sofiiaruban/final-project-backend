export interface IUser {
  id: string;
  email: string;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}
