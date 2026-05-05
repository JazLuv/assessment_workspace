import { RoomList } from "@/components/rooms/RoomList"
import { NavBar } from "@/components/NavBar"
import { DashboardHeader } from "@/components/DashboardHeader"

export const metadata = {
  title: "WorkSpace — Dashboard",
  description: "Reserva tu sala de juntas",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8 max-w-6xl bg-muted/30">
        <DashboardHeader />
        <RoomList />
      </main>
    </div>
  )
}
