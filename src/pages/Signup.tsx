import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignupForm } from '../types/signup';
// import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupForm) => {
    // 서버 요청 부분 주석 처리
    // try {
    //   const res = await axios.post('/api/signup', data);
    //   if (res.data.success) {
    //     navigate('/login');
    //   }
    // } catch (e) {
    //   alert('회원가입 실패');
    // }
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">회원가입</h2>
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
          <div>
            <input
              type="password"
              {...register('confirmPassword', {
                required: '비밀번호 확인을 입력하세요.',
                validate: (value) =>
                  value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
              placeholder="비밀번호 확인"
              className="w-full px-4 py-2 rounded bg-gray-300 text-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault(); // 공백 입력 방지
                }
              }}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              {...register('email', { required: '이메일을 입력하세요.' })}
              placeholder="이메일"
              className="w-full px-4 py-2 rounded bg-gray-300 text-gray-700 border border-gray-700  focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <select
              {...register('gender', { required: '성별을 선택하세요.' })}
              className="w-full px-4 py-2 rounded bg-gray-300 text-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="">성별 선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
            {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>}
          </div>
          <div>
            <input
              type="date"
              {...register('birthdate', { required: '생년월일을 입력하세요.' })}
              className="w-full px-4 py-2 rounded bg-gray-300 text-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.birthdate && <p className="text-red-400 text-sm mt-1">{errors.birthdate.message}</p>}
          </div>
          <button type="submit" className="w-full py-2 bg-red-800 hover:bg-gray-700 text-white rounded transition">회원가입</button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          이미 계정이 있으신가요?{' '}
          <button className="text-gray-300 underline" onClick={() => navigate('/login')}>로그인</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;