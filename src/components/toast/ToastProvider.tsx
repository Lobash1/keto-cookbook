"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastType = "success" | "error" | "info";

type ToastState = {
  open: boolean;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastView({
  open,
  message,
  type,
  onClose,
}: ToastState & { onClose: () => void }) {
  if (!open) return null;

  const styles =
    type === "success"
      ? "border-ketoGold bg-black/90 text-ketoGold shadow-[0_0_30px_rgba(240,184,72,0.35)]"
      : type === "error"
      ? "border-red-500 bg-black/90 text-red-300 shadow-[0_0_30px_rgba(239,68,68,0.35)]"
      : "border-ketoRed bg-black/90 text-ketoWhite shadow-[0_0_30px_rgba(220,38,38,0.25)]";

  return (
    <div className="fixed top-12 left-1/2 z-50 -translate-x-1/2 animate-toast">
      <div
        className={`flex items-center gap-4 rounded-2xl border px-6 py-4 backdrop-blur-md ${styles}`}
      >
        <span className="text-base font-medium">{message}</span>

        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-sm opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    type: "info",
  });

  const [timerId, setTimerId] = useState<number | null>(null);

  const close = useCallback(() => {
    if (timerId) window.clearTimeout(timerId);
    setTimerId(null);
    setToast((t) => ({ ...t, open: false }));
  }, [timerId]);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 2500) => {
      if (timerId) window.clearTimeout(timerId);

      setToast({ open: true, message, type });

      const id = window.setTimeout(() => {
        setToast((t) => ({ ...t, open: false }));
        setTimerId(null);
      }, duration);

      setTimerId(id);
    },
    [timerId]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastView {...toast} onClose={close} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
