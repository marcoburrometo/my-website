import Image from "next/image";
import { randomInt } from "node:crypto";
import { connection } from "next/server";
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

const experienceLinkLabels: Record<string, string> = {
  "@Facile.it": "Visit Facile.it",
  "@BimboMap": "Visit BimboMap",
  "@Jimmy Technologies · PWC USA": "Visit Jimmy Technologies",
  "@Jimmy Technologies, Prague": "Visit Jimmy Technologies",
  "@Freelance · Terminal One": "Visit Terminal One booking site",
  "@Davinci Salute, Milan · Elty": "Visit Elty",
  "@Levuro AG, Zurich": "Visit Levuro",
  "@Freelance · Tuttosport / Corriere dello Sport": "Visit Tuttosport",
  "@Visup, Gemona del Friuli": "Visit Visup",
  "@Biotec SRL, Dueville": "Visit Biotec",
};

const experienceHeadlines: Record<string, string> = {
  "@Facile.it": "Facile.it · Full-stack developer",
  "@BimboMap": "BimboMap · Personal side project",
  "@Jimmy Technologies · PWC USA": "Senior developer for PWC USA · Jimmy Technologies",
  "@Jimmy Technologies, Prague": "Freelance senior developer · Jimmy Technologies, Prague",
};

export default async function SignalBloomVariantPage() {
  await connection();

  const palette = randomInt(2) === 0 ? "fuchsia" : "violet";
  const year = new Date().getFullYear();

  return (
    <div className={styles.page} data-color-theme={palette}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1><span>Marco</span><span className={styles.surname}>Burrometo</span></h1>
            <div className={styles.roleLine}>
              <span>Senior Software Engineer</span>
            </div>
            <p className={styles.lead}>
              I build web and mobile products across high-traffic platforms. My
              BimboMap side project reached 8k users in two months.
            </p>
            <div className={styles.actions}>
              <a className={styles.download} download="marco-burrometo-cv.pdf" href={cvPdfHref}>
                Download CV <span aria-hidden="true">↓</span>
              </a>
              <ThemeToggle />
            </div>
            <nav aria-label="Social profiles" className={styles.socials}>
              {socials.map((social) => (
                <a
                  data-ga-event="social_click"
                  data-ga-label={social.label}
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

          <section aria-labelledby="impact-heading" className={styles.impactSection}>
            <h2 id="impact-heading">Selected impact</h2>
            <ul className={styles.impactList}>
              <li>BimboMap reached 3k users in two weeks and 8k in two months.</li>
              <li>Delivers features at Facile.it, a platform with millions of weekly visits.</li>
              <li>Led frontend architecture for sports apps serving around 200k daily users.</li>
            </ul>
          </section>

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
        </section>

        <section aria-labelledby="experience-heading" className={styles.experienceSection}>
          <header className={styles.sectionHeading}>
            <h2 id="experience-heading">Experience</h2>
            <p>Selected roles across frontend leadership, mobile apps, and product engineering.</p>
          </header>
          <div className={styles.experienceList}>
            {typedExperiences.map((experience, index) => (
              <article className={styles.experienceItem} key={`${experience.period}-${index}`}>
                <p className={styles.period}>{experience.period}</p>
                <div className={styles.experienceBody}>
                  <h3>{experienceHeadlines[experience.place] ?? (experience.place || "Freelance Projects")}</h3>
                  <p>{experience.description}</p>
                  <p className={styles.technologies}>{experience.technologies}</p>
                  {experience.link ? (
                    <a
                      aria-label={experienceLinkLabels[experience.place] ?? `Visit ${experience.place.replace(/^@/, "")}`}
                      data-ga-event="project_click"
                      data-ga-label={experience.place || "Freelance Projects"}
                      href={experience.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {experienceLinkLabels[experience.place] ?? "Visit website"} <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="contact-heading" className={styles.contactSection}>
          <div>
            <h2 id="contact-heading">Let’s build something useful.</h2>
            <p>Have a product or team that could use my experience?</p>
          </div>
          <div className={styles.contactActions}>
            <a
              className={styles.contactLink}
              data-ga-event="contact_click"
              data-ga-label="Email"
              href="mailto:marco.burrometo@gmail.com"
            >
              Email Marco
            </a>
            <a
              className={styles.contactDownload}
              data-ga-event="cv_download"
              href={cvPdfHref}
              download="marco-burrometo-cv.pdf"
            >
              Download CV
            </a>
          </div>
        </section>

        <section aria-labelledby="skills-heading" className={styles.skillsSection}>
          <header className={styles.sectionHeading}>
            <h2 id="skills-heading">Technologies</h2>
            <p>Technologies and practices used across shipped products.</p>
          </header>
          <div className={styles.skillGroups}>
            {typedSkillGroups.map((group, groupIndex) => (
              <details className={styles.skillGroup} key={group.category} open={groupIndex === 0}>
                <summary>
                  {group.category} <span>{group.items.length}</span>
                </summary>
                <div className={styles.skillTags}>
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-heading" className={styles.notesSection}>
          <h2 id="about-heading">About me</h2>
          <details className={styles.personalNotes}>
            <summary>Personal notes</summary>
            <div className={styles.notes}>
              {aboutParagraphs.slice(0, 3).concat(aboutParagraphs.slice(4)).map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </details>
        </section>

        <footer className={styles.footer}>{footerText.replace("{year}", String(year))}</footer>
      </main>
    </div>
  );
}