import { BookingSection } from "@/components/BookingSection";
import { SpinningLogo } from "@/components/SpinningLogo";
import { formatMoney, HOURLY_RATE } from "@/lib/booking";

const services = [
  {
    title: "Vocal Tracking",
    eyebrow: "Record",
    description:
      "Focused tracking sessions for clean takes, fast comping, and a comfortable booth workflow.",
  },
  {
    title: "Mixing",
    eyebrow: "Shape",
    description:
      "Punch, depth, clarity, and emotion built around your reference tracks and release goals.",
  },
  {
    title: "Mastering",
    eyebrow: "Finish",
    description:
      "Final level, tone, and translation checks for a polished streaming-ready release.",
  },
];

const steps = [
  "Pick an open time from the live studio calendar.",
  "Choose service, duration, and add project notes.",
  "Submit your request and the session locks into the calendar.",
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="group flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full border border-white/25 bg-white text-xs font-black text-black">
              HH
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.22em] group-hover:text-white">
              Harmony Hill
            </span>
          </a>
          <nav className="hidden gap-6 text-sm text-text-muted md:flex">
            <a href="#services" className="transition hover:text-foreground">
              Services
            </a>
            <a href="#booking" className="transition hover:text-foreground">
              Booking
            </a>
            <a href="#contact" className="transition hover:text-foreground">
              Contact
            </a>
          </nav>
          <a
            href="#booking"
            className="rounded-full border border-white/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
          >
            Book
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-14 text-center md:py-20">
          <SpinningLogo />
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Recording Studio
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
              {formatMoney(HOURLY_RATE)}/hr
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Open 24/7
            </span>
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Harmony Hill
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-text-muted">
            A simple booking site for vocal tracking, mixing, and mastering.
            Choose a day, pick a time in Eastern Time, and book 1 to 12 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#booking"
              className="rounded-full bg-white px-6 py-3 font-black text-black transition hover:bg-neutral-300"
            >
              Book a Session
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/25 px-6 py-3 font-bold transition hover:bg-white hover:text-black"
            >
              View Services
            </a>
          </div>
          <div className="mt-10 grid w-full gap-3 text-sm text-text-muted sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-xl font-black text-foreground">24/7</p>
              <p>Availability</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-xl font-black text-foreground">2 hr</p>
              <p>Advance notice</p>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <p className="text-xl font-black text-foreground">1-12</p>
              <p>Hours per session</p>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="mb-8 text-center">
            <p className="section-kicker">Services</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-black tracking-[-0.04em] md:text-5xl">
              Services
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-text-muted">
              Pick the service that fits your session. Keep the setup simple and
              get straight to the work.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="glass-panel group relative overflow-hidden rounded-[1.75rem] p-6 text-center transition hover:-translate-y-1"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-text-muted">
                  0{index + 1} / {service.eyebrow}
                </p>
                <h3 className="mt-8 text-2xl font-black tracking-[-0.03em]">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-text-muted">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-8">
          <div className="glass-panel rounded-[1.75rem] p-6 text-center md:p-8">
            <div className="mb-5">
              <p className="section-kicker">How Booking Works</p>
              <p className="mt-2 text-sm text-text-muted">Choose a time and send your request.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((text, index) => (
                <article key={text} className="rounded-2xl border border-white/10 p-5">
                  <div className="mx-auto mb-5 grid size-10 place-items-center rounded-full bg-white text-sm font-black text-black">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-text-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BookingSection />

        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="glass-panel rounded-[2rem] p-7 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="section-kicker">Contact</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-5xl">
                  Contact
                </h2>
                <p className="mt-4 leading-8 text-text-muted">
                  Share your project scope, target timeline, references, and
                  preferred service. For direct help, email the studio.
                </p>
              </div>
              <form className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="rounded-2xl px-4 py-3"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="rounded-2xl px-4 py-3"
                />
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  className="min-h-32 rounded-2xl px-4 py-3 md:col-span-2"
                />
                <a
                  href="mailto:bookings@hharmonyhill.com?subject=Harmony%20Hill%20Session%20Inquiry"
                  className="rounded-2xl bg-white px-5 py-3 text-center font-black text-black transition hover:bg-neutral-300 md:w-fit"
                >
                  Email the Studio
                </a>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-text-muted">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="font-bold text-foreground">Harmony Hill Studio</p>
          <p>Open 24/7 - {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
