import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const whatsappNumber = '+584141234567' // Replace with actual number
  const message = 'Hola, necesito ayuda con mi pedido en VeneRápido'

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
    </button>
  )
}
