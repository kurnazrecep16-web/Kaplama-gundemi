const {chromium}=require('playwright');const path=require('path');
const F='file://'+path.resolve('fonts/newsreader-latin-700-normal.woff2');
const html=(s,pad)=>`<html><head><style>@font-face{font-family:N;src:url(${F})}body{margin:0}
.i{width:${s}px;height:${s}px;background:#f6f4ee;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${s*.03}px}
.k{font:700 ${s*pad*.46}px/1 N;color:#1b1a17;letter-spacing:-.04em}
.r{width:${s*pad*.5}px;height:${Math.max(2,s*.035)}px;background:#9b2c1f}
.t{width:${s*pad*.5}px;height:${Math.max(1,s*.012)}px;background:#1b1a17}</style></head>
<body><div class=i><div class=t></div><div class=k>KG</div><div class=r></div></div></body></html>`;
(async()=>{const b=await chromium.launch();
for(const [n,s,p] of [['icon-192.png',192,1],['icon-512.png',512,1],['icon-maskable-512.png',512,.72],['apple-touch-icon.png',180,1]]){
 const pg=await b.newPage({viewport:{width:s,height:s}});await pg.setContent(html(s,p));await pg.waitForTimeout(300);await pg.screenshot({path:'icons/'+n});await pg.close();}
await b.close();})();
