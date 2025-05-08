import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Channel from "./Channel";
import CreatePost from "./CreatePost";

export default function Content() {
  return (
    <>
      <header className="min-w-screen min-h-[80px] bg-[var(--color-main)]">
        상단 바
      </header>
      <main className="flex">
        <Sidebar />
        <section className="w-auto mt-[50px] mx-[160px]">
          <Routes>
            <Route path="/" element={<Channel />} />
            <Route path="create" element={<CreatePost />} />
          </Routes>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
