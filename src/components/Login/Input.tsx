import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}

// 재사용 가능한 입력 컴포넌트: react-hook-form과 함께 사용 가능
export const Input = ({
  type,
  placeholder,
  required,
  register,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      {...register}
      {...props}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};