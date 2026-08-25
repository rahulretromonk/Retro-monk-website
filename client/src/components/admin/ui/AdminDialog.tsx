"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { AdminButton } from './AdminButton';

interface AdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  isConfirming?: boolean;
}

export const AdminDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Delete',
  isConfirming = false,
}: AdminDialogProps) => {
  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2D2D2D] z-50"
          />

          {/* Dialog Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#F7F3EC] border border-[#7A5848]/20 shadow-2xl p-6 md:p-8 w-full max-w-md text-center flex flex-col items-center"
              style={{ borderRadius: '32px' }}
            >
              {/* Alert Icon */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-500/10 text-red-600 mb-6 shrink-0">
                <AlertTriangle size={28} />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl md:text-2xl font-serif text-[#2D2D2D] font-bold mb-3">
                {title}
              </h3>
              <p className="text-xs font-sans text-[#7A5848]/80 leading-relaxed mb-8 max-w-sm">
                {description}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <AdminButton
                  variant="outline"
                  onClick={onClose}
                  disabled={isConfirming}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </AdminButton>
                <AdminButton
                  variant="danger"
                  onClick={onConfirm}
                  isLoading={isConfirming}
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <Trash2 size={14} /> {confirmText}
                </AdminButton>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
