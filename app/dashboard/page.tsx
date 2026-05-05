import { RoomList } from "@/components/rooms/RoomList"
import { NavBar } from "@/components/NavBar"

export const metadata = {
  title: "WorkSpace — Dashboard",
  description: "Reserva tu sala de juntas",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Salas disponibles
          </h1>
          <p className="text-muted-foreground mt-1">
            Selecciona una sala y elige el horario para tu reunión.
          </p>
        </div>
        <RoomList />
      </main>
    </div>
  )
}