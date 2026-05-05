"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle } from "lucide-react"
import { useCreateReservation } from "@/hooks/useCreateReservation"
import type { Room } from "@/lib/validations/rooms"
import { toast } from "sonner"

const FormSchema = z
  .object({
    title: z.string().min(3, "El titulo debe tener al menos 3 caracteres").max(100),
    date: z.string().min(1, "La fecha es requerida"),
    startTime: z.string().min(1, "La hora de inicio es requerida"),
    endTime: z.string().min(1, "La hora de fin es requerida"),
  })
  .refine(
    (data) => {
      if (!data.date || !data.startTime || !data.endTime) return true
      return data.endTime > data.startTime
    },
    {
      message: "La hora de fin debe ser posterior a la de inicio",
      path: ["endTime"],
    }
  )

type FormValues = z.infer<typeof FormSchema>

interface ReservationFormProps {
  room: Room
  onSuccess: () => void
}

export function ReservationForm({ room, onSuccess }: ReservationFormProps) {
  const mutation = useCreateReservation()
  const today = new Date().toISOString().split("T")[0]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { date: today },
  })

  const conflictError =
    mutation.error &&
    typeof mutation.error === "object" &&
    "status" in mutation.error &&
    (mutation.error as { status: number }).status === 409

  async function onSubmit(values: FormValues) {
    const startTime = new Date(
      `${values.date}T${values.startTime}:00`
    ).toISOString()
    const endTime = new Date(
      `${values.date}T${values.endTime}:00`
    ).toISOString()

    mutation.mutate(
      { roomId: room.id, title: values.title, startTime, endTime },
      {
        onSuccess: () => {
          toast.success("Reserva creada exitosamente")
          reset()
          onSuccess()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Campo: Título */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Título de la reunion</Label>
        <Input
          id="title"
          placeholder="Ej: Revision de proyecto"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Campo: Fecha */}
      <div className="space-y-1.5">
        <Label htmlFor="date">Fecha</Label>
        <Input id="date" type="date" min={today} {...register("date")} />
        {errors.date && (
          <p className="text-xs text-destructive">{errors.date.message}</p>
        )}
      </div>

      {/* Campos: Horas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="startTime">Hora de inicio</Label>
          <Input
            id="startTime"
            type="time"
            onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
            {...register("startTime")}
          />
          {errors.startTime && (
            <p className="text-xs text-destructive">{errors.startTime.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="endTime">Hora de fin</Label>
          <Input
            id="endTime"
            type="time"
            onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
            {...register("endTime")}
          />
          {errors.endTime && (
            <p className="text-xs text-destructive">{errors.endTime.message}</p>
          )}
        </div>
      </div>

      {/* Error 409: sala ocupada */}
      {conflictError && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p className="text-sm font-medium">
            Esta sala ya esta reservada en ese horario. Por favor elige otro.
          </p>
        </div>
      )}

      {/* Error genérico */}
      {mutation.error && !conflictError && (
        <p className="text-sm text-destructive">
          {typeof mutation.error === "object" && "message" in mutation.error
            ? String((mutation.error as { message: string }).message)
            : "Error al crear la reserva"}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Reservando…
          </>
        ) : (
          "Confirmar reserva"
        )}
      </Button>
    </form>
  )
}