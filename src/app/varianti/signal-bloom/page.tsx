import Image from "next/image";
import type { Metadata } from "next";
import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";
import { aboutParagraphs, cvPdfHref, footerText, socials } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "Signal Bloom CV preview",
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

export default function SignalBloomVariantPage() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Software engineering / Product development</p>
            <h1><span>Marco</span><span className={styles.surname}>Burrometo</span></h1>
            <div className={styles.roleLine}>
              <span>Senior Software Engineer</span>
            </div>
            <p className={styles.lead}>{aboutParagraphs[3]}</p>
            <div className={styles.actions}>
              <a className={styles.download} download="marco-burrometo-cv.pdf" href={cvPdfHref}>
                Download CV <span aria-hidden="true">↓</span>
              </a>
              <ThemeToggle />
            </div>
            <nav aria-label="Social profiles" className={styles.socials}>
              {socials.map((social) => (
                <a
                  href={social.href}
                  key={social.label}
                  rel={social.href.startsWith("https://") ? "noreferrer" : undefined}
                  target={social.href.startsWith("https://") ? "_blank" : undefined}
                >
                  {social.label}<span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
          </div>

          <figure className={styles.portraitFrame}>
            <Image
              alt="Portrait of Marco Burrometo"
              className={styles.portrait}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 44vw"
              src="/media/marco_full.jpg"
            />
            <figcaption><span>Marco Burrometo</span><span>Northern Italy</span></figcaption>
          </figure>
          <span aria-hidden="true" className={styles.heroIndex}>01</span>
        </section>

        <section aria-labelledby="about-heading" className={styles.notesSection}>
          <p className={styles.sectionIndex}>01 <span>About</span></p>
          <div className={styles.notesContent}>
            <h2 id="about-heading">About me</h2>
            <div className={styles.notes}>
              {aboutParagraphs.slice(0, 3).concat(aboutParagraphs.slice(4)).map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="skills-heading" className={styles.skillsSection}>
          <header className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>02 <span>Skills</span></p>
            <h2 id="skills-heading">Technologies</h2>
            <p>Technologies and practices used across shipped products.</p>
          </header>
          <div className={styles.skillGroups}>
            {typedSkillGroups.map((group, groupIndex) => (
              <article className={styles.skillGroup} key={group.category}>
                <p className={styles.groupNumber}>{String(groupIndex + 1).padStart(2, "0")}</p>
                <h3>{group.category}</h3>
                <div className={styles.skillTags}>
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-heading" className={styles.experienceSection}>
          <header className={styles.sectionHeading}>
            <p className={styles.sectionIndex}>03 <span>Experience</span></p>
            <h2 id="experience-heading">Experience</h2>
          </header>
          <div className={styles.experienceList}>
            {typedExperiences.map((experience, index) => (
              <article className={styles.experienceItem} key={`${experience.period}-${index}`}>
                <p className={styles.period}>{experience.period}</p>
                <div className={styles.experienceBody}>
                  <h3>{experience.place || "Freelance Projects"}</h3>
                  <p>{experience.description}</p>
                  <p className={styles.technologies}>{experience.technologies}</p>
                  {experience.link ? (
                    <a href={experience.link} rel="noreferrer" target="_blank">
                      Visit project <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>{footerText.replace("{year}", String(year))}</footer>
      </main>
    </div>
  );
}