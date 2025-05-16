import Button from './Button';
import { AiFillMessage } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { postData } from '../data/PostData';
import { client } from '../services/axios';
import prof from '../assets/imgs/기본 프로필.png';
import { useParams } from 'react-router';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { createLike, deleteLike } from '../services/likesApi';

export default function MyPost({
  userName,
  myPost,
  myLike,
}: {
  userName: string;
  myPost: PostData[];
  myLike: LikeData[];
}) {
  // const [userName, setUserName] = useState();
  const [like, setLike] = useState(new Array(postData.length).fill(0));
  // const [liked, setLiked] = useState();
  const [image, setImage] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  const token = useAuthStore.getState().accessToken;

  // const copiedLike = (i) => {
  //   if (myLike[i].post === myPost[i]._id) {
  //     copyLike[i] = 1;
  //   } else {
  //     copyLike[i] = 0;
  //   }
  // };

  const likedArr = new Array(postData.length).fill(0);

  console.log(like);

  const handlesetLike = async (i) => {
    const copyLike = [...like];
    const likeNum = myPost[i].likes.length;
    if (myLike[i]?.post === myPost[i]?._id) {
      likedArr[i] = 1;
    } else {
      likedArr[i] = 0;
    }
    if (copyLike[i] === 0) {
      copyLike[i] = copyLike[i] + 1;
      likedArr[i] = likedArr[i] + 1;
      console.log(myPost[i].likes.length);
      try {
        await axios.post(
          `${API_URL}likes/create`,
          {
            postId: myPost[i]._id,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log('updated');
      } catch (error) {
        console.log(error);
      }
    } else if (copyLike[i] !== 0) {
      copyLike[i] = copyLike[i] - 1;
      console.log(myLike[i]._id);
      console.log(i);
      try {
        const response = await axios.delete(`${API_URL}likes/delete`, {
          data: { id: myLike[i]._id },
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    setLike(copyLike);
  };

  // console.log(liked._id);

  const userId = useParams();

  useEffect(() => {
    client(`/users/${userId.userId}`).then((response) => [
      setImage(response.data.image || prof),
      // setLiked(response.data.likes),
    ]);
  }, [userId.userId]);

  // console.log(myLike);

  return (
    <>
      <div>
        {myPost.map((v, i) => (
          <div className="postBox block">
            <div className="flex">
              <img
                src={image}
                alt="프로필"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="ml-[8.12px] block">
                <span className="textH3 block">{userName}</span>
                <div className="h-[7px]"></div>
                <span></span>
                <span className="textST2 block">{v.title}</span>
              </div>
            </div>
            <div className="mt-[45px] border-1 border-[var(--color-gray3)]"></div>
            <div className="mt-5 flex content-center justify-center">
              <Button
                className={
                  'textT2 flex w-80 cursor-pointer content-end justify-center hover:bg-[var(--color-gray1)]' +
                  (like[i] > 0 || myLike[i]?.post === myPost[i]?._id
                    ? ' text-[var(--color-main)]'
                    : ' text-[var(--color-gray5)]')
                }
                onClick={() => handlesetLike(i)}
              >
                <BiSolidLike className="mr-2 h-5" /> 좋아요{' '}
                {myPost[i].likes.length}
              </Button>
              <Button className="textT2 comment w-80">
                <AiFillMessage className="mr-2 h-5" />
                58
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
