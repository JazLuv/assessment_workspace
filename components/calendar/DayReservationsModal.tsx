"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Calendar, Clock, User, Building2 } from "lucide-react"
import type { CalendarReservation } from "@/hooks/useCalendarReservations"

interface DayReservationsModalProps {
  open: boolean
  onClose: () => void
  date: Date | null
  reservations: CalendarReservation[]
}

export function DayReservationsModal({ open, onClose, date, reservations }: DayReservationsModalProps) {
  if (!date) return null

  const formatted = date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const grouped = reservations.reduce((acc, r) => {
    if (!acc[r.roomName]) acc[r.roomName] = []
    acc[r.roomName].push(r)
    return acc
  }, {} as Record<string, CalendarReservation[]>)

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            Reservas del dia
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatted}
          </DialogDescription>
        </DialogHeader>

        {reservations.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Sin reservas este dia
          </div>
        ) : (
          <div className="space-y-4 mt-2 max-h-[60vh] overflow-y-auto pr-1">
            {Object.entries(grouped).map(([room, items]) => (
              <div key={room}>
                <p className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 mb-2">
                  <Building2 className="w-3 h-3" />
                  {room}
                </p>
                <div className="space-y-2">
                  {items.map(r => (
                    <div key={r.id} className="bg-muted rounded-lg px-3 py-2.5">
                      <p className="text-sm font-medium text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(r.startTime)} – {formatTime(r.endTime)}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <User className="w-3 h-3" />
                        {r.userName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
