'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    // Emulate realistic subscription response
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="relative overflow-hidden bg-soft-sand rounded-3xl p-8 sm:p-14 my-16 border border-soft-beige">
      {/* Subtle organic background ring decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-soft-beige/50 pointer-events-none blur-2xl" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-soft-beige/60 pointer-events-none blur-2xl" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-charcoal text-xs font-semibold uppercase tracking-wider mb-4 border border-soft-beige">
          <Mail className="w-3.5 h-3.5 text-accent-gold" />
          The NHK Weekly Edition
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium tracking-tight">
          Get the Best Finds Delivered.
        </h2>
        <p className="mt-3 text-muted-grey text-sm sm:text-base leading-relaxed">
          Join 28,000+ mindful shoppers. A single, curated digest every Sunday featuring design discoveries, everyday upgrades, and quiet essentials. No spam, ever.
        </p>

        {status === 'success' ? (
          <div className="mt-8 p-4 bg-white/90 border border-green-200 rounded-2xl flex items-center justify-center gap-2.5 text-green-800 text-sm font-medium animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span>Welcome to the NHK circle. Check your inbox for our curated starter guide!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                className="w-full px-5 py-3.5 rounded-full bg-white border border-light-grey text-charcoal text-sm placeholder:text-muted-grey/70 focus:outline-none focus:ring-2 focus:ring-charcoal/20 transition-all shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-charcoal hover:bg-black text-white text-sm font-medium transition-all duration-200 shadow hover:shadow-md disabled:opacity-50"
            >
              <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-xs text-red-600 mt-2 font-medium">{errorMessage}</p>
        )}

        <p className="mt-4 text-[11px] text-muted-grey/80">
          By subscribing you agree to our{' '}
          <a href="/privacy" className="underline hover:text-charcoal">Privacy Policy</a>. You can unsubscribe at any time with one click.
        </p>
      </div>
    </section>
  );
}

