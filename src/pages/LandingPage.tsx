import { useState, useEffect } from 'react'
import { Search, MapPin, Clock, Truck, ShieldCheck } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AreaCard } from '@/components/AreaCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { Area } from '@/types/database'

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAreas() {
      if (!supabase) {
        setError('La base de datos no está configurada')
        setLoading(false)
        return
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('areas')
          .select('*')
          .eq('is_active', true)
          .order('name')

        if (fetchError) throw fetchError
        setAreas(data || [])
      } catch (err) {
        console.error('Error fetching areas:', err)
        setError('Error al cargar las áreas')
      }
      setLoading(false)
    }

    fetchAreas()
  }, [])

  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.state.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

        <div className="container relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Tu comida favorita,{' '}
              <span className="text-primary">más rápido</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Descubre los mejores restaurantes y comercios de tu ciudad.
              Pide fácil, recibe rápido.
            </p>

            {/* Search Box */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <div className="relative flex-1 sm:max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar comercio, comida, etc."
                  className="h-12 pl-10 pr-4 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                <MapPin className="mr-2 h-5 w-5" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground">En menos de 45 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Seguimiento en Vivo</h3>
                <p className="text-sm text-muted-foreground">Sigue tu pedido paso a paso</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Pago Seguro</h3>
                <p className="text-sm text-muted-foreground">Pago Móvil, Transferencia, Binance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Selecciona tu área de entrega
            </h2>
            <p className="mt-2 text-muted-foreground">
              Elige tu ciudad para ver los comercios disponibles cerca de ti
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <div className="animate-pulse">Cargando áreas...</div>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="text-red-600">{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Por favor verifica que las variables de entorno estén configuradas en Vercel.
              </p>
            </div>
          ) : filteredAreas.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAreas.map((area) => (
                <AreaCard key={area.id} area={area} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No se encontraron áreas</h3>
              <p className="mt-2 text-muted-foreground">
                Intenta con otra búsqueda o revisa las ciudades disponibles
              </p>
            </div>
          )}
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}
