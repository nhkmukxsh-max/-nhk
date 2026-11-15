import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Shield, Heart, Eye, ArrowRight } from 'lucide-react';
import AffiliateDisclosureBanner from '@/components/ui/AffiliateDisclosureBanner';

export const metadata = {
  title: 'About NHK — Discover Products Worth Loving',
  description: 'Learn about NHK, our editorial curation values, and why we build mindful product discovery for everyday life.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Eye,
      title: 'Aesthetic & Tactile Balance',
      desc: 'We look for objects that bring calm and delight into daily life—clean silhouettes, rich natural materials, and quiet design.',
    },
    {
      icon: Shield,
      title: 'Rigorous Independence',
      desc: 'We never accept payment to endorse products. If an item fails in real-world durability tests, it does not get published on NHK.',
    },
    {
      icon: Heart,
      title: 'Mindful Purchasing',
      desc: 'We encourage buying fewer, better things. Our curations prioritize longevity and purpose over fleeting seasonal trends.',
    },
    {
      icon: Sparkles,
      title: 'Transparent Affiliation',
      desc: 'We are completely transparent about how we earn affiliate commissions, ensuring zero additional cost to our readers.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Hero Narrative */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
          Our Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-medium leading-tight">
          Discover Products <br />
          <span className="italic font-normal">Worth Loving.</span>
        </h1>
        <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
          NHK was founded on a simple realization: the internet is saturated with disposable noise, aggressive sales funnels, and algorithmic clutter. We created NHK as an editorial sanctuary for mindful discovery.
        </p>
      </div>

      {/* Editorial Image Showcase */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-editorial border border-soft-beige">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
          alt="NHK studio workspace & design curation process"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/20" />
      </div>

      {/* Story Narrative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
            The NHK Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
            Curated with Care, Tested in Reality
          </h2>
          <p className="text-sm text-charcoal/80 leading-relaxed">
            Every object listed on NHK undergoes thorough editorial vetting. We examine craftsmanship, verified owner feedback, brand heritage, and day-to-day usability.
          </p>
          <p className="text-sm text-charcoal/80 leading-relaxed">
            Whether it&apos;s a handcrafted vegetable-tanned leather tote, a counterbalanced coffee kettle, or an acoustic desk piece, our mission is to connect you with objects that elevate your routine and endure for years.
          </p>
        </div>

        <div className="bg-soft-sand rounded-3xl p-8 sm:p-10 border border-soft-beige space-y-4">
          <blockquote className="font-serif text-xl sm:text-2xl text-charcoal font-normal italic leading-relaxed">
            &ldquo;True luxury is not defined by excess, but by the quiet satisfaction of using something thoughtfully made every single day.&rdquo;
          </blockquote>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-grey">
            — The NHK Editorial Collective
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
            Our Curation Principles
          </h2>
          <p className="text-xs sm:text-sm text-muted-grey mt-2">
            The four pillars guiding every product we recommend.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-soft-beige shadow-editorial space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-soft-sand flex items-center justify-center text-charcoal">
                <v.icon className="w-5 h-5 text-accent-gold" />
              </div>
              <h3 className="font-serif font-medium text-lg text-charcoal">
                {v.title}
              </h3>
              <p className="text-xs text-muted-grey leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Transparency Section */}
      <div className="max-w-3xl mx-auto">
        <AffiliateDisclosureBanner variant="compact" />
      </div>

      {/* Call to Action */}
      <div className="bg-charcoal text-white rounded-3xl p-10 sm:p-16 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium">
          Ready to discover something extraordinary?
        </h2>
        <p className="text-sm text-white/70 max-w-md mx-auto">
          Explore our complete directory of everyday essentials and curated Pinterest favorites.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-soft-beige text-charcoal text-sm font-semibold transition-all shadow-md"
        >
          <span>Explore All Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

