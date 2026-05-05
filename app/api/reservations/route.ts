import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { CreateReservationSchema } from "@/lib/validations/reservations"
import { fromError } from "zod-validation-error"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  // verificamos autenticacion
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  // parsear body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 })
  }

  // validar con Zod
  const parsed = CreateReservationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: fromError(parsed.error).message },
      { status: 422 }
    )
  }

  const data = parsed.data

  // verificar solapamiento
  const conflict = await prisma.reservation.findFirst({
    where: {
      roomId: data.roomId,
      AND: [
        { startTime: { lt: new Date(data.endTime) } },
        { endTime: { gt: new Date(data.startTime) } },
      ],
    },
  })

  if (conflict) {
    return NextResponse.json(
      { error: "La sala ya está reservada en ese horario" },
      { status: 409 }
    )
  }

  // crear reserva
  const reservation = await prisma.reservation.create({
    data: {
      roomId: data.roomId,
      userId: session.user.id,
      title: data.title,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
    },
  })

  return NextResponse.json({ reservation }, { status: 201 })
}