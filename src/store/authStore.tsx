import { create } from 'zustand';

// 사용자 인증 상태를 관리하는 Zustand 스토어
interface AuthState {
  user: { email: string } | null;
  isAuthenticated: boolean;
  setUser: (user: { email: string } | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));