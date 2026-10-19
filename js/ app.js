/*
═══════════════════════════════════════════════════════════════════
  ARTSY KNOTS v4 — SURGICAL FIXES
═══════════════════════════════════════════════════════════════════

  v4 Surgical Fixes:
    [FIX-01] Seed data removed
    [FIX-02] Sort popup z-index
    [FIX-03] Firebase storage zero-compromise
    [FIX-04] Body scroll lock on overlays
    [FIX-05] Intro timing + 5 transition styles
    [FIX-06] Layout skeleton previews
    [FIX-07] Dynamic portrait on owner button + console
    [FIX-08] YouTube-style video cards + TikTok/Instagram
    [FIX-09] Order / Cart / Call action row
    [FIX-10] "Add to bag" → "Add to Cart" everywhere
    [FIX-11] Background mode selector (6 styles + stars canvas)
    [FIX-12] Smoothness polish
    [FIX-13] SMS field in Socials

  Security patches applied:
    [S-01] M-Pesa secrets removed from client
    [S-02] Password hashed (SHA-256)
    [S-03] innerHTML sanitized (esc function)
    [S-04] Console session timeout (30 min)
    [S-05] Cart persisted to sessionStorage
    [S-06] Firestore rules template included

  Performance patches applied:
    [P-01] Images to Firebase Storage (not base64 localStorage)
    [P-02] Store.save() debounced (700ms)
    [P-03] Neural canvas optimized (RAF control, color cache)
    [P-04] will-change only on hover
    [P-05] Lazy loading on gallery images
    [P-06] Firebase SDKs deferred
    [P-07] Low-perf device detection

  UX/UI improvements applied:
    [UI-01] Modern SVG icons throughout
    [UI-02] Z-index layer fix (sort popup)
    [UI-03] Removed button redundancy
    [UI-04] All buttons 100% functional
    [UI-05] Confirmation popups on actions
    [UI-06] Admin-only settings lock
    [UI-07] User interaction restrictions

  Animation features applied:
    [ANIM-01] Full-screen intro animation
    [ANIM-02] Logo rotation (slow → fast)
    [ANIM-03] Welcome text fade-in
    [ANIM-04] Auto-play on load (5s total)

  Accessibility & PWA applied:
    [A-01] Modal focus traps + Escape key
    [A-02] PWA manifest for home screen install
    [A-03] Firestore rules template

═══════════════════════════════════════════════════════════════════
*/

/* ── [S-03] SANITIZATION ── */
function esc(str){
  return String(str||'')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#x27;');
}

/* ── [P-02] DEBOUNCE SAVE ── */
let _saveDebounce;
function dSave(){clearTimeout(_saveDebounce);_saveDebounce=setTimeout(()=>Store.save(),700);}

const LS='artsyKnots.v2';

/* ── FIREBASE CONFIG (auto-connects every device) ── */
const FIREBASE_CONFIG={
  apiKey:"AIzaSyD7-sFyoMdzpIKgc9d-5Yw25Ia5UjqN_Es",
  authDomain:"artsy-knots.firebaseapp.com",
  projectId:"artsy-knots",
  storageBucket:"artsy-knots.firebasestorage.app",
  messagingSenderId:"462420752723",
  appId:"1:462420752723:web:4398eaafa9e2771d409a6",
  measurementId:"G-8Z8RLHGB9X"
};
const DEFAULTS={
  brand:{name:'Artsy Knots',tag:'handmade studio',logoUrl:'',logoLetter:'A',footMark:'Artsy Knots'},
  theme:{palette:'lagoon',dark:false,accent:'#1fb6d6',accent2:'#0e7ea3',bg1:'#dff3fa',bg2:'#bfe9f5',bg3:'#eafaff'},
  layout:{view:'glass',density:'standard',shape:'default',haptics:true,bgMode:'caustic',introTransition:'fade'},
  copy:{heroEyebrow:'Handmade in Nairobi · one of a kind',heroTitle:'Texture you can *feel*, art you can hold.',heroLede:'Hand-knotted mats, tufted rugs, canvas works and resin pieces — each made slowly by Bernice Wairimu.',aboutHeading:'Made by hand, on purpose.',aboutBy:'Bernice Wairimu · Founder, Artsy Knots',aboutBody:'Artsy Knots began with a simple stubbornness: the belief that something made slowly, by a real pair of hands, carries a feeling no machine can fake.\nTo me, art is a conversation — between colour and texture, between the maker and whoever the piece ends up living with. Every knot is a small argument for patience.\nCustom commissions are always welcome.',aboutQuote:'When you love what you make, time disappears — and that’s how I end up working at 2am, unable to stop trying one more design.',aboutPortrait:'',beliefs:'Creativity has no limits,Handmade is soulful,Every piece tells a story,Passion over perfection,Art heals',contactHeading:'Let’s make something',contactBody:'Commissions are open. Tell me the room, the colours, the feeling — and I’ll bring it into the world.'},
  contact:{whatsapp:'254706189808',phone:'+254 706 189 808',sms:'',email:'',instagram:'bernicewairimu',tiktok:'bernicewairimu706',facebook:'',twitter:'',pinterest:'',youtube:'',blog:'',linkedin:'',currency:'KES'},
  /* [S-01] Sensitive keys (Consumer Key, Secret, Passkey) belong in Cloud Function env vars — not stored here */
  payments:{mpesa:{enabled:false,shortcode:'',endpoint:'',account:'ArtsyKnots',callback:''}},
  analytics:{gaId:''},
  config:{published:false,cloud:false,adminEmail:'',firebase:null,passHash:''},
  orders:[],
  products:[]
};

const PALETTES={
  lagoon:{accent:'#1fb6d6',accent2:'#0e7ea3',bg1:'#dff3fa',bg2:'#bfe9f5',bg3:'#eafaff',label:'Lagoon',dark:false},
  reef:{accent:'#11b3a3',accent2:'#0a7d72',bg1:'#d6f5ee',bg2:'#b3ebdf',bg3:'#e8fbf6',label:'Reef',dark:false},
  shell:{accent:'#e88ab6',accent2:'#bd5a8b',bg1:'#fbe6f1',bg2:'#f6cce0',bg3:'#fff0f7',label:'Shell',dark:false},
  meadow:{accent:'#3fb56b',accent2:'#1f7d43',bg1:'#eafaf0',bg2:'#d2f1dd',bg3:'#f3fcf6',label:'White/Green',dark:false},
  savanna:{accent:'#d99a3c',accent2:'#a96d1c',bg1:'#fbf3e3',bg2:'#f4e2c2',bg3:'#fff9ef',label:'Savanna',dark:false},
  obsidian:{accent:'#a855f7',accent2:'#6d28d9',bg1:'#0c0617',bg2:'#160a2b',bg3:'#07040f',label:'Black/Purple',dark:true},
  void:{accent:'#3b82f6',accent2:'#1e40af',bg1:'#050a1a',bg2:'#0a1430',bg3:'#03060f',label:'Black/Blue',dark:true},
  nebula:{accent:'#8b5cf6',accent2:'#2563eb',bg1:'#0b0820',bg2:'#141038',bg3:'#070514',label:'Nebula',dark:true},
  matrix:{accent:'#22e07a',accent2:'#0f9d52',bg1:'#04130c',bg2:'#082016',bg3:'#020a06',label:'Black/Green',dark:true},
  aurora:{accent:'#2dd4bf',accent2:'#3b82f6',bg1:'#06121a',bg2:'#0a1f2e',bg3:'#040b12',label:'Aurora',dark:true}
};

/* ── STORE ── */
const Store={
  state:null,fb:null,
  load(){let s=null;try{s=JSON.parse(localStorage.getItem(LS));}catch(e){}this.state=s?this._mg(DEFAULTS,s):structuredClone(DEFAULTS);return this.state;},
  _mg(d,s){const o=structuredClone(d);for(const k in s){if(s[k]&&typeof s[k]==='object'&&!Array.isArray(s[k]))o[k]=this._mg(d[k]||{},s[k]);else o[k]=s[k];}return o;},
  save(){
    try{localStorage.setItem(LS,JSON.stringify(this.state));}
    catch(e){
      /* Quota exceeded — strip base64 blobs from localStorage copy, keep URLs */
      try{
        const lite=JSON.parse(JSON.stringify(this.state));
        lite.products=lite.products.map(function(p){return Object.assign({},p,{images:(p.images||[]).filter(function(i){return !i.startsWith('data:');})});});
        localStorage.setItem(LS,JSON.stringify(lite));
      }catch(e2){UI.toast('Storage full — enable cloud sync so images are hosted in Firebase.');}
    }
    if(this.state.config.cloud&&this.fb)this.cloudSave();
  },
  exportData(){const b=new Blob([JSON.stringify(this.state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='artsy-knots-backup.json';a.click();UI.toast('Backup downloaded');UI.hap();},
  importData(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{this.state=this._mg(DEFAULTS,JSON.parse(r.result));this.save();Render.all();Console.populate();UI.toast('Backup restored');}catch(e){UI.toast('Could not read that file.');}};r.readAsText(f);},
  async cloudSave(){
    /* Tier 1: full save (works when images are Firebase Storage URLs, not base64) */
    try{
      await this.fb.firestore().collection('sites').doc('artsy-knots').set({data:this.state,updated:Date.now()});
      return;
    }catch(e){}
    /* Tier 2: doc too large -- compress base64 images to small thumbnails (300px/45%) and retry.
       These thumbnails (~5-14 KB each) fit in Firestore so every device sees the image. */
    try{
      const lite=JSON.parse(JSON.stringify(this.state));
      const thumbed=await Promise.all(lite.products.map(async function(p){
        if(!p.images||!p.images.length)return p;
        const imgs=await Promise.all(p.images.map(function(img){
          return img.startsWith('data:')?compressImage(img,300,0.45):Promise.resolve(img);
        }));
        return Object.assign({},p,{images:imgs});
      }));
      lite.products=thumbed;
      await this.fb.firestore().collection('sites').doc('artsy-knots').set({data:lite,updated:Date.now()});
      return;
    }catch(e2){}
    /* Tier 3: last resort -- save metadata, strip all base64 */
    try{
      const meta=JSON.parse(JSON.stringify(this.state));
      meta.products=meta.products.map(function(p){return Object.assign({},p,{images:(p.images||[]).filter(function(i){return !i.startsWith('data:');})});});
      await this.fb.firestore().collection('sites').doc('artsy-knots').set({data:meta,updated:Date.now()});
    }catch(e3){console.warn('cloudSave',e3);}
  },
  async cloudLoad(){
    if(!this.fb)return;
    try{
      const doc=await this.fb.firestore().collection('sites').doc('artsy-knots').get();
      if(doc.exists){const d=doc.data().data;if(d){this.state=this._mg(DEFAULTS,d);try{localStorage.setItem(LS,JSON.stringify(this.state));}catch(e){}Render.all();Console.statusBanners&&Console.statusBanners();}}
    }catch(e){console.warn('cloudLoad',e);}
  }
};

/* ── RENDER ── */
const Render={
  cur(){return Store.state.contact.currency||'KES';},
  money(n){return Number(n).toLocaleString()+' '+this.cur();},
  all(){this.theme();this.brand();this.copy();Gallery.apply();this.contact();const yr=document.getElementById('year');if(yr)yr.textContent=new Date().getFullYear();},
  theme(){const t=Store.state.theme,l=Store.state.layout,r=document.documentElement.style;
    r.setProperty('--accent',t.accent);r.setProperty('--accent-2',t.accent2);r.setProperty('--bg-1',t.bg1);r.setProperty('--bg-2',t.bg2);r.setProperty('--bg-3',t.bg3);
    document.body.dataset.theme=t.dark?'dark':'light';document.body.dataset.density=l.density;document.body.dataset.shape=l.shape;document.body.dataset.view=l.view;document.body.dataset.bg=l.bgMode||'caustic';
    document.getElementById('themeColor').setAttribute('content',t.bg3);Views.syncFab();},
  brand(){const b=Store.state.brand;
    document.getElementById('brandName').innerHTML=esc(b.name)+'<small id="brandTag">'+esc(b.tag)+'</small>';
    document.getElementById('footMark').textContent=b.footMark||b.name;
    const lw=document.getElementById('logoWrap');
    lw.innerHTML=b.logoUrl?'<img src="'+esc(b.logoUrl)+'" alt="'+esc(b.name)+'">'
      :'<span style="font-family:var(--serif);font-weight:600;color:#fff;font-size:1.2rem">'+esc(b.logoLetter||'A')+'</span>';
    document.title=esc(b.name)+' — Handmade Art by Bernice Wairimu';
    /* [FIX-07] Dynamic portrait on owner button */
    const ownerKey=document.getElementById('ownerKey');
    const portrait=Store.state.copy.aboutPortrait;
    const ownerSvg='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c2.2 0 4-2 4-4.5S14.2 3 12 3 8 5 8 7.5 9.8 12 12 12z"/><path d="M5 21c0-3.5 3.1-6 7-6s7 2.5 7 6"/><path d="M18 3.2l.6 1.3 1.3.6-1.3.6-.6 1.3-.6-1.3L16.1 5.1l1.3-.6z"/></svg>';
    if(ownerKey)ownerKey.innerHTML=portrait?'<img src="'+esc(portrait)+'" alt="Studio owner" style="width:100%;height:100%;object-fit:cover;border-radius:50%">':ownerSvg;},
  copy(){const c=Store.state.copy;
    document.getElementById('heroEyebrow').textContent=c.heroEyebrow;
    /* [S-03] Escape before *italic* transform so injected HTML can't run */
    document.getElementById('heroTitle').innerHTML=esc(c.heroTitle).replace(/\*(.+?)\*/g,'<em>$1</em>');
    document.getElementById('heroLede').textContent=c.heroLede;
    document.getElementById('aboutHeading').textContent=c.aboutHeading;
    document.getElementById('aboutBy').textContent=c.aboutBy;
    document.getElementById('aboutBody').innerHTML=c.aboutBody.split('\n').filter(Boolean).map(function(p){return '<p>'+esc(p)+'</p>';}).join('');
    document.getElementById('aboutQuote').textContent='“'+c.aboutQuote.replace(/^[""]/,'')+'”';
    const port=document.getElementById('aboutPortrait');
    port.innerHTML=c.aboutPortrait?'<img src="'+esc(c.aboutPortrait)+'" alt="Bernice Wairimu">'
      :'<div style="width:100%;height:100%;display:grid;place-items:center;font-size:3rem;opacity:.5;color:#fff">🧵</div>';
    document.getElementById('beliefs').innerHTML=c.beliefs.split(',').map(function(b){return '<span class="belief">'+esc(b.trim())+'</span>';}).join('');
    document.getElementById('contactHeading').textContent=c.contactHeading;
    document.getElementById('contactBody').textContent=c.contactBody;},
  glyph(cat){return {matwork:'🧶',canvas:'🖼️',resin:'💎',commission:'✨',video:'🎬'}[cat]||'🎨';},
  contact(){const c=Store.state.contact;const rows=[];
    if(c.phone)rows.push('<a class="contact-row" href="tel:'+esc(c.phone.replace(/\s/g,''))+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 10.26a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg> '+esc(c.phone)+'</a>');
    if(c.email)rows.push('<a class="contact-row" href="mailto:'+esc(c.email)+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> '+esc(c.email)+'</a>');
    if(c.whatsapp)rows.push('<a class="contact-row" href="https://wa.me/'+esc(c.whatsapp)+'?text='+encodeURIComponent('Hi, I found you on Artsy Knots!')+'" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> WhatsApp the studio</a>');
    document.getElementById('contactRows').innerHTML=rows.join('');
    function lnk(v,base){return v?(v.startsWith('http')?v:base+v.replace('@','')):''}
    const S=[];
    const ig=lnk(c.instagram,'https://instagram.com/');if(ig)S.push(['Instagram',ig]);
    const tt=lnk(c.tiktok,'https://tiktok.com/@');if(tt)S.push(['TikTok',tt]);
    const fb=lnk(c.facebook,'https://facebook.com/');if(fb)S.push(['Facebook',fb]);
    const tw=lnk(c.twitter,'https://x.com/');if(tw)S.push(['X',tw]);
    const pin=lnk(c.pinterest,'https://pinterest.com/');if(pin)S.push(['Pinterest',pin]);
    const yt=lnk(c.youtube,'https://youtube.com/@');if(yt)S.push(['YouTube',yt]);
    const li=lnk(c.linkedin,'https://linkedin.com/in/');if(li)S.push(['LinkedIn',li]);
    if(c.blog)S.push(['Read the blog',c.blog.startsWith('http')?c.blog:'https://'+c.blog]);
    document.getElementById('socials').innerHTML=S.map(function(x){return '<a class="social" href="'+esc(x[1])+'" target="_blank" rel="noopener">'+esc(x[0])+'</a>';}).join('');}
};

/* ── GALLERY ── */
const SORTS=[['new','Newest'],['old','Oldest'],['price-asc','Price: low → high'],['price-desc','Price: high → low'],['likes','Most liked'],['views','Most viewed'],['az','A → Z']];
const Gallery={
  cat:'all',sort:'new',q:'',
  toggleSort(e){e.stopPropagation();const pop=document.getElementById('sortPop');
    if(!pop.innerHTML)pop.innerHTML=SORTS.map(function(s){return '<button class="'+(s[0]==='new'?'sel':'')+'" data-s="'+s[0]+'" onclick="Gallery.setSort(\''+s[0]+'\')">'+esc(s[1])+'</button>';}).join('');
    pop.classList.toggle('show');},
  setSort(k){this.sort=k;const _sf=SORTS.find(function(s){return s[0]===k;});if(_sf&&document.getElementById('sortLabel'))document.getElementById('sortLabel').textContent=_sf[1];
    document.querySelectorAll('#sortPop button').forEach(function(b){b.classList.toggle('sel',b.dataset.s===k);});
    const sp=document.getElementById('sortPop');if(sp)sp.classList.remove('show');this.apply();UI.hap();},
  setCat(c,btn){this.cat=c;document.querySelectorAll('#filters .chip').forEach(function(x){x.classList.remove('active');});btn.classList.add('active');this.apply();UI.hap();},
  buildFilters(){const items=Store.state.products;const counts={};items.forEach(function(p){counts[p.category]=(counts[p.category]||0)+1;});
    const hasVid=items.some(function(p){return p.type==='video';});
    const labels={all:'All works',matwork:'Mats',canvas:'Paintings',resin:'Resin',commission:'Commissions'};
    const cats=['all'].concat(Object.keys(counts));
    let h=cats.map(function(c){return '<button class="chip '+(c===Gallery.cat?'active':'')+'" onclick="Gallery.setCat(\''+c+'\',this)">'+(labels[c]||esc(c))+(c!=='all'?'<span class="ct">'+counts[c]+'</span>':'')+'</button>';}).join('');
    if(hasVid)h+='<button class="chip '+(this.cat==='video'?'active':'')+'" onclick="Gallery.setCat(\'video\',this)">Videos</button>';
    h+='<button class="chip '+(this.cat==='trending'?'active':'')+'" onclick="Gallery.setCat(\'trending\',this)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> Most liked</button>';
    const _fEl=document.getElementById('filters');if(_fEl)_fEl.innerHTML=h;},
  apply(){this.q=(document.getElementById('searchInput')?document.getElementById('searchInput').value:'').trim().toLowerCase();
    this.buildFilters();
    let list=Store.state.products.slice();
    if(this.cat==='video')list=list.filter(function(p){return p.type==='video';});
    else if(this.cat==='trending')list=list.sort(function(a,b){return (b.likes||0)-(a.likes||0);}).slice(0,8);
    else if(this.cat!=='all')list=list.filter(function(p){return p.category===Gallery.cat;});
    if(this.q){const q=this.q;list=list.filter(function(p){return (p.title+' '+(p.desc||'')+' '+(p.dims||'')+' '+(p.category||'')).toLowerCase().includes(q);});}
    if(this.cat!=='trending')list=this._sort(list);
    this.draw(list);},
  _sort(list){const s=this.sort;return list.sort(function(a,b){switch(s){case 'old':return (a.createdAt||0)-(b.createdAt||0);case 'price-asc':return a.price-b.price;case 'price-desc':return b.price-a.price;case 'likes':return (b.likes||0)-(a.likes||0);case 'views':return (b.views||0)-(a.views||0);case 'az':return a.title.localeCompare(b.title);default:return (b.createdAt||0)-(a.createdAt||0);}});},
  draw(items){const grid=document.getElementById('galleryGrid');if(!grid)return;
    if(!items.length){grid.style.opacity='1';grid.innerHTML='<div class="empty">No works match that yet — try another search, or tap the studio key and add a piece.</div>';return;}
    const liked=JSON.parse(localStorage.getItem('ak.liked')||'[]');
    const svgHeart='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    const svgCall='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.09 3h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.1 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    const html=items.map(function(p,i){
      const isVid=p.type==='video';
      const thumb=isVid?(p.vthumb||(p.video?Media.thumb(p):'')):(p.images&&p.images[0]?p.images[0]:'');
      const media=thumb?'<img src="'+esc(thumb)+'" alt="'+esc(p.title)+'" loading="lazy" decoding="async" onerror="this.style.display=\'none\'">'
        :'<span class="glyph">'+Render.glyph(isVid?'video':p.category)+'</span>';
      const play=isVid?'<div class="play-badge"><div class="play-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>'+(p.duration?'<span class="dur-badge">'+esc(p.duration)+'</span>':''):'';
      const isLiked=liked.indexOf(p.id)>=0;
      const fd=(5+(i%5)*0.9).toFixed(1)+'s';
      /* [FIX-08] YouTube-style body for videos */
      const body=isVid
        ?'<div class="body"><div class="vid-meta-row"><span class="vid-provider">'+esc(Media.providerLabel(p.video||''))+'</span>'+(p.vdate?'<span class="vid-date">'+new Date(p.vdate).toLocaleDateString()+'</span>':'')+'</div>'
          +'<h3 class="vid-title">'+esc(p.title)+'</h3><p class="vid-desc">'+esc(p.desc||'')+'</p>'
          +'<div class="vid-stats"><span>♥ '+(p.likes||0)+'</span><span>👁 '+(p.views||0)+'</span>'+(p.duration?'<span>⏱ '+esc(p.duration)+'</span>':'')+'</div></div>'
        :'<div class="body"><h3>'+esc(p.title)+'</h3><p class="desc">'+esc(p.desc||'')+'</p>'
          +(p.dims?'<div class="dims"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18M7 3v18"/></svg>'+esc(p.dims)+'</div>':'')
          +'<div class="meta"><span class="price">'+Render.money(p.price)+'</span><span class="tag">'+esc(p.category)+'</span></div>'
          +'</div>';
      /* [FIX-09] Action row */
      const actions='<div class="actions" style="padding:0 22px 18px">'
        +'<button class="act act-like act-mini'+(isLiked?' liked':'')+'" id="lb-'+esc(p.id)+'" data-lid="'+esc(p.id)+'" onclick="event.stopPropagation();Gallery.like(this.dataset.lid)" aria-label="Like">'+svgHeart+'</button>'
        +(isVid
          ?'<button class="act act-cart" style="flex:1" data-did="'+esc(p.id)+'" onclick="event.stopPropagation();Detail.open(this.dataset.did)">Watch</button>'
          :'<button class="act act-order" style="flex:1" data-oid="'+esc(p.id)+'" onclick="event.stopPropagation();Order.pick(this.dataset.oid)">Order</button>'
           +'<button class="act act-cart" style="flex:1" data-cid="'+esc(p.id)+'" onclick="event.stopPropagation();Cart.add(this.dataset.cid)">Add to Cart</button>')
        +'<button class="act act-like act-mini" title="Call studio" onclick="event.stopPropagation();Order.call()">'+svgCall+'</button>'
        +'</div>';
      return '<article class="card" data-id="'+esc(p.id)+'" style="--fd:'+fd+'" onclick="Detail.open(\''+esc(p.id)+'\')">'
        +'<div class="ph">'+media+play+'<span class="like-pill">'+svgHeart+' <span id="lk-'+esc(p.id)+'">'+(p.likes||0)+'</span></span></div>'
        +body+actions+'</article>';
    }).join('');
    /* [FIX-12] Fade gallery on re-render (skip if a modal is open) */
    const modalOpen=!!document.querySelector('.overlay.show');
    if(modalOpen){grid.innerHTML=html;grid.style.opacity='1';Physics.bindTilt();Reveal.scan();return;}
    grid.style.opacity='0';
    requestAnimationFrame(function(){grid.innerHTML=html;grid.style.transition='opacity .25s ease';grid.style.opacity='1';Physics.bindTilt();Reveal.scan();});},
  like(id){let liked=[];try{liked=JSON.parse(localStorage.getItem('ak.liked')||'[]');}catch(e){}const p=Store.state.products.find(function(x){return x.id===id;});if(!p)return;
    const btn=document.getElementById('lb-'+id);
    if(liked.indexOf(id)>=0){p.likes=Math.max(0,(p.likes||0)-1);liked.splice(liked.indexOf(id),1);if(btn)btn.classList.remove('liked');}
    else{p.likes=(p.likes||0)+1;liked.push(id);if(btn){btn.classList.add('liked','pop');setTimeout(function(){btn.classList.remove('pop');},460);}Physics.rippleAt(btn);UI.hap([8,30,8]);GA.event('like',{id:id});
    /* [UI-05] Confirmation toast */
    UI.toast('♥ Liked '+esc(p.title));}
    try{localStorage.setItem('ak.liked',JSON.stringify(liked));}catch(e){}const lk=document.getElementById('lk-'+id);if(lk)lk.textContent=p.likes;Store.save();Console.stats();}
};

/* ── MEDIA helpers ── */
const Media={
  parse(url){if(!url)return{provider:'none'};let m=url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);if(m)return{provider:'youtube',id:m[1]};m=url.match(/vimeo\.com\/(\d+)/);if(m)return{provider:'vimeo',id:m[1]};m=url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/);if(m)return{provider:'tiktok',id:m[1]};m=url.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/);if(m)return{provider:'instagram',id:m[1]};if(/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url))return{provider:'file',url:url};return{provider:'link',url:url};},
  thumb(p){if(p.vthumb)return p.vthumb;const v=this.parse(p.video);if(v.provider==='youtube')return 'https://img.youtube.com/vi/'+v.id+'/hqdefault.jpg';return p.images&&p.images[0]||'';},
  embed(p){const v=this.parse(p.video);if(v.provider==='youtube')return '<iframe src="https://www.youtube.com/embed/'+esc(v.id)+'?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen></iframe>';if(v.provider==='vimeo')return '<iframe src="https://player.vimeo.com/video/'+esc(v.id)+'?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>';if(v.provider==='tiktok')return '<iframe src="https://www.tiktok.com/embed/'+esc(v.id)+'" allow="autoplay;encrypted-media" allowfullscreen></iframe>';if(v.provider==='instagram')return '<iframe src="https://www.instagram.com/p/'+esc(v.id)+'/embed/" allow="autoplay;encrypted-media" allowfullscreen></iframe>';if(v.provider==='file')return '<video src="'+esc(v.url)+'" controls autoplay playsinline></video>';return '<a class="btn btn-primary" href="'+esc(p.video)+'" target="_blank" rel="noopener" style="margin:auto">Open video ↗</a>';},
  providerLabel(url){const v=this.parse(url);return {youtube:'YouTube',vimeo:'Vimeo',tiktok:'TikTok',instagram:'Instagram',file:'Video',link:'Video',none:''}[v.provider]||'Video';}
};

/* ── DETAIL + COMMENTS ── */
const Detail={
  id:null,
  open(id,focusCmt){const p=Store.state.products.find(function(x){return x.id===id;});if(!p)return;this.id=id;
    p.views=(p.views||0)+1;Store.save();GA.event('view_item',{id:id});
    const isVid=p.type==='video';const dm=document.getElementById('dMedia');
    if(isVid&&p.video){dm.innerHTML=Media.embed(p);}
    else if(p.images&&p.images[0]){dm.innerHTML='<img src="'+esc(p.images[0])+'" alt="'+esc(p.title)+'">';}
    else{dm.innerHTML='<span style="font-size:4rem;opacity:.5">'+Render.glyph(isVid?'video':p.category)+'</span>';}
    /* [S-03] Use textContent for user data */
    document.getElementById('dTitle').textContent=p.title;
    const meta=[];if(!isVid){meta.push(Render.money(p.price));if(p.dims)meta.push(p.dims);}meta.push(p.category);if(isVid&&p.duration)meta.push('⏱ '+p.duration);if(isVid&&p.vdate)meta.push('📅 '+new Date(p.vdate).toLocaleDateString());meta.push('❤ '+(p.likes||0));meta.push('👁 '+(p.views||0));
    document.getElementById('dMeta').innerHTML=meta.map(function(m){return '<span>'+esc(m)+'</span>';}).join('');
    document.getElementById('dDesc').textContent=p.desc||'';
    let liked=false;try{liked=JSON.parse(localStorage.getItem('ak.liked')||'[]').indexOf(id)>=0;}catch(e){}
    const svgHeart='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    const dl=document.getElementById('dLike');dl.className='act act-like'+(liked?' liked':'');dl.innerHTML=svgHeart+' '+(liked?'Liked':'Like');
    const dCart=document.getElementById('dCart');dCart.style.display=isVid?'none':'';
    /* [FIX-08] Video order note */
    let vidNote=document.getElementById('vidCartNote');
    if(isVid){
      if(!vidNote){vidNote=document.createElement('div');vidNote.id='vidCartNote';vidNote.className='vid-cart-note';vidNote.innerHTML='<p style="font-size:.88rem;color:var(--ink-soft);margin-bottom:8px">See something you\'d like in this video?</p><button class="cbtn cbtn-primary" onclick="Detail.orderFromVideo()">Order what you see</button>';dCart.parentNode.insertBefore(vidNote,dCart.nextSibling);}
      vidNote.style.display='';
    }else{if(vidNote)vidNote.style.display='none';}
    this.renderCmts(p);UI.openOverlay('detailOverlay');Gallery.apply();
    if(focusCmt)setTimeout(function(){document.getElementById('cmtText').focus();},300);},
  orderFromVideo(){const p=Store.state.products.find(function(x){return x.id===Detail.id;});if(!p)return;const wa=Store.state.contact.whatsapp;const msg='Hi Artsy Knots! I saw something I love in your video "'+p.title+'" 🎬\nCould you tell me more about the pieces shown and how to order?';window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(msg),'_blank');UI.toast('Opening WhatsApp…');UI.hap();},
  renderCmts(p){const list=document.getElementById('cmtList');if(!p.comments||!p.comments.length){list.innerHTML='<div class="cmt-empty">No comments yet — be the first.</div>';return;}
    /* [S-03] Escape all user-supplied comment content */
    list.innerHTML=p.comments.slice().reverse().map(function(c){
      return '<div class="cmt"><div class="cn">'+esc(c.name)+'<time>'+new Date(c.ts).toLocaleDateString()+'</time></div><p>'+esc(c.text)+'</p></div>';
    }).join('');},
  comment(){const p=Store.state.products.find(function(x){return x.id===Detail.id;});if(!p)return;const name=document.getElementById('cmtName').value.trim()||'Anonymous';const text=document.getElementById('cmtText').value.trim();if(!text){UI.toast('Write something first.');return;}p.comments=p.comments||[];p.comments.push({name:name,text:text,ts:Date.now()});document.getElementById('cmtText').value='';Store.save();this.renderCmts(p);UI.toast('✓ Comment posted');UI.hap([6,20,6]);GA.event('comment',{id:Detail.id});},
  like(){Gallery.like(this.id);const liked=JSON.parse(localStorage.getItem('ak.liked')||'[]').indexOf(this.id)>=0;const svgHeart='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';const dl=document.getElementById('dLike');dl.className='act act-like'+(liked?' liked':'');dl.innerHTML=svgHeart+' '+(liked?'Liked':'Like');},
  addCart(){Cart.add(this.id);}
};

/* ── CONSOLE [S-04] ── */
const Console={
  _unlocked:false,
  _unlockedAt:0,
  _SESSION_MS:30*60*1000,
  _timerInterval:null,
  open(){
    /* [S-04] Check session expiry */
    if(this._unlocked&&Date.now()-this._unlockedAt>this._SESSION_MS){
      this._unlocked=false;UI.toast('Session expired. Please sign in again.');
    }
    const cfg=Store.state.config;
    if(cfg.published&&!this._unlocked){
      document.getElementById('loginOverlay').classList.add('show');
      document.getElementById('scrim').classList.add('show');
      setTimeout(function(){document.getElementById('loginEmail').focus();},100);
    }else{this._show();}
  },
  _show(){
    this._unlockedAt=Date.now();
    this.populate();
    document.getElementById('console').classList.add('show');
    document.getElementById('scrim').classList.add('show');
    UI.lockScroll();this.stats();UI.hap();
    this._tickTimer();
  },
  _tickTimer(){
    clearInterval(this._timerInterval);
    const el=document.getElementById('consoleTimer');
    const update=()=>{
      if(!el)return;
      const rem=this._SESSION_MS-(Date.now()-this._unlockedAt);
      if(rem<=0){clearInterval(this._timerInterval);this._unlocked=false;this.close();UI.toast('Session expired.');}
      else{const m=Math.ceil(rem/60000);el.textContent='Session expires in '+m+' min';}
    };
    update();
    this._timerInterval=setInterval(update,30000);
  },
  close(){
    clearInterval(this._timerInterval);
    document.getElementById('console').classList.remove('show');
    document.getElementById('scrim').classList.remove('show');
    UI.unlockScroll();
  },
  go(tab){this.open();setTimeout(function(){const b=document.querySelector('.ctab[data-tab="'+tab+'"]');if(b)Console.tab(tab,b);},60);},
  tab(name,btn){document.querySelectorAll('.ctab').forEach(function(t){t.classList.remove('active');});document.querySelectorAll('.cpanel').forEach(function(p){p.classList.remove('active');});btn.classList.add('active');document.querySelector('.cpanel[data-panel="'+name+'"]').classList.add('active');if(name==='works')this.renderProducts();if(name==='orders')Orders.render();if(name==='theme')this.renderPalettes();if(name==='layout')this.renderLayout();},
  populate(){const s=Store.state;function sv(id,v){const el=document.getElementById(id);if(el)el.value=v;}
    sv('f_brandName',s.brand.name);sv('f_brandTag',s.brand.tag);sv('f_logoUrl',s.brand.logoUrl);sv('f_logoLetter',s.brand.logoLetter);sv('f_footMark',s.brand.footMark);
    sv('f_heroEyebrow',s.copy.heroEyebrow);sv('f_heroTitle',s.copy.heroTitle);sv('f_heroLede',s.copy.heroLede);sv('f_aboutHeading',s.copy.aboutHeading);sv('f_aboutBy',s.copy.aboutBy);sv('f_aboutBody',s.copy.aboutBody);sv('f_aboutQuote',s.copy.aboutQuote);sv('f_aboutPortrait',s.copy.aboutPortrait);sv('f_beliefs',s.copy.beliefs);sv('f_contactHeading',s.copy.contactHeading);sv('f_contactBody',s.copy.contactBody);
    sv('f_whatsapp',s.contact.whatsapp);sv('f_phone',s.contact.phone);sv('f_sms',s.contact.sms||'');sv('f_email',s.contact.email);sv('f_instagram',s.contact.instagram);sv('f_tiktok',s.contact.tiktok);sv('f_facebook',s.contact.facebook);sv('f_twitter',s.contact.twitter);sv('f_pinterest',s.contact.pinterest);sv('f_youtube',s.contact.youtube);sv('f_blog',s.contact.blog);sv('f_linkedin',s.contact.linkedin);sv('f_currency',s.contact.currency);
    sv('f_accent',s.theme.accent);
    /* [S-01] Only non-sensitive mpesa fields */
    const m=s.payments.mpesa;sv('f_mp_shortcode',m.shortcode);sv('f_mp_endpoint',m.endpoint);sv('f_mp_account',m.account);sv('f_mp_callback',m.callback);
    sv('f_gaId',s.analytics.gaId);
    sv('f_adminEmail',s.config.adminEmail);sv('f_firebase',s.config.firebase?JSON.stringify(s.config.firebase,null,2):'');
    document.getElementById('sw_cloud').classList.toggle('on',!!s.config.cloud);document.getElementById('sw_mpesa').classList.toggle('on',!!m.enabled);document.getElementById('sw_dark').classList.toggle('on',!!s.theme.dark);document.getElementById('sw_haptics').classList.toggle('on',!!s.layout.haptics);
    /* [FIX-07] Console avatar */
    const av=document.getElementById('consoleAvatar');if(av){const p=s.copy.aboutPortrait;av.innerHTML=p?'<img src="'+esc(p)+'" style="width:100%;height:100%;object-fit:cover">':'<span style="color:#fff;font-size:1.1rem">👤</span>';}
    this.renderPalettes();this.renderLayout();this.renderProducts();this.statusBanners();},
  statusBanners(){const pub=Store.state.config.published;const b1=document.getElementById('statusBanner'),b2=document.getElementById('settingsStatus');const dev='🟡 Open studio mode — the console is unlocked on this device.',live='🟢 Live & locked — the studio key requires sign-in.';[b1,b2].forEach(function(b){if(b){b.textContent=pub?live:dev;b.className='status-banner '+(pub?'s-live':'s-dev');}});document.getElementById('consoleSub').textContent=pub?'Live mode · synced':'Studio mode · changes save instantly';document.getElementById('publishBtn').style.display=pub?'none':'block';document.getElementById('unpublishBtn').style.display=pub?'block':'none';document.getElementById('ownerKey').classList.toggle('armed',pub);},
  stats(){const p=Store.state.products,o=Store.state.orders;document.getElementById('stWorks').textContent=p.length;document.getElementById('stLikes').textContent=p.reduce(function(a,x){return a+(x.likes||0);},0);document.getElementById('stViews').textContent=p.reduce(function(a,x){return a+(x.views||0);},0);document.getElementById('stOrders').textContent=o.length;document.getElementById('stPending').textContent=o.filter(function(x){return x.status==='pending';}).length;document.getElementById('stValue').textContent=Math.round(p.reduce(function(a,x){return a+Number(x.price||0);},0)/1000);},
  renderPalettes(){const wrap=document.getElementById('paletteSwatches');const cur=Store.state.theme.palette;wrap.innerHTML=Object.entries(PALETTES).map(function(entry){const k=entry[0],v=entry[1];return '<div class="swatch'+(k===cur?' sel':'')+'" title="'+esc(v.label)+'" style="background:linear-gradient(135deg,'+esc(v.accent)+','+esc(v.accent2)+')" onclick="Edit.palette(\''+k+'\')"><span class="slb">'+esc(v.label)+'</span></div>';}).join('');},
  renderLayout(){const d=Store.state.layout;
    /* [FIX-06] Skeleton SVG previews */
    const svgGlass='<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#0D1F35"/><rect x="6" y="6" width="68" height="22" rx="4" fill="#162840" opacity=".9"/><rect x="6" y="32" width="40" height="5" rx="2" fill="#1E3A55"/><rect x="6" y="40" width="25" height="4" rx="2" fill="#152D48"/><rect x="54" y="38" width="20" height="8" rx="4" fill="#2B8CE6" opacity=".7"/></svg>';
    const svgSpatial='<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#0A1628"/><rect x="10" y="10" width="62" height="20" rx="4" fill="#162840" transform="rotate(-1 10 10)"/><rect x="7" y="8" width="62" height="20" rx="4" fill="#0D1E35" opacity=".5" transform="rotate(-2 7 8)"/><rect x="6" y="34" width="38" height="4" rx="2" fill="#1E3A55"/><rect x="6" y="41" width="22" height="3" rx="2" fill="#152D48"/></svg>';
    const svgNeural='<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#04080F"/><line x1="10" y1="12" x2="40" y2="28" stroke="#2B8CE6" stroke-width=".8" opacity=".4"/><line x1="40" y1="28" x2="68" y2="14" stroke="#2B8CE6" stroke-width=".8" opacity=".4"/><line x1="20" y1="38" x2="40" y2="28" stroke="#00C8FF" stroke-width=".8" opacity=".3"/><circle cx="10" cy="12" r="2.5" fill="#2B8CE6"/><circle cx="40" cy="28" r="3" fill="#00C8FF"/><circle cx="68" cy="14" r="2" fill="#2B8CE6"/><circle cx="20" cy="38" r="2" fill="#2B8CE6" opacity=".7"/><rect x="6" y="43" width="30" height="3" rx="2" fill="#1A3050"/></svg>';
    const views=[['glass',svgGlass,'Studio glass','frosted liquid'],['spatial',svgSpatial,'Spatial float','cards lift & drift'],['neural',svgNeural,'Neural space','dark, alive, neurons']];
    document.getElementById('viewOpts').innerHTML=views.map(function(v){return '<div class="opt'+(d.view===v[0]?' sel':'')+'" onclick="Views.set(\''+v[0]+'\')" style="display:flex;flex-direction:column;align-items:center;gap:6px">'+v[1]+'<div class="lname">'+esc(v[2])+'</div><div class="ldesc">'+esc(v[3])+'</div></div>';}).join('');
    const dens=[['standard','Standard','balanced grid'],['editorial','Editorial','big & airy'],['dense','Dense','more per row']];
    document.getElementById('densityOpts').innerHTML=dens.map(function(v){return '<div class="opt'+(d.density===v[0]?' sel':'')+'" onclick="Edit.layout(\'density\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
    const shapes=[['default','Soft','rounded glass'],['round','Pebble','extra round'],['sharp','Crisp','near-square']];
    document.getElementById('shapeOpts').innerHTML=shapes.map(function(v){return '<div class="opt'+(d.shape===v[0]?' sel':'')+'" onclick="Edit.layout(\'shape\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
    /* [FIX-11] Background opts */
    const bgs=[['caustic','Caustic','light waves'],['neural','Neural','live nodes'],['stars','Stars','twinkling sky'],['grid','Grid','precise lines'],['minimal','Minimal','clean flat'],['ink','Ink','soft gradient']];
    const bgEl=document.getElementById('bgOpts');if(bgEl)bgEl.innerHTML=bgs.map(function(v){return '<div class="opt'+(d.bgMode===v[0]?' sel':'')+'" onclick="Edit.layout(\'bgMode\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
    /* [FIX-05] Transition opts */
    const trans=[['fade','Fade','clean dissolve'],['slideUp','Slide Up','sweeps upward'],['zoomOut','Zoom Out','pulls back'],['blurDissolve','Blur','melts away'],['splitH','Split','tears open']];
    const trEl=document.getElementById('transitionOpts');if(trEl)trEl.innerHTML=trans.map(function(v){return '<div class="opt'+(d.introTransition===v[0]?' sel':'')+'" onclick="Edit.layout(\'introTransition\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');},
  renderProducts(){const wrap=document.getElementById('adminProducts');const p=Store.state.products;if(!p.length){wrap.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:20px">No works yet.</p>';return;}
    wrap.innerHTML=p.map(function(x){const isVid=x.type==='video';const tImg=isVid?Media.thumb(x):(x.images&&x.images[0]);const thumb=tImg?'<div class="athumb"><img src="'+esc(tImg)+'" alt="" loading="lazy"></div>':'<div class="athumb">'+Render.glyph(isVid?'video':x.category)+'</div>';const sub=isVid?'Video · '+(x.duration||'—')+' · ❤ '+(x.likes||0):Render.money(x.price)+' · '+x.category+' · ❤ '+(x.likes||0);
      return '<div class="padmin">'+thumb+'<div class="pinfo"><h4>'+esc(x.title)+'</h4><small>'+esc(sub)+'</small></div><div class="pacts">'
        +'<button class="mini me" onclick="Editor.openEdit(\''+esc(x.id)+'\')" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>'
        +'<button class="mini md" onclick="Editor.remove(\''+esc(x.id)+'\')" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>'
        +'</div></div>';
    }).join('');}
};

/* ── VIEWS ── */
const Views={
  set(v){Store.state.layout.view=v;Render.theme();if(Console.renderLayout)Console.renderLayout();Store.save();Physics.neuralOn=(v!=='glass');UI.hap();if(v!=='glass'&&!Store.state.theme.dark)UI.toast('Tip: pick a Black palette in Theme for the full space feel.');document.body.dataset.bg=Store.state.layout.bgMode||'caustic';},
  syncFab(){const v=Store.state.layout.view;document.querySelectorAll('#viewFab button').forEach(function(b){b.classList.toggle('sel',b.dataset.view===v);});}
};

/* ── EDIT ── */
const Edit={
  v(id){return document.getElementById(id)?document.getElementById(id).value:'';},
  /* [P-02] Use dSave() for oninput-triggered saves */
  brand(){const b=Store.state.brand;b.name=this.v('f_brandName');b.tag=this.v('f_brandTag');if(document.getElementById('f_logoUrl')&&document.getElementById('f_logoUrl').style.display!=='none')b.logoUrl=this.v('f_logoUrl');b.logoLetter=this.v('f_logoLetter');b.footMark=this.v('f_footMark');Render.brand();dSave();},
  logoMode(m){const up=(m==='upload');document.getElementById('logo_up').classList.toggle('sel',up);document.getElementById('logo_url').classList.toggle('sel',!up);document.getElementById('logoUpWrap').style.display=up?'block':'none';document.getElementById('f_logoUrl').style.display=up?'none':'block';},
  logoFile(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=function(){Store.state.brand.logoUrl=r.result;Render.brand();Store.save();UI.toast('Logo updated');};r.readAsDataURL(f);},
  portraitFile(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=function(){Store.state.copy.aboutPortrait=r.result;document.getElementById('f_aboutPortrait').value='';Render.copy();Store.save();UI.toast('Portrait updated');};r.readAsDataURL(f);},
  copy(){const c=Store.state.copy;c.heroEyebrow=this.v('f_heroEyebrow');c.heroTitle=this.v('f_heroTitle');c.heroLede=this.v('f_heroLede');c.aboutHeading=this.v('f_aboutHeading');c.aboutBy=this.v('f_aboutBy');c.aboutBody=this.v('f_aboutBody');c.aboutQuote=this.v('f_aboutQuote');if(this.v('f_aboutPortrait'))c.aboutPortrait=this.v('f_aboutPortrait');c.beliefs=this.v('f_beliefs');c.contactHeading=this.v('f_contactHeading');c.contactBody=this.v('f_contactBody');Render.copy();dSave();},
  contact(){const c=Store.state.contact;c.whatsapp=this.v('f_whatsapp').replace(/\D/g,'');c.phone=this.v('f_phone');c.sms=this.v('f_sms');c.email=this.v('f_email');c.instagram=this.v('f_instagram');c.tiktok=this.v('f_tiktok');c.facebook=this.v('f_facebook');c.twitter=this.v('f_twitter');c.pinterest=this.v('f_pinterest');c.youtube=this.v('f_youtube');c.blog=this.v('f_blog');c.linkedin=this.v('f_linkedin');c.currency=this.v('f_currency')||'KES';Render.contact();Gallery.apply();dSave();},
  /* [S-01] Only non-sensitive fields */
  payments(){const m=Store.state.payments.mpesa;m.shortcode=this.v('f_mp_shortcode');m.endpoint=this.v('f_mp_endpoint');m.account=this.v('f_mp_account');m.callback=this.v('f_mp_callback');dSave();Cart.syncPay();},
  analytics(){Store.state.analytics.gaId=this.v('f_gaId').trim();dSave();},
  toggleDark(){const sw=document.getElementById('sw_dark');sw.classList.toggle('on');Store.state.theme.dark=sw.classList.contains('on');Render.theme();Store.save();},
  toggleHaptics(){const sw=document.getElementById('sw_haptics');sw.classList.toggle('on');Store.state.layout.haptics=sw.classList.contains('on');Store.save();},
  palette(key){const p=PALETTES[key],t=Store.state.theme;t.palette=key;t.accent=p.accent;t.accent2=p.accent2;t.bg1=p.bg1;t.bg2=p.bg2;t.bg3=p.bg3;t.dark=p.dark;document.getElementById('f_accent').value=p.accent;document.getElementById('sw_dark').classList.toggle('on',p.dark);Render.theme();Console.renderPalettes();Store.save();UI.toast(esc(p.label)+' palette applied');UI.hap();},
  customAccent(hex){const t=Store.state.theme;t.accent=hex;t.palette='custom';t.accent2=this._shade(hex,-28);Render.theme();Console.renderPalettes();dSave();},
  _shade(hex,p){const n=parseInt(hex.slice(1),16);let r=(n>>16)+p,g=((n>>8)&255)+p,b=(n&255)+p;r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));return '#'+(r<<16|g<<8|b).toString(16).padStart(6,'0');},
  layout(kind,val){Store.state.layout[kind]=val;Render.theme();Console.renderLayout();Store.save();UI.hap();if(kind==='bgMode'){document.body.dataset.bg=val;if(val==='stars')Physics.initStars();}}
};

/* ── [FIX-03] IMAGE COMPRESSION ── */
async function compressImage(dataUrl,maxDim,quality){
  maxDim=maxDim||900;quality=quality||0.70;
  return new Promise(function(resolve){
    const img=new Image();
    img.onload=function(){
      const scale=Math.min(1,maxDim/Math.max(img.width,img.height));
      const c=document.createElement('canvas');
      c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);
      c.getContext('2d').drawImage(img,0,0,c.width,c.height);
      resolve(c.toDataURL('image/jpeg',quality));
    };
    img.onerror=function(){resolve(dataUrl);};
    img.src=dataUrl;
  });
}

/* ── EDITOR ── */
const Editor={
  eid:null,kind:'artwork',imgs:[],
  openNew(kind){this.eid=null;this.kind=kind;this.imgs=[];document.getElementById('editorTitle').textContent=kind==='video'?'Add a video':'Add an artwork';document.getElementById('editorSub').textContent=kind==='video'?'Paste a YouTube / Vimeo link or direct mp4.':'Photos sell the piece — bright, square-ish images work best.';['e_title','e_desc','e_price','e_dims','e_image','e_video','e_duration','e_vdate','e_vthumb'].forEach(function(id){const el=document.getElementById(id);if(el)el.value='';});document.getElementById('e_cat').value='matwork';document.getElementById('editorErr').style.display='none';this._fields();this.imgMode('upload');this.renderPrev();UI.openOverlay('editorOverlay');},
  openEdit(id){const p=Store.state.products.find(function(x){return x.id===id;});if(!p)return;this.eid=id;this.kind=p.type||'artwork';this.imgs=(p.images||[]).slice();document.getElementById('editorTitle').textContent=this.kind==='video'?'Edit video':'Edit artwork';document.getElementById('e_title').value=p.title;document.getElementById('e_desc').value=p.desc||'';document.getElementById('e_price').value=p.price||'';document.getElementById('e_cat').value=p.category||'matwork';document.getElementById('e_dims').value=p.dims||'';document.getElementById('e_video').value=p.video||'';document.getElementById('e_duration').value=p.duration||'';document.getElementById('e_vdate').value=p.vdate||'';document.getElementById('e_vthumb').value=p.vthumb||'';document.getElementById('editorErr').style.display='none';this._fields();this.imgMode('upload');this.renderPrev();UI.openOverlay('editorOverlay');},
  _fields(){const vid=(this.kind==='video');document.getElementById('e_vidBlock').style.display=vid?'block':'none';document.getElementById('e_imgBlock').style.display=vid?'none':'block';document.getElementById('e_dimsWrap').style.display=vid?'none':'block';},
  imgMode(m){const up=(m==='upload');document.getElementById('img_up').classList.toggle('sel',up);document.getElementById('img_url').classList.toggle('sel',!up);document.getElementById('imgUpWrap').style.display=up?'block':'none';document.getElementById('e_image').style.display=up?'none':'block';},
  imgFiles(ev){const files=Array.from(ev.target.files);if(!files.length)return;
    const oversized=files.filter(function(f){return f.size>12*1024*1024;});
    if(oversized.length){UI.toast('Image too large — max 12MB per image');return;}
    let pending=files.length;const self=this;
    files.forEach(function(f){const r=new FileReader();r.onload=function(){
      compressImage(r.result).then(function(compressed){self.imgs.push(compressed);if(--pending===0)self.renderPrev();});
    };r.readAsDataURL(f);});},
  imgFromUrl(){const u=document.getElementById('e_image').value.trim();if(u){this.imgs=[u].concat(this.imgs.filter(function(i){return i!==u;}));this.renderPrev();}},
  renderPrev(){const w=document.getElementById('imgPreview');if(!w)return;w.innerHTML=this.imgs.map(function(src,i){return '<img src="'+esc(src)+'" title="Tap to remove" onclick="Editor.dropImg('+i+')" loading="lazy">';}).join('');},
  dropImg(i){this.imgs.splice(i,1);this.renderPrev();},
  videoMeta(){const url=document.getElementById('e_video').value.trim();const v=Media.parse(url);if(v.provider==='youtube'&&!document.getElementById('e_vthumb').value)document.getElementById('e_vthumb').value='https://img.youtube.com/vi/'+v.id+'/hqdefault.jpg';},
  save(){
    const title=document.getElementById('e_title').value.trim();
    const err=document.getElementById('editorErr');
    if(!title){err.textContent='Give it a title.';err.style.display='block';return;}
    const base={title:title,desc:document.getElementById('e_desc').value.trim(),category:document.getElementById('e_cat').value};
    if(this.kind==='video'){
      const video=document.getElementById('e_video').value.trim();
      if(!video){err.textContent='Add a video link.';err.style.display='block';return;}
      base.type='video';base.video=video;base.duration=document.getElementById('e_duration').value.trim();
      base.vdate=document.getElementById('e_vdate').value;base.vthumb=document.getElementById('e_vthumb').value.trim();base.price=0;
    }else{
      const price=Number(document.getElementById('e_price').value);
      if(!price||price<0){err.textContent='Set a price.';err.style.display='block';return;}
      base.type='artwork';base.price=price;base.dims=document.getElementById('e_dims').value.trim();base.images=this.imgs.slice();
    }
    const doSave=function(finalBase){
      if(Editor.eid){Object.assign(Store.state.products.find(function(x){return x.id===Editor.eid;}),finalBase);UI.toast('\xe2\x9c\x93 Work updated: '+esc(title));}
      else{finalBase.id='p'+Date.now();finalBase.likes=0;finalBase.views=0;finalBase.comments=[];finalBase.createdAt=Date.now();Store.state.products.unshift(finalBase);UI.toast('\xe2\x9c\x93 Work added: '+esc(title));}
      Store.save();Gallery.apply();Console.renderProducts();Console.stats();UI.closeAll();UI.hap([6,20,6]);
    };
    /* Cloud upload path: Firebase Storage with full safety net */
    if(this.kind!=='video'&&base.images&&base.images.length&&Store.state.config.cloud&&Store.fb&&typeof Store.fb.storage==='function'){
      const uploads=base.images.filter(function(i){return i.startsWith('data:');});
      if(!uploads.length){doSave(base);return;}
      const btn=document.querySelector('#editorOverlay .cbtn-primary');
      if(btn)btn.textContent='Saving\xe2\x80\xa6';
      let done=0,savedCalled=false;const total=base.images.length;const urls=base.images.slice();
      /* finalize() is idempotent: only the first call does anything */
      const finalize=function(){
        if(savedCalled)return;savedCalled=true;
        if(btn)btn.textContent='Save work';
        doSave(Object.assign({},base,{images:urls}));
      };
      /* Safety net: if any upload hangs (Firebase unreachable, no resolve/reject), save after 10s */
      const timer=setTimeout(finalize,10000);
      base.images.forEach(function(img,idx){
        if(!img.startsWith('data:')){if(++done===total){clearTimeout(timer);finalize();}return;}
        try{
          const ref=Store.fb.storage().ref('products/'+Date.now()+'_'+idx+'.jpg');
          ref.putString(img,'data_url')
            .then(function(){return ref.getDownloadURL();})
            .then(function(url){urls[idx]=url;if(++done===total){clearTimeout(timer);finalize();}})
            .catch(function(){if(++done===total){clearTimeout(timer);finalize();}});
        }catch(e){
          /* Storage SDK threw synchronously (not loaded, wrong bucket, etc.) */
          if(++done===total){clearTimeout(timer);finalize();}
        }
      });
    }else{
      /* Local / no-firebase path */
      try{doSave(base);}catch(e){if(base.images)base.images=[];doSave(base);}
    }
  },
  remove(id){const p=Store.state.products.find(function(x){return x.id===id;});
    /* [UI-05] Confirmation before delete */
    if(!confirm('Delete "'+( p?p.title:'this work')+'"?\nThis cannot be undone.'))return;
    Store.state.products=Store.state.products.filter(function(x){return x.id!==id;});Store.save();Gallery.apply();Console.renderProducts();Console.stats();UI.toast('Work deleted');}
};

/* ── CART [S-05] ── */
const Cart={
  items:[],pay:'whatsapp',
  /* [S-05] sessionStorage persistence */
  save(){try{sessionStorage.setItem('ak.cart',JSON.stringify(this.items));}catch(e){}},
  restore(){try{const d=sessionStorage.getItem('ak.cart');if(d)this.items=JSON.parse(d);}catch(e){}},
  add(id){const p=Store.state.products.find(function(x){return x.id===id;});if(!p||p.type==='video')return;const ex=this.items.find(function(i){return i.id===id;});if(ex)ex.qty++;else this.items.push({id:id,qty:1});this.render();this.bump();this.save();
    /* [UI-05] Confirmation toast */
    UI.toast('✓ Added '+esc(p.title)+' to your cart');UI.hap([5,15,5]);GA.event('add_to_cart',{id:id});},
  bump(){const c=document.getElementById('cartCount');if(!c)return;const n=this.items.reduce(function(a,i){return a+i.qty;},0);c.textContent=n;c.style.display=n?'grid':'none';},
  remove(id){this.items=this.items.filter(function(i){return i.id!==id;});this.render();this.bump();this.save();},
  qty(id,d){const it=this.items.find(function(i){return i.id===id;});if(!it)return;it.qty+=d;if(it.qty<=0)this.remove(id);else{this.render();this.bump();this.save();}UI.hap();},
  open(){this.render();this.syncPay();document.getElementById('cart').classList.add('show');document.getElementById('scrim').classList.add('show');UI.lockScroll();UI.hap();},
  close(){document.getElementById('cart').classList.remove('show');document.getElementById('scrim').classList.remove('show');UI.unlockScroll();},
  setPay(m,btn){this.pay=m;document.querySelectorAll('.pay-opt').forEach(function(b){b.classList.remove('sel');});btn.classList.add('sel');document.getElementById('checkoutBtn').textContent=m==='mpesa'?'Pay with M-Pesa':'Checkout on WhatsApp';UI.hap();},
  syncPay(){const on=Store.state.payments.mpesa.enabled;document.getElementById('payMpesa').style.display=on?'block':'none';if(!on){this.pay='whatsapp';document.querySelectorAll('.pay-opt').forEach(function(b){b.classList.toggle('sel',b.dataset.pay==='whatsapp');});document.getElementById('checkoutBtn').textContent='Checkout on WhatsApp';}},
  render(){const w=document.getElementById('cartItems');if(!w)return;if(!this.items.length){w.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:40px 0">Your cart is empty.</p>';document.getElementById('cartTotal').textContent='—';return;}let total=0;w.innerHTML=this.items.map(function(i){const p=Store.state.products.find(function(x){return x.id===i.id;});if(!p)return'';total+=p.price*i.qty;const img=p.images&&p.images[0]?'<div class="cthumb"><img src="'+esc(p.images[0])+'" alt="" loading="lazy"></div>':'<div class="cthumb">'+Render.glyph(p.category)+'</div>';return '<div class="citem">'+img+'<div class="ci-info"><h4>'+esc(p.title)+'</h4><div class="ci-price">'+Render.money(p.price)+'</div></div><div class="qty-ctrl"><button onclick="Cart.qty(\''+esc(i.id)+'\',-1)">−</button><span>'+i.qty+'</span><button onclick="Cart.qty(\''+esc(i.id)+'\',1)">+</button></div></div>';}).join('');document.getElementById('cartTotal').textContent=Render.money(total);},
  _total(){return this.items.reduce(function(a,i){const p=Store.state.products.find(function(x){return x.id===i.id;});return a+(p?p.price*i.qty:0);},0);},
  _lines(){return this.items.map(function(i){const p=Store.state.products.find(function(x){return x.id===i.id;});return '• '+p.title+' ×'+i.qty+' — '+Render.money(p.price*i.qty);}).join('\n');},
  _record(ch,extra){const order={id:'AK'+Date.now().toString().slice(-6),createdAt:Date.now(),status:'pending',channel:ch,items:this.items.map(function(i){const p=Store.state.products.find(function(x){return x.id===i.id;});return{id:i.id,title:p.title,qty:i.qty,price:p.price};}),total:this._total()};Object.assign(order,extra||{});Store.state.orders.unshift(order);Store.save();Console.stats();GA.event('purchase',{value:order.total,channel:ch});return order;},
  checkout(){if(!this.items.length){UI.toast('Your cart is empty');return;}if(this.pay==='mpesa')return this.mpesa();const c=Store.state.contact;const order=this._record('whatsapp');const msg='Hi '+Store.state.brand.name+'! I’d love to order (Ref '+order.id+'):\n\n'+this._lines()+'\n\nTotal: '+Render.money(order.total)+'\n\nCould we sort out the details?';window.open('https://wa.me/'+c.whatsapp+'?text='+encodeURIComponent(msg),'_blank');UI.hap([6,20,6]);UI.toast('Order saved · opening WhatsApp');},
  async mpesa(){const m=Store.state.payments.mpesa;const phone=prompt('Enter your M-Pesa number (07… or 2547…):');if(!phone)return;const order=this._record('mpesa',{phone:phone});if(!m.endpoint){const c=Store.state.contact;const msg='Hi '+Store.state.brand.name+'! M-Pesa order '+order.id+':\n\n'+this._lines()+'\n\nTotal: '+Render.money(order.total)+'\nMy number: '+phone;UI.toast('Order saved — completing via WhatsApp');window.open('https://wa.me/'+c.whatsapp+'?text='+encodeURIComponent(msg),'_blank');return;}UI.toast('Sending M-Pesa prompt to '+phone+'…');try{const res=await fetch(m.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:phone,amount:order.total,account:m.account,reference:order.id})});if(res.ok){UI.toast('Check your phone for the M-Pesa prompt');UI.hap([6,30,6]);}else UI.toast('Payment service error — try WhatsApp instead.');}catch(e){UI.toast('Could not reach the M-Pesa service — try WhatsApp instead.');}}
};

/* ── ORDERS ── */
const Orders={
  f:'all',
  filter(f,btn){this.f=f;document.querySelectorAll('#orderSeg button').forEach(function(b){b.classList.remove('sel');});btn.classList.add('sel');this.render();},
  render(){const w=document.getElementById('orderList');let o=Store.state.orders.slice();if(this.f!=='all')o=o.filter(function(x){return x.status===Orders.f;});if(!o.length){w.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:24px">No orders here yet.</p>';return;}w.innerHTML=o.map(function(x){return '<div class="order-row"><div class="oh"><span class="oid">'+esc(x.id)+'</span><span class="ostat '+esc(x.status)+'">'+esc(x.status)+'</span></div><div class="otime">'+new Date(x.createdAt).toLocaleString()+' · '+esc(x.channel)+(x.phone?' · '+esc(x.phone):'')+'</div><div class="oitems">'+x.items.map(function(i){return esc(i.title)+' ×'+i.qty;}).join('<br>')+'</div><div class="otime" style="font-weight:700;color:var(--ink);margin:6px 0 10px">'+Render.money(x.total)+'</div><div style="display:flex;gap:8px">'+(x.status==='pending'?'<button class="cbtn cbtn-primary" style="margin:0" onclick="Orders.mark(\''+esc(x.id)+'\',\'completed\')">Mark completed</button>':'<button class="cbtn cbtn-ghost" style="margin:0" onclick="Orders.mark(\''+esc(x.id)+'\',\'pending\')">Reopen</button>')+'<button class="cbtn cbtn-danger" style="margin:0" onclick="Orders.del(\''+esc(x.id)+'\')">Delete</button></div></div>';}).join('');},
  mark(id,status){const o=Store.state.orders.find(function(x){return x.id===id;});if(o){o.status=status;Store.save();this.render();Console.stats();UI.toast('Order '+status);UI.hap();}},
  del(id){if(!confirm('Delete this order?'))return;Store.state.orders=Store.state.orders.filter(function(x){return x.id!==id;});Store.save();this.render();Console.stats();},
  exportCSV(){const o=Store.state.orders;if(!o.length){UI.toast('No orders to export.');return;}const rows=[['Order','Date','Status','Channel','Phone','Items','Total']];o.forEach(function(x){rows.push([x.id,new Date(x.createdAt).toISOString(),x.status,x.channel,x.phone||'',x.items.map(function(i){return i.title+' x'+i.qty;}).join('; '),x.total]);});const csv=rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='artsy-knots-orders.csv';a.click();UI.toast('Orders exported');UI.hap();}
};

/* ── AUTH [S-02] ── */
const Auth={
  clearFields(){
    const e=document.getElementById('loginEmail');const p=document.getElementById('loginPass');const err=document.getElementById('loginErr');
    if(e)e.value='';if(p){p.value='';p.type='password';}
    if(err){err.style.display='none';err.textContent='';}
    const eye=document.getElementById('loginPassEye');if(eye)eye.classList.remove('reveal');
  },
  async login(){
    const email=document.getElementById('loginEmail').value.trim();
    const pass=document.getElementById('loginPass').value;
    const err=document.getElementById('loginErr');
    err.style.display='none';
    const cfg=Store.state.config;
    try{
      /* [S-02] Always compare SHA-256 hash — never plaintext, never Firebase Auth */
      const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pass));
      const hex=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
      /* If no local hash yet, wait for the cloud load that started at boot.
         This fixes the race condition where login is attempted before Firestore
         returns — credentials would always fail on a fresh device otherwise. */
      let stored=cfg.passHash||localStorage.getItem('ak.lp')||'';
      if(!stored&&Store._loading){try{await Store._loading;}catch(e2){}stored=cfg.passHash||localStorage.getItem('ak.lp')||'';}
      if(!email||!stored||email!==cfg.adminEmail||hex!==stored)throw new Error('bad');
      Console._unlocked=true;Console._unlockedAt=Date.now();
      Auth.clearFields();UI.closeAll();Console._show();
      UI.toast('Welcome back, Bernice ✨');UI.hap();
    }catch(e){
      err.textContent='Email or password not recognised.';err.style.display='block';
    }
  }
};

/* ── SETTINGS ── */
const Settings={
  toggleCloud(){const sw=document.getElementById('sw_cloud');sw.classList.toggle('on');Store.state.config.cloud=sw.classList.contains('on');Store.save();},
  toggleMpesa(){const sw=document.getElementById('sw_mpesa');sw.classList.toggle('on');Store.state.payments.mpesa.enabled=sw.classList.contains('on');Store.save();Cart.syncPay();},
  parseFirebase(){const raw=document.getElementById('f_firebase').value.trim();if(!raw)return null;try{const clean=raw.replace(/^[^{]*({[\s\S]*})[^}]*$/,'$1').replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g,'$1"$2":').replace(/'/g,'"').replace(/,(\s*})/g,'$1');return JSON.parse(clean);}catch(e){return undefined;}},
  initFirebase(cfg){try{if(typeof firebase==='undefined')return false;if(!firebase.apps.length)firebase.initializeApp(cfg);Store.fb=firebase;return true;}catch(e){console.error(e);return false;}},
  _publishData:null,
  async publish(){
    const email=document.getElementById('f_adminEmail').value.trim();
    if(!email){UI.toast('Add an admin email first');Console.go('access');return;}
    const fb=this.parseFirebase();const cfg=Store.state.config;
    cfg.adminEmail=email;
    if(cfg.cloud&&fb!==null){
      if(fb===undefined){UI.toast('That Firebase config could not be read');return;}
      cfg.firebase=fb;if(!this.initFirebase(fb)){UI.toast('Firebase failed to start — check the config');return;}
    }
    const stored=cfg.passHash||localStorage.getItem('ak.lp')||'';
    if(!stored){
      /* Show password modal instead of prompt() */
      this._publishData={cfg};
      document.getElementById('setPass1').value='';
      document.getElementById('setPass2').value='';
      document.getElementById('setPassErr').style.display='none';
      document.getElementById('setPassOverlay').classList.add('show');
      document.getElementById('scrim').classList.add('show');
      UI.lockScroll();
      return;
    }
    this._finishPublish(cfg);
  },
  async _confirmPass(){
    const p1=document.getElementById('setPass1').value;
    const p2=document.getElementById('setPass2').value;
    const err=document.getElementById('setPassErr');
    if(!p1){err.textContent='Enter a password.';err.style.display='block';return;}
    if(p1!==p2){err.textContent='Passwords don\'t match — try again.';err.style.display='block';return;}
    const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(p1));
    const hex=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
    const cfg=this._publishData.cfg;
    cfg.passHash=hex;localStorage.setItem('ak.lp',hex);
    document.getElementById('setPassOverlay').classList.remove('show');
    document.getElementById('setPass1').value='';document.getElementById('setPass2').value='';
    this._finishPublish(cfg);
  },
  _cancelPass(){
    document.getElementById('setPassOverlay').classList.remove('show');
    document.getElementById('setPass1').value='';
    document.getElementById('setPass2').value='';
    document.getElementById('setPassErr').style.display='none';
    if(!document.querySelector('.overlay.show'))document.getElementById('scrim').classList.remove('show');
    UI.unlockScroll();
  },
  _finishPublish(cfg){
    cfg.published=true;Console._unlocked=true;Console._unlockedAt=Date.now();
    Store.save();Console.statusBanners();Console.populate();GA.init();
    UI.toast('Published — the studio key is now locked');UI.hap([8,40,8]);
  },
  unpublish(){if(!confirm('Switch back to open studio mode?'))return;Store.state.config.published=false;Store.save();Console.statusBanners();UI.toast('Back to open studio mode');}
};

/* ── GOOGLE ANALYTICS ── */
const GA={
  ready:false,
  init(){const id=Store.state.analytics.gaId;if(!id||!Store.state.config.published||this.ready)return;const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',id);this.ready=true;},
  event(name,params){if(this.ready&&window.gtag)gtag('event',name,params||{});}
};

/* ── UI [A-01] ── */
const UI={
  openOverlay(id){
    const el=document.getElementById(id);if(!el)return;
    el.classList.add('show');UI.lockScroll();
    setTimeout(function(){const first=el.querySelector('input,button,textarea,select');if(first)first.focus();},80);
  },
  closeAll(){
    document.querySelectorAll('.overlay').forEach(function(o){o.classList.remove('show');});
    document.getElementById('cart').classList.remove('show');
    const dm=document.getElementById('dMedia');if(dm)dm.innerHTML='';
    const picker=document.getElementById('orderPicker');if(picker)picker.remove();
    if(!document.getElementById('console').classList.contains('show'))document.getElementById('scrim').classList.remove('show');
    UI.unlockScroll();
  },
  lockScroll(){document.body.style.overflow='hidden';document.body.style.touchAction='none';},
  unlockScroll(){
    /* Only unlock if no overlay, drawer, or order sheet is still open */
    if(document.querySelector('.overlay.show,.console.show,.cart.show,#orderPicker'))return;
    document.body.style.overflow='';document.body.style.touchAction='';
  },
  hap(p){try{if(Store.state&&Store.state.layout&&Store.state.layout.haptics&&navigator.vibrate)navigator.vibrate(p||10);}catch(e){}},
  toast(msg){const w=document.getElementById('toastWrap');if(!w)return;const t=document.createElement('div');t.className='toast';t.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>'+msg;w.appendChild(t);setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove();},300);},2700);}
};

/* ── PHYSICS [P-03] ── */
const Physics={
  reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,neuralOn:false,ripples:[],nodes:[],
  bindTilt(){if(this.reduced)return;document.querySelectorAll('.card').forEach(function(card){card.onpointermove=function(e){const r=card.getBoundingClientRect();const px=(e.clientX-r.left)/r.width-0.5,py=(e.clientY-r.top)/r.height-0.5;card.style.transform='perspective(900px) rotateY('+(px*8)+'deg) rotateX('+(-py*8)+'deg) translateY(-6px)';};card.onpointerleave=function(){card.style.transform='';};});},
  initRipple(){const cv=document.getElementById('rippleCanvas');const ctx=cv.getContext('2d');const fit=function(){cv.width=innerWidth;cv.height=innerHeight;};fit();addEventListener('resize',fit);const self=this;addEventListener('pointerdown',function(e){if(self.reduced)return;self.ripples.push({x:e.clientX,y:e.clientY,r:0,a:.5});});const loop=function(){if(document.hidden){requestAnimationFrame(loop);return;}ctx.clearRect(0,0,cv.width,cv.height);self.ripples=self.ripples.filter(function(rp){return rp.a>0.02;});const c=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#1fb6d6';self.ripples.forEach(function(rp){rp.r+=4;rp.a*=0.95;ctx.beginPath();ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2);ctx.strokeStyle=self._rgba(c,rp.a);ctx.lineWidth=2;ctx.stroke();});requestAnimationFrame(loop);};if(!this.reduced)loop();},
  rippleAt(el){if(this.reduced||!el)return;const r=el.getBoundingClientRect();this.ripples.push({x:r.left+r.width/2,y:r.top+r.height/2,r:0,a:.65});},
  _rgba(hex,a){const n=parseInt(hex.replace('#',''),16);return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';},
  /* [P-03] Neural canvas with accent caching and RAF guard */
  initNeural(){
    const cv=document.getElementById('neuralCanvas');const ctx=cv.getContext('2d');let w,h;const fit=function(){w=cv.width=innerWidth;h=cv.height=innerHeight;};fit();addEventListener('resize',fit);
    const N=innerWidth<640?30:60;this.nodes=[];
    for(let i=0;i<N;i++)this.nodes.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+1});
    const mouse={x:-999,y:-999};addEventListener('pointermove',function(e){mouse.x=e.clientX;mouse.y=e.clientY;});
    const self=this;
    /* Color cache — only re-read CSS vars every 60 frames */
    let _cachedAccent='',_cachedAccent2='',_frame=0;
    const loop=function(){
      requestAnimationFrame(loop);
      /* [P-03] Skip draw when tab hidden or not in neural/spatial view */
      if(document.hidden||self.reduced||!self.neuralOn){if(!self.neuralOn)ctx.clearRect(0,0,w,h);return;}
      _frame++;
      if(_frame%60===0||!_cachedAccent){
        _cachedAccent=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#1fb6d6';
        _cachedAccent2=getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim()||'#0e7ea3';
      }
      const c=_cachedAccent,c2=_cachedAccent2;
      ctx.clearRect(0,0,w,h);
      const ns=self.nodes;
      for(let i=0;i<ns.length;i++){const n=ns[i];n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>w)n.vx*=-1;if(n.y<0||n.y>h)n.vy*=-1;const dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.hypot(dx,dy);if(d<140&&d>0){n.x+=dx/d*.9;n.y+=dy/d*.9;}}
      for(let i=0;i<ns.length;i++){for(let j=i+1;j<ns.length;j++){const a=ns[i],b=ns[j];const dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);if(dist<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=self._rgba(c,(1-dist/130)*.3);ctx.lineWidth=1;ctx.stroke();}}}
      for(let i=0;i<ns.length;i++){const n=ns[i];ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=self._rgba(c2,.85);ctx.shadowBlur=9;ctx.shadowColor=c;ctx.fill();ctx.shadowBlur=0;}
    };
    loop();
  },
  /* [FIX-11] Stars canvas */
  _starsRunning:false,
  initStars(){
    if(this._starsRunning)return;
    const cv=document.getElementById('neuralCanvas');const ctx=cv.getContext('2d');
    const stars=Array.from({length:180},function(){return{x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.3,a:Math.random(),speed:Math.random()*.4+.1};});
    this._starsRunning=true;const self=this;
    const loop=function(){
      if(Store.state.layout.bgMode!=='stars'){self._starsRunning=false;return;}
      ctx.clearRect(0,0,cv.width,cv.height);
      stars.forEach(function(s){s.a+=s.speed*.008;const alpha=(Math.sin(s.a)+1)/2;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='rgba(180,210,255,'+alpha*.9+')';ctx.fill();});
      requestAnimationFrame(loop);
    };
    cv.style.opacity='1';loop();
  }
};

/* ── [FIX-09] ORDER PICKER ── */
const Order={
  _opts:[],
  pick(id){
    const p=Store.state.products.find(function(x){return x.id===id;});if(!p)return;
    const c=Store.state.contact;const opts=[];
    if(c.whatsapp)opts.push({label:'WhatsApp',icon:'💬',fn:function(){Order._wa(p);}});
    if(c.phone)opts.push({label:'Call / SMS',icon:'📞',fn:function(){Order._sms(p);}});
    if(c.email)opts.push({label:'Email',icon:'✉',fn:function(){Order._email(p);}});
    Order._showPicker(p,opts);UI.hap();
  },
  _showPicker(p,opts){
    let existing=document.getElementById('orderPicker');if(existing)existing.remove();
    const sheet=document.createElement('div');sheet.id='orderPicker';sheet.className='order-sheet';
    sheet.innerHTML='<div class="order-sheet-inner glass"><p class="order-sheet-title">How would you like to order?</p>'
      +'<p class="order-sheet-sub">'+esc(p.title)+' — '+Render.money(p.price)+'</p>'
      +'<div class="order-sheet-opts">'+opts.map(function(o,i){return '<button class="order-opt" onclick="Order._exec('+i+')">'+o.icon+' '+esc(o.label)+'</button>';}).join('')+'</div>'
      +'<button class="cbtn cbtn-ghost" style="margin-top:8px" onclick="Order._close()">Cancel</button></div>';
    Order._opts=opts;document.body.appendChild(sheet);UI.lockScroll();
    sheet.addEventListener('click',function(e){if(e.target===sheet)Order._close();});
  },
  _exec(i){Order._opts[i].fn();Order._close();},
  _close(){const el=document.getElementById('orderPicker');if(el)el.remove();UI.unlockScroll();},
  _wa(p){const c=Store.state.contact;const msg='Hi Artsy Knots! I\'d like to order:\n\n• '+p.title+' — '+Render.money(p.price)+(p.dims?'\n  Size: '+p.dims:'')+'\n\nCould you help me complete this order?';window.open('https://wa.me/'+c.whatsapp+'?text='+encodeURIComponent(msg),'_blank');UI.toast('Opening WhatsApp…');},
  _sms(p){const c=Store.state.contact;const num=(c.sms||c.phone).replace(/\s/g,'');const msg='Hi Artsy Knots! I\'d like to order: '+p.title+' — '+Render.money(p.price);window.open('sms:'+num+'?body='+encodeURIComponent(msg));UI.toast('Opening SMS…');},
  _email(p){const c=Store.state.contact;const sub=encodeURIComponent('Order: '+p.title);const body=encodeURIComponent('Hello,\n\nI would like to order:\n\n'+p.title+' — '+Render.money(p.price)+(p.dims?'\nSize: '+p.dims:'')+'\n\nPlease let me know the next steps.\n\nThank you.');window.open('mailto:'+c.email+'?subject='+sub+'&body='+body);UI.toast('Opening email…');},
  call(){const phone=Store.state.contact.phone;if(!phone){UI.toast('Phone number not set in Socials tab.');return;}window.location.href='tel:'+phone.replace(/\s/g,'');UI.toast('Calling the studio…');UI.hap([10,30,10]);}
};

/* ── REVEAL ── */
const Reveal={
  io:null,
  init(){this.io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');Reveal.io.unobserve(e.target);}});},{threshold:.12});this.scan();},
  scan(){if(!this.io)return;document.querySelectorAll('.reveal:not(.in)').forEach(function(el){Reveal.io.observe(el);});}
};

/* ── [FIX-05] INTRO ANIMATION ── */
function initIntro(){
  const intro=document.getElementById('introScreen');if(!intro)return;
  const logo=document.getElementById('rotatingLogo');
  const b=Store.state.brand;
  if(b.logoUrl){logo.innerHTML='<img src="'+esc(b.logoUrl)+'" alt="'+esc(b.name)+'" style="width:100%;height:100%;object-fit:cover;border-radius:20px">';}
  else{logo.textContent=b.logoLetter||'A';}
  document.getElementById('introText').innerHTML='<p class="welcome-text">Welcome into my world<br>by '+esc(b.name)+'\'s thoughts,<br>creativity, and perception<br>of the world.</p>';
  const transitionClass='intro-out-'+(Store.state.layout.introTransition||'fade');
  setTimeout(function(){intro.classList.add(transitionClass);},5200);
  setTimeout(function(){intro.style.display='none';},5900);
}

/* ── EVENT WIRING ── */
try{
  document.getElementById('consoleTabs').addEventListener('click',function(e){const b=e.target.closest('.ctab');if(b)Console.tab(b.dataset.tab,b);});
  document.addEventListener('click',function(e){if(!e.target.closest('.sort-menu')){const _sp=document.getElementById('sortPop');if(_sp)_sp.classList.remove('show');}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')UI.closeAll();});
}catch(evErr){console.error('event wiring',evErr);}
let lastY=0;
addEventListener('scroll',function(){const y=scrollY;const bar=document.getElementById('topbar');if(bar)bar.style.transform=(y>lastY&&y>200)?'translateX(-50%) translateY(-130%)':'translateX(-50%)';lastY=y;});

/* ── BOOT ── */
function boot(){
  try{Store.load();}catch(e){Store.state=JSON.parse(JSON.stringify(DEFAULTS));}
  try{
    if(navigator.hardwareConcurrency<=2){document.body.dataset.lowperf='true';}
    document.body.dataset.bg=Store.state.layout.bgMode||'caustic';
    if(!Store.state.config.firebase){Store.state.config.firebase=FIREBASE_CONFIG;Store.state.config.cloud=true;}
    if(Settings.initFirebase(Store.state.config.firebase))Store._loading=Store.cloudLoad();
    Physics.neuralOn=(Store.state.layout.view!=='glass');
  }catch(bootErr){console.error('boot init',bootErr);}
  initIntro(); /* always runs — CSS failsafe backs this up */
  Render.all();
  if(Store.state.layout.bgMode==='stars')Physics.initStars();
  Reveal.init();
  Physics.initRipple();
  Physics.initNeural();
  /* [S-05] Restore cart from sessionStorage */
  Cart.restore();
  Cart.bump();
  GA.init();
}

document.addEventListener('DOMContentLoaded',boot);
