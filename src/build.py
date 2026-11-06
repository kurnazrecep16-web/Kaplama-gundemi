import os,json
D=os.path.dirname(os.path.abspath(__file__)); os.chdir(D)
R={'latin':'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
 'latin-ext':'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'}
ff=[]
for s in R:
  for w,st in [(400,'normal'),(400,'italic'),(600,'normal'),(700,'normal')]:
    ff.append(f'@font-face{{font-family:"Newsreader";font-style:{st};font-weight:{w};font-display:swap;src:url(fonts/newsreader-{s}-{w}-{st}.woff2) format("woff2");unicode-range:{R[s]}}}')
  for w in (500,600):
    ff.append(f'@font-face{{font-family:"Plex Cond";font-style:normal;font-weight:{w};font-display:swap;src:url(fonts/ibm-plex-sans-condensed-{s}-{w}-normal.woff2) format("woff2");unicode-range:{R[s]}}}')
os.makedirs('dist/fonts',exist_ok=True)
open('dist/index.html','w').write(open('src.html').read().replace('/*FONTS*/','\n'.join(ff)))
os.system('cp fonts/*.woff2 dist/fonts/ && cp news.json privacy.html manifest.webmanifest dist/ && cp icons/*.png dist/ 2>/dev/null')
V=open('VERSION').read().strip()
fonts=sorted('fonts/'+f for f in os.listdir('fonts'))
sw=open('sw.tpl.js').read().replace('__V__',V).replace('__CORE__',json.dumps(["./","./index.html","./manifest.webmanifest","./privacy.html","./icon-192.png","./apple-touch-icon.png"]+fonts))
open('dist/sw.js','w').write(sw)
print('ok',V)
