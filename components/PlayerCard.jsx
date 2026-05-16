'use client';

import { useState } from 'react';
import Image from 'next/image';
import { copyToClipboard, getRegionInfo, truncateNickname, uidToColor } from '@/utils/helpers';

export default function PlayerCard({ player, onCopied, onCopyError }) {
  const [imgError, setImgError]     = useState(false);
  const [copyState, setCopyState]   = useState('idle'); // idle | copied

  const { uid, nickname, region, img_url, open_id } = player;
  const regionInfo = getRegionInfo(region);
  const avatarColor = uidToColor(uid);

  const handleCopyUID = async () => {
    const ok = await copyToClipboard(uid);
    if (ok) {
      setCopyState('copied');
      onCopied?.(`UID ${uid} copied!`);
      setTimeout(() => setCopyState('idle'), 2000);
    } else {
      onCopyError?.('Failed to copy UID.');
    }
  };

  return (
    <div className="relative glass-card glass-card-hover rounded-2xl p-6 sm:p-8 overflow-hidden animate-slide-up">
      {/* Corner decorations */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />

      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: avatarColor }}
      />

      {/* Top row: avatar + info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">

        {/* ── Avatar ────────────────────────────────────── */}
        <div className="flex-shrink-0 relative animate-float">
          {/* Spinning ring */}
          <div className="absolute -inset-1 rounded-full avatar-ring opacity-80" />

          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-ff-card border-2 border-ff-card">
            {img_url && !imgError ? (
              <Image
                src={img_url}
                alt={`${nickname} avatar`}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                unoptimized
              />
            ) : (
              /* Fallback avatar */
              <div
                className="w-full h-full flex items-center justify-center text-4xl font-orbitron font-black"
                style={{ background: `linear-gradient(135deg, ${avatarColor}33, ${avatarColor}11)`, color: avatarColor }}
              >
                {(nickname?.[0] || '?').toUpperCase()}
              </div>
            )}
          </div>

          {/* Online indicator */}
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-ff-darker" />
        </div>

        {/* ── Player info ────────────────────────────────── */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          {/* Label */}
          <p className="text-[10px] font-orbitron text-ff-subtext tracking-[0.25em] uppercase mb-1">
            Player Found
          </p>

          {/* Nickname */}
          <h2
            className="font-orbitron font-black text-2xl sm:text-3xl text-gradient leading-tight mb-3"
            title={nickname}
          >
            {truncateNickname(nickname, 20)}
          </h2>

          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
            {/* Region badge */}
            <span className="region-badge rounded-full px-3 py-1 text-xs font-orbitron font-semibold text-ff-amber tracking-wider flex items-center gap-1.5">
              <span>{regionInfo.flag}</span>
              <span>{region?.toUpperCase() || 'N/A'}</span>
            </span>

            {/* Verified badge */}
            <span className="rounded-full px-3 py-1 text-xs font-rajdhani font-semibold tracking-wider flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              VERIFIED
            </span>
          </div>

          {/* Divider */}
          <div className="ff-divider mb-4" />

          {/* Detail grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DetailField label="REGION" value={`${regionInfo.flag} ${regionInfo.label}`} />
            {open_id && <DetailField label="OPEN ID" value={open_id} mono />}
          </div>
        </div>
      </div>

      {/* ── Bottom: UID + copy button ─────────────────────────── */}
      <div className="mt-6 relative z-10">
        <div className="ff-divider mb-4" />
        <div className="flex flex-col sm:flex-row items-center gap-3">

          {/* UID display */}
          <div className="flex-1 w-full flex items-center gap-3 bg-ff-darker border border-ff-border rounded-xl px-4 py-3">
            <span className="text-[10px] font-orbitron text-ff-subtext tracking-widest uppercase flex-shrink-0">
              UID
            </span>
            <span className="font-orbitron font-bold text-ff-orange text-sm sm:text-base tracking-widest flex-1 text-center sm:text-left">
              {uid}
            </span>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopyUID}
            className={`btn-glow flex items-center gap-2 px-5 py-3 rounded-xl font-orbitron font-bold text-xs sm:text-sm tracking-wider transition-all duration-300 flex-shrink-0 ${
              copyState === 'copied'
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-ff-orange/10 border border-ff-orange/40 text-ff-orange hover:bg-ff-orange/20'
            }`}
            aria-label="Copy UID"
          >
            {copyState === 'copied' ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                COPIED!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                COPY UID
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Small reusable field ─────────────────────────────────────── */
function DetailField({ label, value, mono = false }) {
  return (
    <div>
      <p className="text-[9px] font-orbitron text-ff-subtext tracking-[0.2em] uppercase mb-0.5">
        {label}
      </p>
      <p className={`text-ff-text text-sm font-semibold ${mono ? 'font-orbitron tracking-wider' : 'font-rajdhani'}`}>
        {value}
      </p>
    </div>
  );
}
