/* ============================================================
   CONTENIDO EDITABLE — THE OMAR OMEGA PRESS KIT
   ============================================================
   Omar: este es EL ÚNICO archivo que necesitas tocar para
   actualizar tu página. Abre con cualquier editor de texto
   (Bloc de notas, VS Code), cambia el texto entre comillas,
   guarda y recarga la página. No borres comas ni comillas.

   Para cambiar FOTOS: sube tu foto nueva a la carpeta
   assets/img/ y escribe aquí su nombre de archivo.
   ============================================================ */

window.CONTENIDO = {

  /* ---------- GENERAL ---------- */
  artista: "The Omar Omega",
  // La frase corta arriba del nombre gigante:
  kicker: "Un universo contado por actos — cabaret, bolero y pista de baile.",
  // Etiquetas bajo el nombre (puedes agregar o quitar):
  roles: ["Cantante", "Productor", "DJ", "Guadalajara, MX"],

  /* ---------- EFECTO DÍA → NOCHE ---------- */
  // La página empieza clara (de día) y se va oscureciendo
  // conforme bajas, hasta quedar de noche al final.
  // Pon false si prefieres los colores claros fijos.
  diaNoche: true,

  /* ---------- INTRO (luna 3D al abrir) ---------- */
  // La animación de la luna que pasa de nueva a llena al abrir la página.
  // Está APAGADA. Para prenderla: cambia false por true.
  intro: {
    activar: false,
    duracionSegundos: 2.4   // cuánto tarda la luna en llegar a llena
  },

  /* ---------- FOTO PRINCIPAL (hero) ---------- */
  heroFoto: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784225626820-hero-moogler.webp",
  heroPie: "Moogler, 2026 — dirección de arte y estilismo: estudio The Omar Omega.",

  /* ---------- CINTA NEGRA QUE SE DESLIZA ---------- */
  // Pares de [TEXTO GRANDE, acento en cursiva]
  marquee: [
    ["α Alpha: Act 0", "Cabaret, Visiō"],
    ["Nuevo video ya disponible", "YouTube"],
    ["Booking abierto 2026", "Guadalajara · MX"]
  ],

  /* ---------- ACTO 01: EL UNIVERSO ---------- */
  // Puedes usar <em>palabras</em> para resaltarlas en rojo.
  manifiesto: "La música de The Omar Omega es <em>un viaje en el tiempo</em>: cada álbum es un capítulo, y cada capítulo habita un género distinto. Del bolero de cabaret al synth de medianoche, todos los mundos ocurren a la vez — y todos son él.",
  manifiestoNota: "Proyecto encabezado por Omar Jiménez desde Guadalajara. Voz, producción y dirección creativa propias; vestuario y dirección de arte en colaboración con su estudio. Dos álbumes en producción y los siguientes actos ya en el mapa.",
  capitulos: [
    { acto: "α", etiqueta: "PUBLICADO",
      texto: "Act 0 — Cabaret, Visiō. El prólogo: un popurrí en vivo de cuatro canciones, entre terciopelo rojo y micrófono de bulbo. Ya disponible." },
    { acto: "25 mg", etiqueta: "EN PRODUCCIÓN",
      texto: "25 miligramos — lo que sigue justo después del prólogo." },
    { acto: "I–II", etiqueta: "EN PRODUCCIÓN",
      texto: "Dos álbumes en camino: dos capítulos, dos géneros, un mismo universo." },
    { acto: "III–IV", etiqueta: "PRÓXIMAMENTE",
      texto: "Los siguientes mundos del universo. El viaje apenas comienza." }
  ],

  /* ---------- ACTO 02: MÚSICA ---------- */
  // Pega tu link completo entre las comillas de "url".
  // Si lo dejas vacío (""), el botón aparece como "pronto".
  plataformas: [
    { nombre: "Spotify",     url: "https://open.spotify.com/artist/63k0eMd0Sb5PvZcUAXfR5Y" },
    { nombre: "Apple Music", url: "https://music.apple.com/mx/album/the-fly-saturn-pills-melody-remix/6788250651?i=6788250654" },
    { nombre: "SoundCloud",  url: "https://soundcloud.com/omar-gonzalez-485883329" },
    { nombre: "YouTube",     url: "https://youtu.be/Lw4BK03FNiM" }
  ],
  // Player de Spotify embebido (la canción que suena en la página):
  // es lo que va después de /track/ en el link de la canción. "" = ocultarlo.
  spotifyTrackId: "6Li4TVttj7Rxw6Ru1T3jOz",
  cancionDestacada: "The Fly (Saturn Pills) — Melody Remix · sencillo 2026",
  musicaNota: "Sello: The Old Kings Saturn Records. Distribución en todas las plataformas vía DistroKid. — <i>Act 0 ya disponible.</i>",

  /* ---------- ACTO 03: EL VIDEO ---------- */
  videoYouTubeId: "Lw4BK03FNiM",   // lo que va después de youtu.be/
  videoTitulo: "α Alpha:",
  videoTituloRojo: "Act 0",
  videoSub: "Cabaret, Visiō — popurrí en vivo de cuatro canciones.",
  videoPie: "Producción independiente. Dirección y arte: estudio The Omar Omega.",

  /* ---------- ACTO 04: FOTOS ---------- */
  // "tam" = qué tan ancha se ve cada foto en computadora (4 a 8).
  //   4 ó 5 → angosta (mejor para fotos VERTICALES)
  //   6 a 8 → ancha  (mejor para fotos HORIZONTALES)
  // "serie" = el texto que aparece bajo la foto.
  galeria: [
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045455756-img--cab-boa.webp",       serie: "Cabaret",   tam: 4 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045464055-img--fest-walk.webp",     serie: "FIGC 2026", tam: 4 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045457359-img--cab-circulo.webp",   serie: "Cabaret",   tam: 4 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045459694-img--cab-espalda.webp",   serie: "Cabaret",   tam: 4 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045468279-img--moog-fur.webp",      serie: "Moogler",   tam: 8 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045463150-img--fest-truck.webp",    serie: "FIGC 2026", tam: 6 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045467438-img--moog-escalera.webp", serie: "Moogler",   tam: 6 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045458963-img--cab-croon.webp",     serie: "Cabaret",   tam: 4 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045458196-img--cab-corazon.webp",   serie: "Cabaret",   tam: 8 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045462056-img--fest-lean.webp",     serie: "FIGC 2026", tam: 5 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045465747-img--moog-crouch.webp",   serie: "Moogler",   tam: 7 },
    { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045461039-img--cab-mic.webp",       serie: "Cabaret",   tam: 5 }
  ],
  // El recuadro amarillo entre las fotos (déjalo "" para quitarlo):
  fraseGaleria: "Primero te ven.<br>Después no te olvidan.",
  fraseGaleriaFirma: "— regla de los tres segundos",
  // Después de cuál foto aparece el recuadro amarillo:
  frasePosicion: 6,
  galeriaAviso: "clic para ampliar — uso editorial libre con crédito",

  /* ---------- ACTO 05: PARA MARCAS (patrocinios) ---------- */
  // Sección para presentar tus eventos a marcas patrocinadoras
  // (tequila, cerveza, etc.). Cuando tengas fotos y números de tus
  // eventos, cámbialos aquí o desde el panel.
  // Pon activar en false para esconder la sección completa.
  marcas: {
    activar: true,
    intro: "The Omar Omega organiza showcases independientes en Guadalajara: música en vivo, comunidad y estética de cabaret. Si tu marca quiere estar en el siguiente acto, hablemos.",
    // Cifras grandes con su descripción (asistentes, alcance, fechas…):
    numeralia: [
      { cifra: "07·2026", etiqueta: "primer showcase — Santa Tere, GDL" },
      { cifra: "2", etiqueta: "álbumes en producción y gira de actos en camino" },
      { cifra: "100%", etiqueta: "producción y comunidad independientes" }
    ],
    // Fotos de tus eventos (el público, el ambiente, el montaje):
    fotos: [
      { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045463150-img--fest-truck.webp", pie: "FIGC 2026" },
      { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045464055-img--fest-walk.webp", pie: "FIGC 2026" },
      { archivo: "https://ajekywhnuepmqbxflala.supabase.co/storage/v1/object/public/omar-epk/1784045462056-img--fest-lean.webp", pie: "FIGC 2026" }
    ],
    ctaTexto: "Pedir kit de patrocinio"
  },

  /* ---------- ACTO 06: CONTACTO ---------- */
  correo: "the_omar_omega@outlook.com",
  instagram: "the_omar_omega",   // solo el usuario, sin @
  tiktok: "the_omar_omega",      // solo el usuario, sin @
  contactoIntro: "Para fechas, festivales, prensa y colaboraciones, escríbeme directo — respondo yo.",
  contactoAviso: "Contacto únicamente por correo y redes verificadas.",

  /* ---------- PIE DE PÁGINA ---------- */
  piePagina: "© 2026 The Omar Omega — todos los derechos reservados."
};
