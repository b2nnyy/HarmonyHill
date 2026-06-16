"use client";

import { HOURLY_RATE, SERVICES, formatMoney, getBookingTotal } from "@/lib/booking";
import type { ServiceType } from "@/lib/booking";

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
  const total = selectedStart ? getBookingTotal(selectedStart, selectedEnd!) : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-6">
      <h3 className="text-xl font-semibold">Book Your Session</h3>
      <p className="mt-1 text-sm text-text-muted">
        $45 per hour. Sessions require at least 2 hours lead time.
      </p>

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm text-text-muted">Name</span>
            <input
              required
              value={name}
              onChange={(event) => onChange("name", event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white px-3 py-2"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-text-muted">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => onChange("email", event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white px-3 py-2"
              placeholder="you@example.com"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm text-text-muted">Service</span>
            <select
              value={service}
              onChange={(event) => onServiceChange(event.target.value as ServiceType)}
              className="w-full rounded-lg border border-white/20 bg-white px-3 py-2 capitalize"
            >
              {SERVICES.map((value) => (
                <option key={value} value={value} className="capitalize">
                  {value}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-sm text-text-muted">Duration (hours)</span>
            <select
              value={durationHours}
              onChange={(event) => onDurationChange(Number(event.target.value))}
              className="w-full rounded-lg border border-white/20 bg-white px-3 py-2"
            >
              {Array.from({ length: 8 }, (_, index) => index + 1).map((hours) => (
                <option key={hours} value={hours}>
                  {hours} hour{hours > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="space-y-1">
          <span className="text-sm text-text-muted">Session Notes (optional)</span>
          <textarea
            value={notes}
            onChange={(event) => onChange("notes", event.target.value)}
            className="min-h-28 w-full rounded-lg border border-white/20 bg-white px-3 py-2"
            placeholder="Share references, track count, or goals for this session."
          />
        </label>

        <div className="rounded-lg bg-panel-alt p-4 text-sm">
          <p className="text-text-muted">Start: {formatDateTime(selectedStart)}</p>
          <p className="text-text-muted">End: {formatDateTime(selectedEnd)}</p>
          <p className="mt-1 font-semibold">
            Total: {selectedStart ? formatMoney(total) : "$0"}
          </p>
          <p className="text-xs text-text-muted">Rate: {formatMoney(HOURLY_RATE)}/hour</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !selectedStart}
          className="w-full rounded-lg bg-accent-strong px-4 py-3 font-semibold text-[#042517] disabled:cursor-not-allowed disabled:bg-white/30"
        >
          {isSubmitting ? "Booking..." : "Book Session"}
        </button>

        {statusMessage ? <p className="text-sm text-text-muted">{statusMessage}</p> : null}
      </form>
    </div>
  );
}
