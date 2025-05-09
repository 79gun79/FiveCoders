import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Channel from './Channel';
import CreatePost from './CreatePost';

export default function Content() {
  return (
    <>
      <header className="min-h-[80px] min-w-screen bg-[var(--color-main)]">
        상단 바
      </header>
      <main className="flex">
        <Sidebar />
        <section className="mx-[160px] mt-[50px] w-auto">
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
