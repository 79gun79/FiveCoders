type GameCardProps = {
  imgSrc: string;
  link: string;
};

export default function GameNewsCard({ imgSrc, link }: GameCardProps) {
  return (
    <div
      className="h-[335px] w-[960px] cursor-pointer overflow-hidden rounded-[10px]"
      //클릭 시 새 창에서 열기
      onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
    >
      <img src={imgSrc} alt="newsImg" className="w-full" />
    </div>
  );
}
