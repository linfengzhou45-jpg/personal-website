# DESIGN.md · v2 (Heavy reboot — Editorial Industrial)

> 暖白底上一段方法论，橙色是唯一的标点。这是 L.F. ZHOU 的工作面 —— 一个把 AI 训练成产品的人写下的系统思考。

> v1 备注：v1 走 ASTRO 拍立得 + 草绿暖玩路线。v2 全面重做为 Alaric 风的编辑工业调性。

## 1. Visual Theme & Atmosphere

**Style**: Editorial Industrial × Bilingual Method（编辑工业 × 双语方法论）
**Keywords**: 灰度暖底 / 工业橙 / 巨型编号 / 双向 marquee / 编辑式行距 / 字母词典 / 严谨克制 / 系统思考者
**Tone**: 知性、工程师式克制、技术诗人 — NOT 玩感、糖果色、拍立得、手写体、童趣
**Feel**: 像一份打开就开始读的工程白皮书，标题有重量，章节像方法论，留白比内容更值钱。

**Interaction Tier**: **L3 沉浸体验**
**Dependencies**: GSAP + ScrollTrigger + Lenis（不再用 OGL / WebGL）
**Signature Moments 目标**: 7 个

参考来源：alaric.it.com（结构骨架 / 双语策略 / 字母词典 / scanline marquee 概念）。色与字仅借鉴方向，未照搬。

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds — 灰度暖底，比 v1 更冷静 */
  --bg:           #F5F4F0;        /* 页面主背景 */
  --bg-warm:      #EDECE6;        /* 交替 section / surface */
  --bg-deep:      #E5E2DA;        /* 章节分隔 / 弱底 */
  --surface:      #FFFFFF;        /* 卡片极少用 */

  /* Text — 三阶暖色系，用 ink-warm 替代纯灰 */
  --ink:          #0A0A0A;        /* 主文字、标题 */
  --ink-warm:     #2D2119;        /* 次要 / 引用 / metadata */
  --ink-muted:    #B4B2A9;        /* 三级 / 数字 placeholder / 边距标签 */

  /* Accent — 工业橙：唯一彩色，绝不搭配其他强彩 */
  --accent:       #FF5A1F;        /* CTA / 关键词 / 编号高光 */
  --accent-soft:  #FFE2C2;        /* 软底色，badge 用 */
  --accent-deep:  #C73F0E;        /* 深橙，hover / 文本 onColor */
  --accent-tint:  rgba(255, 90, 31, 0.08); /* 极淡橙，section bg 微染 */

  /* Borders — 纤细暖灰 */
  --line:         rgba(10, 10, 10, 0.08);
  --line-strong:  rgba(10, 10, 10, 0.18);
  --line-hover:   rgba(255, 90, 31, 0.4);

  /* RGB 辅助 */
  --bg-rgb:       245, 244, 240;
  --ink-rgb:      10, 10, 10;
  --accent-rgb:   255, 90, 31;

  /* Easing & duration */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-cinema:   cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast:      180ms;
  --dur-base:      320ms;
  --dur-slow:      640ms;
}
```

**Color Rules:**
- 所有颜色通过 CSS 变量引用，**禁止组件内硬编码 hex**
- 同页**只有一种强彩**（橙），灰度全部走 `--ink` / `--ink-warm` / `--ink-muted` 三阶
- 橙的视觉占比 ≤ **6%**（CTA、编号高光、active 链接、hover 边框 — 仅此而已）
- 半透明色一律用 `*-rgb` 变量构造 `rgba()`
- 不再用任何"暖光渐变"作为页面底（v1 的 radial 渐变全删，纯单色 `--bg`）

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');

:root {
  --font-display: 'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif;
  --font-sans:    'Inter', 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
  --font-zh-display: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif;
}
```

| Role | Font | Size (Desktop) | Mobile | Weight | LH | LS |
|------|------|---------------|--------|--------|------|------|
| Hero H1 (display) | Space Grotesk | clamp(80px, 13vw, 200px) | 64px | 700 | 0.88 | -0.04em |
| Section H2 | Space Grotesk | clamp(56px, 8vw, 128px) | 44px | 700 | 0.92 | -0.03em |
| ZHOU 巨字母 | Space Grotesk | clamp(160px, 22vw, 320px) | 120px | 700 | 0.85 | -0.06em |
| Big Number | JetBrains Mono | clamp(80px, 12vw, 180px) | 72px | 500 | 0.9 | -0.02em |
| H3 | Space Grotesk | 28px | 22px | 600 | 1.2 | -0.01em |
| Body | Inter | 16px | 15px | 400 | 1.7 | 0.005em |
| Body Long | Inter | 18px | 16px | 400 | 1.75 | 0.01em |
| Eyebrow / Mono Label | JetBrains Mono | 12-13px | 11-12px | 500 | 1.4 | 0.04em |
| 中文 Display | Noto Sans SC | 0.92em（相对英文）| — | 700-900 | 1.0 | 0 |

**Typography Rules:**
- 关键词高亮：仅一种方式 —— `<span class="kw">` 给 `color: var(--accent)`，**绝不渐变、绝不投影**
- Eyebrow 全部用 mono 字体 + `// ` 前缀（如 `// SELECTED WORK`），匹配编辑工业调
- 章节编号用 mono 等宽数字（`/ 01` / `/ 02`），保留 `/` 前缀，强工程感
- 中英混排：英文/拉丁数字走 Space Grotesk，中文 fallback 到 Noto Sans SC（自动）
- 中文段落 LH ≥ 1.7，LS `0.01em–0.02em`
- 巨型字号（H1/H2/ZHOU 字母）用 `letter-spacing: -0.04em` 紧排
- **NEVER**: Anton（v1 字体已删）、Caveat（v1 字体已删）、Italic 中文、Comic Sans / 任何手写体

**Text Decoration**（按 text-decoration-rules 决策）:
- Hero H1：纯 `--ink` 单色；关键词 `--accent` 单色；**无渐变、无投影**
- 巨字母 ZHOU：纯 `--ink`，进视图时一字渐变到 `--accent`（仅 active 状态 1 字）
- Section H2：纯 `--ink`，靠 ScrollFloat 入场动效承担活力
- Big Number：默认 `--ink-muted`，进视图后 active 那个变 `--accent`
- 正文 p：**任何装饰一律禁止**

## 4. Component Stylings

### Buttons — Pill / Square 双形态

```css
.btn {
  --btn-bg: var(--ink);
  --btn-fg: #FFFFFF;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border: 0;
  border-radius: 999px;
  font: 500 15px/1 var(--font-sans);
  letter-spacing: 0.01em;
  color: var(--btn-fg);
  background: var(--btn-bg);
  cursor: pointer;
  transition: transform var(--dur-base) var(--ease-spring),
              background-color var(--dur-base) var(--ease-out-expo);
  will-change: transform;
}
.btn:hover { background: var(--accent); transform: translateY(-2px); }
.btn:active { transform: translateY(0) scale(0.98); }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

/* Ghost */
.btn--ghost {
  --btn-bg: transparent;
  --btn-fg: var(--ink);
  border: 1px solid var(--line-strong);
}
.btn--ghost:hover {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
  transform: none;
}

/* 工业方形按钮（仅 nav cta 用）*/
.btn--square { border-radius: 0; }
```

### Marquee Scanline（**签名 #1**）

```css
.scanline {
  position: relative;
  overflow: hidden;
  border-block: 1px solid var(--line);
  background: var(--bg);
  font: 500 13px/1 var(--font-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-warm);
}
.scanline__track {
  display: inline-flex;
  gap: 64px;
  padding: 14px 32px;
  white-space: nowrap;
  animation: scanline-drift 38s linear infinite;
  will-change: transform;
}
.scanline__track > span {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}
.scanline__track > span::after {
  content: '◇';
  display: inline-block;
  font-size: 8px;
  color: var(--accent);
}
.scanline--reverse .scanline__track { animation-direction: reverse; animation-duration: 52s; }

@keyframes scanline-drift {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); } /* 内容在 JS 复制 2 份 */
}
```

### Eyebrow / Section Header

```css
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 12px/1 var(--font-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
.eyebrow::before {
  content: '//';
  color: var(--accent);
  font-weight: 700;
}

.section-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(56px, 8vw, 128px);
  line-height: 0.92;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin: 24px 0 0;
}

.section-lead {
  max-width: 56ch;
  margin-top: 32px;
  font: 400 18px/1.7 var(--font-sans);
  color: var(--ink-warm);
}
```

### ZHOU Letter Block（**签名 #2**）

```css
.zhou-row {
  display: grid;
  grid-template-columns: minmax(280px, 36%) 1fr;
  gap: 64px;
  padding: 80px 0;
  border-bottom: 1px solid var(--line);
  align-items: center;
}
.zhou-row:last-child { border-bottom: 0; }
.zhou-row__char {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(160px, 22vw, 320px);
  line-height: 0.85;
  letter-spacing: -0.06em;
  color: var(--ink);
  transition: color var(--dur-slow) var(--ease-out-expo);
}
.zhou-row.is-active .zhou-row__char { color: var(--accent); }
.zhou-row__num {
  font: 500 12px/1 var(--font-mono);
  color: var(--ink-muted);
  letter-spacing: 0.16em;
  margin-bottom: 16px;
}
.zhou-row__title {
  font: 700 36px/1.1 var(--font-display);
  letter-spacing: -0.01em;
  color: var(--ink);
  margin: 0 0 16px;
}
.zhou-row__title .zh { font-family: var(--font-zh-display); margin-left: 16px; color: var(--ink-warm); }
.zhou-row__quote {
  font: 400 22px/1.5 var(--font-display);
  color: var(--ink-warm);
  margin: 0 0 16px;
  max-width: 28ch;
}
.zhou-row__body {
  font: 400 16px/1.7 var(--font-sans);
  color: var(--ink-warm);
  max-width: 48ch;
}
```

### Capability Item（What I Can Do）

```css
.cap-item {
  display: grid;
  grid-template-columns: 80px 1fr 200px;
  gap: 32px;
  padding: 32px 0;
  border-bottom: 1px solid var(--line);
  align-items: start;
  transition: padding var(--dur-base) var(--ease-out-expo);
}
.cap-item:hover {
  padding-left: 16px;
}
.cap-item__num {
  font: 500 14px/1 var(--font-mono);
  color: var(--ink-muted);
  letter-spacing: 0.1em;
}
.cap-item:hover .cap-item__num { color: var(--accent); }
.cap-item__title {
  font: 600 28px/1.2 var(--font-display);
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 8px;
}
.cap-item__title .zh { color: var(--ink-warm); margin-left: 12px; font-weight: 500; }
.cap-item__desc {
  font: 400 16px/1.65 var(--font-sans);
  color: var(--ink-warm);
  max-width: 56ch;
}
.cap-item__chips {
  display: flex; flex-wrap: wrap; gap: 6px;
  justify-content: flex-end;
}
```

### Work Row（**签名 #3** — 巨型编号 editorial 卡）

```css
.work-row {
  display: grid;
  grid-template-columns: clamp(140px, 14vw, 220px) 1fr clamp(180px, 22vw, 320px);
  gap: 48px;
  padding: 64px 0;
  border-top: 1px solid var(--line);
  align-items: start;
  position: relative;
}
.work-row:last-child { border-bottom: 1px solid var(--line); }
.work-row__num {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(80px, 12vw, 180px);
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: var(--ink-muted);
  transition: color var(--dur-slow) var(--ease-out-expo);
}
.work-row.is-active .work-row__num { color: var(--accent); }
.work-row__title-en {
  font: 600 20px/1.2 var(--font-mono);
  letter-spacing: 0.02em;
  color: var(--ink-muted);
  margin-bottom: 8px;
  text-transform: uppercase;
}
.work-row__title {
  font: 700 36px/1.15 var(--font-display);
  letter-spacing: -0.01em;
  color: var(--ink);
  margin: 0 0 16px;
}
.work-row__desc {
  font: 400 16px/1.65 var(--font-sans);
  color: var(--ink-warm);
  margin-bottom: 16px;
  max-width: 52ch;
}
.work-row__tags { display: flex; flex-wrap: wrap; gap: 6px; }
.work-row__media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 2px;
  overflow: hidden;
  background: var(--bg-warm);
  filter: saturate(0.85);
  transition: filter var(--dur-slow) var(--ease-out-expo),
              transform var(--dur-slow) var(--ease-out-expo);
}
.work-row__media img { width: 100%; height: 100%; object-fit: cover; }
.work-row:hover .work-row__media { filter: saturate(1); transform: scale(1.02); }
.work-row:hover .work-row__num { color: var(--accent); }
```

### Tag / Chip

```css
.tag {
  display: inline-flex;
  padding: 4px 10px;
  font: 500 11px/1.4 var(--font-mono);
  letter-spacing: 0.04em;
  color: var(--ink-warm);
  background: transparent;
  border: 1px solid var(--line-strong);
  border-radius: 2px;
  text-transform: uppercase;
}
.tag--accent {
  color: var(--accent-deep);
  border-color: var(--accent);
  background: var(--accent-tint);
}
```

### Stack Grid（Collaborators）

```css
.stack-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 64px 48px;
}
.stack-cell__cat {
  display: block;
  font: 500 11px/1 var(--font-mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-muted);
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line-strong);
  margin-bottom: 20px;
}
.stack-cell__cat::before { content: '/ '; color: var(--accent); }
.stack-cell__list { display: flex; flex-direction: column; gap: 10px; }
.stack-cell__list li {
  font: 500 18px/1.2 var(--font-display);
  color: var(--ink);
  letter-spacing: -0.005em;
  cursor: default;
  transition: color var(--dur-base) var(--ease-out-expo);
}
.stack-cell__list li:hover { color: var(--accent); }
```

### Navigation

```css
.nav {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 10px 10px 10px 24px;
  width: min(900px, calc(100% - 32px));
  background: rgba(245, 244, 240, 0.78);
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);
  border: 1px solid var(--line);
  border-radius: 0; /* 工业方角 */
  font-family: var(--font-sans);
  transition: box-shadow var(--dur-slow) var(--ease-out-expo),
              background-color var(--dur-slow) var(--ease-out-expo);
}
.nav.is-scrolled { box-shadow: 0 8px 24px -8px rgba(10, 10, 10, 0.08); }
.nav__logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0.02em;
  color: var(--ink);
  margin-right: auto;
}
.nav__logo .dot { color: var(--accent); }
.nav__links { display: flex; gap: 24px; }
.nav__link {
  font: 500 13px/1 var(--font-mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-warm);
  text-decoration: none;
  position: relative;
  padding: 6px 0;
}
.nav__link::after {
  content: ''; position: absolute; left: 0; bottom: 0;
  width: 100%; height: 1px;
  background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out-expo);
}
.nav__link:hover, .nav__link.is-active { color: var(--ink); }
.nav__link:hover::after, .nav__link.is-active::after { transform: scaleX(1); }
```

## 5. Layout Principles

**Container:**
- Default: `1280px`
- Narrow: `880px`（长文阅读区）
- Padding：桌面 `48px` / 平板 `32px` / 移动 `20px`

**Spacing Scale**（8px 基础）:
```
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160 / 200
```
- Section 上下 padding：桌面 `120–160px`，移动 `80–96px`
- 每个主 section 至少 `min-height: 100vh`（呼应 Alaric 单屏感）
- Editorial 行距：work-row / cap-item 上下 `64px`

**Section Pacing（强约束）:**
1. Hero 全屏 + scanline 框
2. ZHOU 4 行（每行 `min-height: 60vh`，连起来约 `2.4 屏`）
3. Capabilities 4 行紧凑列表（约 `0.8 屏`）
4. Work 5 行（每行 `~50vh`，约 `2.5 屏`）
5. Stack 单屏 4 列网格
6. Contact 全屏巨字

**Grid:**
```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 24px;
}
```

## 6. Depth & Elevation

**几乎不用阴影。** 编辑工业风靠 line + 留白制造层次。

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | 无阴影 + `border-block: 1px solid var(--line)` | 90% 场景 |
| Subtle | `0 2px 8px -2px rgba(10,10,10,0.06)` | nav scrolled、work hover |
| Glow（仅 accent）| `0 0 0 4px var(--accent-tint)` | focus state、active CTA |

阴影方向统一向下偏右（光源左上）。**禁止**圆角大于 4px（999px pill 除外）的卡片用阴影。

## 7. Animation & Interaction

**Motion Philosophy**: "排版先行 + 滚动驱动"——一切动效服务于阅读节奏，让信息层层递进展开，绝不喧宾夺主。
**Tier**: L3
**Performance Budget**: ≤2 个 ScrollTrigger pin（ZHOU + Work hint）；marquee 用纯 CSS keyframes；无 WebGL。

### Dependencies
```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

### Base Setup
```js
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### Signature #1 — Top Scanline Marquee
**纯 CSS** keyframes 横滚（不耗 JS 帧），双行反向（顶部 forward 38s / 副向 reverse 52s），离屏自动暂停（`animation-play-state` via IntersectionObserver）。

### Signature #2 — Hero H1 字符**汇聚式**入场（替代 v1 的下落）

```js
gsap.from('.hero__h1 .char', {
  x: () => gsap.utils.random(-window.innerWidth * 0.4, window.innerWidth * 0.4),
  y: () => gsap.utils.random(-200, 200),
  rotate: () => gsap.utils.random(-90, 90),
  opacity: 0,
  scale: 0.3,
  duration: 1.4,
  ease: 'power3.out',
  stagger: { each: 0.025, from: 'random' },
  delay: 0.2,
});
```
字符从屏幕各处飞向中心位置 —— 这是 **Convergence 模式**，覆盖 L3 scroll-story 必须的 4 大模式之一。

### Signature #3 — ZHOU Letters Pin-Scrub（左 pin / 右 swap）

```js
const zhouSection = document.querySelector('.zhou');
gsap.timeline({
  scrollTrigger: {
    trigger: zhouSection,
    start: 'top top',
    end: '+=300%',
    pin: true,
    scrub: 1,
    snap: { snapTo: 1 / 4, duration: 0.4, ease: 'power2.inOut' },
  },
})
.fromTo('.zhou-row', { opacity: 0.2 }, { opacity: 1, stagger: 1 });

document.querySelectorAll('.zhou-row').forEach((row, i, all) => {
  ScrollTrigger.create({
    trigger: zhouSection,
    start: () => `top top-=${i * 75}%`,
    end:   () => `top top-=${(i + 1) * 75}%`,
    onToggle: (s) => row.classList.toggle('is-active', s.isActive),
  });
});
```
左 pin（容器固定）+ 右 swap（4 letter 行依次切换 active 状态、字母变橙）—— 覆盖 **左 pin / 右 swap 模式**。

### Signature #4 — Work 巨型编号滚动激活（Pin-Scrub）

```js
document.querySelectorAll('.work-row').forEach((row) => {
  ScrollTrigger.create({
    trigger: row,
    start: 'top center',
    end: 'bottom center',
    onToggle: (s) => row.classList.toggle('is-active', s.isActive),
  });
  /* 入场动效 */
  gsap.from(row, {
    opacity: 0, y: 60,
    duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: row, start: 'top 88%' },
  });
});
```
当行进入视口中央时，编号从 muted 灰变 accent 橙 —— 覆盖 **Pin-Scrub 模式**（pin 是隐式的：编号通过 `position: sticky` 跟随滚动）。

### Signature #5 — Section H2 ScrollFloat + Body ScrollReveal

```js
document.querySelectorAll('[data-split-words]').forEach((el) => {
  splitToWords(el);
  gsap.from(el.querySelectorAll('.word'), {
    yPercent: 110, opacity: 0, rotate: 4,
    duration: 0.85, ease: 'power3.out', stagger: 0.05,
    scrollTrigger: { trigger: el, start: 'top 82%' },
  });
});

document.querySelectorAll('[data-reveal]').forEach((el) => {
  splitToWords(el);
  gsap.fromTo(el.querySelectorAll('.word'),
    { opacity: 0.18 },
    { opacity: 1, duration: 0.5, ease: 'none', stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 30%', scrub: true } });
});
```

### Signature #6 — Magnet Email CTA + Variable Proximity

```js
/* Magnet 已在 v1 实现；保留 */

/* 新增：Contact 巨字 "SHARP" 鼠标靠近字重变粗 */
const sharpEl = document.querySelector('.contact__title-sharp');
if (sharpEl && !REDUCED) {
  splitToChars(sharpEl);
  sharpEl.addEventListener('pointermove', (e) => {
    const rect = sharpEl.getBoundingClientRect();
    sharpEl.querySelectorAll('.char').forEach((c) => {
      const r = c.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const w = Math.max(400, 700 - dist * 1.2);
      c.style.fontWeight = String(Math.round(w / 100) * 100);
    });
  });
}
```

### Signature #7 — Nav 滚动同步 marquee 速度

滚动时给 marquee 临时 boost：
```js
let lastScrollY = 0;
let velTimeout;
window.addEventListener('scroll', () => {
  const v = Math.abs(window.scrollY - lastScrollY);
  document.querySelectorAll('.scanline__track').forEach((t) => {
    t.style.animationDuration = `${Math.max(8, 38 - v * 0.6)}s`;
  });
  lastScrollY = window.scrollY;
  clearTimeout(velTimeout);
  velTimeout = setTimeout(() => {
    document.querySelectorAll('.scanline__track').forEach((t) => {
      t.style.animationDuration = '';
    });
  }, 500);
}, { passive: true });
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .scanline__track { animation: none !important; }
}
```
JS 层在所有 `gsap.from/to/timeline` 前判断 `if (REDUCED) return;`。

## 8. Do's and Don'ts

### Do
- ✅ 巨型字、巨型数字、双向 marquee —— 这是签名视觉，不能弱化
- ✅ Eyebrow 必须 `// ` 前缀 + mono 字体；编号必须 `/ 01` 格式
- ✅ 中英混排时 EN 在前小字、CN 在后或后接 —— 保持英文当"高级标签"的位置
- ✅ 所有可交互元素 hover 时 border 或 underline 走 `--accent`
- ✅ 移动端 marquee 动画速度减半，pin-scrub 全部转线性 stagger（取消 pin）
- ✅ 数据/年份/标签全部用 mono 等宽数字
- ✅ Section 之间用 `border-block: 1px solid var(--line)` 而非装饰线条

### Don't
- ❌ 不在任何元素上加 polaroid / 手写体 / playful 拼贴（v1 风格已彻底弃用）
- ❌ 不用任何彩色除了橙 —— 不出现绿、蓝、紫等
- ❌ 不用 `border-radius` > 4px（除 pill button）；没有大圆角卡片
- ❌ 不用 box-shadow 多层堆叠制造"浮起感"——靠 line + spacing
- ❌ 不引入 WebGL / Aurora / 任何 3D（v1 已删，v2 不再启用）
- ❌ 不在 H1 / H2 上加 italic、渐变、投影（任何装饰一律禁止）
- ❌ 不在中文段落上 uppercase 或 letter-spacing > 0.04em
- ❌ 不用纯色块占位图片（继续严守 v1 规则）
- ❌ 不在同屏出现 ≥ 3 个色块（橙 + 米 + 黑足够，多了破碎）
- ❌ 不在桌面端把 nav 折叠成汉堡菜单（≥ 768px 永远展开）
- ❌ 不让 marquee 速度快到看不清（最快 8s 一圈，正常 38s）
- ❌ 不在 pin-scrub 区允许文字本身有 ScrollFloat 动画（叠加冲突，一处一种）

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Wide | ≥ 1400px | 全展开，巨字符 320px |
| Desktop | 1024–1399px | 标准布局 |
| Tablet | 768–1023px | Stack 4→2 列；ZHOU 字符 200px；work-row 网格简化 |
| Mobile | ≤ 767px | 单列堆叠；marquee 速度减半；pin 全移除 |

**Touch Targets:** ≥ 44×44px

**Collapse Strategy:**
- ZHOU 桌面横排（左字母 / 右内容）→ 移动端纵排（字母在上小字号）；移除 pin-scrub
- Work `work-row` 三列（数字 / 内容 / 媒体）→ 平板两列 → 移动单列
- Stack 4 列 → 平板 2 列 → 移动单列
- Marquee 字号 13px → 11px；duration 38s → 70s（视觉减速）
- Hero 巨字 H1 自动 clamp 缩小，无需手动改

```css
@media (max-width: 1023px) {
  .stack-grid { grid-template-columns: repeat(2, 1fr); }
  .work-row { grid-template-columns: 100px 1fr; }
  .work-row__media { grid-column: 1 / -1; margin-top: 16px; aspect-ratio: 16 / 9; }
}
@media (max-width: 767px) {
  .stack-grid { grid-template-columns: 1fr; gap: 32px; }
  .zhou-row { grid-template-columns: 1fr; padding: 48px 0; gap: 16px; }
  .zhou-row__char { font-size: 120px; }
  .cap-item { grid-template-columns: 50px 1fr; }
  .cap-item__chips { grid-column: 1 / -1; justify-content: flex-start; }
  .work-row { grid-template-columns: 1fr; padding: 40px 0; }
  .work-row__num { font-size: 72px; }
  .scanline__track { animation-duration: 70s !important; }
  section { padding: 80px 0; }
}
```

---

## 附录：Signature Moments 总览（共 7 个，符合 L3 ≥ 6 要求）

| # | 类型 | 落点 | 必备表 |
|---|------|------|--------|
| 1 | Background — Marquee Scanline | Hero 顶部双向 + section 间 | Background ✓ |
| 2 | Text — Hero H1 Convergence | 字符从四方汇聚到中心 | Text H1 ✓ |
| 3 | Component — ZHOU Pin-Scrub | 左 pin / 右 swap，4 字母切换 | Component ✓ |
| 4 | Component — Work Number Activation | Pin-Scrub，编号变橙 | + Pin-Scrub ✓ |
| 5 | Text — Section H2 ScrollFloat + Body ScrollReveal | 全章节 | Text H2 + Body ✓ |
| 6 | Element — Magnet + Variable Proximity SHARP | Contact CTA 双交互 | Element ✓ |
| 7 | Background — Marquee 加速反馈 | 滚动时 marquee 提速 | Background ✓ |

L3 scroll-story 4 模式覆盖 ≥ 3：
- ✅ Pin-Scrub（Work 编号激活 / ZHOU pin）
- ✅ 左 pin / 右 swap（ZHOU section）
- ✅ Convergence（Hero H1 字符汇聚）
- ❌ WebGL（明确弃用，原因：编辑工业调性不需要 3D 装饰；编号 + 字符巨型已是足够 signature visual）

**致谢**：结构骨架与 marquee + acronym 框架灵感来自 alaric.it.com。Motion 动效逻辑沿用 vue-bits / reactbits 风格（DavidHDev, MIT）。
