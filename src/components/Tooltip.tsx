import { useState } from 'react';
import '../css/index.css'; // 스타일링 파일

export default function Tooltip({ children, content }: Tooltip) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper ml-2 flex h-4 w-4 items-center justify-center rounded-full border-1 text-center text-[15px]"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className="tooltip-content">{content}</div>}
    </div>
  );
}
