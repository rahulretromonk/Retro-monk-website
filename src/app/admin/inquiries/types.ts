export interface InquiryItem {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  eventType: string; // e.g. Wedding, portrait, commercial
  status: 'pending' | 'reviewed' | 'responded';
  submittedDate: string;
  eventDetails: string;
  adminNotes?: string;
  createdAt: string;
}

export type NewInquiryItem = Omit<InquiryItem, 'id' | 'status' | 'submittedDate' | 'createdAt'>;
