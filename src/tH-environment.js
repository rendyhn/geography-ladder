/* ==========================================================================
   TRACK H — Hazards & Environment
   ========================================================================== */
level({
  id: 'environment', mark: 'H', name: 'Hazards & Environment', short: 'Hazards & Environment', band: 'Disasters · sustainability', color: 'lv8',
  blurb: 'Living safely and sustainably: natural hazards and disaster management, and protecting the environment for the future.',
  topics: [
{
  id: 'disasters', stage: 'sh', title: 'Natural Hazards & Disaster Management',
  blurb: 'Hazards, vulnerability and disaster risk, the kinds of disasters that strike Indonesia, the disaster management cycle, and how to prepare, respond and recover.',
  lesson: () => T`
<p>A <b>hazard</b> is a natural event that could cause harm, such as an earthquake or heavy rain. It becomes a <b>disaster</b> only when it hits people and they cannot cope: lives are lost, homes destroyed and normal life stops. Indonesia faces many hazards because it lies where three plates meet, has more than 120 active volcanoes, and has a wet tropical climate.</p>
${FigW(platesIndonesiaSvg({ names: { eu: T`Eurasian Plate`, ia: T`Indo-Australian Plate`, pa: T`Pacific Plate`, trench: T`Java Trench` }, label: T`Map of Indonesia with plate boundaries and active volcanoes along the Sunda arc and around Sulawesi and Maluku` }), T`Plate boundaries and active volcanoes: the source of Indonesia's geological hazards.`)}
${Tbl([T`Group`, T`Hazards`], [[T`Geological`, T`earthquakes, tsunamis, volcanic eruptions, landslides`], [T`Hydrometeorological`, T`floods, droughts, tropical cyclones, strong winds, forest and land fires, tidal floods`], [T`Biological`, T`epidemics and pandemics, plant and animal diseases`]])}
${Key(T`<p><b>Disaster risk</b> combines the hazard with how exposed and vulnerable people are, and how well they can cope:</p><p>$$R = \frac{H \times V}{C}$$</p><p>with $H$ hazard, $V$ vulnerability (poor buildings, poverty, a dense population on a floodplain) and $C$ capacity (early warning, training, strong buildings, savings). We cannot stop earthquakes, but we can lower $V$ and raise $C$.</p>`)}
${Fig(cycleSvg([T`Mitigation`, T`Preparedness`, T`Response`, T`Recovery`], { center: T`Disaster`, label: T`The disaster management cycle: mitigation, preparedness, response and recovery` }), T`The disaster management cycle. Most of the work happens before a disaster.`)}
${Tbl([T`Stage`, T`Examples`], [[T`Mitigation`, T`earthquake-resistant buildings, sea walls, mangroves, hazard maps, land-use rules`], [T`Preparedness`, T`early-warning systems, evacuation routes and drills, emergency bags`], [T`Response`, T`search and rescue, evacuation, first aid, shelters, food and water`], [T`Recovery`, T`rebuilding homes and infrastructure (better than before), restoring livelihoods, trauma healing`]])}
${Tip(T`<p>In an earthquake: <b>drop, cover and hold on</b>, away from windows. On a coast, if the ground shakes strongly for a long time or the sea suddenly recedes, go to high ground at once without waiting for a warning. Indonesia's disaster agencies are <b>BNPB</b> (national) and <b>BPBD</b> (regional); <b>BMKG</b> issues earthquake and tsunami warnings.</p>`)}`,
  gens: [
    () => {
      const H = pick([2, 3, 4, 5]), V = pick([2, 3, 4, 5]), C = pick([1, 2, 4, 5]), R = sig(H * V / C, 3);
      return { q: T`Using $R = \frac{H \times V}{C}$, find the disaster risk score of a village with hazard ${H}, vulnerability ${V} and capacity ${C} (each on a 1–5 scale).`, a: R, rtol: 0.01, w: [sig(H * V * C, 3), sig(H + V - C, 3) === R ? sig(R + 1, 3) : sig(H + V - C, 3), sig(H * C / V, 3)],
        s: T`$R = \frac{${H} \times ${V}}{${C}} = ${M(R)}$.` };
    },
    () => {
      const C0 = pick([2, 3]), C1 = C0 * 2, H = pick([4, 5]), V = pick([3, 4]), r0 = sig(H * V / C0, 3), r1 = sig(H * V / C1, 3);
      return { q: T`After training and an early-warning system, a village's capacity score rises from ${C0} to ${C1} (hazard ${H}, vulnerability ${V}). What is its new risk score?`, a: r1, rtol: 0.01, w: [r0, sig(r0 * 2, 3), sig(r0 - 1, 3)],
        s: T`Before: $\frac{${H} \times ${V}}{${C0}} = ${M(r0)}$. After: $\frac{${H} \times ${V}}{${C1}} = ${M(r1)}$: doubling capacity halves the risk.` };
    },
    () => {
      const d = pick([600, 900, 1200, 1500, 2000]), v = pick([1, 1.2, 1.5]), t = sig(d / v / 60, 3);
      return { q: T`After a strong earthquake, residents must walk ${Q(d, 'm')} to a tsunami evacuation hill. Walking at ${Q(v, 'm/s')}, how many minutes do they need?`, a: t, u: 'min', rtol: 0.02, w: [sig(d / v, 3), sig(d * v / 60, 3), sig(d / v / 3600, 3)],
        s: T`$t = \frac{${M(d)}}{${M(v)}} = ${M(sig(d / v, 3))}$ s $= ${QT(t, 'min')}$.` };
    },
    () => {
      const [d, a] = pick([[T`Landslide`, T`Geological`], [T`Tsunami`, T`Geological`], [T`Volcanic eruption`, T`Geological`], [T`Flood`, T`Hydrometeorological`], [T`Drought`, T`Hydrometeorological`], [T`Forest and land fire`, T`Hydrometeorological`], [T`Tropical cyclone`, T`Hydrometeorological`], [T`Dengue epidemic`, T`Biological`]]);
      return { q: T`Which group of hazards does this belong to? <i>${d}</i>`, a, w: [T`Geological`, T`Hydrometeorological`, T`Biological`].filter(x => x !== a), only: 'mc', s: T`${d}: <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Planting mangroves along a coast exposed to tsunamis`, T`Mitigation`], [T`Holding an evacuation drill at school`, T`Preparedness`], [T`Searching collapsed buildings for survivors`, T`Response`], [T`Rebuilding a market with earthquake-resistant design`, T`Recovery`], [T`Installing sirens connected to BMKG's tsunami warning`, T`Preparedness`], [T`Setting up emergency tents and public kitchens`, T`Response`], [T`Banning houses on steep, unstable slopes`, T`Mitigation`]]);
      return { q: T`Which stage of the disaster management cycle is this? <i>${d}</i>${Fig(cycleSvg([T`Mitigation`, T`Preparedness`, T`Response`, T`Recovery`], { center: T`Disaster`, label: T`The disaster management cycle` }))}`, a, w: [T`Mitigation`, T`Preparedness`, T`Response`, T`Recovery`].filter(x => x !== a), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => pick([
      { q: T`What is the difference between a hazard and a disaster?`, a: T`A disaster is a hazard that seriously harms people who cannot cope`, w: [T`There is no difference`, T`A hazard is always bigger than a disaster`, T`Disasters are caused only by people`], only: 'mc', s: T`An earthquake in an empty desert is a hazard; the same earthquake under a crowded city with weak buildings becomes a disaster.` },
      { q: T`You are on a beach and the sea suddenly draws back far from the shore. What should you do?`, a: T`Run to high ground immediately`, w: [T`Go and collect the stranded fish`, T`Wait for an official announcement`, T`Take photos of the sea floor`], only: 'mc', s: T`A receding sea is a natural warning of an approaching tsunami: there may be only minutes.` },
      { q: T`Which agency issues earthquake and tsunami warnings in Indonesia?`, a: T`BMKG`, w: [T`BPS`, T`BKKBN`, T`BI`], only: 'mc', s: T`BMKG (the meteorology, climatology and geophysics agency) runs the earthquake network and the tsunami early-warning system.` },
      { q: T`Why are floods in cities getting worse?`, a: T`Less green space and blocked drains mean more, faster runoff`, w: [T`Cities have fewer people`, T`Rivers are getting wider`, T`It rains only in the dry season`], only: 'mc', s: T`Concrete surfaces, rubbish in drains and building on floodplains all raise flood risk.` },
      { q: T`During an earthquake, what should you do indoors?`, a: T`Drop, cover under a sturdy table and hold on`, w: [T`Run down the stairs at once`, T`Stand next to a window`, T`Use the lift to go outside`], only: 'mc', s: T`Most injuries come from falling objects and glass; take cover until the shaking stops.` },
    ]),
  ],
},
{
  id: 'sustainability', stage: 'sh', title: 'Environment & Sustainable Development',
  blurb: 'Environmental problems, carrying capacity and the ecological footprint, sustainable development and the SDGs, environmental impact assessment, and the 3Rs and circular economy.',
  lesson: () => T`
<p>People depend on the environment for air, water, food, materials and energy, but also damage it through <b>pollution</b> (air, water, soil), <b>deforestation</b>, <b>land degradation</b>, <b>overfishing</b> and <b>waste</b>. Indonesia produces tens of millions of tonnes of household waste a year, and much of it ends up in rivers and the sea.</p>
${FigW(vennSvg([T`Environment`, T`Society`, T`Economy`], { center: T`Sustainable`, pairs: [T`bearable`, T`viable`, T`equitable`], label: T`Three overlapping circles for environment, society and economy; where all three overlap is sustainable development` }), T`Sustainable development balances the environment, society and the economy.`)}
${Key(T`<p><b>Sustainable development</b> is "development that meets the needs of the present without compromising the ability of future generations to meet their own needs" (Brundtland Report, 1987). The <b>carrying capacity</b> of an area is the largest population it can support without being damaged:</p><p>$$\text{people supported} = \frac{\text{available resource}}{\text{need per person}}$$</p><p>The <b>ecological footprint</b> measures the land and sea area needed to supply what a person uses and absorb their waste. When the world's footprint exceeds its biocapacity, we are using more than one Earth.</p>`)}
${FigW(sdgTilesHtml({ label: T`The 17 Sustainable Development Goals, each tile with its number, title and symbol` }), T`The 17 Sustainable Development Goals (SDGs), agreed by all UN member states in 2015 to be reached by 2030. Indonesia puts them into practice through its national SDG action plans (coordinated by Bappenas).`)}
${Tbl([T`Tool`, T`What it does`], [[T`AMDAL (environmental impact assessment)`, T`required before big projects; studies the effects on the environment and plans how to manage them`], [T`3R: reduce, reuse, recycle`, T`less waste at the source, using things again, making new products from waste`], [T`Circular economy`, T`designing products and systems so materials keep circulating instead of becoming waste`], [T`Waste banks (bank sampah)`, T`communities sort and sell recyclable waste`]])}
${Tip(T`<p>Environmental problems cross borders: haze from forest fires, plastic in the ocean and greenhouse gases affect everyone. That is why local action and international agreements both matter.</p>`)}`,
  gens: [
    () => {
      const A = pick([500, 800, 1000, 1200]), need = pick([0.1, 0.2, 0.25, 0.4]), n = sig(A / need, 3);
      return { q: T`A valley has ${Q(A, 'ha')} of farmland. Each person needs ${Q(need, 'ha')} to grow their food. How many people can the valley support?`, a: n, rtol: 0.01, w: [sig(A * need, 3), sig(need / A, 3), sig(A / need / 10, 3)],
        s: T`$\frac{${M(A)}}{${M(need)}} = ${M(n)}$ people.` };
    },
    () => {
      const fp = pick([2.2, 2.6, 2.8, 3.4, 5.2]), bc = pick([1.5, 1.6]), e = sig(fp / bc, 3);
      return { q: T`The average ecological footprint in a country is ${NUM(fp)} global hectares per person, but the Earth's biocapacity is only ${NUM(bc)} global hectares per person. If everyone lived like this, how many Earths would we need?`, a: e, rtol: 0.02, w: [sig(fp - bc, 3), sig(bc / fp, 3), sig(fp * bc, 3)],
        s: T`$\frac{${M(fp)}}{${M(bc)}} = ${M(e)}$ Earths.` };
    },
    () => {
      const P = pick([100000, 250000, 500000, 1000000]), kg = pick([0.5, 0.6, 0.7, 0.8]), t = sig(P * kg / 1000, 3);
      return { q: T`Each of the ${F(P)} residents of a city produces about ${Q(kg, 'kg')} of waste a day. How many tonnes of waste does the city produce each day?`, a: t, u: 't', rtol: 0.01, w: [sig(P * kg, 3), sig(P * kg / 100, 3), sig(P * kg / 1000 * 365, 3)],
        s: T`$${M(P)} \times ${M(kg)} = ${M(sig(P * kg, 3))}$ kg $= ${QT(t, 't')}$ a day.` };
    },
    () => {
      const tot = pick([200, 400, 500, 800]), p = pick([10, 15, 20, 25, 35]), rec = tot * p / 100;
      return { q: T`A town collects ${Q(tot, 't')} of waste a week, of which ${Q(rec, 't')} is recycled. What is its recycling rate?`, a: p, u: '%', rtol: 0.01, w: [100 - p, sig(tot / rec, 3), sig(rec / (tot - rec) * 100, 3)],
        s: T`$\frac{${M(rec)}}{${M(tot)}} \times 100\% = ${M(p)}\%$.` };
    },
    () => {
      const [d, a] = pick([[T`Bringing your own bag and bottle instead of buying plastic ones`, T`Reduce`], [T`Using glass jars again to store food`, T`Reuse`], [T`Turning plastic bottles into polyester fibre`, T`Recycle`], [T`Buying products with less packaging`, T`Reduce`], [T`Giving old clothes to someone who can wear them`, T`Reuse`], [T`Composting food scraps into fertiliser`, T`Recycle`]]);
      return { q: T`Which of the 3Rs is this? <i>${d}</i>`, a, w: [T`Reduce`, T`Reuse`, T`Recycle`].filter(x => x !== a), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => {
      const [g, d] = pick([[13, T`Climate action`], [14, T`Life below water`], [15, T`Life on land`], [6, T`Clean water and sanitation`], [7, T`Affordable and clean energy`], [11, T`Sustainable cities and communities`]]);
      return { q: T`Which Sustainable Development Goal is highlighted?${FigW(sdgGridSvg({ highlight: [g], label: T`The 17 SDGs with one highlighted` }))}`, a: d, w: [T`Climate action`, T`Life below water`, T`Life on land`, T`Clean water and sanitation`, T`Affordable and clean energy`, T`Sustainable cities and communities`].filter(x => x !== d).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`Goal ${g} is <b>${d}</b>.` };
    },
    () => pick([
      { q: T`What does AMDAL require before a large project is built?`, a: T`A study of its environmental impacts and how to manage them`, w: [T`A population census`, T`A tax payment only`, T`Permission from every resident`], only: 'mc', s: T`AMDAL is Indonesia's environmental impact assessment; without it big projects cannot get a permit.` },
      { q: T`Which definition of sustainable development comes from the Brundtland Report (1987)?`, a: T`Meeting present needs without compromising future generations`, w: [T`Growing the economy as fast as possible`, T`Stopping all use of natural resources`, T`Protecting only national parks`], only: 'mc', s: T`It balances today's needs with those of future generations.` },
      { q: T`What is the carrying capacity of an area?`, a: T`The largest population it can support without being damaged`, w: [T`The number of cars on its roads`, T`The weight its bridges can carry`, T`Its total area`], only: 'mc', s: T`Beyond the carrying capacity, resources are used faster than they renew and the environment degrades.` },
    ]),
  ],
},
  ],
});
