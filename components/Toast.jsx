'use client';

import { useEffect, useState } from 'react';

const ICONS = {
  success: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

const STYLES = {
  success: {
    bar:    'bg-green-500',
    icon:   'bg-green-500/20 text-green-400 border-green-500/30',
    border: 'border-green-500/20',
  },
  error: {
    bar:    'bg-ff-red',
    icon:   'bg-red-500/20 text-red-400 border-red-500/30',
    border: 'border-red-500/20',
  },
  info: {
    bar:    'bg-ff-orange',
    icon:   'bg-orange-500/20 text-ff-orange border-orange-500/30',
    border: 'border-ff-orange/20',
  },
  warning: {
    bar:    'bg-ff-amber',
    icon:   'bg-amber-500/20 text-amber-400 border-amber-500/30',
    border: 'border-amber-500/20',
  },
};

/** Single toast item */
function ToastItem({ id, type = 'info', message, onRemove }) {
  const [exiting, setExiting] = useState(false);
  const style = STYLES[type] || STYLES.info;

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => onRemove(id), 300);
  };

  useEffect(() => {
    const timer = setTimeout(dismiss, 3800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${exiting ? 'toast-exit' : 'toast-enter'} relative glass-card border ${style.border} rounded-xl overflow-hidden flex items-start gap-3 p-4 min-w-[280px] max-w-[360px] shadow-card`}
      role="alert"
    >
      {/* Left color bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.bar}`} />

      {/* Icon */}
      <div className={`flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center ${style.icon}`}>
        {ICONS[type]}
      </div>

      {/* Message */}
      <p className="flex-1 text-sm font-rajdhani font-medium text-ff-text leading-snug pt-0.5">
        {message}
      </p>

      {/* Close */}
      <button
        onClick={dismiss}
        className="flex-shrink-0 text-ff-subtext hover:text-ff-text transition-colors p-0.5"
        aria-label="Dismiss notification"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/** Toast container — renders list of toasts */
export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts.length) return null;

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col gap-2 items-end"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onRemove={onRemove} />
      ))}
    </div>
  );
}

/** Hook for managing toasts */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    toasts,
    removeToast,
    toast: {
      success: (msg) => addToast(msg, 'success'),
      error:   (msg) => addToast(msg, 'error'),
      info:    (msg) => addToast(msg, 'info'),
      warning: (msg) => addToast(msg, 'warning'),
    },
  };
}
