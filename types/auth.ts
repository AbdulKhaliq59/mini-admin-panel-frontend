// User types matching backend UserDto
export interface User {
  id: string;
  email: string;
  fullName: string;
  picture?: string;
}

// Auth state types
export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  status: AuthStatus;
}

// API response types
export interface AuthResponse {
  accessToken: string;
  user: User;
}

// JWT payload (matches backend)
export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
