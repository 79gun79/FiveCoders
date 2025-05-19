import { useEffect, useState } from 'react';
import { client } from '../services/axios';
import { fetchChannels } from '../services/channelApi';
import { FaThumbsUp } from 'react-icons/fa6';
import { Post } from '../types/post';
import { Channel } from '../types/channel';
import sanitize from 'sanitize-html';
import { useNavigate } from 'react-router';

function getTodayString() {
  // 오늘 날짜 :  YYYY-MM-DD
  return new Date().toISOString().slice(0, 10);
}

//제목/본문 분리
function parseTitleAndContent(rawTitle: string) {
  // 본문 추출
  const contentMatch = rawTitle.match(/<p>(.*?)<\/p>/s);
  const content = contentMatch
    ? contentMatch[1].replace(/<br\s*\/?>/gi, '\n')
    : '';
  // 제목 추출
  const title = rawTitle.split('<p>')[0].trim();
  return { title, content };
}

export default function TodayBestPost() {
  const [topPosts, setTopPosts] = useState<Post[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopPosts() {
      setLoading(true);
      try {
        const channelsData = await fetchChannels();
        setChannels(channelsData);

        const allPostIds = channelsData.flatMap((channel) => channel.posts);

        const postDetails: Post[] = await Promise.all(
          allPostIds.map((id) =>
            client.get(`/posts/${id}`).then((res) => res.data),
          ),
        );

        const today = getTodayString();
        const todayPosts = postDetails.filter(
          (post) => post.createdAt && post.createdAt.slice(0, 10) === today,
        );

        //좋아요 많은 순 3개
        const sorted = todayPosts
          .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
          .slice(0, 3);

        setTopPosts(sorted);
      } catch (error) {
        console.error(error);
        setTopPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTopPosts();
  }, []);

  return (
    <div className="relative mt-2.5 grid min-h-[200px] grid-cols-3 gap-7">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-white">
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
      )}
      {!loading &&
        topPosts.map((post) => {
          const { title, content } = parseTitleAndContent(post.title);
          const channelIndex = channels.findIndex(
            (channel) => channel._id === post.channel?._id,
          );
          const cleanContent = sanitize(content, {
            allowedTags: ['b', 'i', 'em', 'strong', 'u', 'span', 'br'],
            allowedAttributes: {
              span: ['style'],
              strong: ['style'],
            },
            allowedStyles: {
              '*': {
                color: [/^.*$/],
              },
            },
          });

          return (
            <div
              key={post._id}
              className="h-[200px] w-[300px] cursor-pointer rounded-xl bg-white p-4 shadow transition duration-300 hover:scale-105 hover:bg-[var(--color-main-light)] hover:shadow-2xl"
              onClick={() => {
                if (channelIndex === -1) return; // 채널 못 찾을 경우 처리
                navigate(`/channel/${channelIndex}#${post._id}`);
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={post.author?.image || ''}
                    alt="프로필"
                    className="mr-2 h-10 w-10 rounded-full"
                  />
                  <span className="font-medium">{post.author?.fullName}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {post.channel?.name || '채널명'}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-lg font-bold break-words text-[var(--color-gray8)]">
                  {title}
                </p>

                {cleanContent && (
                  <div
                    className="mt-1 line-clamp-2 break-words whitespace-pre-line text-[var(--color-gray8)]"
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                  />
                )}
              </div>

              <div className="flex items-center justify-end">
                <FaThumbsUp className="text-[var(--color-main)]" />
                <span className="ml-1 font-semibold text-[var(--color-main)]">
                  {post.likes.length}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
