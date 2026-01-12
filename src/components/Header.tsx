import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-primary">V</span>
            <span className="text-foreground">eneRápido</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/vende-rapido"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            VendeRápido
          </Link>
          <Link
            to="/reparte-con-nosotros"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Reparte con Nosotros
          </Link>
          <Link
            to="/ayuda"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Centro de Ayuda
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            Crear Cuenta
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:text-primary"
          >
            Ingresar
          </Button>
        </div>
      </div>
    </header>
  )
}
