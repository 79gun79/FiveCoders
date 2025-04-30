import { twMerge } from "tailwind-merge";
import CommentButton from "../componenets/CommentButton";
import LikeButton from "../componenets/LikeButton";

export default function Post({
  title,
  image,
  userName,
  userId,
  content,
  likeCount,
  comments,
}: PostType) {
  return (
    <>
      <div className="postBorder">
        <div className="flex items-center gap-2 mb-8">
          <img
            src={image}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className={twMerge("textBase", "text-[18px]")}>{userName}</p>
            <p className={twMerge("textBase", "text-[8px]")}>{userId}</p>
          </div>
        </div>
        <h3 className="textH3 mb-4">{title}</h3>
        <p className={twMerge("textBase", "text-[18px] mb-8")}>{content}</p>
        <div className="flex flex-row gap-[9px]">
          <LikeButton likeCount={likeCount} />
          <CommentButton comments={comments} />
        </div>
      </div>
    </>
  );
}
