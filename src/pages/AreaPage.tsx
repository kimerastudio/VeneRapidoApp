import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Search, ChevronDown, Check } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MerchantCard } from '@/components/MerchantCard'
import { ExchangeRateBadge } from '@/components/ExchangeRateBadge'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { supabase } from '@/lib/supabase'
import type { Merchant, Area, MerchantCategory } from '@/types/database'

// Filter categories matching merchant_category enum
const filterCategories: { label: string; value: MerchantCategory | null }[] = [
  { label: 'Restaurantes', value: 'restaurante' },
  { label: 'Farmacias', value: 'farmacia' },
  { label: 'Tiendas', value: 'tienda' },
  { label: 'Otros', value: 'otro' },
]

export default function AreaPage() {
  const { areaId } = useParams<{ areaId: string }>()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<MerchantCategory | null>(null)
  const [areaName, setAreaName] = useState<string>('')
  const [allAreas, setAllAreas] = useState<Area[]>([])
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      if (!supabase) {
        setError('La base de datos no está configurada')
        setLoading(false)
        return
      }

      try {
        // Fetch all areas for the dropdown
        const { data: areasData, error: areasError } = await supabase
          .from('areas')
          .select('*')
          .eq('is_active', true)
          .order('name')

        if (areasError) throw areasError
        setAllAreas(areasData || [])

        // Fetch current area data
        const { data: areaData, error: areaError } = await supabase
          .from('areas')
          .select('*')
          .eq('slug', areaId)
          .single()

        if (areaError) throw areaError

        if (areaData) {
          setAreaName(areaData.name)

          const { data: merchantsData, error: merchantsError } = await supabase
            .from('merchants')
            .select('*')
            .eq('area_id', areaData.id)
            .order('is_open', { ascending: false })
            .order('rating', { ascending: false })

          if (merchantsError) throw merchantsError

          setMerchants(merchantsData || [])
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Error al cargar los comercios')
      }

      setLoading(false)
    }

    if (areaId) {
      fetchData()
    }
  }, [areaId])

  const handleAreaChange = (areaSlug: string) => {
    navigate(`/area/${areaSlug}`)
  }

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )

    const matchesCategory =
      !selectedCategory || merchant.merchant_category === selectedCategory

    return matchesSearch && matchesCategory
  })

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-12 text-center">
          <p className="text-red-600">{error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Exchange Rate & Search Section */}
        <section className="bg-white py-8">
          <div className="container">
            {/* Exchange Rate Badge */}
            <div className="flex justify-center mb-6">
              <ExchangeRateBadge />
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ingresa el nombre de un comercio, un tipo de comida, etc"
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {filteredMerchants.length} items
                </span>

                {/* Area Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 border-l pl-3 cursor-pointer hover:text-primary transition-colors">
                    <span className="font-medium">{areaName || 'Seleccionar área'}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {allAreas.map((area) => (
                      <DropdownMenuItem
                        key={area.id}
                        onClick={() => handleAreaChange(area.slug)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <span>{area.name}</span>
                        {area.slug === areaId && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Filter Categories */}
              <div className="mt-4 flex justify-center gap-2">
                {filterCategories.map((category) => (
                  <Badge
                    key={category.label}
                    variant={selectedCategory === category.value ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-1.5 text-sm font-normal transition-colors hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSelectedCategory(selectedCategory === category.value ? null : category.value)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Merchants Grid */}
        <section className="py-8">
          <div className="container">
            {filteredMerchants.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  No se encontraron comercios
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredMerchants.map((merchant) => (
                  <MerchantCard
                    key={merchant.id}
                    merchant={merchant}
                    areaSlug={areaId || ''}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
