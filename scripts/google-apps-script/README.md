# Harmony Hill Google Apps Script Setup

This script provides free booking API endpoints backed by Google Calendar.

## 1) Create a dedicated calendar

- In Google Calendar, create a new calendar (example: `Harmony Hill Bookings`).
- Copy the calendar ID from calendar settings.

## 2) Create and configure Apps Script

- Go to [script.new](https://script.new/).
- Replace default code with `Code.gs` from this folder.
- Open **Project Settings** -> **Script properties**.
- Add:
  - `CALENDAR_ID` = your Google Calendar ID

## 3) Deploy as Web App

- Deploy -> **New deployment** -> type **Web app**
- Execute as: **Me**
- Who has access: **Anyone**
- Deploy and copy the web app URL

## 4) Connect website

In your Next.js site root, create `.env.local`:

```bash
NEXT_PUBLIC_BOOKING_API_URL="YOUR_WEB_APP_URL"
```

Restart dev server after adding env vars.

## Endpoints

- `GET ?action=availability&start=<ISO>&end=<ISO>`
  - Returns booked events in that range.
- `POST ?action=book`
  - JSON body:
    - `name`
    - `email`
    - `service` (`vocal tracking`, `mixing`, or `mastering`)
    - `start` (ISO)
    - `end` (ISO)
    - `notes` (optional)

## Rules enforced server-side

- Bookings must be created at least 2 hours ahead of start time.
- Overlapping times are rejected.
- Events are written directly to your calendar.
