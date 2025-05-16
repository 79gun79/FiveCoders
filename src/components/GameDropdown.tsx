import { ReactNode, useEffect, useRef, useState } from 'react';
import { FaSteam, FaDiscord } from 'react-icons/fa6';
import dnfLogo from '../assets/dnf-small.png';

type ServiceCode = 'steam' | 'discord' | 'dnf';
const ICONS: Record<ServiceCode, ReactNode> = {
  steam: <FaSteam className="mr-2 h-5 w-5 text-[#2a475e]" />,
  discord: <FaDiscord className="mr-2 h-5 w-5 text-[#5865F2]" />,
  dnf: <img src={dnfLogo} alt="dnf" className="mr-1 h-6 w-6" />,
};

interface GameDropdownProps {
  value: '' | ServiceCode;
  onChange: (code: ServiceCode) => void;
}

const SERVICES: { code: ServiceCode; label: string }[] = [
  { code: 'steam', label: 'Steam' },
  { code: 'discord', label: 'Discord' },
  { code: 'dnf', label: '던전앤파이터' },
];

export default function GameDropdown({ value, onChange }: GameDropdownProps) {
  const [open, setOpen] = useState(false);
  const selected: { code: ServiceCode; label: string } =
    SERVICES.find((s) => s.code === value) || SERVICES[0];
  const ref = useRef<HTMLDivElement>(null);

  //외부 클릭 시 드롭다운 닫음
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative w-[230px]" ref={ref}>
      <button
        type="button"
        className="flex h-[40px] w-full cursor-pointer items-center justify-between rounded-lg border border-[var(--color-gray5)] bg-[var(--color-bg-white)] px-4 py-2 transition hover:bg-[var(--color-gray2)]"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="flex items-center">
          {ICONS[selected.code]}
          <span className="ml-1 font-medium">{selected.label}</span>
        </span>
        <svg
          className="ml-2 h-4 w-4 text-[var(--color-gray6)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-10 mt-1 w-full rounded-lg border border-[var(--color-gray5)] bg-[var(--color-bg-white)]">
          <ul className="py-2">
            {SERVICES.map((service) => (
              <li key={service.code}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center px-4 py-2 text-sm text-[var(--color-text-black)] hover:bg-[var(--color-gray2)]"
                  onClick={() => {
                    onChange(service.code);
                    setOpen(false);
                  }}
                >
                  {ICONS[service.code]}
                  <span className="ml-1">{service.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
