"use client"

import { useQuery } from "@tanstack/react-query"

export interface CalendarReservation {
  id: string
  title: string
  startTime: string
  endTime: string
  roomName: string
  userName: string
}

async function fetchCalendarReservations(): Promise<{ reservations: CalendarReservation[] }> {
  const res = await fetch("/api/reservations/calendar")
  if (!res.ok) throw new Error("Error al cargar el calendario")
  return res.json()
}

export function useCalendarReservations() {
  return useQuery({
    queryKey: ["calendar-reservations"],
    queryFn: fetchCalendarReservations,
  })
}
