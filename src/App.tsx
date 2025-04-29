import Login from "./page/Login";
import SignUp from "./page/SignUp";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-300">
        <h1 className="text-3xl underline">FiveCoders</h1>
        <Login />
        <SignUp />
      </div>
    </>
  );
}
