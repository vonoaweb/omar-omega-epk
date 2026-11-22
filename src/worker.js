/*
 * omaromega.com — Worker de Cloudflare.
 *
 * Por qué existe: la página arma sus textos con JavaScript leyendo Supabase,
 * y los bots de buscadores e IA (ChatGPT, Claude, Gemini, Perplexity) casi
 * nunca ejecutan JavaScript: veían una página vacía. Aquí se rellena el HTML
 * en el servidor con lo último que Omar guardó en su panel, se agregan los
 * datos estructurados (schema.org) y se sirven robots.txt, sitemap.xml y
 * llms.txt. El JavaScript del navegador sigue funcionando igual que antes.
 */

const SUPA_URL = 'https://ajekywhnuepmqbxflala.supabase.co';
const SUPA_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZWt5d2hudWVwbXFieGZsYWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzODgxOTIsImV4cCI6MjA5ODk2NDE5Mn0.A29frr_c1g0NLMtv3-S1IRWZvy5xXXMZW0pBkkZxcpk';
const SITIO = 'https://omaromega.com';

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sinHtml = (s) => String(s ?? '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/* Contenido actual del panel (con 2 min de caché para no consultar Supabase en cada visita). */
async function leerContenido(ctx) {
  const url = `${SUPA_URL}/rest/v1/omar_epk?id=eq.1&select=data`;
  const cache = caches.default;
  const clave = new Request(url);
  let r = await cache.match(clave);
  if (!r) {
    r = await fetch(url, { headers: { apikey: SUPA_ANON, authorization: 'Bearer ' + SUPA_ANON } });
    if (!r.ok) return null;
    r = new Response(r.body, r);
    r.headers.set('Cache-Control', 'public, max-age=120');
    ctx.waitUntil(cache.put(clave, r.clone()));
  }
  try {
    const filas = await r.json();
    return (filas[0] && filas[0].data) || null;
  } catch { return null; }
}

/* Datos estructurados: quién es, dónde está, y sus perfiles oficiales. */
function jsonLd(C) {
  const perfiles = [
    ...(C.plataformas || []).map((p) => p.url).filter(Boolean),
    C.instagram && `https://www.instagram.com/${C.instagram}/`,
    C.tiktok && `https://www.tiktok.com/@${C.tiktok}`,
  ].filter(Boolean);

  const datos = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicGroup',
        '@id': `${SITIO}/#artista`,
        name: C.artista || 'The Omar Omega',
        alternateName: ['Omar Omega', 'The OmarOmega', 'omar.omega'],
        url: `${SITIO}/`,
        image: C.heroFoto,
        description: sinHtml(C.manifiesto),
        genre: ['Bolero', 'Cabaret', 'Synth', 'Música de baile'],
        foundingLocation: { '@type': 'Place', name: 'Guadalajara, Jalisco, México' },
        member: { '@id': `${SITIO}/#omar` },
        email: C.correo,
        sameAs: perfiles,
      },
      {
        '@type': 'Person',
        '@id': `${SITIO}/#omar`,
        name: 'Omar Jiménez',
        alternateName: C.artista || 'The Omar Omega',
        jobTitle: (C.roles || []).filter((r) => !/,/.test(r)).join(', '),
        homeLocation: { '@type': 'Place', name: 'Guadalajara, Jalisco, México' },
        url: `${SITIO}/`,
        sameAs: perfiles,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITIO}/#web`,
        url: `${SITIO}/`,
        name: `${C.artista || 'The Omar Omega'} — Press Kit oficial`,
        inLanguage: 'es-MX',
        about: { '@id': `${SITIO}/#artista` },
        creator: { '@type': 'Organization', name: 'Vonoa', url: 'https://vonoaweb.com/' },
      },
    ],
  };
  if (C.cancionDestacada && C.spotifyTrackId) {
    datos['@graph'].push({
      '@type': 'MusicRecording',
      name: C.cancionDestacada.split(' · ')[0],
      byArtist: { '@id': `${SITIO}/#artista` },
      url: `https://open.spotify.com/track/${C.spotifyTrackId}`,
    });
  }
  return JSON.stringify(datos).replace(/</g, '\\u003c');
}

/* Rellena la página con el contenido (lo mismo que hace el JS en el navegador). */
function rellenar(resp, C) {
  const txt = (s) => ({ element(el) { el.setInnerContent(esc(s), { html: true }); } });
  const html = (s) => ({ element(el) { el.setInnerContent(String(s ?? ''), { html: true }); } });

  const capitulos = (C.capitulos || []).map((c) =>
    `<article><p class="acto">${c.acto} <small>${c.etiqueta}</small></p><p>${c.texto}</p></article>`).join('');
  const plataformas = (C.plataformas || []).filter((p) => p.url).map((p, i) =>
    `<a href="${esc(p.url)}" target="_blank" rel="noopener"><span class="idx">S.0${i + 1}</span>${esc(p.nombre)}<span class="flecha">${p.nombre.toLowerCase() === 'youtube' ? 'ver' : 'escuchar'}&nbsp;→</span></a>`).join('');
  const M = C.marcas || {};
  const numeralia = (M.numeralia || []).map((n) =>
    `<article><p class="cifra">${esc(n.cifra)}</p><p>${esc(n.etiqueta)}</p></article>`).join('');

  return new HTMLRewriter()
    .on('[data-c]', { element(el) { el.setInnerContent(esc(C[el.getAttribute('data-c')]), { html: true }); } })
    .on('[data-html]', { element(el) { el.setInnerContent(String(C[el.getAttribute('data-html')] ?? ''), { html: true }); } })
    .on('#heroMeta', html((C.roles || []).map((r) => `<span>${esc(r)}</span>`).join('')))
    .on('#heroFoto', { element(el) { if (C.heroFoto) el.setAttribute('src', C.heroFoto); } })
    .on('#capitulos', html(capitulos))
    .on('#plataformas', html(plataformas))
    .on('#playerPie', txt(C.cancionDestacada))
    .on('#marcasIntro', txt(M.intro))
    .on('#numeralia', html(numeralia))
    .on('head', { element(el) {
      el.append(`<script type="application/ld+json">${jsonLd(C)}</script>`, { html: true });
    } })
    .transform(resp);
}

/* Resumen en texto plano para asistentes de IA (formato llms.txt). */
function llmsTxt(C) {
  const a = C.artista || 'The Omar Omega';
  const roles = C.roles || [];
  const oficios = roles.filter((r) => !r.includes(',')).map((r) => (r === r.toUpperCase() ? r : r.toLowerCase()));
  const lugar = roles.find((r) => r.includes(','));
  const quien = oficios.length > 1 ? `${oficios.slice(0, -1).join(', ')} y ${oficios.at(-1)}` : (oficios[0] || '');
  const lineas = [
    `# ${a}`,
    '',
    `> ${a} es el proyecto musical de Omar Jiménez${quien ? `, ${quien}` : ''}${lugar ? ` de ${lugar}` : ''}. ${sinHtml(C.kicker)}`,
    '',
    sinHtml(C.manifiesto),
    '',
    sinHtml(C.manifiestoNota),
    '',
    '## Música y lanzamientos',
    ...(C.capitulos || []).map((c) => `- ${sinHtml(c.acto)} (${sinHtml(c.etiqueta).toLowerCase()}): ${sinHtml(c.texto)}`),
    C.cancionDestacada ? `- Canción destacada: ${C.cancionDestacada}` : '',
    sinHtml(C.musicaNota) ? `- ${sinHtml(C.musicaNota)}` : '',
    '',
    '## Dónde escucharlo',
    ...(C.plataformas || []).filter((p) => p.url).map((p) => `- [${p.nombre}](${p.url})`),
    '',
  ];
  if (C.marcas && C.marcas.activar !== false) {
    lineas.push('## Showcases y marcas', sinHtml(C.marcas.intro),
      ...(C.marcas.numeralia || []).map((n) => `- ${n.cifra}: ${n.etiqueta}`), '');
  }
  lineas.push(
    '## Contacto (booking, prensa y colaboraciones)',
    C.correo ? `- Correo: ${C.correo}` : '',
    C.instagram ? `- Instagram: https://www.instagram.com/${C.instagram}/` : '',
    C.tiktok ? `- TikTok: https://www.tiktok.com/@${C.tiktok}` : '',
    `- Press kit: ${SITIO}/`,
    '',
  );
  return lineas.filter((l, i, arr) => !(l === '' && arr[i - 1] === '')).join('\n');
}

const ROBOTS = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITIO}/sitemap.xml
`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    /* www → dominio principal (una sola dirección para buscadores) */
    if (url.hostname === 'www.omaromega.com') {
      url.hostname = 'omaromega.com';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/robots.txt') {
      return new Response(ROBOTS, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
    if (url.pathname === '/sitemap.xml') {
      const hoy = new Date().toISOString().slice(0, 10);
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITIO}/</loc><lastmod>${hoy}</lastmod></url>\n</urlset>\n`,
        { headers: { 'content-type': 'application/xml; charset=utf-8' } });
    }
    if (url.pathname === '/llms.txt') {
      const C = await leerContenido(ctx);
      if (!C) return new Response('No disponible por el momento.', { status: 503 });
      return new Response(llmsTxt(C), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }

    const resp = await env.ASSETS.fetch(request);
    const esPortada = url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/index';
    if (!esPortada || !(resp.headers.get('content-type') || '').includes('text/html')) return resp;

    const C = await leerContenido(ctx).catch(() => null);
    return C ? rellenar(resp, C) : resp;
  },
};
