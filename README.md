# Anurag Maurya — bilingual portfolio

Anurag’s portfolio is available in German and English. German is the default. The DE/EN control stays visible while scrolling, remembers the visitor’s choice, and preserves the current section when switching.

## Preview

```sh
python -m http.server 4173 --directory dist
```

Open `http://localhost:4173/` for German or `http://localhost:4173/?lang=en` for English. The original résumé and artwork are shared by both languages. The résumé PDF is the supplied file; its contents are not translated by the website switch.

## Editing copy

- `source/index.en.html` is the original English source.
- `source/translations.json` contains the German page copy. Image descriptions and control labels live in `build-i18n.py`.
- Run `python build-i18n.py` after changing copy. It generates the German default `dist/index.html` and the English switch logic in `dist/i18n.js`.
- `dist/i18n.css` styles the switch and adapts longer German headings on narrow screens.

The gallery contains seven Work items. The four newly supplied images appear as two Hamburg Messe + Congress visual research boards and separate Lumiere and Café Farol website concepts. With no live project links supplied, each new card opens its image. Experience includes these as portfolio practice without an invented employer or date.

The existing layout, animation scripts, and résumé remain in `dist/`. The switch loads before the animation scripts so animated headings receive the correct language.

## Branch

This work is on `anurags`. Gourav’s portfolio branches are independent. The inherited Sites configuration belongs to Gourav’s deployment; use a separate target to publish Anurag’s site.

Personal photographs, résumé, and portfolio content belong to Anurag Maurya. No open-source license is granted by this repository.
