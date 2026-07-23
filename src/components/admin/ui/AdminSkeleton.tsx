import React from 'react';

interface AdminSkeletonProps {
  type?: 'card' | 'list' | 'analytics';
  count?: number;
}

export const AdminSkeleton = ({
  type = 'card',
  count = 3,
}: AdminSkeletonProps) => {
  const shimmerClass = 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent';

  const renderSkeleton = () => {
    switch (type) {
      case 'analytics':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full mb-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`bg-[#F7F3EC]/50 border border-[#7A5848]/5 rounded-[32px] p-6 flex flex-col justify-between h-36 ${shimmerClass}`}
              >
                <div className="flex justify-between items-start">
                  <div className="h-4 w-12 bg-[#7A5848]/10 rounded-full" />
                  <div className="w-9 h-9 rounded-full bg-[#7A5848]/10" />
                </div>
                <div className="h-8 w-20 bg-[#7A5848]/15 rounded-full mb-1" />
                <div className="h-3 w-16 bg-[#7A5848]/10 rounded-full" />
              </div>
            ))}
          </div>
        );
      case 'list':
        return (
          <div className="flex flex-col gap-4 w-full">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={`bg-[#F7F3EC]/50 border border-[#7A5848]/5 rounded-[24px] p-5 flex items-center justify-between gap-4 ${shimmerClass}`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#7A5848]/15 shrink-0" />
                  <div className="flex flex-col gap-2 flex-1 max-w-md">
                    <div className="h-4 w-1/3 bg-[#7A5848]/15 rounded-full" />
                    <div className="h-3 w-3/4 bg-[#7A5848]/10 rounded-full" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-[#7A5848]/10 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        );
      case 'card':
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={`bg-[#F7F3EC]/50 border border-[#7A5848]/5 rounded-[32px] p-5 flex flex-col gap-4 ${shimmerClass}`}
              >
                <div className="w-full aspect-[4/3] rounded-[20px] bg-[#7A5848]/10" />
                <div className="flex flex-col gap-2">
                  <div className="h-5 w-2/3 bg-[#7A5848]/15 rounded-full" />
                  <div className="h-3 w-full bg-[#7A5848]/10 rounded-full" />
                  <div className="h-3 w-5/6 bg-[#7A5848]/10 rounded-full" />
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#7A5848]/5">
                  <div className="h-5 w-16 bg-[#7A5848]/10 rounded-full" />
                  <div className="h-5 w-12 bg-[#7A5848]/10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
      {renderSkeleton()}
    </>
  );
};
