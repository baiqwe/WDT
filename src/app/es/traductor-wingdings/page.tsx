import type { Metadata } from "next";
import ToolLandingPage from "@/components/content/ToolLandingPage";
import { siteUrl } from "@/lib/textTools";

const pageUrl = `${siteUrl}/es/traductor-wingdings`;
const languageAlternates = {
  en: siteUrl,
  es: pageUrl,
  pt: `${siteUrl}/pt/tradutor-wingdings`,
  ru: `${siteUrl}/ru/wingdings-translator`,
};

export const metadata: Metadata = {
  title: {
    absolute: "Traductor Wingdings | Convertir Wingdings Online",
  },
  description:
    "Traductor de Wingdings gratis. Convierte texto a simbolos Wingdings o decodifica Wingdings a texto legible online.",
  alternates: {
    canonical: pageUrl,
    languages: languageAlternates,
  },
  openGraph: {
    title: "Traductor Wingdings | Convertir Wingdings Online",
    description:
      "Convierte texto a Wingdings o descifra simbolos Wingdings en segundos con una herramienta online gratis.",
    url: pageUrl,
    siteName: "Wingdings Translator",
    type: "website",
  },
};

export default function SpanishWingdingsPage() {
  return (
    <ToolLandingPage
      eyebrow="Traductor"
      title="Traductor Wingdings"
      description="Esta pagina reutiliza la misma herramienta principal, pero con una capa de contenido en espanol para captar consultas como traductor wingdings o windings traductor. Puedes escribir texto normal, generar simbolos o pegar simbolos para descifrarlos."
      pageUrl={pageUrl}
      breadcrumbs={[
        { name: "Wingdings Translator", url: siteUrl },
        { name: "Traductor Wingdings", url: pageUrl },
      ]}
      tool={{
        slug: "wingdings",
        shortName: "Traductor",
        placeholder: "Escribe texto para convertir a Wingdings...",
        sampleInput: "mensaje secreto",
        sampleOutputLabel: "Salida Wingdings",
        converterUi: {
          leftEyebrow: "Texto",
          leftTitle: "Texto Normal",
          leftDescriptionEncode:
            "Escribe aqui para generar simbolos Wingdings al instante.",
          leftDescriptionDecode:
            "El texto descifrado aparece aqui cuando pegas simbolos a la derecha.",
          rightEyebrow: "Simbolos",
          rightTitle: "Texto en Wingdings",
          rightPlaceholder: "Pega simbolos Wingdings aqui para descifrarlos...",
          rightDescriptionEncode:
            "La salida generada aparece aqui lista para copiar y pegar.",
          rightDescriptionDecode:
            "Pega simbolos Wingdings aqui para convertirlos a texto legible.",
        },
      }}
      sections={[
        {
          title: "Para que sirve esta pagina",
          body: [
            "Muchos usuarios hispanohablantes buscan un traductor de Wingdings sin querer navegar por contenido solo en ingles. Esta pagina responde a esa intencion con una experiencia directa y clara.",
            "La herramienta sigue siendo la misma, pero el titulo, la explicacion y las preguntas frecuentes estan adaptadas para consultas en espanol.",
          ],
        },
        {
          title: "Como usar el traductor",
          body: [
            "Si tienes texto normal, escribelo en el panel izquierdo para generar simbolos. Si ya tienes simbolos Wingdings, pegalos en el panel derecho para descifrarlos.",
            "Si el resultado no tiene sentido, cambia de preset porque algunas paginas usan tablas de simbolos distintas.",
          ],
        },
      ]}
      faq={[
        {
          question: "Se puede traducir Wingdings a texto normal?",
          answer:
            "Si. Pega los simbolos en el panel derecho y la herramienta intentara convertirlos a texto legible.",
        },
        {
          question: "Tambien puedo convertir texto a Wingdings?",
          answer:
            "Si. Escribe texto normal y obtendras una salida en simbolos lista para copiar y pegar.",
        },
        {
          question: "Que hago si el resultado sale raro?",
          answer:
            "Prueba otro preset. Muchas herramientas online usan tablas distintas y por eso el mismo mensaje puede verse diferente.",
        },
      ]}
    />
  );
}
