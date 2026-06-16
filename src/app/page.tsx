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
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#030407]/78 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="group flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full border border-accent-warm/30 bg-white/5 text-xs font-black text-accent">
              HH
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.22em] group-hover:text-accent">
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
            className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-accent transition hover:bg-accent hover:text-[#03130d]"
          >
            Book
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
          <div className="hero-panel glass-panel soft-grid relative overflow-hidden rounded-[2rem] p-6 md:p-10 lg:p-12">
            <div className="absolute right-8 top-8 hidden rounded-full border border-accent-warm/25 px-4 py-2 text-xs uppercase tracking-[0.22em] text-accent-warm md:block">
              Open 24/7
            </div>
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="flex flex-col gap-7">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    Recording Studio
                  </span>
                  <span className="rounded-full border border-accent-warm/25 bg-accent-warm/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-accent-warm">
                    {formatMoney(HOURLY_RATE)}/hr
                  </span>
                </div>
                <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
                  Record sharper. Book faster. Sound bigger.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                  Harmony Hill gives artists a premium studio experience with a
                  live 24/7 booking calendar, clear session rules, and focused
                  vocal tracking, mixing, and mastering.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#booking"
                    className="premium-button rounded-2xl bg-accent-strong px-6 py-3 font-black text-[#03130d] transition hover:-translate-y-0.5 hover:brightness-110"
                  >
                    Book a Session
                  </a>
                  <a
                    href="#contact"
                    className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-bold transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    Ask a Question
                  </a>
                </div>
                <div className="grid gap-3 pt-3 text-sm text-text-muted sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xl font-black text-foreground">24/7</p>
                    <p>Open studio availability</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xl font-black text-foreground">2 hr</p>
                    <p>Advance booking rule</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xl font-black text-foreground">$45</p>
                    <p>Simple hourly rate</p>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[360px]">
                <div className="absolute inset-x-8 bottom-2 h-10 rounded-full bg-black/60 blur-2xl" />
                <SpinningLogo />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Services</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Built for clean sessions and finished records.
              </h2>
            </div>
            <p className="max-w-md leading-7 text-text-muted">
              The site keeps the offer simple because the studio workflow should
              feel simple too: record, refine, release.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="glass-panel group relative overflow-hidden rounded-[1.75rem] p-6 transition hover:-translate-y-1"
              >
                <div className="absolute -right-10 -top-10 size-28 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent-warm/15" />
                <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-warm">
                  0{index + 1} / {service.eyebrow}
                </p>
                <h3 className="mt-10 text-2xl font-black tracking-[-0.03em]">
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
          <div className="glass-panel rounded-[1.75rem] p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="section-kicker">How Booking Works</p>
              <p className="text-sm text-text-muted">Fast request. Calendar-backed availability.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((text, index) => (
                <article key={text} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-5 grid size-10 place-items-center rounded-full bg-accent/15 text-sm font-black text-accent">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-text-muted">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-8">
          <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
            <div className="glass-panel rounded-[1.75rem] p-6">
              <p className="section-kicker">Studio Policy</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Book with confidence.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Booked slots turn red", "2-hour advance rule", "Live calendar conflicts"].map(
                (item) => (
                  <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm font-bold text-foreground">{item}</p>
                    <p className="mt-2 text-xs leading-6 text-text-muted">
                      Clear scheduling rules keep every session organized.
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <BookingSection />

        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="hero-panel glass-panel relative overflow-hidden rounded-[2rem] p-7 md:p-10">
            <div className="absolute -right-20 -top-20 size-56 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="section-kicker">Contact</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] md:text-5xl">
                  Bring the idea. Leave with sound.
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
                  href="mailto:bookings@hharmonlyhill.com?subject=Harmony%20Hill%20Session%20Inquiry"
                  className="premium-button rounded-2xl bg-accent-strong px-5 py-3 text-center font-black text-[#03130d] transition hover:-translate-y-0.5 hover:brightness-110 md:w-fit"
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
