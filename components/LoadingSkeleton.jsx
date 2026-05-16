'use client';

export default function LoadingSkeleton() {
  return (
    <div className="relative glass-card rounded-2xl p-6 sm:p-8 overflow-hidden animate-fade-in">
      {/* Corner decorations */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      {/* Scan line */}
      <div className="scan-effect absolute inset-0 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar skeleton */}
        <div className="flex-shrink-0 relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full skeleton" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full skeleton" />
        </div>

        {/* Text skeletons */}
        <div className="flex-1 w-full space-y-4">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded skeleton" />
            <div className="h-8 w-48 rounded skeleton" />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="h-8 w-24 rounded-full skeleton" />
            <div className="h-8 w-20 rounded-full skeleton" />
          </div>

          <div className="h-px w-full skeleton rounded" />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="h-3 w-12 rounded skeleton" />
              <div className="h-5 w-28 rounded skeleton" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-16 rounded skeleton" />
              <div className="h-5 w-20 rounded skeleton" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading label */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-ff-orange animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <span className="text-xs font-orbitron text-ff-subtext tracking-widest uppercase">
          Fetching Player Data
        </span>
      </div>
    </div>
  );
}
