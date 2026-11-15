'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, SlidersHorizontal, LayoutGrid, Columns, X, Plus } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import ProductCard from '@/components/product/ProductCard';
import MasonryGrid from '@/components/product/MasonryGrid';
import AffiliateDisclosureBanner from '@/components/ui/AffiliateDisclosureBanner';
import { Product } from '@/types';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSort = searchParams.get('sort') || 'trending';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');

  // Load products from API dynamically
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error('Error fetching products in explore:', err))
      .finally(() => setLoading(false));
  }, []);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTagline = p.tagline?.toLowerCase().includes(q);
          const matchCategory = p.category?.toLowerCase().includes(q);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchTagline && !matchCategory && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'price-low') {
          return a.price - b.price;
        }
        if (selectedSort === 'price-high') {
          return b.price - a.price;
        }
        if (selectedSort === 'editors') {
          return (b.isEditorsPick ? 1 : 0) - (a.isEditorsPick ? 1 : 0);
        }
        if (selectedSort === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // Default: trending first
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, selectedSort]);

  const categoriesList = ['All', ...CATEGORIES.map((c) => c.name)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
            Product Discovery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium mt-1">
            Explore Curated Finds
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-grey leading-relaxed">
            Filter through design objects, everyday companions, and Pinterest finds. Every item features verified prices and direct affiliate source links.
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-charcoal hover:bg-black text-white text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-accent-gold" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search & Control Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-soft-beige shadow-editorial mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-grey absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, materials, or brands..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-soft-sand/60 border border-soft-beige text-charcoal text-sm placeholder:text-muted-grey/60 focus:outline-none focus:ring-2 focus:ring-charcoal/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-grey hover:text-charcoal p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & View Mode Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Sort Select */}
            <div className="relative flex items-center gap-2 text-xs font-medium text-charcoal">
              <SlidersHorizontal className="w-3.5 h-3.5 text-muted-grey" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-soft-sand/60 border border-soft-beige rounded-full px-3.5 py-2.5 text-xs text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-charcoal/20 cursor-pointer"
              >
                <option value="trending">Sort: Trending First</option>
                <option value="editors">Sort: Editor&apos;s Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Sort: Newest First</option>
              </select>
            </div>

            {/* Layout Toggle (Grid vs Masonry) */}
            <div className="flex items-center bg-soft-sand/60 border border-soft-beige rounded-full p-1">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'masonry'
                    ? 'bg-white text-charcoal shadow-sm'
                    : 'text-muted-grey hover:text-charcoal'
                }`}
                title="Pinterest Masonry View"
                aria-label="Pinterest Masonry View"
              >
                <Columns className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-charcoal shadow-sm'
                    : 'text-muted-grey hover:text-charcoal'
                }`}
                title="Standard Grid View"
                aria-label="Standard Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-soft-beige/60">
          {categoriesList.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'bg-soft-sand/60 hover:bg-soft-beige text-charcoal border border-soft-beige'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-grey mb-6">
        <span>
          Showing <strong className="text-charcoal">{filteredProducts.length}</strong> items
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(selectedCategory !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-accent-terracotta hover:underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Products Display */}
      {loading ? (
        <div className="py-16 text-center text-xs text-muted-grey">
          Loading curated catalog...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-soft-beige shadow-editorial space-y-4">
          <p className="font-serif text-xl text-charcoal font-medium">No products found</p>
          <p className="text-sm text-muted-grey max-w-md mx-auto">
            {products.length === 0
              ? 'Your catalog is ready for products! Add your first product and affiliate link using the button below.'
              : 'We couldn’t find anything matching your current filters.'}
          </p>
          <div className="pt-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal text-white text-xs font-medium hover:bg-black transition-colors"
            >
              <Plus className="w-4 h-4 text-accent-gold" />
              <span>+ Add Product & Affiliate Link</span>
            </Link>
          </div>
        </div>
      ) : viewMode === 'masonry' ? (
        <MasonryGrid products={filteredProducts} columns={3} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Mid-page Disclosure */}
      <div className="mt-16">
        <AffiliateDisclosureBanner variant="compact" />
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-muted-grey">Loading curated catalog...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
