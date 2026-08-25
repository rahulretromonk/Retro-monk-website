"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, StarOff, Quote, MessageSquare } from 'lucide-react';
import { useTestimonials } from './hooks';
import { TestimonialItem, NewTestimonialItem } from './types';
import { validateTestimonial, ValidationError } from './validation';

// Admin UI Components
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { AdminDrawer } from '@/components/admin/ui/AdminDrawer';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminTextarea } from '@/components/admin/ui/AdminTextarea';
import { AdminSelect } from '@/components/admin/ui/AdminSelect';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminDialog } from '@/components/admin/ui/AdminDialog';
import { AdminToolbar } from '@/components/admin/ui/AdminToolbar';
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState';
import { AdminSkeleton } from '@/components/admin/ui/AdminSkeleton';
import { AdminUpload } from '@/components/admin/ui/AdminUpload';

const RATING_OPTIONS = [
  { value: 5, label: '5 Stars (Excellent)' },
  { value: 4, label: '4 Stars (Very Good)' },
  { value: 3, label: '3 Stars (Good)' },
  { value: 2, label: '2 Stars (Fair)' },
  { value: 1, label: '1 Star (Poor)' },
];

export default function TestimonialsAdminPage() {
  const { items, isLoading, createItem, updateItem, deleteItem } = useTestimonials();

  // Drawer Form States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  const [formName, setFormName] = useState('');
  const [formReview, setFormReview] = useState('');
  const [formRating, setFormRating] = useState('5');
  const [formEvent, setFormEvent] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formPublicId, setFormPublicId] = useState('');
  const [formErrors, setFormErrors] = useState<ValidationError>({});

  // Deletion Dialog States
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Submitting States
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ACTIONS ---
  const handleOpenAddDrawer = () => {
    setEditingItem(null);
    setFormName('');
    setFormReview('');
    setFormRating('5');
    setFormEvent('');
    setFormImageUrl('');
    setFormPublicId('');
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormName(item.clientName);
    setFormReview(item.review);
    setFormRating(item.rating.toString());
    setFormEvent(item.eventType);
    setFormImageUrl(item.imageUrl || '');
    setFormPublicId(item.publicId || '');
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedOrder = editingItem ? editingItem.displayOrder : items.length + 1;

    const payload: Partial<NewTestimonialItem> = {
      clientName: formName,
      review: formReview,
      rating: Number(formRating) || 5,
      eventType: formEvent,
      imageUrl: formImageUrl || undefined,
      publicId: formPublicId || undefined,
      displayOrder: resolvedOrder,
    };

    const errors = validateTestimonial(payload);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateItem(editingItem.id, payload);
      } else {
        await createItem(payload as NewTestimonialItem);
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

  // Render Stars helper
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => (
          i < rating ? <Star key={i} size={13} fill="currentColor" /> : <StarOff key={i} size={13} />
        ))}
      </div>
    );
  };

  const sortedItems = [...items].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-[#7A5848]/10">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#2D2D2D] tracking-wide">
            Client Testimonials
          </h2>
          <p className="text-xs text-[#7A5848]/75 font-sans mt-0.5">
            Manage feedback quotes, ratings, and avatars from past weddings and sessions.
          </p>
        </div>
        <AdminButton
          variant="primary"
          onClick={handleOpenAddDrawer}
          className="flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus size={16} /> Add Testimonial
        </AdminButton>
      </div>

      {/* Loading Skeleton */}
      {isLoading && items.length === 0 ? (
        <AdminSkeleton type="card" count={3} />
      ) : sortedItems.length === 0 ? (
        <AdminCard radius="md" hoverLift={false} className="py-12 bg-[#F2EDE2]/40">
          <AdminEmptyState
            type="testimonials"
            title="No Testimonials"
            description="Display quotes of appreciation from couples and clients you have documented."
            actionLabel="Add Review"
            onAction={handleOpenAddDrawer}
          />
        </AdminCard>
      ) : (
        /* Testimonials Card Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <AdminCard
                radius="md"
                hoverLift={true}
                className="h-full border border-[#7A5848]/15 bg-[#F7F3EC] p-6 flex flex-col justify-between group relative"
              >
                {/* Quote Icon Background decoration */}
                <div className="absolute top-6 right-6 text-[#7A5848]/10 pointer-events-none">
                  <Quote size={40} />
                </div>

                {/* Edit Tools - Appear on hover */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AdminToolbar
                    onEdit={() => handleOpenEditDrawer(item)}
                    onDelete={() => handleOpenDeleteDialog(item.id)}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  {/* Client Avatar, Name & Stars */}
                  <div className="flex items-center gap-4 mb-5 border-b border-[#7A5848]/5 pb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-[#7A5848]/20 flex items-center justify-center shrink-0 border border-[#7A5848]/10">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.clientName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm font-sans font-bold text-[#7A5848]">
                          {item.clientName.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-serif font-black text-[#2D2D2D] tracking-wide">
                        {item.clientName}
                      </h3>
                      {renderStars(item.rating)}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs font-sans text-[#7A5848]/80 leading-relaxed italic mb-6">
                    &ldquo;{item.review}&rdquo;
                  </p>
                </div>

                {/* Event Type & Display Order Badge Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#7A5848]/10 mt-auto">
                  <AdminBadge variant="secondary">
                    {item.eventType}
                  </AdminBadge>
                  <AdminBadge variant="neutral">
                    Order: {item.displayOrder}
                  </AdminBadge>
                </div>

              </AdminCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Drawer */}
      <AdminDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingItem ? 'Edit Testimonial' : 'New Testimonial'}
      >
        <form onSubmit={handleSaveForm} className="flex flex-col gap-4">
          
          {/* Avatar Upload */}
          <div className="mb-4">
            <label className="text-[10px] font-sans font-bold tracking-wider text-[#7A5848] uppercase ml-1 block mb-2 text-center">
              Client Photo Avatar
            </label>
            <AdminUpload
              value={formImageUrl}
              onChange={(url, pubId) => {
                setFormImageUrl(url);
                setFormPublicId(pubId);
              }}
              onRemove={() => {
                setFormImageUrl('');
                setFormPublicId('');
              }}
            />
          </div>

          <AdminInput
            label="Client Name"
            value={formName}
            onChange={(e) => {
              setFormName(e.target.value);
              setFormErrors((prev) => ({ ...prev, clientName: undefined }));
            }}
            placeholder="e.g. Amara & Julian"
            error={formErrors.clientName}
          />

          <div className="grid grid-cols-2 gap-4">
            <AdminSelect
              label="Rating Score"
              options={RATING_OPTIONS}
              value={formRating}
              onChange={(e) => setFormRating(e.target.value)}
              error={formErrors.rating}
            />

            <AdminInput
              label="Event Type"
              value={formEvent}
              onChange={(e) => {
                setFormEvent(e.target.value);
                setFormErrors((prev) => ({ ...prev, eventType: undefined }));
              }}
              placeholder="e.g. Wedding, Outdoors"
              error={formErrors.eventType}
            />
          </div>

          <AdminTextarea
            label="Client Review Feedback"
            value={formReview}
            onChange={(e) => {
              setFormReview(e.target.value);
              setFormErrors((prev) => ({ ...prev, review: undefined }));
            }}
            placeholder="e.g. Working with them was an absolute dream..."
            error={formErrors.review}
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
              {editingItem ? 'Save Review' : 'Create Review'}
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
        title="Delete Testimonial Review?"
        description="Are you sure you want to delete this testimonial? The client's review and avatar will be permanently removed."
        confirmText="Confirm Delete"
      />
    </div>
  );
}
