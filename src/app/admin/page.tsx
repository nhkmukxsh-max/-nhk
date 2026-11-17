'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertTriangle,
  FolderTree,
  Tag,
  DollarSign,
  ArrowRight,
  Sparkles,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import { formatPrice } from '@/lib/utils';
import { CATEGORIES } from '@/data/categories';

const CURATED_IMAGE_PRESETS = [
  { label: 'Leather Tote', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Bookshelf Speaker', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Ceramic Kettle', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Skincare Botanicals', url: 'https://images.unsplash.com/photo-1608248597359-0092f6277d7c?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Minimalist Desk Mat', url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Aroma Diffuser', url: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Travel Tumbler', url: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1000&auto=format&fit=crop' },
  { label: 'Acetate Sunglasses', url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop' },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const [passcode, setPasscode] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'products' | 'links'>('products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State for Add / Edit
  const initialFormState = {
    name: '',
    tagline: '',
    description: '',
    category: 'Home & Living' as ProductCategory,
    price: 49,
    originalPrice: 65,
    affiliateUrl: '',
    merchant: 'Amazon',
    primaryImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
    tags: 'Curated, Essential, Lifestyle',
    features: 'Premium durable build\nThoughtful minimalist finish',
    pros: 'High quality materials\nTimeless aesthetic',
    considerations: 'Handle with care',
    editorialNote: 'Recommended for exceptional craftsmanship and everyday utility.',
    isEditorsPick: false,
    isFeatured: true,
    isTrending: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Check auth status on mount
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchProducts();
        }
      })
      .catch((err) => console.error('Auth verification error:', err))
      .finally(() => setCheckingAuth(false));
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAuth(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPasscode('');
        fetchProducts();
      } else {
        setLoginError(data.error || 'Incorrect admin passcode.');
      }
    } catch (err) {
      setLoginError('Authentication failed. Please check network connection.');
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      tagline: product.tagline || '',
      description: product.description || '',
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      affiliateUrl: product.affiliateUrl,
      merchant: product.merchant,
      primaryImage: product.primaryImage,
      tags: product.tags?.join(', ') || '',
      features: product.features?.join('\n') || '',
      pros: product.pros?.join('\n') || '',
      considerations: product.considerations?.join('\n') || '',
      editorialNote: product.editorialNote || '',
      isEditorsPick: !!product.isEditorsPick,
      isFeatured: !!product.isFeatured,
      isTrending: !!product.isTrending,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setActionMessage({ type: 'error', text: 'Please enter a product name.' });
      return;
    }

    if (!formData.affiliateUrl.trim()) {
      setActionMessage({ type: 'error', text: 'Please provide an affiliate URL for this product.' });
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        features: formData.features.split('\n').map((f) => f.trim()).filter(Boolean),
        pros: formData.pros.split('\n').map((p) => p.trim()).filter(Boolean),
        considerations: formData.considerations.split('\n').map((c) => c.trim()).filter(Boolean),
      };

      if (editingProduct) {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingProduct.id }),
        });
        if (res.ok) {
          setActionMessage({ type: 'success', text: `Product "${formData.name}" updated successfully.` });
        } else {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to update product');
        }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setActionMessage({ type: 'success', text: `Product "${formData.name}" added successfully.` });
        } else {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to create product');
        }
      }

      setIsAddModalOpen(false);
      fetchProducts();
      setTimeout(() => setActionMessage(null), 3500);
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Operation failed' });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setActionMessage({ type: 'success', text: 'Product removed successfully.' });
        setDeletingProductId(null);
        fetchProducts();
      } else {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete product');
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Deletion error' });
    }
  };

  // Filtered Products for Admin
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.merchant.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (checkingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xs text-muted-grey">
        Verifying admin authorization...
      </div>
    );
  }

  // If not authenticated, show protected admin login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-soft-beige shadow-editorial text-center space-y-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md mx-auto bg-black border border-charcoal/20 shrink-0">
            <Image
              src="/logo.jpg"
              alt="NHK Logo"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div>
            <span className="font-serif tracking-widest text-xl font-semibold text-charcoal block">
              NHK
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-accent-gold block mb-1">
              Affiliate Marketing
            </span>
            <h1 className="font-serif text-2xl text-charcoal font-medium mt-1">
              Admin Access Only
            </h1>
            <p className="text-xs text-muted-grey mt-2 leading-relaxed">
              This area is restricted to administrators. Enter your admin passcode to add and manage affiliate products.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full px-4 py-3 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal text-sm placeholder:text-muted-grey/60 focus:outline-none focus:ring-2 focus:ring-charcoal/20 transition-all text-center tracking-widest"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 font-medium">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmittingAuth || !passcode}
              className="w-full py-3.5 px-6 rounded-full bg-charcoal hover:bg-black text-white text-sm font-semibold transition-all shadow-sm hover:shadow disabled:opacity-50"
            >
              {isSubmittingAuth ? 'Verifying...' : 'Unlock Admin Portal'}
            </button>
          </form>

          <div className="pt-4 border-t border-soft-beige text-[11px] text-muted-grey">
            <Link href="/" className="hover:text-charcoal underline">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Management Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-soft-beige">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-charcoal/10 shrink-0 bg-black">
            <Image
              src="/logo.jpg"
              alt="NHK Logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif tracking-widest text-2xl font-bold text-charcoal">
                NHK
              </span>
              <span className="bg-charcoal text-white text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-full">
                Admin Portal
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Authenticated
              </span>
            </div>
            <p className="text-xs text-muted-grey mt-0.5">
              Exclusive admin area to publish products, edit pricing, and manage affiliate destinations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal hover:bg-black text-white text-xs font-semibold shadow-md transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 text-accent-gold" />
            <span>+ Add New Product</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-soft-sand hover:bg-soft-beige text-charcoal text-xs font-medium transition-colors"
            title="Sign out of Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-medium animate-fadeIn ${actionMessage.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
            }`}
        >
          {actionMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl p-6 border border-soft-beige shadow-editorial">
          <div className="flex items-center justify-between text-muted-grey">
            <span className="text-xs uppercase font-semibold tracking-wider">Total Products</span>
            <Tag className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="mt-3 font-serif text-3xl font-medium text-charcoal">
            {products.length}
          </div>
          <span className="text-[11px] text-muted-grey mt-1 block">Live in catalog</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-soft-beige shadow-editorial">
          <div className="flex items-center justify-between text-muted-grey">
            <span className="text-xs uppercase font-semibold tracking-wider">Categories</span>
            <FolderTree className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="mt-3 font-serif text-3xl font-medium text-charcoal">
            {CATEGORIES.length}
          </div>
          <span className="text-[11px] text-muted-grey mt-1 block">Active departments</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-soft-beige shadow-editorial">
          <div className="flex items-center justify-between text-muted-grey">
            <span className="text-xs uppercase font-semibold tracking-wider">Featured / Picks</span>
            <Sparkles className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="mt-3 font-serif text-3xl font-medium text-charcoal">
            {products.filter((p) => p.isEditorsPick || p.isFeatured).length}
          </div>
          <span className="text-[11px] text-muted-grey mt-1 block">Highlighted on Home</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-soft-beige shadow-editorial">
          <div className="flex items-center justify-between text-muted-grey">
            <span className="text-xs uppercase font-semibold tracking-wider">Affiliate Links</span>
            <DollarSign className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="mt-3 font-serif text-3xl font-medium text-charcoal">
            {products.filter((p) => p.affiliateUrl).length}
          </div>
          <span className="text-[11px] text-muted-grey mt-1 block">Configured links</span>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-soft-beige shadow-editorial space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-soft-sand p-1 rounded-full">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === 'products'
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-muted-grey hover:text-charcoal'
                }`}
            >
              All Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === 'links'
                  ? 'bg-charcoal text-white shadow-sm'
                  : 'text-muted-grey hover:text-charcoal'
                }`}
            >
              Affiliate Links Audit
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-muted-grey absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, merchant, or category..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-soft-sand/60 border border-soft-beige text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
            />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-soft-beige/60">
          {['All', ...CATEGORIES.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                  ? 'bg-charcoal text-white'
                  : 'bg-soft-sand text-charcoal hover:bg-soft-beige'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-soft-beige shadow-editorial space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-soft-sand text-charcoal flex items-center justify-center mx-auto">
            <Plus className="w-6 h-6 text-accent-gold" />
          </div>
          <h2 className="font-serif text-2xl text-charcoal font-medium">
            Your Catalog is Ready for Products
          </h2>
          <p className="text-sm text-muted-grey max-w-md mx-auto">
            Click the button below to add your first product with verified pricing and affiliate links.
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-charcoal hover:bg-black text-white text-xs font-semibold shadow-md transition-all"
          >
            <Plus className="w-4 h-4 text-accent-gold" />
            <span>Add Your First Product</span>
          </button>
        </div>
      ) : activeTab === 'products' ? (
        <div className="bg-white rounded-3xl border border-soft-beige shadow-editorial overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-soft-sand/70 text-charcoal font-semibold border-b border-soft-beige">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Verified Price</th>
                  <th className="py-4 px-4">Merchant</th>
                  <th className="py-4 px-4">Flags</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-beige/60 text-charcoal">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-soft-sand/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-soft-sand shrink-0 border border-soft-beige">
                          <Image
                            src={product.primaryImage}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <Link
                            href={`/product/${product.slug}`}
                            target="_blank"
                            className="font-serif font-medium text-sm text-charcoal hover:text-accent-gold transition-colors block truncate"
                          >
                            {product.name}
                          </Link>
                          <span className="text-[11px] text-muted-grey truncate block">
                            {product.tagline}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="inline-block bg-soft-sand px-2.5 py-1 rounded-full text-[11px] font-medium text-charcoal border border-soft-beige">
                        {product.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-semibold text-charcoal">
                      {formatPrice(product.price, product.currency)}
                      {product.originalPrice && (
                        <span className="text-muted-grey line-through ml-1.5 font-normal text-[11px]">
                          {formatPrice(product.originalPrice, product.currency)}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-muted-grey">
                      {product.merchant}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {product.isEditorsPick && (
                          <span className="bg-charcoal text-white text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded">
                            Pick
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="bg-soft-beige text-charcoal text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-2 text-muted-grey hover:text-charcoal hover:bg-soft-sand rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingProductId(product.id)}
                          className="p-2 text-muted-grey hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Affiliate Link Management View */
        <div className="bg-white rounded-3xl border border-soft-beige shadow-editorial overflow-hidden">
          <div className="p-6 border-b border-soft-beige">
            <h3 className="font-serif text-lg font-medium text-charcoal">
              Affiliate Links & Destinations
            </h3>
            <p className="text-xs text-muted-grey mt-0.5">
              Review and audit your outbound affiliate links to verify destinations.
            </p>
          </div>

          <div className="divide-y divide-soft-beige/60">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-soft-sand/30 transition-colors"
              >
                <div className="space-y-1 min-w-0 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-charcoal text-sm">{p.name}</span>
                    <span className="text-[10px] text-muted-grey bg-soft-sand px-2 py-0.5 rounded-full">
                      {p.merchant}
                    </span>
                  </div>
                  <div className="text-xs text-muted-grey font-mono truncate bg-soft-sand/70 px-3 py-1.5 rounded-lg border border-soft-beige">
                    {p.affiliateUrl || 'No link configured yet'}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {p.affiliateUrl && (
                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-soft-sand hover:bg-soft-beige text-charcoal text-xs font-medium transition-colors"
                    >
                      <span>Test Affiliate Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="px-3 py-2 rounded-xl bg-charcoal hover:bg-black text-white text-xs font-semibold transition-colors"
                  >
                    Update Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-soft-beige max-h-[90vh] overflow-y-auto my-8">
            <h2 className="font-serif text-2xl text-charcoal font-medium mb-1">
              {editingProduct ? 'Edit Product' : 'Add New Product & Affiliate Link'}
            </h2>
            <p className="text-xs text-muted-grey mb-6">
              Enter the product name, price, photo, and your affiliate tracking link.
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-charcoal mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Handmade Ceramic Pour-Over Kettle"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Affiliate Destination Link *</label>
                <input
                  type="url"
                  required
                  value={formData.affiliateUrl}
                  onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                  placeholder="https://www.amazon.com/dp/...?tag=yourtag-20"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">Merchant / Store Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amazon / Official Store"
                    value={formData.merchant}
                    onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Verified Price (USD) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-charcoal mb-1">Original Price (optional)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Tagline / Short Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Unstructured elegance crafted for daily commutes."
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Primary Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.primaryImage}
                  onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                />

                {/* Preset Image Picker */}
                <div className="mt-2">
                  <span className="text-[10px] text-muted-grey block mb-1">Or choose a quick preset photo:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {CURATED_IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, primaryImage: preset.url })}
                        className={`text-[10px] px-2 py-1 rounded-lg border transition-colors ${formData.primaryImage === preset.url
                            ? 'bg-charcoal text-white border-charcoal'
                            : 'bg-soft-sand text-charcoal border-soft-beige hover:bg-soft-beige'
                          }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-charcoal mb-1">Editorial Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe what makes this product special, materials, and why visitors will love it..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20 resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Pros (one per line)</label>
                  <textarea
                    rows={2}
                    value={formData.pros}
                    onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal resize-y"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-charcoal mb-1">Considerations (one per line)</label>
                  <textarea
                    rows={2}
                    value={formData.considerations}
                    onChange={(e) => setFormData({ ...formData, considerations: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-soft-sand/60 border border-soft-beige text-charcoal resize-y"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isEditorsPick}
                    onChange={(e) => setFormData({ ...formData, isEditorsPick: e.target.checked })}
                    className="w-4 h-4 rounded text-charcoal focus:ring-charcoal"
                  />
                  <span className="font-medium text-charcoal">Editor&apos;s Pick</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-charcoal focus:ring-charcoal"
                  />
                  <span className="font-medium text-charcoal">Show on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="w-4 h-4 rounded text-charcoal focus:ring-charcoal"
                  />
                  <span className="font-medium text-charcoal">Trending / Pinterest Finds</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-soft-beige flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-soft-sand hover:bg-soft-beige text-charcoal font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-charcoal hover:bg-black text-white font-semibold shadow-sm transition-colors"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-soft-beige text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-charcoal font-medium">
              Confirm Product Deletion
            </h3>
            <p className="text-xs text-muted-grey">
              Are you sure you want to remove this product from NHK?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-full bg-soft-sand text-charcoal text-xs font-semibold hover:bg-soft-beige transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deletingProductId)}
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
