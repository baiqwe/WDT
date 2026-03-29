import Script from "next/script";
import Link from "next/link";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return (
    <>
      <Script
        id={`breadcrumbs-${items.map((item) => item.name).join("-").toLowerCase().replace(/\s+/g, "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-600">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span className="font-medium text-zinc-900">{item.name}</span>
              ) : (
                <Link href={item.url} className="transition-colors hover:text-zinc-900">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
