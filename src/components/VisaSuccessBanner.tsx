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

      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-4 sm:py-5 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-5">
          {/* Left / Center content: Badge + Headline + Supporting message */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 text-center sm:text-left">
            {/* Elegant celebratory badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffdf9e]/15 border border-[#ffdf9e]/30 text-[#ffdf9e] shrink-0 shadow-sm">
              <span
                className="material-symbols-outlined notranslate text-lg shrink-0"
                translate="no"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
              <span className="font-label-sm text-xs uppercase font-extrabold tracking-wider whitespace-nowrap">
                100 % DE RÉUSSITE VISA !
              </span>
            </div>

            {/* Editorial message and transparent legal note */}
            <div className="flex flex-col justify-center">
              <p className="font-body-md text-xs sm:text-sm md:text-[15px] text-surface font-semibold leading-snug">
                Une nouvelle étape franchie avec nos étudiants. Leur réussite est notre plus belle récompense.
              </p>
              <p className="text-[11px] sm:text-xs text-[#ffdf9e]/85 mt-1 leading-normal font-normal">
                Résultats certifiés cohorte précédente • Les décisions de visa relèvent exclusivement des consulats de France.
              </p>
            </div>
          </div>

          {/* Right CTA */}
          <div className="shrink-0 w-full sm:w-auto flex justify-center items-center">
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
      </div>
    </aside>
  );
}
