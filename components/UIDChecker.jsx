'use client';

import { useState, useRef, useCallback } from 'react';
import PlayerCard from './PlayerCard';
import LoadingSkeleton from './LoadingSkeleton';
import { checkPlayer } from '@/services/playerService';
import { validateUID, sanitizeUID, looksLikeUID } from '@/utils/validation';

export default function UIDChecker({ toast }) {
  const [uid,     setUID]     = useState('');
  const [status,  setStatus]  = useState('idle');   // idle | loading | success | error
  const [player,  setPlayer]  = useState(null);
  const [error,   setError]   = useState('');
  const [inputErr, setInputErr] = useState('');
  const inputRef = useRef(null);

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

  /* ── Input handler ─────────────────────────────────────────── */
  const handleInput = (e) => {
    const raw  = e.target.value;
    const safe = sanitizeUID(raw);
    setUID(safe);
    setInputErr('');
    if (isSuccess) { setStatus('idle'); setPlayer(null); }
  };

  /* ── Submit ─────────────────────────────────────────────────── */
  const handleSubmit = useCallback(async () => {
    // Client-side validation
    const validation = validateUID(uid);
    if (!validation.valid) {
      setInputErr(validation.message);
      inputRef.current?.focus();
      return;
    }

    setStatus('loading');
    setError('');
    setPlayer(null);
    setInputErr('');

    try {
      const data = await checkPlayer(uid);
      setPlayer(data);
      setStatus('success');
      toast.success(`Player "${data.nickname}" found!`);
    } catch (err) {
      setStatus('error');
      const msg = err.message || 'Something went wrong. Please try again.';
      setError(msg);
      toast.error(msg);
    }
  }, [uid, toast]);

  /* ── Key handler ─────────────────────────────────────────────── */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) handleSubmit();
  };

  /* ── Reset ───────────────────────────────────────────────────── */
  const handleReset = () => {
    setUID('');
    setStatus('idle');
    setPlayer(null);
    setError('');
    setInputErr('');
    inputRef.current?.focus();
  };

  const ready = looksLikeUID(uid);

  return (
    <section className="max-w-2xl mx-auto px-4 pb-16 space-y-6">

      {/* ── Input card ─────────────────────────────────────── */}
      <div className="relative glass-card rounded-2xl p-6 sm:p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="corner-tl" /><div className="corner-tr" />
        <div className="corner-bl" /><div className="corner-br" />

        {/* Label */}
        <label htmlFor="uid-input" className="block text-[10px] font-orbitron text-ff-subtext tracking-[0.25em] uppercase mb-3">
          Enter Free Fire UID
        </label>

        {/* Input + button */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            {/* Prefix icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-4 h-4 text-ff-subtext" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
              </svg>
            </div>

            <input
              ref={inputRef}
              id="uid-input"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={12}
              value={uid}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="e.g. 123456789"
              disabled={isLoading}
              className="ff-input w-full h-12 sm:h-14 pl-11 pr-4 rounded-xl text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              aria-describedby={inputErr ? 'uid-error' : undefined}
              aria-invalid={!!inputErr}
              autoComplete="off"
              spellCheck={false}
            />

            {/* Clear button */}
            {uid && !isLoading && (
              <button
                onClick={handleReset}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-ff-subtext hover:text-ff-text transition-colors"
                aria-label="Clear input"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !uid}
            className={`btn-glow flex-shrink-0 h-12 sm:h-14 px-5 sm:px-7 rounded-xl font-orbitron font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
              isLoading
                ? 'bg-ff-orange/20 border border-ff-orange/30 text-ff-orange/60 cursor-not-allowed'
                : ready
                  ? 'bg-gradient-to-r from-ff-orange to-ff-amber text-ff-darker hover:opacity-90 shadow-glow-orange'
                  : 'bg-ff-muted border border-ff-border text-ff-subtext cursor-not-allowed opacity-60'
            }`}
            aria-label="Check player"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-ff-orange/40 border-t-ff-orange rounded-full animate-spin" />
                <span className="hidden sm:inline">CHECKING</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">CHECK</span>
              </>
            )}
          </button>
        </div>

        {/* Inline validation error */}
        {inputErr && (
          <p id="uid-error" className="mt-2 text-xs text-red-400 font-rajdhani flex items-center gap-1.5" role="alert">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {inputErr}
          </p>
        )}

        {/* Character counter */}
        {uid && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-0.5 bg-ff-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width:      `${(uid.length / 12) * 100}%`,
                  background: uid.length < 6 ? '#FF2D55' : '#FF6B00',
                }}
              />
            </div>
            <span className="text-[10px] font-orbitron text-ff-subtext">{uid.length}/12</span>
          </div>
        )}

        {/* Tip */}
        <p className="mt-4 text-[11px] font-rajdhani text-ff-subtext tracking-wide leading-relaxed">
          <span className="text-ff-orange font-semibold">TIP:</span> Your Free Fire UID is visible in-game under your profile icon.
        </p>
      </div>

      {/* ── Loading skeleton ───────────────────────────────── */}
      {isLoading && <LoadingSkeleton />}

      {/* ── Player result ──────────────────────────────────── */}
      {isSuccess && player && (
        <PlayerCard
          player={player}
          onCopied={(msg) => toast.success(msg)}
          onCopyError={(msg) => toast.error(msg)}
        />
      )}

      {/* ── Error card ─────────────────────────────────────── */}
      {status === 'error' && error && (
        <div className="relative glass-card rounded-2xl p-6 border border-red-500/20 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-orbitron font-bold text-sm text-red-400 mb-1 tracking-wide">LOOKUP FAILED</h3>
              <p className="text-sm font-rajdhani text-ff-subtext leading-relaxed">{error}</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="mt-4 w-full sm:w-auto btn-glow px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs tracking-widest bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
          >
            TRY AGAIN
          </button>
        </div>
      )}
    </section>
  );
}
