import React from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface AdminFilterProps {
  options: FilterOption[];
  activeValue: string;
  onChange: (val: string) => void;
  className?: string;
}

export const AdminFilter = ({
  options,
  activeValue,
  onChange,
  className = '',
}: AdminFilterProps) => {
  return (
    <div className={`flex flex-wrap gap-2.5 items-center ${className}`}>
      {options.map((opt) => {
        const isActive = activeValue === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-5 py-2.5 text-[10px] font-sans font-bold tracking-wider uppercase rounded-full transition-all duration-300 border select-none cursor-pointer ${
              isActive
                ? 'bg-[#355C4A] text-[#F7F3EC] border-[#355C4A]'
                : 'bg-transparent text-[#7A5848] border-[#7A5848]/20 hover:bg-[#E8DCCB]/20'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
