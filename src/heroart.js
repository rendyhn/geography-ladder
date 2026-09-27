/* Decorative background behind the home-page hero: faint, subject-themed doodles (aria-hidden, drawn in a 1200 × 640 box). */
const HERO_ART = (() => {
  const tf = (x, y, rot) => (rot ? ` transform="rotate(${rot} ${x} ${y})"` : '');
  // text: t(x, y, content, size, { rot, cls, font, anchor })
  const t = (x, y, s, size, { rot = 0, cls = '', font = 'serif', anchor = 'start' } = {}) => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" class="hb-t hb-${font} ${cls}"${tf(x, y, rot)}>${s}</text>`;
  const p = (d, cls = '') => `<path d="${d}" class="hb-l ${cls}"/>`;
  const c = (x, y, r, cls = '') => `<circle cx="${x}" cy="${y}" r="${r}" class="hb-l ${cls}"/>`;
  const dot = (x, y, r, cls = '') => `<circle cx="${x}" cy="${y}" r="${r}" class="hb-f ${cls}"/>`;
  const e = (x, y, rx, ry, rot, cls = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" class="hb-l ${cls}"${tf(x, y, rot)}/>`;
  const wave = (x0, y0, len, amp, per) => { let d = `M${x0} ${y0}`; for (let x = 0; x <= len; x += 4) d += `L${(x0 + x).toFixed(1)} ${(y0 - amp * Math.sin(2 * Math.PI * x / per)).toFixed(1)}`; return d; };
  const poly = (cx, cy, r, n, a0 = -Math.PI / 2) => 'M' + [...Array(n)].map((_, k) => { const a = a0 + 2 * Math.PI * k / n; return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }).join('L') + 'Z';
  const parts = [];
  const blob = (cx, cy, r, k) => { let d = ''; for (let a = 0; a <= 360; a += 10) { const rad = a * Math.PI / 180, rr = r * (1 + 0.16 * Math.sin(3 * rad + k) + 0.08 * Math.cos(5 * rad + k)); d += (a ? 'L' : 'M') + (cx + rr * Math.cos(rad)).toFixed(1) + ' ' + (cy + 0.7 * rr * Math.sin(rad)).toFixed(1); } return d + 'Z'; };
  // top strip
  parts.push(c(270, 50, 38) + e(270, 50, 16, 38, 0) + e(270, 50, 30, 38, 0) + p('M232 50H308M270 12V88'));
  parts.push(t(340, 66, '6°S  106°E', 28, { font: 'mono', rot: -2 }));
  parts.push(t(610, 30, 'Equator 0°   Tropic of Cancer 23.4°N', 18, { font: 'mono' }));
  // gap column
  parts.push(c(612, 200, 24) + p('M612 172L618 200L612 228L606 200Z') + t(612, 166, 'N', 14, { font: 'sans', anchor: 'middle', cls: 'hbc1' }));
  parts.push(t(628, 440, 'Ring of Fire     Wallace Line', 18, { rot: -90, font: 'mono' }));
  parts.push(p('M612 520c-14-18-14-34 0-40c14 6 14 22 0 40z', 'hbc1') + c(612, 497, 5));
  // behind the text: faint line drawings only
  [24, 46, 68].forEach(r => parts.push(p(blob(500, 300, r, 0.6))));
  parts.push(p('M150 560C220 500 300 560 360 510S470 470 540 500', 'hb-d'));
  parts.push(p('M430 470L480 400L510 440L540 390L590 470'));
  // bottom strip
  [16, 32, 48].forEach((r, i) => parts.push(p(blob(190, 620, r, 2.1), i ? '' : 'hbc2')));
  parts.push(t(270, 628, 'Sumatra · Jawa · Kalimantan · Sulawesi · Papua', 18, { font: 'mono' }));
  parts.push(p(wave(740, 606, 330, 8, 60), 'hbc3') + p(wave(740, 628, 330, 8, 60)));
  parts.push(p('M880 590h120M880 584v12M940 587v6M1000 584v12'));
  parts.push(t(1070, 638, 'Puncak Jaya 4,884 m', 18, { anchor: 'end', font: 'mono' }));
  // outer edges
  parts.push(c(70, 250, 44) + e(70, 250, 18, 44, 0) + e(70, 250, 34, 44, 0) + p('M26 250H114') + t(30, 480, '8,849 m', 22, { rot: -90, font: 'mono' }) + t(1130, 200, 'W', 40, { font: 'sans', cls: 'hbc4' }) + [30, 50, 70].map(r => p(blob(1120, 430, r, 1.3))).join(''));
  return '<svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' + parts.join('') + '</svg>';
})();
