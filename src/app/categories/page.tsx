import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getServerProducts } from '@/lib/products.server';
import ProductCard from '@/components/product/ProductCard';

export const revalidate = 0;

export const metadata = {
  title: 'Curated Categories — NHK',
  description: 'Explore NHK collections across Fashion, Technology, Home Sanctuary, Beauty Botanicals, and Everyday Carry.',
};

export default function CategoriesPage() {
  const allProducts = getServerProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-sand text-charcoal text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5 text-accent-gold" />
          Thematic Curations
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium">
          Explore by Category
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-grey leading-relaxed">
          Navigate our editorial recommendations by department. Each collection is vetted for material integrity, aesthetic balance, and real everyday utility.
        </p>
      </div>

      {/* Categories Sections */}
      <div className="space-y-20">
        {CATEGORIES.map((cat, idx) => {
          const categoryProducts = allProducts.filter((p) => p.category === cat.name);

          return (
            <section
              key={cat.id}
              className="pt-10 border-t border-soft-beige first:border-t-0 first:pt-0"
            >
              {/* Category Header Card */}
              <div className="relative rounded-3xl overflow-hidden bg-soft-sand mb-8 border border-soft-beige">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                  <div className="p-8 sm:p-10 md:col-span-2 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
                      Collection #{idx + 1}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
                      {cat.name}
                    </h2>
                    <p className="text-sm text-charcoal/80 max-w-lg leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="pt-3">
                      <Link
                        href={`/explore?category=${encodeURIComponent(cat.name)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-charcoal hover:bg-black text-white text-xs font-medium transition-colors"
                      >
                        <span>Explore Collection ({categoryProducts.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative h-48 md:h-full min-h-[200px] w-full">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Products in this category */}
              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.slice(0, 3).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 text-center border border-soft-beige/70 text-xs text-muted-grey">
                  <span>Curations arriving soon for this collection. Follow our Pinterest for aesthetic previews.</span>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
