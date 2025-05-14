import { Route, Routes, useParams } from 'react-router-dom';
import ChannelPage from './ChannelPage';
import CreatePost from './CreatePost';
import ChannelList from './ChannelList';
import UpdatePost from './UpdatePost';
import { channelData } from '../data/channelData';
import { ChannelImg } from '../types/channel';

export default function Channel() {
  return (
    <>
      <div className="mx-[200px]">
        <Routes>
          <Route path="/" element={<ChannelList />} />
          <Route path=":id" element={<ChannelPageWrapper />} />
          <Route path=":id/create" element={<CreatePost />} />
          <Route path=":id/update" element={<UpdatePost />} />
        </Routes>
      </div>
    </>
  );
}

function ChannelPageWrapper() {
  const { id } = useParams();
  const channelInfo = channelData.find((v) => v.channelId === id);

  return <ChannelPage id={id ?? '0'} info={channelInfo as ChannelImg} />;
}
