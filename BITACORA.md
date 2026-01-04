# Bitácora del Proyecto - Finanzas Personales

Este documento servirá como registro diario de todas las actividades, decisiones y progresos realizados en el proyecto.

## [2025-12-29] - Inicio del Proyecto

### Actividades
- **Inicio de Conversación**: Definición de objetivos iniciales.
- **Selección de Tecnología**: Se decidió utilizar una **Web App a medida (Next.js)** en lugar de una solución Low-Code (Budibase).
    - *Motivo*: Mayor capacidad de personalización, control total sobre la lógica de proyecciones financieras complejas y mejor experiencia de usuario (Aesthetics).
- **Definición de Requisitos Clave**:
    - Gestión de transacciones recurrentes, préstamos, sueldos.
    - Proyecciones financieras a 1 año.
    - Análisis de flujo de caja.
    - **Requisito Crítico**: Documentación exhaustiva (Bitácora diaria + Documentación por carpeta/archivo).

### Decisiones Técnicas
- **Frontend**: Next.js (React) + Tailwind CSS (para diseño premium).
- **Backend/DB**: PostgreSQL gestionado vía **Docker Compose** para fácil despliegue en VPS.
- **Infraestructura**: VPS Linux (Ubuntu 24.04 LTS). Acceso Root confirmado.

### Estándares de Documentación
- **Bitácora**: Se actualizará diariamente con el progreso.
- **Código**: Cada carpeta principal tendrá un arquivo `README.md` explicando su propósito y contenido.

### Progreso [2025-12-29]
- **Inicialización**: Setup de Next.js, Tailwind, TypeScript y Directorios (`components`, `lib`, `prisma`).
- **Infraestructura**:
    - Definición de `docker-compose.yml` para base de datos PostgreSQL.
    - Downgrade de Prisma a v5 (Estable) para solucionar conflicto de configuración.
- **Base de Datos**:
    - Esquema completo: `Transaction` (con Recurrencia/Estado), `Account` (Fuentes), `Category` (Subcategorías), `Currency`.
    - Script de Seed (`seed.ts`) creado para poblar categorías desde imagen de usuario.
- **Frontend**:
    - Layout Principal: Sidebar y Navbar con modo oscuro premium.
    - Dashboard: Vista estática inicial.
    - Settings: **Implementación de CRUD de Categorías Funcional** (Crear, Listar, Borrar).
- **Próximos Pasos**:
    - Completar gestión de Cuentas (Fuentes de Dinero).
    - Formulario avanzado de Transacciones (con selectores reales de Cuenta/Categoría).
    - Conectar Dashboard a datos reales.

### Incidencias Pendientes
- **Error Crítico en Runtime** (RESUELTO): `Application error: a server-side exception has occurred`.
    - *Causa*: Conflicto de puertos. Una instancia local de Postgres en puerto 5432 impedía la conexión al contenedor Docker.
    - *Solución*: Se movió el contenedor Docker al puerto **5433**.

## [2026-01-03] - Recuperación y Avance

### Actividades
- **Resolución de Deuda Técnica**: Diagnóstico y corrección de conexión a Base de Datos.
    - Problema de autenticación "Access Denied" y conflicto de puertos.
    - Solución definitiva: Re-mapeo de puerto DB (5433) y script de seed JS (`prisma/seed.js`) para evitar problemas de ESM con `ts-node`.
- **Implementación de Funcionalidad**: Gestión de Cuentas (Money Sources).

### Progreso
- **Backend**:
    - Nuevas Server Actions en `src/lib/actions.ts`: `getAccounts`, `createAccount`, `deleteAccount`.
    - Seed de datos (`prisma/seed.js`): Ahora inserta Moneda base (USD) y Cuentas por defecto (Efectivo, Banco, TC) de forma robusta.
- **Frontend**:
    - Componente `AccountManager.tsx`: Permite crear nuevas cuentas con selección de Tipo, Moneda y Saldo Inicial.
    - Integración completa en `/settings`.
- **Validación**:
    - Pruebas manuales exitosas: Creación de cuenta "Banco Test" visualizada correctamente en la lista.

### Próximos Pasos
- Construir el **Formulario de Transacciones** (el corazón de la app).
- Conectar los widgets del Dashboard a consultas reales de Prisma.
- Implementar lógica de saldos (Balance) dinámica.
