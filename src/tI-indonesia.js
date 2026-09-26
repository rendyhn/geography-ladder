/* ==========================================================================
   TRACK I — Indonesia & the World
   ========================================================================== */
level({
  id: 'indonesia', mark: 'I', name: 'Indonesia & the World', short: 'Indonesia & World', band: 'Position · borders · cooperation', color: 'lv9',
  blurb: 'Indonesia’s place in the world: its position and territory, geopolitics and borders, developed and developing countries, and international cooperation.',
  topics: [
{
  id: 'indonesia-position', stage: 'sh', title: 'Indonesia’s Position & Territory',
  blurb: 'Indonesia’s astronomical, geographical and geological position, its extreme points, size and islands, and what its position means for climate, time, trade and hazards.',
  lesson: () => T`
<p>Indonesia is the world's largest archipelagic state: about 17 000 islands spread over more than 5 000 km from west to east, with a land area of about 1.9 million km² and a much larger sea.</p>
${FigW(indonesiaSvg({ marks: [[95.3, 5.9, 'Sabang (We)', 'start'], [141, -8.5, 'Merauke', 'end'], [126.6, 5.6, 'Miangas', 'start'], [123.1, -11, 'Rote (Ndana)', 'start']], label: T`Map of Indonesia with a grid of latitude and longitude and its extreme points: Sabang in the west, Merauke in the east, Miangas in the north and Rote in the south` }), T`Indonesia's extreme points: about 6° N to 11° S and 95° E to 141° E.`)}
${Tbl([T`Position`, T`Description`, T`What it means`], [
  [T`Astronomical`, T`about 6° N – 11° S and 95° E – 141° E`, T`tropical climate with rain all year, a small range of temperature; three time zones`],
  [T`Geographical`, T`between two continents (Asia and Australia) and two oceans (Pacific and Indian)`, T`monsoon winds, a crossroads of world trade and culture, rich biodiversity`],
  [T`Geological`, T`where the Eurasian, Indo-Australian and Pacific plates meet`, T`volcanoes, fertile soils and minerals, but also earthquakes and tsunamis`]])}
${FigW(indonesiaSvg({ grid: false, names: [[100, 6, T`ASIA`], [136, -11, T`AUSTRALIA`], [102, -10, T`Indian Ocean`], [134, 5, T`Pacific Ocean`]], label: T`Indonesia between the continents of Asia and Australia and between the Indian and Pacific Oceans` }), T`Indonesia's geographical position: a crossroads between two continents and two oceans.`)}
${Key(T`<p>The span of longitude sets the difference in <b>solar time</b>: the Earth turns 15° an hour, so</p><p>$$\Delta t = \frac{\Delta\lambda}{15^\circ} \text{ hours}$$</p><p>Indonesia's 46° of longitude make just over 3 hours, which is why it has three time zones. One degree of latitude is about 111 km, so Indonesia's 17° of latitude span about 1 900 km from north to south.</p>`)}
${Tip(T`<p>The <b>Strait of Malacca</b>, between Sumatra and Malaysia, is one of the busiest shipping lanes in the world. Indonesia's three <b>archipelagic sea lanes</b> (ALKI) guarantee ships a route through its waters.</p>`)}`,
  gens: [
    () => {
      const [a, b, na, nb] = pick([[95, 141, 'Sabang', 'Merauke'], [106.8, 140.7, 'Jakarta', 'Jayapura'], [98.7, 125.6, 'Medan', 'Manado'], [110.4, 131.3, 'Yogyakarta', 'Sorong']]), t = sig((b - a) / 15, 3);
      return { q: T`${na} lies at about ${NUM(a)}° E and ${nb} at about ${NUM(b)}° E. What is the difference in solar time between them, in hours?`, a: t, u: 'h', rtol: 0.02, w: [sig(b - a, 3), sig((b - a) / 15 * 60, 3), sig((b - a) / 30, 3)],
        s: T`$\frac{${M(b)} - ${M(a)}}{15} = \frac{${M(sig(b - a, 3))}}{15} = ${M(t)}$ hours.` };
    },
    () => {
      const n = pick([6, 5, 4]), s2 = pick([11, 10, 8]), d = (n + s2) * 111;
      return { q: T`A country stretches from ${n}° N to ${s2}° S. Taking 1° of latitude as 111 km, about how far is it from north to south?`, a: d, u: 'km', rtol: 0.01, w: [Math.abs(s2 - n) * 111, (n + s2) * 60, (n + s2) * 111 * 2],
        s: T`It spans $${n} + ${s2} = ${n + s2}$ degrees of latitude (the equator lies between): $${n + s2} \times 111 = ${QT(d, 'km')}$.` };
    },
    () => {
      const land = pick([1.9]), sea = pick([3.1, 6.4]), p = sig(sea / (land + sea) * 100, 3);
      return { q: T`Taking Indonesia's land as ${NUM(land)} million km² and its waters as ${NUM(sea)} million km², what percentage of the total is sea?`, a: p, u: '%', rtol: 0.02, w: [sig(land / (land + sea) * 100, 3), sig(sea / land * 100, 3), sig(sea / land, 3)],
        s: T`$\frac{${M(sea)}}{${M(land)} + ${M(sea)}} \times 100\% = ${M(p)}\%$.` };
    },
    () => {
      const [d, a] = pick([[T`Indonesia has a tropical climate with a small yearly range of temperature.`, T`Astronomical`], [T`Indonesia has three time zones.`, T`Astronomical`], [T`Indonesia has monsoon winds that reverse every half year.`, T`Geographical`], [T`Indonesia lies on busy trade routes between East Asia, Australia, India and the Middle East.`, T`Geographical`], [T`Indonesia has many active volcanoes and fertile soils.`, T`Geological`], [T`Indonesia is often hit by earthquakes and tsunamis.`, T`Geological`]]);
      return { q: T`Which aspect of Indonesia's position explains this? <i>${d}</i>`, a, w: [T`Astronomical`, T`Geographical`, T`Geological`].filter(x => x !== a), only: 'mc', s: T`This is explained by its <b>${a}</b> position.` };
    },
    () => {
      const [p, a] = pick([['Sabang (We)', T`Westernmost`], ['Merauke', T`Easternmost`], ['Miangas', T`Northernmost`], ['Rote (Ndana)', T`Southernmost`]]);
      return { q: T`Which extreme point of Indonesia is <b>${p}</b>?${FigW(indonesiaSvg({ marks: [[95.3, 5.9, 'Sabang (We)', 'start'], [141, -8.5, 'Merauke', 'end'], [126.6, 5.6, 'Miangas', 'start'], [123.1, -11, 'Rote (Ndana)', 'start']], label: T`Map of Indonesia with its extreme points` }))}`, a, w: [T`Westernmost`, T`Easternmost`, T`Northernmost`, T`Southernmost`].filter(x => x !== a), only: 'mc', s: T`${p} is the <b>${a}</b> point.` };
    },
    () => pick([
      { q: T`Between which two continents does Indonesia lie?`, a: T`Asia and Australia`, w: [T`Asia and Africa`, T`Australia and South America`, T`Asia and Europe`], only: 'mc', s: T`Indonesia is a bridge between Asia to the north-west and Australia to the south-east.` },
      { q: T`Between which two oceans does Indonesia lie?`, a: T`The Pacific and Indian Oceans`, w: [T`The Atlantic and Indian Oceans`, T`The Pacific and Arctic Oceans`, T`The Atlantic and Pacific Oceans`], only: 'mc', s: T`The Pacific lies to the north-east and the Indian Ocean to the south-west.` },
      { q: T`Which strait between Sumatra and Malaysia is one of the world's busiest shipping lanes?`, a: T`The Strait of Malacca`, w: [T`The Sunda Strait`, T`The Lombok Strait`, T`The Makassar Strait`], only: 'mc', s: T`Tens of thousands of ships a year pass through the Strait of Malacca between the Indian Ocean and the South China Sea.` },
      { q: T`Why does Indonesia have three time zones?`, a: T`It spans about 46° of longitude, just over 3 hours of solar time`, w: [T`It spans three plates`, T`It has three main religions`, T`It is split by the equator`], only: 'mc', s: T`Every 15° of longitude is one hour; 46° is about 3 hours, so WIB, WITA and WIT are used.` },
    ]),
  ],
},
{
  id: 'geopolitics', stage: 'sh', title: 'Geopolitics & Borders',
  blurb: 'Geopolitics and Wawasan Nusantara, the Djuanda Declaration and UNCLOS, maritime zones from the baseline to the EEZ, Indonesia’s land and sea borders, and its outermost islands.',
  lesson: () => T`
<p><b>Geopolitics</b> studies how geography (location, size, resources, borders) shapes a country's politics and security. Indonesia's geopolitical outlook is <b>Wawasan Nusantara</b>: the islands, the seas between them and the air above form one united whole, politically, economically, socially and in defence.</p>
<h3>From Djuanda to UNCLOS</h3>
<p>Under colonial law each island had only a 3-mile strip of sea; the waters between islands were international. The <b>Djuanda Declaration</b> (13 December 1957) claimed all waters between Indonesia's islands as national waters, measured from straight baselines joining the outermost islands. This was finally recognised by the <b>United Nations Convention on the Law of the Sea (UNCLOS)</b> in 1982, which accepts Indonesia as an <b>archipelagic state</b>. 13 December is now National Nusantara Day.</p>
${FigW(maritimeSvg({ names: { inner: T`archipelagic waters`, terr: T`territorial sea`, cont: T`contiguous zone`, eez: T`exclusive economic zone (EEZ)`, high: T`high seas`, base: T`baseline`, nm: T`nm`, eezNote: T`sovereign rights to fish, oil and gas`, sov: T`← full sovereignty →` }, label: T`Maritime zones measured from the baseline: territorial sea to 12 nautical miles, contiguous zone to 24, exclusive economic zone to 200, then the high seas` }), T`Maritime zones under UNCLOS, measured from the baseline (1 nautical mile = 1.852 km).`)}
${Tbl([T`Zone`, T`Width from the baseline`, T`Rights`], [[T`Archipelagic and internal waters`, T`inside the baselines`, T`full sovereignty (ships have the right of passage along sea lanes)`], [T`Territorial sea`, T`12 nm`, T`full sovereignty over the water, sea bed and air`], [T`Contiguous zone`, T`24 nm`, T`control of customs, immigration, health and taxes`], [T`Exclusive economic zone`, T`200 nm`, T`sovereign rights to fish and to use the sea bed and its oil, gas and minerals`], [T`Continental shelf`, T`at least 200 nm, up to 350 nm`, T`rights to the sea-bed resources`]])}
${Fig(donutSvg([{ label: T`Land`, value: 1.9, show: `${F(1.9)} ${T`million km²`}`, cls: 'g-s6' }, { label: T`Sea (incl. EEZ)`, value: 6.4, show: `${F(6.4)} ${T`million km²`}`, cls: 'g-s1' }], { W: 540, center: T`Indonesia`, label: T`Indonesia's area: about 1.9 million square kilometres of land and 6.4 million of sea including the exclusive economic zone` }), T`Most of Indonesia is sea: about 1.9 million km² of land and 6.4 million km² of waters including the EEZ (figures used by the Geospatial Information Agency, BIG).`)}
${Key(T`<p><b>Borders.</b> Indonesia has land borders with <b>Malaysia</b> (on Borneo), <b>Papua New Guinea</b> (on New Guinea) and <b>Timor-Leste</b> (on Timor), and sea borders with ten countries including India, Thailand, Singapore, Vietnam, the Philippines, Palau and Australia. It has 111 <b>outermost small islands</b> that mark its baselines, such as Miangas, Rondo and Sekatung.</p>`)}
${Tip(T`<p>Border disputes are settled by negotiation and international law. In 2002 the International Court of Justice gave the islands of Sipadan and Ligitan to Malaysia because Malaysia had administered them effectively. Guarding and developing outermost islands is part of keeping the nation's territory.</p>`)}`,
  gens: [
    () => {
      const nm = pick([12, 24, 200, 3]), km = sig(nm * 1.852, 4);
      return { q: T`One nautical mile is 1.852 km. How many kilometres is ${F(nm)} nautical miles?`, a: km, u: 'km', rtol: 0.01, w: [sig(nm * 1.609, 4), sig(nm / 1.852, 3), nm * 2],
        s: T`$${M(nm)} \times 1.852 = ${QT(km, 'km')}$.` };
    },
    () => {
      const d = pick([5, 10, 18, 30, 80, 150, 250]), a = d <= 12 ? T`Territorial sea` : d <= 24 ? T`Contiguous zone` : d <= 200 ? T`Exclusive economic zone` : T`High seas`;
      return { q: T`A fishing boat is ${d} nautical miles from Indonesia's baseline. In which maritime zone is it?${FigW(maritimeSvg({ names: { inner: T`archipelagic waters`, terr: T`territorial sea`, cont: T`contiguous zone`, eez: T`exclusive economic zone (EEZ)`, high: T`high seas`, base: T`baseline`, nm: T`nm`, eezNote: T`sovereign rights to fish, oil and gas`, sov: T`← full sovereignty →` }, label: T`Maritime zones` }))}`, a, w: [T`Territorial sea`, T`Contiguous zone`, T`Exclusive economic zone`, T`High seas`].filter(x => x !== a), only: 'mc', s: T`Territorial sea to 12 nm, contiguous zone to 24 nm, EEZ to 200 nm: at ${d} nm it is in the <b>${a}</b>.` };
    },
    () => {
      const [q, a] = pick([[T`On which island does Indonesia share a land border with Malaysia?`, T`Borneo (Kalimantan)`], [T`On which island does Indonesia share a land border with Papua New Guinea?`, T`New Guinea (Papua)`], [T`On which island does Indonesia share a land border with Timor-Leste?`, T`Timor`]]);
      return { q, a, w: [T`Borneo (Kalimantan)`, T`New Guinea (Papua)`, T`Timor`, T`Sumatra`].filter(x => x !== a), only: 'mc', s: T`<b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Indonesia may stop a ship to check customs documents 20 nm from the baseline.`, T`Contiguous zone`], [T`Only Indonesian fishing boats may fish 150 nm from the coast without a licence.`, T`Exclusive economic zone`], [T`Foreign warships need to follow the rules of innocent passage 8 nm from the coast.`, T`Territorial sea`], [T`Any country's ships may fish freely 300 nm from the coast.`, T`High seas`]]);
      return { q: T`In which zone does this apply? <i>${d}</i>`, a, w: [T`Territorial sea`, T`Contiguous zone`, T`Exclusive economic zone`, T`High seas`].filter(x => x !== a), only: 'mc', s: T`That is the <b>${a}</b>.` };
    },
    () => pick([
      { q: T`What did the Djuanda Declaration (1957) establish?`, a: T`The waters between Indonesia's islands are national waters`, w: [T`Indonesia's independence`, T`Three time zones`, T`Indonesia's membership of ASEAN`], only: 'mc', s: T`It replaced the colonial 3-mile rule with straight baselines around the whole archipelago.` },
      { q: T`Which international agreement recognises Indonesia as an archipelagic state?`, a: T`UNCLOS (1982)`, w: [T`The Kyoto Protocol`, T`The Bangkok Declaration`, T`The Paris Agreement`], only: 'mc', s: T`The UN Convention on the Law of the Sea, signed in 1982, adopted the archipelagic principle.` },
      { q: T`What is Wawasan Nusantara?`, a: T`The outlook that Indonesia's land, sea and air are one united whole`, w: [T`A national park`, T`A trade agreement with Malaysia`, T`A type of ship`], only: 'mc', s: T`It is Indonesia's geopolitical outlook: the seas unite the islands instead of dividing them.` },
      { q: T`Why did the International Court of Justice give Sipadan and Ligitan to Malaysia in 2002?`, a: T`Malaysia had administered the islands effectively`, w: [T`The islands are closer to Malaysia's capital`, T`Indonesia sold them`, T`The islands have no people`], only: 'mc', s: T`The court decided on "effective occupation": Malaysia had managed the islands, for example protecting turtles and building a lighthouse.` },
      { q: T`Why are outermost small islands such as Miangas important?`, a: T`They mark Indonesia's baselines and so its maritime zones`, w: [T`They are the largest islands`, T`They have the most people`, T`They are the capital's islands`], only: 'mc', s: T`Baselines are drawn between outermost points; losing an island can shrink the sea area.` },
    ]),
  ],
},
{
  id: 'development-levels', stage: 'sh', title: 'Developed & Developing Countries',
  blurb: 'How to tell developed from developing countries, income groups and GNI per capita, the structure of the economy and jobs, and the challenges and strengths of developing countries such as Indonesia.',
  lesson: () => T`
<p>Countries are often grouped as <b>developed</b> (such as Japan, Germany and Australia) or <b>developing</b> (such as Indonesia, India and Nigeria). There is no single dividing line; geographers compare many indicators.</p>
${Tbl([T`Indicator`, T`Developed countries`, T`Developing countries`], [[T`Income per person`, T`high`, T`low to middle`], [T`Main jobs`, T`services and industry`, T`farming and informal work, shifting to industry and services`], [T`Population growth`, T`slow or falling; ageing`, T`faster; young population`], [T`Life expectancy and literacy`, T`high`, T`lower`], [T`Technology and infrastructure`, T`advanced`, T`uneven`], [T`HDI`, T`very high`, T`medium to high`]])}
${FigW(incomeBandsSvg(), T`World Bank income groups by GNI per person (Atlas method, thresholds for 2024–25). Indonesia, at about US$4 870 in 2023, moved up to <b>upper-middle income</b>.`)}
${Key(T`<p><b>Gross national income per capita</b> is the total income of a country's people and firms divided by its population:</p><p>$$\text{GNI per capita} = \frac{\text{GNI}}{\text{population}}$$</p><p>The World Bank groups countries by it (in US dollars, 2024): <b>low income</b> up to 1 145, <b>lower-middle</b> 1 146 – 4 515, <b>upper-middle</b> 4 516 – 14 005 and <b>high income</b> above 14 005. Indonesia is <b>upper-middle income</b>, with about 4 900 dollars per person.</p>`)}
${FigW(barChartSvg([{ label: T`Agriculture`, value: 29, cls: 'g-s3', show: '29%' }, { label: T`Industry`, value: 22, cls: 'g-s2', show: '22%' }, { label: T`Services`, value: 49, cls: 'g-s1', show: '49%' }], { yMax: 60, yStep: 20, yl: T`% of workers`, label: T`A bar chart of Indonesia's workforce by sector: about 29 percent in agriculture, 22 percent in industry and 49 percent in services` }), T`Indonesia's workers by sector (about 2023). In developed countries farming employs only 1–5% and services 70–80%.`)}
${Tip(T`<p>As a country develops, workers move from <b>primary</b> activities (farming, fishing, mining) to <b>secondary</b> (manufacturing) and then <b>tertiary</b> (services) activities. Indonesia aims to become a developed, high-income country by 2045, the centenary of independence (<i>Indonesia Emas 2045</i>).</p>`)}`,
  gens: [
    () => {
      const G = pick([1300, 1400, 2500, 4000]) * 1e9, P = pick([270, 280]) * 1e6, pc = sig(G / P, 3);
      return { q: T`A country's gross national income is ${F(G / 1e9)} billion US dollars and its population is ${F(P / 1e6)} million. What is its GNI per capita, in dollars?`, a: pc, rtol: 0.02, w: [sig(G / P / 1000, 3), sig(P / G * 1e6, 3), sig(G / P * 10, 3)],
        s: T`$\frac{${M(G / 1e9)} \times 10^{9}}{${M(P / 1e6)} \times 10^{6}} = ${M(pc)}$ dollars.` };
    },
    () => {
      const v = pick([850, 2200, 3900, 4900, 9000, 13000, 25000, 48000]), a = v <= 1145 ? T`Low income` : v <= 4515 ? T`Lower-middle income` : v <= 14005 ? T`Upper-middle income` : T`High income`;
      return { q: T`A country's GNI per capita is ${F(v)} US dollars. Which World Bank income group is it in?`, a, w: [T`Low income`, T`Lower-middle income`, T`Upper-middle income`, T`High income`].filter(x => x !== a), only: 'mc', s: T`The limits are ${F(1145)}, ${F(4515)} and ${F(14005)} dollars, so it is <b>${a}</b>.` };
    },
    () => {
      const tot = pick([100, 140, 150]), f = pick([15, 25, 30, 40]), n = tot * f / 100;
      return { q: T`Of ${F(tot)} million workers in a country, ${F(n)} million work in agriculture. What percentage is that?`, a: f, u: '%', rtol: 0.01, w: [100 - f, sig(tot / n, 3), sig(n / (tot - n) * 100, 3)],
        s: T`$\frac{${M(n)}}{${M(tot)}} \times 100\% = ${M(f)}\%$.` };
    },
    () => {
      const [d, a] = pick([[T`Rice farming`, T`Primary`], [T`Coal mining`, T`Primary`], [T`Fishing`, T`Primary`], [T`A car factory`, T`Secondary`], [T`A textile mill`, T`Secondary`], [T`Banking`, T`Tertiary`], [T`Tourism and hotels`, T`Tertiary`], [T`Teaching`, T`Tertiary`]]);
      return { q: T`Which sector of the economy is this? <i>${d}</i>`, a, w: [T`Primary`, T`Secondary`, T`Tertiary`].filter(x => x !== a), only: 'mc', s: T`That is a <b>${a}</b> activity.` };
    },
    () => {
      const [d, a] = pick([[T`About 2% of workers in farming, an ageing population, a very high HDI`, T`Developed country`], [T`Many workers in farming, a young and fast-growing population, a medium HDI`, T`Developing country`], [T`Life expectancy over 82 years and nearly universal higher education`, T`Developed country`], [T`Much informal work and uneven access to electricity and clean water`, T`Developing country`]]);
      return { q: T`Is this more typical of a developed or a developing country? <i>${d}</i>`, a, w: [a === T`Developed country` ? T`Developing country` : T`Developed country`, T`Neither`], only: 'mc', s: T`These features are typical of a <b>${a}</b>.` };
    },
    () => pick([
      { q: T`What is Indonesia's goal for 2045 (Indonesia Emas)?`, a: T`To become a developed, high-income country`, w: [T`To leave the United Nations`, T`To stop all industry`, T`To have the world's largest population`], only: 'mc', s: T`2045 marks 100 years of independence; the plan aims for a high-income, developed Indonesia.` },
      { q: T`How does the structure of jobs usually change as a country develops?`, a: T`From primary to secondary and then tertiary activities`, w: [T`From services back to farming`, T`It never changes`, T`From industry to fishing`], only: 'mc', s: T`Rising productivity in farming frees workers for factories and later for services.` },
      { q: T`Which World Bank income group is Indonesia in?`, a: T`Upper-middle income`, w: [T`Low income`, T`Lower-middle income`, T`High income`], only: 'mc', s: T`With a GNI per capita of about 4 900 dollars, Indonesia is upper-middle income.` },
    ]),
  ],
},
{
  id: 'cooperation', stage: 'sh', title: 'Globalisation & International Cooperation',
  blurb: 'What globalisation is and its effects, international trade and the balance of trade, ASEAN and other organisations Indonesia belongs to, and the benefits of cooperation.',
  lesson: () => T`
<p><b>Globalisation</b> is the growing connection of the world's countries through flows of goods, money, people, information and culture, made faster by cheap transport and the internet. It brings wider markets, investment, jobs and new ideas, but also competition, dependence on other economies and threats to local culture.</p>
${Fig(donutSvg([{ label: T`China`, value: 25, show: '25%', cls: 'g-s2' }, { label: T`United States`, value: 9, show: '9%', cls: 'g-s1' }, { label: T`Japan`, value: 8, show: '8%', cls: 'g-s4' }, { label: T`India`, value: 8, show: '8%', cls: 'g-s3' }, { label: T`Others`, value: 50, show: '50%', cls: 'g-s6' }], { center: T`exports`, label: T`A donut chart of Indonesia's export partners around 2023: China 25 percent, United States 9, Japan 8, India 8 and others 50` }), T`Where Indonesia's exports go (about 2023). Coal, palm oil, nickel and steel are among the largest exports.`)}
${Key(T`<p>The <b>balance of trade</b> is exports minus imports:</p><p>$$\text{balance} = \text{exports} - \text{imports}$$</p><p>A positive balance is a <b>surplus</b>, a negative one a <b>deficit</b>. Countries trade because of differences in resources, climate, skills and technology: each can specialise in what it produces best.</p>`)}
${Fig(hubSvg(T`Indonesia`, [T`UN`, T`ASEAN`, T`G20`, T`APEC`, T`OIC`, T`WTO`], { label: T`Indonesia at the centre of international organisations: the UN, ASEAN, G20, APEC, OIC and WTO` }), T`Some of the organisations Indonesia belongs to.`)}
${Tbl([T`Organisation`, T`Founded`, T`Aim`], [[T`ASEAN`, T`1967, Bangkok Declaration`, T`peace, stability and economic growth in Southeast Asia; now 11 members with Timor-Leste`], [T`APEC`, T`1989`, T`free and open trade around the Pacific`], [T`G20`, T`1999`, T`the world's 20 largest economies coordinating economic policy; Indonesia hosted it in 2022`], [T`OIC`, T`1969`, T`cooperation among Muslim-majority countries`], [T`WTO`, T`1995`, T`rules for world trade`], [T`UN`, T`1945`, T`world peace, human rights and development; Indonesia joined in 1950`]])}
${Tip(T`<p>ASEAN was founded by five countries: <b>Indonesia, Malaysia, the Philippines, Singapore and Thailand</b>. Its secretariat is in Jakarta. The ASEAN Economic Community lets goods, services, investment and skilled workers move more freely between members.</p>`)}`,
  gens: [
    () => {
      const ex = pick([250, 260, 290, 180, 200]), im = pick([220, 230, 240, 210, 260]), b = ex - im;
      return { q: T`In a year a country exports ${F(ex)} billion dollars of goods and imports ${F(im)} billion dollars. What is its balance of trade, in billion dollars?`, a: b, rtol: 0, neg: true, w: [ex + im, im - ex === b ? b + 10 : im - ex, sig(ex / im, 3)],
        s: T`$${M(ex)} - ${M(im)} = ${M(b)}$ billion dollars: a ${b >= 0 ? T`surplus` : T`deficit`}.` };
    },
    () => {
      const tot = pick([250, 260, 290]), p = pick([20, 25, 10, 8]), v = sig(tot * p / 100, 3);
      return { q: T`A country's exports total ${F(tot)} billion dollars, and ${F(v)} billion go to one partner. What percentage of its exports is that?`, a: p, u: '%', rtol: 0.01, w: [100 - p, sig(tot / v, 3), sig(v / (tot - v) * 100, 3)],
        s: T`$\frac{${M(v)}}{${M(tot)}} \times 100\% = ${M(p)}\%$.` };
    },
    () => {
      const [d, a] = pick([[T`The Bangkok Declaration of 1967`, T`ASEAN`], [T`Cooperation among Muslim-majority countries`, T`OIC`], [T`The 20 largest economies, whose summit Indonesia hosted in Bali in 2022`, T`G20`], [T`Free and open trade among economies around the Pacific`, T`APEC`], [T`Setting the rules of world trade and settling trade disputes`, T`WTO`]]);
      return { q: T`Which organisation is this? <i>${d}</i>`, a, w: [T`ASEAN`, T`OIC`, T`G20`, T`APEC`, T`WTO`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Foreign companies build factories and create jobs.`, T`Positive effect`], [T`Local shops close because they cannot compete with cheap imports.`, T`Negative effect`], [T`Students can learn online from universities around the world.`, T`Positive effect`], [T`Local languages and traditions are replaced by global pop culture.`, T`Negative effect`], [T`Farmers can sell coffee to buyers in other continents.`, T`Positive effect`], [T`A crisis in one country quickly spreads to others.`, T`Negative effect`]]);
      return { q: T`Is this a positive or negative effect of globalisation? <i>${d}</i>`, a, w: [a === T`Positive effect` ? T`Negative effect` : T`Positive effect`, T`No effect`], only: 'mc', s: T`That is a <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Which five countries founded ASEAN in 1967?`, a: T`Indonesia, Malaysia, the Philippines, Singapore and Thailand`, w: [T`Indonesia, Vietnam, Laos, Cambodia and Myanmar`, T`Indonesia, Brunei, Japan, China and Korea`, T`Malaysia, Thailand, India, Australia and Singapore`], only: 'mc', s: T`Their foreign ministers signed the Bangkok Declaration on 8 August 1967.` },
      { q: T`Where is the ASEAN Secretariat?`, a: T`Jakarta`, w: [T`Bangkok`, T`Singapore`, T`Kuala Lumpur`], only: 'mc', s: T`The ASEAN Secretariat has been in Jakarta since 1976.` },
      { q: T`Why do countries trade with each other?`, a: T`They differ in resources, climate, skills and technology`, w: [T`All countries produce exactly the same goods`, T`Trade is required by the UN`, T`Only to use up their money`], only: 'mc', s: T`Each country can specialise in what it produces best and buy the rest.` },
      { q: T`What is a trade deficit?`, a: T`Imports are greater than exports`, w: [T`Exports are greater than imports`, T`A country trades with no one`, T`Exports equal imports`], only: 'mc', s: T`A negative balance of trade means a country buys more from abroad than it sells.` },
    ]),
  ],
},
  ],
});
