/* ==========================================================================
   TRACK J — University Geography
   ========================================================================== */
level({
  id: 'university', mark: 'J', name: 'University Geography', short: 'University', band: 'Spatial analysis · methods', color: 'lv10',
  blurb: 'Tools and ideas from the first years of a geography degree: spatial statistics, quantitative geomorphology and hydrology, thematic cartography and research methods.',
  topics: [
{
  id: 'spatial-analysis', stage: 'uni', title: 'Spatial Analysis',
  blurb: 'Describing where things are with numbers: point patterns and the nearest-neighbour index, the mean centre, buffers and overlay, distance decay, and spatial autocorrelation.',
  lesson: () => T`
<p><b>Spatial analysis</b> uses the location of things, not only their attributes, to find patterns and explain them. Its first question is often whether points (shops, wells, earthquake epicentres, cases of a disease) are <b>clustered</b>, <b>random</b> or <b>regular</b>.</p>
${FigW(`<div class="g-row">${[['clustered', T`Clustered: R near 0`], ['random', T`Random: R near 1`], ['regular', T`Regular: R up to 2.15`]].map(([k, t]) => `<div>${pointPatternSvg(k, { label: t })}<div class="g-cap">${t}</div></div>`).join('')}</div>`, T`Three point patterns and their nearest-neighbour index R.`)}
${Key(T`<p><b>Nearest-neighbour analysis</b> (Clark and Evans, 1954) compares the observed mean distance from each point to its nearest neighbour, $\bar d$, with the mean expected if the points were random:</p><p>$$R = \frac{\bar d}{\bar d_E}, \qquad \bar d_E = \frac{1}{2\sqrt{n / A}}$$</p><p>with $n$ points in an area $A$. $R = 0$ means all points at one place, $R \approx 1$ random, and $R = 2.15$ perfectly regular (a hexagonal lattice).</p>`)}
<h3>Other tools</h3>
${Tbl([T`Tool`, T`What it does`, T`Example`], [[T`Mean centre`, T`the average of the x and y coordinates of all points`, T`the centre of a country's population, and how it moves`], [T`Buffer`, T`a zone within a fixed distance of a feature`, T`the area within 500 m of a river or 1 km of a school`], [T`Overlay`, T`combining map layers to find places that meet several conditions`, T`land that is flat, not forest and not flood-prone`], [T`Distance decay`, T`interaction falls as distance grows`, T`fewer customers from further away`], [T`Spatial autocorrelation`, T`nearby places tend to have similar values (Tobler's first law)`, T`neighbouring districts with similar poverty rates`]])}
${Tip(T`<p><b>Tobler's first law of geography</b> (1970): "everything is related to everything else, but near things are more related than distant things." Moran's I measures it: positive when similar values cluster, near 0 when values are spread at random.</p>`)}`,
  gens: [
    () => {
      const n = pick([16, 25, 36, 49]), A = pick([4, 9, 16, 25, 100]), dE = sig(1 / (2 * Math.sqrt(n / A)), 3), R0 = pick([0.3, 0.6, 1, 1.4, 1.9]), d = sig(R0 * dE, 3), R = sig(d / dE, 3);
      return { q: T`There are ${n} wells in an area of ${Q(A, 'km²')}. The mean distance from each well to its nearest neighbour is ${Q(d, 'km')}. Calculate the nearest-neighbour index $R$.`, a: R, rtol: 0.03, w: [sig(d / (1 / Math.sqrt(n / A)), 3), sig(dE / d, 3), sig(d * 2 * (n / A), 3)],
        s: T`$\bar d_E = \frac{1}{2\sqrt{${n} / ${A}}} = ${M(dE)}$ km, so $R = \frac{${M(d)}}{${M(dE)}} = ${M(R)}$: ${R < 0.7 ? T`clustered.` : R > 1.3 ? T`tending towards regular.` : T`close to random.`}` };
    },
    () => {
      const R = pick([0.15, 0.4, 0.95, 1.05, 1.8, 2.1]), a = R < 0.7 ? T`Clustered` : R > 1.3 ? T`Regular (dispersed)` : T`Random`;
      return { q: T`A nearest-neighbour analysis gives $R = ${M(R)}$. What kind of pattern is it?`, a, w: [T`Clustered`, T`Random`, T`Regular (dispersed)`].filter(x => x !== a), only: 'mc', s: T`$R$ near 0 is clustered, near 1 random, towards ${NUM(2.15)} regular: this is <b>${a}</b>.` };
    },
    () => {
      const k = pick(['clustered', 'random', 'regular']), a = { clustered: T`Clustered`, random: T`Random`, regular: T`Regular (dispersed)` }[k];
      return { q: T`What kind of point pattern is shown?${Fig(pointPatternSvg(k, { seed: ri(2, 90), label: T`A point pattern` }))}`, a, w: [T`Clustered`, T`Random`, T`Regular (dispersed)`].filter(x => x !== a), only: 'mc', s: T`This is a <b>${a}</b> pattern.` };
    },
    () => {
      const P = [[ri(1, 9), ri(1, 9)], [ri(1, 9), ri(1, 9)], [ri(1, 9), ri(1, 9)], [ri(1, 9), ri(1, 9)]], mx = sig(P.reduce((a, p) => a + p[0], 0) / 4, 3), my = sig(P.reduce((a, p) => a + p[1], 0) / 4, 3), ax = chance();
      return { q: T`Four schools are at (${P.map(p => p.join(', ')).join('), (')}) on a grid in km. What is the ${ax ? 'x' : 'y'}-coordinate of their mean centre?`, a: ax ? mx : my, rtol: 0.01, w: [ax ? my : mx, sig((ax ? mx : my) * 4, 3), sig((ax ? mx : my) + 1, 3)],
        s: T`Mean centre: $\bar x = \frac{${P.map(p => p[0]).join(' + ')}}{4} = ${M(mx)}$, $\bar y = \frac{${P.map(p => p[1]).join(' + ')}}{4} = ${M(my)}$.` };
    },
    () => {
      const r = pick([0.5, 1, 2, 3]), a = sig(Math.PI * r * r, 3);
      return { q: T`A GIS draws a circular buffer of radius ${Q(r, 'km')} around a well. What area does the buffer cover?`, a, u: 'km²', rtol: 0.01, w: [sig(2 * Math.PI * r, 3), sig(Math.PI * r, 3), sig(r * r, 3)],
        s: T`$A = \pi r^2 = \pi \times ${M(r)}^2 = ${QT(a, 'km²')}$.` };
    },
    () => pick([
      { q: T`What does Tobler's first law of geography say?`, a: T`Near things are more related than distant things`, w: [T`All places are equally connected`, T`Distance does not matter`, T`Maps must have a north arrow`], only: 'mc', s: T`"Everything is related to everything else, but near things are more related than distant things."` },
      { q: T`Which GIS operation finds land that is both flat and outside a flood zone?`, a: T`Overlay`, w: [T`Buffer`, T`Mean centre`, T`Nearest-neighbour index`], only: 'mc', s: T`Overlay combines several layers and keeps the places that meet all the conditions.` },
      { q: T`What does a strongly positive Moran's I mean?`, a: T`Similar values cluster together in space`, w: [T`Values are spread at random`, T`Neighbours have opposite values`, T`There are no data`], only: 'mc', s: T`Positive spatial autocorrelation: high values sit near high values and low near low.` },
    ]),
  ],
},
{
  id: 'geomorphometry', stage: 'uni', title: 'Quantitative Geomorphology',
  blurb: 'Measuring landforms: slope gradient in percent and degrees, slope from a contour map, slope classes, relative relief, and the hypsometric integral.',
  lesson: () => T`
<p><b>Geomorphometry</b> measures the shape of the land surface so that landforms can be compared, mapped and used in planning (farming, roads, landslide risk). Its most basic measure is <b>slope</b>.</p>
${FigW(slopeSvg(30, 200, { names: { run: T`horizontal distance`, rise: T`height difference` }, label: T`A right triangle showing a slope: a horizontal distance of 200 metres and a height difference of 30 metres, with the slope angle theta at the bottom` }), T`Slope is the rise over the run.`)}
${Key(T`<p>$$\text{slope (\%)} = \frac{\Delta h}{d} \times 100, \qquad \theta = \tan^{-1}\frac{\Delta h}{d}$$</p><p>with $\Delta h$ the height difference and $d$ the horizontal distance. A 100% slope is 45°. On a topographic map, $\Delta h$ = (number of contour intervals) × (contour interval), and $d$ = map distance × scale.</p>`)}
${Tbl([T`Slope (%)`, T`Class (Van Zuidam)`, T`Suitable use`], [['0–2', T`flat`, T`wet rice, towns`], ['2–7', T`gently sloping`, T`farming, settlement`], ['7–15', T`sloping`, T`farming with conservation`], ['15–30', T`moderately steep`, T`plantations, terraces`], ['30–70', T`steep`, T`forest; high landslide risk`], ['70–140', T`very steep`, T`protected forest`], [T`over 140`, T`extremely steep`, T`protected; cliffs`]])}
${Tip(T`<p><b>Relative relief</b> is the difference between the highest and lowest points in an area. The <b>hypsometric integral</b>, $HI = \frac{\bar h - h_{\min}}{h_{\max} - h_{\min}}$, shows how much of a basin is still high ground: above about 0.6 a young, little-eroded landscape; below about 0.35 an old, worn-down one.</p>`)}`,
  gens: [
    () => {
      const d = pick([100, 200, 250, 400, 500]), h = pick([5, 10, 20, 40, 60, 100, 150]), s = sig(h / d * 100, 3);
      return { q: T`Two points ${Q(d, 'm')} apart horizontally differ in height by ${Q(h, 'm')}. What is the slope in percent?${FigW(slopeSvg(h, d, { names: { run: T`horizontal distance`, rise: T`height difference` }, label: T`A slope triangle` }))}`, a: s, u: '%', rtol: 0.01, w: [sig(d / h * 100, 3), sig(h / d, 3), sig(Math.atan(h / d) * 180 / Math.PI, 3)],
        s: T`$\frac{${M(h)}}{${M(d)}} \times 100 = ${M(s)}\%$.` };
    },
    () => {
      const p = pick([10, 25, 50, 100, 173]), deg = sig(Math.atan(p / 100) * 180 / Math.PI, 3);
      return { q: T`A slope is ${p}%. What is its angle in degrees?`, a: deg, u: '°', rtol: 0.02, w: [sig(p * 0.9, 3), sig(p / 100 * 90, 3) === deg ? sig(deg + 5, 3) : sig(p / 100 * 90, 3), sig(Math.atan(100 / p) * 180 / Math.PI, 3)],
        s: T`$\theta = \tan^{-1}(${M(p / 100)}) = ${M(deg)}°$.` };
    },
    () => {
      const CI = pick([12.5, 25, 50]), n = pick([2, 3, 4, 6]), cm = pick([1, 2, 2.5, 4]), sc = pick([25000, 50000]), d = cm * sc / 100, h = n * CI, s = sig(h / d * 100, 3);
      return { q: T`On a map at scale 1 : ${F(sc)} with a contour interval of ${Q(CI, 'm')}, a path crosses ${n} contour intervals over ${Q(cm, 'cm')} on the map. What is the average slope in percent?`, a: s, u: '%', rtol: 0.02, w: [sig(h / (cm * sc) * 100, 3), sig(n * CI / cm, 3), sig(CI / d * 100, 3)],
        s: T`$\Delta h = ${n} \times ${M(CI)} = ${M(h)}$ m; $d = ${M(cm)} \times ${M(sc)} = ${M(cm * sc)}$ cm $= ${M(d)}$ m; slope $= \frac{${M(h)}}{${M(d)}} \times 100 = ${M(s)}\%$.` };
    },
    () => {
      const v = pick([1, 5, 10, 20, 45, 100, 160]), c = [[2, T`Flat`], [7, T`Gently sloping`], [15, T`Sloping`], [30, T`Moderately steep`], [70, T`Steep`], [140, T`Very steep`], [1e9, T`Extremely steep`]], a = c.find(x => v <= x[0])[1];
      return { q: T`A slope of ${v}% falls in which Van Zuidam class?`, a, w: c.map(x => x[1]).filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`${v}% is <b>${a}</b>.` };
    },
    () => {
      const mn = pick([0, 100, 200]), mx = mn + pick([1000, 1500, 2000]), hi = pick([0.25, 0.4, 0.5, 0.65, 0.75]), mean = mn + hi * (mx - mn);
      return { q: T`A drainage basin has a minimum height of ${Q(mn, 'm')}, a maximum of ${Q(mx, 'm')} and a mean of ${Q(mean, 'm')}. Calculate the hypsometric integral.`, a: hi, rtol: 0.01, w: [sig(mean / mx, 3), sig((mx - mean) / (mx - mn), 3), sig(mean / (mx - mn), 3) === hi ? sig(hi + 0.1, 3) : sig(mean / (mx - mn), 3)],
        s: T`$HI = \frac{${M(mean)} - ${M(mn)}}{${M(mx)} - ${M(mn)}} = ${M(hi)}$. ${hi > 0.6 ? T`A young, little-eroded landscape.` : hi < 0.35 ? T`An old, worn-down landscape.` : T`A mature landscape.`}` };
    },
    () => pick([
      { q: T`A slope of 100% corresponds to what angle?`, a: '45°', w: ['90°', '100°', '30°'], only: 'mc', s: T`100% means the rise equals the run: $\tan\theta = 1$, so $\theta = 45°$.` },
      { q: T`What is relative relief?`, a: T`The difference between the highest and lowest points in an area`, w: [T`The height above sea level`, T`The slope angle`, T`The number of contours`], only: 'mc', s: T`It measures how rugged an area is, independent of its height above sea level.` },
      { q: T`Why is slope important for land-use planning?`, a: T`Steep slopes erode easily and risk landslides`, w: [T`Steep slopes are always the most fertile`, T`Slope affects only the climate`, T`Flat land cannot be farmed`], only: 'mc', s: T`Steep land should be kept under forest or terraced; flat land suits towns and wet rice.` },
    ]),
  ],
},
{
  id: 'hydrology', stage: 'uni', title: 'Applied Hydrology',
  blurb: 'Morphometry of drainage basins: Strahler stream order, bifurcation ratio, drainage density and basin shape, and estimating areal rainfall with the Thiessen polygon method.',
  lesson: () => T`
<p>Hydrologists describe a drainage basin with numbers so that basins can be compared and their floods predicted. The first step is to order the streams.</p>
${FigW(strahlerSvg({ label: T`A stream network with Strahler orders: headwater streams are order 1, two order-1 streams join to make order 2, and two order-2 streams join to make order 3` }), T`Strahler stream orders. Order rises only when two streams of the same order meet.`)}
${Key(T`<p><b>Strahler's rule</b>: headwater streams are order 1. When two streams of order $u$ meet, the stream below is order $u + 1$; when streams of different orders meet, the higher order continues. The <b>bifurcation ratio</b> compares the number of streams of successive orders:</p><p>$$R_b = \frac{N_u}{N_{u+1}}$$</p><p>usually between 3 and 5. The <b>drainage density</b> is the total stream length per unit area, $D_d = \frac{\sum L}{A}$ (km/km²): high on impermeable, bare or steep ground, low on permeable rock and under forest. The <b>circularity ratio</b> $R_c = \frac{4\pi A}{P^2}$ (with $P$ the perimeter) is 1 for a circle; round basins give sharper flood peaks.</p>`)}
<h3>Areal rainfall: Thiessen polygons</h3>
${FigW(thiessenSvg([[60, 50], [180, 40], [250, 120], [100, 150], [200, 200], [40, 210]], { values: ['120 mm', '90 mm', '150 mm', '110 mm', '80 mm', '130 mm'], label: T`Thiessen polygons around six rain gauges, each polygon containing the area closest to its gauge, with the rainfall recorded at each` }), T`Thiessen polygons. Each gauge represents the area closer to it than to any other gauge.`)}
${Tip(T`<p>The <b>Thiessen</b> average weights each gauge by the area of its polygon: $\bar P = \frac{\sum P_i A_i}{\sum A_i}$. It is better than a simple arithmetic mean when gauges are unevenly spread. The <b>isohyet</b> method, which draws lines of equal rainfall, is best in mountains.</p>`)}`,
  gens: [
    () => {
      const n2 = pick([3, 4, 5, 6]), rb = pick([3, 4, 5]), n1 = n2 * rb;
      return { q: T`A basin has ${n1} first-order streams and ${n2} second-order streams. What is the bifurcation ratio $R_b$ between orders 1 and 2?`, a: rb, rtol: 0.01, w: [sig(n2 / n1, 3), n1 - n2, n1 + n2],
        s: T`$R_b = \frac{${n1}}{${n2}} = ${rb}$.` };
    },
    () => {
      const A = pick([20, 40, 50, 80, 125]), L = sig(A * pick([0.8, 1.2, 1.5, 2.4, 3]), 3), dd = sig(L / A, 3);
      return { q: T`The streams in a basin of ${Q(A, 'km²')} have a total length of ${Q(L, 'km')}. What is the drainage density?`, a: dd, u: 'km/km²', rtol: 0.01, w: [sig(A / L, 3), sig(L * A, 3), sig(L / Math.sqrt(A), 3)],
        s: T`$D_d = \frac{${M(L)}}{${M(A)}} = ${M(dd)}$ km/km².` };
    },
    () => {
      const P = [[120, 30], [90, 20], [150, 25], [110, 25]], sets = pick([[[120, 30], [90, 20], [150, 25], [110, 25]], [[80, 10], [100, 40], [140, 30], [60, 20]], [[200, 15], [160, 35], [120, 30], [180, 20]]]), tot = sets.reduce((a, s) => a + s[1], 0), avg = sig(sets.reduce((a, s) => a + s[0] * s[1], 0) / tot, 3), ar = sig(sets.reduce((a, s) => a + s[0], 0) / sets.length, 3);
      return { q: T`Four rain gauges recorded ${sets.map(s => F(s[0]) + ' mm').join(', ')}. Their Thiessen polygons cover ${sets.map(s => F(s[1]) + ' km²').join(', ')}. What is the Thiessen average rainfall?`, a: avg, u: 'mm', rtol: 0.01, w: [ar === avg ? sig(avg + 5, 3) : ar, sig(sets.reduce((a, s) => a + s[0] * s[1], 0) / 4, 3), sig(Math.max(...sets.map(s => s[0])), 3)],
        s: T`$\bar P = \frac{${sets.map(s => `${s[0]} \\times ${s[1]}`).join(' + ')}}{${tot}} = ${QT(avg, 'mm')}$ (the simple mean would be ${F(ar)} mm).` };
    },
    () => {
      const A = pick([50, 80, 100]), P = pick([30, 40, 50, 60]), rc = sig(4 * Math.PI * A / (P * P), 3);
      return { q: T`A basin has an area of ${Q(A, 'km²')} and a perimeter of ${Q(P, 'km')}. Calculate its circularity ratio $R_c = \frac{4\pi A}{P^2}$.`, a: rc, rtol: 0.02, w: [sig(A / P, 3), sig(4 * Math.PI * A / P, 3), sig(P * P / (4 * Math.PI * A), 3)],
        s: T`$R_c = \frac{4\pi \times ${M(A)}}{${M(P)}^2} = ${M(rc)}$. ${rc > 0.6 ? T`Fairly round: sharp flood peaks.` : T`Elongated: slower, flatter flood peaks.`}` };
    },
    () => {
      const [a, b, c] = pick([[1, 1, 2], [2, 2, 3], [2, 1, 2], [3, 2, 3], [1, 3, 3], [3, 3, 4]]);
      return { q: T`Using Strahler's rule, a stream of order ${a} meets a stream of order ${b}. What is the order of the stream below the junction?${FigW(strahlerSvg({ label: T`A stream network with Strahler orders` }))}`, a: c, rtol: 0, w: [a + b, Math.max(a, b) + (c === Math.max(a, b) ? 1 : -1), Math.min(a, b)].filter(x => x !== c && x > 0),
        s: a === b ? T`Two streams of the same order ${a} meet, so the order rises to <b>${c}</b>.` : T`Different orders meet, so the higher order, <b>${c}</b>, continues.` };
    },
    () => pick([
      { q: T`Which conditions give a high drainage density?`, a: T`Impermeable rock, steep slopes and little vegetation`, w: [T`Permeable limestone under forest`, T`Flat sandy plains`, T`Deep soils with thick forest`], only: 'mc', s: T`When water cannot soak in, it runs off in many small channels.` },
      { q: T`When is the Thiessen method better than a simple average of rain gauges?`, a: T`When the gauges are unevenly spread over the basin`, w: [T`When there is only one gauge`, T`When it never rains`, T`When all gauges are in one corner and equal`], only: 'mc', s: T`Area weighting stops a cluster of gauges in one part of the basin from dominating the average.` },
      { q: T`What is a typical bifurcation ratio for a natural basin?`, a: T`Between 3 and 5`, w: [T`Exactly 1`, T`Between 10 and 20`, T`Less than 1`], only: 'mc', s: T`Values of 3–5 are normal; much higher values suggest strong geological control, such as long parallel ridges.` },
    ]),
  ],
},
{
  id: 'cartography', stage: 'uni', title: 'Thematic Cartography',
  blurb: 'Designing thematic maps: visual variables, choropleth maps and data classification (equal interval, quantile, natural breaks), proportional symbols, and generalisation.',
  lesson: () => T`
<p>A <b>thematic map</b> shows the pattern of one subject: population density, rainfall, votes, disease. The cartographer must choose how to turn numbers into symbols, and those choices change what readers see.</p>
${Tbl([T`Visual variable (Bertin)`, T`Best for`], [[T`Position`, T`where things are`], [T`Size`, T`quantities (bigger = more)`], [T`Value (lightness)`, T`ordered data such as rates (darker = more)`], [T`Hue (colour)`, T`categories such as land-use types`], [T`Shape`, T`categories of point features`], [T`Orientation and texture`, T`extra categories, direction`]])}
${FigW(choroplethSvg([120, 340, 560, 80, 900, 450, 230, 610, 150, 380, 700], { breaks: [200, 400, 600, 1000], label: T`A choropleth map of eleven districts shaded in four classes of population density, darker for higher density, with a legend` }), T`A choropleth map of population density (people per km²) in four classes.`)}
${Key(T`<p><b>Choropleth maps</b> must show <b>rates or densities</b>, not raw counts: a large district would look important just because it is large. Data are grouped into classes, often 4–7. The number of classes can be estimated with <b>Sturges' rule</b>, $k = 1 + 3.322 \log_{10} n$.</p><p><b>Equal interval</b>: each class has the same width, $w = \frac{\max - \min}{k}$. <b>Quantile</b>: each class holds the same number of areas. <b>Natural breaks</b> (Jenks): class limits placed at gaps in the data.</p>`)}
${Tip(T`<p><b>Proportional symbols</b> show counts: the <i>area</i> of each circle is proportional to the value, so the radius grows with the square root, $r \propto \sqrt{v}$. A value four times larger needs a circle only twice as wide. <b>Generalisation</b> (selecting, simplifying, smoothing and exaggerating features) keeps a small-scale map readable.</p>`)}`,
  gens: [
    () => {
      const mn = pick([0, 10, 20, 50]), k = pick([4, 5]), w = pick([20, 50, 100, 200]), mx = mn + k * w;
      return { q: T`Data range from ${F(mn)} to ${F(mx)}. Using ${k} equal-interval classes, what is the width of each class?`, a: w, rtol: 0, w: [sig(mx / k, 3), sig((mx - mn) / (k + 1), 3), (mx - mn) * k].filter(x => x !== w),
        s: T`$w = \frac{${M(mx)} - ${M(mn)}}{${k}} = ${M(w)}$.` };
    },
    () => {
      const n = pick([30, 50, 100, 200, 500]), k = sig(1 + 3.322 * Math.log10(n), 3);
      return { q: T`A map will show ${n} districts. Using Sturges' rule $k = 1 + 3.322 \log_{10} n$, about how many classes should it use?`, a: k, rtol: 0.03, w: [sig(Math.sqrt(n), 3), sig(Math.log10(n), 3), sig(3.322 * Math.log10(n), 3)],
        s: T`$k = 1 + 3.322 \times \log_{10} ${n} = 1 + 3.322 \times ${M(sig(Math.log10(n), 3))} = ${M(k)}$, so about ${F(Math.round(k))} classes.` };
    },
    () => {
      const f = pick([4, 9, 16, 25]), r = Math.sqrt(f);
      return { q: T`On a proportional-symbol map, city A's circle has radius 5 mm. City B has ${f} times as many people. What radius should its circle have, in mm?`, a: 5 * r, u: 'mm', rtol: 0.01, w: [5 * f, 5 * f / 2, sig(5 * Math.cbrt(f), 3)],
        s: T`Area is proportional to the value, so radius is proportional to its square root: $5 \times \sqrt{${f}} = ${M(5 * r)}$ mm.` };
    },
    () => {
      const v = pick([130, 250, 390, 480, 720, 950]), br = [200, 400, 600, 1000], c = br.findIndex(b => v <= b) + 1;
      return { q: T`Using the legend of this choropleth map, in which class (1 = lightest, 4 = darkest) is a district with a density of ${F(v)}?${FigW(choroplethSvg([120, 340, 560, 80, 900, 450, 230, 610, 150, 380, 700], { breaks: br, label: T`A choropleth map with four classes` }))}`, a: c, rtol: 0, w: [1, 2, 3, 4].filter(x => x !== c), only: 'mc', s: T`${F(v)} lies in class <b>${c}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Showing different land-use types`, T`Hue (colour)`], [T`Showing population density from low to high`, T`Value (lightness)`], [T`Showing the number of tourists at each city`, T`Size`], [T`Showing schools, hospitals and mosques as different point symbols`, T`Shape`]]);
      return { q: T`Which visual variable suits this best? <i>${d}</i>`, a, w: [T`Hue (colour)`, T`Value (lightness)`, T`Size`, T`Shape`].filter(x => x !== a), only: 'mc', s: T`<b>${a}</b>.` };
    },
    () => pick([
      { q: T`Why should a choropleth map show densities or rates rather than raw counts?`, a: T`Otherwise large areas look important just because they are large`, w: [T`Counts cannot be coloured`, T`Rates are always larger numbers`, T`Choropleth maps must use only percentages of 100`], only: 'mc', s: T`Standardising by area or population lets areas of different sizes be compared fairly.` },
      { q: T`Which classification puts the same number of areas in each class?`, a: T`Quantile`, w: [T`Equal interval`, T`Natural breaks`, T`Standard deviation`], only: 'mc', s: T`Quantile classes each hold the same count of areas, whatever their width.` },
      { q: T`What is cartographic generalisation?`, a: T`Simplifying and selecting features so a small-scale map stays readable`, w: [T`Adding every detail to a map`, T`Changing the map projection`, T`Printing a map in colour`], only: 'mc', s: T`As scale gets smaller, rivers are smoothed, small towns dropped and roads widened to stay visible.` },
    ]),
  ],
},
{
  id: 'research-methods', stage: 'uni', title: 'Geographic Research Methods',
  blurb: 'How geographers do research: approaches, primary and secondary data, sampling designs and sample size, fieldwork methods, and summarising data.',
  lesson: () => T`
<p>Geographic research follows a cycle: choose a <b>problem</b>, review what is known, form <b>questions or hypotheses</b>, collect and analyse <b>data</b>, and draw <b>conclusions</b>. <b>Quantitative</b> research measures and tests with numbers; <b>qualitative</b> research seeks meanings and experiences through interviews and observation. Many studies use both (<b>mixed methods</b>).</p>
${Tbl([T`Data`, T`Source`, T`Examples`], [[T`Primary`, T`collected by the researcher`, T`questionnaires, interviews, field measurements, observation, drone photos`], [T`Secondary`, T`collected by others`, T`census and BPS statistics, maps, satellite images, reports`]])}
<h3>Sampling</h3>
${FigW(`<div class="g-row">${[['random', T`Simple random`], ['systematic', T`Systematic: every k-th`], ['stratified', T`Stratified: from each group`]].map(([k, t]) => `<div>${samplingSvg(k, { label: t })}<div class="g-cap">${t}</div></div>`).join('')}</div>`, T`Three sampling designs among the households of a village (chosen households are larger).`)}
${Key(T`<p>A <b>sample</b> is a part of the <b>population</b> studied. <b>Slovin's formula</b> estimates the sample size for a population $N$ and margin of error $e$:</p><p>$$n = \frac{N}{1 + N e^2}$$</p><p>In <b>systematic</b> sampling the interval is $k = \frac{N}{n}$. In <b>proportional stratified</b> sampling each group gets a share of the sample equal to its share of the population: $n_i = \frac{N_i}{N} \times n$.</p>`)}
${Tip(T`<p>Other designs: <b>cluster</b> sampling (choose whole villages at random), <b>purposive</b> sampling (choose people with the knowledge needed) and <b>snowball</b> sampling (respondents recommend others). Using several methods and sources to check one another is <b>triangulation</b>.</p>`)}`,
  gens: [
    () => {
      const N = pick([200, 500, 1000, 2000, 5000]), e = pick([0.05, 0.1]), n = sig(N / (1 + N * e * e), 3);
      return { q: T`A village has ${F(N)} households. Using Slovin's formula with a margin of error of ${NUM(e * 100)}%, how many households should be sampled?`, a: n, rtol: 0.02, w: [sig(N * e, 3), sig(N / (1 + e), 3), sig(N / (N * e * e), 3)],
        s: T`$n = \frac{${M(N)}}{1 + ${M(N)} \times ${M(e)}^2} = \frac{${M(N)}}{${M(sig(1 + N * e * e, 4))}} = ${M(n)}$, so about ${F(Math.ceil(n))} households.` };
    },
    () => {
      const n = pick([20, 25, 40, 50]), k = pick([5, 8, 10, 20]), N = n * k;
      return { q: T`A researcher wants a systematic sample of ${n} from a list of ${F(N)} farmers. What is the sampling interval $k$?`, a: k, rtol: 0, w: [N - n, sig(n / N, 3), n],
        s: T`$k = \frac{${M(N)}}{${n}} = ${k}$: choose every ${k}th farmer after a random start.` };
    },
    () => {
      const N1 = pick([300, 600, 800]), N2 = pick([200, 400]), n = pick([50, 100]), n1 = sig(N1 / (N1 + N2) * n, 3);
      return { q: T`A district has ${F(N1)} farmers and ${F(N2)} fishers. For a proportional stratified sample of ${n}, how many farmers should be chosen?`, a: n1, rtol: 0.02, w: [n / 2, sig(N2 / (N1 + N2) * n, 3), sig(N1 / N2 * n / 10, 3)],
        s: T`$n_1 = \frac{${M(N1)}}{${M(N1 + N2)}} \times ${n} = ${M(n1)}$.` };
    },
    () => {
      const k = pick(['random', 'systematic', 'stratified']), a = { random: T`Simple random sampling`, systematic: T`Systematic sampling`, stratified: T`Stratified sampling` }[k];
      return { q: T`Which sampling design is shown? (Chosen households are larger.)${Fig(samplingSvg(k, { label: T`Households in a village with some chosen for a sample` }))}`, a, w: [T`Simple random sampling`, T`Systematic sampling`, T`Stratified sampling`, T`Snowball sampling`].filter(x => x !== a), only: 'mc', s: T`This is <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Measuring river speed with a float during fieldwork`, T`Primary data`], [T`Population figures from the BPS census`, T`Secondary data`], [T`Interviewing fishermen about changing catches`, T`Primary data`], [T`Landsat satellite images downloaded from the internet`, T`Secondary data`], [T`A questionnaire given to tourists at a beach`, T`Primary data`], [T`Rainfall records from BMKG`, T`Secondary data`]]);
      return { q: T`Is this primary or secondary data? <i>${d}</i>`, a, w: [a === T`Primary data` ? T`Secondary data` : T`Primary data`, T`Neither`], only: 'mc', s: a === T`Primary data` ? T`The researcher collects it directly: <b>primary data</b>.` : T`It was collected by someone else: <b>secondary data</b>.` };
    },
    () => pick([
      { q: T`What is triangulation in research?`, a: T`Checking results with several methods or sources`, w: [T`Measuring angles with a theodolite`, T`Sampling exactly three people`, T`Drawing a triangle on a map`], only: 'mc', s: T`Agreement between interviews, observations and statistics makes conclusions more reliable.` },
      { q: T`Which sampling method asks respondents to recommend other people to interview?`, a: T`Snowball sampling`, w: [T`Systematic sampling`, T`Simple random sampling`, T`Cluster sampling`], only: 'mc', s: T`It is useful for hard-to-reach groups, such as informal miners or recent migrants.` },
      { q: T`What is the main aim of qualitative research?`, a: T`To understand meanings and experiences`, w: [T`To test hypotheses with large numbers`, T`To draw maps at a large scale`, T`To measure rainfall`], only: 'mc', s: T`Qualitative research uses interviews, observation and texts to understand how people see and use places.` },
    ]),
  ],
},
  ],
});
