import { useState } from 'react'
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { LoginPromptModal } from '@/components/LoginPromptModal'
import type { Product, ProductModifiers } from '@/types/database'

interface ProductSheetProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductSheet({ product, open, onOpenChange }: ProductSheetProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [selectedRemovables, setSelectedRemovables] = useState<string[]>([])
  const [selectedMandatory, setSelectedMandatory] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)

  if (!product) return null

  const modifiers = product.modifiers as ProductModifiers

  const extrasTotal = (modifiers?.extras || [])
    .filter((extra) => selectedExtras.includes(extra.name))
    .reduce((sum, extra) => sum + extra.price, 0)

  const totalPrice = (product.price + extrasTotal) * quantity

  const handleAddToCart = () => {
    const isLoggedIn = false
    if (!isLoggedIn) {
      setShowLoginModal(true)
    } else {
      // Add to cart logic
      console.log('Adding to cart:', {
        product,
        quantity,
        selectedExtras,
        selectedRemovables,
        selectedMandatory,
        notes,
        totalPrice,
      })
      onOpenChange(false)
    }
  }

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    const isLoggedIn = false
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }
    if (action === 'increase') {
      setQuantity((q) => q + 1)
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity((q) => q - 1)
    }
  }

  const handleExtraToggle = (extraName: string) => {
    const isLoggedIn = false
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }
    setSelectedExtras((prev) =>
      prev.includes(extraName)
        ? prev.filter((e) => e !== extraName)
        : [...prev, extraName]
    )
  }

  const handleRemovableToggle = (removable: string) => {
    const isLoggedIn = false
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }
    setSelectedRemovables((prev) =>
      prev.includes(removable)
        ? prev.filter((r) => r !== removable)
        : [...prev, removable]
    )
  }

  const handleMandatorySelect = (name: string, option: string) => {
    const isLoggedIn = false
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }
    setSelectedMandatory((prev) => ({ ...prev, [name]: option }))
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
          {/* Header with back button */}
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenChange(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <SheetTitle className="text-lg">{product.name}</SheetTitle>
            </div>
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Product Image */}
            <div className="aspect-video w-full">
              <img
                src={product.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop'}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4 space-y-6">
              {/* Description */}
              <p className="text-muted-foreground">{product.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="h-10 w-10 rounded-lg border flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="h-10 w-10 rounded-lg border flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Extras */}
              {modifiers?.extras && modifiers.extras.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Agregar extras</h4>
                  <div className="space-y-2">
                    {modifiers.extras.map((extra) => (
                      <label
                        key={extra.name}
                        className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedExtras.includes(extra.name)}
                            onChange={() => handleExtraToggle(extra.name)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span>{extra.name}</span>
                        </div>
                        <span className="text-muted-foreground">+${extra.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Removables */}
              {modifiers?.removables && modifiers.removables.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Retirar Ingredientes</h4>
                  <div className="space-y-2">
                    {modifiers.removables.map((removable) => (
                      <label
                        key={removable}
                        className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedRemovables.includes(removable)}
                          onChange={() => handleRemovableToggle(removable)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span>Sin {removable.toLowerCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Mandatory Selectors */}
              {modifiers?.mandatory && modifiers.mandatory.length > 0 && (
                <div>
                  {modifiers.mandatory.map((selector) => (
                    <div key={selector.name} className="mb-4">
                      <h4 className="font-semibold mb-3">{selector.name}</h4>
                      <div className="space-y-2">
                        {selector.options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <input
                              type="radio"
                              name={selector.name}
                              checked={selectedMandatory[selector.name] === option}
                              onChange={() => handleMandatorySelect(selector.name, option)}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              <div>
                <h4 className="font-semibold mb-3">Nota para el local</h4>
                <textarea
                  value={notes}
                  onChange={(e) => {
                    const isLoggedIn = false
                    if (!isLoggedIn) {
                      setShowLoginModal(true)
                      return
                    }
                    setNotes(e.target.value)
                  }}
                  placeholder="Escribe solicitudes especiales para este producto."
                  className="w-full p-3 rounded-lg border resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Por ejemplo: Salsa aparte, carne bien cocinada.
                </p>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="p-4 border-t bg-white">
            <Button
              onClick={handleAddToCart}
              className="w-full h-12 text-base bg-primary hover:bg-primary/90"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Agregar a mi bolsa
              <span className="ml-auto">${totalPrice.toFixed(2)}</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <LoginPromptModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        message="Debes ingresar a una cuenta para poder hacer una orden"
      />
    </>
  )
}
