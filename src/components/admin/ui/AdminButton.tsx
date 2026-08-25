import React from 'react';

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const AdminButton = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: AdminButtonProps) => {
  const baseStyle = 'inline-flex items-center justify-center font-sans font-semibold uppercase tracking-widest transition-all duration-300 rounded-full select-none focus:outline-none focus:ring-2 focus:ring-[#7A5848]/30 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary: 'bg-[#355C4A] text-[#F7F3EC] hover:bg-[#2b4c3c] hover:shadow-md hover:-translate-y-0.5',
    secondary: 'bg-[#7A5848] text-[#F7F3EC] hover:bg-[#684a3d] hover:shadow-md hover:-translate-y-0.5',
    outline: 'bg-transparent border border-[#7A5848]/30 text-[#7A5848] hover:bg-[#E8DCCB]/25 hover:border-[#7A5848]/55',
    ghost: 'bg-transparent text-[#7A5848] hover:bg-[#E8DCCB]/20',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'text-[10px] px-5 py-2.5 gap-1.5',
    md: 'text-xs px-7 py-3.5 gap-2',
    lg: 'text-sm px-9 py-4 gap-2.5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};
