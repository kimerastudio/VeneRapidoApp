import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Search, SlidersHorizontal, MapPin, Store } from 'lucide-react'
import { Header } from '@/components/Header'
import { MerchantCard } from '@/components/MerchantCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAreaById, getMerchantsByArea } from '@/data/mock-data'

const filterTags = [
  'Todos',
  'Hamburguesas',
  'Pizza',
  'Pollo',
  'Venezolano',
  'Sushi',
  'Postres',
  'Mexicano',
]

export default function AreaPage() {
  const { areaId } = useParams<{ areaId: string }>()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('Todos')
  const [showOpenOnly, setShowOpenOnly] = useState(false)

  const area = getAreaById(areaId || '')
  const allMerchants = getMerchantsByArea(areaId || '')

  const filteredMerchants = useMemo(() => {
    return allMerchants.filter((merchant) => {
      const matchesSearch =
        merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        merchant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        merchant.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesTag =
        selectedTag === 'Todos' ||
        merchant.tags.some((tag) =>
          tag.toLowerCase().includes(selectedTag.toLowerCase())
        )

      const matchesOpen = !showOpenOnly || merchant.isOpen

      return matchesSearch && matchesTag && matchesOpen
    })
  }, [allMerchants, searchQuery, selectedTag, showOpenOnly])

  const openMerchants = filteredMerchants.filter((m) => m.isOpen)
  const closedMerchants = filteredMerchants.filter((m) => !m.isOpen)

  if (!area) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <MapPin className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h1 className="mt-4 text-2xl font-bold">Área no encontrada</h1>
          <p className="mt-2 text-muted-foreground">
            El área que buscas no existe o no está disponible.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Area Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-background">
        <div className="container py-6">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Cambiar área de entrega
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
              <MapPin className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{area.name}</h1>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span>{area.state}</span>
                <span className="flex items-center gap-1">
                  <Store className="h-3.5 w-3.5" />
                  {allMerchants.length} comercios disponibles
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar comercio o comida..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showOpenOnly ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowOpenOnly(!showOpenOnly)}
              >
                Solo abiertos
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {filterTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap transition-colors hover:bg-primary/80 hover:text-primary-foreground"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Merchants List */}
      <section className="py-6">
        <div className="container">
          {filteredMerchants.length === 0 ? (
            <div className="py-12 text-center">
              <Store className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h2 className="mt-4 text-xl font-semibold">
                No se encontraron comercios
              </h2>
              <p className="mt-2 text-muted-foreground">
                Intenta con otra búsqueda o cambia los filtros
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedTag('Todos')
                  setShowOpenOnly(false)
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              {/* Open Merchants */}
              {openMerchants.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Abiertos ahora
                    <span className="text-sm font-normal text-muted-foreground">
                      ({openMerchants.length})
                    </span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {openMerchants.map((merchant) => (
                      <MerchantCard
                        key={merchant.id}
                        merchant={merchant}
                        areaId={area.id}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Closed Merchants */}
              {closedMerchants.length > 0 && !showOpenOnly && (
                <div>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <span className="h-2 w-2 rounded-full bg-gray-400" />
                    Cerrados
                    <span className="text-sm font-normal text-muted-foreground">
                      ({closedMerchants.length})
                    </span>
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {closedMerchants.map((merchant) => (
                      <MerchantCard
                        key={merchant.id}
                        merchant={merchant}
                        areaId={area.id}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
