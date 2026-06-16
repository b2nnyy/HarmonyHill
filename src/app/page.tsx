import { BookingSection } from "@/components/BookingSection";
import { formatMoney, HOURLY_RATE } from "@/lib/booking";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-lg font-semibold tracking-[0.08em]">Harmony Hill</p>
          <nav className="flex gap-4 text-sm text-text-muted">
            <a href="#services" className="hover:text-foreground">
              Services
            </a>
            <a href="#booking" className="hover:text-foreground">
              Booking
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="glass-panel soft-grid relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-16 left-2/5 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-8">
              <p className="text-sm uppercase tracking-[0.23em] text-accent">
                Recording Studio • Open 24/7
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                High-end sound. Fast booking. Zero friction.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
                Harmony Hill blends studio-quality recording with a modern booking
                flow. Lock in vocal tracking, mixing, or mastering in minutes and
                see real-time availability instantly.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#booking"
                  className="rounded-xl bg-accent-strong px-6 py-3 font-semibold text-[#032116] transition hover:brightness-110"
                >
                  Book a Session
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
                >
                  Contact Studio
                </a>
              </div>
              <div className="grid gap-3 text-sm text-text-muted md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-foreground">Rate</p>
                  <p>{formatMoney(HOURLY_RATE)}/hour</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-foreground">Minimum lead time</p>
                  <p>2 hours before session start</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-foreground">Booking model</p>
                  <p>24/7 availability with live conflict checks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-6 pb-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Services</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                One studio. Three focused workflows.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-text-muted">
              Built for artists who want clean communication, efficient sessions,
              and release-ready sound.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Vocal Tracking",
                description:
                  "Capture confident takes in a treated environment with focused direction and a streamlined chain.",
              },
              {
                title: "Mixing",
                description:
                  "Get punch, depth, and clarity that translates across headphones, cars, and streaming platforms.",
              },
              {
                title: "Mastering",
                description:
                  "Final loudness and tonal balance tailored for professional digital distribution.",
              },
            ].map((service) => (
              <article
                key={service.title}
                className="glass-panel rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold tracking-wide">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-12">
          <div className="glass-panel grid gap-5 rounded-3xl p-8 md:grid-cols-3">
            {[
              {
                title: "Step 1",
                text: "Choose an open time on the visual calendar.",
              },
              {
                title: "Step 2",
                text: "Select service and duration, then submit your details.",
              },
              {
                title: "Step 3",
                text: "Session is instantly added when the slot passes validation.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-accent">{item.title}</p>
                <p className="mt-2 text-sm text-text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <BookingSection />

        <section id="contact" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="glass-panel rounded-3xl p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Let’s plan your session</h2>
            <p className="mt-3 max-w-2xl text-text-muted">
              Share your project scope, target timeline, and preferred service.
              You can also email directly for quick scheduling support.
            </p>
            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="rounded-xl px-4 py-3"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-xl px-4 py-3"
              />
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                className="min-h-28 rounded-xl px-4 py-3 md:col-span-2"
              />
              <a
                href="mailto:bookings@hharmonlyhill.com?subject=Harmony%20Hill%20Session%20Inquiry"
                className="rounded-xl bg-accent-strong px-5 py-3 text-center font-semibold text-[#052b1b] transition hover:brightness-110 md:w-fit"
              >
                Email the Studio
              </a>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-text-muted">
        Harmony Hill Studio - Open 24/7 - {new Date().getFullYear()}
      </footer>
    </div>
  );
}
