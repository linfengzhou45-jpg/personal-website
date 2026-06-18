/* ============================================================
   L.F. ZHOU · v2.1 (Wave-1)
   - CN/EN 切换（基于 :root[lang] CSS 切换）
   - 重排后的 section 适配
   - Work 横向看板按钮翻页（基础版，Wave 2 增强）
   - Hero / ZHOU / Stack / Writing / Contact 复用 v2 动效
   ============================================================ */

window.__heroOwned = true;

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOVER   = window.matchMedia('(hover: hover)').matches;
const MOBILE  = window.matchMedia('(max-width: 767px)').matches;

function vendorsReady(timeoutMs = 4000) {
  return new Promise((resolve, reject) => {
    const t0 = performance.now();
    const tick = () => {
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        resolve();
      } else if (performance.now() - t0 > timeoutMs) {
        reject(new Error('vendor timeout'));
      } else {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });
}

/* ============================================================
   Helpers
   ============================================================ */
function splitToChars(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  nodes.forEach((node) => {
    const frag = document.createDocumentFragment();
    [...node.textContent].forEach((c) => {
      if (c === ' ') { frag.appendChild(document.createTextNode(' ')); return; }
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = c;
      frag.appendChild(s);
    });
    node.replaceWith(frag);
  });
}

function splitToWords(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  nodes.forEach((node) => {
    const text = node.textContent;
    if (!text || !text.trim()) return;
    const frag = document.createDocumentFragment();
    text.split(/(\s+)/).forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
      if (/[一-鿿]/.test(tok)) {
        [...tok].forEach((c) => {
          const s = document.createElement('span');
          s.className = 'word';
          s.textContent = c;
          frag.appendChild(s);
        });
      } else {
        const s = document.createElement('span');
        s.className = 'word';
        s.textContent = tok;
        frag.appendChild(s);
      }
    });
    node.replaceWith(frag);
  });
}

/* ============================================================
   Content rendering — 从 content.js 渲染各个 section
   ============================================================ */

/* [[xxx]] → 橙色 kw span；\n → <br/> */
function parseKw(s) {
  return String(s == null ? '' : s)
    .replace(/\[\[([^\]]+)\]\]/g, '<span class="kw">$1</span>')
    .replace(/\n/g, '<br/>');
}

/* 双语字段渲染：可以是 string（中英共用）或 { zh, en }（自动加 lang span） */
function rb(field) {
  if (field == null) return '';
  if (typeof field === 'string') return parseKw(field);
  const zh = field.zh != null ? parseKw(field.zh) : '';
  const en = field.en != null ? parseKw(field.en) : '';
  if (zh && en) return `<span lang="zh">${zh}</span><span lang="en">${en}</span>`;
  return zh || en;
}

/* 简单字符串字段：可能是 string 或 {zh, en} —— 不做 kw 解析（用于 label 等） */
function lt(field) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  const zh = field.zh != null ? field.zh : '';
  const en = field.en != null ? field.en : '';
  if (zh && en) return `<span lang="zh">${zh}</span><span lang="en">${en}</span>`;
  return zh || en;
}

const ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ARROW_SVG_WRITE = '<svg class="writing-link__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';

/* ---------- HERO ---------- */
function renderHero(c) {
  if (!c) return;
  const eyebrow = document.querySelector('.hero__eyebrow');
  if (eyebrow) eyebrow.innerHTML = lt(c.eyebrow);

  const h1 = document.querySelector('.hero__h1');
  if (h1 && c.h1) {
    const ready = h1.classList.contains('is-ready');
    h1.textContent = c.h1;
    if (ready) h1.classList.add('is-ready');
  }

  const sub = document.querySelector('.hero__sub');
  if (sub) sub.innerHTML = rb(c.subtitle);

  const cta1 = document.querySelector('#hero-cta');
  if (cta1 && c.ctaPrimary) {
    cta1.innerHTML = lt(c.ctaPrimary.label) + ARROW_SVG;
    if (c.ctaPrimary.href) cta1.setAttribute('href', c.ctaPrimary.href);
  }
  const cta2 = document.querySelector('.hero__ctas .btn--ghost');
  if (cta2 && c.ctaSecondary) {
    cta2.innerHTML = lt(c.ctaSecondary.label);
    if (c.ctaSecondary.href) cta2.setAttribute('href', c.ctaSecondary.href);
  }
}

/* ---------- ZHOU ---------- */
function renderZhou(c) {
  if (!c) return;
  /* head */
  const head = document.querySelector('.zhou__head');
  if (head) {
    const eyebrow = head.querySelector('.section-eyebrow');
    if (eyebrow) eyebrow.innerHTML = lt(c.eyebrow);
    const title = head.querySelector('.section-title');
    if (title) title.innerHTML = rb(c.title);
    const lead = head.querySelector('.section-lead');
    if (lead) lead.innerHTML = rb(c.lead);
  }

  /* items */
  const list = document.querySelector('.zhou-list');
  if (!list || !Array.isArray(c.items)) return;
  list.innerHTML = c.items.map((item, i) => `
    <li class="zhou-row" data-zhou>
      <div class="zhou-row__char">${item.letter || ''}</div>
      <div class="zhou-row__body">
        <div class="zhou-row__num">/ ${String(i + 1).padStart(2, '0')}</div>
        <h3 class="zhou-row__title">
          ${item.titleEn || ''}
          <span lang="zh" class="zh">${item.subtitle?.zh || ''}</span>
          <span lang="en" class="zh">${item.subtitle?.en || ''}</span>
        </h3>
        <p class="zhou-row__quote">${parseKw(item.quote || '')}</p>
        <p class="zhou-row__body-text">${rb(item.body)}</p>
      </div>
    </li>
  `).join('');
}

/* ---------- CAPABILITIES ---------- */
function renderCapabilities(c) {
  if (!c) return;
  const head = document.querySelector('.cap__head');
  if (head) {
    const eyebrow = head.querySelector('.section-eyebrow');
    if (eyebrow) eyebrow.innerHTML = lt(c.eyebrow);
    const title = head.querySelector('.section-title');
    if (title) title.innerHTML = rb(c.title);
  }

  const list = document.querySelector('.cap-list');
  if (!list || !Array.isArray(c.items)) return;
  list.innerHTML = c.items.map(item => `
    <li class="cap-item">
      <span class="cap-item__num">${item.num || ''}</span>
      <div>
        <h3 class="cap-item__title">${rb(item.title)}</h3>
        <p class="cap-item__desc">${rb(item.desc)}</p>
      </div>
      <ul class="cap-item__chips">
        ${(item.chips || []).map(t => `<li class="tag">${t}</li>`).join('')}
      </ul>
    </li>
  `).join('');
}

/* ---------- WORK ---------- */
function renderWork(c) {
  if (!c) return;
  const head = document.querySelector('.work__head');
  if (head) {
    const eyebrow = head.querySelector('.section-eyebrow');
    if (eyebrow) eyebrow.innerHTML = lt(c.eyebrow);
    const title = head.querySelector('.section-title');
    if (title) title.innerHTML = rb(c.title);
  }

  const deck = document.querySelector('[data-work-deck]');
  if (!deck || !Array.isArray(c.items)) return;
  deck.innerHTML = c.items.map(item => `
    <li class="work-card" data-work data-url="${item.url || '#'}">
      <div class="work-card__num">${item.num || ''}</div>
      <div class="work-card__media">
        <img alt="${item.titleEn || ''}" src="${item.image || ''}" />
      </div>
      <div class="work-card__title-en">${item.titleEn || ''}</div>
      <h3 class="work-card__title">${rb(item.title)}</h3>
      <p class="work-card__desc">${rb(item.desc)}</p>
      <ul class="work-card__tags">
        ${item.year ? `<li class="tag tag--accent">${item.year}</li>` : ''}
        ${(item.tags || []).map(t => `<li class="tag">${t}</li>`).join('')}
      </ul>
    </li>
  `).join('');
}

/* ---------- STACK ---------- */
function renderStack(c) {
  if (!c) return;
  const head = document.querySelector('.stack__head');
  if (head) {
    const eyebrow = head.querySelector('.section-eyebrow');
    if (eyebrow) eyebrow.innerHTML = lt(c.eyebrow);
    const title = head.querySelector('.section-title');
    if (title) title.innerHTML = rb(c.title);
  }

  const grid = document.querySelector('.stack-grid');
  if (!grid || !Array.isArray(c.cells)) return;
  grid.innerHTML = c.cells.map(cell => `
    <div class="stack-cell">
      <span class="stack-cell__cat">${lt(cell.cat)}</span>
      <ul class="stack-cell__list">
        ${(cell.items || []).map(it => `<li>${it}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

/* ---------- WRITING ---------- */
function renderWriting(c) {
  if (!c) return;
  const head = document.querySelector('.writing__head');
  if (head) {
    const eyebrow = head.querySelector('.section-eyebrow');
    if (eyebrow) eyebrow.innerHTML = lt(c.eyebrow);
    const title = head.querySelector('.section-title');
    if (title) title.innerHTML = rb(c.title);
  }

  const list = document.querySelector('.writing-list');
  if (!list || !Array.isArray(c.items)) return;
  list.innerHTML = c.items.map(item => {
    const href = item.url || '#';
    const target = (href.startsWith('http') || href.startsWith('//')) ? ' target="_blank" rel="noreferrer"' : '';
    return `
      <li class="writing-item">
        <a href="${href}" class="writing-link"${target}>
          <span class="writing-link__date">${item.date || ''}</span>
          <span class="writing-link__title">${rb(item.title)}</span>
          <span class="writing-link__tags">${(item.tags || []).map(t => `<span class="tag">${t}</span>`).join(' ')}</span>
          ${ARROW_SVG_WRITE}
        </a>
      </li>
    `;
  }).join('');
}

/* ---------- CONTACT ---------- */
function escapeAttr(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderContact(c) {
  if (!c) return;
  const inner = document.querySelector('.contact__inner');
  if (!inner) return;

  const eyebrow = inner.querySelector('.section-eyebrow');
  if (eyebrow) eyebrow.innerHTML = lt(c.eyebrow);

  const title = document.querySelector('.contact__title');
  if (title && c.title) {
    /* 把 [[xxx]] 替换为带 id 的 sharp span（用于 hover-字重 互动） */
    const wrap = (s, idSuffix) => String(s == null ? '' : s)
      .replace(/\[\[([^\]]+)\]\]/, `<span class="contact__title-sharp" id="contact-sharp${idSuffix}">$1</span>`);
    title.innerHTML =
      `<span lang="zh">${wrap(c.title.zh, '')}</span>` +
      `<span lang="en">${wrap(c.title.en, '-en')}</span>`;
  }

  const sub = document.querySelector('.contact__sub');
  if (sub) sub.innerHTML = rb(c.sub);

  const list = document.querySelector('.contact-list');
  if (!list || !Array.isArray(c.channels)) return;
  list.innerHTML = c.channels.map(ch => {
    const labelHtml = lt(ch.label);
    const value = ch.value || '';
    const primaryAttr = ch.primary ? ' id="contact-cta"' : '';
    /* 有 qr 字段 → 弹窗显示二维码（同时把 value 传进去给"复制 ID"按钮）；否则 → 复制 value */
    const labelText = typeof ch.label === 'string' ? ch.label : (ch.label?.en || ch.label?.zh || '');
    const dataAttr = ch.qr
      ? `data-action="qr" data-qr="${escapeAttr(ch.qr)}" data-label="${escapeAttr(labelText)}" data-id="${escapeAttr(value)}"`
      : `data-action="copy" data-copy="${escapeAttr(value)}"`;
    return `
      <li class="contact-list__item">
        <span class="contact-list__label">${labelHtml}</span>
        <button type="button" class="contact-list__value contact-list__value--btn" ${dataAttr}${primaryAttr}>${value}</button>
      </li>
    `;
  }).join('');

  bindContactActions();
}

/* ---------- 联系方式 click 行为：copy 或 qr ---------- */
function bindContactActions() {
  const list = document.querySelector('.contact-list');
  if (!list || list.dataset.bound) return;
  list.dataset.bound = '1';
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    e.preventDefault();
    const action = btn.dataset.action;
    if (action === 'qr') {
      showQrPopover(btn, btn.dataset.qr, btn.dataset.label || '', btn.dataset.id || '');
    } else if (action === 'copy') {
      copyToClipboard(btn.dataset.copy || '', btn);
    }
  });
}

/* ---------- 复制到剪贴板 + Toast 提示 ---------- */
async function copyToClipboard(text, anchor) {
  if (!text) return;
  let ok = false;
  try {
    await navigator.clipboard.writeText(text);
    ok = true;
  } catch {
    /* 老浏览器或非 https 环境 fallback */
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { ok = document.execCommand('copy'); } catch {}
    document.body.removeChild(ta);
  }
  showToast(ok
    ? { zh: '已复制', en: 'Copied' }
    : { zh: '复制失败', en: 'Copy failed' }, anchor);
}

function showToast(msg, anchor) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  /* msg 可以是 string 或 { zh, en } */
  if (typeof msg === 'object' && msg !== null) {
    toast.innerHTML = `<span lang="zh">${msg.zh || ''}</span><span lang="en">${msg.en || ''}</span>`;
  } else {
    toast.textContent = String(msg || '');
  }

  toast.classList.remove('is-visible');
  /* 强制 reflow 重新触发 transition */
  // eslint-disable-next-line no-unused-expressions
  toast.offsetHeight;

  /* 锚定到点击按钮的左侧；没传 anchor 就 fallback 到底部居中 */
  if (anchor) {
    /* 先显示成不可见但有尺寸 → 测量 → 定位 */
    toast.classList.add('is-anchored');
    toast.style.visibility = 'hidden';
    toast.style.left = '0';
    toast.style.top = '0';
    /* 强制 layout */
    const tw = toast.offsetWidth;
    const th = toast.offsetHeight;
    const r = anchor.getBoundingClientRect();
    let left = r.left - tw - 12;
    /* 左侧不够（很窄屏）→ 退到右侧 */
    if (left < 12) left = r.right + 12;
    const top = Math.max(8, Math.min(r.top + r.height / 2 - th / 2, window.innerHeight - th - 8));
    toast.style.left = `${Math.round(left)}px`;
    toast.style.top  = `${Math.round(top)}px`;
    toast.style.visibility = '';
  } else {
    toast.classList.remove('is-anchored');
    toast.style.left = '';
    toast.style.top = '';
  }

  toast.classList.add('is-visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

/* ---------- 二维码 Popover（Apple Glass 风，锚定到触发按钮） ---------- */
let _activePopoverTrigger = null;
let _popoverDocClickBound = false;

function ensureQrPopover() {
  let pop = document.querySelector('.qr-popover');
  if (pop) return pop;
  pop = document.createElement('div');
  pop.className = 'qr-popover';
  pop.setAttribute('role', 'dialog');
  pop.innerHTML = `
    <div class="qr-popover__frame">
      <img class="qr-popover__img" alt="" />
    </div>
    <button class="qr-popover__id" type="button" data-popover-copy aria-label="Copy ID">
      <span class="qr-popover__id-value" data-popover-id></span>
      <svg class="qr-popover__id-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
    </button>
    <p class="qr-popover__hint">
      <span lang="zh">扫码加我微信</span>
      <span lang="en">Scan with WeChat</span>
    </p>
  `;
  document.body.appendChild(pop);

  /* popover 内的复制按钮 */
  pop.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.closest('[data-popover-copy]')) {
      const v = pop.querySelector('[data-popover-id]')?.textContent || '';
      if (v) copyToClipboard(v);
    }
  });

  /* 全局：点 popover 外 / 按 Esc → 关闭 */
  if (!_popoverDocClickBound) {
    _popoverDocClickBound = true;
    document.addEventListener('click', (e) => {
      const popEl = document.querySelector('.qr-popover');
      if (!popEl || !popEl.classList.contains('is-open')) return;
      if (popEl.contains(e.target)) return;
      if (_activePopoverTrigger && _activePopoverTrigger.contains(e.target)) return;
      closeQrPopover();
    }, true); /* capture，确保比 button click 之前 */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeQrPopover();
    });
    /* 滚动 / resize 时重新定位（保持锚定） */
    window.addEventListener('scroll', () => {
      if (_activePopoverTrigger) positionPopover(pop, _activePopoverTrigger);
    }, { passive: true });
    window.addEventListener('resize', () => {
      if (_activePopoverTrigger) positionPopover(pop, _activePopoverTrigger);
    });
  }

  return pop;
}

function positionPopover(pop, trigger) {
  const rect = trigger.getBoundingClientRect();
  const popW = pop.offsetWidth || 240;
  const popH = pop.offsetHeight || 280;
  const gap = 14;
  const margin = 16;

  /* 默认：在触发按钮右侧、垂直居中对齐 */
  let left = rect.right + gap;
  let top = rect.top + rect.height / 2 - popH / 2;

  /* 右侧不够 → 翻到左侧 */
  if (left + popW > window.innerWidth - margin) {
    left = rect.left - popW - gap;
  }
  /* 左侧也不够（窄屏）→ 居中放在触发按钮下方 */
  if (left < margin) {
    left = Math.max(margin, (window.innerWidth - popW) / 2);
    top = rect.bottom + gap;
  }
  /* 上下边界 clamp */
  top = Math.max(margin, Math.min(top, window.innerHeight - popH - margin));

  pop.style.left = `${Math.round(left)}px`;
  pop.style.top  = `${Math.round(top)}px`;
}

function showQrPopover(triggerBtn, src, label, id) {
  if (!src || !triggerBtn) return;
  const pop = ensureQrPopover();

  /* 同一 trigger 二次点击 → toggle 关闭 */
  if (pop.classList.contains('is-open') && _activePopoverTrigger === triggerBtn) {
    closeQrPopover();
    return;
  }

  pop.querySelector('.qr-popover__img').src = src;
  pop.querySelector('.qr-popover__img').alt = label || 'QR code';
  const idEl = pop.querySelector('[data-popover-id]');
  const idBtn = pop.querySelector('.qr-popover__id');
  if (id) {
    idEl.textContent = id;
    idBtn.hidden = false;
  } else {
    idBtn.hidden = true;
  }

  _activePopoverTrigger = triggerBtn;

  /* 先显示再定位（拿到 popover 真实尺寸） */
  pop.style.visibility = 'hidden';
  pop.classList.add('is-open');
  /* 等图片加载完确保高度正确 */
  const img = pop.querySelector('.qr-popover__img');
  if (img.complete) {
    positionPopover(pop, triggerBtn);
    pop.style.visibility = '';
  } else {
    img.onload = () => {
      positionPopover(pop, triggerBtn);
      pop.style.visibility = '';
    };
    /* fallback：250ms 后强制定位 */
    setTimeout(() => {
      positionPopover(pop, triggerBtn);
      pop.style.visibility = '';
    }, 250);
  }
}

function closeQrPopover() {
  const pop = document.querySelector('.qr-popover');
  if (!pop) return;
  pop.classList.remove('is-open');
  _activePopoverTrigger = null;
}

/* ---------- 入口：动态 import content.js ---------- */
async function renderContent() {
  let CONTENT;
  try {
    const mod = await import('./content.js');
    CONTENT = mod.CONTENT;
  } catch (e) {
    console.warn('[content] load failed, falling back to static HTML:', e);
    return;
  }
  if (!CONTENT) return;
  try { renderHero(CONTENT.hero); }           catch (e) { console.warn('[hero]', e); }
  try { renderZhou(CONTENT.zhou); }           catch (e) { console.warn('[zhou]', e); }
  try { renderCapabilities(CONTENT.capabilities); } catch (e) { console.warn('[cap]', e); }
  try { renderWork(CONTENT.work); }           catch (e) { console.warn('[work]', e); }
  try { renderStack(CONTENT.stack); }         catch (e) { console.warn('[stack]', e); }
  try { renderWriting(CONTENT.writing); }     catch (e) { console.warn('[writing]', e); }
  try { renderContact(CONTENT.contact); }     catch (e) { console.warn('[contact]', e); }
}

/* ============================================================
   CN/EN 语言切换
   ============================================================ */
function initLangToggle() {
  const root = document.documentElement;

  /* 初始化（index.html 内联脚本可能已经设过，这里保险一次） */
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (saved !== 'en' && saved !== 'zh') saved = 'zh';
  if (root.getAttribute('lang') !== saved) root.setAttribute('lang', saved);

  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const cur = root.getAttribute('lang') || 'zh';
    const next = cur === 'zh' ? 'en' : 'zh';
    root.setAttribute('lang', next);
    try { localStorage.setItem('lang', next); } catch (e) {}
    /* 文本切换后布局会变 → 刷新 ScrollTrigger 防触发点错位 */
    if (window.ScrollTrigger) {
      requestAnimationFrame(() => window.ScrollTrigger.refresh());
    }
  });
}

/* ============================================================
   Marquee
   ============================================================ */
function initMarquee() {
  document.querySelectorAll('[data-marquee]').forEach((track) => {
    track.innerHTML = track.innerHTML + track.innerHTML;
    const io = new IntersectionObserver(([e]) => {
      track.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
    }, { threshold: 0 });
    io.observe(track);
  });
}

function initMarqueeBoost() {
  if (REDUCED) return;
  let lastY = window.scrollY;
  let velTimer;
  const baseDur = { forward: 38, reverse: 52 };

  window.addEventListener('scroll', () => {
    const v = Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    document.querySelectorAll('.scanline__track').forEach((t) => {
      const isReverse = t.parentElement.classList.contains('scanline--reverse');
      const base = isReverse ? baseDur.reverse : baseDur.forward;
      const next = Math.max(8, base - v * 0.4);
      t.style.animationDuration = `${next}s`;
    });
    clearTimeout(velTimer);
    velTimer = setTimeout(() => {
      document.querySelectorAll('.scanline__track').forEach((t) => {
        t.style.animationDuration = '';
      });
    }, 400);
  }, { passive: true });
}

/* ============================================================
   Hero entrance（字符 Convergence）
   ============================================================ */
function initHeroEntrance(gsap) {
  const h1 = document.querySelector('.hero__h1');
  if (h1) splitToChars(h1);
  h1?.classList.add('is-ready');

  if (REDUCED) {
    document.querySelectorAll('.hero__h1 .char, .hero [data-fade]').forEach((el) => {
      el.style.opacity = '1'; el.style.transform = 'none';
    });
    return;
  }

  gsap.set('.hero__h1 .char', { opacity: 0 });
  gsap.from('.hero__h1 .char', {
    x: () => gsap.utils.random(-window.innerWidth * 0.35, window.innerWidth * 0.35),
    y: () => gsap.utils.random(-150, 150),
    rotate: () => gsap.utils.random(-60, 60),
    scale: 0.4,
    duration: 1.3,
    ease: 'power3.out',
    stagger: { each: 0.025, from: 'random' },
    delay: 0.2,
  });
  gsap.to('.hero__h1 .char', {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out',
    stagger: { each: 0.025, from: 'random' },
    delay: 0.2,
  });

  gsap.set('.hero [data-fade]', { y: 24, opacity: 0 });
  gsap.to('.hero [data-fade]', {
    y: 0, opacity: 1,
    duration: 0.85, ease: 'power2.out',
    stagger: 0.12, delay: 1.1,
  });

  document.querySelectorAll('section:not(.hero) [data-fade]').forEach((el) => {
    gsap.from(el, {
      y: 16, opacity: 0,
      duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

/* ============================================================
   Section H2 ScrollFloat + Body ScrollReveal
   ============================================================ */
function initScrollText(gsap) {
  document.querySelectorAll('[data-split-words]').forEach((el) => {
    splitToWords(el);
    if (REDUCED) return;
    gsap.from(el.querySelectorAll('.word'), {
      yPercent: 110, opacity: 0, rotate: 4,
      duration: 0.85, ease: 'power3.out', stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 82%' },
    });
  });

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    splitToWords(el);
    if (REDUCED) return;
    gsap.fromTo(el.querySelectorAll('.word'),
      { opacity: 0.18 },
      { opacity: 1, duration: 0.5, ease: 'none', stagger: 0.04,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 30%', scrub: true } });
  });
}

/* ============================================================
   ZHOU 字母行激活 + 入场
   ============================================================ */
function initZhou(gsap, ScrollTrigger) {
  document.querySelectorAll('.zhou-row').forEach((row) => {
    ScrollTrigger.create({
      trigger: row,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: (s) => row.classList.toggle('is-active', s.isActive),
    });
    if (REDUCED || MOBILE) return;
    gsap.from(row.querySelector('.zhou-row__char'), {
      x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 80%' },
    });
    gsap.from(row.querySelector('.zhou-row__body'), {
      x: 30, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 80%' },
    });
  });
}

/* ============================================================
   Work — Coverflow 3D 折叠卡（state machine 驱动）
   - currentIndex 决定哪张卡在中心
   - 每张卡通过 --offset / --abs 自变量计算 3D 位置
   - 按钮 / 键盘 / 点击侧卡 都能切换
   - 移动端样式自动降级（CSS @media 处理）
   ============================================================ */
function initWorkRail() {
  const section = document.querySelector('.work');
  if (!section) return;
  const cards = Array.from(section.querySelectorAll('.work-card'));
  const prev = section.querySelector('[data-rail-prev]');
  const next = section.querySelector('[data-rail-next]');
  const cur = section.querySelector('.work__progress-cur');
  const total = section.querySelector('.work__progress-total');
  const bar = section.querySelector('[data-rail-bar]');

  if (!cards.length) return;
  if (total) total.textContent = String(cards.length).padStart(2, '0');

  let i = 0;  /* 起始为第 1 张作品（01 居中） */

  /* 布局常量 —— 想调手感直接改这几个数 */
  const TX_PER = 280;         /* px per |offset|，卡片间距 */
  const TZ_PER = -220;        /* px per |abs|，深度 */
  const RY_PER = -28;         /* deg per offset，折叠角度 */
  const OPACITY_DROP = 0.32;  /* 一格变暗多少 */
  const VISIBLE_RANGE = 2;    /* 中心 ±N 可见 */
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  const render = () => {
    cards.forEach((card, idx) => {
      const offset = idx - i;
      const abs = Math.abs(offset);
      const isFar = abs > VISIBLE_RANGE;

      if (isMobile()) {
        /* 移动端：单卡水平滑入 */
        card.style.transform = `translateX(${offset * 110}%)`;
        card.style.opacity = abs === 0 ? '1' : '0';
        card.style.zIndex = abs === 0 ? '10' : '0';
        card.style.visibility = abs <= 1 ? 'visible' : 'hidden';
      } else {
        /* 桌面：3D 折叠 */
        if (isFar) {
          card.style.visibility = 'hidden';
        } else {
          card.style.visibility = 'visible';
          card.style.transform =
            `translate(-50%, -50%)` +
            ` translateX(${offset * TX_PER}px)` +
            ` translateZ(${abs * TZ_PER}px)` +
            ` rotateY(${offset * RY_PER}deg)`;
          card.style.opacity = String(Math.max(0, 1 - abs * OPACITY_DROP));
          card.style.zIndex = String(10 - abs);
        }
      }

      card.classList.toggle('is-current', idx === i);
      card.setAttribute('aria-hidden', idx === i ? 'false' : 'true');
    });

    if (cur) cur.textContent = String(i + 1).padStart(2, '0');
    if (bar) bar.style.width = `${((i + 1) / cards.length) * 100}%`;
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === cards.length - 1;
  };

  prev?.addEventListener('click', () => {
    if (i > 0) { i--; render(); }
  });
  next?.addEventListener('click', () => {
    if (i < cards.length - 1) { i++; render(); }
  });

  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      if (idx === i) return;
      e.preventDefault();
      i = idx;
      render();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.target && /input|textarea|select/i.test(e.target.tagName || '')) return;
    const r = section.getBoundingClientRect();
    const inView = r.top < window.innerHeight * 0.8 && r.bottom > window.innerHeight * 0.2;
    if (!inView) return;
    if (e.key === 'ArrowLeft' && i > 0) { i--; render(); }
    if (e.key === 'ArrowRight' && i < cards.length - 1) { i++; render(); }
  });

  /* 触控板横向滑：deltaX 占主导时翻卡片，纵向输入照常滚页面 */
  let wheelLock = false;
  section.addEventListener('wheel', (e) => {
    /* 只在横向输入明显大于纵向时才拦截 */
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 1.2) return;
    e.preventDefault();
    if (wheelLock) return;
    if (e.deltaX > 30 && i < cards.length - 1) {
      i++; render();
      wheelLock = true;
      setTimeout(() => { wheelLock = false; }, 600);
    } else if (e.deltaX < -30 && i > 0) {
      i--; render();
      wheelLock = true;
      setTimeout(() => { wheelLock = false; }, 600);
    }
  }, { passive: false });

  /* 移动端：手指横向滑动 */
  let touchStart = null;
  section.addEventListener('touchstart', (e) => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  section.addEventListener('touchend', (e) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0 && i < cards.length - 1) { i++; render(); }
      if (dx > 0 && i > 0) { i--; render(); }
    }
    touchStart = null;
  }, { passive: true });

  /* 视窗 resize 重渲染（移动 ⇄ 桌面切换时）*/
  let resizeRaf;
  window.addEventListener('resize', () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => { render(); resizeRaf = null; });
  }, { passive: true });

  /* 立即渲染 + 字体/图片加载后再渲一次 */
  render();
  document.fonts?.ready.then(render);
  window.addEventListener('load', render);
}

/* ============================================================
   Magnet
   ============================================================ */
function initMagnet(gsap, selector, strength = 0.18) {
  if (REDUCED || !HOVER) return;
  const el = document.querySelector(selector);
  if (!el) return;
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength * 1.2,
      duration: 0.5, ease: 'power3.out',
    });
  });
  el.addEventListener('pointerleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.45)' });
  });
}

/* ============================================================
   SHARP / 真东西 字重随距离变化（双语都生效）
   ============================================================ */
function initSharpProximity() {
  if (REDUCED || !HOVER) return;
  ['#contact-sharp', '#contact-sharp-en'].forEach((sel) => {
    const sharp = document.querySelector(sel);
    if (!sharp) return;
    splitToChars(sharp);
    const chars = sharp.querySelectorAll('.char');
    chars.forEach((c) => {
      c.style.transition = 'font-weight 200ms cubic-bezier(0.19, 1, 0.22, 1)';
      c.style.display = 'inline-block';
      c.style.fontWeight = '700';
    });
    let raf;
    const sec = sharp.closest('.contact');
    if (!sec) return;
    sec.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        chars.forEach((c) => {
          const r = c.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const dist = Math.hypot(dx, dy);
          const w = Math.max(400, Math.min(900, 900 - dist * 1.4));
          c.style.fontWeight = String(Math.round(w / 100) * 100);
        });
      });
    }, { passive: true });
    sec.addEventListener('pointerleave', () => {
      chars.forEach((c) => { c.style.fontWeight = '700'; });
    });
  });
}

/* ============================================================
   平滑滚动（锚点）
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      /* 原生平滑（CSS scroll-behavior: smooth + scroll-margin-top 处理偏移）*/
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================================
   Boot
   ============================================================ */
/* ============================================================
   HERO 墨迹刮开效果（照搬 MiMo Code 方案）
   Canvas 遮罩 + destination-out 打洞，墨点不规则边缘 + 扩散 + 淡出
   ============================================================ */
function initHeroInkReveal() {
  const hero = document.getElementById('hero');
  const canvas = document.getElementById('heroMask');
  if (!hero || !canvas) return;

  const canHover = window.matchMedia('(hover: hover)').matches;
  if (!canHover) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const MASK = '245, 244, 240';
  const R_START = 8;
  const R_END = 128;
  const R_VARY = 0.45;
  const LIFETIME = 520;
  const STAMP_STEP = 12;
  const MAX_STAMPS = 160;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let w = 0, h = 0;

  function resize() {
    const rect = hero.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgb(' + MASK + ')';
    ctx.fillRect(0, 0, w, h);
  }
  resize();
  window.addEventListener('resize', resize);

  const stamps = [];
  let lastX = null, lastY = null;

  function addStamp(x, y) {
    if (stamps.length >= MAX_STAMPS) stamps.shift();
    stamps.push({
      x, y,
      born: performance.now(),
      seed: Math.random() * Math.PI * 2,
      rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
    });
  }

  function stampAlong(x, y) {
    if (lastX === null) {
      addStamp(x, y);
    } else {
      const dx = x - lastX, dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));
      for (let i = 1; i <= steps; i++) {
        addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps);
      }
    }
    lastX = x;
    lastY = y;
  }

  function carveInk(x, y, r, alpha, seed) {
    const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
    g.addColorStop(0, 'rgba(0,0,0,' + 0.95 * alpha + ')');
    g.addColorStop(0.55, 'rgba(0,0,0,' + 0.88 * alpha + ')');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    const segs = 32;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const wob = 0.78
        + 0.14 * Math.sin(a * 3 + seed)
        + 0.08 * Math.sin(a * 7 + seed * 2.1)
        + 0.05 * Math.sin(a * 13 + seed * 0.7);
      const rr = r * wob;
      const px = x + Math.cos(a) * rr;
      const py = y + Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }

  let running = false;
  function loop() {
    const now = performance.now();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgb(' + MASK + ')';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / LIFETIME;
      if (t >= 1) { stamps.splice(i, 1); continue; }
      const ease = 1 - Math.pow(1 - t, 3);
      const r = R_START + (stamps[i].rmax - R_START) * ease;
      const alpha = 1 - t * t;
      carveInk(stamps[i].x, stamps[i].y, r, alpha, stamps[i].seed);
    }
    if (stamps.length) requestAnimationFrame(loop);
    else running = false;
  }

  function start() {
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  hero.addEventListener('mouseenter', (e) => {
    const rect = hero.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    stampAlong(lastX, lastY);
    start();
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    stampAlong(e.clientX - rect.left, e.clientY - rect.top);
    start();
  });

  hero.addEventListener('mouseleave', () => {
    lastX = null;
    lastY = null;
  });
}

async function boot() {
  /* 1. 先从 content.js 渲染所有 section（在任何 init 之前重建 DOM） */
  await renderContent();

  /* 2. 不依赖 vendor 的优先启动 */
  initLangToggle();
  initMarquee();
  initHeroInkReveal();

  /* Work 看板不依赖 vendor（纯 CSS 3D + state），随时可启 */
  initWorkRail();

  try {
    await vendorsReady();
  } catch {
    window.__heroOwned = false;
    if (window.__heroForceReveal) window.__heroForceReveal();
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  /* 原生滚动 —— ScrollTrigger 自动监听 window scroll 事件，无需额外接线 */

  initHeroEntrance(gsap);
  initScrollText(gsap);
  initZhou(gsap, ScrollTrigger);
  initMarqueeBoost();
  /* Gmail 不再用磁吸 —— 让它和其他联系方式 hover 行为统一（CSS translateX 4px） */
  initSharpProximity();
  initSmoothScroll();

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
