import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  HelpCircle,
  Search,
  ShoppingBag,
  Store,
  Bike,
  CreditCard,
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
  MessageCircle
} from 'lucide-react'

const categories = [
  {
    id: 'pedidos',
    icon: ShoppingBag,
    title: 'Pedidos',
    description: 'Cómo hacer pedidos, seguimiento y cancelaciones'
  },
  {
    id: 'pagos',
    icon: CreditCard,
    title: 'Pagos',
    description: 'Métodos de pago, confirmación y reembolsos'
  },
  {
    id: 'entregas',
    icon: MapPin,
    title: 'Entregas',
    description: 'Zonas de cobertura, tiempos y direcciones'
  },
  {
    id: 'comercios',
    icon: Store,
    title: 'Para Comercios',
    description: 'Registro, menú y gestión de tienda'
  },
  {
    id: 'repartidores',
    icon: Bike,
    title: 'Para Repartidores',
    description: 'Registro, entregas y pagos'
  },
  {
    id: 'cuenta',
    icon: Phone,
    title: 'Mi Cuenta',
    description: 'Registro, perfil y seguridad'
  }
]

const faqs = [
  {
    category: 'pedidos',
    question: '¿Cómo hago un pedido?',
    answer: 'Para hacer un pedido: 1) Selecciona tu zona de entrega, 2) Elige un comercio del directorio, 3) Agrega productos a tu bolsa, 4) Completa tu dirección de entrega, 5) Selecciona el método de pago y confirma. Recibirás instrucciones por WhatsApp para completar el pago.'
  },
  {
    category: 'pedidos',
    question: '¿Puedo cancelar mi pedido?',
    answer: 'Puedes cancelar tu pedido mientras esté en estado "Procesando pago". Una vez que el comercio confirme la preparación, la cancelación dependerá de la política del comercio. Contáctanos por WhatsApp para asistencia.'
  },
  {
    category: 'pedidos',
    question: '¿Cómo sigo el estado de mi pedido?',
    answer: 'Puedes ver el estado de tu pedido en la sección "Mis Pedidos" de tu cuenta. También recibirás notificaciones por WhatsApp cuando el estado cambie: pago recibido, pedido en preparación, repartidor en camino, y entregado.'
  },
  {
    category: 'pagos',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos: Pago Móvil, Transferencia Bancaria (Banesco, Provincial, Mercantil, Venezuela) y Binance (USDT). Todos los precios se muestran en dólares (USD) con la conversión a Bolívares (Bs.) según la tasa del día.'
  },
  {
    category: 'pagos',
    question: '¿Cómo confirmo mi pago?',
    answer: 'Después de realizar la transferencia o pago móvil, envía una captura de pantalla del comprobante a nuestro WhatsApp. Nuestro equipo verificará el pago y actualizará el estado de tu pedido.'
  },
  {
    category: 'pagos',
    question: '¿Cuál es la tasa de cambio?',
    answer: 'Utilizamos una tasa de cambio actualizada diariamente que puedes ver en la parte superior de la aplicación. Esta tasa se aplica al momento de realizar tu pedido y queda fija para esa transacción.'
  },
  {
    category: 'entregas',
    question: '¿Cuáles son las zonas de entrega?',
    answer: 'Actualmente operamos en varias ciudades del oriente de Venezuela incluyendo Punta de Mata, Maturín, y zonas cercanas. Selecciona tu zona al inicio para ver los comercios disponibles en tu área.'
  },
  {
    category: 'entregas',
    question: '¿Cuánto tarda una entrega?',
    answer: 'El tiempo de entrega varía según el comercio y tu ubicación. Generalmente oscila entre 30-60 minutos. Puedes ver el tiempo estimado de cada comercio en su perfil.'
  },
  {
    category: 'entregas',
    question: '¿Qué es el código de seguridad?',
    answer: 'El código de seguridad es un número de 3-6 dígitos que aparece en tu pedido cuando el repartidor está en camino. Debes proporcionar este código al repartidor para confirmar que eres el destinatario correcto del pedido.'
  },
  {
    category: 'comercios',
    question: '¿Cómo registro mi comercio?',
    answer: 'Para registrar tu comercio necesitas: datos legales (RIF, nombre de la empresa), fotos de tus productos, y configurar tus métodos de pago. Visita nuestra página VendeRápido o contáctanos por WhatsApp para comenzar.'
  },
  {
    category: 'comercios',
    question: '¿Cómo administro mi menú?',
    answer: 'Desde tu panel de VendeRápido puedes agregar, editar o eliminar productos. También puedes marcar productos como "No disponible" temporalmente sin eliminarlos del menú.'
  },
  {
    category: 'repartidores',
    question: '¿Cómo me registro como repartidor?',
    answer: 'Necesitas: cédula de identidad, licencia de conducir (para moto), un smartphone con WhatsApp, y tu vehículo (moto o bicicleta). Contáctanos por WhatsApp para iniciar el proceso de registro.'
  },
  {
    category: 'repartidores',
    question: '¿Cómo recibo mis pagos?',
    answer: 'Los pagos se realizan semanalmente por Pago Móvil o Binance, según tu preferencia. Recibirás un resumen de tus entregas y el monto correspondiente.'
  },
  {
    category: 'cuenta',
    question: '¿Cómo creo una cuenta?',
    answer: 'Haz clic en "Crear Cuenta" e ingresa tu nombre, número de WhatsApp, cédula y correo electrónico. Recibirás un código de verificación por WhatsApp para activar tu cuenta.'
  },
  {
    category: 'cuenta',
    question: '¿Cómo recupero mi cuenta?',
    answer: 'Si perdiste acceso a tu cuenta, contáctanos por WhatsApp con tu número registrado y cédula. Verificaremos tu identidad y te ayudaremos a recuperar el acceso.'
  }
]

export default function CentroDeAyudaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = !selectedCategory || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <HelpCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Centro de Ayuda</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Cómo podemos ayudarte?
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Encuentra respuestas a las preguntas más frecuentes o contáctanos directamente.
              </p>

              {/* Search Bar */}
              <div className="flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-sm max-w-xl mx-auto">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar en el centro de ayuda..."
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                  className={`p-4 rounded-xl text-center transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white hover:shadow-md'
                  }`}
                >
                  <category.icon className={`h-8 w-8 mx-auto mb-2 ${
                    selectedCategory === category.id ? 'text-white' : 'text-primary'
                  }`} />
                  <h3 className={`font-medium text-sm ${
                    selectedCategory === category.id ? 'text-white' : 'text-foreground'
                  }`}>
                    {category.title}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {selectedCategory
                  ? `Preguntas sobre ${categories.find(c => c.id === selectedCategory)?.title}`
                  : 'Preguntas Frecuentes'}
              </h2>

              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No se encontraron resultados para tu búsqueda.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-foreground pr-4">
                          {faq.question}
                        </span>
                        {openFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="px-4 pb-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                ¿No encontraste lo que buscabas?
              </h2>
              <p className="text-muted-foreground mb-6">
                Nuestro equipo de soporte está disponible para ayudarte.
                Contáctanos por WhatsApp y te responderemos lo antes posible.
              </p>
              <Button
                size="lg"
                className="gap-2"
                onClick={() => window.open('https://wa.me/584123456789?text=Hola,%20necesito%20ayuda%20con%20VeneRápido', '_blank')}
              >
                <MessageCircle className="h-5 w-5" />
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">
                Enlaces Útiles
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  to="/vende-rapido"
                  className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all flex items-center gap-4"
                >
                  <Store className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">VendeRápido</h3>
                    <p className="text-sm text-muted-foreground">
                      Registra tu comercio y empieza a vender
                    </p>
                  </div>
                </Link>
                <Link
                  to="/reparte-con-nosotros"
                  className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all flex items-center gap-4"
                >
                  <Bike className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">Reparte con Nosotros</h3>
                    <p className="text-sm text-muted-foreground">
                      Únete como repartidor y gana dinero
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
