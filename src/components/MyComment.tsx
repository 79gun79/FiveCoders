import { useEffect, useState } from 'react';
import profile from '../assets/imgs/defaultProfileImg.png';
import { client } from '../services/axios';
import { Link, useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { getPostById } from '../services/postApi';
import { parseContent } from '../utils/parseContent';
import { fetchChannels } from '../services/channelApi';
import { Channel } from '../types/channel';

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
    return (
      <div className="z-50 flex h-120 items-center justify-center">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-[var(--color-main)] text-[var(--color-bg-white)]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
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
