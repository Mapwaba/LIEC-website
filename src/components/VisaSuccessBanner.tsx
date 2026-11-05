"use client";

import React from "react";
import Link from "next/link";
import { useCampaignStatus } from "@/lib/useCampaignStatus";

export default function VisaSuccessBanner() {
  const isActive = useCampaignStatus("visaSuccess");

  if (!isActive) return null;

  return (
    <aside
      aria-label="Célébration Réussite Visa"
      className="relative w-full bg-gradient-to-r from-[#002452] via-[#153a70] to-[#002452] text-surface border-y border-[#ffdf9e]/20 shadow-md overflow-hidden"
    >
      {/* Subtle celebratory ambient glow */}
      <div className="pointer-events-none absolute -top-12 left-1/4 h-32 w-64 rounded-full bg-[#ffdf9e]/10 blur-2xl"></div>
      <div className="pointer-events-none absolute -bottom-12 right-1/4 h-32 w-64 rounded-full bg-[#75f7e7]/10 blur-2xl"></div>

      <div className="max-w-6xl mx-auto px-margin-mobile lg:px-margin py-4 sm:py-5 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 text-center lg:text-left">
        {/* Centered content block: Badge + Headline + Supporting message */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          {/* Attractive celebratory badge with animated sway and golden aura */}
          <div className="visa-success-sway inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ffdf9e]/20 via-[#ffdf9e]/15 to-[#ffdf9e]/20 border border-[#ffdf9e]/40 text-[#ffdf9e] shadow-[0_0_16px_rgba(255,223,158,0.22)] shrink-0">
            <span
              className="material-symbols-outlined notranslate text-lg shrink-0 text-[#ffdf9e]"
              translate="no"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <span className="font-label-sm text-xs sm:text-[13px] uppercase font-black tracking-wider whitespace-nowrap">
              100 % DE RÉUSSITE VISA
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffdf9e]/25 border border-[#ffdf9e]/30 text-[#ffdf9e] text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap">
              pour l'année 2025–2026 !
            </span>
          </div>

          {/* Editorial message and transparent legal note */}
          <div className="flex flex-col justify-center">
            <p className="font-body-md text-xs sm:text-sm md:text-[15px] text-surface font-semibold leading-snug">
              Une nouvelle étape franchie avec nos étudiants. Leur réussite est notre plus belle récompense.
            </p>
            <p className="text-[11px] sm:text-xs text-[#ffdf9e]/85 mt-1 leading-normal font-normal">
              Résultats certifiés session 2025–2026 • Les décisions de visa relèvent exclusivement des consulats de France.
            </p>
          </div>
        </div>

        {/* Yellow Button centered in the middle without overlapping */}
        <div className="shrink-0 flex justify-center items-center">
          <Link
            href="/demarrer-mon-projet"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffdf9e] text-[#002452] font-label-sm text-xs uppercase font-bold tracking-wider shadow-sm hover:bg-[#f4bf40] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
          >
            <span>Préparer mon projet d'études</span>
            <span className="material-symbols-outlined notranslate text-sm" translate="no">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
