#!/usr/bin/env python3
"""Print a page from content/pages.json in a readable form: python3 scripts/show-page.py /path [--full]"""
import json, sys, os
pages = json.load(open(os.path.join(os.path.dirname(__file__), '..', 'content', 'pages.json')))
path = sys.argv[1]
full = '--full' in sys.argv
p = pages[path]
print('PATH', path, '| hub' if p['isHub'] else '', '| title:', p['seo']['title'])
print('HERO:', p['hero']['h1']); print('  intro:', ' '.join(p['hero']['intro'])[:400])
def txt(b):
    t = b['t']
    if t in ('p', 'h3', 'quote', 'note'): return f"[{t}] {b['x']}"
    if t in ('ul', 'ol'): return f"[{t}] " + ' || '.join(i['x'] for i in b['items'])
    if t == 'table': return '[table] ' + ' | '.join(b['head']) + ' // ' + ' // '.join(' | '.join(r) for r in b['rows'])
    if t == 'cards': return '[cards] ' + ' || '.join(c['title'] + ' -> ' + c['href'] for c in b['cards'])
    if t == 'buttons': return '[buttons] ' + ', '.join(i['label'] + ' -> ' + i['href'] for i in b['items'])
    return f'[{t}]'
for s in p['sections']:
    words = sum(len(txt(b).split()) for b in s['blocks'])
    print(f"\n## id={s['id']} | {s['h2']} | kind={s['kind']} | ~{words} words")
    for b in s['blocks']:
        t = txt(b)
        print('   ', t if full else t[:220] + ('...' if len(t) > 220 else ''))
print('\nFAQS:', ' || '.join(f['q'] for f in p['faqs']))
print('CTA:', p['cta'])
