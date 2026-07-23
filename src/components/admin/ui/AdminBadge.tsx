import React from 'react';

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'info';
  className?: string;
}

export const AdminBadge = ({
  children,
  variant = 'primary',
  className = '',
}: AdminBadgeProps) => {
  const baseStyle = 'inline-flex items-center justify-center font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border';

  const variants = {
    primary: 'bg-[#355C4A]/10 text-[#355C4A] border-[#355C4A]/25',
    secondary: 'bg-[#7A5848]/10 text-[#7A5848] border-[#7A5848]/25',
    neutral: 'bg-[#2D2D2D]/5 text-[#2D2D2D]/70 border-[#2D2D2D]/15',
    success: 'bg-[#355C4A]/15 text-[#355C4A] border-[#355C4A]/30',
    warning: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
