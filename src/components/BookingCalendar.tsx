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

  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Studio Availability (24/7)</h3>
        <p className="text-sm text-text-muted">
          Green = Available, Red = Unavailable, Gray = Under 2h
        </p>
      </div>
      <div className="max-h-[640px] overflow-auto rounded-xl border border-white/10">
        <div className="booking-grid">
          <div className="booking-grid-header bg-panel-alt p-2 text-center text-xs font-semibold text-text-muted">
            Time
          </div>
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className="booking-grid-header bg-panel-alt p-2 text-center text-xs font-semibold text-text-muted"
            >
              {formatDayLabel(day)}
            </div>
          ))}

          {Array.from({ length: 24 }, (_, hour) => (
            <Fragment key={`row-${hour}`}>
              <div
                key={`time-${hour}`}
                className="booking-hour-label bg-panel-alt p-2 text-center text-xs text-text-muted"
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

                const baseClass =
                  "min-h-12 border border-black/10 p-1 text-[11px] transition-colors";
                const stateClass = booked
                  ? "bg-danger/35 cursor-not-allowed"
                  : tooSoon
                    ? "bg-white/10 cursor-not-allowed"
                    : "bg-accent/45 hover:bg-accent/65 cursor-pointer";
                const selectedClass = selected
                  ? "ring-2 ring-accent-strong ring-inset"
                  : "";

                return (
                  <button
                    key={`${day.toISOString()}-${hour}`}
                    type="button"
                    className={`${baseClass} ${stateClass} ${selectedClass}`}
                    disabled={booked || tooSoon}
                    onClick={() => onSelectSlot(slotStart)}
                    title={
                      booked
                        ? "Unavailable - booked"
                        : tooSoon
                          ? "Unavailable - must book 2 hours in advance"
                          : "Available"
                    }
                  >
                    {booked ? "Booked" : tooSoon ? "2h rule" : "Open"}
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
