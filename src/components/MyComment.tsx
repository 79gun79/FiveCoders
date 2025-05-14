import profile from '../assets/imgs/기본 프로필.png';

export default function MyComment({
  userName,
  userComment,
}: {
  userName: string;
  userComment: CommentData[];
}) {
  return (
    <>
      {userComment.map((v) => (
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
