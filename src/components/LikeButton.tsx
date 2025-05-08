import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
export default function LikeButton() {
  const [clicked, isClicked] = useState(false);
  return (
    <>
      <button
        className={
          "w-100 text-T02 cursor-pointer hover:bg-[var(--color-gray1)] flex justify-center content-end" +
          (clicked
            ? " text-[var(--color-primary)]"
            : " text-[var(--color-gray5)]")
        }
        onClick={() => isClicked(!clicked)}
      >
        <BiSolidLike className="mr-2 h-5" /> 좋아요
      </button>
    </>
  );
}
