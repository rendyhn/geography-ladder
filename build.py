"""Inline src/ into a single page plus one file per language.

   python build.py              -> index.html + lang/<code>.js (open index.html directly, or host on GitHub Pages)
   python build.py --artifact   -> also dist/ (body-only page + lang files for a claude.ai Artifact)
"""
import pathlib
import shutil
import sys

root = pathlib.Path(__file__).parent
src = root / 'src'
read = lambda name: (src / name).read_text(encoding='utf-8')

js_files = ['core.js', 'geo.js', 'tA-maps.js', 'tB-lithosphere.js', 'tC-atmosphere.js', 'tD-hydrosphere.js', 'tE-biosphere.js', 'tF-population.js', 'tG-regions.js', 'tH-environment.js', 'tI-indonesia.js', 'tJ-university.js', 'ladder.js', 'app.js']
js = '\n'.join(read(f) for f in js_files)
assert '</script' not in js.lower(), 'script body must not contain a closing script tag'

head = read('head.html').replace('/*CSS*/', read('style.css'))
body = read('body.html')
script = '<script>\n' + js + '\n</script>\n'

page = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head + '</head>\n<body>\n' + body + script + '</body>\n</html>\n')
(root / 'index.html').write_text(page, encoding='utf-8')
print(f'index.html  {len(page.encode()) / 1024:.0f} KB')

# language packs: src/lang/<code>/*.js -> lang/<code>.js
out_lang = root / 'lang'
out_lang.mkdir(exist_ok=True)
packs = {}
for d in sorted((src / 'lang').glob('*')) if (src / 'lang').exists() else []:
    if d.is_dir():
        text = '\n'.join(f.read_text(encoding='utf-8') for f in sorted(d.glob('*.js')))
        packs[d.name] = text
        (out_lang / f'{d.name}.js').write_text(text, encoding='utf-8')
if packs:
    print('lang/       ' + ', '.join(f'{c} {len(t.encode()) / 1024:.0f} KB' for c, t in packs.items()))

if '--artifact' in sys.argv:
    fragment = head + body + script
    dist = root / 'dist'
    dist.mkdir(exist_ok=True)
    (dist / 'geography-ladder.html').write_text(fragment, encoding='utf-8')
    if (dist / 'lang').exists():
        shutil.rmtree(dist / 'lang')
    shutil.copytree(out_lang, dist / 'lang')
    print(f'dist/geography-ladder.html  {len(fragment.encode()) / 1024:.0f} KB (+ lang/)')
