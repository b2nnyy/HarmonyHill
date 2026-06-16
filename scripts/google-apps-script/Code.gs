/**
 * Harmony Hill - Google Apps Script booking API.
 * Deploy as a web app with access set to "Anyone".
 *
 * Required Script Properties:
 * - CALENDAR_ID: target Google Calendar ID for bookings.
 */
const LEAD_TIME_HOURS = 2;

function getCalendar_() {
  const calendarId = PropertiesService.getScriptProperties().getProperty(
    "CALENDAR_ID",
  );
  if (!calendarId) {
    throw new Error("Missing script property CALENDAR_ID.");
  }

  const calendar = CalendarApp.getCalendarById(calendarId);
  if (!calendar) {
    throw new Error("Unable to find calendar for CALENDAR_ID.");
  }
  return calendar;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function parseDate_(value, fieldName) {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date for " + fieldName + ".");
  }
  return date;
}

function intersects_(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

function doGet(e) {
  try {
    const action = (e.parameter.action || "availability").toLowerCase();

    if (action !== "availability") {
      return jsonResponse_({ ok: false, error: "Unsupported GET action." });
    }

    const start = parseDate_(e.parameter.start, "start");
    const end = parseDate_(e.parameter.end, "end");
    if (start >= end) {
      throw new Error("Start must be before end.");
    }

    const calendar = getCalendar_();
    const events = calendar.getEvents(start, end).map(function (event) {
      return {
        id: event.getId(),
        title: event.getTitle(),
        start: event.getStartTime().toISOString(),
        end: event.getEndTime().toISOString(),
      };
    });

    return jsonResponse_({ ok: true, events: events });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  }
}

function doPost(e) {
  try {
    const action = (e.parameter.action || "").toLowerCase();
    if (action !== "book") {
      return jsonResponse_({ ok: false, error: "Unsupported POST action." });
    }

    const body = JSON.parse(e.postData.contents || "{}");
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const service = String(body.service || "").trim();
    const notes = String(body.notes || "").trim();
    const start = parseDate_(body.start, "start");
    const end = parseDate_(body.end, "end");

    if (!name || !email || !service) {
      throw new Error("name, email, and service are required.");
    }
    if (start >= end) {
      throw new Error("Start must be before end.");
    }

    const now = new Date();
    const leadTimeMs = LEAD_TIME_HOURS * 60 * 60 * 1000;
    if (start.getTime() - now.getTime() < leadTimeMs) {
      throw new Error("Bookings must be made at least 2 hours in advance.");
    }

    const calendar = getCalendar_();
    const candidateEvents = calendar.getEvents(start, end);
    const hasConflict = candidateEvents.some(function (event) {
      return intersects_(
        start.getTime(),
        end.getTime(),
        event.getStartTime().getTime(),
        event.getEndTime().getTime(),
      );
    });
    if (hasConflict) {
      throw new Error("That timeslot is no longer available.");
    }

    const title = "Harmony Hill Session - " + service;
    const description =
      "Name: " +
      name +
      "\nEmail: " +
      email +
      "\nService: " +
      service +
      "\nNotes: " +
      (notes || "N/A");

    const created = calendar.createEvent(title, start, end, {
      description: description,
    });

    return jsonResponse_({
      ok: true,
      bookingId: created.getId(),
      message: "Booking confirmed.",
    });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  }
}
