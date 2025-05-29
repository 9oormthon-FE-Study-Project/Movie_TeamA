import React from 'react';
import { AuthForm } from '../components/AuthForm';
import type { AuthFormData } from '../types/auth';
import { useAuthStore } from '../store/authStore';
// import { login } from '../utils/api';

export const LoginPage: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { setUser } = useAuthStore();

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (data: AuthFormData) => {
    // API 호출
    // 임시로 상태만 업데이트 (API 연결 전 테스트용)
    setUser({ email: data.email });
    console.log('로그인 시도:', data);
  };

  return <AuthForm title="로그인" onSubmit={handleSubmit} onSwitch={onSwitch} />;
};