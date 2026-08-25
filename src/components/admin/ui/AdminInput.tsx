import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
  ({ label, error, className = '', type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';

    return (
      <div className="w-full flex flex-col gap-1.5 mb-4">
        {label && (
          <label className="text-[10px] font-sans font-bold tracking-wider text-[#7A5848] uppercase ml-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPasswordType && showPassword ? 'text' : type}
            className={`w-full bg-[#F7F3EC] border border-[#7A5848]/20 rounded-full px-5 py-3 ${isPasswordType ? 'pr-12' : ''} text-xs font-sans text-[#2D2D2D] placeholder-[#7A5848]/40 focus:outline-none focus:border-[#355C4A] focus:ring-1 focus:ring-[#355C4A] transition-all disabled:opacity-50 ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            } ${className}`}
            {...props}
          />
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A5848]/50 hover:text-[#7A5848] transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && (
          <span className="text-[10px] text-red-600 font-medium ml-2 mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

AdminInput.displayName = 'AdminInput';

