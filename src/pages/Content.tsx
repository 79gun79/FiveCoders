import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Channel from "./Channel";
import CreatePost from "./CreatePost";
import Header from "../components/Header";

export default function Content() {
  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        <section className="w-auto mt-[50px] mx-[200px]">
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
