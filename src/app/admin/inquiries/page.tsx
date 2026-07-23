"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Trash2,
  Check,
  Edit2
} from 'lucide-react';
import { useInquiries } from './hooks';
import { InquiryItem } from './types';

// Admin UI Components
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminDialog } from '@/components/admin/ui/AdminDialog';
import { AdminTextarea } from '@/components/admin/ui/AdminTextarea';
import { AdminSelect } from '@/components/admin/ui/AdminSelect';
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState';
import { AdminSkeleton } from '@/components/admin/ui/AdminSkeleton';

const STATUS_FILTER_OPTIONS = [
  { value: 'ALL', label: 'All Inquiries' },
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'responded', label: 'Responded' },
];

const STATUS_SELECT_OPTIONS = [
  { value: 'pending', label: 'Pending Response' },
  { value: 'reviewed', label: 'Reviewed / Under Verification' },
  { value: 'responded', label: 'Responded to Client' },
];

export default function InquiriesAdminPage() {
  const { items, isLoading, updateItem, deleteItem } = useInquiries();

  // Accordion and status update states
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  // Working states for editing notes & status inside expanded view
  const [noteState, setNoteState] = useState('');
  const [statusState, setStatusState] = useState<'pending' | 'reviewed' | 'responded'>('pending');
  const [savingId, setSavingId] = useState<string | null>(null);

  // Deletion Dialog States
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleExpand = (item: InquiryItem) => {
    if (expandedId === item.id) {
      setExpandedId(null);
    } else {
      setExpandedId(item.id);
      setNoteState(item.adminNotes || '');
      setStatusState(item.status);
    }
  };

  const handleSaveInquiryDetails = async (id: string) => {
    setSavingId(id);
    try {
      await updateItem(id, {
        status: statusState,
        adminNotes: noteState,
      });
      setExpandedId(null); // Collapse on success
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  const handleOpenDeleteDialog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteItem(deletingId);
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'responded':
        return <AdminBadge variant="success">Responded</AdminBadge>;
      case 'reviewed':
        return <AdminBadge variant="warning">Reviewed</AdminBadge>;
      case 'pending':
      default:
        return <AdminBadge variant="secondary">Pending</AdminBadge>;
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const filteredInquiries = items.filter((item) => {
    if (activeFilter === 'ALL') return true;
    return item.status === activeFilter;
  });

  return (
    <div className="w-full">
      {/* Header & Horizontal Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-[#7A5848]/10">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#2D2D2D] tracking-wide">
            Inquiries Inbox
          </h2>
          <p className="text-xs text-[#7A5848]/75 font-sans mt-0.5">
            Review client booking inquiries, manage responses, and record private session notes.
          </p>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-4 py-2 text-[10px] font-sans font-bold tracking-wider uppercase rounded-full transition-all border cursor-pointer ${
                activeFilter === opt.value
                  ? 'bg-[#355C4A] text-[#FAF6EE] border-[#355C4A]'
                  : 'bg-transparent text-[#7A5848] border-[#7A5848]/20 hover:bg-[#E8DCCB]/25'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loader / Content */}
      {isLoading && items.length === 0 ? (
        <AdminSkeleton type="list" count={4} />
      ) : filteredInquiries.length === 0 ? (
        <AdminCard radius="md" hoverLift={false} className="py-12 bg-[#F2EDE2]/40">
          <AdminEmptyState
            type="inquiries"
            title="Inbox is Empty"
            description="No client booking requests match your active category folder filter."
          />
        </AdminCard>
      ) : (
        /* Inbox list */
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {filteredInquiries.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
              >
                <AdminCard
                  radius="sm"
                  hoverLift={false}
                  className={`border border-[#7A5848]/10 bg-[#F7F3EC] p-1 transition-all ${
                    isExpanded ? 'ring-1 ring-[#355C4A]/30 border-[#355C4A]/30 shadow-md' : 'hover:border-[#7A5848]/25'
                  }`}
                >
                  {/* Collapsed Inquiry Summary Row */}
                  <div 
                    onClick={() => toggleExpand(item)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start gap-4">
                      {/* Circle Letter Emblem */}
                      <div className="w-11 h-11 rounded-full bg-[#E8DCCB] text-[#7A5848] flex items-center justify-center font-bold text-xs shrink-0 border border-[#7A5848]/15 uppercase">
                        {item.clientName.substring(0, 2)}
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-sm font-sans font-bold text-[#2D2D2D] leading-tight">
                          {item.clientName}
                        </h3>
                        <span className="text-[10px] font-sans text-[#7A5848]/70 mt-1 flex items-center gap-1.5 flex-wrap">
                          <span className="flex items-center gap-0.5"><Mail size={10} /> {item.email}</span>
                          {item.phone && <span className="flex items-center gap-0.5"><Phone size={10} /> {item.phone}</span>}
                        </span>
                      </div>
                    </div>

                    {/* Right column details */}
                    <div className="flex items-center justify-between sm:justify-end gap-5">
                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(item.status)}
                        <span className="text-[9px] font-sans text-[#7A5848]/60 mt-1 flex items-center gap-1">
                          <Clock size={9} /> {formatDate(item.submittedDate)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Delete Trash Button */}
                        <button
                          onClick={(e) => handleOpenDeleteDialog(item.id, e)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A5848]/40 hover:text-red-600 hover:bg-red-500/10 transition-all cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                        
                        {/* Expand Icon */}
                        <div className="text-[#7A5848]/60">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-[#7A5848]/5 mt-2 flex flex-col gap-6">
                          
                          {/* Event Details Section */}
                          <div className="bg-[#FAF9F5] border border-[#7A5848]/5 p-4 rounded-[20px]">
                            <h4 className="text-[9px] font-sans font-black uppercase tracking-wider text-[#355C4A] mb-2 flex items-center gap-1">
                              <Calendar size={11} /> Booking Details ({item.eventType})
                            </h4>
                            <p className="text-xs font-sans text-[#2D2D2D] leading-relaxed whitespace-pre-wrap">
                              {item.eventDetails}
                            </p>
                          </div>

                          {/* Admin Response Manager Form */}
                          <div className="flex flex-col gap-4 border-t border-[#7A5848]/5 pt-4">
                            <h4 className="text-[9px] font-sans font-black uppercase tracking-wider text-[#7A5848] mb-1 flex items-center gap-1.5">
                              <Edit2 size={11} /> Admin Response Coordinator
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                              <div className="md:col-span-2">
                                <AdminTextarea
                                  label="Private Admin Notes"
                                  value={noteState}
                                  onChange={(e) => setNoteState(e.target.value)}
                                  placeholder="Record calls, pricing quotes sent, or schedule updates..."
                                  className="mb-0!"
                                />
                              </div>
                              
                              <div className="flex flex-col gap-4 h-full justify-between">
                                <AdminSelect
                                  label="Inquiry Status"
                                  options={STATUS_SELECT_OPTIONS}
                                  value={statusState}
                                  onChange={(e) => setStatusState(e.target.value as any)}
                                  className="mb-0!"
                                />
                                
                                <AdminButton
                                  variant="primary"
                                  onClick={() => handleSaveInquiryDetails(item.id)}
                                  isLoading={savingId === item.id}
                                  className="w-full flex items-center justify-center gap-1.5 mt-2"
                                >
                                  <Check size={13} /> Save Inquiry
                                </AdminButton>
                              </div>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AdminCard>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AdminDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isConfirming={isDeleting}
        title="Delete Booking Inquiry?"
        description="Are you sure you want to delete this client inquiry? The email details and booking records will be permanently removed."
        confirmText="Confirm Delete"
      />
    </div>
  );
}
