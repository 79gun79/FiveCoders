import { Route, Routes, useParams } from 'react-router-dom';
import ChannelPage from './ChannelPage';
import CreatePost from './CreatePost';
import ChannelList from './ChannelList';

export default function Channel() {
  return (
    <>
      <div className="mx-[200px]">
        <Routes>
          <Route path="/" element={<ChannelList />} />
          <Route path=":id" element={<ChannelPageWrapper />} />
          <Route path=":id/create" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
}

function ChannelPageWrapper() {
  const { id } = useParams();
  return <ChannelPage channelId={id ?? '0'} />;
}
