'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import UIDChecker from '@/components/UIDChecker';
import ToastContainer, { useToast } from '@/components/Toast';

// Dynamically import canvas-heavy component to avoid SSR issues
const ParticleBackground = dynamic(() => import('@/components/ParticleBackground'), {
  ssr: false,
});

export default function HomePage() {
  const { toasts, removeToast, toast } = useToast();

  return (
    <main className="relative min-h-screen bg-ff-darker grid-bg overflow-x-hidden">
      {/* Particle canvas */}
      <ParticleBackground />

      {/* Fixed gradient overlays */}
      <div className="fixed inset-0 bg-gradient-radial from-ff-orange/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Page content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <UIDChecker toast={toast} />

        {/* Footer */}
        <footer className="text-center pb-8 px-4">
          <div className="ff-divider max-w-xs mx-auto mb-6" />
          <p className="text-[11px] font-orbitron text-ff-subtext tracking-widest uppercase">
            FF Lookup &copy; {new Date().getFullYear()} &mdash; Not affiliated with Garena or Free Fire
          </p>
          <p className="mt-2 text-[10px] font-rajdhani text-ff-subtext/60 tracking-wide">
            Data sourced from public player endpoints &bull; Use responsibly
          </p>
        </footer>
      </div>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </main>
  );
}
