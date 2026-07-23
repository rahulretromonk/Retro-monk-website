import React from 'react';

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 mb-4">
        {label && (
          <label className="text-[10px] font-sans font-bold tracking-wider text-[#7A5848] uppercase ml-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={4}
          className={`w-full bg-[#F7F3EC] border border-[#7A5848]/20 rounded-[20px] px-5 py-4 text-xs font-sans text-[#2D2D2D] placeholder-[#7A5848]/40 focus:outline-none focus:border-[#355C4A] focus:ring-1 focus:ring-[#355C4A] transition-all resize-none disabled:opacity-50 ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-[10px] text-red-600 font-medium ml-2 mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

AdminTextarea.displayName = 'AdminTextarea';
