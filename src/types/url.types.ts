export type URL = {
  id: number;
  originalUrl: string;
  shortUrl: string;
  expiresAt: string;
  accessCount: number;
};

export type PeriodBusiestType = "Manhã" | "Tarde" | "Noite" | "Madrugada";

export interface URLFromIp {
  urls: URL[];
  periodBusiest: PeriodBusiestType | null;
}
