import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions — NHK',
  description: 'Terms of service and conditions for using the NHK product discovery website.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="space-y-4 border-b border-soft-beige pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
          Legal Agreement
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium">
          Terms & Conditions
        </h1>
        <p className="text-xs text-muted-grey">
          Effective Date: November 2026
        </p>
      </div>

      <div className="prose prose-neutral max-w-none text-charcoal/85 text-sm sm:text-base leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and browsing the <strong>NHK</strong> website, you agree to comply with and be bound by these Terms and Conditions and our Affiliate Disclosure. If you do not agree with any portion of these terms, please refrain from using our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            2. Informational & Editorial Purposes Only
          </h2>
          <p>
            All content published on NHK—including product recommendations, editorial notes, pros and considerations, and price indicators—is provided for general informational and discovery purposes. While we strive to verify specifications and prices, we do not warrant that product descriptions or merchant prices are error-free or complete.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            3. Third-Party Transactions & Disclaimers
          </h2>
          <p>
            NHK does not sell products directly. All purchases are executed on external third-party merchant sites. NHK is not liable for any issues, damages, warranties, delivery delays, or defects arising from transactions conducted on external retailer websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            4. Intellectual Property
          </h2>
          <p>
            All editorial copy, design assets, and logos created by NHK are the intellectual property of NHK. Product images, trademarks, and merchant brand identities remain the property of their respective copyright holders.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-soft-beige flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal hover:text-accent-gold transition-colors"
        >
          <span>Return Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/disclosure"
          className="text-xs text-muted-grey hover:text-charcoal underline"
        >
          Affiliate Disclosure
        </Link>
      </div>
    </div>
  );
}

