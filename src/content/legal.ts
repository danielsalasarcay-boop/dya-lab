// Textos legales: Términos y Condiciones (/terminos), Política de Privacidad (/privacidad)
// y Política de Cookies (/cookies).
// Cada sección es una lista de bloques: un string es un párrafo, un array de strings es una lista.
// Sin números de teléfono: el contacto va por correo, el botón de WhatsApp del sitio o Instagram.
//
// IMPORTANTE: al cambiar el texto de un documento, sube su versión en legal-meta.ts (fecha
// AAAA-MM-DD) y su `updated`. El mensaje de WhatsApp del formulario lleva la versión aceptada;
// el texto de cada versión queda en el historial de git de este archivo.
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
const updated = "25 de octubre de 2026";

export const terms: LegalDoc = {
  ...legalMeta.terms,
  metaTitle: "Términos y Condiciones — D&A Lab",
  metaDescription: "Condiciones para usar este sitio y contratar proyectos de diseño y desarrollo web con D&A Lab.",
  title: "Términos y Condiciones",
  updated,
  sections: [
    {
      h: "Quiénes somos",
      blocks: [
        `D&A Lab es un estudio de diseño y desarrollo web con sede en Venezuela. Solo hacemos sitios web: no diseñamos logos ni identidad de marca. Contacto: ${site.email}.`,
      ],
    },
    {
      h: "Aceptación",
      blocks: [
        "Estos términos regulan el uso de este sitio y la contratación de nuestros servicios. Al marcar la casilla de aceptación del formulario, o al aceptar una propuesta por escrito, declaras que los leíste y los aceptas.",
        "La aceptación por medios electrónicos (casillas, correo o WhatsApp) tiene la misma validez que una firma en papel, conforme a la Ley sobre Mensajes de Datos y Firmas Electrónicas. El mensaje que nos envías desde el formulario indica las versiones que aceptaste y sirve como constancia; no guardamos registros aparte.",
        "Debes ser mayor de edad y tener capacidad para contratar, o actuar en nombre de un negocio con autorización para hacerlo.",
      ],
    },
    {
      h: "Precios y propuesta",
      blocks: [
        "Los precios publicados están en dólares estadounidenses (USD) y son de referencia: cada proyecto se rige por su propuesta escrita, con alcance, precio y plazo. La propuesta se considera aceptada cuando la confirmas por escrito (correo o WhatsApp).",
        "Puedes pagar en dólares o en bolívares al tipo de cambio oficial del Banco Central de Venezuela del día del pago.",
      ],
    },
    {
      h: "Pagos y plazos",
      blocks: [
        "El proyecto se paga completo (100 %) al terminarlo, cuando lo apruebas y antes de publicar el sitio o entregar los archivos finales. No publicamos el sitio ni entregamos archivos hasta recibir el pago.",
        "El plazo corre desde que confirmas la propuesta y nos envías todo el material (textos y fotos). Si el proyecto queda sin respuesta del cliente más de 30 días, se pausa; si pasan 90 días, se da por terminado como una cancelación del cliente (ver el punto siguiente) y retomarlo se cotiza de nuevo.",
      ],
    },
    {
      h: "Cancelación",
      blocks: [
        "Puedes cancelar el proyecto en cualquier momento avisándonos por escrito (correo o WhatsApp). Como solo cobramos al terminar, al cancelar se paga el trabajo ya hecho:",
        [
          "Antes de que te presentemos la dirección visual (el diseño inicial y la estructura del sitio): no pagas nada.",
          "Después de presentarte la dirección visual: pagas el 45 % del precio de la propuesta.",
          "En ambos casos, si ya registramos el dominio a tu nombre, pagas también su costo y te lo entregamos con sus accesos.",
        ],
        "Lo hecho hasta la cancelación sigue siendo de D&A Lab: no se publica ni se entrega, y no puedes usarlo ni pedírselo a otro proveedor como base.",
        "Si somos nosotros quienes cancelamos el proyecto por una causa que no sea tuya, no pagas nada y te devolvemos todo el material que nos diste.",
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
        "Con el pago total, el cliente recibe los derechos sobre el diseño de su sitio y los textos e imágenes hechos para él. Las herramientas y el código reutilizable de D&A Lab se ceden solo como licencia de uso para ese sitio. Los bocetos y propuestas descartados siguen siendo de D&A Lab.",
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
      h: "Confidencialidad",
      blocks: [
        "Todo lo que nos compartes para tu proyecto es confidencial: información de tu negocio, precios, clientes, proveedores, accesos y contraseñas, y cualquier material que aún no sea público. No lo divulgamos, no lo vendemos y no lo usamos para nada distinto a tu proyecto, ni durante el trabajo ni después de terminarlo.",
        "Solo lo compartimos con los servicios estrictamente necesarios para hacer y publicar tu sitio (alojamiento y dominio), o si una autoridad lo exige por ley; en ese caso te avisamos, salvo que la ley lo impida. Al terminar te entregamos los accesos y te recomendamos cambiar las contraseñas.",
        "Lo único que mostramos en nuestro portafolio es lo que ya está publicado en tu sitio, como explica el punto siguiente.",
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
      h: "Fuerza mayor",
      blocks: [
        "Ninguna de las partes responde por retrasos o incumplimientos causados por hechos ajenos a su control que no pudo prever ni evitar (causa extraña no imputable, artículo 1.272 del Código Civil): cortes de electricidad o de internet, caídas de servicios de terceros (alojamiento, dominio, WhatsApp, redes sociales), desastres naturales, enfermedad grave, conflictos o decisiones de autoridades.",
        "Quien se vea afectado avisa a la otra parte lo antes posible. Los plazos se extienden por el tiempo que dure el impedimento y, si dura más de 30 días seguidos, cualquiera de las dos puede dar por terminado el proyecto sin penalidad.",
      ],
    },
    {
      h: "Garantía de 30 días",
      blocks: [
        "Durante los 30 días siguientes a la publicación del sitio corregimos sin costo cualquier error o falla del trabajo que hicimos, o cualquier punto que no cumpla lo acordado en la propuesta. Avísanos dentro de ese plazo por escrito.",
        "La garantía no cubre cambios nuevos (textos, fotos, secciones o funciones distintas a las acordadas), ni fallas causadas por cambios hechos por el cliente o por terceros, ni caídas de servicios externos. Pasados los 30 días, las correcciones y los cambios se cubren con un plan de mantenimiento o se cotizan aparte.",
      ],
    },
    {
      h: "Reembolsos",
      blocks: [
        "Como pagas después de ver y aprobar el trabajo terminado, no hay reembolsos una vez hecho el pago.",
        "El dominio, el hosting y los planes de mantenimiento ya pagados no se reembolsan por el período en curso. Puedes cancelar el mantenimiento para el siguiente período avisando antes de la renovación.",
      ],
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
        `D&A Lab, estudio de diseño y desarrollo web con sede en Venezuela, es responsable de los datos que nos das. Contacto para temas de privacidad: ${site.email}.`,
      ],
    },
    {
      h: "Qué datos tratamos",
      blocks: [
        "Solo tratamos lo que tú decides enviarnos. El sitio no tiene registro de usuarios, no usa cookies, no tiene analítica y no guarda en ningún servidor lo que escribes en el formulario.",
        [
          "Formulario de contacto: tu nombre, tu negocio y lo que necesitas se usan solo para armar, dentro de tu navegador, un mensaje de WhatsApp que tú decides enviar. Ese mensaje incluye las versiones de los Términos y de esta Política que aceptaste. Si no lo envías, no recibimos nada.",
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
          "Vercel Inc. (alojamiento del sitio), con servidores en Estados Unidos.",
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
        ],
      ],
    },
    {
      h: "Seguridad",
      blocks: [
        "El sitio funciona solo con conexión cifrada (HTTPS). Las conversaciones contigo quedan solo en nuestras cuentas de WhatsApp y correo, a las que solo accede D&A Lab.",
      ],
    },
    {
      h: "Tus derechos",
      blocks: [
        `Según el artículo 28 de la Constitución (habeas data) puedes saber qué datos tenemos sobre ti y para qué, pedir que los actualicemos, corrijamos o eliminemos, y retirar tu consentimiento. Escríbenos ${contacto}. Respondemos en un máximo de 15 días hábiles.`,
        "Si pides eliminar tus datos, solo conservaremos lo que exija la ley (por ejemplo, datos de facturación).",
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
  updated: "18 de octubre de 2026",
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

export const legalDocs = { terms, privacy, cookies };
