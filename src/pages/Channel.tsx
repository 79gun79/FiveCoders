import { twMerge } from 'tailwind-merge';
import { FaPlus } from 'react-icons/fa';
import { TiStarFullOutline } from 'react-icons/ti';
import { useState } from 'react';
import PostList from '../components/PostList';
import Button from '../components/Button';
import { usePostStore } from '../stores/postStore';
import { Link } from 'react-router-dom';

export default function Channel() {
  const { name, imageUrl, posts } = usePostStore();
  const [subscribes, setSubscribes] = useState(false); // 채널 구독 상태 관리

  return (
    <>
      <div className="mb-[50px] flex min-w-[640px] flex-col">
        <div className="mb-[30px] items-center justify-center">
          <div className={twMerge('postBottom', 'h-[155px] border border-b-0')}>
            <img className="h-full w-full object-cover" src={imageUrl} />
          </div>
          <div
            className={twMerge(
              'postBottom',
              'flex h-[76px] items-center border px-[20px]',
            )}
          >
            <h3 className={twMerge('textH3', 'font-bold')}>{name}</h3>
            <TiStarFullOutline
              onClick={() => setSubscribes(!subscribes)}
              className={twMerge(
                'ml-5 transition-colors hover:text-[var(--color-orange)]',
                subscribes
                  ? 'text-[var(--color-orange)]'
                  : 'text-[var(--color-gray4)]',
              )}
              size={22}
            />
            <div className="flex-grow"></div>
            <Link to="/content/create">
              <Button
                className={twMerge(
                  'btn-style',
                  'textST1',
                  'h-[36px] w-[91px] px-4 py-2 font-normal',
                )}
              >
                <FaPlus className="mr-1 text-white" size={12} />
                <span>글쓰기</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[30px]">
          {posts.map((v) => (
            <PostList key={v.postId} {...v} />
          ))}
        </div>
      </div>
    </>
  );
}
