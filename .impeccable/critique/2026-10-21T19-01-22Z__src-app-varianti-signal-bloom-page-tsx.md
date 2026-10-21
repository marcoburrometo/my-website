---
target: homepage (Signal Bloom)
total_score: 21
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/marco/Dev/my-website/src/app/varianti/signal-bloom/page.tsx"
target_fingerprint: "sha256:a57c2c70a125eda3d74cd05530e1d69e15f20d77cd172ad039f7c781e1d65225"
target_path: /Users/marco/Dev/my-website/src/app/varianti/signal-bloom/page.tsx
timestamp: 2026-10-21T19-01-22Z
slug: src-app-varianti-signal-bloom-page-tsx
closed: true
---
Method: dual-agent (A: 2d02d2e1-9f5e-4d20-860c-b4bff4d0e922 · B: 05b13674-b469-492f-aa48-f830b88bbddd)

# Impeccable critique — Signal Bloom homepage

**Scope:** The root homepage as currently configured, resolving to Signal Bloom. Reviewed its rendered desktop and 390px mobile views, page/style sources, and the shared CV content. Dark mode and mobile content below the first viewport were not visually exercised.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3/4 | Clear actions, but download has no in-page feedback. |
| 2 | Match between system and real world | 3/4 | Familiar CV; generic hero delays concrete outcomes. |
| 3 | User control and freedom | 3/4 | CV, email, theme, and privacy controls are available. |
| 4 | Consistency and standards | 2/4 | English page has Italian theme labels; consent UI feels detached. |
| 5 | Error prevention | 3/4 | Analytics is opt-in; link destinations could be clearer. |
| 6 | Recognition rather than recall | 3/4 | Sections are labeled; repeated “Visit project” hides destination context. |
| 7 | Flexibility and efficiency | 2/4 | No quick section navigation; key contact action is only at the top. |
| 8 | Aesthetic and minimalist design | 2/4 | Strong identity, but dense tags and repeated role cards flatten emphasis. |
| 9 | Error recognition and recovery | n/a | No user-facing error-recovery flow is exposed on this portfolio page. |
| 10 | Help and documentation | n/a | Not applicable to an Experience/portfolio surface. |
| **Total** |  | **21/32** | **Acceptable (66%); substantial room to improve scanning and conversion.** |

## Design Specificity Verdict

**Distinctive art direction; only moderately distinctive professional story.** Oversized two-tone name typography, the acid-lime portrait offset, and graph-paper backdrop make this recognizable. The human details reinforce Marco’s identity. But the opening promise could belong to almost any engineer; the strongest proof—product adoption, production scale, and architecture leadership—sits after About and a large technology inventory.

The design detector CLI returned **0 findings** for `src/app/varianti/signal-bloom/page.tsx`. Separately, the browser detector was injected successfully and visibly highlighted the page in the tab titled **“Human — Impeccable critique.”** It flagged undersized functional labels/body text, low contrast (coral on pale ground measured 2.7:1 against the detector’s 3:1 threshold), long text lines, an all-caps eyebrow label, the bold eyebrow chip, and tiny numbered section labels. The browser console had 0 errors and 0 warnings. Potential false positives: palette and all-caps flags are stylistic heuristics, not automatic defects; judge those against Signal Bloom’s intended art direction. The size/contrast findings are supported by the visible design and source.

## Overall Impression

This is an ownable, warm portfolio with a credible body of work and a clear CV download. The hierarchy currently asks visitors to admire the identity and sort through inventory before showing why Marco is a strong hire. Put proof and a next step closer to the top, then preserve the expressive visual world around them.

## What’s Working

1. **A memorable opening:** display typography, portrait, and color pairing create a strong first impression.
2. **Credible evidence:** the existing experience data includes specific adoption and scale claims, not just a skills list.
3. **Useful foundations:** the CV download and labeled social links are visible early; content is grouped into semantic sections.

## Priority Issues

1. **[P1] Professional proof arrives too late.** About and Technologies precede Experience, while the hero relies on generic “user experience / newest technologies” language. Recruiters and clients must scroll before seeing the strongest evidence, such as BimboMap reaching 3k users in two weeks and 8k in two months. **Fix:** bring two or three supplied achievements immediately below the intro, then selected roles; keep personal details and the complete history farther down. Clarify overlapping current roles and agency/client relationships. **Suggested command:** `/impeccable layout`.

2. **[P1] Supporting text and links are too small and weakly contrasted.** Experience copy, dates, skills, and project links use very small type; browser checks also flagged coral contrast. This turns a long page into tiring, low-confidence scanning, especially for low-vision visitors. **Fix:** raise reading text toward 16px, increase contrast and link hit areas, and keep dates/technology labels secondary without making them microscopic. **Suggested command:** `/impeccable typeset`.

3. **[P2] On mobile, the portrait delays professional evidence.** At 390px, the large portrait starts around 430px and fills the rest of the first 844px viewport; no career proof is visible there. **Fix:** use a shorter mobile crop or move a compact proof summary above the portrait. **Suggested command:** `/impeccable adapt`.

4. **[P2] First-visit consent interrupts the composition.** The initial privacy notice overlays the About/Technologies area and introduces a cyan accent outside the page’s palette. **Fix:** reduce its footprint, align its colors with Signal Bloom, and keep accept/decline choices equally clear and usable. **Suggested command:** `/impeccable layout`.

5. **[P2] The page ends without a conversion moment.** After fourteen experience entries, visitors reach legal footer text; Email appears only near the top. Some generic “Visit project” links go to company/agency sites rather than the described artifact. **Fix:** close with a direct contact invitation and CV link; label destinations honestly (for example, “Company website” or the project name). **Suggested command:** `/impeccable clarify`.

## Cognitive Load

**Moderate scan burden.** Two clear checklist failures: chunking (About has eleven statements; skill groups have 6, 15, and 12 items) and progressive disclosure (all skills and fourteen roles are shown with similar weight). Single focus, hierarchy, choice count, and working-memory demands are partial concerns; grouping and the linear flow work well. Skill tags are content to sift, not 36 separate decisions.

## Persona Red Flags

- **Recruiter on a 20-second scan:** sees a strong identity, but not the best evidence soon enough; overlapping current positions make the timeline harder to parse.
- **Prospective client:** cannot quickly distinguish delivered outcomes from technology familiarity or find a concluding engagement step.
- **Low-vision/mobile visitor:** must read small supporting text and compact links across a very long page.

## Minor Observations

- The source randomizes between fuchsia and violet; the inspected captures showed fuchsia. Violet and dark-mode rendering remain unverified.
- Theme-control accessible labels are Italian within an otherwise English page.
- Static skill tags receive hover styling, implying interaction they do not provide.
- Birth year and “Citizen of the world” use space without answering location or engagement logistics as directly.

## Questions to Consider

- What should a recruiter remember after ten seconds: the palette, the person, or the products he helped succeed?
- If only three accomplishments could stay above the fold, which ones earn that space?
- Why does the visitor who reads everything reach a tax identifier instead of an invitation?
