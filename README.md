# TCOPOS — Gestión Financiera

Aplicación web para el registro y control de operaciones financieras personales.  
Inspirada en un monedero electrónico: múltiples cuentas, control de ingresos/egresos, y resumen por rango de fechas.

## Funcionalidades

- **Autenticación simulada** — Login con credenciales de prueba.
- **Dashboard** — Resumen general con todas las cuentas y sus saldos.
- **Cuentas** — Listado completo de cuentas bancarias (gastos generales, compras, inversiones, etc.).
- **Detalle de cuenta** — Formulario con validaciones para crear transacciones, resumen de ingresos/egresos, filtro por rango de fechas, y listado de movimientos.
- **Multimoneda** — Soporte para distintas divisas por cuenta.
- **Responsive** — Diseño adaptativo mobile-first con modo oscuro y glassmorphism.
- **Animaciones** — Transiciones suaves con Motion.

## Tecnologías

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 / Rolldown |
| Estilos | Tailwind CSS v4 + HeroUI v3 |
| Estado | Zustand (auth) + React Query (datos) |
| Formularios | react-hook-form |
| Notificaciones | react-hot-toast |
| Animaciones | Motion |
| Fondo 3D | Three.js / @react-three/fiber |
| API | Axios + MockAPI |

## Requisitos

- Node.js >= 20
- npm >= 10

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/1El-kike/Tcopos.git
cd TCOPOS

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar la build
npm run preview
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://6a278e87a84f9d39e908b63c.mockapi.io/api
```

## Credenciales de prueba

| Campo | Valor |
|-------|-------|
| Correo | `test@test.com` |
| Contraseña | cualquier valor |

## API Externa

Los datos se obtienen de [MockAPI](https://mockapi.io/). Endpoints:

- `GET /accounts` — Lista de cuentas
- `GET /accounts/:id` — Cuenta individual
- `GET /transactions` — Todas las transacciones
- `POST /transactions` — Crear transacción

## Estructura del proyecto

```
src/
├── components/
│   ├── atoms/           # Componentes base (Iconos, Logo, Avatar, etc.)
│   ├── molecules/       # Combinaciones simples (SidebarNav, UserMenu, DateRangeFilter)
│   ├── organisms/       # Componentes complejos (AccountGrid, TransactionSummary, TransactionList, AppHeader, AppSidebar)
│   └── templates/       # Layouts completos (AppLayout)
├── hooks/               # Custom hooks (useLoginForm, useAccounts, useTransactions)
├── pages/               # Páginas (Login, Dashboard, Accounts, AccountDetail)
├── router/              # Configuración de rutas
├── services/            # API client (axios) y tipos
├── store/               # Estado global (Zustand)
└── utils/               # Utilidades
```

## Despliegue

Disponible en **[Render](https://tcopos.onrender.com/dashboard)** (Static Site).

```bash
# Build de producción
npm run build
```

El directorio `dist/` se despliega en Render apuntando al build de Vite.
