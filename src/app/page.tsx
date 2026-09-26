import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import HypercardVariantPage from "./varianti/hypercard/page";
import EditorialPopVariantPage from "./varianti/editorial-pop/page";
import MonoTerminalVariantPage from "./varianti/mono-terminal/page";
import AntigravityVariantPage from "./varianti/antigravity/page";
import experiences from "@/data/experiences.json";
import { aboutParagraphs, footerText, socials } from "@/data/profile";
import skills from "@/data/skills.json";
import { ThemeToggle } from "@/components/theme-toggle";

type Experience = {
  period: string;
  description: string;
  place: string;
  link?: string;
  technologies: string;
};

type Skill = {
  description: string;
  pct: number;
};

const typedExperiences = experiences as Experience[];
const typedSkills = skills as Skill[];

export default async function Home() {
  await connection();

  const defaultVariantPages = {
    hypercard: HypercardVariantPage,
    "editorial-pop": EditorialPopVariantPage,
    "mono-terminal": MonoTerminalVariantPage,
    antigravity: AntigravityVariantPage,
  };
  const defaultVariant = process.env.DEFAULT_CV_VARIANT;
  const SelectedVariant = defaultVariant
    ? defaultVariantPages[defaultVariant as keyof typeof defaultVariantPages]
    : undefined;

  if (SelectedVariant) {
    return <SelectedVariant />;
  }

  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen overflow-hidden pb-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(43,255,224,0.2)_0,transparent_35%),radial-gradient(circle_at_85%_20%,rgba(255,42,109,0.22)_0,transparent_38%),radial-gradient(circle_at_50%_80%,rgba(174,255,0,0.18)_0,transparent_40%)]" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 md:px-8">
        <p className="font-display text-lg font-semibold tracking-wide md:text-xl">
          Marco Burrometo
        </p>
        <ThemeToggle />
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 pt-5 md:gap-10 md:px-8 md:pt-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel space-y-8 p-6 md:p-9">
          <div className="space-y-4 animate-rise">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--accent-neon)">
              Frontend Engineer · Product Mindset
            </p>
            <h1 className="font-display text-4xl leading-[1.02] md:text-6xl">
              Building digital products that feel alive.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-(--text-soft) md:text-base">
              I design and develop high-impact interfaces with a strong focus on
              user experience, performance, and business results.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 animate-rise-delay-1">
            {aboutParagraphs.map((line) => (
              <p
                className="rounded-2xl border border-(--line) bg-(--surface-soft) p-4 text-sm leading-relaxed text-(--text-soft)"
                key={line}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="animate-rise-delay-2 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                className="group rounded-full border border-(--line) bg-(--surface) px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:border-(--accent-neon) hover:text-(--accent-neon)"
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                {social.label}
              </a>
            ))}
            <Link
              className="group rounded-full border border-(--line) bg-(--surface) px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:border-(--accent-hot) hover:text-(--accent-hot)"
              href="/varianti"
            >
              Varianti Design
            </Link>
          </div>
        </section>

        <aside className="space-y-8">
          <section className="glass-panel p-6 md:p-8 animate-rise-delay-1">
            <div className="relative mb-5 aspect-4/3 overflow-hidden rounded-3xl border border-(--line)">
              <Image
                alt="Marco Burrometo portrait"
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                src="/media/marco_full.jpg"
              />
            </div>
            <p className="text-sm text-(--text-soft)">
              Northern Italy based. Worldwide mindset. Technology, music, and
              craftsmanship in every release.
            </p>
          </section>

          <section className="glass-panel p-6 md:p-8 animate-rise-delay-2">
            <h2 className="font-display text-2xl">Skills Radar</h2>
            <div className="mt-5 space-y-4">
              {typedSkills.map((skill) => (
                <div key={skill.description}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                    <span>{skill.description}</span>
                    <span className="font-semibold text-(--accent-hot)">
                      {skill.pct}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-(--line)">
                    <div
                      className="h-2 rounded-full bg-[linear-gradient(90deg,var(--accent-hot),var(--accent-neon),var(--accent-lime))]"
                      style={{ width: `${skill.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>

      <section className="mx-auto mt-8 w-full max-w-6xl px-5 md:px-8">
        <div className="glass-panel p-6 md:p-8">
          <h2 className="font-display text-2xl">Experience Timeline</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {typedExperiences.map((exp, index) => (
              <article
                className="rounded-2xl border border-(--line) bg-(--surface-soft) p-4"
                key={`${exp.period}-${index}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--accent-neon)">
                  {exp.period}
                </p>
                <p className="mt-2 text-base font-semibold">{exp.place || "Freelance Projects"}</p>
                <p className="mt-2 text-sm text-(--text-soft)">{exp.description}</p>
                <p className="mt-3 text-xs text-(--accent-lime)">{exp.technologies}</p>
                {exp.link ? (
                  <a
                    className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-(--accent-hot) hover:text-(--accent-neon)"
                    href={exp.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Visit
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-8 w-full max-w-6xl px-5 pb-4 text-center text-xs text-(--text-soft) md:px-8 md:text-sm">
        {footerText.replace("{year}", String(year))}
      </footer>
    </div>
  );
}
