-- ===================================================================
-- M.S TRADERS (সুরিতলা, ঢাকা)
-- COMPLETE DATABASE SETUP SCRIPT (SUPABASE)
-- Tables: Customers (Pawna), Suppliers (Dena), Expenses (Dokan Khoroch)
-- 100% Free Forever, Multi-Device Cloud Sync, Zero Data Loss
-- ===================================================================

-- 1. Table for PAWNA (Customers & Credit Sales)
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

-- 2. Table for DENA (Suppliers / Mahajan Liabilities)
CREATE TABLE IF NOT EXISTS ms_traders_suppliers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT DEFAULT 'সাপ্লায়ার / মিল',
  purchases JSONB DEFAULT '[]'::jsonb,
  payments JSONB DEFAULT '[]'::jsonb,
  created TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table for DAILY EXPENSES (দোকান খরচ)
CREATE TABLE IF NOT EXISTS ms_traders_expenses (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  note TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE ms_traders_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ms_traders_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ms_traders_expenses ENABLE ROW LEVEL SECURITY;

-- 5. Public read/write policy with anon key
DROP POLICY IF EXISTS "Allow anon all on customers" ON ms_traders_customers;
CREATE POLICY "Allow anon all on customers" ON ms_traders_customers FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all on suppliers" ON ms_traders_suppliers;
CREATE POLICY "Allow anon all on suppliers" ON ms_traders_suppliers FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon all on expenses" ON ms_traders_expenses;
CREATE POLICY "Allow anon all on expenses" ON ms_traders_expenses FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 6. Enable Realtime updates
ALTER PUBLICATION supabase_realtime ADD TABLE ms_traders_customers;
ALTER PUBLICATION supabase_realtime ADD TABLE ms_traders_suppliers;
ALTER PUBLICATION supabase_realtime ADD TABLE ms_traders_expenses;
