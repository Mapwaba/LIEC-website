"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("LIEC Root Global Error:", error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="bg-[#0E2138] text-white min-h-screen flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-3xl">
          ⚠️
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Service momentanément indisponible</h1>
        <p className="text-slate-300 max-w-md text-sm mb-6 leading-relaxed">
          Le site LIEC a rencontré une erreur imprévue. Cliquez sur le bouton ci-dessous pour relancer l'application.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-[#E5A83B] text-[#0E2138] font-bold text-sm shadow-lg hover:brightness-105 transition-all"
        >
          Recharger l'application
        </button>
      </body>
    </html>
  );
}
