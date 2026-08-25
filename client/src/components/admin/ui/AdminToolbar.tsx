import React from 'react';
import { Pencil, Trash2, Eye, GripVertical } from 'lucide-react';

interface AdminToolbarProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onPreview?: () => void;
  hasDragHandle?: boolean;
  dragHandleProps?: any;
  className?: string;
}

export const AdminToolbar = ({
  onEdit,
  onDelete,
  onPreview,
  hasDragHandle = false,
  dragHandleProps,
  className = '',
}: AdminToolbarProps) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-[#F7F3EC] border border-[#7A5848]/20 shadow-lg p-1.5 rounded-full ${className}`}
      style={{ borderRadius: '9999px' }}
      onClick={(e) => e.stopPropagation()} // Prevent card click trigger
    >
      {hasDragHandle && (
        <div
          {...dragHandleProps}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A5848]/50 hover:text-[#7A5848] transition-colors cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={14} />
        </div>
      )}

      {onPreview && (
        <button
          onClick={onPreview}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A5848] hover:bg-[#E8DCCB]/30 hover:text-[#355C4A] transition-all cursor-pointer"
          title="Preview"
        >
          <Eye size={14} />
        </button>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A5848] hover:bg-[#E8DCCB]/30 hover:text-[#355C4A] transition-all cursor-pointer"
          title="Edit"
        >
          <Pencil size={14} />
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="w-8 h-8 rounded-full flex items-center justify-center text-red-600 hover:bg-red-500/10 transition-all cursor-pointer"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
};
