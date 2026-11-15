import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Compass, ShieldCheck, CheckCircle, Plus } from 'lucide-react';
import { getServerProducts } from '@/lib/products.server';
import { CATEGORIES } from '@/data/categories';
import ProductCard from '@/components/product/ProductCard';
import MasonryGrid from '@/components/product/MasonryGrid';
import Newsletter from '@/components/ui/Newsletter';
import AffiliateDisclosureBanner from '@/components/ui/AffiliateDisclosureBanner';

export const revalidate = 0; // Dynamic revalidation on product addition

export default function HomePage() {
  const allProducts = getServerProducts();
  const featuredProducts = allProducts.filter((p) => p.isFeatured);
  const trendingProducts = allProducts.filter((p) => p.isTrending);
  const editorsPicks = allProducts.filter((p) => p.isEditorsPick);

  const pinterestUrl = "https://in.pinterest.com/mukeshparihar7838/";

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden bg-soft-beige">
        {/* Background Lifestyle Image with Editorial Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop"
            alt="NHK curated lifestyle collection backdrop"
            fill
            priority
            className="object-cover object-center filter brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-white/95 via-warm-white/85 to-warm-white/60 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-white via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-soft-beige text-charcoal text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
              Editorial Product Discovery
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-medium leading-[1.12] tracking-tight">
              Find Your Next <br />
              <span className="italic font-normal">Favorite Thing.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-xl">
              Discover thoughtfully curated products, trending finds, and everyday essentials. Tested for lasting craftsmanship, aesthetic balance, and quiet elegance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-charcoal hover:bg-black text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/90 hover:bg-white text-charcoal text-sm font-medium border border-soft-beige shadow-sm transition-all duration-200"
              >
                <Compass className="w-4 h-4 text-accent-gold" />
                <span>Browse Categories</span>
              </Link>
            </div>

            {/* Trust Micro-Badges */}
            <div className="mt-10 pt-6 border-t border-soft-beige/80 flex flex-wrap items-center gap-6 text-xs text-charcoal/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent-gold" />
                <span>Verified Pricing & Direct Retailers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-accent-gold" />
                <span>Honest Editorial Curation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* 2. TRENDING COLLECTIONS (Visual Category Cards) */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                Curated Departments
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mt-1">
                Trending Collections
              </h2>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-accent-gold transition-colors"
            >
              <span>View all categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/explore?category=${encodeURIComponent(category.name)}`}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-editorial hover:shadow-editorial-hover transition-all duration-300 block"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl">
                  <h3 className="font-serif font-medium text-sm text-charcoal leading-tight">
                    {category.name}
                  </h3>
                  <span className="text-[10px] text-muted-grey mt-0.5 block truncate">
                    Explore collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. FEATURED PRODUCTS (Responsive Grid) */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                Handpicked Highlights
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mt-1">
                Featured Products
              </h2>
              <p className="text-xs sm:text-sm text-muted-grey mt-1">
                Verified prices and authentic recommendations updated regularly.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-soft-sand hover:bg-soft-beige text-charcoal text-xs font-semibold border border-soft-beige transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-accent-gold" />
                <span>Add Product</span>
              </Link>
              {allProducts.length > 0 && (
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-accent-gold transition-colors"
                >
                  <span>Explore all {allProducts.length} products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product, idx) => (
                <ProductCard key={product.id} product={product} priority={idx < 2} />
              ))}
            </div>
          ) : allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.slice(0, 4).map((product, idx) => (
                <ProductCard key={product.id} product={product} priority={idx < 2} />
              ))}
            </div>
          ) : (
            /* Clean, elegant placeholder when catalog is awaiting first products */
            <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-soft-beige shadow-editorial space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-soft-sand text-charcoal flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-accent-gold" />
              </div>
              <h3 className="font-serif text-2xl text-charcoal font-medium">
                New Curations Arriving Shortly
              </h3>
              <p className="text-xs sm:text-sm text-muted-grey max-w-md mx-auto leading-relaxed">
                We are curating mindful products and verified affiliate finds. You can add your favorite products and affiliate links anytime.
              </p>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal hover:bg-black text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4 text-accent-gold" />
                  <span>+ Add Product & Affiliate Link</span>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* 4. PINTEREST FINDS (Masonry-Style Gallery) */}
        <section className="bg-soft-sand/60 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-14 sm:py-20 rounded-3xl border border-soft-beige">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E60023]/10 text-[#E60023] text-xs font-semibold uppercase tracking-wider mb-3">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                  </svg>
                  Trending on Pinterest
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
                  Pinterest Finds
                </h2>
                <p className="mt-2 text-sm text-muted-grey leading-relaxed">
                  Staggered, high-resolution aesthetic objects trending across Pinterest. Pin them directly or follow our official board.
                </p>
              </div>

              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E60023] hover:bg-[#d5001f] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
                <span>Follow @mukeshparihar7838</span>
              </a>
            </div>

            {trendingProducts.length > 0 ? (
              <MasonryGrid products={trendingProducts.slice(0, 6)} columns={3} />
            ) : allProducts.length > 0 ? (
              <MasonryGrid products={allProducts.slice(0, 6)} columns={3} />
            ) : (
              <div className="bg-white/80 rounded-3xl p-10 text-center border border-soft-beige">
                <p className="font-serif text-lg text-charcoal font-medium">
                  Follow our Pinterest Board for Daily Inspo
                </p>
                <p className="text-xs text-muted-grey mt-1">
                  Discover daily moodboards, minimal desk setups, and aesthetic everyday upgrades.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <a
                    href={pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E60023] text-white text-xs font-semibold"
                  >
                    <span>View Pinterest Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-soft-sand text-charcoal text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5 text-accent-gold" />
                    <span>Add Pinterest Product</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. EDITOR'S PICKS (With short curation reasons) */}
        {editorsPicks.length > 0 && (
          <section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                  Tested & Endorsed
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mt-1">
                  Editor&apos;s Picks
                </h2>
                <p className="text-xs sm:text-sm text-muted-grey mt-1">
                  Handpicked products with short reflections explaining why they are worth exploring.
                </p>
              </div>
              <Link
                href="/explore?sort=editors"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-accent-gold transition-colors"
              >
                <span>View all editorial picks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {editorsPicks.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-6 border border-soft-beige shadow-editorial flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-soft-sand mb-5">
                      <Image
                        src={product.primaryImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-charcoal text-white text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full">
                        Editor&apos;s Pick
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-gold">
                      {product.category}
                    </span>

                    <h3 className="font-serif text-lg font-medium text-charcoal mt-1 line-clamp-1">
                      <Link href={`/product/${product.slug}`} className="hover:text-accent-gold transition-colors">
                        {product.name}
                      </Link>
                    </h3>

                    {product.editorialNote && (
                      <blockquote className="mt-3 p-3.5 bg-soft-sand/70 rounded-xl border-l-2 border-accent-gold text-xs italic text-charcoal/80 leading-relaxed">
                        &ldquo;{product.editorialNote}&rdquo;
                      </blockquote>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-soft-beige flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-grey block">Verified Price</span>
                      <span className="font-semibold text-charcoal text-base">
                        ${product.price}
                      </span>
                    </div>

                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal hover:bg-black text-white text-xs font-medium transition-colors"
                    >
                      <span>View Product</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Affiliate Disclosure Reminder */}
        <AffiliateDisclosureBanner variant="compact" />

        {/* 6. NEWSLETTER SECTION */}
        <Newsletter />
      </div>
    </div>
  );
}
