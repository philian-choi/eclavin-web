export interface RegionFaq {
  q: string;
  a: string;
}

export interface WineRegion {
  slug: string;
  name: string;
  country: string;
  short: string; // one-line summary
  character: string; // what wine styles come from here, climate
  grapes: string; // key grapes
  examNote: string; // WSET angle
  faq: RegionFaq[];
}

// Principal WSET wine regions. Standard, exam-level descriptions.
export const REGIONS: WineRegion[] = [
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    country: 'France',
    short: 'France’s great red-blend region, split by a river.',
    character:
      'Mostly red blends built on Cabernet Sauvignon and Merlot, plus dry and sweet whites. The Left Bank (Médoc) favours Cabernet Sauvignon on gravel soils; the Right Bank (Saint-Émilion, Pomerol) favours Merlot on clay.',
    grapes: 'Cabernet Sauvignon, Merlot, Cabernet Franc; Sémillon and Sauvignon Blanc for whites.',
    examNote:
      'The reference point for Cabernet-Merlot blending and the Left Bank vs Right Bank contrast, a frequent exam theme.',
    faq: [
      {
        q: 'Is Bordeaux a red or white wine?',
        a: 'Mostly red, built on Cabernet Sauvignon and Merlot, though Bordeaux also makes dry and sweet white wines.',
      },
      {
        q: 'What is the difference between Left Bank and Right Bank Bordeaux?',
        a: 'The Left Bank (Médoc) favours Cabernet Sauvignon on gravel soils, giving firmer, tannic wines. The Right Bank (Saint-Émilion, Pomerol) favours Merlot on clay, giving softer, plummier wines.',
      },
    ],
  },
  {
    slug: 'burgundy',
    name: 'Burgundy',
    country: 'France',
    short: 'The home of single-grape Pinot Noir and Chardonnay.',
    character:
      'Burgundy makes red wine from Pinot Noir and white wine from Chardonnay, almost never blended. It is divided into many small vineyard plots, so place and producer matter enormously to style and price.',
    grapes: 'Pinot Noir (red), Chardonnay (white).',
    examNote:
      'The best example of terroir: the same two grapes, but style and price vary hugely between neighbouring vineyards.',
    faq: [
      {
        q: 'What grapes are used in Burgundy?',
        a: 'Pinot Noir for red wine and Chardonnay for white wine, almost always unblended.',
      },
      {
        q: 'Is Chablis part of Burgundy?',
        a: 'Yes. Chablis is a Chardonnay-only sub-region at the northern edge of Burgundy, known for crisp, unoaked, mineral wines.',
      },
    ],
  },
  {
    slug: 'champagne',
    name: 'Champagne',
    country: 'France',
    short: 'The original home of traditional-method sparkling wine.',
    character:
      'A cool, northern region making sparkling wine by the traditional method, with a second fermentation in the bottle. Most Champagne is a blend of vintages (non-vintage) for a consistent house style, aged on lees for toasty, bready notes.',
    grapes: 'Chardonnay, Pinot Noir, Pinot Meunier.',
    examNote:
      'The reference for the traditional method and for non-vintage blending, both common WSET exam points.',
    faq: [
      {
        q: 'What grapes are used to make Champagne?',
        a: 'Chardonnay, Pinot Noir, and Pinot Meunier, usually blended together.',
      },
      {
        q: 'Why does Champagne taste bready or toasty?',
        a: 'From ageing on its lees (spent yeast) after the second fermentation in the bottle, part of the traditional method.',
      },
    ],
  },
  {
    slug: 'rhone-valley',
    name: 'Rhône Valley',
    country: 'France',
    short: 'Split into a peppery north and a warm, blended south.',
    character:
      'The Northern Rhône makes structured, peppery Syrah, sometimes with a touch of white Viognier. The Southern Rhône makes warmer, fruitier blends led by Grenache, alongside Syrah and Mourvèdre.',
    grapes: 'Syrah (north); Grenache, Syrah, Mourvèdre (south).',
    examNote:
      'A classic north-south contrast: single-grape Syrah in the north versus Grenache-based blends in the south.',
    faq: [
      {
        q: 'What is the difference between Northern and Southern Rhône?',
        a: 'The north makes structured, peppery Syrah, often alone. The south makes warmer, fruitier Grenache-based blends, as in Châteauneuf-du-Pape.',
      },
    ],
  },
  {
    slug: 'rioja',
    name: 'Rioja',
    country: 'Spain',
    short: 'Spain’s classic Tempranillo region, known for oak ageing.',
    character:
      'Medium-bodied reds built on Tempranillo, traditionally aged in American oak for vanilla and coconut notes. Ageing categories (Crianza, Reserva, Gran Reserva) signal how long a wine has aged before release.',
    grapes: 'Tempranillo, often with Garnacha (Grenache).',
    examNote:
      'The reference region for Tempranillo and for Spain’s ageing-category label system.',
    faq: [
      {
        q: 'What grape is Rioja made from?',
        a: 'Mainly Tempranillo, sometimes blended with Garnacha (Grenache).',
      },
      {
        q: 'What do Crianza, Reserva, and Gran Reserva mean?',
        a: 'They are Rioja’s ageing categories, showing increasing minimum time in oak and bottle before release, from Crianza (least) to Gran Reserva (most).',
      },
    ],
  },
  {
    slug: 'tuscany',
    name: 'Tuscany',
    country: 'Italy',
    short: 'Italy’s Sangiovese heartland, home of Chianti.',
    character:
      'High-acid, high-tannin reds built on Sangiovese, ranging from everyday Chianti to the more serious, longer-aged Brunello di Montalcino.',
    grapes: 'Sangiovese.',
    examNote: 'The reference region for Sangiovese and its food-friendly, high-acid style.',
    faq: [
      {
        q: 'What grape is Chianti made from?',
        a: 'Sangiovese is the principal grape of Chianti and of Brunello di Montalcino.',
      },
    ],
  },
  {
    slug: 'mosel',
    name: 'Mosel',
    country: 'Germany',
    short: 'A steep, cool river valley famous for Riesling.',
    character:
      'A cool climate on steep slate-soil slopes along the Mosel river, producing Riesling with high acidity across a range of sweetness levels, from bone dry to lusciously sweet.',
    grapes: 'Riesling.',
    examNote:
      'The reference region for Riesling and for reading German sweetness terms on the label.',
    faq: [
      {
        q: 'Is Mosel wine sweet?',
        a: 'It ranges from bone dry to very sweet. The label’s ripeness terms (such as Kabinett or Spätlese) hint at the style, but check the taste descriptor too, since dry versions exist at each level.',
      },
    ],
  },
  {
    slug: 'napa-valley',
    name: 'Napa Valley',
    country: 'USA',
    short: 'California’s premium region for ripe, powerful Cabernet Sauvignon.',
    character:
      'A warm California climate producing ripe, full-bodied, oak-aged Cabernet Sauvignon as its flagship wine, alongside Chardonnay and other varieties.',
    grapes: 'Cabernet Sauvignon, Chardonnay.',
    examNote: 'The leading New World example of premium, ripe-style Cabernet Sauvignon.',
    faq: [
      {
        q: 'What is Napa Valley known for?',
        a: 'Ripe, full-bodied, often oak-aged Cabernet Sauvignon, alongside Chardonnay.',
      },
    ],
  },
  {
    slug: 'marlborough',
    name: 'Marlborough',
    country: 'New Zealand',
    short: 'New Zealand’s zesty, pungent Sauvignon Blanc region.',
    character:
      'A cool, sunny climate that gives Sauvignon Blanc a distinctively pungent style: intense passion fruit, gooseberry, and green pepper aromas with high acidity.',
    grapes: 'Sauvignon Blanc.',
    examNote:
      'The benchmark New World Sauvignon Blanc style, often contrasted with the more restrained Loire style.',
    faq: [
      {
        q: 'Why is Marlborough Sauvignon Blanc so aromatic?',
        a: 'Its cool, sunny climate and long ripening season give unusually intense passion fruit and green pepper aromas.',
      },
    ],
  },
  {
    slug: 'barossa-valley',
    name: 'Barossa Valley',
    country: 'Australia',
    short: 'Australia’s warm home of bold, ripe Shiraz.',
    character:
      'A warm climate producing full-bodied, richly fruity Shiraz with soft tannin and high alcohol, often aged in oak. Some of the world’s oldest Shiraz vines grow here.',
    grapes: 'Shiraz (Syrah), also Grenache.',
    examNote: 'The benchmark warm-climate Shiraz style, contrasted with cooler Northern Rhône Syrah.',
    faq: [
      {
        q: 'What is Barossa Valley known for?',
        a: 'Full-bodied, richly fruity Shiraz, often from very old vines, showing a riper style than French Syrah.',
      },
    ],
  },
  {
    slug: 'douro-valley',
    name: 'Douro Valley',
    country: 'Portugal',
    short: 'The steep valley behind Port wine.',
    character:
      'A hot, dry, terraced valley traditionally producing Port, a fortified wine made from a blend of indigenous grapes, alongside a growing production of dry table wines.',
    grapes: 'Touriga Nacional, Touriga Franca, and other indigenous Portuguese varieties.',
    examNote: 'The home of Port, a key fortified-wine case study in the WSET syllabus.',
    faq: [
      {
        q: 'Is all Douro Valley wine Port?',
        a: 'No. Port is the traditional fortified wine, but the Douro also makes a growing amount of dry, unfortified table wine.',
      },
    ],
  },
  {
    slug: 'chablis',
    name: 'Chablis',
    country: 'France',
    short: 'Cool, mineral, unoaked Chardonnay at Burgundy’s edge.',
    character:
      'A cool climate and limestone soils give Chablis a lean, high-acid, mineral style: green apple, lemon, and a flinty or wet-stone note, mostly without oak.',
    grapes: 'Chardonnay.',
    examNote:
      'The classic contrast to warmer, oaked Chardonnay styles, and a frequent tasting-exam benchmark.',
    faq: [
      {
        q: 'Is Chablis oaked?',
        a: 'Standard Chablis is usually unoaked, giving a fresh, mineral style. Some Premier Cru and Grand Cru Chablis use a little oak.',
      },
      {
        q: 'What grape is Chablis made from?',
        a: 'Chardonnay, though its cool climate and limestone soils give it a very different style from riper Chardonnay elsewhere.',
      },
    ],
  },
];

export const REGION_SLUGS = REGIONS.map((r) => r.slug);

export function getRegion(slug: string): WineRegion | undefined {
  return REGIONS.find((r) => r.slug === slug);
}
