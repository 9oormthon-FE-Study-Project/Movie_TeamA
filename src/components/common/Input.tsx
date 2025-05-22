import React from 'react';

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
  register: unknown; // react-hook-form의 register 함수 타입
}

// 재사용 가능한 입력 컴포넌트: react-hook-form과 함께 사용 가능
export const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  register
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      {...(register || {})} // register가 제공되면 적용, 없으면 기본 동작
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};