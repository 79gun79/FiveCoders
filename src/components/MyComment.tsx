import { useEffect, useState } from 'react';
import profile from '../assets/imgs/defaultProfileImg.png';
import { client } from '../services/axios';
import { useLocation, useParams } from 'react-router';

export default function MyComment({
  userName,
  userComment,
}: {
  userName: string;
  userComment: CommentData[];
}) {
  const [image, setImage] = useState('');
  // const [userData, setUserData] = useState<[]>([]);

  // const location = useLocation();

  // const myId = location.state;

  const userId = useParams();
  useEffect(() => {
    client(`/users/${userId.userId}`).then((response) => [
      setImage(response.data.image || profile),
    ]);
    // setUserData(userId || myId);
  }, [userId.userId, userName]);

  return (
    <>
      {userComment.map((v) => (
        <div className="commentBox block w-172">
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
