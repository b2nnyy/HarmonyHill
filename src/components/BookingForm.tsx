"use client";

import {
  HOURLY_RATE,
  LEAD_TIME_HOURS,
  MAX_BOOKING_HOURS,
  MIN_BOOKING_HOURS,
  SERVICES,
  formatMoney,
} from "@/lib/booking";
import type { ServiceType } from "@/lib/booking";

const STUDIO_TIME_ZONE = "America/New_York";

type BookingFormProps = {
  selectedStart: Date | null;
  durationHours: number;
  service: ServiceType;
  name: string;
  email: string;
  notes: string;
  isSubmitting: boolean;
  statusMessage: string | null;
  onChange: (field: "name" | "email" | "notes", value: string) => void;
  onDurationChange: (value: number) => void;
  onServiceChange: (value: ServiceType) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function formatDateTime(value: Date | null) {
  if (!value) {
    return "Choose a time on the calendar";
  }
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: STUDIO_TIME_ZONE,
    timeZoneName: "short",
  }).format(value);
}

export function BookingForm({
  selectedStart,
  durationHours,
  service,
  name,
  email,
  notes,
  isSubmitting,
  statusMessage,
  onChange,
  onDurationChange,
  onServiceChange,
  onSubmit,
}: BookingFormProps) {
  const selectedEnd = selectedStart
    ? new Date(selectedStart.getTime() + durationHours * 60 * 60 * 1000)
    : null;
  const total = durationHours * HOURLY_RATE;
  const isSuccess = statusMessage?.toLowerCase().includes("confirmed");
  const isWarning =
    statusMessage &&
    !isSuccess &&
    (statusMessage.toLowerCase().includes("missing") ||
      statusMessage.toLowerCase().includes("unable") ||
      statusMessage.toLowerCase().includes("overlap") ||
      statusMessage.toLowerCase().includes("advance"));

  return (
    <div className="glass-panel rounded-[1.75rem] p-6">
      <p className="section-kicker">Session Request</p>
      <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">Book Your Session</h3>
      <p className="mt-2 text-sm leading-6 text-text-muted">
        $45 per hour. Select your hours on the calendar or adjust the session length
        here. Book at least {LEAD_TIME_HOURS} hours before the session starts.
      </p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
              Name
            </span>
            <input
              required
              value={name}
              onChange={(event) => onChange("name", event.target.value)}
              className="w-full rounded-2xl px-4 py-3"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
              Email
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => onChange("email", event.target.value)}
              className="w-full rounded-2xl px-4 py-3"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
              Service
            </span>
            <select
              value={service}
              onChange={(event) => onServiceChange(event.target.value as ServiceType)}
              className="w-full rounded-2xl px-4 py-3 capitalize"
            >
              {SERVICES.map((value) => (
                <option key={value} value={value} className="capitalize">
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
              Session Length
            </span>
            <select
              value={durationHours}
              onChange={(event) => onDurationChange(Number(event.target.value))}
              className="w-full rounded-2xl px-4 py-3"
            >
              {Array.from(
                { length: MAX_BOOKING_HOURS - MIN_BOOKING_HOURS + 1 },
                (_, index) => MIN_BOOKING_HOURS + index,
              ).map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} hour{hours > 1 ? "s" : ""}
                  </option>
                ))}
            </select>
            <span className="block text-xs leading-5 text-text-muted">
              This updates automatically when you select hours on the calendar.
            </span>
          </label>
        </div>

        <label className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">
            Session Notes
          </span>
          <textarea
            value={notes}
            onChange={(event) => onChange("notes", event.target.value)}
            className="min-h-28 w-full rounded-2xl px-4 py-3"
            placeholder="Share references, track count, or goals for this session."
          />
        </label>

        <div className="rounded-2xl border border-accent-warm/20 bg-black/25 p-5">
          <div className="space-y-2 text-sm">
            <p className="text-text-muted">
              Start: <span className="font-bold text-foreground">{formatDateTime(selectedStart)}</span>
            </p>
            <p className="text-text-muted">
              End: <span className="font-bold text-foreground">{formatDateTime(selectedEnd)}</span>
            </p>
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
              Estimated Total
            </p>
            <p className="mt-1 text-4xl font-black tracking-[-0.05em] text-accent-warm">
              {formatMoney(total)}
            </p>
            <p className="text-xs text-text-muted">
              {durationHours} hour{durationHours > 1 ? "s" : ""} x{" "}
              {formatMoney(HOURLY_RATE)}/hour
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !selectedStart}
          className="premium-button w-full rounded-2xl bg-accent-strong px-4 py-3.5 font-black text-[#03130d] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/45 disabled:shadow-none"
        >
          {isSubmitting ? "Booking..." : "Book Session"}
        </button>

        {statusMessage ? (
          <p
            className={`rounded-2xl border px-4 py-3 text-sm font-bold ${
              isSuccess
                ? "border-accent/25 bg-accent/10 text-accent"
                : isWarning
                  ? "border-danger/30 bg-danger/10 text-red-100"
                  : "border-white/10 bg-white/5 text-text-muted"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}
