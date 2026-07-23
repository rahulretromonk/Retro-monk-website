import { NewServiceItem } from './types';

export interface ValidationError {
  title?: string;
  description?: string;
  imageUrl?: string;
  displayOrder?: string;
}

export function validateService(item: Partial<NewServiceItem>): ValidationError {
  const errors: ValidationError = {};

  if (!item.title?.trim()) {
    errors.title = 'Service title is required';
  }

  if (!item.description?.trim()) {
    errors.description = 'Service description is required';
  }

  if (!item.imageUrl) {
    errors.imageUrl = 'Service cover image is required';
  }

  if (item.displayOrder !== undefined) {
    const val = Number(item.displayOrder);
    if (isNaN(val) || val < 1) {
      errors.displayOrder = 'Display order must be a positive integer';
    }
  }

  return errors;
}
