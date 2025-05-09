import { twMerge } from 'tailwind-merge';
import { postsData } from '../types/postsData';
import { FaPlus } from 'react-icons/fa';
import { TiStarFullOutline } from 'react-icons/ti';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import Button from '../components/Button';
import fcOnline from '../assets/fcOnline.jpg';

export default function Channel() {
  const channelData: ChannelType = {
    authRequired: true,
    posts: postsData,
    channelId: 1,
    name: 'FC 온라인',
    description: fcOnline,
    createdAt: '',
    updatedAt: '',
  };
  const [subscribes, setSubscribes] = useState(false); // 채널 구독 상태 관리
  // const [posts, setPosts] = useState<PostType[]>(channelData.posts);

  // // const addPost = (newComment: string) => {
  // //   const nextId = posts.length + 1;
  // //   const newItem: CommentType = {
  // //     channelId: nextId,
  // //     comment: newComment,
  // //     coverImage: placeholderIcon,
  // //     userName: "익명",
  // //   };
  // //   setPosts([...posts, newItem]);
  // // };

  // // const deletePost = (id: number) => {
  // //   setPosts((prev) => prev.filter((comment) => comment.channelId !== id));
  // // };
  // 게시글 추가, 삭제 기능 구현 중에 있음.

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
            <TiStarFullOutline
              onClick={() => setSubscribes(!subscribes)}
              className={twMerge(
                'ml-5 transition-colors hover:text-[var(--color-main)]',
                subscribes
                  ? 'text-[var(--color-sub)]'
                  : 'text-[var(--color-gray4)]',
              )}
              size={22}
            />
            <div className="flex-grow"></div>
            <Link to="create">
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
          {channelData.posts.map((v) => (
            <PostList key={v.postId} {...v} />
          ))}
        </div>
      </div>
    </>
  );
}
