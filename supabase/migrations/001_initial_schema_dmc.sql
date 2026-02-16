-- ============================================================
-- DMCMY Schema - Shares Epic Buzz (TeamBuildingMY) Supabase
-- All tables use _dmc suffix to coexist with TeamBuilding tables
-- Pattern follows: providers_corporate (TeamBuildingMY)
-- ============================================================

-- Enable UUID extension (if not already enabled by TeamBuilding)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: companies_dmc
-- ============================================================
CREATE TABLE companies_dmc (
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

-- ============================================================
-- TABLE: inquiries_dmc
-- ============================================================
CREATE TABLE inquiries_dmc (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Type: 'broadcast' (floating button) or 'company' (company-specific)
  source TEXT NOT NULL CHECK (source IN ('floating_button', 'company_specific_inquiry')),

  -- Company reference (null for broadcast)
  company_id UUID REFERENCES companies_dmc(id) ON DELETE SET NULL,

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

-- ============================================================
-- TABLE: claim_requests_dmc
-- ============================================================
CREATE TABLE claim_requests_dmc (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  company_id UUID REFERENCES companies_dmc(id) ON DELETE CASCADE,
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

-- ============================================================
-- INDEXES
-- ============================================================

-- companies_dmc indexes
CREATE INDEX idx_companies_dmc_slug ON companies_dmc(slug);
CREATE INDEX idx_companies_dmc_state ON companies_dmc(state);
CREATE INDEX idx_companies_dmc_is_premium ON companies_dmc(is_premium DESC); -- Premium first
CREATE INDEX idx_companies_dmc_is_published ON companies_dmc(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_companies_dmc_claimed_by ON companies_dmc(claimed_by);
CREATE INDEX idx_companies_dmc_service_categories ON companies_dmc USING GIN(service_categories);
CREATE INDEX idx_companies_dmc_destination_expertise ON companies_dmc USING GIN(destination_expertise);

-- inquiries_dmc indexes
CREATE INDEX idx_inquiries_dmc_company_id ON inquiries_dmc(company_id);
CREATE INDEX idx_inquiries_dmc_created_at ON inquiries_dmc(created_at DESC);
CREATE INDEX idx_inquiries_dmc_source ON inquiries_dmc(source);

-- claim_requests_dmc indexes
CREATE INDEX idx_claim_requests_dmc_status ON claim_requests_dmc(status) WHERE status = 'pending';
CREATE INDEX idx_claim_requests_dmc_user_id ON claim_requests_dmc(user_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE companies_dmc ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries_dmc ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_requests_dmc ENABLE ROW LEVEL SECURITY;

-- companies_dmc policies
CREATE POLICY "dmc_public_can_view_published_companies"
  ON companies_dmc FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "dmc_users_can_update_their_claimed_companies"
  ON companies_dmc FOR UPDATE
  USING (claimed_by = auth.uid());

CREATE POLICY "dmc_authenticated_users_can_insert_companies"
  ON companies_dmc FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- inquiries_dmc policies
CREATE POLICY "dmc_anyone_can_create_inquiries"
  ON inquiries_dmc FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "dmc_company_owners_can_view_their_inquiries"
  ON inquiries_dmc FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies_dmc WHERE claimed_by = auth.uid()
    )
  );

-- claim_requests_dmc policies
CREATE POLICY "dmc_users_can_create_claim_requests"
  ON claim_requests_dmc FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "dmc_users_can_view_their_own_claim_requests"
  ON claim_requests_dmc FOR SELECT
  USING (user_id = auth.uid());

-- ============================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================

-- Updated_at trigger function (shared, may already exist from TeamBuilding)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to companies_dmc
CREATE TRIGGER companies_dmc_updated_at
  BEFORE UPDATE ON companies_dmc
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- View count increment function for DMC
CREATE OR REPLACE FUNCTION increment_view_count_dmc(company_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE companies_dmc
  SET view_count = view_count + 1
  WHERE id = company_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- COMMENTS
-- ============================================================

COMMENT ON TABLE companies_dmc IS 'DMC (Destination Management Company) listings - shares Epic Buzz database with TeamBuildingMY';
COMMENT ON TABLE inquiries_dmc IS 'Lead inquiries for DMC companies (broadcast and company-specific)';
COMMENT ON TABLE claim_requests_dmc IS 'Vendor requests to claim their DMC company listing';
