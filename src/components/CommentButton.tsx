import comment from "../assets/icons/Reply.svg";

export default function CommnetButton() {
  return (
    <>
      <button className=" text-T02 text-[var(--color-gray5)] cursor-pointer">
        <img src={comment} alt="댓글" className="inline-flex mr-2" />
        58
      </button>
    </>
  );
}
