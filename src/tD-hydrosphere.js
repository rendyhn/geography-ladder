/* ==========================================================================
   TRACK D — The Hydrosphere
   ========================================================================== */
level({
  id: 'hydrosphere', mark: 'D', name: 'The Hydrosphere', short: 'Hydrosphere', band: 'Water cycle · rivers · oceans', color: 'lv4',
  blurb: 'Water on and under the Earth: the water cycle, rivers and their basins, groundwater, lakes, the oceans and the coasts.',
  topics: [
{
  id: 'water-cycle', stage: 'sh', title: 'The Water Cycle',
  blurb: 'Where the Earth’s water is, the processes of the water cycle, its short, medium and long loops, the water balance and the runoff coefficient.',
  lesson: () => T`
<p>The <b>hydrosphere</b> is all the water on Earth: in the oceans, ice, rivers, lakes, the ground, the air and living things. The same water moves endlessly between them in the <b>water cycle</b> (hydrological cycle), driven by the Sun's energy and by gravity.</p>
${Fig(donutSvg([{ label: T`Oceans (salt water)`, value: 97.5, show: NUM(97.5) + '%', cls: 'g-s1' }, { label: T`Ice and glaciers`, value: 1.7, show: NUM(1.7) + '%', cls: 'g-s6' }, { label: T`Groundwater`, value: 0.76, show: NUM(0.76) + '%', cls: 'g-s4' }, { label: T`Lakes, rivers, air, soil`, value: 0.04, show: NUM(0.04) + '%', cls: 'g-s3' }], { center: T`all water`, label: T`A donut chart of the Earth's water: 97.5 percent in the oceans, 1.7 percent ice, 0.76 percent groundwater and 0.04 percent in lakes, rivers, air and soil` }), T`Only about 2.5% of the Earth's water is fresh, and most of that is frozen or underground.`)}
${FigW(waterCycleSvg({ names: { evap: T`evaporation`, cond: T`condensation`, prec: T`precipitation`, trans: T`transpiration`, runoff: T`runoff (river)`, infil: T`infiltration`, gw: T`groundwater flow`, sea: T`Sea` }, label: T`The water cycle: water evaporates from the sea, condenses into clouds that are blown over the land, falls as rain, and returns to the sea as rivers and groundwater` }), T`The main processes of the water cycle.`)}
${Tbl([T`Process`, T`What happens`], [[T`Evaporation`, T`liquid water turns into vapour, mostly from the sea`], [T`Transpiration`, T`plants give off water vapour through their leaves (with evaporation: evapotranspiration)`], [T`Condensation`, T`vapour cools and becomes the droplets of clouds`], [T`Advection`, T`wind carries clouds from the sea over the land`], [T`Precipitation`, T`water falls as rain, snow or hail`], [T`Infiltration`, T`water soaks into the soil`], [T`Percolation`, T`water moves deeper, down to the groundwater`], [T`Runoff`, T`water flows over the surface into rivers and back to the sea`]])}
<h3>Three loops</h3>
<p>In the <b>short cycle</b> water evaporates from the sea, condenses and falls straight back on the sea. In the <b>medium cycle</b> the clouds are blown over land, it rains, and the water returns by rivers. In the <b>long cycle</b> the vapour travels far inland or high up, falls as snow or ice, and returns only slowly through glaciers, rivers or groundwater.</p>
${Key(T`<p><b>Water balance</b> of a drainage basin over a year: rain that falls must go somewhere,</p><p>$$P = E + R \pm \Delta S$$</p><p>with $P$ precipitation, $E$ evapotranspiration, $R$ runoff and $\Delta S$ the change in storage (soil and groundwater). The <b>runoff coefficient</b> $C = \frac{R}{P}$ says what fraction of the rain runs off: about 0.1–0.3 for forest, 0.7–0.95 for roofs and roads.</p>`)}
${Tip(T`<p>Cutting forests and covering land with concrete raises $C$: less water soaks in to refill the groundwater, and more rushes into rivers at once, causing floods in the rainy season and dry wells in the dry season. Biopori holes, infiltration wells and green spaces help water soak in again.</p>`)}`,
  gens: [
    () => {
      const P = pick([2000, 2400, 2500, 3000]), E = pick([900, 1000, 1200, 1300]), dS = pick([0, 100, 200]), R = P - E - dS;
      return { q: T`A drainage basin receives ${Q(P, 'mm')} of rain in a year. ${Q(E, 'mm')} returns to the air by evapotranspiration and storage in the soil and groundwater rises by ${Q(dS, 'mm')}. How much becomes runoff?`, a: R, u: 'mm', rtol: 0, w: [P - E, P - E + dS, P + E - dS],
        s: T`$R = P - E - \Delta S = ${M(P)} - ${M(E)} - ${M(dS)} = ${QT(R, 'mm')}$.` };
    },
    () => {
      const P = pick([80, 100, 120, 150]), c = pick([0.2, 0.3, 0.5, 0.7, 0.8, 0.9]), R = sig(P * c, 3);
      return { q: T`A storm drops ${Q(P, 'mm')} of rain on an area, and ${Q(R, 'mm')} of it runs off. What is the runoff coefficient $C$?`, a: c, rtol: 0.01, w: [sig(P / R, 3), sig(1 - c, 2), sig(c * 100, 3)],
        s: T`$C = \frac{R}{P} = \frac{${M(R)}}{${M(P)}} = ${M(c)}$. ${c >= 0.6 ? T`That is high: a lot of paved or bare surface.` : T`That is low: most water soaks in, as in a forest.`}` };
    },
    () => {
      const [c, t] = pick([[0.9, T`a paved car park`], [0.2, T`a forest`], [0.75, T`a housing estate`], [0.35, T`farmland`]]), A = pick([2, 5, 10, 20]), P = pick([50, 80, 100]), v = sig(c * P / 1000 * A * 10000, 3);
      return { q: T`${Q(P, 'mm')} of rain falls on ${t} of ${Q(A, 'ha')} with a runoff coefficient of ${NUM(c)}. How many cubic metres of water run off? (1 ha = 10 000 m²)`, a: v, u: 'm³', rtol: 0.01, w: [sig(P / 1000 * A * 10000, 3), sig(c * P * A, 3), sig((1 - c) * P / 1000 * A * 10000, 3)],
        s: T`Rain volume $= ${M(P / 1000)}\,\mathrm{m} \times ${M(A * 10000)}\,\mathrm{m^2} = ${M(sig(P * A * 10, 3))}\,\mathrm{m^3}$; runoff $= ${M(c)} \times ${M(sig(P * A * 10, 3))} = ${QT(v, 'm³')}$.` };
    },
    () => {
      const [d, a] = pick([[T`Water vapour cools high in the air and turns into cloud droplets.`, T`Condensation`], [T`The Sun heats the sea and water turns into vapour.`, T`Evaporation`], [T`Plants release water vapour from their leaves.`, T`Transpiration`], [T`Rainwater soaks into the soil.`, T`Infiltration`], [T`Water flows over the ground into a river.`, T`Runoff`], [T`Wind carries clouds from the sea to the land.`, T`Advection`], [T`Water seeps deeper down to the groundwater.`, T`Percolation`]]);
      return { q: T`Which process of the water cycle is this? <i>${d}</i>`, a, w: [T`Condensation`, T`Evaporation`, T`Transpiration`, T`Infiltration`, T`Runoff`, T`Advection`, T`Percolation`, T`Precipitation`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Sea water evaporates, condenses and rains back onto the sea.`, T`Short cycle`], [T`Clouds from the sea are blown over the land, it rains, and rivers carry the water back.`, T`Medium cycle`], [T`Vapour falls as snow on high mountains and returns slowly through glaciers and rivers.`, T`Long cycle`]]);
      return { q: T`Which loop of the water cycle is described? <i>${d}</i>`, a, w: [T`Short cycle`, T`Medium cycle`, T`Long cycle`].filter(x => x !== a), only: 'mc', s: T`This is the <b>${a}</b>.` };
    },
    () => pick([
      { q: T`About what share of all water on Earth is fresh water?`, a: T`About 2.5%`, w: [T`About 25%`, T`About 50%`, T`About 97.5%`], only: 'mc', s: T`About 97.5% is salt water in the oceans; the remaining 2.5% is fresh, mostly as ice and groundwater.` },
      { q: T`What drives the water cycle?`, a: T`The Sun's energy and gravity`, w: [T`The Earth's magnetic field`, T`The Moon's gravity only`, T`Heat from the Earth's core`], only: 'mc', s: T`Sunlight evaporates water and lifts it into the air; gravity brings it down as rain and makes it flow downhill.` },
      { q: T`What happens to the water cycle when a forest is replaced by a town?`, a: T`Less infiltration and more runoff`, w: [T`More infiltration and less runoff`, T`More transpiration`, T`No change`], only: 'mc', s: T`Roofs and roads stop water soaking in, so more runs off quickly into rivers and less refills the groundwater.` },
      { q: T`Which is a way to help rainwater soak back into the ground in a city?`, a: T`Biopori holes and infiltration wells`, w: [T`Paving gardens with concrete`, T`Straightening rivers`, T`Cutting down street trees`], only: 'mc', s: T`Biopori holes, infiltration wells and green spaces increase infiltration and reduce runoff.` },
    ]),
  ],
},
{
  id: 'rivers', stage: 'sh', title: 'Rivers & Drainage Basins',
  blurb: 'The drainage basin and its parts, drainage patterns, river regimes, discharge and flood hydrographs, and managing rivers in Indonesia.',
  lesson: () => T`
<p>A <b>drainage basin</b> (<i>daerah aliran sungai</i>, DAS) is the area of land drained by a river and its tributaries. Its edge is the <b>watershed</b>, the line of high ground that divides it from the next basin. A DAS is usually split into the <b>upper course</b> (steep, mainly a water-catchment area to be protected), the <b>middle course</b> and the <b>lower course</b> (gentle, where most people live and floods spread).</p>
${FigW(drainageGridSvg([['dendritic', T`Dendritic`], ['trellis', T`Trellis`], ['radial', T`Radial`], ['rectangular', T`Rectangular`], ['annular', T`Annular`], ['centripetal', T`Centripetal`], ['parallel', T`Parallel`]], { label: T`Seven drainage patterns: dendritic, trellis, radial, rectangular, annular, centripetal and parallel` }), T`Drainage patterns reflect the rock and landforms underneath.`)}
${Tbl([T`Pattern`, T`Shape`, T`Where it forms`], [[T`Dendritic`, T`branching like a tree`, T`uniform rock, e.g. plains`], [T`Trellis`, T`parallel main streams with short tributaries at right angles`, T`folded rock (ridges and valleys)`], [T`Radial`, T`flowing outwards in all directions`, T`volcanoes and domes`], [T`Centripetal`, T`flowing inwards to one point`, T`basins and craters`], [T`Rectangular`, T`turning sharply at right angles`, T`rock broken by joints and faults`], [T`Annular`, T`circling around`, T`eroded domes of alternating rock`], [T`Parallel`, T`side by side`, T`long, even slopes`]])}
<h3>Discharge</h3>
${Key(T`<p><b>Discharge</b> is the volume of water passing a point each second:</p><p>$$Q = A \times v$$</p><p>with $A$ the cross-section area of the river (m²) and $v$ the mean speed (m/s), giving $Q$ in m³/s. For small basins the <b>rational method</b> estimates the flood peak: $Q = 0.278\,C\,I\,A$ ($Q$ in m³/s, rain intensity $I$ in mm/h, area $A$ in km²).</p>`)}
${FigW(hydrographSvg({ names: { q: T`discharge`, rain: T`rainfall`, lag: T`lag time`, xl: T`hours after the rain started` }, label: T`A flood hydrograph: a burst of rain, then the river's discharge rises to a peak some hours later and slowly falls` }), T`A flood hydrograph. The <b>lag time</b> is the gap between the peak of rain and the peak of discharge.`)}
<p>A short lag and a high peak mean a flashy, dangerous river: typical of steep, bare or urbanised basins. Forests, gentle slopes and permeable soils give a long lag and a low peak.</p>
${Tip(T`<p>The <b>river regime</b> is how the discharge changes through the year. Rivers in Indonesia follow the rainy and dry seasons. Rivers are classed as <b>permanent</b> (always flowing), <b>periodic</b> (flowing only in the rainy season) or <b>episodic</b> (flowing only after heavy rain). The Kapuas (1 143 km) is Indonesia's longest river.</p>`)}`,
  gens: [
    () => {
      const w = pick([10, 12, 20, 25, 40]), d = pick([1.5, 2, 2.5, 3, 4]), v = pick([0.5, 0.8, 1.2, 1.5, 2]), q = sig(w * d * v, 3);
      return { q: T`A river is ${Q(w, 'm')} wide with a mean depth of ${Q(d, 'm')}, and the water flows at ${Q(v, 'm/s')}. What is its discharge?`, a: q, u: 'm³/s', rtol: 0.01, w: [sig(w * d, 3), sig(w * v, 3), sig(w * d / v, 3)],
        s: T`$A = ${M(w)} \times ${M(d)} = ${M(sig(w * d, 3))}\,\mathrm{m^2}$, so $Q = A v = ${M(sig(w * d, 3))} \times ${M(v)} = ${QT(q, 'm³/s')}$.` };
    },
    () => {
      const q = pick([30, 45, 60, 90, 120]), A = pick([15, 20, 30, 40]), v = sig(q / A, 3);
      return { q: T`A river carries ${Q(q, 'm³/s')} through a cross-section of ${Q(A, 'm²')}. What is the mean flow speed?`, a: v, u: 'm/s', rtol: 0.01, w: [sig(q * A, 3), sig(A / q, 3), q - A],
        s: T`$v = \frac{Q}{A} = \frac{${M(q)}}{${M(A)}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const C = pick([0.3, 0.5, 0.7, 0.8]), I = pick([20, 40, 50, 60, 80]), A = pick([2, 5, 10, 15]), q = sig(0.278 * C * I * A, 3);
      return { q: T`Estimate the peak flood discharge with the rational method $Q = 0.278\,C\,I\,A$: runoff coefficient ${NUM(C)}, rain intensity ${Q(I, 'mm')} per hour, basin area ${Q(A, 'km²')}.`, a: q, u: 'm³/s', rtol: 0.02, w: [sig(C * I * A, 3), sig(0.278 * I * A, 3), sig(0.278 * C * I, 3)],
        s: T`$Q = 0.278 \times ${M(C)} \times ${M(I)} \times ${M(A)} = ${QT(q, 'm³/s')}$.` };
    },
    () => {
      const r = pick([2, 3, 4]), p = r + pick([3, 4, 5, 6, 7]);
      return { q: T`On the hydrograph the rain peaks ${r * 3} hours after it started and the river peaks ${p * 3} hours after. What is the lag time?${FigW(hydrographSvg({ peakRain: r, peakQ: p, names: { q: T`discharge`, rain: T`rainfall`, lag: T`lag time`, xl: T`hours after the rain started` }, label: T`A flood hydrograph` }))}`, a: (p - r) * 3, u: 'h', rtol: 0, w: [p * 3, r * 3, (p + r) * 3],
        s: T`Lag time = ${p * 3} − ${r * 3} = ${Q((p - r) * 3, 'h')}.` };
    },
    () => {
      const [k, a] = pick([['dendritic', T`Dendritic`], ['trellis', T`Trellis`], ['radial', T`Radial`], ['rectangular', T`Rectangular`], ['annular', T`Annular`], ['centripetal', T`Centripetal`], ['parallel', T`Parallel`]]);
      return { q: T`Which drainage pattern is shown?${Fig(drainageSvg(k, { label: T`A drainage pattern seen from above` }))}`, a, w: [T`Dendritic`, T`Trellis`, T`Radial`, T`Rectangular`, T`Annular`, T`Centripetal`, T`Parallel`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`This is a <b>${a}</b> pattern.` };
    },
    () => {
      const [d, a] = pick([[T`Rivers flowing outwards in all directions from the peak of Mount Merapi`, T`Radial`], [T`Streams flowing inwards to a lake in the middle of a basin`, T`Centripetal`], [T`Main rivers in the valleys between long, folded ridges, with short tributaries joining at right angles`, T`Trellis`], [T`A river network branching like a tree on a plain of uniform rock`, T`Dendritic`], [T`Rivers turning sharply at right angles along joints and faults`, T`Rectangular`]]);
      return { q: T`Which drainage pattern is this? <i>${d}</i>`, a, w: [T`Dendritic`, T`Trellis`, T`Radial`, T`Rectangular`, T`Centripetal`, T`Parallel`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is a <b>${a}</b> pattern.` };
    },
    () => pick([
      { q: T`What is a watershed?`, a: T`The high ground dividing one drainage basin from the next`, w: [T`A building that stores water`, T`The mouth of a river`, T`The deepest part of a river`], only: 'mc', s: T`Rain falling on either side of the watershed flows into different rivers.` },
      { q: T`Which part of a drainage basin should be protected as a water-catchment area?`, a: T`The upper course`, w: [T`The lower course`, T`The river mouth`, T`The flood plain`], only: 'mc', s: T`Forests in the steep upper course let water soak in and prevent erosion and floods downstream.` },
      { q: T`A river flows only during the rainy season. What kind of river is it?`, a: T`Periodic`, w: [T`Permanent`, T`Episodic`, T`Tidal`], only: 'mc', s: T`Permanent rivers always flow; periodic ones flow in the rainy season; episodic ones only after heavy rain.` },
      { q: T`Which change makes a river's flood peak higher and sooner?`, a: T`Replacing forest with roads and buildings`, w: [T`Planting trees on the slopes`, T`Building infiltration wells`, T`Restoring wetlands`], only: 'mc', s: T`Hard surfaces cut infiltration, so rain reaches the river faster: a shorter lag time and a higher peak.` },
      { q: T`Which is Indonesia's longest river?`, a: T`Kapuas`, w: [T`Bengawan Solo`, T`Musi`, T`Citarum`], only: 'mc', s: T`The Kapuas in West Kalimantan is about 1 143 km long.` },
    ]),
  ],
},
{
  id: 'groundwater', stage: 'sh', title: 'Groundwater, Lakes & Wetlands',
  blurb: 'Aquifers and the water table, confined and unconfined groundwater, springs and artesian wells, porosity, problems of over-pumping, and lakes and wetlands.',
  lesson: () => T`
<p><b>Groundwater</b> is water that fills the pores and cracks in soil and rock below the surface. Rain soaks in (infiltration) and seeps down (percolation) until it reaches the <b>zone of saturation</b>, where every pore is full. The top of this zone is the <b>water table</b>. A layer that holds and lets through plenty of water is an <b>aquifer</b> (sand, gravel, porous limestone); a layer that hardly lets water through, such as clay, is an <b>aquiclude</b>.</p>
${FigW(aquiferSvg({ names: { wt: T`water table`, well: T`dug well`, spring: T`spring`, art: T`artesian well`, rain: T`rain soaks in`, unconf: T`Unconfined aquifer`, imp: T`Impermeable layer`, conf: T`Confined aquifer` }, label: T`A cross-section of groundwater: an unconfined aquifer with the water table and a dug well, a spring where the water table meets a valley, and a confined aquifer between impermeable layers tapped by an artesian well` }), T`Unconfined and confined groundwater.`)}
${Tbl([T`Type`, T`Description`], [[T`Unconfined (free) groundwater`, T`lies above the first impermeable layer and its top is the water table; tapped by shallow dug wells; rises and falls with the seasons`], [T`Confined groundwater`, T`trapped between two impermeable layers and under pressure; tapped by deep wells`], [T`Artesian water`, T`confined water whose pressure pushes it up the well, sometimes to overflow at the surface`], [T`Spring`, T`a place where groundwater flows out naturally, where the water table meets the surface`]])}
${Key(T`<p><b>Porosity</b> is the share of a rock's volume that is empty space:</p><p>$$\text{porosity} = \frac{\text{volume of pores}}{\text{total volume}} \times 100\%$$</p><p>A saturated aquifer holds (volume × porosity) of water. <b>Permeability</b> is how easily water moves through the rock; clay has high porosity but very low permeability.</p>`)}
<h3>Problems</h3>
<p>Pumping more groundwater than rain can refill lowers the water table and dries up wells. In clay-rich coastal cities it also makes the ground compact and <b>sink</b> (land subsidence): parts of north Jakarta have sunk several metres. Near the coast, sea water can seep into the aquifer (<b>seawater intrusion</b>), making wells salty.</p>
<h3>Lakes and wetlands</h3>
${Tbl([T`Kind of lake`, T`How it forms`, T`Example`], [[T`Tectonic`, T`land sinks along faults`, T`Lake Poso, Lake Singkarak`], [T`Volcanic`, T`water fills a crater or caldera`, T`Kelimutu, Lake Toba (tectono-volcanic)`], [T`Karst`, T`limestone dissolves (a dolina)`, T`lakes in Gunungkidul`], [T`Reservoir`, T`a river is dammed by people`, T`Jatiluhur, Gajah Mungkur`]])}
${Tip(T`<p><b>Wetlands</b> such as swamps, peatlands and mangroves act like sponges: they store floodwater, filter pollution and are rich habitats. Indonesia has the largest tropical peatlands in the world.</p>`)}`,
  gens: [
    () => {
      const V = pick([1000, 2000, 5000, 10000]), p = pick([15, 20, 25, 30, 35]), w = V * p / 100;
      return { q: T`A saturated body of sand has a volume of ${Q(V, 'm³')} and a porosity of ${p}%. How many cubic metres of water can it hold?`, a: w, u: 'm³', rtol: 0.01, w: [V * (100 - p) / 100, sig(V / p, 3), V * p],
        s: T`$${M(V)} \times ${M(p / 100)} = ${QT(w, 'm³')}$.` };
    },
    () => {
      const tot = pick([500, 800, 1000, 1200]), p = pick([10, 20, 25, 30, 40]), pore = tot * p / 100;
      return { q: T`A rock sample has a volume of ${Q(tot, 'cm³')}, of which ${Q(pore, 'cm³')} is empty pore space. What is its porosity?`, a: p, u: '%', rtol: 0.01, w: [sig(tot / pore, 3), 100 - p, sig(pore / (tot - pore) * 100, 3)],
        s: T`$\frac{${M(pore)}}{${M(tot)}} \times 100\% = ${M(p)}\%$.` };
    },
    () => {
      const r = pick([5, 8, 10, 12, 15]), y = pick([5, 10, 15, 20]), t = r * y;
      return { q: T`Because of heavy groundwater pumping, a coastal district sinks about ${Q(r, 'cm')} a year. How many centimetres will it sink in ${y} years if nothing changes?`, a: t, u: 'cm', rtol: 0, w: [r + y, sig(t / 100, 3), t * 10],
        s: T`$${M(r)} \times ${y} = ${QT(t, 'cm')}$, that is ${Q(sig(t / 100, 3), 'm')}.` };
    },
    () => {
      const g = pick([0.5, 1, 2, 3]), dropped = pick([4, 6, 8, 12, 15]), yr = sig(dropped / g, 3);
      return { q: T`The water table under a town is falling ${Q(g, 'm')} a year. The dug wells are ${Q(dropped, 'm')} deeper than the water table today. After how many years will they run dry?`, a: yr, u: 'years', rtol: 0.01, w: [sig(dropped * g, 3), dropped + g, sig(dropped / g / 2, 3)],
        s: T`$\frac{${M(dropped)}}{${M(g)}} = ${M(yr)}$ years.` };
    },
    () => {
      const [d, a] = pick([[T`Water flows out of the ground naturally on a hillside.`, T`Spring`], [T`Water is trapped between two clay layers and rises up a well by its own pressure.`, T`Artesian water`], [T`Groundwater above the first impermeable layer, reached by a shallow dug well.`, T`Unconfined groundwater`], [T`A layer of gravel that stores and passes plenty of water.`, T`Aquifer`], [T`A layer of clay that hardly lets water through.`, T`Aquiclude`], [T`The top of the zone where every pore is filled with water.`, T`Water table`]]);
      return { q: T`What is this called? <i>${d}</i>`, a, w: [T`Spring`, T`Artesian water`, T`Unconfined groundwater`, T`Aquifer`, T`Aquiclude`, T`Water table`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is ${a === T`Water table` ? T`the` : T`an example of`} <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Lake Toba`, T`Tectono-volcanic`], [T`Lake Kelimutu`, T`Volcanic`], [T`Lake Poso`, T`Tectonic`], [T`Jatiluhur`, T`Reservoir`], [T`Lake Singkarak`, T`Tectonic`], [T`Gajah Mungkur`, T`Reservoir`]]);
      return { q: T`What kind of lake is <b>${d}</b>?`, a, w: [T`Tectonic`, T`Volcanic`, T`Tectono-volcanic`, T`Reservoir`, T`Karst`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`${d} is a <b>${a}</b> lake.` };
    },
    () => pick([
      { q: T`Why does heavy groundwater pumping make parts of Jakarta sink?`, a: T`The clay layers compact as water is removed`, w: [T`Earthquakes push the land down`, T`The sea erodes the land from below`, T`Heavy rain washes the soil away`], only: 'mc', s: T`As water is pumped from the pores, the soft clay layers squeeze together and the surface sinks.` },
      { q: T`What is seawater intrusion?`, a: T`Salt water seeping into a coastal aquifer`, w: [T`A tsunami flooding the coast`, T`Rain made salty by the sea`, T`Rivers flowing backwards at high tide`], only: 'mc', s: T`When fresh groundwater is over-pumped near the coast, sea water moves in and wells become salty.` },
      { q: T`Why can clay hold a lot of water but still be a poor aquifer?`, a: T`It is porous but has very low permeability`, w: [T`It has no pores at all`, T`It dissolves in water`, T`It is always above the water table`], only: 'mc', s: T`Clay has many tiny pores, but they are so small that water barely moves through them.` },
      { q: T`Which is a benefit of peat swamps and mangroves?`, a: T`They store floodwater and filter pollution`, w: [T`They produce oil`, T`They stop earthquakes`, T`They make the soil salty`], only: 'mc', s: T`Wetlands soak up water like sponges, clean it, and shelter many species.` },
    ]),
  ],
},
{
  id: 'oceans', stage: 'sh', title: 'The Oceans',
  blurb: 'The shape of the ocean floor, depth zones, salinity, temperature layers, ocean currents, and Indonesia’s shallow shelves and deep seas.',
  lesson: () => T`
<p>Oceans cover about <b>71%</b> of the Earth's surface. The science of the oceans is <b>oceanography</b>. Seas are classified by how they formed: <b>transgression seas</b> formed when rising sea level flooded low land after the ice age (shallow, such as the Java Sea); <b>ingression seas</b> lie in sinking parts of the crust (deep, such as the Banda Sea); and <b>regression seas</b> are shrinking.</p>
${FigW(seaFloorSvg({ names: { shelf: T`continental shelf`, slope: T`slope`, plain: T`abyssal plain`, seamount: T`seamount`, trench: T`trench`, ridge: T`mid-ocean ridge`, land: T`Land` }, label: T`A profile of the ocean floor from the coast: continental shelf, continental slope, abyssal plain, a seamount, a deep trench and a mid-ocean ridge` }), T`The main features of the ocean floor (vertical scale greatly exaggerated).`)}
${Tbl([T`Feature`, T`Description`, T`In and around Indonesia`], [[T`Continental shelf`, T`shallow sea floor next to the continent, down to about 200 m`, T`the Sunda Shelf (Java Sea, Natuna) and the Sahul Shelf (Arafura Sea)`], [T`Continental slope`, T`steep drop from the shelf to the deep sea`, T`off the shelf edges`], [T`Abyssal plain`, T`flat, deep ocean floor at 4 000–6 000 m`, T`the Indian Ocean`], [T`Trench`, T`long, narrow and very deep, where plates subduct`, T`the Java Trench (about 7 400 m)`], [T`Mid-ocean ridge`, T`underwater mountain chain where plates move apart`, T`the Mid-Atlantic Ridge`], [T`Seamount`, T`isolated underwater volcano`, T`many in the Banda and Pacific seas`]])}
<h3>Depth zones</h3>
<p>The sea bed is also divided by depth: the <b>littoral</b> zone (between high and low tide), the <b>neritic</b> zone (to 200 m, sunlit and rich in fish), the <b>bathyal</b> zone (200–2 000 m) and the <b>abyssal</b> zone (below 2 000 m, dark and cold).</p>
${Key(T`<p><b>Salinity</b> is the mass of dissolved salts in a kilogram of sea water, given in parts per thousand (‰). The average is about 35‰:</p><p>$$\text{salinity} = \frac{\text{mass of salt (g)}}{\text{mass of sea water (kg)}}$$</p><p>It is higher where evaporation is strong and rain is scarce (the Red Sea, about 40‰) and lower where rivers and rain add fresh water or ice melts (the Baltic Sea).</p>`)}
<h3>Temperature and currents</h3>
<p>Sea water is warmest at the surface. Below a mixed layer the temperature drops quickly through the <b>thermocline</b>, then stays cold (about 2–4 °C) in the deep. <b>Ocean currents</b> are driven by winds and by differences in temperature and salinity. <b>Warm currents</b> flow from the equator towards the poles, and <b>cold currents</b> flow towards the equator (the Humboldt current off Peru), bringing up nutrients and rich fishing grounds.</p>
${Tip(T`<p>The <b>Indonesian Throughflow</b> (Arus Lintas Indonesia, ARLINDO) carries warm Pacific water through the Makassar Strait and the Banda Sea into the Indian Ocean: an important link in the global ocean circulation. Pressure in the sea rises by about 1 atmosphere for every 10 m of depth.</p>`)}`,
  gens: [
    () => {
      const s = pick([30, 32, 34, 35, 36, 38, 40]), kg = pick([2, 5, 10, 20]), g = s * kg;
      return { q: T`Evaporating ${Q(kg, 'kg')} of sea water leaves ${Q(g, 'g')} of salt. What is its salinity, in parts per thousand (‰)?`, a: s, rtol: 0.01, w: [g, sig(g / kg / 10, 3), sig(g / kg * 10, 3)],
        s: T`$\frac{${M(g)}\,\mathrm{g}}{${M(kg)}\,\mathrm{kg}} = ${M(s)}$ g per kg $= ${M(s)}‰$.` };
    },
    () => {
      const s = pick([33, 35, 37, 40]), m = pick([1, 5, 50, 100, 1000]), g = s * m;
      return { q: T`Sea water has a salinity of ${NUM(s)}‰. How many grams of salt are dissolved in ${Q(m, 'kg')} of it?`, a: g, u: 'g', rtol: 0.01, w: [sig(g / 10, 3), sig(g * 10, 3), s + m],
        s: T`$${M(s)} \times ${M(m)} = ${QT(g, 'g')}$.` };
    },
    () => {
      const d = pick([50, 100, 200, 500, 1000, 4000]), p = sig(1 + d / 10, 4);
      return { q: T`Pressure in the sea rises by about 1 atmosphere for every 10 m of depth, on top of the 1 atmosphere of air at the surface. What is the total pressure at a depth of ${Q(d, 'm')}, in atmospheres?`, a: p, rtol: 0.01, w: [d / 10, sig(d / 100 + 1, 3), d],
        s: T`$1 + \frac{${M(d)}}{10} = ${M(p)}$ atmospheres.` };
    },
    () => {
      const [d, a] = pick([[T`the shallow sea floor next to a continent, down to about 200 m`, T`Continental shelf`], [T`a long, narrow and very deep part of the ocean where one plate sinks beneath another`, T`Trench`], [T`an underwater mountain chain where plates move apart`, T`Mid-ocean ridge`], [T`a flat, deep ocean floor at 4 000–6 000 m`, T`Abyssal plain`], [T`an isolated underwater volcano`, T`Seamount`], [T`the steep drop from the shelf to the deep sea`, T`Continental slope`]]);
      return { q: T`What is ${d} called?`, a, w: [T`Continental shelf`, T`Trench`, T`Mid-ocean ridge`, T`Abyssal plain`, T`Seamount`, T`Continental slope`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is a <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`the zone between high and low tide`, T`Littoral zone`], [T`the sunlit zone from low tide down to 200 m`, T`Neritic zone`], [T`the zone from 200 m to 2 000 m deep`, T`Bathyal zone`], [T`the dark, cold zone below 2 000 m`, T`Abyssal zone`]]);
      return { q: T`Which depth zone of the sea is ${d}?`, a, w: [T`Littoral zone`, T`Neritic zone`, T`Bathyal zone`, T`Abyssal zone`].filter(x => x !== a), only: 'mc', s: T`That is the <b>${a}</b>.` };
    },
    () => pick([
      { q: T`The Java Sea and the Natuna Sea are shallow seas on which shelf?`, a: T`The Sunda Shelf`, w: [T`The Sahul Shelf`, T`The Banda Arc`, T`The Java Trench`], only: 'mc', s: T`The Sunda Shelf links Sumatra, Java and Kalimantan to mainland Asia; the Sahul Shelf links Papua to Australia.` },
      { q: T`What kind of sea is the deep Banda Sea?`, a: T`An ingression sea`, w: [T`A transgression sea`, T`A regression sea`, T`A shelf sea`], only: 'mc', s: T`The Banda Sea lies over sinking crust between plates, so it is a deep ingression sea.` },
      { q: T`Why is the Red Sea saltier than most oceans?`, a: T`Strong evaporation and very little rain or river water`, w: [T`It is fed by many large rivers`, T`It is very deep and cold`, T`Ice melts into it`], only: 'mc', s: T`Hot, dry conditions evaporate a lot of water and little fresh water comes in, so salinity reaches about 40‰.` },
      { q: T`Why are cold currents often good fishing grounds?`, a: T`They bring up nutrients from the deep`, w: [T`Fish prefer cold water to warm water`, T`They have no waves`, T`They are always shallow`], only: 'mc', s: T`Upwelling cold water carries nutrients that feed plankton, the base of a rich food chain.` },
      { q: T`What is the thermocline?`, a: T`A layer where sea temperature drops quickly with depth`, w: [T`The warmest layer at the surface`, T`A layer of salt on the sea floor`, T`A warm ocean current`], only: 'mc', s: T`Below the mixed surface layer, temperature falls sharply through the thermocline to the cold deep water.` },
      { q: T`What does the Indonesian Throughflow (ARLINDO) carry?`, a: T`Warm Pacific water into the Indian Ocean`, w: [T`Cold Antarctic water to the Java Sea`, T`River water to the Pacific`, T`Salt water from the Red Sea`], only: 'mc', s: T`It flows through the Makassar Strait and the Banda Sea, linking the Pacific and Indian Oceans.` },
    ]),
  ],
},
{
  id: 'tides-coasts', stage: 'sh', title: 'Tides, Waves & Coasts',
  blurb: 'Why tides happen, spring and neap tides, waves, landforms of coastal erosion and deposition, and protecting Indonesia’s coasts with mangroves and reefs.',
  lesson: () => T`
<p><b>Tides</b> are the regular rise and fall of the sea, caused mainly by the Moon's gravity and partly by the Sun's. The Moon pulls the ocean into a bulge on the side facing it, and a second bulge forms on the opposite side. As the Earth turns, most coasts pass through two bulges a day: two high tides and two low tides roughly every 24 hours 50 minutes. The difference in height between high and low tide is the <b>tidal range</b>.</p>
${Fig(tidesSvg('spring', { names: { sun: T`Sun`, moon: T`Moon`, title: T`Spring tide: largest tidal range` }, label: T`Spring tide: the Sun, Earth and Moon in a line, making the tidal bulges largest` }), T`<b>Spring tide</b> at new and full moon: the Sun and Moon pull in line, giving the highest high tides and lowest low tides.`)}
${Fig(tidesSvg('neap', { names: { sun: T`Sun`, moon: T`Moon`, title: T`Neap tide: smallest tidal range` }, label: T`Neap tide: the Moon at right angles to the Sun, making the tidal bulges smallest` }), T`<b>Neap tide</b> at first and last quarter: the pulls are at right angles and partly cancel, giving the smallest range.`)}
<p>Indonesian coasts have different tide types: <b>semidiurnal</b> (two high tides a day, as in the Malacca Strait), <b>diurnal</b> (one a day, as in parts of the Java Sea) and <b>mixed</b>.</p>
<h3>Waves</h3>
${Key(T`<p>Waves are made by wind blowing over the water; their size depends on the wind speed, how long it blows and the <b>fetch</b> (the distance of open water). A wave's speed is</p><p>$$v = \frac{\lambda}{T}$$</p><p>with $\lambda$ the wavelength and $T$ the period. <b>Destructive</b> waves are high and frequent, with a strong backwash that erodes; <b>constructive</b> waves are low, with a strong swash that builds beaches. Waves striking the coast at an angle move sand along it: <b>longshore drift</b>.</p>`)}
${Fig(coastSvg('erosion', { names: { cliff: T`cliff`, notch: T`wave-cut notch`, platform: T`wave-cut platform`, arch: T`arch`, stack: T`stack` }, label: T`Landforms of coastal erosion: a cliff with a wave-cut notch and platform, an arch and a stack` }), T`<b>Erosion</b>: waves cut a notch, the cliff collapses and retreats, leaving a platform. A cave through a headland becomes an arch, and when the arch falls, a stack (like Tanah Lot, Bali).`)}
${Fig(coastSvg('deposition', { names: { spit: T`spit`, tombolo: T`tombolo`, island: T`island`, lagoon: T`lagoon behind a barrier`, beach: T`beach`, drift: T`longshore drift` }, label: T`Landforms of coastal deposition in plan view: a beach, a spit, a tombolo joining an island to the mainland and a lagoon behind a barrier` }), T`<b>Deposition</b>: sand builds beaches; longshore drift extends it as a spit; a tombolo joins an island to the land; a barrier can enclose a lagoon.`)}
${Tip(T`<p><b>Protecting coasts.</b> Hard structures (sea walls, breakwaters, groynes) are expensive and can move the erosion elsewhere. <b>Mangroves</b> and <b>coral reefs</b> absorb wave energy, trap sediment and shelter fish; Indonesia has about a fifth of the world's mangroves.</p>`)}`,
  gens: [
    () => {
      const hi = pick([1.8, 2.2, 2.5, 3.1, 4.6, 5.2]), lo = pick([0.2, 0.4, 0.5, 0.8]), r = sig(hi - lo, 3);
      return { q: T`At a harbour the high tide reaches ${Q(hi, 'm')} and the low tide falls to ${Q(lo, 'm')} on the tide gauge. What is the tidal range?`, a: r, u: 'm', rtol: 0.01, w: [sig(hi + lo, 3), sig((hi + lo) / 2, 3), hi],
        s: T`Range = high − low = $${M(hi)} - ${M(lo)} = ${QT(r, 'm')}$.` };
    },
    () => {
      const L = pick([40, 60, 80, 100, 150]), T0 = pick([5, 6, 8, 10, 12]), v = sig(L / T0, 3);
      return { q: T`Ocean waves have a wavelength of ${Q(L, 'm')} and a period of ${Q(T0, 's')}. How fast do they travel?`, a: v, u: 'm/s', rtol: 0.01, w: [L * T0, sig(T0 / L, 3), L + T0],
        s: T`$v = \frac{\lambda}{T} = \frac{${M(L)}}{${M(T0)}} = ${QT(v, 'm/s')}$.` };
    },
    () => {
      const r = pick([0.5, 1, 1.5, 2, 3]), y = pick([10, 20, 25, 40]), d = sig(r * y, 3);
      return { q: T`A soft clay cliff retreats about ${Q(r, 'm')} a year because of wave erosion. How far will it retreat in ${y} years?`, a: d, u: 'm', rtol: 0.01, w: [sig(r + y, 3), sig(d * 10, 3), sig(y / r, 3)],
        s: T`$${M(r)} \times ${y} = ${QT(d, 'm')}$.` };
    },
    () => {
      const spring = chance();
      return { q: T`Look at the positions of the Sun, Earth and Moon. What kind of tide is this?${Fig(tidesSvg(spring ? 'spring' : 'neap', { names: { sun: T`Sun`, moon: T`Moon`, title: ' ' }, label: T`The Sun, Earth and Moon` }))}`, a: spring ? T`Spring tide` : T`Neap tide`, w: spring ? [T`Neap tide`, T`Low tide only`, T`No tide`] : [T`Spring tide`, T`High tide only`, T`No tide`], only: 'mc',
        s: spring ? T`Sun, Earth and Moon are in a line (new or full moon): the pulls add up, giving a <b>spring tide</b> with the largest range.` : T`The Moon is at right angles to the Sun (quarter moon): the pulls partly cancel, giving a <b>neap tide</b> with the smallest range.` };
    },
    () => {
      const [d, a] = pick([[T`a pillar of rock standing in the sea, cut off from the cliff`, T`Stack`], [T`a ridge of sand joining an island to the mainland`, T`Tombolo`], [T`a long tongue of sand growing out from the coast into the sea`, T`Spit`], [T`a hole cut right through a headland`, T`Arch`], [T`a flat rocky area left at the foot of a retreating cliff`, T`Wave-cut platform`], [T`a stretch of calm water cut off from the sea by a sand barrier`, T`Lagoon`]]);
      return { q: T`What coastal landform is ${d}?`, a, w: [T`Stack`, T`Tombolo`, T`Spit`, T`Arch`, T`Wave-cut platform`, T`Lagoon`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is a <b>${a}</b>.` };
    },
    () => pick([
      { q: T`What mainly causes the tides?`, a: T`The Moon's gravity, helped by the Sun's`, w: [T`The wind`, T`Earthquakes under the sea`, T`Differences in salinity`], only: 'mc', s: T`The Moon's pull raises bulges of water; the Sun's pull adds to or subtracts from them.` },
      { q: T`When do spring tides happen?`, a: T`At new moon and full moon`, w: [T`Only in the spring season`, T`At first and last quarter`, T`Once a year`], only: 'mc', s: T`At new and full moon the Sun, Earth and Moon are in a line. "Spring" here means "springing up", not the season.` },
      { q: T`Why are mangroves important for coasts?`, a: T`Their roots absorb wave energy and trap sediment`, w: [T`They make the waves bigger`, T`They increase coastal erosion`, T`They only grow on cliffs`], only: 'mc', s: T`Mangroves slow waves and storm surges, hold the mud together and are nurseries for fish and shrimp.` },
      { q: T`Which waves build up beaches?`, a: T`Low constructive waves with a strong swash`, w: [T`High destructive waves with a strong backwash`, T`Tsunami waves`, T`Waves in deep water only`], only: 'mc', s: T`Constructive waves push sand up the beach and have a weak backwash, so sand accumulates.` },
      { q: T`What is longshore drift?`, a: T`Sand moved along the coast by waves arriving at an angle`, w: [T`A current flowing straight out to sea`, T`The rise and fall of the tide`, T`Sand blown inland by wind`], only: 'mc', s: T`Swash moves sand up the beach at an angle; backwash pulls it straight down, so it zigzags along the coast.` },
      { q: T`The temple of Tanah Lot in Bali stands on which coastal landform?`, a: T`A stack`, w: [T`A spit`, T`A lagoon`, T`A delta`], only: 'mc', s: T`Tanah Lot sits on a rock stack separated from the coast by wave erosion.` },
    ]),
  ],
},
  ],
});
