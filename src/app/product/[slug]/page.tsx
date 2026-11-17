import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ExternalLink,
  ShieldCheck,
  Check,
  AlertCircle,
  Tag,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { getServerProducts, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import PinterestShareButton from '@/components/product/PinterestShareButton';
import ProductCard from '@/components/product/ProductCard';
import AffiliateDisclosureBanner from '@/components/ui/AffiliateDisclosureBanner';
import ProductGallery from './ProductGallery';

export const dynamicParams = true;
export const revalidate = 0;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = getServerProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found — NHK',
    };
  }

  return {
    title: `${product.name} — NHK Product Discovery`,
    description: product.tagline || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | NHK`,
      description: product.tagline,
      images: [
        {
          url: product.pinterestImage || product.primaryImage,
          width: 1000,
          height: 1500,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.tagline,
      images: [product.primaryImage],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.category, 3);
  const allImages = [product.primaryImage, ...(product.secondaryImages || [])];

  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.primaryImage, ...(product.secondaryImages || [])],
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.merchant,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency || 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: product.affiliateUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-muted-grey border-b border-soft-beige/70 pb-4">
          <div className="flex items-center gap-2">
            <Link href="/explore" className="hover:text-charcoal transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Explore</span>
            </Link>
            <span>/</span>
            <Link
              href={`/explore?category=${encodeURIComponent(product.category)}`}
              className="hover:text-charcoal transition-colors"
            >
              {product.category}
            </Link>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-charcoal font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </div>

          {/* Pinterest Save CTA */}
          <PinterestShareButton
            media={product.pinterestImage || product.primaryImage}
            description={product.tagline || product.name}
            title={product.name}
            variant="badge"
          />
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ProductGallery images={allImages} productName={product.name} />
          </div>

          {/* Right Column: Editorial Details & Affiliate Actions (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-gold">
                  {product.category}
                </span>
                {product.isEditorsPick && (
                  <span className="bg-charcoal text-white text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-full">
                    Editor&apos;s Pick
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium leading-tight">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="mt-2 text-sm text-charcoal/80 font-serif italic">
                  &ldquo;{product.tagline}&rdquo;
                </p>
              )}
            </div>

            {/* Price & Merchant Box */}
            <div className="p-5 bg-white rounded-2xl border border-soft-beige shadow-editorial space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-muted-grey block">Verified Price</span>
                  <div className="flex items-baseline gap-2.5 mt-0.5">
                    <span className="text-3xl font-semibold text-charcoal">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-muted-grey line-through">
                        {formatPrice(product.originalPrice, product.currency)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-muted-grey block">Available via</span>
                  <span className="text-xs font-semibold text-charcoal">
                    {product.merchant}
                  </span>
                </div>
              </div>

              {/* Primary Affiliate Button */}
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-charcoal hover:bg-black text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Check Price / View Product</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Affiliate Notice under CTA */}
              <AffiliateDisclosureBanner variant="inline" />
            </div>

            {/* Social Share & Pinterest Save Row */}
            <div className="p-4 bg-soft-sand/60 rounded-2xl border border-soft-beige flex items-center justify-between">
              <span className="text-xs font-medium text-charcoal">
                Save to your Pinterest board:
              </span>
              <PinterestShareButton
                media={product.pinterestImage || product.primaryImage}
                description={product.tagline || product.name}
                title={product.name}
                variant="button"
              />
            </div>

            {/* Description */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                Editorial Review
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {product.description}
              </p>

              {product.editorialNote && (
                <div className="p-4 bg-soft-sand rounded-xl border-l-2 border-accent-gold text-xs italic text-charcoal/90 leading-relaxed">
                  <strong className="not-italic font-semibold block text-charcoal mb-1">
                    Why NHK Editors Recommend This:
                  </strong>
                  {product.editorialNote}
                </div>
              )}
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-soft-beige">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Key Specifications
                </h3>
                <ul className="space-y-1.5 text-xs text-charcoal/85">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-grey bg-soft-sand px-2.5 py-1 rounded-full border border-soft-beige"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pros and Considerations Section */}
        {((product.pros && product.pros.length > 0) || (product.considerations && product.considerations.length > 0)) && (
          <section className="bg-white rounded-3xl p-8 sm:p-12 border border-soft-beige shadow-editorial">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                Balanced Evaluation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mt-1">
                Pros & Considerations
              </h2>
              <p className="text-xs text-muted-grey mt-1">
                NHK provides authentic assessments to help you make mindful purchasing decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pros */}
              {product.pros && product.pros.length > 0 && (
                <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>What We Love</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-emerald-950/80 leading-relaxed">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Considerations */}
              {product.considerations && product.considerations.length > 0 && (
                <div className="p-6 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Things to Consider</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-amber-950/80 leading-relaxed">
                    {product.considerations.map((con, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-8 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                  More From {product.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mt-1">
                  Related Discoveries
                </h2>
              </div>
              <Link
                href={`/explore?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-semibold text-charcoal hover:text-accent-gold transition-colors"
              >
                Browse category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
