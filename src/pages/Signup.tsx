import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SignupForm } from '../types/signup';
import Nav from '../components/home/Nav';
// import axios from 'axios';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupForm>();
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
    <div className='min-h-screen bg-black'>
      <Nav />
      <div className='flex min-h-[calc(100vh-56px)] items-center justify-center'>
        <div className='w-full max-w-md rounded-lg bg-black p-8 shadow-md'>
          <h2 className='mb-6 text-center text-2xl font-bold text-white'>
            회원가입
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
            <div>
              <input
                type='password'
                {...register('confirmPassword', {
                  required: '비밀번호 확인을 입력하세요.',
                  validate: (value) =>
                    value === watch('password') ||
                    '비밀번호가 일치하지 않습니다.',
                })}
                placeholder='비밀번호 확인'
                className='w-full rounded border border-gray-700 bg-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none'
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault(); // 공백 입력 방지
                  }
                }}
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div>
              <input
                type='email'
                {...register('email', { required: '이메일을 입력하세요.' })}
                placeholder='이메일'
                className='w-full rounded border border-gray-700 bg-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none'
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <select
                {...register('gender', { required: '성별을 선택하세요.' })}
                className='w-full cursor-pointer rounded border border-gray-700 bg-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none'
              >
                <option value=''>성별 선택</option>
                <option value='male'>남성</option>
                <option value='female'>여성</option>
              </select>
              {errors.gender && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div>
              <input
                type='date'
                {...register('birthdate', {
                  required: '생년월일을 입력하세요.',
                })}
                className='w-full cursor-pointer rounded border border-gray-700 bg-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none'
              />
              {errors.birthdate && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.birthdate.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full cursor-pointer rounded bg-red-800 py-2 text-white transition hover:bg-gray-700'
            >
              회원가입
            </button>
          </form>
          <p className='mt-4 text-center text-gray-400'>
            이미 계정이 있으신가요?{' '}
            <button
              className='cursor-pointer text-gray-300 underline'
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
