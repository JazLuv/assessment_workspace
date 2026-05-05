import "dotenv/config"
import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const rooms = [
  {
    name: "Sala Creativa",
    description: "Espacio para lluvia de ideas y diseño",
    capacity: 8,
  },
  {
    name: "Laboratorio",
    description: "Sala equipada para demos técnicas",
    capacity: 6,
  },
  {
    name: "War Room",
    description: "Sala de decisiones estratégicas",
    capacity: 12,
  },
]

async function main() {
  console.log("Seeding rooms...")

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { name: room.name },
      update: {},
      create: room,
    })
    console.log(`  ✓ ${room.name}`)
  }

  console.log("Seed complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
