#!/usr/bin/env python3
"""For each hub in content/pages.json list child pages NOT linked from the hub's own sections/faqs."""
import json, re, os
base = os.path.join(os.path.dirname(__file__), '..', 'content')
p = json.load(open(os.path.join(base, 'pages.json'))); idx = json.load(open(os.path.join(base, 'index.json')))
def links(o, acc):
    if isinstance(o, str):
        for m in re.finditer(r'\]\((/[^)\s#]*)\)', o): acc.add(m.group(1))
    elif isinstance(o, list): [links(x, acc) for x in o]
    elif isinstance(o, dict):
        for k, v in o.items():
            if k == 'href' and isinstance(v, str): acc.add(v.split('#')[0])
            else: links(v, acc)
for h in [e for e in idx if e['isHub']]:
    kids = [e['path'] for e in idx if e['category'] == h['path'].strip('/') and not e['isHub']]
    acc = set(); links(p[h['path']]['sections'], acc); links(p[h['path']]['faqs'], acc)
    miss = [k for k in kids if k not in acc]
    if miss: print(h['path'], 'MISSING links to:', *miss, sep='\n  ')
print('coverage check done')
