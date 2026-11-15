import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Affiliate Disclosure — NHK',
  description: 'Full disclosure regarding affiliate links, compensation, and editorial independence at NHK.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="space-y-4 border-b border-soft-beige pb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-sand text-charcoal text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" />
          Transparency & FTC Compliance
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium">
          Affiliate Marketing Disclosure
        </h1>
        <p className="text-xs text-muted-grey">
          Last updated: November 2026
        </p>
      </div>

      {/* Main Content */}
      <div className="prose prose-neutral max-w-none text-charcoal/85 text-sm sm:text-base leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            1. Overview of Our Affiliate Relationships
          </h2>
          <p>
            At <strong>NHK</strong>, our mission is to help our audience discover products that offer exceptional design, craftsmanship, and daily utility. To sustain our editorial team and research activities without charging our readers a subscription or paywall, we participate in affiliate marketing programs.
          </p>
          <p>
            This means that some links on this website are <strong>affiliate links</strong>. If you click on one of these links and complete a purchase on the respective retailer or merchant website, NHK may receive a small commission or referral fee.
          </p>
        </section>

        <section className="bg-soft-sand/70 rounded-2xl p-6 border border-soft-beige space-y-2">
          <h3 className="font-serif text-lg text-charcoal font-medium">
            Crucial Note for Our Readers:
          </h3>
          <p className="text-sm text-charcoal/90">
            <strong>Zero Additional Cost to You:</strong> Clicking an affiliate link on NHK will never increase the price you pay for an item. The price you pay is identical to (or sometimes discounted compared to) what you would pay navigating directly to the retailer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            2. Editorial Independence & Integrity
          </h2>
          <p>
            Our product curations are driven by editorial judgment, not by commission rates. We do not accept monetary payment from manufacturers or brands in exchange for positive reviews or preferred placement.
          </p>
          <p>
            If we feature a product, it is because our curation team believes it embodies quality, durability, and aesthetic merit. If a product fails our internal standards, it will not be listed on NHK, regardless of what affiliate rate is offered.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            3. Demonstrations & Third-Party Retailers
          </h2>
          <p>
            Unless explicitly stated otherwise, NHK is an independent publication and is not directly owned by, operated by, or in partnership with third-party retailers such as Amazon, Nordstrom, Fellow, or others mentioned. All trademarks, service marks, and logos belong to their respective proprietors.
          </p>
          <p>
            Any demonstration products shown with placeholder links are clearly identified and will be linked directly to authorized merchant partners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            4. Verified Pricing & Product Availability
          </h2>
          <p>
            While we make every effort to display accurate, verified pricing and original retail benchmarks, prices and availability on external merchant websites fluctuate frequently. Always verify the current price, shipping policies, and return terms directly on the retailer’s product page before completing a purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            5. Questions or Inquiries
          </h2>
          <p>
            If you have questions about our affiliate disclosure, editorial standards, or wish to report an expired link or price inaccuracy, please reach out to us directly through our{' '}
            <Link href="/contact" className="underline font-medium text-charcoal hover:text-accent-gold">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>

      <div className="pt-8 border-t border-soft-beige flex items-center justify-between">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal hover:text-accent-gold transition-colors"
        >
          <span>Return to Product Discovery</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/privacy"
          className="text-xs text-muted-grey hover:text-charcoal underline"
        >
          View Privacy Policy
        </Link>
      </div>
    </div>
  );
}

