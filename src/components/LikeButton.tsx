import like from "../assets/icons/Like.svg";

export default function LikeButton() {
  return (
    <>
      <button className=" text-T02 text-[var(--color-gray5)] cursor-pointer">
        <img src={like} alt="좋아요" className="inline-flex mr-2" />
        좋아요
      </button>
    </>
  );
}
