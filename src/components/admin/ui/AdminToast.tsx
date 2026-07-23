"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-[#F7F3EC] border border-[#7A5848]/20 shadow-xl rounded-2xl p-4 flex items-start gap-3 text-sm"
              style={{ borderRadius: '20px' }}
            >
              {t.type === 'success' && (
                <div className="bg-[#355C4A]/10 p-2 rounded-full text-[#355C4A] shrink-0">
                  <CheckCircle size={18} />
                </div>
              )}
              {t.type === 'error' && (
                <div className="bg-red-500/10 p-2 rounded-full text-red-600 shrink-0">
                  <AlertCircle size={18} />
                </div>
              )}
              {t.type === 'info' && (
                <div className="bg-[#7A5848]/10 p-2 rounded-full text-[#7A5848] shrink-0">
                  <Info size={18} />
                </div>
              )}
              <div className="flex-1 pt-1 font-sans text-[#2D2D2D] font-medium leading-tight">
                {t.message}
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                className="text-[#7A5848]/40 hover:text-[#7A5848] transition-colors shrink-0 pt-1"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
