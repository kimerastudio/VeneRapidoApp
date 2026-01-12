import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  Bike,
  DollarSign,
  Clock,
  MapPin,
  Smartphone,
  Shield,
  Users,
  Zap
} from 'lucide-react'

const benefits = [
  {
    icon: DollarSign,
    title: 'Gana Más',
    description: 'Recibe pagos competitivos por cada entrega. Entre más entregas, más ganas.'
  },
  {
    icon: Clock,
    title: 'Horario Flexible',
    description: 'Trabaja cuando quieras y cuanto quieras. Tú decides tu propio horario.'
  },
  {
    icon: MapPin,
    title: 'Zona Conocida',
    description: 'Trabaja en las zonas que mejor conoces para hacer entregas más rápidas.'
  },
  {
    icon: Smartphone,
    title: 'Fácil de Usar',
    description: 'Recibe instrucciones claras por WhatsApp para cada entrega sin complicaciones.'
  },
  {
    icon: Shield,
    title: 'Soporte 24/7',
    description: 'Nuestro equipo está siempre disponible para ayudarte en cualquier situación.'
  },
  {
    icon: Zap,
    title: 'Pagos Rápidos',
    description: 'Recibe tu dinero de forma rápida por Pago Móvil o Binance.'
  }
]

const requirements = [
  {
    title: 'Moto o Bicicleta',
    description: 'Necesitas un vehículo propio para realizar las entregas.'
  },
  {
    title: 'Smartphone',
    description: 'Un teléfono con WhatsApp para recibir las instrucciones de entrega.'
  },
  {
    title: 'Documentos',
    description: 'Cédula de identidad vigente y licencia de conducir (si usas moto).'
  },
  {
    title: 'Actitud',
    description: 'Ganas de trabajar, responsabilidad y buen trato con los clientes.'
  }
]

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Repartidor desde 2023',
    quote: 'Con VeneRápido puedo trabajar en mis horarios libres y ganar un extra para mi familia. El proceso es muy simple.',
    avatar: 'CM'
  },
  {
    name: 'María L.',
    role: 'Repartidora desde 2024',
    quote: 'Lo mejor es la flexibilidad. Puedo estudiar y trabajar sin problemas. El pago siempre llega a tiempo.',
    avatar: 'ML'
  },
  {
    name: 'José R.',
    role: 'Repartidor desde 2023',
    quote: 'Empecé con mi bicicleta y ahora tengo mi propia moto gracias a lo que he ganado repartiendo.',
    avatar: 'JR'
  }
]

export default function ReparteConNosotrosPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Bike className="h-5 w-5" />
                <span className="text-sm font-medium">Oportunidad de Trabajo</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Conviértete en <span className="text-primary">Repartidor</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Únete a nuestro equipo de repartidores y gana dinero con horarios flexibles.
                Tú decides cuándo trabajar, cuánto trabajar y en qué zona.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Quiero ser Repartidor
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Ver Requisitos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ventajas de ser Repartidor VeneRápido
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Trabajar con nosotros tiene muchos beneficios. Conoce por qué cientos de
                repartidores ya eligieron VeneRápido.
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  ¿Cómo funciona?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Regístrate</h3>
                      <p className="text-muted-foreground">
                        Envía tus datos por WhatsApp y nuestro equipo te contactará para completar el registro.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Recibe Pedidos</h3>
                      <p className="text-muted-foreground">
                        Te agregamos a nuestro grupo de repartidores y recibirás notificaciones de pedidos disponibles.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Entrega y Gana</h3>
                      <p className="text-muted-foreground">
                        Recoge el pedido, entrégalo al cliente con el código de seguridad y recibe tu pago.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Requisitos
                </h3>
                <div className="space-y-4">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">{req.title}</h4>
                        <p className="text-sm text-muted-foreground">{req.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Lo que dicen nuestros repartidores
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Conoce las experiencias de quienes ya son parte de nuestra familia.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Bike className="h-16 w-16 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para empezar a ganar?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Únete a nuestro equipo de repartidores hoy mismo.
                El proceso es rápido y puedes empezar a repartir en pocos días.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
              >
                Registrarme como Repartidor
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                ¿Tienes más preguntas?
              </h2>
              <p className="text-muted-foreground mb-6">
                Visita nuestro Centro de Ayuda para conocer más sobre cómo ser repartidor.
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
