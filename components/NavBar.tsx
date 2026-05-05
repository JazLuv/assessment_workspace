"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "@/lib/auth-client"
import { LogIn, LogOut, User } from "lucide-react"

export function NavBar() {
  const { data: session } = useSession()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-6xl flex h-14 items-center justify-between">
        <Link href="/dashboard" className="font-semibold text-lg tracking-tight">
          WorkSpace
        </Link>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {session.user.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.reload()
                      },
                    },
                  })
                }
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/sign-in" />}
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                Iniciar sesión
              </Button>
              <Button size="sm" render={<Link href="/sign-up" />}>
                Registrarse
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}