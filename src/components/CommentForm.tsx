import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import placeholderIcon from "../assets/channelImg.svg";

export default function CommentForm({
  addComment,
}: {
  addComment: (comment: string) => void;
}) {
  const [comment, setComment] = useState("");
  const postComment = () => {
    if (!comment.trim()) return;
    addComment(comment);
    setComment("");
  };

  return (
    <>
      <div className="flex items-start px-1 py-[20px] gap-[10px]">
        <img src={placeholderIcon} alt="profile" className="postProfile" />
        <div className="flex-1 h-[110px] rounded-xl bg-[var(--color-gray2)] p-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 작성해 주세요"
            rows={2}
            className={twMerge(
              "textBasic",
              "w-full resize-none outline-none placeholder-[var(--color-gray5)]",
            )}
          />

          <div className="flex justify-end">
            <Button
              className={twMerge(
                "btn-style-comment",
                "bg-[var(--color-main)] hover:bg-[var(--color-sub)]  text-white text-[14px]",
              )}
              onClick={postComment}
            >
              게시
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
