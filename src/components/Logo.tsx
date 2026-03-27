export default function Logo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-[1.35rem] border border-sky-200 bg-white shadow-[0_10px_24px_rgba(2,132,199,0.14)] sm:h-12 sm:w-12">
        <div className="absolute inset-[3px] rounded-[1.1rem] bg-[linear-gradient(135deg,_#0f172a,_#0284c7)]" />
        <span className="relative text-lg text-white">✶</span>
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-zinc-900 bg-clip-text text-[2rem] font-black tracking-tight leading-none text-transparent sm:text-[2.25rem]">
          Wingdings Translator
        </span>
        <span className="mt-1 text-[0.95rem] leading-none text-zinc-500">
          Symbols, scripts, and copy-paste text tools
        </span>
      </div>
    </div>
  );
}
