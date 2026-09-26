/* ==========================================================================
   TRACK E — The Biosphere
   ========================================================================== */
level({
  id: 'biosphere', mark: 'E', name: 'The Biosphere', short: 'Biosphere', band: 'Flora · fauna · biomes', color: 'lv5',
  blurb: 'Where plants and animals live and why: the factors that shape their distribution, Indonesia’s fauna zones, the world’s biomes and conservation.',
  topics: [
{
  id: 'biogeography', stage: 'sh', title: 'Distribution of Flora & Fauna',
  blurb: 'The factors that decide where plants and animals live, Indonesia’s Asiatic, transitional and Australian fauna, the Wallace, Weber and Lydekker lines, and vegetation zones on mountains.',
  lesson: () => T`
<p><b>Biogeography</b> studies where plants (flora) and animals (fauna) live and why. Their distribution is shaped by four groups of factors.</p>
${Fig(hubSvg(T`Distribution`, [T`Climate`, T`Soil`, T`Relief`, T`Living things`], { label: T`Four groups of factors affecting the distribution of flora and fauna: climate, soil, relief and living things` }), T`The factors that shape where species live.`)}
${Tbl([T`Factor`, T`Examples`], [[T`Climatic`, T`temperature, rainfall, humidity, sunlight and wind`], [T`Edaphic (soil)`, T`soil texture, nutrients, acidity and water content`], [T`Physiographic (relief)`, T`altitude, slope and the direction a slope faces`], [T`Biotic`, T`people (clearing forest, farming, hunting), animals that spread seeds, competition`]])}
<h3>Indonesia's three fauna regions</h3>
<p>During the ice ages the sea was about 120 m lower. The shallow <b>Sunda Shelf</b> joined Sumatra, Java, Bali and Kalimantan to Asia, and the <b>Sahul Shelf</b> joined Papua and the Aru Islands to Australia. Animals could walk across. Between them lay deep sea that land animals could not cross: <b>Wallacea</b>, where many species live nowhere else (endemic).</p>
${FigW(indonesiaSvg({ grid: false, lines: [['wallace', T`Wallace line`], ['weber', T`Weber line`], ['lydekker', T`Lydekker line`]], names: [[103, -3.2, T`Asiatic`], [122.5, 3.6, T`Transitional`], [137, -9.2, T`Australian`]], label: T`Map of Indonesia with the Wallace line between Kalimantan and Sulawesi and between Bali and Lombok, the Weber line through Maluku, and the Lydekker line west of Papua` }), T`The Wallace line marks the eastern edge of Asian fauna, the Lydekker line the western edge of Australian fauna, and the Weber line the point where the two are balanced.`)}
${Tbl([T`Region`, T`Area`, T`Typical animals`], [[T`Asiatic (western)`, T`Sumatra, Java, Kalimantan, Bali`, T`elephant, Sumatran tiger, one-horned rhino, orangutan, tapir, proboscis monkey`], [T`Transitional (Wallacea)`, T`Sulawesi, Nusa Tenggara, Maluku`, T`anoa, babirusa, Komodo dragon, maleo, tarsier`], [T`Australian (eastern)`, T`Papua and the Aru Islands`, T`tree kangaroo, cassowary, bird of paradise, cuscus`]])}
${Key(T`<p><b>Plants</b> follow the same climate pattern. Western Indonesia has tall, wet rainforests rich in dipterocarps (meranti, keruing) and the giant <i>Rafflesia arnoldii</i>. The drier east has monsoon forests, savannas and eucalyptus. <b>Height</b> changes the vegetation too: lowland rainforest gives way to submontane, montane and subalpine forest as it gets cooler.</p>`)}
${FigW(mountainTempSvg({ peak: 3400, zones: true, names: { z1: T`Lowland rainforest`, z2: T`Submontane forest`, z3: T`Montane forest`, z4: T`Subalpine shrubs and grass` }, label: T`A mountain with vegetation zones: lowland rainforest at the bottom, then submontane forest, montane forest and subalpine shrubs near the top` }), T`Vegetation zones up a tropical mountain (boundaries are approximate).`)}`,
  gens: [
    () => {
      const [d, a] = pick([[T`orangutan`, T`Asiatic`], [T`Sumatran tiger`, T`Asiatic`], [T`one-horned rhino`, T`Asiatic`], [T`Asian elephant`, T`Asiatic`], [T`tapir`, T`Asiatic`], [T`proboscis monkey`, T`Asiatic`], [T`anoa`, T`Transitional`], [T`babirusa`, T`Transitional`], [T`Komodo dragon`, T`Transitional`], [T`maleo bird`, T`Transitional`], [T`tarsier`, T`Transitional`], [T`cassowary`, T`Australian`], [T`bird of paradise`, T`Australian`], [T`tree kangaroo`, T`Australian`], [T`cuscus`, T`Australian`]]);
      return { q: T`To which of Indonesia's fauna regions does the <b>${d}</b> belong?`, a, w: [T`Asiatic`, T`Transitional`, T`Australian`].filter(x => x !== a), only: 'mc', s: T`The ${d} belongs to the <b>${a}</b> fauna.` };
    },
    () => {
      const [d, a] = pick([[T`Rainfall and humidity`, T`Climatic`], [T`Soil acidity and nutrients`, T`Edaphic`], [T`Altitude and slope`, T`Physiographic`], [T`People clearing forest for plantations`, T`Biotic`], [T`Sunlight and temperature`, T`Climatic`], [T`Birds spreading seeds`, T`Biotic`], [T`Soil texture and water content`, T`Edaphic`]]);
      return { q: T`Which group of factors is this? <i>${d}</i>`, a, w: [T`Climatic`, T`Edaphic`, T`Physiographic`, T`Biotic`].filter(x => x !== a), only: 'mc', s: T`That is a <b>${a}</b> factor.` };
    },
    () => {
      const k = pick(['wallace', 'weber', 'lydekker']), a = k === 'wallace' ? T`Wallace line` : k === 'weber' ? T`Weber line` : T`Lydekker line`;
      return { q: T`Which line is drawn on the map?${FigW(indonesiaSvg({ grid: false, lines: [[k, '?']], label: T`Map of Indonesia with one dividing line` }))}`, a, w: [T`Wallace line`, T`Weber line`, T`Lydekker line`, T`The equator`].filter(x => x !== a), only: 'mc',
        s: k === 'wallace' ? T`The Wallace line runs between Kalimantan and Sulawesi and between Bali and Lombok: the edge of the Asian fauna.` : k === 'weber' ? T`The Weber line runs through Maluku, where Asian and Australian fauna are balanced.` : T`The Lydekker line runs along the edge of the Sahul Shelf, west of Papua: the edge of the Australian fauna.` };
    },
    () => {
      const d = pick([40, 60, 80, 100, 150]), fall = 120, a = d < fall ? T`Dry land` : T`Still sea`;
      return { q: T`During the last ice age the sea was about ${Q(fall, 'm')} lower than today. A strait is ${Q(d, 'm')} deep today. Was it dry land or sea then?`, a, w: [d < fall ? T`Still sea` : T`Dry land`, T`A freshwater lake`], only: 'mc',
        s: d < fall ? T`${Q(d, 'm')} is less than ${Q(fall, 'm')}, so the sea floor was exposed: a land bridge animals could cross, like the Sunda Shelf.` : T`${Q(d, 'm')} is more than ${Q(fall, 'm')}, so it stayed sea: a barrier to land animals, as in Wallacea.` };
    },
    () => {
      const n = pick([60, 90, 120, 240, 300]), A = pick([100, 150, 200, 400, 600]), dens = sig(n / A, 3);
      return { q: T`A survey counts ${n} orangutans in ${Q(A, 'km²')} of forest. What is their population density, per km²?`, a: dens, rtol: 0.02, w: [sig(A / n, 3), sig(n * A / 1000, 3), sig(n / A * 10, 3)],
        s: T`$\frac{${M(n)}}{${M(A)}} = ${M(dens)}$ orangutans per km².` };
    },
    () => pick([
      { q: T`Why are the animals of Sumatra, Java and Kalimantan similar to those of mainland Asia?`, a: T`They were joined to Asia by the Sunda Shelf when sea level was low`, w: [T`They have the same volcanoes`, T`They are on the same longitude`, T`Animals swam across the deep sea`], only: 'mc', s: T`In the ice ages the shallow Sunda Shelf was dry land, so Asian animals spread across it.` },
      { q: T`What is special about the fauna of Wallacea?`, a: T`It has many endemic species found nowhere else`, w: [T`It has only Asian animals`, T`It has no mammals`, T`It is the same as Australia's`], only: 'mc', s: T`Surrounded by deep sea, Wallacea was never joined to either continent, so species such as the anoa, babirusa and Komodo dragon evolved there alone.` },
      { q: T`Between which two islands does the Wallace line pass?`, a: T`Bali and Lombok`, w: [T`Java and Bali`, T`Sumatra and Java`, T`Papua and the Aru Islands`], only: 'mc', s: T`The Lombok Strait is deep, so it separates Asian Bali from transitional Lombok, although they are only 35 km apart.` },
      { q: T`Which giant flower grows in the rainforests of Sumatra, for example in Bengkulu?`, a: T`Rafflesia arnoldii`, w: [T`Edelweiss`, T`Eucalyptus`, T`Lotus`], only: 'mc', s: T`Rafflesia arnoldii, the largest single flower in the world, lives in the wet forests of western Indonesia.` },
      { q: T`Why are savannas and eucalyptus common in Nusa Tenggara Timur?`, a: T`The climate is drier, with a long dry season`, w: [T`It is very high above sea level`, T`It is covered in peat`, T`It has the most rain in Indonesia`], only: 'mc', s: T`Close to Australia, NTT has a long dry east monsoon, so grassland and dry-tolerant trees replace rainforest.` },
    ]),
  ],
},
{
  id: 'biomes', stage: 'sh', title: 'World Biomes',
  blurb: 'Biomes and the climate that shapes them, Whittaker’s biome chart, the layers of a tropical rainforest, Indonesia’s ecosystems, and energy flow through food chains.',
  lesson: () => T`
<p>A <b>biome</b> is a large region with a similar climate, vegetation and animal life, such as a desert or a rainforest. The two things that matter most are <b>temperature</b> and <b>rainfall</b>, so biomes follow the climate zones.</p>
${FigW(whittakerSvg({ names: { tundra: T`Tundra`, taiga: T`Taiga`, temperate: T`Temperate forest`, grass: T`Grassland`, desert: T`Desert`, savanna: T`Savanna`, rain: T`Rainforest`, xl: T`mean annual temperature (°C)`, yl: T`rain (mm/year)` }, mark: [27, 3200, 'Pontianak'], label: T`Whittaker's biome chart: rainforest where it is hot and very wet, savanna and grassland where it is drier, desert where rain is scarce, temperate forest, taiga and tundra as it gets colder` }), T`Whittaker's biome chart. Pontianak, hot and wet all year, lies in the rainforest.`)}
${Tbl([T`Biome`, T`Climate`, T`Vegetation and animals`], [
  [T`Tropical rainforest`, T`hot and wet all year`, T`tall evergreen trees in layers, lianas, epiphytes; the richest biome on Earth`],
  [T`Savanna`, T`hot, with a long dry season`, T`grassland with scattered trees; large grazing animals`],
  [T`Desert`, T`very little rain (under 250 mm)`, T`cacti and succulents with deep roots and small leaves; animals active at night`],
  [T`Grassland (steppe, prairie)`, T`dry and continental`, T`grasses, few trees; now largely farmland`],
  [T`Temperate deciduous forest`, T`four seasons`, T`trees such as oak and maple that drop their leaves in autumn`],
  [T`Taiga (boreal forest)`, T`long cold winters`, T`conifers such as pine, spruce and fir; bears, moose`],
  [T`Tundra`, T`very cold; ground frozen (permafrost)`, T`mosses, lichens, low shrubs; no trees`]])}
${Key(T`<p><b>A tropical rainforest has layers.</b> Emergent trees stick out above a dense <b>canopy</b> 30–40 m up, where most life is; below are the understorey and a dark forest floor. Nutrients are held in the plants, not the thin soil, so a cleared rainforest quickly loses its fertility.</p>`)}
<h3>Indonesia's ecosystems</h3>
<p>Indonesia has tropical rainforest (Sumatra, Kalimantan, Papua), <b>monsoon forest</b> that loses leaves in the dry season (east Java, with teak), <b>savanna</b> (Nusa Tenggara), <b>mangrove</b> and <b>peat swamp</b> forest along the coasts, and <b>montane</b> forest on high mountains.</p>
<h3>Energy in ecosystems</h3>
${Fig(energyPyramidSvg([T`Producers`, T`Herbivores`, T`Carnivores`, T`Top carnivores`], { values: [F(10000), F(1000), F(100), F(10)], unit: ' kJ', label: T`An energy pyramid: 10 000 kJ in producers, 1 000 kJ in herbivores, 100 kJ in carnivores and 10 kJ in top carnivores` }), T`An energy pyramid. Only about 10% of the energy passes to each level above.`)}
${Tip(T`<p>The <b>10% rule</b>: at each step of a food chain most energy is used for living or lost as heat, so only about a tenth reaches the next level. That is why there are far fewer tigers than deer, and far fewer deer than plants.</p>`)}`,
  gens: [
    () => {
      const C = [[27, 3500, T`Tropical rainforest`], [26, 900, T`Savanna`], [24, 120, T`Desert`], [10, 1400, T`Temperate deciduous forest`], [-2, 450, T`Taiga (boreal forest)`], [-10, 200, T`Tundra`], [12, 450, T`Grassland (steppe, prairie)`]];
      const [t, p, a] = pick(C), tt = t + pick([-1, 0, 1]), pp = Math.round(p * (0.9 + 0.2 * rng()) / 10) * 10;
      return { q: T`A place has a mean annual temperature of ${Q(tt, '°C')} and ${Q(pp, 'mm')} of rain a year. Which biome is it most likely in?${FigW(whittakerSvg({ names: { tundra: T`Tundra`, taiga: T`Taiga`, temperate: T`Temperate forest`, grass: T`Grassland`, desert: T`Desert`, savanna: T`Savanna`, rain: T`Rainforest`, xl: T`mean annual temperature (°C)`, yl: T`rain (mm/year)` }, mark: [tt, pp], label: T`Whittaker's biome chart with one place marked` }))}`, a, w: C.map(c => c[2]).filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`On the chart the point falls in the <b>${a}</b> area.` };
    },
    () => {
      const [d, a] = pick([[T`Trees drop their leaves in autumn and grow new ones in spring.`, T`Temperate deciduous forest`], [T`Conifers such as pine and spruce survive long, snowy winters.`, T`Taiga (boreal forest)`], [T`The ground is frozen all year below the surface; only mosses and lichens grow.`, T`Tundra`], [T`Tall evergreen trees form a dense canopy; it rains almost every day.`, T`Tropical rainforest`], [T`Grassland with scattered trees and a long dry season.`, T`Savanna`], [T`Plants store water in thick stems and animals hide from the heat by day.`, T`Desert`]]);
      return { q: T`Which biome is this? <i>${d}</i>`, a, w: [T`Temperate deciduous forest`, T`Taiga (boreal forest)`, T`Tundra`, T`Tropical rainforest`, T`Savanna`, T`Desert`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is the <b>${a}</b>.` };
    },
    () => {
      const E0 = pick([10000, 20000, 50000, 80000]), k = pick([1, 2, 3]), e = E0 / 10 ** k, lv = [T`herbivores`, T`carnivores`, T`top carnivores`][k - 1];
      return { q: T`The plants in an ecosystem hold ${Q(E0, 'kJ')} of energy. Using the 10% rule, how much energy reaches the ${lv}?`, a: e, u: 'kJ', rtol: 0.01, w: [E0 / 10 ** (k + 1), k > 1 ? E0 / 10 ** (k - 1) : E0 / 2, sig(E0 * 0.9 ** k, 3)],
        s: T`${k === 1 ? T`One step` : T`${k} steps`}: $${M(E0)} \times ${M(0.1 ** k)} = ${QT(e, 'kJ')}$.` };
    },
    () => {
      const e = pick([5, 10, 20, 50]), k = pick([2, 3]), E0 = e * 10 ** k;
      return { q: T`A food chain has ${k + 1} levels and the top level receives ${Q(e, 'kJ')}. Using the 10% rule, how much energy was in the producers?`, a: E0, u: 'kJ', rtol: 0.01, w: [e * 10 ** (k - 1), e * 10 ** (k + 1), e * 10 * k],
        s: T`Each level down holds ten times more: $${M(e)} \times 10^{${k}} = ${QT(E0, 'kJ')}$.` };
    },
    () => pick([
      { q: T`Why does a cleared tropical rainforest quickly become infertile?`, a: T`Most nutrients were in the plants, and heavy rain washes the thin soil`, w: [T`The soil is too cold`, T`There is too little rain`, T`The soil is too deep`], only: 'mc', s: T`Nutrients cycle quickly through living plants; once they are removed, heavy rain leaches the thin, poor soil.` },
      { q: T`Which forest in east Java loses its leaves in the dry season?`, a: T`Monsoon forest (teak forest)`, w: [T`Tropical rainforest`, T`Mangrove forest`, T`Taiga`], only: 'mc', s: T`Monsoon forest, often with teak, sheds leaves to save water during the long dry season.` },
      { q: T`In which layer of a rainforest does most life live?`, a: T`The canopy`, w: [T`The forest floor`, T`The soil`, T`Above the emergent trees`], only: 'mc', s: T`The canopy, 30–40 m up, gets the most sunlight, flowers and fruit, so most animals live there.` },
      { q: T`What limits the number of top carnivores such as tigers?`, a: T`Only about 10% of energy passes to each level`, w: [T`Tigers do not need energy`, T`Plants eat tigers`, T`There is too much energy at the top`], only: 'mc', s: T`With so little energy reaching the top of the food chain, only a few large predators can survive.` },
      { q: T`What is permafrost?`, a: T`Ground that stays frozen all year`, w: [T`A type of desert plant`, T`Ice that floats on the sea`, T`A cold ocean current`], only: 'mc', s: T`Permafrost lies under the tundra; only the top layer thaws in summer, so trees cannot root.` },
    ]),
  ],
},
{
  id: 'conservation', stage: 'sh', title: 'Biodiversity & Conservation',
  blurb: 'The three levels of biodiversity, why Indonesia is megadiverse, threats to species, the IUCN Red List, measuring diversity, and in-situ and ex-situ conservation.',
  lesson: () => T`
<p><b>Biodiversity</b> is the variety of life. It exists at three levels: <b>genetic</b> diversity (differences within a species, such as the many varieties of rice), <b>species</b> diversity (the number of different species) and <b>ecosystem</b> diversity (the variety of habitats, from coral reefs to mountain forests).</p>
<p>Indonesia is one of the world's <b>megadiverse</b> countries: it covers about 1.3% of the Earth's land yet holds around 10% of its flowering plants, 12% of its mammals and 17% of its birds. Its position between two continents, its thousands of islands and its tropical climate all add to this richness.</p>
${Fig(hbarSvg([{ label: T`Habitat loss`, value: 5, show: '' }, { label: T`Overexploitation`, value: 4, show: '' }, { label: T`Invasive species`, value: 3, show: '' }, { label: T`Pollution`, value: 2.5, show: '' }, { label: T`Climate change`, value: 2.5, show: '' }], { label: T`The main threats to biodiversity: habitat loss, overexploitation, invasive species, pollution and climate change`, max: 5 }), T`The main threats to biodiversity. Habitat loss, such as clearing forest for plantations and mines, is by far the largest.`)}
${Fig(barsSvg([[T`land area`, 1.3, 'mf-s3'], [T`flowering plants`, 10, 'mf-s2'], [T`mammals`, 12, 'mf-s1'], [T`birds`, 17, 'mf-s4']], { W: 380, H: 220, yMax: 20, step: 5, yl: T`% of world total`, label: T`Indonesia's share of the world: 1.3 percent of the land, but about 10 percent of flowering plants, 12 percent of mammals and 17 percent of birds` }), T`Indonesia's share of the world: little land, but a very large share of its species — the mark of a megadiverse country.`)}
<h3>The IUCN Red List</h3>
${Tbl([T`Category`, T`Meaning`, T`Indonesian example`], [[T`Extinct (EX)`, T`no individuals left`, T`Javan tiger`], [T`Critically endangered (CR)`, T`extremely high risk of extinction`, T`Javan rhino, Sumatran orangutan, Tapanuli orangutan`], [T`Endangered (EN)`, T`very high risk`, T`Sumatran elephant, proboscis monkey, anoa`], [T`Vulnerable (VU)`, T`high risk`, T`Komodo dragon (now EN), babirusa`], [T`Least concern (LC)`, T`not currently threatened`, T`common species`]])}
${Key(T`<p><b>Measuring diversity.</b> Counting species (species richness) ignores how common each one is. <b>Simpson's index of diversity</b> uses the number of individuals $n$ of each species and the total $N$:</p><p>$$D = 1 - \frac{\sum n(n-1)}{N(N-1)}$$</p><p>It ranges from 0 (one species only) towards 1 (many species, evenly spread). It is the chance that two individuals picked at random belong to different species.</p>`)}
<h3>Conservation</h3>
${Tbl([T`Type`, T`Meaning`, T`Examples`], [[T`In situ (on site)`, T`protecting species in their natural habitat`, T`national parks (Komodo, Ujung Kulon, Lorentz), nature reserves (cagar alam), wildlife sanctuaries (suaka margasatwa)`], [T`Ex situ (off site)`, T`protecting species outside their habitat`, T`zoos, botanic gardens (Kebun Raya Bogor), seed banks, captive breeding`]])}
${Tip(T`<p>Ujung Kulon National Park is the last home of the Javan rhino, with fewer than 80 animals. Protecting whole habitats in situ saves many species at once; ex situ work is a back-up when a species is on the edge.</p>`)}`,
  gens: [
    () => {
      let c; do { c = [ri(1, 9), ri(1, 9), ri(1, 9)]; } while (new Set(c).size < 2);
      const N = c[0] + c[1] + c[2], sum = c.reduce((a, n) => a + n * (n - 1), 0), D = sig(1 - sum / (N * (N - 1)), 3);
      return { q: T`A sample from a forest contains ${c[0]}, ${c[1]} and ${c[2]} individuals of three tree species. Calculate Simpson's index of diversity $D = 1 - \frac{\sum n(n-1)}{N(N-1)}$.`, a: D, rtol: 0.02, w: [sig(sum / (N * (N - 1)), 3), sig(1 - c.reduce((a, n) => a + n * n, 0) / (N * N), 3) === D ? sig(D / 2, 3) : sig(1 - c.reduce((a, n) => a + n * n, 0) / (N * N), 3), sig(3 / N, 3)],
        s: T`$N = ${N}$, $\sum n(n-1) = ${c.map(n => `${n} \\times ${n - 1}`).join(' + ')} = ${sum}$, so $D = 1 - \frac{${sum}}{${N} \times ${N - 1}} = ${M(D)}$.` };
    },
    () => {
      const A = pick([100, 120, 90, 150]), r = pick([1, 2, 3, 5]), y = pick([5, 10, 20]), left = sig(A * (1 - r / 100) ** y, 3);
      return { q: T`A forest covers ${NUM(A)} million ha and loses ${r}% of what is left every year. How much remains after ${y} years? (in million ha)`, a: left, rtol: 0.02, w: [sig(A * (1 - r * y / 100), 3) === left ? sig(left + 2, 3) : sig(A * (1 - r * y / 100), 3), sig(A * (r / 100) ** y, 3) || sig(left - 5, 3), sig(A * (1 + r / 100) ** y, 3)],
        s: T`$${M(A)} \times (1 - ${M(r / 100)})^{${y}} = ${M(left)}$ million ha.` };
    },
    () => {
      const before = pick([800, 1000, 1200, 1500]), p = pick([10, 20, 25, 40, 50]), after = before * (1 - p / 100);
      return { q: T`A survey counted ${F(before)} animals of a species ten years ago and ${F(after)} today. By what percentage has the population fallen?`, a: p, u: '%', rtol: 0.01, w: [sig((before - after) / after * 100, 3), before - after, 100 - p],
        s: T`$\frac{${M(before)} - ${M(after)}}{${M(before)}} \times 100\% = ${M(p)}\%$.` };
    },
    () => {
      const [d, a] = pick([[T`Breeding Sumatran rhinos in a sanctuary`, T`Ex situ`], [T`Declaring Lorentz in Papua a national park`, T`In situ`], [T`Storing rice seeds in a seed bank`, T`Ex situ`], [T`Protecting a nature reserve (cagar alam) for Rafflesia`, T`In situ`], [T`Growing rare plants at Kebun Raya Bogor`, T`Ex situ`], [T`Guarding Komodo dragons on Komodo Island`, T`In situ`], [T`Keeping orangutans in a zoo`, T`Ex situ`]]);
      return { q: T`Is this in-situ or ex-situ conservation? <i>${d}</i>`, a, w: [a === T`In situ` ? T`Ex situ` : T`In situ`, T`Neither`], only: 'mc', s: a === T`In situ` ? T`It protects the species in its natural habitat: <b>in situ</b>.` : T`It protects the species outside its natural habitat: <b>ex situ</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Many varieties of rice, each with different genes`, T`Genetic diversity`], [T`Hundreds of bird species in one forest`, T`Species diversity`], [T`Coral reefs, mangroves, peat swamps and mountain forests in one province`, T`Ecosystem diversity`], [T`Durian trees with fruit of different taste and colour`, T`Genetic diversity`]]);
      return { q: T`Which level of biodiversity is this? <i>${d}</i>`, a, w: [T`Genetic diversity`, T`Species diversity`, T`Ecosystem diversity`].filter(x => x !== a), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Which is the largest threat to biodiversity in Indonesia?`, a: T`Habitat loss from clearing forests`, w: [T`Volcanic eruptions`, T`Too many national parks`, T`Cold weather`], only: 'mc', s: T`Clearing forest for plantations, mines, farms and towns destroys the homes of countless species.` },
      { q: T`Where is the last population of the Javan rhino?`, a: T`Ujung Kulon National Park`, w: [T`Komodo National Park`, T`Lorentz National Park`, T`Kebun Raya Bogor`], only: 'mc', s: T`Fewer than 80 Javan rhinos survive, all in Ujung Kulon at the western tip of Java.` },
      { q: T`What does "critically endangered" mean on the IUCN Red List?`, a: T`An extremely high risk of extinction in the wild`, w: [T`Already extinct`, T`Not threatened`, T`Only found in zoos`], only: 'mc', s: T`CR is the highest risk category before "extinct in the wild".` },
      { q: T`Why is Indonesia so rich in species?`, a: T`It lies between two continents, has thousands of islands and a tropical climate`, w: [T`It has cold winters`, T`It is a single large continent`, T`It has few different habitats`], only: 'mc', s: T`Asian and Australian species meet, islands let new species evolve, and the warm, wet climate supports lush ecosystems.` },
      { q: T`Which Indonesian big cat is already extinct?`, a: T`The Javan tiger`, w: [T`The Sumatran tiger`, T`The clouded leopard`, T`The Javan leopard`], only: 'mc', s: T`The Javan tiger (and the Bali tiger) became extinct in the 20th century; the Sumatran tiger survives but is critically endangered.` },
    ]),
  ],
},
  ],
});
