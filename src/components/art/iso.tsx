/* ────────────────────────────────────────────────────────────────
   A tiny isometric drawing kit.

   Every illustration on the site is built from these few primitives — a
   floor, a box, a sheet, a cylinder — projected on one 30° grid and filled
   from one palette. That shared construction is what makes the drawings read
   as a set, and it is why none of them are UI mock-ups: they are objects, not
   screenshots with tiny fake text in them.

   Projection: world (x, y, z) → screen. +x runs right-and-down, +y runs
   left-and-down, +z is up. Larger x+y is nearer the viewer, so draw in
   ascending x+y order (painter's algorithm).
   ──────────────────────────────────────────────────────────────── */

export type Iso = ReturnType<typeof makeIso>;

export type Tone = { top: string; left: string; right: string; line?: string };

/* the palette, as lit solids — light falls from the upper left */
export const TONES = {
  paper: { top: "#FFFFFF", left: "#E3E9F4", right: "#C9D3E6", line: "#D6DDEA" },
  mist: { top: "#F1F5FC", left: "#DCE5F4", right: "#C6D3EA" },
  sky: { top: "#DCE8FF", left: "#B7CEFF", right: "#8DAFF5" },
  blue: { top: "#5B95FF", left: "#2F6BF0", right: "#1C4EC9" },
  deep: { top: "#1E3A8A", left: "#152A6B", right: "#0D1C4F" },
  navy: { top: "#1A2A5E", left: "#101C45", right: "#0A1330" },
  cyan: { top: "#8FE0FF", left: "#4CC6F5", right: "#2AA3D6" },
  amber: { top: "#FFD37A", left: "#F2B53F", right: "#C98E17" },
  red: { top: "#FF9C8A", left: "#E3674F", right: "#B84833" },
} satisfies Record<string, Tone>;

export function makeIso(ox: number, oy: number, u: number) {
  const C = 0.8660254;
  const p = (x: number, y: number, z = 0): [number, number] => [ox + (x - y) * u * C, oy + (x + y) * u * 0.5 - z * u];
  const pts = (list: [number, number, number][]) =>
    list.map(([x, y, z]) => p(x, y, z).map((n) => n.toFixed(1)).join(",")).join(" ");
  return { p, pts, u, rx: (r: number) => r * u * 1.2247449, ry: (r: number) => r * u * 0.7071068 };
}

/* a solid box */
export function Box({
  iso,
  x,
  y,
  z = 0,
  w,
  d,
  h,
  tone,
  stroke,
}: {
  iso: Iso;
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  tone: Tone;
  stroke?: string;
}) {
  const t = z + h;
  const sw = stroke ? 0.8 : 0;
  return (
    <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round">
      <polygon
        points={iso.pts([
          [x, y + d, t],
          [x + w, y + d, t],
          [x + w, y + d, z],
          [x, y + d, z],
        ])}
        fill={tone.left}
      />
      <polygon
        points={iso.pts([
          [x + w, y, t],
          [x + w, y + d, t],
          [x + w, y + d, z],
          [x + w, y, z],
        ])}
        fill={tone.right}
      />
      <polygon
        points={iso.pts([
          [x, y, t],
          [x + w, y, t],
          [x + w, y + d, t],
          [x, y + d, t],
        ])}
        fill={tone.top}
      />
    </g>
  );
}

/* a flat rhombus on a plane z — floors, shadows, pads */
export function Plane({
  iso,
  x,
  y,
  z = 0,
  w,
  d,
  fill,
  stroke,
  opacity,
  dash,
}: {
  iso: Iso;
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  fill: string;
  stroke?: string;
  opacity?: number;
  dash?: string;
}) {
  return (
    <polygon
      points={iso.pts([
        [x, y, z],
        [x + w, y, z],
        [x + w, y + d, z],
        [x, y + d, z],
      ])}
      fill={fill}
      stroke={stroke}
      strokeDasharray={dash}
      opacity={opacity}
      strokeLinejoin="round"
    />
  );
}

/* lines of "text" printed on the top face of a sheet — the only hint of
   writing any drawing gets. Bars, never letters. */
export function Print({
  iso,
  x,
  y,
  z,
  w,
  rows,
  color = "#C9D3E6",
  gap = 0.34,
}: {
  iso: Iso;
  x: number;
  y: number;
  z: number;
  w: number;
  rows: number[];
  color?: string;
  gap?: number;
}) {
  return (
    <g stroke={color} strokeWidth={iso.u * 0.1} strokeLinecap="round">
      {rows.map((f, i) => {
        const [x1, y1] = iso.p(x, y + i * gap, z);
        const [x2, y2] = iso.p(x + w * f, y + i * gap, z);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </g>
  );
}

/* a vertical cylinder, drawn as side + top ellipse */
export function Cylinder({
  iso,
  cx,
  cy,
  z = 0,
  r,
  h,
  side,
  top,
  rim,
}: {
  iso: Iso;
  cx: number;
  cy: number;
  z?: number;
  r: number;
  h: number;
  side: string;
  top: string;
  rim?: string;
}) {
  const [ex, by] = iso.p(cx, cy, z);
  const [, ty] = iso.p(cx, cy, z + h);
  const rx = iso.rx(r);
  const ry = iso.ry(r);
  return (
    <g>
      <path d={`M${ex - rx} ${ty} L${ex - rx} ${by} A${rx} ${ry} 0 0 0 ${ex + rx} ${by} L${ex + rx} ${ty} Z`} fill={side} />
      <ellipse cx={ex} cy={ty} rx={rx} ry={ry} fill={top} stroke={rim} strokeWidth={rim ? 1.2 : 0} />
    </g>
  );
}

/* a soft contact shadow under a floating object */
export function Shadow({ iso, cx, cy, r, opacity = 0.12 }: { iso: Iso; cx: number; cy: number; r: number; opacity?: number }) {
  const [x, y] = iso.p(cx, cy, 0);
  return <ellipse cx={x} cy={y} rx={iso.rx(r)} ry={iso.ry(r)} fill="#0A1230" opacity={opacity} filter="url(#iso-blur)" />;
}

/* shared defs every drawing mounts once */
export function IsoDefs() {
  return (
    <defs>
      <filter id="iso-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <radialGradient id="iso-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#B8ECFF" />
        <stop offset="45%" stopColor="#34C2FF" />
        <stop offset="100%" stopColor="#297AFF" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}
