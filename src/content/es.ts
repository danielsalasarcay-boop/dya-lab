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
    ogAlt: "D&A Lab — Desarrollo web premium con movimiento, para que tu marca sea inolvidable",
  },

  nav: [
    { href: "/#servicios", label: "Servicios" },
    { href: "/#trabajo", label: "Proyectos" },
    { href: "/#movimiento", label: "Movimiento" },
    { href: "/#proceso", label: "Proceso" },
    { href: "/#paquetes", label: "Paquetes" },
    { href: "/#preguntas", label: "Preguntas" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ],
  navCta: "Hablemos",
  skip: "Saltar al contenido",
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",
  menuLabel: "Menú",
  menuAvailable: "Disponibles",

  hero: {
    eyebrow: "Diseño web y de marca · Venezuela",
    titleA: "Desarrollo web premium con movimiento, para que tu marca sea",
    titleB: "inolvidable.",
    proof: "Sitios en producción para",
  },

  services: {
    // El porqué no es un servicio: es el problema que resuelven los dos de abajo.
    why: {
      eyebrow: "El porqué",
      big: "Una web genérica no se recuerda.",
      small: "Tu negocio tiene que sentirse único desde el primer scroll.",
    },
    listLabel: "Nuestros servicios",
    cards: [
      {
        n: "01",
        eyebrow: "Web",
        big: "Webs con movimiento que no se parecen a ninguna.",
        small: "Animaciones premium al hacer scroll, efectos interactivos y tecnología actual. Impecable en el teléfono.",
        tags: ["Animaciones", "A medida"],
      },
      {
        n: "02",
        eyebrow: "Marca",
        big: "Una identidad que cobra vida.",
        small: "Logo, colores y tipografía pensados para moverse con tu web y verse impecables en redes.",
        tags: ["Logo", "Identidad", "Motion"],
      },
    ],
    cta: "Cotiza por WhatsApp",
    ctaMessage: "¡Hola D&A Lab! 👋 Quiero cotizar una web o una marca para mi negocio.",
    ctaAlt: "Ver paquetes",
    ctaNote: "Respondemos el mismo día hábil.",
  },

  work: {
    eyebrow: "Trabajo",
    title: "Proyectos",
    visit: "Ver sitio",
    desktopAlt: "Recorrido por la web de {name} en computadora",
    mobileAlt: "Recorrido por la web de {name} en teléfono",
    swipeHint: "Desliza para ver los siete →",
    next: {
      label: "Próximo proyecto",
      domain: "tu-negocio.com",
      title: "Tu negocio podría ser el próximo.",
      text: "Una web a medida, con movimiento y lista para vender. Cuéntanos qué haces y empezamos a diseñarla.",
      cta: "Empecemos tu web",
      message: "¡Hola D&A Lab! 👋 Vi sus proyectos y quiero que mi negocio sea el próximo.",
      building: "En construcción",
    },
    hoverHint: "Pasa el cursor por cada ficha para verla en movimiento",
    cases: [
      {
        slug: "loopi",
        name: "LOOPI",
        url: "https://loopivzla.com",
        domain: "loopivzla.com",
        sector: "Comida · Caracas",
        // FALTA CONTEXTO: ¿qué usaba LOOPI para vender antes de la web (solo Instagram, catálogo en PDF…)? ¿También hicieron su marca/logo? Si es así, añadir la etiqueta "Marca".
        summary:
          "Tienda de mini lumpias saladas y dulces: el cliente elige sabores y salsas, arma su pedido y lo envía por WhatsApp. Delivery, horario y pagos en la misma página.",
        tags: ["Web", "Catálogo", "Pedidos"],
        accent: "#E71600",
        plan: "esencial" as const,
        statusBg: "#e61600",
      },
      {
        slug: "caraquena",
        name: "Caraqueña Studio",
        // PENDIENTE: dominio propio. Por ahora el sitio vive en Vercel.
        url: "https://caraquena.vercel.app/",
        domain: "caraquena · vercel.app",
        sector: "Estudio de arquitectura · Caracas",
        // FALTA CONTEXTO: ¿la marca/logo también es trabajo del estudio?
        summary:
          "Web para un estudio de arquitectura de hotelería, desarrollos y vivienda: el boceto de la portada se abre al hacer scroll y cada proyecto se arma de trazo a boceto a render. Proceso, cobertura y contacto por WhatsApp.",
        tags: ["Web", "Arquitectura", "ES / EN"],
        accent: "#F15A22",
        plan: "premium" as const,
        statusBg: "#efeeea",
        statusFg: "#1b1b1b",
      },
      {
        slug: "quality-bikes",
        name: "Quality Bikes",
        url: "https://qualitybikesvzla.com",
        domain: "qualitybikesvzla.com",
        sector: "Motos · Caracas",
        // FALTA CONTEXTO: ¿qué necesitaba Quality Bikes al llegar (no tenía web, tenía una vieja, vendía solo por Instagram)?
        summary:
          "Motos de alta cilindrada de ocho marcas: el showroom de hoy con ficha por moto, reserva de los modelos que vienen en camino y contacto directo por WhatsApp.",
        tags: ["Web", "Catálogo", "Reservas"],
        accent: "#003462",
        statusBg: "#050505",
      },
      {
        slug: "casa-panza",
        name: "Casa Panza",
        url: "https://www.casapanzalosroques.com",
        domain: "casapanzalosroques.com",
        sector: "Alquiler vacacional · Los Roques",
        // FALTA CONTEXTO: ¿cómo recibían reservas antes de la web (solo Instagram/WhatsApp)? ¿también hicieron su marca?
        summary:
          "Casa frente al mar en Gran Roque para hasta 10 huéspedes: la portada pasa de boceto a foto al hacer scroll, espacios, galería, gastronomía de la casa, comodidades y reserva directa por WhatsApp.",
        tags: ["Web", "Galería", "Reservas"],
        accent: "#2BB5B5",
        statusBg: "#f8f2e2",
        statusFg: "#1b1b1b",
      },
      {
        slug: "la-capital-del-cielo",
        name: "La Capital del Cielo",
        url: "https://www.lacapitaldelcielo.com",
        domain: "lacapitaldelcielo.com",
        sector: "Reservas de casas · Los Roques",
        // FALTA CONTEXTO: ¿la marca/logo también es trabajo del estudio?
        summary:
          "Marca que reúne casas privadas de lujo en Los Roques: siete propiedades con ficha y reserva, lo que incluye cada estadía, camisas propias con carrito de compra y contacto por WhatsApp.",
        tags: ["Web", "Reservas", "Tienda"],
        accent: "#7FA7E8",
        statusBg: "#9499ab",
        statusFg: "#1b1b1b",
      },
      {
        slug: "mar-caribe",
        name: "Alimentos Mar Caribe",
        url: "https://alimentosmarcaribe.com",
        domain: "alimentosmarcaribe.com",
        sector: "Exportación de mariscos · Zulia",
        // FALTA CONTEXTO: ¿el sitio reemplazó a uno anterior? ¿qué le pedían los importadores que no tenían (fichas técnicas, idioma)?
        summary:
          "Web bilingüe para un exportador de camarón y pescado: fichas por especie con tallas y empaques, mercados, certificaciones y cotización para mayoristas.",
        tags: ["Web", "B2B", "ES / EN"],
        accent: "#061A33",
        statusBg: "#000000",
      },
      {
        slug: "casa-verde",
        name: "Casa Verde",
        // PENDIENTE: dominio propio. Por ahora el sitio vive en GitHub Pages.
        url: "https://danielsalasarcay-boop.github.io/casa-verde/",
        domain: "casa-verde · github.io",
        sector: "Casa vacacional · Los Roques",
        // FALTA CONTEXTO: ¿cómo recibían reservas antes de la web? ¿también hicieron su marca?
        summary:
          "Casa de lujo frente al mar en Gran Roque con chef y bote privado 24/7: la fachada pasa del día a la noche al hacer scroll, comodidades, experiencia, vista aérea y ubicación.",
        tags: ["Web", "Galería", "ES / EN"],
        accent: "#1F8A5B",
        statusBg: "#196091",
      },
    ],
  },

  motion: {
    eyebrow: "Webs con movimiento",
    title: "Webs que no se ven como todas.",
    lead: "Efectos hechos para tu marca, no sacados de una plantilla. Pasa el cursor por las letras.",
    // Orden en que se encadenan solas. Los ids viven en public/dya-hero/dya-hero.js.
    stories: ["sueno", "plantilla", "viaje", "chat", "mundo"],
  },

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
        line: "Publicamos en tu dominio y nos encargamos del hosting para que no tengas que preocuparte por nada.",
      },
    ],
  },

  // PRECIO PENDIENTE en los tres planes. CONFIRMAR: alcance de cada uno.
  plans: {
    eyebrow: "Paquetes",
    title: "Elige por dónde empezar.",
    lead: "Cada propuesta se confirma por escrito antes de empezar.",
    swipeHint: "Desliza para ver los tres →",
    cta: "Quiero este",
    ctaMessage: "¡Hola D&A Lab! 👋 Me interesa el plan {plan} ({price}). ¿Me cuentan cómo empezamos?",
    featuredLabel: "Personalizado",
    fromLabel: "Desde",
    currency: "USD",
    items: [
      {
        id: "esencial",
        name: "Esencial",
        for: "Tu negocio en línea, bien hecho y listo para vender.",
        price: "$420",
        from: false,
        featured: false,
        includes: [
          "5 secciones y 3 animaciones",
          "Tienda de hasta 10 productos con pedido por WhatsApp",
          "15 fotos, español e inglés, Google Maps y redes",
          "2 rondas de ajustes",
          "Primer año de dominio y hosting incluido",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        for: "Para marcas que quieren destacar: más espacio, más movimiento y una tienda completa.",
        price: "$650",
        from: true,
        featured: true,
        includes: [
          "Todo lo del Esencial, y además:",
          "10 secciones y 5 animaciones creadas para tu marca",
          "Tienda de hasta 30 productos con variantes (tallas, sabores, colores)",
          "Buscador y filtros por categoría",
          "40 fotos y 3 rondas de ajustes",
        ],
      },
      {
        id: "logo",
        name: "Logo",
        for: "Para que te reconozcan de un vistazo.",
        price: "$120",
        from: false,
        featured: false,
        note: "$90 si lo contratas junto con una web",
        includes: [
          "Logo diseñado desde cero, sin plantillas",
          "Versiones horizontal, vertical e ícono",
          "Variantes a color, en blanco y en negro",
          "Paleta de colores y tipografías",
          "Archivos listos para imprenta, redes y web",
        ],
      },
    ],
    extras: {
      title: "¿Necesitas más productos, fotos o secciones?",
      lead: "El Premium crece contigo: lo ajustamos a tu medida y te cotizamos sin sorpresas.",
      cta: "Cotizar a mi medida",
      message: "¡Hola D&A Lab! 👋 Me interesa el plan Premium y necesitaría más productos, fotos o secciones. ¿Me cotizan?",
    },
    care: {
      eyebrow: "Mantenimiento",
      title: "Tu web, siempre al día.",
      lead: "Después del primer año, elige cómo seguimos.",
      plans: [
        {
          id: "cuidado",
          name: "Plan Cuidado",
          price: "$30",
          period: "por trimestre",
          badge: "Recomendado",
          alt: "o $100 al año (ahorras $20)",
          includes: [
            "Dominio, hosting y copias de seguridad",
            "3 cambios pequeños por trimestre: precios, fotos, textos o un producto",
          ],
          cta: "Quiero el Plan Cuidado",
        },
        {
          id: "online",
          name: "Solo en línea",
          price: "$20",
          period: "al año",
          badge: "",
          alt: "",
          includes: ["Dominio y hosting", "Sin cambios incluidos"],
          cta: "Quiero solo en línea",
        },
      ],
    },
  },

  // CONFIRMAR: cada respuesta es una propuesta de política del estudio.
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que nos preguntan antes de empezar.",
    lead: "La respuesta breve está a la vista. Seleccione una tarjeta para ver el detalle.",
    more: "Ver detalle",
    less: "Ocultar",
    askTitle: "¿Tiene otra consulta?",
    askLead: "Escríbanos y le responderemos el mismo día hábil.",
    askCta: "Consultar por WhatsApp",
    askMessage: "Buen día, D&A Lab. Quisiera hacer una consulta antes de iniciar un proyecto: ",
    // short = respuesta breve visible; a = detalle (también va al JSON-LD).
    items: [
      {
        q: "¿Cuál es el plazo de entrega?",
        short: "De 2 a 3 semanas",
        a: "Un sitio del plan Esencial se entrega en un plazo de 2 a 3 semanas, contado a partir de la recepción de los textos y las fotografías del cliente.",
      },
      {
        q: "¿A nombre de quién se registra el dominio?",
        short: "Del cliente",
        a: "El dominio se registra a nombre del cliente y, al finalizar el proyecto, se entregan todos los accesos. El cliente conserva la titularidad y puede cambiar de proveedor cuando lo desee.",
      },
      {
        q: "¿Es posible solicitar cambios posteriores?",
        short: "Rondas incluidas + Plan Cuidado",
        a: "Durante el proyecto se incluyen 2 rondas de ajustes en el plan Esencial y 3 en el Premium. Después de la entrega, el Plan Cuidado ($30 por trimestre) incluye 3 cambios pequeños cada trimestre: precios, fotos, textos o un producto.",
      },
      {
        q: "¿El servicio incluye el diseño del logo?",
        short: "$120, o $90 con tu web",
        a: "El logo se contrata aparte por $120, o por $90 si se contrata junto con una web. Si la empresa ya cuenta con un logo, se utiliza tal como está o se adapta para su correcta visualización en la web.",
      },
      {
        q: "¿Quién asume el costo del hosting?",
        short: "1er año incluido",
        a: "El primer año de dominio y hosting está incluido en ambos planes y queda a nombre del cliente. Después, se renueva con el Plan Cuidado ($30 por trimestre, o $100 al año) o con Solo en línea ($20 al año).",
      },
      {
        q: "¿Trabajan de forma remota?",
        short: "Sí, 100 % remoto",
        a: "Todo el proceso se gestiona por videollamada y WhatsApp, tanto para clientes en Venezuela como en el exterior.",
      },
    ],
  },

  contact: {
    metaTitle: "Contacto — D&A Lab",
    metaDescription: "Cuéntanos qué vendes y te respondemos por WhatsApp con los próximos pasos para tu web o tu marca.",
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
      // Dos casillas separadas (nunca una sola para todo). El texto completo de cada una
      // (pre + enlace + post) queda guardado en el registro de consentimientos.
      consent: {
        termsPre: "He leído y acepto los",
        termsLink: "Términos y Condiciones",
        termsPost: ".",
        privacyPre: "He leído y acepto la",
        privacyLink: "Política de Privacidad",
        privacyPost: " y autorizo el tratamiento de mis datos para responder mi consulta.",
        termsRequired: "Para enviar debes aceptar los Términos y Condiciones",
        privacyRequired: "Para enviar debes aceptar la Política de Privacidad",
      },
      message: "Hola D&A Lab, soy {name} de {business}. Necesito: {need}\n\nRef. {ref}",
      required: "Completa este campo",
    },
    direct: "O directo",
    whatsapp: "WhatsApp",
    email: "Correo",
    floating: "Escríbenos por WhatsApp",
    floatHover: "Escríbenos",
    // Mensaje que llega prellenado al tocar el botón flotante o el número directo.
    whatsappGreeting: "¡Hola D&A Lab! 👋 Vi su página web y me gustaría hablar sobre un proyecto para mi negocio.",
  },

  // Página /nosotros. CONFIRMAR: textos en borrador para que Daniel y Andy los ajusten.
  about: {
    metaTitle: "Quiénes somos — D&A Lab",
    metaDescription: "D&A Lab es un estudio de diseño web y de identidad visual en Venezuela. Webs y marcas a medida, sin plantillas.",
    logoLabel: "Logo de D&A Lab",
    title: "Diseño a medida con precisión técnica.",
    intro: "Somos un estudio de diseño web y de marca en Venezuela. Hacemos webs y logos desde cero, sin plantillas, para negocios que venden por catálogo, por WhatsApp o por cotización.",
    team: "Somos un equipo pequeño de diseño y desarrollo. Hablas directo con quien hace tu proyecto, todo hecho a mano y por escrito antes de empezar.",
    philosophyTitle: "Cómo trabajamos",
    philosophy: [
      { n: "01", title: "Entendemos tu negocio", text: "Qué vendes, a quién y por dónde te llegan los pedidos." },
      { n: "02", title: "Todo por escrito", text: "Alcance, precio y tiempos claros antes de empezar." },
      { n: "03", title: "Proyectos reales", text: "Cada sitio está publicado: entra y úsalo." },
    ],
    ctaTitle: "¿Empezamos?",
    ctaLead: "Cuéntanos qué vendes. Te respondemos el mismo día hábil.",
    cta: "Escríbenos por WhatsApp",
    ctaMessage: "¡Hola D&A Lab! 👋 Vi su página y quiero contarles sobre mi negocio.",
    ctaWork: "Ver proyectos",
    ctaEmail: "o escríbenos a",
  },

  footer: {
    colNav: "Navegación",
    colContact: "Hablemos",
    available: "Disponibles para nuevos proyectos",
    backToTop: "Volver arriba",
    tagline: "Desarrollo web premium con movimiento, para que tu marca sea inolvidable.",
    rights: "Todos los derechos reservados.",
    social: "Redes sociales",
    legal: "Legal",
    privacy: "Privacidad",
    terms: "Términos",
    cookies: "Cookies",
  },
};

export type Dictionary = typeof es;
