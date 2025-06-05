import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-red-500">Home</h1>
      <Link to="/login" className="underline text-2xl ">
        Go to Login
      </Link>
    </div>
  );
}
