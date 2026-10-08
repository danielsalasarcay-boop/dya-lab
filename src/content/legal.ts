// Textos legales: Política de Privacidad (/privacidad) y Términos del Servicio (/terminos).
// Cada sección es una lista de bloques: un string es un párrafo, un array de strings es una lista.
// CONFIRMAR: anticipo (50 %), plazos de conservación (12 y 6 meses) y de respuesta (15 días hábiles).
// PENDIENTE: cuando haya correo real en site.ts, sumarlo a las secciones de contacto.

export type LegalBlock = string | string[];
export type LegalDoc = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  sections: { h: string; blocks: LegalBlock[] }[];
};

const whatsapp = "+58 412 970 2711";
const updated = "8 de octubre de 2026";

export const privacy: LegalDoc = {
  metaTitle: "Política de Privacidad — D&A Lab",
  metaDescription: "Qué datos trata D&A Lab cuando visitas su sitio o le escribes por WhatsApp, para qué los usa y cómo ejercer tus derechos.",
  title: "Política de Privacidad",
  updated,
  sections: [
    {
      h: "Quién es el responsable",
      blocks: [
        `Este sitio pertenece a D&A Lab, estudio de diseño web y de marca con sede en Venezuela. Para cualquier consulta sobre tus datos escríbenos por WhatsApp al ${whatsapp}.`,
      ],
    },
    {
      h: "Qué datos recogemos",
      blocks: [
        "El sitio no tiene registro de usuarios, no vende en línea y no usa cookies. Solo tratamos:",
        [
          "Los datos que tú nos envías al contactarnos: tu nombre, el nombre y la actividad de tu negocio, lo que necesitas y tu número de teléfono o WhatsApp.",
          "Datos técnicos que registra nuestro proveedor de alojamiento al visitar el sitio: dirección IP, tipo de navegador, páginas visitadas, fecha y hora.",
        ],
      ],
    },
    {
      h: "Cómo funciona el formulario de contacto",
      blocks: [
        "Al pulsar «Enviar por WhatsApp», el formulario no guarda tus datos en nuestro sitio: abre WhatsApp con tu mensaje ya escrito. Los datos nos llegan solo si decides enviarlo desde WhatsApp.",
      ],
    },
    {
      h: "Para qué usamos tus datos",
      blocks: [
        "Para responder tu consulta, prepararte una propuesta, coordinar y ejecutar el proyecto si lo contratas, y cumplir obligaciones legales o contables. No vendemos ni alquilamos tus datos, ni los usamos para publicidad de terceros.",
      ],
    },
    {
      h: "Base del tratamiento",
      blocks: [
        "Tu consentimiento al escribirnos; las gestiones previas a un contrato o el contrato que firmes con nosotros; y nuestro interés legítimo en mantener el sitio seguro y funcionando.",
      ],
    },
    {
      h: "Con quién se comparten",
      blocks: [
        "Solo con los proveedores necesarios para operar:",
        [
          "Vercel Inc. (Estados Unidos): alojamiento del sitio y registros técnicos.",
          "WhatsApp / Meta Platforms: mensajería, según su propia política de privacidad.",
          "Autoridades, cuando la ley venezolana lo exija.",
        ],
        "Estos proveedores pueden tratar datos fuera de Venezuela. Solo usamos servicios que ofrecen garantías razonables de seguridad.",
      ],
    },
    {
      h: "Cuánto tiempo los guardamos",
      blocks: [
        "Las consultas que no se convierten en proyecto se eliminan a los 12 meses. Los datos de clientes se conservan mientras dure la relación y luego el tiempo que exijan las obligaciones legales y fiscales. Los registros técnicos se rigen por los plazos de Vercel.",
      ],
    },
    {
      h: "Almacenamiento local",
      blocks: [
        "El sitio guarda en tu navegador un único valor técnico que alterna la animación de la portada. No te identifica y puedes borrarlo limpiando los datos del navegador. No usamos cookies de análisis ni de publicidad.",
      ],
    },
    {
      h: "Tus derechos",
      blocks: [
        `Conforme al artículo 28 de la Constitución de la República Bolivariana de Venezuela (habeas data) y, cuando aplique, a la normativa de tu país, puedes pedir acceso, rectificación, actualización o eliminación de tus datos, y retirar tu consentimiento. Escríbenos por WhatsApp al ${whatsapp} y te respondemos en un máximo de 15 días hábiles.`,
      ],
    },
    {
      h: "Seguridad",
      blocks: [
        "Usamos conexiones cifradas (HTTPS) y limitamos el acceso a tus datos a las personas del equipo que los necesitan. Ningún sistema es 100 % seguro, pero actuamos con diligencia ante cualquier incidente.",
      ],
    },
    {
      h: "Menores de edad",
      blocks: ["Nuestros servicios están dirigidos a negocios y mayores de 18 años. No recogemos a sabiendas datos de menores."],
    },
    {
      h: "Cambios",
      blocks: [
        "Si cambiamos esta política (por ejemplo, al añadir herramientas de analítica), publicaremos la nueva versión aquí con su fecha de actualización.",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  metaTitle: "Términos del Servicio — D&A Lab",
  metaDescription: "Condiciones de uso del sitio de D&A Lab y de contratación de proyectos de diseño web y de marca: pagos, propiedad intelectual y entrega de archivos.",
  title: "Términos del Servicio",
  updated,
  sections: [
    {
      h: "Aceptación",
      blocks: [
        "Al usar este sitio aceptas estos términos. Si contratas un proyecto con D&A Lab, también aplican la propuesta escrita y lo acordado para ese proyecto.",
      ],
    },
    {
      h: "Qué es este sitio",
      blocks: [
        "Es un portafolio informativo de los servicios de diseño web e identidad visual de D&A Lab. Los paquetes, plazos y precios publicados son orientativos y no constituyen una oferta vinculante.",
      ],
    },
    {
      h: "Uso permitido",
      blocks: [
        "Puedes navegar y compartir el sitio. No puedes copiar, descargar de forma masiva, modificar ni reutilizar su código, animaciones, textos, logos o casos del portafolio sin autorización escrita.",
      ],
    },
    {
      h: "Propiedad del sitio",
      blocks: [
        "El diseño, el código, las animaciones, los textos y la marca D&A Lab pertenecen a D&A Lab. Los trabajos del portafolio pertenecen a sus respectivos clientes y se exhiben con su autorización o como muestra del trabajo realizado.",
      ],
    },
    {
      h: "Cómo se contrata un proyecto",
      blocks: [
        "Todo proyecto empieza con una propuesta escrita: alcance, entregables, plazo, precio y forma de pago. La aceptación por escrito, incluso por WhatsApp o correo, tiene plena validez conforme a la Ley sobre Mensajes de Datos y Firmas Electrónicas. Lo que no esté en la propuesta se cotiza aparte.",
      ],
    },
    {
      h: "Pagos",
      blocks: [
        "Salvo acuerdo distinto, se paga un anticipo del 50 % para iniciar y el saldo antes de la entrega final. Los plazos se cuentan desde que recibimos el anticipo y todo el material del cliente (textos, fotos, accesos). Si el cliente deja el proyecto sin respuesta más de 30 días, D&A Lab puede darlo por pausado y cotizar su reactivación.",
      ],
    },
    {
      h: "Propiedad intelectual de los entregables",
      blocks: [
        "Una vez pagado el precio total, D&A Lab cede al cliente, de forma exclusiva, por todo el tiempo de protección y para todo el mundo, los derechos patrimoniales de explotación sobre los entregables finales aprobados: logo, identidad visual y diseño del sitio. El cliente podrá usarlos, reproducirlos, modificarlos y registrarlos como marca.",
        "Mientras exista saldo pendiente, D&A Lab conserva todos los derechos y el cliente solo tiene una licencia de uso revocable. Los derechos morales del autor se mantienen conforme a la Ley sobre el Derecho de Autor.",
      ],
    },
    {
      h: "Entrega de activos digitales",
      blocks: [
        "Al pagar el total, el cliente recibe:",
        [
          "Logo en formato vectorial (AI, SVG o PDF) y en PNG, en las versiones y variantes acordadas.",
          "Paleta de colores, tipografías y guía corta de uso, cuando el paquete la incluya.",
          "El sitio publicado y todos los accesos: dominio, hosting y repositorio, a nombre del cliente.",
        ],
        "Los archivos se entregan por enlace de descarga. D&A Lab los guarda 6 meses después de la entrega; luego su resguardo es responsabilidad del cliente.",
      ],
    },
    {
      h: "Lo que no se cede",
      blocks: [
        "No se ceden las propuestas o bocetos descartados, que siguen siendo de D&A Lab, ni los archivos de trabajo intermedios, salvo que se coticen aparte. Tampoco las herramientas, plantillas, componentes y código genérico que D&A Lab usa en varios proyectos: sobre ellos el cliente recibe una licencia de uso perpetua y no exclusiva, solo para su propio sitio.",
      ],
    },
    {
      h: "Componentes de terceros",
      blocks: [
        "Tipografías, librerías de código abierto, íconos e imágenes de stock mantienen sus propias licencias. D&A Lab informará cuáles se usan. Si alguna requiere licencia de pago, su costo corre por cuenta del cliente, previo aviso.",
      ],
    },
    {
      h: "Portafolio",
      blocks: [
        "D&A Lab puede mostrar el proyecto terminado en su sitio, redes y presentaciones, con el nombre del cliente. El cliente puede pedir por escrito, antes de la entrega final, que no se publique o que se publique sin su nombre.",
      ],
    },
    {
      h: "Material del cliente",
      blocks: [
        "El cliente garantiza que tiene derechos sobre los textos, fotos, logos y marcas que entrega, y asume la responsabilidad frente a reclamos de terceros por ese material.",
      ],
    },
    {
      h: "Dominio, hosting y cambios",
      blocks: [
        "El dominio y el hosting se contratan a nombre del cliente y su costo corre por su cuenta. Los ajustes menores durante el primer mes después de la entrega están incluidos. Después, los cambios se cotizan aparte o mediante un plan de mantenimiento.",
      ],
    },
    {
      h: "Limitación de responsabilidad",
      blocks: [
        "D&A Lab responde por el trabajo contratado hasta el monto efectivamente pagado por el proyecto. No responde por caídas o cambios de proveedores externos (hosting, dominio, WhatsApp u otras plataformas), lucro cesante ni resultados comerciales, y no garantiza posiciones en buscadores ni ventas. Este sitio se ofrece «tal cual», sin garantía de disponibilidad continua.",
      ],
    },
    {
      h: "Enlaces externos",
      blocks: ["El sitio enlaza a WhatsApp y a sitios de clientes. D&A Lab no controla ni responde por su contenido o sus políticas."],
    },
    {
      h: "Ley y jurisdicción",
      blocks: [
        "Estos términos se rigen por las leyes de la República Bolivariana de Venezuela. Las partes intentarán resolver cualquier diferencia de buena fe; de no lograrlo, se someten a los tribunales competentes de Venezuela, salvo que una norma imperativa de protección al consumidor disponga otra cosa.",
      ],
    },
    {
      h: "Cambios",
      blocks: [
        "D&A Lab puede actualizar estos términos publicando la nueva versión aquí. Los proyectos en curso se rigen por la versión vigente al aceptar su propuesta.",
      ],
    },
    {
      h: "Contacto",
      blocks: [`Escríbenos por WhatsApp al ${whatsapp}.`],
    },
  ],
};
