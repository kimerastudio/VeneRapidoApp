export interface Area {
  id: string
  name: string
  state: string
  imageUrl: string
  merchantCount: number
}

export interface Merchant {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  coverUrl: string
  tags: string[]
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  isOpen: boolean
  areaId: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  categoryId: string
  merchantId: string
  available: boolean
}

export interface Category {
  id: string
  name: string
  merchantId: string
}

export const areas: Area[] = [
  {
    id: "punta-de-mata",
    name: "Punta de Mata",
    state: "Monagas",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    merchantCount: 12
  },
  {
    id: "maturin",
    name: "Maturín",
    state: "Monagas",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
    merchantCount: 45
  },
  {
    id: "puerto-la-cruz",
    name: "Puerto La Cruz",
    state: "Anzoátegui",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop",
    merchantCount: 38
  },
  {
    id: "barcelona",
    name: "Barcelona",
    state: "Anzoátegui",
    imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop",
    merchantCount: 28
  },
  {
    id: "ciudad-bolivar",
    name: "Ciudad Bolívar",
    state: "Bolívar",
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop",
    merchantCount: 22
  },
  {
    id: "ciudad-guayana",
    name: "Ciudad Guayana",
    state: "Bolívar",
    imageUrl: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=300&fit=crop",
    merchantCount: 35
  }
]

export const merchants: Merchant[] = [
  {
    id: "burger-house",
    name: "Burger House",
    slug: "burger-house",
    description: "Las mejores hamburguesas de la ciudad",
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop",
    tags: ["Hamburguesas", "Americana", "Papas Fritas"],
    rating: 4.8,
    reviewCount: 234,
    deliveryTime: "25-35 min",
    deliveryFee: 2.50,
    isOpen: true,
    areaId: "punta-de-mata"
  },
  {
    id: "pollo-sabroso",
    name: "Pollo Sabroso",
    slug: "pollo-sabroso",
    description: "Pollo frito crujiente y delicioso",
    imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=400&fit=crop",
    tags: ["Pollo", "Frito", "Venezolano"],
    rating: 4.5,
    reviewCount: 189,
    deliveryTime: "30-40 min",
    deliveryFee: 2.00,
    isOpen: true,
    areaId: "punta-de-mata"
  },
  {
    id: "la-arepa-feliz",
    name: "La Arepa Feliz",
    slug: "la-arepa-feliz",
    description: "Arepas rellenas tradicionales venezolanas",
    imageUrl: "https://images.unsplash.com/photo-1599139849624-87c3f6a3ef4a?w=200&h=200&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1590123767960-39fc7f8a8e09?w=800&h=400&fit=crop",
    tags: ["Arepas", "Venezolano", "Desayuno"],
    rating: 4.9,
    reviewCount: 412,
    deliveryTime: "20-30 min",
    deliveryFee: 1.50,
    isOpen: true,
    areaId: "punta-de-mata"
  },
  {
    id: "pizza-rapida",
    name: "Pizza Rápida",
    slug: "pizza-rapida",
    description: "Pizzas artesanales con ingredientes frescos",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop",
    tags: ["Pizza", "Italiana", "Rápida"],
    rating: 4.6,
    reviewCount: 156,
    deliveryTime: "35-45 min",
    deliveryFee: 3.00,
    isOpen: false,
    areaId: "punta-de-mata"
  },
  {
    id: "sushi-oriental",
    name: "Sushi Oriental",
    slug: "sushi-oriental",
    description: "Sushi fresco y rolls especiales",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=800&h=400&fit=crop",
    tags: ["Sushi", "Japonés", "Rolls"],
    rating: 4.7,
    reviewCount: 98,
    deliveryTime: "40-50 min",
    deliveryFee: 3.50,
    isOpen: true,
    areaId: "punta-de-mata"
  },
  {
    id: "taqueria-mexicana",
    name: "Taquería Mexicana",
    slug: "taqueria-mexicana",
    description: "Auténticos tacos y comida mexicana",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=200&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=400&fit=crop",
    tags: ["Tacos", "Mexicano", "Burritos"],
    rating: 4.4,
    reviewCount: 87,
    deliveryTime: "25-35 min",
    deliveryFee: 2.50,
    isOpen: true,
    areaId: "punta-de-mata"
  },
  {
    id: "dulceria-criolla",
    name: "Dulcería Criolla",
    slug: "dulceria-criolla",
    description: "Postres y dulces tradicionales venezolanos",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=400&fit=crop",
    tags: ["Postres", "Dulces", "Venezolano"],
    rating: 4.8,
    reviewCount: 145,
    deliveryTime: "20-30 min",
    deliveryFee: 2.00,
    isOpen: true,
    areaId: "punta-de-mata"
  },
  {
    id: "marisqueria-del-este",
    name: "Marisquería del Este",
    slug: "marisqueria-del-este",
    description: "Mariscos frescos y platos del mar",
    imageUrl: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=200&h=200&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&h=400&fit=crop",
    tags: ["Mariscos", "Pescado", "Fresco"],
    rating: 4.6,
    reviewCount: 76,
    deliveryTime: "35-45 min",
    deliveryFee: 4.00,
    isOpen: false,
    areaId: "punta-de-mata"
  }
]

export const categories: Category[] = [
  { id: "promos", name: "Promociones", merchantId: "burger-house" },
  { id: "burgers", name: "Hamburguesas", merchantId: "burger-house" },
  { id: "sides", name: "Acompañantes", merchantId: "burger-house" },
  { id: "drinks", name: "Bebidas", merchantId: "burger-house" }
]

export const products: Product[] = [
  {
    id: "super-burger",
    name: "Super Burger",
    description: "Hamburguesa doble con queso cheddar, tocino crujiente, lechuga, tomate y nuestra salsa especial",
    price: 8.50,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop",
    categoryId: "burgers",
    merchantId: "burger-house",
    available: true
  },
  {
    id: "classic-burger",
    name: "Classic Burger",
    description: "Hamburguesa sencilla con queso americano, lechuga, tomate, cebolla y pepinillos",
    price: 5.00,
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=300&fit=crop",
    categoryId: "burgers",
    merchantId: "burger-house",
    available: true
  },
  {
    id: "bacon-lover",
    name: "Bacon Lover",
    description: "Triple tocino con queso suizo, cebolla caramelizada y salsa BBQ",
    price: 9.50,
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=300&h=300&fit=crop",
    categoryId: "burgers",
    merchantId: "burger-house",
    available: true
  },
  {
    id: "papas-fritas",
    name: "Papas Fritas",
    description: "Papas fritas crujientes con sal marina",
    price: 2.50,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop",
    categoryId: "sides",
    merchantId: "burger-house",
    available: true
  },
  {
    id: "aros-cebolla",
    name: "Aros de Cebolla",
    description: "Aros de cebolla empanizados y fritos",
    price: 3.00,
    imageUrl: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=300&fit=crop",
    categoryId: "sides",
    merchantId: "burger-house",
    available: true
  }
]

export function getMerchantsByArea(areaId: string): Merchant[] {
  return merchants.filter(m => m.areaId === areaId)
}

export function getMerchantBySlug(slug: string): Merchant | undefined {
  return merchants.find(m => m.slug === slug)
}

export function getAreaById(areaId: string): Area | undefined {
  return areas.find(a => a.id === areaId)
}

export function getProductsByMerchant(merchantId: string): Product[] {
  return products.filter(p => p.merchantId === merchantId)
}

export function getCategoriesByMerchant(merchantId: string): Category[] {
  return categories.filter(c => c.merchantId === merchantId)
}
