import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        reservations: {
          where: {
            endTime: { gte: new Date() },
          },
          select: {
            id: true,
            title: true,
            startTime: true,
            endTime: true,
            user: {
              select: { name: true },
            },
          },
          orderBy: { startTime: "asc" },
        },
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json({ rooms })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error al obtener las salas" },
      { status: 500 }
    )
  }
}