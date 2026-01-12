import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Search, ChevronRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ExchangeRateBadge } from '@/components/ExchangeRateBadge'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ProductCard } from '@/components/ProductCard'
import { ProductSheet } from '@/components/ProductSheet'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import type { Merchant, Category, Product } from '@/types/database'

export default function MerchantPage() {
  const { areaId, merchantSlug } = useParams<{ areaId: string; merchantSlug: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [merchant, setMerchant] = useState<Merchant | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      // Fetch merchant
      const { data: merchantData } = await supabase
        .from('merchants')
        .select('*')
        .eq('slug', merchantSlug)
        .single()

      if (merchantData) {
        setMerchant(merchantData)

        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .eq('merchant_id', merchantData.id)
          .eq('is_active', true)
          .order('sort_order')

        if (categoriesData) {
          setCategories(categoriesData)
        }

        // Fetch products
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .eq('merchant_id', merchantData.id)
          .eq('is_available', true)
          .order('sort_order')

        if (productsData) {
          setProducts(productsData)
        }
      }

      setLoading(false)
    }

    if (merchantSlug) {
      fetchData()
    }
  }, [merchantSlug])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || product.category_id === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Group products by category
  const productsByCategory = categories.reduce((acc, category) => {
    const categoryProducts = filteredProducts.filter(
      (p) => p.category_id === category.id
    )
    if (categoryProducts.length > 0) {
      acc[category.id] = {
        category,
        products: categoryProducts,
      }
    }
    return acc
  }, {} as Record<string, { category: Category; products: Product[] }>)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsSheetOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-12 text-center">
          <div className="animate-pulse">Cargando...</div>
        </div>
      </div>
    )
  }

  if (!merchant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Comercio no encontrado</h1>
          <Link to={`/area/${areaId}`} className="text-primary hover:underline mt-4 inline-block">
            Volver al directorio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Exchange Rate */}
        <div className="bg-white py-4 border-b">
          <div className="container">
            <ExchangeRateBadge />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white py-4">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm">
              <Link to={`/area/${areaId}`} className="text-muted-foreground hover:text-foreground">
                {areaId?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Restaurantes</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{merchant.name}</span>
            </nav>
          </div>
        </div>

        {/* Search Bar */}
        <section className="bg-white py-4 border-b">
          <div className="container">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ingresa el nombre de un producto"
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {filteredProducts.length} items
                </span>
              </div>

              {/* Category Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    className="cursor-pointer px-3 py-1 text-sm font-normal transition-colors hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products by Category */}
        <section className="py-8">
          <div className="container">
            {Object.keys(productsByCategory).length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No se encontraron productos</p>
              </div>
            ) : (
              <div className="space-y-10">
                {Object.values(productsByCategory).map(({ category, products: categoryProducts }) => (
                  <div key={category.id}>
                    <h2 className="text-xl font-bold mb-4">{category.name}</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {categoryProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onClick={() => handleProductClick(product)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Product Sheet */}
      <ProductSheet
        product={selectedProduct}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  )
}
