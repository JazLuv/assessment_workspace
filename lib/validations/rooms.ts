import { z } from "zod"

export const RoomReservationSchema = z.object({
  id: z.string(),
  title: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  user: z.object({ name: z.string() }),
})

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  capacity: z.number().int().positive(),
  reservations: z.array(RoomReservationSchema),
})

export const RoomsResponseSchema = z.object({
  rooms: z.array(RoomSchema),
})

export type RoomReservation = z.infer<typeof RoomReservationSchema>
export type Room = z.infer<typeof RoomSchema>
export type RoomsResponse = z.infer<typeof RoomsResponseSchema>