"use client";
import { useEffect, useState } from "react";

type ToastType = { id: number; message: string; type: "success" | "error" };
let addToast: (message: string, type: "success" | "error") => void;

export const toast = {
  success: (msg: string) => addToast && addToast(msg, "success"),
  error: (msg: string) => addToast && addToast(msg, "error"),
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  useEffect(() => {
    addToast = (message, type) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        3000,
      );
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-md shadow-lg text-white font-medium animate-in slide-in-from-top-2 ${
            t.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
