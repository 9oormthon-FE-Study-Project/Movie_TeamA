import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface LoginForm {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const onSubmit = async (data: LoginForm) => {

    try {
      // const res = await axios.post('/api/login', data);
      // if (res.data.success) {
      //   login();
      //   setUsername(data.username);
      //   setIsLoggedIn(true);
      // }
      login();
      setUsername(data.username);
      setIsLoggedIn(true);
    } catch (e) {
      alert('로그인 실패');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome! {username}</h2>
          <button
            onClick={() => navigate('/')}
            className="w-full py-2 bg-red-800 hover:bg-gray-700 text-white rounded transition"
          >
            HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register('username', { required: '아이디를 입력하세요.' })}
              placeholder="아이디"
              className="w-full px-4 py-2 rounded bg-gray-300 text-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div>
            <input
              type="password"
              {...register('password', { required: '비밀번호를 입력하세요.' })}
              placeholder="비밀번호"
              className="w-full px-4 py-2 rounded bg-gray-300 text-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault(); // 공백 입력 방지
                }
              }}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full py-2 bg-red-800 hover:bg-gray-700 text-white rounded transition">로그인</button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          계정이 없으신가요?{' '}
          <button className="text-gray-300 underline" onClick={() => navigate('/signup')}>회원가입</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
