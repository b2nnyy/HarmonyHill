import { BookingSection } from "@/components/BookingSection";
import { formatMoney, HOURLY_RATE } from "@/lib/booking";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-lg font-semibold tracking-wide">Harmony Hill</p>
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
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 md:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Recording Studio • Open 24/7
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Professional sound shaping at Harmony Hill.
          </h1>
          <p className="max-w-2xl text-lg text-text-muted">
            Book vocal tracking, mixing, or mastering sessions any time of day.
            Real-time availability, two-hour lead-time protection, and a clean
            studio workflow designed for artists.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#booking"
              className="rounded-lg bg-accent-strong px-5 py-3 font-semibold text-[#052b1b]"
            >
              Book a Session
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-white/20 px-5 py-3 font-semibold"
            >
              Contact Studio
            </a>
          </div>
          <p className="text-sm text-text-muted">
            Hourly rate: <span className="font-semibold">{formatMoney(HOURLY_RATE)}</span>/hour
          </p>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-6 pb-8">
          <h2 className="text-3xl font-bold">Services</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Vocal Tracking",
                description:
                  "Capture high-impact vocal takes in a treated space with clean signal flow.",
              },
              {
                title: "Mixing",
                description:
                  "Balance, depth, and polish for singles, EPs, and full-length projects.",
              },
              {
                title: "Mastering",
                description:
                  "Final loudness, tonal clarity, and platform-ready delivery for release.",
              },
            ].map((service) => (
              <article
                key={service.title}
                className="rounded-xl border border-white/10 bg-panel p-5"
              >
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <BookingSection />

        <section id="contact" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="rounded-2xl border border-white/10 bg-panel p-7">
            <h2 className="text-3xl font-bold">Contact Harmony Hill</h2>
            <p className="mt-2 max-w-2xl text-text-muted">
              Have questions before booking? Send a quick message and include your
              preferred timeline, project type, and how many songs you are planning.
            </p>
            <form className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="rounded-lg border border-white/20 bg-white px-3 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-lg border border-white/20 bg-white px-3 py-2"
              />
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                className="min-h-28 rounded-lg border border-white/20 bg-white px-3 py-2 md:col-span-2"
              />
              <a
                href="mailto:bookings@hharmonlyhill.com?subject=Harmony%20Hill%20Session%20Inquiry"
                className="rounded-lg bg-accent-strong px-5 py-3 text-center font-semibold text-[#052b1b] md:w-fit"
              >
                Email the Studio
              </a>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-text-muted">
        Harmony Hill Studio - Open 24/7 - {new Date().getFullYear()}
      </footer>
    </div>
  );
}
