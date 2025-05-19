import { useEffect, useState } from 'react';
import { client } from '../services/axios';

import PostComponent from './PostComponent.tsx';
import { useRefreshStore } from '../stores/refreshStore';
import LoadingUI from './LoadingUI.tsx';
import { Post } from '../types/post';

export default function PostList({ channelId }: { channelId: string }) {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshStore((state) => state.refresh);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.get(`/posts/channel/${channelId}`);
        const refinedData = data.map((v: Post) => ({
          ...v,
        }));
        setPosts(refinedData);
      } catch (e) {
        console.log('Failed to Fetch Data:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [channelId, refresh]);

  useEffect(() => {
    if (!isLoading) {
      const targetId = window.location.hash.substring(1);
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [isLoading]); // 해당 포스트로 이동

  if (isLoading) {
    return <LoadingUI />;
  }

  return (
    <>
      {posts.length > 0 ? (
        <div className="flex w-full flex-col gap-6">
          {posts.map((post) => {
            return <PostComponent id={post._id} key={post._id} post={post} />;
          })}
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center">
          <div className="text-[18px] font-medium text-[var(--color-gray4)]">
            작성된 게시글이 없습니다.
          </div>
        </div>
      )}
    </>
  );
}
