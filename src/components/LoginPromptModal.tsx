import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface LoginPromptModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message?: string
}

export function LoginPromptModal({
  open,
  onOpenChange,
  message = 'Para poder agregar favoritos, debes haber ingresado en tu cuenta. Si no tienes una cuenta existente, crea una a continuación.',
}: LoginPromptModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Entra a tu cuenta</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-6"
          >
            Ingresar
          </Button>
          <Button
            className="px-6 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onOpenChange(false)}
          >
            Crear Cuenta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
