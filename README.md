# NHK — Premium Affiliate Marketing & Product Discovery Platform

> **"Discover Products Worth Loving."**

Official Pinterest Profile: [https://in.pinterest.com/mukeshparihar7838/](https://in.pinterest.com/mukeshparihar7838/)

NHK is a modern, editorial affiliate marketing platform designed specifically for Pinterest visitors, mobile discovery, and high-trust affiliate conversions.

---

## ✦ Brand Identity & Design Direction

- **Brand Personality**: Modern, Minimalistic, Premium, Trustworthy, Stylish, User-Friendly.
- **Color Palette**:
  - Warm Off-White: `#FAF9F6`
  - Soft Beige: `#EDE8DF`
  - Soft Sand: `#F4EFEA`
  - Charcoal: `#242424`
  - Muted Grey: `#777777`
  - Pure White: `#FFFFFF`
  - Accents: Subtle Gold (`#B38B59`) & Terracotta (`#C86D51`)
- **Typography**: Editorial Playfair Display headings paired with crisp Inter typography.

---

## ✦ Website Structure

1. **Home Page (`/`)**:
   - Editorial Hero Section with headline *"Find Your Next Favorite Thing."*, verified trust badges, and quick CTA.
   - **Trending Collections**: 5 visual category cards leading to filtered explore pages.
   - **Featured Products**: Responsive grid with verified pricing, badges, and quick affiliate preview.
   - **Pinterest Finds**: Masonry-style gallery linking directly to our Pinterest profile ([@mukeshparihar7838](https://in.pinterest.com/mukeshparihar7838/)).
   - **Editor's Picks**: Curation notes explaining *why* editors selected each piece.
   - **Weekly Newsletter**: Interactive subscription form with client validation.
   - **Global Footer**: Full brand story, links, socials, copyright, and FTC affiliate disclaimer.

2. **Explore Page (`/explore`)**:
   - Pinterest-style masonry grid layout or standard uniform grid toggle.
   - Instant live search by title, description, brand, or tag.
   - Category filter pills (Fashion & Accessories, Tech & Gadgets, Home & Living, Beauty & Lifestyle, Everyday Essentials).
   - Sorting by Trending, Editor's Picks, Price Low-High, Price High-Low, and Newest.

3. **Curated Categories (`/categories`)**:
   - Dedicated sections for all 5 departments with item counts, preview grids, and quick add buttons.

4. **Product Detail Pages (`/product/[slug]`)**:
   - Multi-image gallery with vertical Pinterest-friendly 3:4 aspect ratio.
   - Prominent **"Check Price / View Product"** affiliate button opening external links with `target="_blank" rel="sponsored noopener noreferrer"`.
   - Verified price and original price strike-through.
   - Honest editorial **Pros & Considerations** section.
   - Schema.org JSON-LD structured product metadata for Google Rich Snippets & Pinterest Rich Pins.
   - 1-click **"Save to Pinterest"** pin button.
   - Related products carousel.

5. **About Us (`/about`)**:
   - Editorial story, curation pillars, and reasons why readers trust NHK.

6. **Contact Page (`/contact`)**:
   - Validated interactive contact form, inquiry topics, and official Pinterest link.

7. **Legal & Transparency Pages**:
   - **Affiliate Disclosure (`/disclosure`)**: Comprehensive FTC compliance notice clearly stating reader-supported model at zero extra cost.
   - **Privacy Policy (`/privacy`)**
   - **Terms & Conditions (`/terms`)**

8. **Product & Affiliate Link Manager (`/admin`)**:
   - Open and accessible directly without password barriers.
   - Add, edit, delete products, and manage affiliate links with instant live updates.

---

## ✦ How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ Adding Your Products & Affiliate Links

You can add your products directly via the web interface:

1. Click **"+ Add Product"** in the top navigation or go to [http://localhost:3000/admin](http://localhost:3000/admin).
2. Enter:
   - Product Name
   - Category
   - Verified Price (and original retail price if on sale)
   - Your Affiliate Tracking URL (e.g. Amazon, Nordstrom, direct affiliate link)
   - Merchant/Store Name
   - Product Image URL (or pick from the one-click presets)
   - Tagline, description, pros, and considerations
3. Click **"Publish Product"**. The product is immediately published and visible across the homepage, explore page, and categories!

---

## ✦ Deployment to Vercel

```bash
# Deploy with Vercel CLI
vercel

# Or push to GitHub and import into Vercel
git push origin main
```
