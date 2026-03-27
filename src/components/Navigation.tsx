import Link from "next/link";
import Logo from "./Logo";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-3 py-3 sm:px-5 xl:px-8">
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-sky-50 hover:text-sky-700"
          >
            Wingdings
          </Link>
          <Link
            href="/subscript-generator"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-sky-50 hover:text-sky-700"
          >
            Subscript
          </Link>
          <Link
            href="/cursive-generator"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-sky-50 hover:text-sky-700"
          >
            Cursive
          </Link>
          <Link
            href="/old-english-translator"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-sky-50 hover:text-sky-700"
          >
            Old English
          </Link>
          <Link
            href="/faq"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-sky-300 hover:bg-sky-50"
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
}
