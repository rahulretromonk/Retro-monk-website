import { NewPortfolioItem } from './types';

export interface ValidationError {
  title?: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  imagePosition?: string;
  displayOrder?: string;
}

export function validatePortfolio(item: Partial<NewPortfolioItem>): ValidationError {
  const errors: ValidationError = {};

  if (!item.title?.trim()) {
    errors.title = 'Title is required';
  } else if (item.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!item.description?.trim()) {
    errors.description = 'Description is required';
  }

  if (!item.category) {
    errors.category = 'Category selection is required';
  }

  if (!item.imageUrl) {
    errors.imageUrl = 'An image is required. Please upload one.';
  }

  if (!item.imagePosition) {
    errors.imagePosition = 'Image position layout is required';
  }

  if (item.displayOrder !== undefined) {
    const val = Number(item.displayOrder);
    if (isNaN(val) || val < 1) {
      errors.displayOrder = 'Display order must be a positive integer';
    }
  }

  return errors;
}
