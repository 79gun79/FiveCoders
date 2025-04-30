export default function Comment() {
  return (
    <>
      <div>
        <div className="flex items-center gap-3">
          <img
            src="/vite.svg"
            alt="profile"
            className="w-13 h-13 border border-gray-400 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <p className="text-black text-sm">능이버섯</p>
            <p className="text-gray-500 text-xs">@im_neung_e</p>
            <p className="text-black font-bold text-base">
              안녕하세요! 저는 송이버섯이에요
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
