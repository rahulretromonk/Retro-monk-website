"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, Image as ImageIcon, Camera } from 'lucide-react';
import { usePortfolio } from './hooks';
import { PortfolioItem, NewPortfolioItem } from './types';
import { validatePortfolio, ValidationError } from './validation';

// Admin UI Components
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { AdminDrawer } from '@/components/admin/ui/AdminDrawer';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminTextarea } from '@/components/admin/ui/AdminTextarea';
import { AdminSelect } from '@/components/admin/ui/AdminSelect';
import { AdminBadge } from '@/components/admin/ui/AdminBadge';
import { AdminDialog } from '@/components/admin/ui/AdminDialog';
import { AdminSearch } from '@/components/admin/ui/AdminSearch';
import { AdminFilter } from '@/components/admin/ui/AdminFilter';
import { AdminToolbar } from '@/components/admin/ui/AdminToolbar';
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState';
import { AdminSkeleton } from '@/components/admin/ui/AdminSkeleton';
import { AdminUpload } from '@/components/admin/ui/AdminUpload';

const CATEGORIES = [
  { value: 'ALL', label: 'All' },
  { value: 'WEDDING', label: 'Wedding' },
  { value: 'OUTDOOR', label: 'Outdoor' },
  { value: 'PORTRAIT', label: 'Portrait' },
  { value: 'BIRTHDAY', label: 'Birthday' },
  { value: 'COMMERCIAL', label: 'Commercial' },
  { value: 'PERSONAL', label: 'Personal' },
];

const POSITION_OPTIONS = [
  { value: 'left', label: 'Left Aligned' },
  { value: 'right', label: 'Right Aligned' },
  { value: 'center', label: 'Center Aligned' },
];

export default function PortfolioAdminPage() {
  const { items, isLoading, createItem, updateItem, deleteItem } = usePortfolio();

  // Search, Filter, Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('displayOrder'); // displayOrder | title | newest

  // Drawer Form States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('PORTRAIT');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formPublicId, setFormPublicId] = useState('');
  const [formPosition, setFormPosition] = useState('left');
  const [formErrors, setFormErrors] = useState<ValidationError>({});

  // Deletion Dialog States
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Submitting States
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preview Dialog (Modal or local view)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  // --- FILTERING AND SORTING ---
  const filteredItems = items
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        activeCategory === 'ALL' || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // default: displayOrder
      return (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0);
    });

  // --- ACTIONS ---
  const handleOpenAddDrawer = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormDesc('');
    setFormCategory('PORTRAIT');
    setFormImageUrl('');
    setFormPublicId('');
    setFormPosition('left');
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setFormCategory(item.category);
    setFormImageUrl(item.imageUrl);
    setFormPublicId(item.publicId || '');
    setFormPosition(item.imagePosition || 'left');
    setFormErrors({});
    setIsDrawerOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const catCount = items.filter(item => item.category === formCategory).length;
    const resolvedOrder = editingItem 
      ? (editingItem.category === formCategory ? editingItem.displayOrder : catCount + 1)
      : (catCount + 1);

    const payload: Partial<NewPortfolioItem> = {
      title: formTitle,
      description: formDesc,
      category: formCategory,
      imageUrl: formImageUrl,
      publicId: formPublicId,
      imagePosition: formPosition,
      displayOrder: resolvedOrder,
    };

    const errors = validatePortfolio(payload);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateItem(editingItem.id, payload);
      } else {
        await createItem(payload as NewPortfolioItem);
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

  const getCategoryLabel = (catVal: string) => {
    return CATEGORIES.find(c => c.value === catVal)?.label || catVal;
  };

  return (
    <div className="w-full">
      
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-[#7A5848]/10">
        <div className="flex-1 flex flex-col md:flex-row gap-4 max-w-3xl">
          <AdminSearch 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search portfolio items..."
            className="md:w-72"
          />
          <div className="w-full sm:w-48">
            <AdminSelect
              options={[
                { value: 'displayOrder', label: 'Sort by: Order' },
                { value: 'title', label: 'Sort by: Title' },
                { value: 'newest', label: 'Sort by: Newest' },
              ]}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mb-0!"
            />
          </div>
        </div>

        <AdminButton 
          variant="primary" 
          onClick={handleOpenAddDrawer}
          className="flex items-center gap-2 cursor-pointer shrink-0 self-start lg:self-auto"
        >
          <Plus size={16} /> Add Portfolio
        </AdminButton>
      </div>

      {/* Category Horizontal Filter Bar */}
      <AdminFilter 
        options={CATEGORIES}
        activeValue={activeCategory}
        onChange={setActiveCategory}
        className="mb-8"
      />

      {/* Loader / Content */}
      {isLoading && items.length === 0 ? (
        <AdminSkeleton type="card" count={3} />
      ) : filteredItems.length === 0 ? (
        <AdminCard radius="md" hoverLift={false} className="py-12 bg-[#F2EDE2]/40">
          <AdminEmptyState
            type="portfolio"
            title="No Portfolio Yet"
            description="Start curating your digital darkroom gallery by adding your premium high-end photography assets here."
            actionLabel="Add First Item"
            onAction={handleOpenAddDrawer}
          />
        </AdminCard>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 w-full">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="break-inside-avoid w-full group relative rounded-[32px] overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <AdminCard radius="md" hoverLift={true} className="h-full border border-[#7A5848]/15 bg-[#F7F3EC] flex flex-col p-5">
                
                {/* Image Container with Hover reveal */}
                <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-[#E8DCCB] mb-5">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Category Pill Overlays */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider bg-[#F7F3EC]/90 text-[#355C4A] border border-[#355C4A]/20 px-3 py-1 rounded-full shadow-sm">
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>

                  {/* Toolbar overlay: only appears on hover */}
                  <div className="absolute inset-0 bg-[#2D2D2D]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <AdminToolbar
                      onPreview={() => setPreviewImageUrl(item.imageUrl)}
                      onEdit={() => handleOpenEditDrawer(item)}
                      onDelete={() => handleOpenDeleteDialog(item.id)}
                      hasDragHandle={false}
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col flex-1 px-1">
                  <h3 className="text-xl font-serif font-black text-[#2D2D2D] tracking-wide mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-[#7A5848]/75 leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Badges footer */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[#7A5848]/10 mt-auto">
                    <AdminBadge variant="secondary">
                      Pos: {item.imagePosition}
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
        title={editingItem ? 'Edit Portfolio Item' : 'New Portfolio Item'}
      >
        <form onSubmit={handleSaveForm} className="flex flex-col gap-4">
          
          {/* Circular Upload Area */}
          <div className="mb-4">
            <label className="text-[10px] font-sans font-bold tracking-wider text-[#7A5848] uppercase ml-1 block mb-2 text-center">
              Item Image Preview
            </label>
            <AdminUpload
              value={formImageUrl}
              onChange={(url, pubId) => {
                setFormImageUrl(url);
                setFormPublicId(pubId);
                setFormErrors(prev => ({ ...prev, imageUrl: undefined }));
              }}
              onRemove={() => {
                setFormImageUrl('');
                setFormPublicId('');
              }}
              error={formErrors.imageUrl}
            />
          </div>

          <AdminInput
            label="Title"
            value={formTitle}
            onChange={(e) => {
              setFormTitle(e.target.value);
              setFormErrors(prev => ({ ...prev, title: undefined }));
            }}
            placeholder="e.g. Venetian Silk Collection"
            error={formErrors.title}
          />

          <AdminTextarea
            label="Description"
            value={formDesc}
            onChange={(e) => {
              setFormDesc(e.target.value);
              setFormErrors(prev => ({ ...prev, description: undefined }));
            }}
            placeholder="e.g. Curate a portrait exploration..."
            error={formErrors.description}
          />

          <div className="grid grid-cols-2 gap-4">
            <AdminSelect
              label="Category"
              options={CATEGORIES.filter(c => c.value !== 'ALL')}
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              error={formErrors.category}
            />
            
            <AdminSelect
              label="Image Position"
              options={POSITION_OPTIONS}
              value={formPosition}
              onChange={(e) => setFormPosition(e.target.value)}
              error={formErrors.imagePosition}
            />
          </div>

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
              {editingItem ? 'Save Changes' : 'Create Item'}
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
        title="Delete Portfolio Item?"
        description="Are you absolutely sure you want to delete this portfolio item? This action will permanently remove the item record and cannot be undone."
        confirmText="Confirm Delete"
      />

      {/* Image Preview Overlay Modal */}
      <AnimatePresence>
        {previewImageUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImageUrl(null)}
              className="fixed inset-0 bg-[#2D2D2D]"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center z-50"
            >
              <img
                src={previewImageUrl}
                alt="Full Preview"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="absolute top-4 right-4 bg-black/40 text-white rounded-full p-2.5 hover:bg-black/60 transition-all cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
