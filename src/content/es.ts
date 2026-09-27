// Contenido del sitio en español (idioma principal).
// Para añadir inglés: crear en.ts con la misma forma (tipo Dictionary) y
// registrarlo en src/content/index.ts. No hay que tocar los componentes.
//
// Convención de pendientes (búscalos con: grep -rn "PENDIENTE\|FALTA CONTEXTO\|CONFIRMAR" src):
//   TEXTO PENDIENTE   → lo escribe el dueño
//   PRECIO PENDIENTE  → lo pone el dueño
//   FALTA CONTEXTO    → dato del negocio del cliente que no aparece en su sitio
//   CONFIRMAR         → política del estudio redactada como propuesta

export const es = {
  meta: {
    title: "D&A Lab — Diseño web y de marca para negocios que venden",
    description:
      "Estudio de diseño web y de identidad visual en Venezuela. Sitios a medida y logos para negocios que venden por catálogo, por WhatsApp o por cotización.",
    ogAlt: "D&A Lab — Webs y marcas para negocios que quieren vender",
  },

  nav: [
    { href: "#trabajo", label: "Trabajo" },
    { href: "#servicios", label: "Servicios" },
    { href: "#proceso", label: "Proceso" },
    { href: "#paquetes", label: "Paquetes" },
    { href: "#preguntas", label: "Preguntas" },
  ],
  navCta: "Hablemos",
  skip: "Saltar al contenido",
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",

  hero: {
    eyebrow: "Diseño web y de marca · Venezuela",
    titleA: "Webs y marcas para negocios que",
    titleB: "quieren vender.",
    lead: "Diseñamos tu sitio y tu identidad visual a la medida de cómo vendes: por catálogo, por WhatsApp o por cotización.",
    ctaWork: "Ver trabajo",
    ctaTalk: "Hablemos",
    proof: "Sitios en producción para",
  },

  // TEXTO PENDIENTE: origen — versión provisional para ver el espacio.
  origin: {
    eyebrow: "Por qué existe",
    title: "No partimos de una plantilla. Partimos de cómo vendes tú.",
    body: [
      "Un negocio que recibe pedidos por WhatsApp no necesita la misma web que uno que cotiza contenedores para exportar.",
      "Por eso cada proyecto empieza entendiendo a quién le vendes y cómo te compra.",
      "Lo demás —colores, letras, fotos— sale de ahí.",
    ],
    pendingNote: "Texto provisional",
  },

  services: {
    eyebrow: "Qué hacemos",
    title: "Dos servicios. Se contratan juntos o por separado.",
    items: [
      {
        n: "01",
        name: "Diseño y desarrollo web a medida",
        promise: "Un sitio que trabaja para tu negocio, no una tarjeta de presentación.",
        includes: [
          "Diseño hecho para tu marca, sin plantillas",
          "Se ve y carga bien en el teléfono, que es donde te buscan",
          "Tus productos, precios o servicios en un solo lugar",
          "El cliente te escribe por WhatsApp, te pide cotización o reserva",
          "Listo para Google y para compartirse bien en redes",
          "Publicado en tu dominio y a tu nombre",
        ],
      },
      {
        n: "02",
        name: "Identidad visual y logos",
        promise: "Que te reconozcan antes de leer tu nombre.",
        includes: [
          "Logo principal y sus versiones (horizontal, ícono, una tinta)",
          "Colores y tipografías definidos",
          "Guía corta para que tu marca se vea igual en todas partes",
          "Archivos listos para imprenta, redes y web",
        ],
      },
    ],
  },

  work: {
    eyebrow: "Trabajo",
    title: "Tres negocios, tres formas de vender.",
    lead: "Sitios reales, en producción. Entra y úsalos.",
    visit: "Ver sitio",
    desktopAlt: "Página de inicio de {name} en computadora",
    mobileAlt: "Página de inicio de {name} en teléfono",
    hoverHint: "Pasa el cursor para recorrer la página",
    cases: [
      {
        slug: "loopi",
        name: "LOOPI",
        url: "https://loopivzla.com",
        domain: "loopivzla.com",
        sector: "Mini lumpias congeladas · Caracas",
        // FALTA CONTEXTO: ¿qué usaba LOOPI para vender antes de la web (solo Instagram, catálogo en PDF…)? ¿También hicieron su marca/logo? Si es así, añadir la etiqueta "Marca".
        summary:
          "LOOPI vende mini lumpias saladas y dulces en cajitas de 12 y 24. El sitio es su tienda: el cliente elige sabores y salsas, arma el pedido y lo envía por WhatsApp. En la misma página resuelve lo que se pregunta antes de comprar: cómo cocinarlas, zona de delivery, horario y métodos de pago.",
        tags: ["Web", "Catálogo", "Pedidos por WhatsApp"],
        accent: "#E71600",
        statusBg: "#e61600",
      },
      {
        slug: "quality-bikes",
        name: "Quality Bikes",
        url: "https://qualitybikesvzla.com",
        domain: "qualitybikesvzla.com",
        sector: "Concesionario multimarca de motos · Caracas",
        // FALTA CONTEXTO: ¿qué necesitaba Quality Bikes al llegar (no tenía web, tenía una vieja, vendía solo por Instagram)?
        summary:
          "Quality Bikes vende motos de alta cilindrada de ocho marcas —BMW, Ducati, Kawasaki y Triumph, entre otras— además de aceites, combustibles de competencia y cauchos. El sitio muestra lo que está hoy en el showroom con ficha por moto, deja reservar los modelos que vienen en camino y lleva al cliente a WhatsApp o a la tienda.",
        tags: ["Web", "Catálogo", "Reservas"],
        accent: "#003462",
        statusBg: "#050505",
      },
      {
        slug: "mar-caribe",
        name: "Alimentos Mar Caribe",
        url: "https://alimentosmarcaribe.com",
        domain: "alimentosmarcaribe.com",
        sector: "Procesadora y exportadora de productos del mar · Zulia",
        // FALTA CONTEXTO: ¿el sitio reemplazó a uno anterior? ¿qué le pedían los importadores que no tenían (fichas técnicas, idioma)?
        summary:
          "Alimentos Mar Caribe procesa y exporta camarón y pescado a distribuidores de América y Europa. Su sitio, en inglés y español, le habla a un comprador mayorista: fichas por especie con tallas, cortes y empaques, los mercados a los que ya envía, sus certificaciones y un formulario para pedir cotización.",
        tags: ["Web", "Bilingüe", "B2B · Cotizaciones"],
        accent: "#061A33",
        statusBg: "#000000",
      },
    ],
  },

  // CONFIRMAR: plazos de cada paso.
  process: {
    eyebrow: "Cómo trabajamos",
    title: "Cuatro pasos. Sabes qué toca y cuánto tarda.",
    steps: [
      {
        name: "Conversamos",
        time: "1 llamada",
        line: "Nos cuentas tu negocio, a quién le vendes y qué necesitas. Sin compromiso.",
      },
      {
        name: "Propuesta",
        time: "1 semana",
        line: "Te mostramos la dirección visual y la estructura; tú apruebas o pides ajustes.",
      },
      {
        name: "Construcción",
        time: "2 a 4 semanas",
        line: "Diseñamos y montamos el sitio; de tu lado, nos pasas fotos, textos y precios.",
      },
      {
        name: "Lanzamiento",
        time: "1 día",
        line: "Publicamos en tu dominio y te entregamos los accesos: todo queda a tu nombre.",
      },
    ],
  },

  // PRECIO PENDIENTE en los tres planes. CONFIRMAR: alcance de cada uno.
  plans: {
    eyebrow: "Paquetes",
    title: "Elige por dónde empezar.",
    lead: "Precios en dólares. Cada propuesta se confirma por escrito antes de empezar.",
    pricePlaceholder: "$---",
    cta: "Quiero este",
    featuredLabel: "El más completo",
    items: [
      {
        id: "web",
        name: "Web esencial",
        for: "Para que te encuentren y te escriban.",
        from: false,
        featured: false,
        includes: [
          "Sitio de una página con tus productos o servicios",
          "Botón directo a tu WhatsApp y formulario de contacto",
          "Diseño pensado primero para el teléfono",
          "Dominio y publicación configurados",
          "Listo para Google y con vista previa para redes",
        ],
      },
      {
        id: "web-marca",
        name: "Web + identidad",
        for: "Para arrancar con marca y web de una vez.",
        from: false,
        featured: true,
        includes: [
          "Todo lo de Web esencial",
          "Logo y sus versiones",
          "Colores y tipografías de tu marca",
          "Guía corta de uso de marca",
          "Catálogo de productos o servicios en la web",
        ],
      },
      {
        id: "medida",
        name: "Proyecto a medida",
        for: "Para negocios con una forma de vender propia.",
        from: true,
        featured: false,
        includes: [
          "Pedidos que llegan armados a tu WhatsApp",
          "Catálogos grandes con ficha por producto",
          "Reservas o solicitudes de cotización",
          "Sitio en más de un idioma",
          "Alcance y plazo definidos juntos",
        ],
      },
    ],
    fromLabel: "Desde",
  },

  // CONFIRMAR: cada respuesta es una propuesta de política del estudio.
  faq: {
    eyebrow: "Preguntas",
    title: "Lo que nos preguntan antes de empezar.",
    items: [
      {
        q: "¿Cuánto tarda?",
        a: "Una web esencial, entre 2 y 3 semanas. Con identidad visual, entre 4 y 6. El tiempo corre desde que tenemos tus textos y fotos.",
      },
      {
        q: "¿De quién es el dominio?",
        a: "Tuyo. Se registra a tu nombre y al terminar te entregamos todos los accesos. Si un día quieres irte con otro proveedor, te llevas todo.",
      },
      {
        q: "¿Qué pasa si quiero cambiar algo después?",
        a: "Los ajustes pequeños del primer mes van por nuestra cuenta. Después, los cambios se cotizan aparte o con un plan de mantenimiento mensual.",
      },
      {
        q: "¿Incluye el logo?",
        a: "El paquete Web + identidad, sí. Si ya tienes logo, lo usamos tal cual o lo preparamos para que se vea bien en la web.",
      },
      {
        q: "¿Quién paga el hosting?",
        a: "Tú, directamente al proveedor y a tu nombre, así nunca dependes de nosotros. Antes de empezar te decimos cuánto cuesta; para la mayoría de sitios de este tipo es poco o nada.",
      },
      {
        q: "¿Trabajan a distancia?",
        a: "Sí. Todo el proceso funciona por videollamada y WhatsApp, estés en Venezuela o fuera.",
      },
    ],
  },

  contact: {
    eyebrow: "Contacto",
    title: "Cuéntanos qué vendes.",
    lead: "Te respondemos por WhatsApp con los próximos pasos.",
    form: {
      name: "Tu nombre",
      business: "Tu negocio",
      businessHint: "Nombre y a qué se dedica",
      need: "¿Qué necesitas?",
      needHint: "Web, logo, las dos… lo que tengas en mente",
      submit: "Enviar por WhatsApp",
      note: "Al enviar se abre WhatsApp con tu mensaje listo.",
      message: "Hola D&A Lab, soy {name} de {business}. Necesito: {need}",
      required: "Completa este campo",
    },
    direct: "O directo",
    whatsapp: "WhatsApp",
    email: "Correo",
    floating: "Escríbenos por WhatsApp",
  },

  footer: {
    tagline: "Webs y marcas para negocios que quieren vender.",
    rights: "Todos los derechos reservados.",
  },
};

export type Dictionary = typeof es;
