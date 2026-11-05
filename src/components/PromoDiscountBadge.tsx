"use client";

import React from "react";
import Link from "next/link";
import { useCampaignStatus } from "@/lib/useCampaignStatus";

export default function PromoDiscountBadge() {
  const isActive = useCampaignStatus("promo2027");

  if (!isActive) return null;

  return (
    <div
      role="region"
      aria-label="Offre promotionnelle Rentrée 2027-2028"
      className="p-4 sm:p-4.5 rounded-2xl bg-gradient-to-r from-[#002452]/90 via-[#153a70] to-[#002452]/90 text-surface border border-[#ffdf9e]/30 shadow-lg relative overflow-hidden"
    >
      {/* Decorative accent glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ffdf9e]/15 blur-xl"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-start gap-3">
          {/* Prominent -5% badge */}
          <div className="shrink-0 flex flex-col items-center justify-center px-3 py-1.5 rounded-xl bg-[#ffdf9e] text-[#002452] font-black leading-none shadow-sm">
            <span className="text-base sm:text-lg font-black tracking-tight">-5 %</span>
            <span className="text-[9px] uppercase font-bold tracking-widest mt-0.5">Offre</span>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#ffdf9e] font-bold">
                RENTRÉE ACADÉMIQUE 2027–2028
              </span>
              <span className="text-[10px] text-surface-variant/80 bg-surface/10 px-2 py-0.5 rounded-full">
                Du 7 novembre 2026 au 7 janvier 2027
              </span>
            </div>
            <p className="font-body-sm text-xs sm:text-sm text-surface font-semibold mt-0.5 leading-snug">
              Profitez de 5 % de réduction sur votre inscription avec LIEC.
            </p>
            <p className="font-body-sm text-[11px] text-surface-variant/90 leading-tight mt-0.5">
              Anticipez votre projet d'études en France et bénéficiez de notre offre spéciale de rentrée.
            </p>
          </div>
        </div>

        {/* CTA link */}
        <div className="shrink-0 w-full sm:w-auto flex justify-end">
          <Link
            href="/demarrer-mon-projet"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-secondary text-surface hover:bg-[#72f4e4] hover:text-[#00201c] font-label-sm text-xs font-bold uppercase tracking-wider shadow-sm transition-all duration-200"
          >
            <span>Profiter de l'offre</span>
            <span className="material-symbols-outlined notranslate text-sm" translate="no">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
