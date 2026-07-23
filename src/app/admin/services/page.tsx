"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Tag, ClipboardList } from 'lucide-react';
import { useServices } from './hooks';
import { ServiceItem, NewServiceItem } from './types';
import { validateService, ValidationError } from './validation';

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
import { AdminUpload } from '@/components/admin/ui/AdminUpload';

export default function ServicesAdminPage() {
  const { items, isLoading, createItem, updateItem, deleteItem } = useServices();

  // Drawer Form States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState('');
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
    setFormTitle('');
    setFormDesc('');
    setFormPrice('');
    setFormImageUrl('');
    setFormPublicId('');
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (item: ServiceItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setFormPrice(item.price || '');
    setFormImageUrl(item.imageUrl);
    setFormPublicId(item.publicId || '');
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const resolvedOrder = editingItem ? editingItem.displayOrder : items.length + 1;

    const payload: Partial<NewServiceItem> = {
      title: formTitle,
      description: formDesc,
      price: formPrice,
      imageUrl: formImageUrl,
      publicId: formPublicId,
      displayOrder: resolvedOrder,
    };

    const errors = validateService(payload);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateItem(editingItem.id, payload);
      } else {
        await createItem(payload as NewServiceItem);
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
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-[#7A5848]/10">
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-black text-[#2D2D2D] tracking-wide">
            Services & Packages
          </h2>
          <p className="text-xs text-[#7A5848]/75 font-sans mt-0.5">
            Configure photo session categories, coverage lengths, and investments.
          </p>
        </div>
        <AdminButton
          variant="primary"
          onClick={handleOpenAddDrawer}
          className="flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus size={16} /> Add Service
        </AdminButton>
      </div>

      {/* Loading Skeleton */}
      {isLoading && items.length === 0 ? (
        <AdminSkeleton type="card" count={3} />
      ) : sortedItems.length === 0 ? (
        <AdminCard radius="md" hoverLift={false} className="py-12 bg-[#F2EDE2]/40">
          <AdminEmptyState
            type="services"
            title="No Services Yet"
            description="Start listing your creative offerings, print packages, or editorial campaigns."
            actionLabel="Create Service"
            onAction={handleOpenAddDrawer}
          />
        </AdminCard>
      ) : (
        /* Grid Layout */
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
                className="h-full border border-[#7A5848]/15 bg-[#F7F3EC] flex flex-col p-5 group relative"
              >
                
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden bg-[#E8DCCB] mb-5">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  {item.price && (
                    <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                      <span className="text-[10px] font-sans font-black bg-[#FAF6EE] text-[#7A5848] border border-[#7A5848]/25 px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-widest">
                        <Tag size={10} /> {item.price}
                      </span>
                    </div>
                  )}

                  {/* Toolbar - on hover */}
                  <div className="absolute inset-0 bg-[#2D2D2D]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <AdminToolbar
                      onEdit={() => handleOpenEditDrawer(item)}
                      onDelete={() => handleOpenDeleteDialog(item.id)}
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 px-1">
                  <h3 className="text-xl font-serif font-black text-[#2D2D2D] tracking-wide mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-[#7A5848]/75 leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-[#7A5848]/10 mt-auto">
                    <AdminBadge variant="primary">
                      Index: {item.displayOrder}
                    </AdminBadge>
                  </div>
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
        title={editingItem ? 'Edit Service Details' : 'New Service Package'}
      >
        <form onSubmit={handleSaveForm} className="flex flex-col gap-4">
          
          <div className="mb-4">
            <label className="text-[10px] font-sans font-bold tracking-wider text-[#7A5848] uppercase ml-1 block mb-2 text-center">
              Service Cover Image
            </label>
            <AdminUpload
              value={formImageUrl}
              onChange={(url, pubId) => {
                setFormImageUrl(url);
                setFormPublicId(pubId);
                setFormErrors((prev) => ({ ...prev, imageUrl: undefined }));
              }}
              onRemove={() => {
                setFormImageUrl('');
                setFormPublicId('');
              }}
              error={formErrors.imageUrl}
            />
          </div>

          <AdminInput
            label="Service Title"
            value={formTitle}
            onChange={(e) => {
              setFormTitle(e.target.value);
              setFormErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="e.g. Creative Portrait Session"
            error={formErrors.title}
          />

          <AdminInput
            label="Price / Investment (Optional)"
            value={formPrice}
            onChange={(e) => setFormPrice(e.target.value)}
            placeholder="e.g. $850 or Custom Quote"
          />

          <AdminTextarea
            label="Description"
            value={formDesc}
            onChange={(e) => {
              setFormDesc(e.target.value);
              setFormErrors((prev) => ({ ...prev, description: undefined }));
            }}
            placeholder="e.g. A dedicated shoot at location of choice. Includes styling consultation..."
            error={formErrors.description}
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
              {editingItem ? 'Save Service' : 'Add Service'}
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
        title="Delete Service Package?"
        description="Are you sure you want to delete this service package? The pricing details and description will be permanently removed."
        confirmText="Confirm Delete"
      />
    </div>
  );
}
