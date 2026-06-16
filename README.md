# Harmony Hill Website

Landing + booking site for Harmony Hill studio.

## Features

- Services: vocal tracking, mixing, mastering
- 24/7 visual booking calendar
- Booked times shown as unavailable
- 2-hour lead-time booking rule
- $45/hour session pricing
- Google Apps Script + Google Calendar API backend (free)
- GitHub Pages deployment with custom domain (`hharmonlyhill.com`)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_BOOKING_API_URL="https://script.google.com/macros/s/REPLACE_WITH_DEPLOYMENT_ID/exec"
```

3. Start local dev server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Google Apps Script Setup

Follow:

- `scripts/google-apps-script/README.md`

Copy `scripts/google-apps-script/Code.gs` into your Apps Script project, set `CALENDAR_ID`, and deploy as a web app.

## Deploy to GitHub Pages

This repo includes `.github/workflows/deploy.yml` for Pages deployment.

### Required GitHub setup

1. In repo settings -> Pages, source should be **GitHub Actions**.
2. In repo settings -> Secrets and variables -> Actions, add:
   - `NEXT_PUBLIC_BOOKING_API_URL`

### Custom domain

`CNAME` is configured for:

- `hharmonlyhill.com`

In Cloudflare DNS, point your domain to GitHub Pages (typical setup):

- `A` record: `@` -> `185.199.108.153`
- `A` record: `@` -> `185.199.109.153`
- `A` record: `@` -> `185.199.110.153`
- `A` record: `@` -> `185.199.111.153`
- `CNAME` record: `www` -> `<your-github-username>.github.io`

Then in GitHub Pages settings, set the custom domain to `hharmonlyhill.com`.
