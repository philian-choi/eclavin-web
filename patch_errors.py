import os

# 1. Fix KR 082 Typo
f82 = "src/content/l1/episode_082.md"
with open(f82, "r", encoding="utf-8") as f: c82 = f.read()
with open(f82, "w", encoding="utf-8") as f: f.write(c82.replace("## [전문기 컨셉", "## [전문가 컨셉"))

# 2. Fix KR 100 Headers
f100 = "src/content/l1/episode_100.md"
with open(f100, "r", encoding="utf-8") as f: c100 = f.read()
c100 = c100.replace("## [WSET L1 마스터 최종 점검]", "## [WSET L1 실전 문제]")
c100 = c100.replace("## [WSET Level 1 만점 합격 전략]", "## [전문가 컨셉 - Expert Concept]")
with open(f100, "w", encoding="utf-8") as f: f.write(c100)

# 3. Backfill KR 091-099 Missing 'Expert Concept'
kr_concepts = {
    91: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 기후와 양조
1. 기후와 스타일: 서늘한 곳은 산도 높음/당도 낮음, 따뜻한 곳은 산도 낮음/당도 높음.
2. 로제 와인: 적포도로 만들며 껍질 접촉 시간을 짧게 가져감.
3. 화이트 와인: 껍질을 즉시 분리하면 적포도로도 화이트 와인을 만들 수 있음.
4. 발효의 원리: 효모 + 당분 = 알코올 + 이산화탄소 + 열.

---

## [시험 함정 & 합격 팁]""",
    92: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 화이트 품종
1. 샤르도네(Chardonnay): 기후에 따라 사과/레몬에서 복숭아/파인애플로 변화하는 카멜레온 품종. 오크 숙성과 잘 어울림.
2. 소비뇽 블랑(Sauvignon Blanc): 잔디, 피망, 구스베리 등 풀향(Herbaceous)이 강하고 산도가 매우 높은 품종. 보통 오크 숙성을 하지 않음.
3. 구분법: '오크향/바닐라'는 샤르도네, '풀향/허브향'은 소비뇽 블랑.

---

## [시험 함정 & 합격 팁]""",
    93: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 레드 품종과 탄닌
1. 피노 누아(Pinot Noir): 얇은 껍질. 낮은 탄닌, 연한 색상, 높은 산도. 딸기, 체리 향.
2. 메를로(Merlot): 중간 껍질. 중간 탄닌, 부드러운 질감. 자두 향.
3. 카베르네 소비뇽(Cabernet Sauvignon): 두꺼운 껍질. 높은 탄닌, 짙은 색상, 높은 산도. 블랙커런트 향.
4. 탄닌의 크기: 피노 누아 < 메를로 < 카베르네 소비뇽.

---

## [시험 함정 & 합격 팁]""",
    94: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 서비스 온도
1. 아주 차갑게 (6~10°C): 스위트 와인(단맛의 균형), 스파클링 와인(기포 유지).
2. 차갑게 (7~10°C): 가벼운 화이트 와인 (산도 강조).
3. 약간 차갑게 (10~13°C): 무거운 화이트, 가벼운 레드 (피노 누아 등).
4. 상온 (15~18°C): 풀 바디 레드 와인 (향을 열기 위해).

---

## [시험 함정 & 합격 팁]""",
    95: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 페어링 원리
1. 와인을 부드럽게 (Soft): 소금(Salt), 산도(Acid) -> 와인의 과일 향을 살리고 떫은맛/신맛을 줄임.
2. 와인을 힘들게 (Hard): 설탕(Sugar), 감칠맛(Umami) -> 와인을 쓰고 떫게 만듦.
3. 매운맛 (Chili Heat): 알코올의 화끈거림을 증폭시킴.
4. 팁: 단 음식에는 음식보다 더 단 와인(스위트 와인)을 매칭해야 함.

---

## [시험 함정 & 합격 팁]""",
    96: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 유럽의 등급 체계
1. PDO (Protected Designation of Origin): 좁고 구체적인 지역. 매우 엄격한 전통적 양조 규정 적용. (가장 높은 품질 보증)
2. PGI (Protected Geographical Indication): PDO보다 넓은 지역. 품종과 양조 방식에 있어 생산자에게 더 많은 자유도 부여.
3. 비교: PDO는 '전통의 수호', PGI는 '혁신과 자유'.

---

## [시험 함정 & 합격 팁]""",
    97: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 스파클링과 주정강화
1. 샴페인 (Champagne): 병 속에서 2차 발효를 거쳐 기포를 생성하는 전통 방식. 비스킷/토스트 향이 특징.
2. 주정강화 (Fortified Wine): 발효 중이나 후에 브랜디 같은 알코올(Spirit)을 첨가하여 도수를 15~22%로 높인 와인.
3. 포트 (Port): 달콤한 주정강화 레드 와인.
4. 셰리 (Sherry): 드라이한 스타일(피노)부터 스위트까지 다양한 스페인의 주정강화 와인.

---

## [시험 함정 & 합격 팁]""",
    98: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 와인 보관과 결함
1. 이상적인 보관: 10~15°C의 서늘하고 어두운 곳. 코르크 마개 와인은 눕혀서 보관.
2. 부쇼네 (Corked/TCA): 코르크 오염으로 인해 젖은 종이박스, 곰팡이 냄새가 나는 결함.
3. 산화 (Oxidation): 산소와 과도하게 접촉하여 색이 갈변하고 식초 냄새가 나는 결함.

---

## [시험 함정 & 합격 팁]""",
    99: """## [전문가 컨셉 - Expert Concept]

모의고사 핵심 복습: 사회적 책임과 서비스
1. 임신과 알코올: 임신 중에는 안전한 알코올 섭취량이 없으므로 완전한 금주가 필요.
2. 와인 보존법: 남은 와인은 진공 펌프(Vacuum pump)를 이용해 산소를 제거하거나 가스를 주입해 보존.
3. 서비스: 라벨 확인(주문 확인)이 가장 우선이며, 잔은 항상 스템(손잡이)을 잡아야 함.
4. 표준 단위 (Standard Units): 건강을 위해 객관적인 알코올 섭취량을 측정하는 단위.

---

## [시험 함정 & 합격 팁]"""
}

for ep, content in kr_concepts.items():
    fpath = f"src/content/l1/episode_{ep:03d}.md"
    with open(fpath, "r", encoding="utf-8") as f:
        text = f.read()
    text = text.replace("## [시험 함정 & 합격 팁]", content)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(text)

# 4. Rewrite EN 095-099 Complete Files
en_episodes = {
    95: """# Episode 095: Final Mock Exam 5 (The Pairing Puzzle) - Integrated Review

## [WSET L1 Practice Question]

Q. Which of the following is correct regarding food and wine pairing?

A. Umami in food makes the wine taste softer and richer.
B. Sugar in food highlights the fruit aromas of dry wines.
C. Salt in food softens the bitterness and acidity of the wine.
D. Spicy food pairs best with high-alcohol, high-tannin red wines.

---

## [Answer & Explanation]

Answer: C. Salt in food softens the bitterness and acidity of the wine.

Explanation:
- Salt and Acid are 'Friends' (make wine taste softer).
- Sugar, Umami, and Chili are 'Hard' (make wine taste harsher).
- Salt reduces the perception of bitterness and acidity while enhancing fruitiness.

---

## [Expert Concept]

The Pairing Golden Rules:

1.  Softening (Friend): Salt & Acid. (Lower tannin/acid perception)
2.  Hardening (Hard): Sugar & Umami. (Higher tannin/acid perception)
3.  Heat: Chili increases alcohol burn.
4.  Rule of Thumb: The wine should have higher acidity than the food, and be sweeter than the dessert.

---

## [Exam Traps & Success Tips]

[Trap]: Don't rely on your personal taste—follow the 'scientific interaction' taught by WSET.
[Tip]: If the food has salt, the wine will almost always taste 'better' (softer).

---

## [Threads & Shorts Scripts]

### Threads Post
[Hook]
Salt is your wine's best friend! 🧂🍷

[Twist]
Struggling with a bitter red wine? Try a pinch of salt on your steak. It’s like magic—the bitterness vanishes and the fruit pops! Understanding these scientific interactions between food and wine is the final key to your WSET Level 1 mastery. Ready to pair like a pro?

[Reason]
Mock Exam Point:
1. Salt = Softens wine
2. Sugar/Umami = Hardens wine
3. Chili = Increases alcohol burn

### YouTube Shorts Script
(0-3s) The secret weapon of wine pairing: SALT! 🧂🍷
(3-15s) WSET Mock Exam! Salt reduces bitterness and acidity in wine. It’s the ultimate wine-friendly flavor! But watch out for sugar—it makes dry wine taste terrible!
(15-25s) Question! What happens to wine when paired with salty food? 1. Becomes more bitter, 2. Becomes softer and fruitier, 3. Turns into vinegar.
(25-35s) The answer is 2! Salt is the best friend!
(35-45s) Pair with science! Subscribe for more!
""",
    96: """# Episode 096: Final Mock Exam 6 (The Label Code) - Integrated Review

## [WSET L1 Practice Question]

Q. Which of the following is correct regarding 'PDO' and 'PGI' on European wine labels?

A. PDO wines have much larger geographical areas and almost no regulations compared to PGI.
B. PDO wines strictly regulate tradition and quality and are usually produced in smaller areas than PGI.
C. PGI wines must always be produced as sparkling wines.
D. These terms mean the state decides the price of the wine.

---

## [Answer & Explanation]

Answer: B. PDO wines strictly regulate tradition and quality and are usually produced in smaller areas than PGI.

Explanation:
- PDO (Protected Designation of Origin): Smaller area, stricter rules, higher traditional quality.
- PGI (Protected Geographical Indication): Larger area, more flexibility for the winemaker.
- These terms help consumers identify the origin and quality level of European wines.

---

## [Expert Concept]

The European Quality Ladder:

1.  PDO: Focus on 'terroir' and tradition. Strictest regulations. (e.g., AOC in France, DOCG in Italy).
2.  PGI: More freedom to experiment with varieties and methods. (e.g., VDP in France, IGT in Italy).
3.  Goal: To protect the reputation of specific regions.

---

## [Exam Traps & Success Tips]

[Trap]: Don't assume "PGI is always bad." It just means the producer had more freedom. Many high-quality wines use the PGI label.
[Tip]: Remember: 'PDO = Small & Strict', 'PGI = Large & Flexible'.

---

## [Threads & Shorts Scripts]

### Threads Post
[Hook]
Can you decode the secret language of European wine labels? 📜🍷

[Twist]
PDO, PGI... these aren't just random letters. They are clues to where the wine came from and how strictly it was made. PDO means the winemaker followed centuries of tradition in a small, special area. PGI gives them a bit more room to play. Master this 'Label Code' and you're one step closer to your perfect score!

[Reason]
Mock Exam Point:
1. PDO = Small area, Strict rules
2. PGI = Large area, Flexible rules
3. Purpose: Origin and quality protection

### YouTube Shorts Script
(0-3s) Deciphering the Wine Code: PDO vs PGI! 📜🍷
(3-15s) WSET Mock Exam! PDO means a small area with very strict rules to protect tradition. PGI means a larger area with more freedom for the winemaker!
(15-25s) Question! Which label indicates a smaller area and stricter rules? 1. PGI, 2. PDO, 3. ABV.
(25-35s) The answer is 2, PDO! Think 'P' for 'Protected' and 'D' for 'Designation'!
(35-45s) Read the label like a pro! Subscribe for more!
""",
    97: """# Episode 097: Final Mock Exam 7 (Bubbles & Spirits) - Integrated Review

## [WSET L1 Practice Question]

Q. Which of the following is INCORRECT regarding sparkling and fortified wines?

A. Champagne produces bubbles through a second fermentation inside the bottle.
B. Fortified wine is wine to which a distilled spirit like brandy is added during or after fermentation.
C. Sherry and Port are representative fortified wines.
D. All sparkling wines must be produced as sweet dessert wines only.

---

## [Answer & Explanation]

Answer: D. All sparkling wines must be produced as sweet dessert wines only.

Explanation:
- Champagne (True): The 'Traditional Method' involves bottle fermentation.
- Fortified (True): Alcohol is added to 'strengthen' the wine.
- Sweetness (False): Sparkling wines come in many styles, from bone-dry (Brut) to sweet (Demi-Sec). Most quality sparklings are dry.

---

## [Expert Concept]

Specialized Wine Styles:

1.  Sparkling (Method): Traditional (Bottle fermentation) vs. Tank (Large container).
2.  Fortified (Strength): Adding spirit to reach 15-22% ABV.
3.  Sweetness Scale: Brut (Dry) -> Extra-Dry -> Dry -> Demi-Sec (Sweet).

---

## [Exam Traps & Success Tips]

[Trap]: Don't think "all fortified wines are sweet." Some styles of Sherry (like Fino) are bone-dry!
[Tip]: 'Fortified' always means 'extra alcohol added.'

---

## [Threads & Shorts Scripts]

### Threads Post
[Hook]
Sparkling vs. Fortified: Do you know the difference? 🥂🍷

[Twist]
One is about 'Bubbles,' the other is about 'Strength.' Champagne gets its sparkle from a second fermentation in the bottle, while Port gets its power from added brandy. Understanding these unique production methods is the key to mastering the special wine section of WSET Level 1!

[Reason]
Mock Exam Point:
1. Champagne = Second fermentation in bottle
2. Fortified = Spirit added
3. Sparkling sweetness = Brut is dry!

### YouTube Shorts Script
(0-3s) Bubbles and Power: Sparkling vs Fortified! 
(3-15s) WSET Mock Exam! Champagne creates bubbles in the bottle. Fortified wines like Port have brandy added to make them stronger!
(15-25s) Question! What does 'Brut' on a sparkling wine label mean? 1. Very sweet, 2. Dry, 3. Extra bubbles.
(25-35s) The answer is 2! Brut is the standard for dry sparkling wine.
(35-45s) Know your styles! Subscribe for more!
""",
    98: """# Episode 098: Final Mock Exam 8 (The Guardian's Test) - Integrated Review

## [WSET L1 Practice Question]

Q. Which of the following is correct regarding wine storage and faults?

A. Wine matures faster and tastes better when stored in a sunny, warm place.
B. Storing cork-sealed wine upright keeps the cork moist and prevents oxidation.
C. If a wine smells like wet cardboard, it is very likely that cork taint (Corked) has occurred.
D. When white wine turns brown and smells like vinegar, it is a sign of peak maturity.

---

## [Answer & Explanation]

Answer: C. If a wine smells like wet cardboard, it is very likely that cork taint (Corked) has occurred.

Explanation:
- Storage: Sunlight and heat ruin wine. Store in a cool, dark, constant-temp place.
- Position: Store horizontal (on side) to keep the cork moist and airtight.
- Faults: 'Wet cardboard' = Corked (TCA). 'Brown/Vinegar' = Oxidized (Spoiled).

---

## [Expert Concept]

The Guardian's Duties:

1.  Conditions: 10-15°C, No light, No vibration.
2.  Horizontal Storage: Essential for natural corks to prevent them from drying out and letting air in.
3.  Fault Detection: Use your nose! Wet cardboard (TCA) and Vinegar (Oxidation) are the most common signs of a bad bottle.

---

## [Exam Traps & Success Tips]

[Trap]: Don't assume "cork pieces in the wine mean it's corked." That's just a service error. True 'corked' wine is a chemical taint you smell.
[Tip]: Remember the 3 enemies of wine: Light, Heat, and Oxygen!

---

## [Threads & Shorts Scripts]

### Threads Post
[Hook]
Is your wine 'Corked' or just 'Dirty'? 🍷👃

[Twist]
If your wine smells like a damp basement or wet cardboard, it’s not just a bad batch—it’s 'Cork Taint.' It happens in about 3-5% of natural corks. Knowing how to spot this fault is the duty of every wine professional. Don't be afraid to send a bad bottle back!

[Reason]
Mock Exam Point:
1. Storage = Cool, Dark, Horizontal
2. Cork Taint = Wet cardboard smell
3. Oxidation = Brown color, Vinegar smell

### YouTube Shorts Script
(0-3s) Does your wine smell like wet cardboard? 🍷👃
(3-15s) WSET Mock Exam! That’s 'Cork Taint' (TCA)! It ruins the wine’s flavor. Also, remember to store your bottles on their side to keep the cork moist!
(15-25s) Question! What's the best way to store a wine with a natural cork? 1. Upright, 2. On its side (Horizontal), 3. In the oven.
(25-35s) The answer is 2! Keep that cork wet to keep the air out!
(35-45s) Protect your wine! Subscribe for more!
""",
    99: """# Episode 099: Final Mock Exam 9 (The Responsible Expert) - Integrated Review

## [WSET L1 Practice Question]

Q. Which of the following is correct regarding wine service and social responsibility?

A. Hold the bowl of the wine glass firmly when pouring.
B. Recommend a daily glass of wine for pregnant women for their health.
C. When storing leftover wine, it is good to use a vacuum pump to remove as much air as possible.
D. Standard Units are the units used to determine wine prices.

---

## [Answer & Explanation]

Answer: C. When storing leftover wine, it is good to use a vacuum pump to remove as much air as possible.

Explanation:
- Service: Always hold the 'Stem' for hygiene and temperature control.
- Responsibility: Alcohol must be avoided entirely during pregnancy.
- Preservation: A vacuum pump is a great way to slow down oxidation in an opened bottle.
- Units: Standard Units measure alcohol intake, not price.

---

## [Expert Concept]

The Expert's Ethics:

1.  Hygiene: Never touch the rim or bowl of a guest's glass.
2.  Safety: Promoting abstinence during pregnancy and zero tolerance for drink-driving.
3.  Preservation: Using technology (Vacuum/Gas) to reduce waste and maintain quality.
4.  Standard Units: Understanding your own and your guest's alcohol limits.

---

## [Exam Traps & Success Tips]

[Trap]: WSET values safety above all else. Any answer that suggests "drinking a little while pregnant" is wrong.
[Tip]: Think of yourself as a 'Guardian of Quality and Safety' when answering service questions.

---

## [Threads & Shorts Scripts]

### Threads Post
[Hook]
Are you a 'Responsible Expert'? 🍷🕴️

[Twist]
Being a wine professional isn't just about knowing the grapes; it's about protecting the people who drink them. From safe service etiquette (holding the stem!) to advising absolute abstinence during pregnancy, your ethics define your expertise. Let’s lead the way in healthy wine culture!

[Reason]
Mock Exam Point:
1. Hold the stem!
2. Pregnancy = Absolute abstinence
3. Leftover wine = Vacuum pump preservation

### YouTube Shorts Script
(0-3s) The ethics of a wine pro! 🍷🕴️
(3-15s) WSET Mock Exam! Always hold the glass by the stem to keep it clean and cool. And remember: the only safe amount of alcohol during pregnancy is ZERO.
(15-25s) Question! What is the best way to save an opened bottle of wine? 1. Leave it on the counter, 2. Use a vacuum pump and refrigerate, 3. Shake it.
(25-35s) The answer is 2! Get the air out and keep it cold!
(35-45s) Drink safe, drink smart! Subscribe for a perfect score!
"""
}

for ep, content in en_episodes.items():
    fpath = f"src/content/l1_en/episode_{ep:03d}.md"
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)

print("Patch applied successfully.")
