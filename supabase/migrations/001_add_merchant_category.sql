-- Migration: Add merchant_category column to merchants table
-- Run this in your Supabase SQL Editor if you already have the merchants table

-- Step 1: Create the enum type if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'merchant_category') THEN
        CREATE TYPE merchant_category AS ENUM (
            'restaurante',
            'farmacia',
            'tienda',
            'otro'
        );
    END IF;
END $$;

-- Step 2: Add the column to the merchants table
ALTER TABLE merchants
ADD COLUMN IF NOT EXISTS merchant_category merchant_category DEFAULT 'restaurante';

-- Step 3: Update existing merchants with a category based on their tags (optional)
-- Uncomment and modify as needed:
-- UPDATE merchants SET merchant_category = 'farmacia' WHERE 'Farmacia' = ANY(tags) OR 'Medicinas' = ANY(tags);
-- UPDATE merchants SET merchant_category = 'tienda' WHERE 'Tienda' = ANY(tags) OR 'Supermercado' = ANY(tags);

-- Create an index for faster filtering
CREATE INDEX IF NOT EXISTS idx_merchants_category ON merchants(merchant_category);
