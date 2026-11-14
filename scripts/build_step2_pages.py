#!/usr/bin/env python3
"""Pull the missing Step 2 pages from the live site and write content/step2-pages.json."""
import json, re, urllib.request
from bs4 import BeautifulSoup, NavigableString

BASE = "https://www.bansalimmigration.com.au"
OUT = "content/step2-pages.json"

SPECS = [
    ("/skill-assessment", True),
    ("/skill-assessment/acs-skill-assessment", False),
    ("/skill-assessment/vetassess-skill-assessment", False),
    ("/skill-assessment/ea-skill-assessment", False),
    ("/skill-assessment/accountant-skill-assessment", False),
    ("/skill-assessment/nursing-aphara-registration-and-anmac-skill-assessment", False),
    ("/skill-assessment/trades-recognition-australia", False),
    ("/skill-assessment/skills-assessment-for-trades", False),
    ("/skill-assessment/job-ready-program", False),
    ("/skill-assessment/guide", False),
    ("/skill-assessment/requirements", False),
    ("/skill-assessment/timeline", False),
    ("/citizenship/citizenship-by-conferral", False),
    ("/citizenship/citizenship-by-descent", False),
    ("/citizenship/citizenship-by-birth", False),
    ("/citizenship/dual-citizenship", False),
    ("/citizenship/citizenship-test", False),
    ("/citizenship/evidence-of-australian-citizenship", False),
    ("/other-countries/canada", False),
    ("/other-countries/new-zealand", False),
    ("/other-countries/usa", False),
    ("/celebrity-visas", True),
    ("/skilled-migration/temporary-graduate-visa-extension", False),
    ("/migrate-to-australia/national-innovation-visa-858", False),
    ("/migrate-to-australia/global-talent-independent-program-gti", False),
    ("/migrate-to-australia/distinguished-talent-visa-124", False),
    ("/migrate-to-australia/distinguished-talent-visa-858", False),
    ("/migrate-to-australia/how-to-claim-regional-points", False),
    ("/migrate-to-australia/points-for-english-score", False),
]

ACRONYM = [
    (r"\bAcs\b", "ACS"),
    (r"\bVetassess\b", "VETASSESS"),
    (r"\bAphara\b", "AHPRA"),
    (r"\bAhpra\b", "AHPRA"),
    (r"\bAnmac\b", "ANMAC"),
    (r"\bAnzsco\b", "ANZSCO"),
    (r"\bIct\b", "ICT"),
    (r"\bUsa\b", "USA"),
    (r"\bNz\b", "NZ"),
    (r"\bGti\b", "GTI"),
    (r"\bTra\b", "TRA"),
    (r"\bEoi\b", "EOI"),
    (r"\bPr\b", "PR"),
    (r"\bIelts\b", "IELTS"),
    (r"\bPte\b", "PTE"),
]


def fix_words(s: str) -> str:
    s = re.sub(r"\s+", " ", s).strip()
    for pat, rep in ACRONYM:
        s = re.sub(pat, rep, s)
    return s


def fix_href(href: str) -> str:
    if not href:
        return ""
    href = href.strip().split("#")[0].split("?")[0]
    for host in (
        "https://www.bansalimmigration.com.au",
        "https://bansalimmigration.com.au",
        "http://www.bansalimmigration.com.au",
        "http://bansalimmigration.com.au",
    ):
        if href.startswith(host):
            href = href[len(host) :] or "/"
    if href.startswith("mailto:") or href.startswith("tel:"):
        return href
    if href.startswith("/"):
        if len(href) > 1 and href.endswith("/"):
            href = href[:-1]
        return href
    return href


def inline(el) -> str:
    parts = []
    for child in el.children:
        if isinstance(child, NavigableString):
            parts.append(str(child))
        elif getattr(child, "name", None) in ("script", "style", "svg", "noscript"):
            continue
        elif child.name in ("strong", "b"):
            t = inline(child).strip()
            if t:
                parts.append(f"**{t}**")
        elif child.name in ("em", "i"):
            t = inline(child).strip()
            if t:
                parts.append(f"*{t}*")
        elif child.name == "br":
            parts.append(" ")
        elif child.name == "a":
            href = fix_href(child.get("href") or "")
            text = inline(child).strip() or href
            if href.startswith("/") or href.startswith("http") or href.startswith("mailto:") or href.startswith("tel:"):
                parts.append(f"[{text}]({href})")
            else:
                parts.append(text)
        else:
            parts.append(inline(child))
    text = re.sub(r"[ \t\r\f\v]+", " ", "".join(parts))
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace("** **", " ").replace("****", "")
    return fix_words(text)


def slug_id(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:70] or "section"


def kind_for(h2: str, blocks: list) -> str:
    n = h2.lower()
    if any(w in n for w in ("cost", "fee", "charge")):
        return "costs"
    if "mistake" in n or "avoid" in n:
        return "mistakes"
    if any(w in n for w in ("document", "evidence", "checklist", "what to prepare")):
        return "docs"
    if any(w in n for w in ("step", "process", "how it works", "how to", "timeline")):
        return "steps"
    if any(w in n for w in ("eligib", "requirement", "who can", "criteria")):
        return "prose"
    if blocks and blocks[0].get("t") == "table" and len(blocks[0].get("head") or []) == 2 and len(blocks[0].get("rows") or []) <= 8:
        if any(w in n for w in ("glance", "key fact", "snapshot", "overview")):
            return "keyfacts"
    return "prose"


def table_block(table) -> dict | None:
    rows = []
    for tr in table.find_all("tr"):
        cells = [inline(c) for c in tr.find_all(["th", "td"])]
        cells = [c for c in cells if c]
        if cells:
            rows.append(cells)
    if len(rows) < 2:
        return None
    width = max(len(r) for r in rows)
    head = rows[0]
    body = []
    for r in rows[1:]:
        if len(r) < width:
            r = r + [""] * (width - len(r))
        body.append(r[:width])
    if not body:
        return None
    return {"t": "table", "head": head[:width], "rows": body}


def blocks_from(container) -> list:
    blocks = []
    for el in container.find_all(["h2", "h3", "h4", "p", "ul", "ol", "table", "blockquote"], recursive=True):
        if el.find_parent(["table", "ul", "ol", "blockquote"]):
            continue
        # skip headings we will split on later; collect flat then split
        if el.name in ("h2", "h3", "h4"):
            text = inline(el)
            if text and text.lower() not in ("need help with your skill assessment?",):
                blocks.append({"t": "h", "level": el.name, "x": text})
            continue
        if el.name == "p":
            # a paragraph that is only a bold label acts as a heading
            strongs = el.find_all(["strong", "b"])
            text = inline(el)
            if not text or text in ("*", "**"):
                continue
            only_strong = strongs and inline(el).replace("**", "").strip() == "".join(s.get_text(" ", strip=True) for s in strongs).strip()
            if only_strong and len(text) < 90:
                blocks.append({"t": "h", "level": "h3", "x": text.replace("**", "")})
            else:
                blocks.append({"t": "p", "x": text})
            continue
        if el.name in ("ul", "ol"):
            items = []
            for li in el.find_all("li", recursive=False):
                x = inline(li)
                if x:
                    items.append({"x": x})
            if items:
                blocks.append({"t": "ul" if el.name == "ul" else "ol", "items": items})
            continue
        if el.name == "table":
            tb = table_block(el)
            if tb:
                blocks.append(tb)
            continue
        if el.name == "blockquote":
            x = inline(el)
            if x:
                blocks.append({"t": "quote", "x": x})
    return blocks


def split_sections(flat: list) -> list:
    sections = []
    current = {"h2": "Overview", "blocks": []}
    for b in flat:
        if b.get("t") == "h" and b.get("level") == "h2":
            if current["blocks"]:
                sections.append(current)
            current = {"h2": b["x"], "blocks": []}
            continue
        if b.get("t") == "h":
            current["blocks"].append({"t": "h3", "x": b["x"]})
            continue
        current["blocks"].append(b)
    if current["blocks"]:
        sections.append(current)
    cleaned = []
    used = set()
    for s in sections:
        h2 = s["h2"]
        if h2.lower() in ("frequently asked questions", "faqs", "faq"):
            continue
        sid = slug_id(h2)
        base = sid
        n = 2
        while sid in used:
            sid = f"{base}-{n}"
            n += 1
        used.add(sid)
        blocks = s["blocks"]
        cleaned.append({
            "id": sid,
            "name": h2[:80],
            "kind": kind_for(h2, blocks),
            "h2": h2,
            "blocks": blocks,
        })
    return cleaned


def faqs_from(soup, sections) -> list:
    faqs = []
    for script in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            data = json.loads(script.string or "")
        except Exception:
            continue
        nodes = data if isinstance(data, list) else [data]
        for node in nodes:
            if not isinstance(node, dict):
                continue
            graph = node.get("@graph") or [node]
            for item in graph:
                if not isinstance(item, dict):
                    continue
                t = item.get("@type")
                if t == "FAQPage" or (isinstance(t, list) and "FAQPage" in t):
                    for q in item.get("mainEntity") or []:
                        name = (q.get("name") or "").strip()
                        ans = q.get("acceptedAnswer") or {}
                        text = (ans.get("text") or "").strip()
                        if name and text:
                            faqs.append({"q": fix_words(name), "a": fix_words(re.sub("<[^>]+>", " ", text))})
    if faqs:
        return faqs[:8]
    # Build questions from the page's own sections so every page has the same FAQ block.
    for s in sections:
        if s["kind"] == "form":
            continue
        h2 = s["h2"]
        if h2.lower() in ("overview", "why choose our assessment services"):
            continue
        first = ""
        for b in s["blocks"]:
            if b["t"] == "p":
                first = b["x"]
                break
            if b["t"] in ("ul", "ol") and b.get("items"):
                first = b["items"][0]["x"]
                break
        if not first:
            continue
        q = h2 if h2.endswith("?") else f"What should I know about {h2[0].lower() + h2[1:]}?"
        faqs.append({"q": q, "a": first})
        if len(faqs) == 6:
            break
    return faqs


def fetch(path: str) -> str:
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read().decode("utf-8", "replace")


def content_root(soup):
    main = soup.select_one("main#main-content") or soup.select_one("main") or soup.body
    root = main.select_one("div.lg\\:col-span-3") or main
    for sel in ("script", "style", "noscript", "svg", "iframe", "form", "nav", "footer"):
        for el in root.select(sel):
            el.decompose()
    for el in list(root.select("#contact-form, #booking-chat, .booking-chat")):
        el.decompose()
    return root


def hero_intro(soup) -> str:
    for sel in (".gradient-hero p", "section p.text-xl", "section p.text-blue-100", "h1 + p"):
        el = soup.select_one(sel)
        if el:
            t = inline(el)
            if len(t) > 40:
                return t
    return ""


def build(path: str, is_hub: bool, html: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    title_tag = soup.title.get_text(" ", strip=True) if soup.title else ""
    title = re.sub(r"\s*\|\s*Bansal Immigration.*$", "", title_tag).strip()
    title = fix_words(title) or path
    desc = ""
    md = soup.find("meta", attrs={"name": "description"})
    if md and md.get("content"):
        desc = fix_words(md["content"])
    h1_el = soup.find("h1")
    h1 = fix_words(h1_el.get_text(" ", strip=True) if h1_el else title)
    intro = hero_intro(soup) or desc
    root = content_root(soup)
    flat = blocks_from(root)
    # drop a leading paragraph that repeats the hero
    if flat and flat[0].get("t") == "p" and intro and flat[0]["x"][:80] == intro[:80]:
        flat = flat[1:]
    sections = split_sections(flat)
    if not sections:
        sections = [{
            "id": "overview",
            "name": "Overview",
            "kind": "prose",
            "h2": "Overview",
            "blocks": [{"t": "p", "x": intro or desc or h1}],
        }]
    faqs = faqs_from(soup, sections)
    sections.append({
        "id": "talk-to-us",
        "name": "Enquiry form and CTA",
        "kind": "form",
        "h2": f"Talk to us about {h1}",
        "blocks": [],
    })
    category = path.strip("/").split("/")[0]
    keywords = []
    mk = soup.find("meta", attrs={"name": "keywords"})
    if mk and mk.get("content"):
        keywords = [fix_words(k) for k in mk["content"].split(",") if k.strip()][:8]
    if not keywords:
        keywords = [w for w in re.split(r"[^A-Za-z0-9+]+", h1) if len(w) > 3][:6]
    return {
        "path": path,
        "category": category,
        "isHub": is_hub,
        "name": h1,
        "primaryKeyword": h1,
        "keywords": keywords,
        "pageType": "Category hub" if is_hub else "Service page",
        "seo": {
            "title": title if title.lower().endswith("bansal immigration") else f"{title} | Bansal Immigration",
            "description": desc,
            "h1": h1,
        },
        "hero": {
            "badge": "",
            "h1": h1,
            "intro": [intro] if intro else [desc or h1],
            "buttons": [
                {"label": "Book a Consultation", "href": "/book-an-appointment"},
                {"label": "Contact us", "href": "/contact"},
            ],
            "phone": True,
        },
        "sections": sections,
        "faqs": faqs,
        "cta": {},
        "form": True,
    }


def main():
    pages = {}
    for path, hub in SPECS:
        try:
            html = fetch(path)
        except Exception as e:
            print("FAIL", path, e)
            continue
        page = build(path, hub, html)
        pages[path] = page
        words = sum(len(json.dumps(s["blocks"]).split()) for s in page["sections"])
        print(f"OK {path} sections={len(page['sections'])} faqs={len(page['faqs'])} ~{words}w h1={page['hero']['h1'][:70]}")
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(pages, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print("wrote", OUT, "pages", len(pages))


if __name__ == "__main__":
    main()
