import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  Store,
  TrendingUp,
  Clock,
  Smartphone,
  Users,
  CreditCard,
  BarChart3,
  Shield
} from 'lucide-react'

const benefits = [
  {
    icon: Users,
    title: 'Miles de Clientes',
    description: 'Accede a miles de clientes hambrientos en tu zona que buscan exactamente lo que ofreces.'
  },
  {
    icon: Smartphone,
    title: 'Gestión Fácil',
    description: 'Administra tu menú, precios y disponibilidad desde cualquier dispositivo en tiempo real.'
  },
  {
    icon: Clock,
    title: 'Control de Horarios',
    description: 'Abre y cierra tu tienda cuando quieras. Tú decides cuándo recibir pedidos.'
  },
  {
    icon: CreditCard,
    title: 'Pagos Seguros',
    description: 'Recibe tus pagos de forma segura a través de Pago Móvil, transferencia o Binance.'
  },
  {
    icon: BarChart3,
    title: 'Estadísticas en Vivo',
    description: 'Monitorea tus ventas, productos más vendidos y tendencias de tu negocio.'
  },
  {
    icon: Shield,
    title: 'Soporte Dedicado',
    description: 'Nuestro equipo está disponible para ayudarte a resolver cualquier inconveniente.'
  }
]

const steps = [
  {
    number: '01',
    title: 'Regístrate',
    description: 'Crea tu cuenta con los datos de tu negocio y documentos legales.'
  },
  {
    number: '02',
    title: 'Configura tu Menú',
    description: 'Sube tus productos con fotos, descripciones y precios en dólares.'
  },
  {
    number: '03',
    title: 'Recibe Pedidos',
    description: 'Te notificamos por WhatsApp cada vez que recibas un nuevo pedido.'
  },
  {
    number: '04',
    title: 'Prepara y Entrega',
    description: 'Preparas el pedido y nuestros repartidores lo llevan al cliente.'
  }
]

export default function VendeRapidoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Store className="h-5 w-5" />
                <span className="text-sm font-medium">Plataforma para Vendedores</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Lleva tu negocio al <span className="text-primary">siguiente nivel</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Publica tu menú o catálogo y llega a miles de clientes hambrientos en el
                oriente de Venezuela. Sin complicaciones, sin inversión inicial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Registrar mi Negocio
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Conocer Más
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-foreground text-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-300 mt-1">Comercios Activos</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
                <div className="text-sm text-gray-300 mt-1">Pedidos Mensuales</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">50K+</div>
                <div className="text-sm text-gray-300 mt-1">Clientes Registrados</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">4.8</div>
                <div className="text-sm text-gray-300 mt-1">Calificación Promedio</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Por qué vender con VendeRápido?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nos encargamos de todo para que tú solo te preocupes por lo que mejor sabes hacer:
                preparar productos increíbles.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comenzar a vender es muy fácil. Solo sigue estos simples pasos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-6xl font-bold text-primary/10 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 w-1/2 border-t-2 border-dashed border-primary/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <TrendingUp className="h-16 w-16 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para aumentar tus ventas?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Únete a cientos de comercios que ya están creciendo con VendeRápido.
                El registro es gratis y puedes empezar a recibir pedidos hoy mismo.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
              >
                Comenzar Ahora
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                ¿Tienes preguntas?
              </h2>
              <p className="text-muted-foreground mb-6">
                Visita nuestro Centro de Ayuda para resolver todas tus dudas sobre cómo vender con nosotros.
              </p>
              <Link to="/ayuda">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Ir al Centro de Ayuda
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
