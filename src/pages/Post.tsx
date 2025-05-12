import Sidebar from '../components/Sidebar';
import Channel from './Channel';

export default function Post() {
  return (
    <>
      <header className="min-h-[80px] min-w-screen bg-[var(--color-main)]">
        상단 바
      </header>
      <main className="flex">
        <Sidebar />
        <section className="mx-[160px] mt-[50px] w-auto">
          <Channel />
        </section>
      </main>
      <footer></footer>
    </>
  );
}
