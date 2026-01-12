import { Link } from 'react-router-dom'
import { Clock, Star, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Merchant } from '@/data/mock-data'
import { cn } from '@/lib/utils'

interface MerchantCardProps {
  merchant: Merchant
  areaId: string
}

export function MerchantCard({ merchant, areaId }: MerchantCardProps) {
  return (
    <Link
      to={`/area/${areaId}/merchant/${merchant.slug}`}
      className={cn(
        "group flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md",
        !merchant.isOpen && "opacity-60"
      )}
    >
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={merchant.imageUrl}
          alt={merchant.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!merchant.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="secondary" className="bg-gray-800 text-white">
              Cerrado
            </Badge>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight group-hover:text-primary">
            {merchant.name}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{merchant.rating}</span>
            <span className="text-muted-foreground">({merchant.reviewCount})</span>
          </div>
        </div>

        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {merchant.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {merchant.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {merchant.deliveryTime}
          </span>
          <span className="flex items-center gap-1">
            <Truck className="h-3.5 w-3.5" />
            ${merchant.deliveryFee.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  )
}
