import { AiFillMessage } from "react-icons/ai";

export default function CommnetButton() {
  return (
    <>
      <button className="w-100 text-T02 text-[var(--color-gray5)] cursor-pointer hover:bg-[var(--color-gray1)] flex content-center justify-center">
        <AiFillMessage className="mr-2 h-5" />
        58
      </button>
    </>
  );
}
