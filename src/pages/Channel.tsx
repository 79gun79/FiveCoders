import { twMerge } from 'tailwind-merge';
import PostList from '../components/PostList';
import { postsData } from '../types/postsData';
import Button from '../components/Button';
import { FaPlus, FaStar } from 'react-icons/fa';

export default function Channel() {
  const channelData: ChannelType = {
    authRequired: true,
    posts: postsData,
    channelId: 1,
    name: 'FC 온라인',
    description:
      'https://media.istockphoto.com/id/1133951413/ko/%EC%82%AC%EC%A7%84/%EC%BC%84-%ED%8C%85-%EC%B4%A8-%ED%8C%A1.jpg?s=2048x2048&w=is&k=20&c=o7oc-GnmnNHETP8_pZOIIwZXwZOYyAa7SeCxTZ5S4_M=',
    createdAt: '',
    updatedAt: '',
  };
  return (
    <>
      <div className="flex min-w-[640px] flex-col">
        <div className="mb-[30px] items-center justify-center">
          <div className={twMerge('postBottom', 'h-[155px] border border-b-0')}>
            <img
              className="h-full w-full object-cover"
              src={channelData.description}
            />
          </div>
          <div
            className={twMerge(
              'postBottom',
              'flex h-[76px] items-center border px-[20px]',
            )}
          >
            <h3 className={twMerge('textH3', 'font-bold')}>
              {channelData.name}
            </h3>
            <FaStar className="ml-5 text-[var(--color-sub)]" size={22} />
            <div className="flex-grow"></div>
            <Button
              className={twMerge(
                'btn-style',
                'textBasic',
                'h-[36px] w-[91px] px-4 py-2 font-normal',
              )}
            >
              <FaPlus className="mr-1 text-white" size={12} />
              <span>글쓰기</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          {channelData.posts.map((v) => (
            <PostList key={v.postId} {...v} />
          ))}
        </div>
      </div>
    </>
  );
}
