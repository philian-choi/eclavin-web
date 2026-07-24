export interface GrapeFaq {
  q: string;
  a: string;
}

export interface GrapeVariety {
  slug: string;
  name: string;
  color: 'Red' | 'White';
  short: string; // one-line summary
  character: string; // flavour, body, tannin/acid
  regions: string; // key homes
  pairing: string; // food match
  examNote: string; // WSET angle
  faq: GrapeFaq[];
}

// Principal WSET grape varieties. Facts are standard, exam-level descriptions.
export const GRAPES: GrapeVariety[] = [
  {
    slug: 'cabernet-sauvignon',
    name: 'Cabernet Sauvignon',
    color: 'Red',
    short: 'The bold, tannic red behind Bordeaux and Napa.',
    character:
      'Full-bodied with high tannin and high acidity, showing blackcurrant, black cherry, cedar, and often a green bell-pepper note. It is usually oak-aged, which adds vanilla and spice, and it ages well.',
    regions:
      'Bordeaux, especially the Médoc on the Left Bank, plus Napa Valley, Coonawarra in Australia, Chile, and Tuscany in "Super Tuscan" blends.',
    pairing: 'Rich red meat and hard cheeses, where the firm tannin cuts through the fat.',
    examNote:
      'A textbook high-tannin, full-bodied red. In WSET study it is often contrasted with the softer Merlot in Bordeaux blends.',
    faq: [
      {
        q: 'Is Cabernet Sauvignon dry or sweet?',
        a: 'Almost always dry. Its bold dark-fruit flavour can seem "sweet" but there is very little sugar.',
      },
      {
        q: 'What does Cabernet Sauvignon taste like?',
        a: 'Blackcurrant, black cherry, and cedar, often with a green bell-pepper note and firm, drying tannin.',
      },
    ],
  },
  {
    slug: 'merlot',
    name: 'Merlot',
    color: 'Red',
    short: 'Softer, plummy red, Bordeaux’s smooth partner.',
    character:
      'Medium to full body with softer tannin than Cabernet Sauvignon, showing plum, black cherry, and chocolate. It is approachable young.',
    regions:
      'Bordeaux, especially the Right Bank in Saint-Émilion and Pomerol, plus California, Chile, and Italy.',
    pairing: 'Roast chicken, pork, and lighter red meats.',
    examNote:
      'The softer, earlier-drinking counterpart to Cabernet Sauvignon; the two are blended in most Bordeaux reds.',
    faq: [
      {
        q: 'Is Merlot lighter than Cabernet Sauvignon?',
        a: 'Usually yes. Merlot has softer tannin and a rounder, plummier style, so it feels smoother.',
      },
      {
        q: 'Is Merlot a dry wine?',
        a: 'Yes, Merlot is a dry red wine.',
      },
    ],
  },
  {
    slug: 'pinot-noir',
    name: 'Pinot Noir',
    color: 'Red',
    short: 'Light, elegant red from Burgundy.',
    character:
      'Light to medium body, high acidity, and low to medium tannin, with red cherry and raspberry, turning earthy and forest-floor with age. It is famously difficult to grow.',
    regions: 'Burgundy is its heartland, plus Oregon, New Zealand, and cooler parts of California.',
    pairing: 'Salmon, duck, and mushroom dishes.',
    examNote:
      'The classic light-bodied, high-acid, low-tannin red, and a common benchmark in the tasting exam.',
    faq: [
      {
        q: 'Is Pinot Noir sweet?',
        a: 'No, it is dry. The bright red-fruit flavour can seem sweet, but there is little sugar.',
      },
      {
        q: 'Why is Pinot Noir so light?',
        a: 'Its thin skins give low tannin and pale colour, so the wine feels delicate compared with bolder reds.',
      },
    ],
  },
  {
    slug: 'syrah-shiraz',
    name: 'Syrah / Shiraz',
    color: 'Red',
    short: 'Peppery, powerful red, called Syrah or Shiraz.',
    character:
      'Full-bodied with medium to high tannin, showing blackberry, black pepper, and smoky or meaty notes. It is called Syrah in France and Shiraz in Australia.',
    regions: 'The Northern Rhône (Hermitage, Côte-Rôtie), the Barossa Valley in Australia, and beyond.',
    pairing: 'Grilled and peppered meats, and hearty stews.',
    examNote:
      'One grape, two names and two styles: cooler-climate Syrah is peppery and restrained, warm-climate Shiraz is riper and jammier.',
    faq: [
      {
        q: 'Are Syrah and Shiraz the same grape?',
        a: 'Yes. Syrah is the French name and Shiraz the Australian one; the style changes with the climate.',
      },
      {
        q: 'What does Syrah taste like?',
        a: 'Blackberry and black pepper with smoky, sometimes meaty notes, and firm tannin.',
      },
    ],
  },
  {
    slug: 'grenache',
    name: 'Grenache',
    color: 'Red',
    short: 'Juicy, high-alcohol red, the base of southern Rhône blends.',
    character:
      'Medium tannin and high alcohol, with ripe strawberry and red fruit and a warm, spicy note. It is often blended rather than bottled alone.',
    regions:
      'The Southern Rhône, especially Châteauneuf-du-Pape, plus Spain as Garnacha (Priorat, Rioja) and Australia.',
    pairing: 'Grilled meats, stews, and Mediterranean dishes.',
    examNote:
      'A key blending grape in the Grenache-Syrah-Mourvèdre style. It is called Garnacha in Spain.',
    faq: [
      {
        q: 'Is Grenache the same as Garnacha?',
        a: 'Yes. Garnacha is simply the Spanish name for Grenache.',
      },
      {
        q: 'Why is Grenache often blended?',
        a: 'Its ripe fruit and high alcohol balance well with the colour and structure of Syrah and Mourvèdre.',
      },
    ],
  },
  {
    slug: 'sangiovese',
    name: 'Sangiovese',
    color: 'Red',
    short: 'Italy’s savoury red, the grape of Chianti.',
    character:
      'Medium to full body with high acidity and high tannin, showing sour red cherry, herbs, and a savoury, tomato-leaf note.',
    regions: 'Tuscany, in Chianti and Brunello di Montalcino, and across central Italy.',
    pairing: 'Tomato-based pasta, pizza, and cured meats.',
    examNote:
      'The high-acid, high-tannin grape behind Chianti and Brunello di Montalcino. Its acidity makes it very food-friendly.',
    faq: [
      {
        q: 'What wine is made from Sangiovese?',
        a: 'Chianti and Brunello di Montalcino are the most famous, both from Tuscany.',
      },
      {
        q: 'Why does Sangiovese go so well with food?',
        a: 'Its high acidity cuts through tomato and rich Italian dishes, keeping each bite fresh.',
      },
    ],
  },
  {
    slug: 'tempranillo',
    name: 'Tempranillo',
    color: 'Red',
    short: 'Spain’s signature red, the grape of Rioja.',
    character:
      'Medium body and tannin, with red fruit and leather, and, when oak-aged, clear vanilla and dill or coconut notes from American oak.',
    regions: 'Rioja and Ribera del Duero in Spain, and Portugal, where it is called Tinta Roriz.',
    pairing: 'Lamb, cured ham, and roasted vegetables.',
    examNote:
      'The main grape of Rioja. Its classic vanilla and coconut character comes from ageing in American oak.',
    faq: [
      {
        q: 'What is Tempranillo used for?',
        a: 'It is the main grape in Rioja and Ribera del Duero, Spain’s most famous red wines.',
      },
      {
        q: 'Why does Rioja taste of vanilla?',
        a: 'From ageing in American oak barrels, which give Tempranillo its signature vanilla and coconut notes.',
      },
    ],
  },
  {
    slug: 'malbec',
    name: 'Malbec',
    color: 'Red',
    short: 'Argentina’s bold, inky red.',
    character:
      'Full-bodied with medium to high tannin, showing dark plum, blackberry, and a floral violet note.',
    regions: 'Mendoza in Argentina, and Cahors in south-west France, its original home.',
    pairing: 'Steak and grilled red meat.',
    examNote:
      'Originally a minor Bordeaux blending grape, Malbec is now the flagship variety of Argentina.',
    faq: [
      {
        q: 'Where is Malbec from?',
        a: 'Originally Cahors in France, but it is now most famous from Mendoza, Argentina.',
      },
      {
        q: 'Is Malbec a heavy wine?',
        a: 'Yes, it is typically full-bodied with dark fruit and firm tannin.',
      },
    ],
  },
  {
    slug: 'chardonnay',
    name: 'Chardonnay',
    color: 'White',
    short: 'The versatile white, from crisp Chablis to buttery oaked styles.',
    character:
      'Dry, medium to full body, medium acidity. Its flavour depends on winemaking: unoaked shows citrus and green apple, oak adds vanilla, and malolactic fermentation adds butter.',
    regions: 'Burgundy, in Chablis and the Côte de Beaune, plus California, Australia, and worldwide.',
    pairing: 'Roast chicken and creamy sauces; richer oaked styles with fuller dishes.',
    examNote:
      'The classic example of how oak and malolactic fermentation change a wine. Unoaked Chablis versus oaked Chardonnay is a key WSET contrast.',
    faq: [
      {
        q: 'Is Chardonnay sweet?',
        a: 'Almost always dry. Oaked versions taste rich and rounded but are not sugary.',
      },
      {
        q: 'Why is some Chardonnay buttery?',
        a: 'The buttery note comes from malolactic fermentation, often alongside oak ageing.',
      },
    ],
  },
  {
    slug: 'sauvignon-blanc',
    name: 'Sauvignon Blanc',
    color: 'White',
    short: 'Zesty, aromatic white with grassy, citrus notes.',
    character:
      'Dry, high acidity, light to medium body, with gooseberry, green pepper, grass, and citrus or riper tropical notes in warmer climates.',
    regions: 'The Loire (Sancerre and Pouilly-Fumé), Marlborough in New Zealand, and Bordeaux.',
    pairing: 'Goat’s cheese, green salads, and seafood.',
    examNote:
      'A classic high-acid, aromatic white. Marlborough’s pungent, tropical style versus the restrained, mineral Loire is a common comparison.',
    faq: [
      {
        q: 'Is Sauvignon Blanc dry?',
        a: 'Yes, it is typically bone dry with high, refreshing acidity.',
      },
      {
        q: 'What does Sauvignon Blanc smell like?',
        a: 'Gooseberry, cut grass, green pepper, and citrus, sometimes with passion fruit in warmer regions.',
      },
    ],
  },
  {
    slug: 'riesling',
    name: 'Riesling',
    color: 'White',
    short: 'High-acid aromatic white, from bone dry to lusciously sweet.',
    character:
      'High acidity and light body, with lime, green apple, and floral notes, and a distinctive petrol note with age. It is made across the full sweetness range.',
    regions: 'Germany (the Mosel and Rheingau), Alsace in France, and Australia’s Clare and Eden Valleys.',
    pairing: 'Spicy Asian food with off-dry styles, plus pork and seafood.',
    examNote:
      'The best example of a grape made dry all the way through to very sweet. Its high acidity also lets it age for decades.',
    faq: [
      {
        q: 'Is Riesling sweet or dry?',
        a: 'Both. Riesling is made in every style from bone dry to very sweet, so check the label or the region.',
      },
      {
        q: 'Why does old Riesling smell of petrol?',
        a: 'A natural compound that develops with age gives fine Riesling its characteristic petrol or kerosene note.',
      },
    ],
  },
  {
    slug: 'pinot-grigio-gris',
    name: 'Pinot Grigio / Pinot Gris',
    color: 'White',
    short: 'Light and crisp as Pinot Grigio, richer as Pinot Gris.',
    character:
      'Dry, light to medium body. As Italian Pinot Grigio it is light, crisp, and fairly neutral; as Alsace Pinot Gris it is richer, riper, and sometimes off-dry.',
    regions: 'Northern Italy (Pinot Grigio), Alsace in France (Pinot Gris), and Oregon.',
    pairing: 'Light seafood and salads; richer Pinot Gris with white meats.',
    examNote:
      'One grape, two styles signalled by the name: light Italian Pinot Grigio versus fuller Alsace Pinot Gris.',
    faq: [
      {
        q: 'Are Pinot Grigio and Pinot Gris the same grape?',
        a: 'Yes. The name signals the style: light and crisp Italian Pinot Grigio, or richer Alsace Pinot Gris.',
      },
      {
        q: 'Is Pinot Grigio dry?',
        a: 'Italian Pinot Grigio is dry; some Alsace Pinot Gris can be off-dry, so check the label.',
      },
    ],
  },
];

export const GRAPE_SLUGS = GRAPES.map((g) => g.slug);

export function getGrape(slug: string): GrapeVariety | undefined {
  return GRAPES.find((g) => g.slug === slug);
}
