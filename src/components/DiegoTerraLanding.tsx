import { useEffect, useRef, useState } from "react";
import bgVideo from "@/assets/diego-terra-bg-loop.mp4";
import diegoPhoto from "@/assets/images/diego-terra.webp";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import FlyingCube from "@/components/FlyingCube";
import { SectionDivider } from "@/components/SectionDivider";
import wrStudio from "@/assets/screenshots/wr-studio-dental.webp";

/*
 * Contatos oficiais Diego Terra
 */

const WHATSAPP_URL = "https://wa.me/5535992175613";
const LINKEDIN_URL = "https://www.linkedin.com/in/diego-terra/";
const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight text-foreground">
          DIEGO<span className="text-brand">.</span>TERRA
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Serviços", "#services"],
            ["Sobre", "#about"],
            ["Portfólio", "#work"],
            ["Processo", "#process"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#cta"
          className="inline-flex h-9 items-center rounded-full border border-border px-4 text-xs font-medium text-foreground transition-all hover:border-brand hover:text-brand"
        >
          Orçamento
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure autoplay after mount on iOS-like browsers.
    videoRef.current?.play().catch(() => { });
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen w-full items-end overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.14 0.005 150 / 0.55) 0%, oklch(0.14 0.005 150 / 0.7) 55%, oklch(0.14 0.005 150) 100%)",
        }}
        aria-hidden
      />
      {/* subtle green vignette */}
      <div className="absolute inset-0 -z-10 bg-radial-glow opacity-70" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">

        <h1
          className="text-fluid-hero animate-reveal mt-8 max-w-5xl font-light text-foreground"
          style={{ animationDelay: "180ms" }}
        >
          Diego Terra<span className="text-brand">.</span>
          <br />
          <span className="mt-8 block text-xs md:text-sm lg:text-base  uppercase tracking-[0.25em] text-muted-foreground/80 text-brand"
          ></span>
        </h1>
        <p
          className="text-eyebrow animate-reveal text-brand font-extralight"
          style={{ animationDelay: "60ms" }}
        >
          Designer | Desenvolvedor Web
        </p>
        <p
          className="animate-reveal mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          style={{ animationDelay: "340ms" }}
        >
          Desenvolvo sites modernos, rápidos e responsivos, combinando design estratégico, animações fluidas e foco na experiência do usuário para transformar visitantes em clientes.
        </p>

        <div
          className="animate-reveal mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "480ms" }}
        >
          <a
            href={WHATSAPP_URL}
            {...EXTERNAL_LINK_PROPS}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow-strong)]"
          >
            Solicitar orçamento
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#work"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            Ver portfólio
          </a>
        </div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="text-eyebrow text-muted-foreground/70">Scroll ↓</span>
      </div>
    </section>
  );
}

// function Proof() 
//   // PLACEHOLDER: substituir pelos números reais
//   const stats = [
//     { value: "50+", label: "Projetos entregues" },
//     { value: "6 anos", label: "Criando na web" },
//     { value: "< 1s", label: "Tempo de carregamento médio" },
//   ];
//   return (
//     <section className="relative bg-background py-24 md:py-32">
//       <div className="mx-auto max-w-7xl px-5 md:px-8">
//         <Reveal>
//           <p className="text-eyebrow text-brand">Diferencial</p>
//         </Reveal>
//         <Reveal delay={80}>
//           <h2 className="text-fluid-h2 mt-4 max-w-3xl font-light text-foreground">
//             Cada pixel entregue com intenção<span className="text-brand">.</span>
//           </h2>
//         </Reveal>

//         <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
//           {stats.map((s, i) => (
//             <Reveal key={s.label} delay={i * 140} className="border-t border-border pt-6">
//               <div className="text-fluid-h2 font-light tracking-tight text-foreground">
//                 {s.value}
//               </div>
//               <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }.



function About() {
  const skills = [
    "UI/UX Design",
    "React & TypeScript",
    "Tailwind CSS",
    "Motion & Interação",
    "Copy focado em conversão",
    "SEO técnico",
    "Performance web",
    "Shopify & E-commerce",
  ];
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-glow opacity-60"
        aria-hidden
      />
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-[1fr_1.2fr] md:gap-20 md:px-8">
        {/* Portrait / visual */}
        <div className="relative group">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_80px_rgba(34,197,94,0.15)]"
          >
            {/* Foto */}
            <img
              src={diegoPhoto}
              alt="Diego Terra"
              className="absolute inset-0 h-full w-full object-cover object-center animate-kenburns transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Glow verde atrás */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 20%, rgba(34,197,94,.18), transparent 45%)",
              }}
            />

            {/* Gradiente para leitura */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,.82), rgba(0,0,0,.15), transparent)",
              }}
            />

            {/* Grid */}
            <div className="absolute inset-0 grid-lines opacity-20" />

            {/* Brilho */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "linear-gradient(130deg, transparent 35%, rgba(255,255,255,.08) 50%, transparent 65%)",
              }}
            />

            {/* Informações */}
            <div className="absolute inset-x-8 bottom-8 flex items-end justify-between">

              <div>
                <p className="text-brand text-sm uppercase tracking-[0.3em]">
                  Diego Terra
                </p>

                <h3 className="mt-2 text-2xl font-light text-white">
                  Designer & Desenvolvedor
                </h3>

                <p className="mt-2 text-sm text-white/70">
                  Minas Gerais • Brasil
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md">

                <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />

                Disponível
              </span>

            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <Reveal>
            <p className="text-eyebrow text-brand">Quem sou eu</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-fluid-h2 mt-4 max-w-xl font-light text-foreground">
              Design com intenção,<br />
              código sem enrolação<span className="text-brand">.</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Sou o Diego — designer e desenvolvedor baseado em São Paulo.
                Faz mais de 6 anos que respiro web: já passei por agências,
                produtos SaaS e projetos autorais, e o que mais me move é
                transformar ideia em página que{" "}
                <span className="text-foreground">funciona</span> — não só bonita
                no Behance, mas que gera cliente de verdade.
              </p>
              <p>
                Aqui não tem template. Cada projeto começa em uma conversa
                honesta, passa por copy, wireframe, design e vira código escrito
                à mão — rápido, responsivo, acessível e pronto pra escalar.
              </p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10">
              <p className="text-eyebrow text-muted-foreground">Ferramentas & foco</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#cta"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-glow)]"
              >
                Vamos conversar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                Ver trabalhos
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



function ServiceIcon({ name }: { name: "landing" | "site" | "shop" }) {
  const common =
    "h-8 w-8 stroke-[1.25] text-foreground transition-colors group-hover:text-brand";
  if (name === "landing") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common} aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 14h8M8 17h5" />
      </svg>
    );
  }
  if (name === "site") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={common} aria-hidden>
      <path d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 7Z" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

function Services() {
  const items = [
    {
      icon: "landing" as const,
      title: "Landing Page",
      desc: "Página única, foco total em conversão. Copy, design e código feitos pra funcionar como funil.",
      tag: "A partir de 7 dias",
    },
    {
      icon: "site" as const,
      title: "Site Institucional",
      desc: "Presença de marca sólida, arquitetura clara e navegação impecável. Feito pra crescer com você.",
      tag: "Multi-página",
    },
    {
      icon: "shop" as const,
      title: "E-commerce",
      desc: "Loja rápida, com checkout enxuto e integrações que reduzem fricção na hora da compra.",
      tag: "Shopify · Custom",
    },
  ];
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="text-eyebrow text-brand">Serviços</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-fluid-h2 mt-4 max-w-2xl font-light">
                O que eu construo<span className="text-brand">.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 120}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-glow)] md:p-8">
                <div>
                  <ServiceIcon name={it.icon} />
                  <h3 className="text-fluid-h3 mt-8 font-medium text-foreground">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {it.desc}
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {it.tag}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-brand" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneMockup({
  accent,
  index,
  label,
  image,
}: {
  accent: string;
  index: number;
  label: string;
  image: string;
}) {
  // Wheel-hijack: while cursor hovers the phone screen, wheel scrolls the
  // internal content (page scroll is blocked). Outside the screen, content
  // stays static. Touch drag replicates the behavior for coarse pointers.
  // Placeholder content below — substitute by a real screenshot of the project.
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const inner = innerRef.current;
    if (!track || !inner) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let target = 0;
    let current = 0;
    let raf = 0;
    const maxOffset = () => Math.max(0, inner.offsetHeight - track.clientHeight);
    const clamp = (v: number) => Math.max(0, Math.min(maxOffset(), v));

    const tick = () => {
      // Lerp for smoothness
      const diff = target - current;
      if (Math.abs(diff) < 0.2) {
        current = target;
        inner.style.transform = `translate3d(0, ${-current}px, 0)`;
        raf = 0;
        return;
      }
      current += diff * (reduced ? 1 : 0.18);
      inner.style.transform = `translate3d(0, ${-current}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      const next = clamp(target + e.deltaY);
      // Only hijack page scroll if we can still absorb the delta;
      // otherwise let the page scroll naturally at the edges.
      if (next !== target) {
        e.preventDefault();
        target = next;
        schedule();
      }
    };

    // Touch drag (mobile/tablet)
    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY == null) return;
      const y = e.touches[0]?.clientY ?? touchY;
      const delta = touchY - y;
      const next = clamp(target + delta);
      if (next !== target) {
        e.preventDefault();
        target = next;
        touchY = y;
        schedule();
      }
    };
    const onTouchEnd = () => {
      touchY = null;
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: false });
    track.addEventListener("touchend", onTouchEnd, { passive: true });

    // Small initial stagger so cards don't all start at 0
    target = Math.min(index * 24, maxOffset());
    schedule();

    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [index]);


  return (
    <div className="relative mx-auto aspect-[9/19] w-[62%] max-w-[220px]">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[2.2rem] border border-white/15 bg-[oklch(0.09_0.005_150)] p-[6px] shadow-[0_30px_60px_-20px_oklch(0_0_0/0.8),0_0_0_1px_oklch(1_0_0/0.04)_inset] transition-transform duration-500 ease-out group-hover:-translate-y-1">
        {/* Screen */}
        <div
          ref={trackRef}
          className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-background cursor-ns-resize [touch-action:none]"
        >
          {/* PLACEHOLDER: substituir por <img src="/screenshots/projeto-XX.jpg" ... /> */}
          <div
            ref={innerRef}
            className="absolute inset-x-0 top-0 [will-change:transform]"
          >
            <img
              src={image}
              alt={label}
              className="w-full h-auto block"
            />
          

            {/* Fake page — hero */}
            {/* <div
              className="relative flex aspect-[9/16] flex-col justify-end p-3"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 20%, oklch(0.86 0.24 ${accent} / 0.28) 0%, transparent 60%),
                  linear-gradient(160deg, oklch(0.22 0.01 ${accent}) 0%, oklch(0.12 0.005 150) 100%)
                `,
              }}
            >
              <div className="flex items-center justify-between text-[6px] uppercase tracking-widest text-white/50">
                <span>Brand</span>
                <span>Menu</span>
              </div>
              <div className="mt-auto space-y-1.5">
                <div className="h-1 w-8 rounded-full" style={{ background: `oklch(0.86 0.24 ${accent})` }} />
                <div className="h-2 w-[85%] rounded-sm bg-white/85" />
                <div className="h-2 w-[65%] rounded-sm bg-white/70" />
                <div className="h-1 w-[75%] rounded-sm bg-white/25" />
                <div className="h-1 w-[55%] rounded-sm bg-white/25" />
                <div
                  className="mt-2 h-3 w-16 rounded-full"
                  style={{ background: `oklch(0.86 0.24 ${accent})` }}
                />
              </div>
            </div> */}

            {/* Features grid */}
            {/* <div className="grid grid-cols-2 gap-1.5 bg-[oklch(0.16_0.006_150)] p-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md border border-white/10 bg-white/5 p-1.5"
                >
                  <div
                    className="h-1.5 w-1.5 rounded-sm"
                    style={{ background: `oklch(0.86 0.24 ${accent})` }}
                  />
                  <div className="mt-1.5 h-1 w-3/4 rounded-sm bg-white/60" />
                  <div className="mt-1 h-1 w-1/2 rounded-sm bg-white/25" />
                </div>
              ))}
            </div> */}

            {/* Image block */}
            {/* <div
              className="aspect-[9/6]"
              style={{
                background: `
                  radial-gradient(circle at 70% 30%, oklch(0.86 0.24 ${accent} / 0.35) 0%, transparent 55%),
                  linear-gradient(200deg, oklch(0.28 0.02 ${accent}) 0%, oklch(0.14 0.005 150) 100%)
                `,
              }}
            /> */}

            {/* Text block */}
            {/* <div className="space-y-1.5 bg-background p-3">
              <div className="h-1.5 w-10 rounded-sm" style={{ background: `oklch(0.86 0.24 ${accent})` }} />
              <div className="h-1 w-full rounded-sm bg-white/25" />
              <div className="h-1 w-[90%] rounded-sm bg-white/25" />
              <div className="h-1 w-[70%] rounded-sm bg-white/25" />
              <div className="h-1 w-[80%] rounded-sm bg-white/25" />
            </div> */}

            {/* Testimonial cards */}
            {/* <div className="space-y-1.5 bg-[oklch(0.16_0.006_150)] p-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="rounded-md border border-white/10 bg-white/5 p-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full" style={{ background: `oklch(0.86 0.24 ${accent})` }} />
                    <div className="h-1 w-8 rounded-sm bg-white/60" />
                  </div>
                  <div className="mt-1.5 h-1 w-full rounded-sm bg-white/20" />
                  <div className="mt-1 h-1 w-2/3 rounded-sm bg-white/20" />
                </div>
              ))}
            </div> */}

            {/* CTA footer */}
            {/* 
            <div
              className="flex aspect-[9/7] flex-col items-center justify-center p-3 text-center"
              style={{
                background: `radial-gradient(ellipse at center, oklch(0.86 0.24 ${accent} / 0.25) 0%, transparent 70%), oklch(0.1 0.005 150)`,
              }}
            >
              <div className="h-1.5 w-14 rounded-sm bg-white/85" />
              <div className="mt-1 h-1.5 w-10 rounded-sm bg-white/60" />
              <div
                className="mt-2.5 h-3 w-16 rounded-full"
                style={{ background: `oklch(0.86 0.24 ${accent})` }}
              />
            </div>*/}
          </div>

          {/* Notch */}
          <div className="absolute left-1/2 top-1.5 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-black" />
          {/* Screen glare */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
            style={{
              background:
                "linear-gradient(115deg, oklch(1 0 0 / 0.06) 0%, transparent 30%, transparent 70%, oklch(1 0 0 / 0.04) 100%)",
            }}
          />
        </div>

        {/* Side buttons */}
        <div className="absolute -left-[2px] top-16 h-8 w-[2px] rounded-l bg-white/10" />
        <div className="absolute -left-[2px] top-28 h-12 w-[2px] rounded-l bg-white/10" />
        <div className="absolute -right-[2px] top-24 h-16 w-[2px] rounded-r bg-white/10" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

function Portfolio() {
  {/* PLACEHOLDER: substituir pelos projetos reais conforme forem entregues.
      Estrutura pronta pra adicionar mais cards. */}
  const projects = [
    { name: "Wr Studio Dental", category: "Landing Page", accent: "148", image: wrStudio, },
    { name: "Projeto 02", category: "Site Institucional", accent: "160", image: wrStudio, },
    { name: "Projeto 03", category: "E-commerce", accent: "140", image: wrStudio, },
  ];

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-eyebrow text-brand">Portfólio</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-fluid-h2 mt-4 max-w-3xl font-light">
            Trabalhos recentes<span className="text-brand">.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 140}>
              <a
                href="#"
                className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 grid-lines transition-opacity group-hover:opacity-60"
                  aria-hidden
                />
                <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="text-eyebrow text-brand/80">Preview</span>
                  <span>0{i + 1}</span>
                </div>

                <div className="relative z-10 my-4 flex flex-1 items-center justify-center">
                  <PhoneMockup accent={p.accent} index={i} image={p.image} label={`${p.name} — ${p.category}`} />
                </div>

                <div className="relative z-10 flex items-end justify-between">
                  <div>
                    <div className="text-fluid-h3 font-medium text-foreground">
                      {p.name}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {p.category}
                    </div>
                  </div>
                  <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 text-xs text-foreground backdrop-blur-sm transition-all group-hover:border-brand group-hover:text-brand">
                    Ver projeto
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}

          {/* Empty state card — honesto */}
          <Reveal delay={projects.length * 140}>
            <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center">
              <div className="text-eyebrow text-muted-foreground">Em breve</div>
              <p className="mt-3 text-fluid-h3 font-light text-foreground">
                Novos projetos<br />em breve<span className="text-brand">.</span>
              </p>
              <p className="mt-3 max-w-xs text-xs text-muted-foreground">
                Quer que o próximo case seja o seu? Fale comigo.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Briefing", d: "Entender objetivo, público e métrica de sucesso." },
    { n: "02", t: "Estrutura", d: "Wireframe e copy antes de qualquer pixel." },
    { n: "03", t: "Design", d: "Layout único, feito à mão. Sem template." },
    { n: "04", t: "Build", d: "Código limpo, rápido, responsivo por padrão." },
    { n: "05", t: "Entrega", d: "Deploy, ajustes finais e handover completo." },
  ];
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-eyebrow text-brand">Processo</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="text-fluid-h2 mt-4 max-w-3xl font-light">
            Do briefing ao deploy<span className="text-brand">.</span>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <li className="flex h-full flex-col justify-between bg-background p-6 transition-colors hover:bg-surface md:p-7">
                <div className="text-eyebrow text-brand">{s.n}</div>
                <div className="mt-16">
                  <div className="text-fluid-h3 font-medium text-foreground">{s.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CTAFeature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-brand">{icon}</div>
      <h3 className="text-sm font-semibold leading-tight text-foreground">
        {title}
      </h3>
      <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

function DeviceMockups() {
  /*
   * MacBook + iPhone mockup. FlyingCube animation lives inside the laptop screen
   * to reproduce "site 3D animado no dispositivo". Puro CSS/SVG — sem libs extras.
   */
  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* MacBook */}
      <div className="relative">
        {/* Lid */}
        <div className="relative rounded-[18px] border border-white/10 bg-gradient-to-b from-neutral-800 to-neutral-900 p-[10px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] border border-white/5 bg-background">
            {/* Fake browser UI inside laptop */}
            <div className="absolute inset-0 -z-0">
              <FlyingCube
                className="opacity-30"
              />
            </div>
            <div className="relative flex h-full flex-col p-4 md:p-6">
              <div className="flex items-center justify-between">

                <div className="hidden gap-4 text-[9px] text-muted-foreground md:flex">
                  <span>Início</span>
                  <span>Serviços</span>
                  <span>Projetos</span>
                  <span>Sobre</span>
                  <span>Contato</span>
                </div>
              </div>
              <div className="mt-auto max-w-[65%]">

                <h4 className="mt-1 text-[13px] font-light leading-tight text-foreground md:text-xl">
                  Transformamos<br />marcas em{" "}
                  <span className="text-brand">referências digitais</span>
                </h4>
                <p className="mt-2 hidden text-[9px] text-muted-foreground md:block md:text-[10px]">
                  Estratégia, design e tecnologia para construir autoridade,
                  gerar demanda e escalar resultados.
                </p>
                <div className="mt-3 inline-flex h-6 items-center gap-1 rounded-full border border-brand/60 px-3 text-[9px] text-brand md:h-7 md:text-[10px]">
                  Falar com especialista <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Base */}
        <div className="relative mx-auto h-[10px] w-full">
          <div className="absolute inset-x-[-4%] top-0 h-[10px] rounded-b-[14px] bg-gradient-to-b from-neutral-700 to-neutral-900" />
          <div className="absolute left-1/2 top-0 h-[6px] w-[80px] -translate-x-1/2 rounded-b-full bg-neutral-800" />
        </div>
      </div>

      {/* iPhone — floating right */}
      <div className="absolute -bottom-6 right-[-6%] w-[26%] md:-bottom-10 md:right-[-8%] md:w-[30%]">
        <div className="rounded-[22px] border border-white/10 bg-neutral-900 p-[4px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[18px] border border-white/5 bg-background">



            {/* Notch */}
            <div className="absolute left-1/2 top-1.5 z-10 h-2.5 w-10 -translate-x-1/2 rounded-full bg-black md:h-3 md:w-12" />
            <div className="relative flex h-full flex-col p-2.5 md:p-3">
              <div className="flex items-center justify-between pt-3">

                <div className="flex flex-col gap-[2px]">
                  <span className="h-[1.5px] w-3 rounded-full bg-foreground/70" />
                  <span className="h-[1.5px] w-3 rounded-full bg-foreground/70" />
                </div>
              </div>
              <div className="mt-auto">

                <h4 className="mt-1 text-[10px] font-light leading-tight text-foreground">
                  Transformamos marcas em{" "}
                  <span className="text-brand">referências digitais</span>
                </h4>
                <div className="mt-2 inline-flex h-5 items-center gap-1 rounded-full border border-brand/60 px-2 text-[7px] text-brand">
                  Falar com especialista <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-background py-24 md:py-32"
    >
      <div
        className="absolute inset-0 -z-10 bg-radial-glow opacity-70"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 md:px-8 lg:grid-cols-2 lg:gap-12">
        {/* LEFT — texto */}
        <div>


          <Reveal delay={80}>
            <h2 className="text-fluid-h2 mt-6 font-light tracking-tight text-foreground">
              Enquanto sua concorrência disputa preço, nós construímos{" "}
              <span className="text-brand">autoridade.</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Criamos ecossistemas digitais que aumentam a percepção de valor,
              aceleram o atendimento e transformam visitantes em clientes
              preparados para comprar.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
              <CTAFeature
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
                    <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
                    <path d="M9.5 12l2 2 3.5-4" />
                  </svg>
                }
                title="Autoridade no primeiro clique"
                desc="Transmitimos confiança imediata e aumentamos sua percepção de valor."
              />
              <CTAFeature
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
                    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                  </svg>
                }
                title="Atendimento que converte"
                desc="Velocidade e automação para não perder nenhuma oportunidade."
              />
              <CTAFeature
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
                  </svg>
                }
                title="Design que retém atenção"
                desc="Experiências imersivas que prendem o olhar e geram ação."
              />
              <CTAFeature
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                    <path d="M11 18h2" />
                  </svg>
                }
                title="Design 100% responsivo"
                desc="Perfeito em qualquer tela, do mobile ao ultrawide."
              />
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-brand/30 bg-brand/[0.04] p-5">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-brand/40 bg-brand/10 text-brand">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
                  <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
                  <path d="M3 7l9 5 9-5M12 12v10" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Não entregamos apenas um site.
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Construímos uma presença digital que trabalha pela sua empresa
                  24 horas por dia, todos os dias.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8">
              <a
                href={WHATSAPP_URL}
                {...EXTERNAL_LINK_PROPS}
                className="group animate-glow-pulse relative inline-flex h-14 items-center gap-3 rounded-full bg-brand px-8 text-base font-semibold text-brand-foreground transition-all duration-300 ease-out hover:scale-[1.03]"
              >
                Quero transformar minha marca em referência
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — mockups */}
        <Reveal delay={200}>
          <div className="relative">
            <DeviceMockups />
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden bg-background py-32 md:py-48"
    >
      <FlyingCube
        className="opacity-30"
      />

      <div
        className="absolute inset-0 -z-10 bg-radial-glow opacity-80"
        aria-hidden

      />


      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
        aria-hidden
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center md:px-8">
        <Reveal>
          <p className="text-eyebrow text-brand">Vamos conversar</p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-fluid-h2 mt-6 font-light tracking-tight text-foreground">
            Sua próxima marca de{" "}
            <span className="text-brand">referência</span> começa com uma
            conversa.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Resposta em até 24 horas. Sem formulário, sem enrolação.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12">
            <a
              href={WHATSAPP_URL}
              {...EXTERNAL_LINK_PROPS}
              className="group animate-glow-pulse relative inline-flex h-14 items-center gap-3 rounded-full bg-brand px-9 text-base font-semibold text-brand-foreground transition-all duration-300 ease-out hover:scale-[1.03]"
            >
              Iniciar conversa no WhatsApp
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 text-sm text-muted-foreground md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">DIEGO<span className="text-brand">.</span>TERRA</span>
          <span className="text-muted-foreground/60">
            © {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={WHATSAPP_URL}
            {...EXTERNAL_LINK_PROPS}
            className="transition-colors hover:text-brand"
          >
            WhatsApp
          </a>
          <a
            href={LINKEDIN_URL}
            {...EXTERNAL_LINK_PROPS}
            className="transition-colors hover:text-brand"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    // Fast loader: 1.2s total before starting exit transition.
    const timer = setTimeout(() => {
      onDone();
    }, 1200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background loader-exit">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="loader-ring h-12 w-12 rounded-full border-2 border-border border-t-brand" />
          <span className="absolute text-lg font-semibold tracking-tight text-foreground">
            DT
          </span>
        </div>
        <span className="text-eyebrow text-muted-foreground">Diego Terra</span>
      </div>
    </div>
  );
}

export function DiegoTerraLanding() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loader is visible.
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <main className="relative min-h-screen bg-background text-foreground antialiased">
        <CustomCursor />
        <Nav />
        <Hero />
        <SectionDivider />
        {/* <Proof /> */}
        <CTA />
        <SectionDivider direction="rtl" />
        <About />
        <SectionDivider />
        <Services />
        <SectionDivider direction="rtl" />
        <Portfolio />
        <SectionDivider />
        <Process />
        <SectionDivider direction="rtl" />
        <FinalCTA />
        <SectionDivider />
        <Footer />
      </main>
    </>
  );
}


