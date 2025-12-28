export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  role: UserRole | 'admin' | 'user';
  status: UserStatus | 'active' | 'inactive';
  emailHash?: string;
  signature?: string;
  createdAt: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
}

export interface CreateUserRequest {
  email: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
}

export interface UpdateUserRequest {
  fullName?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UserStats {
  date: string;
  count: number;
}
