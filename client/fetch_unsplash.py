import urllib.request
import re

req = urllib.request.Request('https://unsplash.com/photos/7O422yG_b80', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
match = re.search(r'property="og:image"\s+content="([^"]+)"', html)
if match:
    print(match.group(1))
else:
    print('not found')
