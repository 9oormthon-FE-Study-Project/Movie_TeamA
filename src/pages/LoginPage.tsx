import React, { useState } from 'react';
import { AuthForm } from '../components/Login/AuthForm';
import type { AuthFormData } from '../types/auth';
import { useAuthStore } from '../store/authStore';
// import { login } from '../utils/api';

export const LoginPage: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { setUser } = useAuthStore();
  const [error, setError] = useState<string>('');

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (data: AuthFormData) => {
    try {
      // TODO: 실제 API 연동 시 아래 주석을 해제하고 구현
      // const response = await login(data);
      // setUser(response.user);
      
      // 임시 로그인 처리
      setUser({ email: data.email });
      setError('');
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <AuthForm title="로그인" onSubmit={handleSubmit} onSwitch={onSwitch} />
    </div>
  );
};