import Image from "next/image";
import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";
import { aboutParagraphs, cvPdfHref, footerText, socials } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./styles.module.css";

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
            <h2 className="font-display text-2xl">Manifesto</h2>
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
                <a className={styles.link} href={social.href} key={social.label} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
              <a className={styles.link} download="marco-burrometo-cv.pdf" href={cvPdfHref}>
                Download CV
              </a>
            </div>
          </article>
        </section>

        <section className={styles.blockGrid}>
          <article className={styles.block}>
            <h2 className="font-display text-2xl">Core Skills</h2>
            <div className="mt-3 grid gap-2">
              {typedSkills.slice(0, 10).map((skill) => (
                <p className="text-sm" key={skill.description}>
                  <strong>{skill.pct}%</strong> · {skill.description}
                </p>
              ))}
            </div>
          </article>

          <article className={styles.block}>
            <h2 className="font-display text-2xl">Experience Cuts</h2>
            <div className={styles.exp}>
              {typedExperiences.slice(0, 5).map((exp, index) => (
                <div className={styles.expCard} key={`${exp.period}-${index}`}>
                  <p className="text-xs uppercase tracking-[0.13em] text-[var(--accent-hot)]">{exp.period}</p>
                  <p className="mt-1 font-semibold">{exp.place || "Freelance Projects"}</p>
                  <p className="mt-2 text-sm text-[var(--text-soft)]">{exp.description}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className="mt-6 text-center text-xs text-[var(--text-soft)] md:text-sm">
          {footerText.replace("{year}", String(year))}
        </footer>
      </main>
    </div>
  );
}
