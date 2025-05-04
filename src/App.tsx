import Channel from "./pages/Channel";

export default function App() {
  return (
    <>
      <header className="min-w-screen min-h-[80px] bg-[var(--color-main)]">
        상단 바
      </header>
      <main className="flex">
        <aside className="w-[280px] min-h-screen bg-[var(--color-sub)]">
          사이드 바
        </aside>
        <section className="w-auto mt-[50px] mx-[160px]">
          <Channel />
        </section>
      </main>
      <footer></footer>
    </>
  );
}
