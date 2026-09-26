/* ==========================================================================
   TRACK C — The Atmosphere
   ========================================================================== */
level({
  id: 'atmosphere', mark: 'C', name: 'The Atmosphere', short: 'Atmosphere', band: 'Weather · climate · change', color: 'lv3',
  blurb: 'The air around the Earth: its layers, the elements of weather, winds and rain, the world’s climates and how they are changing.',
  topics: [
{
  id: 'atmosphere-layers', stage: 'sh', title: 'Layers of the Atmosphere',
  blurb: 'What air is made of, the four layers of the atmosphere and how temperature and pressure change with height, the ozone layer and the ionosphere.',
  lesson: () => T`
<p>The <b>atmosphere</b> is the layer of gases held around the Earth by gravity. It gives us oxygen to breathe, keeps the planet warm, shields us from ultraviolet rays and meteors, and is where all weather happens. Half of its mass lies below about 5.5 km, and 99% below about 30 km.</p>
${Fig(donutSvg([{ label: T`Nitrogen (N₂)`, value: 78.08, show: '78%', cls: 'g-s1' }, { label: T`Oxygen (O₂)`, value: 20.95, show: '21%', cls: 'g-s3' }, { label: T`Argon (Ar)`, value: 0.93, show: NUM(0.93) + '%', cls: 'g-s4' }, { label: T`CO₂ and others`, value: 0.04, show: NUM(0.04) + '%', cls: 'g-s2' }], { center: T`dry air`, label: T`A donut chart of the gases in dry air: 78 percent nitrogen, 21 percent oxygen, 0.93 percent argon and 0.04 percent carbon dioxide and others` }), T`The gases of dry air, by volume. Water vapour (0–4%) comes on top of this and varies from place to place.`)}
<h3>Four layers</h3>
<p>The layers are defined by how <b>temperature changes with height</b>. The boundaries between them are called the tropopause, stratopause and mesopause.</p>
${FigW(atmosphereSvg({ names: { tropo: T`Troposphere`, strato: T`Stratosphere`, meso: T`Mesosphere`, thermo: T`Thermosphere`, ozone: T`ozone layer`, temp: T`temperature` }, label: T`The layers of the atmosphere from the ground to 110 km with the temperature curve: it falls in the troposphere, rises in the stratosphere, falls in the mesosphere and rises again in the thermosphere` }), T`Temperature falls, rises, falls and rises again with height. Each change of direction marks the top of a layer.`)}
${Tbl([T`Layer`, T`Height`, T`Temperature with height`, T`Features`], [
  [T`Troposphere`, T`0 to about 12 km (16–18 km at the equator, 8 km at the poles)`, T`falls about 6.5 °C per km`, T`holds almost all water vapour; clouds, rain and weather happen here`],
  [T`Stratosphere`, T`12 to 50 km`, T`rises`, T`the ozone layer (20–35 km) absorbs ultraviolet rays and warms the air; calm, so long-haul jets fly at its base`],
  [T`Mesosphere`, T`50 to 85 km`, T`falls to about −90 °C, the coldest part`, T`meteors burn up here as shooting stars`],
  [T`Thermosphere`, T`above 85 km`, T`rises steeply`, T`contains the ionosphere, which reflects radio waves; auroras; the International Space Station orbits here`]])}
${Key(T`<p><b>Temperature in the troposphere.</b> Air is heated from below by the ground, so it gets colder with height, on average by <b>6.5 °C for every kilometre</b> (the environmental lapse rate):</p><p>$$T_h = T_0 - 6.5\,h$$</p><p>with $h$ in km. <b>Pressure</b> falls much faster: it roughly halves for every 5.5 km of height, from about 1 013 hPa at sea level.</p>`)}
${Tip(T`<p>The <b>ozone layer</b> is thinned by chlorofluorocarbons (CFCs) once used in refrigerators and spray cans. The Montreal Protocol (1987) banned them, and the ozone hole over Antarctica is slowly recovering.</p>`)}`,
  gens: [
    () => {
      const [d, a] = pick([[T`Almost all clouds, rain and storms happen in this layer.`, T`Troposphere`], [T`The ozone layer that absorbs ultraviolet rays is found in this layer.`, T`Stratosphere`], [T`Meteors burn up as shooting stars in this layer.`, T`Mesosphere`], [T`This layer contains the ionosphere, which reflects radio waves.`, T`Thermosphere`], [T`Temperature falls about 6.5 °C for each kilometre of height in this layer.`, T`Troposphere`], [T`This is the coldest layer of the atmosphere, down to about −90 °C at its top.`, T`Mesosphere`], [T`Temperature rises with height here because ozone absorbs sunlight.`, T`Stratosphere`], [T`Auroras glow and the International Space Station orbits in this layer.`, T`Thermosphere`]]);
      return { q: T`Which layer of the atmosphere is this? <i>${d}</i>`, a, w: [T`Troposphere`, T`Stratosphere`, T`Mesosphere`, T`Thermosphere`].filter(x => x !== a), only: 'mc', s: T`That describes the <b>${a}</b>.` };
    },
    () => {
      const t0 = pick([25, 27, 28, 30, 32]), h = pick([1, 2, 3, 4, 5, 6, 8, 10]), t = sig(t0 - 6.5 * h, 3);
      return { q: T`The air temperature at sea level is ${Q(t0, '°C')}. Using the average lapse rate of 6.5 °C per km, what is the temperature ${Q(h, 'km')} up in the troposphere?`, a: t, u: '°C', rtol: 0.01, w: [sig(t0 - 0.6 * h, 3), sig(t0 + 6.5 * h, 3), sig(t0 - 10 * h, 3)],
        s: T`$T = ${M(t0)} - 6.5 \times ${M(h)} = ${QT(t, '°C')}$.` };
    },
    () => {
      const k = pick([1, 2, 3]), h = sig(5.5 * k, 3), p = sig(1013 / 2 ** k, 3);
      return { q: T`Air pressure at sea level is about ${Q(1013, 'hPa')} and it roughly halves for every 5.5 km of height. What is the pressure about ${Q(h, 'km')} up?`, a: p, u: 'hPa', rtol: 0.02, w: [sig(1013 - 100 * h, 3) > 0 ? sig(1013 - 100 * h, 3) : sig(p * 3, 3), sig(1013 / (2 * k), 3) === p ? sig(p / 2, 3) : sig(1013 / (2 * k), 3), sig(p * 2, 3)],
        s: T`${k === 1 ? T`One halving` : T`${k} halvings`}: $1013 \div ${M(2 ** k)} = ${QT(p, 'hPa')}$.` };
    },
    () => {
      const v = pick([10, 20, 50, 100, 250, 500]), g = pick([[T`oxygen`, 21], [T`nitrogen`, 78]]), a = sig(v * g[1] / 100, 3);
      return { q: T`About how many litres of ${g[0]} are there in ${Q(v, 'L')} of dry air?`, a, u: 'L', rtol: 0.02, w: [sig(v * (99 - g[1]) / 100, 3), sig(v * g[1] / 1000, 3), sig(v - a, 3)],
        s: T`Dry air is about ${g[1]}% ${g[0]}: $${M(g[1] / 100)} \times ${M(v)} = ${QT(a, 'L')}$.` };
    },
    () => pick([
      { q: T`Which gas makes up most of the atmosphere?`, a: T`Nitrogen`, w: [T`Oxygen`, T`Carbon dioxide`, T`Argon`], only: 'mc', s: T`Nitrogen is about 78% of dry air, oxygen about 21%.` },
      { q: T`Why is the troposphere thicker over the equator (16–18 km) than over the poles (about 8 km)?`, a: T`Strong heating makes the air expand and rise higher`, w: [T`The Earth's gravity is stronger at the equator`, T`There is more ozone at the equator`, T`The poles have more water vapour`], only: 'mc', s: T`The warm air over the tropics expands and convection lifts it higher, pushing the tropopause up.` },
      { q: T`Why does the stratosphere get warmer with height?`, a: T`Ozone absorbs ultraviolet radiation from the Sun`, w: [T`It is heated by the ground below`, T`It is closer to the Sun`, T`Meteors release heat there`], only: 'mc', s: T`Ozone absorbs ultraviolet energy and releases it as heat, warming the upper stratosphere.` },
      { q: T`Which substances damaged the ozone layer and were banned by the Montreal Protocol?`, a: T`Chlorofluorocarbons (CFCs)`, w: [T`Carbon dioxide`, T`Sulphur dioxide`, T`Water vapour`], only: 'mc', s: T`Chlorine from CFCs breaks ozone molecules apart; the 1987 Montreal Protocol phased them out.` },
      { q: T`Why can long-distance radio signals travel around the curve of the Earth?`, a: T`They are reflected by the ionosphere`, w: [T`They follow the ozone layer`, T`Clouds carry them`, T`They bend around mountains`], only: 'mc', s: T`The ionosphere, in the thermosphere, has charged particles that reflect short radio waves back to the ground.` },
      { q: T`Why does air temperature fall with height in the troposphere?`, a: T`The air is heated from below by the ground`, w: [T`The Sun is further away higher up`, T`Ozone cools the air`, T`Clouds absorb all the heat`], only: 'mc', s: T`Sunlight warms the ground, and the ground warms the air above it; the further from the ground, the less heat reaches the air.` },
    ]),
  ],
},
{
  id: 'weather-elements', stage: 'sh', title: 'Elements of Weather',
  blurb: 'Weather and climate, the elements of weather and the instruments that measure them, temperature and height (Braak), Junghuhn’s zones, humidity and isolines.',
  lesson: () => T`
<p><b>Weather</b> is the state of the atmosphere at a place over a short time (hours or days). <b>Climate</b> is the average weather of a large area over a long time, at least 30 years. Both are described by the same elements, measured at weather stations (in Indonesia by BMKG).</p>
${Tbl([T`Element`, T`Instrument`, T`Unit`], [[T`Air temperature`, T`thermometer (in a Stevenson screen)`, T`°C`], [T`Air pressure`, T`barometer`, T`hPa (millibar)`], [T`Humidity`, T`hygrometer or psychrometer`, T`%`], [T`Wind speed`, T`anemometer`, T`knots or km/h`], [T`Wind direction`, T`wind vane`, T`compass direction`], [T`Rainfall`, T`rain gauge (ombrometer)`, T`mm`], [T`Sunshine`, T`Campbell–Stokes recorder`, T`hours per day`]])}
<h3>Temperature and height</h3>
<p>Indonesia lies on the equator, so its temperature changes little over the year; the biggest differences come from <b>height</b>. Braak worked out that the temperature falls about 0.6 °C for every 100 m:</p>
${Key(T`<p>$$T = 26.3 - 0.6 \times \frac{h}{100}$$</p><p>where $T$ is the mean annual temperature in °C, $26.3$ °C is the mean at sea level in Indonesia and $h$ is the height in metres. Between two places: $T_B = T_A - 0.6 \times \frac{h_B - h_A}{100}$.</p>`)}
${FigW(mountainTempSvg({ peak: 3200, zones: true, marks: [[0], [1000], [2500]], names: { z1: T`Hot (0–700 m)`, z2: T`Temperate (700–1 500 m)`, z3: T`Cool (1 500–2 500 m)`, z4: T`Cold (above 2 500 m)` }, label: T`A mountain with Junghuhn's four climate zones and temperatures at 0, 1 000 and 2 500 metres from Braak's formula` }), T`Junghuhn's zones and Braak's temperatures up a mountain.`)}
${Tbl([T`Junghuhn zone`, T`Height`, T`Typical plants`], [[T`Hot`, T`0–700 m`, T`rice, coconut, sugar cane, maize, cocoa`], [T`Temperate`, T`700–1 500 m`, T`tea, coffee, tobacco, rubber`], [T`Cool`, T`1 500–2 500 m`, T`vegetables, cinchona (quinine), pine`], [T`Cold`, T`above 2 500 m`, T`mosses, lichens, no crops`]])}
${Fig(planeSvg({ W: 360, H: 230, x: [0, 42], y: [0, 55], step: [5, 10], tickX: 10, xl: 'T (°C)', yl: 'g/m³', extra: (X, Y, D = [[0, 4.85], [5, 6.8], [10, 9.4], [15, 12.8], [20, 17.3], [25, 23.0], [30, 30.4], [35, 39.6], [40, 51.1]]) => sPline(D.map(([t, v]) => [X(t), Y(v)]), 'mf-c1', ' fill="none" stroke-width="2.2"') + sL(X(30), Y(0), X(30), Y(30.4), 'mf-grid', ' stroke-dasharray="4 3"'), pts: [[30, 30.4, T`saturated: 30.4`, 'end', false, 8, -6], [30, 21.3, T`actual: 21.3 → RH 70%`, 'end', false, 8, 22]], label: T`Maximum water vapour air can hold rising steeply with temperature; at 30 degrees air holding 21.3 grams per cubic metre has a relative humidity of 70 percent` }), T`Warm air can hold much more water vapour. At $30\,^\circ\mathrm{C}$ the maximum is about $30\,\mathrm{g/m^3}$, so air holding $21.3\,\mathrm{g/m^3}$ has $RH = 70\%$. Cool that air and $RH$ rises until dew forms.`)}
<h3>Humidity</h3>
<p><b>Absolute humidity</b> is the mass of water vapour in a cubic metre of air (g/m³). <b>Relative humidity</b> compares it with the most the air could hold at that temperature:</p>
${Key(T`<p>$$RH = \frac{\text{actual water vapour}}{\text{maximum water vapour}} \times 100\%$$</p><p>At 100% the air is saturated and water condenses into dew, fog or cloud. Warm air can hold more vapour than cold air.</p>`)}
${Tip(T`<p>BMKG takes the <b>daily mean temperature</b> from readings at 07:00, 13:00 and 18:00: $T = \frac{2\,T_{07} + T_{13} + T_{18}}{4}$. On weather maps, lines join places with equal values: <b>isotherms</b> (temperature), <b>isobars</b> (pressure), <b>isohyets</b> (rainfall), <b>isohels</b> (sunshine) and <b>isonephs</b> (cloud cover).</p>`)}`,
  gens: [
    () => {
      const h = pick([300, 500, 800, 1200, 1500, 1800, 2100, 2500, 3000]), t = sig(26.3 - 0.006 * h, 3);
      return { q: T`Using Braak's formula, what is the mean annual temperature of a town ${Q(h, 'm')} above sea level in Indonesia?${FigW(mountainTempSvg({ peak: 3200, marks: [[h, T`${F(h)} m · ?`]], label: T`A mountain with one town marked on its slope` }))}`, a: t, u: '°C', rtol: 0.01, w: [sig(26.3 - 0.06 * h, 3) > -60 ? sig(26.3 - 0.06 * h, 3) : sig(t + 3, 3), sig(26.3 + 0.006 * h, 3), sig(26.3 - 0.0065 * h, 3) === t ? sig(t - 2, 3) : sig(26.3 - 0.0065 * h, 3)],
        s: T`$T = 26.3 - 0.6 \times \frac{${M(h)}}{100} = 26.3 - ${M(sig(0.006 * h, 3))} = ${QT(t, '°C')}$.` };
    },
    () => {
      const t = pick([23.3, 20.3, 18.5, 17.3, 15.5, 14.3, 11.3]), h = Math.round((26.3 - t) / 0.006);
      return { q: T`A place in Indonesia has a mean annual temperature of ${Q(t, '°C')}. Using Braak's formula, about how high is it above sea level?`, a: h, u: 'm', rtol: 0.01, w: [sig(h / 10, 3), sig((26.3 - t) / 0.0065, 3), sig(h + 500, 3)],
        s: T`$${M(t)} = 26.3 - 0.6 \times \frac{h}{100}$, so $h = \frac{26.3 - ${M(t)}}{0.6} \times 100 = ${QT(h, 'm')}$.` };
    },
    () => {
      const ta = pick([30, 28, 27, 26]), ha = pick([0, 50, 100, 200]), hb = ha + pick([600, 900, 1200, 1500, 2000]), tb = sig(ta - 0.6 * (hb - ha) / 100, 3);
      return { q: T`Town A is ${Q(ha, 'm')} above sea level and has a temperature of ${Q(ta, '°C')}. Town B on the same mountain is ${Q(hb, 'm')} high. Taking a fall of 0.6 °C per 100 m, what is the temperature in town B?`, a: tb, u: '°C', rtol: 0.01, w: [sig(ta - 0.6 * hb / 100, 3) === tb ? sig(tb - 1, 3) : sig(ta - 0.6 * hb / 100, 3), sig(ta - 0.6 * (hb - ha) / 10, 3), sig(ta + 0.6 * (hb - ha) / 100, 3)],
        s: T`The difference in height is ${Q(hb - ha, 'm')}, so the temperature falls $0.6 \times ${M((hb - ha) / 100)} = ${M(sig(0.006 * (hb - ha), 3))}$ °C: $T_B = ${M(ta)} - ${M(sig(0.006 * (hb - ha), 3))} = ${QT(tb, '°C')}$.` };
    },
    () => {
      const mx = pick([17, 23, 30, 30, 40]), rh = pick([50, 60, 70, 75, 80, 90]), act = sig(mx * rh / 100, 3);
      return { q: T`Air at a certain temperature can hold at most ${Q(mx, 'g/m³')} of water vapour. It actually holds ${Q(act, 'g/m³')}. What is the relative humidity?`, a: rh, u: '%', rtol: 0.01, w: [sig(mx / act * 100, 3), sig(mx - act, 3), 100 - rh],
        s: T`$RH = \frac{${M(act)}}{${M(mx)}} \times 100\% = ${M(rh)}\%$.` };
    },
    () => {
      const t7 = pick([22, 23, 24, 25]), t13 = t7 + pick([6, 7, 8, 9]), t18 = t7 + pick([2, 3, 4]), t = sig((2 * t7 + t13 + t18) / 4, 3);
      return { q: T`A weather station reads ${Q(t7, "°C")} at 07:00, ${Q(t13, "°C")} at 13:00 and ${Q(t18, "°C")} at 18:00. Using $T = \frac{2\,T_{07} + T_{13} + T_{18}}{4}$, what is the daily mean temperature?`, a: t, u: '°C', rtol: 0.01, w: [sig((t7 + t13 + t18) / 3, 3) === t ? sig(t + 1, 3) : sig((t7 + t13 + t18) / 3, 3), sig((t7 + 2 * t13 + t18) / 4, 3), sig((t7 + t13) / 2, 3)],
        s: T`$T = \frac{2 \times ${M(t7)} + ${M(t13)} + ${M(t18)}}{4} = \frac{${M(2 * t7 + t13 + t18)}}{4} = ${QT(t, '°C')}$.` };
    },
    () => {
      const [d, a] = pick([[T`air pressure`, T`Barometer`], [T`wind speed`, T`Anemometer`], [T`the amount of rain that falls`, T`Rain gauge (ombrometer)`], [T`humidity`, T`Hygrometer`], [T`how many hours the Sun shines`, T`Campbell–Stokes recorder`], [T`wind direction`, T`Wind vane`], [T`air temperature`, T`Thermometer`]]);
      return { q: T`Which instrument measures ${d}?`, a, w: [T`Barometer`, T`Anemometer`, T`Rain gauge (ombrometer)`, T`Hygrometer`, T`Campbell–Stokes recorder`, T`Wind vane`, T`Thermometer`, T`Seismograph`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`It is measured with a <b>${a}</b>.` };
    },
    () => {
      const [d, a] = pick([[T`Tea and coffee plantations`, T`Temperate (700–1 500 m)`], [T`Rice fields and coconut palms`, T`Hot (0–700 m)`], [T`Vegetable gardens and cinchona`, T`Cool (1 500–2 500 m)`], [T`Only mosses and lichens`, T`Cold (above 2 500 m)`], [T`Sugar cane and cocoa`, T`Hot (0–700 m)`], [T`Tobacco`, T`Temperate (700–1 500 m)`], [T`Pine forests and potatoes`, T`Cool (1 500–2 500 m)`]]);
      return { q: T`In Junghuhn's scheme, which climate zone suits this? <i>${d}</i>`, a, w: [T`Hot (0–700 m)`, T`Temperate (700–1 500 m)`, T`Cool (1 500–2 500 m)`, T`Cold (above 2 500 m)`].filter(x => x !== a), only: 'mc', s: T`That belongs to the <b>${a}</b> zone.` };
    },
    () => {
      const [d, a] = pick([[T`equal air pressure`, T`Isobar`], [T`equal temperature`, T`Isotherm`], [T`equal rainfall`, T`Isohyet`], [T`equal hours of sunshine`, T`Isohel`], [T`equal cloud cover`, T`Isoneph`]]);
      return { q: T`What is a line on a map joining places with ${d} called?`, a, w: [T`Isobar`, T`Isotherm`, T`Isohyet`, T`Isohel`, T`Isoneph`, T`Contour`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That line is an <b>${a}</b>.` };
    },
    () => pick([
      { q: T`What is the main difference between weather and climate?`, a: T`Weather is short-term; climate is the average over at least 30 years`, w: [T`Weather covers a large area; climate a small one`, T`Weather is measured with instruments; climate is not`, T`There is no difference`], only: 'mc', s: T`Weather is the state of the air over hours or days; climate is the long-term average over a large area.` },
      { q: T`Why are thermometers kept in a white, slatted box (a Stevenson screen)?`, a: T`To measure the air in the shade without direct sunlight`, w: [T`To keep the rain gauge dry`, T`To stop the wind from moving them`, T`To make them warmer`], only: 'mc', s: T`The white paint reflects sunlight and the slats let air flow through, so the thermometer reads the true air temperature.` },
      { q: T`Why is it cooler in Bandung (about 700 m) than in Jakarta (sea level)?`, a: T`Temperature falls with height`, w: [T`Bandung is further from the equator`, T`Bandung has more cloud all year`, T`Bandung is closer to the sea`], only: 'mc', s: T`Both are at a similar latitude; Bandung is about 700 m higher, so it is about 4 °C cooler.` },
    ]),
  ],
},
{
  id: 'winds', stage: 'sh', title: 'Pressure & Winds',
  blurb: 'Why air moves, Buys Ballot’s law and the Coriolis effect, the global wind belts, Indonesia’s monsoons and local winds such as sea breezes and föhn winds.',
  lesson: () => T`
<p><b>Wind</b> is air moving from an area of <b>high pressure</b> to an area of <b>low pressure</b>. Pressure differences come from uneven heating: warm air expands, rises and leaves low pressure at the surface; cool air sinks and makes high pressure. The bigger the pressure difference over a distance (the <b>pressure gradient</b>), the stronger the wind; on a weather map this shows as isobars that are close together.</p>
${Key(T`<p><b>Buys Ballot's law.</b> Wind blows from high to low pressure, but because the Earth rotates it is turned aside by the <b>Coriolis effect</b>: to the <b>right</b> in the northern hemisphere and to the <b>left</b> in the southern hemisphere. There is no deflection on the equator itself.</p><p>$$\text{pressure gradient} = \frac{p_1 - p_2}{\text{distance}}$$</p>`)}
<h3>The global wind belts</h3>
${FigW(windSvg('cells', { names: { hadley: T`Hadley cell`, ferrel: T`Ferrel cell`, polar: T`Polar cell`, low: T`Low`, high: T`High`, trade: T`trade winds`, west: T`westerlies`, pe: T`polar easterlies`, eq: T`Equator`, pole: T`Pole` }, label: T`A cross-section from the equator to the pole showing the Hadley, Ferrel and polar cells, low pressure at 0 and 60 degrees, high pressure at 30 and 90 degrees, and the surface winds between them` }), T`Three circulation cells in each hemisphere. The surface winds blow from the high-pressure belts towards the low-pressure belts.`)}
${Tbl([T`Belt`, T`Pressure`, T`Weather and winds`], [[T`Equator (0°): the ITCZ or doldrums`, T`low`, T`rising air, heavy rain, calm winds`], [T`0–30°`, T`—`, T`trade winds blow towards the equator (north-east and south-east trades)`], [T`About 30°: the horse latitudes`, T`high`, T`sinking dry air; the world's great deserts`], [T`30–60°`, T`—`, T`westerlies`], [T`About 60°`, T`low`, T`rising air, storms`], [T`Poles (90°)`, T`high`, T`polar easterlies`]])}
<h3>Indonesia's monsoons</h3>
<p>The Sun's overhead position moves between the two tropics during the year, so Asia and Australia take turns being hot (low pressure) and cold (high pressure). The wind between them reverses every half year.</p>
${Fig(monsoonSvg('west', { names: { from: T`from Asia: moist, rainy season` }, label: T`A map of Indonesia with the west monsoon blowing from Asia towards Australia` }), T`West monsoon, about October to April: wind from Asia crosses the Pacific and South China Sea, picks up moisture and brings the rainy season.`)}
${Fig(monsoonSvg('east', { names: { from: T`from Australia: dry season` }, label: T`A map of Indonesia with the east monsoon blowing from Australia towards Asia` }), T`East monsoon, about April to October: dry wind from the Australian desert crosses only a narrow sea and brings the dry season.`)}
<h3>Local winds</h3>
${Fig(windSvg('sea', { names: { breeze: T`Sea breeze (day)`, sea: T`Sea`, land: T`Land`, warm: T`warm air rises`, cool: T`cool air sinks` }, label: T`A sea breeze by day: warm air rises over the land and cool air blows from the sea to the land` }), T`By day the land heats faster than the sea, so the wind blows from sea to land. Fishermen sail home on it in the afternoon.`)}
${Fig(windSvg('land', { names: { breeze: T`Land breeze (night)`, sea: T`Sea`, land: T`Land`, warm: T`warm air rises`, cool: T`cool air sinks` }, label: T`A land breeze at night: air rises over the warmer sea and the wind blows from the land to the sea` }), T`At night the land cools faster, so the wind reverses. Fishermen go out to sea on it.`)}
${Fig(windSvg('foehn', { names: { wind: T`moist wind`, cool: T`cools, clouds, rain`, warm: T`dry, warm wind`, leeward: T`Leeward`, windward: T`Windward` }, label: T`A foehn wind: moist air rises up the windward side and rains, then descends the leeward side as a warm dry wind` }), T`A föhn wind. The air loses its moisture as rain on the windward side, then warms quickly as it sinks down the leeward side.`)}
${Tip(T`<p>Rising moist air cools about <b>0.6 °C per 100 m</b> (its condensing vapour releases heat), but sinking dry air warms about <b>1 °C per 100 m</b>, so the air is warmer at the foot of the leeward side than it was at the start. Indonesia's föhn winds have local names: <i>Bohorok</i> (Deli, North Sumatra), <i>Kumbang</i> (Cirebon and Tegal), <i>Gending</i> (Pasuruan and Probolinggo), <i>Brubu</i> (Makassar) and <i>Wambraw</i> (Biak). Valley breezes blow up the slopes by day and mountain breezes down them at night.</p>`)}`,
  gens: [
    () => {
      const p1 = pick([1016, 1018, 1020, 1024]), dp = pick([4, 6, 8, 10, 12]), d = pick([200, 300, 400, 500]), g = sig(dp / d * 100, 3);
      return { q: T`Place A has an air pressure of ${Q(p1, 'hPa')} and place B, ${Q(d, 'km')} away, ${Q(p1 - dp, 'hPa')}. What is the pressure gradient, in hPa per 100 km? Which way does the wind start to blow?`, a: g, u: 'hPa', rtol: 0.02, w: [sig(dp / d, 3), sig(d / dp, 3), dp],
        s: T`$\frac{${M(p1)} - ${M(p1 - dp)}}{${M(d)}} \times 100 = ${M(g)}$ hPa per 100 km. The wind blows from A (high) towards B (low), turned aside by the Coriolis effect.` };
    },
    () => {
      const t0 = pick([24, 25, 26, 27, 28]), h = pick([1000, 1500, 2000, 2500]), top = sig(t0 - 0.6 * h / 100, 3), end = sig(top + h / 100, 3);
      return { q: T`Moist air at ${Q(t0, '°C')} rises from sea level over a mountain ${Q(h, 'm')} high, cooling 0.6 °C per 100 m. After losing its moisture as rain it descends the other side to sea level, warming 1 °C per 100 m. What is its temperature at the foot of the leeward side?${Fig(windSvg('foehn', { names: { wind: T`moist wind`, cool: T`cools, clouds, rain`, warm: T`dry, warm wind`, leeward: T`Leeward`, windward: T`Windward` }, label: T`A foehn wind crossing a mountain` }))}`, a: end, u: '°C', rtol: 0.01, w: [t0, top, sig(t0 + h / 100, 3)],
        s: T`At the top: $${M(t0)} - 0.6 \times ${M(h / 100)} = ${M(top)}$ °C. Down the other side: $${M(top)} + 1 \times ${M(h / 100)} = ${QT(end, '°C')}$, warmer than where it started. This is a föhn wind.` };
    },
    () => {
      const [d, a] = pick([[T`During the day, cool air blows from the sea towards the land.`, T`Sea breeze`], [T`At night, air blows from the land out to sea.`, T`Land breeze`], [T`By day, air flows up the mountain slopes from the valley.`, T`Valley breeze`], [T`At night, cool air flows down the slopes into the valley.`, T`Mountain breeze`], [T`A hot, dry wind blows down the leeward side of a mountain range.`, T`Föhn wind`]]);
      return { q: T`Which local wind is this? <i>${d}</i>`, a, w: [T`Sea breeze`, T`Land breeze`, T`Valley breeze`, T`Mountain breeze`, T`Föhn wind`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is a <b>${a}</b>.` };
    },
    () => {
      const [n, a] = pick([[T`Bohorok`, T`Deli, North Sumatra`], [T`Kumbang`, T`Cirebon and Tegal`], [T`Gending`, T`Pasuruan and Probolinggo`], [T`Brubu`, T`Makassar`], [T`Wambraw`, T`Biak`]]);
      return { q: T`The föhn wind called <i>${n}</i> blows in which area?`, a, w: [T`Deli, North Sumatra`, T`Cirebon and Tegal`, T`Pasuruan and Probolinggo`, T`Makassar`, T`Biak`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`The ${n} wind blows in <b>${a}</b>.` };
    },
    () => {
      const west = chance();
      return { q: T`Look at the map. Which monsoon is shown, and what season does it bring to most of Indonesia?${Fig(monsoonSvg(west ? 'west' : 'east', { names: { from: west ? T`from Asia` : T`from Australia` }, label: T`A map of Indonesia with the monsoon winds` }))}`, a: west ? T`West monsoon: rainy season` : T`East monsoon: dry season`, w: west ? [T`East monsoon: dry season`, T`West monsoon: dry season`, T`East monsoon: rainy season`] : [T`West monsoon: rainy season`, T`East monsoon: rainy season`, T`West monsoon: dry season`], only: 'mc',
        s: west ? T`Wind from Asia (high pressure in the northern winter) crosses wide seas, picks up moisture and brings rain: the west monsoon, about October to April.` : T`Wind from Australia (high pressure in the southern winter) crosses little sea and stays dry: the east monsoon, about April to October.` };
    },
    () => pick([
      { q: T`In which direction does the Coriolis effect turn winds in the southern hemisphere?`, a: T`To the left`, w: [T`To the right`, T`It does not turn them`, T`Straight upwards`], only: 'mc', s: T`Winds turn right in the northern hemisphere and left in the southern hemisphere.` },
      { q: T`What are the winds that blow from about 30° latitude towards the equator called?`, a: T`Trade winds`, w: [T`Westerlies`, T`Polar easterlies`, T`Monsoons`], only: 'mc', s: T`The trade winds blow from the subtropical high-pressure belt towards the equatorial low.` },
      { q: T`Why are many of the world's great deserts found at about 30° latitude?`, a: T`Air sinks there, making high pressure and dry weather`, w: [T`It is the hottest latitude`, T`There is no wind there`, T`Rising air brings rain there`], only: 'mc', s: T`Air that rose at the equator sinks at about 30°, warming and drying as it falls: the Sahara, Arabian and Australian deserts lie here.` },
      { q: T`What is the ITCZ?`, a: T`A belt of low pressure near the equator where the trade winds meet`, w: [T`A belt of high pressure at 30°`, T`A cold ocean current`, T`A layer of the atmosphere`], only: 'mc', s: T`The Intertropical Convergence Zone is where the trade winds of both hemispheres meet and air rises, giving heavy rain. It follows the overhead Sun.` },
      { q: T`On a weather map the isobars are very close together. What does this mean?`, a: T`Strong winds`, w: [T`Calm weather`, T`High temperatures`, T`No rain`], only: 'mc', s: T`Close isobars mean a steep pressure gradient, which drives strong winds.` },
      { q: T`Why does the wind blow from the sea to the land during the day?`, a: T`The land heats up faster, so its air rises and pressure is lower`, w: [T`The sea is warmer than the land by day`, T`The Coriolis effect pushes it`, T`The tide pushes the air`], only: 'mc', s: T`Land heats faster than water; the warm air over the land rises, and cooler air from the sea moves in to replace it.` },
    ]),
  ],
},
{
  id: 'precipitation', stage: 'sh', title: 'Clouds & Precipitation',
  blurb: 'How clouds form, the main cloud types, the three kinds of rain, measuring rainfall, and the Schmidt–Ferguson rainfall types of Indonesia.',
  lesson: () => T`
<p>When air rises it expands and cools. Once it cools to its <b>dew point</b> the water vapour <b>condenses</b> on tiny particles of dust, salt or smoke (condensation nuclei), forming the droplets of a <b>cloud</b>. When droplets or ice crystals grow heavy enough they fall as <b>precipitation</b>: rain, drizzle, snow or hail.</p>
${Tbl([T`Family`, T`Height of base`, T`Types`], [[T`High clouds`, T`above 6 km`, T`cirrus (thin, feathery), cirrostratus, cirrocumulus`], [T`Middle clouds`, T`2–6 km`, T`altostratus, altocumulus`], [T`Low clouds`, T`below 2 km`, T`stratus (a grey sheet), stratocumulus, nimbostratus (steady rain)`], [T`Vertical clouds`, T`from low to very high`, T`cumulus (fair-weather heaps) and cumulonimbus (thunderstorms, heavy rain, lightning)`]])}
<h3>Three ways rain forms</h3>
${Fig(rainTypeSvg('convectional', { names: { heated: T`Ground heated by the Sun: warm air rises` }, label: T`Convectional rain: the Sun heats the ground, warm air rises, cools and forms a towering cloud that rains` }), T`<b>Convectional</b> (zenithal) rain: strong heating makes air rise. It is the most common rain in Indonesia, often as afternoon thunderstorms.`)}
${Fig(rainTypeSvg('orographic', { names: { windward: T`Windward: rain`, shadow: T`Leeward: rain shadow` }, label: T`Orographic rain: moist wind rises over a mountain and rains on the windward side; the leeward side is dry` }), T`<b>Orographic</b> (relief) rain: wind is forced up over mountains. The leeward side lies in a dry <b>rain shadow</b>.`)}
${Fig(rainTypeSvg('frontal', { names: { cold: T`Cold, dense air`, warm: T`Warm air forced up` }, label: T`Frontal rain: warm air slides up over a wedge of cold air, cools and rains` }), T`<b>Frontal</b> rain: warm air meets a mass of cold air and slides up over it. It is common in the middle latitudes but not in Indonesia.`)}
<h3>Measuring rainfall</h3>
<p>A <b>rain gauge</b> measures rainfall as a depth in millimetres: 1 mm of rain means 1 litre of water on every square metre, or ${Q(10, 'm³')} on every hectare. <b>Rain intensity</b> is the depth per hour.</p>
${Key(T`<p><b>Schmidt–Ferguson.</b> Using monthly rainfall averaged over many years, a month is <b>dry</b> if it has less than 60 mm and <b>wet</b> if it has more than 100 mm (between is damp). Then</p><p>$$Q = \frac{\text{average number of dry months}}{\text{average number of wet months}} \times 100\%$$</p><p>and $Q$ gives the rainfall type, from A (very wet) to H (extremely dry).</p>`)}
${Tbl([T`Type`, T`Q (%)`, T`Character`], [['A', `0 – ${NUM(14.3)}`, T`very wet`], ['B', `${NUM(14.3)} – ${NUM(33.3)}`, T`wet`], ['C', `${NUM(33.3)} – 60`, T`rather wet`], ['D', '60 – 100', T`moderate`], ['E', '100 – 167', T`rather dry`], ['F', '167 – 300', T`dry`], ['G', '300 – 700', T`very dry`], ['H', T`above 700`, T`extremely dry`]])}
${Tip(T`<p>Most of western Indonesia is type A or B. The driest areas, such as parts of Nusa Tenggara near Australia (Palu too, in a rain shadow), are type E to G.</p>`)}`,
  gens: [
    () => {
      const dry = pick([1, 2, 3, 4, 5, 6]), wet = pick([3, 4, 5, 6, 7, 8, 9]), q = sig(dry / wet * 100, 3);
      return { q: T`A station averages ${dry} dry months and ${wet} wet months a year. What is its Schmidt–Ferguson Q value?`, a: q, u: '%', rtol: 0.01, w: [sig(wet / dry * 100, 3), sig(dry / 12 * 100, 3), sig(dry / (dry + wet) * 100, 3)],
        s: T`$Q = \frac{${dry}}{${wet}} \times 100\% = ${M(q)}\%$.` };
    },
    () => {
      const tbl = [['A', 0, 14.3], ['B', 14.3, 33.3], ['C', 33.3, 60], ['D', 60, 100], ['E', 100, 167], ['F', 167, 300], ['G', 300, 700]], i = ri(0, 6), [a, lo, hi] = tbl[i], q = sig(lo + (hi - lo) * (0.2 + 0.6 * rng()), 3);
      return { q: T`A region has a Schmidt–Ferguson value $Q = ${M(q)}\%$. Which rainfall type is it?`, a, w: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].filter(x => x !== a && Math.abs(x.charCodeAt(0) - a.charCodeAt(0)) <= 2).slice(0, 3), only: 'mc', s: T`$Q$ lies between ${NUM(lo)}% and ${NUM(hi)}%, so it is type <b>${a}</b>.` };
    },
    () => {
      let rain, dry, wet;
      do {
        const nDry = ri(1, 5), start = ri(4, 7);
        rain = [...Array(12)].map((_, i) => { const k = (i - start + 12) % 12; return k < nDry ? ri(1, 11) * 5 : k === nDry ? ri(13, 19) * 5 : ri(22, 70) * 5; });
        dry = rain.filter(r => r < 60).length; wet = rain.filter(r => r > 100).length;
      } while (!dry || !wet);
      const q = sig(dry / wet * 100, 3);
      return { q: T`The chart shows the average monthly rainfall at a station. Count the dry months (under 60 mm) and wet months (over 100 mm). What is the Schmidt–Ferguson Q value?${FigW(barChartSvg(rain.map((r, i) => ({ label: 'JFMAMJJASOND'[i], value: r, cls: r < 60 ? 'g-s2' : r > 100 ? 'g-s1' : 'g-s4' })), { yMax: 400, yStep: 100, yl: 'mm', label: T`Monthly rainfall at a station`, extra: a => ln(a.X(0), a.Y(60), a.X(12), a.Y(60), 'fig-dash') + ln(a.X(0), a.Y(100), a.X(12), a.Y(100), 'fig-dash') }))}`, a: q, u: '%', rtol: 0.01, w: [sig(wet / dry * 100, 3), sig(dry / 12 * 100, 3), sig((dry + 1) / wet * 100, 3)],
        s: T`There are ${dry} dry and ${wet} wet months: $Q = \frac{${dry}}{${wet}} \times 100\% = ${M(q)}\%$.` };
    },
    () => {
      const mm = pick([5, 10, 20, 25, 40, 50]), ha = pick([2, 5, 10, 20, 50]), v = mm * ha * 10;
      return { q: T`${Q(mm, 'mm')} of rain falls on a field of ${Q(ha, 'ha')}. How many cubic metres of water is that? (1 ha = 10 000 m²)`, a: v, u: 'm³', rtol: 0.01, w: [mm * ha, mm * ha * 100, mm * ha * 1000],
        s: T`$${M(mm / 1000)}\,\mathrm{m} \times ${M(ha * 10000)}\,\mathrm{m^2} = ${QT(v, 'm³')}$.` };
    },
    () => {
      const mm = pick([12, 15, 20, 24, 30, 45]), min = pick([15, 20, 30, 40, 45]), i = sig(mm / min * 60, 3);
      return { q: T`A rain gauge collects ${Q(mm, 'mm')} of rain in ${min} minutes. What is the rain intensity, in mm per hour?`, a: i, u: 'mm', rtol: 0.01, w: [sig(mm / min, 3), sig(mm * min / 60, 3), mm],
        s: T`$\frac{${M(mm)}}{${M(min)}} \times 60 = ${M(i)}$ mm per hour.` };
    },
    () => {
      const [d, a] = pick([[T`a thin, white, feathery cloud high in the sky`, T`Cirrus`], [T`a flat grey sheet of low cloud covering the sky`, T`Stratus`], [T`a white, puffy heap of cloud on a fine day`, T`Cumulus`], [T`a huge towering cloud that brings thunder, lightning and heavy rain`, T`Cumulonimbus`], [T`a thick dark layer of low cloud giving long, steady rain`, T`Nimbostratus`]]);
      return { q: T`Which cloud type is ${d}?`, a, w: [T`Cirrus`, T`Stratus`, T`Cumulus`, T`Cumulonimbus`, T`Nimbostratus`, T`Altocumulus`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`That is <b>${a}</b>.` };
    },
    () => {
      const k = pick(['convectional', 'orographic', 'frontal']), a = k === 'convectional' ? T`Convectional rain` : k === 'orographic' ? T`Orographic rain` : T`Frontal rain`;
      return { q: T`Which type of rain does the diagram show?${Fig(rainTypeSvg(k, { names: { heated: T`Ground heated by the Sun`, windward: T`Windward`, shadow: T`Leeward`, cold: T`Cold air`, warm: T`Warm air` }, label: T`A diagram of air rising to form rain` }))}`, a, w: [T`Convectional rain`, T`Orographic rain`, T`Frontal rain`, T`Cyclonic rain`].filter(x => x !== a), only: 'mc',
        s: k === 'convectional' ? T`Strong heating makes the air rise: <b>convectional</b> rain.` : k === 'orographic' ? T`A mountain forces the air up: <b>orographic</b> rain, with a rain shadow behind.` : T`Warm air rides up over cold air: <b>frontal</b> rain.` };
    },
    () => pick([
      { q: T`What must happen to rising air before clouds can form?`, a: T`It must cool to its dew point`, w: [T`It must warm up`, T`It must lose all its dust`, T`It must sink again`], only: 'mc', s: T`At the dew point the air is saturated and the vapour condenses into droplets.` },
      { q: T`Why is Palu in Central Sulawesi one of the driest places in Indonesia?`, a: T`It lies in a rain shadow behind mountains`, w: [T`It is far from the equator`, T`It is very high above sea level`, T`It has frontal rain`], only: 'mc', s: T`Mountains around the Palu valley take the rain on their windward sides, leaving the valley in a rain shadow.` },
      { q: T`What does 1 mm of rainfall mean?`, a: T`1 litre of water on every square metre`, w: [T`1 litre on every hectare`, T`1 cubic metre on every square metre`, T`1 drop every second`], only: 'mc', s: T`1 mm × 1 m² = 0.001 m³ = 1 litre.` },
      { q: T`What are condensation nuclei?`, a: T`Tiny particles on which water vapour condenses`, w: [T`The centre of a cyclone`, T`Ice crystals in a cirrus cloud`, T`Raindrops that evaporate`], only: 'mc', s: T`Dust, salt and smoke particles give water vapour a surface to condense on; cloud seeding adds more of them.` },
    ]),
  ],
},
{
  id: 'climate-types', stage: 'sh', title: 'Climate Classification',
  blurb: 'Reading climographs, the solar (latitude) climate zones, Köppen’s five climate groups with Indonesia’s Af, Am and Aw, and Oldeman’s agroclimate zones.',
  lesson: () => T`
<p>Climate is classified to compare places and to plan farming, building and water supply. The easiest way to see a climate is a <b>climograph</b>: bars for the monthly rainfall and a line for the monthly mean temperature.</p>
${FigW(climographSvg([26.9, 27.1, 27.3, 27.6, 27.8, 27.6, 27.4, 27.6, 27.5, 27.4, 27.2, 27], [270, 215, 250, 280, 250, 220, 165, 195, 225, 355, 390, 320], { tMin: -40, tMax: 40, label: T`Climograph of Pontianak: temperature about 27 degrees all year and more than 150 mm of rain every month` }), T`Pontianak (0°): hot and wet all year, a tropical rainforest climate (Af). The temperature line is almost flat.`)}
${FigW(climographSvg([-6.5, -6.7, -1, 6.7, 13.2, 17, 19.2, 17, 11.3, 5.6, -1.2, -5.2], [52, 41, 35, 37, 49, 80, 94, 77, 66, 71, 55, 52], { tMin: -40, tMax: 40, label: T`Climograph of Moscow: temperature below zero in winter and about 19 degrees in summer, with moderate rain all year` }), T`Moscow (56°N): very cold winters and warm summers, a continental climate (Dfb). The line shows a huge annual range.`)}
<h3>Solar (latitude) climate</h3>
<p>The simplest classification follows the angle of the Sun, and so the latitude.</p>
${Tbl([T`Zone`, T`Latitude`, T`Character`], [[T`Tropical`, `0° – ${NUM(23.5)}°`, T`hot all year, the Sun can be overhead`], [T`Subtropical`, `${NUM(23.5)}° – 40°`, T`hot summers, mild winters`], [T`Temperate`, `40° – ${NUM(66.5)}°`, T`four clear seasons`], [T`Cold (polar)`, `${NUM(66.5)}° – 90°`, T`long, freezing winters`]])}
<h3>Köppen's classification</h3>
<p>Wladimir Köppen used monthly temperature and rainfall to define five main groups, each split by the rain pattern (f = wet all year, m = monsoon, w = dry winter, s = dry summer).</p>
${Tbl([T`Group`, T`Rule`, T`Examples`], [[T`A: tropical`, T`coldest month 18 °C or warmer`, T`Af rainforest (Pontianak), Am monsoon (Jakarta), Aw savanna (Kupang)`], [T`B: dry`, T`evaporation greater than rainfall`, T`BW desert (Cairo), BS steppe`], [T`C: temperate`, T`coldest month between −3 °C and 18 °C`, T`Cfb (London), Csa Mediterranean (Rome)`], [T`D: continental (cold)`, T`coldest month below −3 °C, warmest above 10 °C`, T`Dfb (Moscow)`], [T`E: polar`, T`warmest month below 10 °C`, T`ET tundra, EF ice cap`]])}
${Key(T`<p><b>Reading a climograph.</b> The <i>annual range</i> of temperature is the warmest month minus the coldest. The <i>annual rainfall</i> is the sum of the twelve bars. Near the equator the range is tiny (1–3 °C), so the seasons are set by rain, not by temperature.</p>`)}
${Tip(T`<p><b>Oldeman</b> classified Indonesia's climate for farming by counting the <b>consecutive wet months</b> (over 200 mm, enough for rice) and dry months (under 100 mm). Zone A has more than 9 consecutive wet months, B 7–9, C 5–6, D 3–4 and E fewer than 3.</p>`)}`,
  gens: [
    () => {
      const C = {
        Af: [[27, 27, 27, 28, 28, 27, 27, 27, 27, 27, 27, 27], [270, 215, 250, 280, 250, 220, 165, 195, 225, 355, 390, 320]],
        Am: [[27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 27], [300, 300, 210, 150, 120, 90, 60, 45, 60, 110, 140, 200]],
        Aw: [[27, 27, 27, 27, 27, 26, 25, 26, 27, 29, 29, 28], [390, 350, 230, 60, 20, 5, 5, 2, 5, 20, 90, 250]],
        BWh: [[14, 15, 18, 22, 25, 27, 28, 28, 26, 23, 19, 15], [5, 4, 3, 1, 0, 0, 0, 0, 0, 1, 3, 5]],
        Cfb: [[5, 5, 7, 9, 13, 16, 18, 18, 15, 12, 8, 6], [55, 40, 40, 45, 50, 45, 45, 50, 50, 70, 60, 55]],
        Csa: [[8, 9, 11, 14, 18, 22, 25, 25, 22, 17, 12, 9], [80, 75, 60, 65, 40, 20, 15, 25, 70, 110, 110, 90]],
        Dfb: [[-7, -6, -1, 6, 13, 17, 19, 17, 11, 5, -1, -5], [50, 40, 35, 40, 50, 80, 90, 75, 65, 65, 55, 50]],
        ET: [[-26, -27, -26, -18, -6, 2, 5, 4, -1, -10, -19, -24], [5, 5, 5, 5, 5, 10, 25, 25, 15, 10, 5, 5]] };
      const k = pick(Object.keys(C)), [t, r] = C[k], tt = t.map(x => x + pick([-1, 0, 0, 1])), rr = r.map(x => Math.max(0, Math.round(x * (0.85 + 0.3 * rng()))));
      const G = { A: T`A: tropical`, B: T`B: dry`, C: T`C: temperate`, D: T`D: continental (cold)`, E: T`E: polar` }, a = G[k[0]];
      return { q: T`Which Köppen climate group does this climograph show?${FigW(climographSvg(tt, rr, { tMin: -40, tMax: 40, label: T`A climograph with monthly rainfall bars and a temperature line` }))}`, a, w: Object.values(G).filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc',
        s: T`The coldest month is ${NUM(Math.min(...tt))} °C and the warmest ${NUM(Math.max(...tt))} °C, with ${F(rr.reduce((x, y) => x + y, 0))} mm of rain a year. That fits group <b>${a}</b>.` };
    },
    () => {
      const base = pick([[-7, -6, -1, 6, 13, 17, 19, 17, 11, 5, -1, -5], [5, 5, 7, 9, 13, 16, 18, 18, 15, 12, 8, 6], [27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 27], [14, 15, 18, 22, 25, 27, 28, 28, 26, 23, 19, 15]]), t = base.map(x => x + pick([-1, 0, 1])), a = Math.max(...t) - Math.min(...t);
      return { q: T`The monthly mean temperatures (°C) at a station, January to December, are: ${t.map(x => NUM(x)).join('; ')}. What is the annual range of temperature?`, a, u: '°C', rtol: 0, w: [Math.max(...t) + Math.min(...t), sig(t.reduce((x, y) => x + y, 0) / 12, 3), Math.max(...t) - t[0] === a ? a + 2 : Math.max(...t) - t[0]].filter(x => x !== a),
        s: T`Warmest ${NUM(Math.max(...t))} °C minus coldest ${NUM(Math.min(...t))} °C gives ${Q(a, '°C')}.` };
    },
    () => {
      const r = [...Array(12)].map(() => ri(2, 38) * 10), tot = r.reduce((x, y) => x + y, 0);
      return { q: T`Add up the twelve monthly rainfall values (mm) of this station: ${r.map(x => F(x)).join('; ')}. What is the annual rainfall?${FigW(climographSvg(r.map(() => 27), r, { tMin: -40, tMax: 40, rMax: 400, label: T`A climograph of the same station` }))}`, a: tot, u: 'mm', rtol: 0, w: [sig(tot / 12, 3), tot - r[0], tot + r[11]],
        s: T`The total is ${Q(tot, 'mm')}, an average of ${Q(sig(tot / 12, 3), 'mm')} a month.` };
    },
    () => {
      const lat = pick([5, 12, 20, 28, 35, 45, 52, 60, 70, 80]), a = lat < 23.5 ? T`Tropical` : lat < 40 ? T`Subtropical` : lat < 66.5 ? T`Temperate` : T`Cold (polar)`;
      return { q: T`A place lies at ${lat}° latitude. Which solar climate zone is it in?`, a, w: [T`Tropical`, T`Subtropical`, T`Temperate`, T`Cold (polar)`].filter(x => x !== a), only: 'mc', s: T`The boundaries are ${NUM(23.5)}°, 40° and ${NUM(66.5)}°, so ${lat}° is in the <b>${a}</b> zone.` };
    },
    () => {
      const [c, w, a] = pick([[26, 28, T`A: tropical`], [21, 29, T`A: tropical`], [5, 18, T`C: temperate`], [9, 25, T`C: temperate`], [-8, 19, T`D: continental (cold)`], [-15, 16, T`D: continental (cold)`], [-28, 5, T`E: polar`], [-35, -8, T`E: polar`]]);
      return { q: T`A place with enough rain for trees has a coldest month of ${Q(c, '°C')} and a warmest month of ${Q(w, '°C')}. Which Köppen group is it?`, a, w: [T`A: tropical`, T`C: temperate`, T`D: continental (cold)`, T`E: polar`].filter(x => x !== a), only: 'mc',
        s: T`A: coldest month at least 18 °C. C: coldest between −3 and 18 °C. D: coldest below −3 °C and warmest above 10 °C. E: warmest below 10 °C. So this is <b>${a}</b>.` };
    },
    () => {
      const n = pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), a = n > 9 ? T`Zone A` : n >= 7 ? T`Zone B` : n >= 5 ? T`Zone C` : n >= 3 ? T`Zone D` : T`Zone E`;
      return { q: T`In Oldeman's classification, a region has ${n} consecutive wet months (over 200 mm). Which zone is it?`, a, w: [T`Zone A`, T`Zone B`, T`Zone C`, T`Zone D`, T`Zone E`].filter(x => x !== a).sort(() => rng() - 0.5).slice(0, 3), only: 'mc', s: T`A: more than 9; B: 7–9; C: 5–6; D: 3–4; E: fewer than 3. With ${n} it is <b>${a}</b>.` };
    },
    () => pick([
      { q: T`Which Köppen climate covers most of Kalimantan and Sumatra?`, a: T`Af: tropical rainforest`, w: [T`Aw: tropical savanna`, T`BWh: hot desert`, T`Cfb: temperate oceanic`], only: 'mc', s: T`They are hot and wet all year, with no real dry season: Af.` },
      { q: T`Why does Nusa Tenggara Timur have an Aw (savanna) climate?`, a: T`Dry winds from Australia give it a long dry season`, w: [T`It is far from the equator in the temperate zone`, T`It lies in the Asian monsoon all year`, T`It is very high above sea level`], only: 'mc', s: T`Close to Australia, it gets a long, dry east monsoon; grasslands (savanna) replace forest.` },
      { q: T`In the tropics, what mainly separates the seasons?`, a: T`Rainfall`, w: [T`Temperature`, T`Day length`, T`Snow cover`], only: 'mc', s: T`Temperature hardly changes near the equator, so the year is split into wet and dry seasons.` },
      { q: T`What does the letter "s" mean in a Köppen code such as Csa?`, a: T`A dry summer`, w: [T`A dry winter`, T`Wet all year`, T`A monsoon`], only: 'mc', s: T`f = wet all year, m = monsoon, w = dry winter, s = dry summer (the Mediterranean climate).` },
    ]),
  ],
},
{
  id: 'climate-change', stage: 'sh', title: 'Climate Change',
  blurb: 'The greenhouse effect, rising carbon dioxide and temperatures, El Niño and La Niña, the impacts on Indonesia, and mitigation and adaptation.',
  lesson: () => T`
<p>The Earth's climate has always changed, but since about 1850 people have been changing it quickly by adding greenhouse gases to the air. The world is now about <b>1.2 °C warmer</b> than before the industrial age.</p>
${FigW(greenhouseSvg({ names: { gases: T`greenhouse gases`, sun: T`sunlight (short waves)`, space: T`some heat escapes to space`, back: T`infrared sent back down`, ground: T`the warm ground gives off infrared` }, label: T`The greenhouse effect: sunlight warms the ground, the ground gives off infrared heat, and greenhouse gases send part of it back down` }), T`The greenhouse effect. Without it the Earth would average about −18 °C instead of +15 °C; with more greenhouse gases, more heat is kept in.`)}
${Fig(donutSvg([{ label: T`Carbon dioxide`, value: 76, show: '76%' }, { label: T`Methane`, value: 16, show: '16%' }, { label: T`Nitrous oxide`, value: 6, show: '6%' }, { label: T`Fluorinated gases`, value: 2, show: '2%' }], { center: T`emissions`, label: T`A donut chart of greenhouse gas emissions: carbon dioxide 76 percent, methane 16 percent, nitrous oxide 6 percent, fluorinated gases 2 percent` }), T`Shares of human greenhouse gas emissions (in CO₂ equivalent). CO₂ comes from burning coal, oil and gas and from clearing forests; methane from rice fields, livestock and landfills.`)}
${FigW(lineChartSvg([{ pts: [[1960, 317], [1970, 326], [1980, 339], [1990, 354], [2000, 369], [2010, 390], [2020, 414], [2024, 424]], cls: 'g-l2', dots: true, label: T`CO₂ (ppm)`, at: 5, dy: -12 }], { xMin: 1960, xMax: 2025, xStep: 10, yMin: 300, yMax: 440, yStep: 20, yl: 'ppm', label: T`A line chart of carbon dioxide in the air rising from 317 ppm in 1960 to 424 ppm in 2024` }), T`Carbon dioxide measured at Mauna Loa, Hawaii. Before industry it was about 280 ppm (parts per million).`)}
${Tbl([T`Impact`, T`In Indonesia`], [[T`Sea-level rise (about 4 mm a year)`, T`floods on the north coast of Java, made worse by land subsidence; small islands at risk`], [T`More extreme rain and longer droughts`, T`floods, landslides, forest and peat fires, failed harvests`], [T`Warmer seas`, T`coral bleaching and fewer fish`], [T`Health`, T`more dengue fever as mosquitoes spread`]])}
${Key(T`<p><b>El Niño and La Niña</b> (ENSO) are natural swings in the Pacific. In <b>El Niño</b> the trade winds weaken, warm water moves east towards South America and Indonesia gets <i>less</i> rain: droughts and fires. In <b>La Niña</b> the trade winds strengthen, warm water piles up near Indonesia and rain <i>increases</i>: floods. Climate change may make these swings more extreme.</p>`)}
${Tip(T`<p><b>Mitigation</b> reduces the cause: renewable energy, saving energy, protecting forests and peat, public transport. <b>Adaptation</b> lives with the effects: sea walls and mangroves, drought-resistant crops, early-warning systems. The <b>Kyoto Protocol</b> (1997) and the <b>Paris Agreement</b> (2015), which aims to keep warming well below 2 °C and ideally 1.5 °C, are the main treaties.</p>`)}`,
  gens: [
    () => {
      const [y1, c1, y2, c2] = pick([[1960, 317, 2020, 414], [1970, 326, 2010, 390], [1980, 339, 2020, 414], [1990, 354, 2024, 424], [2000, 369, 2020, 414]]), r = sig((c2 - c1) / (y2 - y1), 3);
      return { q: T`Carbon dioxide in the air was ${Q(c1, 'ppm')} in ${String(y1)} and ${Q(c2, 'ppm')} in ${String(y2)}. What was the average rise per year, in ppm?`, a: r, u: 'ppm', rtol: 0.02, w: [c2 - c1, sig((c2 - c1) / (y2 - y1) / 10, 3), sig(c2 / (y2 - y1), 3)],
        s: T`$\frac{${M(c2)} - ${M(c1)}}{${String(y2)} - ${String(y1)}} = \frac{${M(c2 - c1)}}{${M(y2 - y1)}} = ${M(r)}$ ppm a year.` };
    },
    () => {
      const c = pick([350, 380, 400, 414, 424]), p = sig((c - 280) / 280 * 100, 3);
      return { q: T`Before the industrial age the air held about ${Q(280, 'ppm')} of CO₂. By what percentage had it risen when it reached ${Q(c, 'ppm')}?`, a: p, u: '%', rtol: 0.02, w: [sig(c / 280 * 100, 3), c - 280, sig((c - 280) / c * 100, 3)],
        s: T`$\frac{${M(c)} - 280}{280} \times 100\% = ${M(p)}\%$.` };
    },
    () => {
      const r = pick([3, 3.5, 4, 4.5]), y = pick([20, 30, 50, 80]), cm = sig(r * y / 10, 3);
      return { q: T`The sea is rising by about ${Q(r, 'mm')} a year. If this rate stays the same, how many centimetres will it rise in ${y} years?`, a: cm, u: 'cm', rtol: 0.01, w: [sig(r * y, 3), sig(r * y / 100, 3), sig(r * y / 10 * 2, 3)],
        s: T`$${M(r)} \times ${y} = ${M(sig(r * y, 3))}$ mm $= ${QT(cm, 'cm')}$.` };
    },
    () => {
      const yr = pick([1970, 1985, 1995, 2005, 2015]), pts = [[1960, 317], [1970, 326], [1980, 339], [1990, 354], [2000, 369], [2010, 390], [2020, 414]], i = pts.findIndex(p => p[0] > yr), [xa, ya] = pts[i - 1], [xb, yb] = pts[i], v = sig(ya + (yb - ya) * (yr - xa) / (xb - xa), 3);
      return { q: T`Read the chart. About how much CO₂ was in the air in ${String(yr)}?${FigW(lineChartSvg([{ pts, cls: 'g-l2', dots: true }], { xMin: 1960, xMax: 2020, xStep: 10, yMin: 300, yMax: 420, yStep: 20, yl: 'ppm', label: T`A line chart of CO₂ in the air from 1960 to 2020` }))}`, a: v, u: 'ppm', rtol: 0.02, w: [sig(v + 20, 3), sig(v - 20, 3), sig(v + 40, 3)],
        s: T`Between ${String(xa)} (${F(ya)} ppm) and ${String(xb)} (${F(yb)} ppm) the line passes about ${Q(v, 'ppm')} in ${String(yr)}.` };
    },
    () => {
      const [d, a] = pick([[T`Planting mangroves to protect a coast from rising seas`, T`Adaptation`], [T`Building solar and geothermal power stations instead of coal plants`, T`Mitigation`], [T`Growing a rice variety that survives drought`, T`Adaptation`], [T`Stopping the drainage and burning of peatland`, T`Mitigation`], [T`Raising houses on stilts in a flood-prone area`, T`Adaptation`], [T`Switching from private cars to electric buses and trains`, T`Mitigation`], [T`A flood early-warning system for a river valley`, T`Adaptation`]]);
      return { q: T`Is this climate mitigation or adaptation? <i>${d}</i>`, a, w: [a === T`Mitigation` ? T`Adaptation` : T`Mitigation`, T`Neither`], only: 'mc', s: a === T`Mitigation` ? T`It reduces greenhouse gas emissions, so it is <b>mitigation</b>.` : T`It helps people cope with the effects, so it is <b>adaptation</b>.` };
    },
    () => pick([
      { q: T`During an El Niño year, what usually happens to rainfall in Indonesia?`, a: T`It decreases, bringing drought and fires`, w: [T`It increases, bringing floods`, T`It stays exactly the same`, T`It turns to snow`], only: 'mc', s: T`In El Niño warm water moves east across the Pacific, away from Indonesia, so less rain falls here.` },
      { q: T`During La Niña, what usually happens in Indonesia?`, a: T`More rain and a higher risk of floods`, w: [T`Long droughts and forest fires`, T`Colder winters with frost`, T`No change at all`], only: 'mc', s: T`Stronger trade winds pile warm water near Indonesia, increasing evaporation and rain.` },
      { q: T`Which gas is the largest share of human greenhouse gas emissions?`, a: T`Carbon dioxide`, w: [T`Methane`, T`Oxygen`, T`Nitrogen`], only: 'mc', s: T`CO₂, mostly from fossil fuels and deforestation, is about three quarters of emissions.` },
      { q: T`Which farming activity is a large source of methane?`, a: T`Flooded rice fields`, w: [T`Growing maize`, T`Planting trees`, T`Using solar pumps`], only: 'mc', s: T`Bacteria in waterlogged rice paddies (and in the stomachs of cattle) produce methane.` },
      { q: T`What is the main goal of the Paris Agreement (2015)?`, a: T`Keep warming well below 2 °C, ideally 1.5 °C`, w: [T`Ban CFCs to protect the ozone layer`, T`Stop all use of electricity`, T`Make the Earth 2 °C colder`], only: 'mc', s: T`Countries set their own targets (NDCs) to cut emissions and keep warming well below 2 °C.` },
      { q: T`Why is the greenhouse effect needed for life?`, a: T`Without it the Earth would average about −18 °C`, w: [T`It protects us from ultraviolet rays`, T`It makes the oxygen we breathe`, T`It stops earthquakes`], only: 'mc', s: T`Natural greenhouse gases keep the Earth about 33 °C warmer; the problem is adding more of them.` },
      { q: T`Why does the north coast of Java flood more and more often?`, a: T`Sea-level rise together with land subsidence from pumping groundwater`, w: [T`Tectonic uplift of the coast`, T`Fewer rivers reach the sea`, T`Lower rainfall`], only: 'mc', s: T`In places such as Jakarta and Semarang the land sinks several centimetres a year while the sea rises.` },
    ]),
  ],
},
  ],
});
