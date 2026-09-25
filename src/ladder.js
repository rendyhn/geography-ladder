/* ==========================================================================
   The ladder: which topics each topic builds on, and why.
   link(from, to, why): "to" builds on "from". An end may be a topic that is
   still planned (shown greyed out), math:<id> (a topic on Math Ladder) or
   phys:<id> (a topic on Physics Ladder); those open in a new tab.
   The reason is shown on both pages, so it has to read well from either side.
   ========================================================================== */
const LADDER = [];
const link = (from, to, why) => LADDER.push({ from, to, why });
/* topics on the sister sites used as prerequisites (English titles; packs translate them under meta.math / meta.phys) */
const EXT = {
  math: {
    url: 'https://rendyhn.github.io/math-ladder/', icon: '∑', label: 'mathLadder',
    topics: {
      'ratio': 'Ratio, Rates & Proportion', 'percent': 'Percentages', 'measurement': 'Measurement & Units', 'angles-shapes': 'Angles & Shapes',
      'similarity': 'Transformations & Similarity', 'pythagoras': 'Pythagorean Theorem', 'circles': 'Circles', 'sci-notation': 'Scientific Notation',
      'linear-functions': 'Linear Functions & Graphs', 'data-basic': 'Data & Averages', 'statistics-jh': 'Statistics: Centre & Spread',
      'trig-basics': 'Trigonometry: Ratios & the Unit Circle', 'exp-log': 'Exponents & Logarithms', 'sequences': 'Sequences & Series',
      'statistics-sh': 'Statistics: Spread & Distributions', 'probability-sh': 'Probability: Rules & Conditional', 'conics': 'Coordinate Geometry & Circles',
      'integrals': 'Integrals', 'distributions': 'Probability Distributions', 'inference': 'Statistical Inference',
    },
  },
  phys: {
    url: 'https://rendyhn.github.io/physics-ladder/', icon: 'Φ', label: 'physLadder',
    topics: {
      'units': 'Quantities, Units & Conversions', 'circular': 'Circular Motion', 'gravitation': 'Gravitation & Orbits', 'fluid-statics': 'Fluids at Rest',
      'fluid-dynamics': 'Fluids in Motion', 'mech-waves': 'Mechanical Waves', 'heat': 'Temperature, Heat & Expansion', 'gases': 'Kinetic Theory & Ideal Gases',
      'heat-transfer': 'Heat Transfer: Conduction, Convection & Radiation', 'em-waves': 'Electromagnetic Waves', 'radioactivity': 'Nuclei & Radioactivity',
      'renewables': 'Renewable & Alternative Energy', 'climate': 'Global Warming & the Greenhouse Effect',
    },
  },
};

/* ---------- A. Maps & geographic tools ---------- */
link('geo-concepts', 'map-scale', () => T`A map is the geographer's main tool for showing location, distance and pattern.`);
link('math:ratio', 'map-scale', () => T`A map scale is a ratio, and converting map distances to real distances is working with proportion.`);
link('math:similarity', 'map-scale', () => T`A map is a reduced copy of the ground: lengths shrink by the scale factor and areas by its square.`);
link('geo-concepts', 'coordinates', () => T`Coordinates give the absolute location of a place.`);
link('math:circles', 'coordinates', () => T`Parallels and meridians are circles on a sphere, and degrees of latitude are arcs of a meridian.`);
link('math:trig-basics', 'coordinates', () => T`A degree of longitude shrinks with the cosine of the latitude.`);
link('coordinates', 'time-zones', () => T`Time zones follow the meridians: every 15° of longitude is one hour.`);
link('coordinates', 'projections', () => T`A projection transfers the grid of parallels and meridians onto a flat map.`);
link('map-scale', 'projections', () => T`Every projection distorts the scale somewhere on the map.`);
link('map-scale', 'contours', () => T`The horizontal distance for a gradient is measured on the map and converted with the scale.`);
link('math:linear-functions', 'contours', () => T`A gradient is rise over run, just like the slope of a straight line.`);
link('math:trig-basics', 'contours', () => T`The slope angle is the inverse tangent of the gradient.`);
link('phys:em-waves', 'remote-sensing', () => T`Sensors record reflected and emitted electromagnetic radiation, band by band across the spectrum.`);
link('map-scale', 'remote-sensing', () => T`Aerial photographs have a scale, set by the focal length and the flying height.`);
link('map-scale', 'gis', () => T`A GIS is built from digital map layers.`);
link('remote-sensing', 'gis', () => T`Satellite images are one of the main sources of raster data in a GIS.`);

/* ---------- B. Lithosphere ---------- */
link('geo-concepts', 'earth-structure', () => T`The lithosphere is one of the spheres that make up the geosphere.`);
link('phys:mech-waves', 'earth-structure', () => T`The Earth's layers are found from how seismic waves speed up, slow down and bend.`);
link('phys:heat', 'earth-structure', () => T`The geothermal gradient describes how temperature rises with depth.`);
link('earth-structure', 'plate-tectonics', () => T`Plates are pieces of the rigid lithosphere moving over the weak asthenosphere.`);
link('coordinates', 'plate-tectonics', () => T`Plate boundaries and volcanoes are located on maps by their coordinates.`);
link('plate-tectonics', 'rocks', () => T`Igneous rocks form where plates melt, and metamorphic rocks where they collide.`);
link('plate-tectonics', 'volcanism', () => T`Most volcanoes lie along subduction zones and divergent boundaries.`);
link('rocks', 'volcanism', () => T`Volcanoes erupt magma that cools into igneous rocks such as andesite and basalt.`);
link('plate-tectonics', 'earthquakes', () => T`Most earthquakes happen where plates grind past or beneath each other.`);
link('phys:mech-waves', 'earthquakes', () => T`Earthquake energy travels as P, S and surface waves.`);
link('math:exp-log', 'earthquakes', () => T`Magnitude scales are logarithmic: one step is ten times the amplitude.`);
link('rocks', 'weathering', () => T`Weathering breaks down rocks and is the first step of the rock cycle towards sediment.`);
link('weathering', 'landforms', () => T`Rivers, the sea, the wind and ice shape landforms by erosion and deposition.`);
link('plate-tectonics', 'landforms', () => T`Folds and faults are made by the forces of moving plates.`);
link('contours', 'landforms', () => T`Landforms are read from their contour patterns on topographic maps.`);
link('weathering', 'soils', () => T`Soil forms from weathered rock mixed with organic matter.`);
link('volcanism', 'soils', () => T`Volcanic ash weathers into Indonesia's fertile andosols.`);
link('math:percent', 'soils', () => T`Soil texture is given as the percentages of sand, silt and clay.`);

/* ---------- C. The atmosphere ---------- */
link('geo-concepts', 'atmosphere-layers', () => T`The atmosphere is one of the layers of the geosphere that geography studies.`);
link('phys:gases', 'atmosphere-layers', () => T`Air is a mixture of gases whose pressure and temperature follow the gas laws.`);
link('math:exp-log', 'atmosphere-layers', () => T`Air pressure halves again and again with height: an exponential decrease.`);
link('atmosphere-layers', 'weather-elements', () => T`Weather happens in the troposphere, where temperature falls with height.`);
link('contours', 'weather-elements', () => T`Isotherms and isobars are read like contour lines.`);
link('math:linear-functions', 'weather-elements', () => T`Braak's formula is a linear function of height.`);
link('phys:heat', 'weather-elements', () => T`Temperature and its measurement come from physics.`);
link('weather-elements', 'winds', () => T`Wind is driven by differences in air pressure and temperature.`);
link('coordinates', 'winds', () => T`The wind belts are arranged by latitude.`);
link('phys:heat-transfer', 'winds', () => T`Convection makes warm air rise and cool air sink.`);
link('phys:circular', 'winds', () => T`The Coriolis effect comes from the rotation of the Earth.`);
link('weather-elements', 'precipitation', () => T`Clouds form when humid air cools to its dew point.`);
link('winds', 'precipitation', () => T`Winds lift moist air over mountains and into storms.`);
link('math:ratio', 'precipitation', () => T`The Schmidt–Ferguson Q value is a ratio of dry to wet months.`);
link('precipitation', 'climate-types', () => T`Climates are classified by their temperature and rainfall through the year.`);
link('coordinates', 'climate-types', () => T`The solar climate zones follow lines of latitude.`);
link('math:data-basic', 'climate-types', () => T`A climograph is a chart of monthly averages; range and totals are simple statistics.`);
link('climate-types', 'climate-change', () => T`Climate change shifts the climates of whole regions.`);
link('atmosphere-layers', 'climate-change', () => T`Greenhouse gases are part of the air's composition.`);
link('phys:climate', 'climate-change', () => T`The physics of the greenhouse effect explains why added gases warm the Earth.`);
link('math:linear-functions', 'climate-change', () => T`A rate of change, such as ppm per year, is the slope of a trend line.`);

/* ---------- D. The hydrosphere ---------- */
link('precipitation', 'water-cycle', () => T`Rain and evaporation are the links of the water cycle.`);
link('phys:heat', 'water-cycle', () => T`Evaporation and condensation are changes of state that take in or release heat.`);
link('math:percent', 'water-cycle', () => T`The runoff coefficient is a fraction of the rainfall.`);
link('water-cycle', 'rivers', () => T`Rivers carry the runoff of the water cycle back to the sea.`);
link('contours', 'rivers', () => T`Watersheds and drainage basins are traced on contour maps.`);
link('landforms', 'rivers', () => T`Rivers shape valleys, meanders and deltas.`);
link('phys:fluid-dynamics', 'rivers', () => T`Discharge Q = A v is the flow rate of a fluid.`);
link('water-cycle', 'groundwater', () => T`Infiltration and percolation refill the groundwater.`);
link('rocks', 'groundwater', () => T`Whether rock stores water depends on its porosity and permeability.`);
link('phys:fluid-statics', 'groundwater', () => T`Artesian water rises because it is under pressure.`);
link('plate-tectonics', 'oceans', () => T`Ridges, trenches and seamounts are made at plate boundaries.`);
link('winds', 'oceans', () => T`Winds drive the surface ocean currents.`);
link('phys:fluid-statics', 'oceans', () => T`Pressure in the sea grows with depth.`);
link('oceans', 'tides-coasts', () => T`Tides and waves are movements of the sea.`);
link('landforms', 'tides-coasts', () => T`Coastal landforms are made by erosion and deposition, like river landforms.`);
link('phys:gravitation', 'tides-coasts', () => T`Tides are raised by the gravity of the Moon and the Sun.`);
link('phys:mech-waves', 'tides-coasts', () => T`Wave speed equals wavelength divided by period.`);

/* ---------- E. The biosphere ---------- */
link('climate-types', 'biogeography', () => T`Climate is the strongest control on where plants and animals live.`);
link('soils', 'biogeography', () => T`Soil is the edaphic factor in the distribution of plants.`);
link('plate-tectonics', 'biogeography', () => T`The Sunda and Sahul shelves and the deep seas of Wallacea come from plate movements.`);
link('weather-elements', 'biogeography', () => T`Temperature falls with height, which gives mountains their vegetation zones.`);
link('climate-types', 'biomes', () => T`Biomes follow the climate zones.`);
link('biogeography', 'biomes', () => T`Biomes are the world-scale pattern of plant and animal distribution.`);
link('math:exp-log', 'biomes', () => T`Energy falls by a factor of ten at each level of a food chain.`);
link('biomes', 'conservation', () => T`Conservation protects the ecosystems of each biome.`);
link('biogeography', 'conservation', () => T`Endemic species of Wallacea are especially vulnerable.`);
link('math:probability-sh', 'conservation', () => T`Simpson's index is the probability that two individuals belong to different species.`);
link('math:exp-log', 'conservation', () => T`A fixed yearly percentage loss of forest is exponential decay.`);
