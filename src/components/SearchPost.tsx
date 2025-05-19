import { useEffect, useState } from 'react';
import { client } from '../services/axios';
import { useRefreshStore } from '../stores/refreshStore';
import { fetchChannels } from '../services/channelApi';
import { Channel } from '../types/channel';
import { parseContent } from '../utils/parseContent';
import { Link } from 'react-router';
import prof from '../assets/imgs/defaultProfileImg.png';
import { cleanContent } from '../utils/cleanContent';
import { twMerge } from 'tailwind-merge';
import { BiSolidLike } from 'react-icons/bi';
import { AiFillMessage } from 'react-icons/ai';
import { getImagePreview } from '../utils/localImage';
import LoadingUI from './LoadingUI';
import { Post } from '../types/post';
import { channelData } from '../data/channelData';

export default function SearchPost({ searchId }: { searchId: string }) {
  const [post, setPost] = useState<Post>();
  const [channels, setChannels] = useState<Channel[]>([]);

  const refresh = useRefreshStore((state) => state.refresh);

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
    const loadPost = async () => {
      try {
        const res = await client(`/posts/${searchId}`);
        setPost(res.data);
      } catch (error) {
        console.error('게시물을 불러오지 못했습니다.', error);
      }
    };

    loadPost();
  }, [searchId, refresh]);

  if (!post) {
    return <LoadingUI />;
  }

  const { head, body } = parseContent(post.title);

  const channelName =
    channels.find((c) => c._id === post.channel._id)?.name ||
    '존재하지 않은 채널';

  const channelIndex = channels.findIndex(
    (channel) => channel._id === post.channel._id,
  );
  const matchedChannel = channelData.find(
    (channel) => channel.name === post.channel.name,
  );
  const bannerImg = matchedChannel?.bannerImg || '/gammue.ico';

  return (
    <>
      <div className="mb-5">
        <Link to={`/channel/${channelIndex}#${post._id}`} key={post._id}>
          <div className="postShadow postBorder mt-[30px] min-w-[640px]">
            <div className="pb-9">
              <div className="mb-4 flex items-center gap-[10px]">
                <img
                  src={post.author.image || prof}
                  alt="profile"
                  className="postProfile"
                />
                <p className="text-base">{post.author.fullName}</p>
                <div className="flex-grow"></div>
              </div>

              <div className="textH4 max-w-[640px] overflow-hidden font-bold text-ellipsis whitespace-nowrap">
                {head}
              </div>
              {post.image && (
                <img
                  src={post.image}
                  alt={post._id}
                  className="mt-3 max-w-[564px] object-contain"
                />
              )}
              <div
                className="textT1 mt-3 line-clamp-4 min-w-[640px] overflow-hidden"
                dangerouslySetInnerHTML={{ __html: cleanContent(body) }}
              ></div>
            </div>
            <div
              className={twMerge(
                'flex items-center justify-start gap-2',
                'text-[var(--color-sub)]',
              )}
            >
              <BiSolidLike size={20} />
              <span className="mr-2 text-[var(--color-text-black)]">
                {post.likes.length}
              </span>
              <AiFillMessage size={20} />
              <span className="mr-2 text-[var(--color-text-black)]">
                {post.comments.length}
              </span>
              <div className="flex-grow"></div>
              <img
                src={bannerImg || getImagePreview(post.channel._id) || prof}
                alt="profile"
                className="postProfile"
              />
              <p className="text-base text-[var(--color-text-black)]">
                {channelName}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
