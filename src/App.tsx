import { BrowserRouter } from "react-router";
import Router from "./router";

export default function App() {
  return (
    <>
      <header className="border-1 min-w-screen h-[85px] bg-[var(--color-main)]">
        상단 바
      </header>
      <main className="flex">
        <aside className="border-1 w-[210px] min-h-screen bg-[var(--color-sub)]">
          사이드 바
        </aside>
        <section className="w-[calc(100vw-210px)] mt-[42px]">
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
