"use client";

import { Fragment } from "react";
import type { AvailabilityEvent } from "@/lib/booking";
import { intersects, isWithinLeadTime } from "@/lib/booking";

type BookingCalendarProps = {
  weekStart: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  events: AvailabilityEvent[];
  onSelectSlot: (slotStart: Date) => void;
};

function formatDayLabel(day: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(day);
}

function formatDayDate(day: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(day);
}

function formatHour(hour: number) {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  }).format(date);
}

function getWeekDays(weekStart: Date) {
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + index);
    day.setHours(0, 0, 0, 0);
    return day;
  });
}

export function BookingCalendar({
  weekStart,
  selectedStart,
  selectedEnd,
  events,
  onSelectSlot,
}: BookingCalendarProps) {
  const weekDays = getWeekDays(weekStart);
  const legend = [
    { label: "Available", className: "bg-[var(--slot-open)]" },
    { label: "Booked", className: "bg-danger" },
    { label: "2h rule", className: "bg-[var(--slot-muted)]" },
    { label: "Selected", className: "bg-accent-warm" },
  ];

  return (
    <div className="glass-panel rounded-3xl p-4 md:p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Live Calendar</p>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
            Studio Availability
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {legend.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-text-muted"
            >
              <span className={`size-2.5 rounded-full ${item.className}`} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <div className="max-h-[650px] overflow-auto rounded-[1.35rem] border border-white/10 bg-black/30 p-1 shadow-inner shadow-black/40">
        <div className="booking-grid">
          <div className="booking-grid-header booking-corner rounded-xl bg-panel-alt p-3 text-center text-xs font-black uppercase tracking-[0.12em] text-text-muted">
            Time
          </div>
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="booking-grid-header rounded-xl bg-panel-alt p-3 text-center"
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-foreground">
                {formatDayLabel(day)}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-text-muted">
                {formatDayDate(day)}
              </p>
            </div>
          ))}

          {Array.from({ length: 24 }, (_, hour) => (
            <Fragment key={`row-${hour}`}>
              <div
                key={`time-${hour}`}
                className="booking-hour-label rounded-xl bg-panel-alt p-3 text-center text-[11px] font-bold text-text-muted"
              >
                {formatHour(hour)}
              </div>

              {weekDays.map((day) => {
                const slotStart = new Date(day);
                slotStart.setHours(hour, 0, 0, 0);
                const slotEnd = new Date(slotStart);
                slotEnd.setHours(slotStart.getHours() + 1);

                const booked = events.some((event) =>
                  intersects(slotStart, slotEnd, event.start, event.end),
                );
                const tooSoon = isWithinLeadTime(slotStart);

                const selected =
                  selectedStart &&
                  selectedEnd &&
                  slotStart.getTime() >= selectedStart.getTime() &&
                  slotStart.getTime() < selectedEnd.getTime();

                const stateClass = booked
                  ? "slot-booked"
                  : tooSoon
                    ? "slot-soon"
                    : "slot-available";
                const selectedClass = selected && !booked && !tooSoon ? "slot-selected" : "";
                const label = booked ? "Booked" : tooSoon ? "2h rule" : "Open";

                return (
                  <button
                    key={`${day.toISOString()}-${hour}`}
                    type="button"
                    className={`calendar-slot ${stateClass} ${selectedClass}`}
                    disabled={booked || tooSoon}
                    onClick={() => onSelectSlot(slotStart)}
                    aria-label={`${label} at ${formatHour(hour)} on ${formatDayLabel(day)} ${formatDayDate(day)}`}
                    title={
                      booked
                        ? "Unavailable - booked"
                        : tooSoon
                          ? "Unavailable - must book 2 hours in advance"
                          : "Available"
                    }
                  >
                    <span className="block">{label}</span>
                    <span className="mt-1 block text-[10px] font-semibold opacity-75">
                      {formatHour(hour)}
                    </span>
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
