import os
import re

kr_headers = [
    "## [WSET L1 실전 문제]",
    "## [정답 및 해설]",
    "## [전문가 컨셉 - Expert Concept]",
    "## [시험 함정 & 합격 팁]",
    "## [Threads & Shorts Scripts]"
]

en_headers = [
    "## [WSET L1 Practice Question]",
    "## [Answer & Explanation]",
    "## [Expert Concept]",
    "## [Exam Traps & Success Tips]",
    "## [Threads & Shorts Scripts]"
]

def check_file(filepath, headers):
    if not os.path.exists(filepath):
        return f"File missing"
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    errors = []
    
    # 1. Check if all standard headers exist
    positions = []
    for h in headers:
        pos = content.find(h)
        if pos == -1:
            errors.append(f"Missing header: {h}")
        else:
            positions.append((pos, h))
    
    # If headers are missing, no need to check further structural integrity for those sections
    if errors:
        return " | ".join(errors)

    # 2. Check content length under each header (detect empty sections)
    positions.sort(key=lambda x: x[0])
    for i in range(len(positions)):
        start = positions[i][0] + len(positions[i][1])
        end = positions[i+1][0] if i + 1 < len(positions) else len(content)
        section_content = content[start:end].strip()
        # Remove markdown dividers and empty spaces
        section_content = section_content.replace('---', '').strip()
        
        if len(section_content) < 15:
            errors.append(f"Empty or too short content under: {positions[i][1]}")
            
    # 3. Check A, B, C, D options in the Question section
    q_section_start = positions[0][0]
    q_section_end = positions[1][0] if len(positions) > 1 else len(content)
    q_content = content[q_section_start:q_section_end]
    
    if not re.search(r'^A\.', q_content, re.MULTILINE): errors.append("Missing option A.")
    if not re.search(r'^B\.', q_content, re.MULTILINE): errors.append("Missing option B.")
    if not re.search(r'^C\.', q_content, re.MULTILINE): errors.append("Missing option C.")
    if not re.search(r'^D\.', q_content, re.MULTILINE): errors.append("Missing option D.")

    return " | ".join(errors) if errors else "OK"

error_count = 0
for i in range(1, 101):
    idx = f"{i:03d}"
    kr_file = f"src/content/l1/episode_{idx}.md"
    en_file = f"src/content/l1_en/episode_{idx}.md"
    
    kr_status = check_file(kr_file, kr_headers)
    en_status = check_file(en_file, en_headers)
    
    if kr_status != "OK" or en_status != "OK":
        error_count += 1
        print(f"Episode {idx}:")
        if kr_status != "OK":
            print(f"  [KR] {kr_status}")
        if en_status != "OK":
            print(f"  [EN] {en_status}")

if error_count == 0:
    print("SUCCESS: All 200 files passed the strict structural and content integrity audit.")
else:
    print(f"FAILED: Found critical errors in {error_count} episodes.")
