const resultado = document.getElementById('resultado');
const año = new Date().getFullYear();

// Palabras clave de tu nicho
const NICHO_KEYWORDS = ["catalogo","cosmeticos","calzado","ventas","ofertas","productos","tendencias","moda","emprendedoras","campaña","mexico"];

// Extrae palabras clave de tu título y nicho
function extraerPalabras(texto){
  return texto.toLowerCase().replace(/[^a-z0-9\s]/gi,"").split(/\s+/)
    .filter(w=> w.length>2 && NICHO_KEYWORDS.some(k=>w.includes(k)));
}

// Genera hasta 5 hashtags long-tail
function generarHashtags(titulo){
  const palabras = extraerPalabras(titulo);
  const hashtags = [];
  for(let i=0;i<palabras.length && hashtags.length<5;i++){
    hashtags.push("#"+palabras[i].charAt(0).toUpperCase()+palabras[i].slice(1)+año);
  }
  return hashtags.join(" ");
}

// Genera etiquetas SEO long-tail
function generarEtiquetas(titulo){
  const palabras = extraerPalabras(titulo);
  const etiquetas = [titulo, `${titulo} ${año}`, ...palabras];
  return [...new Set(etiquetas)].join(", ");
}

// Genera descripción optimizada
function generarDescripcion(titulo){
  return `Descubre lo último sobre ${titulo} ${año}. Encuentra productos, ofertas y tendencias ideales para ventas por catálogo en México.`;
}

// Genera el SEO completo
function generarSEO(titulo){
  const seo = `
📢 TÍTULO SEO:
${titulo} | Ofertas y Novedades

📝 DESCRIPCIÓN:
${generarDescripcion(titulo)}

🔥 HASHTAGS:
${generarHashtags(titulo)}

🏷️ ETIQUETAS SEO:
${generarEtiquetas(titulo)}
  `;
  return seo;
}

// Evento botón
document.getElementById('btnGenerar').addEventListener('click', ()=>{
  const titulo = document.getElementById('tituloInput').value.trim();
  if(!titulo) return alert("Escribe un título para generar SEO");
  resultado.textContent = generarSEO(titulo);
});
