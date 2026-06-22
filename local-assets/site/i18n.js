/**
 * AgentKey landing — lightweight i18n (no dependencies).
 * Locales: en, zh, ja, ko, de, fr, es
 * Detection: ?lang=xx → localStorage.agentkey_lang → navigator.languages
 *
 * SEO LIMITATION (TODO — tracked separately):
 * Translation runs client-side. Googlebot does execute JS, but its
 * "rendered HTML" path is throttled and indexed-with-delay vs. the
 * static HTML snapshot. With hreflang declared in index.html, Google
 * keeps requesting ?lang=zh / ?lang=ja / … and getting the same English
 * static markup before JS runs — so for indexing purposes the 7
 * declared locales currently look like duplicates of the English page.
 *
 * Deployment is pure static (Aliyun OSS) — no edge function — so SSR
 * is out. Two realistic paths to fix this:
 *
 *   A. Build-time multi-file generation. Have build.sh produce
 *      /zh/index.html, /ja/index.html, … by running this translation
 *      table against the master HTML at build time. Each locale gets
 *      its own canonical + hreflang back to the others. Highest SEO
 *      value, requires a Node toolchain in build.sh to evaluate this
 *      JS file's TRANSLATIONS object (or a port to bash/awk).
 *
 *   B. Put a Cloudflare (or similar) edge in front of OSS that
 *      rewrites ?lang=xx to serve a locale-specific HTML variant.
 *      Same SEO outcome but requires the infra layer in front of OSS.
 *
 * Until either lands, the hreflang block in index.html is largely
 * cosmetic. Removing it would also be defensible — keeping it for
 * now because it doesn't actively hurt and signals intent.
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'agentkey_lang';

  var SUPPORTED = ['en', 'zh', 'ja', 'ko', 'de', 'fr', 'es'];

  function normalizeLocale(raw) {
    if (!raw || typeof raw !== 'string') return 'en';
    var p = raw.toLowerCase().replace(/_/g, '-').split('-')[0];
    if (p === 'zh') return 'zh';
    if (p === 'ja') return 'ja';
    if (p === 'ko') return 'ko';
    if (p === 'de') return 'de';
    if (p === 'fr') return 'fr';
    if (p === 'es' || p === 'pt') return 'es';
    if (p === 'en') return 'en';
    return 'en';
  }

  function detectLocale() {
    // URL PATH wins above all other signals — the build-time prerender
    // ships canonical per-locale HTML at /<locale>/index.html, and
    // those pages MUST render in the locale their URL announces. If
    // localStorage said "ja" but the user is now on /zh/, applying ja
    // strings to Chinese-rendered HTML produces a hybrid mess and
    // contradicts the page's own <html lang>. Path overrides
    // localStorage AND ?lang= so a deep-linked /zh/ stays Chinese
    // even if the visitor previously chose Japanese.
    try {
      var path = (global.location && global.location.pathname) || '';
      var pathMatch = path.match(/^\/([a-z]{2,3}(?:-[A-Za-z]{2,4})?)\//);
      if (pathMatch) {
        var pp = normalizeLocale(pathMatch[1]);
        if (SUPPORTED.indexOf(pp) !== -1) {
          try {
            global.localStorage && global.localStorage.setItem(STORAGE_KEY, pp);
          } catch (e) {}
          return pp;
        }
      }
    } catch (e) {}
    try {
      var q = new URLSearchParams(global.location.search).get('lang');
      if (q) {
        var nq = normalizeLocale(q);
        if (SUPPORTED.indexOf(nq) !== -1) {
          // Persist URL-driven selection so it survives a refresh /
          // navigation without the param. Without this, ?lang=zh shows
          // Chinese once and then snaps back to the default — surprising
          // for anyone landing via a localized deep link.
          try {
            global.localStorage && global.localStorage.setItem(STORAGE_KEY, nq);
          } catch (e) {}
          return nq;
        }
      }
    } catch (e) {}
    try {
      var stored = global.localStorage && global.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        var ns = normalizeLocale(stored);
        if (SUPPORTED.indexOf(ns) !== -1) return ns;
      }
    } catch (e) {}
    // Auto-detect: walk navigator.languages in priority order and
    // return the first entry that maps to a SUPPORTED locale. This
    // restores ja/ko/de/fr/es auto-detection for users on those
    // primary browsers while still defending against the old bug
    // where the loop skipped `en` and silently served the SECOND
    // language to English-primary users with a Chinese fallback.
    // Anything outside SUPPORTED falls through to English.
    var nav = (global.navigator && global.navigator.languages) || [];
    if (global.navigator && global.navigator.language) {
      nav = [global.navigator.language].concat(nav || []);
    }
    for (var i = 0; i < nav.length; i++) {
      var c = normalizeLocale(nav[i]);
      if (SUPPORTED.indexOf(c) !== -1) return c;
    }
    return 'en';
  }

  function getPath(obj, path) {
    var parts = path.split('.');
    var o = obj;
    for (var i = 0; i < parts.length; i++) {
      if (o == null) return undefined;
      o = o[parts[i]];
    }
    return o;
  }

  var MESSAGES = {};

  function mergeFlat(target, prefix, flat) {
    var k;
    for (k in flat) {
      if (Object.prototype.hasOwnProperty.call(flat, k)) {
        var path = prefix ? prefix + '.' + k : k;
        var parts = path.split('.');
        var cur = target;
        for (var i = 0; i < parts.length - 1; i++) {
          var p = parts[i];
          if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
          cur = cur[p];
        }
        cur[parts[parts.length - 1]] = flat[k];
      }
    }
  }

  var current = 'en';

  function t(key) {
    var v = getPath(MESSAGES[current], key);
    if (typeof v === 'string') return v;
    v = getPath(MESSAGES.en, key);
    if (typeof v === 'string') return v;
    return key;
  }

  function applyAttributes(root) {
    var scope = root || document;
    // Include [data-i18n-html] alone — keys may live only on data-i18n-html="key" (e.g. hero title with <br>)
    scope.querySelectorAll('[data-i18n], [data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      if (!key) return;
      var val = t(key);
      var asHtml = el.hasAttribute('data-i18n-html');
      if (asHtml) {
        el.innerHTML = val;
      } else if (el.tagName === 'META' && el.getAttribute('name') === 'description') {
        el.setAttribute('content', val);
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', val);
      } else {
        el.textContent = val;
      }
    });
  }

  function setDocumentLang(locale) {
    var html = document.documentElement;
    if (locale === 'zh') html.setAttribute('lang', 'zh-Hans');
    else if (locale === 'ja') html.setAttribute('lang', 'ja');
    else if (locale === 'ko') html.setAttribute('lang', 'ko');
    else if (locale === 'de') html.setAttribute('lang', 'de');
    else if (locale === 'fr') html.setAttribute('lang', 'fr');
    else if (locale === 'es') html.setAttribute('lang', 'es');
    else html.setAttribute('lang', 'en');
  }

  function apply() {
    try {
      current = detectLocale();
      setDocumentLang(current);
      var titleEl = document.querySelector('title[data-i18n]');
      if (titleEl) {
        var titleKey = titleEl.getAttribute('data-i18n');
        if (titleKey) document.title = t(titleKey);
      }
      applyAttributes(document);
      document.querySelectorAll('[data-i18n-social]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-social');
        if (key) el.setAttribute('aria-label', t(key));
      });
      var sel = document.getElementById('nav-lang-select');
      if (sel) sel.value = current;
      if (typeof global.__agentKeyOnI18nApply === 'function') {
        global.__agentKeyOnI18nApply(current, t);
      }
    } finally {
      // Lift the FOUT curtain (see index.html <head> style block).
      // finally{} so a partial failure still reveals the page — better
      // to show mixed-language fallback than leave the user staring at
      // a blank screen forever.
      document.documentElement.classList.add('i18n-ready');
    }
  }

  // Map locale → URL prefix. English is root '/' (canonical); the rest
  // are '/<locale>/'. Mirrors what scripts/generate-locales.mjs emits
  // and what sitemap.xml advertises — keep these three in sync.
  function pathForLocale(locale) {
    return locale === 'en' ? '/' : '/' + locale + '/';
  }

  // Rewrite the current pathname to a different locale's prefix.
  // Strips any leading /<2-3-letter>/ segment first so /zh/foo → /ja/foo
  // (not /ja/zh/foo). Preserves the rest of the path verbatim. Anchors
  // and query string are appended by the caller — this function only
  // touches the path.
  function pathToLocale(currentPath, locale) {
    var bare = (currentPath || '/').replace(/^\/([a-z]{2,3})(\/|$)/, '/');
    if (locale === 'en') return bare;
    // For non-root targets, /<locale>/ + rest (without leading slash).
    if (bare === '/') return '/' + locale + '/';
    return '/' + locale + bare;
  }

  function setLocale(locale) {
    var n = normalizeLocale(locale);
    if (SUPPORTED.indexOf(n) === -1) n = 'en';
    // Persist first so the choice survives a full page navigation —
    // any localStorage write must happen BEFORE location.assign or it
    // will be cancelled by the browser unloading the page.
    try {
      global.localStorage && global.localStorage.setItem(STORAGE_KEY, n);
    } catch (e) {}

    // Path-prefix navigation: each locale has its own prerendered HTML
    // at /<locale>/index.html (or / for English). Navigating instead
    // of translating in place gives us:
    //   1. Shareable URLs — copy /zh/ link to WeChat, recipient gets
    //      Chinese first paint, not English-then-flash-translate.
    //   2. Canonical URL matches rendered content — no SEO drift.
    //   3. JSON-LD / hreflang / og:locale all line up with what the
    //      visitor sees, because they're whatever the prerender baked.
    //   4. Back/forward buttons work as a language history.
    // Hash + query are preserved so /#faq?utm_source=x stays anchored.
    var loc = global.location;
    if (loc && loc.assign) {
      var targetPath = pathToLocale(loc.pathname || '/', n);
      var url = targetPath + (loc.search || '') + (loc.hash || '');
      // Same-URL guard: re-selecting the current locale should not
      // trigger a wasted reload. Compare against pathname only (search
      // / hash naturally stay unchanged).
      if (targetPath !== loc.pathname) {
        loc.assign(url);
        return;
      }
    }
    // Fallback for environments without a real location.assign (tests,
    // unusual embeds, very old browsers): degrade to the old in-place
    // translate so the user still sees the right language.
    current = n;
    apply();
  }

  // ── Message tables (nested) ─────────────────────────────────
  MESSAGES.en = {
    meta: {
      title: 'AgentKey: Connect Your Agents to the World',
      description:
        'AgentKey is the unified MCP server that gives your AI agent (Claude Code, Cursor, Windsurf) real-time web search, X / Reddit / YouTube reads, and live crypto data — one install, pay-as-you-go, no per-source signups.',
    },
    nav: {
      overview: 'Overview',
      services: 'Services',
      capabilities: 'Capabilities',
      howToUse: 'How To Use',
      faq: 'FAQ',
      join: 'Try it for free',
      login: 'Login',
    },
    hero: {
      title: 'Connect Agents<br>to the World',
      sub:
        "A plugin that gives your agent access to X, Tiktok, Reddit, Instagram and more sources it can't reach on its own.<br>No subscriptions, zero setup.",
      emailPlaceholder: 'name@email.com',
      watchIntro: 'Watch the intro',
      badgeSoon: 'Coming soon',
      proof: '1,200+ people are already using AgentKey',
    },
    friction: {
      h2: 'Giving agents the power to act',
      body:
        'Stop managing dozens of API keys. One key connects your agent to every service, from search to social data and beyond.',
      labelAgents: 'Support multiple agents',
      ariaRecent: 'Recent signups',
      ariaPlatforms: 'Supported agent platforms',
    },
    hiw: {
      beforeTitle: 'Before AgentKey',
      beforeDesc:
        "You ask your agent to track what people are saying about your brand on Twitter. It can't. You ask it to pull the latest on a competitor. It searches, but only the surface web. You want crypto price context in a research report. Also no. Your agent is smart — it just can't reach anything.",
      modeAgent: 'Agent',
      modeSuper: 'Super Agent',
      afterTitle: 'After AgentKey',
      afterDesc:
        'One key, and your agent can actually do the research. Real-time Twitter data, deep web scraping, social signals, crypto feeds — all connected. It fails over automatically when something goes down. You stop hitting walls.',
      tipSend: 'Click to send',
    },
    integ: {
      secLabel: 'Supported Services',
      title: 'Everything Your Agent Needs',
      sub: 'From search to social media — your agent accesses the entire digital world through a single standardized call.',
      tabSearch: 'Web Search',
      tabScrape: 'Scraping',
      tabSocial: 'Social Media',
      tabCrypto: 'Cryptocurrency',
      tabMore: 'More',
      soon: 'Coming Soon',
      demo: 'Demo',
      tavily:
        'AI-optimized search engine delivering real-time web results with semantic understanding. Purpose-built for agents that need fresh, accurate data without the noise of traditional search.',
      brave:
        'Privacy-focused independent search index with no tracking or user profiling. Crawls the open web on its own, giving agents clean, unbiased results free from ad-driven ranking.',
      perplexity:
        'Answer engine that synthesizes web information and returns verified, cited sources. Ideal for research agents that need confident, fact-backed responses rather than raw links.',
      serper:
        "Google Search API providing fast, reliable access to the world's largest search index. Tap into Google's full ranking signals for high-quality, globally relevant results at scale.",
      firecrawl:
        'Web crawling and scraping API that converts any website into clean, LLM-ready markdown. Purpose-built for agents that need structured page content without HTML noise.',
      jina:
        'URL-to-markdown service from Jina AI that strips scripts and formatting, returning agents clean, readable page content via a single GET request.',
      brightdata_unlocker:
        'Anti-bot bypass for Cloudflare-protected and challenge-gated pages. Returns raw HTML only — no markdown conversion or CSS selectors. Used as the last-resort fallback when Firecrawl and Jina cannot retrieve the page.',
      crypto_market:
        'Symbol-keyed market intelligence: live quotes, market caps, listings, trending coins, gainers/losers, ETF flows, the fear-greed index, and TGE schedules.',
      crypto_exchange:
        'Pair-keyed exchange data across major CEXs — klines, depth, perpetual funding rates, long/short ratios, and liquidation maps.',
      crypto_dex:
        'On-chain DEX pool data: spot pairs, pair quotes, and trades across the major decentralised exchanges.',
      crypto_token:
        'Contract-address-keyed token data: metadata, on-chain price, holders, transfers, tokenomics, and holder / transfer insights.',
      crypto_nft:
        'NFT collections, metadata, floor prices, owners, transfer history, and per-asset price trails.',
      crypto_wallet:
        'Wallet-address-keyed analytics: balance, token holdings, NFTs, transactions, portfolios, net-worth, protocol exposure, and address labels.',
      crypto_chain:
        'Block-and-tx-level chain access: latest block, transaction lookup, SQL warehouse, gas price, bridge & yield rankings, and raw RPC.',
      crypto_domain:
        'Resolve and reverse-lookup blockchain naming services — ENS and Space ID — to bridge human-readable names with on-chain addresses.',
      crypto_news:
        'Crypto news and editorial: breaking articles, daily must-reads, columns, AI-focused coverage, and full-text search.',
      crypto_events:
        'Industry conferences, calendar entries, hackathons, summits, and discussion topics curated for crypto teams.',
      crypto_intel:
        'Crypto social intelligence: trending narratives, mindshare scores, sentiment, smart followers, and on-chain-tied tweets.',
      crypto_prediction:
        'Polymarket and Kalshi prediction markets: events, prices, orderbooks, leaderboards, smart-money flows, and OHLCV.',
      crypto_project:
        'Project research: DeFi protocol metrics and rankings, fund portfolios, and fund rankings.',
      crypto_search:
        'Cross-cutting search across the crypto world: web, news, projects, wallets, social posts, and airdrops.',
      twitter:
        'Real-time public conversation data from X. Ideal for agents monitoring trending topics, sentiment shifts, and breaking news as it unfolds.',
      reddit:
        'Community discussions and upvoted content across thousands of niche subreddits. Great for agents researching grassroots opinions and public discourse.',
      youtube:
        "Video metadata, transcripts, and channel data from the world's largest video platform. Essential for agents analyzing video trends or extracting spoken content.",
      linkedin:
        'Professional network content from LinkedIn, including company updates, career data, and industry thought leadership for professional intelligence agents.',
      tiktok:
        'Short-form video trends, hashtags, and creator data from TikTok. Keeps agents plugged into fast-moving viral content and global entertainment culture.',
      douyin:
        "The Chinese domestic version of TikTok. Unlocks trending video content and creator data from one of China's most-used short-video platforms.",
      zhihu:
        "China's leading Q&A and knowledge-sharing platform. Agents access expert answers, long-form articles, and high-quality community discussions in Chinese.",
      bilibili:
        "China's premier video platform for anime, tech, and youth culture. Ideal for agents tracking Chinese content creators, video trends, and community commentary.",
      threads:
        "Meta's text-based social platform for public conversations. Provides agents with real-time posts from a growing network tied to Instagram's user base.",
      pipixia:
        'Chinese humor and short-video community. Gives agents access to trending memes, viral content, and lighthearted cultural moments from Chinese internet users.',
      wechat:
        "China's dominant messaging super-app with 1.3 billion users. Enables agents to access public articles and Official Account content shared on WeChat.",
      lemon8:
        "ByteDance's lifestyle sharing app popular in Southeast Asia and the US. Connects agents to photo-rich posts on beauty, food, travel, and wellness trends.",
      weibo:
        'China\'s open microblogging platform often called "Chinese Twitter." Gives agents real-time access to trending topics and public discourse in China.',
      instagram:
        "Visual content, reels, and stories from one of the world's largest social platforms. Lets agents monitor brand presence, influencer content, and visual trends at scale.",
      redbook:
        "China's top lifestyle discovery platform (小红书). Agents access user reviews, product recommendations, and trend-setting content from Chinese consumers.",
      kuaishou:
        "China's second-largest short-video platform with a strong grassroots user base. Gives agents access to a distinctive slice of Chinese content outside major cities.",
      coinmarketcap:
        'The most-used crypto data aggregator with real-time prices, market caps, and rankings. The standard source for agents tracking the broader crypto market.',
      dexscreener:
        'Real-time DEX trading data across 80+ blockchains. Built for agents monitoring on-chain price action, liquidity, and newly launched tokens as they emerge.',
      coingecko:
        'Independent crypto market data with deep token histories, exchange volumes, and DeFi metrics. Gives agents comprehensive market intelligence without relying on a single exchange.',
      chainbase:
        'On-chain data infrastructure for querying blockchain state, transactions, and protocol data. Ideal for agents that need structured, SQL-queryable access to raw blockchain activity.',
    },
    socialNav: { left: 'Scroll left', right: 'Scroll right' },
    why: {
      secLabel: 'CAPABILITIES',
      whyWord: 'Why',
      subtitle: 'The only key your agent needs to access the entire digital world.',
      navKey: 'One Unified Key',
      navPayg: 'Pay-As-You-Go',
      navFail: 'Auto Failover',
      navScale: 'Plug and Play',
      featKeyTitle: 'One Unified Key',
      featKeyDesc:
        'No more juggling 10+ API keys. A single master key handles auth, routing, and billing for every provider — managed from one dashboard.',
      featPaygTitle: 'Pay-As-You-Go',
      featPaygDesc:
        'One credit balance shared across all services. No subscriptions, no minimum spend. You pay for what your agent uses.',
      paygCostLbl: 'Credits Cost',
      paygChk1: 'One invoice, one credit balance',
      paygChk2: 'No monthly platform fees',
      paygChk3: 'No surprise caps or overages',
      featFailTitle: 'Auto Failover',
      featFailDesc:
        "A provider goes down, your agent doesn't. AgentKey switches to a backup automatically. No interruption, nothing for you to do.",
      failRouter: 'AGENTKEY ROUTER',
      failActive: 'Active',
      failDown: 'Down',
      failStandby: 'Standby',
      failRouting: '→ Routing here',
      failUnavailable: '✕ Unavailable',
      failReady: 'Ready to take over',
      featScaleTitle: 'Plug and Play',
      featScaleDesc:
        'Add AgentKey to Openclaw or Claude in one line. Or use the API with any agent framework. Either way, your agent is connected in minutes, not days.',
    },
    setup: {
      secLabel: 'HOW TO USE',
      h2: 'Your Key,<br>Three Steps.',
      lead: 'Sign up, add credits, copy your master key. No complex setup — your AI is ready to call any service in minutes.',
      s1t: 'Get your key',
      s1d:
        'Create a free account at <span class="setup-pill">agentkey.app</span><br>Your API key is ready in seconds.',
      s2t: 'Add credits',
      s2d:
        'Top up your balance from the dashboard. Credits work across all services.<br>Pay only for what you use, no subscriptions.',
      s3t: 'Connect your agent',
      s3d:
        'For MCP users (Claude, Cursor, etc.)<br>Drop one config line into your agent settings.<br>Zero code, zero install.<br>For developers<br>Install the SDK, import the client, and start calling.',
    },
    faq: {
      secLabel: 'FAQ',
      h2: 'Frequently asked questions',
      q1: 'What can my agent do with AgentKey?',
      a1:
        "Things it can't do today. Search Twitter, read any webpage, pull Reddit threads, monitor competitors. Your AI gets real-world access through one key. No signups, no config, it just works.",
      q2: 'Do I need to write any code?',
      a2: 'No. Just tell your AI to install AgentKey, or paste a single config line. Either way, it takes under a minute and your agent is ready to go.',
      q3: 'How much does it cost?',
      a3: 'Pay-as-you-go. No subscriptions, no minimums. One credit balance covers everything your agent uses.',
      q4: 'Which platforms does it work with?',
      a4: 'OpenClaw, Claude, Cursor, Windsurf, and any platform that supports MCP or Skills files.',
      q5: 'Why not just sign up for each API myself?',
      a5:
        "You can try. Twitter's developer access alone is $100/month plus OAuth setup. Then repeat that for search, scraping, Reddit... AgentKey gives your AI all of it through one account. If a provider goes down, your agent doesn't break. We switch automatically.",
    },
    cta: {
      h2: 'AgentKey is live.<br>Plug your agent in.',
      sub: 'One key for search, scrape, social and crypto APIs. Pay as you go — no subscription, no setup.',
      placeholder: 'name@email.com',
      btn: 'Join Waitlist',
    },
    waitlist: {
      successTitle: "You're on the list",
      successBody: "Thanks for joining — we'll email you when AgentKey is ready.",
      successCta: 'Got it',
      successAria: 'Waitlist signup successful',
    },
    footer: {
      copy: '© 2026 AgentKey',
      docs: 'Docs',
      privacy: 'Privacy',
      terms: 'Terms',
      support: 'Support',
      status: 'Status',
      about: 'About',
    },
    langSwitcher: { label: 'Language', hint: 'Page language (saved in this browser)' },
    chat: {
      task:
        'Research AI infra funding rounds this week — check Twitter sentiment on the top companies and Reddit buzz, then compile a report',
      greetOff: 'Hey! Ready to help — just give me something to work on.',
      greetOn: 'Hey! Just connected to AgentKey and honestly… I feel like a superhero 💪 What do you need?',
      done: 'All done ✓',
      failed: 'Task failed',
      pnpType: 'install agentkey',
      stepsOn: {
        nextInput: 'Good job 👍',
        report:
          "Here's your report:\n• Groq — $640M Series D. Twitter: 94% positive\n• Together AI — $305M. Reddit: trending in r/MachineLearning\n• Modal Labs — $67M Series B. Strong dev community response\n\n✓ Task complete",
        thanks:
          '😊 Happy to help! All three APIs were handled automatically via AgentKey — no credentials needed on your end.',
      },
      stepsOff: {
        needTavilyKey:
          'To search the web, I need your Tavily API key. Please provide it to continue.',
        invalidTavily:
          '❌ Invalid API key — "tvly-ab12..." was rejected. Please check your Tavily dashboard and try again.',
        needTwitter:
          'Web search complete. Now I need your Twitter API bearer token to analyze sentiment.',
        twitterAuthFail:
          '❌ Twitter authentication failed — 401 Unauthorized. Invalid bearer token. Please verify your credentials.',
        rateLimit:
          'Error 429 — Twitter API rate limit exceeded. Free plan: 0 / 10 requests remaining this month. Task failed.',
      },
    },
  };

  // ── zh (Simplified Chinese) ─────────────────────────────────
  MESSAGES.zh = {
    meta: {
      title: 'AgentKey：让智能体连接整个世界',
      description:
        '一个 API 密钥满足 AI 智能体所需：搜索、抓取、社交数据、加密行情 —— 统一计费、自动故障转移，无需 juggling 多个账号。',
    },
    nav: {
      overview: '概览',
      services: '服务',
      capabilities: '能力',
      howToUse: '使用方式',
      faq: '常见问题',
      join: '免费试用',
      login: '登录',
    },
    hero: {
      title: '让智能体<br>连接整个世界',
      sub:
        '一个插件即可让智能体访问 X、TikTok、Reddit、Instagram 等它独自无法触达的数据源。<br>免订阅，零配置。',
      emailPlaceholder: 'name@email.com',
      watchIntro: '观看介绍',
      badgeSoon: '即将推出',
      proof: '已有 1,200+ 人在使用 AgentKey',
    },
    friction: {
      h2: '赋予智能体行动的能力',
      body: '别再管理几十把 API 密钥。一把密钥即可连接搜索、社交数据等所有服务。',
      labelAgents: '支持多个智能体',
      ariaRecent: '最近报名用户',
      ariaPlatforms: '支持的智能体平台',
    },
    hiw: {
      beforeTitle: '使用 AgentKey 之前',
      beforeDesc:
        '你让智能体追踪人们在 Twitter 上如何谈论你的品牌——它做不到。你让它拉取竞品的最新动态——它能搜，但只能触达表层网页。你想在研究报告里加上加密价格背景——也不行。智能体很聪明——只是接不上这些数据。',
      modeAgent: '智能体',
      modeSuper: '超级智能体',
      afterTitle: '使用 AgentKey 之后',
      afterDesc:
        '一把密钥，智能体才能真正做研究：Twitter 实时数据、深度网页抓取、社交信号、加密行情——全部打通。上游出问题会自动切换。你不用再处处碰壁。',
      tipSend: '点击发送',
    },
    integ: {
      secLabel: '支持的服务',
      title: '智能体需要的都在这里',
      sub: '从搜索到社交媒体 —— 通过统一的标准化调用，访问整个数字世界。',
      tabSearch: '网页搜索',
      tabScrape: '抓取',
      tabSocial: '社交媒体',
      tabCrypto: '加密货币',
      tabMore: '更多',
      soon: '即将推出',
      demo: '演示',
      tavily: '面向 AI 优化的搜索引擎，实时网页结果与语义理解。为需要新鲜、准确数据的智能体打造，远离传统搜索噪音。',
      brave: '注重隐私的独立搜索索引，无跟踪与用户画像。自主抓取开放网络，为智能体提供干净、无广告排序偏见的结果。',
      perplexity: '整合网页信息并返回可核验引用来源的答案引擎。适合需要可靠事实而非原始链接的研究类智能体。',
      serper: 'Google 搜索 API，快速可靠访问全球最大搜索索引。利用完整排序信号，大规模获取高质量、全球相关结果。',
      firecrawl: '将任意网站转为干净、适合 LLM 的 Markdown 的爬取与抓取 API。适合需要结构化正文、摆脱 HTML 噪音的智能体。',
      jina: 'Jina AI 的 URL 转 Markdown 服务，去除脚本与版式，一次 GET 即可返回清晰可读的正文。',
      brightdata_unlocker: '反爬旁路抓取，专门应对 Cloudflare 等强保护页面。只返回原始 HTML，不做 markdown 转换 / 选择器过滤；作为 Firecrawl、Jina 都拿不到内容时的最后兜底。',
      crypto_market: '按 symbol 检索的市场情报：实时报价、市值、上币列表、热门币、涨跌榜、ETF 资金流、恐慌贪婪指数和 TGE 日程。',
      crypto_exchange: '主流 CEX 的交易对数据 —— K 线、深度、永续资金费率、多空比和爆仓图。',
      crypto_dex: '链上 DEX 池数据：现货对、对报价、各主流去中心化交易所的成交记录。',
      crypto_token: '按合约地址检索的代币数据：元数据、链上价格、持有者、转账、tokenomics 以及持有者 / 转账洞察。',
      crypto_nft: 'NFT 系列、元数据、地板价、持有者、转账历史和单资产价格轨迹。',
      crypto_wallet: '按钱包地址检索的分析：余额、代币持仓、NFT、交易、组合、净值、协议敞口和地址标签。',
      crypto_chain: '区块与交易级链上访问：最新区块、交易查询、SQL 数据仓库、Gas 价格、跨链和收益排名、原始 RPC。',
      crypto_domain: '区块链命名服务的正反向解析 —— ENS 和 Space ID —— 在可读名字与链上地址之间架桥。',
      crypto_news: '加密新闻与编辑内容：突发文章、每日必读、专栏、AI 主题报道和全文搜索。',
      crypto_events: '行业大会、日历、黑客松、峰会和为加密团队精选的讨论主题。',
      crypto_intel: '加密社交情报：热门叙事、声量评分、情绪、聪明跟随者和链上联动推文。',
      crypto_prediction: 'Polymarket 和 Kalshi 预测市场：事件、价格、订单簿、排行榜、聪明钱流向和 OHLCV。',
      crypto_project: '项目研究：DeFi 协议指标与排名、基金组合、基金排名。',
      crypto_search: '加密世界的跨类搜索：网页、新闻、项目、钱包、社交帖子和空投。',
      twitter: '来自 X 的实时公开对话数据。适合追踪热点话题、情绪变化与突发新闻的智能体。',
      reddit: '成千上万垂直社群的讨论与点赞内容。适合研究公众舆论与草根观点的智能体。',
      youtube: '全球最大视频平台的元数据、字幕与频道信息。适合分析视频趋势或提取语音内容的智能体。',
      linkedin: '来自 LinkedIn 的职业网络内容：公司动态、职业数据与行业观点，服务专业情报类智能体。',
      tiktok: '短视频趋势、话题标签与创作者数据。让智能体跟上快速变化的爆款与全球娱乐文化。',
      douyin: '抖音国内版。获取中国主流短视频平台的热点视频与创作者数据。',
      zhihu: '中国领先的问答与知识社区。智能体可获取高质量长文与中文深度讨论。',
      bilibili: '中国主流视频社区（动漫、科技、青年文化）。适合追踪中文创作者与弹幕社区风向。',
      threads: 'Meta 旗下文字社交产品，与 Instagram 用户群联动，获取实时公开动态。',
      pipixia: '中文幽默与短视频社区。获取表情包、热梗与轻松向网络文化。',
      wechat: '拥有超 13 亿用户的国民级应用。智能体可访问公众号等公开文章与内容。',
      lemon8: '字节跳动旗下生活方式社区，流行于东南亚与美国。涵盖美妆、美食、旅行、健康等图文动态。',
      weibo: '中国开放式微博平台，常被称作「中文推特」。实时热点与公共讨论一手掌握。',
      instagram: '全球最大视觉社交平台之一的内容、Reels 与 Stories。规模化监测品牌、达人与视觉趋势。',
      redbook: '中国头部生活方式种草平台（小红书）。用户评价、好物推荐与消费趋势。',
      kuaishou: '中国第二大短视频平台，草根用户基础深厚。呈现一线城市之外的真实中文内容生态。',
      coinmarketcap: '使用最广泛的加密数据聚合器：实时价格、市值与排名。跟踪整体加密市场的标配数据源。',
      dexscreener: '覆盖 80+ 链的 DEX 实时交易数据。监测链上价格、流动性与新上线代币。',
      coingecko: '独立的加密行情与深度历史、交易所成交量与 DeFi 指标。不依赖单一交易所的全面市场情报。',
      chainbase: '链上数据基础设施，可查询链状态、交易与协议数据。需要结构化、类 SQL 访问链上活动的智能体的理想选择。',
    },
    socialNav: { left: '向左滚动', right: '向右滚动' },
    why: {
      secLabel: '核心能力',
      whyWord: '为什么选择',
      subtitle: '访问整个数字世界，你只需要这一把密钥。',
      navKey: '统一密钥',
      navPayg: '按量付费',
      navFail: '自动故障转移',
      navScale: '即插即用',
      featKeyTitle: '统一密钥',
      featKeyDesc: '告别十几把 API 密钥。一把主密钥负责鉴权、路由与计费 —— 在同一面板管理。',
      featPaygTitle: '按量付费',
      featPaygDesc: '所有服务共享同一余额。无订阅、无最低消费，用多少付多少。',
      paygCostLbl: '积分消耗',
      paygChk1: '一张账单，一个余额',
      paygChk2: '无月费平台费',
      paygChk3: '无意外封顶或超额账单',
      featFailTitle: '自动故障转移',
      featFailDesc: '上游挂了，你的智能体不受影响。AgentKey 自动切换备用线路，无需你动手。',
      failRouter: 'AGENTKEY 路由',
      failActive: '可用',
      failDown: '故障',
      failStandby: '待命',
      failRouting: '→ 当前路由',
      failUnavailable: '✕ 不可用',
      failReady: '可随时接管',
      featScaleTitle: '即插即用',
      featScaleDesc:
        '一行配置接入 OpenClaw 或 Claude，或通过 API 接入任意智能体框架。几分钟内连通，而不是几天。',
    },
    setup: {
      secLabel: '使用步骤',
      h2: '三步拿到<br>你的密钥',
      lead: '注册、充值、复制主密钥。无需复杂配置，几分钟内即可调用任意服务。',
      s1t: '获取密钥',
      s1d: '在 <span class="setup-pill">agentkey.app</span> 免费注册<br>几秒内即可生成 API 密钥。',
      s2t: '充值',
      s2d: '在控制台为余额充值，积分适用于全部服务。<br>按量付费，无订阅。',
      s3t: '连接智能体',
      s3d:
        'MCP 用户（Claude、Cursor 等）<br>在智能体设置中粘贴一行配置即可。<br>零代码、零安装。<br>开发者<br>安装 SDK、引入客户端即可开始调用。',
    },
    faq: {
      secLabel: '常见问题',
      h2: '常见问题',
      q1: '我的智能体能用 AgentKey 做什么？',
      a1:
        '做它现在还做不到的事：搜推特、读任意网页、拉 Reddit 串文、盯竞品。一把密钥打通真实世界数据，无需再注册与配置。',
      q2: '需要写代码吗？',
      a2: '不需要。让 AI 安装 AgentKey，或粘贴一行配置。通常不到一分钟即可开始。',
      q3: '怎么收费？',
      a3: '按量付费。无订阅、无最低消费。一个余额覆盖智能体使用的所有服务。',
      q4: '支持哪些平台？',
      a4: 'OpenClaw、Claude、Cursor、Windsurf，以及所有支持 MCP 或 Skills 文件的平台。',
      q5: '为什么不自己分别注册各个 API？',
      a5:
        '可以试试：仅 Twitter 开发者权限就约每月 $100 外加 OAuth 配置；搜索、抓取、Reddit 再来一遍…… AgentKey 一个账号全包。供应商宕机时智能体也不挂，我们会自动切换。',
    },
    cta: {
      h2: 'AgentKey 已开放使用<br>立即接入你的智能体',
      sub: '一把密钥，打通搜索、抓取、社媒、加密 API。按量付费，无需订阅，零配置上手。',
      placeholder: 'name@email.com',
      btn: '加入候补名单',
    },
    waitlist: {
      successTitle: '已成功加入候补名单',
      successBody: '感谢注册 —— AgentKey 开放时我们会发邮件通知你。',
      successCta: '好的',
      successAria: '报名成功',
    },
    footer: {
      copy: '© 2026 AgentKey',
      docs: '文档',
      privacy: '隐私政策',
      terms: '服务条款',
      support: '支持',
      status: '状态',
      about: '关于',
    },
    langSwitcher: { label: '语言', hint: '页面语言（保存在本机浏览器）' },
    chat: {
      task: '调研本周 AI 基础设施融资 —— 分析头部公司的推特情绪与 Reddit 讨论，并整理报告',
      greetOff: '嗨！我准备好了 —— 给我任务就行。',
      greetOn: '嗨！刚接上 AgentKey，感觉像开了挂 💪 需要我做什么？',
      done: '全部完成 ✓',
      failed: '任务失败',
      pnpType: 'install agentkey',
      stepsOn: {
        nextInput: '干得漂亮 👍',
        report:
          '报告如下：\n• Groq — 6.4 亿美元 D 轮。推特情绪：94% 正面\n• Together AI — 3.05 亿美元。Reddit：r/MachineLearning 热议\n• Modal Labs — 6700 万美元 B 轮。开发者社区反响强烈\n\n✓ 任务完成',
        thanks:
          '😊 没问题！三个 API 都已通过 AgentKey 自动处理 —— 你这边无需再填任何凭据。',
      },
      stepsOff: {
        needTavilyKey: '要进行网页搜索，我需要你的 Tavily API 密钥。请提供后继续。',
        invalidTavily:
          '❌ API 密钥无效 ——「tvly-ab12...」被拒绝。请在 Tavily 控制台核对后重试。',
        needTwitter: '网页搜索完成。现在需要你的 Twitter API bearer token 以分析情绪。',
        twitterAuthFail:
          '❌ Twitter 鉴权失败 —— 401 Unauthorized。Bearer token 无效，请核对凭据。',
        rateLimit:
          '错误 429 —— Twitter API 超出速率限制。免费计划：本月剩余 0/10 次请求。任务失败。',
      },
    },
  };

  // Other locales: copy English structure then override — loaded in part 2
  MESSAGES.ja = JSON.parse(JSON.stringify(MESSAGES.en));
  MESSAGES.ko = JSON.parse(JSON.stringify(MESSAGES.en));
  MESSAGES.de = JSON.parse(JSON.stringify(MESSAGES.en));
  MESSAGES.fr = JSON.parse(JSON.stringify(MESSAGES.en));
  MESSAGES.es = JSON.parse(JSON.stringify(MESSAGES.en));

  // Japanese
  mergeFlat(MESSAGES.ja, null, {
    'meta.title': 'AgentKey：エージェントを世界へつなぐ',
    'meta.description':
      'AIエージェントに必要なものすべてを1つのAPIキーで。検索、スクレイピング、ソーシャル、暗号 — 統合課金、自動フェイルオーバー、複数アカウント不要。',
    'nav.overview': '概要',
    'nav.services': 'サービス',
    'nav.capabilities': '機能',
    'nav.howToUse': '使い方',
    'nav.faq': 'FAQ',
    'nav.join': '無料で試す',
    'nav.login': 'ログイン',
    'hero.title': 'エージェントを<br>世界へつなぐ',
    'hero.sub':
      'X、TikTok、Reddit、Instagramなど、単体では届かないソースへアクセスするプラグイン。<br>サブスク不要、設定ゼロ。',
    'hero.watchIntro': 'イントロを見る',
    'hero.badgeSoon': '近日公開',
    'hero.proof': 'すでに 1,200 人以上が AgentKey を利用中',
    'friction.h2': 'エージェントに「動く力」を',
    'friction.body':
      '何十ものAPIキーを管理するのは終わり。1つのキーで検索からソーシャルデータまで接続。',
    'friction.labelAgents': '複数エージェント対応',
    'hiw.beforeTitle': 'AgentKeyの前',
    'hiw.afterTitle': 'AgentKeyの後',
    'hiw.beforeDesc':
      'ブランドについてTwitter上で何が言われているか追跡させようとしても、できません。競合の最新情報を引き出させても、検索はできるものの表層のウェブにしか届きません。調査レポートに暗号資産の文脈を足したくても、それも無理。エージェントは賢いのに、手が届きません。',
    'hiw.afterDesc':
      '1つのキーがあれば、エージェントは本当にリサーチができます。Twitterのリアルタイムデータ、ディープウェブのスクレイピング、ソーシャルシグナル、暗号フィード——すべて接続。障害時は自動フェイルオーバー。もう壁にぶつかりません。',
    'hiw.modeAgent': 'エージェント',
    'hiw.modeSuper': 'スーパーエージェント',
    'hiw.tipSend': 'クリックして送信',
    'integ.secLabel': '対応サービス',
    'integ.title': 'エージェントに必要なすべて',
    'integ.sub':
      '検索からソーシャルまで — ひとつの標準化された呼び出しで、エージェントがデジタル世界全体にアクセスできます。',
    'integ.tabSearch': 'ウェブ検索',
    'integ.tabScrape': 'スクレイピング',
    'integ.tabSocial': 'ソーシャル',
    'integ.tabCrypto': '暗号資産',
    'integ.tabMore': 'その他',
    'integ.soon': '近日公開',
    'integ.demo': 'デモ',
    'why.secLabel': '機能',
    'why.whyWord': 'なぜ',
    'setup.secLabel': '使い方',
    'faq.secLabel': 'FAQ',
    'faq.h2': 'よくある質問',
    'cta.btn': 'ウェイトリストに参加',
    'footer.copy': '© 2026 AgentKey',
    'footer.docs': 'ドキュメント',
    'footer.privacy': 'プライバシー',
    'footer.terms': '利用規約',
    'footer.support': 'サポート',
    'footer.status': 'ステータス',
    'footer.about': '私たちについて',
    'langSwitcher.label': '言語',
    'chat.greetOff': 'やあ！準備OK — 何でもどうぞ。',
    'chat.greetOn': 'やあ！AgentKeyに繋がったよ…まるでヒーロー気分 💪 何を手伝おう？',
    'chat.done': '完了 ✓',
    'chat.failed': '失敗しました',
    'waitlist.successTitle': 'リストに登録しました',
    'waitlist.successBody': 'ご登録ありがとうございます。AgentKeyの公開時にメールでお知らせします。',
    'waitlist.successCta': '閉じる',
    'waitlist.successAria': 'ウェイトリスト登録が完了しました',
  });

  // Korean
  mergeFlat(MESSAGES.ko, null, {
    'meta.title': 'AgentKey: 에이전트를 세상과 연결하다',
    'meta.description':
      'AI 에이전트에 필요한 모든 것을 하나의 API 키로. 검색, 스크래핑, 소셜, 암호화폐 — 통합 과금, 자동 페일오버.',
    'nav.overview': '개요',
    'nav.services': '서비스',
    'nav.capabilities': '기능',
    'nav.howToUse': '사용 방법',
    'nav.faq': 'FAQ',
    'nav.join': '무료로 시작하기',
    'nav.login': '로그인',
    'hero.title': '에이전트를<br>세상과 연결하다',
    'hero.sub':
      'X, TikTok, Reddit, Instagram 등 혼자서는 닿기 어려운 소스에 연결하는 플러그인.<br>구독 없음, 설정 없음.',
    'hero.watchIntro': '소개 영상',
    'hero.badgeSoon': '곧 공개',
    'hero.proof': '이미 1,200명 이상이 AgentKey를 사용 중',
    'friction.h2': '에이전트에 행동력을',
    'friction.body': '수많은 API 키 관리는 그만. 하나의 키로 검색부터 소셜 데이터까지.',
    'friction.labelAgents': '여러 에이전트 지원',
    'hiw.beforeTitle': 'AgentKey 이전',
    'hiw.afterTitle': 'AgentKey 이후',
    'hiw.beforeDesc':
      '브랜드에 대해 Twitter에서 사람들이 뭐라고 하는지 추적해 달라고 하면, 안 됩니다. 경쟁사 최신 정보를 끌어오라고 하면, 검색은 하지만 표면만 봅니다. 리서치 보고서에 암호화폐 가격 맥락을 넣고 싶어도 역시 안 됩니다. 에이전트는 똑똑한데, 닿을 수가 없습니다.',
    'hiw.afterDesc':
      '키 하나면 에이전트가 진짜 리서치를 할 수 있습니다. 실시간 Twitter 데이터, 딥 웹 스크래핑, 소셜 시그널, 암호화폐 피드 — 모두 연결. 장애 시 자동 페일오버. 더 이상 벽에 부딪히지 않습니다.',
    'hiw.modeAgent': '에이전트',
    'hiw.modeSuper': '슈퍼 에이전트',
    'hiw.tipSend': '클릭하여 전송',
    'integ.secLabel': '지원 서비스',
    'integ.title': '에이전트에 필요한 모든 것',
    'integ.sub':
      '검색부터 소셜 미디어까지 — 하나의 표준화된 호출로 에이전트가 디지털 세계 전체에 접근합니다.',
    'integ.tabSearch': '웹 검색',
    'integ.tabScrape': '스크래핑',
    'integ.tabSocial': '소셜 미디어',
    'integ.tabCrypto': '암호화폐',
    'integ.tabMore': '더보기',
    'integ.soon': '곧 공개',
    'integ.demo': '데모',
    'why.secLabel': '기능',
    'why.whyWord': '왜',
    'setup.secLabel': '사용 방법',
    'faq.secLabel': 'FAQ',
    'faq.h2': '자주 묻는 질문',
    'cta.btn': '대기자 명단',
    'footer.copy': '© 2026 AgentKey',
    'footer.docs': '문서',
    'footer.privacy': '개인정보 처리방침',
    'footer.terms': '이용약관',
    'footer.support': '지원',
    'footer.status': '상태',
    'footer.about': '회사 소개',
    'langSwitcher.label': '언어',
    'chat.greetOff': '안녕! 준비됐어 — 시키면 바로 할게.',
    'chat.greetOn': '안녕! AgentKey 연결했어… 진짜 히어로 같아 💪 뭐 도와줄까?',
    'chat.done': '완료 ✓',
    'chat.failed': '실패',
    'waitlist.successTitle': '명단에 등록되었습니다',
    'waitlist.successBody': '등록해 주셔서 감사합니다. 준비되면 이메일로 알려 드립니다.',
    'waitlist.successCta': '확인',
    'waitlist.successAria': '대기자 명단 등록 완료',
  });

  // German
  mergeFlat(MESSAGES.de, null, {
    'meta.title': 'AgentKey: Agenten mit der Welt verbinden',
    'meta.description':
      'Ein API-Schlüssel für alles, was Ihr KI-Agent braucht. Suche, Scraping, Social, Krypto — eine Abrechnung, automatisches Failover.',
    'nav.overview': 'Überblick',
    'nav.services': 'Dienste',
    'nav.capabilities': 'Funktionen',
    'nav.howToUse': 'Nutzung',
    'nav.faq': 'FAQ',
    'nav.join': 'Kostenlos testen',
    'nav.login': 'Anmelden',
    'hero.title': 'Agenten<br>mit der Welt verbinden',
    'hero.sub':
      'Ein Plugin für X, TikTok, Reddit, Instagram und mehr — Quellen, die der Agent allein nicht erreicht.<br>Kein Abo, kein Setup.',
    'hero.watchIntro': 'Intro ansehen',
    'hero.badgeSoon': 'Demnächst',
    'hero.proof': 'Bereits 1.200+ Nutzer von AgentKey',
    'friction.h2': 'Agenten die Kraft zum Handeln geben',
    'friction.body':
      'Schluss mit Dutzenden API-Schlüsseln. Ein Schlüssel verbindet Suche, Social-Daten und mehr.',
    'friction.labelAgents': 'Mehrere Agenten',
    'hiw.beforeTitle': 'Vor AgentKey',
    'hiw.afterTitle': 'Nach AgentKey',
    'hiw.beforeDesc':
      'Sie bitten Ihren Agenten zu verfolgen, was auf Twitter über Ihre Marke gesagt wird — er kann es nicht. Sie wollen die neuesten Infos zu einem Wettbewerber — er sucht, aber nur im oberflächlichen Web. Kryptokurs-Kontext für einen Research-Report? Ebenfalls nein. Ihr Agent ist schlau — er erreicht einfach nichts.',
    'hiw.afterDesc':
      'Ein Schlüssel — und Ihr Agent kann die Recherche wirklich machen. Echtzeit-Twitter-Daten, Deep-Web-Scraping, Social-Signale, Krypto-Feeds — alles verbunden. Bei Ausfällen automatisches Failover. Sie stoßen nicht mehr an Grenzen.',
    'hiw.modeAgent': 'Agent',
    'hiw.modeSuper': 'Super-Agent',
    'hiw.tipSend': 'Zum Senden klicken',
    'integ.secLabel': 'Unterstützte Dienste',
    'integ.title': 'Alles für Ihren Agenten',
    'integ.sub':
      'Von der Suche bis zu Social Media — Ihr Agent greift über einen einzigen standardisierten Aufruf auf die gesamte digitale Welt zu.',
    'integ.tabSearch': 'Websuche',
    'integ.tabScrape': 'Scraping',
    'integ.tabSocial': 'Social Media',
    'integ.tabCrypto': 'Kryptowährung',
    'integ.tabMore': 'Mehr',
    'integ.soon': 'Demnächst',
    'integ.demo': 'Demo',
    'why.secLabel': 'FÄHIGKEITEN',
    'why.whyWord': 'Warum',
    'setup.secLabel': 'NUTZUNG',
    'faq.secLabel': 'FAQ',
    'faq.h2': 'Häufige Fragen',
    'cta.btn': 'Warteliste',
    'footer.copy': '© 2026 AgentKey',
    'footer.docs': 'Dokumentation',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.support': 'Support',
    'footer.status': 'Status',
    'footer.about': 'Über uns',
    'langSwitcher.label': 'Sprache',
    'chat.greetOff': 'Hey! Bereit — gib mir eine Aufgabe.',
    'chat.greetOn': 'Hey! Gerade mit AgentKey verbunden — fühle mich wie ein Superheld 💪 Was brauchst du?',
    'chat.done': 'Fertig ✓',
    'chat.failed': 'Fehlgeschlagen',
    'waitlist.successTitle': 'Du stehst auf der Liste',
    'waitlist.successBody': 'Danke für deine Anmeldung. Wir melden uns, sobald AgentKey startet.',
    'waitlist.successCta': 'Alles klar',
    'waitlist.successAria': 'Wartelisten-Anmeldung erfolgreich',
  });

  // French
  mergeFlat(MESSAGES.fr, null, {
    'meta.title': 'AgentKey : connectez vos agents au monde',
    'meta.description':
      'Une clé API pour tout ce dont votre agent IA a besoin. Recherche, scraping, social, crypto — facturation unifiée, basculement auto.',
    'nav.overview': 'Aperçu',
    'nav.services': 'Services',
    'nav.capabilities': 'Capacités',
    'nav.howToUse': 'Utilisation',
    'nav.faq': 'FAQ',
    'nav.join': 'Essayer gratuitement',
    'nav.login': 'Connexion',
    'hero.title': 'Connectez vos agents<br>au monde entier',
    'hero.sub':
      "Un plugin pour accéder à X, TikTok, Reddit, Instagram et plus — des sources inaccessibles seul.<br>Pas d'abonnement, zéro config.",
    'hero.watchIntro': "Voir l'intro",
    'hero.badgeSoon': 'Bientôt',
    'hero.proof': 'Plus de 1 200 utilisateurs d\'AgentKey',
    'friction.h2': 'Donner aux agents le pouvoir d’agir',
    'friction.body':
      'Fini les dizaines de clés API. Une clé relie recherche, données sociales et bien plus.',
    'friction.labelAgents': 'Plusieurs agents',
    'hiw.beforeTitle': 'Avant AgentKey',
    'hiw.afterTitle': 'Après AgentKey',
    'hiw.beforeDesc':
      "Vous demandez à votre agent de suivre ce que l'on dit de votre marque sur Twitter — il ne peut pas. Vous voulez les dernières infos sur un concurrent — il cherche, mais seulement le web de surface. Du contexte crypto dans un rapport ? Non plus. Votre agent est intelligent — il ne peut tout simplement rien atteindre.",
    'hiw.afterDesc':
      'Une clé, et votre agent peut vraiment faire la recherche. Données Twitter en temps réel, scraping du web profond, signaux sociaux, flux crypto — le tout connecté. Basculement automatique en cas de panne. Vous cessez de buter sur des murs.',
    'hiw.modeAgent': 'Agent',
    'hiw.modeSuper': 'Super-agent',
    'hiw.tipSend': 'Cliquer pour envoyer',
    'integ.secLabel': 'Services pris en charge',
    'integ.title': "Tout ce dont votre agent a besoin",
    'integ.sub':
      'De la recherche aux réseaux sociaux — votre agent accède au monde numérique entier par un seul appel standardisé.',
    'integ.tabSearch': 'Recherche web',
    'integ.tabScrape': 'Scraping',
    'integ.tabSocial': 'Réseaux sociaux',
    'integ.tabCrypto': 'Crypto',
    'integ.tabMore': 'Plus',
    'integ.soon': 'Bientôt',
    'integ.demo': 'Démo',
    'why.secLabel': 'CAPACITÉS',
    'why.whyWord': 'Pourquoi',
    'setup.secLabel': 'UTILISATION',
    'faq.secLabel': 'FAQ',
    'faq.h2': 'Questions fréquentes',
    'cta.btn': "Liste d'attente",
    'footer.copy': '© 2026 AgentKey',
    'footer.docs': 'Documentation',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.support': 'Support',
    'footer.status': 'Statut',
    'footer.about': 'À propos',
    'langSwitcher.label': 'Langue',
    'chat.greetOff': 'Salut ! Prêt — donnez-moi une tâche.',
    'chat.greetOn': "Salut ! Branché sur AgentKey — je me sens comme un super-héros 💪 Besoin de quoi ?",
    'chat.done': 'Terminé ✓',
    'chat.failed': 'Échec',
    'waitlist.successTitle': 'Vous êtes inscrit(e)',
    'waitlist.successBody': "Merci ! Nous vous écrirons dès qu'AgentKey ouvre.",
    'waitlist.successCta': 'Compris',
    'waitlist.successAria': 'Inscription à la liste réussie',
  });

  // Spanish
  mergeFlat(MESSAGES.es, null, {
    'meta.title': 'AgentKey: conecta a tus agentes con el mundo',
    'meta.description':
      'Una API key para todo lo que tu agente de IA necesita. Búsqueda, scraping, redes, cripto — facturación unificada, failover automático.',
    'nav.overview': 'Resumen',
    'nav.services': 'Servicios',
    'nav.capabilities': 'Capacidades',
    'nav.howToUse': 'Uso',
    'nav.faq': 'FAQ',
    'nav.join': 'Probar gratis',
    'nav.login': 'Iniciar sesión',
    'hero.title': 'Conecta a tus agentes<br>con el mundo',
    'hero.sub':
      'Un plugin para acceder a X, TikTok, Reddit, Instagram y más — fuentes que solo no alcanza.<br>Sin suscripción, sin configuración.',
    'hero.watchIntro': 'Ver intro',
    'hero.badgeSoon': 'Pronto',
    'hero.proof': 'Más de 1.200 usuarios usan AgentKey',
    'friction.h2': 'Dar a los agentes el poder de actuar',
    'friction.body':
      'Deja de gestionar decenas de API keys. Una clave conecta búsqueda, datos sociales y más.',
    'friction.labelAgents': 'Varios agentes',
    'hiw.beforeTitle': 'Antes de AgentKey',
    'hiw.afterTitle': 'Después de AgentKey',
    'hiw.beforeDesc':
      'Pides a tu agente que rastree lo que la gente dice de tu marca en Twitter — no puede. Que saque lo último sobre un competidor — busca, pero solo la superficie web. Contexto de precios crypto en un informe — tampoco. Tu agente es listo — simplemente no llega a nada.',
    'hiw.afterDesc':
      'Una clave, y tu agente sí puede hacer la investigación. Datos de Twitter en tiempo real, scraping web profundo, señales sociales, feeds de cripto — todo conectado. Failover automático cuando algo falla. Dejas de chocar contra muros.',
    'hiw.modeAgent': 'Agente',
    'hiw.modeSuper': 'Súper agente',
    'hiw.tipSend': 'Clic para enviar',
    'integ.secLabel': 'Servicios admitidos',
    'integ.title': 'Todo lo que tu agente necesita',
    'integ.sub':
      'De la búsqueda a las redes sociales — tu agente accede a todo el mundo digital con una sola llamada estandarizada.',
    'integ.tabSearch': 'Búsqueda web',
    'integ.tabScrape': 'Scraping',
    'integ.tabSocial': 'Redes sociales',
    'integ.tabCrypto': 'Criptomonedas',
    'integ.tabMore': 'Más',
    'integ.soon': 'Pronto',
    'integ.demo': 'Demo',
    'why.secLabel': 'CAPACIDADES',
    'why.whyWord': 'Por qué',
    'setup.secLabel': 'USO',
    'faq.secLabel': 'FAQ',
    'faq.h2': 'Preguntas frecuentes',
    'cta.btn': 'Lista de espera',
    'footer.copy': '© 2026 AgentKey',
    'footer.docs': 'Documentación',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.support': 'Soporte',
    'footer.status': 'Estado',
    'footer.about': 'Acerca de',
    'langSwitcher.label': 'Idioma',
    'chat.greetOff': '¡Hola! Listo — dime en qué trabajar.',
    'chat.greetOn': '¡Hola! Acabo de conectar AgentKey… ¡me siento un superhéroe! 💪 ¿Qué necesitas?',
    'chat.done': 'Listo ✓',
    'chat.failed': 'Falló',
    'waitlist.successTitle': 'Estás en la lista',
    'waitlist.successBody': 'Gracias por apuntarte. Te avisaremos cuando AgentKey esté listo.',
    'waitlist.successCta': 'Entendido',
    'waitlist.successAria': 'Inscripción en la lista completada',
  });

  global.AgentKeyI18n = {
    apply: apply,
    t: t,
    detectLocale: detectLocale,
    getLocale: function () {
      return current;
    },
    setLocale: setLocale,
    supported: SUPPORTED,
    // Exposed for the build-time generator (scripts/generate-locales.mjs)
    // which prerenders per-locale HTML so search engines see translated
    // content without executing JS. The runtime browser code does not
    // depend on this field — feel free to swap to a getter later, but
    // keep the field present so the build pipeline keeps working.
    _messages: MESSAGES,
  };
})(typeof window !== 'undefined' ? window : this);
