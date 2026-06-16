import Image from "next/image";
import { BookingSection } from "@/components/BookingSection";
import { LogoMark } from "@/components/LogoMark";
import { MotifOrnament } from "@/components/MotifOrnament";
import { Reveal } from "@/components/Reveal";
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
      "Final level, tone, and translation checks for a polished, streaming-ready release.",
  },
];

const steps = [
  {
    title: "Choose a time",
    description: "Pick an open day, then an open hour from the live studio calendar.",
  },
  {
    title: "Set the details",
    description: "Choose your service, set the session length, and add project notes.",
  },
  {
    title: "Lock it in",
    description: "Send your request and the session reserves itself on the calendar.",
  },
];

const marqueeItems = [
  "Vocal Tracking",
  "Mixing",
  "Mastering",
  "Open 24 / 7",
  "Eastern Time",
  `${formatMoney(HOURLY_RATE)} / Hour`,
  "Book 2h Ahead",
];

const instagramUrl = "https://www.instagram.com/hharmonyhill/";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative grid size-9 place-items-center">
              <Image
                src="/assets/harmony-hill-logo-clean.png"
                alt="Harmony Hill"
                width={40}
                height={40}
                className="size-9 object-contain brightness-150"
              />
            </span>
            <span className="font-display text-base font-semibold tracking-[0.02em]">
              Harmony Hill
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-text-muted md:flex">
            <a href="#services" className="transition hover:text-foreground">
              Services
            </a>
            <a href="#booking" className="transition hover:text-foreground">
              Booking
            </a>
            <a href="#contact" className="transition hover:text-foreground">
              Contact
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              Instagram
            </a>
          </nav>
          <a href="#booking" className="btn-foil px-5 py-2.5 text-xs uppercase tracking-[0.16em]">
            Book a Session
          </a>
        </div>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="relative isolate mx-auto flex w-full max-w-5xl flex-col items-center overflow-hidden px-6 pb-20 pt-16 text-center md:pt-24">
          <MotifOrnament
            className="left-1/2 top-[-8%] -translate-x-1/2"
            size={620}
          />
          <Reveal className="relative z-10 flex flex-col items-center">
            <p className="section-kicker mb-8">Recording Studio</p>
            <LogoMark priority />
            <h1 className="font-display text-foil mt-10 text-6xl font-semibold leading-[0.92] tracking-[-0.02em] md:text-8xl">
              Harmony Hill
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-text-muted">
              A recording studio for vocal tracking, mixing, and mastering.
              Pick a day, choose your hours in Eastern Time, and book sessions
              from one to twelve hours.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href="#booking" className="btn-foil">
                Book a Session
              </a>
              <a href="#services" className="btn-ghost">
                Explore Services
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={120}
            className="relative z-10 mt-14 grid w-full max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
          >
            {[
              { stat: "24/7", label: "Availability" },
              { stat: "2 hr", label: "Advance notice" },
              { stat: "1–12", label: "Hours per session" },
            ].map((item) => (
              <div key={item.label} className="bg-black/20 px-4 py-6">
                <p className="font-display text-3xl font-semibold text-foreground">
                  {item.stat}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-faint">
                  {item.label}
                </p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ---------- Marquee strip ---------- */}
        <div className="border-y border-white/10 bg-white/[0.015] py-4">
          <div className="marquee">
            {[0, 1].map((dup) => (
              <div className="marquee__track" key={dup} aria-hidden={dup === 1}>
                {marqueeItems.map((item) => (
                  <span key={item} className="flex items-center gap-10">
                    <span className="marquee__item">{item}</span>
                    <span className="marquee__dot" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Services ---------- */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-24">
          <Reveal className="mb-14 max-w-2xl">
            <p className="section-kicker">Services</p>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Three ways to move
              <span className="text-foil"> your sound forward.</span>
            </h2>
            <p className="mt-5 leading-7 text-text-muted">
              Pick the service that fits your session. The setup stays simple so
              you get straight to the work.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 90}>
                <article className="glass-panel edge-hover group relative h-full overflow-hidden p-7">
                  <MotifOrnament
                    className="right-[-30%] top-[-30%] opacity-[0.04]"
                    size={260}
                  />
                  <div className="relative z-10 flex items-baseline justify-between">
                    <span className="font-display text-5xl font-light text-white/15 transition group-hover:text-white/30">
                      0{index + 1}
                    </span>
                    <span className="section-kicker">{service.eyebrow}</span>
                  </div>
                  <h3 className="font-display relative z-10 mt-10 text-2xl font-semibold tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="relative z-10 mt-3 text-sm leading-7 text-text-muted">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- How booking works ---------- */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="hairline mb-16" />
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="section-kicker">How Booking Works</p>
              <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
                Three steps, start to studio.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-text-muted">
              The calendar is live, so the times you see are the times that are
              truly open. No back-and-forth.
            </p>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 90} className="bg-black/20">
                <div className="h-full p-8">
                  <span className="font-display block text-6xl font-light text-foil">
                    0{index + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <BookingSection />

        {/* ---------- Contact ---------- */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-24">
          <Reveal>
            <div className="glass-panel relative overflow-hidden p-8 md:p-12">
              <MotifOrnament
                className="bottom-[-35%] right-[-12%] opacity-[0.05]"
                size={460}
              />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <p className="section-kicker">Contact</p>
                  <h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
                    Let&apos;s make
                    <span className="text-foil"> something.</span>
                  </h2>
                  <p className="mt-5 leading-8 text-text-muted">
                    Share your project scope, timeline, references, and preferred
                    service. For studio updates and behind-the-scenes, follow
                    @hharmonyhill on Instagram.
                  </p>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-7 text-sm"
                  >
                    @hharmonyhill
                  </a>
                </div>
                <form className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="px-4 py-3.5"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="px-4 py-3.5"
                  />
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    className="min-h-36 px-4 py-3.5 md:col-span-2"
                  />
                  <a
                    href="mailto:bookings@hharmonyhill.com?subject=Harmony%20Hill%20Session%20Inquiry"
                    className="btn-foil md:col-span-2 md:w-fit"
                  >
                    Email the Studio
                  </a>
                </form>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-white/10 px-6 py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/harmony-hill-logo-clean.png"
              alt="Harmony Hill"
              width={36}
              height={36}
              className="size-8 object-contain brightness-150"
            />
            <div>
              <p className="font-display text-base font-semibold">Harmony Hill</p>
              <p className="text-xs uppercase tracking-[0.18em] text-text-faint">
                Recording Studio
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
            <a href="#services" className="transition hover:text-foreground">
              Services
            </a>
            <a href="#booking" className="transition hover:text-foreground">
              Booking
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              Instagram
            </a>
            <p className="text-text-faint">Open 24/7 · {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
