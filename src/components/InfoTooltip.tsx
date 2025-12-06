import { useState } from 'react';
import { clsx } from 'clsx';

interface InfoTooltipProps {
  content: string;
}

const InfoTooltip = ({ content }: InfoTooltipProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        className="tooltip-icon"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
        role="button"
        aria-label="További információ"
      >
        ⓘ
      </span>
      <div
        className={clsx(
          'absolute z-10 w-64 rounded-md bg-gray-800 p-3 text-xs text-white shadow-lg transition-opacity duration-200',
          'dark:bg-gray-700',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        style={{ left: '50%', transform: 'translateX(-50%)', top: '125%' }}
      >
        {content}
      </div>
    </div>
  );
};

export default InfoTooltip;
