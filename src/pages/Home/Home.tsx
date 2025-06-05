import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1 className='text-3xl text-red-500'>Home</h1>
      <Link to='/login' className='text-2xl underline'>
        Go to Login
      </Link>
      <Link to='/review' className='text-2xl underline'>
        Go to Review
      </Link>
    </div>
  );
}
