import { Product, ProductCategory } from '@/types';
import productsData from '@/data/products.json';

// In-memory or bundled data safe for client components and SSR
export function getAllProducts(): Product[] {
  return (productsData as unknown as Product[]) || [];
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(category: ProductCategory | string): Product[] {
  const products = getAllProducts();
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedProducts(): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isFeatured);
}

export function getTrendingProducts(): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isTrending);
}

export function getEditorsPicks(): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isEditorsPick);
}

export function getRelatedProducts(currentId: string, category?: string, limit: number = 3): Product[] {
  const products = getAllProducts();
  return products
    .filter((p) => p.id !== currentId && (!category || p.category === category))
    .slice(0, limit);
}
