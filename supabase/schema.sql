-- VeneRápido Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/nihveopdykvhgjezelxh/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- GLOBAL SETTINGS (Exchange Rate, etc.)
-- ============================================
CREATE TABLE global_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default exchange rate
INSERT INTO global_settings (key, value) VALUES
  ('exchange_rate', '{"usd_to_bs": 300}');

-- ============================================
-- AREAS (Delivery Zones/Cities)
-- ============================================
CREATE TABLE areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  state TEXT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MERCHANT CATEGORY TYPE
-- ============================================
CREATE TYPE merchant_category AS ENUM (
  'restaurante',
  'farmacia',
  'tienda',
  'otro'
);

-- ============================================
-- MERCHANTS (Stores/Restaurants)
-- ============================================
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  area_id UUID REFERENCES areas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  cover_url TEXT,
  tags TEXT[] DEFAULT '{}',
  merchant_category merchant_category DEFAULT 'restaurante',
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  delivery_time TEXT,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  is_open BOOLEAN DEFAULT true,
  is_open_override BOOLEAN DEFAULT NULL, -- Manual override for emergencies

  -- Legal entity info
  legal_name TEXT,
  rif TEXT,

  -- Location
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),

  -- Operating hours (JSONB for flexibility)
  schedule JSONB DEFAULT '{}',

  -- Payout configuration
  payout_config JSONB DEFAULT '{}',

  -- Auth
  email TEXT UNIQUE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CATEGORIES (Product Categories per Merchant)
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCTS (Menu Items)
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,

  -- Modifiers configuration (JSONB for flexibility)
  -- Example: {"mandatory": [{"name": "Tipo de pan", "options": ["Integral", "Harina"]}],
  --           "removables": ["Lechuga", "Tomate"],
  --           "extras": [{"name": "Huevo", "price": 2.00}]}
  modifiers JSONB DEFAULT '{}',

  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CUSTOMERS (Users)
-- ============================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  whatsapp TEXT UNIQUE NOT NULL,
  email TEXT,
  cedula TEXT, -- Hidden/private ID document
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CUSTOMER ADDRESSES (Saved Delivery Points)
-- ============================================
CREATE TABLE customer_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "Mi Casa", "Oficina"

  -- Location
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,

  -- Address type: casa, apartamento, oficina, hotel, barrio
  address_type TEXT NOT NULL,

  -- Conditional details based on type
  details JSONB DEFAULT '{}',
  -- Example for casa_urbanizacion:
  -- {"urbanization": "Las Mercedes", "gate_code": "1234", "is_private": true}
  -- Example for apartamento:
  -- {"building_name": "Torre Sol", "floor": "5", "apt_number": "5A"}

  reference_point TEXT,

  -- Delivery preference
  delivery_method TEXT DEFAULT 'personal', -- 'personal' or 'reception'

  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DRIVERS
-- ============================================
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle TEXT,
  plate TEXT,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDERS
-- ============================================
CREATE TYPE order_status AS ENUM (
  'pending_payment',
  'preparing',
  'delivering',
  'delivered',
  'cancelled'
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number SERIAL,

  -- Customer info
  customer_id UUID REFERENCES customers(id),
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT NOT NULL,
  customer_cedula TEXT,

  -- Delivery address (snapshot at order time)
  address_type TEXT NOT NULL,
  address_coordinates JSONB NOT NULL, -- {"lat": 9.9, "lng": -63.1}
  address_details JSONB DEFAULT '{}',
  delivery_method TEXT DEFAULT 'personal',

  -- If ordering for another person
  recipient_name TEXT,
  recipient_phone TEXT,

  -- Merchant
  merchant_id UUID REFERENCES merchants(id),
  merchant_name TEXT NOT NULL,

  -- Financials (all in USD, snapshot at order time)
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  exchange_rate DECIMAL(10,2) NOT NULL,
  total_bs DECIMAL(15,2) NOT NULL,

  -- Payment
  payment_method TEXT, -- 'pago_movil', 'transferencia', 'binance'
  payment_verified BOOLEAN DEFAULT false,
  payment_verified_at TIMESTAMPTZ,
  payment_verified_by UUID,

  -- Status
  status order_status DEFAULT 'pending_payment',

  -- Driver assignment
  driver_id UUID REFERENCES drivers(id),
  security_code TEXT, -- 3-6 digit code for delivery verification

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,

  -- Notes
  notes TEXT
);

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,

  -- Selected modifiers (snapshot)
  selected_modifiers JSONB DEFAULT '{}',
  -- Example: {"mandatory": {"Tipo de pan": "Integral"},
  --           "removables": ["Sin lechuga"],
  --           "extras": [{"name": "Huevo", "price": 2.00}]}

  extras_total DECIMAL(10,2) DEFAULT 0,
  line_total DECIMAL(10,2) NOT NULL,

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_merchants_area ON merchants(area_id);
CREATE INDEX idx_merchants_slug ON merchants(slug);
CREATE INDEX idx_products_merchant ON products(merchant_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_merchant ON orders(merchant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_customer_addresses_customer ON customer_addresses(customer_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for areas, merchants, categories, products
CREATE POLICY "Public read access" ON areas FOR SELECT USING (true);
CREATE POLICY "Public read access" ON merchants FOR SELECT USING (true);
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON global_settings FOR SELECT USING (true);

-- Customers can read/update their own data
CREATE POLICY "Users can view own profile" ON customers
  FOR SELECT USING (auth.uid() = auth_id);
CREATE POLICY "Users can update own profile" ON customers
  FOR UPDATE USING (auth.uid() = auth_id);

-- Customer addresses - users can manage their own
CREATE POLICY "Users can manage own addresses" ON customer_addresses
  FOR ALL USING (
    customer_id IN (SELECT id FROM customers WHERE auth_id = auth.uid())
  );

-- Orders - customers can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE auth_id = auth.uid())
  );
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (
    customer_id IN (SELECT id FROM customers WHERE auth_id = auth.uid())
  );

-- Order items - same as orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM orders WHERE customer_id IN (
        SELECT id FROM customers WHERE auth_id = auth.uid()
      )
    )
  );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get current exchange rate
CREATE OR REPLACE FUNCTION get_exchange_rate()
RETURNS DECIMAL AS $$
  SELECT (value->>'usd_to_bs')::DECIMAL
  FROM global_settings
  WHERE key = 'exchange_rate';
$$ LANGUAGE SQL STABLE;

-- Function to generate security code
CREATE OR REPLACE FUNCTION generate_security_code()
RETURNS TEXT AS $$
  SELECT LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
$$ LANGUAGE SQL;

-- Trigger to set security code on order status change to delivering
CREATE OR REPLACE FUNCTION set_security_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'delivering' AND OLD.status != 'delivering' THEN
    NEW.security_code := generate_security_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER order_security_code
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_security_code();

-- Function to count merchants per area
CREATE OR REPLACE FUNCTION get_area_merchant_count(area_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM merchants WHERE area_id = area_uuid AND is_open = true;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- SEED DATA (Sample Areas)
-- ============================================
INSERT INTO areas (name, slug, state, image_url) VALUES
  ('Punta de Mata', 'punta-de-mata', 'Monagas', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'),
  ('Maturín', 'maturin', 'Monagas', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop'),
  ('Puerto La Cruz', 'puerto-la-cruz', 'Anzoátegui', 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop'),
  ('Barcelona', 'barcelona', 'Anzoátegui', 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop'),
  ('Ciudad Bolívar', 'ciudad-bolivar', 'Bolívar', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop'),
  ('Ciudad Guayana', 'ciudad-guayana', 'Bolívar', 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=300&fit=crop');
