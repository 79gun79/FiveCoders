import { useEffect, useState } from 'react';
import { client } from '../services/axios';
import PostPage from './PostPage';

export default function PostList({ channelId }: { channelId: string }) {
  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.get(`/posts/channel/${channelId}`);
        const refinedData = data.map((v: Post) => ({
          ...v,
          channel: v.channel.name,
          author: v.author?.fullName,
        }));
        setPosts(refinedData);
      } catch (e) {
        console.log('Failed to Fetch Data:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [channelId]);

  if (isLoading) return <p>로딩 중입니다..</p>;

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <PostPage key={post._id} post={post} />;
        })
      ) : (
        <p>포스트가 없습니다.</p>
      )}
    </>
  );
}
