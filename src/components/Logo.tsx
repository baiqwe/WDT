export default function Logo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[1.15rem] border border-[#cfe2d6] bg-white shadow-[0_10px_24px_rgba(15,118,110,0.14)] sm:h-12 sm:w-12">
        <svg
          viewBox="0 0 512 512"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="44" y="44" width="424" height="424" rx="120" fill="url(#logo-panel)" />
          <rect
            x="44"
            y="44"
            width="424"
            height="424"
            rx="120"
            stroke="#D7F7E8"
            strokeOpacity=".22"
            strokeWidth="8"
          />
          <circle cx="165" cy="153" r="34" fill="#FFB86C" />
          <circle cx="165" cy="153" r="16" fill="#FFF7EA" />
          <path
            d="M154 360C154 292.726 208.726 238 276 238H358"
            stroke="#F4FFF4"
            strokeWidth="34"
            strokeLinecap="round"
          />
          <path d="M344 112L392 160L344 208L296 160L344 112Z" fill="#FFF7EA" />
          <path d="M328 266L398 336L328 406L258 336L328 266Z" fill="#7AE8C0" />
          <path d="M328 292L372 336L328 380L284 336L328 292Z" fill="#123B34" />
          <defs>
            <linearGradient
              id="logo-panel"
              x1="80"
              y1="68"
              x2="432"
              y2="444"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#123B34" />
              <stop offset="1" stopColor="#0B2421" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-[1.85rem] font-black tracking-tight leading-none text-[#0b2421] sm:text-[2.1rem]">
          Wingdings Translator
        </span>
        <span className="mt-1 text-[0.9rem] leading-none text-[#5e6f66]">
          Decode symbols. Build mysterious messages.
        </span>
      </div>
    </div>
  );
}
