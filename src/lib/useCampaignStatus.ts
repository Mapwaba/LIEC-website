"use client";

import { useState, useEffect } from "react";
import { isCampaignActive, CampaignKey } from "./campaigns";

/**
 * React hook that returns whether a campaign is currently active.
 * Defaults to true initial evaluation to avoid flash of content on SSR,
 * and updates on client mount with the actual local time.
 */
export function useCampaignStatus(key: CampaignKey): boolean {
  const [active, setActive] = useState<boolean>(() => isCampaignActive(key));

  useEffect(() => {
    setActive(isCampaignActive(key));

    // Optional: re-check every minute in long-lived browser tabs
    const interval = setInterval(() => {
      setActive(isCampaignActive(key));
    }, 60000);

    return () => clearInterval(interval);
  }, [key]);

  return active;
}
