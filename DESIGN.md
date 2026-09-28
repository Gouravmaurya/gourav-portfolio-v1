---
name: Gourav Maurya Portfolio
description: Apple-inspired clarity for full-stack and AI engineering work.
colors:
  paper: "#f5f5f2"
  ink: "#222426"
  muted: "#62676d"
  blue: "#245fbd"
  line: "#d9dcdd"
  white: "#fff"
  secondary: "#e6e8e9"
  primary-hover: "#3d454d"
  secondary-hover: "#d9dfe4"
  glass: "#fdfdfbdc"
  dark-surface: "#222629"
  dark-text: "#f5f6f7"
  dark-muted: "#bfc5cc"
  dark-heading: "#aeb9c3"
  dark-line: "#4e585f"
  contact-surface: "#e1eaf4"
  contact-text: "#435467"
  contact-heading: "#516579"
  contact-action: "#222e3c"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(42px, 5.15vw, 72px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-.04em"
  headline:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(36px, 4.5vw, 64px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-.035em"
  title:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-.035em"
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "14px"
    fontWeight: 600
rounded:
  surface: "16px"
  pill: "100px"
  circle: "50%"
spacing:
  compact: "12px"
  small: "16px"
  content: "24px"
  medium: "30px"
  roomy: "32px"
  wide: "48px"
  mobile-section: "72px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 23px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 23px"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
  navigation:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "0 26px"
    height: "68px"
  project-disclosure:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "17px 0"
  contact-action:
    backgroundColor: "{colors.contact-action}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    width: "112px"
    height: "112px"
---

# Design System: Gourav Maurya Portfolio

## Overview

**Creative North Star: "The Product Demonstration Studio"**

An Apple-inspired material language pairs chalk surfaces, graphite type, muted blue accents, and generous whitespace. Large readable sans-serif headings and restrained image framing give engineering work room to speak. The interface feels composed, clear, and responsive to touch.

This document records the implemented system in `dist/v1.css`, `dist/index.html`, and `dist/v1.js`. The north star describes the direction already recorded in SURFACE.md; it is not a newly requested brand decision. Accessibility remains part of the material behavior: visible keyboard focus, native disclosures, and preference-aware motion and transparency.

**Key Characteristics:**

- Quiet neutral surfaces with blue reserved for links and focus.
- Flat information rows, large images, and softly rounded controls.
- Physical press feedback and brief, nonblocking motion.

## Colors

The palette combines warm paper and cool graphite with a restrained blue accent. The frontmatter is the normative color reference.

### Primary

- **Blue:** navigation accents, company names, link hover, and visible focus.

### Neutral

- **Paper / Ink / Muted:** the main canvas, primary text, and supporting text.
- **Line:** project disclosure and experience dividers.
- **Secondary / White:** secondary controls and image action pills.
- **Glass:** the translucent sticky navigation material.
- **Dark Surface / Dark Text / Dark Muted / Dark Heading / Dark Line:** coordinated inverse section colors.
- **Contact Surface / Contact Text / Contact Heading / Contact Action:** the pale blue contact field and its readable foreground hierarchy.

**The Quiet Accent Rule.** Blue identifies an action or emphasis; large body-copy areas retain neutral text.

## Typography

**Display and Body Font:** the platform system stack, falling back through Segoe UI to sans-serif. No remote font is required.

The hierarchy is compact and confident at large sizes, with normal-weight supporting prose. Headings use balanced wrapping and tight tracking; labels remain sentence case. Sizes are role-specific rather than a strict modular scale.

- **Display:** the hero statement uses the frontmatter display role. It becomes (53px) below the tablet breakpoint, then a mobile clamp (39px–58px), and (37px) on the narrowest screens.
- **Headline:** section titles use the headline role; inverse-section headings have a smaller maximum (58px). Contact typography is deliberately larger (64px–110px) and has unit line-height.
- **Title:** project names use the title role, reduced to (30px) on mobile. Experience titles use (23px), reduced to (22px).
- **Body:** experience prose uses the body role with a maximum line length (65ch). Hero supporting copy uses (20px) and line-height (1.6), reducing to (18px) on mobile. Project descriptions use (20px) with line-height (1.4).
- **Label:** control and disclosure labels use the frontmatter label role. Categories and dates are smaller (13px); image action labels and metadata use (12px).

## Layout

The main centered container has a maximum width (1256px) including horizontal padding (48px). Padding becomes (36px) at (1100px), (24px) at (760px), and (20px) at (380px). Major sections use the documented section spacing, changing to the mobile section spacing at (760px).

Wide layouts use asymmetric two-column compositions for featured content and equal columns for smaller project entries. Project grid gaps are (64px) vertically and (30px) horizontally; featured rows use a (40px) gap. Experience and education pair a narrow metadata column with a wider content column. At (760px), content stacks into document order and project entries have (44px) separation.

The featured project overview keeps its intrinsic (3:2) proportions and uses contain sizing on mobile so the graphic remains legible. Other project images use a mobile height (300px); the travel visual retains contain sizing with internal padding (20px). Portrait crops are intentional and separate from product overview framing.

## Elevation & Depth

Most content is flat. Background changes, whitespace, images, and fine dividers establish hierarchy. Elevation is confined to floating controls: navigation uses a diffuse shadow (`0 6px 24px #242a3510`) and backdrop blur (18px); image action pills use `0 4px 18px #00000015`. Portrait captions use a dark gradient for text contrast.

**The Floating Controls Rule.** Reserve shadows for controls that sit over or above content; project copy and experience rows remain flat.

## Shapes

Large image frames and navigation share the surface radius. Buttons and image actions use the pill radius; the contact arrow is circular. Images clip to their frames. Dividers are thin (1px) and structural, with no decorative borders around whole project entries.

## Components

### Buttons

Pill controls have centered labels and generous hit areas. Desktop buttons have minimum height (52px), reducing to (50px) on mobile. Primary and secondary colors and padding are defined in frontmatter. Fine-pointer hover changes the background; press scales to (.97). Transitions last (180ms) using the shared ease. Keyboard focus is a blue outline (3px) offset (5px).

### Navigation

The sticky navigation floats below the top edge (16px), with a maximum width (1160px). Links have minimum height (44px), medium weight, and blue hover. On mobile it moves to (10px), becomes (62px) tall, and hides the Experience shortcut while retaining that section in the page. Reduced transparency uses an opaque surface without blur; increased contrast adds a visible border.

### Project Images and Disclosures

Image links carry a white bottom-right action pill with minimum height (44px). Fine-pointer hover scales images to (1.025) over (650ms). A native details/summary disclosure expands explanatory copy in place. Its plus rotates (45deg) over (220ms), and newly opened details fade in over (200ms) when motion is permitted. Disclosures remain operable without JavaScript.

### Experience Rows

Flat rows begin with a thin divider and use vertical padding (32px), reduced to (27px) on mobile. Dates use muted text, roles use compact headings, and company labels use blue. Education follows the same column alignment.

### Contact Controls

The circular email action reduces to (70px) on mobile. Hover shifts it (3px) right and upward; press scales it to (.97). The text email remains a direct mail link. The underlined copy button reports success or failure through a polite live region; success resets after (3000ms).

**The Optional Motion Rule.** The opening portrait rises (16px) while fading over (700ms), and hero text fades over (550ms). Initial anchor navigation skips that opening. Reduced motion disables smooth scrolling, transitions, transforms, and entry animations; changing the preference cancels active animations. Content visibility never depends on animation completion.

## Do's and Don'ts

### Do:

- **Do** preserve the neutral canvas, readable text hierarchy, and restrained blue accents.
- **Do** use consistent rounded image frames and flat information rows.
- **Do** retain visible keyboard focus and practical touch targets.
- **Do** preserve complete overview graphics on mobile and honor motion, transparency, and contrast preferences.

### Don't:

- **Don't** introduce scroll locking or loading gates for presentation effects.
- **Don't** apply a generic shadowed card shell to every project or experience item.
- **Don't** rely on hover, animation, or clipboard access to expose essential content and contact paths.
- **Don't** present generated concept artwork as a real product screenshot.
