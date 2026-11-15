import fs from 'fs';
import path from 'path';
import { Product, ProductCategory } from '@/types';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'products.json');

export function getServerProducts(): Product[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        return parsed as Product[];
      }
    }
  } catch (error) {
    console.error('Error reading products.json from server:', error);
  }
  return [];
}

export function saveServerProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing products.json from server:', error);
    return false;
  }
}

export function getAllProducts(): Product[] {
  return getServerProducts();
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getServerProducts();
  return products.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(category: ProductCategory | string): Product[] {
  const products = getServerProducts();
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedProducts(): Product[] {
  const products = getServerProducts();
  return products.filter((p) => p.isFeatured);
}

export function getTrendingProducts(): Product[] {
  const products = getServerProducts();
  return products.filter((p) => p.isTrending);
}

export function getEditorsPicks(): Product[] {
  const products = getServerProducts();
  return products.filter((p) => p.isEditorsPick);
}

export function getRelatedProducts(currentId: string, category?: string, limit: number = 3): Product[] {
  const products = getServerProducts();
  return products
    .filter((p) => p.id !== currentId && (!category || p.category === category))
    .slice(0, limit);
}
