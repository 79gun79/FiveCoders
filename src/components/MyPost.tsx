import Button from './Button';
import { AiFillMessage } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { postData } from '../data/PostData';
import { client } from '../services/axios';
import prof from '../assets/imgs/defaultProfileImg.png';
import { useParams } from 'react-router';

export default function MyPost({
  userName,
  myPost,
}: {
  userName: string;
  myPost: PostData[];
}) {
  // const [userName, setUserName] = useState();
  const [like, setLike] = useState(new Array(postData.length).fill(0));
  const [image, setImage] = useState('');

  const handlesetLike = (i) => {
    const copyLike = [...like];
    if (copyLike[i] === 0) {
      copyLike[i] = copyLike[i] + 1;
    } else if (copyLike[i] !== 0) {
      copyLike[i] = copyLike[i] - 1;
    }
    setLike(copyLike);
  };

  const userId = useParams();

  useEffect(() => {
    client(`/users/${userId.userId}`).then((response) =>
      setImage(response.data.image || prof),
    );
  }, [userId.userId]);

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
                <span className="textST2 block">{v.title}</span>
              </div>
            </div>
            <div className="mt-[45px] border-1 border-[var(--color-gray3)]"></div>
            <div className="mt-5 flex content-center justify-center">
              <Button
                className={
                  'textT2 flex w-80 cursor-pointer content-end justify-center hover:bg-[var(--color-gray1)]' +
                  (like[i] > 0
                    ? ' text-[var(--color-main)]'
                    : ' text-[var(--color-gray5)]')
                }
                onClick={() => handlesetLike(i)}
              >
                <BiSolidLike className="mr-2 h-5" /> 좋아요
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
