'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export default function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : products.slice(0, 4); // Show top trending/curated when empty

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal/60 backdrop-blur-sm transition-all animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-soft-beige flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-soft-beige">
          <Search className="w-5 h-5 text-muted-grey shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, essentials..."
            className="w-full text-base sm:text-lg text-charcoal placeholder:text-muted-grey/60 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-muted-grey hover:text-charcoal transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-muted-grey hover:text-charcoal px-2.5 py-1.5 rounded-lg hover:bg-soft-sand transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-soft-beige/60">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-grey mb-3 px-2">
            {query.trim() ? `Search Results (${filtered.length})` : 'Popular Searches & Discoveries'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-grey">
              <p className="text-sm">No products found matching &ldquo;{query}&rdquo;.</p>
              <p className="text-xs mt-1">Try searching for leather, coffee, desk, or linen.</p>
            </div>
          ) : (
            filtered.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between p-3 rounded-2xl hover:bg-soft-sand/70 transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-soft-beige shrink-0">
                    <Image
                      src={product.primaryImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-muted-grey font-medium">
                      {product.category}
                    </span>
                    <h4 className="font-serif font-medium text-sm sm:text-base text-charcoal group-hover:text-accent-gold transition-colors truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-semibold text-charcoal">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-muted-grey group-hover:text-charcoal shrink-0 ml-3">
                  <span className="hidden sm:inline">View</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-soft-sand/50 px-6 py-3 border-t border-soft-beige text-xs text-muted-grey flex items-center justify-between">
          <span>NHK Curated Product Search</span>
          <Link
            href="/explore"
            onClick={onClose}
            className="text-charcoal font-medium hover:text-accent-gold transition-colors underline"
          >
            Explore all products
          </Link>
        </div>
      </div>
    </div>
  );
}

