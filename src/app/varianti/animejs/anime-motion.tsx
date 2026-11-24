"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, createScope, stagger, utils } from "animejs";

export function AnimeMotionRoot({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootElement = root.current;
    if (!rootElement) {
      return;
    }

    const roleCurrent = rootElement.querySelector<HTMLElement>(
      "[data-anime-role-current]",
    );
    const jobCurrent = rootElement.querySelector<HTMLElement>(
      "[data-anime-job-current]",
    );
    const roleScroller = rootElement.querySelector<HTMLElement>(
      "#experience [data-anime-scroller]",
    );
    const roleEntries = roleScroller?.querySelectorAll<HTMLElement>("article");
    const syncRoleLabel = () => {
      if (!roleScroller || !roleEntries?.length || !roleCurrent || !jobCurrent) {
        return;
      }

      const maxScroll = roleScroller.scrollHeight - roleScroller.clientHeight;
      const marker = roleScroller.getBoundingClientRect().top + roleScroller.clientHeight * 0.25;
      const currentEntry =
        maxScroll > 0 && roleScroller.scrollTop >= maxScroll - 1
          ? roleEntries[roleEntries.length - 1]
          : Array.from(roleEntries).find(
              (entry) => entry.getBoundingClientRect().bottom > marker,
            ) ?? roleEntries[roleEntries.length - 1];
      const currentName = currentEntry.querySelector("h3")?.textContent?.trim()
        .replace(/^@\s*/, "");
      const currentJob = currentEntry.querySelector("[data-anime-job]")?.textContent?.trim() ?? "";

      if (currentName) {
        roleCurrent.style.setProperty(
          "--role-label-scale",
          String(Math.min(1, 18 / currentName.length)),
        );
      }

      if (currentName && roleCurrent.textContent !== currentName) {
        roleCurrent.textContent = currentName;
      }
      if (jobCurrent.textContent !== currentJob) {
        jobCurrent.textContent = currentJob;
      }
    };

    roleScroller?.addEventListener("scroll", syncRoleLabel, { passive: true });
    syncRoleLabel();

    const scope = createScope({
      root,
      mediaQueries: {
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
    }).add((scope) => {
      if (!scope) {
        return;
      }

      const deck = rootElement.querySelector<HTMLElement>("[data-anime-deck]");
      const slides = deck?.querySelectorAll<HTMLElement>("[data-anime-slide]");
      if (!deck || !slides?.length || !("IntersectionObserver" in window)) {
        return;
      }

      const navLinks = rootElement.querySelectorAll<HTMLAnchorElement>("[data-anime-nav]");
      const currentPanel = rootElement.querySelector<HTMLElement>(
        "[data-anime-current-panel]",
      );
      const instrument = rootElement.querySelector<HTMLElement>("[data-anime-visual]");
      const rotor = instrument?.querySelector<HTMLElement>("[data-anime-rotor]");
      const cores = instrument?.querySelectorAll<HTMLElement>("[data-anime-core]");
      const rings = instrument?.querySelectorAll<SVGGElement>("[data-anime-ring]");
      const dots = instrument?.querySelectorAll<SVGElement>("[data-anime-dot]");
      const cycleItems = instrument?.querySelectorAll<HTMLElement>("[data-anime-cycle-item]");
      const scrollers = rootElement.querySelectorAll<HTMLElement>("[data-anime-scroller]");
      const reducedMotion = scope.matches.reduceMotion;
      let activeSlide: HTMLElement | null = null;
      let roleScrollFrame = 0;
      let cycleTimer = 0;
      let cycleIndex = 0;
      let chainLock = 0;
      let roleAutoScrollTimer = 0;
      let roleAutoScrollUntil = 0;

      // At a scroller's boundary, hand the gesture to the deck so the next
      // or previous panel takes over instead of trapping the scroll.
      const chainToPanel = (scroller: HTMLElement, forward: boolean) => {
        const slide = scroller.closest<HTMLElement>("[data-anime-slide]");
        const target = forward
          ? slide?.nextElementSibling
          : slide?.previousElementSibling;
        if (!target) {
          return false;
        }

        const now = Date.now();
        if (now - chainLock > 700) {
          chainLock = now;
          target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
        }

        return true;
      };

      const onScrollerWheel = (event: WheelEvent) => {
        const scroller = event.currentTarget as HTMLElement;
        const atEnd =
          scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
        const atTop = scroller.scrollTop <= 2;
        const forward = event.deltaY > 0;

        if ((forward && !atEnd) || (!forward && !atTop) || event.deltaY === 0) {
          return;
        }

        if (chainToPanel(scroller, forward)) {
          event.preventDefault();
        }
      };

      // Touch equivalent: a swipe that starts while the scroller is already
      // at a boundary moves the deck; a swipe that merely reaches the
      // boundary stays contained (see overscroll-behavior in CSS), so the
      // next distinct swipe turns the panel.
      let touchStartY = 0;
      let touchAtTop = false;
      let touchAtEnd = false;
      let touchChained = false;

      const onScrollerTouchStart = (event: TouchEvent) => {
        const scroller = event.currentTarget as HTMLElement;
        touchStartY = event.touches[0]?.clientY ?? 0;
        touchAtEnd =
          scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
        touchAtTop = scroller.scrollTop <= 2;
        touchChained = false;
      };

      const onScrollerTouchMove = (event: TouchEvent) => {
        if (touchChained) {
          return;
        }

        const scroller = event.currentTarget as HTMLElement;
        const deltaY = touchStartY - (event.touches[0]?.clientY ?? touchStartY);
        if (Math.abs(deltaY) < 28) {
          return;
        }

        const forward = deltaY > 0;
        if ((forward && !touchAtEnd) || (!forward && !touchAtTop)) {
          return;
        }

        touchChained = chainToPanel(scroller, forward);
      };

      scrollers.forEach((scroller) => {
        scroller.addEventListener("wheel", onScrollerWheel, { passive: false });
        scroller.addEventListener("touchstart", onScrollerTouchStart, {
          passive: true,
        });
        scroller.addEventListener("touchmove", onScrollerTouchMove, {
          passive: true,
        });
      });

      if (!reducedMotion) {
        rootElement.dataset.motionReady = "true";
      }

      const syncRoleProgress = () => {
        roleScrollFrame = 0;
        if (!roleScroller) {
          return;
        }

        const maxScroll = roleScroller.scrollHeight - roleScroller.clientHeight;
        const progress = maxScroll > 0 ? roleScroller.scrollTop / maxScroll : 0;

        if (!reducedMotion && rotor && instrument?.dataset.animeScene === "experience") {
          utils.remove(rotor);
          utils.set(rotor, { rotate: 90 + progress * 180 });
        }
      };

      const onRoleScroll = () => {
        if (reducedMotion) {
          return;
        }

        if (!roleScrollFrame) {
          roleScrollFrame = requestAnimationFrame(syncRoleProgress);
        }
      };

      roleScroller?.addEventListener("scroll", onRoleScroll, { passive: true });

      const stopRoleAutoScroll = () => {
        if (roleAutoScrollTimer) {
          window.clearTimeout(roleAutoScrollTimer);
          roleAutoScrollTimer = 0;
        }
      };

      // While the experience panel is idle, advance to the next role every
      // 5 seconds, wrapping back to the first one at the end of the list.
      const scheduleRoleAutoScroll = () => {
        stopRoleAutoScroll();
        if (reducedMotion || !roleScroller || !roleEntries || roleEntries.length < 2) {
          return;
        }

        roleAutoScrollTimer = window.setTimeout(() => {
          roleAutoScrollTimer = 0;
          if (!roleScroller || activeSlide?.id !== "experience") {
            return;
          }

          const scrollerTop = roleScroller.getBoundingClientRect().top;
          const maxScroll = roleScroller.scrollHeight - roleScroller.clientHeight;
          const atEnd = roleScroller.scrollTop >= maxScroll - 2;
          const target = atEnd
            ? roleEntries[0]
            : Array.from(roleEntries).find(
                (entry) => entry.getBoundingClientRect().top - scrollerTop > 4,
              ) ?? roleEntries[0];

          // Mark the resulting scroll events as programmatic so they do not
          // reset the idle timer.
          roleAutoScrollUntil = Date.now() + 1200;
          roleScroller.scrollTo({
            top:
              target.getBoundingClientRect().top -
              scrollerTop +
              roleScroller.scrollTop,
            behavior: "smooth",
          });
          scheduleRoleAutoScroll();
        }, 5000);
      };

      const onRoleActivity = () => {
        if (Date.now() < roleAutoScrollUntil) {
          return;
        }

        if (activeSlide?.id === "experience") {
          scheduleRoleAutoScroll();
        } else {
          stopRoleAutoScroll();
        }
      };

      roleScroller?.addEventListener("scroll", onRoleActivity, { passive: true });
      roleScroller?.addEventListener("wheel", onRoleActivity, { passive: true });
      roleScroller?.addEventListener("pointerdown", onRoleActivity, {
        passive: true,
      });
      roleScroller?.addEventListener("touchstart", onRoleActivity, {
        passive: true,
      });

      const stopWordCycle = () => {
        if (cycleTimer) {
          window.clearInterval(cycleTimer);
          cycleTimer = 0;
        }
      };

      const startWordCycle = () => {
        if (reducedMotion || !cycleItems || cycleItems.length < 2 || cycleTimer) {
          return;
        }

        cycleTimer = window.setInterval(() => {
          const previous = cycleItems[cycleIndex];
          cycleIndex = (cycleIndex + 1) % cycleItems.length;
          const next = cycleItems[cycleIndex];

          utils.remove(previous);
          utils.remove(next);
          animate(previous, {
            opacity: 0,
            translateY: "-0.45em",
            duration: 420,
            ease: "outQuad",
          });
          animate(next, {
            opacity: [0, 1],
            translateY: ["0.5em", 0],
            duration: 680,
            ease: "outExpo",
          });
        }, 2300);
      };

      const activateSlide = (slide: HTMLElement) => {
        if (slide === activeSlide) {
          return;
        }

        const isFirstActivation = activeSlide === null;
        activeSlide?.removeAttribute("data-anime-active");
        activeSlide = slide;
        slide.dataset.animeActive = "true";

        const index = Number(slide.dataset.animeSlideIndex ?? 0);
        const slideNumber = String(index + 1).padStart(2, "0");
        if (currentPanel) {
          currentPanel.textContent = slideNumber;
        }

        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${slide.id}`) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });

        if (instrument) {
          instrument.dataset.animeScene = slide.id;
          instrument.dataset.animeStep = index % 2 === 0 ? "even" : "odd";
        }

        // Drive the scene-reactive backdrop atmospheres.
        rootElement.dataset.animeScene = slide.id;

        if (slide.id === "about") {
          startWordCycle();
        } else {
          stopWordCycle();
        }

        if (slide.id === "experience") {
          scheduleRoleAutoScroll();
        } else {
          stopRoleAutoScroll();
        }

        if (reducedMotion) {
          return;
        }

        const enterTargets =
          slide.querySelectorAll<HTMLElement>("[data-anime-enter]");
        if (enterTargets.length > 0) {
          animate(enterTargets, {
            clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
            translateY: ["0.85rem", 0],
            opacity: [0, 1],
            delay: stagger(45),
            duration: 680,
            ease: "outExpo",
          });
        }

        cores?.forEach((core) => {
          const isSceneCore = core.dataset.animeCore === slide.id;
          utils.remove(core);

          if (isSceneCore) {
            animate(core, {
              opacity: [0, 1],
              scale: [0.88, 1],
              duration: 950,
              delay: 140,
              ease: "outExpo",
            });
          } else {
            animate(core, {
              opacity: 0,
              scale: 0.94,
              duration: 320,
              ease: "outQuad",
            });
          }
        });

        rings?.forEach((ring) => {
          const isSceneRing = ring.dataset.animeRing === slide.id;
          utils.remove(ring);

          if (isSceneRing) {
            animate(ring, {
              opacity: [0, 1],
              duration: 900,
              delay: 90,
              ease: "outExpo",
            });
          } else {
            animate(ring, {
              opacity: 0,
              duration: 300,
              ease: "outQuad",
            });
          }
        });

        if (rotor) {
          utils.remove(rotor);
          animate(rotor, {
            rotate:
              slide.id === "experience" && roleScroller
                ? 90 +
                  (roleScroller.scrollHeight > roleScroller.clientHeight
                    ? (roleScroller.scrollTop /
                        (roleScroller.scrollHeight - roleScroller.clientHeight)) *
                      180
                    : 0)
                : index * 90,
            scale: isFirstActivation ? [0.94, 1] : 1,
            duration: 1250,
            ease: "outExpo",
          });
        }

        if (dots?.length) {
          animate(dots, {
            scale: [0.2, 1],
            opacity: [0.12, 0.68],
            delay: stagger(10, { from: "center" }),
            duration: 560,
            ease: "outExpo",
          });
        }
      };

      const visibility = new Map<Element, number>();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibility.set(
              entry.target,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          });

          let nextSlide: HTMLElement | null = null;
          let bestRatio = 0;
          visibility.forEach((ratio, slide) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              nextSlide = slide as HTMLElement;
            }
          });

          if (nextSlide) {
            activateSlide(nextSlide);
          }
        },
        { root: deck, threshold: [0.35, 0.55, 0.75] },
      );

      slides.forEach((slide) => observer.observe(slide));

      return () => {
        observer.disconnect();
        scrollers.forEach((scroller) => {
          scroller.removeEventListener("wheel", onScrollerWheel);
          scroller.removeEventListener("touchstart", onScrollerTouchStart);
          scroller.removeEventListener("touchmove", onScrollerTouchMove);
        });
        roleScroller?.removeEventListener("scroll", onRoleScroll);
        roleScroller?.removeEventListener("scroll", onRoleActivity);
        roleScroller?.removeEventListener("wheel", onRoleActivity);
        roleScroller?.removeEventListener("pointerdown", onRoleActivity);
        roleScroller?.removeEventListener("touchstart", onRoleActivity);
        stopRoleAutoScroll();
        if (roleScrollFrame) {
          cancelAnimationFrame(roleScrollFrame);
        }
        stopWordCycle();
        rootElement.removeAttribute("data-motion-ready");
        rootElement.removeAttribute("data-anime-scene");
        activeSlide?.removeAttribute("data-anime-active");
      };
    });

    return () => {
      roleScroller?.removeEventListener("scroll", syncRoleLabel);
      scope.revert();
    };
  }, []);

  return (
    <div className={className} ref={root}>
      {children}
    </div>
  );
}
