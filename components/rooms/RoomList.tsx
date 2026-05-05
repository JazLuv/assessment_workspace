"use client"

import { useRooms } from "@/hooks/useRooms"
import { RoomCard } from "@/components/rooms/RoomCard"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"

function RoomCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-10 rounded-full" />
      </div>
      <Skeleton className="h-4 w-48" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
      <Skeleton className="h-10 w-full mt-4 rounded-md" />
    </div>
  )
}

export function RoomList() {
  const { data, isLoading, isError, error } = useRooms()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <RoomCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-destructive">
        <AlertCircle className="w-10 h-10" />
        <p className="font-semibold text-lg">Error al cargar las salas</p>
        <p className="text-sm text-muted-foreground">
          {error instanceof Error ? error.message : "Inténtalo de nuevo más tarde"}
        </p>
      </div>
    )
  }

  if (!data?.rooms.length) {
    return (
      <p className="text-center text-muted-foreground py-16">
        No hay salas disponibles.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}