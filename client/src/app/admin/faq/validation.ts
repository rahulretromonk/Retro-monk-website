import { NewFAQItem } from './types';

export interface ValidationError {
  question?: string;
  answer?: string;
  displayOrder?: string;
}

export function validateFAQ(item: Partial<NewFAQItem>): ValidationError {
  const errors: ValidationError = {};

  if (!item.question?.trim()) {
    errors.question = 'Question is required';
  } else if (item.question.length < 5) {
    errors.question = 'Question must be at least 5 characters';
  }

  if (!item.answer?.trim()) {
    errors.answer = 'Answer explanation is required';
  }

  if (item.displayOrder !== undefined) {
    const val = Number(item.displayOrder);
    if (isNaN(val) || val < 1) {
      errors.displayOrder = 'Display order must be a positive integer';
    }
  }

  return errors;
}
