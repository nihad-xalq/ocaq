"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ToastItem = {
  id: number;
  message: string;
};

type ToastContextValue = {
  success: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

type ToastProviderProps = {
  children: ReactNode;
  dismissLabel: string;
};

export function ToastProvider({ children, dismissLabel }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutsRef = useRef(new Map<number, number>());
  const nextId = useRef(0);
  const regionId = useId();

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      window.clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const success = useCallback(
    (message: string) => {
      const id = ++nextId.current;
      setToasts((current) => [...current, { id, message }]);
      const timeout = window.setTimeout(() => dismiss(id), 4500);
      timeoutsRef.current.set(id, timeout);
    },
    [dismiss],
  );

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ success }}>
      {children}
      <div
        id={regionId}
        className="pointer-events-none fixed top-20 right-5 z-60 flex w-[min(100%-2.5rem,24rem)] flex-col gap-2"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="toast-in pointer-events-auto flex items-start gap-3 rounded-xl border border-primary/25 bg-surface px-4 py-3 shadow-[0_16px_40px_-18px_rgba(30,37,44,0.35)]"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-dark">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12.5 9.5 17 19 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="flex-1 pt-0.5 text-sm leading-relaxed text-secondary">
              {toast.message}
            </p>
            <button
              type="button"
              aria-label={dismissLabel}
              onClick={() => dismiss(toast.id)}
              className="mt-0.5 cursor-pointer rounded-md p-1 text-muted transition-colors hover:bg-primary-soft hover:text-secondary"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
