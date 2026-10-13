import { pageMetadata, breadcrumbLd, webPageLd, ldScript } from "@/lib/seo";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

/* The accessibility statement: the standard we build to, how we check it,
   what we know is not perfect, and how to tell us. */

const DESC =
  "Blue-IQ's commitment to accessibility: this website is built to WCAG 2.1 AA, tested on every change, and we fix reported problems. Tell us if anything blocks you.";

export const metadata = pageMetadata({
  title: "Accessibility Statement",
  description: DESC,
  path: "/accessibility",
});

const sections: LegalSection[] = [
  {
    h: "Our commitment",
    body: [
      "We want everyone to be able to use blue-iq.ai, including people who use screen readers, keyboard navigation, magnification, voice control or reduced motion. We build this website to the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA.",
    ],
  },
  {
    h: "What we do",
    body: [
      "Text meets AA contrast (4.5:1, or 3:1 for large text and controls). Every page has one main heading, landmarks, a skip link and breadcrumbs.",
      "Everything works with a keyboard, with a visible focus ring. Menus, tabs and the FAQ use native or ARIA-correct controls.",
      "Animations stop when your system asks for reduced motion, and the moving demos can be paused.",
      "Form fields have visible labels, and errors are given in words, not colour alone.",
      "We test every page with automated accessibility checks before each release, and check layouts at phone and desktop widths.",
    ],
  },
  {
    h: "Known limitations",
    body: [
      "Our product apps (Capture and Govern) live on their own sites and are covered by their own reviews. Downloadable logo files in the media kit are images by nature.",
    ],
  },
  {
    h: "Tell us about a problem",
    body: [
      "If anything on this website is hard to use, tell us through the contact form at blue-iq.ai/contact and choose 'Support'. Say which page and what happened. A person will reply, and we will fix it or give you the information another way.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ldScript(
          webPageLd({ name: "Accessibility Statement", description: DESC, path: "/accessibility" }),
          breadcrumbLd("Accessibility", "/accessibility")
        )}
      />
      <LegalPage
        title="Accessibility Statement"
        updated="13 October 2026"
        intro="How we make blue-iq.ai usable for everyone, and how to tell us when we have not."
        sections={sections}
      />
    </>
  );
}
