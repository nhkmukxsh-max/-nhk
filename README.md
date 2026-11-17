# NHK — Premium Affiliate Marketing & Product Discovery Platform

> **"Discover Products Worth Loving."**

Official Pinterest Profile: [https://in.pinterest.com/mukeshparihar7838/](https://in.pinterest.com/mukeshparihar7838/)

NHK is an editorial affiliate marketing platform designed specifically for Pinterest visitors, mobile discovery, and high-trust affiliate conversions.

---

## ✦ Access & Security Architecture

1. **Public Website (For Everyone)**:
   - Anyone can access and browse the entire website without any password or login requirements.
   - All "+ Add Product" buttons and controls are completely hidden from public visitors.
   - Features: Home, Explore (with live search & category filters), Categories, Product Detail, About Us, Contact, and FTC-compliant Legal disclosures.

2. **Admin Portal (Protected For You)**:
   - Restricted to the administrator at `/admin`.
   - Requires entering your secure admin passcode to unlock.
   - **Default Passcode**: `nhk2026admin` (can be changed to any custom password via `ADMIN_PASSWORD` in `.env.local`).
   - The backend API (`POST`, `PUT`, `DELETE` on `/api/products`) enforces authorization so only the authenticated admin can add, edit, or delete products and affiliate links.

---

## ✦ How to Add Products & Affiliate Links (Admin Only)

1. Navigate to: **[http://localhost:3000/admin](http://localhost:3000/admin)**
2. Enter your admin passcode (`nhk2026admin`) and click **"Unlock Admin Portal"**.
3. Once unlocked, click **"+ Add New Product"**.
4. Enter:
   - **Product Name**
   - **Affiliate Destination Link** (your Amazon Associates or partner referral URL)
   - **Category** (Fashion & Accessories, Tech & Gadgets, Home & Living, Beauty & Lifestyle, Everyday Essentials)
   - **Verified Price** (and optional original price)
   - **Merchant Name** (e.g. Amazon, Nordstrom, Direct)
   - **Photo URL** (paste any image URL or select from one-click curated presets)
   - Tagline, description, pros, and considerations
5. Click **"Publish Product"**. The product goes live immediately across the homepage, explore grid, and category sections.
6. When done, click **"Sign Out"** to lock the portal.

---

## ✦ How to Run Locally

```bash
# 1. Install dependencies (if needed)
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ Deploying to Vercel

```bash
# 1. Push your changes to Git:
git add .
git commit -m "feat: secure admin-only product management and public landing page"
git push origin main

# 2. In Vercel, set the following Environment Variable:
# ADMIN_PASSWORD = your_secret_admin_passcode
```
