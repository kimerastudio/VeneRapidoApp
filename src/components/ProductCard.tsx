import { useState } from 'react'
import { Heart } from 'lucide-react'
import { LoginPromptModal } from '@/components/LoginPromptModal'
import type { Product } from '@/types/database'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const isLoggedIn = false
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      setIsFavorite(!isFavorite)
    }
  }

  return (
    <>
      <div
        onClick={onClick}
        className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground truncate">
                  {product.name}
                </h3>
                <span className="font-semibold text-foreground ml-2">
                  ${product.price}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <button
              onClick={handleFavoriteClick}
              className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
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
        </div>
      </div>

      <LoginPromptModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        message="Para poder agregar favoritos, debes haber ingresado en tu cuenta. Si no tienes una cuenta existente, crea una a continuación."
      />
    </>
  )
}
