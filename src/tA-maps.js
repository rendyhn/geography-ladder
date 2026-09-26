/* ==========================================================================
   TRACK A — Maps & Geographic Tools
   ========================================================================== */
level({
  id: 'maps', mark: 'A', name: 'Maps & Geographic Tools', short: 'Maps & Tools', band: 'Concepts · maps · GIS', color: 'lv1',
  blurb: 'What geography studies, and the tools geographers use to see the Earth: maps, coordinates, time zones, contours, satellite images and GIS.',
  topics: [
{
  id: 'geo-concepts', stage: 'sh', title: 'Geography: Concepts & Approaches',
  blurb: 'What geography studies, its material and formal objects, the ten essential concepts, the four principles and the three approaches.',
  lesson: () => T`
<p><b>Geography</b> studies the similarities and differences between phenomena on the Earth's surface, seen from a spatial, environmental or regional point of view. A geographer always asks three questions: <i>where</i> is it, <i>why</i> is it there, and <i>what does it mean</i> for people and the environment?</p>
<h3>The objects of geography</h3>
${Tbl([T`Object`, T`What it is`, T`Examples`], [[T`Material object`, T`the geosphere: everything geography looks at`, T`lithosphere, atmosphere, hydrosphere, biosphere, pedosphere and anthroposphere (people)`], [T`Formal object`, T`the point of view used to look at it`, T`the spatial, environmental and regional viewpoint`]])}
<h3>Ten essential concepts</h3>
${FigW(hubSvg(T`Geography`, [T`Location`, T`Distance`, T`Accessibility`, T`Pattern`, T`Morphology`, T`Agglomeration`, T`Use value`, T`Interaction`, T`Differentiation`, T`Spatial linkage`], { label: T`The ten essential concepts of geography arranged around the word Geography` }), T`The ten essential concepts: the ideas every geographical question uses.`)}
${Tbl([T`Concept`, T`Meaning`], [
  [T`Location`, T`absolute (coordinates, e.g. 6°S 106°E) or relative (in relation to other places, e.g. near a port)`],
  [T`Distance`, T`how far apart places are, in kilometres, travel time or cost`],
  [T`Accessibility`, T`how easily a place can be reached`],
  [T`Pattern`, T`the arrangement of phenomena, e.g. settlements along a river or a road`],
  [T`Morphology`, T`the shape of the land: plains, hills, mountains, coasts`],
  [T`Agglomeration`, T`the clustering of similar activities in one area, e.g. an industrial estate`],
  [T`Use value`, T`how useful a place is, which differs from person to person`],
  [T`Interaction`, T`places depending on and influencing each other, e.g. a village supplying a city with food`],
  [T`Differentiation`, T`each area has its own mix of characteristics that sets it apart`],
  [T`Spatial linkage`, T`how phenomena in one area are related, e.g. deforestation and floods downstream`]])}
${Key(T`<p><b>Four principles.</b> <i>Distribution</i>: phenomena are spread unevenly over the Earth. <i>Interrelation</i>: phenomena influence each other. <i>Description</i>: the pattern and its causes are explained in words, maps, tables and graphs. <i>Chorology</i>: a phenomenon is studied together with everything around it in its region.</p><p><b>Three approaches.</b> The <i>spatial</i> approach looks at where things are and why. The <i>ecological</i> approach looks at the relationship between people and their environment. The <i>regional complex</i> approach combines both to compare whole regions.</p>`)}
${Fig(vennSvg([T`Spatial`, T`Ecological`, T`Regional complex`], { center: T`Geography`, label: T`Three overlapping circles for the spatial, ecological and regional complex approaches` }), T`The three approaches of geography overlap: <i>spatial</i> (where and why there), <i>ecological</i> (people and environment) and <i>regional complex</i> (both together, for a whole region).`)}
${Tip(T`<p>To name the concept in a question, find the key idea: "clustered together" is agglomeration, "easy to reach" is accessibility, "one place supplies another" is interaction, "the shape of the land" is morphology.</p>`)}`,
  gens: [
    () => pick([
      [T`Many textile factories are clustered together in one industrial estate.`, T`Agglomeration`],
      [T`Farmers in the mountains send vegetables to the city, and the city sends manufactured goods back.`, T`Interaction`],
      [T`A village is hard to reach because there is no road and no bridge over the river.`, T`Accessibility`],
      [T`Jakarta lies at about 6°S and 107°E.`, T`Location`],
      [T`The market is 15 minutes by motorbike from the village.`, T`Distance`],
      [T`Houses in a valley are built in a line along the river bank.`, T`Pattern`],
      [T`The area is a lowland plain surrounded by steep hills.`, T`Morphology`],
      [T`For a surfer a beach with big waves is valuable, but for a fisherman it is dangerous.`, T`Use value`],
      [T`The highlands grow tea and vegetables while the lowlands grow rice.`, T`Differentiation`],
      [T`Cutting forests upstream causes floods in towns downstream.`, T`Spatial linkage`],
      [T`A shopping centre is built next to a toll-road exit so that many people can get there.`, T`Accessibility`],
      [T`Workshops of silver craftsmen are concentrated in one neighbourhood of the city.`, T`Agglomeration`],
    ].map(([q, a]) => ({ q: T`Which essential concept of geography does this describe? <i>${q}</i>`, a, w: [T`Location`, T`Distance`, T`Accessibility`, T`Pattern`, T`Morphology`, T`Agglomeration`, T`Use value`, T`Interaction`, T`Differentiation`, T`Spatial linkage`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`The key idea of the statement is <b>${a}</b>.` }))),
    () => pick([
      [T`Explaining why landslides happen often in an area by studying its slopes, soil and rainfall together`, T`Interrelation`],
      [T`Showing on a map that volcanoes in Indonesia are spread along an arc`, T`Distribution`],
      [T`Presenting data on rice harvests with a graph and a written explanation`, T`Description`],
      [T`Studying a flood by looking at the rainfall, land use and river network of the whole region`, T`Chorology`],
    ].map(([q, a]) => ({ q: T`Which principle of geography is being used? <i>${q}</i>`, a, w: [T`Distribution`, T`Interrelation`, T`Description`, T`Chorology`].filter(x => x !== a), only: 'mc', s: T`This is the principle of <b>${a}</b>: ${a === T`Distribution` ? T`phenomena are spread unevenly over space.` : a === T`Interrelation` ? T`phenomena influence one another.` : a === T`Description` ? T`the pattern is explained with words, maps, tables and graphs.` : T`a phenomenon is studied with everything around it in its region.`}` }))),
    () => pick([
      [T`A study of how farmers on the slopes of a volcano adapt their farming to the fertile ash soil`, T`Ecological approach`],
      [T`A study of why shops in a town are concentrated along the main road`, T`Spatial approach`],
      [T`A comparison of Java and Kalimantan, looking at their physical and human features together`, T`Regional complex approach`],
      [T`A study of how people's rubbish affects the quality of a river`, T`Ecological approach`],
      [T`Mapping where schools are located and how far pupils must travel`, T`Spatial approach`],
    ].map(([q, a]) => ({ q: T`Which geographical approach is used here? <i>${q}</i>`, a, w: [T`Spatial approach`, T`Ecological approach`, T`Regional complex approach`, T`Historical approach`].filter(x => x !== a), only: 'mc',
      s: T`The spatial approach asks where and why; the ecological approach looks at people and their environment; the regional complex approach combines both to study and compare regions. Here it is the <b>${a}</b>.` }))),
    () => pick([
      { q: T`Which of these is the <b>formal</b> object of geography?`, a: T`The spatial, environmental and regional point of view`, w: [T`The lithosphere`, T`The atmosphere and hydrosphere`, T`People and their activities`], only: 'mc', s: T`The formal object is the viewpoint geography uses; the layers of the geosphere are its material object.` },
      { q: T`Which layer of the geosphere is made up of people and their activities?`, a: T`Anthroposphere`, w: [T`Pedosphere`, T`Biosphere`, T`Lithosphere`], only: 'mc', s: T`The anthroposphere is the human layer: population, settlements and economic activity.` },
      { q: T`Which layer of the geosphere is the soil?`, a: T`Pedosphere`, w: [T`Lithosphere`, T`Anthroposphere`, T`Hydrosphere`], only: 'mc', s: T`The pedosphere is the soil layer, formed where rock, air, water and living things meet.` },
      { q: T`"Bandung lies about 180 km south-east of Jakarta." What kind of location is this?`, a: T`Relative location`, w: [T`Absolute location`, T`Astronomical location`, T`Fixed location`], only: 'mc', s: T`It describes Bandung in relation to another place, so it is a relative location. An absolute location uses coordinates.` },
      { q: T`"Monas stands at 6°10′ S, 106°49′ E." What kind of location is this?`, a: T`Absolute location`, w: [T`Relative location`, T`Strategic location`, T`Geological location`], only: 'mc', s: T`Coordinates of latitude and longitude give an absolute location, which never changes.` },
    ]),
    () => {
      const [q, a] = pick([[T`Why are there more people living on Java than on Papua?`, T`Why`], [T`Where are Indonesia's active volcanoes found?`, T`Where`], [T`What are the effects of a new toll road on the villages it passes?`, T`What does it mean`]]);
      return { q: T`Geographers ask three basic questions: <i>Where?</i>, <i>Why there?</i> and <i>What does it mean?</i> Which one does this question mainly ask? <i>${q}</i>`, a, w: [T`Where`, T`Why`, T`What does it mean`, T`When`].filter(x => x !== a), only: 'mc', s: T`Where describes the location and distribution; why explains the causes; what does it mean looks at the consequences for people and the environment.` };
    },
  ],
},
{
  id: 'map-scale', stage: 'sh', title: 'Maps & Map Scale',
  blurb: 'What makes a map, the components every map needs, types of scale, and calculating real distances, map distances and areas.',
  lesson: () => T`
<p>A <b>map</b> is a drawing of all or part of the Earth's surface on a flat plane, reduced by a scale and simplified with symbols. Maps are either <b>general</b> (showing many features, such as a topographic map or an atlas) or <b>thematic</b> (showing one theme, such as rainfall or population density).</p>
${FigW(mapSheetSvg({ title: T`Land Use of Sukamaju Island`, legend: [{ cls: 'g-water', text: T`Sea` }, { cls: 'g-land', text: T`Lowland` }, { cls: 'g-land-2', text: T`Highland` }, { cls: 'g-s2', text: T`Town` }], barText: '1 km', scaleText: T`Scale 1 : 25,000`, label: T`A map sheet showing its title, grid, north arrow, legend, inset map and scale` }), T`The components of a map: title, legend, scale, north arrow, inset map and coordinate grid.`)}
${Tbl([T`Component`, T`Purpose`], [[T`Title`, T`says what the map shows, where and when`], [T`Legend`, T`explains the symbols and colours`], [T`Scale`, T`relates distances on the map to distances on the ground`], [T`Orientation (north arrow)`, T`shows direction`], [T`Inset`, T`shows where the mapped area lies in a larger region`], [T`Grid and coordinates`, T`help locate places exactly`], [T`Source and year`, T`show where the data came from and how up to date it is`]])}
<h3>Scale</h3>
<p>A <b>numerical scale</b> such as $1 : 50\,000$ means 1 unit on the map equals 50 000 of the same units on the ground. A <b>verbal scale</b> says it in words ("1 cm represents 500 m"), and a <b>graphic scale</b> is a bar, which stays correct when the map is enlarged or reduced.</p>
${Fm(T`\text{real distance} = \text{map distance} \times \text{scale denominator}`)}
${Key(T`<p>Work in centimetres, then convert: $1\,\mathrm{km} = 100\,000\,\mathrm{cm}$. On a $1 : 50\,000$ map, $4\,\mathrm{cm}$ represents $200\,000\,\mathrm{cm} = 2\,\mathrm{km}$. Areas scale with the <b>square</b>: $1\,\mathrm{cm^2}$ on that map is $(0.5\,\mathrm{km})^2 = 0.25\,\mathrm{km^2}$.</p>`)}
${Fig(graphicScaleSvg(), T`A graphic scale for $1 : 50\,000$: each 2 cm block on the map stands for 1 km. It stays correct even if the map is enlarged or shrunk.`)}
<p>A <b>large-scale</b> map (e.g. $1 : 5\,000$) shows a small area in great detail; a <b>small-scale</b> map (e.g. $1 : 1\,000\,000$) shows a large area with little detail. The bigger the denominator, the smaller the scale.</p>
${Tip(T`<p>If a map is enlarged 2 times, everything on it is twice as long, so the scale denominator is halved: $1 : 50\,000$ becomes $1 : 25\,000$.</p>`)}`,
  gens: [
    () => {
      const den = pick([10000, 25000, 50000, 100000, 250000, 500000, 1000000]), d = pick([1.5, 2, 2.5, 3, 4, 4.5, 6, 7.5, 8, 12]), km = sig(d * den / 1e5);
      return { q: T`On a map with a scale of $1 : ${M(den)}$ the distance between two towns is ${Q(d, 'cm')}. What is the real distance?`, a: km, u: 'km', w: [sig(km * 10), sig(km / 10), sig(d * den / 1e3)],
        s: T`$${M(d)} \times ${M(den)} = ${M(d * den)}\,\mathrm{cm}$. Divide by 100 000 to get kilometres: ${Q(km, 'km')}.` };
    },
    () => {
      const den = pick([25000, 50000, 100000, 200000, 250000, 500000]), km = pick([1, 2, 5, 7.5, 10, 12, 15, 20, 25, 40]), cm = sig(km * 1e5 / den);
      if (cm < 0.5 || cm > 40) return null;
      return { q: T`Two villages are ${Q(km, 'km')} apart. How far apart are they on a map with a scale of $1 : ${M(den)}$?`, a: cm, u: 'cm', w: [sig(cm * 10), sig(cm / 10), sig(km * den / 1e5)],
        s: T`$${M(km)}\,\mathrm{km} = ${M(km * 1e5)}\,\mathrm{cm}$, and $${M(km * 1e5)} \div ${M(den)} = ${QT(cm, 'cm')}$.` };
    },
    () => {
      const den = pick([20000, 25000, 40000, 50000, 100000, 200000]), d = pick([2, 4, 5, 8, 10]), km = d * den / 1e5;
      return { q: T`Two places ${Q(km, 'km')} apart are ${Q(d, 'cm')} apart on a map. What is the scale of the map? Give the denominator.`, a: den, rtol: 0, h: T`Type only the denominator, e.g. 50000 for 1 : 50,000.`,
        w: [den * 10, den / 10, den * 2], s: T`Scale $= ${M(d)}\,\mathrm{cm} : ${M(km * 1e5)}\,\mathrm{cm} = 1 : ${M(den)}$.` };
    },
    () => {
      const den = pick([25000, 50000, 100000, 200000]), k = pick([2, 4, 5]), enl = chance();
      return { q: T`A map with a scale of $1 : ${M(den)}$ is ${enl ? T`enlarged` : T`reduced`} ${k} times. What is the new scale denominator?`, a: enl ? den / k : den * k, rtol: 0, w: enl ? [den * k, den / (k * k), den] : [den / k, den * k * k, den],
        s: enl ? T`Enlarging makes the map ${k} times bigger, so each map centimetre stands for ${k} times less ground: $1 : ${M(den)} \div ${k} = 1 : ${M(den / k)}$.` : T`Reducing makes each map centimetre stand for ${k} times more ground: $1 : ${M(den)} \times ${k} = 1 : ${M(den * k)}$.` };
    },
    () => {
      const den = pick([10000, 20000, 25000, 50000, 100000]), A = pick([2, 4, 5, 6, 8, 12, 16]), side = den / 1e5, km2 = sig(A * side * side);
      return { q: T`A lake covers ${Q(A, 'cm^2')} on a map with a scale of $1 : ${M(den)}$. What is its real area?`, a: km2, u: 'km²', w: [sig(A * side), sig(km2 * 10), sig(km2 / 10)],
        s: T`$1\,\mathrm{cm}$ on the map is $${M(side)}\,\mathrm{km}$, so $1\,\mathrm{cm^2}$ is $${M(side)}^2 = ${M(sig(side * side))}\,\mathrm{km^2}$. The lake: $${A} \times ${M(sig(side * side))} = ${QT(km2, 'km^2')}$.` };
    },
    () => {
      const den = pick([5000, 10000, 1000000, 5000000, 250000, 100000]), big = den <= 10000, small = den >= 1000000;
      return { q: T`How would a map with a scale of $1 : ${M(den)}$ usually be classified?`, a: big ? T`Large scale` : small ? T`Small scale` : T`Medium scale`, w: [T`Large scale`, T`Medium scale`, T`Small scale`, T`Very large area, large scale`].filter(x => x !== (big ? T`Large scale` : small ? T`Small scale` : T`Medium scale`)).slice(0, 3), only: 'mc',
        s: T`Roughly: larger than $1 : 25\,000$ is large scale (much detail, small area); $1 : 25\,000$ to $1 : 1\,000\,000$ is medium; smaller than $1 : 1\,000\,000$ is small scale.` };
    },
    () => pick([
      { q: T`Which map component shows where the mapped area lies within a larger region?`, a: T`Inset map`, w: [T`Legend`, T`Title`, T`North arrow`], only: 'mc', s: T`The inset is a small map of a wider area with the mapped area marked on it.` },
      { q: T`Which type of scale stays correct when a map is photocopied at a larger size?`, a: T`Graphic (bar) scale`, w: [T`Numerical scale`, T`Verbal scale`, T`None of them`], only: 'mc', s: T`The bar is enlarged together with the map, so it still shows the right distance. A written ratio would become wrong.` },
      { q: T`Which map component explains the meaning of the symbols and colours?`, a: T`Legend`, w: [T`Scale`, T`Inset`, T`Grid`], only: 'mc', s: T`The legend (key) lists every symbol and colour with its meaning.` },
      { q: T`Which map shows a single theme, such as population density?`, a: T`A thematic map`, w: [T`A topographic map`, T`A general map`, T`An inset map`], only: 'mc', s: T`Thematic maps show one subject; general maps such as topographic maps show many kinds of feature together.` },
    ]),
  ],
},
{
  id: 'coordinates', stage: 'sh', title: 'Latitude & Longitude',
  blurb: 'The grid of parallels and meridians, reading coordinates, degrees and minutes, and distances along meridians and parallels.',
  lesson: () => T`
<p>Every place on Earth can be pinpointed with two angles measured from the centre of the Earth.</p>
${Fig(globeSvg({ lat: -6.9, lon: 107.6, name: 'Bandung', label: T`A globe with parallels and meridians; the equator, the prime meridian and the lines through Bandung are highlighted` }), T`Bandung lies about 6.9° S and 107.6° E. The red line is the equator and the blue line the prime meridian.`)}
${Tbl([T``, T`Latitude`, T`Longitude`], [[T`Measures`, T`the angle north or south of the equator`, T`the angle east or west of the prime meridian (Greenwich)`], [T`Lines`, T`parallels: circles that run east–west`, T`meridians: half-circles that run from pole to pole`], [T`Range`, T`0° to 90° N or S`, T`0° to 180° E or W`], [T`Zero line`, T`the equator`, T`the prime meridian`]])}
<p>Each degree is split into 60 minutes ($'$) and each minute into 60 seconds ($''$), so $6^\circ 30' = 6.5^\circ$. A location is written latitude first: Jakarta is about $6^\circ 12'\,\mathrm{S},\ 106^\circ 49'\,\mathrm{E}$.</p>
${Key(T`<p>Along a meridian, $1^\circ$ of latitude is always about $111\,\mathrm{km}$. Along a parallel, $1^\circ$ of longitude is $111\,\mathrm{km}$ at the equator but shrinks towards the poles:</p><p>$$1^\circ\ \text{of longitude} \approx 111 \cos\varphi\ \mathrm{km}$$</p><p>where $\varphi$ is the latitude. At $60^\circ$ it is only about $55.5\,\mathrm{km}$.</p>`)}
${Fig(planeSvg({ W: 340, H: 210, x: [0, 92], y: [0, 125], step: [15, 25], tickX: 30, fmtX: v => v + '°', xl: T`latitude`, yl: 'km', fns: [{ f: p => 111.3 * Math.cos(p * Math.PI / 180), to: 90 }], pts: [[0, 111.3, '111 km', 'start', false, 8, -6], [30, 96.4, '96 km', 'start', false, 8, -6], [60, 55.7, '56 km', 'start', false, 8, -6], [90, 0]], label: T`Length of one degree of longitude falling from 111 kilometres at the equator to zero at the poles` }), T`One degree of longitude is $111\,\mathrm{km} \times \cos(\text{latitude})$: 111 km at the equator, about 56 km at $60^\circ$, and zero at the poles.`)}
<p>The equator and the meridians are <b>great circles</b>: circles whose centre is the centre of the Earth. The shortest route between two places follows a great circle, which is why long flights look curved on a flat map.</p>
${Tip(T`<p>Important parallels: the Tropic of Cancer ($23.5^\circ$ N), the Tropic of Capricorn ($23.5^\circ$ S), and the Arctic and Antarctic Circles ($66.5^\circ$). The Sun can be directly overhead only between the two tropics.</p>`)}`,
  gens: [
    () => {
      const a = ri(-8, 8), b = a + pick([-1, 1]) * ri(2, 12), d = Math.abs(a - b) * 111, lo = ri(95, 140), deg = d / 111;
      const w = la => `${Math.abs(la)}°${la > 0 ? dir('N') : la < 0 ? dir('S') : ''}`;
      return { q: T`Two towns lie on the same meridian (${lo}° ${dir('E')}), one at ${w(a)} and the other at ${w(b)}. About how far apart are they? (Take $1^\circ = 111\,\mathrm{km}$.)`, a: d, u: 'km', w: [sig(d / 2), Math.abs(Math.abs(a) - Math.abs(b)) * 111 || sig(d * 2), sig(deg * 60)],
        s: T`The difference in latitude is ${deg}°${(a > 0) !== (b > 0) && a && b ? T` (one is north and one south of the equator, so the latitudes add)` : ''}. Distance $= ${deg} \times 111 = ${QT(d, 'km')}$.` };
    },
    () => {
      const la = pick([0, 30, 45, 60, 20, 50]), dlon = pick([1, 5, 10, 15, 20]), d = sig(dlon * 111 * cosD(la));
      return { q: T`Two places both lie on latitude ${la}° and are ${dlon}° of longitude apart. About how far apart are they along the parallel? (Take $1^\circ = 111\,\mathrm{km}$ at the equator.)`, a: d, u: 'km', rtol: 0.02, w: [sig(dlon * 111), sig(dlon * 111 * sinD(la)) || sig(d / 2), sig(d * 2)],
        s: T`Along a parallel $1^\circ \approx 111\cos\varphi\ \mathrm{km}$: $${dlon} \times 111 \cos ${la}^\circ = ${QT(d, 'km')}$.` };
    },
    () => {
      const dg = ri(0, 89), mn = pick([6, 12, 15, 18, 24, 30, 36, 42, 45, 48, 54]), dec = sig(dg + mn / 60, 5);
      return { q: T`Write $${dg}^\circ ${mn}'$ as a decimal number of degrees.`, a: dec, u: '°', rtol: 0.001, w: [sig(dg + mn / 100, 5), sig(dg + mn / 10, 5), sig(dg + mn / 360, 5)],
        s: T`There are 60 minutes in a degree: $${dg} + \frac{${mn}}{60} = ${M(dec)}^\circ$.` };
    },
    () => {
      const [city, la, lo] = pick([['Jakarta', -6.2, 106.8], ['Medan', 3.6, 98.7], ['Makassar', -5.1, 119.4], ['Manado', 1.5, 124.8], ['Jayapura', -2.5, 140.7], ['Tokyo', 35.7, 139.7], ['London', 51.5, -0.1], ['New York', 40.7, -74.0], ['Sydney', -33.9, 151.2], ['Cairo', 30.0, 31.2]]);
      const hem = (la > 0 ? T`Northern` : T`Southern`) + ' / ' + (lo > 0 ? T`Eastern` : T`Western`);
      return { q: T`${city} lies at about ${Math.abs(la)}° ${la > 0 ? dir('N') : dir('S')}, ${Math.abs(lo)}° ${lo > 0 ? dir('E') : dir('W')}. In which hemispheres is it?${Fig(globeSvg({ lat: la, lon: lo, name: city, label: T`A globe with the city marked` }))}`,
        a: hem, w: [(la > 0 ? T`Southern` : T`Northern`) + ' / ' + (lo > 0 ? T`Eastern` : T`Western`), (la > 0 ? T`Northern` : T`Southern`) + ' / ' + (lo > 0 ? T`Western` : T`Eastern`), (la > 0 ? T`Southern` : T`Northern`) + ' / ' + (lo > 0 ? T`Western` : T`Eastern`)], only: 'mc',
        s: T`Latitude ${la > 0 ? T`north` : T`south`} of the equator puts it in the ${la > 0 ? T`Northern` : T`Southern`} Hemisphere; longitude ${lo > 0 ? T`east` : T`west`} of Greenwich puts it in the ${lo > 0 ? T`Eastern` : T`Western`} Hemisphere.` };
    },
    () => {
      const la = ri(1, 60), lo = ri(10, 170), ns = chance(), ew = chance();
      const f = (a, b, c, d) => `${a}° ${b}, ${c}° ${d}`;
      const ans = f(la, ns ? dir('S') : dir('N'), 180 - lo, ew ? dir('W') : dir('E'));
      return { q: T`The antipode of a place is the point exactly on the opposite side of the Earth. What is the antipode of ${f(la, ns ? dir('N') : dir('S'), lo, ew ? dir('E') : dir('W'))}?`, a: ans, w: [f(la, ns ? dir('S') : dir('N'), lo, ew ? dir('W') : dir('E')), f(la, ns ? dir('N') : dir('S'), 180 - lo, ew ? dir('W') : dir('E')), f(90 - la, ns ? dir('S') : dir('N'), 180 - lo, ew ? dir('W') : dir('E'))], only: 'mc',
        s: T`Change the hemisphere of the latitude, keep its size; for longitude take $180^\circ - ${lo}^\circ = ${180 - lo}^\circ$ and change east to west.` };
    },
    () => pick([
      { q: T`Which line of latitude is a great circle?`, a: T`The equator`, w: [T`The Tropic of Cancer`, T`The Arctic Circle`, T`Every parallel`], only: 'mc', s: T`A great circle has its centre at the centre of the Earth. Of all the parallels only the equator does; all meridians are halves of great circles.` },
      { q: T`What is the latitude of the Tropic of Capricorn?`, a: T`23.5° S`, w: [T`23.5° N`, T`66.5° S`, T`0°`], only: 'mc', s: T`The Tropic of Capricorn is at 23.5° S, the southernmost latitude where the Sun can be directly overhead (around 22 December).` },
      { q: T`Which meridian is 0° longitude?`, a: T`The prime meridian through Greenwich`, w: [T`The International Date Line`, T`The equator`, T`The meridian through Jakarta`], only: 'mc', s: T`Longitude is measured from the prime meridian through Greenwich, London.` },
      { q: T`Along which direction does 1° always cover about 111 km, wherever you are?`, a: T`North–south (along a meridian)`, w: [T`East–west (along a parallel)`, T`In every direction`, T`Only at the poles`], only: 'mc', s: T`Parallels are evenly spaced, so a degree of latitude is always about 111 km. Meridians converge towards the poles, so a degree of longitude shrinks.` },
    ]),
  ],
},
{
  id: 'time-zones', stage: 'sh', title: 'Time Zones',
  blurb: 'Why time depends on longitude, local time and standard time, Indonesia’s three time zones, and the International Date Line.',
  lesson: () => T`
<p>The Earth turns $360^\circ$ in 24 hours, so the Sun appears to move $15^\circ$ of longitude every hour, or $1^\circ$ every 4 minutes. Places further east see the Sun rise earlier, so their clocks are ahead.</p>
${Fm(T`\Delta t = \frac{\Delta\lambda}{15^\circ}\ \text{hours} = \Delta\lambda \times 4\ \text{minutes}`)}
<p><b>Local mean time</b> is set by the Sun at that exact meridian. To avoid every town having its own time, the world uses <b>standard time zones</b>, each about $15^\circ$ wide and a whole number of hours from <b>UTC</b> (Coordinated Universal Time, the time at Greenwich).</p>
${FigW(timeStripSvg({ places: [[106.8, 'Jakarta'], [-0.1, 'London'], [139.7, 'Tokyo'], [-74, 'New York']], refLon: 106.8, refHour: 14, label: T`A strip of the world's time zones showing the time in four cities when it is 14:00 in Jakarta` }), T`When it is 14:00 in Jakarta (UTC+7), it is 07:00 in London, 16:00 in Tokyo and 02:00 in New York.`)}
<h3>Indonesia's time zones</h3>
${FigW(indonesiaSvg({ zones: [[104, 'WIB · UTC+7'], [121, 'WITA · UTC+8'], [135, 'WIT · UTC+9']], marks: [[106.8, -6.2, 'Jakarta'], [119.4, -5.1, 'Makassar'], [140.7, -2.5, 'Jayapura', 'end']], label: T`Map of Indonesia divided into three time zones` }), T`Indonesia spans about 46° of longitude, so it uses three time zones.`)}
${Tbl([T`Zone`, T`Offset`, T`Regions`], [[T`WIB (Western Indonesia Time)`, T`UTC+7`, T`Sumatra, Java, West and Central Kalimantan`], [T`WITA (Central Indonesia Time)`, T`UTC+8`, T`Bali, Nusa Tenggara, South, East and North Kalimantan, Sulawesi`], [T`WIT (Eastern Indonesia Time)`, T`UTC+9`, T`Maluku and Papua`]])}
${Key(T`<p>The <b>International Date Line</b> runs roughly along $180^\circ$. Crossing it westwards (from America towards Asia) you move the date forward one day; crossing it eastwards you go back one day.</p>`)}
${Tip(T`<p>To convert between zones, first convert to UTC, then to the other zone. 09:00 WIB is 02:00 UTC, which is 10:00 WITA and 11:00 WIT.</p>`)}`,
  gens: [
    () => {
      const d = pick([1, 2, 3, 5, 7.5, 10, 12, 15, 20, 30]), m = d * 4;
      return { q: T`Two places are ${d}° of longitude apart. What is the difference between their local mean times, in minutes?`, a: m, u: 'min', rtol: 0, w: [sig(d * 15), sig(d / 15 * 60 / 4), d], s: T`Each degree is 4 minutes: $${M(d)} \times 4 = ${M(m)}$ minutes.` };
    },
    () => {
      const hm = x => { const h = ((Math.floor(x) % 24) + 24) % 24, mm = Math.round((x - Math.floor(x)) * 60); return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`; };
      const [A, oa] = pick([['Jakarta', 7], ['Makassar', 8], ['Jayapura', 9], ['Medan', 7], ['Denpasar', 8], ['Ambon', 9]]), [B, ob] = pick([['London', 0], ['Tokyo', 9], ['Dubai', 4], ['New York', -5], ['Sydney', 10], ['Paris', 1], ['Beijing', 8]]);
      const t = ri(0, 23) + pick([0, 0.5]), tb = t + ob - oa;
      return { q: T`It is ${hm(t)} in ${A} (UTC${oa >= 0 ? '+' : ''}${oa}). What is the standard time in ${B} (UTC${ob >= 0 ? '+' : ''}${ob})?${FigW(timeStripSvg({ places: [[oa * 15, A], [ob * 15, B]], refLon: oa * 15, refHour: t, label: T`Time zone strip for the two cities` }))}`, a: hm(tb),
        w: [hm(t - ob + oa), hm(tb + 1), hm(t + ob)].filter(x => x !== hm(tb)), only: 'mc',
        s: T`The difference is $${ob} - (${oa}) = ${ob - oa}$ hours, so the time in ${B} is ${hm(t)} ${ob - oa >= 0 ? '+' : '−'} ${Math.abs(ob - oa)} h = <b>${hm(tb)}</b>${tb >= 24 ? T` the next day` : tb < 0 ? T` the previous day` : ''}.` };
    },
    () => {
      const hm = x => { const h = ((Math.floor(x) % 24) + 24) % 24, mm = Math.round((x - Math.floor(x)) * 60); return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`; };
      const [[A, oa], [B, ob]] = pick([[['Jakarta', 7], ['Jayapura', 9]], [['Jayapura', 9], ['Jakarta', 7]], [['Denpasar', 8], ['Jakarta', 7]], [['Medan', 7], ['Makassar', 8]], [['Ambon', 9], ['Surabaya', 7]], [['Balikpapan', 8], ['Jayapura', 9]]]);
      const dep = ri(6, 20) + pick([0, 0.5]), dur = pick([1.5, 2, 2.5, 3, 3.5, 4, 5]), arr = dep + dur + ob - oa;
      return { q: T`A plane leaves ${A} (UTC+${oa}) at ${hm(dep)} local time and the flight takes ${NUM(dur)} hours. What is the local time in ${B} (UTC+${ob}) when it lands?`, a: hm(arr), w: [hm(dep + dur), hm(dep + dur - (ob - oa)), hm(arr + 1)].filter(x => x !== hm(arr)), only: 'mc',
        s: T`In ${A}'s time it lands at ${hm(dep)} + ${NUM(dur)} h = ${hm(dep + dur)}. ${B} is ${Math.abs(ob - oa)} ${Math.abs(ob - oa) === 1 ? T`hour` : T`hours`} ${ob > oa ? T`ahead` : T`behind`}, so the local time is <b>${hm(arr)}</b>.` };
    },
    () => {
      const [city, zone] = pick([['Denpasar (Bali)', 'WITA'], ['Medan', 'WIB'], ['Pontianak (West Kalimantan)', 'WIB'], ['Balikpapan (East Kalimantan)', 'WITA'], ['Makassar', 'WITA'], ['Ambon', 'WIT'], ['Jayapura', 'WIT'], ['Surabaya', 'WIB'], ['Kupang', 'WITA'], ['Manado', 'WITA'], ['Palangka Raya (Central Kalimantan)', 'WIB'], ['Ternate', 'WIT']]);
      return { q: T`Which Indonesian time zone does ${city} use?${FigW(indonesiaSvg({ zones: [[104, 'WIB'], [121, 'WITA'], [135, 'WIT']], label: T`Indonesia's time zones` }))}`, a: zone, w: ['WIB', 'WITA', 'WIT', 'UTC'].filter(x => x !== zone), only: 'mc',
        s: T`WIB (UTC+7): Sumatra, Java, West and Central Kalimantan. WITA (UTC+8): Bali, Nusa Tenggara, the rest of Kalimantan and Sulawesi. WIT (UTC+9): Maluku and Papua. ${city} uses <b>${zone}</b>.` };
    },
    () => {
      const lo = pick([30, 45, 60, 75, 90, 105, 120, 135, 150]), e = chance(), off = lo / 15;
      return { q: T`A place lies at ${lo}° ${e ? dir('E') : dir('W')}. If its time zone follows its central meridian exactly, what is its offset from UTC, in hours? (Use a minus sign for places behind UTC.)`, a: e ? off : -off, neg: true, u: 'h', rtol: 0, w: [e ? -off : off, lo / 4, lo / 60],
        s: T`$${lo}^\circ \div 15^\circ = ${off}$ hours, ${e ? T`ahead of UTC because it is east of Greenwich` : T`behind UTC because it is west of Greenwich`}: UTC${e ? '+' : '−'}${off}.` };
    },
    () => pick([
      { q: T`A ship crosses the International Date Line sailing <b>westwards</b>, from Hawaii towards Japan, on Monday. What happens to the date?`, a: T`It becomes Tuesday: one day is skipped`, w: [T`It becomes Sunday: one day is repeated`, T`Nothing changes`, T`The clock goes back 12 hours`], only: 'mc', s: T`Travelling west across the Date Line you jump forward one day, because places just west of it are almost a full day ahead of places just east of it.` },
      { q: T`Why do places further east see the Sun rise earlier?`, a: T`The Earth rotates from west to east`, w: [T`The Earth rotates from east to west`, T`The Sun moves around the Earth from east to west`, T`Places in the east are closer to the Sun`], only: 'mc', s: T`The Earth spins towards the east, so eastern places turn into the sunlight first.` },
      { q: T`Why does Indonesia have three time zones?`, a: T`It stretches across about 46° of longitude`, w: [T`It lies on the equator`, T`It stretches across many degrees of latitude`, T`It has many islands`], only: 'mc', s: T`From about 95° E to 141° E is some 46°, roughly three hours of solar time, so one zone would be far from the Sun's time at each end.` },
    ]),
  ],
},
{
  id: 'projections', stage: 'sh', title: 'Map Projections',
  blurb: 'Why a round Earth cannot be flattened without distortion, cylindrical, conic and azimuthal projections, and what each one keeps true.',
  lesson: () => T`
<p>A globe is the only map that shows shape, area, distance and direction correctly all at once. Flattening the curved surface onto paper always stretches or squeezes something. A <b>map projection</b> is the rule used to transfer the grid of parallels and meridians onto a flat surface.</p>
<h3>Three developable surfaces</h3>
${Fig(projectionSvg('cylindrical', { label: T`A cylinder wrapped around the globe touching the equator, and the resulting rectangular grid` }), T`<b>Cylindrical</b>: the cylinder touches the equator. Meridians become parallel straight lines; the areas near the poles are stretched. Best for the tropics and for world maps.`)}
${Fig(projectionSvg('conic', { label: T`A cone placed over the globe touching one parallel, and the resulting fan-shaped grid` }), T`<b>Conic</b>: the cone touches one parallel (the standard parallel). Parallels become arcs and meridians straight lines meeting at a point. Best for the middle latitudes.`)}
${Fig(projectionSvg('azimuthal', { label: T`A flat plane touching the globe at the pole, and the resulting circular grid` }), T`<b>Azimuthal (zenithal)</b>: a flat plane touches one point, often a pole. Parallels become circles and meridians radiate out. Best for polar regions.`)}
${Tbl([T`Property kept`, T`Name`, T`Used for`], [[T`Shape of small areas (angles)`, T`conformal (orthomorphic)`, T`navigation charts, e.g. Mercator`], [T`Area`, T`equivalent (equal-area)`, T`distribution maps such as population or forests`], [T`Distance from one point`, T`equidistant`, T`air routes from one airport`]])}
${Key(T`<p>The <b>Mercator</b> projection is cylindrical and conformal: a straight line on it is a constant compass bearing, which is why sailors used it. The price is size: at latitude $\varphi$ lengths are stretched by $\dfrac{1}{\cos\varphi}$ and areas by $\dfrac{1}{\cos^2\varphi}$. Greenland (around $72^\circ$ N) looks as big as Africa though Africa is about 14 times larger.</p>`)}
${Tip(T`<p>No projection is "the best": choose the one whose kept property matters for the map's purpose, and whose shape suits the area being mapped.</p>`)}`,
  gens: [
    () => {
      const la = pick([30, 40, 45, 50, 60, 70, 75]), k = 1 / cosD(la), area = chance();
      return { q: T`On a Mercator map, by what factor are ${area ? T`areas` : T`lengths`} exaggerated at latitude ${la}°?`, a: sig(area ? k * k : k), rtol: 0.02, w: area ? [sig(k), sig(cosD(la) ** 2, 3), sig(k * k * 2)] : [sig(k * k), sig(cosD(la), 3), sig(1 / sinD(la))],
        s: area ? T`Areas are stretched by $\frac{1}{\cos^2\varphi} = \frac{1}{\cos^2 ${la}^\circ} = ${M(sig(k * k))}$.` : T`Lengths are stretched by $\frac{1}{\cos\varphi} = \frac{1}{\cos ${la}^\circ} = ${M(sig(k))}$.` };
    },
    () => pick([
      { q: T`Which projection is most suitable for a map of Antarctica?`, a: T`Azimuthal`, w: [T`Cylindrical`, T`Conic`, T`Mercator`], only: 'mc', s: T`An azimuthal plane touching the pole shows the polar region with the least distortion.` },
      { q: T`Which projection is most suitable for a map of Indonesia, which lies on the equator?`, a: T`Cylindrical`, w: [T`Azimuthal (polar)`, T`Conic`, T`None; the equator cannot be mapped`], only: 'mc', s: T`A cylinder touching the equator has the least distortion near the equator.` },
      { q: T`Which projection is most suitable for a map of Europe or the United States (middle latitudes)?`, a: T`Conic`, w: [T`Cylindrical`, T`Azimuthal (polar)`, T`Mercator`], only: 'mc', s: T`A cone touching a mid-latitude parallel fits a wide east–west band in the middle latitudes well.` },
    ]),
    () => pick([
      { q: T`A map will show the population of each country with dots. Which property should its projection keep?`, a: T`Area (equal-area)`, w: [T`Shape (conformal)`, T`Distance (equidistant)`, T`Direction only`], only: 'mc', s: T`Density and distribution maps must not make some areas look bigger than others, so an equal-area projection is used.` },
      { q: T`Why did sailors use the Mercator projection?`, a: T`A straight line on it is a constant compass bearing`, w: [T`It shows areas correctly`, T`It shows the poles without distortion`, T`It shows true distances everywhere`], only: 'mc', s: T`Mercator is conformal: angles are true, so a course set with a compass is a straight line on the chart.` },
      { q: T`On a Mercator world map, why does Greenland look about as big as Africa?`, a: T`Areas are stretched more and more towards the poles`, w: [T`Greenland really is that big`, T`Africa is squeezed near the equator`, T`The map is drawn at two different scales on purpose`], only: 'mc', s: T`At about $72^\circ$ the area factor $1/\cos^2\varphi$ is about 10, so Greenland is shown roughly ten times too large. Africa, on the equator, is barely stretched.` },
      { q: T`What is a conformal projection?`, a: T`One that keeps the shape of small areas (true angles)`, w: [T`One that keeps areas in the right proportion`, T`One that keeps distances from a single point`, T`One drawn on a cone`], only: 'mc', s: T`Conformal (orthomorphic) projections keep local angles and shapes; no projection can keep both shape and area.` },
    ]),
    () => {
      const [kind, desc] = pick([['cylindrical', T`meridians and parallels are straight lines crossing at right angles`], ['conic', T`parallels are arcs of circles and meridians are straight lines that meet at a point`], ['azimuthal', T`parallels are circles and meridians radiate out from the centre`]]);
      const name = { cylindrical: T`Cylindrical`, conic: T`Conic`, azimuthal: T`Azimuthal` }[kind];
      return { q: T`On a projection, ${desc}. Which type of projection is it?${Fig(projectionSvg(kind, { label: T`A projection surface and the grid it produces` }))}`, a: name, w: [T`Cylindrical`, T`Conic`, T`Azimuthal`, T`Globe`].filter(x => x !== name), only: 'mc', s: T`That grid is produced by a ${name} projection.` };
    },
  ],
},
{
  id: 'contours', stage: 'sh', title: 'Contours & Relief',
  blurb: 'Reading contour lines, contour interval, spot heights, drawing a cross-section, and calculating gradient and slope from a topographic map.',
  lesson: () => T`
<p>Topographic maps show the height of the land with <b>contour lines</b>: lines joining points of equal height above mean sea level. The height difference between neighbouring contours is the <b>contour interval</b>; every fifth line (the index contour) is usually drawn thicker.</p>
${FigW(contourSvg([[30, 26, 330, 11], [68, 34, 240, 9], [86, 12, 130, 7]], { interval: 50, A: [8, 30], B: [94, 30], label: T`A contour map of two hills with a line A–B and the cross-section along it` }), T`Two hills with a 50 m contour interval, and the cross-section (profile) along A–B.`)}
${Key(T`<p><b>Reading contours.</b> Lines close together mean a steep slope; far apart, a gentle slope. Closed rings with rising values are a hill; contours never cross or split. Where contours form a V, the V points <b>upstream</b> in a valley and <b>downhill</b> along a ridge.</p>`)}
${FigW(contourSpacingSvg(), T`The spacing of contours shows the slope: the same 200 m climb over a short distance is steep, over a long distance gentle.`)}
<p>A common rule for the contour interval of a map is</p>
${Fm(T`\text{CI} = \frac{\text{scale denominator}}{2000}\ \text{metres}`)}
<p>so a $1 : 50\,000$ map has contours every $25\,\mathrm{m}$.</p>
<h3>Gradient and slope</h3>
${Fm(T`\text{gradient} = \frac{\text{difference in height}}{\text{horizontal distance}} \qquad \text{slope angle} = \tan^{-1}(\text{gradient})`)}
<p>Both distances must be in the same unit. A rise of $100\,\mathrm{m}$ over $2\,\mathrm{km}$ is $\frac{100}{2000} = \frac{1}{20}$, which is $5\%$ or about $2.9^\circ$.</p>
${Tip(T`<p>Measure the horizontal distance on the map and convert it with the scale first. Only then divide the height difference by it.</p>`)}`,
  gens: [
    () => {
      const h1 = ri(1, 8) * 50, dh = pick([50, 100, 150, 200, 250, 300]), den = pick([25000, 50000]), d = pick([2, 3, 4, 5, 6, 8]), horiz = d * den / 100, g = dh / horiz, ask = pick(['ratio', 'pct', 'deg']);
      const fig = FigW(contourSvg([[62, 30, h1 + dh + 20, 16]], { interval: 50, base: h1 - 30, marks: [[20, 30, `A · ${h1} m`], [62, 30, `B · ${h1 + dh} m`]], profile: false, label: T`A contour map with points A and B` }));
      return ask === 'ratio'
        ? { q: T`On a map with a scale of $1 : ${M(den)}$, point A (${h1} m) and point B (${h1 + dh} m) are ${Q(d, 'cm')} apart. What is the gradient from A to B? Give it as $1 : n$ and type $n$.${fig}`, a: sig(horiz / dh), w: [sig(dh / horiz * 100), sig(horiz / dh / 10), sig(d * den / dh)],
          s: T`Horizontal distance $= ${d} \times ${M(den)}\,\mathrm{cm} = ${M(horiz)}\,\mathrm{m}$. Gradient $= \frac{${dh}}{${M(horiz)}} = 1 : ${M(sig(horiz / dh))}$.` }
        : ask === 'pct'
          ? { q: T`On a map with a scale of $1 : ${M(den)}$, point A (${h1} m) and point B (${h1 + dh} m) are ${Q(d, 'cm')} apart. What is the average slope between them, as a percentage?${fig}`, a: sig(g * 100), u: '%', w: [sig(g), sig(g * 1000), sig(deg(Math.atan(g)))],
            s: T`Horizontal distance $= ${M(horiz)}\,\mathrm{m}$, so the slope is $\frac{${dh}}{${M(horiz)}} \times 100\% = ${M(sig(g * 100))}\%$.` }
          : { q: T`On a map with a scale of $1 : ${M(den)}$, point A (${h1} m) and point B (${h1 + dh} m) are ${Q(d, 'cm')} apart. What is the average slope angle between them, in degrees?${fig}`, a: sig(deg(Math.atan(g))), u: '°', rtol: 0.02, w: [sig(g * 100), sig(deg(Math.atan(g)) * 10), sig(deg(Math.asin(Math.min(1, g * 3))))],
            s: T`Horizontal distance $= ${M(horiz)}\,\mathrm{m}$; gradient $= \frac{${dh}}{${M(horiz)}} = ${M(sig(g))}$; angle $= \tan^{-1}(${M(sig(g))}) = ${QT(sig(deg(Math.atan(g))), '°')}$.` };
    },
    () => {
      const den = pick([10000, 20000, 25000, 50000, 100000, 200000]), ci = den / 2000;
      return { q: T`Using the rule $\text{CI} = \frac{\text{denominator}}{2000}$, what contour interval suits a map with a scale of $1 : ${M(den)}$?`, a: ci, u: 'm', rtol: 0, w: [den / 1000, den / 200, den / 20000], s: T`$\frac{${M(den)}}{2000} = ${QT(ci, 'm')}$.` };
    },
    () => {
      const ci = pick([10, 12.5, 25, 50, 100]), lo = ri(1, 6) * ci, n = ri(3, 9), hi = lo + n * ci;
      return { q: T`A hill has contours from ${Q(lo, 'm')} up to ${Q(hi, 'm')} with an interval of ${Q(ci, 'm')}. How many contour lines are drawn on it (including both of those)?`, a: n + 1, rtol: 0, w: [n, n + 2, hi / ci], s: T`$\frac{${M(hi)} - ${M(lo)}}{${M(ci)}} = ${n}$ intervals, which need $${n} + 1 = ${n + 1}$ lines.` };
    },
    () => pick([
      { q: T`On a contour map the lines are very close together on the east side of a hill and far apart on the west side. What does this mean?`, a: T`The east side is steeper`, w: [T`The west side is steeper`, T`The east side is higher`, T`Both sides have the same slope`], only: 'mc', s: T`The closer the contours, the more height is gained in a short distance: a steeper slope.` },
      { q: T`Contours cross a river in a V shape. Which way does the V point?`, a: T`Upstream, towards higher ground`, w: [T`Downstream, towards the sea`, T`Towards the east`, T`It depends on the scale`], only: 'mc', s: T`A valley cuts back into higher ground, so the V of the contours points upstream.` },
      { q: T`What is shown by a set of closed contour rings whose values increase towards the centre?`, a: T`A hill or peak`, w: [T`A depression`, T`A valley`, T`A plain`], only: 'mc', s: T`Rising values inwards mean the ground rises to a top. A depression is marked with small ticks pointing inwards.` },
      { q: T`What does a contour line join?`, a: T`Points of equal height above sea level`, w: [T`Points of equal rainfall`, T`Points of equal temperature`, T`Points of equal pressure`], only: 'mc', s: T`Contours (isohypses) join equal heights. Lines of equal rainfall are isohyets, of equal temperature isotherms, of equal pressure isobars.` },
    ]),
  ],
},
{
  id: 'remote-sensing', stage: 'sh', title: 'Remote Sensing',
  blurb: 'Gathering information about the Earth without touching it: energy, sensors and platforms, spectral signatures, resolution, image interpretation and photo scale.',
  lesson: () => T`
<p><b>Remote sensing</b> is gathering information about an object without touching it, by recording the electromagnetic energy it reflects or emits. Satellites, aircraft and drones carry the sensors.</p>
${FigW(remoteSensingSvg({ sun: T`Sun`, sensor: T`Sensor`, atmosphere: T`Atmosphere`, station: T`Ground station`, label: T`Sunlight passes through the atmosphere, is reflected by the ground and recorded by a satellite sensor, which sends the data to a ground station` }), T`The components: an energy source, the atmosphere, the object, the sensor on its platform, and the receiving station where the data are processed and interpreted.`)}
<p>A <b>passive</b> system records sunlight reflected by the surface (or heat it emits). An <b>active</b> system, such as radar, sends out its own energy, so it can work at night and see through clouds, which is very useful in cloudy Indonesia.</p>
<h3>Spectral signatures</h3>
${FigW(lineChartSvg([
  { pts: [[0.4, 5], [0.5, 9], [0.55, 14], [0.65, 5], [0.72, 22], [0.8, 48], [1.0, 50], [1.3, 42], [1.45, 20], [1.65, 34], [1.9, 12], [2.2, 22], [2.4, 15]], cls: 'g-l3', label: T`Vegetation`, at: 5, dx: 6, dy: -8, anchor: 'start' },
  { pts: [[0.4, 10], [0.6, 18], [0.8, 25], [1.0, 30], [1.3, 33], [1.45, 28], [1.65, 36], [1.9, 26], [2.2, 34], [2.4, 30]], cls: 'g-l4', label: T`Dry soil`, at: 9, dx: -4, dy: -8 },
  { pts: [[0.4, 8], [0.5, 7], [0.6, 4], [0.7, 2], [0.8, 1], [1.0, 0.5], [1.5, 0.3], [2.4, 0.2]], cls: 'g-l1', label: T`Water`, at: 6, dx: 0, dy: -8 }],
  { xMin: 0.4, xMax: 2.4, xStep: 0.4, yMax: 60, yStep: 20, xl: T`wavelength (µm)`, yl: T`reflectance (%)`, label: T`Spectral signatures of vegetation, dry soil and water` }), T`Each surface reflects a different share of each wavelength. Healthy plants reflect strongly in the near infrared, water absorbs almost all of it.`)}
${Tbl([T`Resolution`, T`Meaning`], [[T`Spatial`, T`the size of the smallest object that can be seen (one pixel covers e.g. $30\,\mathrm{m} \times 30\,\mathrm{m}$)`], [T`Spectral`, T`the number and width of the wavelength bands recorded`], [T`Temporal`, T`how often the same place is recorded (e.g. every 16 days)`], [T`Radiometric`, T`how many brightness levels the sensor can distinguish`]])}
${Key(T`<p><b>Elements of image interpretation</b>: tone or colour, size, shape, texture, pattern, shadow, site and association. For example, a large rectangle with a long straight strip beside it (shape and association) suggests an airport.</p>`)}
<p>The scale of a vertical aerial photograph depends on the camera's focal length $f$ and the flying height $H$ above the ground:</p>
${Fm(T`\text{scale} = \frac{f}{H}`)}
${Tip(T`<p>Put $f$ and $H$ in the same unit: a $150\,\mathrm{mm}$ lens at $3000\,\mathrm{m}$ gives $\frac{0.15}{3000} = \frac{1}{20\,000}$.</p>`)}`,
  gens: [
    () => {
      const f = pick([100, 150, 152, 200, 300]), H = pick([1500, 2000, 3000, 4500, 6000]), den = sig(H / (f / 1000));
      return { q: T`An aerial camera with a focal length of ${Q(f, 'mm')} takes vertical photos from ${Q(H, 'm')} above the ground. What is the photo scale? Type the denominator.`, a: den, rtol: 0.005, w: [sig(H / f), sig(den * 10), sig(f * H)], h: T`Type only the denominator, e.g. 20000 for 1 : 20,000.`,
        s: T`$\frac{f}{H} = \frac{${f}\,\mathrm{mm}}{${M(H)}\,\mathrm{m}} = \frac{${M(f / 1000)}\,\mathrm{m}}{${M(H)}\,\mathrm{m}} = 1 : ${M(den)}$.` };
    },
    () => {
      const den = pick([5000, 10000, 20000, 25000, 50000]), cm = pick([1.2, 2, 2.5, 3, 4.5, 6]), m = sig(cm * den / 100);
      return { q: T`On an aerial photograph with a scale of $1 : ${M(den)}$ a runway is ${Q(cm, 'cm')} long. How long is it on the ground?`, a: m, u: 'm', w: [sig(m * 10), sig(m / 10), sig(cm * den)], s: T`$${M(cm)} \times ${M(den)} = ${M(cm * den)}\,\mathrm{cm} = ${QT(m, 'm')}$.` };
    },
    () => {
      const px = pick([10, 15, 20, 30, 60, 250]), km2 = pick([1, 4, 9, 25, 100]), n = sig(km2 * 1e6 / (px * px));
      return { q: T`A satellite image has a spatial resolution of ${Q(px, 'm')} (each pixel covers ${px} m × ${px} m). How many pixels cover an area of ${Q(km2, 'km^2')}?`, a: n, w: [sig(km2 * 1e6 / px), sig(n / 10), sig(n * 10)], rtol: 0.01,
        s: T`One pixel is $${px}^2 = ${M(px * px)}\,\mathrm{m^2}$ and $${km2}\,\mathrm{km^2} = ${M(km2 * 1e6)}\,\mathrm{m^2}$, so there are $\frac{${M(km2 * 1e6)}}{${M(px * px)}} = ${M(n)}$ pixels.` };
    },
    () => pick([
      { q: T`A satellite records the same area every 16 days. Which kind of resolution does this describe?`, a: T`Temporal resolution`, w: [T`Spatial resolution`, T`Spectral resolution`, T`Radiometric resolution`], only: 'mc', s: T`Temporal resolution is how often the same place is imaged.` },
      { q: T`A sensor records 11 separate wavelength bands. Which kind of resolution does this describe?`, a: T`Spectral resolution`, w: [T`Spatial resolution`, T`Temporal resolution`, T`Radiometric resolution`], only: 'mc', s: T`Spectral resolution is the number and width of the bands.` },
      { q: T`On an image, one pixel covers 10 m × 10 m of ground. Which kind of resolution is this?`, a: T`Spatial resolution`, w: [T`Spectral resolution`, T`Temporal resolution`, T`Radiometric resolution`], only: 'mc', s: T`Spatial resolution is the ground size of one pixel: the smallest object that can be seen.` },
      { q: T`Why is radar useful for mapping Indonesia?`, a: T`It sends its own energy, so it works at night and through clouds`, w: [T`It uses sunlight, so it has better colours`, T`It only records heat`, T`It is carried only by aircraft`], only: 'mc', s: T`Radar is an active system with microwaves that pass through clouds, which cover much of Indonesia for much of the year.` },
      { q: T`Which surface reflects most strongly in the near-infrared band?`, a: T`Healthy vegetation`, w: [T`Clear water`, T`Asphalt`, T`Deep shadow`], only: 'mc', s: T`The cell structure of healthy leaves reflects near infrared strongly, which is why vegetation looks bright in infrared images. Water absorbs it.` },
    ]),
    () => {
      const [q, a] = pick([[T`Rice fields are recognised by their regular, square plots arranged side by side.`, T`Pattern`], [T`A football field is recognised by its size and rectangular outline.`, T`Shape`], [T`A forest looks rough and a grass field looks smooth.`, T`Texture`], [T`Water appears dark on the image.`, T`Tone / colour`], [T`A tall chimney is recognised by the long shadow it casts.`, T`Shadow`], [T`A building next to a sports field and a car park is probably a school.`, T`Association`], [T`Mangroves are recognised because they grow along muddy coasts.`, T`Site`]]);
      return { q: T`Which element of image interpretation is used here? <i>${q}</i>`, a, w: [T`Pattern`, T`Shape`, T`Texture`, T`Tone / colour`, T`Shadow`, T`Association`, T`Site`, T`Size`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`The clue is the object's <b>${a}</b>.` };
    },
  ],
},
{
  id: 'gis', stage: 'sh', title: 'Geographic Information Systems',
  blurb: 'What a GIS is, its components, vector and raster data, spatial and attribute data, and analyses such as overlay, buffer and query.',
  lesson: () => T`
<p>A <b>Geographic Information System</b> (GIS) is a computer system for capturing, storing, analysing and displaying data that are tied to locations on the Earth. It turns maps into layers of data that can be combined and questioned.</p>
${Fig(gisLayersSvg([T`Roads`, T`Rivers`, T`Settlements`, T`Land use`, T`Elevation`], { label: T`Five data layers of the same area stacked on top of each other` }), T`A GIS stores each theme as a separate layer over the same area; layers can be switched on, combined and analysed.`)}
<p>Its five components are <b>hardware</b>, <b>software</b>, <b>data</b>, <b>people</b> (users and operators) and <b>methods</b>. The work runs in four stages: data input, data management, analysis and manipulation, and output (maps, tables, reports).</p>
<h3>Two kinds of data</h3>
${Fig(rasterVectorSvg({ raster: T`Raster`, vector: T`Vector`, label: T`The same area stored as raster cells and as vector points, lines and polygons` }), T`Raster data are a grid of cells, each with one value. Vector data are points, lines and polygons defined by coordinates.`)}
${Tbl([T``, T`Vector`, T`Raster`], [[T`Stores`, T`points, lines, polygons`, T`a grid of cells (pixels)`], [T`Good for`, T`boundaries, roads, rivers, wells`, T`continuous surfaces: height, rainfall, satellite images`], [T`Detail`, T`sharp edges, small files`, T`depends on cell size; can be large files`]])}
<p><b>Spatial data</b> say <i>where</i> a feature is (its coordinates); <b>attribute data</b> say <i>what</i> it is (name, population, land use) and are kept in a table linked to the feature.</p>
${Key(T`<p><b>Common analyses.</b> <i>Overlay</i>: combining layers, e.g. flat land that is not forest and not flood-prone. <i>Buffer</i>: a zone of set width around a feature, e.g. 100 m either side of a river. <i>Query</i>: selecting features that meet a condition. <i>Network analysis</i>: the shortest or fastest route along roads.</p>`)}
${Tip(T`<p>The area of a buffer around a single point of radius $r$ is $\pi r^2$; along a straight road of length $L$, a buffer of width $w$ on each side covers about $2wL$.</p>`)}`,
  gens: [
    () => {
      const cell = pick([10, 20, 30, 50, 100]), n = pick([100, 250, 400, 1000, 2500]), ha = sig(n * cell * cell / 1e4);
      return { q: T`In a raster land-use map each cell is ${cell} m × ${cell} m. The forest class covers ${NUM(n)} cells. What area is that, in hectares? ($1\,\mathrm{ha} = 10\,000\,\mathrm{m^2}$.)`, a: ha, u: 'ha', w: [sig(ha * 100), sig(n * cell / 1e4), sig(ha / 100)],
        s: T`One cell is $${cell}^2 = ${M(cell * cell)}\,\mathrm{m^2}$, so the forest covers $${M(n)} \times ${M(cell * cell)} = ${M(n * cell * cell)}\,\mathrm{m^2} = ${QT(ha, 'ha')}$.` };
    },
    () => {
      const r = pick([100, 200, 250, 500, 1000]), A = sig(Math.PI * r * r / 1e4);
      return { q: T`A GIS draws a buffer of radius ${Q(r, 'm')} around a well. What area does the buffer cover, in hectares?`, a: A, u: 'ha', rtol: 0.01, w: [sig(2 * Math.PI * r / 1e4), sig(A * 100), sig(r * r / 1e4)],
        s: T`$A = \pi r^2 = \pi \times ${r}^2 = ${M(sig(Math.PI * r * r))}\,\mathrm{m^2} = ${QT(A, 'ha')}$.` };
    },
    () => {
      const w = pick([25, 50, 100, 200]), L = pick([2, 3, 5, 8, 12]), A = sig(2 * w * L * 1000 / 1e4);
      return { q: T`A buffer of ${Q(w, 'm')} is drawn on each side of a straight road ${Q(L, 'km')} long. Ignoring the rounded ends, what area does it cover, in hectares?`, a: A, u: 'ha', w: [sig(A / 2), sig(A * 10), sig(w * L)],
        s: T`Width $2 \times ${w} = ${2 * w}\,\mathrm{m}$, length $${M(L * 1000)}\,\mathrm{m}$: $${2 * w} \times ${M(L * 1000)} = ${M(2 * w * L * 1000)}\,\mathrm{m^2} = ${QT(A, 'ha')}$.` };
    },
    () => pick([
      { q: T`A planner wants land that is flat, not forest and outside the flood zone. Which GIS analysis combines these layers?`, a: T`Overlay`, w: [T`Buffer`, T`Network analysis`, T`Digitising`], only: 'mc', s: T`Overlay combines several layers to find places that meet all the conditions at once.` },
      { q: T`Building is banned within 100 m of a river. Which GIS analysis marks this zone?`, a: T`Buffer`, w: [T`Overlay`, T`Query`, T`Interpolation`], only: 'mc', s: T`A buffer draws a zone of fixed distance around a feature.` },
      { q: T`An ambulance needs the fastest route to a hospital. Which GIS analysis is used?`, a: T`Network analysis`, w: [T`Buffer`, T`Overlay`, T`Classification`], only: 'mc', s: T`Network analysis finds shortest or fastest routes along a road network.` },
      { q: T`Which data model is best for a digital elevation model covering a whole province?`, a: T`Raster`, w: [T`Vector points only`, T`Vector lines`, T`Attribute table only`], only: 'mc', s: T`Height changes continuously, so a grid of cells (raster) suits it.` },
      { q: T`In a GIS, how is a river usually stored as vector data?`, a: T`As a line`, w: [T`As a point`, T`As a polygon`, T`As a raster cell`], only: 'mc', s: T`Rivers and roads are lines; wells and towns on a small-scale map are points; lakes and districts are polygons.` },
      { q: T`Which of these is attribute data?`, a: T`The population of each village`, w: [T`The coordinates of each village`, T`The outline of each district`, T`The route of a river`], only: 'mc', s: T`Attribute data describe what a feature is; coordinates and outlines are spatial data.` },
      { q: T`Which is <b>not</b> one of the five components of a GIS?`, a: T`A printed atlas`, w: [T`Hardware`, T`Software`, T`People`], only: 'mc', s: T`The components are hardware, software, data, people and methods.` },
    ]),
  ],
},
  ],
});
