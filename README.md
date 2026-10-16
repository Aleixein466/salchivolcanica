# Salchivolcánica

Menú digital mobile-first para Salchivolcánica, Mocoa (Putumayo). Incluye catálogo con búsqueda y filtros, fotos reales destacadas, carrito persistente y envío del resumen del pedido por WhatsApp.

El carrito guarda la selección en `localStorage`, admite variantes y cantidades y calcula un total estimado. WhatsApp recibe el resumen para que el restaurante confirme disponibilidad, domicilio y valor final; el sitio no simula un pago ni confirma automáticamente el pedido.

## Desarrollo local

```bash
npm install
npm run dev
```

### Vercel

El repositorio incluye `vercel.json` para que Vercel ejecute Next.js nativo con Webpack y genere `.next`. El comando `npm run build` se conserva para Cloudflare Sites mediante Vinext; para reproducir el build de Vercel localmente usa:

```bash
npm run build:vercel
```

El catálogo funciona sin base de datos desde `lib/menu-data.ts`. La ruta `GET /api/menu` expone únicamente lectura; no existen rutas públicas de escritura.

## Arquitectura de datos

`lib/menu-service.ts` define el contrato `MenuRepository`. El adaptador actual es local y puede sustituirse por un repositorio Prisma o una API segura sin rehacer la interfaz. `prisma/schema.prisma` contiene el modelo PostgreSQL para categorías, productos, variantes, ingredientes y ajustes del restaurante.

Para activar PostgreSQL en un hosting compatible:

1. Instalar `prisma` y `@prisma/client`.
2. Definir `DATABASE_URL` en `.env`.
3. Ejecutar `npx prisma migrate dev --name init` y crear un seed desde `lib/menu-data.ts`.
4. Implementar `PrismaMenuRepository` detrás del contrato existente.

El despliegue actual en Sites usa el catálogo local porque su runtime no ofrece TCP directo a PostgreSQL.

## AppSheet (evaluación futura)

No hay integración activa. Las alternativas son una API autenticada que implemente `MenuRepository`, una sincronización controlada desde una fuente compatible o un proceso ETL. Antes de elegir se deben validar conectores, costos, permisos y resolución de conflictos. Las operaciones de escritura futuras deben exigir autenticación y autorización por roles.

## Contenido y fotografías

Los productos y precios fueron transcritos de los dos menús suministrados. La imagen gastronómica generada se identifica como ilustrativa y debe reemplazarse por fotografías oficiales cuando estén disponibles.
