import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="w-auto mt-[50px] mx-[160px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
