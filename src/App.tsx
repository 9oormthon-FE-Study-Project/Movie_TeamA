import { Outlet } from "react-router";

export default function App() {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-100">
      <div className="flex flex-col w-full max-w-md h-full overflow-y-auto bg-white p-4">
        <Outlet />
      </div>
    </div>
  );
}
