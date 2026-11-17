'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import SearchModal from '@/components/ui/SearchModal';
import { Product } from '@/types';

interface HeaderProps {
  products?: Product[];
}

export default function Header({ products = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Categories', href: '/categories' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const pinterestUrl = "https://in.pinterest.com/mukeshparihar7838/";

  return (
    <>
      <header className="sticky top-0 z-40 bg-warm-white/95 backdrop-blur-md border-b border-soft-beige/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* NHK Logo & Wordmark */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-sm border border-charcoal/10 shrink-0 bg-black">
                  <Image
                    src="/logo.jpg"
                    alt="NHK Affiliate Marketing Logo"
                    fill
                    priority
                    sizes="48px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif tracking-widest text-xl sm:text-2xl font-bold text-charcoal group-hover:text-black transition-colors leading-none">
                    NHK
                  </span>
                  <span className="text-[9px] tracking-widest uppercase font-semibold text-accent-gold mt-1">
                    Affiliate Marketing
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? 'text-charcoal font-semibold'
                        : 'text-muted-grey hover:text-charcoal font-medium'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons (Search, Pinterest link, Mobile Toggle) */}
            <div className="flex items-center space-x-2.5 sm:space-x-3.5">
              {/* Search Icon / Button */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-full text-muted-grey hover:text-charcoal hover:bg-soft-sand transition-all text-xs font-medium"
              >
                <Search className="w-4 h-4 text-charcoal" />
                <span className="hidden sm:inline">Search</span>
              </button>

              {/* Pinterest Quick Profile Link */}
              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow NHK on Pinterest"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E60023]/10 hover:bg-[#E60023] text-[#E60023] hover:text-white transition-all text-xs font-semibold"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
                <span>Pinterest</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden p-2 text-charcoal hover:bg-soft-sand rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-warm-white border-b border-soft-beige px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-soft-sand text-charcoal font-semibold'
                        : 'text-muted-grey hover:text-charcoal hover:bg-soft-sand/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-soft-beige flex flex-col gap-2.5">
              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#E60023] text-white text-xs font-semibold"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
                <span>Follow on Pinterest</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Popover/Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
      />
    </>
  );
}
