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
    { href: "/#servicios", label: "Servicios" },
    { href: "/#trabajo", label: "Trabajo" },
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
    titleA: "Desarrollo web premium con movimiento, creado desde cero para que tu marca sea",
    titleB: "inolvidable.",
    proof: "Sitios en producción para",
  },

  services: {
    // El porqué no es un servicio: es el problema que resuelven los dos de abajo.
    why: {
      eyebrow: "El porqué",
      big: "Una web genérica no se recuerda.",
      small: "La tuya tiene que sentirse única desde el primer scroll.",
    },
    listLabel: "Nuestros servicios",
    cards: [
      {
        n: "01",
        eyebrow: "Web",
        big: "Webs con movimiento que no se parecen a ninguna.",
        small: "Animaciones premium al hacer scroll, efectos interactivos y tecnología actual. Impecable en el teléfono.",
        tags: ["Animaciones", "A medida", "Mobile first"],
      },
      {
        n: "02",
        eyebrow: "Marca",
        big: "Una identidad que cobra vida.",
        small: "Logo, colores y tipografía pensados para moverse con tu web y verse impecables en redes e imprenta.",
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
    title: "Portafolio",
    lead: "Sitios reales, en producción.",
    visit: "Ver sitio",
    desktopAlt: "Recorrido por la web de {name} en computadora",
    mobileAlt: "Recorrido por la web de {name} en teléfono",
    swipeHint: "Desliza para ver los seis →",
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
        statusBg: "#e61600",
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
        line: "Publicamos en tu dominio y te entregamos los accesos: todo queda a tu nombre.",
      },
    ],
  },

  // PRECIO PENDIENTE en los tres planes. CONFIRMAR: alcance de cada uno.
  plans: {
    eyebrow: "Paquetes",
    title: "Elige por dónde empezar.",
    lead: "Cada propuesta se confirma por escrito antes de empezar.",
    swipeHint: "Desliza para ver los tres →",
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
        id: "logo",
        name: "Logo",
        for: "Para que te reconozcan de un vistazo.",
        from: true,
        featured: false,
        includes: [
          "Logo diseñado desde cero, sin plantillas",
          "Versiones horizontal, vertical e ícono",
          "Variantes a color, en blanco y en negro",
          "Paleta de colores y tipografías",
          "Archivos listos para imprenta, redes y web",
        ],
      },
    ],
    fromLabel: "Desde",
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
        a: "Un sitio web esencial se entrega en un plazo de 2 a 3 semanas, contado a partir de la recepción de los textos y las fotografías del cliente.",
      },
      {
        q: "¿A nombre de quién se registra el dominio?",
        short: "Del cliente",
        a: "El dominio se registra a nombre del cliente y, al finalizar el proyecto, se entregan todos los accesos. El cliente conserva la titularidad y puede cambiar de proveedor cuando lo desee.",
      },
      {
        q: "¿Es posible solicitar cambios posteriores?",
        short: "Primer mes incluido",
        a: "Los ajustes menores durante el primer mes están incluidos. Posteriormente, las modificaciones se cotizan por separado o mediante un plan de mantenimiento mensual.",
      },
      {
        q: "¿El servicio incluye el diseño del logo?",
        short: "En Web + identidad",
        a: "El diseño del logo está incluido en el paquete Web + identidad. Si la empresa ya cuenta con un logo, se utiliza tal como está o se adapta para su correcta visualización en la web.",
      },
      {
        q: "¿Quién asume el costo del hosting?",
        short: "El cliente, a su nombre",
        a: "El hosting se contrata directamente con el proveedor y a nombre del cliente, lo que garantiza su independencia. El costo se informa antes de iniciar; para la mayoría de los sitios de este tipo es mínimo o nulo.",
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
      message: "Hola D&A Lab, soy {name} de {business}. Necesito: {need}",
      required: "Completa este campo",
    },
    direct: "O directo",
    whatsapp: "WhatsApp",
    phone: "Llamar por teléfono",
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
    subtitle: "Para negocios que quieren verse bien y vender mejor.",
    intro: "Somos un estudio de diseño web y de marca en Venezuela. Hacemos webs y logos desde cero, sin plantillas, para negocios que venden por catálogo, por WhatsApp o por cotización.",
    philosophyTitle: "Cómo trabajamos",
    philosophy: [
      { n: "01", title: "Entendemos tu negocio", text: "Qué vendes, a quién y por dónde te llegan los pedidos." },
      { n: "02", title: "Todo por escrito", text: "Alcance, precio y tiempos claros antes de empezar." },
      { n: "03", title: "Proyectos reales", text: "Todo el portafolio está publicado: entra y úsalo." },
    ],
    ctaTitle: "¿Empezamos?",
    ctaLead: "Cuéntanos qué vendes. Te respondemos el mismo día hábil.",
    cta: "Escríbenos por WhatsApp",
    ctaMessage: "¡Hola D&A Lab! 👋 Vi su página y quiero contarles sobre mi negocio.",
    ctaWork: "Ver portafolio",
  },

  footer: {
    colNav: "Navegación",
    available: "Disponibles para nuevos proyectos",
    backToTop: "Volver arriba",
    tagline: "Webs y marcas para negocios que quieren vender.",
    rights: "Todos los derechos reservados.",
  },
};

export type Dictionary = typeof es;
