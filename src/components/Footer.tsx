import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-[1680px] px-3 py-10 sm:px-5 xl:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">
              Wingdings Translator
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              An authority-style hub for Wingdings, cursive, subscript, and
              other copy-paste text tools.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Tools
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/" className="text-zinc-700 transition hover:text-sky-700">
                  Wingdings Translator
                </Link>
              </li>
              <li>
                <Link
                  href="/subscript-generator"
                  className="text-zinc-700 transition hover:text-sky-700"
                >
                  Subscript Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/cursive-generator"
                  className="text-zinc-700 transition hover:text-sky-700"
                >
                  Cursive Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/old-english-translator"
                  className="text-zinc-700 transition hover:text-sky-700"
                >
                  Old English Translator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Resources
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/faq" className="text-zinc-700 transition hover:text-sky-700">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-zinc-700 transition hover:text-sky-700">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-700 transition hover:text-sky-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-700 transition hover:text-sky-700">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Legal
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-zinc-700 transition hover:text-sky-700"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-zinc-700 transition hover:text-sky-700"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-700 transition hover:text-sky-700">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Wingdings Translator. All rights reserved.</p>
          <p className="max-w-2xl text-left sm:text-right">
            Helpful copy-paste text tools with clear mappings, legal pages, and
            breadcrumb navigation for better crawlability and user trust.
          </p>
        </div>
      </div>
    </footer>
  );
}
