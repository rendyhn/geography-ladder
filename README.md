# Geography Ladder

<img src="logo.svg" width="96" alt="">

Geography lessons and practice worksheets, topic by topic, for senior high school and the first years of university: from maps and the solid Earth to the atmosphere, water, population, regions and global issues. Every lesson is illustrated with maps and diagrams drawn from the data, and every worksheet is generated fresh when it opens, with worked solutions, an answer key and print-ready pages. English and Bahasa Indonesia.

A companion to [Math Ladder](https://github.com/rendyhn/math-ladder) and [Physics Ladder](https://github.com/rendyhn/physics-ladder): each topic lists what it builds on, including topics on those sites, and links straight to them.

## Contents

The 53 topics are laid out in ten tracks: 48 for senior high school (A–I) and 5 for the first years of university (J).

| Track | Topics |
|---|---|
| A. Maps & Geographic Tools | concepts & approaches; maps & scale; latitude & longitude; time zones; projections; contours & relief; remote sensing; GIS |
| B. The Lithosphere | structure of the Earth; plate tectonics; rocks; volcanism; earthquakes; weathering & erosion; landforms; soils |
| C. The Atmosphere | layers of the atmosphere; elements of weather; pressure & winds; clouds & precipitation; climate classification; climate change |
| D. The Hydrosphere | the water cycle; rivers & drainage basins; groundwater, lakes & wetlands; oceans; tides, waves & coasts |
| E. The Biosphere | distribution of flora & fauna; world biomes; biodiversity & conservation |
| F. Population | growth; structure; migration & urbanisation; the demographic transition; human development |
| G. Resources, Regions & Economy | natural resources; agriculture & land use; industrial location; central places; spatial interaction; villages & cities; regional development |
| H. Hazards & Environment | natural hazards & disaster management; environment & sustainable development |
| I. Indonesia & the World | Indonesia's position & territory; geopolitics & borders; developed & developing countries; globalisation & cooperation |
| J. University Geography | spatial analysis; quantitative geomorphology; applied hydrology; thematic cartography; research methods |

## Answers

- Fill-in answers within about 1% are accepted, unless the question asks for an exact count.
- Units may be typed after the number (`25 km`, `12 °C`, `35 ‰`).
- In Bahasa Indonesia, both `2,5` (decimal comma) and `50.000` (thousands point) are understood.

## Languages

English and Bahasa Indonesia. Pick one from the menu at the top, or open the page with `?lang=en` or `?lang=id`. Translations were produced with AI assistance and have not yet been reviewed. Corrections are welcome.

## Running it

Open `index.html` in any modern browser, from disk or from a static host, with the `lang/` folder next to it. Formulas are rendered by MathJax from a CDN, so an internet connection is needed. The page follows the device's light or dark setting, and the sun/moon button switches between them. To save a lesson or worksheet as PDF, use its Print button and choose **Save as PDF**.

## Publishing on GitHub Pages

Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`. The site needs only `index.html`, `.nojekyll` and `lang/`.

## Development

The page is built from `src/`:

```
python build.py
```

This writes `index.html` and `lang/<code>.js`. Edit the files in `src/`, not the built output.

English text in `src/*.js` is written as ``T`...` ``, and each language pack in `src/lang/<code>/` maps a key to its translation. `tools/i18n.py` keeps them in step:

```
python tools/i18n.py catalog     # extract every English string to i18n/
python tools/i18n.py check id    # coverage, placeholders, TeX and HTML checks
python tools/i18n.py missing id  # strings still untranslated
```

## Files

| Path | Purpose |
|---|---|
| `index.html` | The app, built from `src/`. English is built in; other languages load from `lang/`. |
| `lang/<code>.js` | Built language packs. |
| `src/tA-maps.js` … `src/tJ-university.js` | Lessons and question generators for each track. |
| `src/geo.js` | Numbers and units, and the SVG maps, charts and diagrams (globe, Indonesia map, contours, pyramids, climographs, cycles and more). |
| `src/ladder.js` | Prerequisite links between topics and to Math Ladder and Physics Ladder, each with its reason. |
| `src/core.js` | Random numbers, number formatting, formula builders, the translation system. |
| `src/app.js` | Navigation, worksheets, answer checking, answer key, printing, language menu, day/night mode. |
| `src/style.css`, `src/head.html`, `src/body.html` | Styles (light/dark, print, map colours) and page skeleton. |
| `src/lang/<code>/` | Translation sources. |
| `tools/i18n.py` | Translation catalogue and checks. |
| `build.py` | Build script. |

## License

- **Code** (the app, question generators, build script and tools): [MIT](LICENSE).
- **Educational content** (lessons, questions, worked solutions, figures, topic links and all translations): [CC BY-NC 4.0](LICENSE-CONTENT). You may share and adapt it with credit to *Geography Ladder by rendyhn*, but not for commercial use. Free use in classrooms, tutoring and self-study is welcome. Ask for permission for commercial use.

The content was prepared with AI assistance and has not yet been fully reviewed by teachers. Please check it before relying on it, and report errors on the issue tracker.

The outlines in the maps of Indonesia are simplified sketches, not survey-accurate boundaries.

---

© 2026 @rendyhn
