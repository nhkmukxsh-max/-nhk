import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Heart, Lock } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pinterestUrl = "https://in.pinterest.com/mukeshparihar7838/";

  return (
    <footer className="bg-warm-white border-t border-soft-beige mt-24 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="font-serif tracking-widest text-3xl font-semibold text-charcoal block">
              N H K
            </Link>
            <p className="font-serif italic text-lg text-charcoal/80">
              &ldquo;Discover Products Worth Loving.&rdquo;
            </p>
            <p className="text-xs text-muted-grey leading-relaxed max-w-sm">
              NHK is an independent lifestyle discovery publication. We curate timeless essentials, everyday upgrades, and design-led objects tested for enduring quality and intentional living.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#E60023]/10 hover:bg-[#E60023] text-[#E60023] hover:text-white transition-all flex items-center justify-center"
                aria-label="NHK on Pinterest"
                title="Follow NHK on Pinterest"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-soft-sand hover:bg-charcoal text-charcoal hover:text-white transition-all flex items-center justify-center text-xs"
                aria-label="NHK on Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-muted-grey">
              <li>
                <Link href="/explore" className="hover:text-charcoal transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-charcoal transition-colors">
                  Curated Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-charcoal transition-colors">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-charcoal transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-muted-grey">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/explore?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-charcoal transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Affiliate Disclosure */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
              Transparency
            </h4>
            <ul className="space-y-2 text-xs text-muted-grey">
              <li>
                <Link href="/disclosure" className="text-charcoal font-medium hover:text-accent-gold transition-colors flex items-center gap-1">
                  <span>Affiliate Disclosure</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-charcoal transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-charcoal transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-grey hover:text-charcoal transition-colors flex items-center gap-1 text-[11px] pt-1">
                  <Lock className="w-3 h-3 text-muted-grey/60" />
                  <span>Admin Access</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Notice Box */}
        <div className="mt-12 pt-8 border-t border-soft-beige">
          <div className="bg-soft-sand/70 rounded-2xl p-5 text-xs text-muted-grey leading-relaxed">
            <span className="font-semibold text-charcoal">Affiliate Disclaimer:</span> NHK participates in select affiliate marketing programs. This means we may earn a small commission when you purchase through links on our site, at completely zero additional cost to you. We do not accept payment to review products favorably. All editorial opinions, pros, and considerations reflect honest assessments by our independent curation team.
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-grey gap-3">
          <p>© {currentYear} NHK Editorial. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-accent-terracotta fill-accent-terracotta" /> for thoughtful discovery.
          </p>
        </div>
      </div>
    </footer>
  );
}
