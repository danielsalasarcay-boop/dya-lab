// Textos legales: Política de Privacidad (/privacidad) y Términos del Servicio (/terminos).
// Cada sección es una lista de bloques: un string es un párrafo, un array de strings es una lista.
// Sin números de teléfono: el contacto va por el botón de WhatsApp del sitio o por Instagram.

import { site } from "@/lib/site";

export type LegalBlock = string | string[];
export type LegalDoc = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  sections: { h: string; blocks: LegalBlock[] }[];
};

const contacto = `por WhatsApp desde el botón de este sitio o por Instagram (${site.social.instagramHandle})`;
const updated = "12 de octubre de 2026";

export const privacy: LegalDoc = {
  metaTitle: "Política de Privacidad — D&A Lab",
  metaDescription: "Qué datos trata D&A Lab, para qué los usa y cómo ejercer tus derechos.",
  title: "Política de Privacidad",
  updated,
  sections: [
    {
      h: "Qué datos tratamos",
      blocks: [
        "D&A Lab es un estudio de diseño web y de marca con sede en Venezuela. El sitio no tiene registro de usuarios ni usa cookies. Solo tratamos:",
        [
          "Lo que nos envías al contactarnos: nombre, datos de tu negocio y lo que necesitas.",
          "Datos técnicos de la visita que registra nuestro proveedor de alojamiento (IP, navegador, páginas vistas).",
        ],
        "El formulario no guarda nada: abre WhatsApp con tu mensaje y solo nos llega si decides enviarlo.",
      ],
    },
    {
      h: "Para qué los usamos",
      blocks: [
        "Para responderte, preparar tu propuesta y ejecutar el proyecto. No vendemos tus datos ni los usamos para publicidad.",
      ],
    },
    {
      h: "Con quién se comparten",
      blocks: [
        "Solo con los servicios necesarios para operar: Vercel (alojamiento) y WhatsApp (mensajería), que pueden tratarlos fuera de Venezuela, y con las autoridades cuando la ley lo exija.",
      ],
    },
    {
      h: "Cuánto tiempo los guardamos",
      blocks: [
        "Las consultas que no se convierten en proyecto se borran a los 12 meses. Los datos de clientes se guardan mientras dure la relación y lo que exija la ley.",
      ],
    },
    {
      h: "Tus derechos",
      blocks: [
        `Puedes pedir acceso, corrección o eliminación de tus datos (art. 28 de la Constitución venezolana) escribiéndonos ${contacto}. Respondemos en un máximo de 15 días hábiles.`,
      ],
    },
    {
      h: "Cambios",
      blocks: ["Si cambiamos esta política, publicaremos la nueva versión aquí con su fecha."],
    },
  ],
};

export const terms: LegalDoc = {
  metaTitle: "Términos del Servicio — D&A Lab",
  metaDescription: "Condiciones para contratar proyectos de diseño web y de marca con D&A Lab.",
  title: "Términos del Servicio",
  updated,
  sections: [
    {
      h: "Alcance",
      blocks: [
        "Al usar este sitio aceptas estos términos. Los precios y plazos publicados son orientativos; cada proyecto se rige por su propuesta escrita, que es válida aceptada por WhatsApp o correo.",
      ],
    },
    {
      h: "Pagos y plazos",
      blocks: [
        "Se paga un 50 % para empezar y el resto antes de la entrega final. El plazo corre desde que recibimos el anticipo y todo el material (textos y fotos). Si el proyecto queda sin respuesta más de 30 días, se pausa.",
      ],
    },
    {
      h: "Propiedad de lo entregado",
      blocks: [
        "Con el pago total, el cliente recibe los derechos sobre el logo, la identidad visual y el diseño de su sitio. Las herramientas y el código reutilizable de D&A Lab se ceden solo como licencia de uso para ese sitio. Los bocetos descartados siguen siendo de D&A Lab.",
      ],
    },
    {
      h: "Dominio, hosting y cambios",
      blocks: [
        "El dominio se registra a nombre del cliente. El hosting lo gestiona D&A Lab: el primer año va incluido y luego se renueva por $20 al año, con aviso un mes antes. Los ajustes menores del primer mes tras la entrega están incluidos; después se cotizan aparte o con un plan de mantenimiento.",
      ],
    },
    {
      h: "Material del cliente",
      blocks: [
        "El cliente garantiza que tiene derecho a usar los textos, fotos y marcas que entrega.",
      ],
    },
    {
      h: "Portafolio",
      blocks: [
        "Podemos mostrar el proyecto terminado en nuestro portafolio y redes, salvo que el cliente pida lo contrario por escrito antes de la entrega.",
      ],
    },
    {
      h: "Responsabilidad",
      blocks: [
        "Respondemos por el trabajo contratado hasta el monto pagado. No respondemos por fallas de servicios de terceros (hosting, dominio, WhatsApp) ni garantizamos ventas o posiciones en Google.",
      ],
    },
    {
      h: "Ley aplicable",
      blocks: [
        `Estos términos se rigen por las leyes de Venezuela. Para cualquier consulta, escríbenos ${contacto}.`,
      ],
    },
  ],
};
