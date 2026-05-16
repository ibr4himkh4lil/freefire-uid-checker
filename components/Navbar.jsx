'use client';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm border-b border-white/5" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Animated hex icon */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 avatar-ring rounded-full opacity-70" />
            <div className="relative w-7 h-7 bg-ff-darker rounded-full flex items-center justify-center">
              <span className="text-sm">🎯</span>
            </div>
          </div>

          <div>
            <span className="font-orbitron font-bold text-base tracking-widest">
              <span className="text-gradient">FF</span>
              <span className="text-ff-text"> LOOKUP</span>
            </span>
            <div className="text-[9px] font-rajdhani text-ff-subtext tracking-[0.2em] uppercase -mt-0.5">
              Free Fire UID Checker
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Status dot */}
          <div className="hidden sm:flex items-center gap-2 glass-card rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-rajdhani text-green-400 font-medium tracking-wide">ONLINE</span>
          </div>

          {/* Version badge */}
          <div className="hidden sm:block">
            <span className="text-[10px] font-orbitron text-ff-subtext border border-ff-border rounded px-2 py-1 tracking-widest">
              v1.0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
