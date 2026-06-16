"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BookingCalendar } from "@/components/BookingCalendar";
import { BookingForm } from "@/components/BookingForm";
import {
  SERVICES,
  createBooking,
  fetchAvailability,
  intersects,
  isWithinLeadTime,
  type AvailabilityEvent,
  type ServiceType,
} from "@/lib/booking";

const API_BASE_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL ?? "";

function getStartOfWeek(date: Date) {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  weekStart.setDate(weekStart.getDate() - day);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

export function BookingSection() {
  const [weekStart, setWeekStart] = useState<Date>(() => getStartOfWeek(new Date()));
  const [events, setEvents] = useState<AvailabilityEvent[]>([]);
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [durationHours, setDurationHours] = useState(2);
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

  const weekEnd = useMemo(() => {
    const end = new Date(weekStart);
    end.setDate(weekStart.getDate() + 7);
    return end;
  }, [weekStart]);

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
      const result = await fetchAvailability(API_BASE_URL, weekStart, weekEnd);
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
  }, [weekStart, weekEnd]);

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
          <h2 className="text-3xl font-bold">Book a Studio Session</h2>
          <p className="mt-2 text-text-muted">
            Harmony Hill is open 24/7. Select an open start time, pick duration,
            and lock in your session.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/5"
            onClick={() => {
              const previous = new Date(weekStart);
              previous.setDate(previous.getDate() - 7);
              setWeekStart(previous);
            }}
          >
            Previous Week
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/5"
            onClick={() => {
              const next = new Date(weekStart);
              next.setDate(next.getDate() + 7);
              setWeekStart(next);
            }}
          >
            Next Week
          </button>
        </div>
      </div>

      {loading ? <p className="mb-3 text-sm text-text-muted">Loading availability...</p> : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <BookingCalendar
          weekStart={weekStart}
          events={events}
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          onSelectSlot={(slotStart) => {
            setSelectedStart(slotStart);
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
