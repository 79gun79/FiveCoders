import Neople from '../assets/neople.png';
import robo1 from '../assets/robo/robo1.png';
import robo2 from '../assets/robo/robo2.png';
import robo3 from '../assets/robo/robo3.png';
import robo4 from '../assets/robo/robo4.png';
import robo5 from '../assets/robo/robo5.png';
import bubble from '../assets/pixel-speech-bubble.svg';

export default function Footer() {
  return (
    <div className="flex h-[80px] items-center justify-between bg-[var(--color-gray2)] px-12">
      <span className="font-semibold">&copy; Gemmue</span>
      <div
        className="mt-8 flex cursor-pointer"
        onClick={() =>
          window.open('https://github.com/79gun79/FiveCoders', '_blank')
        }
      >
        <div className="flex items-center gap-4">
          <img
            src={robo1}
            alt="robot1"
            className="h-7 w-7 transition-all duration-300 hover:-translate-y-3"
          />
          <img
            src={robo3}
            alt="robot3"
            className="h-7 w-7 transition-all duration-300 hover:-translate-y-3"
          />
          <img
            src={robo2}
            alt="robot2"
            className="h-7 w-7 transition-all duration-300 hover:-translate-y-3"
          />
          <img
            src={robo4}
            alt="robot4"
            className="h-7 w-7 transition-all duration-300 hover:-translate-y-3"
          />
          <img
            src={robo5}
            alt="robot5"
            className="h-7 w-7 transition-all duration-300 hover:-translate-y-3"
          />
        </div>
        <img
          src={bubble}
          alt="bubble"
          className="mb-10 w-[100px] transition-transform duration-300 hover:scale-110"
        />
      </div>

      <a
        href="http://developers.neople.co.kr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Neople} alt="Neople 오픈 API" className="h-7" />
      </a>
    </div>
  );
}
