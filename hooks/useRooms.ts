"use client"

import { useQuery } from "@tanstack/react-query"
import type { RoomsResponse } from "@/lib/validations/rooms"

async function fetchRooms(): Promise<RoomsResponse> {
  const res = await fetch("/api/rooms")
  if (!res.ok) throw new Error("Error al cargar las salas")
  return res.json() as Promise<RoomsResponse>
}

export function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  })
}