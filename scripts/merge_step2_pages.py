#!/usr/bin/env python3
"""Clean the fetched Step 2 pages and merge them into pages.json and index.json."""
import json, re

CHROME = {
    "choose your migration pathway",
    "contents",
    "migration services",
    "browse all categories",
    "tools & calculators",
    "tools and calculators",
    "ready to start your migration journey",
    "why choose bansal immigration",
    "migration process",
    "get your free celebrity visa assessment",
}

def walk(obj, fn):
    if isinstance(obj, dict):
        return {k: walk(v, fn) for k, v in obj.items()}
    if isinstance(obj, list):
        return [walk(v, fn) for v in obj]
    if isinstance(obj, str):
        return fn(obj)
    return obj

def clean_str(s):
    s = s.replace("✔", "").replace("\u200b", "")
    s = re.sub(r"\s+", " ", s).strip()
    return s

def blob(section):
    return json.dumps(section)

def is_menu(section):
    text = blob(section)
    return "Skilled Independent (189)" in text and "Contributory Parent" in text

def is_placeholder(section):
    return "Add your main page content" in blob(section)

def clean_page(page):
    page = walk(page, clean_str)
    sections = []
    for s in page["sections"]:
        if s["kind"] == "form":
            sections.append(s)
            continue
        h = s["h2"].strip().lower()
        if h in CHROME or is_menu(s) or is_placeholder(s):
            continue
        blocks = []
        for b in s["blocks"]:
            if b.get("t") == "h3" and b.get("x", "").strip().lower() in CHROME:
                continue
            if b.get("t") == "p" and b.get("x", "").startswith("Add your main page content"):
                continue
            blocks.append(b)
        if not blocks:
            continue
        s["blocks"] = blocks
        sections.append(s)
    # drop a leading overview that is only a repeated title
    page["sections"] = sections
    faqs = []
    for f in page["faqs"]:
        q = f["q"].strip().lower()
        if q.startswith("what should i know about"):
            continue
        if q.rstrip("?") in CHROME:
            continue
        if "add your main page content" in f["a"].lower():
            continue
        if "skilled independent (189)" in f["a"].lower() and "contributory parent" in f["a"].lower():
            continue
        faqs.append(f)
    page["faqs"] = faqs
    return page

def form_section(h2):
    return {"id": "talk-to-us", "name": "Enquiry form and CTA", "kind": "form", "h2": h2, "blocks": []}

def base(path, category, hub, name, h1, desc, intro, keywords, sections, faqs):
    return {
        "path": path,
        "category": category,
        "isHub": hub,
        "name": name,
        "primaryKeyword": keywords[0],
        "keywords": keywords,
        "pageType": "Category hub" if hub else "Service page",
        "seo": {"title": f"{name} | Bansal Immigration", "description": desc, "h1": h1},
        "hero": {
            "badge": "",
            "h1": h1,
            "intro": [intro],
            "buttons": [
                {"label": "Book a Consultation", "href": "/book-an-appointment"},
                {"label": "Contact us", "href": "/contact"},
            ],
            "phone": True,
        },
        "sections": sections + [form_section(f"Talk to us about {name}")],
        "faqs": faqs,
        "cta": {},
        "form": True,
    }

pages = json.load(open("content/step2-pages.json", encoding="utf-8"))
pages = {k: clean_page(v) for k, v in pages.items()}

# Skill assessment hub: the live page is the authority list.
pages["/skill-assessment"]["sections"] = [
    {
        "id": "assessment-authorities",
        "name": "Assessment authorities",
        "kind": "related",
        "h2": "Skill assessment authorities",
        "blocks": [{
            "t": "ul",
            "items": [
                {"x": "[ACS (ICT)](/skill-assessment/acs-skill-assessment)"},
                {"x": "[VETASSESS (general occupations)](/skill-assessment/vetassess-skill-assessment)"},
                {"x": "[Engineers Australia](/skill-assessment/ea-skill-assessment)"},
                {"x": "[Accounting](/skill-assessment/accountant-skill-assessment)"},
                {"x": "[Nursing: AHPRA registration and ANMAC](/skill-assessment/nursing-aphara-registration-and-anmac-skill-assessment)"},
                {"x": "[Trades Recognition Australia](/skill-assessment/trades-recognition-australia)"},
                {"x": "[Skills assessment for trades](/skill-assessment/skills-assessment-for-trades)"},
                {"x": "[Job Ready Program](/skill-assessment/job-ready-program)"},
                {"x": "[Skills assessment guide](/skill-assessment/guide)"},
                {"x": "[Assessment requirements](/skill-assessment/requirements)"},
                {"x": "[Assessment timeline](/skill-assessment/timeline)"},
            ],
        }],
    },
    {
        "id": "why-choose-our-assessment-services",
        "name": "Why choose our assessment services",
        "kind": "prose",
        "h2": "Why choose our assessment services",
        "blocks": [
            {"t": "h3", "x": "Right authority"},
            {"t": "p", "x": "We help you choose the correct assessing authority for your occupation and pathway."},
            {"t": "h3", "x": "Document readiness"},
            {"t": "p", "x": "Clear document checklists and review to minimise delays and rework."},
            {"t": "h3", "x": "PR strategy"},
            {"t": "p", "x": "Align your assessment outcome with the right PR or work visa strategy."},
            {"t": "h3", "x": "Faster turnaround"},
            {"t": "p", "x": "Well-prepared applications typically lead to quicker outcomes."},
        ],
    },
    form_section("Need help with your skill assessment?"),
]
pages["/skill-assessment"]["faqs"] = [
    {"q": "Which assessing authority do I use?", "a": "It depends on your occupation. ICT occupations go to ACS, many general occupations to VETASSESS, engineering to Engineers Australia, accounting to the accounting bodies, nursing through AHPRA and ANMAC, and trades through Trades Recognition Australia."},
    {"q": "Do you lodge the skills assessment?", "a": "We help you choose the authority, prepare the documents and submit the assessment."},
]

# Citizenship by birth: the live article body is an empty editor prompt. Use the public description and the pathway card.
pages["/citizenship/citizenship-by-birth"] = base(
    "/citizenship/citizenship-by-birth", "citizenship", False,
    "Citizenship by Birth",
    "Citizenship by Birth",
    "Complete guide to Australian citizenship by birth. Learn about automatic citizenship for children born in Australia, eligibility requirements, documentation needed, and how to prove citizenship status.",
    "Automatic citizenship for children born in Australia, in the circumstances the law allows. This page explains what the current citizenship-by-birth pathway covers.",
    ["citizenship by birth Australia", "child born in Australia citizenship", "evidence of citizenship by birth"],
    [
        {"id": "what-this-pathway-covers", "name": "What this pathway covers", "kind": "prose", "h2": "What this pathway covers",
         "blocks": [
            {"t": "p", "x": "The citizenship by birth pathway is for a child born in Australia. On the current site this pathway is described as automatic at birth, with no separate application, where the child meets the rules for citizenship by birth."},
            {"t": "ul", "items": [
                {"x": "Born in Australia"},
                {"x": "Automatic at birth, where the rules are met"},
                {"x": "No separate citizenship application in those cases"},
                {"x": "Proof is handled through [evidence of Australian citizenship](/citizenship/evidence-of-australian-citizenship) when a certificate is needed"},
            ]},
            {"t": "p", "x": "A child born in Australia is a citizen only in some circumstances. Do not assume citizenship from the place of birth alone. If you need a certificate, see [evidence of Australian citizenship](/citizenship/evidence-of-australian-citizenship)."},
         ]},
    ],
    [
        {"q": "Is every child born in Australia a citizen?", "a": "No. Citizenship by birth applies only in the circumstances set out in the Australian Citizenship Act. Check the facts before you assume a child is a citizen."},
        {"q": "How do I prove citizenship by birth?", "a": "Apply for evidence of Australian citizenship if you need a certificate. See the evidence of citizenship page."},
    ],
)

# Subclass 476: the live URL title and description are this visa. The article body on that URL is the temporary graduate extension template, so it is not used here.
pages["/skilled-migration/temporary-graduate-visa-extension"] = base(
    "/skilled-migration/temporary-graduate-visa-extension", "skilled-migration", False,
    "Skilled Recognised Graduate visa (subclass 476)",
    "Skilled Recognised Graduate visa (subclass 476)",
    "This visa is for recent engineering graduates. It allows them to reside, do work or get enrolled in study course in Australia for up to 18 months.",
    "This visa is for recent engineering graduates. It allows them to reside, do work or get enrolled in a study course in Australia for up to 18 months.",
    ["subclass 476", "skilled recognised graduate visa", "engineering graduate visa Australia"],
    [
        {"id": "what-the-476-is", "name": "What the 476 is", "kind": "prose", "h2": "What the subclass 476 visa is",
         "blocks": [
            {"t": "p", "x": "The Skilled Recognised Graduate visa (subclass 476) is for recent engineering graduates. It allows them to reside, do work or get enrolled in a study course in Australia for up to 18 months."},
            {"t": "p", "x": "It is a separate visa from the [Temporary Graduate visa (subclass 485)](/migrate-to-australia/temporary-graduate-visa-subclass-485). If you have already finished study in Australia, start with the 485 pages."},
         ]},
    ],
    [
        {"q": "Who is the subclass 476 visa for?", "a": "Recent engineering graduates. It lets them live, work or enrol in study in Australia for up to 18 months."},
        {"q": "How long can I stay on a 476?", "a": "Up to 18 months, as described on the current subclass 476 page."},
    ],
)

# National Innovation visa: keep the 858-specific passage and fees from the live page, not the graduate-extension checklist that is also rendered there.
pages["/migrate-to-australia/national-innovation-visa-858"] = base(
    "/migrate-to-australia/national-innovation-visa-858", "migrate-to-australia", False,
    "National Innovation Visa (subclass 858)",
    "National Innovation Visa (subclass 858)",
    "The National Innovation visa (subclass 858) is a permanent visa for people with an internationally recognised record of exceptional achievement.",
    "The National Innovation visa Subclass 858 provides permanent residency on grant for people with an internationally recognised record of exceptional and outstanding achievement.",
    ["national innovation visa 858", "subclass 858", "global talent visa Australia"],
    [
        {"id": "what-the-visa-is", "name": "What the visa is", "kind": "prose", "h2": "What the National Innovation visa is",
         "blocks": [
            {"t": "p", "x": "The National Innovation visa (subclass 858) provides permanent residency on grant. It is for people with an internationally recognised record of exceptional and outstanding achievement in a profession, sport, the arts, or academia and research."},
            {"t": "p", "x": "As a permanent resident you can pursue Australian citizenship after meeting the general residence requirement of four years of lawful residence in Australia, including at least 12 months as a permanent resident. See [Australian citizenship](/citizenship)."},
         ]},
        {"id": "key-facts", "name": "Key facts", "kind": "keyfacts", "h2": "Key facts",
         "blocks": [{"t": "table", "head": ["Item", "Detail"], "rows": [
            ["Visa", "National Innovation visa, subclass 858"],
            ["Stay", "Permanent"],
            ["Processing time shown on the current page", "9 to 22 months"],
            ["Base application fee shown on the current page", "AUD 4,985 for the primary applicant"],
            ["Additional applicant, 18 and over", "AUD 2,495"],
         ]}]},
        {"id": "earlier-talent-visas", "name": "Earlier talent visas", "kind": "related", "h2": "Earlier talent visas",
         "blocks": [{"t": "ul", "items": [
            {"x": "The [Global Talent Independent program](/migrate-to-australia/global-talent-independent-program-gti) closed to new applicants when this visa replaced that pathway."},
            {"x": "The [Distinguished Talent visa (subclass 124)](/migrate-to-australia/distinguished-talent-visa-124) and the [onshore Distinguished Talent visa (subclass 858)](/migrate-to-australia/distinguished-talent-visa-858) are earlier visas. The current page for subclass 858 says it has transitioned to the National Innovation visa."},
         ]}]},
    ],
    [
        {"q": "Is the National Innovation visa permanent?", "a": "Yes. The current page lists the stay as permanent, with permanent residency on grant."},
        {"q": "What does the current page list as the fee?", "a": "A base application fee of AUD 4,985 for the primary applicant, and AUD 2,495 for an additional applicant aged 18 or over. Check the Department of Home Affairs for the figure on the day you apply."},
        {"q": "Does it lead to citizenship?", "a": "It can, after you meet the general residence requirement. See the citizenship page."},
    ],
)

# Point the short distinguished-talent pages at the current visa.
for path, sentence in (
    ("/migrate-to-australia/distinguished-talent-visa-124",
     "The Distinguished Talent visa (subclass 124) was for internationally recognised achievers applying from outside Australia. It has been replaced by the National Innovation visa (subclass 858)."),
    ("/migrate-to-australia/distinguished-talent-visa-858",
     "The Distinguished Talent visa (subclass 858) has transitioned to the National Innovation visa. The information on the current page is kept for reference."),
):
    h1 = pages[path]["hero"]["h1"]
    pages[path]["hero"]["intro"] = [sentence]
    pages[path]["seo"]["description"] = sentence
    pages[path]["sections"] = [
        {"id": "current-position", "name": "Current position", "kind": "prose", "h2": "Current position",
         "blocks": [
            {"t": "p", "x": sentence},
            {"t": "p", "x": "New applications are made under the [National Innovation visa (subclass 858)](/migrate-to-australia/national-innovation-visa-858)."},
         ]},
        form_section(f"Talk to us about {h1}"),
    ]
    pages[path]["faqs"] = [
        {"q": "Can I still apply for this Distinguished Talent visa?", "a": "The current pages say these visas have been replaced by the National Innovation visa. Use that page for a new application."},
    ]

# Give the English points page a calculator button.
eng = pages["/migrate-to-australia/points-for-english-score"]
eng["hero"]["buttons"][1] = {"label": "Check your points", "href": "/migrate-to-australia/pr-point-calculator"}
if not eng["faqs"]:
    eng["faqs"] = [
        {"q": "How many points does English add?", "a": "On the current page, competent English is 0 points, proficient English is 10 points and superior English is 20 points."},
        {"q": "Which tests are listed?", "a": "IELTS, PTE Academic, TOEFL iBT, Cambridge C1 Advanced and OET."},
    ]

for path, page in pages.items():
    print(path)
    for s in page["sections"]:
        if s["kind"] == "form":
            continue
        print("  -", s["h2"], f"({len(s['blocks'])} blocks)")
    print("  faqs", len(page["faqs"]))

# Merge into pages.json without reformatting the existing file.
existing = json.load(open("content/pages.json", encoding="utf-8"))
overlap = [p for p in pages if p in existing]
if overlap:
    raise SystemExit("overlap " + ", ".join(overlap))
raw = open("content/pages.json", encoding="utf-8").read().rstrip()
if not raw.endswith("}"):
    raise SystemExit("pages.json shape")
chunk = json.dumps(pages, indent=1, ensure_ascii=False)
inner = chunk.strip()[1:-1].strip()
raw = raw[:-1].rstrip() + ",\n" + inner + "\n}\n"
open("content/pages.json", "w", encoding="utf-8", newline="\n").write(raw)

index = json.load(open("content/index.json", encoding="utf-8"))
order = max(e["order"] for e in index) + 1
have = {e["path"] for e in index}
for path, page in pages.items():
    if path in have:
        continue
    index.append({
        "path": path,
        "name": page["name"],
        "category": page["category"],
        "isHub": page["isHub"],
        "order": order,
    })
    order += 1
open("content/index.json", "w", encoding="utf-8", newline="\n").write(json.dumps(index, indent=1, ensure_ascii=False) + "\n")
print("merged", len(pages), "pages; index", len(index))
