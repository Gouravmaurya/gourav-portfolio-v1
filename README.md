# Gourav Maurya — Portfolio

Gourav’s full-stack AI engineering portfolio, based on the completed `anurags` design at commit `7e6eee9`. The editorial layout and animation system are unchanged.

Content includes Haven, Safar AI, AI Social Media Agent, professional experience, skills, education, GitHub, LinkedIn, and the supplied résumé. All four résumé links open `dist/assets/gourav-maurya-resume.pdf`.

## Local preview

This is a static site; no build or installation is required.

```sh
python -m http.server 4185 --directory dist
```

## Files

- `dist/index.html`: personalized content and links
- `dist/script.js`: copy-email interaction
- `dist/style.css`, `dist/selected-work.css`: inherited design
- `dist/motion.css`, `dist/motion.js`, `dist/vendor/`: inherited animations
- `dist/assets/`: project visuals, temporary portraits, and résumé

## Branch and assets

Continue Gourav’s work on `gourav-maurya`. Preserve `anurags` and `main` independently. The two Anurag portraits are retained temporarily with the user’s approval until Gourav provides replacement photos. Haven uses a labeled project overview graphic; the social agent links to Gourav’s GitHub profile because a project-specific link was not supplied.

No deployment was performed. Check the target before using the inherited hosting configuration. See `BRANCHES.md`.

## Recent additions

Formwork is the fourth project, represented by a labeled overview graphic until a live project link is supplied. Freelance AI work (June–July, two months) covers a RAG chatbot, bus/hotel/event booking orchestration, and trip planning; no year was specified. `interactions.css` and `interactions.js` provide highlighted, magnetic action links and the contact button. Pointer movement is disabled for reduced-motion and touch input; keyboard focus remains visible.
