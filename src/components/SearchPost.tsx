import { useEffect, useState } from 'react';
import { client } from '../services/axios';
import PostComponent from './PostComponent';

export default function SearchPost({ post }: { post: Post }) {
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    client(`/users/${post.author}`).then((res) => setUserInfo(res.data));
  }, [post]);

  return (
    <div className="mb-5">
      <PostComponent post={post} userInfo={userInfo} />
    </div>
  );
}
