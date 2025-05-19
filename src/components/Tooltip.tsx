import { useState } from 'react';
import '../css/index.css'; // 스타일링 파일
import { GoQuestion } from 'react-icons/go';

export default function Tooltip({ content }: Tooltip) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper relative ml-2 flex h-5 w-5 items-center justify-center p-0.5 text-center text-[15px]"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <GoQuestion className="h-5 w-5 text-[val(--color-gary7)]" />
      {isVisible && <div className="tooltip-content">{content}</div>}
    </div>
  );
}
