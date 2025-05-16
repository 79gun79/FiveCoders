import { useEffect, useState } from 'react';
import { client } from '../services/axios';

import PostComponent from './PostComponent.tsx';
import { useRefreshStore } from '../stores/refreshStore';

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

  if (isLoading) return <p>로딩 중입니다..</p>;

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <PostComponent id={post._id} key={post._id} post={post} />;
        })
      ) : (
        <p>포스트가 없습니다.</p>
      )}
    </>
  );
}
