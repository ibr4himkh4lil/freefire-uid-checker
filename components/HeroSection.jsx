'use client';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-8 px-4 text-center overflow-hidden">
      {/* Radial hero glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-ff-orange/5 blur-3xl pointer-events-none" />

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-6 animate-slide-up"
        style={{ animationDelay: '0ms' }}
      >
        <span className="text-xs sm:text-sm font-rajdhani font-semibold tracking-widest uppercase text-ff-amber">
          🔥 Free Fire Player Lookup
        </span>
      </div>

      {/* Headline */}
      <h1
        className="font-orbitron font-black text-4xl sm:text-6xl lg:text-7xl leading-none mb-4 animate-slide-up"
        style={{ animationDelay: '80ms' }}
      >
        <span className="text-ff-text block">CHECK YOUR</span>
        <span className="text-gradient-hot block mt-1">FREE FIRE</span>
        <span className="text-ff-text block mt-1">PROFILE</span>
      </h1>

      {/* Sub-headline */}
      <p
        className="max-w-xl mx-auto font-exo text-ff-subtext text-base sm:text-lg leading-relaxed animate-slide-up"
        style={{ animationDelay: '160ms' }}
      >
        Enter any Free Fire UID to instantly retrieve the player&apos;s{' '}
        <span className="text-ff-orange font-semibold">nickname</span>,{' '}
        <span className="text-ff-amber font-semibold">avatar</span>, and{' '}
        <span className="text-ff-red font-semibold">region</span>.
      </p>

      {/* Decorative divider */}
      <div
        className="mt-8 mx-auto w-48 ff-divider animate-fade-in"
        style={{ animationDelay: '240ms' }}
      />

      {/* Stats row */}
      <div
        className="mt-6 flex items-center justify-center gap-8 animate-fade-in"
        style={{ animationDelay: '300ms' }}
      >
        {[
          { value: 'INSTANT', label: 'Results' },
          { value: 'FREE',    label: 'No Login' },
          { value: 'SECURE',  label: 'No Data Stored' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="font-orbitron text-xs sm:text-sm font-bold text-ff-orange tracking-widest">
              {value}
            </div>
            <div className="font-rajdhani text-[10px] text-ff-subtext tracking-wider uppercase mt-0.5">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
