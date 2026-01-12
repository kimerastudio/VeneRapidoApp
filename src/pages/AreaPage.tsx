import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MerchantCard } from '@/components/MerchantCard'
import { ExchangeRateBadge } from '@/components/ExchangeRateBadge'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import type { Merchant } from '@/types/database'

const filterTags = ['Restaurantes', 'Farmacias', 'Tiendas']

export default function AreaPage() {
  const { areaId } = useParams<{ areaId: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [areaName, setAreaName] = useState<string>('')
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

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesSearch =
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )

    return matchesSearch
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
                <div className="flex items-center gap-2 border-l pl-3">
                  <span className="font-medium">{areaName || 'Punta de Mata'}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Filter Tags */}
              <div className="mt-4 flex justify-center gap-2">
                {filterTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-1.5 text-sm font-normal transition-colors hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  >
                    {tag}
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
