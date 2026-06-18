/* ============================================================
   ZERO 初号 · 个人站 · 内容配置
   ============================================================
   改这一个文件就能更新整站文字 / 项目 / 链接。改完保存 → 浏览器刷新。

   📝 写法约定
   - 双语字段写成 { zh: "中文", en: "English" }
   - 不需要双语的（品牌名、URL）直接写字符串："Claude"
   - 关键词高亮：用 [[xxx]] 包起来 → 自动渲染成橙色
       例：title: { zh: "作品 · [[Work]]" } → "作品 · " + 橙色 "Work"
   - 换行：在字符串里用 \n
   - 增加一个项目：在数组里复制一条对象、改值即可
   - 删除一个项目：删除整条对象
   ============================================================ */

export const CONTENT = {

  /* ============================================================
     HERO  首屏
     ============================================================ */
  hero: {
    eyebrow: {
      zh: 'AI 训练师 × 落地工程师',
      en: 'AI Trainer × Production Engineer',
    },
    h1: 'ZERO 初号',  // 巨标题，中英共用一个
    subtitle: {
      zh: 'ZERO 初号 — AI 训练师 / 应用落地工程师。\n从 notebook 到 production，让模型在真实业务里 [[活下来]]。',
      en: 'ZERO — AI Trainer & Production Engineer.\nFrom notebook to production, helping models [[survive]] the real world.',
    },
    ctaPrimary: {
      label: { zh: '查看作品', en: 'Selected Work' },
      href: '#work',
    },
    ctaSecondary: {
      label: { zh: '来聊聊', en: 'Get in touch' },
      href: '#contact',
    },
  },

  /* ============================================================
     ZHOU FRAMEWORK  4 字母词典
     字母对应名字 ZHOU，建议保持 4 条；改文字 / 引言 / 正文都在 items
     ============================================================ */
  zhou: {
    eyebrow: { zh: 'ZHOU 工作框架', en: 'The ZHOU Framework' },
    title:   { zh: '关于 [[我]]', en: 'About [[Me]]' },
    lead: {
      zh: '过去几年我把工作方法浓缩成 4 个字母 —— 也就是我名字的拼音首字母 ZHOU。每个字母背后是一种工作姿态，串起来就是我做 AI 的方式。',
      en: 'I distilled my approach into the four letters of my name — ZHOU. Each letter is a working posture; together, they describe how I build AI.',
    },
    items: [
      {
        letter: 'Z',
        titleEn: 'Zenith',
        subtitle: { zh: '巅峰', en: 'Highest bar' },
        quote: '"If it\'s not the best version I can make today — why ship?"',
        body: {
          zh: '设计、AI、工程，三件事都不接受"差不多就行"。每次交付前我都问自己一遍：这个版本，是不是我此刻能力的上限？不是的话 —— 别交。',
          en: 'Design, AI, engineering — none of them get "good enough." Before every ship I ask: is this the ceiling of what I can do today? If no, don\'t ship it yet.',
        },
      },
      {
        letter: 'H',
        titleEn: 'Hybrid',
        subtitle: { zh: '杂食', en: 'Cross-discipline' },
        quote: '"Best ideas live in the gaps between disciplines."',
        body: {
          zh: '我做设计、训练 AI、写代码 —— 不是贪心，是因为这三件事在 AI 时代已经分不开了。懂模型局限的设计师、感受过 200ms 延迟的工程师、知道自己怎么被用的 AI —— 这才是真产品。',
          en: 'I do design, train AI, and write code. Not out of greed — these three are inseparable in the AI era. Designers who feel model limits, engineers who feel 200ms of latency, AI that knows how it\'s used — that\'s a real product.',
        },
      },
      {
        letter: 'O',
        titleEn: 'Optimizer',
        subtitle: { zh: '迭代', en: 'Iterate' },
        quote: '"First version doesn\'t ship. Twentieth might."',
        body: {
          zh: 'Prompt、模型、UI、流程 —— 第一次做出来的样子从来不是最终的样子。我喜欢看一个东西从"能跑"变"好用"，再变"离不开"。每一次迭代都是一次小小的升级。',
          en: 'Prompts, models, UIs, workflows — the first version is never the final version. I love watching something go from "works" to "useful" to "essential." Every iteration is a small leveling-up.',
        },
      },
      {
        letter: 'U',
        titleEn: 'Unifier',
        subtitle: { zh: '整合', en: 'Stitch together' },
        quote: '"Ten good tools beat one perfect tool — if they speak to each other."',
        body: {
          zh: '单点最优不如系统呼吸。我做的事就是让 Cursor、Claude Code、Linear、Figma、Eval 平台 —— 这些零散工具之间的胶水代码不会松脱。把分散技能拼成一个能跑的体系，比把任何一项做到极致更难。',
          en: 'A breathing system beats a single perfect tool. My job is making sure the glue between Cursor, Claude Code, Linear, Figma, eval platforms doesn\'t come apart. Stitching scattered skills into one working system is harder than maxing out any single one.',
        },
      },
    ],
  },

  /* ============================================================
     WORK  作品集
     - items 数组：增加项目复制一条对象、改值；删除直接删
     - num: 自己写编号字符串（"01" / "02" / 不会自动按序号生成）
     - year: 单独高亮的年份（橙色 tag）
     - tags: 其余技术 / 标签数组
     - image: 图片 URL，可以是 https://... 或 ./assets/xxx.png 本地路径
     - url:  点击中心卡跳转的链接（'#' 表示无链接，不跳）
     ============================================================ */
  work: {
    eyebrow: { zh: '精选作品 · 2024 — 2026', en: 'Selected Work · 2024 — 2026' },
    title:   { zh: '作品 · [[Work]]', en: '[[Work]] · 作品' },
    items: [
      {
        num: '01',
        year: '2025',
        titleEn: 'AutoGen Multi-Agent Dev Team',
        title: { zh: 'AutoGen 多 Agent iOS 开发协作', en: 'AutoGen iOS Dev Team' },
        desc: {
          zh: '基于 AutoGen 编排 4 个 Agent 协作开发 iOS 应用：Planner 拆任务、Developer 写代码、Reviewer 审查、Tester 跑测试。每个角色配不同模型，平衡成本与能力。',
          en: 'A 4-agent AutoGen system for iOS dev: Planner decomposes, Developer codes, Reviewer audits, Tester verifies. Each agent runs a different model — cost vs. capability tuned per role.',
        },
        tags: ['AutoGen', 'Multi-Agent'],
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=540&q=80&auto=format&fit=crop',
        url: '#',
      },
      {
        num: '02',
        year: '2025',
        titleEn: 'FitAI · Vision-Powered Diet Tracker',
        title: { zh: 'FitAI · 饮食追踪 AI 应用', en: 'FitAI · Diet-Tracking AI App' },
        desc: {
          zh: 'iOS SwiftUI 饮食追踪：Vision API 识别食物、营养标签 OCR、AI 饮食建议。SwiftData 持久化，1814 条食物本地数据库。',
          en: 'iOS SwiftUI diet tracker: vision-API food recognition, nutrition-label OCR, AI dietary advice. SwiftData persistence with a 1,814-item local food database.',
        },
        tags: ['iOS', 'Vision API', 'SwiftData'],
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=540&q=80&auto=format&fit=crop',
        url: '#',
      },
      {
        num: '03',
        year: '2025',
        titleEn: 'DiaryApp × MCP — AI-Controlled Journal',
        title: { zh: 'AI 操控的日记应用 + MCP Server', en: 'AI-Controlled Diary × MCP Server' },
        desc: {
          zh: 'macOS 原生 SwiftUI 日记 + 自研 MCP Server。应用本体只负责存储与日历 UI；外部 AI Agent 通过 MCP 协议远程读写。把"应用"和"AI 大脑"彻底解耦。',
          en: 'A native macOS SwiftUI diary paired with a custom MCP server. The app handles storage & calendar UI; an external AI agent drives reads/writes over MCP — cleanly decoupling "the app" from "the brain."',
        },
        tags: ['SwiftUI', 'MCP', 'Agent'],
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=540&q=80&auto=format&fit=crop',
        url: '#',
      },
      {
        num: '04',
        year: '2024',
        titleEn: 'TranslatePopup · Selection Translator',
        title: { zh: '沉浸式翻译 · macOS 菜单栏工具', en: 'Selection-Driven Translator' },
        desc: {
          zh: 'macOS 菜单栏应用，选中英文即时弹窗翻译。无需切换应用、不占 Dock。浮动窗口可拖动，开机自启 —— 一个能直接装上就用的小工具产品。',
          en: 'A macOS menu-bar app: select any English text and an instant translation pops up. No app-switching, no Dock footprint. Draggable floater, launch-at-login — a small tool that ships.',
        },
        tags: ['macOS', 'SwiftUI', 'Tool'],
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=540&q=80&auto=format&fit=crop',
        url: '#',
      },
      {
        num: '05',
        year: '2025',
        titleEn: 'Digital Park · Smart Park Platform',
        title: { zh: '智慧园区管理系统', en: 'Smart Park Platform' },
        desc: {
          zh: '基于 RuoYi 二开的企业级智慧园区平台。Spring Boot 4 + Vue3 + 小程序三端，覆盖招商、物业、权限、字典、定时任务、代码生成的完整业务模块。',
          en: 'Enterprise smart-park platform forked from RuoYi. Spring Boot 4 + Vue3 + WeChat mini-program — investment, property, RBAC, scheduling, code-gen — the full B-side stack.',
        },
        tags: ['Spring Boot', 'Vue3', 'Enterprise'],
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=540&q=80&auto=format&fit=crop',
        url: '#',
      },
    ],
  },

  /* ============================================================
     CAPABILITIES  能力卡片
     - 增加 / 删除：编辑 items 数组
     - num: 显示用编号（如 "/ 01"）
     - chips: 技术标签数组
     ============================================================ */
  capabilities: {
    eyebrow: { zh: '能做什么', en: 'What I Can Do' },
    title:   { zh: '能力 · [[Capabilities]]', en: '[[Capabilities]] · 能力' },
    items: [
      {
        num: '/ 01',
        title: {
          zh: 'Training & Fine-tuning [[训练 / 微调]]',
          en: 'Training & Fine-tuning [[Train]]',
        },
        desc: {
          zh: '数据清洗 → SFT → DPO → LoRA / QLoRA 全流程。Reward Model 与自动化 Eval 流水线。从 7B 到 70B 都跑过。',
          en: 'Data cleaning → SFT → DPO → LoRA / QLoRA. Reward model + automated eval pipeline. Have shipped 7B to 70B.',
        },
        chips: ['PyTorch', 'DeepSpeed', 'Axolotl', 'Unsloth'],
      },
      {
        num: '/ 02',
        title: {
          zh: 'Production Deployment [[推理 / 部署]]',
          en: 'Production Deployment [[Deploy]]',
        },
        desc: {
          zh: '推理优化、量化（GPTQ / AWQ / FP8）、vLLM / SGLang / TGI 部署、K8s 与 GPU 调度、可观测告警。',
          en: 'Inference optimization, quantization (GPTQ / AWQ / FP8), vLLM / SGLang / TGI deploy, K8s + GPU scheduling, full observability.',
        },
        chips: ['vLLM', 'SGLang', 'Triton', 'K8s'],
      },
      {
        num: '/ 03',
        title: {
          zh: 'AI Application Architecture [[应用架构]]',
          en: 'AI App Architecture [[Architect]]',
        },
        desc: {
          zh: '向量库选型 → reranking pipeline → 生产监控告警。Agent 编排与工作流，让 LLM 真正解决业务。',
          en: 'Vector store selection → reranking pipeline → production monitoring. Agent orchestration and workflows that solve real business problems.',
        },
        chips: ['RAG', 'Agent', 'LangGraph', 'Eval'],
      },
      {
        num: '/ 04',
        title: {
          zh: 'Tech Consulting [[技术咨询]]',
          en: 'Tech Consulting [[Consult]]',
        },
        desc: {
          zh: '模型选型、架构 audit、Production Review。给团队做诊断、立标准、写 playbook。',
          en: 'Model selection, architecture audits, production reviews. Diagnostics, standards, playbooks for teams.',
        },
        chips: ['Audit', 'Strategy', 'Playbook'],
      },
    ],
  },

  /* ============================================================
     STACK  日常工具 / 协作伙伴
     - 4 个开头（cat）可以自由改名 / 增加新分类
     - 每个分类下面 items 数组列工具名
     ============================================================ */
  stack: {
    eyebrow: { zh: '日常合作伙伴', en: 'Stack · Collaborators' },
    title:   { zh: '用什么 [[在做]]', en: 'Built [[with]]' },
    cells: [
      {
        cat:   { zh: '模型',    en: 'Models' },
        items: ['Claude', 'GPT', 'Gemini', 'Llama', 'Qwen'],
      },
      {
        cat:   { zh: '推理',    en: 'Inference' },
        items: ['vLLM', 'SGLang', 'TGI', 'Triton'],
      },
      {
        cat:   { zh: '训练',    en: 'Training' },
        items: ['PyTorch', 'DeepSpeed', 'Axolotl', 'Unsloth'],
      },
      {
        cat:   { zh: '工具',    en: 'Tools' },
        items: ['Cursor', 'Claude Code', 'Linear', 'Notion'],
      },
    ],
  },

  /* ============================================================
     WRITING  文章列表
     - url: 文章链接（可以是博客 URL，留 '#' 表示暂无）
     ============================================================ */
  writing: {
    eyebrow: { zh: '最近的笔记', en: 'Recent Notes' },
    title:   { zh: '文章 · [[Writing]]', en: '[[Writing]] · 文章' },
    items: [
      {
        date: '2026 / 04',
        title: {
          zh: '把一个 7B 模型微调到能用 — 我犯过的 5 个错',
          en: 'Fine-tuning a 7B model into something usable — five mistakes I made',
        },
        tags: ['Fine-tune', 'Lessons'],
        url: '#',
      },
      {
        date: '2026 / 03',
        title: {
          zh: 'Production RAG 不是 Pinecone + GPT-4 —— 真正在跑的系统长什么样',
          en: 'Production RAG is not Pinecone + GPT-4 — what a real running system actually looks like',
        },
        tags: ['RAG', 'Architecture'],
        url: '#',
      },
      {
        date: '2026 / 02',
        title: {
          zh: 'Eval 是脚手架，不是装饰 —— 一份能让团队复用的评测协议',
          en: 'Eval is scaffolding, not decoration — a reusable team protocol',
        },
        tags: ['Eval', 'Practice'],
        url: '#',
      },
      {
        date: '2026 / 01',
        title: {
          zh: 'From Prompt to Pipeline —— 让 LLM 应用工程化的 7 个习惯',
          en: 'From Prompt to Pipeline — 7 habits that turn LLM apps into engineering',
        },
        tags: ['Engineering'],
        url: '#',
      },
    ],
  },

  /* ============================================================
     CONTACT  联系方式
     - title 用 [[xxx]] 标橙色高亮词
     - channels 数组：每条对应一行联系方式
       label: 左边的标签（"Gmail" / "电话" / "微信" 等）
       value: 中间显示的内容
       href:  链接（mailto: / tel: / https://... 不写则不可点）
     ============================================================ */
  contact: {
    eyebrow: { zh: '来一起搞点', en: 'Let\'s Build' },
    title: {
      zh: '做点 [[真东西]]。',
      en: 'Let\'s build something [[SHARP]].',
    },
    sub: {
      zh: '做模型、落地、咨询，或者只想喝杯咖啡聊聊 —— 写信给我。',
      en: 'Modeling, shipping, consulting, or just coffee — drop me a line.',
    },
    /* 行为说明：
       - 默认：点击 → 复制 value 到剪贴板，提示"已复制"
       - 加 qr 字段 → 点击弹窗显示二维码图片（微信用）
       - primary: true → 带磁吸效果（首项主邮箱）
    */
    channels: [
      {
        label: 'Gmail',
        value: 'linfengzhou45@gmail.com',
        primary: true,
      },
      {
        label: 'QQ',
        value: '631157084@qq.com',
      },
      {
        label: { zh: '电话', en: 'Phone' },
        value: '15779149369',
      },
      {
        label: { zh: '微信', en: 'WeChat' },
        value: 'zhou_15779149369',
        qr: './assets/wechat-qr.jpg',  // 点击 → 弹窗显示二维码
      },
      {
        label: 'GitHub',
        value: 'https://github.com/linfengzhou45-jpg',
      },
    ],
  },

};
