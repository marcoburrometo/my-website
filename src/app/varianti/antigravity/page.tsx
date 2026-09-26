import Image from "next/image";
import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";
import { aboutParagraphs, cvPdfHref, footerText, socials } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { MouseParticles } from "./mouse-particles";
import styles from "./styles.module.css";

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

export default function AntigravityVariantPage() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <div className={styles.canvas}>
        <MouseParticles />
      </div>

      <main className={styles.overlay}>
        <section className={styles.grid}>
          <article className={`${styles.card} ${styles.manifestCard}`}>
            <div className={styles.manifestHeader}>
              <h2 className="font-display text-2xl">Manifest</h2>
              <ThemeToggle />
            </div>
            <div className={styles.manifestLayout}>
              <div className={styles.manifestPhoto}>
                <Image
                  alt="Marco Burrometo"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 520px) 96px, 170px"
                  src="/media/marco_full.jpg"
                />
              </div>
              <div className={styles.manifestCopy}>
                {aboutParagraphs.map((line) => (
                  <p className="text-sm text-(--ag-text-soft)" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.badges}>
              {socials.map((social) => (
                <a className={styles.badge} href={social.href} key={social.label} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
              <a className={styles.downloadBadge} download="marco-burrometo-cv.pdf" href={cvPdfHref}>
                Download CV
              </a>
            </div>
          </article>

          <article className={styles.card}>
            <h2 className="font-display text-2xl">Tech Stack</h2>
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

          <article className={`${styles.card} ${styles.experienceCard}`}>
            <h2 className="font-display text-2xl">Experience Stream</h2>
            <div className={styles.expList}>
              {typedExperiences.map((exp, index) => (
                <div className={styles.expItem} key={`${exp.period}-${index}`}>
                  <p className="text-xs uppercase tracking-[0.14em] text-(--ag-accent)">{exp.period}</p>
                  <p className="mt-1 text-sm font-semibold">{exp.place || "Freelance Projects"}</p>
                  <p className="mt-1 text-sm text-(--ag-text-soft)">{exp.description}</p>
                  <p className="mt-2 text-xs text-(--ag-accent)">{exp.technologies}</p>
                  {exp.link ? (
                    <a className={styles.projectLink} href={exp.link} target="_blank" rel="noreferrer">
                      Project site <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className="mt-5 text-center text-xs text-(--ag-text-soft) md:text-sm">
          {footerText.replace("{year}", String(year))}
        </footer>
      </main>
    </div>
  );
}
