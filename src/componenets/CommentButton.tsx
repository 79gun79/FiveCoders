export default function CommentButton({ comments }: { comments: number }) {
  return (
    <>
      <button className="p-2 items-center bg-[#E5EBEE] text-[var(--color-black)] rounded-[36px]">
        💬 {comments}
      </button>
    </>
  );
}
