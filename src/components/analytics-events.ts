type AnalyticsParameters = Record<string, string | number | boolean>;

type AnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, parameters?: AnalyticsParameters) => void;
};

const consentKey = "cv-analytics-consent";

export function trackAnalyticsEvent(eventName: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined") return;

  try {
    if (window.localStorage.getItem(consentKey) !== "granted") return;
  } catch {
    return;
  }

  (window as AnalyticsWindow).gtag?.("event", eventName, parameters);
}

export function trackLinkClick(anchor: HTMLAnchorElement) {
  const linkUrl = anchor.href;
  const fileName = anchor.getAttribute("download");

  if (fileName) {
    trackAnalyticsEvent("cv_download", {
      file_name: fileName,
      link_text: anchor.textContent?.trim() ?? "Download CV",
      link_url: linkUrl,
    });
    return;
  }

  if (linkUrl.startsWith("mailto:") || linkUrl.startsWith("tel:")) {
    trackAnalyticsEvent("contact_click", {
      contact_method: linkUrl.startsWith("mailto:") ? "email" : "phone",
      link_url: linkUrl,
    });
    return;
  }

  const destination = new URL(linkUrl);
  const label = anchor.dataset.gaLabel ?? anchor.textContent?.trim() ?? "";

  if (anchor.dataset.gaEvent === "social_click") {
    trackAnalyticsEvent("social_click", {
      link_domain: destination.hostname,
      link_url: linkUrl,
      social_network: label,
    });
    return;
  }

  if (anchor.dataset.gaEvent === "project_click") {
    trackAnalyticsEvent("project_click", {
      link_domain: destination.hostname,
      link_url: linkUrl,
      project_name: label,
    });
    return;
  }

  if (destination.origin !== window.location.origin) {
    trackAnalyticsEvent("outbound_click", {
      link_domain: destination.hostname,
      link_url: linkUrl,
    });
  }
}