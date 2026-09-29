from pathlib import Path
import json,re,html
source=Path('source/index.en.html')
if not source.exists():source.write_bytes(Path('dist/index.html').read_bytes())
copy=json.loads(Path('source/translations.json').read_text(encoding='utf-8-sig'))
attrs={
'Anurag Maurya is a print and digital media designer in training at Macromedia Hamburg. Explore brand identity, editorial design, typography, and stationery studies.':'Anurag Maurya macht eine Ausbildung im Bereich Print- und Digitalmediendesign an der Macromedia Hamburg. Entdecke seine Arbeiten zu Markenidentität, Editorial Design, Typografie und Geschäftsausstattung.',
'Main navigation':'Hauptnavigation',
'Anurag Maurya — home':'Anurag Maurya — Startseite',
'Anurag Maurya outdoors in warm evening light':'Anurag Maurya im warmen Abendlicht im Freien',
'Selected work':'Ausgewählte Arbeiten',
'7 projects':'7 Projekte',
'View Medientage Hamburg 2026 artwork':'Arbeit zu Medientage Hamburg 2026 ansehen',
'Medientage Hamburg 2026 design study by Anurag Maurya':'Gestaltungsstudie zu Medientage Hamburg 2026 von Anurag Maurya',
'Open Medientage Hamburg 2026 artwork':'Arbeit zu Medientage Hamburg 2026 öffnen',
'View Safarai — Visual Mark artwork':'Arbeit zur Safarai-Bildmarke ansehen',
'Safarai — Visual Mark design study by Anurag Maurya':'Studie zur Safarai-Bildmarke von Anurag Maurya',
'Open Safarai — Visual Mark artwork':'Arbeit zur Safarai-Bildmarke öffnen',
'View Safarai — Stationery artwork':'Arbeit zur Safarai-Geschäftsausstattung ansehen',
'Safarai — Stationery design study by Anurag Maurya':'Studie zur Safarai-Geschäftsausstattung von Anurag Maurya',
'Open Safarai — Stationery artwork':'Arbeit zur Safarai-Geschäftsausstattung öffnen',
'Portrait of Anurag Maurya':'Porträt von Anurag Maurya',
'Email Anurag Maurya':'E-Mail an Anurag Maurya',
'Collage of print, digital media, technology, and Hamburg Messe + Congress imagery':'Collage aus Print, digitalen Medien, Technologie und Motiven von Hamburg Messe + Congress',
'Collage of design process, social media imagery, and Hamburg Messe + Congress branding':'Collage zu Gestaltungsprozess, Social Media und Markenbild von Hamburg Messe + Congress',
'Lumiere restaurant homepage with a dark dining room photograph and elegant headline':'Lumiere-Restaurantseite mit dunkler Fotografie des Gastraums und eleganter Überschrift',
'Café Farol homepage with a café interior photograph, large headline, and navigation':'Café-Farol-Startseite mit Innenraumfotografie, großer Überschrift und Navigation',
'View Hamburg Messe + Congress — Media Directions artwork':'Arbeit zu Hamburg Messe + Congress — Medienkonzepte ansehen',
'Open Hamburg Messe + Congress — Media Directions artwork':'Arbeit zu Hamburg Messe + Congress — Medienkonzepte öffnen',
'View Hamburg Messe + Congress — Design Directions artwork':'Arbeit zu Hamburg Messe + Congress — Gestaltungskonzepte ansehen',
'Open Hamburg Messe + Congress — Design Directions artwork':'Arbeit zu Hamburg Messe + Congress — Gestaltungskonzepte öffnen',
'View Lumiere — Restaurant Website artwork':'Arbeit zu Lumiere — Restaurant-Website ansehen',
'Open Lumiere — Restaurant Website artwork':'Arbeit zu Lumiere — Restaurant-Website öffnen',
'View Café Farol — Website artwork':'Arbeit zu Café Farol — Website ansehen',
'Open Café Farol — Website artwork':'Arbeit zu Café Farol — Website öffnen',
}
copy.update(attrs)
s=source.read_text(encoding='utf-8')
def text_replace(m):
 raw=m.group(1); plain=html.unescape(raw); stripped=plain.strip()
 if stripped in copy:
  replacement=copy[stripped]
  return '>'+html.escape(plain[:len(plain)-len(plain.lstrip())]+replacement+plain[len(plain.rstrip()):],quote=False)+'<'
 return m.group(0)
s=re.sub(r'>([^<>]+)<',text_replace,s)
def attr_replace(m):
 key,raw=m.group(1),m.group(2)
 plain=html.unescape(raw)
 return key+'="'+html.escape(copy.get(plain,plain),quote=True)+'"'
s=re.sub(r'\b(alt|aria-label|content|title)="([^"]*)"',attr_replace,s)
s=s.replace('<html lang="en">','<html lang="de">')
s=s.replace('<link rel="stylesheet" href="motion.css">','<link rel="stylesheet" href="motion.css"><link rel="stylesheet" href="i18n.css">')
s=s.replace('<a class="dock-contact"','<a class="dock-contact"')
s=s.replace('</nav>\n<main', '</nav><div class="language-switch" role="group" aria-label="Sprache / Language"><button type="button" data-lang="de" lang="de" aria-pressed="true">DE</button><span aria-hidden="true">/</span><button type="button" data-lang="en" lang="en" aria-pressed="false">EN</button></div>\n<main',1)
s=s.replace('<script src="vendor/gsap.min.js" defer>', '<script src="i18n.js" defer></script><script src="vendor/gsap.min.js" defer>',1)
Path('dist/index.html').write_text(s,encoding='utf-8')
reverse={de:en for en,de in copy.items() if de!=en}
js='const englishText = '+json.dumps(reverse,ensure_ascii=False,indent=2)+';\n'
js+='''(() => {
  const language = new URLSearchParams(location.search).get('lang');
  const saved = (() => { try { return localStorage.getItem('portfolio-language'); } catch { return null; } })();
  const selected = language === 'de' || language === 'en' ? language : (saved === 'en' ? 'en' : 'de');
  function swapToEnglish() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement.closest('script,style,.language-switch')) return;
      const original = node.nodeValue;
      const trimmed = original.trim();
      if (englishText[trimmed]) node.nodeValue = original.replace(trimmed, englishText[trimmed]);
    });
    document.querySelectorAll('[alt],[aria-label],[title],[content]').forEach(el => {
      ['alt','aria-label','title','content'].forEach(key => {
        const value = el.getAttribute(key);
        if (value && englishText[value]) el.setAttribute(key, englishText[value]);
      });
    });
  }
  if (selected === 'en') { swapToEnglish(); if (englishText[document.title]) document.title = englishText[document.title]; }
  document.documentElement.lang = selected;
  document.querySelectorAll('.language-switch button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === selected));
    button.addEventListener('click', () => {
      if (button.dataset.lang === selected) return;
      try { localStorage.setItem('portfolio-language', button.dataset.lang); } catch {}
      const sections = [...document.querySelectorAll('main > section')];
      const active = sections.filter(section => section.getBoundingClientRect().top < innerHeight * .45).at(-1) || sections[0];
      const next = new URL(location.href);
      next.searchParams.set('lang', button.dataset.lang);
      next.hash = active.id;
      location.assign(next.href);
    });
  });
  window.portfolioLanguage = () => selected;
})();
'''
Path('dist/i18n.js').write_text(js,encoding='utf-8')
