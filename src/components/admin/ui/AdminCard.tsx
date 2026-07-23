"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  radius?: 'sm' | 'md' | 'lg'; // sm: 24px, md: 32px, lg: 40px
  hoverLift?: boolean;
  onClick?: () => void;
}

export const AdminCard = ({
  children,
  className = '',
  radius = 'md',
  hoverLift = true,
  onClick,
}: AdminCardProps) => {
  const roundedClass = {
    sm: 'rounded-[24px]',
    md: 'rounded-[32px]',
    lg: 'rounded-[40px]',
  }[radius];

  const content = (
    <div
      onClick={onClick}
      className={`bg-[#F7F3EC] border border-[#7A5848]/10 shadow-sm hover:shadow-md overflow-hidden ${roundedClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );

  if (hoverLift) {
    return (
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
