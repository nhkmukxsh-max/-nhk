'use client';

import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface MasonryGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function MasonryGrid({
  products,
  columns = 3,
  className = '',
}: MasonryGridProps) {
  // Distribute items into column arrays for pure CSS/Flex masonry layout
  const colCount = columns;
  const colArrays: Product[][] = Array.from({ length: colCount }, () => []);

  products.forEach((product, index) => {
    colArrays[index % colCount].push(product);
  });

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className}`}>
      {colArrays.map((columnProducts, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-6">
          {columnProducts.map((product, pIdx) => {
            // Alternate aspect ratio subtly for organic Pinterest feel
            const isTall = (colIdx + pIdx) % 2 === 1;
            return (
              <ProductCard
                key={product.id}
                product={product}
                aspectRatio={isTall ? 'portrait' : 'natural'}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

