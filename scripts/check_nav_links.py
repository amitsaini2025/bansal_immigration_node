import json, os, re
nav = open("lib/nav.ts", encoding="utf-8").read()
hrefs = sorted(set(re.findall(r"href: '(/[^']*)'", nav)))
index = json.load(open("content/index.json", encoding="utf-8"))
pages = json.load(open("content/pages.json", encoding="utf-8"))
idx = {e["path"] for e in index}
missing = []
for h in hrefs:
    if h in idx or h in pages:
        continue
    if os.path.exists("app" + h + "/page.tsx"):
        continue
    missing.append(h)
print("nav", len(hrefs), "missing", len(missing))
for m in missing:
    print(" ", m)
only = [e["path"] for e in index if e["path"] not in pages]
print("index without page file", len(only))
for p in only:
    print(" ", p)
