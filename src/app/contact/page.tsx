'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const pinterestUrl = "https://in.pinterest.com/mukeshparihar7838/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name.');
      return;
    }

    if (!formData.email || !formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a message with at least 10 characters.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-gold">
          Connect With Us
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-medium mt-1">
          Get in Touch
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-grey leading-relaxed">
          Have a product recommendation, question about an editorial feature, or partnership inquiry? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-soft-beige shadow-editorial">
          {status === 'success' ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl text-charcoal font-medium">
                Message Received
              </h2>
              <p className="text-sm text-muted-grey max-w-md mx-auto">
                Thank you for reaching out to the NHK team. We typically respond to all editorial and reader inquiries within 1–2 business days.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2.5 rounded-full bg-charcoal text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                    Your Name <span className="text-accent-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal text-sm placeholder:text-muted-grey/60 focus:outline-none focus:ring-2 focus:ring-charcoal/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                    Email Address <span className="text-accent-terracotta">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal text-sm placeholder:text-muted-grey/60 focus:outline-none focus:ring-2 focus:ring-charcoal/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Topic / Inquiry Type
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-charcoal/20 cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry / Feedback</option>
                  <option value="Product Suggestion">Suggest a Product for Review</option>
                  <option value="Affiliate Disclosure">Affiliate & Transparency Question</option>
                  <option value="Press / Collaboration">Editorial / Press Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Your Message <span className="text-accent-terracotta">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal text-sm placeholder:text-muted-grey/60 focus:outline-none focus:ring-2 focus:ring-charcoal/20 transition-all resize-y"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-charcoal hover:bg-black text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Details & Socials (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-soft-sand rounded-3xl p-8 border border-soft-beige space-y-6">
            <h3 className="font-serif text-xl text-charcoal font-medium">
              Editorial Inquiries
            </h3>
            <p className="text-xs text-charcoal/80 leading-relaxed">
              We welcome independent product pitches from makers, craftsmen, and creators who prioritize enduring materials.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-xs text-charcoal">
                <Mail className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-charcoal">Email</strong>
                  <span className="text-muted-grey">editorial@nhkcurated.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-charcoal">
                <Sparkles className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-charcoal">Curation Department</strong>
                  <span className="text-muted-grey">Submissions reviewed weekly on Thursdays</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="bg-white rounded-3xl p-8 border border-soft-beige shadow-editorial space-y-4">
            <h3 className="font-serif text-lg text-charcoal font-medium">
              Connect Across Platforms
            </h3>
            <p className="text-xs text-muted-grey">
              Follow our official Pinterest boards and visual collections.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-soft-sand/60 hover:bg-[#E60023] hover:text-white group transition-all text-xs font-semibold text-charcoal"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-current text-[#E60023] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.9-.12-2.28.02-3.26l1-4.23s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.55 1.1 1.22 0 .74-.47 1.86-.72 2.89-.2.87.43 1.58 1.3 1.58 1.55 0 2.75-1.64 2.75-4 0-2.09-1.5-3.56-3.66-3.56-2.49 0-3.95 1.87-3.95 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.25 1.02c-.04.16-.14.2-.31.11-1.15-.54-1.87-2.23-1.87-3.6 0-2.93 2.13-5.62 6.14-5.62 3.23 0 5.73 2.3 5.73 5.38 0 3.2-2.02 5.78-4.83 5.78-.94 0-1.83-.49-2.14-1.07l-.58 2.22c-.21.82-.78 1.85-1.17 2.47A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                  </svg>
                  <span>mukeshparihar7838 on Pinterest</span>
                </div>
                <span>Follow →</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-soft-sand/60 hover:bg-charcoal hover:text-white group transition-all text-xs font-semibold text-charcoal"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 fill-current text-charcoal group-hover:text-white transition-colors" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>NHK on Instagram</span>
                </div>
                <span>Follow →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
