/* ==========================================================================
   More geography figures built on fig.js (small diagrams for thin topics).
   ========================================================================== */
function graphicScaleSvg() {   // 1 : 50 000 → 2 cm per km
  const u = 80, x0 = 40;
  let s = svgBox(420, 110, T`A graphic scale bar from 0 to 4 kilometres for a 1 to 50 000 map, where 2 centimetres represent 1 kilometre`);
  for (let i = 0; i < 4; i++) s += sR(x0 + i * u, 40, u, 12, i % 2 ? 'mf-cell' : 'mf-s1', 0, ' stroke="var(--ink-2)" stroke-width="1.2"');
  for (let i = 0; i <= 4; i++) s += sT(x0 + i * u, 32, `${i}`, 'mf-lab') ;
  s += sT(x0 + 4 * u + 12, 50, 'km', 'mf-lab', 'start') + sArrow(x0, 74, x0 + u, 74, 'mf-c2', 6) + sArrow(x0 + u, 74, x0, 74, 'mf-c2', 6) + sT(x0 + u / 2, 92, T`2 cm on the map`, 'mf-small');
  return s + sT(x0 + 2.5 * u, 92, '1 : 50 000', 'mf-lab-b') + '</svg>';
}
function contourSpacingSvg() {
  const panel = (x0, gap, t) => {
    let s = '';
    for (let i = 0; i < 5; i++) s += sL(x0 + 20 + i * gap, 20, x0 + 20 + i * gap, 90, 'mf-c1', ' stroke-width="1.4"') + (gap >= 40 || i % 4 === 0 ? sT(x0 + 20 + i * gap, 16, String(100 + 50 * i), 'mf-small') : '');
    s += sPline([[x0 + 10, 180], ...[0, 1, 2, 3, 4].map(i => [x0 + 20 + i * gap, 170 - i * 18])], 'mf-c2', ' stroke-width="2.2"') + sL(x0 + 10, 180, x0 + 210, 180, 'mf-axis');
    return s + sT(x0 + 110, 198, t, 'mf-lab-b');
  };
  return svgBox(460, 210, T`Contour lines close together make a steep profile; contour lines far apart make a gentle profile`) + panel(10, 20, T`close together: steep`) + panel(240, 46, T`far apart: gentle`) + '</svg>';
}
function rockSettingsSvg() {
  let s = svgBox(480, 230, T`Where rocks form: lava cools at the surface into extrusive igneous rock, magma cools underground into intrusive rock, sediments settle in layers in the sea, and rock next to the hot magma is changed into metamorphic rock`);
  s += sR(300, 60, 180, 30, 'g-water') + sP('M0 90 L120 90 L175 30 L230 90 L480 90 L480 230 L0 230 Z', 'g-land', ' stroke="var(--ink-3)" stroke-width="1"');
  for (let i = 0; i < 4; i++) s += sP(`M300 ${96 + i * 12} L480 ${96 + i * 12}`, 'mf-thin');
  s += `<ellipse cx="190" cy="175" rx="78" ry="34" class="mf-s4l" stroke="var(--lv4)" stroke-width="10" stroke-opacity="0.35"/>` + `<ellipse cx="190" cy="175" rx="70" ry="28" class="mf-s4" fill-opacity="0.55"/>`;
  s += sP('M175 30 L182 140', 'mf-c4', ' stroke-width="4"') + sP('M160 48 Q150 70 136 86', 'mf-c4', ' fill="none" stroke-width="5" stroke-opacity="0.8"');
  s += sT(100, 60, T`lava: extrusive`, 'mf-small', 'end') + sT(190, 180, T`intrusive (batholith)`, 'mf-lab-b') + sT(390, 150, T`sedimentary layers`, 'mf-small') + sT(284, 206, T`metamorphic zone`, 'mf-small', 'start') + sL(280, 202, 256, 190, 'mf-thin');
  return s + '</svg>';
}
function massMovementSvg() {
  const cw = 120, slope = x0 => sP(`M${x0 + 8} 110 L${x0 + 8} 30 L${x0 + 30} 30 L${x0 + 112} 110 Z`, 'g-land', ' stroke="var(--ink-3)"');
  let s = svgBox(cw * 4, 140, T`Four kinds of mass movement: rockfall, landslide, mudflow and soil creep`);
  [T`rockfall`, T`landslide`, T`mudflow`, T`creep`].forEach((t, i) => { const x0 = i * cw; s += slope(x0) + sT(x0 + cw / 2, 132, t, 'mf-lab-b'); });
  s += sR(46, 60, 12, 10, 'mf-s4l', 2, ' stroke="var(--ink-2)"') + sR(62, 88, 10, 9, 'mf-s4l', 2, ' stroke="var(--ink-2)"') + sArrow(44, 44, 58, 80, 'mf-c2', 6);
  s += sP(`M${cw + 32} 32 Q${cw + 50} 80 ${cw + 100} 104`, 'mf-c2', ' fill="none" stroke-width="2" stroke-dasharray="4 3"') + sPoly([[cw + 58, 60], [cw + 78, 58], [cw + 92, 86], [cw + 70, 90]], 'mf-s4l', ' stroke="var(--ink-2)"') + sArrow(cw + 70, 64, cw + 88, 84, 'mf-c2', 6);
  s += sP(`M${2 * cw + 40} 40 C${2 * cw + 60} 70 ${2 * cw + 70} 90 ${2 * cw + 116} 108 L${2 * cw + 118} 110 L${2 * cw + 70} 110 C${2 * cw + 60} 96 ${2 * cw + 44} 70 ${2 * cw + 36} 40 Z`, 'mf-s4l', ' stroke="var(--ink-2)"');
  [[3 * cw + 40, 36], [3 * cw + 62, 58], [3 * cw + 84, 80]].forEach(([x, y]) => { s += sL(x, y, x + 6, y - 22, 'mf-line', ' stroke-width="2"'); });
  return s + sArrow(3 * cw + 50, 70, 3 * cw + 80, 100, 'mf-c2', 6) + '</svg>';
}
function pyramidShapesSvg() {
  const shapes = [[T`expansive`, [9, 8, 7, 6, 5, 4, 3, 2, 1.2, 0.6]], [T`stationary`, [5, 5, 5, 4.9, 4.8, 4.6, 4.2, 3.6, 2.6, 1.4]], [T`constrictive`, [3, 3.4, 3.8, 4.4, 5, 5.2, 5, 4.4, 3.4, 2]]];
  const cw = 150;
  let s = svgBox(cw * 3, 170, T`Three pyramid shapes: expansive with a wide base, stationary with straight sides, and constrictive with a narrow base`);
  shapes.forEach(([t, v], i) => { const cx = i * cw + cw / 2; v.forEach((w, k) => { const y = 132 - (k + 1) * 11; s += sR(cx - w * 6, y, w * 6, 10, 'mf-s1l', 0, ' stroke-width="0.8"') + sR(cx, y, w * 6, 10, 'mf-s4l', 0, ' stroke-width="0.8"'); }); s += sL(cx, 20, cx, 132, 'mf-line') + sT(cx, 156, t, 'mf-lab-b'); });
  return s + '</svg>';
}
function hdiSvg() {
  const box = (x, y, w, t1, t2, cls) => sR(x, y, w, 50, cls, 8, ' stroke-width="1.4"') + sT(x + w / 2, y + 22, t1, 'mf-lab-b') + sT(x + w / 2, y + 40, t2, 'mf-small');
  let s = svgBox(480, 200, T`The Human Development Index combines three indices, for health, knowledge and standard of living, by a geometric mean`);
  s += box(10, 10, 145, T`Health`, T`life expectancy`, 'mf-s2l') + box(167, 10, 145, T`Knowledge`, T`years of schooling`, 'mf-s1l') + box(324, 10, 145, T`Standard of living`, T`income per person`, 'mf-s4l');
  [82, 240, 396].forEach(x => { s += sArrow(x, 62, 240 + (x - 240) * 0.3, 124, 'mf-line', 8); });
  return s + sR(150, 128, 180, 50, 'mf-s3l', 8, ' stroke-width="1.6"') + sT(240, 150, T`HDI`, 'mf-lab-b') + sT(240, 168, '∛(I₁ × I₂ × I₃)', 'mf-small') + '</svg>';
}
function materialIndexSvg() {
  const row = (y, t, near, cap) => {
    const R = 60, Mx = 400, fx = near === 'R' ? 110 : 350;
    return sL(R, y, Mx, y, 'mf-line', ' stroke-width="2" stroke-dasharray="6 4"') + sC(R, y, 16, 'mf-s2l', ' stroke-width="1.4"') + sT(R, y + 5, 'R', 'mf-lab-b') + sC(Mx, y, 16, 'mf-s1l', ' stroke-width="1.4"') + sT(Mx, y + 5, 'M', 'mf-lab-b') + sR(fx - 16, y - 14, 32, 28, 'mf-s4l', 3, ' stroke-width="1.4"') + sT(fx, y - 20, T`factory`, 'mf-small') + sT(20, y - 36, t, 'mf-lab-b', 'start') + sT(230, y + 32, cap, 'mf-small');
  };
  return svgBox(460, 210, T`Weight-losing industries locate near the raw material; weight-gaining industries locate near the market`) + row(70, T`weight-losing (MI > 1)`, 'R', T`e.g. sugar mill, cement: near the raw material`) + row(160, T`weight-gaining (MI < 1)`, 'M', T`e.g. bottled drinks, bread: near the market`) + '</svg>';
}
function thresholdRangeSvg() {
  const panel = (cx, rr, rt, t) => sC(cx, 100, rr, 'mf-s2l', ' fill-opacity="0.35" stroke="var(--lv2)" stroke-width="2"') + sC(cx, 100, rt, 'mf-ring', ' stroke="var(--lv4)" stroke-dasharray="5 4" stroke-width="2"') + sC(cx, 100, 5, 'mf-dot') + sT(cx, 196, t, 'mf-lab-b');
  let s = svgBox(460, 210, T`Left: the range is larger than the threshold area, so the service survives. Right: the range is smaller than the threshold, so it fails`);
  s += panel(120, 80, 55, T`range > threshold: viable`) + panel(345, 50, 78, T`range < threshold: fails`);
  return s + sT(120, 16, T`range`, 'mf-small') + sT(345, 16, T`threshold`, 'mf-small') + sL(120, 20, 120, 24, 'mf-thin') + '</svg>';
}
function bufferSvg() {
  const river = [[10, 150], [80, 130], [160, 150], [240, 120], [320, 135], [410, 110]];
  let s = svgBox(420, 220, T`A buffer of equal width along a river and circular buffers around two wells, used to find which houses lie close to them`);
  s += sPline(river, 'mf-c1', ' stroke-width="40" stroke-opacity="0.18" stroke-linejoin="round"') + sPline(river, 'mf-c1', ' stroke-width="3"');
  [[120, 60], [300, 60]].forEach(([x, y]) => { s += sC(x, y, 38, 'mf-s4l', ' fill-opacity="0.35" stroke="var(--lv4)" stroke-dasharray="4 3"') + sC(x, y, 4, 'mf-s4'); });
  [[40, 120], [100, 150], [150, 70], [190, 180], [210, 40], [260, 128], [290, 80], [330, 190], [370, 40], [395, 150], [60, 200]].forEach(([x, y]) => { s += sR(x - 5, y - 5, 10, 10, 'mf-s3l', 1, ' stroke="var(--ink-2)"'); });
  return s + sT(410, 96, T`river buffer`, 'mf-small', 'end') + sT(120, 16, T`well buffer`, 'mf-small') + '</svg>';
}
function propCirclesSvg() {
  let s = svgBox(440, 170, T`Proportional circles for values 1, 4 and 9: the areas are proportional to the values, so the radii are 1, 2 and 3`);
  [[1, 60], [4, 150], [9, 290]].forEach(([v, x]) => { const r = 18 * Math.sqrt(v); s += sC(x, 130 - r, r, 'mf-s1l', ' stroke-width="1.6"') + sT(x, 158, `${v}`, 'mf-lab-b'); });
  return s + sT(420, 20, 'r ∝ √v', 'mf-lab', 'end') + '</svg>';
}
function terraceSvg() {
  let s = svgBox(440, 200, T`Rice terraces cut into a hillside: flat flooded steps held by low walls, with water flowing from one step to the next`), d = 'M10 190', x = 10, y = 190;
  for (let i = 0; i < 6; i++) { s += sR(x + 8, y - 26, 58, 6, 'g-water'); d += ` L${x + 66} ${y} L${x + 66} ${y - 26}`; x += 66; y -= 26; }
  s += sP(d + ` L430 ${y} L430 190 Z`, 'g-land', ' stroke="var(--ink-3)"');
  for (let i = 0, xx = 10, yy = 190; i < 6; i++, xx += 66, yy -= 26) s += [0, 1, 2].map(k => sL(xx + 16 + k * 18, yy - 26, xx + 16 + k * 18, yy - 38, 'mf-c2', ' stroke-width="1.6"')).join('');
  return s + sArrow(390, 40, 330, 58, 'mf-c1', 7) + sT(398, 36, T`irrigation water`, 'mf-small', 'end') + '</svg>';
}
function incomeBandsSvg() {   // World Bank income groups (GNI per capita, Atlas method, FY2025 thresholds)
  const W = 540, X = v => 24 + v / 16000 * (W - 48);
  const bands = [[0, 1145, T`low`, 'mf-s4l'], [1145, 4515, T`lower-middle`, 'mf-s3l'], [4515, 14005, T`upper-middle`, 'mf-s2l'], [14005, 16000, T`high →`, 'mf-s1l']];
  let s = svgBox(W, 150, T`World Bank income groups by GNI per person, with Indonesia at about 4 870 US dollars in the upper-middle group`);
  bands.forEach(([a, b, t, cls], i) => { s += sR(X(a), 50, X(b) - X(a), 30, cls, 0, ' stroke="var(--paper)"') + (i === 0 ? sT(X(a), 118, t + ' ↑', 'mf-small', 'start') : sT((X(a) + X(b)) / 2, 70, t, 'mf-small')); });
  [0, 4000, 8000, 12000, 16000].forEach(v => { s += sL(X(v), 80, X(v), 86, 'mf-axis') + sT(X(v), 100, F(v), 'mf-small'); });
  s += sL(X(4870), 40, X(4870), 90, 'mf-c4', ' stroke-width="2.5"') + sT(X(4870) + 4, 34, T`Indonesia ≈ 4 870`, 'mf-lab-b', 'start');
  return s + sT(W - 20, 124, T`GNI per person (US$)`, 'mf-small', 'end') + '</svg>';
}
