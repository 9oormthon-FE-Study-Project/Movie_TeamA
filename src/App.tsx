import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { useAuthStore } from './store/authStore';
import { Button } from './components/common/Button';

// 최상위 컴포넌트: 인증 상태에 따라 화면 전환
const App: React.FC = () => {
  // 현재 페이지 상태: 로그인 또는 회원가입
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login');
  // Zustand에서 인증 상태 가져오기
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isAuthenticated ? (
        // 인증된 경우 환영 메시지와 로그아웃 버튼 표시
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">환영, {user?.email}님!</h2>
          <Button onClick={logout}>로그아웃</Button>
        </div>
      ) : currentPage === 'login' ? (
        // 로그인 페이지 렌더링
        <LoginPage onSwitch={() => setCurrentPage('signup')} />
      ) : (
        // 로그인 페이지에서 회원가입 페이지로 전환
        <SignupPage onSwitch={() => setCurrentPage('login')} />
      )}
    </div>
  );
};

export default App;