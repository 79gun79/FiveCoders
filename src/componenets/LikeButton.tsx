export default function LikeButton({ likeCount }: { likeCount: number }) {
  return (
    <>
      <button className="p-2 items-center bg-[var(--color-deep-orange)] text-[var(--color-black)] rounded-[36px]">
        👍🏻 {likeCount}
      </button>
    </>
  );
}
