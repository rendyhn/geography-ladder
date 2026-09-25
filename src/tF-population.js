/* ==========================================================================
   TRACK F — Population
   ========================================================================== */
level({
  id: 'population', mark: 'F', name: 'Population', short: 'Population', band: 'Growth · structure · migration', color: 'lv6',
  blurb: 'People on the planet: how populations grow, their age and sex structure, migration, the demographic transition and the quality of life.',
  topics: [
{
  id: 'population-growth', stage: 'sh', title: 'Population Growth',
  blurb: 'Sources of population data, births, deaths and migration, crude rates, the growth rate and doubling time, projections, and population density in Indonesia.',
  lesson: () => T`
<p>Population data come from a <b>census</b> (a count of everyone, every ten years in Indonesia; the latest in 2020), <b>surveys</b> such as SUPAS and SUSENAS, and <b>registration</b> of births, deaths and moves. Indonesia is the world's fourth most populous country.</p>
${FigW(lineChartSvg([{ pts: [[1961, 97.1], [1971, 119.2], [1980, 147.5], [1990, 179.4], [2000, 206.3], [2010, 237.6], [2020, 270.2]], cls: 'g-l1', dots: true, label: T`Indonesia`, at: 5, dy: -12 }], { xMin: 1960, xMax: 2020, xStep: 10, yMin: 0, yMax: 300, yStep: 50, yl: T`millions`, label: T`A line chart of Indonesia's population in each census from 97 million in 1961 to 270 million in 2020` }), T`Indonesia's population in each census, in millions.`)}
<h3>Why a population changes</h3>
<p>A population grows by <b>births</b> (B) and <b>immigration</b> (I) and shrinks by <b>deaths</b> (D) and <b>emigration</b> (E). Births minus deaths is <b>natural increase</b>; immigration minus emigration is <b>net migration</b>.</p>
${Key(T`<p><b>Crude rates</b> are per 1 000 people per year:</p><p>$$\text{CBR} = \frac{B}{P} \times 1000, \qquad \text{CDR} = \frac{D}{P} \times 1000$$</p><p>The <b>growth rate</b> in percent is $r = \frac{(B - D) + (I - E)}{P} \times 100\%$. A population growing at $r$ percent a year follows the geometric formula</p><p>$$P_t = P_0\,(1 + r)^t$$</p><p>and doubles in about $\frac{70}{r}$ years (the rule of 70, with $r$ in percent).</p>`)}
${Fig(hbarSvg([{ label: T`Java`, value: 1180 }, { label: T`Bali and Nusa Tenggara`, value: 180 }, { label: T`Sumatra`, value: 125 }, { label: T`Sulawesi`, value: 105 }, { label: T`Kalimantan`, value: 30 }, { label: T`Maluku and Papua`, value: 14 }], { unit: T` /km²`, label: T`A bar chart of population density by island group: Java about 1 180 people per square kilometre, far above all others; Papua and Maluku about 14` }), T`Population density by island group (about 2020, people per km²). More than half of all Indonesians live on Java, which is only 7% of the land.`)}
${Tip(T`<p><b>Arithmetic density</b> = population ÷ total area. <b>Physiological density</b> = population ÷ farmland area. <b>Agrarian density</b> = farmers ÷ farmland area: a high agrarian density means small farms and pressure on the land, as on Java.</p>`)}`,
  gens: [
    () => {
      const P = pick([200000, 400000, 500000, 800000, 1000000]), cbr = pick([16, 18, 20, 22, 25]), B = P * cbr / 1000;
      return { q: T`A province has ${F(P)} people and ${F(B)} babies are born in a year. What is its crude birth rate (per 1 000)?`, a: cbr, rtol: 0.01, w: [sig(B / P * 100, 3), sig(B / P, 3), sig(P / B, 3)],
        s: T`$\text{CBR} = \frac{${M(B)}}{${M(P)}} \times 1000 = ${M(cbr)}$ per 1 000.` };
    },
    () => {
      const cbr = pick([18, 20, 24, 28, 32]), cdr = pick([6, 7, 8, 10]), r = sig((cbr - cdr) / 10, 3);
      return { q: T`A country has a crude birth rate of ${cbr} and a crude death rate of ${cdr} per 1 000. Ignoring migration, what is its natural growth rate in percent?`, a: r, u: '%', rtol: 0.01, w: [cbr - cdr, sig((cbr + cdr) / 10, 3), sig((cbr - cdr) / 100, 3)],
        s: T`$\frac{${cbr} - ${cdr}}{1000} \times 100\% = ${M(r)}\%$.` };
    },
    () => {
      const P0 = pick([100, 150, 200, 250]), r = pick([1, 1.5, 2, 2.5, 3]), t = pick([5, 10, 15, 20]), Pt = sig(P0 * (1 + r / 100) ** t, 3);
      return { q: T`A city has ${F(P0)} thousand people and grows at ${NUM(r)}% a year. Using $P_t = P_0(1 + r)^t$, what will its population be after ${t} years (in thousands)?`, a: Pt, rtol: 0.02, w: [sig(P0 * (1 + r * t / 100), 3) === Pt ? sig(Pt + 5, 3) : sig(P0 * (1 + r * t / 100), 3), sig(P0 * (1 + r) ** t / 10 ** t, 3) === Pt ? sig(Pt - 7, 3) : sig(P0 * r * t, 3), sig(P0 * (1 + r / 100) ** (t - 1), 3)],
        s: T`$P_{${t}} = ${M(P0)} \times ${M(1 + r / 100)}^{${t}} = ${M(Pt)}$ thousand.` };
    },
    () => {
      const r = pick([0.7, 1, 1.4, 2, 2.5, 3.5]), d = sig(70 / r, 3);
      return { q: T`A population grows at ${NUM(r)}% a year. About how many years will it take to double?`, a: d, u: 'years', rtol: 0.02, w: [sig(100 / r, 3), sig(70 * r, 3), sig(50 / r, 3)],
        s: T`Rule of 70: $\frac{70}{${M(r)}} \approx ${M(d)}$ years.` };
    },
    () => {
      const P = pick([500000, 1200000, 2400000]), A = pick([250, 400, 800, 1200]), which = chance(), farm = sig(A * pick([0.3, 0.4, 0.5]), 3), d = sig(P / (which ? A : farm), 3);
      return { q: which ? T`A district of ${Q(A, 'km²')} has ${F(P)} people. What is its arithmetic population density, in people per km²?` : T`A district has ${F(P)} people and ${Q(farm, 'km²')} of farmland. What is its physiological density, in people per km²?`, a: d, rtol: 0.02, w: [sig(which ? A / P : farm / P, 3), sig(P / A / 10, 3) === d ? sig(d * 2, 3) : sig(P / A / 10, 3), sig(P / (which ? farm : A), 3)],
        s: T`$\frac{${M(P)}}{${M(which ? A : farm)}} = ${M(d)}$ people per km².` };
    },
    () => {
      const P = pick([10000, 20000, 50000]), B = pick([300, 400, 500]), D = pick([100, 150, 200]), I = pick([200, 400, 600]), E = pick([100, 300, 500]), r = sig((B - D + I - E) / P * 100, 3);
      return { q: T`A town of ${F(P)} people has ${B} births, ${D} deaths, ${I} people moving in and ${E} moving out in a year. What is its total growth rate in percent?`, a: r, u: '%', rtol: 0.02, neg: true, w: [sig((B - D) / P * 100, 3) === r ? sig(r + 1, 3) : sig((B - D) / P * 100, 3), sig((B + D + I + E) / P * 100, 3), sig((B - D + I - E) / P * 1000, 3)],
        s: T`$\frac{(${B} - ${D}) + (${I} - ${E})}{${M(P)}} \times 100\% = ${M(r)}\%$.` };
    },
    () => pick([
      { q: T`How often does Indonesia hold a population census?`, a: T`Every ten years`, w: [T`Every year`, T`Every five years`, T`Every fifty years`], only: 'mc', s: T`Censuses are held in years ending in 0 (1961 was the first after independence, then 1971, 1980 and every ten years to 2020).` },
      { q: T`Which island holds more than half of Indonesia's population?`, a: T`Java`, w: [T`Sumatra`, T`Kalimantan`, T`Papua`], only: 'mc', s: T`Java has about 56% of the people on only about 7% of the land, because of its fertile volcanic soils and long history as the centre of government and trade.` },
      { q: T`What is natural increase?`, a: T`Births minus deaths`, w: [T`Immigrants minus emigrants`, T`Births plus immigrants`, T`Deaths minus births`], only: 'mc', s: T`Natural increase ignores migration: it is simply births minus deaths.` },
      { q: T`What does a high agrarian density tell us?`, a: T`Many farmers share little farmland`, w: [T`The land is empty`, T`Most people live in cities`, T`Farms are very large`], only: 'mc', s: T`Agrarian density is farmers per unit of farmland; when it is high, farms are small and the land is under pressure.` },
    ]),
  ],
},
{
  id: 'population-structure', stage: 'sh', title: 'Population Structure',
  blurb: 'Population pyramids and their three shapes, the sex ratio, the dependency ratio, Indonesia’s demographic bonus, and grouping people by age, work and education.',
  lesson: () => T`
<p>The <b>structure</b> of a population is how it is divided by age, sex, work, education and other features. The quickest picture is a <b>population pyramid</b>: bars for each five-year age group, males on the left and females on the right.</p>
${FigW(pyramidSvg(['0–4', '5–9', '10–14', '15–19', '20–24', '25–29', '30–34', '35–39', '40–44', '45–49', '50–54', '55–59', '60–64', '65–69', '70–74', '75+'], [4.3, 4.4, 4.4, 4.3, 4.2, 4.0, 3.9, 3.8, 3.6, 3.3, 2.9, 2.5, 2.0, 1.5, 1.0, 0.8], [4.1, 4.2, 4.2, 4.1, 4.0, 3.9, 3.8, 3.8, 3.6, 3.3, 3.0, 2.6, 2.1, 1.6, 1.2, 1.1], { mLabel: T`Male`, fLabel: T`Female`, label: T`A population pyramid of Indonesia around 2020: wide at the young and working ages, narrowing steadily above age 50` }), T`Indonesia's population pyramid around 2020 (approximate, % of total). The base is no longer widening: births have fallen.`)}
${Tbl([T`Shape`, T`Also called`, T`What it shows`, T`Example`], [[T`Wide base, narrow top`, T`expansive (young)`, T`high births, many children, short lives`, T`Niger, Papua in the past`], [T`Straight sides`, T`stationary`, T`births and deaths both low and balanced`, T`Sweden`], [T`Narrow base, wider middle`, T`constrictive (old)`, T`very low births, an ageing population`, T`Japan`]])}
${Key(T`<p><b>Sex ratio</b> = number of males per 100 females:</p><p>$$SR = \frac{M}{F} \times 100$$</p><p><b>Dependency ratio</b> = how many young and old people each 100 people of working age must support:</p><p>$$DR = \frac{P_{0\text{–}14} + P_{65+}}{P_{15\text{–}64}} \times 100$$</p>`)}
${Tip(T`<p>When the dependency ratio falls below about 50, a country has a <b>demographic bonus</b>: many workers and relatively few dependants. Indonesia is in this window roughly from 2012 to 2035. It becomes a benefit only if the workers are healthy, educated and have jobs.</p>`)}`,
  gens: [
    () => {
      const F0 = pick([100000, 200000, 500000]), sr = pick([96, 98, 101, 102, 104, 105]), Mm = F0 * sr / 100;
      return { q: T`A regency has ${F(Mm)} males and ${F(F0)} females. What is its sex ratio?`, a: sr, rtol: 0.01, w: [sig(F0 / Mm * 100, 3), sig(Mm / (Mm + F0) * 100, 3), sig(Mm / F0, 3)],
        s: T`$SR = \frac{${M(Mm)}}{${M(F0)}} \times 100 = ${M(sr)}$ males per 100 females.` };
    },
    () => {
      const y = pick([24, 26, 28, 30, 35, 40]), o = pick([5, 6, 7, 9, 12, 20]), w = 100 - y - o, P = pick([1, 2, 5]) * 1000000, dr = sig((y + o) / w * 100, 3);
      return { q: T`In a population of ${F(P)}, ${y}% are aged 0–14, ${w}% are 15–64 and ${o}% are 65 or older. What is the dependency ratio?`, a: dr, rtol: 0.02, w: [y + o, sig(w / (y + o) * 100, 3), sig(y / w * 100, 3)],
        s: T`$DR = \frac{${y} + ${o}}{${w}} \times 100 = ${M(dr)}$. ${dr < 50 ? T`It is below 50: a demographic bonus.` : T`Each 100 workers support ${F(Math.round(dr))} dependants.`}` };
    },
    () => {
      const young = pick([60, 80, 90]) * 1000, old = pick([10, 15, 20]) * 1000, work = pick([180, 200, 240]) * 1000, dr = sig((young + old) / work * 100, 3);
      return { q: T`A city has ${F(young)} people aged 0–14, ${F(work)} aged 15–64 and ${F(old)} aged 65 and over. Calculate its dependency ratio.`, a: dr, rtol: 0.02, w: [sig(work / (young + old) * 100, 3), sig(young / work * 100, 3), sig((young + old) / (young + old + work) * 100, 3)],
        s: T`$\frac{${M(young)} + ${M(old)}}{${M(work)}} \times 100 = ${M(dr)}$.` };
    },
    () => {
      const k = pick(['exp', 'con', 'sta']), G = ['0–9', '10–19', '20–29', '30–39', '40–49', '50–59', '60–69', '70+'];
      const D = { exp: [16, 13, 10, 7.5, 5.5, 3.8, 2.4, 1.2], con: [4, 5, 6, 7, 7.5, 7.8, 7, 5.5], sta: [6.4, 6.4, 6.4, 6.3, 6.2, 6, 5.7, 4.8] }[k].map(v => v / 2);
      const a = k === 'exp' ? T`Expansive: high birth rate, young population` : k === 'con' ? T`Constrictive: low birth rate, ageing population` : T`Stationary: low, balanced births and deaths`;
      return { q: T`What does this population pyramid show?${Fig(pyramidSvg(G, D, D.map(v => v * 1.02), { mLabel: T`Male`, fLabel: T`Female`, label: T`A population pyramid` }))}`, a, w: [T`Expansive: high birth rate, young population`, T`Constrictive: low birth rate, ageing population`, T`Stationary: low, balanced births and deaths`].filter(x => x !== a), only: 'mc',
        s: k === 'exp' ? T`A wide base narrowing quickly upwards: many children, <b>expansive</b>.` : k === 'con' ? T`The base is narrower than the middle: fewer births, <b>constrictive</b>.` : T`Nearly straight sides: <b>stationary</b>.` };
    },
    () => pick([
      { q: T`What is a demographic bonus?`, a: T`A period when the working-age population is large compared with dependants`, w: [T`A payment for having children`, T`A time when many old people retire`, T`A rise in the birth rate`], only: 'mc', s: T`With a dependency ratio below about 50, there are many workers to support few dependants: a chance to grow the economy.` },
      { q: T`A sex ratio of 104 means…`, a: T`104 males for every 100 females`, w: [T`104 females for every 100 males`, T`104 births per 1 000 people`, T`4% of people are male`], only: 'mc', s: T`Sex ratio is males per 100 females.` },
      { q: T`Which age group counts as productive (working age) in the dependency ratio?`, a: T`15–64`, w: [T`0–14`, T`18–60`, T`65 and over`], only: 'mc', s: T`People aged 15–64 are counted as working age; 0–14 and 65+ as dependants.` },
      { q: T`Why might a city have a sex ratio well above 100?`, a: T`Many young men move there for work`, w: [T`More girls are born there`, T`Women live longer`, T`It has many retired people`], only: 'mc', s: T`Mining towns and industrial cities often attract male migrant workers, raising the sex ratio.` },
    ]),
  ],
},
{
  id: 'migration', stage: 'sh', title: 'Migration & Urbanisation',
  blurb: 'Kinds of migration, push and pull factors and Lee’s model, net migration, transmigration and commuting in Indonesia, and urbanisation and its effects.',
  lesson: () => T`
<p><b>Migration</b> is the movement of people from one place to another to live. It can be <b>international</b> (emigration and immigration) or <b>internal</b>, within one country. Short, repeated moves without changing home are called <b>circulation</b>: <b>commuting</b> (<i>nglaju</i>, travelling to work and back each day) and <b>seasonal</b> moves (<i>mondok</i>, staying away for weeks or months).</p>
${FigW(pushPullSvg({ names: { origin: T`Origin`, dest: T`Destination`, move: T`migration`, obst: T`obstacles: distance, cost, rules`, push: T`+ pull  − push  0 neutral` }, label: T`Lee's model: an origin and a destination each with plus, minus and neutral factors, and a migration arrow crossing wavy obstacles between them` }), T`Lee's push–pull model: people weigh the good (+) and bad (−) of both places and the obstacles between them.`)}
${Tbl([T`Push factors (at the origin)`, T`Pull factors (at the destination)`], [[T`few jobs, low wages`, T`jobs and higher wages`], [T`small or no land to farm`, T`schools, universities and hospitals`], [T`disasters, conflict`, T`safety and better services`], [T`few facilities`, T`city lifestyle and entertainment`]])}
<h3>Migration in Indonesia</h3>
${Tbl([T`Type`, T`Meaning`], [[T`Urbanisation`, T`moving from villages to cities; also the growth of the urban share of the population`], [T`Transmigration`, T`a government programme moving people from crowded Java, Bali and Madura to less populated islands`], [T`Ruralisation`, T`moving from cities back to villages`], [T`Emigration of workers`, T`Indonesian migrant workers (PMI) going abroad, for example to Malaysia, Saudi Arabia and Taiwan`]])}
${Key(T`<p><b>Net migration</b> = immigrants − emigrants. The <b>net migration rate</b> is per 1 000 people:</p><p>$$\text{NMR} = \frac{I - E}{P} \times 1000$$</p><p>The <b>level of urbanisation</b> is the urban population as a percentage of the total; for Indonesia it passed 50% around 2010 and is about 57% today.</p>`)}
${Tip(T`<p>Urbanisation brings jobs and services but, when it is too fast, also slums, traffic jams, pollution, floods and a shortage of housing and clean water. Rural areas can lose their young workers. Developing small towns and villages spreads growth more evenly.</p>`)}`,
  gens: [
    () => {
      const I = pick([1200, 2500, 4000, 8000]), E = pick([900, 1500, 3000, 6000]), n = I - E;
      return { q: T`In a year ${F(I)} people move into a district and ${F(E)} move out. What is the net migration?`, a: n, rtol: 0, neg: true, w: [I + E, E - I === n ? n + 100 : E - I, sig((I + E) / 2, 3)],
        s: T`Net migration $= ${M(I)} - ${M(E)} = ${M(n)}$${n < 0 ? T`: more people leave than arrive.` : T`: a net gain.`}` };
    },
    () => {
      const P = pick([200000, 500000, 800000]), I = pick([6000, 9000, 12000]), E = pick([2000, 4000, 5000]), r = sig((I - E) / P * 1000, 3);
      return { q: T`A city of ${F(P)} people gains ${F(I)} immigrants and loses ${F(E)} emigrants in a year. What is its net migration rate per 1 000?`, a: r, rtol: 0.02, w: [sig((I - E) / P * 100, 3), sig((I + E) / P * 1000, 3), I - E],
        s: T`$\frac{${M(I)} - ${M(E)}}{${M(P)}} \times 1000 = ${M(r)}$ per 1 000.` };
    },
    () => {
      const P = pick([2, 4, 5, 10]) * 1000000, u = pick([35, 45, 55, 60, 72]), U = P * u / 100;
      return { q: T`A province has ${F(P)} people, of whom ${F(U)} live in urban areas. What is its level of urbanisation?`, a: u, u: '%', rtol: 0.01, w: [100 - u, sig(U / (P - U) * 100, 3), sig(P / U, 3)],
        s: T`$\frac{${M(U)}}{${M(P)}} \times 100\% = ${M(u)}\%$.` };
    },
    () => {
      const [d, a] = pick([[T`Every day Pak Budi rides from his village to a factory in the city and returns home in the evening.`, T`Commuting`], [T`A family from Central Java is resettled by the government on farmland in Kalimantan.`, T`Transmigration`], [T`Villagers work on building sites in Jakarta for three months and then go home for the harvest.`, T`Seasonal migration`], [T`A young graduate moves permanently from a village to Surabaya.`, T`Urbanisation`], [T`A retired couple leaves the city to live in their home village.`, T`Ruralisation`], [T`A nurse from Indonesia goes to work in Japan for several years.`, T`Emigration`]]);
      return { q: T`What kind of movement is this? <i>${d}</i>`, a, w: [T`Commuting`, T`Transmigration`, T`Seasonal migration`, T`Urbanisation`, T`Ruralisation`, T`Emigration`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Few jobs in the village`, T`Push factor`], [T`Good universities in the city`, T`Pull factor`], [T`Frequent floods at home`, T`Push factor`], [T`Higher wages in the industrial estate`, T`Pull factor`], [T`Farmland too small to feed the family`, T`Push factor`], [T`Better hospitals in the city`, T`Pull factor`], [T`The high cost of moving far away`, T`Obstacle`]]);
      return { q: T`In Lee's model, what is this for a young villager thinking of moving to a city? <i>${d}</i>`, a, w: [T`Push factor`, T`Pull factor`, T`Obstacle`].filter(x => x !== a), only: 'mc', s: T`It is a <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Which is a negative effect of rapid urbanisation on cities?`, a: T`Slums, traffic jams and a shortage of clean water`, w: [T`More farmland in the city`, T`Fewer people needing jobs`, T`Cleaner rivers`], only: 'mc', s: T`When cities grow faster than housing and services, slums, congestion and pollution follow.` },
      { q: T`What is the main aim of transmigration?`, a: T`To spread the population more evenly across Indonesia`, w: [T`To move people to other countries`, T`To make Java more crowded`, T`To stop people commuting`], only: 'mc', s: T`Transmigration moved people from crowded Java, Bali and Madura to islands such as Sumatra, Kalimantan, Sulawesi and Papua.` },
      { q: T`What is the effect of urbanisation on the villages that people leave?`, a: T`They lose many young workers`, w: [T`They become more crowded`, T`They gain new factories`, T`Their birth rate rises`], only: 'mc', s: T`Young adults leave first, so villages may be left with children and elderly people.` },
    ]),
  ],
},
{
  id: 'demographic-transition', stage: 'sh', title: 'The Demographic Transition',
  blurb: 'The five stages of the demographic transition model, why birth and death rates fall, where Indonesia and other countries are today, and population policy.',
  lesson: () => T`
<p>The <b>demographic transition model</b> (DTM) describes how birth and death rates change as a country develops, and what that does to its population.</p>
${FigW(dtmSvg({ names: { stage: T`Stage`, birth: T`birth rate`, death: T`death rate`, pop: T`total population`, gap: T`natural increase`, yl: T`rate per 1 000 per year`, xl: T`time →` }, label: T`The demographic transition model: birth and death rates both high in stage 1, death rate falls in stage 2, birth rate falls in stage 3, both low in stage 4, birth rate below death rate in stage 5; total population rises through stages 2 and 3` }), T`The five stages. The shaded gap between the lines is natural increase.`)}
${Tbl([T`Stage`, T`Birth rate`, T`Death rate`, T`Growth`, T`Why`], [
  [T`1. High stationary`, T`high`, T`high`, T`very slow`, T`disease, famine, no health care`],
  [T`2. Early expanding`, T`high`, T`falling fast`, T`very fast`, T`better food, clean water, vaccines`],
  [T`3. Late expanding`, T`falling`, T`low`, T`slowing`, T`family planning, education of women, city life, fewer child deaths`],
  [T`4. Low stationary`, T`low`, T`low`, T`very slow`, T`small families by choice`],
  [T`5. Declining`, T`very low`, T`low, rising slightly`, T`shrinking`, T`an ageing population, costly child raising`]])}
${Key(T`<p><b>Natural increase</b> in percent is $\frac{\text{CBR} - \text{CDR}}{10}$, with both rates per 1 000. Indonesia (CBR about 16, CDR about 7) is late in <b>stage 3</b>. Japan and Italy are in stage 5; Niger and Chad are still in stage 2.</p>`)}
${Tip(T`<p><b>Population policy.</b> Indonesia's family-planning programme (<i>Keluarga Berencana</i>, KB, run by BKKBN since 1970) cut the average number of children per woman (the <b>total fertility rate</b>) from about 5.6 to about 2.2. Countries in stage 5, such as Japan and South Korea, now pay families to have more children.</p>`)}`,
  gens: [
    () => {
      const [b, d, st] = pick([[40, 38, 1], [42, 36, 1], [42, 20, 2], [40, 16, 2], [28, 9, 3], [22, 8, 3], [12, 10, 4], [11, 9, 4], [8, 11, 5], [7, 12, 5]]);
      const a = T`Stage ${st}`;
      return { q: T`A country has a crude birth rate of ${b} and a crude death rate of ${d} per 1 000. Which stage of the demographic transition is it most likely in?${FigW(dtmSvg({ names: { stage: T`Stage`, birth: T`birth rate`, death: T`death rate`, pop: T`total population`, gap: T`natural increase`, yl: T`rate per 1 000 per year`, xl: T`time →` }, label: T`The demographic transition model` }))}`, a, w: [1, 2, 3, 4, 5].filter(x => x !== st).sort(() => rng() - 0.5).slice(0, 3).map(x => T`Stage ${x}`), only: 'mc',
        s: st === 1 ? T`Both rates high and close together: stage 1.` : st === 2 ? T`Birth rate still high but death rate already low: the fast growth of stage 2.` : st === 3 ? T`Birth rate falling towards a low death rate: stage 3.` : st === 4 ? T`Both rates low and close: stage 4.` : T`Death rate above birth rate: the population shrinks, stage 5.` };
    },
    () => {
      const b = pick([16, 18, 22, 30, 38]), d = pick([6, 7, 8, 9, 12]), r = sig((b - d) / 10, 3);
      return { q: T`CBR is ${b} and CDR is ${d} per 1 000. What is the natural increase in percent a year?`, a: r, u: '%', rtol: 0.01, w: [b - d, sig((b - d) / 100, 3), sig((b + d) / 10, 3)],
        s: T`$\frac{${b} - ${d}}{10} = ${M(r)}\%$ a year.` };
    },
    () => {
      const st = pick([1, 2, 3, 4, 5]);
      return { q: T`Look at the highlighted stage of the model. What is happening to the population there?${FigW(dtmSvg({ mark: st - 1, names: { stage: T`Stage`, birth: T`birth rate`, death: T`death rate`, pop: T`total population`, gap: T`natural increase`, yl: T`rate per 1 000 per year`, xl: T`time →` }, label: T`The demographic transition model with one stage highlighted` }))}`,
        a: [T`Slow growth: both rates high`, T`Very fast growth: death rate falls, birth rate stays high`, T`Growth slowing: birth rate falling`, T`Very slow growth: both rates low`, T`Shrinking: births below deaths`][st - 1],
        w: [T`Slow growth: both rates high`, T`Very fast growth: death rate falls, birth rate stays high`, T`Growth slowing: birth rate falling`, T`Very slow growth: both rates low`, T`Shrinking: births below deaths`].filter((_, i) => i !== st - 1).sort(() => rng() - 0.5).slice(0, 3), only: 'mc',
        s: T`Stage ${st} is highlighted.` };
    },
    () => pick([
      { q: T`Why does the death rate fall in stage 2?`, a: T`Better food, clean water, medicine and vaccines`, w: [T`Families choose to have fewer children`, T`People move to cities`, T`The population gets older`], only: 'mc', s: T`Improvements in health and food supply cut deaths, especially of children, long before families shrink.` },
      { q: T`Why does the birth rate fall in stage 3?`, a: T`Family planning, education of women and fewer child deaths`, w: [T`More diseases`, T`Wars and famine`, T`Less contraception`], only: 'mc', s: T`When children survive, women study and work, and contraception is available, families choose to have fewer children.` },
      { q: T`What is the total fertility rate?`, a: T`The average number of children born to each woman`, w: [T`Births per 1 000 people`, T`The number of women aged 15–49`, T`Births minus deaths`], only: 'mc', s: T`A TFR of about 2.1 keeps a population stable in the long run (replacement level).` },
      { q: T`Which Indonesian programme helped lower the birth rate?`, a: T`Keluarga Berencana (family planning)`, w: [T`Transmigration`, T`The census`, T`Village funds`], only: 'mc', s: T`The KB programme, run by BKKBN since 1970, promoted "two children is enough" and access to contraception.` },
      { q: T`Which country is in stage 5, with a shrinking population?`, a: T`Japan`, w: [T`Niger`, T`Indonesia`, T`India`], only: 'mc', s: T`Japan has had more deaths than births since the late 2000s and its population is falling.` },
    ]),
  ],
},
{
  id: 'human-development', stage: 'sh', title: 'Population Quality & Human Development',
  blurb: 'Measuring the quality of a population: health, education and income, the Human Development Index and how it is calculated, and inequality and poverty.',
  lesson: () => T`
<p>The <b>quality</b> of a population is how healthy, educated and prosperous its people are. It is measured with indicators such as life expectancy, infant mortality, literacy, years of schooling, income per person and the share of people living in poverty.</p>
${Key(T`<p><b>The Human Development Index</b> (HDI, <i>Indeks Pembangunan Manusia</i>) combines three dimensions. Each is turned into an index between 0 and 1:</p><p>$$\text{index} = \frac{\text{actual value} - \text{minimum}}{\text{maximum} - \text{minimum}}$$</p><p>For life expectancy the minimum is 20 years and the maximum 85. The HDI is the geometric mean of the three indices:</p><p>$$\text{HDI} = \sqrt[3]{I_{\text{health}} \times I_{\text{education}} \times I_{\text{income}}}$$</p>`)}
${Tbl([T`Dimension`, T`Indicator`], [[T`A long and healthy life`, T`life expectancy at birth`], [T`Knowledge`, T`expected years of schooling and mean years of schooling`], [T`A decent standard of living`, T`income (spending) per person`]])}
${Fig(hbarSvg([{ label: T`DKI Jakarta`, value: 83, show: NUM(0.83) }, { label: T`DI Yogyakarta`, value: 81, show: NUM(0.81) }, { label: T`Indonesia`, value: 75, show: NUM(0.75) }, { label: T`Nusa Tenggara Timur`, value: 67, show: NUM(0.67) }, { label: T`Papua`, value: 63, show: NUM(0.63) }], { max: 100, label: T`A bar chart of HDI in 2023 (Indonesian method): Jakarta about 0.83, Yogyakarta 0.81, Indonesia 0.75, East Nusa Tenggara 0.67, Papua 0.63` }), T`HDI of some provinces around 2023 (BPS method, shown on a 0–1 scale). Differences between regions are still large.`)}
${Tbl([T`HDI`, T`Category`], [[T`0.80 and above`, T`very high`], [T`0.70 – 0.80`, T`high`], [T`0.60 – 0.70`, T`medium`], [T`below 0.60`, T`low`]].map(([a, b]) => [a.replace(/0\.(\d\d)/g, (m, d) => NUM(+('0.' + d))), b]))}
${Tip(T`<p>Other measures: the <b>infant mortality rate</b> (deaths under one year per 1 000 live births), the <b>literacy rate</b>, and the <b>Gini ratio</b> of inequality, from 0 (everyone has the same income) to 1 (one person has everything). Indonesia's Gini ratio is about 0.38.</p>`)}`,
  gens: [
    () => {
      const le = pick([60, 65, 70, 72, 74, 78, 80]), i = sig((le - 20) / 65, 3);
      return { q: T`Life expectancy in a region is ${Q(le, 'years')}. Using a minimum of 20 and a maximum of 85 years, what is its health index?`, a: i, rtol: 0.01, w: [sig(le / 85, 3), sig((le - 20) / 85, 3), sig(le / 100, 3)],
        s: T`$\frac{${le} - 20}{85 - 20} = \frac{${le - 20}}{65} = ${M(i)}$.` };
    },
    () => {
      const h = pick([0.75, 0.8, 0.82, 0.85]), e = pick([0.6, 0.65, 0.7, 0.75]), inc = pick([0.65, 0.7, 0.75, 0.8]), hdi = sig(Math.cbrt(h * e * inc), 3);
      return { q: T`A province has a health index of ${NUM(h)}, an education index of ${NUM(e)} and an income index of ${NUM(inc)}. Calculate its HDI as the geometric mean of the three.`, a: hdi, rtol: 0.01, w: [sig((h + e + inc) / 3, 3) === hdi ? sig(hdi + 0.02, 3) : sig((h + e + inc) / 3, 3), sig(h * e * inc, 3), sig(Math.sqrt(h * e * inc), 3)],
        s: T`$\sqrt[3]{${M(h)} \times ${M(e)} \times ${M(inc)}} = \sqrt[3]{${M(sig(h * e * inc, 4))}} = ${M(hdi)}$.` };
    },
    () => {
      const v = pick([0.52, 0.58, 0.63, 0.67, 0.72, 0.76, 0.81, 0.86]), a = v >= 0.8 ? T`Very high` : v >= 0.7 ? T`High` : v >= 0.6 ? T`Medium` : T`Low`;
      return { q: T`A region's HDI is ${NUM(v)}. Which category is it in?`, a, w: [T`Very high`, T`High`, T`Medium`, T`Low`].filter(x => x !== a), only: 'mc', s: T`The boundaries are ${NUM(0.6)}, ${NUM(0.7)} and ${NUM(0.8)}, so ${NUM(v)} is <b>${a}</b>.` };
    },
    () => {
      const births = pick([5000, 8000, 10000, 20000]), imr = pick([15, 20, 25, 30, 40]), d = births * imr / 1000;
      return { q: T`In a year there are ${F(births)} live births in a regency and ${F(d)} of these babies die before their first birthday. What is the infant mortality rate (per 1 000 live births)?`, a: imr, rtol: 0.01, w: [sig(d / births * 100, 3), sig(births / d, 3), d],
        s: T`$\frac{${M(d)}}{${M(births)}} \times 1000 = ${M(imr)}$ per 1 000 live births.` };
    },
    () => {
      const P = pick([2000, 5000, 8000]) * 100, lit = pick([88, 92, 95, 97]), L = P * lit / 100;
      return { q: T`Of ${F(P)} people aged 15 and over in a district, ${F(L)} can read and write. What is the literacy rate?`, a: lit, u: '%', rtol: 0.01, w: [100 - lit, sig(P / L * 100, 3), sig(L / P, 3)],
        s: T`$\frac{${M(L)}}{${M(P)}} \times 100\% = ${M(lit)}\%$.` };
    },
    () => pick([
      { q: T`Which three dimensions make up the HDI?`, a: T`Health, education and income`, w: [T`Population, area and density`, T`Births, deaths and migration`, T`Industry, farming and trade`], only: 'mc', s: T`HDI combines a long and healthy life, knowledge, and a decent standard of living.` },
      { q: T`A Gini ratio close to 1 means…`, a: T`Income is very unequally shared`, w: [T`Everyone has the same income`, T`The population is very young`, T`The HDI is very high`], only: 'mc', s: T`0 means perfect equality; values near 1 mean a few people hold almost all income.` },
      { q: T`Why is the HDI of Papua lower than that of Jakarta?`, a: T`Fewer schools and health services and lower incomes, partly due to remoteness`, w: [T`Papua has a colder climate`, T`Papua has more people`, T`Jakarta has more farmland`], only: 'mc', s: T`Remote, mountainous areas are harder to serve with schools, clinics and jobs, so all three dimensions are lower.` },
      { q: T`Why does the HDI use a geometric mean instead of an ordinary average?`, a: T`A very low score in one dimension cannot be hidden by high scores in others`, w: [T`It is easier to calculate`, T`It always gives a bigger number`, T`It ignores income`], only: 'mc', s: T`The geometric mean is pulled down strongly by any weak dimension, so all three must improve.` },
    ]),
  ],
},
  ],
});
