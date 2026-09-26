/* ==========================================================================
   TRACK G — Resources, Regions & Economy
   ========================================================================== */
level({
  id: 'regions', mark: 'G', name: 'Resources, Regions & Economy', short: 'Regions & Economy', band: 'Resources · location · cities', color: 'lv7',
  blurb: 'How people use the land: natural resources, where farms, industries and towns are located, how places interact, and how regions develop.',
  topics: [
{
  id: 'resources', stage: 'sh', title: 'Natural Resources',
  blurb: 'Kinds of natural resources, renewable and non-renewable, Indonesia’s mining, energy, forest and marine resources, reserves and how long they last, and sustainable use.',
  lesson: () => T`
<p>A <b>natural resource</b> is anything from nature that people use to meet their needs. Resources are grouped by <b>origin</b> (biotic from living things, abiotic from non-living things), by <b>renewability</b> and by <b>use</b> (energy, raw materials, food, space, scenery).</p>
${Tbl([T`Type`, T`Description`, T`Examples`], [[T`Renewable`, T`restored naturally in a human lifetime if used wisely`, T`forests, fish, soil, water, sunlight, wind`], [T`Non-renewable`, T`formed over millions of years; used up once taken`, T`oil, natural gas, coal, nickel, tin, gold`], [T`Perpetual (inexhaustible)`, T`never run out`, T`solar energy, wind, tides, geothermal heat`]])}
${Fig(donutSvg([{ label: T`Coal`, value: 40, show: '40%', cls: 'g-s6' }, { label: T`Oil`, value: 30, show: '30%', cls: 'g-s2' }, { label: T`Natural gas`, value: 16, show: '16%', cls: 'g-s4' }, { label: T`Renewables`, value: 14, show: '14%', cls: 'g-s3' }], { center: T`energy`, label: T`A donut chart of Indonesia's primary energy mix around 2023: coal about 40 percent, oil 30 percent, natural gas 16 percent and renewables 14 percent` }), T`Indonesia's primary energy mix around 2023 (approximate). The target is 23% renewables.`)}
${Tbl([T`Resource`, T`Where in Indonesia`], [[T`Oil and gas`, T`Riau, East Kalimantan, Natuna, the Java Sea, Papua (Tangguh)`], [T`Coal`, T`East and South Kalimantan, South Sumatra`], [T`Nickel`, T`Sulawesi (Morowali, Sorowako), North Maluku`], [T`Tin`, T`Bangka and Belitung`], [T`Copper and gold`, T`Papua (Grasberg), Sumbawa (Batu Hijau)`], [T`Bauxite`, T`Riau Islands, West Kalimantan`], [T`Geothermal`, T`along the volcanic arc: Kamojang, Dieng, Sarulla`]])}
${Key(T`<p><b>How long will it last?</b> For a non-renewable resource,</p><p>$$\text{years left} = \frac{\text{reserves}}{\text{production per year}}$$</p><p>This <b>reserve-to-production ratio</b> assumes production stays the same; new discoveries make it longer and rising demand shorter.</p>`)}
${Fig(planeSvg({ W: 340, H: 210, x: [0, 42], y: [0, 110], step: [5, 25], tickX: 10, xl: T`years`, yl: T`reserves`, fns: [{ f: t => 100 - 5 * t, to: 20, label: T`5/yr → 20 yr`, at: 12, dx: 10, dy: 4 }, { f: t => 100 - 2.5 * t, to: 40, cls: 'mf-c2', label: T`2.5/yr → 40 yr`, at: 26, dx: 8, dy: -4 }], label: T`Reserves of 100 units running out in 20 years at 5 units a year, or in 40 years at 2.5 units a year` }), T`The reserve-to-production ratio: 100 units last 20 years at 5 a year, but 40 years if production is halved (and longer still if new reserves are found).`)}
${Tip(T`<p><b>Sustainable use</b> means taking no more than nature can renew, saving and recycling non-renewables, and adding value at home: Indonesia now requires nickel ore to be processed into metal and battery materials in the country (downstreaming, <i>hilirisasi</i>) instead of being exported raw.</p>`)}`,
  gens: [
    () => {
      const R = pick([2400, 3000, 4500, 6000]), p = pick([60, 100, 150, 200]), y = sig(R / p, 3);
      return { q: T`A country has proven coal reserves of ${F(R)} million tonnes and mines ${F(p)} million tonnes a year. At this rate, how many years will the reserves last?`, a: y, u: 'years', rtol: 0.01, w: [sig(p / R * 100, 3), sig(R * p / 1000, 3), sig(R / p / 10, 3)],
        s: T`$\frac{${M(R)}}{${M(p)}} = ${M(y)}$ years.` };
    },
    () => {
      const tot = pick([200, 250, 300, 400]), sh = pick([10, 12, 15, 20, 25]), ren = tot * sh / 100;
      return { q: T`A region uses ${F(tot)} units of energy a year, of which ${F(ren)} come from renewable sources. What percentage is renewable?`, a: sh, u: '%', rtol: 0.01, w: [100 - sh, sig(tot / ren, 3), sig(ren / (tot - ren) * 100, 3)],
        s: T`$\frac{${M(ren)}}{${M(tot)}} \times 100\% = ${M(sh)}\%$.` };
    },
    () => {
      const [d, a] = pick([[T`Teak forest`, T`Renewable`], [T`Natural gas`, T`Non-renewable`], [T`Sunlight`, T`Perpetual`], [T`Nickel ore`, T`Non-renewable`], [T`Fish in the sea`, T`Renewable`], [T`Wind`, T`Perpetual`], [T`Coal`, T`Non-renewable`], [T`Groundwater`, T`Renewable`], [T`Tin`, T`Non-renewable`]]);
      return { q: T`How is this resource classified? <i>${d}</i>`, a, w: [T`Renewable`, T`Non-renewable`, T`Perpetual`].filter(x => x !== a), only: 'mc', s: T`${d} is <b>${a}</b>.` };
    },
    () => {
      const [r, a] = pick([[T`tin`, T`Bangka and Belitung`], [T`nickel`, T`Sulawesi (Morowali, Sorowako)`], [T`copper and gold`, T`Papua (Grasberg)`], [T`coal`, T`East and South Kalimantan`], [T`bauxite`, T`Riau Islands and West Kalimantan`], [T`liquefied natural gas`, T`Tangguh, West Papua`]]);
      return { q: T`Where is Indonesia's main source of <b>${r}</b>?`, a, w: [T`Bangka and Belitung`, T`Sulawesi (Morowali, Sorowako)`, T`Papua (Grasberg)`, T`East and South Kalimantan`, T`Riau Islands and West Kalimantan`, T`Tangguh, West Papua`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`The main source of ${r} is <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Why does Indonesia have so many geothermal power plants?`, a: T`It lies on a volcanic arc with hot rock near the surface`, w: [T`It has the most sunshine in the world`, T`It has large coal reserves`, T`It has very cold winters`], only: 'mc', s: T`The subduction zones that make Indonesia's volcanoes also heat underground water, holding about 40% of the world's geothermal potential.` },
      { q: T`What is downstreaming (hilirisasi) of minerals?`, a: T`Processing ores in Indonesia instead of exporting them raw`, w: [T`Moving mines closer to rivers`, T`Importing more raw ore`, T`Closing all mines`], only: 'mc', s: T`Smelting nickel into metal and battery materials at home adds value, jobs and export income.` },
      { q: T`Which is a sustainable way to use a forest?`, a: T`Selective logging and replanting`, w: [T`Clear-cutting and burning`, T`Converting it all to plantations`, T`Mining under it`], only: 'mc', s: T`Taking only some mature trees and replanting lets the forest regrow.` },
      { q: T`Which of these is a biotic resource?`, a: T`Forests and fish`, w: [T`Oil and coal`, T`Sand and gravel`, T`Wind and sunlight`], only: 'mc', s: T`Biotic resources come from living things; oil and coal are formed from ancient life but are classed as abiotic minerals.` },
    ]),
  ],
},
{
  id: 'agriculture', stage: 'sh', title: 'Agriculture & Land Use',
  blurb: 'Farming systems, food crops and plantations in Indonesia, productivity, von Thünen’s model of land rent and land use, and food security.',
  lesson: () => T`
<p><b>Agriculture</b> in the broad sense includes growing crops, raising livestock, fisheries and forestry. Farming systems differ by purpose (<b>subsistence</b> for the family or <b>commercial</b> for sale) and by how intensively the land is used.</p>
${Tbl([T`Type`, T`Description`, T`Indonesian example`], [[T`Wet-rice (sawah)`, T`irrigated, flooded terraces; very intensive`, T`Java, Bali (subak), North Sumatra`], [T`Dry fields (tegalan, ladang)`, T`rain-fed crops such as maize and cassava`, T`Nusa Tenggara, uplands of Java`], [T`Shifting cultivation`, T`clearing a plot, farming it a few years, then moving on`, T`parts of Kalimantan and Papua`], [T`Plantations`, T`large estates of one cash crop for export`, T`oil palm (Sumatra, Kalimantan), rubber, tea, coffee, sugar cane`], [T`Mixed gardens (pekarangan)`, T`many plants and animals around the house`, T`across Java`]])}
${FigW(terraceSvg(), T`<i>Sawah</i> terraces turn a steep slope into flat, flooded steps. They hold water and soil, cut erosion and let rice grow on hillsides, as in Bali's <i>subak</i> system.`)}
<h3>Von Thünen's model</h3>
${FigW(vonThunenSvg({ names: { z1: T`dairy and vegetables`, z2: T`forestry`, z3: T`grain`, z4: T`ranching`, city: T`city`, rent: T`land rent`, dist: T`distance from the city →` }, label: T`Von Thünen's rings around a city, with a graph of land rent against distance for each land use: the steepest line for perishable crops near the city, flatter lines for land uses further away` }), T`Von Thünen's rings. Each land use can pay the most rent in its own ring.`)}
${Key(T`<p>Johann Heinrich von Thünen (1826) imagined an isolated city on a flat, even plain. Farmers pay to carry goods to market, so the <b>land rent</b> a crop can pay falls with distance:</p><p>$$R = Y(p - c) - Y f d$$</p><p>with $Y$ the yield per hectare, $p$ the market price, $c$ the production cost, $f$ the transport cost per tonne per km and $d$ the distance. Perishable or bulky goods (milk, vegetables, and in his day firewood) are produced near the city; grain and livestock further out.</p>`)}
${Tip(T`<p><b>Productivity</b> = output ÷ land area (tonnes per hectare). Indonesia's rice yield is about 5 t/ha. Food security means everyone always has enough safe, nutritious food: it needs enough production, good distribution and affordable prices.</p>`)}`,
  gens: [
    () => {
      const Y = pick([4, 5, 6, 8]), p = pick([500, 600, 800]), c = pick([200, 300]), f = pick([2, 4, 5]), d = pick([10, 20, 30, 40]), R = Y * (p - c) - Y * f * d;
      return { q: T`Using von Thünen's formula $R = Y(p - c) - Y f d$, find the land rent per hectare for a crop with yield ${Q(Y, 't/ha')}, price ${F(p)} and production cost ${F(c)} per tonne, and transport cost ${F(f)} per tonne per km, grown ${Q(d, 'km')} from the market.`, a: R, rtol: 0.01, neg: true, w: [Y * (p - c), Y * (p - c) - f * d, Y * (p - c) + Y * f * d],
        s: T`$R = ${Y}(${M(p)} - ${M(c)}) - ${Y} \times ${f} \times ${d} = ${M(Y * (p - c))} - ${M(Y * f * d)} = ${M(R)}$.` };
    },
    () => {
      const Y = pick([4, 5, 6, 8]), p = pick([500, 600, 800]), c = pick([200, 300]), f = pick([2, 4, 5]), d = sig((p - c) / f, 3);
      return { q: T`A crop yields ${Q(Y, 't/ha')}, sells for ${F(p)} per tonne and costs ${F(c)} per tonne to grow. Transport costs ${F(f)} per tonne per km. Beyond what distance does growing it earn no rent at all?`, a: d, u: 'km', rtol: 0.01, w: [sig(p / f, 3), sig((p - c) * Y / f / 10, 3), sig((p + c) / f, 3)],
        s: T`Rent is zero when $p - c = f d$: $d = \frac{${M(p)} - ${M(c)}}{${f}} = ${QT(d, 'km')}$.` };
    },
    () => {
      const A = pick([2, 5, 10, 20, 40]), y = pick([4.5, 5, 5.5, 6, 7]), P = sig(A * y, 3);
      return { q: T`A farmer harvests ${Q(P, 't')} of rice from ${Q(A, 'ha')}. What is the productivity?`, a: y, u: 't/ha', rtol: 0.01, w: [sig(A / P, 3), sig(P * A, 3), sig(P / A * 10, 3)],
        s: T`$\frac{${M(P)}}{${M(A)}} = ${QT(y, 't/ha')}$.` };
    },
    () => {
      const [d, a] = pick([[T`Fresh milk and vegetables that spoil quickly`, T`Ring 1: dairy and vegetables`], [T`Firewood and timber, bulky and heavy to carry (in von Thünen's time)`, T`Ring 2: forestry`], [T`Wheat and other grain that keep well`, T`Ring 3: grain`], [T`Cattle that can walk to market themselves`, T`Ring 4: ranching`]]);
      return { q: T`In von Thünen's model, where would this be produced? <i>${d}</i>${FigW(vonThunenSvg({ names: { z1: T`dairy and vegetables`, z2: T`forestry`, z3: T`grain`, z4: T`ranching`, city: T`city`, rent: T`land rent`, dist: T`distance from the city →` }, label: T`Von Thünen's rings` }))}`, a, w: [T`Ring 1: dairy and vegetables`, T`Ring 2: forestry`, T`Ring 3: grain`, T`Ring 4: ranching`].filter(x => x !== a), only: 'mc', s: T`<b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Flooded, terraced fields of rice watered by irrigation canals`, T`Wet-rice (sawah)`], [T`A large estate growing oil palm for export`, T`Plantation`], [T`Clearing a patch of forest, farming it for a few years, then moving on`, T`Shifting cultivation`], [T`Rain-fed maize and cassava on dry upland fields`, T`Dry fields (tegalan)`], [T`Fruit trees, vegetables and chickens around a house`, T`Mixed garden (pekarangan)`]]);
      return { q: T`Which farming system is this? <i>${d}</i>`, a, w: [T`Wet-rice (sawah)`, T`Plantation`, T`Shifting cultivation`, T`Dry fields (tegalan)`, T`Mixed garden (pekarangan)`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => pick([
      { q: T`In von Thünen's model, why does land rent fall with distance from the city?`, a: T`Transport costs to the market increase`, w: [T`The soil gets poorer`, T`It rains less`, T`Prices are higher far away`], only: 'mc', s: T`All land is assumed equal; only the cost of carrying goods to market changes with distance.` },
      { q: T`What is subak in Bali?`, a: T`A traditional community system for sharing irrigation water`, w: [T`A type of oil palm`, T`A kind of fishing boat`, T`A dry-field crop`], only: 'mc', s: T`Subak, recognised by UNESCO, is the farmers' organisation that shares water fairly among rice terraces.` },
      { q: T`Which is a problem of oil-palm plantations?`, a: T`Forest and peat clearance and loss of habitat`, w: [T`They produce too little oil`, T`They need no land`, T`They grow only in deserts`], only: 'mc', s: T`Palm oil earns export income, but expansion has cleared forests and drained peatlands.` },
    ]),
  ],
},
{
  id: 'industry-location', stage: 'sh', title: 'Industry & Its Location',
  blurb: 'Kinds of industry, the factors that decide where it is located, Weber’s least-cost theory and the material index, the location quotient, and industrial estates in Indonesia.',
  lesson: () => T`
<p><b>Industry</b> turns raw materials or parts into goods of higher value. It is classified by raw material (agricultural, mining, forestry), by product (light or heavy), by size (by the number of workers) and by stage (<b>upstream</b> industries make basic materials such as steel or cement; <b>downstream</b> industries make finished goods).</p>
${Tbl([T`Size (BPS)`, T`Workers`], [[T`Household industry`, '1–4'], [T`Small industry`, '5–19'], [T`Medium industry`, '20–99'], [T`Large industry`, T`100 or more`]])}
<h3>Where industries locate</h3>
<p>The main factors are raw materials, the market, labour, transport, energy and water, capital, government policy and <b>agglomeration</b> (firms clustering to share suppliers, workers and services).</p>
${FigW(weberSvg({ names: { m1: T`Raw material 1`, m2: T`Raw material 2`, k: T`Market`, p: T`least-cost location` }, label: T`Weber's location triangle with two raw-material sources and a market at the corners and the least-cost location inside, pulled towards the heavier raw material` }), T`Weber's triangle. The factory is pulled towards whichever corner costs most to transport from.`)}
${Key(T`<p><b>Weber's least-cost theory</b> (1909): a factory is located where the total cost of transport (of raw materials in and products out) is lowest. The <b>material index</b> decides the pull:</p><p>$$MI = \frac{\text{weight of localised raw materials}}{\text{weight of the finished product}}$$</p><p>If $MI > 1$ the materials lose weight in processing (cement, smelting, sugar), so the industry is <b>raw-material oriented</b>. If $MI < 1$ the product gains weight or is fragile (drinks, bread), so it is <b>market oriented</b>. If $MI = 1$ it is <b>footloose</b>: it can locate anywhere.</p>`)}
${FigW(materialIndexSvg(), T`The material index (weight of raw materials ÷ weight of product) decides the pull: above 1 the factory moves towards the raw material (R), below 1 towards the market (M).`)}
${Tip(T`<p>The <b>location quotient</b> shows whether a region specialises in an industry: $LQ = \frac{e_i / e}{E_i / E}$, where $e_i$ and $e$ are the region's jobs in that industry and in total, and $E_i$ and $E$ the same for the country. $LQ > 1$ means the region has more than its share: a basic, exporting sector. Indonesia's industrial estates include Cikarang and Karawang (West Java), Batam, and the Morowali nickel park.</p>`)}`,
  gens: [
    () => {
      const w = pick([2, 5, 10]), mi = pick([0.5, 0.8, 1, 1.5, 2, 3, 4]), m = sig(w * mi, 3), a = mi > 1 ? T`Near the raw materials` : mi < 1 ? T`Near the market` : T`Footloose (anywhere)`;
      return { q: T`Making ${Q(w, 't')} of a product uses ${Q(m, 't')} of localised raw materials. Work out the material index. Where should the factory be located?`, a, w: [T`Near the raw materials`, T`Near the market`, T`Footloose (anywhere)`].filter(x => x !== a), only: 'mc',
        s: T`$MI = \frac{${M(m)}}{${M(w)}} = ${M(mi)}$. ${mi > 1 ? T`Greater than 1: materials lose weight, so locate near them.` : mi < 1 ? T`Less than 1: the product is heavier, so locate near the market.` : T`Equal to 1: the industry is footloose.`}` };
    },
    () => {
      const w = pick([2, 4, 5, 10]), mi = pick([0.6, 1.5, 2, 2.5, 3]), m = sig(w * mi, 3);
      return { q: T`A factory needs ${Q(m, 't')} of localised raw materials to make ${Q(w, 't')} of product. What is the material index?`, a: mi, rtol: 0.01, w: [sig(w / m, 3), sig(m - w, 3), sig(m * w, 3)],
        s: T`$MI = \frac{${M(m)}}{${M(w)}} = ${M(mi)}$.` };
    },
    () => {
      const e = pick([200, 400, 500]) * 1000, share = pick([10, 15, 20, 30]), E = 100, S = pick([8, 10, 12]), ei = e * share / 100, lq = sig(share / S, 3);
      return { q: T`In a province, ${F(ei)} of its ${F(e)} workers are in manufacturing. Nationally, ${S}% of all workers are in manufacturing. What is the location quotient for manufacturing?`, a: lq, rtol: 0.02, w: [sig(S / share, 3), sig(share - S, 3), sig(share / 100, 3)],
        s: T`$LQ = \frac{${M(ei)} / ${M(e)}}{${M(S / 100)}} = \frac{${M(share / 100)}}{${M(S / 100)}} = ${M(lq)}$. ${lq > 1 ? T`More than 1: the province specialises in manufacturing.` : T`Not more than 1: no specialisation.`}` };
    },
    () => {
      const [d, a] = pick([[T`A cement plant beside a limestone quarry`, T`Raw materials`], [T`A soft-drink bottling plant in a big city`, T`Market`], [T`A garment factory in a town with many low-wage workers`, T`Labour`], [T`An aluminium smelter next to a hydroelectric dam (Asahan)`, T`Energy`], [T`Many car-part makers clustered around car assembly plants in Karawang`, T`Agglomeration`], [T`A shipyard on a deep harbour`, T`Transport`]]);
      return { q: T`Which location factor mainly explains this? <i>${d}</i>`, a, w: [T`Raw materials`, T`Market`, T`Labour`, T`Energy`, T`Agglomeration`, T`Transport`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`The main factor is <b>${a}</b>.` };
    },
    () => {
      const n = pick([3, 12, 45, 150, 800]), a = n < 5 ? T`Household industry` : n < 20 ? T`Small industry` : n < 100 ? T`Medium industry` : T`Large industry`;
      return { q: T`A firm employs ${n} workers. Which size class is it in (BPS)?`, a, w: [T`Household industry`, T`Small industry`, T`Medium industry`, T`Large industry`].filter(x => x !== a), only: 'mc', s: T`1–4 household, 5–19 small, 20–99 medium, 100 or more large: <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Why are smelters usually built close to mines?`, a: T`The ore loses most of its weight when processed`, w: [T`Metal is lighter than ore, so it must stay near customers`, T`Mines have the most workers`, T`Smelters need no energy`], only: 'mc', s: T`Carrying tonnes of waste rock is expensive; it is cheaper to extract the metal near the mine and ship the lighter product.` },
      { q: T`What is an upstream industry?`, a: T`One that makes basic materials such as steel or cement`, w: [T`One that sells directly to shoppers`, T`One located on a river`, T`A household industry`], only: 'mc', s: T`Upstream industries process raw materials into basic inputs that downstream industries use.` },
      { q: T`What does agglomeration give firms?`, a: T`Shared suppliers, skilled workers and services`, w: [T`Cheaper land far from others`, T`No competition`, T`Freedom from all taxes`], only: 'mc', s: T`Clustering lowers costs: suppliers, workers, banks and infrastructure are all close at hand.` },
    ]),
  ],
},
{
  id: 'central-places', stage: 'sh', title: 'Central Places & Service Areas',
  blurb: 'Christaller’s central place theory: threshold and range, the hierarchy of settlements, hexagonal market areas and the k = 3 system, and the rank-size rule.',
  lesson: () => T`
<p>A <b>central place</b> is a settlement that provides goods and services to the people around it. Walter Christaller (1933), studying southern Germany, asked why towns are the sizes they are and spaced as they are.</p>
${Key(T`<p><b>Threshold</b>: the minimum number of customers a service needs to survive. <b>Range</b>: the maximum distance people will travel to use it. A service can exist only where its range covers at least its threshold. Everyday <b>low-order</b> goods (a small shop, a primary school) have a low threshold and short range; <b>high-order</b> goods (a university, a specialist hospital, a shopping mall) have a high threshold and long range.</p>`)}
${FigW(christallerSvg({ names: { city: T`city (high order)`, town: T`town (middle order)`, village: T`village (low order)` }, label: T`Christaller's model: small hexagonal market areas around many villages, larger hexagons around six towns, and the largest hexagon around one city` }), T`Christaller's hexagonal market areas (k = 3). Hexagons fill the plain without gaps or overlaps.`)}
${FigW(thresholdRangeSvg(), T`A service survives only if its range (how far people will travel) reaches enough people to meet its threshold.`)}
<p>Each town serves the equivalent of three village areas, and each city three town areas: this is the <b>marketing principle</b>, $k = 3$. So there are always more small places than big ones. Christaller also described $k = 4$ (the transport principle, places along roads) and $k = 7$ (the administrative principle).</p>
${Tip(T`<p>The <b>rank-size rule</b> says the $n$th largest city has about $\frac{1}{n}$ of the population of the largest: $P_n = \frac{P_1}{n}$. When the largest city is far bigger than this, it is a <b>primate city</b>, like Jakarta or Bangkok. The <b>primacy index</b> is $\frac{P_1}{P_2}$.</p>`)}`,
  gens: [
    () => {
      const n = pick([1, 2, 3]), k = 3, low = k ** n;
      return { q: T`In Christaller's $k = 3$ system, each higher-order market area contains the equivalent of 3 market areas of the next lower order. How many village-sized market areas fit in a market area ${n} levels higher than a village?`, a: low, rtol: 0, w: [3 * n, 6 * n, 3 ** (n + 1)],
        s: T`$3^{${n}} = ${low}$.` };
    },
    () => {
      const P1 = pick([10, 8, 6, 12]) * 1000000, n = pick([2, 3, 4, 5, 8, 10]), Pn = sig(P1 / n, 3);
      return { q: T`The largest city in a country has ${F(P1)} people. According to the rank-size rule, about how many people live in the city ranked number ${n}?`, a: Pn, rtol: 0.01, w: [sig(P1 / n ** 2, 3), sig(P1 - P1 / n, 3), sig(P1 * n / 10, 3)],
        s: T`$P_{${n}} = \frac{${M(P1)}}{${n}} = ${M(Pn)}$.` };
    },
    () => {
      const P1 = pick([10.6, 9, 8.2]) * 1000000, P2 = pick([2.9, 3.0, 2.5]) * 1000000, pi = sig(P1 / P2, 3);
      return { q: T`The largest city has ${F(P1)} people and the second largest ${F(P2)}. What is the primacy index?`, a: pi, rtol: 0.02, w: [sig(P2 / P1, 3), sig(P1 - P2, 3) / 1000000, sig((P1 + P2) / P2, 3)],
        s: T`$\frac{${M(P1)}}{${M(P2)}} = ${M(pi)}$. ${pi > 2 ? T`Well above 2: a primate city.` : T`Close to 2: as the rank-size rule expects.`}` };
    },
    () => {
      const pop = pick([500, 800, 1000, 2000]), thr = pick([400, 1500, 2500, 6000]), ok = pop * 3 >= thr;
      return { q: T`A service needs at least ${F(thr)} customers (its threshold). Within its range live the people of three villages of ${F(pop)} each. Can the service survive there?`, a: ok ? T`Yes: the range covers the threshold` : T`No: the threshold is not reached`, w: [ok ? T`No: the threshold is not reached` : T`Yes: the range covers the threshold`, T`It depends only on the range`], only: 'mc',
        s: T`Customers in range: $3 \times ${M(pop)} = ${M(3 * pop)}$, ${ok ? T`at least` : T`less than`} the threshold of ${F(thr)}.` };
    },
    () => {
      const [d, a] = pick([[T`A small grocery shop (warung)`, T`Low order`], [T`A university`, T`High order`], [T`A primary school`, T`Low order`], [T`A cancer hospital`, T`High order`], [T`An international airport`, T`High order`], [T`A village health post (posyandu)`, T`Low order`]]);
      return { q: T`Is this a low-order or high-order service? <i>${d}</i>`, a, w: [a === T`Low order` ? T`High order` : T`Low order`, T`No order`], only: 'mc', s: a === T`Low order` ? T`Used often, low threshold, short range: <b>low order</b>.` : T`Used rarely, high threshold, long range: <b>high order</b>.` };
    },
    () => pick([
      { q: T`What is the threshold of a service?`, a: T`The minimum number of customers it needs to survive`, w: [T`The furthest distance people will travel to it`, T`The price of the service`, T`The size of its building`], only: 'mc', s: T`Threshold is the minimum demand; range is the maximum distance.` },
      { q: T`Why did Christaller use hexagons for market areas?`, a: T`They fill a plain completely without gaps or overlaps`, w: [T`Towns are always hexagon-shaped`, T`Hexagons are the smallest shape`, T`Roads always meet at 60°`], only: 'mc', s: T`Circles would leave gaps or overlap; hexagons are the closest to circles that tile a plane.` },
      { q: T`Which assumption did Christaller make?`, a: T`A flat, even plain with people spread evenly`, w: [T`Mountains between all towns`, T`Only one town in the country`, T`People always shop at the furthest town`], only: 'mc', s: T`His model assumed an isotropic plain, equal transport in all directions and people using the nearest centre.` },
    ]),
  ],
},
{
  id: 'spatial-interaction', stage: 'sh', title: 'Spatial Interaction',
  blurb: 'Ullman’s conditions for interaction, the gravity model, Reilly’s breaking point between two towns, network connectivity, and the effects of interaction between places.',
  lesson: () => T`
<p><b>Spatial interaction</b> is the movement of people, goods, money and information between places: commuting, trade, phone calls, tourism. Edward Ullman named three conditions that make it happen.</p>
${Tbl([T`Condition`, T`Meaning`, T`Example`], [[T`Complementarity`, T`one place has what another needs`, T`vegetables from the highlands, factory goods from the city`], [T`Intervening opportunity`, T`a closer place that offers the same thing reduces interaction`, T`a new market town between a village and the city`], [T`Transferability`, T`goods and people can actually be moved at a reasonable cost`, T`a new toll road or bridge`]])}
${Key(T`<p><b>The gravity model</b>: interaction grows with the size of the two places and falls with the square of the distance between them,</p><p>$$I_{AB} = k\,\frac{P_A\,P_B}{d_{AB}^{\,2}}$$</p><p><b>Reilly's breaking point</b> is where the pull of two towns is equal. Measured from town B,</p><p>$$BP = \frac{d_{AB}}{1 + \sqrt{P_A / P_B}}$$</p><p>so the breaking point lies closer to the smaller town.</p>`)}
${Fig(planeSvg({ W: 340, H: 210, x: [0, 5.2], y: [0, 1.1], step: [1, 0.25], tickY: 0.5, fmtY: v => (v === 1 ? 'I' : ''), xl: 'd', yl: 'I', fns: [{ f: d => 1 / (d * d), from: 0.96 }], pts: [[1, 1, 'I', 'start', false, 8, -4], [2, 0.25, 'I/4', 'start', false, 8, -6], [4, 1 / 16, 'I/16', 'start', false, 8, -8]], label: T`Interaction falling with the square of distance: a quarter at twice the distance, a sixteenth at four times` }), T`The gravity model: double the distance and interaction falls to a quarter; four times the distance, to a sixteenth.`)}
${FigW(breakingPointSvg({ pa: 400000, pb: 100000, d: 90, names: { bp: T`breaking point`, a: 'A', b: 'B' }, label: T`Two towns 90 km apart, A with 400 000 people and B with 100 000; the breaking point lies 30 km from B` }), T`With 4 times as many people, A's pull reaches twice as far: the breaking point is 30 km from B and 60 km from A.`)}
${Tip(T`<p><b>Network connectivity</b> is measured with the <b>beta index</b> $\beta = \frac{e}{v}$ (edges, i.e. roads, divided by vertices, i.e. places). Below 1 the network is a tree or a simple chain; above 1 it has circuits and many alternative routes. Interaction brings trade, jobs and ideas, but also traffic, the spread of disease and a brain drain from villages.</p>`)}`,
  gens: [
    () => {
      const pa = pick([100000, 200000, 400000, 900000]), pb = pick([25000, 50000, 100000]), d = pick([30, 45, 60, 90, 120]), bp = sig(d / (1 + Math.sqrt(pa / pb)), 3);
      return { q: T`Town A has ${F(pa)} people and town B ${F(pb)}; they are ${Q(d, 'km')} apart. How far from B is the breaking point?${FigW(breakingPointSvg({ pa, pb, d, names: { bp: '?', a: 'A', b: 'B' }, label: T`Two towns and the breaking point between them` }))}`, a: bp, u: 'km', rtol: 0.02, w: [sig(d / 2, 3), sig(d - bp, 3), sig(d / (1 + pa / pb), 3)],
        s: T`$BP = \frac{${M(d)}}{1 + \sqrt{${M(pa)} / ${M(pb)}}} = \frac{${M(d)}}{1 + ${M(sig(Math.sqrt(pa / pb), 3))}} = ${QT(bp, 'km')}$ from B.` };
    },
    () => {
      const pa = pick([2, 4, 5]) * 100000, pb = pick([1, 2, 3]) * 100000, pc = pick([1, 3, 6]) * 100000, dab = pick([20, 30, 40]), dac = pick([40, 60, 80]), iab = pa * pb / dab ** 2, iac = pa * pc / dac ** 2, a = iab > iac ? 'B' : 'C';
      return { q: T`City A (${F(pa)} people) interacts with town B (${F(pb)} people, ${Q(dab, 'km')} away) and town C (${F(pc)} people, ${Q(dac, 'km')} away). Using the gravity model, which town has the stronger interaction with A?`, a, w: [a === 'B' ? 'C' : 'B', T`They are equal`], only: 'mc',
        s: T`$I_{AB} \propto \frac{${M(pa)} \times ${M(pb)}}{${dab}^2} = ${M(sig(iab, 3))}$ and $I_{AC} \propto \frac{${M(pa)} \times ${M(pc)}}{${dac}^2} = ${M(sig(iac, 3))}$, so it is <b>${a}</b>.` };
    },
    () => {
      const k = pick([2, 3, 4]);
      return { q: T`Two towns stay the same size, but a new road makes the travel distance between them ${k} times shorter. By what factor does the gravity model say their interaction increases?`, a: k * k, rtol: 0, w: [k, 2 * k, k ** 3],
        s: T`Interaction is proportional to $\frac{1}{d^2}$, so dividing $d$ by ${k} multiplies it by $${k}^2 = ${k * k}$.` };
    },
    () => {
      const v = pick([5, 6, 8, 10]), e = v + pick([-1, 0, 2, 4]), b = sig(e / v, 3);
      return { q: T`A road network links ${v} towns with ${e} roads. What is its beta index?`, a: b, rtol: 0.01, w: [sig(v / e, 3), e - v, sig(e / (3 * (v - 2)), 3)],
        s: T`$\beta = \frac{e}{v} = \frac{${e}}{${v}} = ${M(b)}$. ${b < 1 ? T`Below 1: a simple, poorly connected network.` : b > 1 ? T`Above 1: the network has circuits and alternative routes.` : T`Exactly 1: a single circuit.`}` };
    },
    () => {
      const [d, a] = pick([[T`Highland farmers sell vegetables to the city and buy factory goods there.`, T`Complementarity`], [T`A new market opens in a nearby town, so villagers no longer travel to the city to shop.`, T`Intervening opportunity`], [T`The Suramadu bridge makes it cheap to carry goods between Surabaya and Madura.`, T`Transferability`], [T`A coastal area has fish and an inland area has rice, so they trade.`, T`Complementarity`]]);
      return { q: T`Which of Ullman's conditions does this show? <i>${d}</i>`, a, w: [T`Complementarity`, T`Intervening opportunity`, T`Transferability`].filter(x => x !== a), only: 'mc', s: T`That shows <b>${a}</b>.` };
    },
    () => pick([
      { q: T`In the gravity model, what happens to interaction if the distance doubles?`, a: T`It falls to a quarter`, w: [T`It halves`, T`It doubles`, T`It stays the same`], only: 'mc', s: T`Interaction depends on $\frac{1}{d^2}$: doubling $d$ divides it by 4.` },
      { q: T`Why does the breaking point lie closer to the smaller town?`, a: T`The larger town attracts people from further away`, w: [T`Small towns have more shops`, T`Roads are shorter near small towns`, T`It always lies exactly halfway`], only: 'mc', s: T`A bigger population means more services and a stronger pull, so its trade area reaches further.` },
      { q: T`Which is a negative effect of more interaction between a village and a city?`, a: T`Young, educated people leave the village`, w: [T`Villagers get new ideas`, T`Village products reach the market`, T`Better access to hospitals`], only: 'mc', s: T`Better links bring many benefits, but can also drain a village of its skilled young people.` },
    ]),
  ],
},
{
  id: 'rural-urban', stage: 'sh', title: 'Villages & Cities',
  blurb: 'Village patterns and types, the classification of villages, what makes a city, city structure models (Burgess, Hoyt, Harris–Ullman), and links between villages and cities.',
  lesson: () => T`
<p>A <b>village</b> (<i>desa</i>) is a settlement where most people work in farming or other primary activities, the population is small and social ties are close. A <b>city</b> has many people at high density, mostly in industry and services, with a wide range of facilities.</p>
${FigW(`<div class="g-row">${[['linear', T`Linear: along a road, river or coast`], ['clustered', T`Clustered: around a centre, on fertile lowland`], ['dispersed', T`Dispersed: scattered, on poor or hilly land`], ['circular', T`Circular: around a lake or field`]].map(([k, t]) => `<div>${settlementSvg(k, { label: t })}<div class="g-cap">${t}</div></div>`).join('')}</div>`, T`Village patterns follow the land: roads and rivers, fertile plains, rugged hills.`)}
${Tbl([T`Village type (by development)`, T`Features`], [[T`Swadaya (traditional)`, T`isolated, depends on nature, simple farming, few facilities`], [T`Swakarya (transitional)`, T`some outside influence, new ways of farming, some roads and schools`], [T`Swasembada (developed)`, T`good roads and facilities, varied jobs, strong links with cities`]])}
<h3>How cities are arranged</h3>
${FigW(`<div class="g-row">${[['burgess', T`Concentric zones (Burgess)`], ['hoyt', T`Sectors (Hoyt)`], ['harris', T`Multiple nuclei (Harris and Ullman)`]].map(([k, t]) => `<div>${cityModelSvg(k, { label: t })}<div class="g-cap">${t}</div></div>`).join('')}</div>`, T`1 central business district (CBD); 2 transition zone and light industry; 3 low-income housing; 4 middle-income housing; 5 high-income housing or commuter zone; 6 heavy industry; 7 outlying business district; 8 residential suburb; 9 industrial suburb.`)}
${Key(T`<p><b>Burgess</b> (1925) saw a city growing outwards in rings from the CBD, the richest living furthest out. <b>Hoyt</b> (1939) noted that land uses spread in <b>sectors</b> along roads and railways. <b>Harris and Ullman</b> (1945) showed that big cities grow around <b>several nuclei</b>: an old centre, an industrial area, a port, a university. Large Indonesian cities such as Jakarta fit the multiple-nuclei model best.</p>`)}
${Tip(T`<p>Villages and cities depend on each other: villages supply food, raw materials and workers; cities supply manufactured goods, services, jobs and markets. The <b>rural–urban fringe</b> at the edge of a city mixes both, and changes fast as farmland becomes housing (suburbanisation).</p>`)}`,
  gens: [
    () => {
      const k = pick(['linear', 'clustered', 'dispersed', 'circular']), a = { linear: T`Linear`, clustered: T`Clustered`, dispersed: T`Dispersed`, circular: T`Circular` }[k];
      return { q: T`Which settlement pattern is shown?${Fig(settlementSvg(k, { label: T`A village seen from above` }))}`, a, w: [T`Linear`, T`Clustered`, T`Dispersed`, T`Circular`].filter(x => x !== a), only: 'mc', s: T`This is a <b>${a}</b> pattern.` };
    },
    () => {
      const k = pick(['burgess', 'hoyt', 'harris']), a = { burgess: T`Concentric zones (Burgess)`, hoyt: T`Sectors (Hoyt)`, harris: T`Multiple nuclei (Harris and Ullman)` }[k];
      return { q: T`Which model of city structure is this?${Fig(cityModelSvg(k, { label: T`A model of city structure` }))}`, a, w: [T`Concentric zones (Burgess)`, T`Sectors (Hoyt)`, T`Multiple nuclei (Harris and Ullman)`].filter(x => x !== a), only: 'mc', s: T`It is the <b>${a}</b> model.` };
    },
    () => {
      const [d, a] = pick([[T`Houses stretch along both sides of a main road on a narrow ridge`, T`Linear`], [T`Houses crowd together around a village centre on a fertile plain`, T`Clustered`], [T`Houses are far apart on steep, dry limestone hills`, T`Dispersed`], [T`Houses are built in a ring around a lake`, T`Circular`]]);
      return { q: T`Which settlement pattern is this? <i>${d}</i>`, a, w: [T`Linear`, T`Clustered`, T`Dispersed`, T`Circular`].filter(x => x !== a), only: 'mc', s: T`That is a <b>${a}</b> pattern.` };
    },
    () => {
      const [d, a] = pick([[T`Isolated, depends on nature, few facilities and simple farming methods`, T`Swadaya`], [T`Starting to adopt new farming methods; has a dirt road and a primary school`, T`Swakarya`], [T`Good roads, varied jobs, a market, health centre and strong links to the city`, T`Swasembada`]]);
      return { q: T`Which type of village is this? <i>${d}</i>`, a, w: [T`Swadaya`, T`Swakarya`, T`Swasembada`].filter(x => x !== a), only: 'mc', s: T`That is a <b>${a}</b> village.` };
    },
    () => {
      const P = pick([2000, 4000, 6000]), f = pick([55, 70, 80, 30, 20]), a = f >= 50 ? T`Mostly rural` : T`Mostly urban`;
      return { q: T`In a settlement of ${F(P)} people, ${f}% of workers are farmers. Is its character mostly rural or mostly urban?`, a, w: [f >= 50 ? T`Mostly urban` : T`Mostly rural`, T`Neither`], only: 'mc', s: f >= 50 ? T`Most people work in agriculture: a rural (village) character.` : T`Most people work outside agriculture: an urban character.` };
    },
    () => pick([
      { q: T`What is the CBD?`, a: T`The central business district, the commercial heart of a city`, w: [T`A type of village`, T`A farming zone`, T`An industrial suburb`], only: 'mc', s: T`The CBD has the highest land values, offices, shops and banks, and the best accessibility.` },
      { q: T`In Burgess's model, where do the richest people live?`, a: T`Furthest from the centre, in the commuter zone`, w: [T`In the CBD`, T`In the transition zone`, T`Next to the factories`], only: 'mc', s: T`Wealthier households can afford to commute and choose larger, quieter plots at the edge.` },
      { q: T`What happens in the rural–urban fringe?`, a: T`Farmland is converted into housing and industry`, w: [T`Cities become villages`, T`All land becomes forest`, T`Nothing changes`], only: 'mc', s: T`The fringe is where city and countryside meet and land use changes fastest.` },
      { q: T`Why does Jakarta fit the multiple-nuclei model?`, a: T`It grew around several centres: the old town, the port, business districts and industrial estates`, w: [T`It is a perfect circle`, T`It has only one centre`, T`It has no industry`], only: 'mc', s: T`Big metropolitan areas develop several specialised centres rather than one.` },
    ]),
  ],
},
{
  id: 'regional-development', stage: 'sh', title: 'Regional Development',
  blurb: 'What a region is and kinds of regions, growth centres and core–periphery, measuring development with GRDP and growth rates, Rostow’s stages, and development planning in Indonesia.',
  lesson: () => T`
<p>A <b>region</b> is an area of the Earth's surface that is set apart by some common features. A <b>formal (uniform) region</b> shares a feature throughout, such as a climate or a rice-growing area. A <b>functional (nodal) region</b> is linked to a centre, like the commuting area of a city. An <b>administrative region</b> has legal borders: province, regency, district.</p>
${Fig(hubSvg(T`Growth centre`, [T`Industry`, T`Jobs`, T`Services`, T`Transport`, T`Hinterland`], { label: T`A growth centre linked to industry, jobs, services, transport and its hinterland` }), T`A growth centre drives development in its surrounding hinterland.`)}
${Key(T`<p><b>Growth centre theory</b> (Perroux): development starts in a few leading places and industries and spreads out. The <b>spread effect</b> carries growth to the hinterland (markets for farm goods, jobs, ideas); the <b>backwash effect</b> drains it (young workers, capital and trade move to the centre). Friedmann's <b>core–periphery</b> model describes the resulting gap between a rich core and a poorer periphery.</p>`)}
${Fig(barChartSvg([1, 2, 3, 4, 5].map(i => ({ label: String(i), value: i, show: '', cls: ['g-s6', 'g-s5', 'g-s4', 'g-s3', 'g-s1'][i - 1] })), { yMax: 5, yStep: 0, grid: false, values: false, label: T`Rostow's five stages of growth as a rising staircase` }), T`Rostow's stages of growth: 1 traditional society; 2 preconditions for take-off; 3 take-off; 4 drive to maturity; 5 age of high mass consumption.`)}
<h3>Measuring development</h3>
<p><b>Gross regional domestic product</b> (GRDP, <i>PDRB</i>) is the value of all goods and services produced in a region in a year. Dividing by the population gives GRDP <b>per capita</b>, and comparing years gives the <b>economic growth rate</b>:</p>
${Key(T`<p>$$g = \frac{Y_t - Y_{t-1}}{Y_{t-1}} \times 100\%$$</p><p>where $Y_t$ is the GRDP in year $t$.</p>`)}
${Tip(T`<p>Indonesia plans development through the national long- and medium-term plans (RPJPN, RPJMN), special economic zones (KEK) such as Mandalika and Sei Mangkei, and the move of the capital to Nusantara (IKN) in East Kalimantan, intended to spread growth beyond Java.</p>`)}`,
  gens: [
    () => {
      const g0 = pick([200, 250, 400, 500]), r = pick([3, 4, 5, 5.5, 6, 7]), g1 = sig(g0 * (1 + r / 100), 4);
      return { q: T`A province's GRDP rose from ${F(g0)} trillion rupiah to ${F(g1)} trillion rupiah in one year. What was its economic growth rate?`, a: r, u: '%', rtol: 0.02, w: [sig(g1 - g0, 3), sig((g1 - g0) / g1 * 100, 3) === r ? sig(r + 1, 3) : sig((g1 - g0) / g1 * 100, 3), sig(g1 / g0, 3)],
        s: T`$\frac{${M(g1)} - ${M(g0)}}{${M(g0)}} \times 100\% = ${M(r)}\%$.` };
    },
    () => {
      const G = pick([120, 300, 450, 600]), P = pick([2, 3, 5, 6]), pc = sig(G / P, 3);
      return { q: T`A province has a GRDP of ${F(G)} trillion rupiah and ${F(P)} million people. What is its GRDP per capita, in million rupiah?`, a: pc, rtol: 0.01, w: [sig(G * P, 3), sig(P / G, 3), sig(G / P / 10, 3)],
        s: T`$\frac{${M(G)} \times 10^{12}}{${M(P)} \times 10^{6}} = ${M(pc)} \times 10^{6}$ rupiah, that is ${F(pc)} million rupiah per person.` };
    },
    () => {
      const [d, a] = pick([[T`The area where Indonesia's rice is grown in irrigated fields`, T`Formal region`], [T`The area from which people commute into Surabaya each day`, T`Functional region`], [T`The Province of Central Java`, T`Administrative region`], [T`The area with a tropical monsoon climate`, T`Formal region`], [T`The area served by a port's trade`, T`Functional region`]]);
      return { q: T`What kind of region is this? <i>${d}</i>`, a, w: [T`Formal region`, T`Functional region`, T`Administrative region`].filter(x => x !== a), only: 'mc', s: T`It is a <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`A new factory in the city buys fruit from nearby farms.`, T`Spread effect`], [T`Young, educated villagers move to the city for jobs.`, T`Backwash effect`], [T`Investors put their money in the city instead of in the villages.`, T`Backwash effect`], [T`Technology and new ideas reach the villages from the city.`, T`Spread effect`]]);
      return { q: T`Is this a spread effect or a backwash effect of a growth centre? <i>${d}</i>`, a, w: [a === T`Spread effect` ? T`Backwash effect` : T`Spread effect`, T`Neither`], only: 'mc', s: a === T`Spread effect` ? T`Growth flows out to the hinterland: a <b>spread effect</b>.` : T`Resources flow into the centre: a <b>backwash effect</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Mostly farming with traditional methods; little change from year to year`, T`Traditional society`], [T`Investment rises sharply and new industries grow fast`, T`Take-off`], [T`Most people can afford cars and many consumer goods`, T`Age of high mass consumption`], [T`Education and infrastructure improve and a business class appears`, T`Preconditions for take-off`], [T`Industry becomes more varied and technology spreads through the economy`, T`Drive to maturity`]]);
      return { q: T`Which of Rostow's stages of growth is this? <i>${d}</i>`, a, w: [T`Traditional society`, T`Preconditions for take-off`, T`Take-off`, T`Drive to maturity`, T`Age of high mass consumption`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => pick([
      { q: T`What is one aim of moving Indonesia's capital to Nusantara (IKN)?`, a: T`To spread development beyond Java`, w: [T`To make Java more crowded`, T`To move closer to Australia`, T`To stop all development in Kalimantan`], only: 'mc', s: T`A new capital in East Kalimantan is meant to reduce the pressure on Jakarta and to create a growth centre outside Java.` },
      { q: T`What is a special economic zone (KEK)?`, a: T`An area with special incentives to attract investment`, w: [T`A national park`, T`A zone where no one may live`, T`A region with its own currency`], only: 'mc', s: T`KEKs such as Mandalika and Sei Mangkei offer tax breaks and infrastructure to draw industry and tourism.` },
      { q: T`In Friedmann's model, what is the periphery?`, a: T`The less developed area around a rich core`, w: [T`The richest part of a country`, T`The capital city`, T`The main port`], only: 'mc', s: T`Capital, skills and power concentrate in the core; the periphery supplies resources and labour and lags behind.` },
    ]),
  ],
},
  ],
});
