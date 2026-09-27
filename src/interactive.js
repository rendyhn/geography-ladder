/* ==========================================================================
   Interactive figures: sliders that redraw a figure while you move them.
   A lesson places ${Ix('name', caption)}; app.js calls mountIx() after the
   lesson renders. Each IX entry has ctrls (id, label(), min, max, step,
   value, fmt) and draw(vals) returning { svg, read } (plain text, no TeX,
   so redrawing never waits for MathJax).
   ========================================================================== */
const IX = {};
const Ix = (name, cap) => `<figure class="fig ix" data-ix="${name}"><div class="ix-out"></div><div class="ix-ctrls no-print"></div>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
const ixF = (x, d = 1) => F(+(+x).toFixed(d));   // a rounded plain-text number
function mountIx(root) {
  root.querySelectorAll('.ix[data-ix]').forEach(fig => {
    const def = IX[fig.dataset.ix]; if (!def || fig.dataset.mounted) return;
    fig.dataset.mounted = '1';
    const out = fig.querySelector('.ix-out'), box = fig.querySelector('.ix-ctrls'), vals = {};
    const show = c => (c.fmt ? c.fmt(vals[c.id]) : ixF(vals[c.id], 2));
    box.innerHTML = def.ctrls.map(c => { vals[c.id] = c.value; return `<label class="ix-ctrl"><span class="ix-lab">${c.label()}</span><input type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.value}" data-k="${c.id}"><output>${show(c)}</output></label>`; }).join('');
    const draw = () => { const r = def.draw(vals); out.innerHTML = r.svg + (r.read ? `<p class="ix-read">${r.read}</p>` : ''); };
    box.addEventListener('input', e => { const k = e.target.dataset.k; if (!k) return; vals[k] = +e.target.value; e.target.nextElementSibling.textContent = show(def.ctrls.find(c => c.id === k)); draw(); });
    draw();
  });
}

/* ---------- noon Sun elevation and day length for a latitude and month ---------- */
IX.sunangle = {
  ctrls: [
    { id: 'lat', label: () => T`latitude (° N positive, ° S negative)`, min: -90, max: 90, step: 1, value: -6, fmt: v => v === 0 ? '0°' : `${ixF(Math.abs(v), 0)}° ${v > 0 ? 'N' : 'S'}` },
    { id: 'm', label: () => T`month`, min: 1, max: 12, step: 1, value: 6, fmt: v => tr(IXMONTHS[v - 1]) },
  ],
  draw({ lat, m }) {
    const N = [15, 46, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349][m - 1], dec = 23.44 * Math.sin(2 * Math.PI * (284 + N) / 365);
    const el = 90 - Math.abs(lat - dec), phi = lat * Math.PI / 180, dl = dec * Math.PI / 180, ch = -Math.tan(phi) * Math.tan(dl);
    const day = ch <= -1 ? 24 : ch >= 1 ? 0 : 2 * Math.acos(ch) * 180 / Math.PI / 15;
    const W = 460, H = 260, cx = 230, gy = 210, Rr = 150; let s = svgBox(W, H, T`Height of the Sun above the horizon at noon for the chosen latitude and month`);
    s += sR(0, gy, W, H - gy, 'mf-f3') + sL(0, gy, W, gy, 'mf-line') + sP(`M${cx - Rr} ${gy}A${Rr} ${Rr} 0 0 1 ${cx + Rr} ${gy}`, 'mf-thin', ' fill="none" stroke-dasharray="4 5"');
    const side = lat - dec >= 0 ? -1 : 1, e = Math.max(el, 0) * Math.PI / 180, sx = cx + side * Rr * Math.cos(e), sy = gy - Rr * Math.sin(e);
    if (el > 0) s += sL(cx, gy, sx, sy, 'mf-c2') + sC(sx, sy, 14, 'mf-dot', ' style="fill:#F2B138;stroke:#C98A12"') + sP(`M${cx + side * 46} ${gy}A46 46 0 0 ${side > 0 ? 0 : 1} ${cx + side * 46 * Math.cos(e)} ${gy - 46 * Math.sin(e)}`, 'mf-c1', ' fill="none"') + sT(cx + side * 58, gy - 16, `${ixF(el)}°`, 'mf-lab-b', side > 0 ? 'start' : 'end');
    else s += sT(cx, gy - 40, T`The Sun stays below the horizon (polar night)`, 'mf-lab', 'middle');
    s += sC(cx, gy - 7, 7, 'mf-dot') + sT(cx - Rr - 14, gy + 24, 'S', 'mf-lab-b') + sT(cx + Rr + 14, gy + 24, 'N', 'mf-lab-b');
    return { svg: s + '</svg>', read: T`Sun's declination ${ixF(dec)}° · at noon the Sun is ${el > 0 ? T`${ixF(el)}° above the ${lat - dec >= 0 ? T`southern` : T`northern`} horizon` : T`below the horizon`} · day length about ${ixF(day)} hours. Near the equator the Sun is always high and days last about 12 hours all year.` };
  },
};
const IXMONTHS = [T`January`, T`February`, T`March`, T`April`, T`May`, T`June`, T`July`, T`August`, T`September`, T`October`, T`November`, T`December`];

/* ---------- exponential population growth ---------- */
IX.growth = {
  ctrls: [
    { id: 'r', label: () => T`growth rate (% per year)`, min: 0, max: 4, step: 0.1, value: 1.1, fmt: v => ixF(v, 1) + '%' },
    { id: 'P0', label: () => T`starting population (millions)`, min: 50, max: 300, step: 10, value: 280, fmt: v => ixF(v, 0) },
  ],
  draw({ r, P0 }) {
    const k = Math.log(1 + r / 100), P = t => P0 * Math.exp(k * t), st = niceStep(P(100) * 1.1, 4), top = Math.ceil(P(100) * 1.1 / st) * st, td = r > 0 ? Math.log(2) / k : Infinity;
    const pts = [[100, P(100), `${ixF(P(100), 0)}`, 'end', false, 8, 16]];
    if (td <= 100) pts.push([td, 2 * P0, T`doubled after ${ixF(td, 0)} years`, 'start', false, 7, -8]);
    return {
      svg: planeSvg({ W: 460, H: 300, x: [0, 100], y: [0, top], step: [10, st / 2], tickX: 20, tickY: st, xl: T`years`, yl: T`millions`, fmtY: v => String(Math.round(v)), fns: [{ f: P, cls: 'mf-c1' }], pts, label: T`Population growing at a constant rate over 100 years` }),
      read: T`At ${ixF(r, 1)}% a year the population ${r > 0 ? T`doubles about every ${ixF(td, 0)} years (rule of 70: 70 ÷ ${ixF(r, 1)} ≈ ${ixF(70 / r, 0)})` : T`stays the same`}. After 100 years: ${ixF(P(100), 0)} million.`,
    };
  },
};
