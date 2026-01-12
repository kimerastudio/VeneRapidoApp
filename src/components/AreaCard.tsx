import { Link } from 'react-router-dom'
import { MapPin, Store } from 'lucide-react'
import type { Area } from '@/data/mock-data'

interface AreaCardProps {
  area: Area
}

export function AreaCard({ area }: AreaCardProps) {
  return (
    <Link
      to={`/area/${area.id}`}
      className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={area.imageUrl}
          alt={area.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold">{area.name}</h3>
        <div className="mt-1 flex items-center gap-3 text-sm text-white/80">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {area.state}
          </span>
          <span className="flex items-center gap-1">
            <Store className="h-3.5 w-3.5" />
            {area.merchantCount} comercios
          </span>
        </div>
      </div>

      <div className="absolute top-3 right-3">
        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
          Disponible
        </span>
      </div>
    </Link>
  )
}
