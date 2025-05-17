import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1 className="text-3xl text-red-500">Login</h1>
      <Link to="/" className="underline text-2xl ">
        Go to Home
      </Link>
    </div>
  );
}
