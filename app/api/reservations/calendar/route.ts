import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      select: {
        id: true,
        title: true,
        startTime: true,
        endTime: true,
        room: { select: { name: true } },
        user: { select: { name: true } },
      },
      orderBy: { startTime: "asc" },
    })

    const formatted = reservations.map(r => ({
      id: r.id,
      title: r.title,
      startTime: r.startTime.toISOString(),
      endTime: r.endTime.toISOString(),
      roomName: r.room.name,
      userName: r.user.name,
    }))

    return NextResponse.json({ reservations: formatted })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error al obtener el calendario" }, { status: 500 })
  }
}
