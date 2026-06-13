# Transform·Lab — Landing page

Proyecto web estático (HTML + CSS + JS vanilla). Sin dependencias ni build tools.

## Estructura

```
/
├── index.html              # HTML principal
├── css/
│   └── styles.css          # Todos los estilos
├── js/
│   └── main.js             # Todo el JavaScript
├── assets/
│   ├── turntable-volumen.mp4    # Vídeo avatar — cuerpo con volumen
│   ├── turntable-atletico.mp4   # Vídeo avatar — cuerpo atlético
│   ├── poster-volumen.jpg       # Poster del vídeo 1 (primer frame)
│   ├── poster-atletico.jpg      # Poster del vídeo 2 (primer frame)
│   ├── og-image.jpg             # Imagen para compartir en redes (1200×630 px)
│   └── favicon.ico              # Favicon
└── README.md
```

## Añadir los vídeos del avatar

1. Coloca tus archivos MP4 definitivos en `/assets/` con estos nombres exactos:
   - `turntable-volumen.mp4` — el modelo con volumen/sobrepeso
   - `turntable-atletico.mp4` — el modelo atlético

2. (Recomendado) Añade también versiones **WebM** para mejor compresión:
   - `turntable-volumen.webm`
   - `turntable-atletico.webm`
   Luego descomenta las líneas `<source … type="video/webm">` en `index.html`.

3. Genera un **poster** (captura del primer frame) para cada vídeo y guárdalo como:
   - `assets/poster-volumen.jpg`
   - `assets/poster-atletico.jpg`
   El poster se muestra mientras el vídeo carga.

## Abrir en local

### Opción A — Doble clic (más simple)
Abre `index.html` directamente en Chrome o Edge.
> ⚠️ Algunos navegadores bloquean el autoplay de vídeo en `file://`.
> Si los vídeos no arrancan, usa la opción B.

### Opción B — Servidor local con Python
```bash
# En la carpeta raíz del proyecto:
python -m http.server 3000
# Luego abre: http://localhost:3000
```

### Opción C — Extensión VS Code
Instala **Live Server** (ritwickdey.liveserver) y haz clic en *Go Live*.

## TODOs antes de publicar

Busca `TODO` en los archivos para localizar todos los puntos pendientes:

| Qué                        | Dónde                        |
|----------------------------|------------------------------|
| Nombre de marca            | `index.html`, `css/styles.css` |
| Dominio y URL canónica     | `index.html` (og:url)        |
| Imagen OG (1200×630 px)    | `assets/og-image.jpg`        |
| Favicon                    | `assets/favicon.ico`         |
| Precios y duración del reto| `index.html` (varias secciones) |
| Número de WhatsApp         | `index.html` (#final-cta)    |
| Enlace de inscripción/pago | `index.html` (#final-cta)    |
| Texto legal de la fianza   | `index.html` (#disclaimer)   |
| Política de privacidad     | `index.html` (footer)        |
| Peso/objetivo del ejemplo  | `index.html` + `js/main.js`  |

## Publicar en producción

El proyecto es 100 % estático. Puedes subirlo a:

- **Netlify / Vercel** — arrastra la carpeta al dashboard.
- **GitHub Pages** — sube el repositorio y activa Pages en `main / root`.
- **Cualquier hosting con FTP** — sube todos los archivos tal cual.
