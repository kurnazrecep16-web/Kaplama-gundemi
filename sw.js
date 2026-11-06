/* Kaplama Gündemi – çevrimdışı açılış; haberler her açılışta ağdan */
const CACHE="kaplama-gundemi-v1";
const CORE=["./", "./index.html", "./manifest.webmanifest", "./privacy.html", "./icon-192.png", "./apple-touch-icon.png", "fonts/ibm-plex-sans-condensed-latin-500-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-600-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-ext-500-normal.woff2", "fonts/ibm-plex-sans-condensed-latin-ext-600-normal.woff2", "fonts/newsreader-latin-400-italic.woff2", "fonts/newsreader-latin-400-normal.woff2", "fonts/newsreader-latin-600-normal.woff2", "fonts/newsreader-latin-700-normal.woff2", "fonts/newsreader-latin-ext-400-italic.woff2", "fonts/newsreader-latin-ext-400-normal.woff2", "fonts/newsreader-latin-ext-600-normal.woff2", "fonts/newsreader-latin-ext-700-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("kaplama-gundemi-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=="GET"||u.origin!==location.origin)return;
 if(u.pathname.endsWith("news.json")){e.respondWith(fetch(e.request).catch(()=>caches.match("news.json",{ignoreSearch:true})));return;}
 if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return res})));
});
