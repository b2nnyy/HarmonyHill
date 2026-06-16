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
    <section id="booking" className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Booking</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-5xl">
            Book a Studio Session
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-text-muted">
            Harmony Hill is open 24/7. Select an open start time, pick duration,
            and lock in your session.
          </p>
        </div>
        <div className="glass-panel flex flex-wrap items-center gap-2 rounded-2xl p-2">
          <button
            type="button"
            disabled={!canGoPrevious}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
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
            Prev
          </button>
          <p className="min-w-32 px-3 text-center text-sm font-black text-foreground">
            {formatMonthLabel(monthStart)}
          </p>
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold transition hover:bg-white/10"
            onClick={() => {
              const next = new Date(monthStart);
              next.setMonth(next.getMonth() + 1);
              setMonthStart(next);
              if (selectedStart && !isSameMonth(selectedStart, next)) {
                setSelectedStart(null);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>

      {loading ? (
        <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-bold text-accent">
          <span className="size-2 animate-pulse rounded-full bg-accent" />
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
