-- VeneRápido Seed Data
-- Run this AFTER schema.sql in your Supabase SQL Editor

-- ============================================
-- Get Area IDs (from schema.sql seed)
-- ============================================
DO $$
DECLARE
  punta_de_mata_id UUID;
  maturin_id UUID;
  cat_promo_id UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  cat_aperi_id UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  cat_hambu_id UUID := 'cccccccc-cccc-cccc-cccc-cccccccccccc';
  cat_ensal_id UUID := 'dddddddd-dddd-dddd-dddd-dddddddddddd';
  cat_pizza_id UUID := 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';
  cat_arepa_id UUID := 'ffffffff-ffff-ffff-ffff-ffffffffffff';
  cat_empan_id UUID := '11111111-aaaa-aaaa-aaaa-111111111111';
  cat_cacha_id UUID := '22222222-aaaa-aaaa-aaaa-222222222222';
  cat_bebid_id UUID := '33333333-aaaa-aaaa-aaaa-333333333333';
  cat_postr_id UUID := '44444444-aaaa-aaaa-aaaa-444444444444';
BEGIN
  SELECT id INTO punta_de_mata_id FROM areas WHERE slug = 'punta-de-mata';
  SELECT id INTO maturin_id FROM areas WHERE slug = 'maturin';

  -- ============================================
  -- MERCHANTS
  -- ============================================

  -- Punta de Mata Merchants (using ON CONFLICT to avoid duplicates)
  INSERT INTO merchants (id, area_id, name, slug, description, image_url, cover_url, tags, rating, review_count, delivery_time, delivery_fee, is_open, email)
  VALUES
    ('11111111-1111-1111-1111-111111111111', punta_de_mata_id, 'Baroko Grill', 'baroko-grill', 'Parrilla y carnes a la brasa', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=400&fit=crop', ARRAY['Parrilla', 'Carnes'], 4.7, 156, '30-45 min', 2.50, true, 'baroko@test.com'),

    ('22222222-2222-2222-2222-222222222222', punta_de_mata_id, 'Ortimed Restaurant', 'ortimed-restaurant', 'Restaurante de comida americana y carnes premium', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=400&fit=crop', ARRAY['Americano', 'Carne', 'Hamburguesas'], 4.8, 234, '25-35 min', 2.00, true, 'ortimed@test.com'),

    ('33333333-3333-3333-3333-333333333333', punta_de_mata_id, 'La Despensa', 'la-despensa', 'Pizzas artesanales y comida italiana', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=400&fit=crop', ARRAY['Italiano', 'Pizzas'], 4.5, 189, '35-50 min', 3.00, true, 'ladespensa@test.com'),

    ('44444444-4444-4444-4444-444444444444', punta_de_mata_id, 'Chu Lee', 'chu-lee', 'Comida china y batidos tropicales', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=400&fit=crop', ARRAY['Chino', 'Batidos'], 4.6, 145, '30-40 min', 2.50, true, 'chulee@test.com'),

    ('55555555-5555-5555-5555-555555555555', punta_de_mata_id, 'Arepera La Reina', 'arepera-la-reina', 'Las mejores arepas rellenas de la ciudad', 'https://images.unsplash.com/photo-1599139849624-87c3f6a3ef4a?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1599139849624-87c3f6a3ef4a?w=800&h=400&fit=crop', ARRAY['Venezolano', 'Arepas', 'Desayuno'], 4.9, 312, '15-25 min', 1.50, true, 'arepera@test.com'),

    ('66666666-6666-6666-6666-666666666666', punta_de_mata_id, 'Sushi Express', 'sushi-express', 'Sushi fresco y rolls especiales', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=400&fit=crop', ARRAY['Japonés', 'Sushi'], 4.4, 98, '40-55 min', 4.00, false, 'sushi@test.com')
  ON CONFLICT (id) DO NOTHING;

  -- Maturin Merchants
  INSERT INTO merchants (id, area_id, name, slug, description, image_url, cover_url, tags, rating, review_count, delivery_time, delivery_fee, is_open, email)
  VALUES
    ('77777777-7777-7777-7777-777777777777', maturin_id, 'El Gran Pollo', 'el-gran-pollo', 'Pollo frito crujiente estilo venezolano', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=400&fit=crop', ARRAY['Pollo', 'Frito', 'Venezolano'], 4.6, 267, '25-35 min', 2.00, true, 'granpollo@test.com'),

    ('88888888-8888-8888-8888-888888888888', maturin_id, 'Taquería El Mexicano', 'taqueria-el-mexicano', 'Auténticos tacos y burritos mexicanos', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=400&fit=crop', ARRAY['Mexicano', 'Tacos'], 4.5, 178, '20-30 min', 2.50, true, 'taqueria@test.com')
  ON CONFLICT (id) DO NOTHING;

  -- ============================================
  -- CATEGORIES for Ortimed Restaurant
  -- ============================================
  INSERT INTO categories (id, merchant_id, name, sort_order)
  VALUES
    (cat_promo_id, '22222222-2222-2222-2222-222222222222', 'Promos', 1),
    (cat_aperi_id, '22222222-2222-2222-2222-222222222222', 'Aperitivos', 2),
    (cat_hambu_id, '22222222-2222-2222-2222-222222222222', 'Hamburguesas', 3),
    (cat_ensal_id, '22222222-2222-2222-2222-222222222222', 'Ensaladas', 4),
    (cat_pizza_id, '22222222-2222-2222-2222-222222222222', 'Pizzas', 5),
    (cat_arepa_id, '22222222-2222-2222-2222-222222222222', 'Arepas', 6),
    (cat_empan_id, '22222222-2222-2222-2222-222222222222', 'Empanadas', 7),
    (cat_cacha_id, '22222222-2222-2222-2222-222222222222', 'Cachapas', 8),
    (cat_bebid_id, '22222222-2222-2222-2222-222222222222', 'Bebidas', 9),
    (cat_postr_id, '22222222-2222-2222-2222-222222222222', 'Postres', 10)
  ON CONFLICT (id) DO NOTHING;

  -- ============================================
  -- PRODUCTS for Ortimed Restaurant
  -- ============================================

  -- Promos
  INSERT INTO products (merchant_id, category_id, name, description, price, image_url, modifiers, sort_order)
  VALUES
    ('22222222-2222-2222-2222-222222222222', cat_promo_id, 'Combo Dúo Burger', '2 Hamburguesas clásicas + ración de papas fritas familiar + refresco de 1L por un precio especial.', 5.00, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
    '{"mandatory": [{"name": "Tipo de pan", "options": ["Integral", "De harina"]}], "removables": ["Lechuga", "Tomate", "Salsa rosada"], "extras": [{"name": "Huevo", "price": 2}, {"name": "Papitas Fritas", "price": 2}, {"name": "Queso Frito", "price": 3}]}'::jsonb, 1)
  ON CONFLICT DO NOTHING;

  -- Aperitivos
  INSERT INTO products (merchant_id, category_id, name, description, price, image_url, modifiers, sort_order)
  VALUES
    ('22222222-2222-2222-2222-222222222222', cat_aperi_id, 'Tequeños Full Queso', '6 unidades de deditos de queso tradicionales acompañados de nuestra salsa tártara de la casa.', 5.00, 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=400&h=300&fit=crop',
    '{"extras": [{"name": "Salsa extra", "price": 1}]}'::jsonb, 1),

    ('22222222-2222-2222-2222-222222222222', cat_aperi_id, 'Nachos Supreme', 'Nachos con queso cheddar, guacamole, crema agria y jalapeños.', 6.00, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop',
    '{"removables": ["Jalapeños", "Crema agria"], "extras": [{"name": "Carne molida", "price": 3}, {"name": "Extra queso", "price": 2}]}'::jsonb, 2)
  ON CONFLICT DO NOTHING;

  -- Hamburguesas
  INSERT INTO products (merchant_id, category_id, name, description, price, image_url, modifiers, sort_order)
  VALUES
    ('22222222-2222-2222-2222-222222222222', cat_hambu_id, 'Super Burger', 'Deliciosa hamburguesa con carne de res. Incluye salsa rosada, tomates y lechuga.', 5.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    '{"mandatory": [{"name": "Tipo de pan", "options": ["Integral", "De harina"]}], "removables": ["Lechuga", "Tomate", "Salsa rosada"], "extras": [{"name": "Huevo", "price": 2}, {"name": "Papitas Fritas", "price": 2}, {"name": "Queso Frito", "price": 3}]}'::jsonb, 1),

    ('22222222-2222-2222-2222-222222222222', cat_hambu_id, 'Mega Carnes', 'Deliciosa hamburguesa con carne de res. Incluye salsa rosada, tomates y lechuga.', 7.00, 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
    '{"mandatory": [{"name": "Tipo de pan", "options": ["Integral", "De harina"]}], "removables": ["Lechuga", "Tomate", "Salsa rosada"], "extras": [{"name": "Huevo", "price": 2}, {"name": "Tocino", "price": 3}, {"name": "Queso extra", "price": 2}]}'::jsonb, 2),

    ('22222222-2222-2222-2222-222222222222', cat_hambu_id, 'La Bestia 2.0', 'Doble carne de res (150g c/u), chuleta ahumada, huevo frito, queso de mano, jamón, vegetales frescos.', 5.00, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop',
    '{"mandatory": [{"name": "Tipo de pan", "options": ["Integral", "De harina"]}], "removables": ["Lechuga", "Tomate", "Cebolla"], "extras": [{"name": "Carne extra", "price": 4}, {"name": "Queso Frito", "price": 3}]}'::jsonb, 3),

    ('22222222-2222-2222-2222-222222222222', cat_hambu_id, 'VeneRápida Especial', 'Carne de res premium, queso de mano, jamón, huevo, vegetales frescos, papas ralladas crujientes.', 5.00, 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    '{"mandatory": [{"name": "Tipo de pan", "options": ["Integral", "De harina"]}], "removables": ["Lechuga", "Tomate", "Salsa especial"], "extras": [{"name": "Huevo", "price": 2}, {"name": "Tocino", "price": 3}]}'::jsonb, 4)
  ON CONFLICT DO NOTHING;

  -- Bebidas
  INSERT INTO products (merchant_id, category_id, name, description, price, image_url, modifiers, sort_order)
  VALUES
    ('22222222-2222-2222-2222-222222222222', cat_bebid_id, 'Refresco 500ml', 'Coca-Cola, Pepsi, Sprite o Fanta', 1.50, 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop',
    '{"mandatory": [{"name": "Sabor", "options": ["Coca-Cola", "Pepsi", "Sprite", "Fanta"]}]}'::jsonb, 1),

    ('22222222-2222-2222-2222-222222222222', cat_bebid_id, 'Jugo Natural', 'Naranja, Piña, Patilla o Lechosa', 2.50, 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&h=300&fit=crop',
    '{"mandatory": [{"name": "Sabor", "options": ["Naranja", "Piña", "Patilla", "Lechosa"]}]}'::jsonb, 2),

    ('22222222-2222-2222-2222-222222222222', cat_bebid_id, 'Malteada', 'Chocolate, Vainilla o Fresa', 4.00, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
    '{"mandatory": [{"name": "Sabor", "options": ["Chocolate", "Vainilla", "Fresa"]}], "extras": [{"name": "Crema batida", "price": 1}]}'::jsonb, 3)
  ON CONFLICT DO NOTHING;

  -- ============================================
  -- Update exchange rate to match design (Bs.282)
  -- ============================================
  UPDATE global_settings SET value = '{"usd_to_bs": 282}' WHERE key = 'exchange_rate';

END $$;
