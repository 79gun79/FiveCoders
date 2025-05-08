import like from "../assets/icons/Like.svg";

export default function LikeButton() {
  return (
    <>
      <button className="w-100 text-T02 text-[var(--color-gray5)] cursor-pointer hover:bg-[var(--color-gray1)]">
        <img src={like} alt="좋아요" className="inline-flex mr-2" />
        좋아요
      </button>
    </>
  );
}
