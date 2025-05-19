import { AiFillMessage } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { client } from '../services/axios';
import { Link, useParams } from 'react-router';
import { parseContent } from '../utils/parseContent';
import { cleanContent } from '../utils/cleanContent';
import { twMerge } from 'tailwind-merge';
import { fetchChannels } from '../services/channelApi';
import { Channel } from '../types/channel';
import { getImagePreview } from '../utils/localImage';
import prof from '../assets/imgs/defaultProfileImg.png';
import { Post } from '../types/post';
import { channelData } from '../data/channelData';

export default function MyPost({ myPost }: { myPost: Post[] }) {
  const [image, setImage] = useState('');
  const [myName, setMyname] = useState('');
  const [myId, setMyId] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);

  // console.log(liked._id);

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
      setImage(response.data.image);
      setMyname(response.data.fullName);
    });
  }, [userId.userId]);

  return (
    <>
      {myPost.map((v: Post) => {
        const { head, body } = parseContent(v.title);

        const channelName =
          channels.find((c) => c._id === v.channel)?.name ||
          '존재하지 않은 채널';

        const channelIndex = channels.findIndex(
          (channel) => channel._id === v.channel,
        );

        const matchedChannel = channelData.find(
          (channel) => channel.name === channelName,
        );
        const bannerImg = matchedChannel?.bannerImg || '/gammue.ico';

        return (
          <Link to={`/channel/${channelIndex}#${v._id}`} key={v._id}>
            <div className="postShadow postBorder mt-[30px]">
              <div className="pb-9">
                {myId !== userId.userId && (
                  <div className="mb-4 flex items-center gap-[10px]">
                    <img
                      src={image || prof}
                      alt="profile"
                      className="postProfile"
                    />
                    <p className="text-base">{v.author.fullName || myName}</p>
                    <div className="flex-grow"></div>
                  </div>
                )}
                <div className="textH4 max-w-[640px] overflow-hidden font-bold text-ellipsis whitespace-nowrap">
                  {head}
                </div>
                {v.image && (
                  <img
                    src={v.image}
                    alt={v._id}
                    className="mt-3 max-w-[564px] object-contain"
                  />
                )}
                <div
                  className="textT1 mt-3 line-clamp-4 min-w-[564px]"
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
                  {v.likes.length}
                </span>
                <AiFillMessage size={20} />
                <span className="mr-2 text-[var(--color-text-black)]">
                  {v.comments.length}
                </span>
                <div className="flex-grow"></div>
                <img
                  src={bannerImg || getImagePreview(v.channel) || prof}
                  alt="profile"
                  className="postProfile"
                />
                <p className="text-base text-[var(--color-text-black)]">
                  {v.author.fullName || channelName}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
