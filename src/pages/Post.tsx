import Sidebar from "../components/Sidebar";
import CreatePost from "./CreatePost";

export default function Post() {
  return (
    <>
      <header className="min-w-screen min-h-[80px] bg-[var(--color-main)]">
        상단 바
      </header>
      <main className="flex">
        <Sidebar />
        <section className="w-auto mt-[50px] mx-[160px]">
          <CreatePost />
        </section>
      </main>
      <footer></footer>
    </>
  );
}
