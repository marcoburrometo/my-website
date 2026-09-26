import Image from "next/image";
import type { Metadata } from "next";
import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";
import { aboutParagraphs, cvPdfHref, footerText, socials } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "Editorial Pop CV preview",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

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

export default function EditorialPopVariantPage() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>

        <section className={styles.blockGrid}>
          <article className={styles.block}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-hot)]">
              Senior Frontend Developer
            </p>
            <h1 className="mt-1 font-display text-3xl">Marco Burrometo</h1>
            <h2 className="mt-3 font-display text-2xl">Manifesto</h2>
            <div className="mt-3 grid gap-2">
              {aboutParagraphs.slice(0, 6).map((line) => (
                <p className="text-sm" key={line}>
                  {line}
                </p>
              ))}
            </div>
          </article>

          <article className={styles.block}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
              <Image
                alt="Marco Burrometo"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 520px"
                src="/media/marco.jpg"
                className="object-cover"
              />
            </div>
            <div className={styles.linkBar}>
              {socials.map((social) => (
                <a className={styles.link} data-ga-event="social_click" data-ga-label={social.label} href={social.href} key={social.label} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
              <a className={styles.link} download="marco-burrometo-cv.pdf" href={cvPdfHref}>
                Download CV
              </a>
            </div>
          </article>
        </section>

        <section className={styles.stackSection}>
          <h2 className="font-display text-2xl">Tech Stack</h2>
          <div className={styles.skillGroups}>
            {typedSkillGroups.map((group) => (
              <article className={styles.skillGroup} key={group.category}>
                <h3>{group.category}</h3>
                <div className={styles.skillTags}>
                  {group.items.map((item) => (
                    <span className={styles.skillTag} key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.experienceSection}>
          <h2 className="font-display text-2xl">Experience</h2>
          <div className={styles.exp}>
            {typedExperiences.map((exp, index) => (
              <article className={styles.expCard} key={`${exp.period}-${index}`}>
                <p className="text-xs uppercase tracking-[0.13em] text-[var(--accent-hot)]">{exp.period}</p>
                <p className="mt-1 font-semibold">{exp.place || "Freelance Projects"}</p>
                <p className="mt-2 text-sm text-[var(--text-soft)]">{exp.description}</p>
                <p className="mt-2 text-xs text-[var(--accent-neon)]">{exp.technologies}</p>
                {exp.link ? (
                  <a className={styles.projectLink} data-ga-event="project_click" data-ga-label={exp.place || "Freelance Projects"} href={exp.link} target="_blank" rel="noreferrer">
                    Project site <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-6 text-center text-xs text-[var(--text-soft)] md:text-sm">
          {footerText.replace("{year}", String(year))}
        </footer>
      </main>
    </div>
  );
}
