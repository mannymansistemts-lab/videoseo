const resultado = document.getElementById('resultado');
const año = new Date().getFullYear();

// Palabras clave del nicho
const NICHO_KEYWORDS = ["catalogo","cosmeticos","calzado","ventas","ofertas","productos","tendencias","moda","emprendedoras","campaña","mexico"];

// Función para limpiar y separar palabras relevantes del título
function extraerPalabras(texto){
  return texto.toLowerCase().replace(/[^a-z0-9\s]/gi,"").split(/\s+/)
    .filter(w=> w.length>2);
}

// Generar hashtags únicos (5-10) combinando título + nicho + año
function generarHashtags(titulo){
  const palabrasTitulo = extraerPalabras(titulo);
  const hashtags = [];
  for(let k of NICHO_KEYWORDS){
    for(let p of palabrasTitulo){
      const tag = `#${capitalize(p)}${capitalize(k)}${año}`;
      if(!hashtags.includes(tag) && hashtags.length<10){
        hashtags.push(tag);
      }
    }
  }
  // Si hay menos de 5, completamos con palabras del título + año
  let i=0;
  while(hashtags.length<5 && i<palabrasTitulo.length){
    hashtags.push(`#${capitalize(palabrasTitulo[i])+año}`);
    i++;
  }
  return hashtags.join(" ");
}

// Generar etiquetas long-tail únicas (10-15) combinando título + nicho + año
function generarEtiquetas(titulo){
  const palabrasTitulo = extraerPalabras(titulo);
  const etiquetas = new Set();
  // Combinaciones del título con nicho
  for(let k of NICHO_KEYWORDS){
    for(let p of palabrasTitulo){
      etiquetas.add(`${capitalize(p)} ${capitalize(k)} ${año}`);
    }
  }
  // Combinaciones simples del título + año
  palabrasTitulo.forEach(p=> etiquetas.add(`${capitalize(p)} ${año}`));
  etiquetas.add(titulo);
  etiquetas.add(`${titulo} ${año}`);
  return Array.from(etiquetas).slice(0,15).join(", ");
}

// Capitaliza la primera letra
function capitalize(str){ return str.charAt(0).toUpperCase()+str.slice(1); }

// Genera descripción SEO atractiva
function generarDescripcion(titulo){
  return `Descubre todas las novedades de ${titulo} ${año}. Encuentra productos, ofertas y tendencias ideales para ventas por catálogo, cosméticos y calzado en México. No te pierdas lo más reciente y actualizado.`;
}

// Genera el SEO completo PRO
function generarSEO(titulo){
  const seo = `
📢 TÍTULO SEO:
${titulo} | Lo más nuevo y ofertas ${año}

📝 DESCRIPCIÓN:
${generarDescripcion(titulo)}

🔥 HASHTAGS SEO:
${generarHashtags(titulo)}

🏷️ ETIQUETAS SEO:
${generarEtiquetas(titulo)}
  `;
  return seo;
}

// Evento botón
document.getElementById('btnGenerar').addEventListener('click', ()=>{
  const titulo = document.getElementById('tituloInput').value.trim();
  if(!titulo) return alert("Escribe un título para generar SEO PRO");
  resultado.textContent = generarSEO(titulo);
});
