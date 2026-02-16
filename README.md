# DMCMY - Malaysia's Premier DMC Directory

A Next.js 14+ directory platform for Destination Management Companies in Malaysia, featuring premium/freemium subscriptions, lead capture, and comprehensive SEO.

## 🔗 Shared Database Architecture

**DMCMY shares the Epic Buzz (TeamBuildingMY) Supabase project** to reduce costs and enable cross-directory features.

- **Database:** Same Supabase instance as TeamBuildingMY
- **Table Naming:** All tables use `_dmc` suffix (e.g., `companies_dmc`, `inquiries_dmc`)
- **Pattern:** Follows `providers_corporate` from TeamBuildingMY
- **Auth:** Shared `auth.users` table across both directories
- **Benefits:**
  - Single auth system (users can access both directories)
  - Reduced infrastructure costs
  - Potential for cross-directory features
  - Unified admin dashboard

## 🚀 Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript, Server Components)
- **Styling:** Tailwind CSS + Shadcn UI
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Lead Distribution:** Make.com webhook integration
- **Deployment:** Vercel

> **Note:** Payment/subscription features are not yet implemented. Premium status is currently managed manually via the admin panel.

## 📁 Project Structure

```
dmcmy/
├── app/
│   ├── (public)/         # Public-facing pages
│   ├── (dashboard)/      # Vendor dashboard
│   ├── (admin)/          # Admin panel
│   ├── (auth)/           # Login/signup
│   ├── api/              # API routes (webhooks)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ui/               # Shadcn base components
│   ├── shared/           # Business components
│   ├── forms/            # Form components
│   ├── dashboard/        # Dashboard components
│   └── admin/            # Admin components
├── lib/
│   ├── config.ts         # Site configuration (CRITICAL)
│   ├── supabase/         # Supabase clients
│   ├── services/         # Data access layer
│   ├── utils/            # Utility functions
│   ├── schemas/          # JSON-LD schema generators
│   └── content/          # SEO content
├── types/
│   └── database.ts       # Supabase types
├── supabase/
│   └── migrations/       # Database schema
└── public/               # Static assets
```

## 🔧 Setup Instructions

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - **Same as TeamBuildingMY** (Epic Buzz Supabase project)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - **Same as TeamBuildingMY**
- `SUPABASE_SERVICE_ROLE_KEY` - **Same as TeamBuildingMY** (for admin operations)
- `MAKE_WEBHOOK_URL` - Make.com webhook URL for lead distribution
- `NEXT_PUBLIC_SITE_URL` - Your site URL (http://localhost:3000 for dev)
- `ADMIN_USER_IDS` - Comma-separated Supabase user IDs for admin access (add after first signup)

### 2. Database Setup

**Using Epic Buzz (TeamBuildingMY) Supabase Project:**

1. Open the Epic Buzz Supabase project SQL editor
2. Run the migration script to create `_dmc` tables:
   ```sql
   -- Copy and paste contents from supabase/migrations/001_initial_schema_dmc.sql
   ```
3. This creates:
   - `companies_dmc` - DMC company listings
   - `inquiries_dmc` - Lead inquiries
   - `claim_requests_dmc` - Vendor claim requests
   - All with appropriate RLS policies and indexes

**Note:** Tables use `_dmc` suffix to coexist with TeamBuildingMY tables (`providers_corporate`, etc.)

### 3. Make.com Setup

1. Create a Make.com scenario with a webhook trigger
2. Copy the webhook URL to `MAKE_WEBHOOK_URL`
3. Configure the scenario to:
   - Receive lead data
   - Send email to premium vendors (broadcast leads)
   - Send email to specific company (company-specific leads)

### 4. Install Dependencies & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## ✅ Phase 1: Foundation (COMPLETED)

**What's Been Built:**

✅ Project initialized with Next.js 14+ and TypeScript
✅ Tailwind CSS configured with custom theme (deep navy + gold accent)
✅ Site configuration file created (`lib/config.ts`)
  - 16 Malaysian states
  - 12 service categories
  - 16 popular destinations
  - Event types and budget ranges
✅ Complete Supabase schema with RLS policies
  - Companies table (with premium fields)
  - Inquiries table (broadcast + company-specific)
  - Claim requests table
  - Indexes for performance
✅ Supabase client utilities (server, client, admin)
✅ Database TypeScript types
✅ Basic app structure (root layout, public layout, placeholder homepage)

**Critical Files Created:**
1. `lib/config.ts` - Site configuration
2. `supabase/migrations/001_initial_schema.sql` - Database schema
3. `lib/supabase/server.ts` - Server-side Supabase client
4. `types/database.ts` - Database types

## 🔄 Next Steps (Phase 2-16)

### Phase 2: Data Access Layer (COMPLETED)
- Create service functions for companies, inquiries, claims
- Build validation schemas with Zod
- Lead capture with Make.com webhook

### Phase 3: Core UI Components
- Install Shadcn UI components
- Build CompanyCard, Hero, InquiryModal, FloatingQuoteButton
- Create shared components

### Phase 4-5: Core Pages
- Homepage with featured companies
- Listings page with filtering
- Company profile pages

### Phase 6-7: SEO Content
- Generate 33 SEO landing pages (AI-written content)
- Create 8 comprehensive guide articles

### Phase 8-10: Features
- Lead capture system
- Vendor dashboard
- Premium subscription flow

### Phase 11-12: Admin & Import
- Admin panel
- CSV import tool for Outscraper data

### Phase 13-16: Polish & Deploy
- Dynamic sitemap
- Schema markup
- Testing
- Vercel deployment

## 📊 Page Count: ~48 Routes

- 1 Homepage
- 1 Listings page
- Dynamic company profiles
- 16 Location pages (states)
- 9 Destination pages
- 8 Service pages
- 8 Guide articles
- Pricing, Submit, Dashboard, Admin pages

## 🎨 Design System

**Colors:**
- Primary: Deep Navy (#1a365d)
- Accent: Gold (#d4a854)
- Background: White
- Muted: Light Gray

**Typography:**
- Font: Inter (sans-serif)
- Mobile-first responsive design

## 📖 Key Features

### For Event Planners (Buyers)
- Browse and filter DMCs by state, service, destination
- Get free quotes from multiple providers (broadcast)
- Request quotes from specific companies
- Read educational guides about DMCs and MICE events

### For DMC Vendors
- Free basic listing in directory
- Premium subscription (RM99/month):
  - Priority placement
  - Receive broadcast leads
  - Enhanced profile with logo/gallery
  - Lead analytics

### For Admins
- Approve/reject claim requests
- Manage all companies
- View all inquiries
- Import companies from CSV (Outscraper)

## 🔐 Security

- Row Level Security (RLS) on all tables
- Admin routes protected by user ID check
- Service role key only used in admin client
- Environment variables for all secrets

## 📚 Documentation

- Implementation plan: `C:\Users\user\.claude\plans\floating-splashing-biscuit.md`
- This README
- Inline code comments

## 🐛 Development

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 🚢 Deployment

1. Push code to GitHub
2. Deploy to Vercel
3. Add environment variables in Vercel dashboard
4. Test Make.com webhook integration
5. Submit sitemap to Google Search Console

---

Built with ❤️ for Malaysia's DMC industry
