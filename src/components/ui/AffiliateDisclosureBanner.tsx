'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Info, X } from 'lucide-react';

interface Props {
  variant?: 'banner' | 'compact' | 'inline';
  className?: string;
}

export default function AffiliateDisclosureBanner({ variant = 'banner', className = '' }: Props) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && variant === 'banner') return null;

  if (variant === 'inline') {
    return (
      <div className={`text-xs text-muted-grey flex items-center gap-1.5 py-1 ${className}`}>
        <Info className="w-3.5 h-3.5 text-accent-gold shrink-0" />
        <span>
          NHK is reader-supported. When you purchase through our links, we may earn an affiliate commission at zero additional cost to you.{' '}
          <Link href="/disclosure" className="underline hover:text-charcoal transition-colors">
            Learn more
          </Link>
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-soft-sand/80 border border-soft-beige rounded-xl p-3.5 text-xs text-charcoal/80 flex items-start gap-2.5 ${className}`}>
        <Info className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
        <div className="flex-1 leading-relaxed">
          <strong className="font-semibold text-charcoal">Affiliate Transparency:</strong> When you click and buy through product links on NHK, we may earn an affiliate commission. We only recommend pieces we genuinely believe enhance your lifestyle.{' '}
          <Link href="/disclosure" className="underline text-charcoal font-medium hover:text-accent-gold transition-colors">
            Read full disclosure
          </Link>.
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Affiliate disclosure" className={`bg-soft-beige/70 border-b border-light-grey text-xs text-charcoal/90 px-4 py-2 transition-all ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-gold" />
          <p>
            <span className="font-medium text-charcoal">Affiliate Disclosure:</span> NHK curates independent recommendations. We may earn an affiliate commission on qualifying purchases at no extra cost to you.
          </p>
          <Link href="/disclosure" className="hidden sm:inline-block underline text-charcoal font-medium hover:text-accent-gold transition-colors ml-1">
            Details
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 text-muted-grey hover:text-charcoal transition-colors rounded"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

