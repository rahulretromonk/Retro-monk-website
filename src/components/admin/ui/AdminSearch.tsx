import React from 'react';
import { Search } from 'lucide-react';

interface AdminSearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const AdminSearch = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: AdminSearchProps) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#F7F3EC] border border-[#7A5848]/20 rounded-full pl-12 pr-6 py-3.5 text-xs font-sans text-[#2D2D2D] placeholder-[#7A5848]/40 focus:outline-none focus:border-[#355C4A] focus:ring-1 focus:ring-[#355C4A] transition-all"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 text-[#7A5848]/55 pointer-events-none">
        <Search size={16} />
      </div>
    </div>
  );
};
