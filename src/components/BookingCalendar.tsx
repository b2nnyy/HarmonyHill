"use client";

import { useState } from "react";
import type { AvailabilityEvent } from "@/lib/booking";
import {
  LEAD_TIME_HOURS,
  MAX_BOOKING_HOURS,
  intersects,
  isWithinLeadTime,
} from "@/lib/booking";

type BookingCalendarProps = {
  monthStart: Date;
  selectedStart: Date | null;
  durationHours: number;
  events: AvailabilityEvent[];
  onSelectBlock: (slotStart: Date, durationHours: number) => void;
};

const STUDIO_TIME_ZONE = "America/New_York";

function formatDayLabel(day: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: STUDIO_TIME_ZONE,
  }).format(day);
}

function formatDayDate(day: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: STUDIO_TIME_ZONE,
  }).format(day);
}

function formatFullDay(day: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: STUDIO_TIME_ZONE,
  }).format(day);
}

function formatSlotTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: STUDIO_TIME_ZONE,
  }).format(date);
}

function getMonthDays(monthStart: Date) {
  const nextMonth = new Date(monthStart);
  nextMonth.setMonth(monthStart.getMonth() + 1);
  const daysInMonth = Math.round(
    (nextMonth.getTime() - monthStart.getTime()) / (24 * 60 * 60 * 1000),
  );

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = new Date(monthStart);
    day.setDate(monthStart.getDate() + index);
    day.setHours(0, 0, 0, 0);
    return day;
  });
}

function getDayKey(day: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: STUDIO_TIME_ZONE,
  }).format(day);
}

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  const offset = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT";
  const match = offset.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);

  if (!match) {
    return 0;
  }

  const sign = match[1] === "+" ? 1 : -1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);
  return sign * (hours * 60 + minutes) * 60 * 1000;
}

function makeZonedDate(dayKey: string, hour: number) {
  const [year, month, day] = dayKey.split("-").map(Number);
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, 0, 0));
  const offset = getTimeZoneOffsetMs(utcGuess, STUDIO_TIME_ZONE);
  return new Date(utcGuess.getTime() - offset);
}

export function BookingCalendar({
  monthStart,
  selectedStart,
  durationHours,
  events,
  onSelectBlock,
}: BookingCalendarProps) {
  const monthDays = getMonthDays(monthStart);
  const todayKey = getDayKey(new Date());
  const visibleMonthDays = monthDays.filter((day) => getDayKey(day) >= todayKey);
  const initialDayKey = selectedStart ? getDayKey(selectedStart) : null;
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(initialDayKey);
  const legend = [
    { label: "Available", className: "bg-[var(--slot-open)]" },
    { label: "Booked", className: "bg-danger" },
    { label: `${LEAD_TIME_HOURS}h lead`, className: "bg-[var(--slot-muted)]" },
    { label: "Selected", className: "bg-accent-warm" },
  ];
  const effectiveSelectedDayKey =
    selectedDayKey && visibleMonthDays.some((day) => getDayKey(day) === selectedDayKey)
      ? selectedDayKey
      : null;
  const selectedDay =
    visibleMonthDays.find((day) => getDayKey(day) === effectiveSelectedDayKey) ?? null;
  const now = new Date();
  const visibleSlots = effectiveSelectedDayKey
    ? Array.from({ length: 24 }, (_, hour) => {
        const slotStart = makeZonedDate(effectiveSelectedDayKey, hour);
        const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);
        const booked = events.some((event) =>
          intersects(slotStart, slotEnd, event.start, event.end),
        );
        const tooSoon = isWithinLeadTime(slotStart, now);
        const selectedEnd = selectedStart
          ? new Date(selectedStart.getTime() + durationHours * 60 * 60 * 1000)
          : null;
        const selected =
          selectedStart &&
          selectedEnd &&
          slotStart.getTime() >= selectedStart.getTime() &&
          slotStart.getTime() < selectedEnd.getTime();

        return { slotStart, booked, tooSoon, selected };
      }).filter(({ slotStart }) => slotStart.getTime() > now.getTime())
    : [];

  function handleSlotClick(slotStart: Date) {
    const selectedStartKey = selectedStart ? getDayKey(selectedStart) : null;
    const slotKey = getDayKey(slotStart);
    const shouldExtendSelection =
      selectedStart &&
      selectedStartKey === slotKey &&
      slotStart.getTime() >= selectedStart.getTime();

    if (!shouldExtendSelection) {
      onSelectBlock(slotStart, 1);
      return;
    }

    const nextDuration =
      (slotStart.getTime() - selectedStart.getTime()) / (60 * 60 * 1000) + 1;
    const cappedDuration = Math.min(MAX_BOOKING_HOURS, nextDuration);
    const proposedEnd = new Date(selectedStart.getTime() + cappedDuration * 60 * 60 * 1000);
    const hasConflict = events.some((event) =>
      intersects(selectedStart, proposedEnd, event.start, event.end),
    );

    if (!hasConflict && cappedDuration >= 1) {
      onSelectBlock(selectedStart, cappedDuration);
    }
  }

  return (
    <div className="glass-panel p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Live Calendar</p>
          <h3 className="font-display mt-3 text-2xl font-semibold tracking-[-0.01em]">
            Studio availability
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            Pick a remaining day in the month. Available hours appear once you
            choose a day.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {legend.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-text-muted"
            >
              <span className={`size-2.5 rounded-full ${item.className}`} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-3">
        {visibleMonthDays.length ? (
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {visibleMonthDays.map((day) => {
              const dayKey = getDayKey(day);
              const isSelected = dayKey === effectiveSelectedDayKey;
              const dayEvents = events.filter(
                (event) => getDayKey(new Date(event.start)) === dayKey,
              );

              return (
                <button
                  key={dayKey}
                  type="button"
                  className={`edge-hover rounded-2xl border p-3 text-left ${
                    isSelected
                      ? "border-white/70 bg-white/[0.1] shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]"
                  }`}
                  onClick={() => setSelectedDayKey(dayKey)}
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-text-faint">
                    {formatDayLabel(day)}
                  </span>
                  <span className="font-display mt-1 block text-lg font-semibold text-foreground">
                    {formatDayDate(day)}
                  </span>
                  <span className="mt-2 block text-[11px] font-semibold text-text-muted">
                    {dayEvents.length ? `${dayEvents.length} booked` : "Open day"}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="font-display text-lg font-semibold text-foreground">No future days in this month</p>
            <p className="mt-2 text-sm text-text-muted">
              Move to next month to see available session times.
            </p>
          </div>
        )}

        {visibleMonthDays.length ? (
          <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-black/40 p-4">
            {selectedDay ? (
              <>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-faint">
                      {formatFullDay(selectedDay)}
                    </p>
                    <h4 className="font-display mt-1 text-xl font-semibold tracking-[-0.01em]">
                      Choose your hours
                    </h4>
                    <p className="mt-1 text-sm text-text-muted">
                      Click a start time, then click a later hour to extend the block.
                    </p>
                  </div>
                  <p className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-text-muted">
                    Eastern Time
                  </p>
                </div>

                {visibleSlots.length ? (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {visibleSlots.map(({ slotStart, booked, tooSoon, selected }) => {
                      const stateClass = booked
                        ? "slot-booked"
                        : tooSoon
                          ? "slot-soon"
                          : "slot-available";
                      const selectedClass = selected && !booked && !tooSoon ? "slot-selected" : "";
                      const label = booked
                        ? "Booked"
                        : tooSoon
                          ? `${LEAD_TIME_HOURS}h lead time`
                          : "Available";

                      return (
                        <button
                          key={slotStart.toISOString()}
                          type="button"
                          className={`calendar-slot calendar-slot-large ${stateClass} ${selectedClass}`}
                          disabled={booked || tooSoon}
                          onClick={() => handleSlotClick(slotStart)}
                          aria-label={`${label} at ${formatSlotTime(slotStart)} on ${formatFullDay(selectedDay)}`}
                          title={
                            booked
                              ? "Unavailable - booked"
                              : tooSoon
                                ? `Unavailable - must book ${LEAD_TIME_HOURS} hours in advance`
                                : "Available"
                          }
                        >
                          <span className="font-display block text-lg font-semibold">{formatSlotTime(slotStart)}</span>
                          <span className="mt-1 block text-xs font-semibold opacity-80">
                            {selected ? "Selected" : label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                    <p className="font-semibold text-foreground">No remaining times today</p>
                    <p className="mt-2 text-sm text-text-muted">
                      Pick another day to see future availability.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
                <p className="font-display text-lg font-semibold text-foreground">
                  Select a day to see available hours
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Choose any remaining day in the month above, then open times
                  will appear here.
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
