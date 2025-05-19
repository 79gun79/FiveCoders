import Neople from '../assets/기술표기_세로형_color.png';

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-end justify-center bg-[var(--color-gray2)] px-30 py-5">
        <span className="absolute left-30">&copy;Gemmue</span>
        <a href="http://developers.neople.co.kr" target="_blank">
          <img src={Neople} alt="Neople 오픈 API" />
        </a>
      </div>
    </>
  );
}
