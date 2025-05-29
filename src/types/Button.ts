interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
}

// AuthFormData 타입 정의 추가 (예시)
interface AuthFormData {
  email: string;
  password: string;
  // 필요한 경우 다른 필드도 추가
}

interface AuthFormProps {
  title: string;
  isSignup?: boolean;
  onSubmit: (data: AuthFormData) => void;
  onSwitch: () => void;
}
