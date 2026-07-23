import { NewInquiryItem } from './types';

export interface ValidationError {
  clientName?: string;
  email?: string;
  eventType?: string;
  eventDetails?: string;
}

export function validateInquiry(item: Partial<NewInquiryItem>): ValidationError {
  const errors: ValidationError = {};

  if (!item.clientName?.trim()) {
    errors.clientName = 'Client name is required';
  }

  if (!item.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!item.eventType?.trim()) {
    errors.eventType = 'Event or shoot type is required';
  }

  if (!item.eventDetails?.trim()) {
    errors.eventDetails = 'Event details description is required';
  }

  return errors;
}
