export interface TestimonialItem {
  id: string;
  clientName: string;
  review: string;
  rating: number; // 1-5 stars
  eventType: string; // e.g. Wedding, Portrait
  imageUrl?: string;
  publicId?: string;
  displayOrder: number;
  createdAt: string;
}

export type NewTestimonialItem = Omit<TestimonialItem, 'id' | 'createdAt'>;
