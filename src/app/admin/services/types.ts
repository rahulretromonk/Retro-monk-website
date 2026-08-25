export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publicId: string;
  displayOrder: number;
  createdAt: string;
}

export type NewServiceItem = Omit<ServiceItem, 'id' | 'createdAt'>;
