import Image from "next/image";
import { connection } from "next/server";
import * as motion from "motion/react-client";
import experiences from "@/data/experiences.json";
import { footerText, socials } from "@/data/profile";
import skills from "@/data/skills.json";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeToggle } from "@/components/theme-toggle";

type Experience = {
  period: string;
  description: string;
  place: string;
  link?: string;
  technologies: string;
};

type SkillGroup = {
  category: string;
  items: string[];
};

const typedExperiences = experiences as Experience[];
const typedSkillGroups = skills as SkillGroup[];

export default async function Home() {
  await connection();

  const defaultVariantLoaders = {
    hypercard: () => import("./varianti/hypercard/page"),
    "editorial-pop": () => import("./varianti/editorial-pop/page"),
    "mono-terminal": () => import("./varianti/mono-terminal/page"),
    antigravity: () => import("./varianti/antigravity/page"),
    "signal-bloom": () => import("./varianti/signal-bloom/page"),
    televideo: () => import("./varianti/televideo/page"),
    animejs: () => import("./varianti/animejs/page"),
  };
  const selectedVariant = process.env.DEFAULT_CV_VARIANT ?? "default";
  const loadSelectedVariant =
    selectedVariant === "default"
      ? undefined
      : defaultVariantLoaders[selectedVariant as keyof typeof defaultVariantLoaders];

  if (loadSelectedVariant) {
    const { default: SelectedVariant } = await loadSelectedVariant();
    return <SelectedVariant />;
  }

  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen overflow-x-hidden pb-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(43,255,224,0.2)_0,transparent_35%),radial-gradient(circle_at_85%_20%,rgba(255,42,109,0.22)_0,transparent_38%),radial-gradient(circle_at_50%_80%,rgba(174,255,0,0.18)_0,transparent_40%)]" />

      <header className="mx-auto flex w-full max-w-6xl items-start justify-between gap-3 px-5 pt-6 sm:items-center md:px-8">
        <p aria-hidden="true" className="font-display text-lg font-semibold tracking-[0.18em] md:text-xl">
          MB
        </p>
        <ThemeToggle />
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 pt-5 md:gap-10 md:px-8 md:pt-8 lg:grid-cols-[1.1fr_0.9fr]">
        <MotionProvider>
        <section className="glass-panel flex min-w-0 flex-col gap-8 p-6 md:p-9">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.28em] text-(--accent-neon)">
              Senior Software Engineer · Frontend Architecture
            </p>
            <h1
              aria-label="Marco Burrometo"
              className="font-display text-3xl leading-[1.02] break-words sm:text-4xl md:text-6xl"
            >
              <motion.span
                aria-hidden="true"
                animate={{ y: 0 }}
                className="inline-block"
                initial={{ y: 10 }}
                transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              >
                Marco
              </motion.span>
              {" "}
              <motion.span
                aria-hidden="true"
                animate={{ y: 0 }}
                className="inline-block"
                initial={{ y: 10 }}
                transition={{ delay: 0.1, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              >
                Burrometo
              </motion.span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-(--text-soft) md:text-base">
              I design and develop high-impact interfaces with a strong focus on
              user experience, performance, and business results.
            </p>
          </div>

          <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-(--text-soft)">
            <p>
              Software engineer with 14+ years of experience across web and mobile
              products. Hands-on in React, React Native, TypeScript, and
              Node.js, with a background in frontend architecture, technical
              leadership, and full-stack delivery. I work with international
              teams on products used at scale.
            </p>
            <p>
              Off the clock, I’m playing bass, producing music, collecting vinyl and vintage hi-fi equipment, or sailing
              and fishing. I’m also a dachshund owner and dad to Gabriele and
              Camilla.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <motion.a
                className="group rounded-full border border-(--line) bg-(--surface) px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:border-(--accent-neon) hover:text-(--accent-neon)"
                data-ga-event="social_click"
                data-ga-label={social.label}
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target="_blank"
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                whileFocus={{ y: -2 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {social.label}
              </motion.a>
            ))}
          </div>
        </section>

        <aside className="min-w-0 space-y-8">
          <section className="glass-panel p-6 md:p-8">
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

          <section className="glass-panel p-6 md:p-8">
            <h2 className="font-display text-2xl">Tech Stack</h2>
            <div className="mt-5 space-y-5">
              {typedSkillGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.16em] text-(--accent-hot)">
                    {group.category}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        className="rounded-full border border-(--line) bg-(--surface-soft) px-3 py-1.5 text-xs"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
        </MotionProvider>
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
                <p className="mt-2 text-base font-semibold break-words">{exp.place || "Freelance Projects"}</p>
                <p className="mt-2 text-sm text-(--text-soft)">{exp.description}</p>
                <p className="mt-3 text-xs break-words text-(--accent-lime)">{exp.technologies}</p>
                {exp.link ? (
                  <a
                    className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-(--accent-hot) hover:text-(--accent-neon)"
                    data-ga-event="project_click"
                    data-ga-label={exp.place || "Freelance Projects"}
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

      <footer className="mx-auto mt-8 w-full max-w-6xl break-words px-5 pb-4 text-center text-xs text-(--text-soft) md:px-8 md:text-sm">
        {footerText.replace("{year}", String(year))}
      </footer>
    </div>
  );
}
