import { useEffect, useState } from 'react';
import profile from '../assets/imgs/기본 프로필.png';
import { client } from '../services/axios';

export default function MyComment({
  userName,
  userComment,
}: {
  userName: string;
  userComment: CommentData[];
}) {
  const [image, setImage] = useState('');
  const [userData, setUserData] = useState<[]>([]);
  const [postDate, setPostDate] = useState<[]>([]);

  console.log(postDate);

  client('/auth-user').then((response) => setUserData(response.data._id));

  useEffect(() => {
    client(`/users/${userData}`).then((response) => [
      setImage(response.data.image || profile),
      setPostDate(response.data.comments),
    ]);
  }, [userData]);

  return (
    <>
      {userComment.map((v) => (
        <div className="commentBox block">
          <div className="flex">
            <img
              src={image}
              alt="프로필"
              className="h-[50px] w-[50px] rounded-full"
            />
            <div className="ml-[8.12px] block">
              <span className="textH3 block">{userName}</span>
              <div className="h-[7px]"></div>
              <span className="text-ST02 block">{v.comment}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
