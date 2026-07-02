import {
  FileText, ShieldCheck, Radar, GitMerge, Plug, Scale, Landmark, Boxes,
  Webhook, Braces, Database, Building2, type LucideIcon,
} from "lucide-react";
import { UI } from "@/lib/theme";

type Card = {
  Icon: LucideIcon; tag: string; text?: string;
  top: string; left: string; rotate: number; sharp: boolean; delay: number; w: number;
};

/*
 * Fixed, hand-placed scatter of capability cards framing the hero headline -
 * every position/rotation is a literal so server and client render
 * identically (no Math.random, no hydration mismatch).
 *
 * Every card is fully opaque and crisp (no blur, no reduced opacity) -
 * "background" cards are de-emphasized purely through lighter text/icon
 * color, the same technique the reference composition uses. Container is
 * offset below the fixed nav so nothing collides with the transparent
 * header at the top of the page.
 */
const cards: Card[] = [
  // ── in-focus cards - gentle rotation, dark legible text, anchor the frame ──
  { Icon: FileText, tag: "ParsingLab", text: "Extract RN licence and compact status", top: "5%", left: "4%", rotate: -9, sharp: true, delay: 0, w: 204 },
  { Icon: Radar, tag: "Sonar", text: "Score confidence on every extracted field", top: "32%", left: "80%", rotate: 10, sharp: true, delay: 1.1, w: 198 },
  { Icon: Webhook, tag: "Enterprise", text: "Batch process 200 documents per call", top: "4%", left: "73%", rotate: -7, sharp: true, delay: 0.9, w: 202 },
  { Icon: Braces, tag: "ParsingLab", text: "Return schema-validated JSON output", top: "44%", left: "1%", rotate: 8, sharp: true, delay: 1.0, w: 194 },
  { Icon: Plug, tag: "Integrations", text: "Deliver structured output over webhook", top: "45%", left: "89%", rotate: -8, sharp: true, delay: 1.3, w: 200 },
  { Icon: Radar, tag: "Sonar", text: "Flag a low-confidence field for review", top: "86%", left: "30%", rotate: -6, sharp: true, delay: 1.2, w: 198 },
  { Icon: FileText, tag: "ParsingLab", text: "Untangle travel assignment history", top: "79%", left: "81%", rotate: -10, sharp: true, delay: 1.5, w: 202 },
  { Icon: ShieldCheck, tag: "Govern", text: "Recalculate value on a contract amendment", top: "82%", left: "9%", rotate: 8, sharp: true, delay: 0.5, w: 214 },

  // ── background cards - wide, varied rotation, lighter gray text (never blurred or transparent) ──
  { Icon: ShieldCheck, tag: "Govern", text: "Compare auto-renewal clause against playbook", top: "2%", left: "20%", rotate: 6, sharp: false, delay: 0.6, w: 216 },
  { Icon: GitMerge, tag: "Migrations", text: "Map legacy parser fields to a new schema", top: "6%", left: "83%", rotate: 16, sharp: false, delay: 0.3, w: 196 },
  { Icon: Boxes, tag: "Custom build", text: "Design a schema around a client workflow", top: "1%", left: "90%", rotate: -14, sharp: false, delay: 1.4, w: 208 },
  { Icon: FileText, tag: "Healthcare staffing", text: "Parse clinician resumes at agency scale", top: "24%", left: "3%", rotate: -22, sharp: false, delay: 0.4, w: 190 },
  { Icon: Scale, tag: "Legal", text: "Flag a deviation in a termination clause", top: "64%", left: "1%", rotate: 18, sharp: false, delay: 1.6, w: 194 },
  { Icon: Landmark, tag: "Procurement", text: "Reconcile invoice lines against the SOW", top: "25%", left: "88%", rotate: -20, sharp: false, delay: 0.7, w: 196 },
  { Icon: ShieldCheck, tag: "Compliance", text: "Generate an audit trail on every edit", top: "65%", left: "90%", rotate: 14, sharp: false, delay: 0.2, w: 192 },
  { Icon: Database, tag: "Solutions", text: "Backfill historical records on cutover", top: "87%", left: "58%", rotate: -12, sharp: false, delay: 0.8, w: 210 },
  { Icon: GitMerge, tag: "Migrations", text: "Cut over on a schedule that fits your calendar", top: "88%", left: "18%", rotate: 11, sharp: false, delay: 0.9, w: 216 },
  { Icon: Boxes, tag: "Solutions", text: "Bespoke products, delivered and supported", top: "34%", left: "13%", rotate: -18, sharp: false, delay: 1.1, w: 198 },

  // ── tiny tag-only chips - icon + label, no body copy, moderate rotation ──
  { Icon: Building2, tag: "Healthcare staffing", top: "36%", left: "13%", rotate: -16, sharp: false, delay: 0.2, w: 128 },
  { Icon: Scale, tag: "Legal", top: "13%", left: "16%", rotate: 10, sharp: false, delay: 0.5, w: 100 },
  { Icon: Landmark, tag: "Procurement", top: "58%", left: "92%", rotate: 20, sharp: false, delay: 0.9, w: 128 },
  { Icon: ShieldCheck, tag: "Compliance", top: "92%", left: "42%", rotate: -14, sharp: false, delay: 1.3, w: 114 },
  { Icon: Plug, tag: "Integrations", top: "18%", left: "92%", rotate: 15, sharp: false, delay: 0.7, w: 118 },
  { Icon: GitMerge, tag: "Migrations", top: "56%", left: "3%", rotate: -12, sharp: false, delay: 1.0, w: 116 },
];

export default function HeroCardField() {
  return (
    <div aria-hidden className="hidden md:block absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none" style={{ top: 96 }}>
      {cards.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: c.top, left: c.left, width: c.w, transform: `rotate(${c.rotate}deg)` }}
        >
          <div className="bx-card-float" style={{ animationDelay: `${c.delay}s` }}>
            <div className="rounded-xl p-3.5" style={{ background: UI.surface, border: `1px solid ${UI.line}`, boxShadow: "0 10px 24px -16px rgba(18,20,26,0.18)" }}>
              <div className={`flex items-center gap-1.5 ${c.text ? "mb-2" : ""}`}>
                <c.Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.6} style={{ color: c.sharp ? UI.blue2 : UI.faint }} />
                <span className="font-sans-g text-[10.5px] font-medium truncate" style={{ color: UI.faint }}>{c.tag}</span>
              </div>
              {c.text && <p className="font-sans-g text-[12.5px] leading-snug font-medium" style={{ color: c.sharp ? UI.ink : UI.line2 }}>{c.text}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
