import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AffiliateDisclosureBanner from '@/components/ui/AffiliateDisclosureBanner';
import { getServerProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'NHK — Discover Products Worth Loving | Curated Lifestyle & Design',
  description:
    'NHK is a premium product discovery brand curating thoughtfully designed everyday carry, tech essentials, home sanctuary pieces, and botanical lifestyle finds.',
  keywords: [
    'NHK',
    'curated products',
    'product discovery',
    'minimalist essentials',
    'home decor',
    'everyday carry',
    'tech accessories',
    'pinterest finds',
    'editorial recommendations',
  ],
  authors: [{ name: 'NHK Editorial Team' }],
  metadataBase: new URL('https://nhkcurated.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nhkcurated.com',
    siteName: 'NHK',
    title: 'NHK — Discover Products Worth Loving',
    description:
      'Discover thoughtfully curated products, trending Pinterest finds, and everyday essentials evaluated for lasting quality.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'NHK Curated Lifestyle Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NHK — Discover Products Worth Loving',
    description: 'Curated products, everyday upgrades, and quiet essentials.',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200'],
  },
  other: {
    'pinterest-rich-pin': 'true',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = getServerProducts();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-white text-charcoal selection:bg-soft-beige selection:text-charcoal">
        {/* Top Sticky Affiliate Transparency Notice */}
        <AffiliateDisclosureBanner variant="banner" />

        {/* Header Navigation */}
        <Header products={products} />

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Site Footer */}
        <Footer />
      </body>
    </html>
  );
}
