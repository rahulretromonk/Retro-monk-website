import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const AdminSelect = React.forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 mb-4">
        {label && (
          <label className="text-[10px] font-sans font-bold tracking-wider text-[#7A5848] uppercase ml-1">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            className={`w-full bg-[#F7F3EC] border border-[#7A5848]/20 rounded-full px-5 py-3.5 text-xs font-sans text-[#2D2D2D] appearance-none focus:outline-none focus:border-[#355C4A] focus:ring-1 focus:ring-[#355C4A] transition-all disabled:opacity-50 cursor-pointer ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5 text-[#7A5848]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
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

AdminSelect.displayName = 'AdminSelect';
