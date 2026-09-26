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

type SkillGroup = {
  category: string;
  items: string[];
};

const typedExperiences = experiences as Experience[];
const typedSkillGroups = skills as SkillGroup[];

export default function MonoTerminalVariantPage() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <main className={styles.wrap}>
        <header className={styles.topbar}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>MB</span>
            <span>Marco Burrometo</span>
          </div>
          <p className={styles.status}><span aria-hidden="true" /> CV / 2026</p>
          <ThemeToggle />
        </header>

        <section className={styles.profile}>
          <div className={styles.profilePhoto}>
            <Image
              alt="Marco Burrometo"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 700px) 36vw, 230px"
              src="/media/marco_full.jpg"
            />
          </div>

          <div className={styles.profileContent}>
            <p className={styles.eyebrow}>FRONTEND ENGINEER / PRODUCT FOCUS</p>
            <h1>Marco Burrometo</h1>
            <div className={styles.bio}>
              {aboutParagraphs.slice(0, 4).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.socials}>
              {socials.map((social) => (
                <a href={social.href} key={social.label} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
              <a download="marco-burrometo-cv.pdf" href={cvPdfHref}>
                Download CV
              </a>
            </div>
            <div className={styles.interests}>
              <span className={styles.eyebrow}>OUTSIDE WORK</span>
              <div>
                {aboutParagraphs.slice(4).map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={styles.resumeGrid}>
          <section className={styles.skills}>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>01 / TOOLKIT</p>
              <h2>Skills</h2>
            </header>
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
          </section>

          <section className={styles.experience}>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>02 / CAREER LOG</p>
              <h2>Experience</h2>
            </header>
            <div className={styles.experienceList}>
              {typedExperiences.map((exp, index) => (
                <article className={styles.experienceItem} key={`${exp.period}-${index}`}>
                  <p className={styles.period}>{exp.period}</p>
                  <div>
                    <h3>{exp.place || "Freelance Projects"}</h3>
                    <p className={styles.description}>{exp.description}</p>
                    <p className={styles.technologies}>{exp.technologies}</p>
                    {exp.link ? (
                      <a className={styles.projectLink} href={exp.link} target="_blank" rel="noreferrer">
                        Open project <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          {footerText.replace("{year}", String(year))}
        </footer>
      </main>
    </div>
  );
}
