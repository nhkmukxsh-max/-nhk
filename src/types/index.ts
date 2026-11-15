export type ProductCategory = 
  | 'Fashion & Accessories'
  | 'Tech & Gadgets'
  | 'Home & Living'
  | 'Beauty & Lifestyle'
  | 'Everyday Essentials';

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  price: number; // Current verified price
  originalPrice?: number; // Verified previous/retail price
  currency?: string; // Default 'USD'
  affiliateUrl: string;
  merchant: string; // e.g. Amazon, Nordstrom, Direct, etc.
  primaryImage: string;
  secondaryImages?: string[];
  pinterestImage?: string; // High quality 2:3 vertical aspect ratio image
  tags: string[];
  features: string[];
  pros: string[];
  considerations: string[];
  isEditorsPick?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  editorialNote?: string;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  slug: string;
  description: string;
  image: string;
  featuredCount?: number;
}

