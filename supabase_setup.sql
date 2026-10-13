-- ===================================================================
-- M.S TRADERS (সুরিতলা, ঢাকা)
-- PERMANENT CLOUD DATABASE SETUP SCRIPT (SUPABASE)
-- 100% Free Forever, Multi-Device Cloud Sync, Zero Data Loss
-- ===================================================================

-- 1. Create the permanent customers & ledger table
CREATE TABLE IF NOT EXISTS ms_traders_customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT DEFAULT 'সুরিতলা, ঢাকা',
  sales JSONB DEFAULT '[]'::jsonb,
  payments JSONB DEFAULT '[]'::jsonb,
  created TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE ms_traders_customers ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous access policy using the public anon key
DROP POLICY IF EXISTS "Allow anon all operations" ON ms_traders_customers;
CREATE POLICY "Allow anon all operations" ON ms_traders_customers
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Enable Realtime updates
ALTER PUBLICATION supabase_realtime ADD TABLE ms_traders_customers;
