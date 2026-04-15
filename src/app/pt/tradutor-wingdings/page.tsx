import type { Metadata } from "next";
import ToolLandingPage from "@/components/content/ToolLandingPage";
import { siteUrl } from "@/lib/textTools";

const pageUrl = `${siteUrl}/pt/tradutor-wingdings`;
const languageAlternates = {
  en: siteUrl,
  es: `${siteUrl}/es/traductor-wingdings`,
  pt: pageUrl,
  ru: `${siteUrl}/ru/wingdings-translator`,
};

export const metadata: Metadata = {
  title: {
    absolute: "Tradutor Wingdings | Converter Wingdings Online",
  },
  description:
    "Tradutor de Wingdings gratis. Converta texto em simbolos Wingdings ou decode Wingdings para texto legivel online.",
  alternates: {
    canonical: pageUrl,
    languages: languageAlternates,
  },
  openGraph: {
    title: "Tradutor Wingdings | Converter Wingdings Online",
    description:
      "Converta texto para Wingdings e decode simbolos Wingdings rapidamente com uma ferramenta online gratuita.",
    url: pageUrl,
    siteName: "Wingdings Translator",
    type: "website",
  },
};

export default function PortugueseWingdingsPage() {
  return (
    <ToolLandingPage
      eyebrow="Tradutor"
      title="Tradutor Wingdings"
      description="Esta pagina estatica foi criada para atender buscas em portugues como tradutor wingdings e tradutor de wingdings. A interface continua simples: escreva texto normal para gerar simbolos ou cole simbolos para decodificar."
      pageUrl={pageUrl}
      breadcrumbs={[
        { name: "Wingdings Translator", url: siteUrl },
        { name: "Tradutor Wingdings", url: pageUrl },
      ]}
      tool={{
        slug: "wingdings",
        shortName: "Tradutor",
        placeholder: "Digite um texto para converter em Wingdings...",
        sampleInput: "mensagem secreta",
        sampleOutputLabel: "Saida em Wingdings",
        converterUi: {
          leftEyebrow: "Texto",
          leftTitle: "Texto Normal",
          leftDescriptionEncode:
            "Digite aqui para gerar simbolos Wingdings imediatamente.",
          leftDescriptionDecode:
            "O texto decodificado aparece aqui quando voce cola simbolos a direita.",
          rightEyebrow: "Simbolos",
          rightTitle: "Texto em Wingdings",
          rightPlaceholder: "Cole simbolos Wingdings aqui para decodificar...",
          rightDescriptionEncode:
            "A saida aparece aqui pronta para copiar e colar.",
          rightDescriptionDecode:
            "Cole uma mensagem em simbolos aqui para converter de volta para texto legivel.",
        },
      }}
      sections={[
        {
          title: "Por que existe uma pagina em portugues",
          body: [
            "O padrao de busca mostra que existe demanda real em portugues para tradutor de Wingdings. Em vez de mandar esse publico direto para uma pagina totalmente em ingles, esta rota reduz friccao.",
            "Ela reaproveita a ferramenta principal, mas adapta titulo, explicacao e perguntas frequentes para a intencao local.",
          ],
        },
        {
          title: "Como usar a ferramenta",
          body: [
            "Digite texto comum no painel esquerdo para gerar simbolos. Se voce ja recebeu uma mensagem em Wingdings, cole os simbolos no painel direito para tentar decodificar.",
            "Se o resultado nao fizer sentido, troque o preset porque diferentes sites usam mapeamentos diferentes.",
          ],
        },
      ]}
      faq={[
        {
          question: "Posso traduzir Wingdings para texto normal?",
          answer:
            "Sim. Cole os simbolos no painel direito e a ferramenta tentara converter para texto legivel.",
        },
        {
          question: "Tambem posso converter texto para Wingdings?",
          answer:
            "Sim. Basta digitar texto comum para gerar simbolos prontos para copiar e colar.",
        },
        {
          question: "O que fazer se o resultado parecer errado?",
          answer:
            "Teste outro preset. Muitas paginas usam tabelas diferentes e isso muda bastante o resultado.",
        },
      ]}
    />
  );
}
