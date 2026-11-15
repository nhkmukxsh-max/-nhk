'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface PinterestShareButtonProps {
  url?: string;
  media: string;
  description: string;
  title?: string;
  variant?: 'badge' | 'icon' | 'button';
  className?: string;
}

export default function PinterestShareButton({
  url,
  media,
  description,
  title,
  variant = 'badge',
  className = '',
}: PinterestShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    const sharePageUrl = url || window.location.href;
    const pinDesc = `${title ? title + ' — ' : ''}${description} | Discovered on NHK`;
    return `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      sharePageUrl
    )}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(pinDesc)}`;
  };

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const pinUrl = getShareUrl();
    if (pinUrl) {
      window.open(pinUrl, '_blank', 'noopener,noreferrer,width=750,height=600');
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const sharePageUrl = url || window.location.href;
      navigator.clipboard.writeText(sharePageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'icon') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <button
          onClick={handlePinClick}
          title="Save to Pinterest"
          aria-label="Save to Pinterest"
          className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm text-[#E60023] hover:bg-[#E60023] hover:text-white transition-all duration-200 flex items-center justify-center shadow-sm"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
          </svg>
        </button>
        <button
          onClick={handleCopyLink}
          title="Copy Link"
          aria-label="Copy Link"
          className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm text-charcoal hover:bg-charcoal hover:text-white transition-all duration-200 flex items-center justify-center shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handlePinClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E60023] hover:bg-[#d5001f] text-white text-sm font-medium rounded-full shadow-sm transition-all duration-200 hover:shadow"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
          </svg>
          Save to Pinterest
        </button>
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-soft-sand hover:bg-soft-beige text-charcoal text-sm font-medium rounded-full transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handlePinClick}
      title="Save to Pinterest"
      aria-label="Save to Pinterest"
      className={`inline-flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm hover:bg-[#E60023] hover:text-white text-[#E60023] rounded-full text-xs font-semibold shadow-sm transition-all duration-200 ${className}`}
    >
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
      </svg>
      <span>Save</span>
    </button>
  );
}

