'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PinterestShareButton from '@/components/product/PinterestShareButton';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeImage = images[selectedIdx] || images[0];

  return (
    <div className="space-y-4">
      {/* Active Featured Image (Pinterest-friendly 3:4 portrait aspect ratio) */}
      <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-soft-sand border border-soft-beige shadow-editorial">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* Pinterest Pin Action Overlay */}
        <div className="absolute top-4 right-4 z-10">
          <PinterestShareButton
            media={activeImage}
            description={productName}
            title={productName}
            variant="badge"
          />
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-20 h-24 rounded-xl overflow-hidden bg-soft-sand shrink-0 border-2 transition-all ${
                selectedIdx === idx
                  ? 'border-charcoal shadow-sm scale-[0.98]'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

