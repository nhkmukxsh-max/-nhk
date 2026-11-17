import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerProducts, saveServerProducts } from '@/lib/products';
import { Product } from '@/types';
import { generateSlug } from '@/lib/utils';

function isUserAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get('nhk_admin_token');
  return !!token && token.value === 'nhk_authenticated_session';
}

export async function GET() {
  try {
    const products = getServerProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isUserAuthenticated()) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication required to add products' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (!body.name || !body.category || body.price === undefined || !body.affiliateUrl) {
      return NextResponse.json(
        { error: 'Missing required product fields (Name, Category, Price, and Affiliate URL are required)' },
        { status: 400 }
      );
    }

    const currentProducts = getServerProducts();
    const id = `nhk-${Date.now()}`;
    const slug = body.slug || generateSlug(body.name);

    const newProduct: Product = {
      id,
      slug,
      name: body.name,
      tagline: body.tagline || '',
      description: body.description || '',
      category: body.category,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      currency: body.currency || 'USD',
      affiliateUrl: body.affiliateUrl,
      merchant: body.merchant || 'Direct / Amazon',
      primaryImage:
        body.primaryImage ||
        'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
      secondaryImages: body.secondaryImages || [],
      pinterestImage: body.pinterestImage || body.primaryImage,
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === 'string'
        ? body.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [],
      features: Array.isArray(body.features)
        ? body.features
        : typeof body.features === 'string'
        ? body.features.split('\n').map((f: string) => f.trim()).filter(Boolean)
        : [],
      pros: Array.isArray(body.pros)
        ? body.pros
        : typeof body.pros === 'string'
        ? body.pros.split('\n').map((p: string) => p.trim()).filter(Boolean)
        : [],
      considerations: Array.isArray(body.considerations)
        ? body.considerations
        : typeof body.considerations === 'string'
        ? body.considerations.split('\n').map((c: string) => c.trim()).filter(Boolean)
        : [],
      isEditorsPick: Boolean(body.isEditorsPick),
      isFeatured: Boolean(body.isFeatured),
      isTrending: Boolean(body.isTrending),
      editorialNote: body.editorialNote || '',
      rating: 4.9,
      reviewCount: 1,
      createdAt: new Date().toISOString(),
    };

    const updated = [newProduct, ...currentProducts];
    saveServerProducts(updated);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isUserAuthenticated()) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication required to update products' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: 'Product ID is required for updating' },
        { status: 400 }
      );
    }

    const currentProducts = getServerProducts();
    const index = currentProducts.findIndex((p) => p.id === body.id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const existing = currentProducts[index];
    const updatedProduct: Product = {
      ...existing,
      ...body,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === 'string'
        ? body.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : existing.tags,
      features: Array.isArray(body.features)
        ? body.features
        : typeof body.features === 'string'
        ? body.features.split('\n').map((f: string) => f.trim()).filter(Boolean)
        : existing.features,
      pros: Array.isArray(body.pros)
        ? body.pros
        : typeof body.pros === 'string'
        ? body.pros.split('\n').map((p: string) => p.trim()).filter(Boolean)
        : existing.pros,
      considerations: Array.isArray(body.considerations)
        ? body.considerations
        : typeof body.considerations === 'string'
        ? body.considerations.split('\n').map((c: string) => c.trim()).filter(Boolean)
        : existing.considerations,
    };

    currentProducts[index] = updatedProduct;
    saveServerProducts(currentProducts);

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!isUserAuthenticated()) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication required to delete products' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID parameter is required' },
        { status: 400 }
      );
    }

    const currentProducts = getServerProducts();
    const filtered = currentProducts.filter((p) => p.id !== id);

    if (filtered.length === currentProducts.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    saveServerProducts(filtered);

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
