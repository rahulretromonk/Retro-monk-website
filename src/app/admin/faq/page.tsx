"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, ChevronUp, HelpCircle, GripVertical } from 'lucide-react';
import { useFAQs } from './hooks';
import { FAQItem, NewFAQItem } from './types';
import { validateFAQ, ValidationError } from './validation';

// Admin UI Components
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { AdminDrawer } from '@/components/admin/ui/AdminDrawer';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminTextarea } from '@/components/admin/ui/AdminTextarea';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminDialog } from '@/components/admin/ui/AdminDialog';
import { AdminToolbar } from '@/components/admin/ui/AdminToolbar';
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState';
import { AdminSkeleton } from '@/components/admin/ui/AdminSkeleton';

export default function FAQAdminPage() {
  const { items, isLoading, createItem, updateItem, deleteItem } = useFAQs();

  // Accordion Toggle States
  const [expandedFAQId, setExpandedFAQId] = useState<string | null>(null);

  // Drawer Form States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);

  const [formQuestion, setFormQuestion] = useState('');
  const [formAnswer, setFormAnswer] = useState('');
  const [formErrors, setFormErrors] = useState<ValidationError>({});

  // Deletion Dialog States
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Submitting States
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAccordion = (id: string) => {
    if (expandedFAQId === id) {
      setExpandedFAQId(null);
    } else {
      setExpandedFAQId(id);
    }
  };

  // --- ACTIONS ---
  const handleOpenAddDrawer = () => {
    setEditingItem(null);
    setFormQuestion('');
    setFormAnswer('');
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (item: FAQItem) => {
    setEditingItem(item);
    setFormQuestion(item.question);
    setFormAnswer(item.answer);
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedOrder = editingItem ? editingItem.displayOrder : items.length + 1;

    const payload: Partial<NewFAQItem> = {
      question: formQuestion,
      answer: formAnswer,
      displayOrder: resolvedOrder,
    };

    const errors = validateFAQ(payload);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateItem(editingItem.id, payload);
      } else {
        await createItem(payload as NewFAQItem);
      }
      setIsDrawerOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDeleteDialog = (id: string) => {
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

  const sortedItems = [...items].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-[#7A5848]/10">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#2D2D2D] tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#7A5848]/75 font-sans mt-0.5">
            Manage help guidelines, workflow policies, and delivery expectations.
          </p>
        </div>
        <AdminButton
          variant="primary"
          onClick={handleOpenAddDrawer}
          className="flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus size={16} /> Add FAQ
        </AdminButton>
      </div>

      {/* Loading Skeleton */}
      {isLoading && items.length === 0 ? (
        <AdminSkeleton type="list" count={4} />
      ) : sortedItems.length === 0 ? (
        <AdminCard radius="md" hoverLift={false} className="py-12 bg-[#F2EDE2]/40">
          <AdminEmptyState
            type="faq"
            title="No FAQs Yet"
            description="Create questions and answers to educate visitors on booking procedures and timelines."
            actionLabel="Add FAQ"
            onAction={handleOpenAddDrawer}
          />
        </AdminCard>
      ) : (
        /* FAQ Accordion Layout */
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {sortedItems.map((item, index) => {
            const isExpanded = expandedFAQId === item.id;
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
                    isExpanded ? 'ring-1 ring-[#355C4A]/30 border-[#355C4A]/30 shadow-md' : ''
                  }`}
                >
                  <div className="flex items-center justify-between p-4 group">
                    <div 
                      onClick={() => toggleAccordion(item.id)}
                      className="flex-1 flex items-center gap-4 cursor-pointer select-none"
                    >
                      {/* Drag handle placeholder / visual decoration */}
                      <div className="text-[#7A5848]/30 group-hover:text-[#7A5848]/60 cursor-grab transition-colors">
                        <GripVertical size={14} />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E8DCCB]/30 flex items-center justify-center text-[#7A5848]">
                          <HelpCircle size={14} />
                        </div>
                        <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-[#2D2D2D]">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Badges and actions */}
                      <div className="hidden sm:flex items-center gap-2 pr-2">
                        <AdminBadge variant="neutral">
                          Order: {item.displayOrder}
                        </AdminBadge>
                      </div>

                      {/* Accordion expand toggle */}
                      <button 
                        onClick={() => toggleAccordion(item.id)}
                        className="p-1 text-[#7A5848]/60 hover:text-[#355C4A] cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {/* Toolbar */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <AdminToolbar
                          onEdit={() => handleOpenEditDrawer(item)}
                          onDelete={() => handleOpenDeleteDialog(item.id)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-14 pb-5 pt-1 text-xs font-sans text-[#7A5848]/85 leading-relaxed border-t border-[#7A5848]/5 mt-2">
                          {item.answer}
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

      {/* Add / Edit Drawer */}
      <AdminDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingItem ? 'Edit FAQ Item' : 'New FAQ Item'}
      >
        <form onSubmit={handleSaveForm} className="flex flex-col gap-4">
          
          <AdminInput
            label="FAQ Question"
            value={formQuestion}
            onChange={(e) => {
              setFormQuestion(e.target.value);
              setFormErrors((prev) => ({ ...prev, question: undefined }));
            }}
            placeholder="e.g. What is your turnaround time?"
            error={formErrors.question}
          />

          <AdminTextarea
            label="FAQ Answer"
            value={formAnswer}
            onChange={(e) => {
              setFormAnswer(e.target.value);
              setFormErrors((prev) => ({ ...prev, answer: undefined }));
            }}
            placeholder="e.g. Standard turnaround is 3 weeks for portrait galleries..."
            error={formErrors.answer}
          />

          {/* Display Order resolved automatically */}

          <div className="flex gap-4 mt-6 pt-4 border-t border-[#7A5848]/10">
            <AdminButton
              type="button"
              variant="outline"
              onClick={() => setIsDrawerOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </AdminButton>
            <AdminButton
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="flex-1"
            >
              {editingItem ? 'Save FAQ' : 'Create FAQ'}
            </AdminButton>
          </div>

        </form>
      </AdminDrawer>

      {/* Delete Confirmation Dialog */}
      <AdminDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        isConfirming={isDeleting}
        title="Delete FAQ?"
        description="Are you sure you want to delete this FAQ? The question and answer will be permanently removed."
        confirmText="Confirm Delete"
      />
    </div>
  );
}
