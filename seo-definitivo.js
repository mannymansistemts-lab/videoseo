const resultado = document.getElementById('resultado');
const año = new Date().getFullYear();

// Palabras clave del nicho
const NICHO_KEYWORDS = ["catalogo","cosmeticos","calzado","ventas","ofertas","productos","tendencias","moda","emprendedoras","campaña","mexico"];

// Limpiar y extraer palabras únicas del título
function extraerPalabras(titulo){
  return Array.from(new Set(
    titulo.toLowerCase().replace(/[^a-z0-9\s]/gi,"").split(/\s+/)
      .filter(w=> w.length>2)
  ));
}

// Capitalizar primera letra
function capitalize(str){ return str.charAt(0).toUpperCase()+str.slice(1); }

// Generar hashtags únicos (5-10)
function generarHashtags(titulo){
  const palabras = extraerPalabras(titulo);
  const hashtags = new Set();
  for(let p of palabras){
    for(let k of NICHO_KEYWORDS){
      hashtags.add(`#${capitalize(p)}${capitalize(k)}${año}`);
      if(hashtags.size>=10) break;
    }
    if(hashtags.size>=10) break;
  }
  // Si hay menos de 5 hashtags, completamos con palabras del título + año
  let i=0;
  const palabrasArr = Array.from(palabras);
  while(hashtags.size<5 && i<palabrasArr.length){
    hashtags.add(`#${capitalize(palabrasArr[i])}${año}`);
    i++;
  }
  return Array.from(hashtags).join(" ");
}

// Generar etiquetas long-tail únicas (10-15)
function generarEtiquetas(titulo){
  const palabras = extraerPalabras(titulo);
  const etiquetas = new Set();
  // Combinaciones título + nicho + año
  for(let p of palabras){
    for(let k of NICHO_KEYWORDS){
      etiquetas.add(`${capitalize(p)} ${capitalize(k)} ${año}`);
      if(etiquetas.size>=15) break;
    }
    if(etiquetas.size>=15) break;
  }
  // Combinaciones simples título + año
  palabras.forEach(p=> etiquetas.add(`${capitalize(p)} ${año}`));
  etiquetas.add(titulo);
  etiquetas.add(`${titulo} ${año}`);
  return Array.from(etiquetas).slice(0,15).join(", ");
}

// Generar descripción SEO atractiva
function generarDescripcion(titulo){
  const palabras = extraerPalabras(titulo).map(capitalize).join(", ");
  return `Descubre todas las novedades de ${titulo} ${año}. Encuentra productos, ofertas y tendencias de ${palabras} ideales para ventas por catálogo, cosméticos y calzado en México. No te pierdas lo más reciente y actualizado.`;
}

// Generar SEO completo
function generarSEO(titulo){
  return `
📢 TÍTULO SEO:
${titulo} | Lo más nuevo y ofertas ${año}

📝 DESCRIPCIÓN:
${generarDescripcion(titulo)}

🔥 HASHTAGS SEO:
${generarHashtags(titulo)}

🏷️ ETIQUETAS SEO:
${generarEtiquetas(titulo)}
  `;
}

// Evento botón
document.getElementById('btnGenerar').addEventListener('click', ()=>{
  const titulo = document.getElementById('tituloInput').value.trim();
  if(!titulo) return alert("Escribe un título para generar SEO PRO");
  resultado.textContent = generarSEO(titulo);
});
