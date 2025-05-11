import { useEffect, useState } from 'react';
import { client } from '../services/axios';
import PostList from './PostList';

export default function SearchPost({
  postId,
  content,
  userName,
  image,
  coverImage,
  comments,
}: PostType) {
  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    client(`/users/${userName}`).then((res) => setUserInfo(res.data));
  }, []);

  return (
    <div className="mb-5">
      <PostList
        postId={postId}
        userName={userInfo?.fullName || '(알 수 없음)'}
        content={content}
        image={image}
        coverImage={coverImage}
        comments={comments}
      />
    </div>
  );
}
