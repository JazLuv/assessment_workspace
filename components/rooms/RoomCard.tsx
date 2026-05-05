"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Home, Users2, Clock, CalendarPlus } from "lucide-react"
import type { Room } from "@/lib/validations/rooms"
import { ReservationModal } from "@/components/reservations/ReservationModal"

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
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
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Home className="w-4 h-4 text-muted-foreground" />
              {room.name}
            </CardTitle>
            <Badge variant="outline" className="shrink-0 flex items-center gap-1">
              <Users2 className="w-3.5 h-3.5" />
              {room.capacity}
            </Badge>
          </div>
          {room.description && (
            <p className="text-sm text-muted-foreground">{room.description}</p>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          <Separator className="my-3" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Clock className="w-3 h-3" />
            HOY
          </p>
          {todayReservations.length > 0 ? (
            <div className="space-y-1.5">
              {todayReservations.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-2 text-sm bg-muted rounded-md px-2 py-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="font-medium text-foreground truncate">{r.title}</span>
                  <span className="text-xs text-muted-foreground ml-auto shrink-0">
                    {formatTime(r.startTime)}–{formatTime(r.endTime)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Sin reservas hoy
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => setOpen(true)}>
            <CalendarPlus className="w-4 h-4 mr-2" />
            Reservar
          </Button>
        </CardFooter>
      </Card>
      <ReservationModal open={open} onClose={() => setOpen(false)} room={room} />
    </>
  )
}
