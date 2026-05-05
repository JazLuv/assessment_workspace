"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, Clock } from "lucide-react"
import type { Room } from "@/lib/validations/rooms"
import { ReservationModal } from "@/components/reservations/ReservationModal"

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  })
}

export function RoomCard({ room }: { room: Room }) {
  const [open, setOpen] = useState(false)

  const todayReservations = room.reservations.filter((r) => {
    const start = new Date(r.startTime)
    const today = new Date()
    return (
      start.getFullYear() === today.getFullYear() &&
      start.getMonth() === today.getMonth() &&
      start.getDate() === today.getDate()
    )
  })

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{room.name}</CardTitle>
            <Badge variant="secondary" className="shrink-0 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {room.capacity}
            </Badge>
          </div>
          {room.description && (
            <CardDescription>{room.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          {todayReservations.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Reservas de hoy
              </p>
              <div className="space-y-1.5">
                {todayReservations.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-2 text-sm bg-muted rounded-md px-2 py-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="font-medium truncate">{r.title}</span>
                    <span className="text-muted-foreground ml-auto shrink-0">
                      {formatTime(r.startTime)}–{formatTime(r.endTime)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sin reservas hoy</p>
          )}
          {room.reservations.length > todayReservations.length && (
            <>
              <Separator className="my-3" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Próximas reservas
                </p>
                {room.reservations
                  .filter((r) => !todayReservations.includes(r))
                  .slice(0, 2)
                  .map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <span>{formatDate(r.startTime)}</span>
                      <span className="font-medium text-foreground truncate">
                        {r.title}
                      </span>
                    </div>
                  ))}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setOpen(true)}>
            Reservar
          </Button>
        </CardFooter>
      </Card>
      <ReservationModal open={open} onClose={() => setOpen(false)} room={room} />
    </>
  )
}