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
    { href: "#movimiento", label: "Movimiento" },
    { href: "#servicios", label: "Servicios" },
    { href: "#proceso", label: "Proceso" },
    { href: "#paquetes", label: "Paquetes" },
    { href: "#preguntas", label: "Preguntas" },
  ],
  navCta: "Hablemos",
  skip: "Saltar al contenido",
  menuOpen: "Abrir menú",
  menuClose: "Cerrar menú",
  menuLabel: "Menú",
  menuAvailable: "Disponibles",

  hero: {
    eyebrow: "Diseño web y de marca · Venezuela",
    titleA: "Webs y marcas para negocios que",
    titleB: "quieren vender.",
    lead: "Diseñamos tu sitio y tu identidad visual a la medida de cómo vendes: por catálogo, por WhatsApp o por cotización.",
    ctaWork: "Ver trabajo",
    ctaTalk: "Hablemos",
    proof: "Sitios en producción para",
  },

  origin: {
    eyebrow: "Por qué existe",
    aside: "Antes de diseñar preguntamos: ¿cómo te llega un pedido hoy?",
    title: "No partimos de una plantilla. Partimos de cómo vendes tú.",
    body: [
      "Un negocio que recibe pedidos por WhatsApp no necesita la misma web que uno que cotiza contenedores para exportar.",
      "Por eso lo primero que miramos es a quién le vendes y cómo te compra.",
      "Lo demás —colores, letras, fotos— sale de ahí.",
    ],
    waysLabel: "Tres formas de vender, tres sitios distintos",
    ways: [
      {
        id: "chat",
        name: "Te escriben",
        line: "El pedido se arma mensaje a mensaje, hasta cerrarlo.",
        proof: "Como LOOPI",
      },
      {
        id: "catalogo",
        name: "Te reservan",
        line: "Miran el catálogo, eligen y apartan sin llamar.",
        proof: "Como Quality Bikes",
      },
      {
        id: "cotizacion",
        name: "Te cotizan",
        line: "Piden precio por volumen y esperan tu respuesta.",
        proof: "Como Alimentos Mar Caribe",
      },
    ],
  },

  services: {
    eyebrow: "Qué hacemos",
    title: "Dos servicios. Se contratan juntos o por separado.",
    cta: "Hablemos de esto",
    ctaMessage: "¡Hola D&A Lab! 👋 Vi su página y me interesa {service} para mi negocio.",
    together: "Juntos salen mejor: el logo y los colores se deciden mirando la web donde van a vivir.",
    items: [
      {
        n: "01",
        name: "Diseño y desarrollo web a medida",
        promise: "Un sitio que trabaja para tu negocio, no una tarjeta de presentación.",
        includes: [
          "Te escriben por WhatsApp desde cualquier parte del sitio",
          "Piden cotización o hacen su reserva sin llamar ni esperar",
          "Se usa bien en el teléfono, que es donde te buscan",
          "Carga rápido, así nadie se va antes de ver tus productos",
          "Te encuentran en Google y tu link se ve bien al compartirlo",
          "El dominio y el sitio quedan a tu nombre, no al nuestro",
        ],
      },
      {
        n: "02",
        name: "Identidad visual y logos",
        promise: "Que te reconozcan antes de leer tu nombre.",
        includes: [
          "Tu logo en todas sus versiones: horizontal, ícono, una tinta",
          "Funciona igual en un aviso grande y en la foto de perfil",
          "Colores y tipografías fijos: tu marca siempre se ve igual",
          "Archivos listos para imprenta, redes y web, sin pedir conversiones",
          "Una guía corta para que cualquiera que te diseñe siga la línea",
          "Los originales son tuyos y los usas con quien quieras",
        ],
      },
    ],
  },

  work: {
    eyebrow: "Trabajo",
    title: "Seis proyectos, seis formas de vender.",
    lead: "Sitios reales, en producción. Entra y úsalos.",
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
        // PENDIENTE: dominio propio. Por ahora el sitio vive en GitHub Pages.
        url: "https://danielsalasarcay-boop.github.io/casa-panza/",
        domain: "casa-panza · github.io",
        sector: "Alquiler vacacional · Los Roques",
        // FALTA CONTEXTO: ¿cómo recibían reservas antes de la web (solo Instagram/WhatsApp)? ¿también hicieron su marca?
        summary:
          "Casa frente al mar en Gran Roque para hasta 10 huéspedes: la portada pasa de boceto a foto al hacer scroll, espacios y galería de la casa, comodidades incluidas y reserva directa por WhatsApp.",
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
        // PENDIENTE: dominio propio. Por ahora el sitio vive en Vercel.
        url: "https://la-capital-del-cielo.vercel.app/",
        domain: "la-capital-del-cielo · vercel.app",
        sector: "Reservas de casas · Los Roques",
        // FALTA CONTEXTO: ¿la marca/logo también es trabajo del estudio? El sitio aún tiene fotos pendientes (Casa 9, Macanao, experiencia).
        summary:
          "Marca que reúne casas privadas de lujo en Los Roques: ficha por propiedad con huéspedes y habitaciones, lo que incluye cada estadía, camisas propias a la venta y reserva por WhatsApp.",
        tags: ["Web", "Catálogo", "Tienda"],
        accent: "#7FA7E8",
        statusBg: "#8890a0",
        statusFg: "#1b1b1b",
      },
    ],
  },

  motion: {
    eyebrow: "Webs con movimiento",
    title: "Webs que no se ven como todas.",
    lead: "Animaciones y efectos hechos para tu marca, no sacados de una plantilla: un sitio actual que la gente recuerda. Elige una historia y pasa el cursor (o el dedo) por las letras.",
    storiesLabel: "Historia",
    stories: [
      { id: "sueno", label: "La web que soñaste" },
      { id: "plantilla", label: "A tu medida" },
      { id: "viaje", label: "Te compran" },
      { id: "chat", label: "¡Pedido!" },
      { id: "mundo", label: "El mundo" },
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
    floatHover: "Escríbenos",
    // Mensaje que llega prellenado al tocar el botón flotante o el número directo.
    whatsappGreeting: "¡Hola D&A Lab! 👋 Vi su página web y me gustaría hablar sobre un proyecto para mi negocio.",
  },

  footer: {
    tagline: "Webs y marcas para negocios que quieren vender.",
    rights: "Todos los derechos reservados.",
  },
};

export type Dictionary = typeof es;
