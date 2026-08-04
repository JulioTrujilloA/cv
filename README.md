# CV — Julio Trujillo Alvarado

**Sitio en vivo:** [cv.jutrual.com](https://cv.jutrual.com)

Portafolio y CV bilingüe (español/inglés): sitio estático generado desde un
solo archivo de configuración y desplegado automáticamente en GitHub Pages.
Construido sobre el template [GitVitae](https://github.com/git-vitae/git-vitae.github.io) (MIT).

## Características

- **Bilingüe EN/ES** — toggle en el menú; enlaces directos con `?lang=es` / `?lang=en`.
- **CV imprimible** en [`/#/resume`](https://cv.jutrual.com/#/resume) — dos
  formatos (dos columnas y clásico), cada uno ajustado para caber en una sola
  página carta al imprimir; enlace directo por formato con `?layout=classic`.
- **Proyectos en vivo** — la sección de proyectos muestra los repos públicos
  con actividad más reciente vía la API de GitHub, sin configuración manual.
- **Certificaciones verificables** — insignias enlazadas a Credly.
- **Formulario de contacto real** (Formspree) y descarga del CV en
  PDF (impresión), JSON Resume y Markdown.
- **Tarjeta social propia** (og:image 1200×630) al compartir el enlace.

## Desarrollo

Requiere Node 20+ y pnpm.

```bash
pnpm install
pnpm dev            # servidor de desarrollo en localhost:3000
pnpm test           # vitest — incluye el test de paridad EN/ES
pnpm check-config   # valida portfolio.config.yaml
pnpm build          # genera resume.json/.md y el build de producción
```

Todo el contenido del CV vive en [`portfolio.config.yaml`](portfolio.config.yaml)
(`content.en` / `content.es`); los textos fijos de la interfaz en
[`src/lib/ui-strings.ts`](src/lib/ui-strings.ts).

## Deploy

Push a `main` → GitHub Actions valida la configuración, corre los tests, hace
el build y publica a GitHub Pages en el dominio propio `cv.jutrual.com`.

## Actualizar el template

```bash
pnpm upgrade-template
```

Trae las mejoras más recientes de GitVitae sin tocar `portfolio.config.yaml`.

---

_Basado en [GitVitae](https://github.com/git-vitae/git-vitae.github.io) — MIT License._
