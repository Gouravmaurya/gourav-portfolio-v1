# Anurag Maurya — Portfolio v1

An editorial portfolio for Anurag Maurya, print and digital media designer in training at Macromedia Hamburg.

## Version 1.0.0

- Personal photography and oversized editorial typography
- Selected work: Medientage Hamburg, Safarai Visual Mark, and Safarai Stationery
- Design background, skills, languages, and résumé
- Responsive layouts and accessible navigation
- Email and résumé links, with a copy-email action

## Run locally

This is a static website. No build step or dependency installation is required.

```sh
python -m http.server 4173 --directory dist
```

Open http://localhost:4173.

## Files

- `dist/index.html`: page content
- `dist/style.css`: base styling
- `dist/selected-work.css`: Selected Work styling
- `dist/motion.css`: opening sequence, scroll reveals, hover transitions
- `dist/script.js`: copy-email interaction, opening sequence, scroll reveals
- `dist/assets/`: photos, project images, and résumé
- `.openai/hosting.json`: existing Sites deployment configuration

## Deployment

This is the `anurags` branch. `main` remains reserved for Gourav. The inherited Sites configuration belongs to Gourav’s existing private deployment; do not publish Anurag’s branch to that Site. Use a separate deployment target for Anurag. See `BRANCHES.md`.

Personal photographs, résumé, and portfolio content belong to Anurag Maurya. No open-source license is granted by this repository.
