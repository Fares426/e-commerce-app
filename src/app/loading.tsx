export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-neutral-50">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute h-16 w-16 animate-ping rounded-full bg-emerald-200 opacity-75" />
        <span className="absolute h-16 w-16 rounded-full border-2 border-emerald-100" />
        <svg
          className="relative h-8 w-8 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C12 2 7 7.5 7 12.5C7 15.5376 9.23858 18 12 18C14.7614 18 17 15.5376 17 12.5C17 7.5 12 2 12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            className="origin-bottom animate-[grow_1.6s_ease-in-out_infinite]"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium text-slate-700">Loading FreshCart</p>
        <p className="text-xs text-slate-400">Getting today&apos;s picks ready</p>
      </div>

      <style>{`
        @keyframes grow {
          0%, 100% { transform: scaleY(0.85); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}