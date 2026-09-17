# Gourav Maurya — Portfolio v1

An editorial portfolio for Gourav Maurya, full-stack developer and AI engineer.

## Version 1.0.0

- Personal photography and oversized editorial typography
- Selected work: Safar AI, AI Social Media Agent, and Task Zen
- Professional experience, skills, education, and résumé
- Responsive layouts and accessible navigation
- Email and social links, with a copy-email action

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
- `dist/script.js`: copy-email interaction
- `dist/assets/`: photos, project images, and résumé
- `.openai/hosting.json`: existing Sites deployment configuration

## Deployment

Publish the contents of `dist` using a static web host. The existing Sites configuration is retained for the private portfolio deployment.

Personal photographs, résumé, and portfolio content belong to Gourav Maurya. No open-source license is granted by this repository.
