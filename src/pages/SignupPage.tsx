import React from 'react';
import { AuthForm } from '.../components/Login/AuthForm';
import type { AuthFormData } from '../types/auth';
import { useAuthStore } from '../store/authStore';
// import { signup } from '../utils/api';

export const SignupPage: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { setUser } = useAuthStore();

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (data: AuthFormData) => {
    // API 호출 부분 주석 처리 
    setUser({ email: data.email });
    console.log('회원가입 시도:', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm title="회원가입" isSignup onSubmit={handleSubmit} onSwitch={onSwitch} />
    </div>
  );
};