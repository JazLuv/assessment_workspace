"use client"

import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReservationForm } from "@/components/reservations/ReservationForm"
import type { Room } from "@/lib/validations/rooms"
import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

interface ReservationModalProps {
  open: boolean
  onClose: () => void
  room: Room
}

export function ReservationModal({ open, onClose, room }: ReservationModalProps) {
  const { data: session, isPending } = useSession()

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reservar {room.name}</DialogTitle>
          <DialogDescription>
            Capacidad: {room.capacity} personas
            {room.description ? ` · ${room.description}` : ""}
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Verificando sesión…
          </div>
        ) : !session ? (
          <div className="py-4 space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Debes iniciar sesión para realizar una reserva.
            </p>
            <Button
              className="w-full"
              render={<Link href="/sign-in" onClick={onClose} />}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Iniciar sesión
            </Button>
          </div>
        ) : (
          <ReservationForm room={room} onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}