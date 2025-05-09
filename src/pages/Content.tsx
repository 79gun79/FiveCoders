import { Route, Routes } from 'react-router-dom';
import Channel from './Channel';
import CreatePost from './CreatePost';

export default function Content() {
  return (
    <>
      <div className="mx-[200px]">
        <Routes>
          <Route path="/" element={<Channel />} />
          <Route path="create" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
}
