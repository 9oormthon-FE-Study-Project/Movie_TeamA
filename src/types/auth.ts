export interface AuthFormData {
  email: string;
  password: string;
  nickname?: string;
  birthDate?: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  user: {
    email: string;
  };
  token?: string;
}
