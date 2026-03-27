import Link from "next/link";
import Logo from "./Logo";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[#d8e5dc] bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-3 py-3 sm:px-5 xl:px-8">
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            Wingdings
          </Link>
          <Link
            href="/subscript-generator"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            Subscript
          </Link>
          <Link
            href="/cursive-generator"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            Cursive
          </Link>
          <Link
            href="/old-english-translator"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            Old English
          </Link>
          <Link
            href="/faq"
            className="rounded-full border border-[#cfe2d6] px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
}
