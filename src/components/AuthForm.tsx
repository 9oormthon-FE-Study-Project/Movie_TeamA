import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './common/Button';
import { Input } from './common/Input';
import type { AuthFormData } from '../types/auth'; 

interface AuthFormProps {
  title: string;
  isSignup?: boolean;
  onSubmit: (data: AuthFormData) => void;
  onSwitch: () => void;
}

// 공통 인증 폼 컴포넌트: 로그인과 회원가입에서 재사용
export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  isSignup,
  onSubmit,
  onSwitch,
}) => {
  // react-hook-form으로 폼 상태 관리 및 유효성 검사
  const { register, handleSubmit, formState: { errors }, watch } = useForm<AuthFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: isSignup ? '' : undefined,
    },
  });

  // 비밀번호 확인 일치 여부 체크 (회원가입 시)
  const password = watch('password');
  const validateConfirmPassword = (value: string | undefined) =>
    !isSignup || value === password || '비밀번호가 일치하지 않습니다';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <div className="space-y-4">
          {/* 이메일 입력 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">이메일</label>
            <Input
              type="email"
              required
              register={register('email', {
                required: '이메일을 입력하세요',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '유효한 이메일을 입력하세요',
                },
              })}
              placeholder="이메일을 입력하세요"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <Input
              type="password"
              required
              register={register('password', {
                required: '비밀번호를 입력하세요',
                minLength: {
                  value: 6,
                  message: '비밀번호는 최소 6자 이상이어야 합니다',
                },
              })}
              placeholder="비밀번호를 입력하세요"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
              <Input
                type="password"
                required
                register={register('confirmPassword', {
                  required: '비밀번호 확인을 입력하세요',
                  validate: validateConfirmPassword,
                })}
                placeholder="비밀번호를 다시 입력하세요"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
          )}
          {/* 제출 버튼 */}
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            {title}
          </Button>
          {/* 페이지 전환 버튼 */}
          <Button variant="secondary" onClick={onSwitch}>
            {isSignup ? '로그인으로 이동' : '회원가입으로 이동'}
          </Button>
        </div>
      </div>
    </div>
  );
};