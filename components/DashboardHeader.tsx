"use client"

import { Calendar } from "lucide-react"
import { useRooms } from "@/hooks/useRooms"

export function DashboardHeader() {
  const { data } = useRooms()

  const fecha = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const roomCount = data?.rooms.length

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-normal text-foreground tracking-tight">
        Salas disponibles
      </h1>
      <p className="text-muted-foreground mt-1">
        Selecciona una sala y elige el horario para tu reunión.
      </p>
      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
        <Calendar className="w-4 h-4" />
        {fecha} · {roomCount !== undefined ? `${roomCount} salas` : "·"}
      </p>
    </div>
  )
}
