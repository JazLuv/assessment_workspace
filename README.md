# WorkSpace

Aplicación minimalista para reservar salas de juntas en una oficina. Construida con Next.js 15, Prisma, TanStack Query, Better Auth y Shadcn/UI.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Base de datos:** PostgreSQL via Docker
- **ORM:** Prisma
- **Auth:** Better Auth
- **Estado del cliente:** TanStack Query v5
- **UI:** Shadcn/UI + Tailwind CSS
- **Validación:** Zod

## Funcionalidades

- Dashboard con lista de salas disponibles y sus reservas del día
- Reserva de salas con selección de fecha y horario
- Validación de solapamiento de horarios en el servidor
- Calendario mensual integrado para ver reservas pasadas y futuras
- Modal de detalle por día con reservas agrupadas por sala
- Nombre del autor visible en cada reserva
- Autenticación con correo y contraseña
- Loading states con skeletons y manejo de errores

## Estructura del proyecto

```
assessment_workspace/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/route.ts              # Better Auth handler
│   │   ├── reservations/
│   │   │   ├── calendar/route.ts               # GET /api/reservations/calendar
│   │   │   └── route.ts                        # POST /api/reservations
│   │   └── rooms/route.ts                      # GET /api/rooms
│   ├── dashboard/page.tsx                      # Vista principal
│   ├── sign-in/page.tsx                        # Inicio de sesión
│   ├── sign-up/page.tsx                        # Registro
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                                # Redirect → /dashboard
├── components/
│   ├── ui/                                     # Componentes Shadcn
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   └── sonner.tsx
│   ├── calendar/
│   │   ├── DayReservationsModal.tsx            # Modal de detalle por día
│   │   └── ReservationCalendar.tsx             # Calendario mensual de reservas
│   ├── reservations/
│   │   ├── ReservationForm.tsx
│   │   └── ReservationModal.tsx
│   ├── rooms/
│   │   ├── RoomCard.tsx
│   │   └── RoomList.tsx
│   ├── DashboardHeader.tsx
│   └── NavBar.tsx
├── hooks/
│   ├── useCalendarReservations.ts              # useQuery para calendario
│   ├── useCreateReservation.ts                 # useMutation para reservas
│   └── useRooms.ts                             # useQuery para salas
├── lib/
│   ├── validations/
│   │   ├── reservations.ts                     # Zod schemas para reservations
│   │   └── rooms.ts                            # Zod schemas para rooms
│   ├── auth.ts                                 # Configuración Better Auth (servidor)
│   ├── auth-client.ts                          # Configuración Better Auth (cliente)
│   ├── prisma.ts                               # Cliente Prisma singleton
│   └── utils.ts
├── prisma/
│   ├── migrations/
│   │   ├── 20260505041958_init/
│   │   ├── 20260506053538_add_user_reservation_relation/
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts                                 # Seed con 3 salas
├── providers/
│   └── QueryProvider.tsx                       # TanStack Query Provider
├── .env.example
├── .gitignore
├── components.json
├── docker-compose.yml
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prisma.config.ts
└── README.md
```

## Requisitos previos

- Node.js 18+
- Docker Desktop
- npm

## Cómo levantar el proyecto

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/JazLuv/assessment_workspace.git
cd assessment_workspace
npm install
```

### 2. Variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y genera un secret seguro para `BETTER_AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Levantar PostgreSQL con Docker

```bash
docker compose up -d
```

Verifica que está corriendo:

```bash
docker compose ps
```

### 4. Migraciones y Seed

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Esto crea las tablas y agrega las 3 salas iniciales:
- Sala Creativa (8 personas)
- Laboratorio (6 personas)
- War Room (12 personas)

### 5. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Comandos útiles

| Comando | Descripción |
|---|---|
| `docker compose up -d` | Iniciar la base de datos |
| `docker compose down` | Detener la base de datos |
| `npx prisma studio` | Ver la base de datos visualmente |
| `npx prisma migrate dev` | Aplicar cambios al schema |
| `npx prisma db seed` | Poblar con datos iniciales |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilar para producción |