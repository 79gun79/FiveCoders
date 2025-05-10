import { twMerge } from 'tailwind-merge';

export default function CommentList({
  comment,
  coverImage,
  userName,
}: CommentType) {
  return (
    <>
      <div
        className={twMerge('postBottom', 'flex flex-col gap-3 px-1 py-[16px]')}
      >
        <div className="flex items-center gap-[10px]">
          <img src={coverImage} alt="profile" className="postProfile" />
          <p className="text-base">{userName}</p>
        </div>
        <p className="textBasic ml-[42px]">{comment}</p>
      </div>
    </>
  );
}
