"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateReservationInput } from "@/lib/validations/reservations"

interface ApiError {
  error: string
}

async function createReservation(data: CreateReservationInput) {
  const res = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err: ApiError = await res.json()
    throw { status: res.status, message: err.error }
  }

  return res.json()
}

export function useCreateReservation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
    },
  })
}