"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState, useSyncExternalStore } from "react";
import { trackLinkClick } from "./analytics-events";
import styles from "./firebase-analytics.module.css";

type Consent = "granted" | "denied" | null;

const consentKey = "cv-analytics-consent";
const consentEvent = "cv-analytics-consent-change";
const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "";

function subscribeConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(consentEvent, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(consentEvent, onChange);
  };
}

function getConsentSnapshot(): Consent {
  try {
    const consent = window.localStorage.getItem(consentKey);
    return consent === "granted" || consent === "denied" ? consent : null;
  } catch {
    return null;
  }
}

function storeConsent(consent: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(consentKey, consent);
  } catch {
    // Keep the current choice for this page even when storage is unavailable.
  }

  if (measurementId) {
    (window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = consent === "denied";
  }
  window.dispatchEvent(new Event(consentEvent));
}

export function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, () => null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    if (consent !== "granted") return;

    function handleDocumentClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a");
      if (anchor instanceof HTMLAnchorElement) trackLinkClick(anchor);
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [consent]);

  if (!measurementId) return null;

  const showNotice = consent === null || preferencesOpen;

  return (
    <>
      {consent === "granted" ? <GoogleAnalytics gaId={measurementId} /> : null}
      {showNotice ? (
        <aside aria-labelledby="analytics-consent-title" className={styles.notice} role="region">
          <div>
            <h2 id="analytics-consent-title">Privacy choices</h2>
            <p>Optional Google Analytics helps me understand site visits. It stays off unless you allow it.</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.decline} onClick={() => { storeConsent("denied"); setPreferencesOpen(false); }} type="button">
              Decline
            </button>
            <button className={styles.accept} onClick={() => { storeConsent("granted"); setPreferencesOpen(false); }} type="button">
              Allow analytics
            </button>
          </div>
        </aside>
      ) : (
        <button className={styles.settings} onClick={() => setPreferencesOpen(true)} type="button">
          Privacy settings
        </button>
      )}
    </>
  );
}