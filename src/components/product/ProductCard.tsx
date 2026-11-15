'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import PinterestShareButton from './PinterestShareButton';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  aspectRatio?: 'portrait' | 'square' | 'natural';
  showCategory?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  priority = false,
  aspectRatio = 'portrait',
  showCategory = true,
  className = '',
}: ProductCardProps) {
  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-[4/5]';

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden border border-soft-beige/70 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 flex flex-col ${className}`}
    >
      {/* Product Image Container */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-soft-sand`}>
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Pinterest Pin Button Overlay (Top Right) */}
        <div className="absolute top-3 right-3 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
          <PinterestShareButton
            media={product.pinterestImage || product.primaryImage}
            description={product.tagline || product.name}
            title={product.name}
            variant="icon"
          />
        </div>

        {/* Badges Overlay (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isEditorsPick && (
            <span className="bg-charcoal text-white text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Editor&apos;s Pick
            </span>
          )}
          {product.isTrending && !product.isEditorsPick && (
            <span className="bg-accent-terracotta text-white text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Trending
            </span>
          )}
        </div>

        {/* Quick View Affiliate CTA on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-white/95 hover:bg-charcoal hover:text-white text-charcoal text-xs font-semibold rounded-xl shadow-md backdrop-blur-sm transition-colors duration-200"
          >
            <span>View on {product.merchant.split('/')[0].trim()}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {showCategory && (
            <div className="flex items-center justify-between text-xs text-muted-grey mb-1.5">
              <span className="font-medium uppercase tracking-wider text-[10px]">
                {product.category}
              </span>
              <span className="text-[11px] text-muted-grey/80 truncate max-w-[120px]">
                {product.merchant.split('/')[0].trim()}
              </span>
            </div>
          )}

          <h3 className="font-serif font-medium text-base text-charcoal leading-snug group-hover:text-accent-gold transition-colors line-clamp-2">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-xs text-muted-grey mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="mt-4 pt-3 border-t border-soft-beige/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-charcoal text-base">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-grey/70 line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal hover:text-accent-gold transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

