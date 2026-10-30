"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalErrorCatch({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("LIEC Website Client Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0E2138] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined notranslate text-3xl text-[#FFB74D]" translate="no">
          refresh
        </span>
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Chargement temporairement interrompu</h1>
      <p className="text-slate-300 max-w-md text-sm mb-6 leading-relaxed">
        Une mise à jour ou un problème de connexion a perturbé l'affichage. Vous pouvez recharger la page pour continuer votre navigation en toute sécurité.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-[#E5A83B] text-[#0E2138] font-bold text-sm shadow-lg hover:brightness-105 transition-all"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
