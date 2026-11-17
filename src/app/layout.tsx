import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AffiliateDisclosureBanner from '@/components/ui/AffiliateDisclosureBanner';
import { getServerProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'NHK — Discover Products Worth Loving | Affiliate Marketing',
  description:
    'NHK is a premium affiliate marketing and product discovery brand curating thoughtfully designed everyday carry, tech essentials, home sanctuary pieces, and lifestyle finds.',
  keywords: [
    'NHK',
    'NHK Affiliate Marketing',
    'curated products',
    'product discovery',
    'minimalist essentials',
    'home decor',
    'everyday carry',
    'tech accessories',
    'pinterest finds',
    'affiliate marketing',
  ],
  authors: [{ name: 'NHK Team' }],
  metadataBase: new URL('https://nhkcurated.com'),
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nhkcurated.com',
    siteName: 'NHK Affiliate Marketing',
    title: 'NHK — Discover Products Worth Loving',
    description:
      'Discover thoughtfully curated products, trending Pinterest finds, and everyday essentials evaluated for lasting quality.',
    images: [
      {
        url: '/logo.jpg',
        width: 1024,
        height: 1024,
        alt: 'NHK Affiliate Marketing Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'NHK — Discover Products Worth Loving',
    description: 'Curated products, everyday upgrades, and quiet essentials.',
    images: ['/logo.jpg'],
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
