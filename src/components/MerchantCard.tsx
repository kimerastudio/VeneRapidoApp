import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { LoginPromptModal } from '@/components/LoginPromptModal'
import type { Merchant } from '@/types/database'
import { cn } from '@/lib/utils'

interface MerchantCardProps {
  merchant: Merchant
  areaSlug: string
}

export function MerchantCard({ merchant, areaSlug }: MerchantCardProps) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Check if user is logged in (mock - always false for now)
    const isLoggedIn = false
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      setIsFavorite(!isFavorite)
    }
  }

  return (
    <>
      <Link
        to={`/area/${areaSlug}/merchant/${merchant.slug}`}
        className={cn(
          "group block overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md",
          !merchant.is_open && "opacity-60"
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={merchant.image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'}
            alt={merchant.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!merchant.is_open && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Badge variant="secondary" className="bg-gray-800 text-white text-sm px-3 py-1">
                Cerrado
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {merchant.name}
            </h3>
            <button
              onClick={handleFavoriteClick}
              className="ml-2 p-1 text-muted-foreground hover:text-red-500 transition-colors"
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isFavorite && "fill-red-500 text-red-500"
                )}
              />
            </button>
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {merchant.tags?.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gray-100 text-gray-600 text-xs font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>

      <LoginPromptModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        message="Para poder agregar favoritos, debes haber ingresado en tu cuenta. Si no tienes una cuenta existente, crea una a continuación."
      />
    </>
  )
}
