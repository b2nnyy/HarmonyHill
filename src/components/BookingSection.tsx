"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BookingCalendar } from "@/components/BookingCalendar";
import { BookingForm } from "@/components/BookingForm";
import {
  MIN_BOOKING_HOURS,
  SERVICES,
  createBooking,
  fetchAvailability,
  intersects,
  isWithinLeadTime,
  type AvailabilityEvent,
  type ServiceType,
} from "@/lib/booking";

const API_BASE_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL ?? "";

function getStartOfMonth(date: Date) {
  const monthStart = new Date(date);
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  return monthStart;
}

function formatMonthLabel(start: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(start);
}

function getMonthEnd(start: Date) {
  const end = new Date(start);
  end.setMonth(start.getMonth() + 1);
  return end;
}

function isSameMonth(first: Date, second: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
  });
  return formatter.format(first) === formatter.format(second);
}

export function BookingSection() {
  const [monthStart, setMonthStart] = useState<Date>(() => getStartOfMonth(new Date()));
  const [events, setEvents] = useState<AvailabilityEvent[]>([]);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [durationHours, setDurationHours] = useState(MIN_BOOKING_HOURS);
  const [service, setService] = useState<ServiceType>(SERVICES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const selectedEnd = useMemo(() => {
    if (!selectedStart) {
      return null;
    }
    return new Date(selectedStart.getTime() + durationHours * 60 * 60 * 1000);
  }, [selectedStart, durationHours]);

  const monthEnd = useMemo(() => getMonthEnd(monthStart), [monthStart]);
  const currentMonthStart = getStartOfMonth(new Date());
  const canGoPrevious = monthStart.getTime() > currentMonthStart.getTime();

  const loadAvailability = useCallback(async () => {
    if (!API_BASE_URL) {
      setStatusMessage(
        "Set NEXT_PUBLIC_BOOKING_API_URL to connect the live booking calendar.",
      );
      setEvents([]);
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    try {
      const result = await fetchAvailability(API_BASE_URL, monthStart, monthEnd);
      setEvents(result);
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to load studio availability.",
      );
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [monthStart, monthEnd]);

  // Availability is sourced from external API and refreshed on week changes.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    void loadAvailability();
  }, [loadAvailability]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedStart || !selectedEnd) {
      setStatusMessage("Please choose an available start time.");
      return;
    }

    if (isWithinLeadTime(selectedStart)) {
      setStatusMessage("Bookings must be made at least 2 hours in advance.");
      return;
    }

    const hasConflict = events.some((calendarEvent) =>
      intersects(selectedStart, selectedEnd, calendarEvent.start, calendarEvent.end),
    );

    if (hasConflict) {
      setStatusMessage("That time overlaps with an existing booking.");
      return;
    }

    if (!API_BASE_URL) {
      setStatusMessage("Missing booking API URL configuration.");
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);
    try {
      await createBooking(API_BASE_URL, {
        name,
        email,
        service,
        start: selectedStart.toISOString(),
        end: selectedEnd.toISOString(),
        notes,
      });
      setStatusMessage("Booking confirmed. Your session was added to the calendar.");
      setName("");
      setEmail("");
      setNotes("");
      await loadAvailability();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to complete booking.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="hairline mb-16" />
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="section-kicker">Booking</p>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
            Reserve your
            <span className="text-foil"> studio time.</span>
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-text-muted">
            Harmony Hill is open 24/7. Choose an open day, select your hours, and
            lock in the session.
          </p>
        </div>
        <div className="panel-quiet flex flex-wrap items-center gap-1 rounded-full p-1.5">
          <button
            type="button"
            disabled={!canGoPrevious}
            aria-label="Previous month"
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-bold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => {
              if (!canGoPrevious) return;
              const previous = new Date(monthStart);
              previous.setMonth(previous.getMonth() - 1);
              setMonthStart(previous);
              if (selectedStart && !isSameMonth(selectedStart, previous)) {
                setSelectedStart(null);
              }
            }}
          >
            &#8592;
          </button>
          <p className="font-display min-w-40 px-3 text-center text-base font-semibold text-foreground">
            {formatMonthLabel(monthStart)}
          </p>
          <button
            type="button"
            aria-label="Next month"
            className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-bold transition hover:bg-white/10"
            onClick={() => {
              const next = new Date(monthStart);
              next.setMonth(next.getMonth() + 1);
              setMonthStart(next);
              if (selectedStart && !isSameMonth(selectedStart, next)) {
                setSelectedStart(null);
              }
            }}
          >
            &#8594;
          </button>
        </div>
      </div>

      {loading ? (
        <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-text-muted">
          <span className="size-2 animate-pulse rounded-full bg-white" />
          Loading live availability
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <BookingCalendar
          monthStart={monthStart}
          events={events}
          selectedStart={selectedStart}
          durationHours={durationHours}
          onSelectBlock={(slotStart, nextDurationHours) => {
            setSelectedStart(slotStart);
            setDurationHours(nextDurationHours);
            setStatusMessage(null);
          }}
        />
        <BookingForm
          selectedStart={selectedStart}
          durationHours={durationHours}
          service={service}
          name={name}
          email={email}
          notes={notes}
          isSubmitting={submitting}
          statusMessage={statusMessage}
          onChange={(field, value) => {
            if (field === "name") setName(value);
            if (field === "email") setEmail(value);
            if (field === "notes") setNotes(value);
          }}
          onDurationChange={setDurationHours}
          onServiceChange={setService}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
