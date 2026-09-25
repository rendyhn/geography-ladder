/* ==========================================================================
   Geography helpers: numbers, units, scientific notation, charts and the
   SVG maps and diagrams the topics draw from their generated numbers.
   ========================================================================== */

/* ---------- numbers ---------- */
const NUM = x => F(x);   // plain-text number, usable where a generator has its own variable called F
const sig = (x, n = 3) => (x === 0 ? 0 : +(+x).toPrecision(n));            // round to n significant figures
const deg = r => (r * 180) / Math.PI, rad = d => (d * Math.PI) / 180;
const sinD = d => Math.sin(rad(d)), cosD = d => Math.cos(rad(d)), tanD = d => Math.tan(rad(d));
/* a unit written for TeX: m/s^2 -> \mathrm{m/s^2}; Ω and °C are handled */
function uT(u) {
  if (!u) return '';
  if (u === '°C') return '^\\circ\\mathrm{C}';
  if (u === '°') return '^\\circ';
  if (u === '%') return '\\%';
  return '\\mathrm{' + un(u).replace(/Ω/g, '\\Omega').replace(/·/g, '\\cdot ').replace(/ /g, '\\,') + '}';   // un(): local unit words, e.g. km/jam
}
const QT = (x, u, fixed) => `${M(x, fixed)}${u === '°' || u === '°C' || u === '%' ? '' : '\\,'}${uT(u)}`;   // quantity inside $…$
const Q = (x, u, fixed) => `$${QT(x, u, fixed)}$`;                                           // quantity as inline maths
/* scientific notation inside $…$: 3{,}0 \times 10^{8} */
function sciT(x, n = 3) {
  if (x === 0) return '0';
  let e = Math.floor(Math.log10(Math.abs(x))), m = +(x / 10 ** e).toPrecision(n);
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  return e === 0 ? M(m) : `${M(m)} \\times 10^{${e}}`;
}

/* ---------- SVG building blocks ---------- */
const sub = (a, b) => `${a}<tspan class="fig-sub" dy="4">${b}</tspan>`;   // subscript inside an SVG label
const svgOpen = (w, h, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${String(label).replace(/\x22/g, '&quot;')}">`;
const txt = (x, y, s, cls = 'fig-text', anchor = 'middle') => `<text class="${cls}" x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" text-anchor="${anchor}">${s}</text>`;
/* an arrow from (x1,y1) to (x2,y2); kind picks the colour (a = accent, b = second colour, c = muted) */
function arrow(x1, y1, x2, y2, kind = 'a', width = 2.4) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 11, W = 5.5;
  const bx = x2 - L * Math.cos(a), by = y2 - L * Math.sin(a);
  const p1 = [bx + W * Math.sin(a), by - W * Math.cos(a)], p2 = [bx - W * Math.sin(a), by + W * Math.cos(a)];
  const f = n => +n.toFixed(1);
  return `<line class="fig-vec fig-vec-${kind}" style="stroke-width:${width}" x1="${f(x1)}" y1="${f(y1)}" x2="${f(bx)}" y2="${f(by)}"/><polygon class="fig-head fig-head-${kind}" points="${f(x2)},${f(y2)} ${f(p1[0])},${f(p1[1])} ${f(p2[0])},${f(p2[1])}"/>`;
}
/* label placed just beyond the tip of an arrow */
function tipLabel(x1, y1, x2, y2, s, gap = 16) {
  const a = Math.atan2(y2 - y1, x2 - x1), c = Math.cos(a);
  const anchor = c > 0.5 ? 'start' : c < -0.5 ? 'end' : 'middle', g = anchor === 'middle' ? gap : 7;   // text starts (or ends) just past a sideways tip
  return txt(x2 + g * c, y2 + gap * Math.sin(a) + 5, s, 'fig-text', anchor);
}

/* ---------- a line graph with labelled axes (for motion graphs) ---------- */
/* pts: [[x, y], …] in data units; xs, ys: axis maxima; xl, yl: axis labels */
function graphSvg(pts, { xMax, yMax, yMin = 0, xl = 't (s)', yl = 'v (m/s)', xStep, yStep, label, dots = true }) {
  const W = 420, H = 250, L = 52, R = 18, Tp = 16, B = 40;
  const X = x => L + (x / xMax) * (W - L - R), Y = y => Tp + ((yMax - y) / (yMax - yMin)) * (H - Tp - B);
  let s = svgOpen(W, H, label || yl + ' – ' + xl);
  for (let x = xStep; x <= xMax + 1e-9; x += xStep) s += `<line class="fig-grid" x1="${X(x)}" y1="${Y(yMin)}" x2="${X(x)}" y2="${Y(yMax)}"/>` + txt(X(x), Y(yMin) + 18, F(x), 'fig-small');
  for (let y = Math.ceil(yMin / yStep - 1e-9) * yStep; y <= yMax + 1e-9; y += yStep) { if (Math.abs(y - yMin) > 1e-9) s += `<line class="fig-grid" x1="${X(0)}" y1="${Y(y)}" x2="${X(xMax)}" y2="${Y(y)}"/>`; s += txt(X(0) - 8, Y(y) + 4, F(y), 'fig-small', 'end'); }
  if (yMin < 0) s += `<line class="fig-line" x1="${X(0)}" y1="${Y(0)}" x2="${X(xMax)}" y2="${Y(0)}"/>`;
  s += arrow(X(0), Y(yMin), X(xMax) + 12, Y(yMin), 'c', 1.5) + arrow(X(0), Y(yMin), X(0), Y(yMax) - 10, 'c', 1.5);
  s += txt(X(xMax), Y(yMin) + 34, xl, 'fig-small', 'end') + txt(X(0) + 6, Tp + 2, yl, 'fig-small', 'start');
  s += `<polyline class="fig-plot" points="${pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(' ')}"/>`;
  if (dots) pts.forEach(([x, y]) => { s += `<circle class="fig-dot" cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="3"/>`; });
  return s + '</svg>';
}


/* ==========================================================================
   Drawing primitives. Colours come from CSS classes (g-*, fig-*) so every
   figure follows the light and dark themes.
   ========================================================================== */
const f1 = n => +(+n).toFixed(1);
/* compass letters for coordinates (N, S, E, W), from the interface text so each language has its own */
const dir = k => (I18N.ui && I18N.ui['dir' + k]) || k;
const FigW = (svg, cap) => Fig(svg, cap).replace('class="fig"', 'class="fig fig-wide"');   // a wider figure (maps, charts)
const P = pts => pts.map(p => `${f1(p[0])},${f1(p[1])}`).join(' ');
const polyg = (pts, cls, extra = '') => `<polygon class="${cls}" points="${P(pts)}"${extra}/>`;
const pline = (pts, cls, extra = '') => `<polyline class="${cls}" fill="none" points="${P(pts)}"${extra}/>`;
const path = (d, cls, extra = '') => `<path class="${cls}" d="${d}"${extra}/>`;
const ln = (x1, y1, x2, y2, cls = 'fig-line', extra = '') => `<line class="${cls}" x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}"${extra}/>`;
const circ = (cx, cy, r, cls, extra = '') => `<circle class="${cls}" cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}"${extra}/>`;
const rect = (x, y, w, h, cls, rx = 0, extra = '') => `<rect class="${cls}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}"${rx ? ` rx="${rx}"` : ''}${extra}/>`;
const lbl = (x, y, s, anchor = 'middle', cls = 'g-label') => `<text class="${cls}" x="${f1(x)}" y="${f1(y)}" text-anchor="${anchor}">${s}</text>`;
const note = (x, y, s, anchor = 'middle') => lbl(x, y, s, anchor, 'g-note');
/* a smooth path through points (Catmull–Rom converted to cubic Béziers) */
function smooth(pts, closed = false) {
  if (pts.length < 3) return 'M' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L');
  const n = pts.length, g = i => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
  }
  return d + (closed ? 'Z' : '');
}
/* a curved arrow along an arc (for cycles and circulation cells) */
function arcArrow(cx, cy, r, a1, a2, kind = 'a', width = 2.2) {
  const pt = a => [cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))];
  const [x1, y1] = pt(a1), [x2, y2] = pt(a2), large = Math.abs(a2 - a1) > 180 ? 1 : 0, sweep = a2 < a1 ? 1 : 0;
  const t = rad(a2) + (a2 < a1 ? -Math.PI / 2 : Math.PI / 2), hx = x2 + 0.01 * Math.cos(t), hy = y2 - 0.01 * Math.sin(t);
  const back = [x2 - 11 * Math.cos(t), y2 + 11 * Math.sin(t)];
  return `<path class="fig-vec fig-vec-${kind}" style="stroke-width:${width}" d="M${f1(x1)} ${f1(y1)} A${f1(r)} ${f1(r)} 0 ${large} ${sweep} ${f1(x2)} ${f1(y2)}"/>` + arrow(back[0], back[1], hx, hy, kind, 0.1);
}
/* axes box shared by the charts: returns scale functions and the axis markup */
function axes({ W, H, L = 52, R = 20, Tp = 22, B = 42, xMin = 0, xMax, yMin = 0, yMax, xStep, yStep, xl = '', yl = '', xFmt, yFmt = F, xTicks, grid = true, yRight }) {
  if (!xFmt) xFmt = xMin >= 1000 && xMax <= 2200 ? String : F;   // years without a thousands separator
  const X = x => L + ((x - xMin) / (xMax - xMin)) * (W - L - R), Y = y => Tp + ((yMax - y) / (yMax - yMin)) * (H - Tp - B);
  let s = '';
  if (grid && yStep) for (let y = Math.ceil(yMin / yStep - 1e-9) * yStep; y <= yMax + 1e-9; y += yStep) s += ln(L, Y(y), W - R, Y(y), 'fig-grid') + txt(L - 7, Y(y) + 4, yFmt(sig(y, 6)), 'fig-small', 'end');
  const xs = xTicks || (xStep ? (() => { const a = []; for (let x = Math.ceil(xMin / xStep - 1e-9) * xStep; x <= xMax + 1e-9; x += xStep) a.push(x); return a; })() : []);
  xs.forEach(x => { s += ln(X(x), H - B, X(x), H - B + 4, 'fig-line') + txt(X(x), H - B + 17, xFmt(sig(x, 6)), 'fig-small'); });
  s += ln(L, H - B, W - R, H - B, 'fig-line') + ln(L, Tp - 4, L, H - B, 'fig-line');
  if (xl) s += txt((L + W - R) / 2, H - 6, xl, 'fig-small');
  if (yl) s += txt(L - 4, Tp - 9, yl, 'fig-small', 'start');
  if (yRight) s += ln(W - R, Tp - 4, W - R, H - B, 'fig-line');
  return { X, Y, s };
}
/* line chart. series: [{ pts: [[x, y], …], cls: 'g-l1', label, dots }] */
function lineChartSvg(series, o) {
  const W = o.W || 460, H = o.H || 260, a = axes({ W, H, ...o });
  let s = svgOpen(W, H, o.label) + a.s;
  series.forEach((sr, i) => {
    s += pline(sr.pts.map(([x, y]) => [a.X(x), a.Y(y)]), `g-line ${sr.cls || 'g-l' + (i + 1)}`, sr.dash ? ' stroke-dasharray="6 5"' : '');
    if (sr.dots) sr.pts.forEach(([x, y]) => { s += circ(a.X(x), a.Y(y), 3.2, (sr.cls || 'g-l' + (i + 1)).replace('g-l', 'g-s')); });
    if (sr.label) { const [x, y] = sr.pts[sr.at != null ? sr.at : sr.pts.length - 1]; s += lbl(a.X(x) + (sr.dx || -4), a.Y(y) + (sr.dy || -8), sr.label, sr.anchor || 'end'); }
  });
  return s + (o.extra ? o.extra(a) : '') + '</svg>';
}
/* vertical bar chart. items: [{ label, value, cls }] */
function barChartSvg(items, o) {
  const W = o.W || 460, H = o.H || 250, n = items.length, a = axes({ W, H, xMin: 0, xMax: n, ...o, xStep: 0 });
  const bw = (a.X(1) - a.X(0)) * 0.62;
  let s = svgOpen(W, H, o.label) + a.s;
  items.forEach((it, i) => {
    const x = a.X(i + 0.5), y = a.Y(Math.max(it.value, o.yMin || 0));
    s += rect(x - bw / 2, y, bw, a.Y(o.yMin || 0) - y, it.cls || 'g-s1', 2) + txt(x, H - (o.B || 42) + 16, it.label, 'fig-small');
    if (o.values !== false) s += note(x, y - 5, it.show != null ? it.show : F(it.value));
  });
  return s + (o.extra ? o.extra(a) : '') + '</svg>';
}
/* climograph: monthly rainfall bars (mm, left axis) and temperature line (°C, right axis) */
function climographSvg(temp, rain, { label, months, tMin = 0, tMax = 40, rMax = 400 } = {}) {
  const W = 470, H = 270, L = 48, R = 46, Tp = 26, B = 40, X = i => L + (i + 0.5) * (W - L - R) / 12;
  const Yr = r => Tp + (1 - r / rMax) * (H - Tp - B), Yt = t => Tp + (tMax - t) / (tMax - tMin) * (H - Tp - B);
  let s = svgOpen(W, H, label);
  for (let k = 0; k <= 4; k++) { const r = rMax * k / 4, y = Yr(r); s += ln(L, y, W - R, y, 'fig-grid') + txt(L - 6, y + 4, F(r), 'fig-small', 'end') + txt(W - R + 6, y + 4, F(sig(tMin + (tMax - tMin) * k / 4, 3)), 'fig-small', 'start'); }
  const bw = (W - L - R) / 12 * 0.64;
  rain.forEach((r, i) => { s += rect(X(i) - bw / 2, Yr(r), bw, Yr(0) - Yr(r), 'g-water-2', 2); });
  s += path(smooth(temp.map((t, i) => [X(i), Yt(t)])), 'g-line g-l2');
  temp.forEach((t, i) => { s += circ(X(i), Yt(t), 3, 'g-s2'); });
  (months || ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']).forEach((m, i) => { s += txt(X(i), H - B + 16, m, 'fig-small'); });
  s += ln(L, Tp - 4, L, H - B, 'fig-line') + ln(W - R, Tp - 4, W - R, H - B, 'fig-line') + ln(L, H - B, W - R, H - B, 'fig-line');
  s += txt(L - 4, Tp - 10, 'mm', 'fig-small', 'start') + txt(W - R + 4, Tp - 10, '°C', 'fig-small', 'end');
  return s + '</svg>';
}
/* horizontal bars, e.g. a share of a whole. items: [{ label, value, cls }] */
function hbarSvg(items, { label, max, unit = '', W = 460 } = {}) {
  const rowH = 30, H = items.length * rowH + 16, L = 150, Rr = 96, m = max || Math.max(...items.map(i => i.value));
  let s = svgOpen(W, H, label);
  items.forEach((it, i) => {
    const y = 8 + i * rowH, w = (W - L - Rr) * it.value / m;
    s += txt(L - 8, y + 19, it.label, 'fig-small', 'end') + rect(L, y + 5, Math.max(w, 1), rowH - 10, it.cls || 'g-s1', 3) + note(L + w + 6, y + 19, (it.show != null ? it.show : F(it.value)) + unit, 'start');
  });
  return s + '</svg>';
}
/* donut chart. items: [{ label, value, cls }] */
function donutSvg(items, { label, center = '', W = 440 } = {}) {
  const H = 230, cx = 115, cy = 115, r = 88, r0 = 52, tot = items.reduce((a, b) => a + b.value, 0);
  let s = svgOpen(W, H, label), a0 = -90;
  items.forEach((it, i) => {
    const a1 = a0 + 360 * it.value / tot, big = a1 - a0 > 180 ? 1 : 0, p = (a, rr) => [cx + rr * cosD(a), cy + rr * sinD(a)];
    const [x1, y1] = p(a0, r), [x2, y2] = p(a1, r), [x3, y3] = p(a1, r0), [x4, y4] = p(a0, r0);
    s += path(`M${f1(x1)} ${f1(y1)} A${r} ${r} 0 ${big} 1 ${f1(x2)} ${f1(y2)} L${f1(x3)} ${f1(y3)} A${r0} ${r0} 0 ${big} 0 ${f1(x4)} ${f1(y4)}Z`, it.cls || 'g-s' + (i + 1), ' stroke="var(--paper)" stroke-width="2"');
    s += rect(236, 30 + i * 30, 14, 14, it.cls || 'g-s' + (i + 1), 3) + txt(258, 42 + i * 30, `${it.label}: ${it.show != null ? it.show : F(it.value)}`, 'fig-small', 'start');
    a0 = a1;
  });
  return s + (center ? lbl(cx, cy + 5, center) : '') + '</svg>';
}
/* population pyramid. groups: age labels from youngest; male/female: % of the total population */
function pyramidSvg(groups, male, female, { label, mLabel = 'M', fLabel = 'F', max } = {}) {
  const n = groups.length, W = 460, rowH = Math.min(22, 300 / n), H = n * rowH + 50, cx = W / 2, gap = 26, m = max || Math.ceil(Math.max(...male, ...female)), sc = (W / 2 - gap - 30) / m;
  let s = svgOpen(W, H, label);
  for (let k = 0; k <= m; k += m > 8 ? 2 : 1) { const d = gap + k * sc; s += ln(cx - d, 16, cx - d, H - 30, 'fig-grid') + ln(cx + d, 16, cx + d, H - 30, 'fig-grid') + txt(cx - d, H - 16, F(k), 'fig-small') + txt(cx + d, H - 16, F(k), 'fig-small'); }
  groups.forEach((g, i) => {
    const y = H - 30 - (i + 1) * rowH;
    s += rect(cx - gap - male[i] * sc, y + 1.5, male[i] * sc, rowH - 3, 'g-s1', 2) + rect(cx + gap, y + 1.5, female[i] * sc, rowH - 3, 'g-s2', 2) + txt(cx, y + rowH / 2 + 4, g, 'fig-small');
  });
  s += lbl(cx - gap - 40, 12, mLabel, 'end') + lbl(cx + gap + 40, 12, fLabel, 'start') + txt(cx, H - 2, '%', 'fig-small');
  return s + '</svg>';
}
/* a cycle of labelled stages on an ellipse, joined by curved arrows (rock cycle, disaster management, …) */
function cycleSvg(labels, { label, W = 470, H = 300, rx = 160, ry = 100, center = '' } = {}) {
  const n = labels.length, cx = W / 2, cy = H / 2 + 2, at = a => [cx + rx * cosD(a), cy - ry * sinD(a)];
  const ang = i => 90 - (360 * i) / n;
  let s = svgOpen(W, H, label);
  labels.forEach((_, i) => {   // arrow along the ellipse from stage i to stage i+1, leaving room for the boxes
    const a1 = ang(i) - 360 / n * 0.28, a2 = ang(i) - 360 / n * 0.72, pts = [...Array(13)].map((_, k) => at(a1 + (a2 - a1) * k / 12));
    s += path(smooth(pts), 'fig-vec fig-vec-a', ' style="stroke-width:2.2"') + arrow(pts[10][0], pts[10][1], pts[12][0], pts[12][1], 'a', 0.1);
  });
  labels.forEach((t, i) => {
    const [x, y] = at(ang(i)), w = Math.max(70, String(t).replace(/<[^>]+>/g, '').length * 7.4 + 20);
    s += rect(x - w / 2, y - 15, w, 30, 'fig-block', 8) + lbl(x, y + 4.5, t);
  });
  return s + (center ? lbl(cx, cy + 5, center, 'middle', 'g-title') : '') + '</svg>';
}

/* ---------- the globe: orthographic view with parallels and meridians ---------- */
function globeSvg({ lat = 0, lon = 0, lat0 = 15, lon0, label, mark = true, name = '', W = 360 } = {}) {
  const H = 320, cx = W / 2, cy = 160, R = 130, l0 = lon0 == null ? lon - 25 : lon0;
  const pr = (la, lo) => { const c = sinD(lat0) * sinD(la) + cosD(lat0) * cosD(la) * cosD(lo - l0); return c < -0.001 ? null : [cx + R * cosD(la) * sinD(lo - l0), cy - R * (cosD(lat0) * sinD(la) - sinD(lat0) * cosD(la) * cosD(lo - l0))]; };
  const curve = (pts, cls, extra) => { let d = '', pen = false; pts.forEach(p => { if (!p) { pen = false; return; } d += `${pen ? 'L' : 'M'}${f1(p[0])} ${f1(p[1])} `; pen = true; }); return d ? path(d, cls, extra) : ''; };
  let s = svgOpen(W, H, label) + circ(cx, cy, R, 'g-water');
  for (let la = -75; la <= 75; la += 15) s += curve([...Array(73)].map((_, k) => pr(la, -180 + k * 5)), la === 0 ? 'g-line g-l2' : 'g-thin', la === 0 ? '' : '');
  for (let lo = -180; lo < 180; lo += 15) s += curve([...Array(37)].map((_, k) => pr(-90 + k * 5, lo)), lo === 0 ? 'g-line g-l1' : 'g-thin');
  s += circ(cx, cy, R, 'fig-line');
  const eq = pr(0, l0 + 60), pm = pr(35, 0);
  if (eq) s += note(eq[0], eq[1] - 6, '0°');
  if (pm) s += note(pm[0] + 4, pm[1], '0°', 'start');
  if (mark) {
    s += curve([...Array(73)].map((_, k) => pr(lat, -180 + k * 5)), 'g-line g-l4', ' stroke-dasharray="5 4"') + curve([...Array(37)].map((_, k) => pr(-90 + k * 5, lon)), 'g-line g-l4', ' stroke-dasharray="5 4"');
    const p = pr(lat, lon); if (p) s += circ(p[0], p[1], 6, 'g-hot', ' stroke="var(--paper)" stroke-width="2"') + (name ? lbl(p[0] + 10, p[1] - 8, name, 'start') : '');
  }
  return s + '</svg>';
}

/* ---------- a map sheet with its components (title, legend, north arrow, scale, inset, grid) ---------- */
function scaleBar(x, y, px, text) {
  let s = '';
  for (let k = 0; k < 4; k++) s += rect(x + k * px / 4, y, px / 4, 6, k % 2 ? 'g-cloud g-edge' : 'fig-dot');
  return s + txt(x, y + 20, '0', 'fig-small') + txt(x + px, y + 20, text, 'fig-small');
}
function northArrow(x, y, s = 1) {
  return polyg([[x, y - 22 * s], [x - 8 * s, y + 6 * s], [x, y], [x + 8 * s, y + 6 * s]], 'fig-dot') + lbl(x, y - 26 * s, 'N');
}
function mapSheetSvg({ label, title, legend = [], scaleText = '1 : 50.000', barText = '1 km', callouts } = {}) {
  const W = 480, H = 330;
  let s = svgOpen(W, H, label) + rect(6, 6, W - 12, H - 12, 'fig-frame', 4) + rect(22, 42, 300, 230, 'g-water');
  s += path(smooth([[60, 60], [150, 52], [250, 70], [300, 120], [290, 200], [230, 250], [130, 258], [60, 220], [40, 140]], true), 'g-land g-edge');
  s += path(smooth([[120, 140], [160, 110], [210, 130], [220, 180], [170, 205], [125, 185]], true), 'g-land-2');
  s += path(smooth([[250, 90], [215, 130], [180, 170], [150, 230], [140, 262]]), 'g-river');
  s += circ(170, 150, 5, 'g-hot', ' stroke="var(--paper)" stroke-width="2"') + circ(95, 210, 4, 'fig-dot') + pline([[60, 110], [120, 150], [170, 150], [260, 200]], 'fig-line', ' stroke-dasharray="1 0" style="stroke-width:2.2"');
  for (let k = 1; k < 4; k++) s += ln(22 + k * 75, 42, 22 + k * 75, 272, 'fig-grid') + ln(22, 42 + k * 57.5, 322, 42 + k * 57.5, 'fig-grid');
  s += rect(22, 42, 300, 230, 'fig-frame');
  s += lbl(172, 30, title || '', 'middle', 'g-title');
  s += rect(338, 42, 124, 86, 'fig-frame', 3) + rect(346, 50, 108, 70, 'g-water');
  s += path(smooth([[360, 70], [400, 58], [440, 76], [430, 106], [385, 112], [364, 96]], true), 'g-land g-edge') + rect(392, 76, 20, 16, 'fig-frame', 0, ' style="stroke:var(--bad);stroke-width:2"');
  legend.forEach((it, i) => { const y = 150 + i * 22; s += rect(340, y - 11, 16, 12, it.cls, 2) + txt(362, y, it.text, 'fig-small', 'start'); });
  s += northArrow(300, 80) + scaleBar(40, 286, 120, barText) + txt(250, 300, scaleText, 'fig-small');
  if (callouts) s += callouts;
  return s + '</svg>';
}

/* ---------- contour map with a cross-section A–B underneath ----------
   hills: [[x, y, height, spread], …] in map units 0–100 × 0–60; interval in metres */
function contourSvg(hills, { interval = 50, base = 0, label, A, B, profile = true, marks = [] } = {}) {
  const W = 470, MW = 430, MH = 258, ox = 20, oy = 12, nx = 86, ny = 52;
  const h = (x, y) => base + hills.reduce((a, [hx, hy, hh, sp]) => a + hh * Math.exp(-((x - hx) ** 2 + (y - hy) ** 2) / (2 * sp * sp)), 0);
  const X = x => ox + x / 100 * MW, Y = y => oy + y / 60 * MH;
  const g = [...Array(ny + 1)].map((_, j) => [...Array(nx + 1)].map((_, i) => h(i * 100 / nx, j * 60 / ny)));
  const top = Math.max(...g.flat()), levels = []; for (let v = Math.ceil((base + 1) / interval) * interval; v < top; v += interval) levels.push(v);
  const H = profile ? 420 : oy + MH + 12;
  let s = svgOpen(W, H, label) + rect(ox, oy, MW, MH, 'g-land');
  // shaded bands between contours, lightest at the bottom
  const lab = [];
  levels.forEach((v, li) => {
    let d = '';
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const c = [g[j][i], g[j][i + 1], g[j + 1][i + 1], g[j + 1][i]], idx = c.reduce((a, z, k) => a | ((z >= v ? 1 : 0) << k), 0);
      if (idx === 0 || idx === 15) continue;
      const p = (k1, k2) => { const cs = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]], t = (v - c[k1]) / (c[k2] - c[k1]); return [X((cs[k1][0] + t * (cs[k2][0] - cs[k1][0])) * 100 / nx), Y((cs[k1][1] + t * (cs[k2][1] - cs[k1][1])) * 60 / ny)]; };
      const E = [[0, 1], [1, 2], [2, 3], [3, 0]], cut = E.filter(([a, b]) => (c[a] >= v) !== (c[b] >= v)).map(([a, b]) => p(a, b));
      for (let k = 0; k + 1 < cut.length; k += 2) { d += `M${f1(cut[k][0])} ${f1(cut[k][1])}L${f1(cut[k + 1][0])} ${f1(cut[k + 1][1])}`; if (!lab[li] && i > 8 && i < nx - 8 && j > 4 && j < ny - 4 && (i + j * 3) % 7 === 0) lab[li] = cut[k]; }
    }
    s += path(d, v % (interval * 5) === 0 ? 'g-contour-major' : 'g-contour');
  });
  levels.forEach((v, li) => { if (lab[li] && li % 2 === 0) s += note(lab[li][0], lab[li][1] + 4, F(v)); });
  hills.forEach(([hx, hy, hh]) => { if (hh > 0) s += polyg([[X(hx), Y(hy) - 6], [X(hx) - 5, Y(hy) + 3], [X(hx) + 5, Y(hy) + 3]], 'fig-dot') + note(X(hx) + 8, Y(hy) + 4, F(Math.round(h(hx, hy))), 'start'); });
  marks.forEach(m => { s += circ(X(m[0]), Y(m[1]), 4.5, 'g-hot', ' stroke="var(--paper)" stroke-width="1.5"') + lbl(X(m[0]) + 8, Y(m[1]) - 6, m[2], 'start'); });
  s += rect(ox, oy, MW, MH, 'fig-frame');
  if (A && B) {
    s += ln(X(A[0]), Y(A[1]), X(B[0]), Y(B[1]), 'fig-dash', ' style="stroke-width:2"') + lbl(X(A[0]) - 8, Y(A[1]) + 4, 'A', 'end') + lbl(X(B[0]) + 8, Y(B[1]) + 4, 'B', 'start');
    if (profile) {
      const pts = [...Array(101)].map((_, k) => { const t = k / 100; return [t, h(A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1]))]; });
      const pm = Math.ceil(Math.max(...pts.map(p => p[1]), top * 0.3) / interval) * interval, PX = t => 56 + t * (W - 80), PY = z => 300 + (1 - (z - base) / (pm - base)) * 96;
      s += path(`M${PX(0)} ${PY(base)} ` + pts.map(([t, z]) => `L${f1(PX(t))} ${f1(PY(z))}`).join(' ') + ` L${PX(1)} ${PY(base)}Z`, 'g-rock g-edge');
      for (let z = base; z <= pm + 1e-9; z += interval * Math.max(1, Math.round((pm - base) / interval / 4))) s += ln(56, PY(z), W - 24, PY(z), 'fig-grid') + txt(50, PY(z) + 4, F(z), 'fig-small', 'end');
      s += lbl(PX(0), 290, 'A') + lbl(PX(1), 290, 'B') + txt(56, 412, '', 'fig-small');
    }
  }
  return s + '</svg>';
}

/* ---------- concept hub: a centre with spokes to surrounding items ---------- */
function hubSvg(center, items, { label, W = 480, H = 330, rx = 170, ry = 118 } = {}) {
  const cx = W / 2, cy = H / 2, n = items.length;
  let s = svgOpen(W, H, label);
  items.forEach((t, i) => { const a = 90 - 360 * i / n; s += ln(cx, cy, cx + rx * cosD(a), cy - ry * sinD(a), 'g-thin'); });
  s += circ(cx, cy, 44, 'g-s1', ' fill-opacity="0.16" stroke="var(--lv5)" stroke-width="2"') + lbl(cx, cy + 5, center, 'middle', 'g-title');
  items.forEach((t, i) => {
    const a = 90 - 360 * i / n, x = cx + rx * cosD(a), y = cy - ry * sinD(a), w = Math.max(64, String(t).length * 7 + 18);
    s += rect(x - w / 2, y - 13, w, 26, 'fig-block', 13) + lbl(x, y + 4.5, t);
  });
  return s + '</svg>';
}

/* ---------- Indonesia: a simplified map (outlines are schematic) ---------- */
const ISLANDS = {
  sumatra: [[95.3, 5.6], [97.5, 5.2], [98.7, 3.8], [100.4, 2.2], [101.5, 1.7], [103.8, 0.4], [104.5, -1.0], [106.0, -2.9], [106.0, -4.0], [105.8, -5.8], [104.6, -5.9], [103.5, -4.9], [102.3, -4.0], [101.0, -2.5], [100.3, -1.1], [99.3, 0.2], [98.6, 1.7], [97.5, 2.7], [96.4, 3.9], [95.4, 4.8]],
  java: [[105.2, -6.8], [106.1, -5.9], [107.0, -6.0], [108.3, -6.3], [109.6, -6.8], [110.9, -6.4], [112.6, -6.9], [114.4, -7.7], [114.4, -8.6], [112.5, -8.4], [110.3, -8.1], [108.0, -7.8], [106.4, -7.4], [105.4, -6.9]],
  borneo: [[109.0, 1.6], [109.6, 2.0], [111.0, 1.5], [113.0, 3.2], [115.4, 4.9], [116.7, 6.9], [117.7, 6.4], [119.2, 5.3], [118.1, 4.3], [117.8, 2.0], [118.9, 1.0], [117.8, 0.8], [117.5, -0.9], [116.5, -2.6], [116.3, -3.9], [114.7, -4.1], [113.0, -3.2], [111.7, -3.2], [110.2, -2.9], [110.0, -1.3], [109.1, -0.4], [108.9, 0.4]],
  sulawesi: [[119.4, -5.6], [120.4, -5.5], [120.3, -3.2], [121.0, -2.7], [122.2, -4.4], [123.0, -4.6], [122.5, -3.2], [121.4, -1.9], [122.9, -0.8], [123.3, -0.9], [121.5, -1.3], [120.6, -1.3], [121.2, 0.5], [123.2, 0.9], [124.3, 0.4], [125.2, 1.5], [124.5, 1.1], [122.9, 1.0], [120.8, 1.3], [119.9, 0.4], [119.7, -0.8], [119.4, -2.5], [118.8, -3.0], [119.6, -3.5]],
  newguinea: [[131.0, -1.2], [132.5, -0.4], [134.2, -0.9], [134.1, -2.5], [135.6, -3.3], [137.9, -1.5], [141.0, -2.6], [144.5, -3.8], [146.1, -5.5], [147.8, -6.2], [147.0, -7.8], [144.0, -8.1], [143.2, -9.1], [141.0, -9.1], [139.2, -8.1], [137.7, -8.3], [138.0, -7.2], [136.8, -5.0], [134.8, -4.2], [133.3, -3.9], [132.6, -3.2], [132.0, -2.4]],
  bali: [[114.5, -8.1], [115.7, -8.4], [115.2, -8.8], [114.5, -8.5]], lombok: [[116.0, -8.3], [116.7, -8.3], [116.5, -8.9], [116.0, -8.8]],
  sumbawa: [[116.8, -8.5], [118.0, -8.2], [119.1, -8.4], [118.8, -8.8], [117.3, -9.0]], flores: [[119.8, -8.5], [122.9, -8.1], [122.8, -8.6], [120.5, -8.8]],
  sumba: [[118.9, -9.4], [120.8, -9.6], [120.4, -10.3], [119.0, -9.8]], timor: [[123.5, -10.2], [125.2, -9.0], [127.3, -8.4], [126.0, -9.3], [124.3, -10.2], [123.7, -10.4]],
  halmahera: [[127.4, 1.9], [128.2, 1.4], [128.0, 0.3], [128.9, 0.6], [128.2, -0.9], [127.6, 0.0], [127.9, 1.0]], seram: [[127.9, -3.0], [130.9, -3.4], [130.7, -3.8], [128.0, -3.6]],
  buru: [[125.9, -3.2], [127.2, -3.2], [127.1, -3.8], [126.0, -3.7]], bangka: [[105.2, -1.6], [106.0, -1.6], [106.8, -3.0], [106.2, -3.0]],
};
const NEIGHBOURS = {
  malaya: [[100.2, 6.5], [101.5, 6.8], [103.4, 4.5], [104.2, 1.4], [103.5, 1.3], [101.3, 2.8], [100.4, 4.8]],
  mindanao: [[122.0, 7.0], [123.7, 7.8], [125.4, 9.8], [126.6, 7.3], [125.4, 5.6], [124.2, 6.4], [122.1, 6.9]],
  australia: [[125.0, -14.4], [127.0, -13.8], [129.5, -14.9], [131.9, -11.3], [136.5, -12.0], [136.7, -13.9], [135.9, -15.0], [139.5, -17.4], [141.5, -12.6], [142.5, -10.7], [143.9, -14.5], [146, -19], [125, -19]],
};
let clipN = 0;
function indonesiaSvg({ label, zones = false, lines = [], marks = [], grid = true, names = false, lonMin = 94, lonMax = 142, latMin = -12, latMax = 8, W = 480, extra } = {}) {
  const k = (W - 40) / (lonMax - lonMin), H = Math.round((latMax - latMin) * k + 34), X = lo => 30 + (lo - lonMin) * k, Y = la => 8 + (latMax - la) * k, id = 'idc' + (++clipN);
  const shape = pts => path(smooth(pts.map(([lo, la]) => [X(lo), Y(la)]), true), '');
  let s = svgOpen(W, H, label) + `<defs><clipPath id="${id}"><rect x="30" y="8" width="${f1(X(lonMax) - 30)}" height="${f1(Y(latMin) - 8)}"/></clipPath></defs>`;
  s += rect(30, 8, X(lonMax) - 30, Y(latMin) - 8, 'g-water') + `<g clip-path="url(#${id})">`;
  if (zones) {   // WIB / WITA / WIT bands
    const b1 = [[114.6, latMax], [114.6, -2.6], [116.4, -2.6], [116.4, -4.2], [115.2, -8.0], [115.1, latMin]], b2 = [[126.6, latMax], [126.6, -2.0], [125.6, -7.0], [127.2, -8.0], [127.2, latMin]];
    const band = (pts, cls) => polyg(pts.map(([lo, la]) => [X(lo), Y(la)]), cls, ' fill-opacity="0.16"');
    s += band([[lonMin, latMax], ...b1, [lonMin, latMin]], 'g-s4') + band([...b1, ...[...b2].reverse()], 'g-s3') + band([...b2, [lonMax, latMin], [lonMax, latMax]], 'g-s5');
  }
  if (grid) for (let lo = 95; lo <= lonMax; lo += 5) s += ln(X(lo), 8, X(lo), Y(latMin), 'fig-grid');
  if (grid) for (let la = -10; la <= latMax; la += 5) s += ln(30, Y(la), X(lonMax), Y(la), la === 0 ? 'fig-line' : 'fig-grid', la === 0 ? ' stroke-dasharray="6 4"' : '');
  Object.values(NEIGHBOURS).forEach(p => { s += shape(p).replace('class=""', 'class="g-sand" fill-opacity="0.55" stroke="var(--ink-3)" stroke-width="0.8"'); });
  Object.values(ISLANDS).forEach(p => { s += shape(p).replace('class=""', 'class="g-land-2 g-edge"'); });
  const LINES = { wallace: [[115.8, -11], [115.8, -8.2], [117.5, -4.5], [118.6, -1], [119.1, 2.5], [120.6, 5.5], [121.2, 8]], weber: [[129.6, 4], [127.1, -0.6], [128.1, -4.6], [128.6, -8.0], [129.4, -12]], lydekker: [[131.4, 4], [130.8, -0.6], [132.0, -4.6], [133.4, -6.6], [132.6, -12]] };
  const LCLS = { wallace: 'g-l2', weber: 'g-l4', lydekker: 'g-l5' };
  lines.forEach(([key, text]) => { const p = LINES[key]; s += path(smooth(p.map(([lo, la]) => [X(lo), Y(la)])), `g-line ${LCLS[key]}`, ' stroke-dasharray="7 4"'); });
  s += '</g>' + rect(30, 8, X(lonMax) - 30, Y(latMin) - 8, 'fig-frame');
  const LAB = { wallace: [1, 'start', 5, 12], weber: [2, 'end', -6, 0], lydekker: [3, 'start', 6, 0] };   // which vertex to label, and how
  lines.forEach(([key, text]) => { const [i, an, dx, dy] = LAB[key], p = LINES[key][i]; s += note(X(p[0]) + dx, Y(p[1]) + dy, text, an); });
  if (grid) { for (let lo = 95; lo <= lonMax; lo += 10) s += txt(X(lo), Y(latMin) + 14, `${lo}°${dir('E')}`, 'fig-small'); [5, 0, -5, -10].forEach(la => { s += txt(26, Y(la) + 4, `${Math.abs(la)}°${la > 0 ? dir('N') : la < 0 ? dir('S') : ''}`, 'fig-small', 'end'); }); }
  if (zones) zones.forEach(([lo, text]) => { s += lbl(X(lo), 24, text); });
  if (names) names.forEach(([lo, la, text]) => { s += note(X(lo), Y(la), text); });
  marks.forEach(([lo, la, text, anchor]) => { s += circ(X(lo), Y(la), 4.5, 'g-hot', ' stroke="var(--paper)" stroke-width="1.5"') + (text ? lbl(X(lo) + (anchor === 'end' ? -8 : 8), Y(la) - 6, text, anchor || 'start') : ''); });
  return s + (extra ? extra(X, Y) : '') + '</svg>';
}

/* ---------- a strip of the world's time zones: meridians every 15°, clock times for two places ---------- */
function timeStripSvg({ label, places = [], refLon = 0, refHour = 12, zone = true } = {}) {   // zone: standard zone time (whole hours), else local mean time
  const W = 480, H = 166, L = 20, R = 20, X = lo => L + (lo + 180) / 360 * (W - L - R);
  let s = svgOpen(W, H, label);
  for (let z = -12; z < 12; z++) s += rect(X(z * 15 - 7.5 < -180 ? -180 : z * 15 - 7.5), 30, (X(Math.min(180, z * 15 + 7.5)) - X(Math.max(-180, z * 15 - 7.5))), 70, z % 2 ? 'g-sky' : 'g-water', 0, ' fill-opacity="0.9"');
  for (let lo = -180; lo <= 180; lo += 45) s += ln(X(lo), 26, X(lo), 104, 'fig-grid') + txt(X(lo), 118, `${Math.abs(lo)}°${lo > 0 ? dir('E') : lo < 0 ? dir('W') : ''}`, 'fig-small');
  s += ln(X(0), 24, X(0), 106, 'g-line g-l1') + note(X(0) + 4, 158, 'GMT / UTC', 'start');
  [...places].sort((a, b) => a[0] - b[0]).forEach(([lo, text], i) => {
    const h = ((refHour + (zone ? Math.round(lo / 15) - Math.round(refLon / 15) : (lo - refLon) / 15)) % 24 + 24) % 24, hh = Math.floor(h), mm = Math.round((h - hh) * 60);
    s += ln(X(lo), 30, X(lo), 100, 'g-line g-l2') + circ(X(lo), 65, 5, 'g-hot', ' stroke="var(--paper)" stroke-width="1.5"');
    const up = i % 2 === 1, t = `${text} ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`, an = X(lo) < 70 ? 'start' : X(lo) > W - 70 ? 'end' : 'middle';   // alternate above and below the strip
    s += up ? ln(X(lo), 30, X(lo), 16, 'g-thin') + lbl(X(lo), 12, t, an) : lbl(X(lo), 140, t, an);
  });
  return s + '</svg>';
}

/* ---------- map projections: the developable surface touching the globe ---------- */
function projectionSvg(kind, { label } = {}) {
  const W = 480, H = 250, cx = 120, cy = 132, R = 78;
  let s = svgOpen(W, H, label) + circ(cx, cy, R, 'g-water') + path(`M${cx - R} ${cy} A${R} ${R * 0.3} 0 0 0 ${cx + R} ${cy}`, 'g-line g-l2');
  for (const la of [-50, -25, 25, 50]) { const r = R * cosD(la), y = cy - R * sinD(la); s += path(`M${cx - r} ${f1(y)} A${f1(r)} ${f1(r * 0.3)} 0 0 0 ${cx + r} ${f1(y)}`, 'g-thin'); }
  for (const a of [0, 45, 90, 135]) s += `<ellipse class="g-thin" cx="${cx}" cy="${cy}" rx="${f1(R * Math.abs(cosD(a)))}" ry="${R}"/>`;
  s += circ(cx, cy, R, 'fig-line');
  const out = 300;   // the flattened result on the right
  if (kind === 'cylindrical') {
    s += rect(cx - R, cy - R - 24, 2 * R, 2 * R + 48, 'fig-shape fig-alpha') + ln(cx - R, cy - R - 24, cx - R, cy + R + 24, 'fig-line') + ln(cx + R, cy - R - 24, cx + R, cy + R + 24, 'fig-line');
    s += rect(out, 40, 160, 180, 'g-water g-edge');
    for (let k = 0; k <= 8; k++) s += ln(out + k * 20, 40, out + k * 20, 220, 'g-thin');
    [-60, -30, 0, 30, 60].forEach(la => { const y = 130 - 90 * Math.log(Math.tan(Math.PI / 4 + rad(la) / 2)) / Math.log(Math.tan(Math.PI / 4 + rad(70) / 2)); s += ln(out, y, out + 160, y, la === 0 ? 'g-line g-l2' : 'g-thin'); });
  } else if (kind === 'conic') {
    s += polyg([[cx, cy - R - 70], [cx - R - 36, cy + 16], [cx + R + 36, cy + 16]], 'fig-shape fig-alpha') + ln(cx - R * cosD(30), cy - R * sinD(30), cx + R * cosD(30), cy - R * sinD(30), 'g-line g-l4');
    const ox = out + 80, oy = 30;
    [60, 90, 120, 150].forEach(r => { s += path(`M${f1(ox - r * sinD(50))} ${f1(oy + r * cosD(50))} A${r} ${r} 0 0 0 ${f1(ox + r * sinD(50))} ${f1(oy + r * cosD(50))}`, r === 120 ? 'g-line g-l4' : 'g-thin'); });
    [-50, -25, 0, 25, 50].forEach(a => { s += ln(ox + 50 * sinD(a), oy + 50 * cosD(a), ox + 170 * sinD(a), oy + 170 * cosD(a), 'g-thin'); });
  } else {
    s += ln(cx - R - 20, cy - R, cx + R + 20, cy - R, 'fig-line', ' style="stroke-width:3"') + circ(cx, cy - R, 4, 'g-hot');
    const ox = out + 80, oy = 130;
    [25, 50, 75].forEach(r => { s += circ(ox, oy, r, 'g-thin'); });
    for (let a = 0; a < 180; a += 30) s += ln(ox - 80 * cosD(a), oy - 80 * sinD(a), ox + 80 * cosD(a), oy + 80 * sinD(a), 'g-thin');
    s += circ(ox, oy, 80, 'fig-line') + circ(ox, oy, 4, 'g-hot');
  }
  return s + '</svg>';
}

/* ---------- remote sensing: energy from the Sun, reflected by the surface to a satellite sensor ---------- */
function remoteSensingSvg({ label, sun = 'Sun', sensor = 'Sensor', atmosphere = 'Atmosphere', station = 'Ground station', active = false } = {}) {
  const W = 480, H = 280;
  let s = svgOpen(W, H, label) + rect(0, 0, W, 210, 'g-sky') + rect(0, 60, W, 90, 'g-cloud', 0, ' fill-opacity="0.35"') + note(470, 80, atmosphere, 'end');
  s += path(`M0 210 L0 225 C60 218 90 232 150 226 L200 232 L200 280 L0 280Z`, 'g-veg') + path('M200 232 L310 232 L310 280 L200 280Z', 'g-water-2') + path('M310 232 C360 222 420 230 480 224 L480 280 L310 280Z', 'g-sand');
  for (let k = 0; k < 6; k++) s += circ(20 + k * 28, 214 + (k % 2) * 4, 11, 'g-veg') ;
  s += rect(360, 196, 26, 30, 'g-rock-2', 1) + rect(392, 186, 20, 40, 'g-rock-2', 1);
  if (!active) s += circ(52, 42, 24, 'g-core', ' stroke="var(--g-magma)" stroke-width="2"') + lbl(52, 84, sun);
  s += rect(330, 22, 40, 22, 'fig-block', 3) + rect(300, 28, 26, 10, 'g-s1') + rect(374, 28, 26, 10, 'g-s1') + lbl(350, 15, sensor);
  if (!active) s += arrow(70, 60, 150, 226, 'b') + arrow(154, 226, 336, 46, 'a');
  else s += arrow(340, 46, 250, 228, 'b') + arrow(256, 228, 350, 48, 'a');
  s += circ(450, 238, 14, 'fig-block') + ln(450, 238, 462, 222, 'fig-line') + note(472, 272, station, 'end') + path('M372 38 Q430 110 448 222', 'fig-vec fig-vec-c fig-dashed', ' style="stroke-width:1.4"');
  return s + '</svg>';
}

/* ---------- GIS: data layers stacked over the same area ---------- */
function gisLayersSvg(names, { label } = {}) {
  const W = 480, H = 60 + names.length * 56, x0 = 70, w = 250, d = 60;
  let s = svgOpen(W, H, label);
  names.forEach((t, i) => {
    const y = 20 + i * 56, cls = ['g-land', 'g-water', 'g-sand', 'g-land-2', 'g-sky'][i % 5];
    s += polyg([[x0 + d, y], [x0 + d + w, y], [x0 + w, y + 40], [x0, y + 40]], `${cls} g-edge`, ' fill-opacity="0.92"');
    if (i === 0) s += path(`M${x0 + 40} ${y + 30} C${x0 + 110} ${y + 5} ${x0 + 170} ${y + 34} ${x0 + 280} ${y + 6}`, 'fig-line', ' style="stroke-width:2.4"');
    if (i === 1) s += path(`M${x0 + 90} ${y + 36} C${x0 + 140} ${y + 22} ${x0 + 200} ${y + 20} ${x0 + 290} ${y + 4}`, 'g-river');
    if (i === 2) [[120, 18], [180, 26], [240, 12], [270, 30]].forEach(([a, b]) => { s += circ(x0 + a, y + b, 4, 'g-hot'); });
    if (i === 3) s += polyg([[x0 + 110, y + 8], [x0 + 190, y + 8], [x0 + 170, y + 32], [x0 + 90, y + 32]], 'g-veg', ' fill-opacity="0.8"');
    s += ln(x0 + w + 12, y + 20, x0 + w + 40, y + 20, 'g-thin') + lbl(x0 + w + 46, y + 25, t, 'start');
  });
  return s + '</svg>';
}
/* raster (cells) versus vector (points, lines, polygons) */
function rasterVectorSvg({ label, raster = 'Raster', vector = 'Vector' } = {}) {
  const W = 480, H = 230; let s = svgOpen(W, H, label);
  const cls = ['g-water', 'g-land', 'g-land-2', 'g-veg', 'g-sand'];
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) { const v = Math.sin(i * 0.7) + Math.cos(j * 0.6) + (i + j) * 0.12; s += rect(20 + i * 18, 20 + j * 18, 18, 18, cls[Math.max(0, Math.min(4, Math.floor(v + 1.8)))] + ' g-edge', 0, ' style="stroke-width:0.4"'); }
  s += lbl(110, 216, raster);
  s += rect(270, 20, 180, 180, 'g-land g-edge') + polyg([[290, 40], [360, 34], [380, 90], [320, 110], [284, 80]], 'g-veg', ' fill-opacity="0.8" stroke="var(--ink-2)"');
  s += path('M270 170 C320 150 360 180 450 130', 'g-river') + pline([[300, 190], [340, 140], [420, 120], [440, 40]], 'fig-line', ' style="stroke-width:2.2"');
  [[400, 70], [420, 170], [330, 170]].forEach(([x, y]) => { s += circ(x, y, 5, 'g-hot', ' stroke="var(--paper)" stroke-width="1.5"'); });
  return s + lbl(360, 216, vector) + '</svg>';
}
