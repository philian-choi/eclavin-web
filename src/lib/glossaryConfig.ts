export interface GlossaryTerm {
  slug: string;
  term: string; // display name
  short: string; // one-line summary for the hub and meta
  /** 40-70 word plain-language definition (AI-citation friendly). */
  definition: string;
  whyItMatters: string; // the WSET exam angle
  example: string;
}

// WSET-scoped wine glossary. Each term is written for a student revising for the
// exam: a plain definition first, then why it matters and a concrete example.
export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'tannin',
    term: 'Tannin',
    short: 'The drying, grippy feel in red wine, mainly from grape skins.',
    definition:
      'Tannin is a natural compound found in grape skins, seeds, and stems, and also in oak barrels. In the mouth it feels drying and slightly rough, like strong stewed black tea. Tannin gives red wine structure and helps it age.',
    whyItMatters:
      'On the WSET palate assessment you rate tannin from low to high. It is one of the main markers that separates grape varieties and signals how a red wine will age.',
    example: 'Cabernet Sauvignon is high in tannin, while Pinot Noir is much lower.',
  },
  {
    slug: 'acidity',
    term: 'Acidity',
    short: 'The tartness that makes your mouth water, from the grapes.',
    definition:
      'Acidity is the natural tartness in wine that makes your mouth water, similar to biting into a lemon. It comes from the grapes and is higher when they are grown in cooler climates. Acidity keeps wine feeling fresh and helps it age.',
    whyItMatters:
      'WSET asks you to judge acidity from low to high on the palate. It is central to balance and to matching wine with food.',
    example: 'Sauvignon Blanc and Riesling are known for high acidity.',
  },
  {
    slug: 'body',
    term: 'Body',
    short: 'How heavy or full a wine feels, light to full.',
    definition:
      'Body is how heavy or full a wine feels in your mouth, from light like skimmed milk to full like cream. It is driven mainly by alcohol, along with sugar and extract. Body is a feel, not a flavour.',
    whyItMatters:
      'WSET rates body from light to full. Higher alcohol usually means fuller body, so body is a quick clue to a wine’s style and origin.',
    example: 'Pinot Grigio is typically light-bodied; Shiraz is often full-bodied.',
  },
  {
    slug: 'sweetness',
    term: 'Sweetness',
    short: 'How much sugar is left, from bone dry to sweet.',
    definition:
      'Sweetness is how much natural grape sugar remains in the finished wine, from bone dry to lusciously sweet. The usual WSET terms are dry, off-dry, medium, and sweet. It depends on how much of the grape sugar was turned into alcohol during fermentation.',
    whyItMatters:
      'Sweetness is the first thing you assess on the palate in the WSET method, and it drives many food-pairing rules.',
    example: 'Most still red wines are dry; Sauternes is a famously sweet wine.',
  },
  {
    slug: 'terroir',
    term: 'Terroir',
    short: 'The natural factors of a place that shape its wine.',
    definition:
      'Terroir is the combination of natural factors, such as soil, climate, slope, and local conditions, that shapes how a wine from a particular place tastes. It is why the same grape variety can taste different depending on where it is grown.',
    whyItMatters:
      'Terroir explains regional style, a recurring theme across WSET Level 2 and Level 3 when you learn why regions taste the way they do.',
    example: 'Chablis’s cool climate and limestone soils give crisp, mineral Chardonnay.',
  },
  {
    slug: 'malolactic-fermentation',
    term: 'Malolactic Fermentation',
    short: 'A step that softens sharp acidity and can add buttery notes.',
    definition:
      'Malolactic fermentation is a winemaking step that converts sharp malic acid into softer lactic acid. It makes a wine feel rounder and can add buttery or creamy notes. Almost all red wines and some whites go through it.',
    whyItMatters:
      'It is a common source of secondary aromas in the WSET tasting method, especially the buttery character on many oaked white wines.',
    example: 'A buttery Chardonnay has usually been through malolactic fermentation.',
  },
  {
    slug: 'noble-rot',
    term: 'Noble Rot',
    short: 'A helpful mould that concentrates sugar for great sweet wines.',
    definition:
      'Noble rot is a beneficial mould, Botrytis cinerea, that shrivels ripe grapes and concentrates their sugar and flavour. Winemakers use it to make some of the world’s finest sweet wines. In the wrong conditions the same mould becomes harmful grey rot.',
    whyItMatters:
      'Noble rot explains several classic sweet wines on the WSET syllabus and is a common exam point contrasted with grey rot, a fault.',
    example: 'Sauternes from Bordeaux and Tokaji from Hungary are made with noble rot.',
  },
  {
    slug: 'primary-aromas',
    term: 'Primary Aromas',
    short: 'Smells from the grape and fermentation: fruit, flowers, herbs.',
    definition:
      'Primary aromas come from the grape itself and from fermentation. They include fruit, flowers, herbs, and spice. They are the aromas a wine is born with, before oak or ageing add anything.',
    whyItMatters:
      'Primary aromas are the first aroma family in the WSET Systematic Approach to Tasting and the main clue to grape variety.',
    example: 'Blackcurrant in Cabernet Sauvignon and lime in Riesling are primary aromas.',
  },
  {
    slug: 'secondary-aromas',
    term: 'Secondary Aromas',
    short: 'Smells created by winemaking, such as oak or malolactic.',
    definition:
      'Secondary aromas are created by winemaking choices rather than the grape. Examples include vanilla and toast from oak barrels, buttery notes from malolactic fermentation, and bready notes from time spent on the lees.',
    whyItMatters:
      'Recognising secondary aromas in the WSET tasting method tells you how a wine was made, not just which grape it is.',
    example: 'Vanilla from oak ageing is a classic secondary aroma.',
  },
  {
    slug: 'tertiary-aromas',
    term: 'Tertiary Aromas',
    short: 'Smells that develop with age: dried fruit, leather, mushroom.',
    definition:
      'Tertiary aromas develop as a wine ages, in bottle or through gentle contact with oxygen. They include dried fruit, leather, mushroom, nuts, and honey. They replace fresh fruit as a wine matures.',
    whyItMatters:
      'Tertiary aromas are the third aroma family in the WSET method and a key sign of a wine’s maturity.',
    example: 'Leather and forest floor in an aged red wine are tertiary aromas.',
  },
  {
    slug: 'fortified-wine',
    term: 'Fortified Wine',
    short: 'Wine with grape spirit added to raise the alcohol.',
    definition:
      'Fortified wine is wine with a grape spirit added to raise its alcohol, usually to between 15 and 22 percent. When the spirit is added decides the style: adding it during fermentation leaves sweetness, while adding it afterwards makes a drier wine.',
    whyItMatters:
      'Fortified wine is a core WSET category. The timing of fortification is a classic exam point that separates Port from Sherry.',
    example: 'Port is fortified during fermentation (sweet); most Sherry is fortified after (dry).',
  },
  {
    slug: 'carbonic-maceration',
    term: 'Carbonic Maceration',
    short: 'Whole-grape fermentation that gives soft, fruity red wine.',
    definition:
      'Carbonic maceration is a technique where whole, uncrushed grapes begin fermenting inside their own skins in a tank filled with carbon dioxide. It produces soft, low-tannin red wine with bright, candied fruit aromas.',
    whyItMatters:
      'It explains the light, juicy style of Beaujolais and is a testable winemaking method in WSET Level 2 and 3.',
    example: 'Beaujolais Nouveau is made using carbonic maceration.',
  },
];

export const GLOSSARY_SLUGS = GLOSSARY.map((t) => t.slug);

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
