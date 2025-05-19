import { useEffect, useState } from 'react';
import profile from '../assets/imgs/defaultProfileImg.png';
import { client } from '../services/axios';
import { Link, useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { getPostById } from '../services/postApi';
import { parseContent } from '../utils/parseContent';
import { fetchChannels } from '../services/channelApi';
import { Channel } from '../types/channel';
import LoadingUI from './LoadingUI';
import { Post } from '../types/post';

export default function MyComment({ myComment }: { myComment: CommentType[] }) {
  const [image, setImage] = useState('');
  const [myName, setMyname] = useState('');
  const [myId, setMyId] = useState('');
  const [postDatas, setPostDatas] = useState<Record<string, Post>>({});
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([]);

  const userId = useParams();

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const ch = await fetchChannels();
        setChannels(ch);
      } catch (error) {
        console.error('채널 정보를 불러오지 못했습니다.', error);
      }
    };

    loadChannels();
  }, []);

  useEffect(() => {
    client('/auth-user').then((response) => {
      setMyId(response.data._id);
    });
    client(`/users/${userId.userId}`).then((response) => {
      setImage(response.data.image || profile);
      setMyname(response.data.fullName);
    });
  }, [userId.userId]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true); // 로딩 시작
      const postData: Record<string, Post> = {};

      try {
        await Promise.all(
          myComment.map(async (v) => {
            const response = await getPostById(v.post);
            postData[v.post] = response.data; // 🔹 postId를 키로, 데이터를 값으로 저장
          }),
        );
        setPostDatas(postData);
      } catch (err) {
        console.error(`게시물 정보를 불러오지 못했습니다.`, err);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    // 🔹 myComment가 있을 때만 실행
    if (myComment.length > 0) {
      fetchPostDetails();
    }
  }, [myComment]);

  if (loading) {
    return <LoadingUI />;
  }
  return (
    <>
      {[...myComment].reverse().map((v) => {
        const channelIndex = channels.findIndex(
          (c) => c._id === postDatas[v.post].channel._id,
        );
        return (
          <Link to={`/channel/${channelIndex}#${v.post}`} key={v.post}>
            <div
              key={v._id}
              className={twMerge(
                'postShadow postBorder',
                'mt-[30px]',
                'flex flex-col gap-4 px-4 py-[16px]',
              )}
            >
              {myId !== userId.userId && (
                <div className="flex items-center gap-[10px]">
                  <img
                    src={image || profile}
                    alt="profile"
                    className="postProfile"
                  />
                  <p className="text-base font-medium">
                    {v.author.fullName || myName}
                  </p>
                </div>
              )}
              <div
                className={twMerge(
                  'flex items-center justify-start gap-2',
                  'min-w-[640px] overflow-hidden',
                )}
              >
                <p className="ml-2 max-w-[400px] overflow-hidden text-base text-ellipsis whitespace-nowrap text-[var(--color-gray8)]">
                  {v.comment}
                </p>
                <div className="flex-grow"></div>
                <p className="textT1 max-w-[160px] overflow-hidden font-bold text-ellipsis whitespace-nowrap">
                  {parseContent(postDatas[v.post].title).head || ''}
                </p>
                -
                <p className="textH5">
                  {postDatas[v.post].author.fullName || ''}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
