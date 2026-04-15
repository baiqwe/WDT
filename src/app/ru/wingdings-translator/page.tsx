import type { Metadata } from "next";
import ToolLandingPage from "@/components/content/ToolLandingPage";
import { localizedWingdingsAlternates, siteUrl } from "@/lib/textTools";

const pageUrl = `${siteUrl}/ru/wingdings-translator`;

export const metadata: Metadata = {
  title: {
    absolute: "Wingdings переводчик | Перевод Wingdings онлайн",
  },
  description:
    "Бесплатный переводчик Wingdings. Конвертируйте текст в символы Wingdings или расшифровывайте Wingdings обратно в обычный текст онлайн.",
  alternates: {
    canonical: pageUrl,
    languages: localizedWingdingsAlternates,
  },
  openGraph: {
    title: "Wingdings переводчик | Перевод Wingdings онлайн",
    description:
      "Переводите обычный текст в Wingdings и расшифровывайте символы Wingdings с помощью бесплатного онлайн-инструмента.",
    url: pageUrl,
    siteName: "Wingdings Translator",
    type: "website",
  },
};

export default function RussianWingdingsPage() {
  return (
    <ToolLandingPage
      eyebrow="Переводчик"
      title="Wingdings переводчик"
      description="Эта статическая страница создана для русскоязычных запросов вроде виндингс переводчик. Здесь можно быстро сгенерировать символы Wingdings из обычного текста или вставить символы и расшифровать их обратно."
      pageUrl={pageUrl}
      breadcrumbs={[
        { name: "Wingdings Translator", url: siteUrl },
        { name: "Wingdings переводчик", url: pageUrl },
      ]}
      tool={{
        slug: "wingdings",
        shortName: "Переводчик",
        placeholder: "Введите текст для конвертации в Wingdings...",
        sampleInput: "secret message",
        sampleOutputLabel: "Результат Wingdings",
        converterUi: {
          leftEyebrow: "Текст",
          leftTitle: "Обычный текст",
          leftDescriptionEncode:
            "Введите здесь текст, чтобы сразу получить символы Wingdings.",
          leftDescriptionDecode:
            "Расшифрованный текст появится здесь, когда вы вставите символы справа.",
          rightEyebrow: "Символы",
          rightTitle: "Текст в Wingdings",
          rightPlaceholder: "Вставьте символы Wingdings сюда для расшифровки...",
          rightDescriptionEncode:
            "Сгенерированный результат появится здесь и будет готов для копирования.",
          rightDescriptionDecode:
            "Вставьте строку символов сюда, чтобы перевести ее обратно в читаемый текст.",
        },
      }}
      sections={[
        {
          title: "Зачем нужна отдельная русская страница",
          body: [
            "Даже если сам инструмент универсален, локализованная страница лучше соответствует запросам пользователей, которые ищут переводчик Wingdings на русском языке.",
            "Мы используем тот же основной движок, но адаптируем заголовок, описание и FAQ под локальный поисковый интент.",
          ],
        },
        {
          title: "Как пользоваться переводчиком",
          body: [
            "Введите обычный текст в левое поле, чтобы получить символы. Если у вас уже есть строка символов Wingdings, вставьте ее в правое поле для расшифровки.",
            "Если результат выглядит странно, попробуйте другой preset: разные сайты нередко используют разные таблицы соответствия.",
          ],
        },
      ]}
      faq={[
        {
          question: "Можно ли перевести Wingdings обратно в обычный текст?",
          answer:
            "Да. Вставьте символы в правую панель, и инструмент попытается расшифровать их в читаемый текст.",
        },
        {
          question: "Можно ли также генерировать Wingdings из обычного текста?",
          answer:
            "Да. Введите обычный текст слева, и вы получите строку символов, которую можно скопировать.",
        },
        {
          question: "Что делать, если расшифровка выглядит неправильно?",
          answer:
            "Попробуйте другой preset. Часто проблема не в сообщении, а в том, что источник использовал другую таблицу символов.",
        },
      ]}
    />
  );
}
