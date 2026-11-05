/**
 * Central configuration and expiration logic for temporary marketing & celebration campaigns.
 *
 * All dates are pegged to Africa/Kinshasa timezone (UTC+1, WAT).
 */

export interface CampaignConfig {
  id: string;
  name: string;
  startDateIso: string; // ISO 8601 with +01:00 timezone
  endDateIso: string;   // ISO 8601 with +01:00 timezone
  timezone: string;
}

export const CAMPAIGN_CONFIGS = {
  // 100% Visa success celebration: 4 calendar months (5 Nov 2026 -> 5 Mar 2027)
  visaSuccess: {
    id: "visa-success-celebration",
    name: "Célébration 100% Réussite Visa",
    startDateIso: "2026-11-05T00:00:00+01:00",
    endDateIso: "2027-03-05T23:59:59+01:00",
    timezone: "Africa/Kinshasa",
  },
  // 5% Rentrée 2027-2028 promo: 2 months (7 Nov 2026 -> 7 Jan 2027)
  promo2027: {
    id: "promo-rentree-2027-2028",
    name: "Offre Rentrée 2027-2028 (-5%)",
    startDateIso: "2026-11-07T00:00:00+01:00",
    endDateIso: "2027-01-07T23:59:59+01:00",
    timezone: "Africa/Kinshasa",
  },
} as const;

export type CampaignKey = keyof typeof CAMPAIGN_CONFIGS;

/**
 * Checks whether a given campaign is currently active based on Kinshasa time.
 * Can accept an optional `referenceDate` for deterministic testing.
 */
export function isCampaignActive(key: CampaignKey, referenceDate?: Date): boolean {
  const config = CAMPAIGN_CONFIGS[key];
  if (!config) return false;

  const nowMs = (referenceDate || new Date()).getTime();
  const startMs = new Date(config.startDateIso).getTime();
  const endMs = new Date(config.endDateIso).getTime();

  return nowMs >= startMs && nowMs <= endMs;
}
