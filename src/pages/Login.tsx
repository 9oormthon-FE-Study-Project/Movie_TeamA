import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginForm } from '../types/login';
import Nav from '../components/home/Nav';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const onSubmit = async (data: LoginForm) => {
    try {
      login();
      setUsername(data.username);
      setIsLoggedIn(true);
    } catch (e) {
      alert('로그인 실패');
    }
  };

  if (isLoggedIn) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black'>
        <div className='w-full max-w-md rounded-lg bg-black p-8 text-center shadow-md'>
          <h2 className='mb-6 text-2xl font-bold text-white'>
            Welcome! {username}
          </h2>
          <button
            onClick={() => navigate('/')}
            className='w-full rounded bg-red-800 py-2 text-white transition hover:bg-gray-700'
          >
            HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black'>
      <Nav />
      <div className='flex min-h-[calc(100vh-150px)] items-center justify-center'>
        <div className='w-full max-w-md rounded-lg bg-black p-8 shadow-md'>
          <h2 className='mb-6 text-center text-2xl font-bold text-white'>
            로그인
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <input
                type='text'
                {...register('username', { required: '아이디를 입력하세요.' })}
                placeholder='아이디'
                className='w-full rounded border border-gray-700 bg-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none'
              />
              {errors.username && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <input
                type='password'
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                })}
                placeholder='비밀번호'
                className='w-full rounded border border-gray-700 bg-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none'
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault(); // 공백 입력 방지
                  }
                }}
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full cursor-pointer rounded bg-red-800 py-2 text-white transition hover:bg-gray-700'
            >
              로그인
            </button>
          </form>
          <p className='mt-4 text-center text-gray-400'>
            계정이 없으신가요?{' '}
            <button
              className='cursor-pointer text-gray-300 underline'
              onClick={() => navigate('/signup')}
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
