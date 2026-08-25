import { NewTestimonialItem } from './types';

export interface ValidationError {
  clientName?: string;
  review?: string;
  rating?: string;
  eventType?: string;
  displayOrder?: string;
}

export function validateTestimonial(item: Partial<NewTestimonialItem>): ValidationError {
  const errors: ValidationError = {};

  if (!item.clientName?.trim()) {
    errors.clientName = 'Client name is required';
  }

  if (!item.review?.trim()) {
    errors.review = 'Review feedback description is required';
  }

  if (item.rating === undefined || item.rating < 1 || item.rating > 5) {
    errors.rating = 'Rating must be an integer between 1 and 5 stars';
  }

  if (!item.eventType?.trim()) {
    errors.eventType = 'Event or shoot type is required';
  }

  if (item.displayOrder !== undefined) {
    const val = Number(item.displayOrder);
    if (isNaN(val) || val < 1) {
      errors.displayOrder = 'Display order must be a positive integer';
    }
  }

  return errors;
}
