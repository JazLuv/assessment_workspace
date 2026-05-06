"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays } from "lucide-react"
import { es } from "date-fns/locale"
import { useCalendarReservations } from "@/hooks/useCalendarReservations"
import { DayReservationsModal } from "@/components/calendar/DayReservationsModal"
import { Skeleton } from "@/components/ui/skeleton"
import type { CalendarReservation } from "@/hooks/useCalendarReservations"

export function ReservationCalendar() {
  const { data, isLoading } = useCalendarReservations()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [modalOpen, setModalOpen] = useState(false)

  const reservationsByDate: Record<string, CalendarReservation[]> = {}
  data?.reservations.forEach(r => {
    const dateKey = new Date(r.startTime).toLocaleDateString("en-CA")
    if (!reservationsByDate[dateKey]) reservationsByDate[dateKey] = []
    reservationsByDate[dateKey].push(r)
  })

  const datesWithReservations = Object.keys(reservationsByDate).map(
    d => new Date(d + "T12:00:00")
  )

  function handleDayClick(date: Date | undefined) {
    if (!date) return
    setSelectedDate(date)
    setModalOpen(true)
  }

  const selectedDateReservations = selectedDate
    ? reservationsByDate[selectedDate.toLocaleDateString("en-CA")] ?? []
    : []

  return (
    <div className="bg-background border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-base font-medium text-foreground">Calendario de reservas</h2>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-lg" />
      ) : (
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDayClick}
          locale={es}
          modifiers={{ hasReservation: datesWithReservations }}
          modifiersClassNames={{
            hasReservation: "font-bold underline underline-offset-2",
          }}
          className="w-full [&_table]:w-full"
        />
      )}

      <DayReservationsModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedDate(undefined)
        }}
        date={selectedDate ?? null}
        reservations={selectedDateReservations}
      />
    </div>
  )
}
