import { useEffect, useState } from 'react';
import { client } from '../services/axios';
import PostComponent from './PostComponent';

export default function SearchPost({ searchId }: { searchId: string }) {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    client(`/posts/${searchId}`).then((res) => setPost(res.data));
  }, [searchId]);

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
