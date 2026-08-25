export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  createdAt: string;
}

export type NewFAQItem = Omit<FAQItem, 'id' | 'createdAt'>;
