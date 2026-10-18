// Textos legales: Términos y Condiciones (/terminos), Política de Privacidad (/privacidad),
// Política de Cookies (/cookies) y Política de Reembolsos (/reembolsos).
// Cada sección es una lista de bloques: un string es un párrafo, un array de strings es una lista.
// Sin números de teléfono: el contacto va por correo, el botón de WhatsApp del sitio o Instagram.
//
// IMPORTANTE: al cambiar el texto de un documento, sube su versión en legal-meta.ts (fecha
// AAAA-MM-DD) y su `updated`. El registro de consentimientos guarda la versión y una huella (SHA-256) del texto
// aceptado; el texto de cada versión queda en el historial de git de este archivo.
//
// PENDIENTE: si D&A Lab se registra como firma personal o compañía, añadir razón social y RIF
// en "Quiénes somos" de los Términos y en "Responsable" de la Privacidad.

import { site } from "@/lib/site";
import { legalMeta } from "./legal-meta";

export type LegalBlock = string | string[];
export type LegalDoc = {
  path: string;
  version: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  sections: { h: string; blocks: LegalBlock[] }[];
};

const contacto = `por correo a ${site.email}, por WhatsApp desde el botón de este sitio o por Instagram (${site.social.instagramHandle})`;
const updated = "18 de octubre de 2026";

export const terms: LegalDoc = {
  ...legalMeta.terms,
  metaTitle: "Términos y Condiciones — D&A Lab",
  metaDescription: "Condiciones para usar este sitio y contratar proyectos de diseño web y de marca con D&A Lab.",
  title: "Términos y Condiciones",
  updated,
  sections: [
    {
      h: "Quiénes somos",
      blocks: [
        `D&A Lab es un estudio de diseño web y de identidad visual con sede en Venezuela. Contacto: ${site.email}.`,
      ],
    },
    {
      h: "Aceptación",
      blocks: [
        "Estos términos regulan el uso de este sitio y la contratación de nuestros servicios. Al marcar la casilla de aceptación del formulario, o al aceptar una propuesta por escrito, declaras que los leíste y los aceptas.",
        "La aceptación por medios electrónicos (casillas, correo o WhatsApp) tiene la misma validez que una firma en papel, conforme a la Ley sobre Mensajes de Datos y Firmas Electrónicas. Guardamos un registro de cada aceptación, como explica la Política de Privacidad.",
        "Debes ser mayor de edad y tener capacidad para contratar, o actuar en nombre de un negocio con autorización para hacerlo.",
      ],
    },
    {
      h: "Precios y propuesta",
      blocks: [
        "Los precios publicados están en dólares estadounidenses (USD) y son de referencia: cada proyecto se rige por su propuesta escrita, con alcance, precio y plazo. La propuesta se considera aceptada cuando la confirmas por escrito (correo o WhatsApp) y pagas el anticipo.",
        "Puedes pagar en dólares o en bolívares al tipo de cambio oficial del Banco Central de Venezuela del día del pago.",
      ],
    },
    {
      h: "Pagos y plazos",
      blocks: [
        "Se paga un 50 % para empezar y el resto antes de la publicación o entrega final. El plazo corre desde que recibimos el anticipo y todo el material (textos y fotos).",
        "Si el proyecto queda sin respuesta del cliente más de 30 días, se pausa; si pasan 90 días, se da por terminado y aplica la Política de Reembolsos.",
      ],
    },
    {
      h: "Ajustes y cambios",
      blocks: [
        "Cada plan incluye el número de rondas de ajustes indicado en su propuesta. Los cambios fuera de ese alcance, o pedidos después de la entrega, se cotizan aparte o se cubren con un plan de mantenimiento.",
      ],
    },
    {
      h: "Dominio, hosting y mantenimiento",
      blocks: [
        "El dominio se registra a nombre del cliente y, al terminar, entregamos todos los accesos. El primer año de dominio y hosting está incluido en los planes de web; luego se renueva con el plan de mantenimiento que elijas, con aviso un mes antes. Si no renuevas, el sitio puede quedar fuera de línea al vencer el período pagado.",
      ],
    },
    {
      h: "Propiedad de lo entregado",
      blocks: [
        "Con el pago total, el cliente recibe los derechos sobre el logo, la identidad visual y el diseño de su sitio. Las herramientas y el código reutilizable de D&A Lab se ceden solo como licencia de uso para ese sitio. Los bocetos y propuestas descartados siguen siendo de D&A Lab.",
        "Hasta que el proyecto esté pagado por completo, los derechos sobre el trabajo siguen siendo de D&A Lab.",
      ],
    },
    {
      h: "Material del cliente",
      blocks: [
        "El cliente garantiza que tiene derecho a usar los textos, fotos, logos y marcas que nos entrega, y responde frente a terceros si no es así.",
        "Si usamos fotos de bancos de imágenes o generadas por inteligencia artificial, lo indicamos y usamos solo material con licencia que permita su uso comercial.",
      ],
    },
    {
      h: "Portafolio",
      blocks: [
        "Podemos mostrar el proyecto terminado (capturas, videos de recorrido y enlace) en este sitio y en nuestras redes, salvo que el cliente pida lo contrario por escrito antes de la entrega o en cualquier momento después; en ese caso lo retiramos.",
      ],
    },
    {
      h: "Contenido de este sitio",
      blocks: [
        "Los textos, el diseño, el logo, la mascota y las animaciones de este sitio son de D&A Lab. Los sitios mostrados en Proyectos pertenecen a sus dueños y se muestran con su autorización. No está permitido copiarlos ni reutilizarlos sin permiso escrito.",
      ],
    },
    {
      h: "Responsabilidad",
      blocks: [
        "Respondemos por el trabajo contratado hasta el monto pagado por ese proyecto. No respondemos por fallas de servicios de terceros (hosting, dominio, WhatsApp, redes sociales) ni garantizamos ventas, visitas o posiciones en Google.",
      ],
    },
    {
      h: "Reembolsos",
      blocks: ["Las cancelaciones y devoluciones se rigen por nuestra Política de Reembolsos, publicada en /reembolsos."],
    },
    {
      h: "Ley aplicable y reclamos",
      blocks: [
        `Estos términos se rigen por las leyes de la República Bolivariana de Venezuela. Si tienes un reclamo, escríbenos ${contacto} y te respondemos en un máximo de 15 días hábiles. Esto no limita tu derecho a acudir a la Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos (SUNDDE) ni a los tribunales competentes.`,
      ],
    },
    {
      h: "Cambios",
      blocks: [
        "Si cambiamos estos términos, publicaremos la nueva versión aquí con su fecha. Los proyectos ya contratados se rigen por la versión que aceptaste.",
      ],
    },
  ],
};

export const privacy: LegalDoc = {
  ...legalMeta.privacy,
  metaTitle: "Política de Privacidad — D&A Lab",
  metaDescription: "Qué datos trata D&A Lab, para qué los usa, cuánto tiempo los guarda y cómo ejercer tus derechos.",
  title: "Política de Privacidad",
  updated,
  sections: [
    {
      h: "Responsable",
      blocks: [
        `D&A Lab, estudio de diseño web y de marca con sede en Venezuela, es responsable de los datos que nos das. Contacto para temas de privacidad: ${site.email}.`,
      ],
    },
    {
      h: "Qué datos tratamos",
      blocks: [
        "Solo pedimos lo necesario para responderte. El sitio no tiene registro de usuarios ni usa cookies.",
        [
          "Formulario de contacto: tu nombre, el nombre de tu negocio y lo que necesitas.",
          "Registro de aceptación: cuando envías el formulario guardamos la fecha y hora, las versiones de los Términos y de esta Política que aceptaste, el texto de cada casilla, tu nombre y negocio, la dirección IP, el navegador y un código de referencia que va en tu mensaje de WhatsApp. No guardamos lo que escribiste en \"¿Qué necesitas?\": eso solo viaja en tu mensaje.",
          "Si nos escribes por WhatsApp, correo o redes: tu número o usuario y lo que nos cuentes.",
          "Si nos contratas: los datos necesarios para la propuesta, la facturación y el proyecto.",
          "Datos técnicos que registra nuestro proveedor de alojamiento (IP, navegador, páginas vistas) para seguridad y funcionamiento.",
        ],
      ],
    },
    {
      h: "Para qué los usamos",
      blocks: [
        [
          "Responderte, preparar tu propuesta y ejecutar el proyecto.",
          "Demostrar cuándo y cómo aceptaste nuestros Términos y esta Política, si alguna autoridad o tú mismo nos lo pide.",
          "Cumplir obligaciones legales y fiscales.",
        ],
        "No vendemos tus datos, no los usamos para publicidad y no te enviaremos mensajes promocionales sin tu permiso.",
      ],
    },
    {
      h: "Base para tratarlos",
      blocks: [
        "Tu consentimiento libre, expreso e informado, que das marcando las casillas del formulario o escribiéndonos, y la ejecución del contrato cuando nos contratas. Puedes retirar tu consentimiento cuando quieras; eso no afecta lo hecho antes.",
      ],
    },
    {
      h: "Con quién se comparten",
      blocks: [
        "Solo con los servicios necesarios para operar, y con las autoridades cuando la ley lo exija:",
        [
          "Vercel Inc. (alojamiento del sitio y almacenamiento del registro de aceptación), con servidores en Estados Unidos.",
          "WhatsApp (Meta Platforms), si eliges escribirnos por ahí.",
          "Google (Gmail), si nos escribes por correo.",
        ],
        "Estos servicios pueden tratar tus datos fuera de Venezuela. Al aceptar esta política autorizas esa transferencia.",
      ],
    },
    {
      h: "Cuánto tiempo los guardamos",
      blocks: [
        [
          "Consultas que no se convierten en proyecto: 12 meses.",
          "Datos de clientes: mientras dure la relación y lo que exijan las leyes fiscales.",
          "Registro de aceptación: 5 años desde tu último contacto con nosotros, para poder demostrar tu consentimiento.",
        ],
      ],
    },
    {
      h: "Seguridad",
      blocks: [
        "El sitio funciona solo con conexión cifrada (HTTPS) y el registro de aceptación se guarda en un almacenamiento privado al que solo accede D&A Lab.",
      ],
    },
    {
      h: "Tus derechos",
      blocks: [
        `Según el artículo 28 de la Constitución (habeas data) puedes saber qué datos tenemos sobre ti y para qué, pedir que los actualicemos, corrijamos o eliminemos, y retirar tu consentimiento. Escríbenos ${contacto}. Respondemos en un máximo de 15 días hábiles.`,
        "Si pides eliminar tus datos, podemos conservar el registro de aceptación y lo que exija la ley mientras sea necesario para atender reclamos o requerimientos de autoridades.",
      ],
    },
    {
      h: "Menores de edad",
      blocks: ["Nuestros servicios son para mayores de edad. Si eres menor, no nos envíes datos sin la autorización de tu representante."],
    },
    {
      h: "Cambios",
      blocks: ["Si cambiamos esta política, publicaremos la nueva versión aquí con su fecha."],
    },
  ],
};

export const cookies: LegalDoc = {
  ...legalMeta.cookies,
  metaTitle: "Política de Cookies — D&A Lab",
  metaDescription: "Este sitio no usa cookies. Qué guarda en tu navegador y por qué no hace falta aceptarlo.",
  title: "Política de Cookies",
  updated,
  sections: [
    {
      h: "Este sitio no usa cookies",
      blocks: [
        "No usamos cookies propias ni de terceros: ni analítica, ni publicidad, ni píxeles de redes sociales. Por eso no te mostramos un aviso para aceptarlas.",
      ],
    },
    {
      h: "Lo que sí guarda tu navegador",
      blocks: [
        "Para que las animaciones funcionen bien, el sitio guarda dos datos técnicos en el almacenamiento de tu navegador. No te identifican, no salen de tu dispositivo y no se comparten con nadie:",
        [
          "dal-hero-turn (almacenamiento local): un número que alterna el orden de las tres ventanas de la portada en cada visita.",
          "dya-hero-played (almacenamiento de sesión): recuerda que ya viste la animación de la portada para no repetirla; se borra al cerrar la pestaña.",
        ],
        "Puedes borrarlos cuando quieras desde la configuración de tu navegador; el sitio sigue funcionando igual.",
      ],
    },
    {
      h: "Enlaces a otros servicios",
      blocks: [
        "Los botones de WhatsApp, Instagram y LinkedIn solo te llevan a esos servicios cuando haces clic. A partir de ahí aplican sus propias políticas de cookies y privacidad.",
      ],
    },
    {
      h: "Cambios",
      blocks: [
        "Si algún día añadimos cookies que no sean estrictamente necesarias (por ejemplo, de analítica), te pediremos permiso antes de activarlas y actualizaremos esta política.",
      ],
    },
  ],
};

export const refunds: LegalDoc = {
  ...legalMeta.refunds,
  metaTitle: "Política de Reembolsos — D&A Lab",
  metaDescription: "Cuándo y cómo se devuelve el dinero de un proyecto de diseño web o de marca con D&A Lab.",
  title: "Política de Reembolsos",
  updated,
  sections: [
    {
      h: "Cómo funciona el pago",
      blocks: [
        "Cada proyecto se paga en dos partes: 50 % de anticipo para empezar y 50 % antes de la publicación o entrega final. El anticipo reserva tu lugar en nuestra agenda y cubre el trabajo inicial.",
      ],
    },
    {
      h: "Si cancelas",
      blocks: [
        [
          "Antes de que empecemos a trabajar: te devolvemos el 100 % del anticipo, menos lo ya pagado a terceros a tu nombre (por ejemplo, el dominio).",
          "Después de presentarte la primera propuesta de diseño: el anticipo no se devuelve, porque cubre el trabajo hecho. Te entregamos lo avanzado hasta ese momento.",
          "Después de la entrega final: no hay reembolso, pero sí los ajustes incluidos en tu plan.",
        ],
      ],
    },
    {
      h: "Si no cumplimos",
      blocks: [
        "Si no entregamos lo acordado en la propuesta escrita, primero lo corregimos sin costo. Si aun así no podemos cumplir, te devolvemos la parte proporcional al trabajo no entregado.",
      ],
    },
    {
      h: "Lo que no es reembolsable",
      blocks: [
        [
          "Dominio, hosting y otros servicios de terceros una vez contratados.",
          "Planes de mantenimiento por el período en curso. Puedes cancelarlos para el siguiente período avisando antes de la renovación.",
          "Proyectos dados por terminados tras 90 días sin respuesta del cliente.",
        ],
      ],
    },
    {
      h: "Cómo pedir un reembolso",
      blocks: [
        `Escríbenos ${contacto} indicando tu nombre, el proyecto y el motivo. Te respondemos en un máximo de 15 días hábiles y, si procede, devolvemos el dinero por el mismo medio de pago en un máximo de 15 días hábiles más.`,
        "Esto no limita los derechos que te dé la ley venezolana.",
      ],
    },
  ],
};

export const legalDocs = { terms, privacy, cookies, refunds };
