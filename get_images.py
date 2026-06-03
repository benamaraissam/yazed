import re, urllib.request

for page in ['http://yazed.tn/', 'http://yazed.tn/products/shampoing-gel-solide', 'http://yazed.tn/collections/all/products/filet-sac-a-savon', 'http://yazed.tn/products/porte-savon-magnetique-mural', 'http://yazed.tn/pages/yazed', 'http://yazed.tn/collections/accessoires']:
    html = urllib.request.urlopen(page).read().decode('utf-8')
    imgs = re.findall(r'https://cdn\.shopify\.com/s/files/1/0787/3560/6019/[^"\'> ]+', html)
    print(f'\n=== {page} ===')
    for img in sorted(set(imgs)):
        print(img)
