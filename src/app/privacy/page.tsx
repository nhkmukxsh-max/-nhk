import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — NHK',
  description: 'Learn how NHK protects your data, respects visitor privacy, and handles analytics cookies.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="space-y-4 border-b border-soft-beige pb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
          Legal & Privacy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-grey">
          Effective Date: November 2026
        </p>
      </div>

      <div className="prose prose-neutral max-w-none text-charcoal/85 text-sm sm:text-base leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            1. Information We Collect
          </h2>
          <p>
            NHK values your privacy and practices minimal data collection. When you visit our website, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-charcoal/80">
            <li><strong>Voluntary Information:</strong> Your email address when you voluntarily subscribe to the NHK Weekly Newsletter or your name, email, and message when you contact us.</li>
            <li><strong>Technical Analytics:</strong> Anonymized usage data such as browser type, referring URLs (such as Pinterest or search engines), and visited pages to improve site performance and readability.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            2. Affiliate Link Tracking & Cookies
          </h2>
          <p>
            When you click on outbound product links to third-party merchant sites (such as Amazon or partner brand boutiques), those external sites may store tracking cookies on your device to attribute any qualifying referral. These cookies are subject to the respective external retailers&apos; privacy policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            3. How We Use Your Information
          </h2>
          <p>
            We use collected information solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-charcoal/80">
            <li>Deliver weekly editorial newsletters you have explicitly subscribed to.</li>
            <li>Respond to direct reader inquiries or feedback.</li>
            <li>Maintain site security and optimize mobile browsing experiences.</li>
          </ul>
          <p>
            We never sell, rent, or lease your personal information to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
            4. Unsubscribing & Data Rights
          </h2>
          <p>
            You may unsubscribe from our newsletter at any time by clicking the &ldquo;Unsubscribe&rdquo; link at the bottom of any email we send. You may also contact us to request deletion of any contact history.
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
          href="/terms"
          className="text-xs text-muted-grey hover:text-charcoal underline"
        >
          Terms and Conditions
        </Link>
      </div>
    </div>
  );
}

