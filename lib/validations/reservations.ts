import { z } from "zod"

export const CreateReservationSchema = z
  .object({
    roomId: z.string().cuid(),
    title: z.string().min(3).max(100),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "endTime debe ser posterior a startTime",
    path: ["endTime"],
  })

export type CreateReservationInput = z.infer<typeof CreateReservationSchema>