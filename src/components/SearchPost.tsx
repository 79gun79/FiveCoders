import { useEffect, useState } from 'react';
import { client } from '../services/axios';
import PostList from './PostList';

export default function SearchPost({
  _id,
  title,
  author,
  image,
  comments,
  ...rest
}: Post) {
  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    client(`/users/${author}`).then((res) => setUserInfo(res.data));
  }, []);

  return (
    <div className="mb-5">
      <PostList
        _id={_id}
        image={image}
        title={title}
        author={userInfo?.fullName || '(알 수 없음)'}
        comments={comments}
        {...rest}
      />
    </div>
  );
}
