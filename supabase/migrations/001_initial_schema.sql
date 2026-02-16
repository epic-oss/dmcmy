-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Basic info
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  gallery_images TEXT[],

  -- Location
  state TEXT NOT NULL,
  city TEXT,
  address TEXT,
  postal_code TEXT,

  -- Contact
  email TEXT,
  phone TEXT,
  website_url TEXT,

  -- Services & expertise (arrays from config)
  service_categories TEXT[] DEFAULT '{}',
  destination_expertise TEXT[] DEFAULT '{}',

  -- Capacity & pricing
  min_budget_myr INTEGER,
  max_budget_myr INTEGER,
  min_group_size INTEGER,
  max_group_size INTEGER,
  price_tier TEXT CHECK (price_tier IN ('budget', 'mid-range', 'premium', 'luxury')),

  -- Additional details
  certifications TEXT[],
  languages TEXT[],
  established_year INTEGER,

  -- Premium features
  is_premium BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  premium_started_at TIMESTAMPTZ,
  premium_expires_at TIMESTAMPTZ,

  -- Stripe
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,

  -- Ownership
  is_claimed BOOLEAN DEFAULT FALSE,
  claimed_by UUID REFERENCES auth.users(id),
  claimed_at TIMESTAMPTZ,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Status
  is_published BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,

  -- Stats
  view_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0
);

-- Inquiries table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Type: 'broadcast' (floating button) or 'company' (company-specific)
  source TEXT NOT NULL CHECK (source IN ('floating_button', 'company_specific_inquiry')),

  -- Company reference (null for broadcast)
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,

  -- Contact info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  lead_company TEXT, -- Company name of the inquirer

  -- Event details
  event_type TEXT,
  group_size TEXT,
  preferred_destination TEXT,
  preferred_dates TEXT,
  estimated_budget TEXT,
  special_requirements TEXT,
  message TEXT,

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),

  -- Make.com webhook tracking
  webhook_sent_at TIMESTAMPTZ,
  webhook_status TEXT
);

-- Claim requests table
CREATE TABLE claim_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Verification info
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  requester_phone TEXT,
  position TEXT,
  verification_notes TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,

  UNIQUE(company_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_state ON companies(state);
CREATE INDEX idx_companies_is_premium ON companies(is_premium DESC); -- Premium first
CREATE INDEX idx_companies_is_published ON companies(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_companies_claimed_by ON companies(claimed_by);
CREATE INDEX idx_companies_service_categories ON companies USING GIN(service_categories);
CREATE INDEX idx_companies_destination_expertise ON companies USING GIN(destination_expertise);

CREATE INDEX idx_inquiries_company_id ON inquiries(company_id);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_source ON inquiries(source);

CREATE INDEX idx_claim_requests_status ON claim_requests(status) WHERE status = 'pending';
CREATE INDEX idx_claim_requests_user_id ON claim_requests(user_id);

-- Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_requests ENABLE ROW LEVEL SECURITY;

-- Companies policies
CREATE POLICY "Public can view published companies"
  ON companies FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Users can update their claimed companies"
  ON companies FOR UPDATE
  USING (claimed_by = auth.uid());

CREATE POLICY "Authenticated users can insert companies"
  ON companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Inquiries policies
CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Company owners can view their inquiries"
  ON inquiries FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies WHERE claimed_by = auth.uid()
    )
  );

-- Claim requests policies
CREATE POLICY "Users can create claim requests"
  ON claim_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own claim requests"
  ON claim_requests FOR SELECT
  USING (user_id = auth.uid());

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- View count increment function
CREATE OR REPLACE FUNCTION increment_view_count(company_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE companies
  SET view_count = view_count + 1
  WHERE id = company_id;
END;
$$ LANGUAGE plpgsql;
