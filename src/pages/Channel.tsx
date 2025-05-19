import { Route, Routes, useParams } from 'react-router-dom';
import ChannelPage from './ChannelPage';
import CreatePost from './CreatePost';
import ChannelList from './ChannelList';
import UpdatePost from './UpdatePost';
import { useEffect, useState } from 'react';
import { fetchChannels } from '../services/channelApi';
import LoadingUI from '../components/LoadingUI';

export default function Channel() {
  return (
    <>
      <div className="container mx-auto sm:px-[50px] md:px-[100px] lg:px-[200px]">
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channels = await fetchChannels();

        const index = parseInt(id ?? '0', 10);
        if (channels[index]) {
          setIsLoading(false);
        } else {
          console.error('해당 인덱스에 채널이 없습니다.');
        }
      } catch (error) {
        console.error('채널 정보를 불러올 수 없습니다.', error);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingUI />;
  }

  return <ChannelPage id={id ?? '0'} />;
}
