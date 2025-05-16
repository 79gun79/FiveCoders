import { useEffect, useState } from 'react';
import { client } from '../services/axios';
import PostComponent from './PostComponent';
import { useRefreshStore } from '../stores/refreshStore';

export default function SearchPost({ searchId }: { searchId: string }) {
  const [post, setPost] = useState<Post>();

  const refresh = useRefreshStore((state) => state.refresh);

  useEffect(() => {
    client(`/posts/${searchId}`).then((res) => setPost(res.data));
  }, [searchId, refresh]);

  return (
    <>
      {post && (
        <div className="mb-5">
          <PostComponent post={post} userInfo={post.author} />
        </div>
      )}
    </>
  );
}
