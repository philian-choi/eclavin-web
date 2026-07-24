export type GlossaryLang = 'en' | 'ko';

export interface GlossaryCopy {
  term: string; // display name
  short: string; // one-line summary
  /** 40-70 word plain-language definition (AI-citation friendly). */
  definition: string;
  whyItMatters: string; // the WSET exam angle
  example: string;
}

export interface GlossaryTerm {
  slug: string;
  copy: Record<GlossaryLang, GlossaryCopy>;
}

// WSET-scoped wine glossary, bilingual. Each term: a plain definition first,
// then why it matters for the exam and a concrete example.
export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'tannin',
    copy: {
      en: {
        term: 'Tannin',
        short: 'The drying, grippy feel in red wine, mainly from grape skins.',
        definition:
          'Tannin is a natural compound found in grape skins, seeds, and stems, and also in oak barrels. In the mouth it feels drying and slightly rough, like strong stewed black tea. Tannin gives red wine structure and helps it age.',
        whyItMatters:
          'On the WSET palate assessment you rate tannin from low to high. It is one of the main markers that separates grape varieties and signals how a red wine will age.',
        example: 'Cabernet Sauvignon is high in tannin, while Pinot Noir is much lower.',
      },
      ko: {
        term: '타닌',
        short: '레드와인의 마르고 텁텁한 느낌, 주로 껍질에서 옵니다.',
        definition:
          '타닌은 포도 껍질과 씨, 줄기, 그리고 오크통에서 나오는 자연 성분입니다. 입안에서 마르고 살짝 거칠게 느껴지며, 진하게 우린 홍차 같습니다. 레드와인에 짜임새를 주고 숙성을 돕습니다.',
        whyItMatters:
          'WSET 시음에서 타닌은 낮음에서 높음으로 평가합니다. 품종을 구별하고 레드와인이 얼마나 숙성될지 알려주는 주요 표시입니다.',
        example: '카베르네 소비뇽은 타닌이 높고 피노 누아는 훨씬 낮습니다.',
      },
    },
  },
  {
    slug: 'acidity',
    copy: {
      en: {
        term: 'Acidity',
        short: 'The tartness that makes your mouth water, from the grapes.',
        definition:
          'Acidity is the natural tartness in wine that makes your mouth water, similar to biting into a lemon. It comes from the grapes and is higher when they are grown in cooler climates. Acidity keeps wine feeling fresh and helps it age.',
        whyItMatters:
          'WSET asks you to judge acidity from low to high on the palate. It is central to balance and to matching wine with food.',
        example: 'Sauvignon Blanc and Riesling are known for high acidity.',
      },
      ko: {
        term: '산도',
        short: '입에 침이 돌게 하는 상큼함, 포도에서 옵니다.',
        definition:
          '산도는 와인의 자연스러운 상큼함으로, 레몬을 베어 문 듯 입에 침이 돌게 합니다. 포도에서 오며 서늘한 기후에서 자랄수록 높습니다. 산도는 와인을 신선하게 유지하고 숙성을 돕습니다.',
        whyItMatters:
          'WSET 시음에서 산도는 낮음에서 높음으로 평가합니다. 균형과 음식 궁합의 핵심입니다.',
        example: '소비뇽 블랑과 리슬링은 산도가 높기로 유명합니다.',
      },
    },
  },
  {
    slug: 'body',
    copy: {
      en: {
        term: 'Body',
        short: 'How heavy or full a wine feels, light to full.',
        definition:
          'Body is how heavy or full a wine feels in your mouth, from light like skimmed milk to full like cream. It is driven mainly by alcohol, along with sugar and extract. Body is a feel, not a flavour.',
        whyItMatters:
          'WSET rates body from light to full. Higher alcohol usually means fuller body, so body is a quick clue to a wine’s style and origin.',
        example: 'Pinot Grigio is typically light-bodied; Shiraz is often full-bodied.',
      },
      ko: {
        term: '바디',
        short: '입안에서 느껴지는 무게감, 가벼움부터 묵직함까지.',
        definition:
          '바디는 와인이 입안에서 느껴지는 무게감으로, 탈지유처럼 가벼운 것부터 크림처럼 묵직한 것까지 있습니다. 주로 알코올이 좌우하고 당분과 추출물도 영향을 줍니다. 맛이 아니라 느낌입니다.',
        whyItMatters:
          'WSET 시음에서 바디는 가벼움에서 풀바디로 평가합니다. 보통 알코올이 높을수록 바디가 묵직해, 와인의 스타일과 산지를 빠르게 짐작하는 단서가 됩니다.',
        example: '피노 그리지오는 대개 가볍고 쉬라즈는 흔히 풀바디입니다.',
      },
    },
  },
  {
    slug: 'sweetness',
    copy: {
      en: {
        term: 'Sweetness',
        short: 'How much sugar is left, from bone dry to sweet.',
        definition:
          'Sweetness is how much natural grape sugar remains in the finished wine, from bone dry to lusciously sweet. The usual WSET terms are dry, off-dry, medium, and sweet. It depends on how much of the grape sugar was turned into alcohol during fermentation.',
        whyItMatters:
          'Sweetness is the first thing you assess on the palate in the WSET method, and it drives many food-pairing rules.',
        example: 'Most still red wines are dry; Sauternes is a famously sweet wine.',
      },
      ko: {
        term: '당도',
        short: '남은 당의 양, 아주 드라이부터 달콤까지.',
        definition:
          '당도는 완성된 와인에 남은 포도당의 양으로, 아주 드라이한 것부터 진하게 달콤한 것까지 있습니다. WSET에서 흔히 드라이, 오프드라이, 미디엄, 스위트로 나눕니다. 발효 때 포도당이 알코올로 얼마나 바뀌었는지에 달려 있습니다.',
        whyItMatters:
          'WSET 시음에서 당도는 팔레트에서 가장 먼저 평가하며, 음식 궁합 규칙의 바탕이 됩니다.',
        example: '대부분의 스틸 레드와인은 드라이하고 소테른은 대표적인 스위트 와인입니다.',
      },
    },
  },
  {
    slug: 'terroir',
    copy: {
      en: {
        term: 'Terroir',
        short: 'The natural factors of a place that shape its wine.',
        definition:
          'Terroir is the combination of natural factors, such as soil, climate, slope, and local conditions, that shapes how a wine from a particular place tastes. It is why the same grape variety can taste different depending on where it is grown.',
        whyItMatters:
          'Terroir explains regional style, a recurring theme across WSET Level 2 and Level 3 when you learn why regions taste the way they do.',
        example: 'Chablis’s cool climate and limestone soils give crisp, mineral Chardonnay.',
      },
      ko: {
        term: '떼루아',
        short: '한 장소의 자연 요소가 만드는 와인의 개성.',
        definition:
          '떼루아는 토양, 기후, 경사, 지역 조건 같은 자연 요소가 어우러져 그 장소의 와인 맛을 만드는 것입니다. 같은 품종이라도 어디서 자랐느냐에 따라 맛이 달라지는 이유입니다.',
        whyItMatters:
          '떼루아는 지역 스타일을 설명해 주며, 산지별 특징을 배우는 WSET 2급과 3급에서 반복해서 나옵니다.',
        example: '샤블리의 서늘한 기후와 석회질 토양은 상큼하고 미네랄한 샤르도네를 만듭니다.',
      },
    },
  },
  {
    slug: 'malolactic-fermentation',
    copy: {
      en: {
        term: 'Malolactic Fermentation',
        short: 'A step that softens sharp acidity and can add buttery notes.',
        definition:
          'Malolactic fermentation is a winemaking step that converts sharp malic acid into softer lactic acid. It makes a wine feel rounder and can add buttery or creamy notes. Almost all red wines and some whites go through it.',
        whyItMatters:
          'It is a common source of secondary aromas in the WSET tasting method, especially the buttery character on many oaked white wines.',
        example: 'A buttery Chardonnay has usually been through malolactic fermentation.',
      },
      ko: {
        term: '젖산 발효',
        short: '날카로운 산을 부드럽게 바꾸는 양조 과정.',
        definition:
          '젖산 발효는 날카로운 사과산을 더 부드러운 젖산으로 바꾸는 양조 과정입니다. 와인을 둥글게 만들고 버터나 크림 같은 느낌을 더하기도 합니다. 거의 모든 레드와인과 일부 화이트가 이 과정을 거칩니다.',
        whyItMatters:
          'WSET 시음에서 2차 향의 흔한 원천으로, 특히 오크 숙성한 화이트와인의 버터 같은 느낌을 만듭니다.',
        example: '버터 같은 샤르도네는 대개 젖산 발효를 거친 것입니다.',
      },
    },
  },
  {
    slug: 'noble-rot',
    copy: {
      en: {
        term: 'Noble Rot',
        short: 'A helpful mould that concentrates sugar for great sweet wines.',
        definition:
          'Noble rot is a beneficial mould, Botrytis cinerea, that shrivels ripe grapes and concentrates their sugar and flavour. Winemakers use it to make some of the world’s finest sweet wines. In the wrong conditions the same mould becomes harmful grey rot.',
        whyItMatters:
          'Noble rot explains several classic sweet wines on the WSET syllabus and is a common exam point contrasted with grey rot, a fault.',
        example: 'Sauternes from Bordeaux and Tokaji from Hungary are made with noble rot.',
      },
      ko: {
        term: '귀부',
        short: '당을 농축해 고급 스위트 와인을 만드는 이로운 곰팡이.',
        definition:
          '귀부는 잘 익은 포도를 쪼그라뜨려 당과 풍미를 농축시키는 이로운 곰팡이(보트리티스 시네레아)입니다. 세계 최고의 스위트 와인을 만드는 데 쓰입니다. 조건이 나쁘면 같은 곰팡이가 해로운 회색 곰팡이가 됩니다.',
        whyItMatters:
          '귀부는 WSET에 나오는 여러 고전 스위트 와인을 설명하며, 결함인 회색 곰팡이와 대비되는 시험 포인트입니다.',
        example: '보르도의 소테른과 헝가리의 토카이가 귀부로 만들어집니다.',
      },
    },
  },
  {
    slug: 'primary-aromas',
    copy: {
      en: {
        term: 'Primary Aromas',
        short: 'Smells from the grape and fermentation: fruit, flowers, herbs.',
        definition:
          'Primary aromas come from the grape itself and from fermentation. They include fruit, flowers, herbs, and spice. They are the aromas a wine is born with, before oak or ageing add anything.',
        whyItMatters:
          'Primary aromas are the first aroma family in the WSET Systematic Approach to Tasting and the main clue to grape variety.',
        example: 'Blackcurrant in Cabernet Sauvignon and lime in Riesling are primary aromas.',
      },
      ko: {
        term: '1차 향',
        short: '포도와 발효에서 오는 향: 과일·꽃·허브.',
        definition:
          '1차 향은 포도 자체와 발효에서 오는 향입니다. 과일, 꽃, 허브, 향신료가 여기에 듭니다. 오크나 숙성이 무언가를 더하기 전, 와인이 타고난 향입니다.',
        whyItMatters:
          '1차 향은 WSET 시음의 첫 번째 향 갈래이며 품종을 알아내는 주요 단서입니다.',
        example: '카베르네 소비뇽의 블랙커런트, 리슬링의 라임이 1차 향입니다.',
      },
    },
  },
  {
    slug: 'secondary-aromas',
    copy: {
      en: {
        term: 'Secondary Aromas',
        short: 'Smells created by winemaking, such as oak or malolactic.',
        definition:
          'Secondary aromas are created by winemaking choices rather than the grape. Examples include vanilla and toast from oak barrels, buttery notes from malolactic fermentation, and bready notes from time spent on the lees.',
        whyItMatters:
          'Recognising secondary aromas in the WSET tasting method tells you how a wine was made, not just which grape it is.',
        example: 'Vanilla from oak ageing is a classic secondary aroma.',
      },
      ko: {
        term: '2차 향',
        short: '양조로 생기는 향: 오크·젖산 발효 등.',
        definition:
          '2차 향은 포도가 아니라 양조 방식에서 생기는 향입니다. 오크통의 바닐라와 토스트, 젖산 발효의 버터 같은 느낌, 효모 찌꺼기와 오래 접촉해 나는 빵 냄새가 그 예입니다.',
        whyItMatters:
          'WSET 시음에서 2차 향을 알아보면 어떤 품종인지뿐 아니라 어떻게 만들었는지도 알 수 있습니다.',
        example: '오크 숙성에서 오는 바닐라향이 대표적인 2차 향입니다.',
      },
    },
  },
  {
    slug: 'tertiary-aromas',
    copy: {
      en: {
        term: 'Tertiary Aromas',
        short: 'Smells that develop with age: dried fruit, leather, mushroom.',
        definition:
          'Tertiary aromas develop as a wine ages, in bottle or through gentle contact with oxygen. They include dried fruit, leather, mushroom, nuts, and honey. They replace fresh fruit as a wine matures.',
        whyItMatters:
          'Tertiary aromas are the third aroma family in the WSET method and a key sign of a wine’s maturity.',
        example: 'Leather and forest floor in an aged red wine are tertiary aromas.',
      },
      ko: {
        term: '3차 향',
        short: '숙성으로 생기는 향: 말린 과일·가죽·버섯.',
        definition:
          '3차 향은 와인이 병 속에서, 또는 산소와 천천히 만나며 숙성될 때 생기는 향입니다. 말린 과일, 가죽, 버섯, 견과, 꿀이 여기에 듭니다. 와인이 익어가며 신선한 과일향을 대신합니다.',
        whyItMatters:
          '3차 향은 WSET 시음의 세 번째 향 갈래이며 와인이 얼마나 익었는지 알려주는 중요한 신호입니다.',
        example: '오래된 레드와인의 가죽과 숲 바닥 같은 향이 3차 향입니다.',
      },
    },
  },
  {
    slug: 'fortified-wine',
    copy: {
      en: {
        term: 'Fortified Wine',
        short: 'Wine with grape spirit added to raise the alcohol.',
        definition:
          'Fortified wine is wine with a grape spirit added to raise its alcohol, usually to between 15 and 22 percent. When the spirit is added decides the style: adding it during fermentation leaves sweetness, while adding it afterwards makes a drier wine.',
        whyItMatters:
          'Fortified wine is a core WSET category. The timing of fortification is a classic exam point that separates Port from Sherry.',
        example: 'Port is fortified during fermentation (sweet); most Sherry is fortified after (dry).',
      },
      ko: {
        term: '주정강화 와인',
        short: '도수를 높이려 증류주를 더한 와인.',
        definition:
          '주정강화 와인은 도수를 높이려 포도 증류주를 더한 와인으로, 보통 15~22퍼센트입니다. 증류주를 언제 넣느냐가 스타일을 정합니다. 발효 중에 넣으면 단맛이 남고, 발효가 끝난 뒤 넣으면 더 드라이해집니다.',
        whyItMatters:
          '주정강화 와인은 WSET의 핵심 범주입니다. 강화 시점은 포트와 셰리를 가르는 고전적인 시험 포인트입니다.',
        example: '포트는 발효 중에 강화해 달콤하고, 대부분의 셰리는 발효 후에 강화해 드라이합니다.',
      },
    },
  },
  {
    slug: 'carbonic-maceration',
    copy: {
      en: {
        term: 'Carbonic Maceration',
        short: 'Whole-grape fermentation that gives soft, fruity red wine.',
        definition:
          'Carbonic maceration is a technique where whole, uncrushed grapes begin fermenting inside their own skins in a tank filled with carbon dioxide. It produces soft, low-tannin red wine with bright, candied fruit aromas.',
        whyItMatters:
          'It explains the light, juicy style of Beaujolais and is a testable winemaking method in WSET Level 2 and 3.',
        example: 'Beaujolais Nouveau is made using carbonic maceration.',
      },
      ko: {
        term: '탄산 침용',
        short: '통포도 발효로 부드러운 과일향 레드를 만드는 기법.',
        definition:
          '탄산 침용은 으깨지 않은 통포도를 이산화탄소로 채운 탱크에 넣어 껍질 안쪽부터 발효시키는 기법입니다. 타닌이 낮고 부드러우며 달콤한 과일향이 짙은 레드와인을 만듭니다.',
        whyItMatters:
          '보졸레의 가볍고 상큼한 스타일을 설명해 주며, WSET 2급과 3급에 나오는 양조법입니다.',
        example: '보졸레 누보가 탄산 침용으로 만들어집니다.',
      },
    },
  },
  {
    slug: 'oak-ageing',
    copy: {
      en: {
        term: 'Oak Ageing',
        short: 'Maturing wine in oak barrels, adding vanilla and spice.',
        definition:
          'Oak ageing is maturing wine in oak barrels. It adds aromas of vanilla, toast, and spice, a smoother texture, and a little tannin. Newer barrels give stronger flavours; older barrels add less.',
        whyItMatters:
          'Oak is a common source of secondary aromas in the WSET tasting method and a clue to a wine’s style and price.',
        example: 'An oak-aged Chardonnay often shows vanilla and buttery notes.',
      },
      ko: {
        term: '오크 숙성',
        short: '오크통에서 숙성시켜 바닐라·향신료 향을 더하는 것.',
        definition:
          '오크 숙성은 와인을 오크통에서 익히는 것입니다. 바닐라, 토스트, 향신료 향과 부드러운 질감, 약간의 타닌을 더합니다. 새 통일수록 향이 강하고 오래 쓴 통은 영향이 적습니다.',
        whyItMatters:
          'WSET 시음에서 오크는 2차 향의 흔한 원천이며 와인의 스타일과 가격을 짐작하는 단서입니다.',
        example: '오크 숙성한 샤르도네는 흔히 바닐라와 버터 같은 향이 납니다.',
      },
    },
  },
  {
    slug: 'fermentation',
    copy: {
      en: {
        term: 'Fermentation',
        short: 'Yeast turning grape sugar into alcohol.',
        definition:
          'Fermentation is when yeast turns the sugar in grape juice into alcohol and carbon dioxide. It is the core step that turns juice into wine. If all the sugar converts the wine is dry; stopping early leaves sweetness.',
        whyItMatters:
          'Fermentation is the starting point of every wine and decides its sweetness and style, a foundation across the WSET syllabus.',
        example: 'Stopping fermentation early leaves sugar behind, making a sweet wine.',
      },
      ko: {
        term: '발효',
        short: '효모가 포도의 당을 알코올로 바꾸는 과정.',
        definition:
          '발효는 효모가 포도즙의 당을 알코올과 이산화탄소로 바꾸는 과정입니다. 포도즙을 와인으로 만드는 핵심 단계입니다. 당이 다 바뀌면 드라이해지고, 일찍 멈추면 단맛이 남습니다.',
        whyItMatters:
          '발효는 모든 와인의 출발점이며 당도와 스타일을 정하는 기본으로, WSET 전 범위의 바탕입니다.',
        example: '발효를 일찍 멈추면 당이 남아 단맛이 있는 와인이 됩니다.',
      },
    },
  },
  {
    slug: 'vintage',
    copy: {
      en: {
        term: 'Vintage',
        short: 'The year the grapes were harvested.',
        definition:
          'Vintage is the year the grapes were harvested. The year printed on the label points to that year’s growing-season weather, and good or difficult years affect a wine’s quality and style.',
        whyItMatters:
          'Alongside region and climate, vintage is a clue WSET students use to read a wine’s likely quality and character.',
        example: 'In Bordeaux, 2015 is widely regarded as a good vintage.',
      },
      ko: {
        term: '빈티지',
        short: '포도를 수확한 해.',
        definition:
          '빈티지는 포도를 수확한 해입니다. 라벨에 적힌 연도가 그해 재배 시기의 날씨를 알려주며, 좋은 해와 어려운 해가 와인의 품질과 스타일에 영향을 줍니다.',
        whyItMatters:
          'WSET 학습자는 산지와 기후와 함께 빈티지로 와인의 품질과 개성을 짐작합니다.',
        example: '보르도에서 2015년은 좋은 빈티지로 널리 평가됩니다.',
      },
    },
  },
  {
    slug: 'appellation',
    copy: {
      en: {
        term: 'Appellation',
        short: 'A legally defined place name for a wine.',
        definition:
          'An appellation is a legally defined place name for wine. To use the name, the wine must come from that area and follow set rules on grapes and winemaking. France’s system of controlled origin names is the best known.',
        whyItMatters:
          'Appellations are the key to reading a European wine label and predicting its style, a core WSET Level 2 and 3 topic.',
        example: 'Chablis is one of the appellations of Burgundy.',
      },
      ko: {
        term: '원산지 명칭',
        short: '와인이 난 곳을 법으로 정한 이름.',
        definition:
          '원산지 명칭은 와인이 난 곳을 법으로 정한 이름입니다. 그 이름을 쓰려면 정해진 지역에서 정해진 품종과 방법으로 만들어야 합니다. 프랑스의 원산지 통제 명칭이 가장 잘 알려져 있습니다.',
        whyItMatters:
          '원산지 명칭은 유럽 와인 라벨을 읽고 스타일을 짐작하는 열쇠로, WSET 2급과 3급의 핵심 주제입니다.',
        example: '샤블리는 부르고뉴의 원산지 명칭 중 하나입니다.',
      },
    },
  },
  {
    slug: 'lees-ageing',
    copy: {
      en: {
        term: 'Lees Ageing',
        short: 'Resting wine on dead yeast for bready, creamy notes.',
        definition:
          'Lees ageing keeps wine in contact with the dead yeast cells (the lees) after fermentation. It adds bready or biscuity aromas and a creamier texture. It is common in Champagne and some white wines.',
        whyItMatters:
          'Lees ageing is a source of secondary aromas in the WSET method and a signature of traditional-method sparkling wine.',
        example: 'The bready aroma in Champagne comes from lees ageing.',
      },
      ko: {
        term: '리 숙성',
        short: '죽은 효모와 함께 두어 빵·크림 향을 더하는 것.',
        definition:
          '리 숙성은 발효가 끝난 뒤 죽은 효모 찌꺼기(리)와 와인을 함께 두는 것입니다. 빵이나 비스킷 같은 향과 더 크리미한 질감을 더합니다. 샴페인과 일부 화이트와인에 흔합니다.',
        whyItMatters:
          'WSET 시음에서 리 숙성은 2차 향의 원천이며 전통 방식 스파클링 와인의 특징입니다.',
        example: '샴페인의 빵 같은 향은 리 숙성에서 옵니다.',
      },
    },
  },
  {
    slug: 'cork-taint',
    copy: {
      en: {
        term: 'Cork Taint',
        short: 'A fault making wine smell of wet cardboard.',
        definition:
          'Cork taint is a fault where a chemical called TCA, usually from the cork, makes a wine smell of wet cardboard, damp basement, or musty must. It is a closure problem, not a flaw in the wine itself.',
        whyItMatters:
          'Cork taint is the classic example of a faulty wine in the WSET tasting method’s condition check, and a frequent exam point.',
        example: 'A smell of wet newspaper is a sign of cork taint.',
      },
      ko: {
        term: '코르크 오염',
        short: '젖은 판지 냄새가 나게 하는 결함.',
        definition:
          '코르크 오염은 대개 코르크에서 나오는 화학물질(TCA) 때문에 와인에서 젖은 판지, 축축한 지하실, 곰팡이 같은 냄새가 나는 결함입니다. 마개 문제이지 와인 자체의 잘못이 아닙니다.',
        whyItMatters:
          'WSET 시음의 상태 점검에서 결함 와인의 대표 예이며 자주 나오는 시험 포인트입니다.',
        example: '젖은 신문지 냄새가 나면 코르크 오염을 의심합니다.',
      },
    },
  },
  {
    slug: 'finish',
    copy: {
      en: {
        term: 'Finish',
        short: 'How long the flavour lingers after you swallow.',
        definition:
          'The finish is how long a wine’s taste and aroma linger after you swallow. A short finish fades quickly; a long finish stays for many seconds. A longer finish is usually a sign of higher quality.',
        whyItMatters:
          'Finish (or length) is the last thing you assess on the palate in the WSET method and a key clue to quality.',
        example: 'A fine wine keeps its aroma going long after you swallow.',
      },
      ko: {
        term: '피니시',
        short: '삼킨 뒤 맛과 향이 남는 정도.',
        definition:
          '피니시는 와인을 삼킨 뒤 맛과 향이 얼마나 오래 남는지입니다. 짧으면 금방 사라지고, 길면 여러 초 동안 남습니다. 대체로 피니시가 길수록 품질이 높다는 신호입니다.',
        whyItMatters:
          'WSET 시음에서 피니시(여운)는 팔레트의 마지막 평가 항목이며 품질을 가르는 중요한 단서입니다.',
        example: '좋은 와인은 삼킨 뒤에도 향이 오래 이어집니다.',
      },
    },
  },
  {
    slug: 'old-world-new-world',
    copy: {
      en: {
        term: 'Old World vs New World',
        short: 'Europe’s tradition-led wines versus the riper New World style.',
        definition:
          'Old World vs New World splits the wine world in two. Old World means Europe (France, Italy, Spain and more), leaning on tradition and place names. New World means everywhere else (USA, Australia, Chile and more), leaning on grape names and riper, fruitier styles.',
        whyItMatters:
          'This split is a basic frame WSET uses to explain label styles and taste differences between regions.',
        example: 'Burgundy in France is Old World; California in the USA is New World.',
      },
      ko: {
        term: '구세계와 신세계',
        short: '전통 중심의 유럽 와인과 잘 익은 신세계 스타일.',
        definition:
          '구세계와 신세계는 와인 세계를 크게 둘로 나눈 말입니다. 구세계는 유럽(프랑스, 이탈리아, 스페인 등)으로 전통과 산지 이름을 중시합니다. 신세계는 그 밖(미국, 호주, 칠레 등)으로 품종 이름과 잘 익은 과일 향을 중시합니다.',
        whyItMatters:
          '이 구분은 WSET가 라벨 스타일과 지역별 맛 차이를 설명하는 기본 틀입니다.',
        example: '프랑스 부르고뉴는 구세계, 미국 캘리포니아는 신세계입니다.',
      },
    },
  },
];

export const GLOSSARY_SLUGS = GLOSSARY.map((t) => t.slug);

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
