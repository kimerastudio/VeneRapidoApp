import { supabase } from './supabase'
import type {
  Area,
  Merchant,
  Category,
  Product,
  GlobalSettings,
} from '@/types/database'

// ============================================
// Areas
// ============================================

export async function getAreas(): Promise<Area[]> {
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data || []
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    throw error
  }
  return data
}

// ============================================
// Merchants
// ============================================

export async function getMerchantsByArea(areaId: string): Promise<Merchant[]> {
  const { data, error } = await supabase
    .from('merchants')
    .select('*')
    .eq('area_id', areaId)
    .order('is_open', { ascending: false })
    .order('rating', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getMerchantBySlug(slug: string): Promise<Merchant | null> {
  const { data, error } = await supabase
    .from('merchants')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

// ============================================
// Categories & Products
// ============================================

export async function getCategoriesByMerchant(merchantId: string): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('is_active', true)
    .order('sort_order')

  if (error) throw error
  return data || []
}

export async function getProductsByMerchant(merchantId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('is_available', true)
    .order('sort_order')

  if (error) throw error
  return data || []
}

// ============================================
// Global Settings
// ============================================

export async function getExchangeRate(): Promise<number> {
  const { data, error } = await supabase
    .from('global_settings')
    .select('value')
    .eq('key', 'exchange_rate')
    .single()

  if (error) throw error
  return (data?.value as { usd_to_bs: number })?.usd_to_bs || 300
}

// ============================================
// Real-time Subscriptions
// ============================================

export function subscribeToExchangeRate(
  callback: (rate: number) => void
) {
  return supabase
    .channel('exchange_rate_changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'global_settings',
        filter: 'key=eq.exchange_rate',
      },
      (payload) => {
        const newRate = (payload.new as GlobalSettings).value as { usd_to_bs: number }
        callback(newRate.usd_to_bs)
      }
    )
    .subscribe()
}

export function subscribeToMerchantStatus(
  areaId: string,
  callback: (merchant: Merchant) => void
) {
  return supabase
    .channel(`merchant_status_${areaId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'merchants',
        filter: `area_id=eq.${areaId}`,
      },
      (payload) => {
        callback(payload.new as Merchant)
      }
    )
    .subscribe()
}
