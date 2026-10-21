/* ═══════════════════════════════════════════════════════════════
   ARTSY KNOTS · v6 · batch 1 · Supabase
   Source of truth: Supabase. Security lives in Row Level Security.
   ═══════════════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://aqfmoiehacstnpcskqlx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_GYPOvggow6kpE0d5Dm9xwQ_9I2L7Rgj';
const sb = (window.supabase && window.supabase.createClient) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const DEV = { wa: '254704708178', phone: '+254704708178', email: 'gitongalewis190@icloud.com' };
const CACHE_KEY = 'ak.cache.v6', SPLASH_MS = 5000, RING = 138.23, DAY = 86400000, TRASH_DAYS = 30;
const IS_IOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

/* ── ICONS (one consistent, modern line set) ── */
const ICONS = {
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  message: '<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z"/>',
  play: '<path d="M6 4l14 8-14 8Z"/>',
  cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  restore: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M19 17l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z"/>',
  layers: '<path d="M12 2 2 7l10 5 10-5Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  gem: '<path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6M2 9h20"/>',
  palette: '<path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4c3 0 5.6-2.4 5.6-5.6C23 6 18 2 12 2Z"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  restore2: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/>'
};
function ic(name, size, filled) {
  size = size || 16;
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + (filled ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
}

/* ── HELPERS ── */
function $(id) { return document.getElementById(id); }
function val(id) { const el = $(id); return el ? el.value : ''; }
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;'); }
function digits(s) { return String(s || '').replace(/\D/g, ''); }
function enc(s) { return encodeURIComponent(s); }
function norm(s) { return String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
function fillTpl(tpl, vars) {
  return String(tpl || '').replace(/\{(\w+)\}/g, function (m, k) {
    return (vars[k] != null && String(vars[k]).trim() !== '') ? vars[k] : '—';
  });
}
function makeRef() { return 'AK' + Math.random().toString(36).slice(2, 8).toUpperCase(); }
function getLiked() { try { return JSON.parse(localStorage.getItem('ak.liked') || '[]'); } catch (e) { return []; } }
function setLiked(list) { try { localStorage.setItem('ak.liked', JSON.stringify(list)); } catch (e) {} }
function togglePw(btn) {
  const inp = btn.parentElement.querySelector('input'); if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.classList.toggle('reveal', inp.type === 'text');
  btn.setAttribute('aria-label', inp.type === 'text' ? 'Hide password' : 'Show password');
}
function readAsDataURL(file) {
  return new Promise(function (resolve, reject) {
    const r = new FileReader(); r.onload = function () { resolve(r.result); }; r.onerror = reject; r.readAsDataURL(file);
  });
}
function compressImage(dataUrl, maxDim, quality) {
  maxDim = maxDim || 1000; quality = quality || 0.78;
  return new Promise(function (resolve) {
    const img = new Image();
    img.onload = function () {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.width * scale)); c.height = Math.max(1, Math.round(img.height * scale));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL('image/jpeg', quality));
    };
    img.onerror = function () { resolve(dataUrl); };
    img.src = dataUrl;
  });
}
/* Uploads a JPEG blob to the artworks bucket and reports real byte progress */
async function uploadFile(blob, prefix, onPct) {
  const sess = await sb.auth.getSession();
  const token = (sess.data && sess.data.session) ? sess.data.session.access_token : SUPABASE_KEY;
  const path = prefix + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.jpg';
  await new Promise(function (resolve, reject) {
    const x = new XMLHttpRequest();
    x.open('POST', SUPABASE_URL + '/storage/v1/object/artworks/' + path);
    x.setRequestHeader('apikey', SUPABASE_KEY);
    x.setRequestHeader('Authorization', 'Bearer ' + token);
    x.setRequestHeader('x-upsert', 'false');
    x.setRequestHeader('cache-control', 'max-age=31536000');
    x.setRequestHeader('content-type', 'image/jpeg');
    x.upload.onprogress = function (e) { if (e.lengthComputable && onPct) onPct(e.loaded / e.total); };
    x.onload = function () { (x.status >= 200 && x.status < 300) ? resolve() : reject(new Error('upload ' + x.status)); };
    x.onerror = function () { reject(new Error('network')); };
    x.send(blob);
  });
  if (onPct) onPct(1);
  return SUPABASE_URL + '/storage/v1/object/public/artworks/' + path;
}
/* Opens a link from inside a tap, so phones don't block the new tab */
function linkOpen(url) {
  const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
}

/* ── FX STYLES (injected; styles.css is untouched) ── */
(function injectCSS() {
  const css = `
  .ak-press{animation:akPress .38s cubic-bezier(.2,.7,.3,1)}
  @keyframes akPress{0%{transform:scale(1)}40%{transform:scale(.94)}100%{transform:scale(1)}}
  .ak-jump{animation:akJump .65s cubic-bezier(.3,.7,.3,1);transform-origin:center;transform-box:fill-box}
  @keyframes akJump{0%{transform:translateX(0) scale(1)}18%{transform:translateX(-7px) rotate(-14deg) scale(1.22)}36%{transform:translateX(7px) rotate(14deg) scale(1.22)}54%{transform:translateX(-4px) rotate(-7deg) scale(1.08)}72%{transform:translateX(3px) rotate(4deg)}100%{transform:translateX(0) rotate(0) scale(1)}}
  body.studio-open #caustics,body.studio-open #waterField{animation-play-state:paused!important}
  body.studio-open #rippleCanvas{opacity:0!important}
  .console-body,.cart-items,.guide-results{overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
  .ring{flex-shrink:0;transform:rotate(-90deg)}
  .ring-bg{fill:none;stroke:var(--glass-stroke-soft);stroke-width:4}
  .ring-fg{fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset .35s ease}
  .busy{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);left:50%;transform:translate(-50%,-180%);z-index:4000;display:flex;align-items:center;gap:10px;padding:6px 18px 6px 6px;border-radius:999px;background:var(--glass-fill-strong);backdrop-filter:blur(var(--blur));-webkit-backdrop-filter:blur(var(--blur));border:1px solid var(--glass-stroke);box-shadow:var(--glass-shadow);color:var(--ink);transition:transform .45s cubic-bezier(.2,.8,.2,1)}
  .busy.show{transform:translate(-50%,0)}
  .busy-txt{display:grid;line-height:1.15}
  .busy-txt b{font:700 .95rem var(--sans)}
  .busy-txt span{font-size:.74rem;color:var(--ink-soft)}
  .upprog{display:flex;align-items:center;gap:12px;margin:6px 0 12px;color:var(--ink)}
  .upprog b{font:700 1.1rem var(--sans);display:block}
  .upprog span{font-size:.82rem;color:var(--ink-soft)}
  .splash{position:fixed;inset:0;z-index:3500;display:none;align-items:center;justify-content:center;background:radial-gradient(120% 120% at 15% 10%,var(--bg-3) 0%,var(--bg-1) 45%,var(--bg-2) 100%)}
  .splash.show{display:flex;animation:akFade .35s ease}
  @keyframes akFade{from{opacity:0}to{opacity:1}}
  .splash-card{width:min(330px,88vw);text-align:center;padding:30px 24px;border-radius:var(--radius);background:var(--glass-fill-strong);backdrop-filter:blur(var(--blur));-webkit-backdrop-filter:blur(var(--blur));border:1px solid var(--glass-stroke);box-shadow:var(--glass-shadow)}
  .splash-mark{width:64px;height:64px;margin:0 auto 14px;border-radius:20px;display:grid;place-items:center;background:var(--accent);color:#fff;font:600 1.6rem var(--serif);animation:akPulse 1.6s ease-in-out infinite}
  @keyframes akPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
  .splash-title{font:600 1.15rem var(--serif);color:var(--ink)}
  .splash-step{font-size:.86rem;color:var(--ink-soft);margin-top:6px;min-height:1.2em}
  .splash-bar{height:6px;border-radius:99px;background:var(--glass-stroke-soft);overflow:hidden;margin-top:18px}
  .splash-bar i{display:block;height:100%;width:0;background:var(--accent);border-radius:99px}
  .guide-fab{position:fixed;left:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 16px);z-index:1500;width:52px;height:52px;border-radius:50%;display:none;place-items:center;border:1px solid var(--glass-stroke);background:var(--glass-fill-strong);backdrop-filter:blur(var(--blur));-webkit-backdrop-filter:blur(var(--blur));color:var(--ink);box-shadow:var(--glass-shadow);cursor:pointer}
  .guide-fab.show{display:grid}
  .guide-hint{position:fixed;left:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 78px);z-index:1500;max-width:280px;display:none;align-items:center;gap:10px;padding:10px 12px;border-radius:16px;background:var(--glass-fill-strong);backdrop-filter:blur(var(--blur));-webkit-backdrop-filter:blur(var(--blur));border:1px solid var(--glass-stroke);box-shadow:var(--glass-shadow);color:var(--ink);font-size:.86rem}
  .guide-hint.show{display:flex;animation:akPop .45s cubic-bezier(.2,.9,.3,1.2)}
  .guide-hint button{background:none;border:0;color:var(--ink-soft);font-size:1.1rem;cursor:pointer}
  @keyframes akPop{from{opacity:0;transform:translateY(10px) scale(.92)}to{opacity:1;transform:none}}
  .guide-panel{position:fixed;left:0;right:0;bottom:0;z-index:1600;max-height:80vh;display:none;flex-direction:column;border-radius:24px 24px 0 0;background:var(--bg-3);padding:16px 16px calc(env(safe-area-inset-bottom,0px) + 16px);box-shadow:var(--glass-shadow);border-top:1px solid var(--glass-stroke)}
  .guide-panel.show{display:flex;animation:akUp .38s cubic-bezier(.2,.8,.2,1)}
  @keyframes akUp{from{transform:translateY(100%)}to{transform:none}}
  .guide-head{display:flex;align-items:center;gap:10px}
  .guide-title{font:600 1.05rem var(--serif);color:var(--ink);flex:1}
  .guide-search{margin-top:12px}
  .guide-results{overflow:auto;margin-top:12px;display:grid;gap:10px;padding-bottom:6px}
  .g-item{padding:12px 14px;border-radius:16px;background:var(--glass-fill);border:1px solid var(--glass-stroke-soft);color:var(--ink)}
  .g-item h4{font:600 .95rem var(--sans);margin-bottom:4px}
  .g-item p{font-size:.86rem;color:var(--ink-soft);line-height:1.5}
  .g-item .cbtn{margin-top:8px}
  .g-tag{display:inline-block;font-size:.7rem;letter-spacing:.04em;text-transform:uppercase;color:var(--accent);margin-bottom:4px}
  .req{color:#e11d48;margin-left:2px}
  .wiz-top{display:flex;justify-content:space-between;align-items:center;font-size:.8rem;color:var(--ink-soft);margin-bottom:6px}
  .wiz-dots{display:flex;gap:6px}
  .wiz-dots i{width:8px;height:8px;border-radius:50%;background:var(--glass-stroke-soft)}
  .wiz-dots i.on{background:var(--accent)}
  .wiz-nav{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
  .genre-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
  .genre-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 6px 6px 12px;border-radius:999px;background:var(--glass-fill-strong);border:1px solid var(--glass-stroke);color:var(--ink);font-size:.86rem}
  .genre-chip button{width:24px;height:24px;border-radius:50%;border:0;background:var(--glass-fill);color:var(--ink-soft);display:grid;place-items:center;cursor:pointer}
  .genre-add{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center}
  .kicker-s{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin:14px 0 8px}
  .insights{display:grid;gap:6px;margin-bottom:14px}
  .insight{display:flex;justify-content:space-between;gap:8px;font-size:.88rem;color:var(--ink);padding:8px 12px;border-radius:12px;background:var(--glass-fill);border:1px solid var(--glass-stroke-soft)}
  .insight b{color:var(--accent)}
  .cart-empty{text-align:center;color:var(--ink-soft);padding:40px 0;display:grid;justify-items:center;gap:8px}
  .cart-rm{width:30px;height:30px;border-radius:50%;border:0;background:var(--glass-fill);color:var(--ink-soft);display:grid;place-items:center;cursor:pointer;flex-shrink:0}
  .citem{align-items:center}
  .skel{height:260px;border-radius:var(--radius);background:linear-gradient(90deg,var(--glass-fill) 25%,var(--glass-fill-strong) 50%,var(--glass-fill) 75%);background-size:200% 100%;animation:akShim 1.2s linear infinite}
  @keyframes akShim{to{background-position:-200% 0}}
  .dev-line{font-size:.78rem;color:var(--ink-soft);margin-top:10px;line-height:1.6}
  .dev-line a{color:var(--accent);text-decoration:none;font-weight:600}
  .opt .lname svg{vertical-align:-3px;margin-right:4px}
  .seg{flex-wrap:wrap}
  `;
  const s = document.createElement('style'); s.id = 'ak-fx'; s.textContent = css; document.head.appendChild(s);
})();

/* ── DEFAULTS (studio settings only; no sample works) ── */
const DEFAULTS = {
  brand: { name: 'Artsy Knots', tag: 'handmade studio', logoUrl: '', logoLetter: 'A', footMark: 'Artsy Knots' },
  theme: { palette: 'amethyst', dark: false, accent: '#8b5cf6', accent2: '#6d28d9', bg1: '#f1ebff', bg2: '#e0d2ff', bg3: '#faf7ff' },
  layout: { fx: true, locOn: true, locLabel: 'Nairobi, Kenya', locUrl: '', guideOn: true, view: 'glass', density: 'standard', shape: 'default', haptics: true, bgMode: 'caustic', introTransition: 'fade' },
  copy: {
    heroEyebrow: 'Handmade in Nairobi · one of a kind',
    heroTitle: 'Texture you can *feel*, art you can hold.',
    heroLede: 'Hand-knotted mats, tufted rugs, canvas works and resin pieces — each made slowly by Bernice Wairimu.',
    aboutHeading: 'Made by hand, on purpose.',
    aboutBy: 'Bernice Wairimu · Founder, Artsy Knots',
    aboutBody: 'Artsy Knots began with a simple stubbornness: the belief that something made slowly, by a real pair of hands, carries a feeling no machine can fake.\nTo me, art is a conversation — between colour and texture, between the maker and whoever the piece ends up living with. Every knot is a small argument for patience.\nCustom commissions are always welcome.',
    aboutQuote: 'When you love what you make, time disappears — and that’s how I end up working at 2am, unable to stop trying one more design.',
    aboutPortrait: '',
    beliefs: 'Creativity has no limits,Handmade is soulful,Every piece tells a story,Passion over perfection,Art heals',
    contactHeading: 'Let’s make something',
    contactBody: 'Commissions are open. Tell me the room, the colours, the feeling — and I’ll bring it into the world.'
  },
  contact: { whatsapp: '254706189808', phone: '+254 706 189 808', sms: '', email: '', instagram: 'bernicewairimu', tiktok: 'bernicewairimu706', facebook: '', twitter: '', pinterest: '', youtube: '', blog: '', linkedin: '', currency: 'KES' },
  payments: { mpesa: { enabled: false, shortcode: '', endpoint: '', account: 'ArtsyKnots', callback: '' } },
  analytics: { gaId: '' },
  checkout: {
    template: 'Hi {brand}! I’d like to order (Ref {ref}):\n\n{items}\n\nTotal: {total}\n\nName: {name}\nDeliver to: {address}\nPhone: {phone}\n\nCould we confirm the details?',
    commissionTemplate: 'Hi {brand}! I’d like to commission a piece.\n\nName: {name}\nContact: {contact}\nPiece: {piece}\nSize: {size}\nColours: {colours}\nWhere it will live: {place}\nFeeling: {mood}\nBudget: {budget}\nNeeded by: {needed}\nReference: {reference}\nDetails: {details}\n\nCould we talk?'
  }
};

const PALETTES = {
  amethyst: { accent: '#8b5cf6', accent2: '#6d28d9', bg1: '#f1ebff', bg2: '#e0d2ff', bg3: '#faf7ff', label: 'Amethyst (default)', dark: false },
  lagoon: { accent: '#1fb6d6', accent2: '#0e7ea3', bg1: '#dff3fa', bg2: '#bfe9f5', bg3: '#eafaff', label: 'Lagoon', dark: false },
  reef: { accent: '#11b3a3', accent2: '#0a7d72', bg1: '#d6f5ee', bg2: '#b3ebdf', bg3: '#e8fbf6', label: 'Reef', dark: false },
  shell: { accent: '#e88ab6', accent2: '#bd5a8b', bg1: '#fbe6f1', bg2: '#f6cce0', bg3: '#fff0f7', label: 'Shell', dark: false },
  meadow: { accent: '#3fb56b', accent2: '#1f7d43', bg1: '#eafaf0', bg2: '#d2f1dd', bg3: '#f3fcf6', label: 'White/Green', dark: false },
  savanna: { accent: '#d99a3c', accent2: '#a96d1c', bg1: '#fbf3e3', bg2: '#f4e2c2', bg3: '#fff9ef', label: 'Savanna', dark: false },
  obsidian: { accent: '#a855f7', accent2: '#6d28d9', bg1: '#0c0617', bg2: '#160a2b', bg3: '#07040f', label: 'Black/Purple', dark: true },
  void: { accent: '#3b82f6', accent2: '#1e40af', bg1: '#050a1a', bg2: '#0a1430', bg3: '#03060f', label: 'Black/Blue', dark: true },
  nebula: { accent: '#8b5cf6', accent2: '#2563eb', bg1: '#0b0820', bg2: '#141038', bg3: '#070514', label: 'Nebula', dark: true },
  matrix: { accent: '#22e07a', accent2: '#0f9d52', bg1: '#04130c', bg2: '#082016', bg3: '#020a06', label: 'Black/Green', dark: true },
  aurora: { accent: '#2dd4bf', accent2: '#3b82f6', bg1: '#06121a', bg2: '#0a1f2e', bg3: '#040b12', label: 'Aurora', dark: true }
};

/* ── TOASTS: one at a time, each readable for its full time ── */
const Toasts = {
  q: [], busy: false,
  push(msg) {
    if (!msg) return;
    this.q.push(msg);
    if (!this.busy) this.next();
  },
  next() {
    const msg = this.q.shift();
    if (!msg) { this.busy = false; return; }
    this.busy = true;
    const w = $('toastWrap'); w.innerHTML = '';
    const t = document.createElement('div'); t.className = 'toast';
    t.innerHTML = ic('check', 14) + ' ';
    t.appendChild(document.createTextNode(msg));
    w.appendChild(t);
    const hold = Math.max(2600, Math.min(5200, msg.length * 55));
    setTimeout(function () {
      t.classList.add('out');
      setTimeout(function () { Toasts.next(); }, 300);
    }, hold);
  }
};

/* ── BUSY: progress for loading, saving and uploading ── */
const Busy = {
  start(lbl) { $('busy').classList.add('show'); this.set(0, lbl || 'Working…'); },
  set(p, lbl) {
    p = Math.max(0, Math.min(100, p));
    $('busyPct').textContent = Math.round(p) + '%';
    $('busyFill').style.strokeDashoffset = RING * (1 - p / 100);
    if (lbl) $('busyLbl').textContent = lbl;
  },
  end() {
    this.set(100, 'Done');
    setTimeout(function () { $('busy').classList.remove('show'); }, 450);
  }
};

/* ── PROGRESS RING (inside the work editor) ── */
const Progress = {
  show() { $('upProg').style.display = 'flex'; this.set(0, 'Preparing…'); },
  hide() { $('upProg').style.display = 'none'; },
  set(p, lbl) {
    p = Math.max(0, Math.min(100, p));
    $('upPct').textContent = Math.round(p) + '%';
    $('upRing').style.strokeDashoffset = RING * (1 - p / 100);
    if (lbl) $('upLbl').textContent = lbl;
  }
};

/* ── ROW MAPPING ── */
function fromRow(r, comments) {
  return {
    id: r.id, type: r.type, title: r.title, desc: r.description || '', price: Number(r.price) || 0,
    category: r.category || 'matwork', dims: r.dims || '', images: r.images || [],
    video: r.video_url || '', duration: r.duration || '', vdate: r.video_date || '', vthumb: r.video_thumb || '',
    likes: r.likes || 0, views: r.views || 0, createdAt: Date.parse(r.created_at) || 0, tag: r.tag || '', tagText: r.tag_text || '', comments: comments || []
  };
}
function toRow(p) {
  return {
    type: p.type, title: p.title, description: p.desc || '', price: p.type === 'video' ? 0 : (Number(p.price) || 0),
    category: p.category || 'matwork', dims: p.dims || '', images: p.images || [],
    video_url: p.video || '', duration: p.duration || '', video_date: p.vdate || null, video_thumb: p.vthumb || '', tag: p.tag || null, tag_text: p.tagText || ''
  };
}

/* ── STORE ── */
const Store = {
  state: structuredClone(DEFAULTS),
  products: [], categories: [], orders: [], commissions: [], trash: [],
  _pending: false, _rt: null,
  _mg(d, s) {
    const o = structuredClone(d);
    for (const k in s) {
      if (s[k] && typeof s[k] === 'object' && !Array.isArray(s[k])) o[k] = this._mg(d[k] || {}, s[k]);
      else o[k] = s[k];
    }
    return o;
  },
  readCache() {
    try { const c = JSON.parse(localStorage.getItem(CACHE_KEY)); if (c) this.state = this._mg(DEFAULTS, c); } catch (e) {}
  },
  async loadSettings() {
    if (!sb) return;
    const r = await sb.from('site_settings').select('value').eq('key', 'site').maybeSingle();
    if (r.error || !r.data) return;
    this.state = this._mg(DEFAULTS, r.data.value);
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(this.state)); } catch (e) {}
  },
  async saveSettings() {
    if (!sb || !Auth.isAdmin) return;
    Busy.start('Saving changes…');
    const r = await sb.from('site_settings').upsert({ key: 'site', value: this.state, updated_at: new Date().toISOString() });
    if (r.error) { Busy.end(); Toasts.push('Could not save. Check your connection.'); return; }
    this._pending = false;
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(this.state)); } catch (e) {}
    Busy.end();
  },
  async loadCategories() {
    if (!sb) return;
    const r = await sb.from('categories').select('*').order('sort_order', { ascending: true });
    if (!r.error) this.categories = (r.data || []).map(function (c) { return { slug: c.slug, label: c.label, sort: c.sort_order }; });
  },
  async loadProducts() {
    if (!sb) return;
    const [p, c] = await Promise.all([
      sb.from('products').select('*').is('deleted_at', null).is('reset_batch', null).order('created_at', { ascending: false }),
      sb.from('comments').select('*').order('created_at', { ascending: true })
    ]);
    if (p.error) { console.warn('products', p.error); return; }
    const by = {};
    ((c.data) || []).forEach(function (r) { (by[r.product_id] = by[r.product_id] || []).push({ name: r.name, text: r.body, ts: Date.parse(r.created_at) || 0 }); });
    this.products = (p.data || []).map(function (r) { return fromRow(r, by[r.id]); });
  },
  async loadAdminData() {
    if (!sb || !Auth.isAdmin) return;
    const [o, c] = await Promise.all([
      sb.from('orders').select('*').order('created_at', { ascending: false }),
      sb.from('commissions').select('*').order('created_at', { ascending: false })
    ]);
    if (!o.error) this.orders = (o.data || []).map(function (r) {
      return { id: r.id, status: r.status, channel: r.channel, method: r.method || r.channel, phone: r.phone || '', name: r.customer_name || '', address: r.customer_address || '', message: r.message || '', items: r.items || [], total: Number(r.total) || 0, createdAt: Date.parse(r.created_at) || 0 };
    });
    if (!c.error) this.commissions = (c.data || []).map(function (r) {
      return { id: r.id, name: r.name, contact: r.contact, method: r.preferred_method, piece: r.piece, size: r.size, colours: r.colours, place: r.place, mood: r.mood, budget: r.budget, needed: r.needed_by || '', reference: r.reference_url, details: r.details, status: r.status, createdAt: Date.parse(r.created_at) || 0 };
    });
  },
  async loadTrash() {
    if (!sb || !Auth.isAdmin) return;
    const r = await sb.from('products').select('id,title,category,deleted_at,price,images').not('deleted_at', 'is', null).order('deleted_at', { ascending: false });
    if (!r.error) this.trash = r.data || [];
  },
  /* Background refresh when someone else changes something */
  refresh() {
    clearTimeout(this._rt);
    this._rt = setTimeout(async function () {
      if (!Store._pending) await Store.loadSettings();
      await Promise.all([Store.loadProducts(), Store.loadCategories()]);
      if (Auth.isAdmin) await Store.loadAdminData();
      Render.all();
      Console.stats();
      if ($('console').classList.contains('show')) Console.renderAll();
    }, 400);
  },
  exportData() {
    const out = { exportedAt: new Date().toISOString(), settings: this.state, products: this.products, orders: this.orders, commissions: this.commissions };
    const b = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'artsy-knots-backup.json'; a.click();
    Toasts.push('Backup downloaded'); UI.hap();
  }
};

/* ── SPLASH: five seconds while data loads in the background ── */
const Splash = {
  steps: ['Verifying access', 'Loading your works', 'Loading orders & commissions', 'Opening your studio'],
  run(task) {
    return new Promise(function (resolve) {
      const el = $('splash'), fill = $('splashFill'), stepEl = $('splashStep');
      el.classList.add('show');
      fill.style.transition = 'none'; fill.style.width = '0%';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          fill.style.transition = 'width ' + SPLASH_MS + 'ms linear'; fill.style.width = '100%';
        });
      });
      let i = 0; stepEl.textContent = Splash.steps[0];
      const tick = setInterval(function () {
        i = Math.min(i + 1, Splash.steps.length - 1); stepEl.textContent = Splash.steps[i];
      }, SPLASH_MS / Splash.steps.length);
      const minWait = new Promise(function (r) { setTimeout(r, SPLASH_MS); });
      Promise.all([Promise.resolve().then(task).catch(function () { return null; }), minWait]).then(function (res) {
        clearInterval(tick);
        el.classList.remove('show');
        fill.style.transition = 'none'; fill.style.width = '0%';
        resolve(res[0]);
      });
    });
  }
};

/* ── AUTH ── */
const Auth = {
  isAdmin: false, email: '', recovering: false,
  async refresh() {
    this.isAdmin = false; this.email = '';
    if (!sb) return false;
    const s = await sb.auth.getSession();
    const session = s.data && s.data.session;
    if (!session) return false;
    this.email = session.user.email || '';
    const r = await sb.rpc('is_admin');
    this.isAdmin = !r.error && r.data === true;
    return this.isAdmin;
  },
  setErr(msg, ok, id) {
    const e = $(id || 'loginErr'); if (!e) return;
    e.textContent = msg || ''; e.style.display = msg ? 'block' : 'none';
    e.classList.toggle('ok', !!ok);
  },
  show(view) {
    ['loginView', 'resetView', 'newPassView'].forEach(function (id) { const el = $(id); if (el) el.style.display = (id === view) ? 'block' : 'none'; });
    const t = $('loginTitle');
    if (t) t.textContent = view === 'newPassView' ? 'Choose a new password' : view === 'resetView' ? 'Reset password' : 'Studio access';
    this.setErr('');
  },
  clearFields() {
    ['loginEmail', 'loginPass', 'resetEmail', 'newPass1', 'newPass2'].forEach(function (id) {
      const el = $(id); if (el) { el.value = ''; if (el.type === 'text') el.type = 'password'; }
    });
    document.querySelectorAll('#loginOverlay .pw-eye').forEach(function (b) { b.classList.remove('reveal'); });
    this.setErr('');
  },
  async login() {
    if (!sb) { this.setErr('Sign-in service did not load. Refresh and try again.'); return; }
    const email = val('loginEmail').trim(), pass = val('loginPass');
    if (!email || !pass) { this.setErr('Enter your email and password.'); return; }
    this.setErr('');
    const r = await sb.auth.signInWithPassword({ email: email, password: pass });
    if (r.error || !r.data || !r.data.session) { this.setErr('Password or email not recognised.'); return; }
    const ok = await Splash.run(async function () {
      const a = await Auth.refresh();
      if (a) await Promise.all([Store.loadProducts(), Store.loadCategories(), Store.loadAdminData()]);
      return a;
    });
    if (!ok) { await sb.auth.signOut(); this.isAdmin = false; this.setErr('This account does not have studio access.'); return; }
    this.pwOnly = false; this.clearFields(); UI.closeAll();
    Console.populate(); Console.present();
    Render.all(); Gallery.apply();
    Toasts.push('Welcome back ✨'); UI.hap();
  },
  async sendReset() {
    if (!sb) return;
    const email = val('resetEmail').trim();
    if (!email) { this.setErr('Enter the email on your account.'); return; }
    await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
    this.setErr('If that email has an account, a reset link is on its way. Check your inbox and spam.', true);
  },
  async completeRecovery() {
    const p1 = val('newPass1'), p2 = val('newPass2');
    if (p1.length < 10) { this.setErr('Use at least 10 characters.'); return; }
    if (p1 !== p2) { this.setErr('Passwords don\'t match.'); return; }
    const r = await sb.auth.updateUser({ password: p1 });
    if (r.error) { this.setErr('Could not save. Request a new reset link.'); return; }
    this.recovering = false;
    history.replaceState(null, '', location.pathname);
    await sb.auth.signOut();
    this.isAdmin = false; this.email = '';
    this.clearFields(); this.show('loginView');
    this.setErr('Password saved. Sign in with your new password.', true);
  },
  async changePassword() {
    const p1 = val('accPass1'), p2 = val('accPass2');
    if (p1.length < 10) { this.setErr('Use at least 10 characters.', false, 'accErr'); return; }
    if (p1 !== p2) { this.setErr('Passwords don\'t match.', false, 'accErr'); return; }
    const r = await sb.auth.updateUser({ password: p1 });
    if (r.error) { this.setErr('Could not save the new password. Try again.', false, 'accErr'); return; }
    $('accPass1').value = ''; $('accPass2').value = '';
    this.setErr('Password changed.', true, 'accErr');
    Toasts.push('Password changed');
  },
  async signOut() {
    if (sb) await sb.auth.signOut();
    this.isAdmin = false; this.email = '';
    Console.close();
    Render.all(); Gallery.apply();
    Toasts.push('Signed out of the studio');
  }
};

/* ── RENDER ── */
const Render = {
  cur() { return Store.state.contact.currency || 'KES'; },
  money(n) { return Number(n).toLocaleString() + ' ' + this.cur(); },
  label(slug) { const c = Store.categories.find(function (x) { return x.slug === slug; }); return c ? c.label : slug; },
  glyph(cat) {
    const map = { matwork: 'layers', canvas: 'image', resin: 'gem', commission: 'sparkles', video: 'play' };
    return ic(map[cat] || 'palette', 34);
  },
  all() { this.theme(); this.brand(); this.copy(); this.contact(); Gallery.apply(); const yr = $('year'); if (yr) yr.textContent = new Date().getFullYear(); },
  theme() {
    const t = Store.state.theme, l = Store.state.layout, r = document.documentElement.style;
    r.setProperty('--accent', t.accent); r.setProperty('--accent-2', t.accent2);
    r.setProperty('--bg-1', t.bg1); r.setProperty('--bg-2', t.bg2); r.setProperty('--bg-3', t.bg3);
    document.body.dataset.theme = t.dark ? 'dark' : 'light';
    document.body.dataset.density = l.density; document.body.dataset.shape = l.shape;
    document.body.dataset.view = l.view; document.body.dataset.bg = l.bgMode || 'caustic';
    $('themeColor').setAttribute('content', t.bg3);
    Views.syncFab();
  },
  brand() {
    const b = Store.state.brand;
    $('brandName').innerHTML = esc(b.name) + '<small id="brandTag">' + esc(b.tag) + '</small>';
    $('footMark').textContent = b.footMark || b.name;
    $('logoWrap').innerHTML = b.logoUrl ? '<img src="' + esc(b.logoUrl) + '" alt="' + esc(b.name) + '">' : '<span style="font-family:var(--serif);font-weight:600;color:#fff;font-size:1.2rem">' + esc(b.logoLetter || 'A') + '</span>';
    document.title = b.name + ' — Handmade Art by Bernice Wairimu';
    const portrait = Store.state.copy.aboutPortrait;
    $('ownerKey').innerHTML = portrait ? '<img src="' + esc(portrait) + '" alt="Studio owner" style="width:100%;height:100%;object-fit:cover;border-radius:50%">' : ic('user', 21);
  },
  copy() {
    const c = Store.state.copy;
    $('heroEyebrow').textContent = c.heroEyebrow;
    $('heroTitle').innerHTML = esc(c.heroTitle).replace(/\*(.+?)\*/g, '<em>$1</em>');
    $('heroLede').textContent = c.heroLede;
    $('aboutHeading').textContent = c.aboutHeading;
    $('aboutBy').textContent = c.aboutBy;
    $('aboutBody').innerHTML = c.aboutBody.split('\n').filter(Boolean).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    $('aboutQuote').textContent = '“' + c.aboutQuote.replace(/^[“"]/, '') + '”';
    $('aboutPortrait').innerHTML = c.aboutPortrait ? '<img src="' + esc(c.aboutPortrait) + '" alt="Bernice Wairimu">' : '<div style="width:100%;height:100%;display:grid;place-items:center;opacity:.5;color:#fff">' + ic('user', 48) + '</div>';
    $('beliefs').innerHTML = c.beliefs.split(',').map(function (b) { return '<span class="belief">' + esc(b.trim()) + '</span>'; }).join('');
    $('contactHeading').textContent = c.contactHeading;
    $('contactBody').textContent = c.contactBody;
  },
  contact() {
    const c = Store.state.contact, rows = [];
    if (c.phone) rows.push('<a class="contact-row" href="tel:' + esc(c.phone.replace(/\s/g, '')) + '">' + ic('phone', 16) + ' ' + esc(c.phone) + '</a>');
    if (c.email) rows.push('<a class="contact-row" href="mailto:' + esc(c.email) + '">' + ic('mail', 16) + ' ' + esc(c.email) + '</a>');
    if (c.whatsapp) rows.push('<a class="contact-row" href="https://wa.me/' + esc(c.whatsapp) + '?text=' + enc('Hi, I found you on Artsy Knots!') + '" target="_blank" rel="noopener">' + ic('message', 16) + ' WhatsApp the studio</a>');
    $('contactRows').innerHTML = rows.join('');
    function lnk(v, base) { return v ? (v.startsWith('http') ? v : base + v.replace('@', '')) : ''; }
    const S = [];
    const ig = lnk(c.instagram, 'https://instagram.com/'); if (ig) S.push(['Instagram', ig]);
    const tt = lnk(c.tiktok, 'https://tiktok.com/@'); if (tt) S.push(['TikTok', tt]);
    const fb = lnk(c.facebook, 'https://facebook.com/'); if (fb) S.push(['Facebook', fb]);
    const tw = lnk(c.twitter, 'https://x.com/'); if (tw) S.push(['X', tw]);
    const pin = lnk(c.pinterest, 'https://pinterest.com/'); if (pin) S.push(['Pinterest', pin]);
    const yt = lnk(c.youtube, 'https://youtube.com/@'); if (yt) S.push(['YouTube', yt]);
    const li = lnk(c.linkedin, 'https://linkedin.com/in/'); if (li) S.push(['LinkedIn', li]);
    $('socials').innerHTML = S.map(function (x) { return '<a class="social" href="' + esc(x[1]) + '" target="_blank" rel="noopener">' + esc(x[0]) + '</a>'; }).join('');
    const nb = $('navBlog');
    if (c.blog) { nb.href = c.blog.startsWith('http') ? c.blog : 'https://' + c.blog; nb.style.display = ''; }
    else nb.style.display = 'none';
  }
};

/* ── GALLERY ── */
const SORTS = [['new', 'Newest'], ['old', 'Oldest'], ['price-asc', 'Price: low → high'], ['price-desc', 'Price: high → low'], ['likes', 'Most liked'], ['views', 'Most viewed'], ['az', 'A → Z']];
const Gallery = {
  cat: 'all', sort: 'new', q: '',
  toggleSort(e) {
    e.stopPropagation();
    const pop = $('sortPop');
    if (!pop.innerHTML) pop.innerHTML = SORTS.map(function (s) { return '<button class="' + (s[0] === 'new' ? 'sel' : '') + '" data-s="' + s[0] + '" onclick="Gallery.setSort(\'' + s[0] + '\')">' + esc(s[1]) + '</button>'; }).join('');
    pop.classList.toggle('show');
  },
  setSort(k) {
    this.sort = k;
    const sf = SORTS.find(function (s) { return s[0] === k; }); if (sf) $('sortLabel').textContent = sf[1];
    document.querySelectorAll('#sortPop button').forEach(function (b) { b.classList.toggle('sel', b.dataset.s === k); });
    $('sortPop').classList.remove('show');
    this.apply(); UI.hap();
  },
  setCat(key, btn) {
    this.cat = key;
    document.querySelectorAll('#filters .chip').forEach(function (x) { x.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    this.apply(); UI.hap();
  },
  chip(key, label, count, active) {
    return '<button class="chip' + (active ? ' active' : '') + '" onclick="Gallery.setCat(\'' + esc(key) + '\',this)">' + esc(label) + (count != null ? '<span class="ct">' + count + '</span>' : '') + '</button>';
  },
  buildFilters() {
    const counts = {};
    Store.products.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });
    const cats = Store.categories.filter(function (c) { return counts[c.slug]; }).map(function (c) { return { slug: c.slug, label: c.label }; });
    Object.keys(counts).forEach(function (k) { if (!cats.find(function (c) { return c.slug === k; })) cats.push({ slug: k, label: k }); });
    const hasVid = Store.products.some(function (p) { return p.type === 'video'; });
    let h = this.chip('all', 'All works', Store.products.length, this.cat === 'all');
    cats.forEach(function (c) { h += Gallery.chip(c.slug, c.label, counts[c.slug], Gallery.cat === c.slug); });
    if (hasVid) h += this.chip('video', 'Videos', null, this.cat === 'video');
    h += this.chip('trending', 'Most liked', null, this.cat === 'trending');
    $('filters').innerHTML = h;
  },
  apply() {
    this.q = val('searchInput').trim().toLowerCase();
    this.buildFilters();
    let list = Store.products.slice();
    if (this.cat === 'video') list = list.filter(function (p) { return p.type === 'video'; });
    else if (this.cat === 'trending') list = list.slice().sort(function (a, b) { return b.likes - a.likes; }).slice(0, 8);
    else if (this.cat !== 'all') list = list.filter(function (p) { return p.category === Gallery.cat; });
    if (this.q) { const q = this.q; list = list.filter(function (p) { return (p.title + ' ' + p.desc + ' ' + p.dims + ' ' + Render.label(p.category)).toLowerCase().includes(q); }); }
    if (this.cat !== 'trending') list = this._sort(list);
    this.draw(list);
  },
  _sort(list) {
    const s = this.sort;
    return list.sort(function (a, b) {
      switch (s) {
        case 'old': return a.createdAt - b.createdAt;
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'likes': return b.likes - a.likes;
        case 'views': return b.views - a.views;
        case 'az': return a.title.localeCompare(b.title);
        default: return b.createdAt - a.createdAt;
      }
    });
  },
  skeleton() { $('galleryGrid').innerHTML = '<div class="skel"></div><div class="skel"></div><div class="skel"></div>'; },
  draw(items) {
    const grid = $('galleryGrid');
    if (!items.length) {
      grid.style.opacity = '1';
      grid.innerHTML = '<div class="empty">' + (Store.products.length ? 'No works match that yet. Try another search or genre.' : 'New works are on their way. Check back soon.') + '</div>';
      return;
    }
    const liked = getLiked();
    const html = items.map(function (p, i) {
      const isVid = p.type === 'video';
      const isLiked = liked.indexOf(p.id) >= 0;
      const thumb = isVid ? (p.vthumb || Media.thumb(p)) : (p.images[0] || '');
      const media = thumb ? '<img src="' + esc(thumb) + '" alt="' + esc(p.title) + '" loading="lazy" decoding="async" onerror="this.style.display=\'none\'">' : '<span class="glyph">' + Render.glyph(isVid ? 'video' : p.category) + '</span>';
      const play = isVid ? '<div class="play-badge"><div class="play-circle">' + ic('play', 20, true) + '</div></div>' + (p.duration ? '<span class="dur-badge">' + esc(p.duration) + '</span>' : '') : '';
      const fd = (5 + (i % 5) * 0.9).toFixed(1) + 's';
      const body = isVid
        ? '<div class="body"><div class="vid-meta-row"><span class="vid-provider">' + esc(Media.providerLabel(p.video)) + '</span>' + (p.vdate ? '<span class="vid-date">' + new Date(p.vdate).toLocaleDateString() + '</span>' : '') + '</div><h3 class="vid-title">' + esc(p.title) + '</h3><p class="vid-desc">' + esc(p.desc) + '</p><div class="vid-stats"><span>' + ic('heart', 13) + ' ' + p.likes + '</span><span>' + ic('eye', 13) + ' ' + p.views + '</span>' + (p.duration ? '<span>' + ic('clock', 13) + ' ' + esc(p.duration) + '</span>' : '') + '</div></div>'
        : '<div class="body"><h3>' + esc(p.title) + '</h3><p class="desc">' + esc(p.desc) + '</p>' + (p.dims ? '<div class="dims">' + esc(p.dims) + '</div>' : '') + '<div class="meta"><span class="price">' + Render.money(p.price) + '</span><span class="tag">' + esc(Render.label(p.category)) + '</span></div></div>';
      const actions = '<div class="actions" style="padding:0 22px 18px">'
        + '<button class="act act-like act-mini' + (isLiked ? ' liked' : '') + '" id="lb-' + p.id + '" onclick="event.stopPropagation();Gallery.like(\'' + p.id + '\')" aria-label="Like">' + ic('heart', 16, isLiked) + '</button>'
        + Gallery.cmtBtn(p)
        + (isVid
          ? '<button class="act act-cart" style="flex:1" onclick="event.stopPropagation();Detail.open(\'' + p.id + '\')">Watch</button>'
          : '<button class="act act-cart" style="flex:1" onclick="event.stopPropagation();Cart.add(\'' + p.id + '\')">Add to cart</button><button class="act act-order" style="flex:1" onclick="event.stopPropagation();Checkout.orderNow(\'' + p.id + '\')">Order now</button>')
        + '</div>';
      return '<article class="card" style="--fd:' + fd + '"' + (p.tag === 'sold' ? ' data-sold="1"' : '') + ' onclick="Detail.open(\'' + p.id + '\')"><div class="ph">' + media + play + Render.tag(p) + '<span class="like-pill">' + ic('heart', 14, isLiked) + ' <span id="lk-' + p.id + '">' + p.likes + '</span></span></div>' + body + actions + Gallery.cc(p) + '</article>';
    }).join('');
    const modalOpen = !!document.querySelector('.overlay.show');
    if (modalOpen) { grid.innerHTML = html; grid.style.opacity = '1'; Physics.bindTilt(); Reveal.scan(); return; }
    grid.style.opacity = '0';
    requestAnimationFrame(function () { grid.innerHTML = html; grid.style.transition = 'opacity .25s ease'; grid.style.opacity = '1'; Physics.bindTilt(); Reveal.scan(); });
  },
  async like(id) {
    const p = Store.products.find(function (x) { return x.id === id; }); if (!p) return;
    const liked = getLiked(), on = liked.indexOf(id) >= 0, delta = on ? -1 : 1;
    p.likes = Math.max(0, p.likes + delta);
    setLiked(on ? liked.filter(function (x) { return x !== id; }) : liked.concat(id));
    const btn = $('lb-' + id);
    if (btn) {
      btn.classList.toggle('liked', !on);
      const svg = btn.querySelector('svg');
      if (svg) {
        svg.setAttribute('fill', on ? 'none' : 'currentColor');
        svg.classList.remove('ak-jump'); void svg.getBoundingClientRect(); svg.classList.add('ak-jump');
      }
    }
    if (!on) { Physics.rippleAt(btn); UI.hap([8, 30, 8]); GA.event('like', { id: id }); Toasts.push('Liked ' + p.title); }
    if (sb) { const r = await sb.rpc('increment_likes', { pid: id, delta: delta }); if (!r.error && typeof r.data === 'number') p.likes = r.data; }
    const lk = $('lk-' + id); if (lk) lk.textContent = p.likes;
    Detail.refreshLikeButton();
    Console.stats();
  }
};

/* ── MEDIA ── */
const Media = {
  parse(url) {
    if (!url) return { provider: 'none' };
    let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/); if (m) return { provider: 'youtube', id: m[1] };
    m = url.match(/vimeo\.com\/(\d+)/); if (m) return { provider: 'vimeo', id: m[1] };
    m = url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/); if (m) return { provider: 'tiktok', id: m[1] };
    m = url.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/); if (m) return { provider: 'instagram', id: m[1] };
    if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)) return { provider: 'file', url: url };
    return { provider: 'link', url: url };
  },
  thumb(p) {
    if (p.vthumb) return p.vthumb;
    const v = this.parse(p.video);
    if (v.provider === 'youtube') return 'https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg';
    return p.images[0] || '';
  },
  embed(p) {
    const v = this.parse(p.video);
    if (v.provider === 'youtube') return '<iframe src="https://www.youtube.com/embed/' + esc(v.id) + '?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    if (v.provider === 'vimeo') return '<iframe src="https://player.vimeo.com/video/' + esc(v.id) + '?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>';
    if (v.provider === 'tiktok') return '<iframe src="https://www.tiktok.com/embed/v2/' + esc(v.id) + '" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    if (v.provider === 'instagram') return '<iframe src="https://www.instagram.com/p/' + esc(v.id) + '/embed/" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    if (v.provider === 'file') return '<video src="' + esc(v.url) + '" controls autoplay playsinline></video>';
    return '<a class="btn btn-primary" href="' + esc(p.video) + '" target="_blank" rel="noopener" style="margin:auto">Open video</a>';
  },
  providerLabel(url) { const v = this.parse(url); return { youtube: 'YouTube', vimeo: 'Vimeo', tiktok: 'TikTok', instagram: 'Instagram', file: 'Video', link: 'Video', none: '' }[v.provider] || 'Video'; }
};

/* ── CARD COMMENTS + TAGS ── */
Render.tag = function (p) {
  if (!p.tag) return '';
  const nm = { available: 'Available', sold: 'Sold', featured: 'Featured' };
  return '<span class="tagbadge tg-' + esc(p.tag) + '">' + esc(p.tagText || nm[p.tag] || '') + '</span>';
};
Object.assign(Gallery, {
  cmtBtn(p) {
    return '<button class="act act-cmt" onclick="event.stopPropagation();Gallery.focusCmt(\'' + p.id + '\')" aria-label="Comments"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg><span id="cn-' + p.id + '">' + p.comments.length + '</span></button>';
  },
  cc(p) {
    return '<div class="cc" onclick="event.stopPropagation()"><div class="cc-l" id="ccl-' + p.id + '">' + this.ccList(p) + '</div><div class="cc-row"><input id="cci-' + p.id + '" maxlength="300" placeholder="Write a comment…" aria-label="Comment" onkeydown="if(event.key===\'Enter\')Gallery.cardComment(\'' + p.id + '\')"><button class="act act-send" onclick="Gallery.cardComment(\'' + p.id + '\')">Post</button></div></div>';
  },
  ccList(p) {
    const last = p.comments.slice(-2).map(function (c) { return '<p class="cc-i"><b>' + esc(c.name || 'Anonymous') + '</b> ' + esc(c.text) + '</p>'; }).join('');
    return last || '<p class="cc-e">Be the first to comment.</p>';
  },
  focusCmt(id) { const i = $('cci-' + id); if (i) i.focus(); },
  async cardComment(id) {
    const p = Store.products.find(function (x) { return x.id === id; }); if (!p) return;
    const inp = $('cci-' + id), text = inp ? inp.value.trim().slice(0, 300) : '';
    if (!text) { Toasts.push('Write something first.'); return; }
    let name = 'Anonymous'; try { name = localStorage.getItem('ak.name') || name; } catch (e) {}
    const r = sb ? await sb.from('comments').insert({ product_id: p.id, name: name, body: text }) : { error: null };
    if (r.error) { Toasts.push('Could not post your comment. Try again.'); return; }
    p.comments.push({ name: name, text: text, ts: Date.now() });
    inp.value = '';
    $('ccl-' + id).innerHTML = this.ccList(p); $('cn-' + id).textContent = p.comments.length;
    Toasts.push('Comment posted'); UI.hap([6, 20, 6]); GA.event('comment', { id: p.id });
  }
});

/* ── DETAIL + COMMENTS ── */
const Detail = {
  id: null,
  async open(id) {
    const p = Store.products.find(function (x) { return x.id === id; }); if (!p) return;
    this.id = id;
    p.views = (p.views || 0) + 1;
    if (sb) { const r = await sb.rpc('increment_views', { pid: id }); if (!r.error && typeof r.data === 'number') p.views = r.data; }
    GA.event('view_item', { id: id });
    const isVid = p.type === 'video', dm = $('dMedia');
    if (isVid && p.video) dm.innerHTML = Media.embed(p);
    else if (p.images[0]) dm.innerHTML = '<img src="' + esc(p.images[0]) + '" alt="' + esc(p.title) + '">';
    else dm.innerHTML = '<div style="padding:40px;opacity:.5">' + Render.glyph(isVid ? 'video' : p.category) + '</div>';
    $('dTitle').textContent = p.title;
    const meta = [];
    if (!isVid) { meta.push(Render.money(p.price)); if (p.dims) meta.push(p.dims); }
    meta.push(Render.label(p.category));
    if (isVid && p.duration) meta.push('⏱ ' + p.duration);
    if (isVid && p.vdate) meta.push(new Date(p.vdate).toLocaleDateString());
    $('dMeta').innerHTML = meta.map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('');
    $('dDesc').textContent = p.desc;
    $('dCart').style.display = isVid ? 'none' : '';
    let note = $('vidCartNote');
    if (isVid) {
      if (!note) {
        note = document.createElement('div'); note.id = 'vidCartNote'; note.className = 'vid-cart-note';
        note.innerHTML = '<p style="font-size:.88rem;color:var(--ink-soft);margin-bottom:8px">See something you’d like in this video?</p><button class="cbtn cbtn-primary" onclick="Detail.orderFromVideo()">Order what you see</button>';
        $('dCart').parentNode.insertBefore(note, $('dCart').nextSibling);
      }
      note.style.display = '';
    } else if (note) note.style.display = 'none';
    this.refreshLikeButton();
    this.renderComments(p);
    UI.openOverlay('detailOverlay');
  },
  refreshLikeButton() {
    const p = Store.products.find(function (x) { return x.id === Detail.id; }); if (!p) return;
    const liked = getLiked().indexOf(p.id) >= 0;
    const dl = $('dLike');
    dl.className = 'act act-like' + (liked ? ' liked' : '');
    dl.innerHTML = ic('heart', 16, liked) + ' ' + (liked ? 'Liked' : 'Like') + ' · ' + p.likes;
  },
  async like() {
    await Gallery.like(this.id);
    this.refreshLikeButton();
    const svg = $('dLike').querySelector('svg');
    if (svg) { svg.classList.remove('ak-jump'); void svg.getBoundingClientRect(); svg.classList.add('ak-jump'); }
  },
  orderFromVideo() {
    const p = Store.products.find(function (x) { return x.id === Detail.id; }); if (!p) return;
    linkOpen('https://wa.me/' + digits(Store.state.contact.whatsapp) + '?text=' + enc('Hi Artsy Knots! I saw something I love in your video “' + p.title + '”. Could you tell me more about the pieces shown and how to order?'));
    Toasts.push('Opening WhatsApp…'); UI.hap();
  },
  renderComments(p) {
    const list = $('cmtList');
    if (!p.comments.length) { list.innerHTML = '<div class="cmt-empty">No comments yet. Be the first.</div>'; return; }
    list.innerHTML = p.comments.slice().reverse().map(function (c) {
      return '<div class="cmt"><div class="cn">' + esc(c.name) + '<time>' + new Date(c.ts).toLocaleDateString() + '</time></div><p>' + esc(c.text) + '</p></div>';
    }).join('');
  },
  async comment() {
    const p = Store.products.find(function (x) { return x.id === Detail.id; }); if (!p) return;
    const name = (val('cmtName').trim() || 'Anonymous').slice(0, 60);
    if (val('cmtName').trim()) { try { localStorage.setItem('ak.name', name); } catch (e) {} }
    const text = val('cmtText').trim().slice(0, 1000);
    if (!text) { Toasts.push('Write something first.'); return; }
    const btn = document.querySelector('#detailOverlay .cbtn-primary');
    if (btn) { btn.disabled = true; btn.textContent = 'Posting…'; }
    const r = sb ? await sb.from('comments').insert({ product_id: p.id, name: name, body: text }) : { error: null };
    if (btn) { btn.disabled = false; btn.textContent = 'Post comment'; }
    if (r.error) { Toasts.push('Could not post your comment. Try again.'); return; }
    p.comments.push({ name: name, text: text, ts: Date.now() });
    $('cmtText').value = '';
    this.renderComments(p);
    Toasts.push('Comment posted'); UI.hap([6, 20, 6]); GA.event('comment', { id: p.id });
  },
  addCart() { Cart.add(this.id); }
};

/* ── CART ── */
const Cart = {
  items: [],
  save() { try { sessionStorage.setItem('ak.cart', JSON.stringify(this.items)); } catch (e) {} },
  restore() { try { const d = sessionStorage.getItem('ak.cart'); if (d) this.items = JSON.parse(d); } catch (e) {} },
  add(id) {
    const p = Store.products.find(function (x) { return x.id === id; });
    if (!p || p.type === 'video') return false;
    const ex = this.items.find(function (i) { return i.id === id; });
    if (ex) ex.qty++; else this.items.push({ id: id, qty: 1 });
    this.render(); this.bump(); this.save();
    Toasts.push('Added ' + p.title + ' to your cart');
    UI.hap([5, 15, 5]); GA.event('add_to_cart', { id: id });
    return true;
  },
  bump() {
    const c = $('cartCount'), n = this.items.reduce(function (a, i) { return a + i.qty; }, 0);
    c.textContent = n; c.style.display = n ? 'grid' : 'none';
    const btn = $('cartBtn'); btn.classList.remove('ak-jump'); void btn.getBoundingClientRect(); btn.classList.add('ak-jump');
  },
  remove(id) { this.items = this.items.filter(function (i) { return i.id !== id; }); this.render(); this.bump(); this.save(); },
  qty(id, d) {
    const it = this.items.find(function (i) { return i.id === id; }); if (!it) return;
    it.qty += d;
    if (it.qty <= 0) this.remove(id); else { this.render(); this.bump(); this.save(); }
    UI.hap();
  },
  open() { this.render(); $('cart').classList.add('show'); $('scrim').classList.add('show'); UI.lockScroll(); UI.hap(); },
  close() { $('cart').classList.remove('show'); $('scrim').classList.remove('show'); UI.unlockScroll(); },
  render() {
    const w = $('cartItems'), btn = $('checkoutBtn');
    if (!this.items.length) {
      w.innerHTML = '<div class="cart-empty">' + ic('cart', 28) + '<p>Your cart is empty.</p></div>';
      $('cartTotal').textContent = '—'; btn.disabled = true; return;
    }
    btn.disabled = false;
    w.innerHTML = this.items.map(function (i) {
      const p = Store.products.find(function (x) { return x.id === i.id; }); if (!p) return '';
      const img = p.images[0] ? '<div class="cthumb"><img src="' + esc(p.images[0]) + '" alt=""></div>' : '<div class="cthumb">' + Render.glyph(p.category) + '</div>';
      return '<div class="citem">' + img + '<div class="ci-info"><h4>' + esc(p.title) + '</h4><div class="ci-price">' + Render.money(p.price) + '</div></div>'
        + '<div class="qty-ctrl"><button onclick="Cart.qty(\'' + i.id + '\',-1)" aria-label="Less">−</button><span>' + i.qty + '</span><button onclick="Cart.qty(\'' + i.id + '\',1)" aria-label="More">+</button></div>'
        + '<button class="cart-rm" onclick="Cart.remove(\'' + i.id + '\')" aria-label="Remove">' + ic('x', 14) + '</button></div>';
    }).join('');
    $('cartTotal').textContent = Render.money(this._total());
  },
  _total() { return this.items.reduce(function (a, i) { const p = Store.products.find(function (x) { return x.id === i.id; }); return a + (p ? p.price * i.qty : 0); }, 0); },
  _lines() {
    return this.items.map(function (i) {
      const p = Store.products.find(function (x) { return x.id === i.id; });
      return p ? '• ' + p.title + ' ×' + i.qty + ' — ' + Render.money(p.price * i.qty) : '';
    }).filter(Boolean).join('\n');
  }
};

/* ── CHECKOUT (name and address required, method chosen, message editable) ── */
const Checkout = {
  method: 'whatsapp', edited: false, ref: '',
  methods() {
    const c = Store.state.contact, m = [];
    if (c.whatsapp) m.push({ k: 'whatsapp', l: 'WhatsApp', i: 'message' });
    if (c.sms || c.phone) m.push({ k: 'sms', l: 'SMS', i: 'message' });
    if (c.email) m.push({ k: 'email', l: 'Email', i: 'mail' });
    return m;
  },
  buyer() { try { return JSON.parse(localStorage.getItem('ak.buyer') || '{}'); } catch (e) { return {}; } },
  open() {
    if (!Cart.items.length) { Toasts.push('Your cart is empty'); return; }
    const ms = this.methods();
    if (!ms.length) { Toasts.push('The studio has no contact method set yet.'); return; }
    if (!ms.find(function (m) { return m.k === Checkout.method; })) this.method = ms[0].k;
    this.ref = makeRef(); this.edited = false;
    const b = this.buyer();
    if (b.name) $('coName').value = b.name;
    if (b.address) $('coAddress').value = b.address;
    if (b.phone) $('coPhone').value = b.phone;
    $('coErr').style.display = 'none';
    this.renderMethods();
    this.fill();
    Cart.close();
    UI.openOverlay('checkoutOverlay');
  },
  orderNow(id) { if (Cart.add(id)) this.open(); },
  renderMethods() {
    $('coMethods').innerHTML = this.methods().map(function (m) {
      return '<button type="button" class="opt' + (m.k === Checkout.method ? ' sel' : '') + '" onclick="Checkout.setMethod(\'' + m.k + '\')"><div class="lname">' + ic(m.i, 16) + ' ' + m.l + '</div></button>';
    }).join('');
  },
  setMethod(m) { this.method = m; this.renderMethods(); if (!this.edited) this.fill(); UI.hap(); },
  vars() {
    const b = Store.state.brand;
    return { brand: b.name, ref: this.ref, items: Cart._lines(), total: Render.money(Cart._total()), name: val('coName').trim(), address: val('coAddress').trim(), phone: val('coPhone').trim(), method: this.method };
  },
  fill() { $('coMessage').value = fillTpl(Store.state.checkout.template, this.vars()); },
  touch() { if (!this.edited) this.fill(); },
  link(method, msg, ref) {
    const c = Store.state.contact;
    if (method === 'whatsapp') return 'https://wa.me/' + digits(c.whatsapp) + '?text=' + enc(msg);
    if (method === 'sms') { const num = '+' + digits(c.sms || c.phone); return 'sms:' + num + (IS_IOS ? '&' : '?') + 'body=' + enc(msg); }
    return 'mailto:' + c.email + '?subject=' + enc('Order ' + ref) + '&body=' + enc(msg);
  },
  back() { UI.closeAll(); Cart.open(); },
  async send() {
    const name = val('coName').trim(), address = val('coAddress').trim(), phone = val('coPhone').trim();
    const err = $('coErr'), msg = val('coMessage').trim();
    const fail = function (m) { err.textContent = m; err.style.display = 'block'; };
    err.style.display = 'none';
    if (!name) { fail('Please enter your full name so we can deliver.'); $('coName').focus(); return; }
    if (!address) { fail('Please enter your delivery address.'); $('coAddress').focus(); return; }
    if (!msg) { fail('Your message is empty. Write a line or refill it.'); return; }
    try { localStorage.setItem('ak.buyer', JSON.stringify({ name: name, address: address, phone: phone })); } catch (e) {}

    /* Open the chat first, inside the tap, so phones don't block it */
    linkOpen(this.link(this.method, msg, this.ref));

    const row = {
      id: this.ref, status: 'pending', channel: this.method, method: this.method,
      customer_name: name, customer_address: address, phone: phone, message: msg,
      total: Cart._total(),
      items: Cart.items.map(function (i) { const p = Store.products.find(function (x) { return x.id === i.id; }); return { id: i.id, title: p ? p.title : '', qty: i.qty, price: p ? p.price : 0 }; })
    };
    if (sb) {
      const r = await sb.from('orders').insert(row);
      if (r.error) { console.warn('order', r.error); Toasts.push('Sent to the chat. The order could not be saved online, so please confirm it there.'); }
    }
    GA.event('purchase', { value: row.total, channel: this.method });
    Cart.items = []; Cart.save(); Cart.render(); Cart.bump();
    UI.closeAll();
    Toasts.push('Order ready. Thank you, ' + name.split(' ')[0] + '!');
    UI.hap([6, 20, 6]);
  }
};

/* ── COMMISSION WIZARD ── */
const Commission = {
  step: 1, total: 5, edited: false, ref: '', piece: '', method: 'whatsapp',
  open() {
    this.step = 1; this.edited = false; this.ref = makeRef(); this.piece = '';
    const pieces = Store.categories.filter(function (c) { return c.slug !== 'commission'; });
    $('cmPieces').innerHTML = pieces.map(function (c) {
      return '<button type="button" class="opt" data-k="' + esc(c.slug) + '" data-l="' + esc(c.label) + '"><div class="lname">' + Render.glyph(c.slug) + ' ' + esc(c.label) + '</div></button>';
    }).join('');
    $('cmPieces').onclick = function (e) {
      const b = e.target.closest('.opt'); if (!b) return;
      Commission.piece = b.dataset.l;
      document.querySelectorAll('#cmPieces .opt').forEach(function (x) { x.classList.toggle('sel', x === b); });
      $('cmOther').value = '';
      UI.hap();
    };
    const buyer = Checkout.buyer();
    if (buyer.name) $('cmName').value = buyer.name;
    if (buyer.phone) $('cmContact').value = buyer.phone;
    this.show();
    UI.openOverlay('commissionOverlay');
  },
  show() {
    document.querySelectorAll('#commissionOverlay .cstep').forEach(function (el) {
      el.style.display = (+el.dataset.step === Commission.step) ? 'block' : 'none';
    });
    $('cmStepLbl').textContent = 'Step ' + this.step + ' of ' + this.total;
    $('cmDots').innerHTML = Array.from({ length: this.total }, function (_, i) { return '<i class="' + (i < Commission.step ? 'on' : '') + '"></i>'; }).join('');
    const titles = ['What would you like made?', 'Size and colour', 'Where it lives and how it feels', 'Budget and timing', 'Your details'];
    $('cmTitle').textContent = titles[this.step - 1];
    $('cmBack').style.visibility = this.step === 1 ? 'hidden' : 'visible';
    $('cmNext').textContent = this.step === this.total ? 'Send commission' : 'Next';
    $('cmErr').style.display = 'none';
    if (this.step === this.total) this.preview();
  },
  data() {
    const other = val('cmOther').trim();
    return {
      name: val('cmName').trim(), contact: val('cmContact').trim(),
      piece: other || this.piece, size: val('cmSize').trim(), colours: val('cmColours').trim(),
      reference: val('cmRef').trim(), place: val('cmPlace').trim(), mood: val('cmMood').trim(),
      budget: val('cmBudget').trim(), needed: val('cmNeeded'), details: val('cmDetails').trim()
    };
  },
  methods() {
    const c = Store.state.contact, m = [];
    if (c.whatsapp) m.push({ k: 'whatsapp', l: 'WhatsApp', i: 'message' });
    if (c.sms || c.phone) m.push({ k: 'sms', l: 'SMS', i: 'message' });
    if (c.email) m.push({ k: 'email', l: 'Email', i: 'mail' });
    return m;
  },
  preview() {
    const ms = this.methods();
    if (!ms.find(function (x) { return x.k === Commission.method; })) this.method = ms.length ? ms[0].k : 'whatsapp';
    $('cmMethods').innerHTML = ms.map(function (m) {
      return '<button type="button" class="opt' + (m.k === Commission.method ? ' sel' : '') + '" onclick="Commission.setMethod(\'' + m.k + '\')"><div class="lname">' + ic(m.i, 16) + ' ' + m.l + '</div></button>';
    }).join('');
    if (!this.edited) this.fillMessage();
  },
  setMethod(m) { this.method = m; this.preview(); UI.hap(); },
  fillMessage() {
    const d = this.data(), b = Store.state.brand;
    $('cmMessage').value = fillTpl(Store.state.checkout.commissionTemplate, {
      brand: b.name, ref: this.ref, name: d.name, contact: d.contact, piece: d.piece, size: d.size,
      colours: d.colours, place: d.place, mood: d.mood, budget: d.budget,
      needed: d.needed ? new Date(d.needed).toLocaleDateString() : '', reference: d.reference, details: d.details
    });
  },
  validate() {
    const err = $('cmErr'), fail = function (m) { err.textContent = m; err.style.display = 'block'; };
    if (this.step === 1) {
      if (!(val('cmOther').trim() || this.piece)) { fail('Choose a kind of piece, or describe one.'); return false; }
    }
    if (this.step === 5) {
      if (!val('cmName').trim()) { fail('Please enter your name.'); return false; }
      if (!val('cmContact').trim()) { fail('Please enter a phone number or email so the studio can reply.'); return false; }
      if (!$('cmMessage').value.trim()) { fail('Your message is empty.'); return false; }
    }
    return true;
  },
  next() {
    if (!this.validate()) return;
    if (this.step < this.total) { this.step++; this.show(); UI.hap(); return; }
    this.send();
  },
  back() { if (this.step > 1) { this.step--; this.show(); } },
  async send() {
    const d = this.data(), msg = $('cmMessage').value.trim();
    const b = $('cmNext'); b.disabled = true; b.textContent = 'Sending…';
    try { localStorage.setItem('ak.buyer', JSON.stringify({ name: d.name, phone: d.contact })); } catch (e) {}
    linkOpen(Checkout.link(this.method, msg, this.ref));
    const row = {
      name: d.name, contact: d.contact, preferred_method: this.method, piece: d.piece, size: d.size, colours: d.colours,
      place: d.place, mood: d.mood, budget: d.budget, needed_by: d.needed || null, reference_url: d.reference, details: d.details
    };
    if (sb) {
      const r = await sb.from('commissions').insert(row);
      if (r.error) { console.warn('commission', r.error); Toasts.push('Sent to the chat. The request could not be saved online, so please confirm it there.'); }
    }
    b.disabled = false; b.textContent = 'Send commission';
    UI.closeAll();
    Toasts.push('Commission sent. The studio will reply soon.');
    UI.hap([6, 20, 6]);
  }
};

/* ── ORDERS & COMMISSIONS (studio) ── */
const Orders = {
  f: 'all', kind: 'orders',
  kindSet(k, btn) {
    this.kind = k;
    document.querySelectorAll('#kindSeg button').forEach(function (b) { b.classList.remove('sel'); });
    btn.classList.add('sel');
    $('orderSeg').style.display = k === 'orders' ? 'flex' : 'none';
    this.render();
  },
  filter(f, btn) {
    this.f = f;
    document.querySelectorAll('#orderSeg button').forEach(function (b) { b.classList.remove('sel'); });
    btn.classList.add('sel'); this.render();
  },
  render() {
    const w = $('orderList');
    if (this.kind === 'commissions') return this.renderCommissions(w);
    let o = Store.orders.slice();
    if (this.f !== 'all') o = o.filter(function (x) { return x.status === Orders.f; });
    if (!o.length) { w.innerHTML = '<p style="text-align:center;color:var(--ink-soft);padding:24px">No orders here yet.</p>'; return; }
    w.innerHTML = o.map(function (x) {
      return '<div class="order-row"><div class="oh"><span class="oid">' + esc(x.id) + '</span><span class="ostat ' + esc(x.status) + '">' + esc(x.status) + '</span></div>'
        + '<div class="otime">' + new Date(x.createdAt).toLocaleString() + ' · ' + esc(x.method) + '</div>'
        + '<div class="oitems"><b>' + esc(x.name || '—') + '</b><br>' + esc(x.address || '—') + (x.phone ? '<br>' + esc(x.phone) : '') + '</div>'
        + '<div class="oitems" style="margin-top:6px">' + x.items.map(function (i) { return esc(i.title) + ' ×' + i.qty; }).join('<br>') + '</div>'
        + '<div class="otime" style="font-weight:700;color:var(--ink);margin:6px 0 10px">' + Render.money(x.total) + '</div>'
        + '<div style="display:flex;gap:8px;flex-wrap:wrap">'
        + (x.status === 'pending'
          ? '<button class="cbtn cbtn-primary" style="margin:0" onclick="Orders.mark(\'' + esc(x.id) + '\',\'completed\')">Mark completed</button>'
          : '<button class="cbtn cbtn-ghost" style="margin:0" onclick="Orders.mark(\'' + esc(x.id) + '\',\'pending\')">Reopen</button>')
        + '<button class="cbtn cbtn-danger" style="margin:0" onclick="Orders.del(\'' + esc(x.id) + '\')">Delete</button></div></div>';
    }).join('');
  },
  renderCommissions(w) {
    const list = Store.commissions;
    if (!list.length) { w.innerHTML = '<p style="text-align:center;color:var(--ink-soft);padding:24px">No commission requests yet.</p>'; return; }
    const statuses = [['new', 'New'], ['in_talks', 'In talks'], ['accepted', 'Accepted'], ['declined', 'Declined'], ['done', 'Done']];
    w.innerHTML = list.map(function (c) {
      const facts = [['Size', c.size], ['Colours', c.colours], ['Place', c.place], ['Mood', c.mood], ['Budget', c.budget], ['Needed', c.needed ? new Date(c.needed).toLocaleDateString() : ''], ['Reference', c.reference], ['Details', c.details]];
      return '<div class="order-row"><div class="oh"><span class="oid">' + esc(c.piece || 'Commission') + '</span>'
        + '<select class="select" style="width:auto;padding:6px 10px" onchange="Orders.setCommissionStatus(\'' + esc(c.id) + '\',this.value)">'
        + statuses.map(function (s) { return '<option value="' + s[0] + '"' + (s[0] === c.status ? ' selected' : '') + '>' + s[1] + '</option>'; }).join('')
        + '</select></div>'
        + '<div class="oitems"><b>' + esc(c.name) + '</b> · ' + esc(c.contact) + ' · ' + esc(c.method) + '</div>'
        + '<div class="oitems" style="margin-top:6px">' + facts.filter(function (x) { return x[1]; }).map(function (x) { return '<b>' + x[0] + ':</b> ' + esc(x[1]); }).join('<br>') + '</div>'
        + '<div style="display:flex;gap:8px;margin-top:10px"><button class="cbtn cbtn-danger" style="margin:0" onclick="Orders.delCommission(\'' + esc(c.id) + '\')">Delete</button></div></div>';
    }).join('');
  },
  async setCommissionStatus(id, status) {
    const r = await sb.from('commissions').update({ status: status }).eq('id', id);
    if (r.error) { Toasts.push('Could not update the request.'); return; }
    await Store.loadAdminData(); Toasts.push('Status updated'); this.render();
  },
  async delCommission(id) {
    if (!confirm('Delete this commission request?')) return;
    const r = await sb.from('commissions').delete().eq('id', id);
    if (r.error) { Toasts.push('Could not delete.'); return; }
    await Store.loadAdminData(); this.render(); Console.stats();
  },
  async mark(id, status) {
    const r = await sb.from('orders').update({ status: status }).eq('id', id);
    if (r.error) { Toasts.push('Could not update the order.'); return; }
    await Store.loadAdminData(); this.render(); Console.stats(); Toasts.push('Order ' + status); UI.hap();
  },
  async del(id) {
    if (!confirm('Delete this order?')) return;
    const r = await sb.from('orders').delete().eq('id', id);
    if (r.error) { Toasts.push('Could not delete the order.'); return; }
    await Store.loadAdminData(); this.render(); Console.stats();
  },
  exportCSV() {
    const o = Store.orders; if (!o.length) { Toasts.push('No orders to export.'); return; }
    const rows = [['Order', 'Date', 'Status', 'Method', 'Name', 'Address', 'Phone', 'Items', 'Total']];
    o.forEach(function (x) { rows.push([x.id, new Date(x.createdAt).toISOString(), x.status, x.method, x.name, x.address, x.phone, x.items.map(function (i) { return i.title + ' x' + i.qty; }).join('; '), x.total]); });
    const csv = rows.map(function (r) { return r.map(function (c) { return '"' + String(c == null ? '' : c).replace(/"/g, '""') + '"'; }).join(','); }).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'artsy-knots-orders.csv'; a.click();
    Toasts.push('Orders exported'); UI.hap();
  }
};

/* ── VIEWS ── */
const Dock = {
  sync() {
    const l = Store.state.layout, a = $('dockLoc'); if (!a) return;
    const on = l.locOn !== false && String(l.locLabel || '').trim();
    a.style.display = on ? '' : 'none';
    if (on) { $('dockLocTxt').textContent = l.locLabel; a.href = l.locUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(l.locLabel)); }
    document.body.dataset.fx = (l.fx !== false) ? '1' : '0';
    const fx = $('sw_fx'); if (fx) fx.classList.toggle('on', l.fx !== false);
    const lo = $('sw_loc'); if (lo) lo.classList.toggle('on', l.locOn !== false);
    const a1 = $('f_locLabel'); if (a1 && document.activeElement !== a1) a1.value = l.locLabel || '';
    const a2 = $('f_locUrl'); if (a2 && document.activeElement !== a2) a2.value = l.locUrl || '';
  },
  openQr() {
    const url = location.origin + location.pathname, l = Store.state.layout;
    const foot = $('footLine') ? $('footLine').textContent.replace(/\s+/g, ' ').trim() : '';
    $('qrInfo').textContent = foot + ((l.locOn !== false && l.locLabel) ? ' · ' + l.locLabel : '');
    try { const q = qrcode(0, 'M'); q.addData(url); q.make(); $('qrBox').innerHTML = q.createSvgTag({ cellSize: 5, margin: 2, scalable: true }); }
    catch (e) { $('qrBox').innerHTML = '<p class="hint">' + esc(url) + '</p>'; }
    $('qrOpen').href = url; UI.openOverlay('qrOverlay'); UI.hap();
  }
};
const Views = {
  set(v) {
    if (!Auth.isAdmin) return;
    Store.state.layout.view = v; Render.theme(); Console.renderLayout(); dSave();
    Physics.neuralOn = (Store.state.layout.fx !== false); UI.hap();
    if (v !== 'glass' && !Store.state.theme.dark) Toasts.push('Tip: pick a black palette in Theme for the full space feel.');
  },
  syncFab() { Dock.sync(); }
};

/* ── SAVE (debounced) ── */
let _saveTimer = null;
function dSave() { Store._pending = true; clearTimeout(_saveTimer); _saveTimer = setTimeout(function () { Store.saveSettings(); }, 700); }

/* ── EDIT (studio settings) ── */
const Edit = {
  v(id) { return val(id); },
  brand() { const b = Store.state.brand; b.name = this.v('f_brandName'); b.tag = this.v('f_brandTag'); if ($('f_logoUrl').style.display !== 'none') b.logoUrl = this.v('f_logoUrl'); b.logoLetter = this.v('f_logoLetter'); b.footMark = this.v('f_footMark'); Render.brand(); dSave(); },
  logoMode(m) {
    const up = (m === 'upload');
    $('logo_up').classList.toggle('sel', up); $('logo_url').classList.toggle('sel', !up);
    $('logoUpWrap').style.display = up ? 'block' : 'none'; $('f_logoUrl').style.display = up ? 'none' : 'block';
  },
  async logoFile(ev) {
    const f = ev.target.files[0]; if (!f || !sb) return;
    Busy.start('Uploading logo…');
    try {
      const small = await compressImage(await readAsDataURL(f), 600, 0.85);
      const url = await uploadFile(await (await fetch(small)).blob(), 'logo', function (p) { Busy.set(p * 100, 'Uploading logo…'); });
      Store.state.brand.logoUrl = url; Render.brand(); dSave(); Busy.end(); Toasts.push('Logo updated');
    } catch (e) { Busy.end(); Toasts.push('Logo could not upload. Try again.'); }
  },
  async portraitFile(ev) {
    const f = ev.target.files[0]; if (!f || !sb) return;
    Busy.start('Uploading portrait…');
    try {
      const small = await compressImage(await readAsDataURL(f), 900, 0.8);
      const url = await uploadFile(await (await fetch(small)).blob(), 'portrait', function (p) { Busy.set(p * 100, 'Uploading portrait…'); });
      Store.state.copy.aboutPortrait = url; $('f_aboutPortrait').value = url; Render.copy(); Render.brand(); dSave(); Busy.end(); Toasts.push('Portrait updated');
    } catch (e) { Busy.end(); Toasts.push('Portrait could not upload. Try again.'); }
  },
  copy() {
    const c = Store.state.copy;
    c.heroEyebrow = this.v('f_heroEyebrow'); c.heroTitle = this.v('f_heroTitle'); c.heroLede = this.v('f_heroLede');
    c.aboutHeading = this.v('f_aboutHeading'); c.aboutBy = this.v('f_aboutBy'); c.aboutBody = this.v('f_aboutBody'); c.aboutQuote = this.v('f_aboutQuote');
    const portrait = this.v('f_aboutPortrait'); if (portrait) c.aboutPortrait = portrait;
    c.beliefs = this.v('f_beliefs'); c.contactHeading = this.v('f_contactHeading'); c.contactBody = this.v('f_contactBody');
    Render.copy(); dSave();
  },
  contact() {
    const c = Store.state.contact;
    c.whatsapp = this.v('f_whatsapp').replace(/\D/g, ''); c.phone = this.v('f_phone'); c.sms = this.v('f_sms'); c.email = this.v('f_email');
    c.instagram = this.v('f_instagram'); c.tiktok = this.v('f_tiktok'); c.facebook = this.v('f_facebook'); c.twitter = this.v('f_twitter');
    c.pinterest = this.v('f_pinterest'); c.youtube = this.v('f_youtube'); c.blog = this.v('f_blog').trim(); c.linkedin = this.v('f_linkedin'); c.currency = this.v('f_currency') || 'KES';
    Render.contact(); dSave();
  },
  templates() {
    Store.state.checkout.template = this.v('f_tpl_order');
    Store.state.checkout.commissionTemplate = this.v('f_tpl_commission');
    dSave();
  },
  payments() { const m = Store.state.payments.mpesa; m.shortcode = this.v('f_mp_shortcode'); m.endpoint = this.v('f_mp_endpoint'); m.account = this.v('f_mp_account'); m.callback = this.v('f_mp_callback'); dSave(); },
  analytics() { Store.state.analytics.gaId = this.v('f_gaId').trim(); dSave(); GA.init(); },
  toggleDark() { const sw = $('sw_dark'); sw.classList.toggle('on'); Store.state.theme.dark = sw.classList.contains('on'); Render.theme(); dSave(); },
  toggleFx() { const l = Store.state.layout; l.fx = (l.fx === false); Physics.neuralOn = (l.fx !== false); Dock.sync(); dSave(); UI.hap(); },
  toggleLoc() { const l = Store.state.layout; l.locOn = (l.locOn === false); Dock.sync(); dSave(); UI.hap(); },
  setLoc() { const l = Store.state.layout; l.locLabel = val('f_locLabel').trim().slice(0, 80); l.locUrl = val('f_locUrl').trim().slice(0, 300); Dock.sync(); dSave(); },
  toggleHaptics() { const sw = $('sw_haptics'); sw.classList.toggle('on'); Store.state.layout.haptics = sw.classList.contains('on'); dSave(); },
  palette(key) {
    const p = PALETTES[key], t = Store.state.theme;
    t.palette = key; t.accent = p.accent; t.accent2 = p.accent2; t.bg1 = p.bg1; t.bg2 = p.bg2; t.bg3 = p.bg3; t.dark = p.dark;
    $('f_accent').value = p.accent; $('sw_dark').classList.toggle('on', p.dark);
    Render.theme(); Console.renderPalettes(); dSave(); Toasts.push(p.label + ' palette applied'); UI.hap();
  },
  customAccent(hex) { const t = Store.state.theme; t.accent = hex; t.palette = 'custom'; t.accent2 = this._shade(hex, -28); Render.theme(); Console.renderPalettes(); dSave(); },
  _shade(hex, p) { const n = parseInt(hex.slice(1), 16); let r = (n >> 16) + p, g = ((n >> 8) & 255) + p, b = (n & 255) + p; r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b)); return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0'); },
  layout(kind, value) { Store.state.layout[kind] = value; Render.theme(); Console.renderLayout(); dSave(); UI.hap(); if (kind === 'bgMode') { document.body.dataset.bg = value; if (value === 'stars') Physics.initStars(); } }
};
const Settings = {
  toggleMpesa() { const sw = $('sw_mpesa'); sw.classList.toggle('on'); Store.state.payments.mpesa.enabled = sw.classList.contains('on'); dSave(); }
};

/* ── EDITOR (works and videos) ── */
const Editor = {
  eid: null, kind: 'artwork', imgs: [],
  tag: '',
  setTag(b) { this.tag = b.dataset.tag || ''; this.paintTag(); UI.hap(); },
  paintTag() { const t = this.tag || ''; document.querySelectorAll('#e_tagSeg button').forEach(function (b) { b.classList.toggle('on', (b.dataset.tag || '') === t); }); },
  openNew(kind) {
    this.eid = null; this.kind = kind; this.imgs = []; this.tag = ''; $('e_tagText').value = ''; this.paintTag();
    $('editorTitle').textContent = kind === 'video' ? 'Add a video' : 'Add an artwork';
    $('editorSub').textContent = kind === 'video' ? 'Paste a YouTube, TikTok or Vimeo link.' : 'Photos sell the piece. Bright, clear images work best.';
    ['e_title', 'e_desc', 'e_price', 'e_dims', 'e_image', 'e_video', 'e_duration', 'e_vdate', 'e_vthumb'].forEach(function (id) { $(id).value = ''; });
    this.fillCats(Store.categories.length ? Store.categories[0].slug : 'matwork');
    $('editorErr').style.display = 'none';
    this._fields(); this.imgMode('upload'); this.renderPrev();
    UI.openOverlay('editorOverlay');
  },
  openEdit(id) {
    const p = Store.products.find(function (x) { return x.id === id; }); if (!p) return;
    this.eid = id; this.kind = p.type || 'artwork'; this.imgs = p.images.slice();
    this.tag = p.tag || ''; $('e_tagText').value = p.tagText || ''; this.paintTag();
    $('editorTitle').textContent = this.kind === 'video' ? 'Edit video' : 'Edit artwork';
    $('editorSub').textContent = 'Changes publish to every device when saved.';
    $('e_title').value = p.title; $('e_desc').value = p.desc; $('e_price').value = p.price || '';
    $('e_dims').value = p.dims; $('e_video').value = p.video; $('e_duration').value = p.duration;
    $('e_vdate').value = p.vdate; $('e_vthumb').value = p.vthumb;
    this.fillCats(p.category);
    $('editorErr').style.display = 'none';
    this._fields(); this.imgMode('upload'); this.renderPrev();
    UI.openOverlay('editorOverlay');
  },
  fillCats(selected) {
    const sel = $('e_cat');
    sel.innerHTML = Store.categories.map(function (c) { return '<option value="' + esc(c.slug) + '"' + (c.slug === selected ? ' selected' : '') + '>' + esc(c.label) + '</option>'; }).join('');
    if (selected && !Store.categories.find(function (c) { return c.slug === selected; })) sel.innerHTML += '<option value="' + esc(selected) + '" selected>' + esc(selected) + '</option>';
  },
  _fields() {
    const vid = (this.kind === 'video');
    $('e_vidBlock').style.display = vid ? 'block' : 'none';
    $('e_imgBlock').style.display = vid ? 'none' : 'block';
    $('e_dimsWrap').style.display = vid ? 'none' : 'block';
  },
  imgMode(m) {
    const up = (m === 'upload');
    $('img_up').classList.toggle('sel', up); $('img_url').classList.toggle('sel', !up);
    $('imgUpWrap').style.display = up ? 'block' : 'none'; $('e_image').style.display = up ? 'none' : 'block';
  },
  async imgFiles(ev) {
    const files = Array.from(ev.target.files); if (!files.length) return;
    if (files.some(function (f) { return f.size > 12 * 1024 * 1024; })) { Toasts.push('Image too large. Max 12MB per photo.'); return; }
    Progress.show();
    for (let i = 0; i < files.length; i++) {
      Progress.set(i / files.length * 100, 'Preparing photo ' + (i + 1) + ' of ' + files.length);
      this.imgs.push(await compressImage(await readAsDataURL(files[i])));
    }
    Progress.hide();
    this.renderPrev();
  },
  imgFromUrl() { const u = val('e_image').trim(); if (u) { this.imgs = [u].concat(this.imgs.filter(function (i) { return i !== u; })); this.renderPrev(); } },
  renderPrev() { $('imgPreview').innerHTML = this.imgs.map(function (src, i) { return '<img src="' + esc(src) + '" title="Tap to remove" onclick="Editor.dropImg(' + i + ')" loading="lazy" alt="">'; }).join(''); },
  dropImg(i) { this.imgs.splice(i, 1); this.renderPrev(); },
  videoMeta() {
    const v = Media.parse(val('e_video').trim());
    if (v.provider === 'youtube' && !val('e_vthumb')) $('e_vthumb').value = 'https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg';
  },
  async save() {
    const err = $('editorErr'), btn = $('editorSave');
    const fail = function (m) { err.textContent = m; err.style.display = 'block'; };
    err.style.display = 'none';
    if (!Auth.isAdmin) { fail('Sign in as the studio owner first.'); return; }
    const title = val('e_title').trim();
    if (!title) { fail('Give it a title.'); return; }
    const base = { title: title, desc: val('e_desc').trim(), category: val('e_cat') };
    if (this.kind === 'video') {
      const video = val('e_video').trim(); if (!video) { fail('Add a video link.'); return; }
      Object.assign(base, { type: 'video', video: video, duration: val('e_duration').trim(), vdate: val('e_vdate'), vthumb: val('e_vthumb').trim(), price: 0, images: [], dims: '' });
    } else {
      const price = Number(val('e_price')); if (!price || price < 0) { fail('Set a price.'); return; }
      Object.assign(base, { type: 'artwork', price: price, dims: val('e_dims').trim() });
    }
    base.tag = this.tag || ''; base.tagText = val('e_tagText').trim().slice(0, 24);
    btn.disabled = true; btn.textContent = 'Saving…';
    Progress.show();
    try {
      if (this.kind !== 'video') {
        const pend = this.imgs.filter(function (i) { return i.startsWith('data:'); }).length;
        let done = 0; const out = [];
        for (const im of this.imgs) {
          if (!im.startsWith('data:')) { out.push(im); continue; }
          Progress.set(done / pend * 100, 'Preparing photo ' + (done + 1) + ' of ' + pend);
          const small = await compressImage(im);
          const blob = await (await fetch(small)).blob();
          const url = await uploadFile(blob, 'art', function (f) {
            Progress.set((done + f) / pend * 100, 'Uploading photo ' + (done + 1) + ' of ' + pend + ' · ' + Math.round(f * 100) + '%');
          });
          out.push(url); done++;
        }
        base.images = out;
      }
      Progress.set(100, 'Saving work…');
      const row = toRow(base);
      const r = this.eid
        ? await sb.from('products').update(row).eq('id', this.eid)
        : await sb.from('products').insert(row);
      if (r.error) throw r.error;
      await Store.loadProducts();
      Gallery.apply(); Console.renderProducts(); Console.stats();
      UI.closeAll();
      Toasts.push('Saved: ' + title); UI.hap([6, 20, 6]);
    } catch (e) {
      console.warn('save work', e);
      fail('Could not save. Check your connection and try again.');
    } finally {
      btn.disabled = false; btn.textContent = 'Save work'; Progress.hide();
    }
  },
  /* Soft delete: the work waits 30 days in Recently deleted */
  async remove(id) {
    const p = Store.products.find(function (x) { return x.id === id; });
    if (!confirm('Move “' + (p ? p.title : 'this work') + '” to Recently deleted? You can restore it for 30 days.')) return;
    Busy.start('Moving to trash…');
    const r = await sb.from('products').update({ deleted_at: new Date().toISOString() }).eq('id', id);
    if (r.error) { Busy.end(); Toasts.push('Could not delete. Try again.'); return; }
    await Store.loadProducts(); await Store.loadTrash();
    Gallery.apply(); Console.renderProducts(); Console.renderTrash(); Console.stats();
    Busy.end(); Toasts.push('Moved to Recently deleted. Restore within 30 days.');
  }
};

/* ── CONSOLE ── */
const Console = {
  _insights: [],
  async open() {
    const ok = await Auth.refresh();
    if (!ok) { this.openLogin(); return; }
    if (Lock.needsUnlock()) { Auth.pwOnly = false; this.openLogin(); Auth.setErr('Welcome back. Use your passkey or password.', true); return; }
    Busy.start('Loading studio…');
    await this.load();
    Busy.end();
    this.populate(); this.present();
  },
  /* Loads everything the studio needs, in parallel, with real progress */
  async load() {
    const jobs = [
      function () { return Store.loadProducts(); },
      function () { return Store.loadCategories(); },
      function () { return Store.loadAdminData(); },
      function () { return Store.loadTrash(); },
      function () { return sb.rpc('purge_trash'); },
      function () { return Console.loadInsights(); }
    ];
    let n = 0;
    await Promise.all(jobs.map(function (j) {
      return Promise.resolve().then(j).catch(function () {}).then(function () { n++; Busy.set(n / jobs.length * 100, 'Loading studio…'); });
    }));
  },
  openLogin() {
    Auth.show('loginView');
    $('loginOverlay').classList.add('show'); $('scrim').classList.add('show');
    UI.lockScroll();
    setTimeout(function () { const e = $('loginEmail'); if (e) e.focus(); }, 100);
  },
  present() {
    $('console').classList.add('show'); $('scrim').classList.add('show');
    UI.lockScroll(); UI.hap(); Lock.start();
    $('accEmail').textContent = Auth.email;
    this.renderAll();
    Guide.sync();
  },
  renderAll() {
    this.stats(); this.renderProducts(); this.renderGenres(); this.renderTrash(); Orders.render(); this.renderInsights();
  },
  close(why) {
    $('console').classList.remove('show'); $('scrim').classList.remove('show');
    UI.unlockScroll();
    if (why !== 'idle') Lock.leave();
  },
  async go(tab) {
    await this.open();
    const b = document.querySelector('.ctab[data-tab="' + tab + '"]');
    if (b && Auth.isAdmin) this.tab(tab, b);
  },
  tab(name, btn) {
    document.querySelectorAll('.ctab').forEach(function (t) { t.classList.remove('active'); });
    document.querySelectorAll('.cpanel').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelector('.cpanel[data-panel="' + name + '"]').classList.add('active');
    if (name === 'works') { this.renderProducts(); this.renderGenres(); this.renderTrash(); }
    if (name === 'orders') Orders.render();
    if (name === 'theme') this.renderPalettes();
    if (name === 'layout') this.renderLayout();
    if (name === 'access') $('accEmail').textContent = Auth.email;
    if (name === 'overview') this.renderInsights();
  },
  populate() {
    const s = Store.state;
    function sv(id, v) { const el = $(id); if (el) el.value = v; }
    sv('f_brandName', s.brand.name); sv('f_brandTag', s.brand.tag); sv('f_logoUrl', s.brand.logoUrl); sv('f_logoLetter', s.brand.logoLetter); sv('f_footMark', s.brand.footMark);
    sv('f_heroEyebrow', s.copy.heroEyebrow); sv('f_heroTitle', s.copy.heroTitle); sv('f_heroLede', s.copy.heroLede); sv('f_aboutHeading', s.copy.aboutHeading); sv('f_aboutBy', s.copy.aboutBy); sv('f_aboutBody', s.copy.aboutBody); sv('f_aboutQuote', s.copy.aboutQuote); sv('f_aboutPortrait', s.copy.aboutPortrait); sv('f_beliefs', s.copy.beliefs); sv('f_contactHeading', s.copy.contactHeading); sv('f_contactBody', s.copy.contactBody);
    sv('f_whatsapp', s.contact.whatsapp); sv('f_phone', s.contact.phone); sv('f_sms', s.contact.sms || ''); sv('f_email', s.contact.email); sv('f_instagram', s.contact.instagram); sv('f_tiktok', s.contact.tiktok); sv('f_facebook', s.contact.facebook); sv('f_twitter', s.contact.twitter); sv('f_pinterest', s.contact.pinterest); sv('f_youtube', s.contact.youtube); sv('f_blog', s.contact.blog); sv('f_linkedin', s.contact.linkedin); sv('f_currency', s.contact.currency);
    sv('f_accent', s.theme.accent);
    const m = s.payments.mpesa; sv('f_mp_shortcode', m.shortcode); sv('f_mp_endpoint', m.endpoint); sv('f_mp_account', m.account); sv('f_mp_callback', m.callback);
    sv('f_gaId', s.analytics.gaId);
    sv('f_tpl_order', s.checkout.template); sv('f_tpl_commission', s.checkout.commissionTemplate);
    $('sw_mpesa').classList.toggle('on', !!m.enabled);
    $('sw_dark').classList.toggle('on', !!s.theme.dark);
    $('sw_haptics').classList.toggle('on', !!s.layout.haptics);
    $('consoleAvatar').innerHTML = s.copy.aboutPortrait ? '<img src="' + esc(s.copy.aboutPortrait) + '" alt="" style="width:100%;height:100%;object-fit:cover">' : ic('user', 18);
    this.renderPalettes(); this.renderLayout();
  },
  stats() {
    const p = Store.products, o = Store.orders;
    $('stWorks').textContent = p.length;
    $('stLikes').textContent = p.reduce(function (a, x) { return a + (x.likes || 0); }, 0);
    $('stViews').textContent = p.reduce(function (a, x) { return a + (x.views || 0); }, 0);
    $('stOrders').textContent = o.length;
    $('stPending').textContent = o.filter(function (x) { return x.status === 'pending'; }).length;
    $('stValue').textContent = Math.round(p.reduce(function (a, x) { return a + Number(x.price || 0); }, 0) / 1000);
  },
  async loadInsights() {
    if (!sb || !Auth.isAdmin) return;
    const r = await sb.from('guide_queries').select('query').eq('matched', false).order('created_at', { ascending: false }).limit(300);
    if (!r.error) this._insights = r.data || [];
  },
  renderInsights() {
    const box = $('insights'); if (!box) return;
    const counts = {};
    this._insights.forEach(function (r) { const k = norm(r.query); if (k) counts[k] = (counts[k] || 0) + 1; });
    const top = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 8);
    box.innerHTML = top.length
      ? top.map(function (k) { return '<div class="insight"><span>' + esc(k) + '</span><b>' + counts[k] + '</b></div>'; }).join('')
      : '<p class="hint">Nothing unanswered yet. The guide is covering every question so far.</p>';
  },
  renderPalettes() {
    const cur = Store.state.theme.palette;
    $('paletteSwatches').innerHTML = Object.entries(PALETTES).map(function (entry) {
      const k = entry[0], v = entry[1];
      return '<div class="swatch' + (k === cur ? ' sel' : '') + '" title="' + esc(v.label) + '" style="background:linear-gradient(135deg,' + v.accent + ',' + v.accent2 + ')" onclick="Edit.palette(\'' + k + '\')"><span class="slb">' + esc(v.label) + '</span></div>';
    }).join('');
  },
  renderLayout() {
    const d = Store.state.layout;
    const svgGlass = '<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#1b1530"/><rect x="6" y="6" width="68" height="22" rx="4" fill="#2a2046" opacity=".9"/><rect x="6" y="32" width="40" height="5" rx="2" fill="#3a2d63"/><rect x="6" y="40" width="25" height="4" rx="2" fill="#2f2452"/><rect x="54" y="38" width="20" height="8" rx="4" fill="#8b5cf6" opacity=".7"/></svg>';
    const svgSpatial = '<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#140f24"/><rect x="10" y="10" width="62" height="20" rx="4" fill="#2a2046" transform="rotate(-1 10 10)"/><rect x="7" y="8" width="62" height="20" rx="4" fill="#1d1538" opacity=".5" transform="rotate(-2 7 8)"/><rect x="6" y="34" width="38" height="4" rx="2" fill="#3a2d63"/><rect x="6" y="41" width="22" height="3" rx="2" fill="#2f2452"/></svg>';
    const svgNeural = '<svg width="80" height="52" viewBox="0 0 80 52" fill="none"><rect width="80" height="52" rx="6" fill="#07050f"/><line x1="10" y1="12" x2="40" y2="28" stroke="#a78bfa" stroke-width=".8" opacity=".4"/><line x1="40" y1="28" x2="68" y2="14" stroke="#a78bfa" stroke-width=".8" opacity=".4"/><circle cx="10" cy="12" r="2.5" fill="#a78bfa"/><circle cx="40" cy="28" r="3" fill="#c4b5fd"/><circle cx="68" cy="14" r="2" fill="#a78bfa"/></svg>';
    const views = [['glass', svgGlass, 'Studio glass', 'frosted liquid'], ['spatial', svgSpatial, 'Spatial float', 'cards lift & drift'], ['neural', svgNeural, 'Neural space', 'dark, alive, neurons']];
    $('viewOpts').innerHTML = views.map(function (v) { return '<div class="opt' + (d.view === v[0] ? ' sel' : '') + '" onclick="Views.set(\'' + v[0] + '\')" style="display:flex;flex-direction:column;align-items:center;gap:6px">' + v[1] + '<div class="lname">' + esc(v[2]) + '</div><div class="ldesc">' + esc(v[3]) + '</div></div>'; }).join('');
    const dens = [['standard', 'Standard', 'balanced grid'], ['editorial', 'Editorial', 'big & airy'], ['dense', 'Dense', 'more per row']];
    $('densityOpts').innerHTML = dens.map(function (v) { return '<div class="opt' + (d.density === v[0] ? ' sel' : '') + '" onclick="Edit.layout(\'density\',\'' + v[0] + '\')"><div class="lname">' + esc(v[1]) + '</div><div class="ldesc">' + esc(v[2]) + '</div></div>'; }).join('');
    const shapes = [['default', 'Soft', 'rounded glass'], ['round', 'Pebble', 'extra round'], ['sharp', 'Crisp', 'near-square']];
    $('shapeOpts').innerHTML = shapes.map(function (v) { return '<div class="opt' + (d.shape === v[0] ? ' sel' : '') + '" onclick="Edit.layout(\'shape\',\'' + v[0] + '\')"><div class="lname">' + esc(v[1]) + '</div><div class="ldesc">' + esc(v[2]) + '</div></div>'; }).join('');
    const bgs = [['caustic', 'Caustic', 'light waves'], ['neural', 'Neural', 'live nodes'], ['stars', 'Stars', 'twinkling sky'], ['grid', 'Grid', 'precise lines'], ['minimal', 'Minimal', 'clean flat'], ['ink', 'Ink', 'soft gradient']];
    $('bgOpts').innerHTML = bgs.map(function (v) { return '<div class="opt' + (d.bgMode === v[0] ? ' sel' : '') + '" onclick="Edit.layout(\'bgMode\',\'' + v[0] + '\')"><div class="lname">' + esc(v[1]) + '</div><div class="ldesc">' + esc(v[2]) + '</div></div>'; }).join('');
    const trans = [['fade', 'Fade', 'clean dissolve'], ['slideUp', 'Slide Up', 'sweeps upward'], ['zoomOut', 'Zoom Out', 'pulls back'], ['blurDissolve', 'Blur', 'melts away'], ['splitH', 'Split', 'tears open']];
    $('transitionOpts').innerHTML = trans.map(function (v) { return '<div class="opt' + (d.introTransition === v[0] ? ' sel' : '') + '" onclick="Edit.layout(\'introTransition\',\'' + v[0] + '\')"><div class="lname">' + esc(v[1]) + '</div><div class="ldesc">' + esc(v[2]) + '</div></div>'; }).join('');
  },
  renderProducts() {
    const wrap = $('adminProducts'), p = Store.products;
    if (!p.length) { wrap.innerHTML = '<p style="text-align:center;color:var(--ink-soft);padding:20px">No works yet. Add your first piece above.</p>'; return; }
    wrap.innerHTML = p.map(function (x) {
      const isVid = x.type === 'video';
      const tImg = isVid ? Media.thumb(x) : x.images[0];
      const thumb = tImg ? '<div class="athumb"><img src="' + esc(tImg) + '" alt="" loading="lazy"></div>' : '<div class="athumb">' + Render.glyph(isVid ? 'video' : x.category) + '</div>';
      const sub = isVid ? 'Video · ' + (x.duration || '—') + ' · ♥ ' + x.likes : Render.money(x.price) + ' · ' + Render.label(x.category) + ' · ♥ ' + x.likes;
      return '<div class="padmin">' + thumb + '<div class="pinfo"><h4>' + esc(x.title) + '</h4><small>' + esc(sub) + '</small></div><div class="pacts">'
        + '<button class="mini me" onclick="Editor.openEdit(\'' + x.id + '\')" title="Edit" aria-label="Edit">' + ic('edit', 14) + '</button>'
        + '<button class="mini md" onclick="Editor.remove(\'' + x.id + '\')" title="Move to trash" aria-label="Delete">' + ic('trash', 14) + '</button>'
        + '</div></div>';
    }).join('');
  },
  renderGenres() {
    const box = $('genreChips'); if (!box) return;
    box.innerHTML = Store.categories.map(function (c) {
      return '<span class="genre-chip">' + esc(c.label) + '<button onclick="Console.removeGenre(\'' + esc(c.slug) + '\')" aria-label="Remove ' + esc(c.label) + '">' + ic('x', 12) + '</button></span>';
    }).join('') || '<span class="hint">No genres yet. Add the first one below.</span>';
  },
  async addGenre() {
    const label = val('genreNew').trim();
    if (!label) { Toasts.push('Type a genre name first.'); return; }
    const slug = norm(label).replace(/\s+/g, '-').slice(0, 40);
    if (!/^[a-z0-9-]{2,40}$/.test(slug)) { Toasts.push('Use letters or numbers for the genre name.'); return; }
    const r = await sb.from('categories').insert({ slug: slug, label: label, sort_order: Store.categories.length + 1 });
    if (r.error) { Toasts.push('That genre already exists, or could not be added.'); return; }
    $('genreNew').value = '';
    await Store.loadCategories(); this.renderGenres(); Gallery.apply(); Toasts.push('Genre added: ' + label);
  },
  async removeGenre(slug) {
    const used = Store.products.filter(function (p) { return p.category === slug; }).length;
    const msg = used ? 'Remove this genre? ' + used + ' work(s) keep it and will show its name until you reassign them.' : 'Remove this genre?';
    if (!confirm(msg)) return;
    const r = await sb.from('categories').delete().eq('slug', slug);
    if (r.error) { Toasts.push('Could not remove the genre.'); return; }
    await Store.loadCategories(); this.renderGenres(); Gallery.apply(); Toasts.push('Genre removed');
  },
  async renderTrash() {
    const box = $('trashList'); if (!box) return;
    await Store.loadTrash();
    const t = Store.trash;
    if (!t.length) { box.innerHTML = '<p class="hint">Nothing in the trash.</p>'; return; }
    box.innerHTML = t.map(function (x) {
      const left = Math.max(0, TRASH_DAYS - Math.floor((Date.now() - Date.parse(x.deleted_at)) / DAY));
      return '<div class="padmin"><div class="pinfo"><h4>' + esc(x.title) + '</h4><small>' + left + ' day(s) left to restore</small></div><div class="pacts">'
        + '<button class="mini me" onclick="Console.restore(\'' + x.id + '\')" title="Restore" aria-label="Restore">' + ic('restore', 14) + '</button>'
        + '<button class="mini md" onclick="Console.forever(\'' + x.id + '\')" title="Delete forever" aria-label="Delete forever">' + ic('trash', 14) + '</button>'
        + '</div></div>';
    }).join('');
  },
  async restore(id) {
    const r = await sb.from('products').update({ deleted_at: null }).eq('id', id);
    if (r.error) { Toasts.push('Could not restore.'); return; }
    await Store.loadProducts(); Gallery.apply(); this.renderProducts(); this.renderTrash(); this.stats(); Toasts.push('Work restored');
  },
  async forever(id) {
    if (!confirm('Delete this work permanently? This cannot be undone.')) return;
    const r = await sb.from('products').delete().eq('id', id);
    if (r.error) { Toasts.push('Could not delete.'); return; }
    this.renderTrash(); Toasts.push('Deleted permanently');
  }
};

/* ── GOOGLE ANALYTICS (only when an ID is set) ── */
const GA = {
  ready: false,
  init() {
    const id = Store.state.analytics.gaId;
    if (!id || this.ready) return;
    const s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + enc(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', id); this.ready = true;
  },
  event(name, params) { if (this.ready && window.gtag) gtag('event', name, params || {}); }
};

/* ── UI ── */
const UI = {
  openOverlay(id) {
    const el = $(id); if (!el) return;
    el.classList.add('show'); UI.lockScroll();
    setTimeout(function () { const first = el.querySelector('input,button,textarea,select'); if (first) first.focus(); }, 80);
  },
  closeAll() {
    document.querySelectorAll('.overlay').forEach(function (o) { o.classList.remove('show'); });
    $('cart').classList.remove('show');
    Guide.close(true);
    $('dMedia').innerHTML = '';
    if (!$('console').classList.contains('show')) $('scrim').classList.remove('show');
    UI.unlockScroll();
  },
  lockScroll() {
    if (!document.body.classList.contains('scroll-locked')) { UI._y = window.scrollY || 0; document.body.style.top = '-' + UI._y + 'px'; document.body.classList.add('scroll-locked'); }
    document.body.style.overflow = 'hidden'; document.body.classList.add('studio-open');
  },
  unlockScroll() {
    if (document.querySelector('.overlay.show,.console.show,.cart.show,.guide-panel.show')) return;
    document.body.style.overflow = ''; document.body.classList.remove('studio-open');
    if (document.body.classList.contains('scroll-locked')) { document.body.classList.remove('scroll-locked'); document.body.style.top = ''; window.scrollTo({ top: UI._y || 0, behavior: 'instant' }); }
  },
  hap(p) { try { if (Store.state.layout.haptics && navigator.vibrate) navigator.vibrate(p || 10); } catch (e) {} }
};

/* ── PRESS RESPONSE: every button answers a tap ── */
document.addEventListener('click', function (e) {
  const b = e.target.closest('.cbtn,.act,.chip,.opt,.swatch,.icon-btn,.ctab,.btn,.genre-chip button,.seg button,.seg-mini button');
  if (!b || b.disabled) return;
  b.classList.remove('ak-press'); void b.offsetWidth; b.classList.add('ak-press');
  setTimeout(function () { b.classList.remove('ak-press'); }, 400);
}, true);

/* ── EFFECTS (same visual system; ripples ignore studio taps) ── */
const Physics = {
  reduced: matchMedia('(prefers-reduced-motion:reduce)').matches, neuralOn: false, ripples: [], nodes: [], _starsRunning: false,
  bindTilt() {
    if (this.reduced) return;
    document.querySelectorAll('.card').forEach(function (card) {
      card.onpointermove = function (e) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (px * 8) + 'deg) rotateX(' + (-py * 8) + 'deg) translateY(-6px)';
      };
      card.onpointerleave = function () { card.style.transform = ''; };
    });
  },
  initRipple() {
    const cv = $('rippleCanvas'), ctx = cv.getContext('2d');
    const fit = function () { cv.width = innerWidth; cv.height = innerHeight; };
    fit(); addEventListener('resize', fit);
    const self = this;
    addEventListener('pointerdown', function (e) {
      if (self.reduced || (e.target.closest && e.target.closest('.console,.overlay,.cart,.guide-panel,.splash,.busy,.guide-fab,.scrim'))) return;
      self.ripples.push({ x: e.clientX, y: e.clientY, r: 0, a: .5 });
    });
    const loop = function () {
      if (document.hidden || document.body.classList.contains('studio-open')) { ctx.clearRect(0, 0, cv.width, cv.height); requestAnimationFrame(loop); return; }
      ctx.clearRect(0, 0, cv.width, cv.height);
      self.ripples = self.ripples.filter(function (rp) { return rp.a > 0.02; });
      const c = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#8b5cf6';
      self.ripples.forEach(function (rp) { rp.r += 4; rp.a *= 0.95; ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.strokeStyle = self._rgba(c, rp.a); ctx.lineWidth = 2; ctx.stroke(); });
      requestAnimationFrame(loop);
    };
    if (!this.reduced) loop();
  },
  rippleAt(el) { if (this.reduced || !el) return; const r = el.getBoundingClientRect(); this.ripples.push({ x: r.left + r.width / 2, y: r.top + r.height / 2, r: 0, a: .65 }); },
  _rgba(hex, a) { const n = parseInt(hex.replace('#', ''), 16); return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')'; },
  initNeural() {
    const cv = $('neuralCanvas'), ctx = cv.getContext('2d');
    let w, h;
    const fit = function () { w = cv.width = innerWidth; h = cv.height = innerHeight; };
    fit(); addEventListener('resize', fit);
    const N = innerWidth < 640 ? 30 : 60; this.nodes = [];
    for (let i = 0; i < N; i++) this.nodes.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + 1 });
    const mouse = { x: -999, y: -999 };
    addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    const self = this; let _ca = '', _ca2 = '', _frame = 0;
    const loop = function () {
      requestAnimationFrame(loop);
      if (document.hidden || self.reduced || !self.neuralOn || document.body.classList.contains('studio-open')) { if (!self.neuralOn) ctx.clearRect(0, 0, w, h); return; }
      _frame++;
      if (_frame % 60 === 0 || !_ca) {
        _ca = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#8b5cf6';
        _ca2 = getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim() || '#6d28d9';
      }
      ctx.clearRect(0, 0, w, h);
      if (Store.state.layout.fx !== false && Store.state.layout.bgMode !== 'stars') self.drawStars(ctx, w, h);
      const ns = self.nodes;
      for (let i = 0; i < ns.length; i++) { const n = ns[i]; n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy); if (d < 140 && d > 0) { n.x += dx / d * .9; n.y += dy / d * .9; } }
      for (let i = 0; i < ns.length; i++) { for (let j = i + 1; j < ns.length; j++) { const a = ns[i], b = ns[j]; const dist = Math.hypot(a.x - b.x, a.y - b.y); if (dist < 130) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = self._rgba(_ca, (1 - dist / 130) * .3); ctx.lineWidth = 1; ctx.stroke(); } } }
      for (let i = 0; i < ns.length; i++) { const n = ns[i]; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = self._rgba(_ca2, .85); ctx.shadowBlur = 9; ctx.shadowColor = _ca; ctx.fill(); ctx.shadowBlur = 0; }
    };
    loop();
  },
  drawStars(ctx, w, h) {
    const S = this._st || (this._st = Array.from({ length: 120 }, function () { return { x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + .3, a: Math.random() * 6.28, v: .004 + Math.random() * .012 }; }));
    S.forEach(function (s) { s.a += s.v; const al = (Math.sin(s.a) + 1) / 2 * .7 + .15; ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, 6.2832); ctx.fillStyle = 'rgba(196,181,253,' + al.toFixed(2) + ')'; ctx.fill(); });
  },
  initStars() {
    if (this._starsRunning) return;
    const cv = $('neuralCanvas'), ctx = cv.getContext('2d');
    const stars = Array.from({ length: 180 }, function () { return { x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.4 + .3, a: Math.random(), speed: Math.random() * .4 + .1 }; });
    this._starsRunning = true;
    const loop = function () {
      if (Store.state.layout.bgMode !== 'stars') { Physics._starsRunning = false; return; }
      ctx.clearRect(0, 0, cv.width, cv.height);
      stars.forEach(function (s) { s.a += s.speed * .008; const alpha = (Math.sin(s.a) + 1) / 2; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(196,181,253,' + alpha * .9 + ')'; ctx.fill(); });
      requestAnimationFrame(loop);
    };
    cv.style.opacity = '1'; loop();
  }
};

/* ── GUIDE: smart search for visitors and the studio ── */
const SYN = {
  price: ['cost', 'how much', 'kes', 'ksh', 'pay'], order: ['buy', 'purchase', 'checkout', 'get it'], cart: ['bag', 'basket'],
  delete: ['remove', 'trash', 'bin', 'erase'], restore: ['undo', 'recover', 'bring back'], password: ['pass', 'pw', 'forgot', 'reset', 'login', 'sign in', 'log in'],
  photo: ['image', 'picture', 'pic', 'photo'], video: ['youtube', 'tiktok', 'clip', 'film', 'reel'], commission: ['custom', 'bespoke', 'made to order', 'request'],
  genre: ['category', 'type', 'kind', 'section'], like: ['heart', 'love', 'favourite', 'favorite'], comment: ['reply', 'review', 'message'],
  blog: ['article', 'post', 'writing'], colour: ['color', 'theme', 'palette', 'purple', 'blue', 'accent'], contact: ['call', 'whatsapp', 'sms', 'email', 'phone', 'reach'],
  layout: ['view', 'background', 'density', 'corner', 'intro', 'stars', 'grid'], backup: ['download', 'export', 'save', 'json'], message: ['template', 'wording', 'text']
};
function tokensOf(q) {
  const base = norm(q).split(' ').filter(function (t) { return t.length > 1; });
  const out = new Set(base);
  base.forEach(function (t) {
    Object.keys(SYN).forEach(function (k) {
      if (k === t || SYN[k].indexOf(t) >= 0) { out.add(k); SYN[k].forEach(function (x) { out.add(norm(x)); }); }
    });
  });
  return Array.from(out).filter(Boolean);
}
const Guide = {
  on: true,
  timer: null, logTimer: null,
  entries() {
    const pub = [
      { keys: ['tag', 'label', 'available', 'sold', 'featured', 'stock', 'green', 'red', 'blue'], title: 'Labels on pieces', body: 'Green Available means it can be ordered now. Red Sold means it has found its home. Blue Featured marks the studio’s favourites.' },
      { keys: ['qr', 'scan', 'code', 'share', 'location', 'where', 'map', 'address', 'find you', 'directions'], title: 'QR code and location', body: 'Tap the QR button at the bottom right to scan or share the studio. Tap the location pill beside it to open the studio on Google Maps.' },
      { keys: ['comment', 'comments', 'reply', 'review', 'opinion'], title: 'Comment on any piece', body: 'Every piece has a comment box right on its card. Type your thought and tap Post. No need to open the piece first.' },
      { keys: ['order', 'buy', 'cart', 'checkout', 'purchase', 'pay'], title: 'Order a piece', body: 'Tap Add to cart on any piece, or Order now. Open the cart and tap Checkout. Enter your full name and delivery address, pick WhatsApp, SMS or Email, then edit the message if you like and send it.', act: 'cart', label: 'Open cart' },
      { keys: ['commission', 'custom', 'bespoke', 'made', 'request'], title: 'Commission a piece', body: 'Answer five short steps: what you want, size and colour, where it will live and how it should feel, budget and timing, then your details. The studio receives it and replies on the method you choose.', act: 'commission', label: 'Start a commission' },
      { keys: ['like', 'heart', 'love', 'favourite', 'favorite', 'comment', 'review', 'reply'], title: 'Like and comment', body: 'Tap the heart to like a piece. Open a piece to read or leave a comment. Your likes stay on this device.' },
      { keys: ['video', 'watch', 'youtube', 'tiktok', 'clip', 'film'], title: 'Watch videos', body: 'Videos play right in the studio. Tap Watch on a video, then use Order what you see to ask about any piece shown.' },
      { keys: ['search', 'find', 'sort', 'filter', 'newest', 'price', 'genre', 'category', 'mats', 'paintings', 'resin'], title: 'Search and sort', body: 'Type in the search bar to find works by name, material, size or colour. Sort by newest, price or most liked, or tap a genre.' },
      { keys: ['contact', 'call', 'phone', 'whatsapp', 'sms', 'email', 'reach', 'talk'], title: 'Contact the studio', body: 'Use Contact to reach Bernice on WhatsApp, SMS, phone or email. The call button on a piece calls the studio directly.' },
      { keys: ['blog', 'read', 'article', 'post', 'news'], title: 'Read the blog', body: 'When the studio has a blog, a Blog link appears in the top menu.' },
      { keys: ['guide', 'help', 'turn off', 'hide', 'disable', 'switch off'], title: 'The guide', body: 'The guide is the round help button at the bottom left. Switch it off or on from the switch at the top of this panel.', act: 'guide-off', label: 'Turn guide off' }
    ];
    const admin = [
      { keys: ['sign in', 'login', 'log in', 'code', 'otp', 'not arriving', 'locked', 'timeout', 'cannot', 'cant', 'can\'t', 'trouble', 'problem', 'error', 'help', 'broken', 'fix', 'not working'], title: 'Cannot sign in', body: 'Check the email spelling. The code expires quickly, so request a new one. If it does not arrive within two minutes, check Spam. After an inactivity lock, enter your password.', act: 'tab:access', label: 'Open Account' },
      { keys: ['passkey', 'fingerprint', 'face', 'biometric'], title: 'Passkey does not work', body: 'Use the phone where you added the passkey. Passkeys sync through iCloud or Google, so a new phone needs its own passkey. If it fails, sign in with the email code and add it again.', act: 'tab:access', label: 'Open Account' },
      { keys: ['missing', 'gone', 'disappeared', 'not showing', 'not appearing', 'work missing', 'product'], title: 'A work is missing', body: 'Check Recently deleted in Works and restore it from there. If you reset the studio recently, use Undo in Account within 30 days to bring every work back.', act: 'tab:works', label: 'Open Works' },
      { keys: ['image', 'photo', 'picture', 'not loading', 'link'], title: 'Image does not show', body: 'The image link must start with https:// and open in a browser. Upload the photo again or paste a fresh link. JPG files under 300 KB load fastest.', act: 'tab:works', label: 'Open Works' },
      { keys: ['storage', 'space', 'full', 'limit', 'memory', 'database', 'usage'], title: 'Storage is getting full', body: 'Open Account and read the Storage panel. Compress photos to under 300 KB before uploading, remove works you no longer need, and avoid large videos. Free limits are 500 MB for the database and 1 GB for files.', act: 'tab:access', label: 'Open Account' },
      { keys: ['comment', 'comments', 'post'], title: 'Comment will not post', body: 'Write something first. Comments are limited to 300 characters. If it still fails, check the connection and try again.' },
      { keys: ['reset', 'undo', 'restore', 'revoke', 'bring back'], title: 'Undo a reset', body: 'Open Account and look at Reset studio. While a reset is active, Undo brings every work back. Works you added after the reset stay.', act: 'tab:access', label: 'Open Account' },
      { keys: ['change email', 'new email', 'email change', 'email'], title: 'Change your email', body: 'Open Account, enter the new email and send the confirmation. Open the link in both inboxes. Then sign in again with the new email.', act: 'tab:access', label: 'Open Account' },
      { keys: ['label', 'tag', 'available', 'sold', 'featured', 'green', 'red', 'blue'], title: 'Add or change a label', body: 'Works tab, then Add artwork or Edit. Under Label, pick None, Available (green), Sold (red) or Featured (blue). Type an optional word to show instead of the default text.', act: 'tab:works', label: 'Go to Works' },
      { keys: ['passkey', 'fingerprint', 'face', 'biometric', 'fast', 'lock', 'timeout', 'inactive', 'locked'], title: 'Passkey and auto-lock', body: 'The studio locks after 8 minutes of inactivity and then asks for your password. If you close it with the X, you can come back without a password for 10 minutes. After that, use your passkey or password. Turn on the passkey in Account.', act: 'tab:access', label: 'Go to Account' },
      { keys: ['qr', 'location', 'map', 'neurons', 'stars', 'background', 'visitors'], title: 'QR, location and background', body: 'Theme tab. Switch the neurons and stars background on or off for all visitors, turn the location pill on or off, and set its text and Google Maps link.', act: 'tab:theme', label: 'Go to Theme' },
      { keys: ['add', 'new', 'upload', 'photo', 'artwork', 'picture', 'work', 'image'], title: 'Add an artwork', body: 'Works tab, then + Add artwork. Give it a title and price, add photos (you’ll see the percentage as they upload), choose a genre and save.', act: 'tab:works', label: 'Go to Works' },
      { keys: ['video', 'youtube', 'tiktok', 'link', 'thumbnail'], title: 'Add a video', body: 'Works tab, then + Add video. Paste the YouTube, TikTok or Vimeo link. The thumbnail fills in automatically for YouTube.', act: 'tab:works', label: 'Go to Works' },
      { keys: ['delete', 'remove', 'trash', 'bin', 'restore', 'recover', 'undo', '30', 'days'], title: 'Delete and restore', body: 'Delete moves a work to Recently deleted, where it waits 30 days. Restore brings it back, or delete it forever from that list.', act: 'tab:works', label: 'Go to Works' },
      { keys: ['genre', 'category', 'type', 'mats', 'bags', 'paintings', 'section'], title: 'Add or remove genres', body: 'Works tab, at the top. Type a genre name and tap Add. Remove a genre with its ×. Works keep their name until you reassign them.', act: 'tab:works', label: 'Go to Works' },
      { keys: ['order', 'orders', 'pending', 'completed', 'status', 'csv', 'export', 'delivered'], title: 'Orders', body: 'Orders tab shows each order with the customer’s name, address, method and what they bought. Mark it completed when delivered. Export to CSV opens in Excel.', act: 'tab:orders', label: 'Go to Orders' },
      { keys: ['commission', 'commissions', 'request', 'status', 'talks', 'accepted'], title: 'Commission requests', body: 'Orders tab, then Commissions. Each request shows the full brief. Change its status as you talk with the client.', act: 'tab:orders', label: 'Go to Commissions' },
      { keys: ['message', 'template', 'wording', 'text', 'whatsapp', 'sms', 'email', 'checkout'], title: 'Edit the checkout message', body: 'Messages tab. Edit the order and commission messages freely. Tags such as {name}, {items} and {total} fill in automatically.', act: 'tab:payments', label: 'Go to Messages' },
      { keys: ['colour', 'color', 'palette', 'theme', 'purple', 'blue', 'accent', 'dark'], title: 'Colours and theme', body: 'Theme tab. Pick a palette or a custom accent, and switch the dark surface on or off. The change shows on every device.', act: 'tab:theme', label: 'Go to Theme' },
      { keys: ['layout', 'view', 'background', 'density', 'corner', 'intro', 'stars', 'neural', 'grid'], title: 'Layout and background', body: 'Layout tab. Choose the world, gallery density, corners, background and intro style.', act: 'tab:layout', label: 'Go to Layout' },
      { keys: ['password', 'reset', 'forgot', 'change', 'pass', 'login', 'sign in', 'security'], title: 'Password', body: 'Account tab. Change your password there. On the sign-in screen, Forgot password emails a reset link. You stay signed in on this device, so you won’t be asked each time.', act: 'tab:access', label: 'Go to Account' },
      { keys: ['sign out', 'logout', 'log out', 'leave'], title: 'Sign out', body: 'Account tab, then Sign out of studio. Your work stays safe in the studio database.', act: 'tab:access', label: 'Go to Account' },
      { keys: ['backup', 'download', 'export', 'save', 'json'], title: 'Download a backup', body: 'Overview, then Download backup. It saves everything as one file you can keep safe.', act: 'tab:overview', label: 'Go to Overview' },
      { keys: ['questions', 'visitors', 'asked', 'searched', 'insight', 'unanswered'], title: 'Visitor questions', body: 'Overview lists the questions visitors asked the guide that it could not answer. Use them to decide what to add next.', act: 'tab:overview', label: 'Go to Overview' },
      { keys: ['guide', 'help', 'turn off', 'hide', 'disable', 'switch off'], title: 'The guide', body: 'Switch the guide on or off from the switch at the top of this panel, or from Account.', act: 'guide-off', label: 'Turn guide off' }
    ];
    const ps = Store.products.filter(function (p) { return p.type !== 'video'; });
    const av = ps.filter(function (p) { return p.tag === 'available'; }), so = ps.filter(function (p) { return p.tag === 'sold'; }), ft = ps.filter(function (p) { return p.tag === 'featured'; });
    const pr = ps.map(function (p) { return p.price; }).filter(Boolean).sort(function (a, b) { return a - b; });
    const top = ps.slice().sort(function (a, b) { return b.likes - a.likes; })[0];
    const live = [];
    if (ps.length) live.push({ keys: ['how many', 'pieces', 'works', 'collection', 'count', 'stock', 'available', 'sold'], title: 'In the studio right now', body: ps.length + ' works listed' + (av.length ? ', ' + av.length + ' Available' : '') + (so.length ? ', ' + so.length + ' Sold' : '') + (ft.length ? ', ' + ft.length + ' Featured' : '') + '.' });
    if (pr.length) live.push({ keys: ['price', 'cost', 'cheapest', 'expensive', 'budget', 'how much', 'range', 'affordable'], title: 'Prices', body: 'Works range from ' + Render.money(pr[0]) + ' to ' + Render.money(pr[pr.length - 1]) + '.' });
    if (ft.length) live.push({ keys: ['featured', 'best', 'recommend', 'favourite', 'favorite'], title: 'Featured works', body: ft.slice(0, 3).map(function (p) { return p.title; }).join(', ') + '.' });
    if (top && top.likes) live.push({ keys: ['liked', 'popular', 'most', 'top', 'trending', 'loved'], title: 'Most loved piece', body: top.title + ' has ' + top.likes + ' likes.', act: 'work:' + top.id, label: 'Open it' });
    return (Auth.isAdmin ? pub.concat(admin) : pub).concat(live);
  },
  sync() {
    $('guideFab').classList.toggle('show', this.on);
    $('sw_guide').classList.toggle('on', this.on);
    $('sw_guide_panel').classList.toggle('on', this.on); $('sw_guide_panel').style.display = Auth.isAdmin ? '' : 'none';
    if (!this.on) { $('guideHint').classList.remove('show'); this.close(true); }
  },
  init() {
    this.on = Store.state.layout.guideOn !== false;
    this.sync(); this.nudge();
    let hinted = false; try { hinted = localStorage.getItem('ak.hinted') === '1'; } catch (e) {}
    if (this.on && !hinted) {
      setTimeout(function () {
        if (!Guide.on || $('console').classList.contains('show')) return;
        $('guideHint').classList.add('show');
        try { localStorage.setItem('ak.hinted', '1'); } catch (e) {}
        setTimeout(function () { $('guideHint').classList.remove('show'); }, 9000);
      }, 4500);
    }
    $('guideResults').addEventListener('click', function (e) {
      const b = e.target.closest('[data-act]'); if (b) Guide.act(b.dataset.act);
    });
  },
  toggle() {
    if (!Auth.isAdmin) { Toasts.push('Only the studio can switch the guide off.'); return; }
    this.on = !this.on; Store.state.layout.guideOn = this.on; dSave();
    this.sync();
    Toasts.push(this.on ? 'Guide is on' : 'Guide is off');
    UI.hap();
  },
  dismissHint() { $('guideHint').classList.remove('show'); },
  open() {
    $('guideHint').classList.remove('show');
    $('guidePanel').classList.add('show'); $('scrim').classList.add('show');
    UI.lockScroll();
    this.search(val('guideQ'));
    setTimeout(function () { $('guideQ').focus(); }, 120);
  },
  close(silent) {
    const el = $('guidePanel'); if (!el || !el.classList.contains('show')) return;
    el.classList.remove('show');
    if (!silent) $('scrim').classList.remove('show');
    UI.unlockScroll();
  },
  near(a, b) {
    if (Math.abs(a.length - b.length) > 2) return false;
    const lim = Math.max(a.length, b.length) >= 7 ? 2 : 1;
    const d = []; for (let i = 0; i <= a.length; i++) { d[i] = [i]; } for (let k = 1; k <= b.length; k++) d[0][k] = k;
    for (let i = 1; i <= a.length; i++) for (let k = 1; k <= b.length; k++) d[i][k] = Math.min(d[i - 1][k] + 1, d[i][k - 1] + 1, d[i - 1][k - 1] + (a[i - 1] === b[k - 1] ? 0 : 1));
    return d[a.length][b.length] <= lim;
  },
  nudge() {
    const gaps = [2, 3, 4, 5], msgs = ['Need a hand? Ask the guide.', 'Looking for something? The guide can find it.', 'Curious about prices or custom pieces? Ask the guide.', 'Questions about ordering? The guide knows.'];
    let i = 0;
    const step = function () {
      if (i >= gaps.length) return;
      setTimeout(function () {
        if (Guide.on && !$('guidePanel').classList.contains('show') && !$('console').classList.contains('show') && !document.querySelector('.overlay.show')) {
          const h = $('guideHint'); h.firstElementChild.textContent = msgs[i]; h.classList.add('show');
          setTimeout(function () { h.classList.remove('show'); }, 8000);
        }
        i++; step();
      }, gaps[i] * 60000);
    };
    step();
  },
  onType() { clearTimeout(this.timer); this.timer = setTimeout(function () { Guide.search(val('guideQ')); }, 160); },
  search(q) {
    const qn = norm(q), toks = tokensOf(q), studio = Auth.isAdmin;
    const scored = this.entries().map(function (e) {
      let s = 0;
      const hay = norm(e.title + ' ' + e.body + ' ' + e.keys.join(' '));
      if (qn && hay.indexOf(qn) >= 0) s += 6;
      toks.forEach(function (t) {
        if (e.keys.some(function (k) { return k === t || (t.length > 2 && k.indexOf(t) === 0); })) s += 4;
        else if (t.length > 3 && e.keys.some(function (k) { return Guide.near(k, t); })) s += 3;
        else if (t.length > 2 && hay.indexOf(t) >= 0) s += 1;
      });
      return { e: e, s: s };
    }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 5).map(function (x) { return x.e; });

    const works = qn ? Store.products.filter(function (p) {
      const h = norm(p.title + ' ' + p.desc + ' ' + p.dims + ' ' + Render.label(p.category));
      return toks.some(function (t) { return t.length > 2 && h.indexOf(t) >= 0; });
    }).slice(0, 4) : [];

    const orders = (qn && studio) ? Store.orders.filter(function (o) {
      const h = norm(o.id + ' ' + o.name + ' ' + o.phone + ' ' + o.address);
      return toks.some(function (t) { return t.length > 2 && h.indexOf(t) >= 0; });
    }).slice(0, 4) : [];

    const box = $('guideResults');
    if (!qn) {
      const start = this.entries().filter(function (e) { return e.keys.indexOf('order') >= 0 || e.keys.indexOf('commission') >= 0 || e.keys.indexOf('add') >= 0 || e.keys.indexOf('password') >= 0; }).slice(0, 4);
      box.innerHTML = '<p class="hint" style="margin-bottom:4px">Start here. Ask anything, or tap a topic.</p>' + start.map(this.card).join('');
      return;
    }
    let html = scored.map(this.card).join('');
    html += works.map(function (p) {
      return '<div class="g-item"><span class="g-tag">Work</span><h4>' + esc(p.title) + '</h4><p>' + Render.money(p.price) + ' · ' + esc(Render.label(p.category)) + '</p><button class="cbtn cbtn-ghost" data-act="work:' + esc(p.id) + '">Open this work</button></div>';
    }).join('');
    html += orders.map(function (o) {
      return '<div class="g-item"><span class="g-tag">Order</span><h4>' + esc(o.id) + ' · ' + esc(o.name || 'No name') + '</h4><p>' + esc(o.status) + ' · ' + Render.money(o.total) + '</p><button class="cbtn cbtn-ghost" data-act="tab:orders">Open orders</button></div>';
    }).join('');
    if (!html) {
      html = '<div class="g-item"><h4>I couldn’t find that yet</h4><p>Try a word like order, password, genre, video, commission or colour. Your question has been noted so the guide can learn it.</p></div>';
    }
    box.innerHTML = html;
    this.logLater(q, !!(scored.length || works.length || orders.length));
  },
  card(e) {
    return '<div class="g-item"><h4>' + esc(e.title) + '</h4><p>' + esc(e.body) + '</p>' + (e.act ? '<button class="cbtn cbtn-ghost" data-act="' + esc(e.act) + '">' + esc(e.label || 'Open') + '</button>' : '') + '</div>';
  },
  logLater(q, matched) {
    clearTimeout(this.logTimer);
    const text = String(q || '').trim().slice(0, 120);
    if (text.length < 3 || !sb) return;
    this.logTimer = setTimeout(function () {
      sb.from('guide_queries').insert({ query: text, side: Auth.isAdmin ? 'studio' : 'public', matched: matched }).then(function () {}, function () {});
    }, 1400);
  },
  act(a) {
    this.close(true);
    if (a === 'cart') { Cart.open(); return; }
    if (a === 'commission') { Commission.open(); return; }
    if (a === 'guide-off') { this.toggle(); return; }
    if (a.indexOf('tab:') === 0) { Console.go(a.slice(4)); return; }
    if (a.indexOf('work:') === 0) { Detail.open(a.slice(5)); return; }
  }
};

/* ── STUDIO LOCK: 8 min idle = password; closing with X = 10 min grace; passkey for fast sign-in ── */
const Lock = {
  IDLE: 8 * 60 * 1000, GRACE: 10 * 60 * 1000, idleT: null, last: Date.now(), _hooked: false,
  start() {
    this.touch();
    if (this._hooked) return; this._hooked = true;
    ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'].forEach(function (ev) {
      document.addEventListener(ev, function () { if ($('console').classList.contains('show')) Lock.touch(); }, { passive: true, capture: true });
    });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) Lock.check(); });
  },
  touch() { this.last = Date.now(); clearTimeout(this.idleT); this.idleT = setTimeout(function () { Lock.check(); }, this.IDLE + 300); },
  check() {
    if (!$('console').classList.contains('show')) return;
    const left = this.IDLE - (Date.now() - this.last);
    if (left <= 0) this.timeout();
    else { clearTimeout(this.idleT); this.idleT = setTimeout(function () { Lock.check(); }, left + 300); }
  },
  async timeout() {
    clearTimeout(this.idleT);
    Console.close('idle');
    try { localStorage.removeItem('ak.left'); } catch (e) {}
    if (sb) { try { await sb.auth.signOut(); } catch (e) {} }
    Auth.isAdmin = false; Auth.email = ''; Auth.pwOnly = true;
    Console.openLogin();
    Auth.setErr('Locked after 8 minutes of inactivity. Enter your password to continue.');
  },
  leave() { clearTimeout(this.idleT); try { localStorage.setItem('ak.left', String(Date.now())); } catch (e) {} },
  needsUnlock() {
    try { const t = Number(localStorage.getItem('ak.left') || 0); return t > 0 && (Date.now() - t) >= this.GRACE; } catch (e) { return false; }
  }
};
const Passkey = {
  fn: SUPABASE_URL + '/functions/v1/passkey',
  ok() { return !!(window.PublicKeyCredential && window.SimpleWebAuthnBrowser); },
  async call(path, body, signedIn) {
    let token = SUPABASE_KEY;
    if (signedIn) {
      const s = await sb.auth.getSession();
      token = (s.data && s.data.session) ? s.data.session.access_token : '';
      if (!token) throw new Error('Sign in first, then add a passkey.');
    }
    const r = await fetch(this.fn + '/' + path, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY, Authorization: 'Bearer ' + token }, body: JSON.stringify(body || {}) });
    const j = await r.json().catch(function () { return {}; });
    if (!r.ok) throw new Error(j.error || ('Something went wrong (' + r.status + ').'));
    return j;
  },
  msg(e) {
    if (e && (e.name === 'NotAllowedError' || e.name === 'AbortError')) return 'No passkey was used. Try Google, an email code or your password.';
    return (e && e.message) || 'Something went wrong. Try again.';
  },
  device() { const u = navigator.userAgent; return /iPhone|iPad/.test(u) ? 'iPhone or iPad' : /Android/.test(u) ? 'Android' : /Mac/.test(u) ? 'Mac' : /Windows/.test(u) ? 'Windows PC' : 'This device'; },
  async addThisDevice() {
    if (!this.ok()) { Toasts.push('Passkeys are not supported in this browser.'); return; }
    try {
      const o = await this.call('register-options', {}, true);
      const r = await SimpleWebAuthnBrowser.startRegistration({ optionsJSON: o.options });
      await this.call('register-verify', { response: r, label: this.device() }, true);
      Toasts.push('Passkey added. Next time, one tap to sign in.'); UI.hap([6, 20, 6]);
      this.renderList();
    } catch (e) { Toasts.push(this.msg(e)); }
  },
  async remove(id) {
    try { await this.call('remove', { id: id }, true); Toasts.push('Passkey removed.'); this.renderList(); }
    catch (e) { Toasts.push(this.msg(e)); }
  },
  async renderList() {
    const box = $('pkList'); if (!box) return;
    try {
      const j = await this.call('list', {}, true);
      const rows = j.items || [];
      box.innerHTML = rows.length
        ? rows.map(function (x) { return '<div class="pk-row"><span><b>' + esc(x.label || 'Passkey') + '</b><small>Added ' + new Date(x.created_at).toLocaleDateString() + '</small></span><button class="cbtn cbtn-ghost pk-rm" onclick="Passkey.remove(\'' + esc(x.id) + '\')">Remove</button></div>'; }).join('')
        : '<p class="hint">No passkeys yet. Add one below for one-tap sign-in.</p>';
    } catch (e) { box.innerHTML = '<p class="hint">Sign in to manage passkeys.</p>'; }
  }
};
Object.assign(Auth, {
  paintMethods() {
    const po = !!this.pwOnly;
    const show = function (id, on) { const el = $(id); if (el) el.style.display = on ? '' : 'none'; };
    show('btnPasskey', false);
    show('btnGoogle', false);
    show('btnCode', false);
    show('codeStep', false);
    show('siOr', false);
    show('emailBlock', true);
    const pw = $('pwBlock'); if (pw) pw.open = true;
    const sub = $('loginSub');
    if (sub) sub.textContent = po ? 'Locked after inactivity. Enter your password to continue.' : 'Sign in to manage Artsy Knots. Stay signed in on this device.';
  },
  async passkeyIn() {
    if (!Passkey.ok()) { this.setErr('Passkeys are not available in this browser. Use Google, an email code or your password.'); return; }
    this.setErr('');
    try {
      const o = await Passkey.call('auth-options', {});
      const r = await SimpleWebAuthnBrowser.startAuthentication({ optionsJSON: o.options });
      const v = await Passkey.call('auth-verify', { response: r });
      const s = await sb.auth.verifyOtp({ token_hash: v.token_hash, type: 'magiclink' });
      if (s.error) throw s.error;
      await this.finishSignIn();
    } catch (e) { this.setErr(Passkey.msg(e)); }
  },
  async google() {
    this.setErr('');
    try { sessionStorage.setItem('ak.oauth', '1'); } catch (e) {}
    const r = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname } });
    if (r.error) { try { sessionStorage.removeItem('ak.oauth'); } catch (e) {} this.setErr('Google sign-in is not set up yet. Use a passkey, an email code or your password.'); }
  },
  async sendCode() {
    const email = val('loginEmail').trim();
    if (!email) { this.setErr('Enter your email first.'); return; }
    this.setErr('');
    const r = await sb.auth.signInWithOtp({ email: email, options: { shouldCreateUser: false } });
    if (r.error) { this.setErr('Could not send a code to that email. Check it, or use a passkey or password.'); return; }
    $('codeStep').style.display = 'flex'; $('loginCode').focus();
    this.setErr('Code sent. Check your inbox.', true);
  },
  async verifyCode() {
    const r = await sb.auth.verifyOtp({ email: val('loginEmail').trim(), token: val('loginCode').trim(), type: 'email' });
    if (r.error) { this.setErr('That code did not work. Check it and try again.'); return; }
    await this.finishSignIn();
  },
  async finishSignIn() {
    const ok = await Splash.run(async function () {
      const a = await Auth.refresh();
      if (a) await Promise.all([Store.loadProducts(), Store.loadCategories(), Store.loadAdminData()]);
      return a;
    });
    if (!ok) { await sb.auth.signOut(); this.isAdmin = false; this.setErr('This account does not have studio access.'); return false; }
    this.pwOnly = false; this.clearFields(); UI.closeAll();
    Console.populate(); Console.present(); Render.all(); Gallery.apply();
    Toasts.push('Welcome back ✨'); UI.hap();
    try {
      if (Passkey.ok() && !localStorage.getItem('ak.pkAsked')) { localStorage.setItem('ak.pkAsked', '1'); setTimeout(function () { Toasts.push('Tip: add a passkey in Account for one-tap sign-in.'); }, 1800); }
    } catch (e) {}
    return true;
  }
});
const _showAuth = Auth.show;
Auth.show = function (v) { _showAuth.call(Auth, v); Auth.paintMethods(); };
const _presentConsole = Console.present;
Console.present = function () { _presentConsole.call(Console); Passkey.renderList(); };

/* ── STUDIO CARE: live storage, reset with 30-day undo, email change, welcome ── */
const Studio = {
  fmt(b) { if (b == null) return '—'; if (b < 1024) return b + ' B'; if (b < 1048576) return Math.round(b / 1024) + ' KB'; if (b < 1073741824) return (b / 1048576).toFixed(1) + ' MB'; return (b / 1073741824).toFixed(2) + ' GB'; },
  msg(t, ok) { const el = $('studioMsg'); if (!el) return; el.textContent = t; el.style.display = t ? 'block' : 'none'; el.style.color = ok ? 'var(--ink)' : ''; },
  async refresh() {
    const box = $('usageBox'); if (!box || !Auth.isAdmin) return;
    try {
      const r = await sb.rpc('studio_usage');
      if (r.error) throw r.error;
      const u = r.data;
      const dbP = Math.min(100, Math.round(u.db_bytes / u.db_limit * 100));
      const flP = Math.min(100, Math.round(u.file_bytes / u.file_limit * 100));
      const warn = (dbP >= 80 || flP >= 80) ? '<p class="usage-warn">Storage is getting full. Read the tips below before adding more works.</p>' : '';
      box.innerHTML = warn
        + '<div class="usage-row"><span>Database</span><b>' + this.fmt(u.db_bytes) + ' of ' + this.fmt(u.db_limit) + '</b></div><div class="ubar"><i style="width:' + dbP + '%"></i></div>'
        + '<div class="usage-row"><span>File storage</span><b>' + this.fmt(u.file_bytes) + ' of ' + this.fmt(u.file_limit) + '</b></div><div class="ubar"><i style="width:' + flP + '%"></i></div>'
        + '<div class="usage-row"><span>Approximate images</span><b>' + u.images + '</b></div>'
        + '<div class="usage-row"><span>Works on the site</span><b>' + u.works + '</b></div>'
        + '<div class="usage-tips"><b>Save space</b><br>Compress photos to under 300 KB before upload. Keep videos on YouTube or Vimeo and link them. Remove works you no longer need. Reset clears the site without deleting anything for 30 days, so use it to start again rather than uploading duplicates.</div>';
      const ub = $('undoBox'); if (ub) ub.style.display = (u.reset && u.reset.active) ? '' : 'none';
    } catch (e) { box.innerHTML = '<p class="hint">Usage could not be read. It will try again shortly.</p>'; }
  },
  async reset() {
    const word = val('resetWord').trim(), pw = val('resetPw');
    if (word !== 'RESET') { this.msg('Type RESET in capitals to confirm.'); return; }
    if (!pw) { this.msg('Enter your password to confirm.'); return; }
    const who = await sb.auth.getUser();
    const email = who.data && who.data.user ? who.data.user.email : Auth.email;
    const c = await sb.auth.signInWithPassword({ email: email, password: pw });
    if (c.error) { this.msg('That password is not correct. If you have no password yet, use Send reset link on the sign-in screen.'); return; }
    if (!confirm('Reset the studio? Every work will leave the site. You can undo this for 30 days.')) return;
    Busy.start('Resetting studio…');
    const r = await sb.rpc('studio_reset');
    if (r.error) { Busy.end(); this.msg('Reset failed. Try again.'); return; }
    Store.state.layout.welcomeAfterReset = true; dSave();
    $('resetWord').value = ''; $('resetPw').value = '';
    await Store.loadProducts(); Gallery.apply(); Console.renderProducts(); Console.stats();
    Busy.end(); this.msg('Studio reset. Undo is available for 30 days.', true); UI.hap([6, 20, 6]);
    this.refresh();
  },
  async undo() {
    if (!confirm('Bring back every work from the reset? Works you added since then stay.')) return;
    Busy.start('Restoring works…');
    const r = await sb.rpc('studio_undo_reset');
    if (r.error) { Busy.end(); this.msg('Could not restore. Try again.'); return; }
    await Store.loadProducts(); Gallery.apply(); Console.renderProducts(); Console.stats();
    Busy.end(); this.msg('Works restored. Newer works were kept.', true); Toasts.push('Works restored.');
    this.refresh();
  },
  async changeEmail() {
    const e = val('newEmail').trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(e)) { this.msg('Enter a valid new email address.'); return; }
    const r = await sb.auth.updateUser({ email: e });
    if (r.error) { this.msg('Could not change the email. ' + r.error.message); return; }
    $('newEmail').value = '';
    this.msg('Confirmation sent. Open the link in both inboxes, then sign in again with the new email.', true);
  },
  checkWelcome() {
    if (!Store.state.layout.welcomeAfterReset) return;
    Auth.refresh().then(function (ok) { if (ok) UI.openOverlay('welcomeOverlay'); });
  },
  dismissWelcome() { Store.state.layout.welcomeAfterReset = false; dSave(); UI.closeAll(); UI.hap(); }
};
const _presentStudio = Console.present;
Console.present = function () { _presentStudio.call(Console); Studio.refresh(); };
setInterval(function () { if ($('console') && $('console').classList.contains('show')) Studio.refresh(); }, 30000);

/* ── SITE BANNER (set from the Theme tab) ── */
const SiteBanner = {
  sync() {
    const b = Store.state.layout.banner || {};
    const text = String(b.text || '').trim().slice(0, 200);
    const on = !!(b.on && text);
    let el = $('siteBanner');
    if (!on) { if (el) el.remove(); }
    else {
      if (!el) { el = document.createElement('div'); el.id = 'siteBanner'; el.setAttribute('role', 'status'); document.body.insertBefore(el, document.body.firstChild); }
      el.textContent = text;
    }
    const sw = $('sw_banner'); if (sw) sw.classList.toggle('on', !!b.on);
    const inp = $('f_banner'); if (inp && document.activeElement !== inp) inp.value = b.text || '';
  }
};
Object.assign(Edit, {
  toggleBanner() { const b = Store.state.layout.banner || {}; b.on = !b.on; Store.state.layout.banner = b; SiteBanner.sync(); dSave(); UI.hap(); },
  setBanner() { const b = Store.state.layout.banner || {}; b.text = val('f_banner').trim().slice(0, 200); Store.state.layout.banner = b; SiteBanner.sync(); dSave(); }
});
const _dockSyncBanner = Dock.sync;
Dock.sync = function () { _dockSyncBanner.call(Dock); SiteBanner.sync(); };
setTimeout(function () { SiteBanner.sync(); }, 900);

/* ── SOLD WORKS: cannot be added to cart or ordered, with a clear notice ── */
const SoldNotice = {
  t: null,
  show() {
    let el = $('soldNotice');
    if (!el) { el = document.createElement('div'); el.id = 'soldNotice'; el.setAttribute('role', 'alert'); document.body.appendChild(el); }
    el.innerHTML = '<b>This piece has been sold.</b><span>It is no longer available to add to cart or to order. For advice on similar works, please contact Bernice, the studio owner.</span>';
    el.classList.add('show');
    clearTimeout(this.t);
    this.t = setTimeout(function () { el.classList.remove('show'); }, 7000);
    UI.hap([8, 30, 8]);
  }
};
const _cartAddSold = Cart.add;
Cart.add = function (id) {
  const p = Store.products.find(function (x) { return x.id === id; });
  if (p && p.tag === 'sold') { SoldNotice.show(); return false; }
  return _cartAddSold.call(Cart, id);
};

/* ── RESET TO TEMPLATE + RESTORE (full snapshot) ── */
Object.assign(Studio, {
  async reset() {
    const word = val('resetWord').trim(), pw = val('resetPw');
    if (word !== 'RESET') { this.msg('Type RESET in capitals to confirm.'); return; }
    if (!pw) { this.msg('Enter your password to confirm.'); return; }
    const who = await sb.auth.getUser();
    const email = who.data && who.data.user ? who.data.user.email : Auth.email;
    const c = await sb.auth.signInWithPassword({ email: email, password: pw });
    if (c.error) { this.msg('That password is not correct. If you have no password yet, use Forgot password? on the sign-in screen.'); return; }
    if (!confirm('Reset the site to the template? Your current site, works, settings and contact details are kept safely and come back when you tap Restore.')) return;
    Busy.start('Resetting studio…');
    const snapshot = JSON.parse(JSON.stringify(Store.state));
    const r = await sb.rpc('studio_reset', { p_snapshot: snapshot });
    if (r.error) { Busy.end(); this.msg('Reset failed. Try again.'); return; }
    Store.state = Store._mg(DEFAULTS, {});
    Store.state.layout.welcomeAfterReset = true;
    await Store.saveSettings();
    await Store.loadProducts();
    Render.all(); Gallery.apply(); Console.renderProducts(); Console.stats(); SiteBanner.sync();
    $('resetWord').value = ''; $('resetPw').value = '';
    Busy.end(); this.msg('Site reset to the template. Tap Restore everything to bring it all back.', true);
    UI.hap([6, 20, 6]); this.refresh();
  },
  async undo() {
    if (!confirm('Restore the site, works, settings and contact details exactly as they were before the reset? Works added since then are kept.')) return;
    Busy.start('Restoring…');
    const r = await sb.rpc('studio_undo_reset');
    if (r.error) { Busy.end(); this.msg('Could not restore. Try again.'); return; }
    const snap = r.data && r.data.snapshot;
    if (snap) { Store.state = Store._mg(DEFAULTS, snap); Store.state.layout.welcomeAfterReset = false; await Store.saveSettings(); }
    await Store.loadProducts();
    Render.all(); Gallery.apply(); Console.renderProducts(); Console.stats(); Console.populate(); SiteBanner.sync();
    Busy.end(); this.msg('Restored. Works added since the reset were kept.', true); Toasts.push('Restored');
    this.refresh();
  }
});

/* ── EXCEL RECORD (editable workbook, readable by people) ── */
Object.assign(Store, {
  async exportWorkbook() {
    if (typeof XLSX === 'undefined') { Toasts.push('Excel export is still loading. Try again in a moment.'); return; }
    Busy.start('Preparing your record…');
    let usage = null; try { const u = await sb.rpc('studio_usage'); usage = u.data; } catch (e) {}
    const now = new Date();
    const fmt = function (t) { return t ? new Date(t).toLocaleString('en-KE') : ''; };
    const works = Store.products.filter(function (p) { return p.type !== 'video'; });
    const videos = Store.products.filter(function (p) { return p.type === 'video'; });
    const comments = Store.products.reduce(function (a, p) { return a + (p.comments || []).length; }, 0);
    const likes = Store.products.reduce(function (a, p) { return a + (p.likes || 0); }, 0);
    const wb = XLSX.utils.book_new();
    const add = function (name, rows, widths) { const ws = XLSX.utils.aoa_to_sheet(rows); ws['!cols'] = widths.map(function (w) { return { wch: w }; }); XLSX.utils.book_append_sheet(wb, ws, name); };
    const summary = [
      ['Artsy Knots: Studio Record'],
      ['Studio', Store.state.brand.name],
      ['Exported on', now.toLocaleString('en-KE')],
      [],
      ['Measure', 'Value'],
      ['Works on the site', works.length],
      ['Videos', videos.length],
      ['Orders', Store.orders.length],
      ['Commissions', Store.commissions.length],
      ['Comments', comments],
      ['Likes', likes]
    ];
    if (usage) summary.push(['Database used (bytes)', usage.db_bytes], ['File storage used (bytes)', usage.file_bytes], ['Approximate images', usage.images]);
    add('Summary', summary, [28, 24]);
    add('Works', [['Title', 'Type', 'Category', 'Label', 'Price (KES)', 'Dimensions', 'Likes', 'Views', 'Comments', 'Images', 'Created', 'Description', 'First image link']]
      .concat(Store.products.map(function (p) { return [p.title, p.type || 'artwork', Render.label(p.category), p.tag || '', p.price, p.dims || '', p.likes || 0, p.views || 0, (p.comments || []).length, (p.images || []).length, fmt(p.createdAt), p.desc || '', (p.images || [])[0] || '']; })),
      [30, 10, 18, 12, 14, 16, 8, 8, 10, 8, 20, 50, 40]);
    add('Orders', [['Order', 'Date', 'Status', 'Method', 'Customer', 'Address', 'Phone', 'Items', 'Total (KES)']]
      .concat(Store.orders.map(function (x) { return [x.id, fmt(x.createdAt), x.status, x.method, x.name, x.address, x.phone, x.items.map(function (i) { return i.title + ' x' + i.qty; }).join('; '), x.total]; })),
      [14, 20, 12, 12, 22, 30, 16, 50, 14]);
    add('Commissions', [['Name', 'Contact', 'Method', 'Piece', 'Size', 'Colours', 'Place', 'Mood', 'Budget', 'Needed by', 'Reference', 'Details', 'Status', 'Received']]
      .concat(Store.commissions.map(function (x) { return [x.name, x.contact, x.method, x.piece, x.size, x.colours, x.place, x.mood, x.budget, x.needed, x.reference, x.details, x.status || '', fmt(x.createdAt)]; })),
      [20, 18, 12, 18, 12, 16, 16, 16, 14, 14, 30, 40, 12, 20]);
    add('Comments', [['Work', 'Name', 'Comment', 'Date']]
      .concat(Store.products.reduce(function (a, p) { (p.comments || []).forEach(function (c) { a.push([p.title, c.name || 'Anonymous', c.text || '', fmt(c.ts)]); }); return a; }, [])),
      [30, 20, 60, 20]);
    XLSX.writeFile(wb, 'artsy-knots-record-' + now.toISOString().slice(0, 10) + '.xlsx');
    Busy.end(); Toasts.push('Record downloaded'); UI.hap();
  }
});

/* ── SHARE THE QR CODE (image + link) ── */
Object.assign(Dock, {
  async shareQr() {
    const svg = document.querySelector('#qrBox svg');
    if (!svg) { Toasts.push('The QR code is not ready yet.'); return; }
    const url = location.origin + location.pathname;
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml;charset=utf-8' });
    const src = URL.createObjectURL(blob);
    const img = new Image();
    try { await new Promise(function (res, rej) { img.onload = res; img.onerror = rej; img.src = src; }); }
    catch (e) { URL.revokeObjectURL(src); Toasts.push('The QR code could not be prepared. Try again.'); return; }
    const cv = document.createElement('canvas'); cv.width = 800; cv.height = 800;
    const cx = cv.getContext('2d'); cx.fillStyle = '#ffffff'; cx.fillRect(0, 0, 800, 800); cx.drawImage(img, 40, 40, 720, 720);
    URL.revokeObjectURL(src);
    const png = await new Promise(function (res) { cv.toBlob(res, 'image/png'); });
    const file = new File([png], 'artsy-knots-qr.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Artsy Knots', text: 'Explore Artsy Knots', url: url }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; }
    }
    const a = document.createElement('a'); a.href = URL.createObjectURL(png); a.download = 'artsy-knots-qr.png'; a.click();
    try { await navigator.clipboard.writeText(url); Toasts.push('QR image saved. Site link copied.'); }
    catch (e) { Toasts.push('QR image saved to your downloads.'); }
  }
});

/* ── SIGN-IN: password form only, always open ── */
const _paintMethodsPw = Auth.paintMethods;
Auth.paintMethods = function () { _paintMethodsPw.call(Auth); const pw = $('pwBlock'); if (pw) pw.open = true; };
setTimeout(function () { const pk = $('pkList'); if (pk && pk.closest('.field')) pk.closest('.field').style.display = 'none'; }, 1200);

/* ── REVEAL ── */
const Reveal = {
  io: null,
  init() { this.io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); Reveal.io.unobserve(e.target); } }); }, { threshold: .12 }); this.scan(); },
  scan() { if (!this.io) return; document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { Reveal.io.observe(el); }); }
};

/* ── INTRO ── */
function initIntro() {
  const intro = $('introScreen');
  if (!intro) return;
  const b = Store.state.brand;
  const logo = $('rotatingLogo');
  if (b.logoUrl) logo.innerHTML = '<img src="' + esc(b.logoUrl) + '" alt="' + esc(b.name) + '" style="width:100%;height:100%;object-fit:cover;border-radius:20px">';
  else logo.textContent = b.logoLetter || 'A';
  $('introText').innerHTML = '<p class="welcome-text">Welcome into my world<br>by ' + esc(b.name) + '\'s thoughts,<br>creativity, and perception<br>of the world.</p>';
  const cls = 'intro-out-' + (Store.state.layout.introTransition || 'fade');
  setTimeout(function () { intro.classList.add(cls); }, 5200);
  setTimeout(function () { intro.style.display = 'none'; }, 5900);
  setTimeout(function () { Studio.checkWelcome(); }, 6200);
}

/* ── EVENTS ── */
$('consoleTabs').addEventListener('click', function (e) {
  const b = e.target.closest('.ctab');
  if (b) Console.tab(b.dataset.tab, b);
});
document.addEventListener('click', function (e) {
  if (!e.target.closest('.sort-menu')) { const sp = $('sortPop'); if (sp) sp.classList.remove('show'); }
});
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  if ($('guidePanel').classList.contains('show')) Guide.close();
  else UI.closeAll();
});
let lastY = 0;
addEventListener('scroll', function () {
  const y = scrollY, bar = $('topbar');
  if (bar) bar.style.transform = (y > lastY && y > 200) ? 'translateX(-50%) translateY(-130%)' : 'translateX(-50%)';
  lastY = y;
}, { passive: true });
document.addEventListener('visibilitychange', function () {
  if (!document.hidden) Store.refresh();
});

/* ── LIVE SYNC: changes made on one device appear on every other device ── */
function subscribeLive() {
  if (!sb || !sb.channel) return;
  const ch = sb.channel('studio-live');
  ['products', 'comments', 'site_settings', 'categories', 'orders', 'commissions'].forEach(function (table) {
    ch.on('postgres_changes', { event: '*', schema: 'public', table: table }, function () { Store.refresh(); });
  });
  ch.subscribe();
}

/* ── PASSWORD RESET + SESSION EVENTS ── */
function wireAuth() {
  if (!sb) return;
  sb.auth.onAuthStateChange(function (event) {
    if (event === 'PASSWORD_RECOVERY') { Auth.recovering = true; Console.openLogin(); Auth.show('newPassView'); }
    if (event === 'SIGNED_OUT') { Auth.isAdmin = false; Auth.email = ''; }
  });
  if (sessionStorage.getItem('ak.oauth')) { sessionStorage.removeItem('ak.oauth'); sb.auth.getSession().then(function (s) { if (s.data && s.data.session) { Console.openLogin(); Auth.finishSignIn(); } }); }
  if (location.hash.indexOf('type=recovery') >= 0) {
    Auth.recovering = true; Console.openLogin(); Auth.show('newPassView');
  }
}

/* ── BOOT ── */
async function boot() {
  try { if (navigator.hardwareConcurrency <= 2) document.body.dataset.lowperf = 'true'; } catch (e) {}

  /* 1. Instant: paint from this device's last-known studio, so nothing waits on the network */
  Store.readCache();
  Cart.restore(); Cart.bump();
  Render.all();
  Gallery.skeleton();
  initIntro();
  Reveal.init();
  Physics.initRipple();
  Physics.initNeural();
  Physics.neuralOn = (Store.state.layout.fx !== false); Dock.sync();
  if (Store.state.layout.bgMode === 'stars') Physics.initStars();
  Guide.init();
  wireAuth();

  /* 2. Background: fresh data from Supabase, all at once */
  await Promise.allSettled([Store.loadSettings(), Store.loadProducts(), Store.loadCategories()]);
  Render.all();
  GA.init();

  /* 3. Owner session, if this device is already signed in */
  if (await Auth.refresh()) {
    await Store.loadAdminData();
    Render.brand();
    Console.stats();
  }

  subscribeLive();
}

document.addEventListener('DOMContentLoaded', boot);
