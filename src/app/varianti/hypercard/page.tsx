import Image from "next/image";
import type { Metadata } from "next";
import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";
import { aboutParagraphs, cvPdfHref, footerText, socials } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "Hypercard CV preview",
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

export default function HypercardVariantPage() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <main className={styles.frame}>
        <div className="mb-4 flex items-center justify-end gap-2">
          <ThemeToggle />
        </div>

        <section className={styles.grid}>
          <article className={styles.panel}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-hot)]">
              Senior Frontend Developer
            </p>
            <h1 className="mt-1 font-display text-3xl">Marco Burrometo</h1>
            <h2 className="mt-4 font-display text-2xl">About</h2>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {aboutParagraphs.map((line) => (
                <p className="text-sm text-[var(--text-soft)]" key={line}>
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-4">
              {socials.map((social) => (
                <a className={styles.badge} href={social.href} key={social.label} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
              <a className={styles.badge} download="marco-burrometo-cv.pdf" href={cvPdfHref}>
                Download CV
              </a>
            </div>
          </article>

          <article className={styles.panel}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                alt="Marco Burrometo"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 480px"
                src="/media/marco_full.jpg"
                className="object-cover"
              />
            </div>
            <h2 className="mt-3 font-display text-2xl">Skills</h2>
            <div className={styles.skillGroups}>
              {typedSkillGroups.map((group) => (
                <section className={styles.skillGroup} key={group.category}>
                  <h3>{group.category}</h3>
                  <div className={styles.skillTags}>
                    {group.items.map((item) => (
                      <span className={styles.skillTag} key={item}>{item}</span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.timeline}>
          {typedExperiences.map((exp, index) => (
            <article className={styles.item} key={`${exp.period}-${index}`}>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent-neon)]">{exp.period}</p>
              <p className="mt-1 font-semibold">{exp.place || "Freelance Projects"}</p>
              <p className="mt-2 text-sm text-[var(--text-soft)]">{exp.description}</p>
              <p className="mt-2 text-xs text-[var(--accent-lime)]">{exp.technologies}</p>
              {exp.link ? (
                <a className={styles.projectLink} href={exp.link} target="_blank" rel="noreferrer">
                  Project site <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </article>
          ))}
        </section>

        <footer className="mt-6 text-center text-xs text-[var(--text-soft)] md:text-sm">
          {footerText.replace("{year}", String(year))}
        </footer>
      </main>
    </div>
  );
}
