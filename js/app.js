/* ═══════════════════════════════════════════════════════════════
   ARTSY KNOTS · v5 · Supabase edition
   Source of truth: Supabase. Every device reads the same data.
   Security lives in Row Level Security, not in this file.
   ═══════════════════════════════════════════════════════════════ */

/* ── CONFIG (public values only) ── */
const SUPABASE_URL='https://aqfmoiehacstnpcskqlx.supabase.co';
const SUPABASE_KEY='sb_publishable_GYPOvggow6kpE0d5Dm9xwQ_9I2L7Rgj';
const sb=(window.supabase&&window.supabase.createClient)?window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY):null;
const SESSION_MS=30*60*1000;

/* ── HELPERS ── */
function esc(str){return String(str==null?'':str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');}
let _saveTimer=null;
function dSave(){Store._pending=true;clearTimeout(_saveTimer);_saveTimer=setTimeout(function(){Store.saveSettings();},700);}
function togglePw(btn){
  const inp=btn.parentElement.querySelector('input');if(!inp)return;
  inp.type=inp.type==='password'?'text':'password';
  btn.classList.toggle('reveal',inp.type==='text');
  btn.setAttribute('aria-label',inp.type==='text'?'Hide password':'Show password');
}
function getLiked(){try{return JSON.parse(localStorage.getItem('ak.liked')||'[]');}catch(e){return [];}}
function setLiked(list){try{localStorage.setItem('ak.liked',JSON.stringify(list));}catch(e){}}

/* ── DEFAULTS (studio settings only; no sample works) ── */
const DEFAULTS={
  brand:{name:'Artsy Knots',tag:'handmade studio',logoUrl:'',logoLetter:'A',footMark:'Artsy Knots'},
  theme:{palette:'lagoon',dark:false,accent:'#1fb6d6',accent2:'#0e7ea3',bg1:'#dff3fa',bg2:'#bfe9f5',bg3:'#eafaff'},
  layout:{view:'glass',density:'standard',shape:'default',haptics:true,bgMode:'caustic',introTransition:'fade'},
  copy:{heroEyebrow:'Handmade in Nairobi · one of a kind',heroTitle:'Texture you can *feel*, art you can hold.',heroLede:'Hand-knotted mats, tufted rugs, canvas works and resin pieces — each made slowly by Bernice Wairimu.',aboutHeading:'Made by hand, on purpose.',aboutBy:'Bernice Wairimu · Founder, Artsy Knots',aboutBody:'Artsy Knots began with a simple stubbornness: the belief that something made slowly, by a real pair of hands, carries a feeling no machine can fake.\nTo me, art is a conversation — between colour and texture, between the maker and whoever the piece ends up living with. Every knot is a small argument for patience.\nCustom commissions are always welcome.',aboutQuote:'When you love what you make, time disappears — and that’s how I end up working at 2am, unable to stop trying one more design.',aboutPortrait:'',beliefs:'Creativity has no limits,Handmade is soulful,Every piece tells a story,Passion over perfection,Art heals',contactHeading:'Let’s make something',contactBody:'Commissions are open. Tell me the room, the colours, the feeling — and I’ll bring it into the world.'},
  contact:{whatsapp:'254706189808',phone:'+254 706 189 808',sms:'',email:'',instagram:'bernicewairimu',tiktok:'bernicewairimu706',facebook:'',twitter:'',pinterest:'',youtube:'',blog:'',linkedin:'',currency:'KES'},
  payments:{mpesa:{enabled:false,shortcode:'',endpoint:'',account:'ArtsyKnots',callback:''}},
  analytics:{gaId:''}
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

/* ── ROW MAPPING (database columns <-> app fields) ── */
function fromRow(r,comments){
  return{id:r.id,type:r.type,title:r.title,desc:r.description||'',price:Number(r.price)||0,category:r.category||'matwork',dims:r.dims||'',images:r.images||[],video:r.video_url||'',duration:r.duration||'',vdate:r.video_date||'',vthumb:r.video_thumb||'',likes:r.likes||0,views:r.views||0,createdAt:Date.parse(r.created_at)||0,comments:comments||[]};
}
function toRow(p){
  return{type:p.type,title:p.title,description:p.desc||'',price:p.type==='video'?0:(Number(p.price)||0),category:p.category||'matwork',dims:p.dims||'',images:p.images||[],video_url:p.video||'',duration:p.duration||'',video_date:p.vdate||null,video_thumb:p.vthumb||''};
}

/* ── DATA ── */
const Store={
  state:structuredClone(DEFAULTS),
  products:[],
  orders:[],
  _pending:false,
  _refreshTimer:null,
  _mg(d,s){const o=structuredClone(d);for(const k in s){if(s[k]&&typeof s[k]==='object'&&!Array.isArray(s[k]))o[k]=this._mg(d[k]||{},s[k]);else o[k]=s[k];}return o;},
  async loadSettings(){
    if(!sb)return;
    const {data,error}=await sb.from('site_settings').select('value').eq('key','site').maybeSingle();
    if(error){console.warn('settings',error);return;}
    if(data&&data.value)this.state=this._mg(DEFAULTS,data.value);
  },
  async saveSettings(){
    if(!sb)return;
    if(!Auth.isAdmin){UI.toast('Sign in as the studio owner to save changes.');return;}
    const {error}=await sb.from('site_settings').upsert({key:'site',value:this.state,updated_at:new Date().toISOString()});
    if(error){UI.toast('Could not save. Check your connection.');console.warn('save',error);return;}
    this._pending=false;
  },
  async loadProducts(){
    if(!sb)return;
    const [p,c]=await Promise.all([
      sb.from('products').select('*').order('created_at',{ascending:false}),
      sb.from('comments').select('*').order('created_at',{ascending:true})
    ]);
    if(p.error){console.warn('products',p.error);return;}
    const by={};
    ((c.data)||[]).forEach(function(r){(by[r.product_id]=by[r.product_id]||[]).push({name:r.name,text:r.body,ts:Date.parse(r.created_at)||0});});
    this.products=(p.data||[]).map(function(r){return fromRow(r,by[r.id]);});
  },
  async loadOrders(){
    if(!sb||!Auth.isAdmin)return;
    const {data,error}=await sb.from('orders').select('*').order('created_at',{ascending:false});
    if(error){console.warn('orders',error);return;}
    this.orders=(data||[]).map(function(r){return{id:r.id,status:r.status,channel:r.channel,phone:r.phone||'',items:r.items||[],total:Number(r.total)||0,createdAt:Date.parse(r.created_at)||0};});
  },
  refresh(){
    clearTimeout(this._refreshTimer);
    this._refreshTimer=setTimeout(async function(){
      if(!Store._pending)await Store.loadSettings();
      await Store.loadProducts();
      await Store.loadOrders();
      Render.all();
      Console.stats();
      if(document.getElementById('console').classList.contains('show')){Console.renderProducts();Orders.render();}
    },400);
  },
  exportData(){
    const out={exportedAt:new Date().toISOString(),settings:this.state,products:this.products,orders:this.orders};
    const b=new Blob([JSON.stringify(out,null,2)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='artsy-knots-backup.json';a.click();
    UI.toast('Backup downloaded');UI.hap();
  }
};

/* ── AUTH ── */
const Auth={
  isAdmin:false,
  email:'',
  recovering:false,
  async refresh(){
    this.isAdmin=false;this.email='';
    if(!sb)return false;
    const {data}=await sb.auth.getSession();
    const s=data&&data.session;
    if(!s)return false;
    this.email=s.user.email||'';
    const {data:ok,error}=await sb.rpc('is_admin');
    this.isAdmin=!error&&ok===true;
    return this.isAdmin;
  },
  setErr(msg,ok,id){
    const e=document.getElementById(id||'loginErr');if(!e)return;
    e.textContent=msg||'';e.style.display=msg?'block':'none';e.classList.toggle('ok',!!ok);
  },
  show(view){
    ['loginView','resetView','newPassView'].forEach(function(id){const el=document.getElementById(id);if(el)el.style.display=(id===view)?'block':'none';});
    const t=document.getElementById('loginTitle');
    if(t)t.textContent=view==='newPassView'?'Choose a new password':view==='resetView'?'Reset password':'Studio access';
    this.setErr('');
  },
  clearFields(){
    ['loginEmail','loginPass','resetEmail','newPass1','newPass2'].forEach(function(id){const el=document.getElementById(id);if(el){el.value='';if(el.type==='text')el.type='password';}});
    document.querySelectorAll('#loginOverlay .pw-eye').forEach(function(b){b.classList.remove('reveal');});
    this.setErr('');
  },
  async login(){
    if(!sb){this.setErr('Sign-in service did not load. Refresh and try again.');return;}
    const email=document.getElementById('loginEmail').value.trim();
    const password=document.getElementById('loginPass').value;
    if(!email||!password){this.setErr('Enter your email and password.');return;}
    const r=await sb.auth.signInWithPassword({email:email,password:password});
    if(r.error||!r.data.session){this.setErr('Email or password not recognised.');return;}
    if(!(await this.refresh())){await sb.auth.signOut();this.setErr('This account does not have studio access.');return;}
    this.clearFields();UI.closeAll();Console._show();
    UI.toast('Welcome back ✨');UI.hap();
  },
  async sendReset(){
    if(!sb)return;
    const email=document.getElementById('resetEmail').value.trim();
    if(!email){this.setErr('Enter the email on your account.');return;}
    await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
    /* Same message whether or not the account exists */
    this.setErr('If that email has an account, a reset link is on its way. Check your inbox and spam.',true);
  },
  async completeRecovery(){
    const p1=document.getElementById('newPass1').value;
    const p2=document.getElementById('newPass2').value;
    if(p1.length<10){this.setErr('Use at least 10 characters.');return;}
    if(p1!==p2){this.setErr('Passwords don\'t match.');return;}
    const r=await sb.auth.updateUser({password:p1});
    if(r.error){this.setErr('Could not save. Request a new reset link.');return;}
    this.recovering=false;
    history.replaceState(null,'',location.pathname);
    await sb.auth.signOut();
    this.isAdmin=false;this.email='';
    this.clearFields();this.show('loginView');
    this.setErr('Password saved. Sign in with your new password.',true);
  },
  async changePassword(){
    const p1=document.getElementById('accPass1').value;
    const p2=document.getElementById('accPass2').value;
    if(p1.length<10){this.setErr('Use at least 10 characters.',false,'accErr');return;}
    if(p1!==p2){this.setErr('Passwords don\'t match.',false,'accErr');return;}
    const r=await sb.auth.updateUser({password:p1});
    if(r.error){this.setErr('Could not save the new password. Try again.',false,'accErr');return;}
    document.getElementById('accPass1').value='';document.getElementById('accPass2').value='';
    this.setErr('Password changed.',true,'accErr');
    UI.toast('Password changed');
  },
  async signOut(){
    if(sb)await sb.auth.signOut();
    this.isAdmin=false;this.email='';
    Console.close();
    UI.toast('Signed out of the studio');
  }
};

/* ── RENDER ── */
const Render={
  cur(){return Store.state.contact.currency||'KES';},
  money(n){return Number(n).toLocaleString()+' '+this.cur();},
  all(){this.theme();this.brand();this.copy();this.contact();Gallery.apply();const yr=document.getElementById('year');if(yr)yr.textContent=new Date().getFullYear();},
  theme(){
    const t=Store.state.theme,l=Store.state.layout,r=document.documentElement.style;
    r.setProperty('--accent',t.accent);r.setProperty('--accent-2',t.accent2);r.setProperty('--bg-1',t.bg1);r.setProperty('--bg-2',t.bg2);r.setProperty('--bg-3',t.bg3);
    document.body.dataset.theme=t.dark?'dark':'light';document.body.dataset.density=l.density;document.body.dataset.shape=l.shape;document.body.dataset.view=l.view;document.body.dataset.bg=l.bgMode||'caustic';
    document.getElementById('themeColor').setAttribute('content',t.bg3);
    Views.syncFab();
  },
  brand(){
    const b=Store.state.brand;
    document.getElementById('brandName').innerHTML=esc(b.name)+'<small id="brandTag">'+esc(b.tag)+'</small>';
    document.getElementById('footMark').textContent=b.footMark||b.name;
    const lw=document.getElementById('logoWrap');
    lw.innerHTML=b.logoUrl?'<img src="'+esc(b.logoUrl)+'" alt="'+esc(b.name)+'">':'<span style="font-family:var(--serif);font-weight:600;color:#fff;font-size:1.2rem">'+esc(b.logoLetter||'A')+'</span>';
    document.title=esc(b.name)+' — Handmade Art by Bernice Wairimu';
    const ownerKey=document.getElementById('ownerKey');
    const portrait=Store.state.copy.aboutPortrait;
    const ownerSvg='<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12c2.2 0 4-2 4-4.5S14.2 3 12 3 8 5 8 7.5 9.8 12 12 12z"/><path d="M5 21c0-3.5 3.1-6 7-6s7 2.5 7 6"/><path d="M18 3.2l.6 1.3 1.3.6-1.3.6-.6 1.3-.6-1.3L16.1 5.1l1.3-.6z"/></svg>';
    if(ownerKey)ownerKey.innerHTML=portrait?'<img src="'+esc(portrait)+'" alt="Studio owner" style="width:100%;height:100%;object-fit:cover;border-radius:50%">':ownerSvg;
  },
  copy(){
    const c=Store.state.copy;
    document.getElementById('heroEyebrow').textContent=c.heroEyebrow;
    document.getElementById('heroTitle').innerHTML=esc(c.heroTitle).replace(/\*(.+?)\*/g,'<em>$1</em>');
    document.getElementById('heroLede').textContent=c.heroLede;
    document.getElementById('aboutHeading').textContent=c.aboutHeading;
    document.getElementById('aboutBy').textContent=c.aboutBy;
    document.getElementById('aboutBody').innerHTML=c.aboutBody.split('\n').filter(Boolean).map(function(p){return '<p>'+esc(p)+'</p>';}).join('');
    document.getElementById('aboutQuote').textContent='“'+c.aboutQuote.replace(/^[“"]/,'')+'”';
    document.getElementById('aboutPortrait').innerHTML=c.aboutPortrait?'<img src="'+esc(c.aboutPortrait)+'" alt="Bernice Wairimu">':'<div style="width:100%;height:100%;display:grid;place-items:center;font-size:3rem;opacity:.5;color:#fff">🧵</div>';
    document.getElementById('beliefs').innerHTML=c.beliefs.split(',').map(function(b){return '<span class="belief">'+esc(b.trim())+'</span>';}).join('');
    document.getElementById('contactHeading').textContent=c.contactHeading;
    document.getElementById('contactBody').textContent=c.contactBody;
  },
  glyph(cat){return {matwork:'🧶',canvas:'🖼️',resin:'💎',commission:'✨',video:'🎬'}[cat]||'🎨';},
  contact(){
    const c=Store.state.contact;const rows=[];
    if(c.phone)rows.push('<a class="contact-row" href="tel:'+esc(c.phone.replace(/\s/g,''))+'">☎ '+esc(c.phone)+'</a>');
    if(c.email)rows.push('<a class="contact-row" href="mailto:'+esc(c.email)+'">✉ '+esc(c.email)+'</a>');
    if(c.whatsapp)rows.push('<a class="contact-row" href="https://wa.me/'+esc(c.whatsapp)+'?text='+encodeURIComponent('Hi, I found you on Artsy Knots!')+'" target="_blank" rel="noopener">WhatsApp the studio</a>');
    document.getElementById('contactRows').innerHTML=rows.join('');
    function lnk(v,base){return v?(v.startsWith('http')?v:base+v.replace('@','')):'';}
    const S=[];
    const ig=lnk(c.instagram,'https://instagram.com/');if(ig)S.push(['Instagram',ig]);
    const tt=lnk(c.tiktok,'https://tiktok.com/@');if(tt)S.push(['TikTok',tt]);
    const fb=lnk(c.facebook,'https://facebook.com/');if(fb)S.push(['Facebook',fb]);
    const tw=lnk(c.twitter,'https://x.com/');if(tw)S.push(['X',tw]);
    const pin=lnk(c.pinterest,'https://pinterest.com/');if(pin)S.push(['Pinterest',pin]);
    const yt=lnk(c.youtube,'https://youtube.com/@');if(yt)S.push(['YouTube',yt]);
    const li=lnk(c.linkedin,'https://linkedin.com/in/');if(li)S.push(['LinkedIn',li]);
    if(c.blog)S.push(['Read the blog',c.blog.startsWith('http')?c.blog:'https://'+c.blog]);
    document.getElementById('socials').innerHTML=S.map(function(x){return '<a class="social" href="'+esc(x[1])+'" target="_blank" rel="noopener">'+esc(x[0])+'</a>';}).join('');
  }
};

/* ── GALLERY ── */
const SORTS=[['new','Newest'],['old','Oldest'],['price-asc','Price: low → high'],['price-desc','Price: high → low'],['likes','Most liked'],['views','Most viewed'],['az','A → Z']];
const Gallery={
  cat:'all',sort:'new',q:'',
  toggleSort(e){e.stopPropagation();const pop=document.getElementById('sortPop');
    if(!pop.innerHTML)pop.innerHTML=SORTS.map(function(s){return '<button class="'+(s[0]==='new'?'sel':'')+'" data-s="'+s[0]+'" onclick="Gallery.setSort(\''+s[0]+'\')">'+esc(s[1])+'</button>';}).join('');
    pop.classList.toggle('show');},
  setSort(k){this.sort=k;const sf=SORTS.find(function(s){return s[0]===k;});if(sf)document.getElementById('sortLabel').textContent=sf[1];
    document.querySelectorAll('#sortPop button').forEach(function(b){b.classList.toggle('sel',b.dataset.s===k);});
    document.getElementById('sortPop').classList.remove('show');this.apply();UI.hap();},
  setCat(c,btn){this.cat=c;document.querySelectorAll('#filters .chip').forEach(function(x){x.classList.remove('active');});btn.classList.add('active');this.apply();UI.hap();},
  buildFilters(){
    const items=Store.products;const counts={};
    items.forEach(function(p){counts[p.category]=(counts[p.category]||0)+1;});
    const hasVid=items.some(function(p){return p.type==='video';});
    const labels={all:'All works',matwork:'Mats',canvas:'Paintings',resin:'Resin',commission:'Commissions'};
    let h=['all'].concat(Object.keys(counts)).map(function(c){return '<button class="chip '+(c===Gallery.cat?'active':'')+'" onclick="Gallery.setCat(\''+c+'\',this)">'+(labels[c]||esc(c))+(c!=='all'?'<span class="ct">'+counts[c]+'</span>':'')+'</button>';}).join('');
    if(hasVid)h+='<button class="chip '+(this.cat==='video'?'active':'')+'" onclick="Gallery.setCat(\'video\',this)">Videos</button>';
    h+='<button class="chip '+(this.cat==='trending'?'active':'')+'" onclick="Gallery.setCat(\'trending\',this)">Most liked</button>';
    document.getElementById('filters').innerHTML=h;
  },
  apply(){
    this.q=(document.getElementById('searchInput').value||'').trim().toLowerCase();
    this.buildFilters();
    let list=Store.products.slice();
    if(this.cat==='video')list=list.filter(function(p){return p.type==='video';});
    else if(this.cat==='trending')list=list.slice().sort(function(a,b){return (b.likes||0)-(a.likes||0);}).slice(0,8);
    else if(this.cat!=='all')list=list.filter(function(p){return p.category===Gallery.cat;});
    if(this.q){const q=this.q;list=list.filter(function(p){return (p.title+' '+p.desc+' '+p.dims+' '+p.category).toLowerCase().includes(q);});}
    if(this.cat!=='trending')list=this._sort(list);
    this.draw(list);
  },
  _sort(list){const s=this.sort;return list.sort(function(a,b){switch(s){case 'old':return a.createdAt-b.createdAt;case 'price-asc':return a.price-b.price;case 'price-desc':return b.price-a.price;case 'likes':return (b.likes||0)-(a.likes||0);case 'views':return (b.views||0)-(a.views||0);case 'az':return a.title.localeCompare(b.title);default:return b.createdAt-a.createdAt;}});},
  draw(items){
    const grid=document.getElementById('galleryGrid');
    if(!items.length){grid.style.opacity='1';grid.innerHTML='<div class="empty">'+(Store.products.length?'No works match that yet — try another search.':'New works are on their way. Check back soon.')+'</div>';return;}
    const liked=getLiked();
    const svgHeart='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    const svgCall='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.09 3h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.1 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
    const html=items.map(function(p,i){
      const isVid=p.type==='video';
      const thumb=isVid?(p.vthumb||Media.thumb(p)):(p.images[0]||'');
      const media=thumb?'<img src="'+esc(thumb)+'" alt="'+esc(p.title)+'" loading="lazy" decoding="async" onerror="this.style.display=\'none\'">':'<span class="glyph">'+Render.glyph(isVid?'video':p.category)+'</span>';
      const play=isVid?'<div class="play-badge"><div class="play-circle"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>'+(p.duration?'<span class="dur-badge">'+esc(p.duration)+'</span>':''):'';
      const isLiked=liked.indexOf(p.id)>=0;
      const fd=(5+(i%5)*0.9).toFixed(1)+'s';
      const body=isVid
        ?'<div class="body"><div class="vid-meta-row"><span class="vid-provider">'+esc(Media.providerLabel(p.video))+'</span>'+(p.vdate?'<span class="vid-date">'+new Date(p.vdate).toLocaleDateString()+'</span>':'')+'</div><h3 class="vid-title">'+esc(p.title)+'</h3><p class="vid-desc">'+esc(p.desc)+'</p><div class="vid-stats"><span>♥ '+p.likes+'</span><span>👁 '+p.views+'</span>'+(p.duration?'<span>⏱ '+esc(p.duration)+'</span>':'')+'</div></div>'
        :'<div class="body"><h3>'+esc(p.title)+'</h3><p class="desc">'+esc(p.desc)+'</p>'+(p.dims?'<div class="dims">'+esc(p.dims)+'</div>':'')+'<div class="meta"><span class="price">'+Render.money(p.price)+'</span><span class="tag">'+esc(p.category)+'</span></div></div>';
      const actions='<div class="actions" style="padding:0 22px 18px">'
        +'<button class="act act-like act-mini'+(isLiked?' liked':'')+'" id="lb-'+esc(p.id)+'" data-lid="'+esc(p.id)+'" onclick="event.stopPropagation();Gallery.like(this.dataset.lid)" aria-label="Like">'+svgHeart+'</button>'
        +(isVid
          ?'<button class="act act-cart" style="flex:1" data-did="'+esc(p.id)+'" onclick="event.stopPropagation();Detail.open(this.dataset.did)">Watch</button>'
          :'<button class="act act-order" style="flex:1" data-oid="'+esc(p.id)+'" onclick="event.stopPropagation();Order.pick(this.dataset.oid)">Order</button><button class="act act-cart" style="flex:1" data-cid="'+esc(p.id)+'" onclick="event.stopPropagation();Cart.add(this.dataset.cid)">Add to Cart</button>')
        +'<button class="act act-like act-mini" title="Call studio" onclick="event.stopPropagation();Order.call()">'+svgCall+'</button></div>';
      return '<article class="card" data-id="'+esc(p.id)+'" style="--fd:'+fd+'" onclick="Detail.open(\''+esc(p.id)+'\')"><div class="ph">'+media+play+'<span class="like-pill">'+svgHeart+' <span id="lk-'+esc(p.id)+'">'+p.likes+'</span></span></div>'+body+actions+'</article>';
    }).join('');
    const modalOpen=!!document.querySelector('.overlay.show');
    if(modalOpen){grid.innerHTML=html;grid.style.opacity='1';Physics.bindTilt();Reveal.scan();return;}
    grid.style.opacity='0';
    requestAnimationFrame(function(){grid.innerHTML=html;grid.style.transition='opacity .25s ease';grid.style.opacity='1';Physics.bindTilt();Reveal.scan();});
  },
  async like(id){
    const p=Store.products.find(function(x){return x.id===id;});if(!p)return;
    let liked=getLiked();const on=liked.indexOf(id)>=0;const delta=on?-1:1;
    p.likes=Math.max(0,(p.likes||0)+delta);
    setLiked(on?liked.filter(function(x){return x!==id;}):liked.concat(id));
    const btn=document.getElementById('lb-'+id);
    if(btn){btn.classList.toggle('liked',!on);if(!on){btn.classList.add('pop');setTimeout(function(){btn.classList.remove('pop');},460);}}
    if(!on){Physics.rippleAt(btn);UI.hap([8,30,8]);GA.event('like',{id:id});UI.toast('♥ Liked '+p.title);}
    if(sb){const r=await sb.rpc('increment_likes',{pid:id,delta:delta});if(!r.error&&typeof r.data==='number')p.likes=r.data;}
    const lk=document.getElementById('lk-'+id);if(lk)lk.textContent=p.likes;
    Detail.refreshLikeButton();
    Console.stats();
  }
};

/* ── MEDIA ── */
const Media={
  parse(url){
    if(!url)return{provider:'none'};
    let m=url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);if(m)return{provider:'youtube',id:m[1]};
    m=url.match(/vimeo\.com\/(\d+)/);if(m)return{provider:'vimeo',id:m[1]};
    m=url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/);if(m)return{provider:'tiktok',id:m[1]};
    m=url.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/);if(m)return{provider:'instagram',id:m[1]};
    if(/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url))return{provider:'file',url:url};
    return{provider:'link',url:url};
  },
  thumb(p){
    if(p.vthumb)return p.vthumb;
    const v=this.parse(p.video);
    if(v.provider==='youtube')return 'https://img.youtube.com/vi/'+v.id+'/hqdefault.jpg';
    return p.images[0]||'';
  },
  embed(p){
    const v=this.parse(p.video);
    if(v.provider==='youtube')return '<iframe src="https://www.youtube.com/embed/'+esc(v.id)+'?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    if(v.provider==='vimeo')return '<iframe src="https://player.vimeo.com/video/'+esc(v.id)+'?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>';
    if(v.provider==='tiktok')return '<iframe src="https://www.tiktok.com/embed/'+esc(v.id)+'" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    if(v.provider==='instagram')return '<iframe src="https://www.instagram.com/p/'+esc(v.id)+'/embed/" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    if(v.provider==='file')return '<video src="'+esc(v.url)+'" controls autoplay playsinline></video>';
    return '<a class="btn btn-primary" href="'+esc(p.video)+'" target="_blank" rel="noopener" style="margin:auto">Open video ↗</a>';
  },
  providerLabel(url){const v=this.parse(url);return {youtube:'YouTube',vimeo:'Vimeo',tiktok:'TikTok',instagram:'Instagram',file:'Video',link:'Video',none:''}[v.provider]||'Video';}
};

/* ── DETAIL + COMMENTS ── */
const Detail={
  id:null,
  async open(id){
    const p=Store.products.find(function(x){return x.id===id;});if(!p)return;
    this.id=id;
    p.views=(p.views||0)+1;
    if(sb){const r=await sb.rpc('increment_views',{pid:id});if(!r.error&&typeof r.data==='number')p.views=r.data;}
    GA.event('view_item',{id:id});
    const isVid=p.type==='video';
    const dm=document.getElementById('dMedia');
    if(isVid&&p.video)dm.innerHTML=Media.embed(p);
    else if(p.images[0])dm.innerHTML='<img src="'+esc(p.images[0])+'" alt="'+esc(p.title)+'">';
    else dm.innerHTML='<span style="font-size:4rem;opacity:.5">'+Render.glyph(isVid?'video':p.category)+'</span>';
    document.getElementById('dTitle').textContent=p.title;
    const meta=[];
    if(!isVid){meta.push(Render.money(p.price));if(p.dims)meta.push(p.dims);}
    meta.push(p.category);
    if(isVid&&p.duration)meta.push('⏱ '+p.duration);
    if(isVid&&p.vdate)meta.push('📅 '+new Date(p.vdate).toLocaleDateString());
    meta.push('❤ '+p.likes);meta.push('👁 '+p.views);
    document.getElementById('dMeta').innerHTML=meta.map(function(m){return '<span>'+esc(m)+'</span>';}).join('');
    document.getElementById('dDesc').textContent=p.desc;
    document.getElementById('dCart').style.display=isVid?'none':'';
    let note=document.getElementById('vidCartNote');
    if(isVid){
      if(!note){
        note=document.createElement('div');note.id='vidCartNote';note.className='vid-cart-note';
        note.innerHTML='<p style="font-size:.88rem;color:var(--ink-soft);margin-bottom:8px">See something you\'d like in this video?</p><button class="cbtn cbtn-primary" onclick="Detail.orderFromVideo()">Order what you see</button>';
        document.getElementById('dCart').parentNode.insertBefore(note,document.getElementById('dCart').nextSibling);
      }
      note.style.display='';
    }else if(note)note.style.display='none';
    this.refreshLikeButton();
    this.renderComments(p);
    UI.openOverlay('detailOverlay');
  },
  refreshLikeButton(){
    const p=Store.products.find(function(x){return x.id===Detail.id;});if(!p)return;
    const liked=getLiked().indexOf(p.id)>=0;
    const svgHeart='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    const dl=document.getElementById('dLike');
    dl.className='act act-like'+(liked?' liked':'');
    dl.innerHTML=svgHeart+' '+(liked?'Liked':'Like')+' · '+p.likes;
  },
  like(){Gallery.like(this.id);},
  orderFromVideo(){
    const p=Store.products.find(function(x){return x.id===Detail.id;});if(!p)return;
    const msg='Hi Artsy Knots! I saw something I love in your video "'+p.title+'" 🎬\nCould you tell me more about the pieces shown and how to order?';
    window.open('https://wa.me/'+Store.state.contact.whatsapp+'?text='+encodeURIComponent(msg),'_blank');
    UI.toast('Opening WhatsApp…');UI.hap();
  },
  renderComments(p){
    const list=document.getElementById('cmtList');
    if(!p.comments.length){list.innerHTML='<div class="cmt-empty">No comments yet — be the first.</div>';return;}
    list.innerHTML=p.comments.slice().reverse().map(function(c){
      return '<div class="cmt"><div class="cn">'+esc(c.name)+'<time>'+new Date(c.ts).toLocaleDateString()+'</time></div><p>'+esc(c.text)+'</p></div>';
    }).join('');
  },
  async comment(){
    const p=Store.products.find(function(x){return x.id===Detail.id;});if(!p)return;
    const name=(document.getElementById('cmtName').value.trim()||'Anonymous').slice(0,60);
    const text=document.getElementById('cmtText').value.trim().slice(0,1000);
    if(!text){UI.toast('Write something first.');return;}
    const r=await sb.from('comments').insert({product_id:p.id,name:name,body:text});
    if(r.error){UI.toast('Could not post your comment. Try again.');return;}
    p.comments.push({name:name,text:text,ts:Date.now()});
    document.getElementById('cmtText').value='';
    this.renderComments(p);
    UI.toast('✓ Comment posted');UI.hap([6,20,6]);GA.event('comment',{id:p.id});
  },
  addCart(){Cart.add(this.id);}
};

/* ── CART ── */
const Cart={
  items:[],pay:'whatsapp',
  save(){try{sessionStorage.setItem('ak.cart',JSON.stringify(this.items));}catch(e){}},
  restore(){try{const d=sessionStorage.getItem('ak.cart');if(d)this.items=JSON.parse(d);}catch(e){}},
  add(id){
    const p=Store.products.find(function(x){return x.id===id;});if(!p||p.type==='video')return;
    const ex=this.items.find(function(i){return i.id===id;});
    if(ex)ex.qty++;else this.items.push({id:id,qty:1});
    this.render();this.bump();this.save();
    UI.toast('✓ Added '+p.title+' to your cart');UI.hap([5,15,5]);GA.event('add_to_cart',{id:id});
  },
  bump(){const c=document.getElementById('cartCount');const n=this.items.reduce(function(a,i){return a+i.qty;},0);c.textContent=n;c.style.display=n?'grid':'none';},
  remove(id){this.items=this.items.filter(function(i){return i.id!==id;});this.render();this.bump();this.save();},
  qty(id,d){const it=this.items.find(function(i){return i.id===id;});if(!it)return;it.qty+=d;if(it.qty<=0)this.remove(id);else{this.render();this.bump();this.save();}UI.hap();},
  open(){this.render();this.syncPay();document.getElementById('cart').classList.add('show');document.getElementById('scrim').classList.add('show');UI.lockScroll();UI.hap();},
  close(){document.getElementById('cart').classList.remove('show');document.getElementById('scrim').classList.remove('show');UI.unlockScroll();},
  setPay(m,btn){this.pay=m;document.querySelectorAll('.pay-opt').forEach(function(b){b.classList.remove('sel');});btn.classList.add('sel');document.getElementById('checkoutBtn').textContent=m==='mpesa'?'Pay with M-Pesa':'Checkout on WhatsApp';UI.hap();},
  syncPay(){
    const on=Store.state.payments.mpesa.enabled;
    document.getElementById('payMpesa').style.display=on?'block':'none';
    if(!on){this.pay='whatsapp';document.querySelectorAll('.pay-opt').forEach(function(b){b.classList.toggle('sel',b.dataset.pay==='whatsapp');});document.getElementById('checkoutBtn').textContent='Checkout on WhatsApp';}
  },
  render(){
    const w=document.getElementById('cartItems');
    if(!this.items.length){w.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:40px 0">Your cart is empty.</p>';document.getElementById('cartTotal').textContent='—';return;}
    let total=0;
    w.innerHTML=this.items.map(function(i){
      const p=Store.products.find(function(x){return x.id===i.id;});if(!p)return '';
      total+=p.price*i.qty;
      const img=p.images[0]?'<div class="cthumb"><img src="'+esc(p.images[0])+'" alt="" loading="lazy"></div>':'<div class="cthumb">'+Render.glyph(p.category)+'</div>';
      return '<div class="citem">'+img+'<div class="ci-info"><h4>'+esc(p.title)+'</h4><div class="ci-price">'+Render.money(p.price)+'</div></div><div class="qty-ctrl"><button onclick="Cart.qty(\''+esc(i.id)+'\',-1)">−</button><span>'+i.qty+'</span><button onclick="Cart.qty(\''+esc(i.id)+'\',1)">+</button></div></div>';
    }).join('');
    document.getElementById('cartTotal').textContent=Render.money(total);
  },
  _total(){return this.items.reduce(function(a,i){const p=Store.products.find(function(x){return x.id===i.id;});return a+(p?p.price*i.qty:0);},0);},
  _lines(){return this.items.map(function(i){const p=Store.products.find(function(x){return x.id===i.id;});return p?'• '+p.title+' ×'+i.qty+' — '+Render.money(p.price*i.qty):'';}).join('\n');},
  async _record(channel,phone){
    const id='AK'+Math.random().toString(36).slice(2,8).toUpperCase();
    const row={id:id,status:'pending',channel:channel,phone:phone||'',total:this._total(),items:this.items.map(function(i){const p=Store.products.find(function(x){return x.id===i.id;});return{id:i.id,title:p?p.title:'',qty:i.qty,price:p?p.price:0};})};
    if(sb){const r=await sb.from('orders').insert(row);if(r.error){UI.toast('Order not saved online. It will still go to WhatsApp.');console.warn('order',r.error);}}
    GA.event('purchase',{value:row.total,channel:channel});
    return row;
  },
  async checkout(){
    if(!this.items.length){UI.toast('Your cart is empty');return;}
    if(this.pay==='mpesa')return this.mpesa();
    const order=await this._record('whatsapp','');
    const msg='Hi '+Store.state.brand.name+'! I\'d love to order (Ref '+order.id+'):\n\n'+this._lines()+'\n\nTotal: '+Render.money(order.total)+'\n\nCould we sort out the details?';
    window.open('https://wa.me/'+Store.state.contact.whatsapp+'?text='+encodeURIComponent(msg),'_blank');
    UI.hap([6,20,6]);UI.toast('Order sent · opening WhatsApp');
  },
  async mpesa(){
    const m=Store.state.payments.mpesa;
    const phone=prompt('Enter your M-Pesa number (07… or 2547…):');if(!phone)return;
    const order=await this._record('mpesa',phone);
    if(!m.endpoint){
      const msg='Hi '+Store.state.brand.name+'! M-Pesa order '+order.id+':\n\n'+this._lines()+'\n\nTotal: '+Render.money(order.total)+'\nMy number: '+phone;
      UI.toast('Order saved — completing via WhatsApp');
      window.open('https://wa.me/'+Store.state.contact.whatsapp+'?text='+encodeURIComponent(msg),'_blank');
      return;
    }
    UI.toast('Sending M-Pesa prompt to '+phone+'…');
    try{
      const res=await fetch(m.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:phone,amount:order.total,account:m.account,reference:order.id})});
      if(res.ok){UI.toast('Check your phone for the M-Pesa prompt');UI.hap([6,30,6]);}
      else UI.toast('Payment service error — try WhatsApp instead.');
    }catch(e){UI.toast('Could not reach the M-Pesa service — try WhatsApp instead.');}
  }
};

/* ── ORDERS (studio owner only) ── */
const Orders={
  f:'all',
  filter(f,btn){this.f=f;document.querySelectorAll('#orderSeg button').forEach(function(b){b.classList.remove('sel');});btn.classList.add('sel');this.render();},
  async load(){await Store.loadOrders();this.render();Console.stats();},
  render(){
    const w=document.getElementById('orderList');
    let o=Store.orders.slice();
    if(this.f!=='all')o=o.filter(function(x){return x.status===Orders.f;});
    if(!o.length){w.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:24px">No orders here yet.</p>';return;}
    w.innerHTML=o.map(function(x){
      return '<div class="order-row"><div class="oh"><span class="oid">'+esc(x.id)+'</span><span class="ostat '+esc(x.status)+'">'+esc(x.status)+'</span></div>'
        +'<div class="otime">'+new Date(x.createdAt).toLocaleString()+' · '+esc(x.channel)+(x.phone?' · '+esc(x.phone):'')+'</div>'
        +'<div class="oitems">'+x.items.map(function(i){return esc(i.title)+' ×'+i.qty;}).join('<br>')+'</div>'
        +'<div class="otime" style="font-weight:700;color:var(--ink);margin:6px 0 10px">'+Render.money(x.total)+'</div>'
        +'<div style="display:flex;gap:8px">'
        +(x.status==='pending'
          ?'<button class="cbtn cbtn-primary" style="margin:0" onclick="Orders.mark(\''+esc(x.id)+'\',\'completed\')">Mark completed</button>'
          :'<button class="cbtn cbtn-ghost" style="margin:0" onclick="Orders.mark(\''+esc(x.id)+'\',\'pending\')">Reopen</button>')
        +'<button class="cbtn cbtn-danger" style="margin:0" onclick="Orders.del(\''+esc(x.id)+'\')">Delete</button></div></div>';
    }).join('');
  },
  async mark(id,status){
    const r=await sb.from('orders').update({status:status}).eq('id',id);
    if(r.error){UI.toast('Could not update the order.');return;}
    await this.load();UI.toast('Order '+status);UI.hap();
  },
  async del(id){
    if(!confirm('Delete this order?'))return;
    const r=await sb.from('orders').delete().eq('id',id);
    if(r.error){UI.toast('Could not delete the order.');return;}
    await this.load();
  },
  exportCSV(){
    const o=Store.orders;if(!o.length){UI.toast('No orders to export.');return;}
    const rows=[['Order','Date','Status','Channel','Phone','Items','Total']];
    o.forEach(function(x){rows.push([x.id,new Date(x.createdAt).toISOString(),x.status,x.channel,x.phone,x.items.map(function(i){return i.title+' x'+i.qty;}).join('; '),x.total]);});
    const csv=rows.map(function(r){return r.map(function(c){return '"'+String(c).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='artsy-knots-orders.csv';a.click();
    UI.toast('Orders exported');UI.hap();
  }
};

/* ── VIEWS ── */
const Views={
  set(v){Store.state.layout.view=v;Render.theme();Console.renderLayout();dSave();Physics.neuralOn=(v!=='glass');UI.hap();if(v!=='glass'&&!Store.state.theme.dark)UI.toast('Tip: pick a Black palette in Theme for the full space feel.');},
  syncFab(){const v=Store.state.layout.view;document.querySelectorAll('#viewFab button').forEach(function(b){b.classList.toggle('sel',b.dataset.view===v);});}
};

/* ── EDIT (studio settings) ── */
const Edit={
  v(id){const el=document.getElementById(id);return el?el.value:'';},
  brand(){const b=Store.state.brand;b.name=this.v('f_brandName');b.tag=this.v('f_brandTag');if(document.getElementById('f_logoUrl').style.display!=='none')b.logoUrl=this.v('f_logoUrl');b.logoLetter=this.v('f_logoLetter');b.footMark=this.v('f_footMark');Render.brand();dSave();},
  logoMode(m){const up=(m==='upload');document.getElementById('logo_up').classList.toggle('sel',up);document.getElementById('logo_url').classList.toggle('sel',!up);document.getElementById('logoUpWrap').style.display=up?'block':'none';document.getElementById('f_logoUrl').style.display=up?'none':'block';},
  async logoFile(ev){const f=ev.target.files[0];if(!f)return;const url=await uploadArtwork(await readAsDataURL(f),'logo');Store.state.brand.logoUrl=url;Render.brand();dSave();UI.toast('Logo updated');},
  async portraitFile(ev){const f=ev.target.files[0];if(!f)return;const url=await uploadArtwork(await readAsDataURL(f),'portrait');Store.state.copy.aboutPortrait=url;document.getElementById('f_aboutPortrait').value=url;Render.copy();dSave();UI.toast('Portrait updated');},
  copy(){
    const c=Store.state.copy;
    c.heroEyebrow=this.v('f_heroEyebrow');c.heroTitle=this.v('f_heroTitle');c.heroLede=this.v('f_heroLede');
    c.aboutHeading=this.v('f_aboutHeading');c.aboutBy=this.v('f_aboutBy');c.aboutBody=this.v('f_aboutBody');c.aboutQuote=this.v('f_aboutQuote');
    const portrait=this.v('f_aboutPortrait');if(portrait)c.aboutPortrait=portrait;
    c.beliefs=this.v('f_beliefs');c.contactHeading=this.v('f_contactHeading');c.contactBody=this.v('f_contactBody');
    Render.copy();dSave();
  },
  contact(){
    const c=Store.state.contact;
    c.whatsapp=this.v('f_whatsapp').replace(/\D/g,'');c.phone=this.v('f_phone');c.sms=this.v('f_sms');c.email=this.v('f_email');
    c.instagram=this.v('f_instagram');c.tiktok=this.v('f_tiktok');c.facebook=this.v('f_facebook');c.twitter=this.v('f_twitter');
    c.pinterest=this.v('f_pinterest');c.youtube=this.v('f_youtube');c.blog=this.v('f_blog');c.linkedin=this.v('f_linkedin');c.currency=this.v('f_currency')||'KES';
    Render.contact();dSave();
  },
  payments(){const m=Store.state.payments.mpesa;m.shortcode=this.v('f_mp_shortcode');m.endpoint=this.v('f_mp_endpoint');m.account=this.v('f_mp_account');m.callback=this.v('f_mp_callback');dSave();Cart.syncPay();},
  analytics(){Store.state.analytics.gaId=this.v('f_gaId').trim();dSave();GA.init();},
  toggleDark(){const sw=document.getElementById('sw_dark');sw.classList.toggle('on');Store.state.theme.dark=sw.classList.contains('on');Render.theme();dSave();},
  toggleHaptics(){const sw=document.getElementById('sw_haptics');sw.classList.toggle('on');Store.state.layout.haptics=sw.classList.contains('on');dSave();},
  palette(key){
    const p=PALETTES[key],t=Store.state.theme;
    t.palette=key;t.accent=p.accent;t.accent2=p.accent2;t.bg1=p.bg1;t.bg2=p.bg2;t.bg3=p.bg3;t.dark=p.dark;
    document.getElementById('f_accent').value=p.accent;document.getElementById('sw_dark').classList.toggle('on',p.dark);
    Render.theme();Console.renderPalettes();dSave();UI.toast(p.label+' palette applied');UI.hap();
  },
  customAccent(hex){const t=Store.state.theme;t.accent=hex;t.palette='custom';t.accent2=this._shade(hex,-28);Render.theme();Console.renderPalettes();dSave();},
  _shade(hex,p){const n=parseInt(hex.slice(1),16);let r=(n>>16)+p,g=((n>>8)&255)+p,b=(n&255)+p;r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));return '#'+(r<<16|g<<8|b).toString(16).padStart(6,'0');},
  layout(kind,val){Store.state.layout[kind]=val;Render.theme();Console.renderLayout();dSave();UI.hap();if(kind==='bgMode'){document.body.dataset.bg=val;if(val==='stars')Physics.initStars();}}
};

const Settings={
  toggleMpesa(){const sw=document.getElementById('sw_mpesa');sw.classList.toggle('on');Store.state.payments.mpesa.enabled=sw.classList.contains('on');dSave();Cart.syncPay();}
};

/* ── IMAGES (compressed in the browser, stored in Supabase Storage) ── */
function readAsDataURL(file){return new Promise(function(resolve,reject){const r=new FileReader();r.onload=function(){resolve(r.result);};r.onerror=reject;r.readAsDataURL(file);});}
function compressImage(dataUrl,maxDim,quality){
  maxDim=maxDim||1000;quality=quality||0.78;
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
async function uploadArtwork(dataUrl,prefix){
  const small=await compressImage(dataUrl);
  const blob=await (await fetch(small)).blob();
  const path=(prefix||'art')+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,8)+'.jpg';
  const up=await sb.storage.from('artworks').upload(path,blob,{contentType:'image/jpeg',cacheControl:'31536000'});
  if(up.error)throw up.error;
  return sb.storage.from('artworks').getPublicUrl(path).data.publicUrl;
}

/* ── EDITOR (works and videos) ── */
const Editor={
  eid:null,kind:'artwork',imgs:[],
  openNew(kind){
    this.eid=null;this.kind=kind;this.imgs=[];
    document.getElementById('editorTitle').textContent=kind==='video'?'Add a video':'Add an artwork';
    document.getElementById('editorSub').textContent=kind==='video'?'Paste a YouTube / Vimeo link or direct mp4.':'Photos sell the piece — bright, square-ish images work best.';
    ['e_title','e_desc','e_price','e_dims','e_image','e_video','e_duration','e_vdate','e_vthumb'].forEach(function(id){document.getElementById(id).value='';});
    document.getElementById('e_cat').value='matwork';
    document.getElementById('editorErr').style.display='none';
    this._fields();this.imgMode('upload');this.renderPrev();UI.openOverlay('editorOverlay');
  },
  openEdit(id){
    const p=Store.products.find(function(x){return x.id===id;});if(!p)return;
    this.eid=id;this.kind=p.type||'artwork';this.imgs=p.images.slice();
    document.getElementById('editorTitle').textContent=this.kind==='video'?'Edit video':'Edit artwork';
    document.getElementById('e_title').value=p.title;document.getElementById('e_desc').value=p.desc;document.getElementById('e_price').value=p.price||'';
    document.getElementById('e_cat').value=p.category;document.getElementById('e_dims').value=p.dims;
    document.getElementById('e_video').value=p.video;document.getElementById('e_duration').value=p.duration;
    document.getElementById('e_vdate').value=p.vdate;document.getElementById('e_vthumb').value=p.vthumb;
    document.getElementById('editorErr').style.display='none';
    this._fields();this.imgMode('upload');this.renderPrev();UI.openOverlay('editorOverlay');
  },
  _fields(){const vid=(this.kind==='video');document.getElementById('e_vidBlock').style.display=vid?'block':'none';document.getElementById('e_imgBlock').style.display=vid?'none':'block';document.getElementById('e_dimsWrap').style.display=vid?'none':'block';},
  imgMode(m){const up=(m==='upload');document.getElementById('img_up').classList.toggle('sel',up);document.getElementById('img_url').classList.toggle('sel',!up);document.getElementById('imgUpWrap').style.display=up?'block':'none';document.getElementById('e_image').style.display=up?'none':'block';},
  async imgFiles(ev){
    const files=Array.from(ev.target.files);if(!files.length)return;
    if(files.some(function(f){return f.size>12*1024*1024;})){UI.toast('Image too large — max 12MB per image');return;}
    for(const f of files){this.imgs.push(await compressImage(await readAsDataURL(f)));}
    this.renderPrev();
  },
  imgFromUrl(){const u=document.getElementById('e_image').value.trim();if(u){this.imgs=[u].concat(this.imgs.filter(function(i){return i!==u;}));this.renderPrev();}},
  renderPrev(){document.getElementById('imgPreview').innerHTML=this.imgs.map(function(src,i){return '<img src="'+esc(src)+'" title="Tap to remove" onclick="Editor.dropImg('+i+')" loading="lazy">';}).join('');},
  dropImg(i){this.imgs.splice(i,1);this.renderPrev();},
  videoMeta(){const v=Media.parse(document.getElementById('e_video').value.trim());if(v.provider==='youtube'&&!document.getElementById('e_vthumb').value)document.getElementById('e_vthumb').value='https://img.youtube.com/vi/'+v.id+'/hqdefault.jpg';},
  async save(){
    const err=document.getElementById('editorErr');const btn=document.getElementById('editorSave');
    const fail=function(m){err.textContent=m;err.style.display='block';};
    if(!Auth.isAdmin){fail('Sign in as the studio owner first.');return;}
    const title=document.getElementById('e_title').value.trim();
    if(!title){fail('Give it a title.');return;}
    const base={title:title,desc:document.getElementById('e_desc').value.trim(),category:document.getElementById('e_cat').value};
    if(this.kind==='video'){
      const video=document.getElementById('e_video').value.trim();
      if(!video){fail('Add a video link.');return;}
      base.type='video';base.video=video;base.duration=document.getElementById('e_duration').value.trim();
      base.vdate=document.getElementById('e_vdate').value;base.vthumb=document.getElementById('e_vthumb').value.trim();base.price=0;base.images=[];
    }else{
      const price=Number(document.getElementById('e_price').value);
      if(!price||price<0){fail('Set a price.');return;}
      base.type='artwork';base.price=price;base.dims=document.getElementById('e_dims').value.trim();
      base.images=[];
    }
    btn.disabled=true;btn.textContent='Saving…';
    try{
      if(this.kind!=='video'){
        const out=[];
        for(const im of this.imgs){out.push(im.startsWith('data:')?await uploadArtwork(im,'art'):im);}
        base.images=out;
      }
      const row=toRow(base);
      const r=this.eid
        ?await sb.from('products').update(row).eq('id',this.eid)
        :await sb.from('products').insert(row);
      if(r.error)throw r.error;
      await Store.loadProducts();
      Gallery.apply();Console.renderProducts();Console.stats();
      UI.closeAll();UI.toast('✓ Saved: '+title);UI.hap([6,20,6]);
    }catch(e){
      console.warn('save work',e);
      fail('Could not save. Check your connection and try again.');
    }finally{btn.disabled=false;btn.textContent='Save work';}
  },
  async remove(id){
    const p=Store.products.find(function(x){return x.id===id;});
    if(!confirm('Delete "'+(p?p.title:'this work')+'"?\nThis cannot be undone.'))return;
    const r=await sb.from('products').delete().eq('id',id);
    if(r.error){UI.toast('Could not delete. Try again.');return;}
    await Store.loadProducts();
    Gallery.apply();Console.renderProducts();Console.stats();UI.toast('Work deleted');
  }
};

/* ── CONSOLE ── */
const Console={
  _unlockedAt:0,
  _timerInterval:null,
  async open(){
    const ok=await Auth.refresh();
    if(ok){this._show();return;}
    this.openLogin();
  },
  openLogin(){
    Auth.show('loginView');
    document.getElementById('loginOverlay').classList.add('show');
    document.getElementById('scrim').classList.add('show');
    UI.lockScroll();
    setTimeout(function(){const e=document.getElementById('loginEmail');if(e)e.focus();},100);
  },
  async _show(){
    if(this._unlockedAt&&Date.now()-this._unlockedAt>SESSION_MS){
      await sb.auth.signOut();Auth.isAdmin=false;this.openLogin();UI.toast('Session expired. Sign in again.');return;
    }
    this._unlockedAt=Date.now();
    this.populate();
    document.getElementById('console').classList.add('show');
    document.getElementById('scrim').classList.add('show');
    UI.lockScroll();UI.hap();
    await Store.loadProducts();await Store.loadOrders();
    this.renderProducts();this.stats();Orders.render();
    this._tickTimer();
  },
  _tickTimer(){
    clearInterval(this._timerInterval);
    const el=document.getElementById('consoleTimer');
    const self=this;
    const update=function(){
      const rem=SESSION_MS-(Date.now()-self._unlockedAt);
      if(rem<=0){clearInterval(self._timerInterval);self.close();if(sb)sb.auth.signOut();Auth.isAdmin=false;UI.toast('Session expired. Sign in again.');return;}
      el.textContent='Session expires in '+Math.ceil(rem/60000)+' min';
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
  go(tab){
    this.open();
    setTimeout(function(){const b=document.querySelector('.ctab[data-tab="'+tab+'"]');if(b)Console.tab(tab,b);},150);
  },
  tab(name,btn){
    document.querySelectorAll('.ctab').forEach(function(t){t.classList.remove('active');});
    document.querySelectorAll('.cpanel').forEach(function(p){p.classList.remove('active');});
    btn.classList.add('active');
    document.querySelector('.cpanel[data-panel="'+name+'"]').classList.add('active');
    if(name==='works')this.renderProducts();
    if(name==='orders')Orders.load();
    if(name==='theme')this.renderPalettes();
    if(name==='layout')this.renderLayout();
    if(name==='access')document.getElementById('accEmail').textContent=Auth.email;
  },
  populate(){
    const s=Store.state;
    function sv(id,v){const el=document.getElementById(id);if(el)el.value=v;}
    sv('f_brandName',s.brand.name);sv('f_brandTag',s.brand.tag);sv('f_logoUrl',s.brand.logoUrl);sv('f_logoLetter',s.brand.logoLetter);sv('f_footMark',s.brand.footMark);
    sv('f_heroEyebrow',s.copy.heroEyebrow);sv('f_heroTitle',s.copy.heroTitle);sv('f_heroLede',s.copy.heroLede);sv('f_aboutHeading',s.copy.aboutHeading);sv('f_aboutBy',s.copy.aboutBy);sv('f_aboutBody',s.copy.aboutBody);sv('f_aboutQuote',s.copy.aboutQuote);sv('f_aboutPortrait',s.copy.aboutPortrait);sv('f_beliefs',s.copy.beliefs);sv('f_contactHeading',s.copy.contactHeading);sv('f_contactBody',s.copy.contactBody);
    sv('f_whatsapp',s.contact.whatsapp);sv('f_phone',s.contact.phone);sv('f_sms',s.contact.sms||'');sv('f_email',s.contact.email);sv('f_instagram',s.contact.instagram);sv('f_tiktok',s.contact.tiktok);sv('f_facebook',s.contact.facebook);sv('f_twitter',s.contact.twitter);sv('f_pinterest',s.contact.pinterest);sv('f_youtube',s.contact.youtube);sv('f_blog',s.contact.blog);sv('f_linkedin',s.contact.linkedin);sv('f_currency',s.contact.currency);
    sv('f_accent',s.theme.accent);
    const m=s.payments.mpesa;sv('f_mp_shortcode',m.shortcode);sv('f_mp_endpoint',m.endpoint);sv('f_mp_account',m.account);sv('f_mp_callback',m.callback);
    sv('f_gaId',s.analytics.gaId);
    document.getElementById('sw_mpesa').classList.toggle('on',!!m.enabled);
    document.getElementById('sw_dark').classList.toggle('on',!!s.theme.dark);
    document.getElementById('sw_haptics').classList.toggle('on',!!s.layout.haptics);
    const av=document.getElementById('consoleAvatar');
    av.innerHTML=s.copy.aboutPortrait?'<img src="'+esc(s.copy.aboutPortrait)+'" style="width:100%;height:100%;object-fit:cover">':'<span style="color:#fff;font-size:1.1rem">👤</span>';
    this.renderPalettes();this.renderLayout();
  },
  stats(){
    const p=Store.products,o=Store.orders;
    document.getElementById('stWorks').textContent=p.length;
    document.getElementById('stLikes').textContent=p.reduce(function(a,x){return a+(x.likes||0);},0);
    document.getElementById('stViews').textContent=p.reduce(function(a,x){return a+(x.views||0);},0);
    document.getElementById('stOrders').textContent=o.length;
    document.getElementById('stPending').textContent=o.filter(function(x){return x.status==='pending';}).length;
    document.getElementById('stValue').textContent=Math.round(p.reduce(function(a,x){return a+Number(x.price||0);},0)/1000);
  },
  renderPalettes(){
    const cur=Store.state.theme.palette;
    document.getElementById('paletteSwatches').innerHTML=Object.entries(PALETTES).map(function(entry){
      const k=entry[0],v=entry[1];
      return '<div class="swatch'+(k===cur?' sel':'')+'" title="'+esc(v.label)+'" style="background:linear-gradient(135deg,'+v.accent+','+v.accent2+')" onclick="Edit.palette(\''+k+'\')"><span class="slb">'+esc(v.label)+'</span></div>';
    }).join('');
  },
  renderLayout(){
    const d=Store.state.layout;
    const svgGlass='<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#0D1F35"/><rect x="6" y="6" width="68" height="22" rx="4" fill="#162840" opacity=".9"/><rect x="6" y="32" width="40" height="5" rx="2" fill="#1E3A55"/><rect x="6" y="40" width="25" height="4" rx="2" fill="#152D48"/><rect x="54" y="38" width="20" height="8" rx="4" fill="#2B8CE6" opacity=".7"/></svg>';
    const svgSpatial='<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#0A1628"/><rect x="10" y="10" width="62" height="20" rx="4" fill="#162840" transform="rotate(-1 10 10)"/><rect x="7" y="8" width="62" height="20" rx="4" fill="#0D1E35" opacity=".5" transform="rotate(-2 7 8)"/><rect x="6" y="34" width="38" height="4" rx="2" fill="#1E3A55"/><rect x="6" y="41" width="22" height="3" rx="2" fill="#152D48"/></svg>';
    const svgNeural='<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#04080F"/><line x1="10" y1="12" x2="40" y2="28" stroke="#2B8CE6" stroke-width=".8" opacity=".4"/><line x1="40" y1="28" x2="68" y2="14" stroke="#2B8CE6" stroke-width=".8" opacity=".4"/><circle cx="10" cy="12" r="2.5" fill="#2B8CE6"/><circle cx="40" cy="28" r="3" fill="#00C8FF"/><circle cx="68" cy="14" r="2" fill="#2B8CE6"/></svg>';
    const views=[['glass',svgGlass,'Studio glass','frosted liquid'],['spatial',svgSpatial,'Spatial float','cards lift & drift'],['neural',svgNeural,'Neural space','dark, alive, neurons']];
    document.getElementById('viewOpts').innerHTML=views.map(function(v){return '<div class="opt'+(d.view===v[0]?' sel':'')+'" onclick="Views.set(\''+v[0]+'\')" style="display:flex;flex-direction:column;align-items:center;gap:6px">'+v[1]+'<div class="lname">'+esc(v[2])+'</div><div class="ldesc">'+esc(v[3])+'</div></div>';}).join('');
    const dens=[['standard','Standard','balanced grid'],['editorial','Editorial','big & airy'],['dense','Dense','more per row']];
    document.getElementById('densityOpts').innerHTML=dens.map(function(v){return '<div class="opt'+(d.density===v[0]?' sel':'')+'" onclick="Edit.layout(\'density\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
    const shapes=[['default','Soft','rounded glass'],['round','Pebble','extra round'],['sharp','Crisp','near-square']];
    document.getElementById('shapeOpts').innerHTML=shapes.map(function(v){return '<div class="opt'+(d.shape===v[0]?' sel':'')+'" onclick="Edit.layout(\'shape\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
    const bgs=[['caustic','Caustic','light waves'],['neural','Neural','live nodes'],['stars','Stars','twinkling sky'],['grid','Grid','precise lines'],['minimal','Minimal','clean flat'],['ink','Ink','soft gradient']];
    document.getElementById('bgOpts').innerHTML=bgs.map(function(v){return '<div class="opt'+(d.bgMode===v[0]?' sel':'')+'" onclick="Edit.layout(\'bgMode\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
    const trans=[['fade','Fade','clean dissolve'],['slideUp','Slide Up','sweeps upward'],['zoomOut','Zoom Out','pulls back'],['blurDissolve','Blur','melts away'],['splitH','Split','tears open']];
    document.getElementById('transitionOpts').innerHTML=trans.map(function(v){return '<div class="opt'+(d.introTransition===v[0]?' sel':'')+'" onclick="Edit.layout(\'introTransition\',\''+v[0]+'\')"><div class="lname">'+esc(v[1])+'</div><div class="ldesc">'+esc(v[2])+'</div></div>';}).join('');
  },
  renderProducts(){
    const wrap=document.getElementById('adminProducts');const p=Store.products;
    if(!p.length){wrap.innerHTML='<p style="text-align:center;color:var(--ink-soft);padding:20px">No works yet. Add your first piece above.</p>';return;}
    wrap.innerHTML=p.map(function(x){
      const isVid=x.type==='video';
      const tImg=isVid?Media.thumb(x):x.images[0];
      const thumb=tImg?'<div class="athumb"><img src="'+esc(tImg)+'" alt="" loading="lazy"></div>':'<div class="athumb">'+Render.glyph(isVid?'video':x.category)+'</div>';
      const sub=isVid?'Video · '+(x.duration||'—')+' · ❤ '+x.likes:Render.money(x.price)+' · '+x.category+' · ❤ '+x.likes;
      return '<div class="padmin">'+thumb+'<div class="pinfo"><h4>'+esc(x.title)+'</h4><small>'+esc(sub)+'</small></div><div class="pacts">'
        +'<button class="mini me" onclick="Editor.openEdit(\''+esc(x.id)+'\')" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>'
        +'<button class="mini md" onclick="Editor.remove(\''+esc(x.id)+'\')" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>'
        +'</div></div>';
    }).join('');
  }
};

/* ── GOOGLE ANALYTICS (only when an ID is set) ── */
const GA={
  ready:false,
  init(){
    const id=Store.state.analytics.gaId;
    if(!id||this.ready)return;
    const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};
    gtag('js',new Date());gtag('config',id);this.ready=true;
  },
  event(name,params){if(this.ready&&window.gtag)gtag('event',name,params||{});}
};

/* ── UI ── */
const UI={
  openOverlay(id){
    const el=document.getElementById(id);if(!el)return;
    el.classList.add('show');UI.lockScroll();
    setTimeout(function(){const first=el.querySelector('input,button,textarea,select');if(first)first.focus();},80);
  },
  closeAll(){
    document.querySelectorAll('.overlay').forEach(function(o){o.classList.remove('show');});
    document.getElementById('cart').classList.remove('show');
    document.getElementById('dMedia').innerHTML='';
    const picker=document.getElementById('orderPicker');if(picker)picker.remove();
    if(!document.getElementById('console').classList.contains('show'))document.getElementById('scrim').classList.remove('show');
    UI.unlockScroll();
  },
  lockScroll(){document.body.style.overflow='hidden';document.body.style.touchAction='none';},
  unlockScroll(){
    if(document.querySelector('.overlay.show,.console.show,.cart.show,#orderPicker'))return;
    document.body.style.overflow='';document.body.style.touchAction='';
  },
  hap(p){try{if(Store.state.layout.haptics&&navigator.vibrate)navigator.vibrate(p||10);}catch(e){}},
  toast(msg){
    const w=document.getElementById('toastWrap');if(!w)return;
    const t=document.createElement('div');t.className='toast';
    t.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>';
    t.appendChild(document.createTextNode(' '+msg));
    w.appendChild(t);
    setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove();},300);},2700);
  }
};

/* ── EFFECTS (unchanged visual system) ── */
const Physics={
  reduced:matchMedia('(prefers-reduced-motion:reduce)').matches,neuralOn:false,ripples:[],nodes:[],
  bindTilt(){
    if(this.reduced)return;
    document.querySelectorAll('.card').forEach(function(card){
      card.onpointermove=function(e){const r=card.getBoundingClientRect();const px=(e.clientX-r.left)/r.width-0.5,py=(e.clientY-r.top)/r.height-0.5;card.style.transform='perspective(900px) rotateY('+(px*8)+'deg) rotateX('+(-py*8)+'deg) translateY(-6px)';};
      card.onpointerleave=function(){card.style.transform='';};
    });
  },
  initRipple(){
    const cv=document.getElementById('rippleCanvas');const ctx=cv.getContext('2d');
    const fit=function(){cv.width=innerWidth;cv.height=innerHeight;};fit();addEventListener('resize',fit);
    const self=this;
    addEventListener('pointerdown',function(e){if(self.reduced)return;self.ripples.push({x:e.clientX,y:e.clientY,r:0,a:.5});});
    const loop=function(){
      if(document.hidden){requestAnimationFrame(loop);return;}
      ctx.clearRect(0,0,cv.width,cv.height);
      self.ripples=self.ripples.filter(function(rp){return rp.a>0.02;});
      const c=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#1fb6d6';
      self.ripples.forEach(function(rp){rp.r+=4;rp.a*=0.95;ctx.beginPath();ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2);ctx.strokeStyle=self._rgba(c,rp.a);ctx.lineWidth=2;ctx.stroke();});
      requestAnimationFrame(loop);
    };
    if(!this.reduced)loop();
  },
  rippleAt(el){if(this.reduced||!el)return;const r=el.getBoundingClientRect();this.ripples.push({x:r.left+r.width/2,y:r.top+r.height/2,r:0,a:.65});},
  _rgba(hex,a){const n=parseInt(hex.replace('#',''),16);return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';},
  initNeural(){
    const cv=document.getElementById('neuralCanvas');const ctx=cv.getContext('2d');let w,h;
    const fit=function(){w=cv.width=innerWidth;h=cv.height=innerHeight;};fit();addEventListener('resize',fit);
    const N=innerWidth<640?30:60;this.nodes=[];
    for(let i=0;i<N;i++)this.nodes.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+1});
    const mouse={x:-999,y:-999};addEventListener('pointermove',function(e){mouse.x=e.clientX;mouse.y=e.clientY;});
    const self=this;let _ca='',_ca2='',_frame=0;
    const loop=function(){
      requestAnimationFrame(loop);
      if(document.hidden||self.reduced||!self.neuralOn){if(!self.neuralOn)ctx.clearRect(0,0,w,h);return;}
      _frame++;
      if(_frame%60===0||!_ca){
        _ca=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#1fb6d6';
        _ca2=getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim()||'#0e7ea3';
      }
      ctx.clearRect(0,0,w,h);
      const ns=self.nodes;
      for(let i=0;i<ns.length;i++){const n=ns[i];n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>w)n.vx*=-1;if(n.y<0||n.y>h)n.vy*=-1;const dx=n.x-mouse.x,dy=n.y-mouse.y,d=Math.hypot(dx,dy);if(d<140&&d>0){n.x+=dx/d*.9;n.y+=dy/d*.9;}}
      for(let i=0;i<ns.length;i++){for(let j=i+1;j<ns.length;j++){const a=ns[i],b=ns[j];const dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=self._rgba(_ca,(1-dist/130)*.3);ctx.lineWidth=1;ctx.stroke();}}}
      for(let i=0;i<ns.length;i++){const n=ns[i];ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=self._rgba(_ca2,.85);ctx.shadowBlur=9;ctx.shadowColor=_ca;ctx.fill();ctx.shadowBlur=0;}
    };
    loop();
  },
  _starsRunning:false,
  initStars(){
    if(this._starsRunning)return;
    const cv=document.getElementById('neuralCanvas');const ctx=cv.getContext('2d');
    const stars=Array.from({length:180},function(){return{x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.3,a:Math.random(),speed:Math.random()*.4+.1};});
    this._starsRunning=true;
    const loop=function(){
      if(Store.state.layout.bgMode!=='stars'){Physics._starsRunning=false;return;}
      ctx.clearRect(0,0,cv.width,cv.height);
      stars.forEach(function(s){s.a+=s.speed*.008;const alpha=(Math.sin(s.a)+1)/2;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle='rgba(180,210,255,'+alpha*.9+')';ctx.fill();});
      requestAnimationFrame(loop);
    };
    cv.style.opacity='1';loop();
  }
};

/* ── ORDER PICKER (public) ── */
const Order={
  _opts:[],
  pick(id){
    const p=Store.products.find(function(x){return x.id===id;});if(!p)return;
    const c=Store.state.contact;const opts=[];
    if(c.whatsapp)opts.push({label:'WhatsApp',icon:'💬',fn:function(){Order._wa(p);}});
    if(c.phone)opts.push({label:'Call / SMS',icon:'📞',fn:function(){Order._sms(p);}});
    if(c.email)opts.push({label:'Email',icon:'✉',fn:function(){Order._email(p);}});
    Order._showPicker(p,opts);UI.hap();
  },
  _showPicker(p,opts){
    const old=document.getElementById('orderPicker');if(old)old.remove();
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
  _wa(p){
    const c=Store.state.contact;
    const msg='Hi Artsy Knots! I\'d like to order:\n\n• '+p.title+' — '+Render.money(p.price)+(p.dims?'\n  Size: '+p.dims:'')+'\n\nCould you help me complete this order?';
    window.open('https://wa.me/'+c.whatsapp+'?text='+encodeURIComponent(msg),'_blank');UI.toast('Opening WhatsApp…');
  },
  _sms(p){
    const c=Store.state.contact;const num=(c.sms||c.phone).replace(/\s/g,'');
    window.open('sms:'+num+'?body='+encodeURIComponent('Hi Artsy Knots! I\'d like to order: '+p.title+' — '+Render.money(p.price)));UI.toast('Opening SMS…');
  },
  _email(p){
    const c=Store.state.contact;
    const body='Hello,\n\nI would like to order:\n\n'+p.title+' — '+Render.money(p.price)+(p.dims?'\nSize: '+p.dims:'')+'\n\nPlease let me know the next steps.\n\nThank you.';
    window.open('mailto:'+c.email+'?subject='+encodeURIComponent('Order: '+p.title)+'&body='+encodeURIComponent(body));UI.toast('Opening email…');
  },
  call(){
    const phone=Store.state.contact.phone;
    if(!phone){UI.toast('Phone number not set in Socials tab.');return;}
    window.location.href='tel:'+phone.replace(/\s/g,'');UI.hap([10,30,10]);
  }
};

const Reveal={
  io:null,
  init(){this.io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');Reveal.io.unobserve(e.target);}});},{threshold:.12});this.scan();},
  scan(){if(!this.io)return;document.querySelectorAll('.reveal:not(.in)').forEach(function(el){Reveal.io.observe(el);});}
};

function initIntro(){
  const intro=document.getElementById('introScreen');if(!intro)return;
  const logo=document.getElementById('rotatingLogo');
  const b=Store.state.brand;
  if(b.logoUrl)logo.innerHTML='<img src="'+esc(b.logoUrl)+'" alt="'+esc(b.name)+'" style="width:100%;height:100%;object-fit:cover;border-radius:20px">';
  else logo.textContent=b.logoLetter||'A';
  document.getElementById('introText').innerHTML='<p class="welcome-text">Welcome into my world<br>by '+esc(b.name)+'\'s thoughts,<br>creativity, and perception<br>of the world.</p>';
  const cls='intro-out-'+(Store.state.layout.introTransition||'fade');
  setTimeout(function(){intro.classList.add(cls);},5200);
  setTimeout(function(){intro.style.display='none';},5900);
}

/* ── EVENTS ── */
document.getElementById('consoleTabs').addEventListener('click',function(e){const b=e.target.closest('.ctab');if(b)Console.tab(b.dataset.tab,b);});
document.addEventListener('click',function(e){if(!e.target.closest('.sort-menu')){const sp=document.getElementById('sortPop');if(sp)sp.classList.remove('show');}});
document.addEventListener('keydown',function(e){if(e.key==='Escape')UI.closeAll();});
let lastY=0;
addEventListener('scroll',function(){const y=scrollY;const bar=document.getElementById('topbar');if(bar)bar.style.transform=(y>lastY&&y>200)?'translateX(-50%) translateY(-130%)':'translateX(-50%)';lastY=y;});

/* Live updates: other devices' changes appear here (needs replication enabled) */
function subscribeLive(){
  if(!sb||!sb.channel)return;
  sb.channel('studio-live')
    .on('postgres_changes',{event:'*',schema:'public',table:'products'},function(){Store.refresh();})
    .on('postgres_changes',{event:'*',schema:'public',table:'comments'},function(){Store.refresh();})
    .on('postgres_changes',{event:'*',schema:'public',table:'site_settings'},function(){Store.refresh();})
    .subscribe();
}

/* ── BOOT ── */
async function boot(){
  try{
    if(navigator.hardwareConcurrency<=2)document.body.dataset.lowperf='true';
  }catch(e){}
  try{
    Cart.restore();Cart.bump();
  }catch(e){}
  Render.all();
  Reveal.init();
  Physics.initRipple();
  Physics.initNeural();

  /* Load settings first so the intro shows the studio's own name and logo (1.2s cap) */
  await Promise.race([Store.loadSettings(),new Promise(function(r){setTimeout(r,1200);})]);
  initIntro();
  Render.all();
  if(Store.state.layout.bgMode==='stars')Physics.initStars();
  Physics.neuralOn=(Store.state.layout.view!=='glass');
  GA.init();

  await Store.loadProducts();
  Gallery.apply();
  Console.stats();

  await Auth.refresh();
  subscribeLive();

  /* Password reset links land here */
  if(sb){
    sb.auth.onAuthStateChange(function(event){
      if(event==='PASSWORD_RECOVERY'){Auth.recovering=true;Console.openLogin();Auth.show('newPassView');}
      if(event==='SIGNED_OUT'){Auth.isAdmin=false;Auth.email='';}
    });
  }
  if(location.hash.indexOf('type=recovery')>=0){Auth.recovering=true;Console.openLogin();Auth.show('newPassView');}

  document.addEventListener('visibilitychange',function(){if(!document.hidden)Store.refresh();});
}

document.addEventListener('DOMContentLoaded',boot);
