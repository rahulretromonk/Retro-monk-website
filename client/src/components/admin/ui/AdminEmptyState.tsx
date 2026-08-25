import React from 'react';
import { AdminButton } from './AdminButton';
import { Camera, Clipboard, MessageSquare, HelpCircle, Mail } from 'lucide-react';

interface AdminEmptyStateProps {
  type: 'portfolio' | 'services' | 'testimonials' | 'faq' | 'inquiries';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const AdminEmptyState = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
}: AdminEmptyStateProps) => {
  
  // Custom SVG Retro Illustrations
  const renderIllustration = () => {
    const iconBase = "w-16 h-16 text-[#7A5848] opacity-60";
    
    switch (type) {
      case 'portfolio':
        return (
          <div className="relative w-36 h-36 flex items-center justify-center bg-[#E8DCCB]/30 rounded-full mb-6">
            <svg className="w-20 h-20 text-[#7A5848]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
              {/* Retro Camera */}
              <rect x="20" y="35" width="60" height="42" rx="6" />
              <path d="M35 35 V28 H65 V35" />
              <circle cx="50" cy="56" r="16" />
              <circle cx="50" cy="56" r="8" />
              <circle cx="72" cy="45" r="3" fill="currentColor" />
            </svg>
          </div>
        );
      case 'services':
        return (
          <div className="relative w-36 h-36 flex items-center justify-center bg-[#E8DCCB]/30 rounded-full mb-6">
            <svg className="w-20 h-20 text-[#7A5848]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
              {/* Vintage Easel/Tag */}
              <path d="M50 15 L20 75 H80 Z" />
              <path d="M50 15 V75" />
              <line x1="10" y1="75" x2="90" y2="75" />
              <rect x="38" y="35" width="24" height="18" rx="2" />
            </svg>
          </div>
        );
      case 'testimonials':
        return (
          <div className="relative w-36 h-36 flex items-center justify-center bg-[#E8DCCB]/30 rounded-full mb-6">
            <svg className="w-20 h-20 text-[#7A5848]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
              {/* Quote marks */}
              <circle cx="35" cy="45" r="12" />
              <circle cx="65" cy="45" r="12" />
              <path d="M35 45 C35 60 25 70 15 75" />
              <path d="M65 45 C65 60 55 70 45 75" />
            </svg>
          </div>
        );
      case 'faq':
        return (
          <div className="relative w-36 h-36 flex items-center justify-center bg-[#E8DCCB]/30 rounded-full mb-6">
            <svg className="w-20 h-20 text-[#7A5848]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
              {/* Question bubble */}
              <path d="M20 50 C20 30 35 20 50 20 C65 20 80 30 80 50 C80 65 68 75 50 75 C45 75 40 77 35 82 C34 83 32 82 32 80 V73 C20 68 20 58 20 50 Z" />
              <circle cx="50" cy="60" r="2" fill="currentColor" />
              <path d="M50 50 C50 43 55 42 55 38 C55 35 52 33 50 33 C47 33 45 35 45 38" />
            </svg>
          </div>
        );
      case 'inquiries':
        return (
          <div className="relative w-36 h-36 flex items-center justify-center bg-[#E8DCCB]/30 rounded-full mb-6">
            <svg className="w-20 h-20 text-[#7A5848]/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
              {/* Mailbox / Envelope */}
              <rect x="20" y="30" width="60" height="40" rx="4" />
              <path d="M20 30 L50 52 L80 30" />
              <path d="M50 52 V78 H40" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center">
      {renderIllustration()}
      
      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2D2D2D] mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-xs font-sans text-[#7A5848]/70 max-w-sm mb-8 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <AdminButton variant="primary" onClick={onAction}>
          {actionLabel}
        </AdminButton>
      )}
    </div>
  );
};
