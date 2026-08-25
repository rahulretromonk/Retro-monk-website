export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  publicId: string;
  imagePosition: string;
  displayOrder: number;
  createdAt: string;
}

export type NewPortfolioItem = Omit<PortfolioItem, 'id' | 'createdAt'>;
