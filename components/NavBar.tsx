"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "@/lib/auth-client"
import { LogIn, LogOut } from "lucide-react"

export function NavBar() {
  const { data: session } = useSession()

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40 h-16">
      <div className="container mx-auto px-4 max-w-6xl flex h-full items-center justify-between">
        <Link href="/dashboard" className="font-semibold text-2xl text-foreground">
          WorkSpace
        </Link>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-sm font-medium text-foreground shrink-0">
                  {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <span className="text-sm text-muted-foreground">
                  {session.user.name}
                </span>
              </div>
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
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/sign-in" />}
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                Iniciar sesion
              </Button>
              <Button variant="outline" size="sm" render={<Link href="/sign-up" />}>
                Registrarse
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
