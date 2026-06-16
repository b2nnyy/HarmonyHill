export const HOURLY_RATE = 45;
export const MIN_BOOKING_HOURS = 1;
export const MAX_BOOKING_HOURS = 12;
export const LEAD_TIME_HOURS = 2;

export const SERVICES = ["vocal tracking", "mixing", "mastering"] as const;

export type ServiceType = (typeof SERVICES)[number];

export type AvailabilityEvent = {
  id: string;
  start: string;
  end: string;
  title: string;
};

export type BookingPayload = {
  name: string;
  email: string;
  service: ServiceType;
  start: string;
  end: string;
  notes?: string;
};

type AvailabilityResponse = {
  ok: boolean;
  events?: AvailabilityEvent[];
  error?: string;
};

type BookingResponse = {
  ok: boolean;
  bookingId?: string;
  message?: string;
  error?: string;
};

function ensureScriptUrl(apiBaseUrl: string) {
  if (!apiBaseUrl) {
    throw new Error(
      "Missing booking API URL. Set NEXT_PUBLIC_BOOKING_API_URL in your environment.",
    );
  }

  return apiBaseUrl.replace(/\/+$/, "");
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateHours(start: Date, end: Date) {
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
}

export function getBookingTotal(start: Date, end: Date) {
  return calculateHours(start, end) * HOURLY_RATE;
}

export function isWithinLeadTime(start: Date, now: Date = new Date()) {
  const leadMs = LEAD_TIME_HOURS * 60 * 60 * 1000;
  return start.getTime() - now.getTime() < leadMs;
}

export function intersects(
  candidateStart: Date,
  candidateEnd: Date,
  eventStartIso: string,
  eventEndIso: string,
) {
  const eventStart = new Date(eventStartIso).getTime();
  const eventEnd = new Date(eventEndIso).getTime();
  const start = candidateStart.getTime();
  const end = candidateEnd.getTime();

  return start < eventEnd && end > eventStart;
}

export async function fetchAvailability(
  apiBaseUrl: string,
  start: Date,
  end: Date,
) {
  const scriptUrl = ensureScriptUrl(apiBaseUrl);
  const url = new URL(scriptUrl);
  url.searchParams.set("action", "availability");
  url.searchParams.set("start", start.toISOString());
  url.searchParams.set("end", end.toISOString());

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });
  const data = (await response.json()) as AvailabilityResponse;

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Unable to load availability.");
  }

  return data.events ?? [];
}

export async function createBooking(apiBaseUrl: string, payload: BookingPayload) {
  const scriptUrl = ensureScriptUrl(apiBaseUrl);
  const url = new URL(scriptUrl);
  url.searchParams.set("action", "book");

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as BookingResponse;

  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Unable to complete booking.");
  }

  return data;
}
