import Link from "next/link";
import type { Metadata } from "next";
import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";
import { aboutParagraphs, cvPdfHref, footerText, socials } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "Televideo CV preview",
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
const televideoFrameworks = new Set([
  "Next.js",
  "Expo",
  "NestJS",
  "GraphQL",
  "Redux",
  "Zustand",
  "D3.js",
]);
const televideoSkillGroups = typedSkillGroups.map((group) =>
  group.category === "Frameworks & libraries"
    ? { ...group, items: group.items.filter((item) => televideoFrameworks.has(item)) }
    : group,
);

export default function TelevideoVariantPage() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      <main className={styles.screen}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/varianti">
            <span className={styles.brandMark}>RAI</span>
            <span>TELEVIDEO</span>
          </Link>
          <span className={styles.edition}>EDIZIONE PERSONALE</span>
          <ThemeToggle />
        </header>

        <div className={styles.channelBar}>
          <span>CV</span>
          <span>PROFILO PROFESSIONALE</span>
          <span>2026</span>
        </div>

        <section aria-labelledby="profile-title" className={styles.profile}>
          <div className={styles.pageNumber}>
            <span>401</span>
            <span>PROFILO</span>
          </div>
          <p className={styles.kicker}>SVILUPPATORE FRONTEND · PRODUCT MINDSET</p>
          <h1 id="profile-title">MARCO BURROMETO</h1>
          <p className={styles.intro}>
            Senior frontend developer in Northern Italy. Progetto e realizzo
            prodotti web e mobile con attenzione a esperienza, performance e
            risultati.
          </p>
          <nav aria-label="Contatti e profili" className={styles.links}>
            {socials.map((social) => (
              <a
                data-ga-event="social_click"
                data-ga-label={social.label}
                href={social.href}
                key={social.label}
                rel={social.href.startsWith("https://") ? "noreferrer" : undefined}
                target={social.href.startsWith("https://") ? "_blank" : undefined}
              >
                {social.label}
              </a>
            ))}
            <a download="marco-burrometo-cv.pdf" href={cvPdfHref}>
              SCARICA CV
            </a>
          </nav>
        </section>

        <section aria-labelledby="about-title" className={styles.section}>
          <header className={styles.sectionBar}>
            <span>402</span>
            <h2 id="about-title">ABOUT ME</h2>
          </header>
          <div className={`${styles.about} ${styles.aboutContent}`}>
            {aboutParagraphs.slice(0, 3).map((paragraph, index) => (
              <p key={`${index}-${paragraph}`}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-title" className={styles.section}>
          <header className={`${styles.sectionBar} ${styles.greenBar}`}>
            <span>403</span>
            <h2 id="skills-title">COMPETENZE</h2>
          </header>
          <div className={styles.skills}>
            {televideoSkillGroups.map((group) => (
              <div className={styles.skillGroup} key={group.category}>
                <h3>{group.category}</h3>
                <ul className={styles.skillItems}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-title" className={styles.section}>
          <header className={`${styles.sectionBar} ${styles.redBar}`}>
            <span>404</span>
            <h2 id="experience-title">ESPERIENZE</h2>
          </header>
          <div className={styles.experiences}>
            {typedExperiences.map((experience, index) => (
              <article className={styles.experience} key={`${experience.period}-${index}`}>
                <p className={styles.period}>{experience.period}</p>
                <div>
                  <h3>{experience.place || "Freelance Projects"}</h3>
                  <p className={styles.description}>{experience.description}</p>
                  <p className={styles.technologies}>{experience.technologies}</p>
                  {experience.link ? (
                    <a
                      className={styles.projectLink}
                      data-ga-event="project_click"
                      data-ga-label={experience.place || "Freelance Projects"}
                      href={experience.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      APRI PROGETTO &gt;&gt;
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <span>{footerText.replace("{year}", String(year))}</span>
          <Link href="/varianti">ALTRE VARIANTI</Link>
        </footer>
      </main>
    </div>
  );
}
