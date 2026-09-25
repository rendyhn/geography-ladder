/* ==========================================================================
   TRACK B — The Lithosphere
   ========================================================================== */
level({
  id: 'lithosphere', mark: 'B', name: 'The Lithosphere', short: 'Lithosphere', band: 'Plates · rocks · landforms', color: 'lv2',
  blurb: 'The solid Earth: its layers, moving plates, rocks, volcanoes and earthquakes, and the landforms and soils that shape the surface.',
  topics: [
{
  id: 'earth-structure', stage: 'sh', title: 'Structure of the Earth',
  blurb: 'The crust, mantle and core, how seismic waves reveal them, the lithosphere and asthenosphere, and the heat inside the Earth.',
  lesson: () => T`
<p>Nobody has drilled deeper than about $12\,\mathrm{km}$, yet we know the inside of the Earth well. Earthquake waves speed up, slow down and bend as they pass through layers of different density, and <b>S waves cannot pass through liquids</b>, which shows that the outer core is molten.</p>
${FigW(earthLayersSvg({ names: [T`Crust`, T`Mantle`, T`Outer core`, T`Inner core`], label: T`A cutaway of the Earth showing the crust, mantle, outer core and inner core with their depths` }), T`The Earth's layers. The radius is about 6 371 km.`)}
${Tbl([T`Layer`, T`Depth`, T`State and make-up`], [[T`Crust`, T`0 to 5–70 km`, T`solid rock; thin oceanic crust (basalt, "SIMA") and thicker continental crust (granite, "SIAL")`], [T`Mantle`, T`to 2 900 km`, T`hot silicate rock; solid, but it flows slowly over millions of years`], [T`Outer core`, T`2 900–5 150 km`, T`liquid iron and nickel; its currents make the Earth's magnetic field`], [T`Inner core`, T`5 150–6 371 km`, T`solid iron and nickel, about 5 000 °C, solid because of the huge pressure`]])}
<p>The boundaries between layers are called <b>discontinuities</b>: the <b>Mohorovičić</b> (Moho) between crust and mantle, the <b>Gutenberg</b> between mantle and core, and the <b>Lehmann</b> between outer and inner core.</p>
${Key(T`<p>For plate tectonics what matters is stiffness, not composition. The <b>lithosphere</b> (the crust plus the rigid top of the mantle, about 100 km thick) is broken into plates that ride on the <b>asthenosphere</b>, a hot, weak layer of the upper mantle that can flow.</p>`)}
<p>Temperature rises with depth. In the crust the <b>geothermal gradient</b> is typically about $25$–$30\,^\circ\mathrm{C}$ per kilometre, which is why deep mines are hot and why geothermal energy can be tapped.</p>
${Tip(T`<p>Do not confuse the lithosphere (rigid, includes the crust) with the crust itself: the crust is only the top part of the lithosphere.</p>`)}`,
  gens: [
    () => {
      const t0 = pick([25, 27, 28, 30]), g = pick([25, 30]), d = pick([1, 1.5, 2, 2.5, 3, 4]), T1 = t0 + g * d;
      return { q: T`The rock temperature at the surface is ${Q(t0, '°C')} and the geothermal gradient is ${Q(g, '°C')} per km. What is the temperature at the bottom of a mine ${Q(d, 'km')} deep?`, a: sig(T1), u: '°C', w: [sig(g * d), sig(t0 + g / d), sig(t0 + g * d * 10)],
        s: T`$T = ${t0} + ${g} \times ${M(d)} = ${QT(sig(T1), '°C')}$.` };
    },
    () => {
      const t0 = pick([26, 28, 30]), T1 = pick([100, 150, 200, 250]), g = pick([25, 30]), d = sig((T1 - t0) / g);
      return { q: T`Water must reach ${Q(T1, '°C')} for a geothermal power plant. With a surface temperature of ${Q(t0, '°C')} and a gradient of ${Q(g, '°C')} per km, how deep must the well go?`, a: d, u: 'km', w: [sig(T1 / g), sig((T1 + t0) / g), sig(d * 10)],
        s: T`$d = \frac{${T1} - ${t0}}{${g}} = ${QT(d, 'km')}$.` };
    },
    () => pick([
      { q: T`How do we know that the outer core is liquid?`, a: T`S waves from earthquakes do not pass through it`, w: [T`Drill cores have reached it`, T`Volcanoes erupt liquid iron`, T`P waves travel faster in it`], only: 'mc', s: T`S waves (shear waves) cannot travel through liquids. They are missing on the far side of the Earth from an earthquake, so the outer core must be liquid.` },
      { q: T`What is the name of the boundary between the crust and the mantle?`, a: T`Mohorovičić discontinuity (Moho)`, w: [T`Gutenberg discontinuity`, T`Lehmann discontinuity`, T`The asthenosphere`], only: 'mc', s: T`The Moho is where seismic waves suddenly speed up at the top of the mantle.` },
      { q: T`What is the lithosphere?`, a: T`The crust together with the rigid uppermost mantle`, w: [T`The crust only`, T`The liquid outer core`, T`The weak layer the plates move on`], only: 'mc', s: T`The lithosphere is the rigid outer shell, about 100 km thick, broken into plates. The weak layer beneath is the asthenosphere.` },
      { q: T`Which layer of the Earth is solid even though it is the hottest?`, a: T`The inner core`, w: [T`The outer core`, T`The asthenosphere`, T`The crust`], only: 'mc', s: T`The inner core is about 5 000 °C, but the enormous pressure keeps the iron solid.` },
      { q: T`Which kind of crust is thinner and made mainly of basalt?`, a: T`Oceanic crust`, w: [T`Continental crust`, T`Both are the same`, T`The mantle crust`], only: 'mc', s: T`Oceanic crust is 5–10 km thick and basaltic (SIMA); continental crust is 30–70 km thick and mainly granitic (SIAL).` },
      { q: T`Which discontinuity separates the mantle from the core, at about 2 900 km?`, a: T`Gutenberg discontinuity`, w: [T`Mohorovičić discontinuity`, T`Lehmann discontinuity`, T`Conrad discontinuity`], only: 'mc', s: T`The Gutenberg discontinuity marks the core–mantle boundary; S waves stop there.` },
    ]),
    () => {
      const [layer, a, b] = pick([[T`the mantle`, 35, 2900], [T`the outer core`, 2900, 5150], [T`the inner core`, 5150, 6371]]), th = b - a, pct = sig(th / 6371 * 100);
      return { q: T`${layer === T`the mantle` ? T`The mantle reaches from about 35 km to 2 900 km deep.` : layer === T`the outer core` ? T`The outer core reaches from about 2 900 km to 5 150 km deep.` : T`The inner core reaches from about 5 150 km to the centre at 6 371 km.`} What percentage of the Earth's radius (6 371 km) is its thickness?`, a: pct, u: '%', rtol: 0.02, w: [sig(b / 6371 * 100), sig(a / 6371 * 100) || sig(pct / 2), sig(th / 12742 * 100)],
        s: T`Thickness $= ${M(b)} - ${M(a)} = ${M(th)}\,\mathrm{km}$, and $\frac{${M(th)}}{6371} \times 100\% = ${M(pct)}\%$.` };
    },
  ],
},
{
  id: 'plate-tectonics', stage: 'sh', title: 'Plate Tectonics',
  blurb: 'Continental drift and sea-floor spreading, the three kinds of plate boundary, and why Indonesia has so many volcanoes and earthquakes.',
  lesson: () => T`
<p>In 1912 <b>Alfred Wegener</b> proposed that the continents had once formed one supercontinent, <b>Pangaea</b>, and had drifted apart. His evidence: the coasts of South America and Africa fit like a jigsaw; the same fossils (such as <i>Mesosaurus</i> and <i>Glossopteris</i>) and rock types are found on continents now oceans apart; and traces of ancient glaciers appear in places that are now tropical. In the 1960s <b>sea-floor spreading</b> explained the mechanism: new crust forms at mid-ocean ridges and old crust sinks back at trenches, driven by convection in the mantle.</p>
${Key(T`<p>The lithosphere is broken into about a dozen large <b>plates</b> moving a few centimetres a year, about as fast as fingernails grow. Almost all earthquakes and volcanoes happen along their boundaries.</p>`)}
${Fig(plateBoundarySvg('divergent', { names: { ridge: T`Mid-ocean ridge`, plate: T`Oceanic plate`, magma: T`Rising magma` }, label: T`A divergent boundary: plates move apart at a mid-ocean ridge where magma rises` }), T`<b>Divergent</b>: plates move apart and new crust forms, e.g. the Mid-Atlantic Ridge and the East African Rift.`)}
${Fig(plateBoundarySvg('subduction', { names: { trench: T`Trench`, volcano: T`Volcanic arc`, ocean: T`Oceanic plate`, cont: T`Continental plate`, sub: T`Subduction zone` }, label: T`A convergent boundary: an oceanic plate sinks beneath a continental plate, forming a trench and a line of volcanoes` }), T`<b>Convergent (subduction)</b>: the denser oceanic plate sinks under the other, forming a deep trench, earthquakes and a chain of volcanoes, e.g. the Java Trench and the volcanoes of Sumatra and Java.`)}
${Fig(plateBoundarySvg('collision', { names: { mountains: T`Fold mountains`, cont: T`Continental plate` }, label: T`Two continental plates collide and crumple into fold mountains` }), T`<b>Convergent (collision)</b>: two continents collide and crumple up into fold mountains, e.g. the Himalayas.`)}
${Fig(plateBoundarySvg('transform', { names: { fault: T`Transform fault`, offset: T`offset river` }, label: T`Seen from above, two plates slide past each other along a transform fault, offsetting a river` }), T`<b>Transform</b>: plates slide past each other, causing earthquakes but no volcanoes, e.g. the San Andreas Fault.`)}
<h3>Indonesia: where three plates meet</h3>
${FigW(platesIndonesiaSvg({ names: { eu: T`Eurasian Plate`, ia: T`Indo-Australian Plate`, pa: T`Pacific Plate`, trench: T`Java Trench` }, label: T`Map of Indonesia with plate boundaries and the chain of volcanoes` }), T`The Indo-Australian Plate moves north under the Eurasian Plate along the Sunda (Java) Trench, and the Pacific Plate pushes in from the east. Triangles mark some of the active volcanoes.`)}
${Tip(T`<p>This position makes Indonesia part of the Pacific <b>Ring of Fire</b>: it has about 127 active volcanoes and frequent earthquakes, but also fertile volcanic soils, geothermal energy and rich mineral deposits.</p>`)}`,
  gens: [
    () => {
      const r = pick([2, 3, 4, 5, 6, 7, 8]), yrs = pick([1e5, 5e5, 1e6, 2e6, 1e7]), km = sig(r * yrs / 1e5);
      return { q: T`A plate moves at ${Q(r, 'cm')} per year. How far does it move in ${NUM(yrs)} years, in kilometres?`, a: km, u: 'km', w: [sig(km * 10), sig(km / 10), sig(r * yrs / 1e3)],
        s: T`$${r} \times ${M(yrs)} = ${M(r * yrs)}\,\mathrm{cm} = ${QT(km, 'km')}$ (divide by 100 000 to change cm into km).` };
    },
    () => {
      const r = pick([2, 2.5, 4, 5]), km = pick([100, 250, 500, 1000, 1500]), my = sig(km * 1e5 / r / 1e6);
      return { q: T`Rock on the sea floor is found ${Q(km, 'km')} from a mid-ocean ridge. The plate moves away from the ridge at ${Q(r, 'cm')} per year. About how old is the rock, in millions of years?`, a: my, u: T`million years`, w: [sig(my * 10), sig(my / 10), sig(my * 2)],
        s: T`$${M(km)}\,\mathrm{km} = ${M(km * 1e5)}\,\mathrm{cm}$; time $= \frac{${M(km * 1e5)}}{${M(r)}} = ${M(km * 1e5 / r)}$ years $= ${M(my)}$ million years.` };
    },
    () => {
      const [ex, a] = pick([[T`the Himalayas`, T`Convergent (collision)`], [T`the Mid-Atlantic Ridge`, T`Divergent`], [T`the San Andreas Fault`, T`Transform`], [T`the Java Trench`, T`Convergent (subduction)`], [T`the East African Rift Valley`, T`Divergent`], [T`the volcanoes of Sumatra`, T`Convergent (subduction)`], [T`the Andes and their volcanoes`, T`Convergent (subduction)`]]);
      return { q: T`What type of plate boundary formed ${ex}?`, a, w: [T`Divergent`, T`Convergent (subduction)`, T`Convergent (collision)`, T`Transform`].filter(x => x !== a), only: 'mc', s: T`${ex} lies on a <b>${a}</b> boundary.` };
    },
    () => {
      const [k, a] = pick([['divergent', T`Divergent`], ['subduction', T`Convergent (subduction)`], ['collision', T`Convergent (collision)`], ['transform', T`Transform`]]);
      return { q: T`Which type of plate boundary is shown?${Fig(plateBoundarySvg(k, { names: { ridge: ' ', plate: ' ', magma: ' ', trench: T`Trench`, volcano: ' ', ocean: ' ', cont: ' ', sub: ' ', mountains: ' ', fault: ' ', offset: ' ' }, label: T`A plate boundary` }))}`, a, w: [T`Divergent`, T`Convergent (subduction)`, T`Convergent (collision)`, T`Transform`].filter(x => x !== a), only: 'mc',
        s: T`Moving apart is divergent; one plate sinking under another is subduction; two continents crumpling up is collision; sliding past is transform. This is <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Which evidence did Wegener use for continental drift?`, a: T`The same fossils on continents now separated by oceans`, w: [T`Satellite measurements of plate speeds`, T`The magnetic stripes on the sea floor`, T`Deep-sea drilling`], only: 'mc', s: T`Wegener used the jigsaw fit, matching fossils and rocks and ancient glacial traces. Magnetic stripes and satellite data came decades later.` },
      { q: T`Which three major plates meet in the Indonesian region?`, a: T`Eurasian, Indo-Australian and Pacific`, w: [T`African, Eurasian and Pacific`, T`Nazca, Pacific and Antarctic`, T`North American, Eurasian and Indo-Australian`], only: 'mc', s: T`Indonesia sits where the Eurasian, Indo-Australian and Pacific plates (with the smaller Philippine Sea Plate) converge.` },
      { q: T`Why is there a long chain of volcanoes along Sumatra, Java and Nusa Tenggara?`, a: T`The Indo-Australian Plate sinks beneath the Eurasian Plate and melts`, w: [T`The plates are moving apart there`, T`A hot spot lies under Java`, T`Two continents are colliding there`], only: 'mc', s: T`At the subduction zone the sinking plate releases water that melts the mantle above it; the magma rises to form a volcanic arc parallel to the trench.` },
      { q: T`What drives the movement of the plates?`, a: T`Convection currents and the pull of sinking plates in the mantle`, w: [T`The Earth's rotation`, T`Tides caused by the Moon`, T`Winds blowing on the continents`], only: 'mc', s: T`Heat from the interior drives slow convection in the mantle; cold, dense plates sinking at trenches also pull the rest of the plate along.` },
      { q: T`At which kind of boundary is new oceanic crust made?`, a: T`Divergent`, w: [T`Convergent (subduction)`, T`Convergent (collision)`, T`Transform`], only: 'mc', s: T`At mid-ocean ridges magma rises between the separating plates and cools into new crust.` },
    ]),
  ],
},
{
  id: 'rocks', stage: 'sh', title: 'Minerals, Rocks & the Rock Cycle',
  blurb: 'Minerals and their hardness, igneous, sedimentary and metamorphic rocks, how each forms, and the rock cycle that links them.',
  lesson: () => T`
<p>A <b>mineral</b> is a naturally occurring solid with a definite chemical composition and crystal structure, such as quartz or feldspar. A <b>rock</b> is a mixture of one or more minerals. Minerals are identified by their colour, streak, lustre, cleavage and <b>hardness</b>, measured on Mohs' scale from 1 (talc) to 10 (diamond): a harder mineral scratches a softer one.</p>
${Tbl([T`Rock type`, T`How it forms`, T`Examples`], [
  [T`Igneous`, T`magma or lava cools and crystallises; slow cooling underground gives large crystals (intrusive), fast cooling at the surface gives small crystals or glass (extrusive)`, T`granite, diorite, gabbro (intrusive); basalt, andesite, obsidian, pumice (extrusive)`],
  [T`Sedimentary`, T`fragments, shells or dissolved minerals are deposited in layers, then compacted and cemented`, T`sandstone, conglomerate, shale, limestone, coal, rock salt`],
  [T`Metamorphic`, T`an existing rock is changed by heat and pressure without melting`, T`marble (from limestone), slate (from shale), quartzite (from sandstone), gneiss (from granite)`]])}
${FigW(cycleSvg([T`Magma`, T`Igneous rock`, T`Sediment`, T`Sedimentary rock`, T`Metamorphic rock`], { center: T`Rock cycle`, label: T`The rock cycle: magma cools into igneous rock, which weathers into sediment, which becomes sedimentary rock, then metamorphic rock, which can melt back into magma` }), T`The rock cycle. Any rock can also be uplifted and weathered, or buried and melted, so there are many shortcuts.`)}
${Key(T`<p><b>Processes in the rock cycle.</b> Cooling and crystallisation turn magma into igneous rock. Weathering, erosion and deposition turn any rock into sediment. Compaction and cementation (lithification) turn sediment into sedimentary rock. Heat and pressure make metamorphic rock. Melting turns rock back into magma.</p>`)}
${Tip(T`<p>Indonesia is rich in andesite and basalt from its volcanoes, limestone from ancient coral reefs (e.g. Gunung Kidul and the Maros karst), and coal in Kalimantan and Sumatra.</p>`)}`,
  gens: [
    () => {
      const [rock, a] = pick([[T`granite`, T`Igneous (intrusive)`], [T`basalt`, T`Igneous (extrusive)`], [T`pumice`, T`Igneous (extrusive)`], [T`obsidian`, T`Igneous (extrusive)`], [T`andesite`, T`Igneous (extrusive)`], [T`gabbro`, T`Igneous (intrusive)`], [T`sandstone`, T`Sedimentary`], [T`limestone`, T`Sedimentary`], [T`shale`, T`Sedimentary`], [T`conglomerate`, T`Sedimentary`], [T`coal`, T`Sedimentary`], [T`marble`, T`Metamorphic`], [T`slate`, T`Metamorphic`], [T`gneiss`, T`Metamorphic`], [T`quartzite`, T`Metamorphic`]]);
      return { q: T`What type of rock is ${rock}?`, a, w: [T`Igneous (intrusive)`, T`Igneous (extrusive)`, T`Sedimentary`, T`Metamorphic`].filter(x => x !== a), only: 'mc', s: T`It is <b>${a}</b>.` };
    },
    () => {
      const [parent, meta] = pick([[T`limestone`, T`marble`], [T`shale`, T`slate`], [T`sandstone`, T`quartzite`], [T`granite`, T`gneiss`]]);
      return { q: T`Which metamorphic rock forms when ${parent} is changed by heat and pressure?`, a: meta, w: [T`marble`, T`slate`, T`quartzite`, T`gneiss`, T`basalt`].filter(x => x !== meta).slice(0, 3), only: 'mc', s: T`Heat and pressure turn ${parent} into <b>${meta}</b>.` };
    },
    () => {
      const minerals = [[T`talc`, 1], [T`gypsum`, 2], [T`calcite`, 3], [T`fluorite`, 4], [T`apatite`, 5], [T`orthoclase feldspar`, 6], [T`quartz`, 7], [T`topaz`, 8], [T`corundum`, 9], [T`diamond`, 10]];
      const i = ri(0, 9); let j = ri(0, 9); if (j === i) j = (i + 3) % 10;
      const [A, ha] = minerals[i], [B, hb] = minerals[j];
      return { q: T`On Mohs' scale ${A} has a hardness of ${ha} and ${B} a hardness of ${hb}. Which statement is true?`, a: ha > hb ? T`${A} scratches ${B}` : T`${B} scratches ${A}`, w: [ha > hb ? T`${B} scratches ${A}` : T`${A} scratches ${B}`, T`Neither can scratch the other`, T`Each scratches the other`], only: 'mc', s: T`A harder mineral scratches a softer one: ${ha > hb ? A : B} (${Math.max(ha, hb)}) is harder than ${ha > hb ? B : A} (${Math.min(ha, hb)}).` };
    },
    () => {
      const [from, to, a] = pick([[T`magma`, T`igneous rock`, T`Cooling and crystallisation`], [T`rock at the surface`, T`sediment`, T`Weathering and erosion`], [T`layers of sediment`, T`sedimentary rock`, T`Compaction and cementation`], [T`any buried rock`, T`metamorphic rock`, T`Heat and pressure`], [T`rock deep in the crust`, T`magma`, T`Melting`]]);
      return { q: T`In the rock cycle, which process turns ${from} into ${to}?`, a, w: [T`Cooling and crystallisation`, T`Weathering and erosion`, T`Compaction and cementation`, T`Heat and pressure`, T`Melting`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`${from} → ${to}: <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Why does granite have large crystals while basalt has tiny ones?`, a: T`Granite cooled slowly deep underground; basalt cooled quickly at the surface`, w: [T`Granite cooled quickly at the surface; basalt slowly underground`, T`Granite is older than basalt`, T`Basalt has been crushed by weathering`], only: 'mc', s: T`Slow cooling gives crystals time to grow. Intrusive rocks cool slowly underground; extrusive lavas cool fast.` },
      { q: T`Why is pumice so light that it can float?`, a: T`It is full of gas bubbles trapped as lava cooled very quickly`, w: [T`It contains no minerals`, T`It is made of wood`, T`It is a sedimentary rock made of shells`], only: 'mc', s: T`Pumice forms when gas-rich lava froths and cools almost instantly, leaving a glassy rock full of holes.` },
      { q: T`Which rock is most likely to contain fossils?`, a: T`Limestone`, w: [T`Granite`, T`Basalt`, T`Obsidian`], only: 'mc', s: T`Fossils are preserved in sedimentary rocks such as limestone and shale; the heat of igneous rocks destroys them.` },
      { q: T`What is a mineral?`, a: T`A natural solid with a definite composition and crystal structure`, w: [T`Any mixture of rocks`, T`Anything dug out of the ground`, T`A rock formed from shells`], only: 'mc', s: T`Minerals such as quartz have a fixed chemical formula and an ordered crystal structure; rocks are made of minerals.` },
    ]),
  ],
},
{
  id: 'volcanism', stage: 'sh', title: 'Volcanism',
  blurb: 'Magma and how it reaches the surface, intrusions, types of volcano and eruption, volcanic hazards and benefits, and Indonesia’s alert levels.',
  lesson: () => T`
<p><b>Volcanism</b> covers every way that magma, molten rock from inside the Earth, moves upwards. Magma that cools underground forms <b>intrusions</b>: huge <b>batholiths</b>, lens-shaped <b>laccoliths</b>, flat <b>sills</b> between layers and vertical <b>dikes</b> cutting across them. Magma that reaches the surface erupts as <b>lava</b>.</p>
${FigW(volcanoSvg('strato', { names: { chamber: T`Magma chamber`, vent: T`Vent`, crater: T`Crater`, layers: T`Layers of lava and ash` }, label: T`Cross-section of a stratovolcano with its magma chamber, vent, crater and alternating layers` }), T`A stratovolcano, like Merapi or Semeru, is built of alternating layers of lava and ash.`)}
${Tbl([T`Type`, T`Shape and eruption`, T`Example`], [[T`Stratovolcano (composite)`, T`steep cone of lava and ash layers; sticky magma, explosive eruptions`, T`Merapi, Semeru, Fuji`], [T`Shield volcano`, T`broad, gentle slopes; runny basalt lava flows far`, T`Mauna Loa (Hawaii)`], [T`Cinder cone`, T`small, steep cone of loose fragments`, T`Anak Krakatau in its early years`], [T`Caldera`, T`a huge basin left when a volcano collapses after emptying its magma chamber`, T`Toba, Tengger (Bromo)`]])}
${Key(T`<p><b>Explosive or effusive?</b> Sticky, gas-rich, silica-rich magma (andesite, rhyolite) traps gas and explodes; runny, silica-poor basalt lets gas escape and flows quietly. The <b>Volcanic Explosivity Index</b> (VEI) runs from 0 to 8, and each step means about ten times more erupted material. Tambora (1815) was VEI 7.</p>`)}
<h3>Hazards and benefits</h3>
<p>Dangers include <b>pyroclastic flows</b> (glowing avalanches of hot gas and ash, "wedhus gembel"), <b>lahars</b> (volcanic mudflows, often after heavy rain), ash fall, lava flows, toxic gases and tsunamis. Benefits include fertile soils, geothermal energy, building sand and stone, minerals and tourism.</p>
${Tip(T`<p>Indonesia's volcano alert levels, from low to high: <b>Normal</b> (level I), <b>Waspada</b> (II, watch), <b>Siaga</b> (III, alert) and <b>Awas</b> (IV, warning: evacuate the danger zone).</p>`)}`,
  gens: [
    () => {
      const a = ri(2, 5), b = a + ri(1, 3), f = 10 ** (b - a);
      return { q: T`Each step on the Volcanic Explosivity Index means about ten times more erupted material. About how many times more material does a VEI ${b} eruption produce than a VEI ${a} eruption?`, a: f, rtol: 0, w: [b - a, 10 * (b - a), 2 ** (b - a)].filter(x => x !== f), s: T`$10^{${b} - ${a}} = 10^{${b - a}} = ${M(f)}$ times.` };
    },
    () => {
      const d = pick([30, 60, 90, 120, 150, 200, 300]), v = pick([5, 10, 15, 20, 30]), h = sig(d / (v * 3.6));
      return { q: T`An ash cloud is blown towards a town ${Q(d, 'km')} away by a wind of ${Q(v, 'm/s')}. About how many hours will the ash take to arrive?`, a: h, u: 'h', w: [sig(d / v), sig(d * 3.6 / v), sig(h * 2)],
        s: T`$${v}\,\mathrm{m/s} = ${M(v * 3.6)}\,\mathrm{km/h}$, so $t = \frac{${d}}{${M(v * 3.6)}} = ${QT(h, 'h')}$.` };
    },
    () => {
      const [k, a] = pick([['strato', T`Stratovolcano`], ['shield', T`Shield volcano`], ['cinder', T`Cinder cone`], ['caldera', T`Caldera`]]);
      return { q: T`Which type of volcano is shown?${Fig(volcanoSvg(k, { names: { chamber: T`Magma chamber`, vent: T`Vent`, crater: ' ', layers: ' ' }, label: T`A volcano in cross-section` }))}`, a, w: [T`Stratovolcano`, T`Shield volcano`, T`Cinder cone`, T`Caldera`].filter(x => x !== a), only: 'mc',
        s: T`A steep layered cone is a stratovolcano; a broad gentle dome a shield volcano; a small steep heap a cinder cone; a wide collapsed basin a caldera. This is a <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`a glowing avalanche of hot gas, ash and rock that rushes down the slope`, T`Pyroclastic flow`], [T`a fast mudflow of volcanic ash and water, often after heavy rain`, T`Lahar`], [T`magma that has reached the surface and flows as molten rock`, T`Lava`], [T`fine volcanic particles that settle over a wide area`, T`Ash fall`], [T`a flat sheet of magma that cooled between rock layers`, T`Sill`], [T`a vertical sheet of magma that cut across rock layers`, T`Dike`], [T`a huge mass of magma that cooled deep underground`, T`Batholith`]]);
      return { q: T`What is the name for ${d}?`, a, w: [T`Pyroclastic flow`, T`Lahar`, T`Lava`, T`Ash fall`, T`Sill`, T`Dike`, T`Batholith`, T`Laccolith`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is a <b>${a}</b>.` };
    },
    () => pick([
      { q: T`What is the highest volcano alert level in Indonesia?`, a: T`Awas (level IV)`, w: [T`Siaga (level III)`, T`Waspada (level II)`, T`Normal (level I)`], only: 'mc', s: T`The levels are Normal (I), Waspada (II), Siaga (III) and Awas (IV). At Awas people are evacuated from the danger zone.` },
      { q: T`Why do stratovolcanoes such as Merapi erupt explosively?`, a: T`Their magma is sticky and traps gas`, w: [T`Their magma is very runny`, T`They are below sea level`, T`They have no magma chamber`], only: 'mc', s: T`Silica-rich magma is viscous: gas cannot escape easily, pressure builds up and is released violently.` },
      { q: T`Which is a benefit of living near a volcano?`, a: T`Fertile soil from weathered volcanic ash`, w: [T`Clean air during eruptions`, T`No earthquakes`, T`Protection from floods`], only: 'mc', s: T`Volcanic ash weathers into fertile soils, which is why the slopes of Javanese volcanoes are densely farmed. Geothermal energy and tourism are other benefits.` },
      { q: T`Lake Toba in North Sumatra lies in what kind of feature?`, a: T`A caldera from a huge eruption`, w: [T`A crater of an active cinder cone`, T`A glacial valley`, T`A rift valley between two plates`], only: 'mc', s: T`Toba erupted about 74 000 years ago; the emptied magma chamber collapsed and the caldera filled with water.` },
    ]),
  ],
},
{
  id: 'earthquakes', stage: 'sh', title: 'Earthquakes',
  blurb: 'Causes of earthquakes, focus and epicentre, P, S and surface waves, locating an epicentre, magnitude and intensity, and tsunamis.',
  lesson: () => T`
<p>An <b>earthquake</b> is a sudden shaking of the ground when stress built up in rocks is released, usually as rock slips along a <b>fault</b>. Most are <b>tectonic</b> (at plate boundaries); others are <b>volcanic</b> or caused by collapse, for example of caves or mines. The point underground where the rupture starts is the <b>focus</b> (hypocentre); the point on the surface directly above it is the <b>epicentre</b>.</p>
${Tbl([T`Wave`, T`Motion`, T`Speed in the crust`, T`Travels through`], [[T`P (primary)`, T`push–pull, like a spring`, T`about 6 km/s, arrives first`, T`solids, liquids and gases`], [T`S (secondary)`, T`side to side (shear)`, T`about 3.5 km/s`, T`solids only`], [T`Surface waves`, T`rolling and swaying at the surface`, T`slowest`, T`the surface; they do the most damage`]])}
${FigW(seismogramSvg(40, { names: { p: T`P`, s: T`S` }, label: T`A seismogram showing the P wave arriving first and the S wave 40 seconds later` }), T`A seismogram. The longer the gap between the P and S arrivals, the further away the earthquake.`)}
${Key(T`<p><b>Distance to the epicentre.</b> Both waves start together but P waves are faster. With $v_P = 6\,\mathrm{km/s}$ and $v_S = 3.5\,\mathrm{km/s}$:</p><p>$$d = \frac{t_S - t_P}{\frac{1}{v_S} - \frac{1}{v_P}} \approx 8.4 \times (t_S - t_P)\ \mathrm{km}$$</p><p>with the time gap in seconds. For distant earthquakes Laska's rule is used: $\Delta = \big((S - P) - 1\big) \times 1000\,\mathrm{km}$, with $S - P$ in minutes. Three stations, each with its own distance circle, pinpoint the epicentre where the circles meet.</p>`)}
${Fig(triangulationSvg({ names: { st: T`Station`, epi: T`Epicentre` }, label: T`Three seismic stations with circles showing their distance to the earthquake; the circles meet at the epicentre` }), T`Locating the epicentre by triangulation.`)}
<h3>Magnitude and intensity</h3>
<p><b>Magnitude</b> (Richter or moment magnitude) measures the energy released and is the same everywhere. Each step up means about 10 times bigger ground motion and about 32 times more energy. <b>Intensity</b> (the Modified Mercalli scale, I–XII) describes the shaking and damage at a particular place, so it is higher near the epicentre.</p>
${Tip(T`<p>A shallow earthquake under the sea at a subduction zone can lift the sea floor and start a <b>tsunami</b>. In deep water it travels at $v = \sqrt{g h}$, as fast as a jet plane, and slows and grows taller as it reaches the coast. The 2004 Aceh tsunami followed a magnitude 9.1 earthquake.</p>`)}`,
  gens: [
    () => {
      const dt = pick([10, 15, 20, 25, 30, 40, 50, 60]), d = sig(dt / (1 / 3.5 - 1 / 6));
      return { q: T`A seismograph records the P wave of an earthquake and, ${dt} seconds later, the S wave. How far away is the epicentre? (Take $v_P = 6\,\mathrm{km/s}$ and $v_S = 3.5\,\mathrm{km/s}$.)${FigW(seismogramSvg(dt, { names: { p: T`P`, s: T`S` }, label: T`A seismogram with the P and S arrivals marked` }))}`, a: d, u: 'km', rtol: 0.02, w: [sig(dt * 6), sig(dt * 3.5), sig(dt * 2.5)],
        s: T`$d = \frac{${dt}}{\frac{1}{3.5} - \frac{1}{6}} = \frac{${dt}}{${M(sig(1 / 3.5 - 1 / 6, 3))}} = ${QT(d, 'km')}$.` };
    },
    () => {
      const mn = pick([2, 3, 3.5, 4, 5, 6.5, 8]), d = (mn - 1) * 1000;
      return { q: T`At a distant station the S wave arrives ${NUM(mn)} minutes after the P wave. Using Laska's rule, how far away is the epicentre?`, a: d, u: 'km', rtol: 0, w: [mn * 1000, (mn + 1) * 1000, sig(mn * 60 * 8.4)], s: T`$\Delta = (${M(mn)} - 1) \times 1000 = ${QT(d, 'km')}$.` };
    },
    () => {
      const a = pick([4, 5, 5.5, 6, 6.5]), b = a + pick([1, 2, 3]), en = chance(), dm = b - a, f = en ? sig(31.6 ** dm, 2) : 10 ** dm;
      return { q: T`Compare an earthquake of magnitude ${NUM(b)} with one of magnitude ${NUM(a)}. About how many times ${en ? T`more energy does the larger one release` : T`larger is its ground motion (the amplitude on the seismogram)`}?`, a: f, rtol: en ? 0.05 : 0, w: en ? [10 ** dm, dm * 32, sig(f * 10, 2)] : [sig(31.6 ** dm, 2), dm * 10, dm], s: en ? T`Each unit of magnitude is about 32 times more energy: $32^{${dm}} \approx ${M(f)}$.` : T`Each unit of magnitude is 10 times the amplitude: $10^{${dm}} = ${M(f)}$.` };
    },
    () => {
      const h = pick([1000, 2000, 3000, 4000, 5000]), g = 9.8, v = Math.sqrt(g * h), d = pick([200, 300, 500, 800, 1000]), t = sig(d * 1000 / v / 60);
      return { q: T`A tsunami crosses an ocean ${Q(h, 'm')} deep. It travels at $v = \sqrt{g h}$ with $g = 9.8\,\mathrm{m/s^2}$. How many minutes does it take to reach a coast ${Q(d, 'km')} away?`, a: t, u: 'min', rtol: 0.02, w: [sig(d * 1000 / (g * h) / 60), sig(t * 60), sig(d / v)],
        s: T`$v = \sqrt{9.8 \times ${M(h)}} = ${M(sig(v))}\,\mathrm{m/s}$, so $t = \frac{${M(d * 1000)}}{${M(sig(v))}} = ${M(sig(d * 1000 / v))}\,\mathrm{s} = ${QT(t, 'min')}$.` };
    },
    () => pick([
      { q: T`Which seismic waves arrive first at a seismograph station?`, a: T`P waves`, w: [T`S waves`, T`Surface waves`, T`They all arrive together`], only: 'mc', s: T`P waves are the fastest (about 6 km/s in the crust), so they arrive first.` },
      { q: T`What is the epicentre of an earthquake?`, a: T`The point on the surface directly above the focus`, w: [T`The point underground where the rock breaks`, T`The place with the most damage`, T`The seismograph station nearest to it`], only: 'mc', s: T`The focus (hypocentre) is underground; the epicentre is the point on the surface straight above it.` },
      { q: T`Which scale describes the damage and shaking felt at a particular place?`, a: T`The Modified Mercalli intensity scale`, w: [T`The Richter magnitude scale`, T`The Volcanic Explosivity Index`, T`Mohs' scale`], only: 'mc', s: T`Intensity (I–XII) describes effects at a place; magnitude measures the energy released at the source.` },
      { q: T`Which waves usually cause the most damage to buildings?`, a: T`Surface waves`, w: [T`P waves`, T`S waves`, T`Radio waves`], only: 'mc', s: T`Surface waves arrive last but have the largest ground motion, shaking and rolling buildings.` },
      { q: T`What is the most common cause of earthquakes in Indonesia?`, a: T`Movement of tectonic plates`, w: [T`Collapse of caves`, T`Meteorite impacts`, T`Changes in the weather`], only: 'mc', s: T`Most Indonesian earthquakes are tectonic, from the subduction of the Indo-Australian Plate and from active faults on land.` },
      { q: T`What should you do first when an earthquake starts while you are indoors?`, a: T`Drop, cover under a sturdy table and hold on`, w: [T`Run outside straight away down the stairs`, T`Stand next to a window`, T`Use the lift to leave the building`], only: 'mc', s: T`Drop, cover and hold on protects you from falling objects. Leave only when the shaking stops, never by lift.` },
    ]),
  ],
},
{
  id: 'weathering', stage: 'sh', title: 'Weathering, Mass Movement & Erosion',
  blurb: 'Physical, chemical and biological weathering, landslides and other mass movements, erosion by water, wind, waves and ice, and soil loss.',
  lesson: () => T`
<p>Forces from inside the Earth (<b>endogenic</b>) build up the land; forces at the surface (<b>exogenic</b>) wear it down. The exogenic processes are weathering, mass movement, erosion and deposition.</p>
${Tbl([T`Weathering`, T`How it works`, T`Examples`], [[T`Physical (mechanical)`, T`rock breaks into pieces without changing its minerals`, T`heating and cooling (exfoliation), frost wedging, salt crystals, release of pressure`], [T`Chemical`, T`minerals react with water, oxygen or acids and change`, T`hydrolysis of feldspar to clay, oxidation (rust), carbonation dissolving limestone`], [T`Biological (organic)`, T`living things break or dissolve rock`, T`roots in cracks, burrowing animals, acids from lichens`]])}
${Key(T`<p>In hot, wet climates such as Indonesia's, <b>chemical weathering</b> dominates: it is fastest where it is warm and there is plenty of water. That is why tropical soils are deep and red, and why limestone dissolves into caves and karst.</p>`)}
<h3>Mass movement</h3>
<p><b>Mass movement</b> is the movement of weathered material down a slope under gravity: <b>rockfalls</b>, <b>landslides</b> (a mass sliding on a slip surface), <b>mudflows</b> and slow <b>soil creep</b> (shown by tilted trees and fences). It is most likely on steep slopes, after heavy rain, where vegetation has been cleared and where earthquakes shake the ground.</p>
<h3>Erosion and deposition</h3>
<p><b>Erosion</b> is the removal and transport of material by running water, wind, waves and glaciers. When the agent slows down it drops its load: <b>deposition</b>. Soil erosion by rain on bare, sloping farmland is a serious problem; it is reduced by terracing, contour ploughing, cover crops and reforestation.</p>
${Tip(T`<p>Soil loss is often given as a mass per area, such as tonnes per hectare per year. To turn it into a depth, divide by the soil's density and the area: $\text{depth} = \frac{\text{mass}}{\rho \times A}$.</p>`)}`,
  gens: [
    () => {
      const m = pick([10, 15, 20, 30, 40, 60]), rho = pick([1.2, 1.3, 1.4, 1.5]), mm = sig(m / (rho * 10000) * 1000);
      return { q: T`Bare farmland loses ${Q(m, 't')} of soil per hectare each year. The soil has a density of ${Q(rho, 't/m^3')}. How many millimetres of soil are lost per year? ($1\,\mathrm{ha} = 10\,000\,\mathrm{m^2}$.)`, a: mm, u: 'mm', w: [sig(mm * 10), sig(mm / 10), sig(m / rho)],
        s: T`Volume $= \frac{${m}}{${M(rho)}} = ${M(sig(m / rho))}\,\mathrm{m^3}$ spread over $10\,000\,\mathrm{m^2}$: depth $= ${M(sig(m / rho / 10000, 3))}\,\mathrm{m} = ${QT(mm, 'mm')}$.` };
    },
    () => {
      const depth = pick([20, 30, 40, 50]), rate = pick([0.5, 1, 2, 4]), yrs = sig(depth * 10 / rate);
      return { q: T`A field has ${Q(depth, 'cm')} of fertile topsoil and is losing ${Q(rate, 'mm')} per year to erosion. About how many years until the topsoil is gone?`, a: yrs, u: T`years`, w: [sig(depth / rate), sig(yrs * 10), sig(depth * rate)],
        s: T`$${depth}\,\mathrm{cm} = ${depth * 10}\,\mathrm{mm}$, and $\frac{${depth * 10}}{${M(rate)}} = ${M(yrs)}$ years.` };
    },
    () => {
      const [d, a] = pick([[T`Rock in a desert cracks as it heats by day and cools at night.`, T`Physical weathering`], [T`Water freezes in a crack, expands and splits the rock.`, T`Physical weathering`], [T`Rainwater with dissolved carbon dioxide slowly dissolves limestone.`, T`Chemical weathering`], [T`Iron minerals in a rock turn reddish-brown as they react with oxygen.`, T`Chemical weathering`], [T`Feldspar in granite turns into clay in the warm, wet climate.`, T`Chemical weathering`], [T`Tree roots grow into cracks and push the rock apart.`, T`Biological weathering`], [T`Lichens on a rock produce acids that eat into its surface.`, T`Biological weathering`]]);
      return { q: T`Which kind of weathering is this? <i>${d}</i>`, a, w: [T`Physical weathering`, T`Chemical weathering`, T`Biological weathering`, T`Deposition`].filter(x => x !== a), only: 'mc', s: T`This is <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Trees, fences and poles on a slope lean downhill after many years.`, T`Soil creep`], [T`After days of heavy rain a large block of a hillside slides down along a curved surface.`, T`Landslide`], [T`Boulders break off a cliff and drop onto the road below.`, T`Rockfall`], [T`A wet mixture of soil and water flows quickly down a valley.`, T`Mudflow`]]);
      return { q: T`Which type of mass movement is described? <i>${d}</i>`, a, w: [T`Soil creep`, T`Landslide`, T`Rockfall`, T`Mudflow`].filter(x => x !== a), only: 'mc', s: T`This is <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Why is chemical weathering especially fast in Indonesia?`, a: T`The climate is hot and wet`, w: [T`The climate is cold and dry`, T`There are many volcanoes`, T`The days and nights are very different in temperature`], only: 'mc', s: T`Chemical reactions speed up with heat and need water; a humid tropical climate provides both all year.` },
      { q: T`Which of these helps to prevent landslides on a hillside?`, a: T`Planting trees and building terraces`, w: [T`Clearing the vegetation`, T`Building heavy houses at the top of the slope`, T`Cutting the foot of the slope for a road`], only: 'mc', s: T`Roots bind the soil and terraces reduce the slope; clearing vegetation and cutting the base of a slope make landslides more likely.` },
      { q: T`What is the difference between weathering and erosion?`, a: T`Weathering breaks rock where it is; erosion removes and carries it away`, w: [T`Weathering carries rock away; erosion breaks it in place`, T`They mean the same thing`, T`Weathering happens only underground`], only: 'mc', s: T`Weathering is the breakdown of rock in place; erosion moves the pieces with water, wind, waves or ice.` },
      { q: T`Which of these is an endogenic process?`, a: T`Folding of rock layers by plate movement`, w: [T`Erosion by a river`, T`Weathering by frost`, T`Deposition of a sand dune`], only: 'mc', s: T`Endogenic forces come from inside the Earth: tectonics (folding, faulting) and volcanism. The others are exogenic.` },
    ]),
  ],
},
{
  id: 'landforms', stage: 'sh', title: 'Landforms',
  blurb: 'Landforms made by folding and faulting, rivers, the sea, dissolving limestone, wind and ice, and how to recognise them.',
  lesson: () => T`
<h3>Tectonic landforms</h3>
<p>Compression bends rock layers into <b>folds</b>: upfolds are <b>anticlines</b> and downfolds are <b>synclines</b>. Where rock breaks and moves along a fault, <b>faulting</b> creates raised blocks (<b>horsts</b>) and sunken blocks (<b>graben</b>).</p>
${Fig(structureSvg('folds', { names: { anticline: T`Anticline`, syncline: T`Syncline` }, label: T`Rock layers bent into an anticline and a syncline by compression` }), T`Folding under compression.`)}
${Fig(structureSvg('horst', { names: { horst: T`Horst`, graben: T`Graben` }, label: T`Blocks of rock along faults: two raised horsts with a sunken graben between them` }), T`A graben between two horsts. Rift valleys are large graben.`)}
<h3>River landforms</h3>
${FigW(riverProfileSvg({ names: { upper: T`Upper course`, upperNote: T`steep, V-valley, waterfalls`, middle: T`Middle course`, middleNote: T`meanders, floodplain`, lower: T`Lower course`, lowerNote: T`gentle, delta, estuary`, source: T`Source`, mouth: T`Mouth` }, label: T`The long profile of a river from its steep source to its gentle mouth` }), T`A river's long profile. It erodes downwards near its source and deposits near its mouth.`)}
<p>In the upper course the river cuts a <b>V-shaped valley</b>, with rapids and <b>waterfalls</b>. Further down it swings in <b>meanders</b>; a meander that is cut off becomes an <b>oxbow lake</b>. Floods build <b>levees</b> and a flat <b>floodplain</b>, and at the mouth sediment builds a <b>delta</b> (such as the Mahakam delta).</p>
${Tbl([T`Agent`, T`Landforms`], [[T`Sea (marine)`, T`cliffs, wave-cut platforms, caves, arches, stacks; beaches, spits, tombolos, barrier islands`], [T`Dissolving limestone (karst)`, T`dolines (sinkholes), uvalas, poljes, caves with stalactites and stalagmites, underground rivers, e.g. Gunung Sewu`], [T`Wind (aeolian)`, T`sand dunes (e.g. Parangtritis), barchans, deflation hollows`], [T`Ice (glacial)`, T`U-shaped valleys, cirques, moraines; small glaciers survive on Puncak Jaya, Papua`]])}
${Tip(T`<p>A river's gradient is its drop in height divided by its length, often in metres per kilometre. Steep upper courses may drop tens of metres per kilometre; lower courses less than one.</p>`)}`,
  gens: [
    () => {
      const drop = pick([200, 400, 600, 900, 1200, 1500]), L = pick([10, 20, 30, 50, 80, 120]), g = sig(drop / L);
      return { q: T`A river falls ${Q(drop, 'm')} between its source and a town ${Q(L, 'km')} downstream. What is its average gradient, in metres per kilometre?`, a: g, u: 'm/km', w: [sig(drop / L / 1000), sig(L / drop), sig(drop * L)],
        s: T`$\frac{${drop}\,\mathrm{m}}{${L}\,\mathrm{km}} = ${M(g)}\,\mathrm{m/km}$.` };
    },
    () => {
      const [k, a] = pick([['folds', T`Folding (anticlines and synclines)`], ['normal', T`A normal fault`], ['reverse', T`A reverse fault`], ['horst', T`A horst and graben`]]);
      return { q: T`Which structure is shown?${Fig(structureSvg(k, { names: { anticline: ' ', syncline: ' ', normal: ' ', reverse: ' ', horst: ' ', graben: ' ' }, label: T`A geological structure in cross-section` }))}`, a, w: [T`Folding (anticlines and synclines)`, T`A normal fault`, T`A reverse fault`, T`A horst and graben`].filter(x => x !== a), only: 'mc',
        s: T`Bent layers are folds; in a normal fault the block above the fault slides down (tension); in a reverse fault it is pushed up (compression); a block sunk between two faults is a graben between horsts. This is <b>${a}</b>.` };
    },
    () => {
      const [f, a] = pick([[T`an oxbow lake`, T`A river`], [T`a delta`, T`A river`], [T`a waterfall`, T`A river`], [T`a sea stack`, T`The sea`], [T`a spit`, T`The sea`], [T`a wave-cut platform`, T`The sea`], [T`a doline (sinkhole)`, T`Dissolving limestone`], [T`stalactites`, T`Dissolving limestone`], [T`a sand dune`, T`The wind`], [T`a barchan`, T`The wind`], [T`a U-shaped valley`, T`A glacier`], [T`a cirque`, T`A glacier`]]);
      return { q: T`Which agent forms ${f}?`, a, w: [T`A river`, T`The sea`, T`Dissolving limestone`, T`The wind`, T`A glacier`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`${a} forms it.` };
    },
    () => {
      const [f, a] = pick([[T`V-shaped valleys and waterfalls`, T`Upper course`], [T`wide meanders and a floodplain`, T`Middle course`], [T`a delta and a very gentle slope`, T`Lower course`], [T`rapids and erosion mainly downwards`, T`Upper course`], [T`oxbow lakes and levees`, T`Middle course`]]);
      return { q: T`In which part of a river are ${f} typical?`, a, w: [T`Upper course`, T`Middle course`, T`Lower course`, T`In all parts equally`].filter(x => x !== a), only: 'mc', s: T`That is the <b>${a}</b>.` };
    },
    () => pick([
      { q: T`How does an oxbow lake form?`, a: T`A meander loop is cut off from the river`, w: [T`A glacier melts in a hollow`, T`A volcano's crater fills with water`, T`The sea floods a river mouth`], only: 'mc', s: T`Erosion on the outside of bends narrows the neck of a meander until a flood cuts through it; the abandoned loop becomes a lake.` },
      { q: T`What forms caves, sinkholes and underground rivers in limestone areas?`, a: T`Rainwater dissolving the limestone`, w: [T`Wind erosion`, T`Lava flows`, T`Glaciers`], only: 'mc', s: T`Rainwater is a weak carbonic acid; it dissolves limestone (carbonation), producing karst landforms such as those of Gunung Sewu.` },
      { q: T`What type of force creates folds?`, a: T`Compression`, w: [T`Tension`, T`Erosion`, T`Deposition`], only: 'mc', s: T`Pushing rock layers together bends them into anticlines and synclines.` },
      { q: T`Where are delta landforms built?`, a: T`Where a river enters a calm sea or lake and drops its sediment`, w: [T`At the source of a river`, T`On steep mountain slopes`, T`Where two plates move apart`], only: 'mc', s: T`The river slows as it enters standing water and deposits its load faster than waves and currents can remove it.` },
    ]),
  ],
},
{
  id: 'soils', stage: 'sh', title: 'Soils',
  blurb: 'How soil forms, its horizons, texture and the soil texture triangle, and the main soil types of Indonesia and what they are used for.',
  lesson: () => T`
<p><b>Soil</b> is the loose top layer of the land, a mixture of mineral particles, organic matter (humus), water and air, in which plants grow. It forms very slowly, often a centimetre in a hundred years or more, so it is easily lost and hard to replace.</p>
${Key(T`<p>Five factors control soil formation: <b>climate</b>, <b>organisms</b>, <b>relief</b> (slope), <b>parent material</b> and <b>time</b>, often written $S = f(cl, o, r, p, t)$.</p>`)}
${Fig(soilProfileSvg({ names: [['O', T`Organic matter`], ['A', T`Topsoil`], ['E', T`Leached layer`], ['B', T`Subsoil`], ['C', T`Weathered rock`], ['R', T`Bedrock`]], label: T`A soil profile with horizons O, A, E, B, C and R` }), T`A soil profile. Water washes material out of the E horizon and deposits it in the B horizon.`)}
<h3>Texture</h3>
<p>Soil particles are grouped by size: <b>sand</b> (0.05–2 mm, gritty, drains quickly), <b>silt</b> (0.002–0.05 mm, smooth) and <b>clay</b> (below 0.002 mm, sticky, holds water and nutrients). The mix of the three gives the <b>texture</b>, read from the texture triangle. A <b>loam</b>, with a good balance, is best for most crops.</p>
${FigW(textureTriangleSvg(40, 20, { names: { clayAxis: T`clay %`, siltAxis: T`silt %`, sandAxis: T`← sand %` }, label: T`The soil texture triangle with a sample of 40% sand, 40% silt and 20% clay plotted in the loam class` }), T`The texture triangle. The dot is 40% sand, 40% silt and 20% clay: a loam.`)}
${Tbl([T`Soil (Indonesia)`, T`Origin and character`, T`Found in / used for`], [[T`Alluvial`, T`fine sediment deposited by rivers; fertile`, T`river plains and deltas; rice fields`], [T`Andosol`, T`young volcanic ash; dark, loose, rich in minerals`, T`volcanic highlands; vegetables, tea, coffee`], [T`Latosol`, T`deeply weathered, red to brown; moderately fertile`, T`hills of Java, Sumatra, Sulawesi; plantations`], [T`Podzolic (red-yellow)`, T`leached and acidic; poor`, T`much of Kalimantan and Sumatra; rubber, oil palm with fertiliser`], [T`Organosol (peat)`, T`waterlogged plant remains; very acidic, stores much carbon`, T`swamps of Kalimantan, Sumatra and Papua`], [T`Regosol`, T`young sandy volcanic or beach material; drains fast`, T`coasts and young volcanic slopes; coconuts, tobacco`], [T`Grumusol (vertisol)`, T`dark clay that swells when wet and cracks when dry`, T`limestone and marl areas of Java and Nusa Tenggara; teak, sugar cane`]])}
${Tip(T`<p>To read the triangle, follow the clay line across from the left side, the sand line diagonally from the bottom, and find the class where they meet. The three percentages always add up to 100.</p>`)}`,
  gens: [
    () => {
      let sand, clay, cls; do { sand = ri(2, 18) * 5; clay = ri(1, 12) * 5; cls = sand + clay <= 100 ? textureClass(sand, clay) : null; } while (!cls || sand + clay > 95);
      const silt = 100 - sand - clay, names = { 'clay': T`clay`, 'silty clay': T`silty clay`, 'sandy clay': T`sandy clay`, 'clay loam': T`clay loam`, 'silty clay loam': T`silty clay loam`, 'sandy clay loam': T`sandy clay loam`, 'loam': T`loam`, 'silt loam': T`silt loam`, 'silt': T`silt`, 'sandy loam': T`sandy loam`, 'loamy sand': T`loamy sand`, 'sand': T`sand` };
      const others = Object.keys(names).filter(k => k !== cls).sort(() => rng() - 0.5).slice(0, 3).map(k => names[k]);
      return { q: T`A soil sample contains ${sand}% sand, ${silt}% silt and ${clay}% clay. Using the texture triangle, what is its texture class?${FigW(textureTriangleSvg(sand, clay, { names: { ...names, clayAxis: T`clay %`, siltAxis: T`silt %`, sandAxis: T`← sand %` }, label: T`The soil texture triangle with the sample plotted` }))}`, a: names[cls], w: others, only: 'mc',
        s: T`The point for ${sand}% sand and ${clay}% clay falls in the <b>${names[cls]}</b> class.` };
    },
    () => {
      const sand = ri(3, 14) * 5, clay = ri(1, 18 - sand / 5 - 1) * 5, silt = 100 - sand - clay;
      if (silt <= 0) return null;
      return { q: T`A soil is ${sand}% sand and ${clay}% clay. What percentage is silt?`, a: silt, u: '%', rtol: 0, w: [sand + clay, Math.abs(sand - clay) || silt + 10, 100 - sand], s: T`The three add up to 100%: $100 - ${sand} - ${clay} = ${silt}\%$.` };
    },
    () => {
      const [d, a] = pick([[T`dark, loose soil from volcanic ash on the slopes of mountains, used for vegetables and tea`, T`Andosol`], [T`fertile soil deposited by rivers on plains, used for rice fields`, T`Alluvial`], [T`waterlogged soil of decayed plants in swamps, very acidic and rich in carbon`, T`Organosol (peat)`], [T`dark clay that cracks deeply in the dry season, found in limestone areas`, T`Grumusol`], [T`young, sandy soil on beaches and new volcanic slopes that drains quickly`, T`Regosol`], [T`deeply weathered red soil common on the hills of the humid tropics`, T`Latosol`]]);
      return { q: T`Which Indonesian soil type is this? <i>${d}</i>`, a, w: [T`Andosol`, T`Alluvial`, T`Organosol (peat)`, T`Grumusol`, T`Regosol`, T`Latosol`, T`Podzolic`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`This describes <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Which soil horizon is the topsoil, rich in humus and roots?`, a: T`A horizon`, w: [T`B horizon`, T`C horizon`, T`R horizon`], only: 'mc', s: T`Below the thin O layer, the A horizon is the dark topsoil where most roots and humus are.` },
      { q: T`Which soil texture holds the most water and nutrients?`, a: T`Clay`, w: [T`Sand`, T`Gravel`, T`Loamy sand`], only: 'mc', s: T`Clay particles are tiny with a huge surface area, so they hold water and nutrients, though they can become waterlogged.` },
      { q: T`Which of these is <b>not</b> one of the five soil-forming factors?`, a: T`Population density`, w: [T`Climate`, T`Parent material`, T`Time`], only: 'mc', s: T`The factors are climate, organisms, relief, parent material and time.` },
      { q: T`Why is draining and burning peatland in Kalimantan a global concern?`, a: T`Peat stores huge amounts of carbon, released as CO₂ and smoke`, w: [T`Peat is the most fertile soil for rice`, T`Peat contains volcanic ash`, T`Peat stops earthquakes`], only: 'mc', s: T`Peat is partly decayed plant matter built up over thousands of years; drained peat oxidises and burns, releasing CO₂ and causing haze.` },
      { q: T`Which horizon is the unweathered bedrock?`, a: T`R horizon`, w: [T`C horizon`, T`B horizon`, T`E horizon`], only: 'mc', s: T`R is solid rock; C above it is partly weathered rock.` },
    ]),
  ],
},
  ],
});
