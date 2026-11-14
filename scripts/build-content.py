#!/usr/bin/env python3
"""Convert the approved content-plan markdown files into content/pages.json.

Usage: python3 scripts/build-content.py <markdown-root>
The markdown root contains group folders (B-skilled, C-employer, ...). Each file is one page plan.
No text is rewritten: sections are parsed into blocks; [CONFIRM: ...] markers are removed or replaced
with neutral wording and listed in content/confirm-report.json for later checking.
"""
import json, os, re, sys, glob

ROOT = sys.argv[1]
GROUPS = ['B-skilled', 'C-employer', 'D1-family', 'D2-family', 'E1a-visitor-business', 'E1b-appeals',
          'E2a-bridging-citizenship-other', 'E2b-maritime-medical-transit', 'F-study']
OUT = os.path.join(os.path.dirname(__file__), '..', 'content')

confirm_log = []
cur_path = ['']

FEE_WORDS = re.compile(r'fee|charge|cost|price|time|processing|threshold|cap\b|salary|level|points|figure|amount|income|levy|source|current|rate|score|date|quota|allocation|dollar|\$', re.I)
NEUTRAL = 'Check the Department of Home Affairs website for the current figure.'

def clean_confirm(line):
    """Remove [CONFIRM...] markers. Return cleaned line or None to drop it."""
    if 'CONFIRM' not in line:
        return line
    # bare "CONFIRM: ..." without brackets
    if '[CONFIRM' not in line:
        confirm_log.append({'page': cur_path[0], 'marker': re.search(r'CONFIRM[^.|]*', line).group(0)[:240], 'context': line[:200]})
        line = re.sub(r'\s*CONFIRM[^.|]*\.?', '', line).rstrip()
        return line or None
    markers = re.findall(r'\[CONFIRM[^\]]*\]', line)
    for m in markers:
        confirm_log.append({'page': cur_path[0], 'marker': m[:240], 'context': re.sub(r'\s+', ' ', line)[:200]})
    # table row handling
    if line.lstrip().startswith('|'):
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        out = []
        for c in cells:
            if 'CONFIRM' in c:
                rest = re.sub(r'\[CONFIRM[^\]]*\]', '', c).strip()
                if rest:
                    c = rest
                else:
                    c = NEUTRAL if FEE_WORDS.search(' '.join(markers)) else 'Your adviser will confirm this'
            out.append(c)
        return '| ' + ' | '.join(out) + ' |'
    stripped = re.sub(r'\s*\[CONFIRM[^\]]*\]', '', line).rstrip()
    body = re.sub(r'^[\s>*\-0-9.]+', '', stripped).strip('* ').strip()
    if not body:
        return None
    # pure label left dangling
    if re.search(r':\**$', stripped.strip()):
        stripped = stripped + ' ' + NEUTRAL
    # dangling sentence ends (e.g. "The fee is")
    last = re.sub(r'[^\w ]', '', stripped).split()[-1:] or ['']
    if last[0].lower() in ('is', 'are', 'was', 'be', 'of', 'for', 'at', 'from', 'to', 'about', 'around', 'between', 'and', 'or', 'than'):
        return None
    return stripped

DROP = re.compile(r'^\*\*(Image direction|Schema|Note to|Duplicate warning|Not included|Image|Photo|Do not|Remove)[^*]*\*\*', re.I)
DROP2 = re.compile(r'^(Not included:|Say where|\(Image|Image direction)', re.I)

LEAD = ['see', 'use', 'read', 'go to', 'visit', 'check', 'try', 'start with', 'compare', 'learn more about', 'learn more on',
        'explore', 'find', 'open', 'our', 'the', 'and', 'or', 'also', 'then', 'for', 'in', 'on', 'with', 'to', 'at', 'of', 'a', 'an', 'your', 'about']

def link_phrase(before):
    b = before.rstrip()
    # bold directly before
    m = re.search(r'\*\*([^*]+)\*\*$', b)
    if m:
        return b[:m.start()], m.group(1).strip(), True
    # find clause start
    idx = 0
    for mm in re.finditer(r'(?:[.!?:;]\s+|\)\s+(?=[A-Z])|\*\*\s+|\]\([^)]*\)\s*|^)', b):
        idx = mm.end()
    cand = b[idx:]
    words = cand.split(' ')
    # strip leading function words repeatedly
    changed = True
    while words and changed:
        changed = False
        for lead in sorted(LEAD, key=lambda x: -len(x.split())):
            n = len(lead.split())
            if ' '.join(words[:n]).lower() == lead and len(words) > n:
                words = words[n:]
                changed = True
                break
    if len(words) > 7:
        words = words[-5:]
    text = ' '.join(words).strip()
    pre = b[:len(b) - len(text)] if text else b
    return pre, text, False

def convert_links(s):
    s = re.sub(r'\[([^\[\]]+?)\s*\((/[A-Za-z0-9\-_/#?=&.]*)\)\]', r'[\1](\2)', s)
    s = re.sub(r'^\[[ xX]\]\s*', '', s)
    # Already-bracketed links written as [text] (/url) or [text] (`/url`)
    s = re.sub(r'\[([^\[\]]+)\]\s*\((?:links? to\s*)?`?(/[A-Za-z0-9\-_/#?=&.]*|https?://[^\s)`]+)`?\)', r'[\1](\2)', s)
    # buttons style: **Label** (`/url`) or (/url)
    pat = re.compile(r'\s*\((?:links? to\s*)?(?:`)?((?:/[A-Za-z0-9\-_/#?=&.]*)|(?:https?://[^\s)`]+))(?:`)?\)')
    out = ''
    pos = 0
    while True:
        m = pat.search(s, pos)
        if not m:
            out += s[pos:]
            break
        before = out + s[pos:m.start()]
        url = m.group(1)
        pre, text, was_bold = link_phrase(before)
        if not text:
            out = before
        else:
            out = pre + '[' + text + '](' + url + ')'
        pos = m.end()
    return out

BAD = re.compile(r'current page|Replace with|before publishing|Placeholder|Add a line|to be confirmed|must be confirmed|to be verified|commentary|appears to be wrong|Add one only|Use the current name|checked before|^Keep the existing|^Keep the .{0,40}form|Do not publish this|Add one honest line|existing enquiry form', re.I)

def scrub(s):
    s = re.sub(r'\s*\(Source:\s*\.?\)', '', s)
    s = re.sub(r'\s*\[Source[^\]]*(commentary|to be verified|before publishing|checked before)[^\]]*\]', '', s, flags=re.I)
    s = re.sub(r'\s*\((?:Source|Official|Note)[^()]*?(commentary|to be verified|before publishing|to be confirmed|are to be confirmed)[^()]*\)', '', s, flags=re.I)
    s = re.sub(r',?\s*which (must|need to) be (confirmed|verified)', '', s)
    sents = re.split(r'(?<=[.!?])\s+', s)
    keep = [x for x in sents if not BAD.search(x)]
    return ' '.join(keep)

def inline(s):
    s = scrub(s)
    s = s.replace('Each card links to its own guide.', 'Select a visa name to open its guide.')
    s = s.replace('\\|', '\u0001')
    s = convert_links(s)
    s = s.replace('`', '')
    s = s.replace('\u0001', '|')
    s = re.sub(r'\[\[([^\[\]]+)\]\]\(', r'[\1](', s)
    s = s.replace('\u2014', ', ').replace('\u2013', ' to ')
    return s.strip()

def split_row(line):
    cells = re.split(r'(?<!\\)\|', line.strip().strip('|'))
    return [inline(c.strip()) for c in cells]

def parse_blocks(lines):
    blocks = []
    para = []
    i = 0
    def flush():
        nonlocal para
        if para:
            txt = inline(' '.join(para))
            para = []
            mb = re.match(r'^\*\*(Buttons?|Button text|CTA)[^*]*:\*\*\s*(.*)$', txt)
            if mb:
                links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', mb.group(2))
                if links:
                    blocks.append({'t': 'buttons', 'items': [{'label': a, 'href': b} for a, b in links]})
                return
            mn = re.match(r'^\*\*(Disclaimer|Note|Important|Short note|Employer note|Note under the cards|Line below|Process line)[^*]*:\*\*\s*(.*)$', txt)
            if mn:
                blocks.append({'t': 'note', 'label': 'Important' if mn.group(1).lower() == 'important' else ('Disclaimer' if mn.group(1) == 'Disclaimer' else 'Note'), 'x': mn.group(2)})
                return
            txt = re.sub(r'^\*\*(Intro|Paragraph|Intro paragraph|Text|Copy|Body|Lead|Short paragraph|Opening paragraph|Closing paragraph|Closing line):\*\*\s*', '', txt)
            if re.fullmatch(r'\*\*(Table|Cards?|List|Bullets|Steps|Links?)( below)?:?\*\*:?', txt.strip()):
                return
            blocks.append({'t': 'p', 'x': txt})
    while i < len(lines):
        ln = lines[i]
        s = ln.strip()
        if not s:
            flush(); i += 1; continue
        if s.startswith('### '):
            flush(); blocks.append({'t': 'h3', 'x': inline(s[4:])}); i += 1; continue
        if s.startswith('|'):
            flush()
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                r = lines[i].strip()
                if not re.match(r'^\|[\s:\-|]+\|$', r):
                    rows.append(split_row(r))
                i += 1
            if rows:
                head, body = rows[0], rows[1:]
                # A column of raw page paths becomes a link on the first cell, and the column is dropped.
                for ci in range(len(head) - 1, 0, -1):
                    vals = [r[ci] for r in body if ci < len(r) and r[ci].strip()]
                    if vals and all(re.fullmatch(r'/[A-Za-z0-9\-_/]+', v.strip()) for v in vals):
                        for r in body:
                            if ci < len(r) and r[ci].strip() and '](' not in r[0]:
                                r[0] = '[' + r[0].replace('**', '') + '](' + r[ci].strip() + ')'
                            if ci < len(r):
                                del r[ci]
                        del head[ci]
                blocks.append({'t': 'table', 'head': head, 'rows': body})
            continue
        if s.startswith('> '):
            flush()
            q = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                q.append(lines[i].strip().lstrip('>').strip()); i += 1
            blocks.append({'t': 'quote', 'x': inline(' '.join(q))})
            continue
        if re.match(r'^[-*] ', s) or re.match(r'^\d+\. ', s):
            flush()
            ordered = bool(re.match(r'^\d+\. ', s))
            items = []
            while i < len(lines):
                l2 = lines[i]
                s2 = l2.strip()
                if not s2:
                    # blank inside list: stop unless next is list item
                    if i + 1 < len(lines) and re.match(r'^(\s*[-*] |\s*\d+\. )', lines[i + 1]):
                        i += 1; continue
                    break
                indent = len(l2) - len(l2.lstrip())
                mb = re.match(r'^([-*]|\d+\.) (.*)$', s2)
                if mb and indent >= 2 and items:
                    items[-1].setdefault('c', []).append(inline(mb.group(2)))
                elif mb:
                    if bool(re.match(r'\d+\.', mb.group(1))) != ordered:
                        break
                    items.append({'x': inline(mb.group(2))})
                else:
                    if items and indent >= 2:
                        items[-1]['x'] += ' ' + inline(s2)
                    else:
                        break
                i += 1
            blocks.append({'t': 'ol' if ordered else 'ul', 'items': items})
            continue
        para.append(s)
        i += 1
    flush()
    out = []
    card_re = re.compile(r'^Card \d+(?: \(([^)]*)\))?:\s*(?:\*\*(.+?)\*\*)?\s*(.*)$')
    for b in blocks:
        if b['t'] == 'p':
            mc = card_re.match(b['x'])
            if mc:
                rest = mc.group(3)
                href = cta = ''
                ml = re.search(r'Link:\s*\[([^\]]+)\]\(([^)]+)\)', rest)
                if ml:
                    cta, href = ml.group(1), ml.group(2)
                    rest = rest[:ml.start()].strip()
                best = ''
                mb = re.search(r'Best for:\s*(.*)$', rest)
                if mb:
                    best = mb.group(1).strip(); rest = rest[:mb.start()].strip()
                item = {'title': mc.group(2) or '', 'best': best or (mc.group(1) or ''), 'desc': rest, 'href': href, 'cta': cta}
                if out and out[-1]['t'] == 'cards':
                    out[-1]['cards'].append(item)
                else:
                    out.append({'t': 'cards', 'cards': [item]})
                continue
        if b['t'] in ('p', 'h3', 'quote', 'note') and not b['x'].strip():
            continue
        if b['t'] in ('ul', 'ol'):
            b['items'] = [it for it in b['items'] if it['x'].strip()]
            if not b['items']:
                continue
        out.append(b)
    return out

def classify(name):
    n = name.lower()
    if 'hero' in n: return 'hero'
    if re.search(r'faq|frequently', n): return 'faq'
    if re.search(r'^final (call|cta)|^call to action|^final$', n): return 'cta'
    if re.search(r'enquiry form|^form\b|booking form|contact form', n): return 'form'
    if re.search(r'related|other options|what next|next step|pathway to|what to read next', n): return 'related'
    if re.search(r'key facts|at a glance|quick facts|deadline box|fast facts', n): return 'keyfacts'
    if re.search(r'mistake|refusal risk|pitfall|red flag|warning', n): return 'mistakes'
    if re.search(r'step|process|how it works|your first 48', n): return 'steps'
    if re.search(r'document|checklist', n): return 'docs'
    if re.search(r'cost|fee|price', n): return 'costs'
    return 'prose'

def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def parse_file(fp):
    txt = open(fp, encoding='utf-8').read()
    lines = txt.split('\n')
    title = ''
    meta = {}
    seo = {}
    sections = []
    cur = None
    mode = 'head'
    for raw in lines:
        s = raw.rstrip()
        if s.startswith('# ') and not title:
            title = re.sub(r':?\s*Full Content Plan\s*$', '', s[2:]).strip()
            continue
        if s.startswith('## SEO tags'):
            mode = 'seo'; continue
        if s.startswith('# Section order'):
            mode = 'skip'; cur = None; continue
        m = re.match(r'^# Section \d+:\s*(.+)$', s)
        if m:
            cur = {'name': m.group(1).strip(), 'lines': []}
            sections.append(cur); mode = 'section'; continue
        if s.startswith('# ') and mode != 'head':
            h = s[2:].strip().lower()
            if h.startswith('internal linking') or h.startswith('what to confirm'):
                mode = 'skip'; cur = None; continue
            if h.startswith('faq'):
                cur = {'name': s[2:].strip(), 'lines': []}; sections.append(cur); mode = 'section'; continue
        if mode == 'head' and s.startswith('|'):
            c = [x.strip() for x in s.strip('|').split('|')]
            if len(c) >= 2 and c[0] not in ('Field',) and not set(c[0]) <= set('-: '):
                meta[c[0]] = c[1].strip('`')
            continue
        if mode == 'seo' and s.startswith('|'):
            c = [x.strip() for x in re.split(r'(?<!\\)\|', s.strip('|'))]
            if len(c) >= 3 and c[0] not in ('Tag',) and not set(c[0]) <= set('-: '):
                seo[c[0].lower()] = c[2].replace('\\|', '|').strip('`')
            continue
        if mode == 'section' and cur is not None:
            cur['lines'].append(s)
    return title, meta, seo, sections

def parse_faq(blocks_lines):
    faqs = []
    cur = None
    for ln in blocks_lines:
        s = ln.strip()
        if not s:
            continue
        m = re.match(r'^(?:\d+\.\s*)?\*\*(?:\d+\.\s*)?(.+?\?)\*\*\s*(.*)$', s)
        if m:
            cur = {'q': inline(m.group(1)), 'a': inline(m.group(2))}
            faqs.append(cur); continue
        m2 = re.match(r'^###\s*(?:\d+\.\s*)?(.+)$', s)
        if m2:
            cur = {'q': inline(m2.group(1)), 'a': ''}; faqs.append(cur); continue
        if cur is not None and not s.startswith('**H2'):
            if s.startswith(('- ', '* ')):
                cur['a'] += ('\n' if cur['a'] else '') + '- ' + inline(s[2:])
            else:
                cur['a'] = (cur['a'] + ' ' + inline(s)).strip()
    return [f for f in faqs if f['a'] and f['q']]

BTN = re.compile(r'\*\*([^*]+)\*\*\s*\((?:links? to\s*)?(?:`)?(/[^)`\s]*|tel:[^)`\s]*)(?:`)?\)')

def parse_hero(lines):
    h = {'badge': '', 'h1': '', 'intro': [], 'buttons': [], 'phone': False}
    mode = None
    for s in lines:
        t = s.strip()
        if not t:
            continue
        if DROP.match(t) or DROP2.match(t):
            mode = None; continue
        m = re.match(r'^\*\*Badge:\*\*\s*(.*)$', t)
        if m: h['badge'] = inline(m.group(1)); mode = None; continue
        m = re.match(r'^\*\*H1:\*\*\s*(.*)$', t)
        if m: h['h1'] = inline(m.group(1)); mode = None; continue
        m = re.match(r'^\*\*(Intro[^*]*|Subheading[^*]*|Sub-heading[^*]*|Lead[^*]*|Promise[^*]*|Subhead[^*]*|Supporting[^*]*|Tagline[^*]*|Standfirst[^*]*|One-line[^*]*|Sub-line[^*]*|Subtitle[^*]*|Description[^*]*|Text[^*]*|Paragraph[^*]*):\*\*\s*(.*)$', t)
        if m:
            if m.group(2): h['intro'].append(inline(m.group(2)))
            mode = 'intro'; continue
        if re.match(r'^\*\*(Buttons?|CTAs?|Primary|Secondary|Phone|Button text)[^*]*:?\*\*', t, re.I) or t.startswith('- **') or BTN.search(t) or re.search(r'Call \+61', t):
            for lab, url in BTN.findall(t):
                h['buttons'].append({'label': lab.strip(), 'href': url})
            if re.search(r'\+61 3 9602 1330', t) and not any(b['href'].startswith('tel:') for b in h['buttons']):
                h['phone'] = True
            mode = 'btn'; continue
        if mode == 'intro' or mode is None:
            if t.startswith('**') and ':**' in t[:40]:
                continue
            h['intro'].append(inline(t))
    # dedupe
    seen = set(); btns = []
    for b in h['buttons']:
        if b['href'] in seen: continue
        seen.add(b['href']); btns.append(b)
    h['buttons'] = btns
    return h

def build_section(sec, order):
    name = sec['name']
    kind = classify(name)
    lines = []
    h2 = ''
    cta_title = cta_text = ''
    for raw in sec['lines']:
        c = clean_confirm(raw)
        if c is None:
            continue
        t = c.strip()
        if DROP.match(t) or DROP2.match(t):
            continue
        m = re.match(r'^\*\*H2:\*\*\s*(.*)$', t)
        if m:
            if not h2: h2 = inline(m.group(1))
            continue
        m = re.match(r'^\*\*(?:Final CTA|CTA|Closing CTA)(?: H2| heading| title)?:\*\*\s*(.*)$', t, re.I)
        if m: cta_title = inline(m.group(1)); continue
        m = re.match(r'^\*\*(?:CTA text|Text|Closing text):\*\*\s*(.*)$', t, re.I)
        if m and kind in ('cta', 'form', 'related'): cta_text = inline(m.group(1)); continue
        lines.append(c)
    return kind, h2, lines, cta_title, cta_text

WHY_PROCESS = {
    't': 'whyprocess',
    'whyTitle': 'Why choose Bansal Immigration',
    'stepsTitle': 'Our process',
    'why': [
        {'title': 'Registered migration agents', 'desc': 'Your matter is handled by registered migration agents. Each agent\u2019s MARN is on their profile.'},
        {'title': 'Advice for your situation', 'desc': 'We assess your occupation, points and circumstances, then recommend a realistic pathway.'},
        {'title': 'Costs in writing', 'desc': 'Our fees, Department charges and third-party costs are explained before you proceed.'},
        {'title': 'Support through the process', 'desc': 'We keep you updated on requests, deadlines and decisions as they happen.'},
    ],
    'steps': [
        {'title': 'Initial assessment', 'desc': 'We check your eligibility and recommend the best visa pathway for your situation.'},
        {'title': 'Documents', 'desc': 'We help you gather and prepare the documents your application needs.'},
        {'title': 'Application', 'desc': 'We prepare and lodge the agreed application and handle correspondence with the Department of Home Affairs.'},
        {'title': 'Visa decision', 'desc': 'We explain the decision and what to do next.'},
    ],
}

def apply_overrides(path, secs):
    """Page-specific edits agreed with the owner."""
    if path == '/migrate-to-australia':
        secs[:] = [x for x in secs if 'side by side' not in x['h2'].lower()]
        for x in secs:
            if x['h2'].startswith('How Bansal Immigration helps'):
                btns = [b for b in x['blocks'] if b['t'] == 'buttons']
                x['h2'] = 'Why people choose us for skilled migration'
                x['id'] = 'why-choose-us'
                x['blocks'] = [dict(WHY_PROCESS)] + btns

def slugify_id(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def apply_edit_files(pages):
    """Merge content/edits/*.json. Format per path:
    {"remove": [section ids], "replace": {id: {"h2":..., "blocks":[...]}}, "add": [{"after": id|"start"|"end", "id":..., "h2":..., "blocks":[...]}],
     "faqs_add": [{"q","a"}], "faqs_remove": [substring of question], "cta": {"title","text"}}"""
    import glob as g
    for fp in sorted(g.glob(os.path.join(OUT, 'edits', '*.json'))):
        try:
            edits = json.load(open(fp))
        except Exception as e:
            print('SKIP (invalid json):', fp, e)
            continue
        for path, ed in edits.items():
            pg = pages.get(path)
            if not pg:
                print('unknown path in', os.path.basename(fp), path); continue
            secs = pg['sections']
            for rid in ed.get('remove', []):
                before = len(secs)
                secs[:] = [x for x in secs if x['id'] != rid]
                if len(secs) == before: print('remove: no section', rid, 'on', path)
            for rid, new in ed.get('replace', {}).items():
                for x in secs:
                    if x['id'] == rid:
                        if 'h2' in new: x['h2'] = new['h2']
                        if 'blocks' in new: x['blocks'] = new['blocks']
                        break
                else: print('replace: no section', rid, 'on', path)
            for add in ed.get('add', []):
                sec = {'id': add.get('id') or slugify_id(add['h2']), 'name': add['h2'], 'kind': add.get('kind', 'prose'), 'h2': add['h2'], 'blocks': add['blocks']}
                where = add.get('after', 'end')
                if where == 'start': secs.insert(0, sec)
                elif where == 'end': secs.append(sec)
                else:
                    for i, x in enumerate(secs):
                        if x['id'] == where:
                            secs.insert(i + 1, sec); break
                    else:
                        secs.append(sec); print('add: after-id not found', where, 'on', path)
            for q in ed.get('faqs_remove', []):
                pg['faqs'] = [f for f in pg['faqs'] if q.lower() not in f['q'].lower()]
            pg['faqs'].extend(ed.get('faqs_add', []))
            if 'cta' in ed: pg['cta'] = ed['cta']
            if 'hero' in ed:
                for k, v in ed['hero'].items(): pg['hero'][k] = v
            if 'seo' in ed:
                for k, v in ed['seo'].items(): pg['seo'][k] = v

FALLBACKS = {'Your adviser will confirm this'}

def clean_str(t):
    t = re.sub(r'\s*\(?See Section \d+[a-z]?\)?\.?', '', t)
    t = re.sub(r'\.{2,}(?=\s|$)', '.', t)
    return t

def final_clean(pages):
    def walk(o):
        if isinstance(o, str):
            return clean_str(o)
        if isinstance(o, list):
            return [walk(x) for x in o]
        if isinstance(o, dict):
            if o.get('t') == 'table':
                rows = []
                for r in o['rows']:
                    rest = [c for c in r[1:] if c.strip()]
                    if rest and all(c.strip() in FALLBACKS for c in rest):
                        continue  # a row with no real information
                    rows.append([('Depends on your circumstances' if c.strip() in FALLBACKS else c) for c in r])
                o = dict(o); o['rows'] = rows
            return {k: walk(v) for k, v in o.items()}
        return o
    for k in list(pages):
        pages[k] = walk(pages[k])

def main():
    pages = {}
    index = []
    order = 0
    for g in GROUPS:
        for fp in sorted(glob.glob(os.path.join(ROOT, g, '*.md'))):
            title, meta, seo, sections = parse_file(fp)
            path = meta.get('URL', '').split(' ')[0].strip('`')
            if not path.startswith('/'):
                continue
            cur_path[0] = path
            hero = {'badge': '', 'h1': title, 'intro': [], 'buttons': [], 'phone': False}
            out_sections = []
            faqs = []
            cta = {}
            form = False
            for sec in sections:
                kind, h2, lines, ct, ctext = build_section(sec, order)
                if kind == 'hero':
                    hero = parse_hero(lines)
                    if not hero['h1']: hero['h1'] = title
                    continue
                if kind == 'faq':
                    faqs = parse_faq(lines); continue
                if kind == 'cta':
                    if h2: cta['title'] = h2
                    paras = [b['x'] for b in parse_blocks(lines) if b['t'] == 'p']
                    if ctext: cta['text'] = ctext
                    elif paras: cta['text'] = paras[0]
                    continue
                blocks = parse_blocks(lines)
                if ct: cta['title'] = ct
                if ctext: cta['text'] = ctext
                if kind == 'form':
                    form = True
                    # keep heading and intro paragraphs only
                    blocks = [b for b in blocks if b['t'] in ('p',)][:2]
                if not blocks and not h2:
                    continue
                out_sections.append({'id': slugify(h2 or sec['name']) or 'section', 'name': sec['name'], 'kind': kind, 'h2': h2 or sec['name'], 'blocks': blocks})
            apply_overrides(path, out_sections)
            # unique ids
            used = {}
            for s in out_sections:
                n = used.get(s['id'], 0); used[s['id']] = n + 1
                if n: s['id'] += f'-{n+1}'
            segs = path.strip('/').split('/')
            page = {
                'path': path,
                'category': segs[0],
                'isHub': len(segs) == 1,
                'name': title,
                'primaryKeyword': meta.get('Primary keyword', ''),
                'keywords': [k.strip() for k in meta.get('Secondary keywords', '').split(',') if k.strip()],
                'pageType': meta.get('Page type', ''),
                'seo': {
                    'title': re.sub(r'\s*\|\s*Bansal$', ' | Bansal Immigration', re.sub(r'\s*\((?:under|over)[^)]*\)', '', next((v for k, v in seo.items() if k.startswith('title')), ''))),
                    'description': re.sub(r'\s*\((?:under|over)[^)]*characters\)', '', next((v for k, v in seo.items() if k.startswith('meta')), '')),
                    'h1': next((v for k, v in seo.items() if k.startswith('h1')), ''),
                },
                'hero': hero,
                'sections': out_sections,
                'faqs': faqs,
                'cta': cta,
                'form': form,
            }
            pages[path] = page
            index.append({'path': path, 'name': title, 'category': segs[0], 'isHub': len(segs) == 1, 'order': order})
            order += 1
    os.makedirs(OUT, exist_ok=True)
    apply_edit_files(pages)
    final_clean(pages)
    tmp = os.path.join(OUT, 'pages.json.tmp')
    json.dump(pages, open(tmp, 'w'), ensure_ascii=False, indent=1)
    os.replace(tmp, os.path.join(OUT, 'pages.json'))
    json.dump(index, open(os.path.join(OUT, 'index.json'), 'w'), ensure_ascii=False, indent=1)
    json.dump(confirm_log, open(os.path.join(OUT, 'confirm-report.json'), 'w'), ensure_ascii=False, indent=1)
    print(len(pages), 'pages;', len(confirm_log), 'confirm markers')

main()
