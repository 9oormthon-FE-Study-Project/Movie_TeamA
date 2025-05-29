import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { useAuthStore } from './store/authStore';
import { Button } from './components/common/Button';

// 최상위 컴포넌트: 인증 상태에 따라 화면 전환
const App: React.FC = () => {
  // 현재 페이지 상태: 로그인 또는 회원가입
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('signup');
  // Zustand에서 인증 상태 가져오기
  const { user, isAuthenticated } = useAuthStore();

  console.log(import.meta.env.VITE_API_KEY);


  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-black p-8 rounded-lg shadow-md min-h-screen text-center">
            <h2 className="text-2xl font-bold mb-4">환영합니다, {user?.email}님!</h2>
            <div className="space-y-4">
              <Button onClick={() => setCurrentPage('login')}>로그인 화면으로 이동</Button>
            </div>
          </div>
        </div>
      ) : currentPage === 'login' ? (
        <div className="bg-white flex items-center justify-center min-h-screen">
          <LoginPage onSwitch={() => setCurrentPage('signup')} />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <SignupPage onSwitch={() => setCurrentPage('login')} />
        </div>
      )}
    </div>
  );
};

export default App;