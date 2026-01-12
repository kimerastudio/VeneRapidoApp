// Database types for VeneRápido
// These types match the Supabase schema

export type OrderStatus =
  | 'pending_payment'
  | 'preparing'
  | 'delivering'
  | 'delivered'
  | 'cancelled'

export type AddressType =
  | 'casa'
  | 'apartamento'
  | 'oficina'
  | 'hotel'
  | 'barrio'

export type PaymentMethod =
  | 'pago_movil'
  | 'transferencia'
  | 'binance'

export type DeliveryMethod =
  | 'personal'
  | 'reception'

export type MerchantCategory =
  | 'restaurante'
  | 'farmacia'
  | 'tienda'
  | 'otro'

// ============================================
// Database Tables
// ============================================

export interface Area {
  id: string
  name: string
  slug: string
  state: string
  image_url: string | null
  is_active: boolean
  created_at: string
  // Computed
  merchant_count?: number
}

export interface Merchant {
  id: string
  area_id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  cover_url: string | null
  tags: string[]
  merchant_category: MerchantCategory
  rating: number
  review_count: number
  delivery_time: string | null
  delivery_fee: number
  is_open: boolean
  is_open_override: boolean | null
  legal_name: string | null
  rif: string | null
  latitude: number | null
  longitude: number | null
  schedule: MerchantSchedule
  payout_config: PayoutConfig
  email: string | null
  created_at: string
  updated_at: string
}

export interface MerchantSchedule {
  [day: string]: {
    open: string // "09:00"
    close: string // "21:00"
    closed?: boolean
  }
}

export interface PayoutConfig {
  method: 'pago_movil' | 'binance' | 'transferencia'
  phone?: string
  cedula?: string
  bank?: string
  binance_address?: string
}

export interface Category {
  id: string
  merchant_id: string
  name: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Product {
  id: string
  merchant_id: string
  category_id: string | null
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  modifiers: ProductModifiers
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProductModifiers {
  mandatory?: {
    name: string
    options: string[]
  }[]
  removables?: string[]
  extras?: {
    name: string
    price: number
  }[]
}

export interface Customer {
  id: string
  auth_id: string
  first_name: string
  last_name: string
  whatsapp: string
  email: string | null
  cedula: string | null
  created_at: string
  updated_at: string
}

export interface CustomerAddress {
  id: string
  customer_id: string
  name: string
  latitude: number
  longitude: number
  address_type: AddressType
  details: AddressDetails
  reference_point: string | null
  delivery_method: DeliveryMethod
  is_default: boolean
  created_at: string
}

export interface AddressDetails {
  // Casa
  urbanization?: string
  gate_code?: string
  is_private?: boolean
  // Apartamento
  building_name?: string
  floor?: string
  apt_number?: string
  has_security?: boolean
  // Oficina
  company_name?: string
  office_number?: string
  // Hotel
  hotel_name?: string
  room_number?: string
}

export interface Driver {
  id: string
  name: string
  phone: string
  vehicle: string | null
  plate: string | null
  photo_url: string | null
  is_active: boolean
  created_at: string
}

export interface Order {
  id: string
  order_number: number
  customer_id: string
  customer_name: string
  customer_whatsapp: string
  customer_cedula: string | null
  address_type: AddressType
  address_coordinates: {
    lat: number
    lng: number
  }
  address_details: AddressDetails
  delivery_method: DeliveryMethod
  recipient_name: string | null
  recipient_phone: string | null
  merchant_id: string
  merchant_name: string
  subtotal: number
  delivery_fee: number
  total: number
  exchange_rate: number
  total_bs: number
  payment_method: PaymentMethod | null
  payment_verified: boolean
  payment_verified_at: string | null
  payment_verified_by: string | null
  status: OrderStatus
  driver_id: string | null
  security_code: string | null
  created_at: string
  confirmed_at: string | null
  picked_up_at: string | null
  delivered_at: string | null
  cancelled_at: string | null
  cancellation_reason: string | null
  notes: string | null
  // Relations
  items?: OrderItem[]
  driver?: Driver
  merchant?: Merchant
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  selected_modifiers: SelectedModifiers
  extras_total: number
  line_total: number
  notes: string | null
  created_at: string
}

export interface SelectedModifiers {
  mandatory?: Record<string, string>
  removables?: string[]
  extras?: {
    name: string
    price: number
  }[]
}

export interface GlobalSettings {
  id: string
  key: string
  value: Record<string, unknown>
  updated_at: string
}

// ============================================
// API Response Types
// ============================================

export interface AreaWithCount extends Area {
  merchant_count: number
}

export interface MerchantWithProducts extends Merchant {
  categories: Category[]
  products: Product[]
}

export interface OrderWithDetails extends Omit<Order, 'driver'> {
  items: OrderItem[]
  driver: Driver | null
}
