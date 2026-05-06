"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    await signUp.email({
      name,
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/dashboard")
          router.refresh()
        },
        onError: (ctx) => {
          setError(ctx.error.message ?? "Error al registrarse")
          setLoading(false)
        },
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">WorkSpace</CardTitle>
          <CardDescription>Crea tu cuenta para empezar</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-3 mt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Crear cuenta"
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/sign-in"
                className="text-primary hover:underline font-medium"
              >
                Inicia sesion
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}