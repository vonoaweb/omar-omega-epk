# The Omar Omega — Press Kit (EPK)

One-pager estático (HTML/CSS/JS puro, sin dependencias) para el press kit de
The Omar Omega (Omar Jiménez). Demo construida el 13-jul-2026; online desde el 14-jul-2026.

## Arquitectura online (14-jul-2026)

- **Hosting**: Vercel (proyecto `omar-omega-epk`, deploy vía MCP con solo los 3
  archivos de texto: `index.html`, `admin.html`, `contenido.js`).
- **Imágenes**: bucket público `omar-epk` en Supabase Storage (proyecto `vonoa-forms`,
  ref `ajekywhnuepmqbxflala`) — las 15 fotos + los SVGs de marca.
- **Contenido**: tabla `omar_epk` (fila id=1, jsonb) con RLS de solo lectura pública.
  `index.html` la lee al cargar (timeout 2.5s → fallback a `contenido.js` local).
- **Edición de Omar**: `admin.html` — panel con todos los campos + subida de fotos
  (se reducen a 1600px y convierten a webp en el navegador). Guarda vía Edge Function
  `omar-epk-guardar` (valida la frase secreta contra hash SHA-256 y escribe con
  service role). **La frase secreta la tiene Fer** (no está en ningún archivo del repo).
- **Motion** (refs: pixaura.com/thank-you, motion.page): estrellas canvas que aparecen
  al anochecer, entrada del hero por líneas, parallax sutil (`data-par`), líneas de
  sección que crecen, staggers en plataformas/capítulos.

## Correr local

```
python -m http.server 8014 --directory omar-omega-epk
```

o abrir `index.html` directo en el navegador.

## Estructura

- `contenido.js` — **TODO el contenido editable** (textos, links, fotos, contacto).
  Es el único archivo que Omar necesita tocar; está comentado en español campo por campo.
- `index.html` — diseño y motor de render (lee `contenido.js`); estilos y JS inline.
- `assets/brand/` — SVGs de la marca (firma, wordmark, glifo, saturnos, lunas, aries, emblema)
- `assets/img/` — fotos optimizadas a webp (~920 KB total, de los 3 shoots: Cabaret, FIGC 2026, Moogler)

## Autogestión (cómo edita Omar)

Abrir `contenido.js`, cambiar el texto entre comillas, guardar y recargar:
- Links de música: campo `plataformas` (URL vacía `""` = botón "pronto" deshabilitado).
- Fotos: subir el archivo a `assets/img/` y agregar/quitar entradas en `galeria`
  (`tam` 4–5 para verticales, 6–8 para horizontales).
- Intro de la luna: `intro.activar` (true/false) y `duracionSegundos`.
  Hoy está APAGADA (false) a petición de Fer; Omar puede prenderla cambiando a true.
- Todo lo demás (manifiesto, capítulos, video, contacto, pie) tiene su campo comentado.

## Efecto día → noche

La página "amanece" clara y anochece conforme bajas: el fondo se interpola de papel
a tinta con el scroll y el color del texto se voltea justo mientras la sección negra
del video cubre la pantalla (así nunca hay texto sin contraste). Los logos del header
se invierten a blanco con `filter: invert(var(--inv))`. Interruptor en `contenido.js`:
`diaNoche: false` = colores claros fijos.

## Intro — luna 3D en fases

Canvas 2D procedural, sin librerías: luna nueva → llena con sombreado esférico,
cráteres con semilla fija y halo. Clic = saltar; `prefers-reduced-motion` la omite;
`?luna=lenta` en la URL la reproduce a ⅓ de velocidad (para revisarla).

## Pendientes (esperar datos de Omar)

1. ~~Links de plataformas~~ **Listo**: las 4 plataformas tienen URL real —
   Spotify (artista `63k0eMd0Sb5PvZcUAXfR5Y` — "The OmarOmega", sello The Old Kings
   Saturn Records), Apple Music (sencillo), SoundCloud
   (`soundcloud.com/omar-gonzalez-485883329`) y YouTube. La sección Música incluye el
   player embebido de Spotify del sencillo "The Fly (Saturn Pills) — Melody Remix".
2. **Textos finales**: el manifiesto ("El universo") y las notas son borrador basado en
   lo que Omar describió por audio; él va a mandar textos definitivos.
3. **Animación Lottie**: Omar ofreció crear una; se puede sumar al hero si la manda.
4. Video embebido: YouTube `Lw4BK03FNiM` (α Alpha: Act 0 — Cabaret, Visiō) — ya funciona.
5. Sin botón de WhatsApp a propósito (petición explícita de Omar, para evitar bots).

## Decisiones de diseño

- Tipografías que Omar eligió: Anton (display) + Libre Baskerville (editorial), vía Google Fonts.
- Paleta tomada de su hoja de assets: papel #f6f2ea, tinta #141112, rojo #be1e2d,
  amarillo #ffd41d (azul #21409a y magenta #ed2290 disponibles, casi sin usar).
- Referencias que él mandó: Gesaffelstein, Madonna, Lady Gaga, PinkPantheress.
- Secciones numeradas como "actos" (eco de su video Act 0 y su narrativa por capítulos).
- Fade-in con IntersectionObserver, marquee CSS, lightbox con `<dialog>` nativo.
