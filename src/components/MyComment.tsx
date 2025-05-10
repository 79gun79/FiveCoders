import profile from '../assets/imgs/기본 프로필.png';
import { CommentData } from '../data/CommentData';
import userData from '../data/UserData';

export default function MyComment() {
  const userName = userData((state) => state.userName);
  const myComment: MyCommentData = {
    authorId: 1,
    comment: CommentData,
  };
  return (
    <>
      {myComment.comment.map((v) => (
        <div className="commentBox block">
          <div className="flex">
            <img
              src={profile}
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
