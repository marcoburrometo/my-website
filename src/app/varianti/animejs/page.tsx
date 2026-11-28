import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import experiences from "@/data/experiences.json";
import skills from "@/data/skills.json";
import { aboutParagraphs, cvPdfHref, footerText, socials } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimeMotionRoot } from "./anime-motion";
import styles from "./deck.module.css";

type Experience = {
  period: string;
  role: string;
  description: string;
  place: string;
  link?: string;
  technologies: string;
};

type SkillGroup = {
  category: string;
  items: string[];
};

type DeckPanelProps = {
  children: ReactNode;
  headingLevel?: 1 | 2;
  id: string;
  index: number;
  label: string;
  title: string;
};

const typedExperiences = experiences as Experience[];
const typedSkillGroups = skills as SkillGroup[];
const panelNavigation = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const metadata: Metadata = {
  title: "Anime.js Kinetic CV",
  description: "A block-by-block animated CV for Marco Burrometo.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

function MotionInstrument() {
  return (
    <div className={styles.instrument} data-anime-scene="profile" data-anime-visual>
      <div className={styles.instrumentRotor} data-anime-rotor>
        <svg aria-hidden="true" className={styles.instrumentSvg} viewBox="0 0 640 640">
          <circle className={styles.orbitOuter} cx="320" cy="320" r="301" />
          <circle className={styles.orbitTrack} cx="320" cy="320" r="282" />
          <circle className={styles.orbitInner} cx="320" cy="320" r="196" />

          <g className={styles.ringScene} data-anime-ring="profile">
            <circle className={styles.orbitTicks} cx="320" cy="320" r="259" />
            {Array.from({ length: 72 }, (_, tick) => (
              <line
                className={tick % 6 === 0 ? styles.tickMajor : styles.tick}
                key={tick}
                transform={`rotate(${tick * 5} 320 320)`}
                x1="320"
                x2="320"
                y1={tick % 6 === 0 ? "34" : "42"}
                y2={tick % 6 === 0 ? "73" : "59"}
              />
            ))}
            <circle className={styles.orbitAccent} cx="320" cy="320" r="224" />
            {Array.from({ length: 121 }, (_, point) => {
              const column = point % 11;
              const row = Math.floor(point / 11);
              const distance = Math.hypot(column - 5, row - 5);

              if (distance > 5) {
                return null;
              }

              return (
                <circle
                  className={styles.orbitDot}
                  cx={250 + column * 14}
                  cy={250 + row * 14}
                  data-anime-dot
                  key={point}
                  r={distance < 2.5 ? 2.1 : 1.5}
                />
              );
            })}
          </g>

          <g className={styles.ringScene} data-anime-ring="experience">
            <circle className={styles.orbitTicks} cx="320" cy="320" r="259" />
            <circle className={styles.segmentArc} cx="320" cy="320" r="240" />
            {Array.from({ length: 14 }, (_, segment) => (
              <line
                className={styles.tickMajor}
                key={segment}
                transform={`rotate(${(segment * 360) / 14} 320 320)`}
                x1="320"
                x2="320"
                y1="42"
                y2="66"
              />
            ))}
          </g>

          <g className={styles.ringScene} data-anime-ring="about">
            <circle className={styles.orbitDotted} cx="320" cy="320" r="259" />
            <circle className={styles.orbitDotted} cx="320" cy="320" r="222" />
            <circle className={styles.orbitAccent} cx="320" cy="320" r="240" />
            {Array.from({ length: 9 }, (_, star) => (
              <circle
                className={
                  star % 3 === 0
                    ? styles.constellationDotAccent
                    : styles.constellationDot
                }
                cx="320"
                cy={star % 2 === 0 ? "80" : "110"}
                key={star}
                r={star % 3 === 0 ? 7 : 4.5}
                transform={`rotate(${star * 40 + 12} 320 320)`}
              />
            ))}
          </g>

          <g className={styles.ringScene} data-anime-ring="contact">
            <circle className={styles.orbitTicks} cx="320" cy="320" r="259" />
            {Array.from({ length: 4 }, (_, arm) => (
              <line
                className={styles.crossLine}
                key={arm}
                transform={`rotate(${arm * 90} 320 320)`}
                x1="320"
                x2="320"
                y1="26"
                y2="138"
              />
            ))}
            {Array.from({ length: 4 }, (_, diag) => (
              <line
                className={styles.tick}
                key={diag}
                transform={`rotate(${diag * 90 + 45} 320 320)`}
                x1="320"
                x2="320"
                y1="42"
                y2="70"
              />
            ))}
            <circle className={styles.radarArc} cx="320" cy="320" r="230" />
          </g>
        </svg>
      </div>
      <div className={styles.instrumentCore}>
        <figure className={styles.sceneCore} data-anime-core="profile">
          <span className={styles.portraitCore}>
            <Image
              alt="Portrait of Marco Burrometo"
              className={styles.portrait}
              fill
              priority
              sizes="(max-width: 760px) 25vw, 18vw"
              src="/media/marco_full.jpg"
            />
          </span>
        </figure>
        <div aria-hidden="true" className={styles.sceneCore} data-anime-core="experience">
          <div className={styles.instrumentRole}>
            <span className={styles.instrumentCompany} data-anime-role-current>
              {typedExperiences[0].place.replace(/^@\s*/, "")}
            </span>
            <span className={styles.instrumentJob} data-anime-job-current>
              {typedExperiences[0].role}
            </span>
          </div>
        </div>
        <div aria-hidden="true" className={styles.sceneCore} data-anime-core="about">
          <div className={styles.cycleWords} data-anime-cycle>
            {([
              ["PEOPLE", "FIRST"],
              ["BASS", "PLAYER"],
              ["VINYL", "RECORDS"],
              ["BOAT", "CAPTAIN"],
              ["DAD", "OF TWO"],
            ] as const).map(([lead, accent]) => (
              <div
                className={styles.instrumentWords}
                data-anime-cycle-item
                key={`${lead}-${accent}`}
              >
                <span>{lead}</span>
                <strong>{accent}</strong>
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden="true" className={styles.sceneCore} data-anime-core="contact">
          <div className={styles.instrumentWords}>
            <span>SAY</span>
            <strong>
              HI{" "}
              <svg viewBox="0 0 24 24">
                <path d="M4 12h15m-6-6 6 6-6 6" />
              </svg>
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeckPanel({
  children,
  headingLevel = 2,
  id,
  index,
  label,
  title,
}: DeckPanelProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <section
      aria-labelledby={`${id}-title`}
      className={styles.slide}
      data-anime-slide
      data-anime-slide-index={index}
      data-anime-slide-label={label}
      id={id}
    >
      <div className={styles.slideCopy}>
        <Heading className={styles.slideTitle} data-anime-enter id={`${id}-title`}>
          {title}
        </Heading>
        <div className={styles.slideContent}>{children}</div>
      </div>
    </section>
  );
}

function ContactActions({ ariaLabel }: { ariaLabel: string }) {
  return (
    <nav aria-label={ariaLabel} className={styles.actions} data-anime-enter>
      {socials.map((social) => {
        const isExternal = social.href.startsWith("https://");

        return (
          <a
            className={
              social.href.startsWith("mailto:")
                ? styles.primaryAction
                : styles.socialAction
            }
            data-ga-event="social_click"
            data-ga-label={social.label}
            href={social.href}
            key={social.label}
            rel={isExternal ? "noreferrer" : undefined}
            target={isExternal ? "_blank" : undefined}
          >
            {social.label}
          </a>
        );
      })}
      <a className={styles.downloadAction} download="marco-burrometo-cv.pdf" href={cvPdfHref}>
        Download CV
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 4v13m-6-5.5 6 6 6-6M5 21h14" />
        </svg>
      </a>
    </nav>
  );
}

export default function AnimeJsVariantPage() {
  const year = new Date().getFullYear();

  return (
    <AnimeMotionRoot className={styles.page}>
      <div aria-hidden="true" className={styles.backdrop}>
        <div className={`${styles.glowSlot} ${styles.glowCobalt}`}>
          <div className={styles.glow} />
        </div>
        <div className={`${styles.glowSlot} ${styles.glowSignal}`}>
          <div className={styles.glow} />
        </div>
        <div className={`${styles.glowSlot} ${styles.glowAcid}`}>
          <div className={styles.glow} />
        </div>
        <div className={styles.halo} />
        <div className={styles.vignette} />
      </div>
      <header className={styles.masthead}>
        <Link aria-label="MB, Marco Burrometo home" className={styles.wordmark} href="/">
          MB
        </Link>
        <p className={styles.edition}>ENGINEERING / PORTFOLIO / {year}</p>
        <ThemeToggle locale="en" />
      </header>

      <MotionInstrument />

      <main
        aria-label="CV presentation, one panel at a time"
        className={styles.deck}
        data-anime-deck
        tabIndex={0}
      >
        <DeckPanel headingLevel={1} id="profile" index={0} label="PROFILE" title="Marco Burrometo">
          <p className={styles.role} data-anime-enter>
            Senior Software Engineer · Frontend Architecture
          </p>
          <p className={styles.summary} data-anime-enter>
            I’m a senior full-stack engineer with a frontend focus, based in
            Northern Italy. I build web and mobile products with a focus on
            usability and performance.
          </p>
          <ContactActions ariaLabel="Contact and profiles" />
        </DeckPanel>

        <DeckPanel id="experience" index={1} label="EXPERIENCE" title="Experiences.">
          <div className={styles.roleList} data-anime-scroller>
            {typedExperiences.map((experience, roleIndex) => (
              <article
                className={styles.roleItem}
                data-anime-enter
                key={`${experience.period}-${roleIndex}`}
              >
                <p className={styles.period}>{experience.period}</p>
                <div className={styles.roleDetails}>
                  <h3>{experience.place || "Freelance Projects"}</h3>
                  {experience.role !== experience.place && (
                    <p className={styles.jobTitle} data-anime-job>{experience.role}</p>
                  )}
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
                      Visit project
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </DeckPanel>

        <DeckPanel id="about" index={2} label="ABOUT" title="About me.">
          <div className={styles.aboutContent} data-anime-scroller>
            <p className={styles.summary} data-anime-enter>
              {aboutParagraphs[3]}
            </p>
            <p className={styles.summary} data-anime-enter>
              {aboutParagraphs.slice(4).join(" ")}
            </p>
            <div className={styles.skillGroups}>
              {typedSkillGroups.map((group) => (
                <section className={styles.skillGroup} data-anime-enter key={group.category}>
                  <h3>{group.category}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </DeckPanel>

        <DeckPanel id="contact" index={3} label="CONTACT" title="Get in touch.">
          <p className={styles.summary} data-anime-enter>
            I’m available for product work and collaborations.
          </p>
          <ContactActions ariaLabel="Contact Marco" />
          <footer className={styles.footer} data-anime-enter>
            <p>{footerText.replace("{year}", String(year))}</p>
          </footer>
        </DeckPanel>
      </main>

      <nav aria-label="CV panel navigation" className={styles.deckNavigation}>
        <p className={styles.panelCounter}>
          <span data-anime-current-panel>01</span>
          <span aria-hidden="true"> / {String(panelNavigation.length).padStart(2, "0")}</span>
        </p>
        <div className={styles.panelMarks}>
          {panelNavigation.map((panel, index) => (
            <a
              aria-current={index === 0 ? "location" : undefined}
              aria-label={`Go to ${panel.label}`}
              className={styles.panelMark}
              data-anime-nav
              href={`#${panel.id}`}
              key={panel.id}
            />
          ))}
        </div>
        <span className={styles.navigationHint}>SCROLL TO EXPLORE</span>
      </nav>
    </AnimeMotionRoot>
  );
}
