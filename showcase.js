const prompt = document.querySelector("#prompt");
const promptArrow = document.querySelector(".prompt-arrow");
const conversation = document.querySelector("#conversation");
const agentDot = document.querySelector(".agent-dot");
const status = document.querySelector("#status");
const response = document.querySelector("#response");
const output = document.querySelector(".agent-output");
const viewport = document.querySelector(".conversation-viewport");
const audienceTitleSlot = document.querySelector("#audience-title-slot");
const agentDots = document.querySelector(".agent-dots");
const showcaseContent = document.querySelector(".showcase-content");
const scenarioConnector = document.querySelector("#scenario-connector");
const connectorLine = document.querySelector("#connector-line");

const statuses = [
  "AgentKey successfully loaded",
  "AgentKey.find_tools",
  "AgentKey.describe_tool",
  "AgentKey.execute_tool",
];

const conversations = [
  {
    prompt: "Search TikTok, YouTube, Instagram, and X for trending content about AI productivity tools from the last seven days. Identify five recurring topics with representative posts, creators, and engagement metrics.",
    answer: `
  <div class="terminal-answer terminal-answer-productivity">
  <h2 data-reveal>AI Productivity Trends</h2>
  <p class="answer-intro" data-reveal>Search window: <strong>June 3–10, 2026.</strong> Metrics are snapshots from June 10 and may continue rising.</p>
  <div class="results-table">
    <div class="results-header" data-reveal>
      <strong>Recurring topic</strong>
      <strong>Representative posts and engagement</strong>
    </div>
    <div class="result-row" data-reveal>
      <strong>1. Claude workflows, memory and token efficiency</strong>
      <p><span class="platform-badge tiktok-badge"><img src="assets/tiktok.png" alt=""></span> <a>Microsoft MarkItDown</a> by @ai.with.andrew on TikTok: <strong>1.08M views, 58K likes, 56K saves, 9K shares.</strong> <span class="platform-badge instagram-badge"><img src="assets/instagram.svg" alt=""></span> <a>Claude Code “brain” workflow</a> on Instagram: <strong>591 likes, 926 comments.</strong> <span class="platform-badge youtube-badge"><img src="assets/youtube.svg" alt=""></span> <a>12 essential Claude Code features</a> by Nate Herk: <strong>80K views.</strong></p>
    </div>
    <div class="result-row" data-reveal>
      <strong>2. Free tools and paid-tool replacements</strong>
      <p><span class="platform-badge instagram-badge"><img src="assets/instagram.svg" alt=""></span> <a>Paid vs. free alternatives</a> by Bharatt: <strong>4,317 likes.</strong> <span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span> <a>12 paid tools vs free replacements</a> by Maxwell Orion: <strong>3,523 views, 81 likes, 33 reposts, 34 bookmarks.</strong> <span class="platform-badge youtube-badge"><img src="assets/youtube.svg" alt=""></span> <a>Seven free AI tools</a> by Simplilearn: <strong>3,332 views.</strong></p>
    </div>
    <div class="result-row" data-reveal>
      <strong>3. AI coding and prompt-to-app development</strong>
      <p><span class="platform-badge tiktok-badge"><img src="assets/tiktok.png" alt=""></span> <a>Replit builds mobile apps in minutes</a> by SAN: <strong>116K views, 2,255 likes.</strong> <span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span> <a>Full-stack app generation</a> by Markandey Sharma: <strong>49.6K views, 111 likes.</strong> <span class="platform-badge instagram-badge"><img src="assets/instagram.svg" alt=""></span> <a>Claude Code plugin stack</a> by @sebastianhardy_: <strong>749 likes, 369 comments.</strong></p>
    </div>
    <div class="result-row" data-reveal>
      <strong>4. End-to-end AI content and video production</strong>
      <p><span class="platform-badge tiktok-badge"><img src="assets/tiktok.png" alt=""></span> <a>CapCut Director Mode</a> by Roosh Tech: <strong>168K views, 7,591 likes.</strong> <span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span> <a>AI-generated UGC workflow</a> by Ahad Shams: <strong>5,789 views, 92 likes, 68 bookmarks.</strong> <span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span> <a>Single-workspace creative pipeline</a> by Mr. Jason: <strong>16.8K views, 104 likes, 39 reposts.</strong></p>
    </div>
    <div class="result-row" data-reveal>
      <strong>5. Research, knowledge management and learning</strong>
      <p><span class="platform-badge youtube-badge"><img src="assets/youtube.svg" alt=""></span> <a>NotebookLM + Gemini workspace</a> by AI Podcast: <strong>6,659 views.</strong> <span class="platform-badge instagram-badge"><img src="assets/instagram.svg" alt=""></span> <a>Free student productivity apps</a> by @studious_harshita: <strong>635 likes, 28 comments.</strong> <span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span> <a>AI research-tool list</a> by Maxwell Orion: <strong>2,378 views, 91 likes, 55 bookmarks.</strong></p>
    </div>
  </div>
  <h3 data-reveal>Overall Pattern</h3>
  <p data-reveal>The strongest engagement centered on <strong>concrete workflows</strong>, not generic tool announcements. Posts promising measurable savings such as fewer tokens, hours saved, subscription replacements, or complete idea-to-output pipelines consistently outperformed broad AI commentary.</p>
  <p data-reveal>Platform search results are algorithmic rather than exhaustive. Instagram’s general Reels search returned stale material, so its qualifying examples came from the current <code>#aitools</code> feed.</p>
  </div>
    `,
  },
  {
    prompt: "Find the most-engaged discussions about ChatGPT on Reddit, X, and Hacker News from the last seven days. Summarize the main debates and propose five specific video topics.",
    answer: `
      <div class="terminal-answer terminal-answer-discussions">
      <h2 data-reveal>Top Discussions</h2>
      <div class="discussion-table terminal-discussion-table">
        <div class="discussion-header" data-reveal>
          <strong>Platform</strong><strong>Discussion</strong><strong>Engagement</strong>
        </div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge reddit-badge"><img src="assets/reddit.png" alt=""></span></span><p>Asked ChatGPT to create an image of a typical Reddit thread <code>(https://www.reddit.com/r/ChatGPT/comments/1u3olyt/)</code></p><strong>1.7K votes, 258 comments</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge reddit-badge"><img src="assets/reddit.png" alt=""></span></span><p>“This is insane” / GPT watermark visual discussion <code>(https://www.reddit.com/r/ChatGPT/comments/1u24uy7/this_is_insane/)</code></p><strong>474 votes, 155 comments</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge reddit-badge"><img src="assets/reddit.png" alt=""></span></span><p>Has ChatGPT tweaked its model? <code>(https://www.reddit.com/r/ChatGPT/comments/1u5nwv5/has_chatgpt_tweaked_its_model/)</code></p><strong>Metrics not exposed in search result, but surfaced as a current top result</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge reddit-badge"><img src="assets/reddit.png" alt=""></span></span><p>Chat tried to redirect me to malware site <code>(https://www.reddit.com/r/ChatGPT/comments/1u4ywrj/chat_tried_to_redirect_me_to_malware_site/)</code></p><strong>45 votes, 54 comments</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></span><p>Qend3of6days9: “why you shouldn't just ask ChatGPT what chemicals to add to your pool”</p><strong>341.9K views, 1,390 likes, 177 reposts, 1,388 bookmarks</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></span><p>@Lord_Sugar asks ChatGPT whether he or Piers Morgan is more famous</p><strong>313.3K views, 946 likes, 44 reposts, 100 replies</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></span><p>@IndianTechGuide: ChatGPT ranked #5 most visited website in India</p><strong>288.9K views, 2,450 likes, 106 reposts, 142 replies</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></span><p>@pusholder: ChatGPT Plus Turkey price increase</p><strong>286.6K views, 867 likes, 92 replies</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></span><p>@0x_kaize: OpenAI free Codex / ChatGPT Pro access thread</p><strong>96.7K views, 528 likes, 58 reposts, 117 replies, 791 bookmarks</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge hn-badge"><img src="assets/hacker-news.svg" alt=""></span></span><p>“Don’t You Just Upload It to ChatGPT?” <code>(https://news.ycombinator.com/item?id=48507278)</code></p><strong>476 points, 382 comments</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge hn-badge"><img src="assets/hacker-news.svg" alt=""></span></span><p>Leaked OpenAI financials show $38.5B loss and compute burn <code>(https://news.ycombinator.com/item?id=48565130)</code></p><strong>201 points, 220 comments</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge hn-badge"><img src="assets/hacker-news.svg" alt=""></span></span><p>OpenAI Losses Increased Nearly 8X in 2025 <code>(https://news.ycombinator.com/item?id=48550465)</code></p><strong>156 points, 90 comments</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge hn-badge"><img src="assets/hacker-news.svg" alt=""></span></span><p>OpenAI mulls slashing prices as it competes with Anthropic <code>(https://news.ycombinator.com/item?id=48486486)</code></p><strong>135 points, 142 comments</strong></div>
        <div class="discussion-row" data-reveal><span><span class="platform-badge hn-badge"><img src="assets/hacker-news.svg" alt=""></span></span><p>State Attorneys General Are Investigating OpenAI <code>(https://news.ycombinator.com/item?id=48522675)</code></p><strong>65 points, 5 comments</strong></div>
      </div>
      <h3 data-reveal>Main Debates</h3>
      <ol class="debate-list" data-reveal>
        <li><strong>Convenience vs. overreliance:</strong> People are debating whether ChatGPT is becoming a default mental shortcut, from asking it for pool chemicals to using it as a constant thinking partner.</li>
        <li><strong>Authenticity and “AI voice”:</strong> Reddit discussions focused on images, Reddit-thread simulations, and people “sounding like ChatGPT,” showing concern that AI style is bleeding into normal communication.</li>
        <li><strong>Trust and safety:</strong> Threads about malware redirects, medical use, suicide-related lawsuits, and OpenAI investigations centered on whether ChatGPT is safe enough for high-stakes advice.</li>
        <li><strong>Product quality and regression:</strong> Reddit posts about model changes and X posts about hallucination/context problems suggest users still feel the product can suddenly degrade or become unreliable.</li>
        <li><strong>AI economics:</strong> HN was dominated by OpenAI’s losses, price cuts, price increases, and competition with Anthropic, shifting the debate from product magic to whether the business model works.</li>
      </ol>
      <h3 data-reveal>Five Video Topics</h3>
      <ol class="video-topic-list" data-reveal>
        <li><strong>“Should You Trust ChatGPT With Real-Life Advice?”</strong></li>
        <li><strong>“Why Everyone Thinks ChatGPT Got Worse”</strong></li>
        <li><strong>“The ChatGPT Voice Problem: Are People Starting to Sound Like AI?”</strong></li>
        <li><strong>“OpenAI’s Money Problem: Can ChatGPT Stay Cheap?”</strong></li>
        <li><strong>“When ChatGPT Goes Wrong: Malware Links, Medical Advice, and Legal Risk”</strong></li>
      </ol>
      </div>
    `,
  },
  {
    prompt: "Compare the top-performing Claude Code content published on Threads, TikTok, Bilibili and YouTube in the last 30 days. List the leading posts and analyze their hooks, formats, topics, and engagement.",
    answer: `
      <div class="terminal-answer terminal-answer-claude">
      <p class="answer-intro" data-reveal>Search window: <strong>May 18–June 17, 2026.</strong> Metrics are current snapshots from the platform/search APIs, not normalized across platforms.</p>
      <div class="claude-table">
        <div class="claude-header" data-reveal><strong>Platform</strong><strong>Leading post</strong><strong>Hook / format / topic</strong><strong>Engagement</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge tiktok-badge"><img src="assets/tiktok.png" alt=""></span></span><p><strong>This Is Money:</strong> Microsoft reportedly banned Claude Code</p><p>News-shock hook: “AI tool became more expensive than staff.” Short vertical news explainer about enterprise token costs.</p><strong>3.29M views, 152.6K likes, 2,657 comments, 27K shares, 12.7K saves</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge tiktok-badge"><img src="assets/tiktok.png" alt=""></span></span><p><strong>AI Honeycove:</strong> Claude Code redesigns any room</p><p>Visual transformation hook. Shows Claude Code + Banana Skill + Google AI Studio for interior design from one photo.</p><strong>1.46M views, 64.3K likes, 373 comments, 21.7K shares, 65.8K saves</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge tiktok-badge"><img src="assets/tiktok.png" alt=""></span></span><p><strong>ai.with.andrew:</strong> Microsoft MarkItDown cuts Claude PDF token usage</p><p>Utility/cost-saving hook: “cut token usage by up to 70%.” Practical workflow for Markdown conversion.</p><strong>1.42M views, 76.7K likes, 254 comments, 11.4K shares, 73.3K saves</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge tiktok-badge"><img src="assets/tiktok.png" alt=""></span></span><p><strong>Mariah / AI & Tech:</strong> LLM Council inside Claude</p><p>Decision-making hook: “Claude agrees with you 49% more than a human.” Prompt framework / council format.</p><strong>1.16M views, 76.3K likes, 666 comments, 12.3K shares, 69.9K saves</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge youtube-badge"><img src="assets/youtube.svg" alt=""></span></span><p><strong>Dan Martell:</strong> “Learn 97% of Claude in Under 16 Minutes”</p><p>Compressed mastery promise. Fast tutorial aimed at paid Claude users who feel they underuse it.</p><strong>1.42M views</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge youtube-badge"><img src="assets/youtube.svg" alt=""></span></span><p><strong>Metics Media:</strong> “Build $10,000 Websites using Claude Code”</p><p>Money/outcome hook. Long-form practical build guide for premium websites.</p><strong>441K views</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge youtube-badge"><img src="assets/youtube.svg" alt=""></span></span><p><strong>Claude:</strong> “Explore → Plan → Code → Commit workflow”</p><p>First-party workflow explainer. Clear four-step mental model for using Claude Code effectively.</p><strong>290.8K views</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge youtube-badge"><img src="assets/youtube.svg" alt=""></span></span><p><strong>Claude:</strong> “Build a proactive agent workflow with Claude Code”</p><p>Agent teammate hook: opens PRs before you start work. First-party demo format.</p><strong>188.1K views</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge bilibili-badge"><img src="assets/bilibili.svg" alt=""></span></span><p><strong>GenJi是真想教会你:</strong> 用 Claude Code 做“发疯版 NBTI”测试</p><p>Entertainment-first project: workplace personality-test parody, then vibe Coding walkthrough.</p><strong>1.89M views, 47.1K likes, 18.3K favorites, 1,200 comments</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge threads-badge"><img src="assets/threads.png" alt=""></span></span><p><strong>virtualshihab:</strong> built 3 web apps in 40 minutes with Claude Code</p><p>Personal proof hook: “I don’t know anything about coding.” Text post, maker flex.</p><strong>1,718 likes, 226 replies, 64 reshares, 53 reposts</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge threads-badge"><img src="assets/threads.png" alt=""></span></span><p><strong>howdybigmike:</strong> “top 1% AI god stack”</p><p>Status/list hook. Claude Code + Codex handoffs + Obsidian memory + agentic workflows.</p><strong>315 likes, 25 replies, 69 reshares, 21 reposts</strong></div>
        <div class="claude-row" data-reveal><span><span class="platform-badge threads-badge"><img src="assets/threads.png" alt=""></span></span><p><strong>nathansebastian:</strong> Codex vs Claude Code after Claude Fable</p><p>Tool-comparison debate. Short prompt for comments.</p><strong>471 likes, 39 replies</strong></div>
      </div>
      <h3 data-reveal>Pattern Analysis</h3>
      <p data-reveal>The strongest content used one of four hooks:</p>
      <ol class="pattern-list" data-reveal>
        <li><strong>Cost shock:</strong> Microsoft banning Claude Code, token bills, proxying Claude Code to cheaper/free models, cutting PDF token usage.</li>
        <li><strong>Concrete transformation:</strong> room redesign, website builder, motion design studio, web designer workflows.</li>
        <li><strong>Compressed mastery:</strong> “learn 97%,” “from zero in 19 minutes,” “complete course,” “best tricks.”</li>
        <li><strong>Tool rivalry:</strong> Claude Code vs Codex, Claude vs ChatGPT, Claude Code vs local/open alternatives.</li>
      </ol>
      <p data-reveal>TikTok rewarded visual or financial stakes most strongly. YouTube rewarded complete tutorials and authoritative workflows. Bilibili rewarded project-based entertainment plus tutorial value. Threads rewarded personal proof, tool-stack identity, and debate prompts, but engagement was much smaller than video platforms.</p>
      </div>
    `,
  },
];

const growthMarketerConversations = [
  {
    prompt: "Search Reddit and X for the most-engaged discussions about Cursor vs Windsurf from the last 30 days. Compare what users praise and complain about for each product, with representative posts and engagement metrics.",
    answer: `
      <div class="terminal-answer terminal-answer-competitor">
      <p data-reveal>Top-line finding: direct <strong>Cursor vs Windsurf</strong> debates were not highly viral in the last 30 days. X had more visible discussion than Reddit, but many high-reach posts were broader “AI coding tools” posts, not deep head-to-head comparisons.</p>

      <h3 data-reveal>Representative Discussions</h3>
      <div class="discussion-card-list">
        <div class="discussion-card" data-reveal>
          <dl>
            <dt>Platform</dt><dd><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></dd>
            <dt>Post / creator</dt><dd>@shmidtqq <code>(https://x.com/shmidtqq/status/2064374493598949713)</code></dd>
            <dt>Date</dt><dd>Jun 9</dd>
            <dt>Engagement</dt><dd><strong>129,274 views, 144 likes, 25 replies, 6 reposts, 363 bookmarks</strong></dd>
            <dt>What it shows</dt><dd>Highest-reach direct-match result, but the post is only an X Article link, so the visible tweet text does not expose the argument.</dd>
          </dl>
        </div>
        <div class="discussion-card" data-reveal>
          <dl>
            <dt>Platform</dt><dd><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></dd>
            <dt>Post / creator</dt><dd>@morganlinton <code>(https://x.com/morganlinton/status/2059761976998597101)</code></dd>
            <dt>Date</dt><dd>May 27</dd>
            <dt>Engagement</dt><dd><strong>3,612 views, 39 likes, 7 replies, 1 repost, 8 bookmarks</strong></dd>
            <dt>What it shows</dt><dd>Explicit comparison of Cursor Composer 2.5 vs Devin/Windsurf SWE 1.6. Praises speed and cost, but says both are not yet production-grade.</dd>
          </dl>
        </div>
        <div class="discussion-card" data-reveal>
          <dl>
            <dt>Platform</dt><dd><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></dd>
            <dt>Post / creator</dt><dd>@realpython <code>(https://x.com/realpython/status/2065438227566116904)</code></dd>
            <dt>Date</dt><dd>Jun 12</dd>
            <dt>Engagement</dt><dd><strong>1,140 views, 11 likes, 2 replies, 1 repost, 8 bookmarks</strong></dd>
            <dt>What it shows</dt><dd>Article post comparing Cursor and Windsurf for Python across completion, multi-file editing, and debugging.</dd>
          </dl>
        </div>
        <div class="discussion-card" data-reveal>
          <dl>
            <dt>Platform</dt><dd><span class="platform-badge x-badge"><img src="assets/x.png" alt=""></span></dd>
            <dt>Post / creator</dt><dd>@YashHustle_22 <code>(https://x.com/YashHustle_22/status/2060759748128248135)</code></dd>
            <dt>Date</dt><dd>May 30</dd>
            <dt>Engagement</dt><dd><strong>2,079 views, 28 likes, 39 replies</strong></dd>
            <dt>What it shows</dt><dd>“Go-to AI coding tool” discussion listing Cursor and Windsurf alongside Claude, ChatGPT, Codex, Copilot, and Replit AI.</dd>
          </dl>
        </div>
        <div class="discussion-card" data-reveal>
          <dl>
            <dt>Platform</dt><dd><span class="platform-badge reddit-badge"><img src="assets/reddit.png" alt=""></span></dd>
            <dt>Post / creator</dt><dd>r/cursor <code>(https://www.reddit.com/r/cursor/comments/1u4m1gr/i_wonder_if_you_will_use_cursor_windsurf_and/)</code></dd>
            <dt>Date</dt><dd>Jun 13</dd>
            <dt>Engagement</dt><dd><strong>3 comments, 0.33 upvote ratio, score unavailable</strong></dd>
            <dt>What it shows</dt><dd>User says they use Cursor, Windsurf, Codex, and Claude Code simultaneously. This reflects a recurring pattern: users are stacking tools instead of choosing only one.</dd>
          </dl>
        </div>
      </div>

      <h3 data-reveal>What Users Praise</h3>
      <div class="compare-table">
        <div class="compare-header" data-reveal><strong>Product</strong><strong>Praised for</strong></div>
        <div class="compare-row" data-reveal><strong>Cursor</strong><p>More mature daily IDE experience, stronger ecosystem visibility, better fit as a primary coding environment, flexible model configuration.</p></div>
        <div class="compare-row" data-reveal><strong>Cursor</strong><p>Model routing/custom model setup. Example: @rileybrown <code>(https://x.com/rileybrown/status/2067075406553895342)</code> posted a Cursor + OpenRouter/GLM 5.2 setup guide with <strong>11,609 views, 92 likes, and 63 bookmarks.</strong></p></div>
        <div class="compare-row" data-reveal><strong>Windsurf</strong><p>Agentic coding workflows, multi-file automation, fast generation, and being a viable alternative/companion to Cursor.</p></div>
        <div class="compare-row" data-reveal><strong>Windsurf</strong><p>Often appears in tool-stack discussions with Devin, Claude Code, Codex, and Cursor, which suggests users see it as part of the serious AI coding tool set.</p></div>
      </div>

      <h3 data-reveal>What Users Complain About</h3>
      <div class="compare-table">
        <div class="compare-header" data-reveal><strong>Product</strong><strong>Complaints</strong></div>
        <div class="compare-row" data-reveal><strong>Cursor</strong><p>Pricing and usage limits remain part of the switching discussion. Some users like Cursor but compare it against Windsurf for quota/value reasons.</p></div>
        <div class="compare-row" data-reveal><strong>Cursor</strong><p>Fast models such as Composer 2.5 are seen as useful for getting 80%–90% of the way, but not always reliable enough to finish production work without cleanup.</p></div>
        <div class="compare-row" data-reveal><strong>Windsurf</strong><p>Lower public discussion volume than Cursor in this period. It often appears as a secondary option or stack component rather than the default choice.</p></div>
        <div class="compare-row" data-reveal><strong>Windsurf</strong><p>Similar reliability concern: agentic runs can stop too early, miss unfinished parts, or leave bugs.</p></div>
      </div>

      <h3 data-reveal>Bottom Line</h3>
      <p data-reveal><strong>Cursor</strong> is winning the public conversation on <strong>mindshare, ecosystem, model flexibility, and primary IDE positioning.</strong> Windsurf is praised for <strong>agentic workflow and automation</strong>, but in the last 30 days it appeared more often as a comparison point or complementary tool than as the dominant choice.</p>
      </div>
    `,
  },
  {
    prompt: "Research Notion AI and Perplexity using their official product pages and recent web results. Compare their target users, headline messaging, value propositions, feature framing, pricing cues, and primary calls to action.",
    answer: `
      <div class="terminal-answer terminal-answer-messaging">
      <h2 data-reveal>Messaging Comparison</h2>
      <div class="messaging-table">
        <div class="messaging-header" data-reveal>
          <strong>Area</strong><strong>Notion AI</strong><strong>Perplexity Enterprise</strong>
        </div>
        <div class="messaging-row" data-reveal>
          <strong>Core headline</strong>
          <p>“Meet your 24/7 AI team”</p>
          <p>“Accurate AI that works for your team”</p>
        </div>
        <div class="messaging-row" data-reveal>
          <strong>Main promise</strong>
          <p>AI teammates embedded inside your workspace that can answer questions, prioritize tasks, write reports, automate workflows, and work while you sleep.</p>
          <p>A secure enterprise AI platform that orchestrates multiple models across company files/tools for tasks, deep research, and complex projects.</p>
        </div>
        <div class="messaging-row" data-reveal>
          <strong>Positioning</strong>
          <p>AI as a <strong>workspace-native teammate.</strong> Notion frames AI as part of docs, projects, meetings, databases, and company knowledge.</p>
          <p>AI as an <strong>accurate research and execution layer.</strong> Perplexity emphasizes trusted answers, citations, model orchestration, and enterprise-grade research.</p>
        </div>
        <div class="messaging-row" data-reveal>
          <strong>Emotional hook</strong>
          <p>“Your AI team” and “infinite minds, built for teamwork.” The copy is approachable and workflow-oriented.</p>
          <p>“Accurate information is just the start.” The copy is more enterprise, analytical, and trust-driven.</p>
        </div>
      </div>

      <h3 data-reveal>Target Users</h3>
      <p data-reveal>Notion targets teams already working inside Notion or looking for a unified workspace: individuals, growing businesses, and enterprises. The page explicitly packages AI around team workflows: agents, meeting notes, enterprise search, permissions, analytics, and governance. It also has clear plan segmentation, including Free, Business, and Enterprise contexts. Sources: Notion headline and plan sections show “For individuals,” “For growing businesses,” and enterprise controls/security. <code>(https://www.notion.com/product/ai)</code> <code>(https://www.notion.com/product/ai)</code></p>
      <p data-reveal>Perplexity targets enterprise teams that need reliable research, knowledge access, and AI-assisted work across departments. It names Product, Legal, Finance, Government, Tech, Education, Sales, and Marketing, and leans into regulated/knowledge-heavy environments with security, audit logs, SSO/SCIM, HIPAA/GDPR, and customer proof. <code>(https://www.perplexity.ai/enterprise)</code></p>

      <h3 data-reveal>Key Value Propositions</h3>
      <div class="value-grid">
        <div class="value-header" data-reveal>
          <strong>Notion AI</strong>
          <strong>Perplexity Enterprise</strong>
        </div>
        <div class="value-row" data-reveal>
          <p>Built directly into Notion pages, docs, tasks, databases, and connected apps.</p>
          <p>Secure platform across files, tools, web research, and multiple models.</p>
        </div>
        <div class="value-row" data-reveal>
          <p>Custom Agents automate recurring team work.</p>
          <p>“Computer” puts 20 advanced models to work for research, creation, coding, and project execution.</p>
        </div>
        <div class="value-row" data-reveal>
          <p>Enterprise Search finds answers across Slack, Google Drive, GitHub, and more.</p>
          <p>Internal knowledge search plus external web research with reliable sources and citations.</p>
        </div>
        <div class="value-row" data-reveal>
          <p>AI Meeting Notes create summaries and follow-ups without a bot.</p>
          <p>Comet browser adds agentic workflow help: answering questions, emails, and busywork.</p>
        </div>
        <div class="value-row" data-reveal>
          <p>Strong admin story: permissions, analytics, governance, model agnostic workflows.</p>
          <p>Strong trust story: SOC 2 Type II, GDPR, HIPAA, configurable retention, audit logs.</p>
        </div>
      </div>
      </div>
    `,
  },
  {
    prompt: "Search YouTube, Reddit, Product Hunt, and Perplexity for AI meeting notes tools from the last 30 days. Identify the most-mentioned products, recurring user pain points, launch discussions, comparison angles, and content hooks.",
    answer: `
      <div class="terminal-answer terminal-answer-meeting-notes">
      <p data-reveal>I searched across YouTube, Reddit, Product Hunt, and Perplexity-indexed web results for the last 30 days. The category is crowded, but the same names kept recurring.</p>

      <h3 data-reveal>Most-Mentioned Products</h3>
      <div class="product-table">
        <div class="product-header" data-reveal><strong>Product</strong><strong>Where it showed up</strong><strong>Positioning pattern</strong></div>
        <div class="product-row" data-reveal><strong>Fathom</strong><p>YouTube, Reddit, Product Hunt, Perplexity results</p><p>Best free / generous free tier, fast summaries, simple individual workflow</p></div>
        <div class="product-row" data-reveal><strong>Granola</strong><p>YouTube, Reddit, Product Hunt, Perplexity results</p><p>Bot-free, founder/consultant-friendly, “AI-enhanced personal notes”</p></div>
        <div class="product-row" data-reveal><strong>Fireflies.ai</strong><p>YouTube, Reddit, Product Hunt, Perplexity results</p><p>Integrations, CRM workflows, searchable meeting archive, team analytics</p></div>
        <div class="product-row" data-reveal><strong>Otter.ai</strong><p>YouTube, Reddit, Product Hunt, Perplexity results</p><p>Familiar live transcription, collaborative transcripts, mainstream default</p></div>
        <div class="product-row" data-reveal><strong>Janie</strong><p>YouTube, Reddit, Perplexity results</p><p>Privacy-first, bot-free, multilingual, works across platforms and in-person</p></div>
        <div class="product-row" data-reveal><strong>Fellow</strong><p>YouTube, Reddit, Perplexity results</p><p>Team/enterprise meeting workflow, compliance, admin controls</p></div>
        <div class="product-row" data-reveal><strong>Bluedot</strong><p>YouTube, Product Hunt, Perplexity results</p><p>Invisible/bot-free notetaker, Google Meet/Zoom/Teams capture</p></div>
        <div class="product-row" data-reveal><strong>tl;dv</strong><p>YouTube, Product Hunt, Perplexity results</p><p>Meeting search, video highlights, sales/customer research use cases</p></div>
        <div class="product-row" data-reveal><strong>Krisp</strong><p>YouTube, Product Hunt, Perplexity results</p><p>Noise cancellation plus meeting notes / voice AI</p></div>
        <div class="product-row" data-reveal><strong>Notion AI / Notion</strong><p>Product Hunt, Perplexity results</p><p>Workspace-native notes tied to docs, projects, knowledge base</p></div>
      </div>

      <h3 data-reveal>Recurring User Pain Points</h3>
      <ol class="pain-list" data-reveal>
        <li><strong>Visible bots make meetings awkward</strong><br>This was the clearest recurring pain point. Users and reviewers repeatedly separate tools into bot-based and bot-free. Bot-free tools like Granola, Janie, Bluedot, and Tactiq get framed as better for client calls, recruiting, VC/founder calls, legal, consulting, and any trust-sensitive meeting.</li>
        <li><strong>Transcripts are not enough</strong><br>Many comparisons criticize tools that produce long transcripts but weak summaries. Users want decisions, action items, owners, follow-ups, and searchable context, not just raw text.</li>
        <li><strong>Accuracy breaks in messy meetings</strong><br>Common complaints: speaker attribution fails when people talk over each other, accents and noisy rooms reduce quality, and large group calls create unreliable notes.</li>
        <li><strong>Summaries are too generic</strong><br>Fireflies and similar tools are sometimes praised for integrations but criticized when summaries treat every meeting type the same. Users want different formats for standups, sales calls, interviews, IC meetings, client reviews, and product reviews.</li>
        <li><strong>Pricing and free-plan limits are confusing</strong><br>YouTube comparisons repeatedly focus on free tiers, storage caps, summary limits, meeting caps, and whether “unlimited transcription” still requires payment for useful AI summaries.</li>
        <li><strong>Enterprise/security requirements matter</strong><br>Reddit discussions around finance and team deployment emphasize SOC 2, HIPAA, GDPR, data training policies, admin controls, retention, and cross-platform support.</li>
      </ol>

      <h3 data-reveal>Launch / Product Hunt Discussion Themes</h3>
      <p data-reveal>Product Hunt’s AI meeting notetaker category surfaces <strong>Notion, Fathom, Granola, Krisp, Limitless, tl;dv, Grain, Fireflies, HyNote, Voicenotes, Otter, Backtrack, Superpowered, and Bluedot</strong> as visible products.</p>
      </div>
    `,
  },
];

const productManagerConversations = [
  {
    prompt: "Search Reddit and X for discussions about Strava subscription from the last 90 days. Identify the most common user complaints, requested features, pricing objections, and workflows users say they still solve with other apps.",
    answer: `
      <div class="terminal-answer terminal-answer-strava">
      <p data-reveal>I searched for Strava subscription / Premium discussions across Reddit and X for the last 90 days. Caveat: direct Reddit API access was blocked, and X search results were noisy because “premium” often matched X Premium instead of Strava. The strongest usable signal came from indexed Reddit/Strava/X-visible results and recent pricing/cancellation pages.</p>

      <h3 data-reveal>Most Common Complaints</h3>
      <div class="compare-table wide-compare-table">
        <div class="compare-header" data-reveal><strong>Theme</strong><strong>What users complain about</strong></div>
        <div class="compare-row" data-reveal><strong>Low value vs free tier</strong><p>Many say free Strava already covers tracking, feed, kudos, clubs, and basic activity logging. Premium feels optional unless they use segments, routes, heatmaps, or live segments.</p></div>
        <div class="compare-row" data-reveal><strong>Training features are weak</strong><p>Users repeatedly say Strava is more of a social/competition app than a serious training platform. Fitness/Freshness, Relative Effort, training log, and analysis are often described as less useful than Garmin, Intervals.icu, TrainingPeaks, or watch-native tools.</p></div>
        <div class="compare-row" data-reveal><strong>Too many “basic” personal stats are paywalled</strong><p>“Best efforts,” deeper segment leaderboards, training log, and some progress views are called out as things users feel should be included in free or basic functionality.</p></div>
        <div class="compare-row" data-reveal><strong>Cancellation/billing confusion</strong><p>Users complain about needing to cancel through the same platform where they subscribed: web, Apple, or Google Play. Some mention hidden/difficult cancellation paths, no prorated refunds, and needing to cancel 24+ hours before renewal.</p></div>
        <div class="compare-row" data-reveal><strong>Feature development does not justify price</strong><p>A recurring objection is that the product has not changed enough to justify <strong>$79.99/year</strong> or <strong>$11.99/month</strong> for many casual users.</p></div>
      </div>

      <h3 data-reveal>Pricing Objections</h3>
      <p data-reveal>Current public pricing surfaced in the search results:</p>
      <div class="price-table">
        <div class="price-row price-header" data-reveal><strong>Plan</strong><strong>Price</strong></div>
        <div class="price-row" data-reveal><p>Individual annual</p><strong>$79.99/year</strong></div>
        <div class="price-row" data-reveal><p>Individual monthly</p><strong>$11.99/month, or $143.88/year if kept monthly</strong></div>
        <div class="price-row" data-reveal><p>Family annual</p><strong>$139.99/year, up to 4 accounts</strong></div>
        <div class="price-row" data-reveal><p>Student annual</p><strong>$39.99/year</strong></div>
        <div class="price-row" data-reveal><p>Strava + Runna bundle</p><strong>$149.99/year, web/Android noted in indexed results</strong></div>
      </div>
      <p data-reveal>The most common pricing objections:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li>$80/year feels high for people who mainly want social tracking.</li>
        <li>Monthly pricing at $11.99 is seen as poor value compared with annual.</li>
        <li>Users say they would pay at a discount but not full price.</li>
        <li>Some compare it unfavorably with Garmin Connect, which is free once you own the device.</li>
        <li>Others defend the price as “less than $7/month” if they use Strava daily and value the community.</li>
      </ul>

      <h3 data-reveal>Requested Features / Improvements</h3>
      <div class="compare-table wide-compare-table">
        <div class="compare-header" data-reveal><strong>Requested feature</strong><strong>User motivation</strong></div>
        <div class="compare-row" data-reveal><strong>Better training analytics</strong><p>Users want Strava to compete more seriously with Garmin, Intervals.icu, TrainingPeaks, and Runalyze.</p></div>
        <div class="compare-row" data-reveal><strong>Better route generation</strong><p>Route builder is praised, but some users complain recommended routes are repetitive or do not match criteria well.</p></div>
        <div class="compare-row" data-reveal><strong>More free access to personal progress</strong><p>Best efforts, PB comparisons, training log, and historical self-comparison are viewed as personal data that should not be heavily paywalled.</p></div>
        <div class="compare-row" data-reveal><strong>Clearer subscription management</strong><p>Users want easier cancellation, clearer renewal notices, and less platform confusion between Strava web, Apple, and Google Play.</p></div>
      </div>
      </div>
    `,
  },
  {
    prompt: "Research Airbnb and Booking.com using their official product pages and recent web results. Compare their target users, homepage messaging, trust signals, booking flow emphasis, loyalty positioning, and primary calls to action.",
    answer: `
      <div class="terminal-answer terminal-answer-marketplace">
      <h3 data-reveal>Summary</h3>
      <p data-reveal>Airbnb positions itself around <strong>unique stays, experiences, services, and host-led travel.</strong> Booking.com positions itself around <strong>breadth, price, convenience, and instantly bookable travel inventory</strong> across stays, flights, cars, attractions, and taxis.</p>

      <div class="messaging-table compact-messaging-table">
        <div class="messaging-row" data-reveal><strong>Area<br>Airbnb<br>Booking.com</strong><p><strong>Target users</strong><br>Leisure travelers looking for homes, cabins, beach houses, unique stays, experiences, and services; also hosts who want to earn income.<br>Broad travel shoppers: hotel bookers, apartment/home renters, business travelers, package/flight/car/attraction buyers, and property partners.</p></div>
        <div class="messaging-row" data-reveal><strong>Area<br>Airbnb<br>Booking.com</strong><p><strong>Homepage/product messaging</strong><br>Discovery-led: “Homes,” “Experiences,” “Services,” with search fields for where, when, and who. The page leans into inspiration and unique trip types.<br>Utility-led: “Find your next stay,” “Search deals on hotels, homes and much more,” plus tabs for stays, flights, flight + hotel, car rental, attractions, and airport taxis.</p></div>
        <div class="messaging-row" data-reveal><strong>Area<br>Airbnb<br>Booking.com</strong><p><strong>Core value proposition</strong><br>“Find a place or experience that feels personal, local, and distinctive.” Airbnb emphasizes community, hosts, unique inventory, and confidence through AirCover and quality signals.<br>“Compare and book travel easily with huge selection, low rates, instant confirmation, no booking fees, and 24/7 support.” Booking.com emphasizes scale and transaction efficiency.</p></div>
        <div class="messaging-row" data-reveal><strong>Area<br>Airbnb<br>Booking.com</strong><p><strong>Trust signals</strong><br>AirCover, reviews, Guest Favorites, Superhost, ID verification, reservation screening, secure messaging, 24-hour safety line. Airbnb says Guest Favorites are based on ratings, reviews, and reliability data.<br>Verified guest reviews, 70M+ property reviews, instant confirmation, secure booking, price match, no reservation fees, free cancellation in many cases, 24/7 support in 40+ languages.</p></div>
        <div class="messaging-row" data-reveal><strong>Area<br>Airbnb<br>Booking.com</strong><p><strong>Booking flow emphasis</strong><br>Search-first but more exploratory: destination, dates, guests, category browsing, listing quality, host details, reviews, protection.<br>Conversion-first: destination/date/occupancy search, filters, ranked results, prices, cancellation/payment terms, instant confirmation.</p></div>
        <div class="messaging-row" data-reveal><strong>Area<br>Airbnb<br>Booking.com</strong><p><strong>Loyalty positioning</strong><br>No traditional points-style loyalty program. Loyalty is implicit through account history, reviews, wishlists, host/guest reputation, Guest Favorites, and Superhost trust badges.<br>Explicit loyalty program: Genius. Free to join, lifetime levels, 10-20% discounts, rental car discounts, free breakfast/upgrades on select stays, priority support at Level 3.</p></div>
        <div class="messaging-row" data-reveal><strong>Area<br>Airbnb<br>Booking.com</strong><p><strong>Primary CTAs</strong><br>“Search,” “Log in or sign up,” “Become a host.”<br>“Search,” “Register,” “Sign in,” “Sign up - it’s free” for Genius, “List your property.”</p></div>
      </div>

      <h3 data-reveal>Trust Strategy</h3>
      <p data-reveal>Airbnb’s trust story is <strong>community and protection.</strong> It says it wants to build “the world’s most trusted community,” using secure messaging, reviews, AirCover, ID verification, and reservation screening. AirCover for guests promises help with serious stay issues, rebooking, or full/partial refunds, plus a 24-hour safety line. Airbnb also reports over 250M nights booked at Guest Favorite listings and 460M+ reviews.</p>
      <p data-reveal>Booking.com’s trust story is <strong>scale and verification.</strong> Its official pages emphasize 28M+ reported accommodation listings, 43 languages, 24/7 support, instant confirmation, no reservation fees, and verified reviews from real guests. It says the only way to leave a review is to first make a booking.</p>

      <h3 data-reveal>CTA Difference</h3>
      <p data-reveal>Airbnb’s CTAs support two marketplace sides: <strong>book something distinctive</strong> or <strong>become a host.</strong></p>
      <p data-reveal>Booking.com’s CTAs are more transactional: <strong>search, compare, book now, and sign in/register to unlock Genius discounts.</strong></p>

      <h3 data-reveal>Bottom Line</h3>
      <p data-reveal>Airbnb sells <strong>belonging, uniqueness, and hosted travel confidence.</strong></p>
      <p data-reveal>Booking.com sells <strong>selection, deal-finding, flexibility, and fast booking certainty.</strong> Its Genius program gives it a much clearer loyalty hook than Airbnb.</p>
      </div>
    `,
  },
  {
    prompt: "Search Amazon reviews and Reddit discussions for standing desk from the last 12 months. Summarize recurring complaints, feature requests, purchase triggers, price concerns, and unmet product opportunities.",
    answer: `
      <div class="terminal-answer terminal-answer-standing-desk">
      <p data-reveal>I searched recent Reddit discussions and Amazon-facing review/indexed results from the last 12 months. Direct Amazon review scraping was not available through the current executable catalog, so this is based on indexed Amazon review excerpts, review roundups, and Reddit discussions, not a full Amazon review-count analysis.</p>

      <h3 data-reveal>Recurring Complaints</h3>
      <div class="compare-table wide-compare-table">
        <div class="compare-header" data-reveal><strong>Theme</strong><strong>What buyers complain about</strong></div>
        <div class="compare-row" data-reveal><strong>Wobble at standing height</strong><p>The dominant complaint. Two-leg desks, budget frames, and tall users report monitor shake, typing vibration, and instability at max height.</p></div>
        <div class="compare-row" data-reveal><strong>Cheap desktops</strong><p>Budget Amazon desks often use thin laminate, split tops, or surfaces that chip, fingerprint, flex, or feel hollow. Split desktops are especially disliked when monitor arms clamp across seams.</p></div>
        <div class="compare-row" data-reveal><strong>Weak/slow/noisy motors</strong><p>Single-motor desks are criticized for slower movement, lower weight capacity, more noise, and less confidence with heavy monitors/PCs.</p></div>
        <div class="compare-row" data-reveal><strong>Assembly problems</strong><p>Missing instructions, mismatched manuals, mislabeled screws, misaligned holes, and long setup times show up repeatedly.</p></div>
        <div class="compare-row" data-reveal><strong>Cable management is weak</strong><p>Users complain about dangling wires, shallow trays, adhesive clips that fail, short motor cables, and trays conflicting with monitor-arm clamps.</p></div>
        <div class="compare-row" data-reveal><strong>Damage in shipping</strong><p>Heavy boxes, chipped corners, scratched tops, and dented parts remain common review complaints.</p></div>
        <div class="compare-row" data-reveal><strong>Warranty/service uncertainty</strong><p>Reddit buyers worry less about headline specs and more about whether replacement parts are easy to get after a motor/control box fails.</p></div>
      </div>

      <h3 data-reveal>Feature Requests</h3>
      <div class="compare-table wide-compare-table">
        <div class="compare-header" data-reveal><strong>Requested feature</strong><strong>Why users want it</strong></div>
        <div class="compare-row" data-reveal><strong>Better stability at full height</strong><p>Buyers want desks that remain stable with dual monitors, monitor arms, laptops, speakers, and occasional leaning.</p></div>
        <div class="compare-row" data-reveal><strong>Dual motors as default</strong><p>Many users now treat dual motors as the minimum for serious setups.</p></div>
        <div class="compare-row" data-reveal><strong>Four-leg or crossbar options</strong><p>Especially for tall users, heavy setups, artists, gamers, and people using walking pads.</p></div>
        <div class="compare-row" data-reveal><strong>Real cable management</strong><p>Integrated tray, power strip space, cable chain/snake, pass-through grommets, and monitor-arm-compatible routing.</p></div>
        <div class="compare-row" data-reveal><strong>Higher-quality tops</strong><p>Solid wood, bamboo, butcher block, thicker laminate, and one-piece tops instead of cheap split boards.</p></div>
        <div class="compare-row" data-reveal><strong>Wider height range</strong><p>Shorter users want desks that go lower than many budget frames; taller users want less wobble at upper range.</p></div>
        <div class="compare-row" data-reveal><strong>Easier assembly</strong><p>Clearer instructions, pre-drilled holes, labeled hardware, fewer steps, and better packaging.</p></div>
        <div class="compare-row" data-reveal><strong>Better controller</strong><p>Memory presets, child lock, collision detection, quiet operation, and reliable calibration/reset behavior.</p></div>
      </div>

      <h3 data-reveal>Purchase Triggers</h3>
      <div class="compare-table wide-compare-table">
        <div class="compare-header" data-reveal><strong>Trigger</strong><strong>What pushes people to buy</strong></div>
        <div class="compare-row" data-reveal><strong>Work-from-home setup upgrade</strong><p>Users want a permanent home-office desk instead of a temporary table.</p></div>
        <div class="compare-row" data-reveal><strong>Back/neck/hip discomfort</strong><p>Ergonomics and posture pain are major motivators, though users often learn that standing all day is not the goal.</p></div>
        <div class="compare-row" data-reveal><strong>Heavy multi-monitor setups</strong><p>Buyers upgrade when cheap desks shake under monitor arms or gaming/workstation gear.</p></div>
        <div class="compare-row" data-reveal><strong>Walking pad use</strong><p>A growing trigger: users want a desk tall/stable enough for treadmill work.</p></div>
        <div class="compare-row" data-reveal><strong>Moving or redesigning office</strong><p>Many posts are from people building a new office and deciding whether to buy once/cry once.</p></div>
        <div class="compare-row" data-reveal><strong>DIY value</strong><p>Reddit often recommends buying a strong frame and pairing it with a better separate desktop.</p></div>
      </div>
      </div>
    `,
  },
];

const investorConversations = [
  {
    prompt: "Search Crunchbase, Google News, and Yahoo Finance for Perplexity AI funding from the last 12 months. Summarize funding rounds, reported valuation, investors, revenue signals, and major business milestones.",
    answer: `
      <div class="terminal-answer terminal-answer-funding">
      <p data-reveal>I searched Crunchbase-indexed funding coverage, Yahoo Finance, Reuters/Bloomberg-syndicated results, and recent web/news results for the last 12 months.</p>

      <h3 data-reveal>Funding Timeline</h3>
      <div class="funding-table">
        <div class="funding-header" data-reveal><strong>Date</strong><strong>Reported round</strong><strong>Reported valuation</strong><strong>Notes</strong></div>
        <div class="funding-row" data-reveal><strong>Earlier 2025 / around May-June</strong><p>~$500M round</p><p>~$14B</p><p>Reported as led by Accel; this became the base round later extended in July.</p></div>
        <div class="funding-row" data-reveal><strong>July 2025</strong><p>~$100M extension</p><p>~$18B</p><p>Bloomberg/Yahoo reported Perplexity raised $100M, extending the prior $14B round. Crunchbase News also listed it among the week’s biggest rounds.</p></div>
        <div class="funding-row" data-reveal><strong>September 2025</strong><p>~$200M</p><p>~$20B</p><p>The Information/Reuters/TechCrunch/Yahoo reported a $200M raise at a $20B valuation. Crunchbase News said Perplexity had raised about $1.5B total known funding by then.</p></div>
      </div>

      <h3 data-reveal>Reported Investors</h3>
      <p data-reveal>Recurring named backers across Crunchbase/Yahoo/recent coverage:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li><strong>Accel</strong></li>
        <li><strong>IVP</strong></li>
        <li><strong>SoftBank Vision Fund 2</strong></li>
        <li><strong>Nvidia</strong></li>
        <li><strong>NEA</strong></li>
        <li><strong>Jeff Bezos</strong></li>
        <li><strong>Databricks Ventures</strong></li>
        <li><strong>Tobias Lütke</strong></li>
        <li>Other strategic / individual investors have also been reported, but the September 2025 $200M round’s lead investor was not clearly disclosed in the indexed results.</li>
      </ul>

      <h3 data-reveal>Valuation Progression</h3>
      <div class="price-table compact-price-table">
        <div class="price-row price-header" data-reveal><strong>Period</strong><strong>Reported valuation</strong></div>
        <div class="price-row" data-reveal><p>Early 2024</p><strong>~$500M-$540M</strong></div>
        <div class="price-row" data-reveal><p>April 2024</p><strong>&gt;$1B</strong></div>
        <div class="price-row" data-reveal><p>Mid-2024</p><strong>~$3B</strong></div>
        <div class="price-row" data-reveal><p>Late 2024</p><strong>~$9B</strong></div>
        <div class="price-row" data-reveal><p>May/June 2025</p><strong>~$14B</strong></div>
        <div class="price-row" data-reveal><p>July 2025</p><strong>~$18B</strong></div>
        <div class="price-row" data-reveal><p>September 2025</p><strong>~$20B</strong></div>
      </div>
      <p data-reveal>The key pattern: Perplexity’s valuation jumped from single-digit billions in late 2024 to about <strong>$20B by September 2025</strong>, driven by AI-search growth, subscription revenue, investor appetite for Google-search challengers, and browser/agent ambitions.</p>

      <h3 data-reveal>Revenue Signals</h3>
      <div class="compare-table wide-compare-table">
        <div class="compare-header" data-reveal><strong>Signal</strong><strong>Reported figure</strong></div>
        <div class="compare-row" data-reveal><strong>ARR, mid/late 2025</strong><p>More than <strong>$150M</strong>, approaching <strong>~$200M</strong></p></div>
        <div class="compare-row" data-reveal><strong>Queries, May 2025</strong><p>~780M queries in May; CEO said ~30M queries/day and &gt;20% month-over-month growth</p></div>
        <div class="compare-row" data-reveal><strong>Users, 2025 reporting</strong><p>Around 30M users cited in FT-related coverage</p></div>
        <div class="compare-row" data-reveal><strong>2026 estimates</strong><p>Some recent analysis estimates $450M-$500M annualized revenue after agent/product expansion, but these are estimates/reporting rather than company-audited figures.</p></div>
      </div>
      </div>
    `,
  },
  {
    prompt: "Search Finnhub, Yahoo Finance, and recent web results for NVIDIA earnings from the last 90 days. Summarize revenue growth, margin trends, guidance changes, analyst reactions, and stock price movement after earnings.",
    answer: `
      <div class="terminal-answer terminal-answer-earnings">
      <p data-reveal>I found one NVIDIA earnings event inside the last 90 days: <strong>fiscal Q1 2027 results, reported May 20, 2026.</strong> February’s fiscal Q4 report is just outside the 90-day window, so I used it only as context for prior guidance.</p>

      <h3 data-reveal>Headline Results</h3>
      <div class="metric-table">
        <div class="metric-header" data-reveal><strong>Metric</strong><strong>Fiscal Q1 2027 result</strong><strong>Context</strong></div>
        <div class="metric-row" data-reveal><strong>Revenue</strong><p><strong>$81.6B</strong></p><p>Up <strong>85% YoY</strong>, above roughly <strong>$78.9B</strong> consensus</p></div>
        <div class="metric-row" data-reveal><strong>Adjusted EPS</strong><p><strong>$1.87</strong></p><p>Up about <strong>140% YoY</strong>, above roughly <strong>$1.75-$1.76</strong> consensus</p></div>
        <div class="metric-row" data-reveal><strong>Data center revenue</strong><p>About <strong>$75.2B</strong></p><p>Up about <strong>92% YoY</strong></p></div>
        <div class="metric-row" data-reveal><strong>Gross margin</strong><p>About <strong>74.9% GAAP</strong></p><p>Back near mid-70s after earlier Blackwell ramp pressure</p></div>
        <div class="metric-row" data-reveal><strong>Q2 FY2027 revenue guide</strong><p><strong>$91B ± 2%</strong></p><p>Above roughly <strong>$87.3B</strong> Street expectation</p></div>
        <div class="metric-row" data-reveal><strong>Capital return</strong><p><strong>+$80B</strong> buyback authorization; dividend raised to <strong>$0.25/share</strong></p><p>Signaled very strong cash generation</p></div>
      </div>

      <h3 data-reveal>Revenue Growth</h3>
      <p data-reveal>NVIDIA’s growth accelerated again. Total revenue rose <strong>85% YoY</strong>, compared with roughly <strong>73% YoY</strong> in the prior quarter. Data center growth was even stronger at about <strong>92% YoY</strong>, showing that AI infrastructure demand remains the core driver.</p>
      <p data-reveal>The new reporting structure also matters: NVIDIA moved away from the old segment framing and reorganized around <strong>Data Center</strong> and <strong>Edge Computing</strong>, with Data Center split into <strong>Hyperscale and AI Clouds</strong>, <strong>Industrial & Enterprise</strong>. That is meant to show NVIDIA less as a GPU vendor and more as an AI infrastructure platform.</p>

      <h3 data-reveal>Margin Trends</h3>
      <p data-reveal>Gross margin was strong at about <strong>74.9%</strong>, which suggests earlier Blackwell pressure has eased. In the February quarter, analysts were focused on margin pressure from Blackwell manufacturing costs and guidance in the low 70s. The May result and Q2 guide point back toward the mid-70s margin profile.</p>
      <p data-reveal>Main margin risks analysts still flagged:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li>memory/component costs</li>
        <li>China export restrictions</li>
        <li>customer custom silicon efforts</li>
        <li>mix shift as NVIDIA sells more full systems, networking, and CPUs</li>
      </ul>

      <h3 data-reveal>Guidance Changes</h3>
      <p data-reveal>NVIDIA guided Q2 FY2027 revenue to <strong>$91B ± 2%</strong>, ahead of Wall Street expectations near <strong>$87.3B</strong>. That implies revenue growth accelerating toward roughly the mid-90% YoY range for the July quarter.</p>
      <p data-reveal>The only disappointment: NVIDIA did not give the kind of longer-term revenue visibility some investors wanted. Wolfe Research’s Chris Caso said the market was looking beyond the July quarter toward calendar 2027 and 2028, and the lack of updated medium-term targets contributed to the muted stock reaction.</p>

      <h3 data-reveal>Analyst Reactions</h3>
      <p data-reveal>Analyst sentiment was broadly positive, but with a “great numbers, already expected” tone.</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li><strong>Benchmark’s Cody Acree</strong> raised his target to <strong>$335 from $250</strong>, arguing NVIDIA’s outperformance has become so routine that investors no longer reward it as much.</li>
        <li><strong>Wolfe Research</strong> remained constructive but noted investors wanted longer-term visibility rather than just a strong near-term guide.</li>
        <li><strong>Jefferies trading desk commentary</strong> described the post-earnings reaction as a “knife fight,” reflecting volatile expectations and debate over whether estimates for 2027-2028 could move materially higher.</li>
        <li>Barron’s noted that about <strong>93% of analysts</strong> covering NVIDIA still had Buy-equivalent ratings, with the average target around <strong>$294.</strong></li>
      </ul>

      <h3 data-reveal>Stock Price Movement After Earnings</h3>
      <p data-reveal>NVIDIA did not rally despite the beat.</p>
      </div>
    `,
  },
  {
    prompt: "Search Google News, Product Hunt, and Reddit for longevity startups from the last six months. Identify emerging companies, funding signals, user demand, recurring product categories, and market risks.",
    answer: `
      <div class="terminal-answer terminal-answer-longevity">
      <p data-reveal>I searched recent web/news results, Product Hunt, and Reddit-indexed discussions for the last six months, roughly <strong>Dec. 17, 2025-Jun. 17, 2026.</strong></p>

      <h3 data-reveal>Emerging Companies</h3>
      <div class="product-table longevity-table">
        <div class="product-header" data-reveal><strong>Company</strong><strong>Category</strong><strong>Signal</strong></div>
        <div class="product-row" data-reveal><strong>NewLimit</strong><p>Epigenetic reprogramming therapeutics</p><p>Raised <strong>$435M Series C</strong> in June 2026, led by Founders Fund, with Thrive, Greenoaks, Quiet Capital, Lilly Ventures, Kleiner Perkins and others. Reported valuation around <strong>$3.1B</strong>. Plans first human trial next year.</p></div>
        <div class="product-row" data-reveal><strong>Life Biosciences</strong><p>Partial cellular reprogramming</p><p>Raised <strong>$80M Series D</strong> in April 2026; announced first human dosing for ER-100, described as a cellular rejuvenation / partial epigenetic reprogramming therapy.</p></div>
        <div class="product-row" data-reveal><strong>Retro Biosciences</strong><p>Aging-biology therapeutics</p><p>Sam Altman-backed; recent reports say it moved deeper into human testing and had a financing close at about <strong>$1.8B pre-money valuation.</strong></p></div>
        <div class="product-row" data-reveal><strong>Function Health</strong><p>Preventive diagnostics platform</p><p>Reported <strong>$298M Series B</strong> in Q4 2025 at roughly <strong>$2.5B valuation</strong>; strong signal for consumer demand around full-body lab testing and biomarker dashboards.</p></div>
        <div class="product-row" data-reveal><strong>Blueprint</strong><p>Consumer longevity protocol</p><p>Raised <strong>$60M</strong> in Q4 2025; converts Bryan Johnson’s protocol into products, supplements, diagnostics, prescriptions, and AI coaching.</p></div>
        <div class="product-row" data-reveal><strong>GlycanAge</strong><p>Biological-age diagnostics</p><p>Raised about <strong>$8.7M</strong> in late 2025; focuses on glycan-based biological age and inflammation tracking.</p></div>
        <div class="product-row" data-reveal><strong>Loyal</strong><p>Dog lifespan drugs</p><p>Raised <strong>$100M Series C</strong> in Feb. 2026; animal longevity remains a faster regulatory wedge than human lifespan drugs.</p></div>
        <div class="product-row" data-reveal><strong>Mito Health</strong><p>Product Hunt / preventive bloodwork</p><p>Product Hunt launch emphasizes 100+ biomarkers, doctor-in-loop AI, biological age, and personalized action plans.</p></div>
        <div class="product-row" data-reveal><strong>Longist / Zest / Rosita Longevity</strong><p>Consumer apps</p><p>Product Hunt products around longevity scoring, biohacker toolkits, biological age, habit optimization, and senior health coaching.</p></div>
      </div>

      <h3 data-reveal>Funding Signals</h3>
      <p data-reveal>The strongest funding signal is that capital is concentrating in two lanes:</p>
      <div class="product-table longevity-table">
        <div class="product-header" data-reveal><strong>Lane</strong><strong>Examples</strong><strong>What it means</strong></div>
        <div class="product-row" data-reveal><strong>Deep biotech / therapeutics</strong><p>NewLimit, Life Biosciences, Retro Biosciences, Loyal</p><p>Investors are funding epigenetic reprogramming, senolytics, animal longevity, and age-related disease therapies. This is high-risk, high-capital, long-timeline biotech.</p></div>
        <div class="product-row" data-reveal><strong>Preventive health / diagnostics platforms</strong><p>Function Health, Blueprint, GlycanAge, Mito Health, TMRW, Hone Health</p><p>Consumer and concierge markets are paying for lab panels, biomarkers, biological-age tests, hormone/metabolic optimization, and AI-generated recommendations.</p></div>
      </div>
      <p data-reveal>Recent funding data suggests the category is not broadly funded evenly. A few companies, especially <strong>NewLimit, Retro Biosciences, Function Health, Life Biosciences, and Loyal</strong>, are absorbing much of the capital.</p>

      <h3 data-reveal>User Demand</h3>
      <p data-reveal>Reddit demand clusters around practical tracking rather than abstract “live forever” claims:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li>Which <strong>biological age test</strong> is most accurate?</li>
        <li>Whether <strong>TruDiagnostic, GlycanAge, Horvath clocks, DunedinPACE, GrimAge, PhenoAge</strong> are useful for tracking interventions.</li>
        <li>How to measure whether supplements, sleep, exercise, fasting, or diet changes are working.</li>
        <li>Interest in blood panels, wearable data, metabolic markers, inflammation, hormones, and cardiovascular risk.</li>
        <li>Curiosity about protocols like Blueprint, NOVOS, NMN/NR, spermidine, taurine, creatine, methylene blue, and multivitamins.</li>
      </ul>
      <p data-reveal>But skepticism is strong. Reddit users repeatedly question whether biological-age improvements are real, reproducible, clinically meaningful, or just noisy surrogate markers.</p>

      <h3 data-reveal>Recurring Product Categories</h3>
      <div class="compare-table wide-compare-table">
        <div class="compare-header" data-reveal><strong>Category</strong><strong>Product pattern</strong></div>
        <div class="compare-row" data-reveal><strong>Biological-age testing</strong><p>Epigenetic clocks, glycan age, metabolomics, organ-age scores</p></div>
        <div class="compare-row" data-reveal><strong>Preventive lab platforms</strong><p>Large blood panels, MRI/scans, AI health dashboards</p></div>
        <div class="compare-row" data-reveal><strong>Longevity coaching</strong><p>AI recommendations for sleep, nutrition, exercise, supplements</p></div>
        <div class="compare-row" data-reveal><strong>Consumer protocols</strong><p>Supplements, meal plans, skincare, fasting-mimicking diets</p></div>
        <div class="compare-row" data-reveal><strong>Therapeutics</strong><p>Epigenetic reprogramming, senolytics, mTOR, mitochondrial therapies</p></div>
        <div class="compare-row" data-reveal><strong>Animal longevity</strong><p>Dog lifespan drugs as a regulatory/commercial bridge</p></div>
        <div class="compare-row" data-reveal><strong>Senior healthspan</strong><p>Coaching for frailty prevention, mobility, chronic disease delay</p></div>
        <div class="compare-row" data-reveal><strong>Biohacker apps</strong><p>Real-time habit scoring, longevity calculators, intervention tracking</p></div>
      </div>
      </div>
    `,
  },
];

const agentBuilderConversations = [
  {
    prompt: "Search GitHub, Product Hunt, and recent web results for Model Context Protocol server from the last six months. List the most popular MCP servers, their use cases, GitHub stars, supported tools, and ideal agent workflows.",
    answer: `
      <div class="terminal-answer terminal-answer-mcp">
      <p data-reveal>I searched GitHub-indexed results, Product Hunt, and recent web rankings for MCP servers from the last six months. Star counts move quickly, so treat these as <strong>approximate June 2026 figures</strong> from indexed GitHub/ranking pages.</p>

      <h3 data-reveal>Most Popular MCP Servers</h3>
      <div class="mcp-table">
        <div class="mcp-header" data-reveal><strong>MCP server</strong><strong>Approx. GitHub stars</strong><strong>Use case</strong><strong>Supported tools / capabilities</strong><strong>Ideal agent workflow</strong></div>
        <div class="mcp-row" data-reveal><strong>modelcontextprotocol/servers</strong><p>~87K</p><p>Official/reference MCP server collection</p><p>Filesystem, Fetch, Git, Memory, Sequential Thinking, Time; archived refs for GitHub, Slack, Postgres, Puppeteer, Redis, etc.</p><p>Starter MCP setup: local files, memory, web fetch, Git inspection.</p></div>
        <div class="mcp-row" data-reveal><strong>Context7</strong><p>~57K</p><p>Version-specific library docs</p><p>Fetches current docs and examples for frameworks/packages</p><p>Coding agents that need accurate APIs instead of hallucinated docs.</p></div>
        <div class="mcp-row" data-reveal><strong>Playwright MCP</strong><p>~34K</p><p>Browser automation/testing</p><p>Navigate, click, type, inspect accessibility tree, extract page content</p><p>QA agents, frontend testing, web scraping, form automation.</p></div>
        <div class="mcp-row" data-reveal><strong>GitHub MCP Server</strong><p>~30K</p><p>GitHub automation</p><p>Repos, issues, PRs, code search, Actions, security alerts, project items</p><p>PR review, issue triage, release prep, codebase investigation.</p></div>
        <div class="mcp-row" data-reveal><strong>AWS MCP Servers</strong><p>~9K</p><p>Cloud infrastructure</p><p>AWS services/docs, account/resource operations depending on server</p><p>DevOps agents, infra debugging, cloud documentation lookup.</p></div>
        <div class="mcp-row" data-reveal><strong>Firecrawl MCP</strong><p>~6.5K</p><p>Web scraping/crawling</p><p>Crawl URLs, convert pages to markdown, structured extraction, search</p><p>Research agents, lead enrichment, docs ingestion, competitive analysis.</p></div>
        <div class="mcp-row" data-reveal><strong>Atlassian MCP</strong><p>~5.4K</p><p>Jira + Confluence</p><p>Jira issues, JQL, Confluence pages, project docs</p><p>Product/engineering agents that connect tickets to docs.</p></div>
        <div class="mcp-row" data-reveal><strong>Exa MCP</strong><p>~4.6K</p><p>AI-native search</p><p>Web search, semantic retrieval, clean result extraction</p><p>Research agents needing high-quality source discovery.</p></div>
        <div class="mcp-row" data-reveal><strong>Notion MCP</strong><p>~4.4K</p><p>Workspace knowledge</p><p>Read/search/update pages and databases</p><p>Internal knowledge-base agents, meeting notes, project tracking.</p></div>
        <div class="mcp-row" data-reveal><strong>Cloudflare MCP</strong><p>~3.9K</p><p>Edge/cloud ops</p><p>Workers, DNS, KV, R2, D1, account resources</p><p>Infra agents that deploy/debug edge apps from chat.</p></div>
        <div class="mcp-row" data-reveal><strong>Browserbase MCP</strong><p>~3.4K</p><p>Cloud browser automation</p><p>Run managed browsers, navigate, scrape, automate web sessions</p><p>Scalable browser agents without local Chrome management.</p></div>
        <div class="mcp-row" data-reveal><strong>Grafana MCP</strong><p>~3.1K</p><p>Observability</p><p>Query dashboards, Prometheus metrics, Loki logs</p><p>Production debugging, incident response, SRE agents.</p></div>
        <div class="mcp-row" data-reveal><strong>Supabase MCP</strong><p>~2.7K</p><p>Backend/database ops</p><p>Postgres, SQL, schemas, auth, storage, edge functions</p><p>Full-stack agents that inspect DB state and modify backend resources.</p></div>
        <div class="mcp-row" data-reveal><strong>Stripe Agent Toolkit / MCP</strong><p>~1.6K</p><p>Payments</p><p>Customers, invoices, subscriptions, products, refunds</p><p>Revenue/support agents that answer billing questions or perform payment ops.</p></div>
        <div class="mcp-row" data-reveal><strong>Apify Actors MCP</strong><p>~1.3K</p><p>Web automation marketplace</p><p>Run prebuilt Apify actors for scraping/automation</p><p>Agents that need many ready-made scraping workflows.</p></div>
        <div class="mcp-row" data-reveal><strong>Sentry MCP</strong><p>~700+</p><p>Error monitoring</p><p>Issues, traces, releases, performance data, root-cause context</p><p>Debugging agents that connect stack traces to code changes.</p></div>
      </div>
      </div>
    `,
  },
  {
    prompt: "Find the best way to extract structured product data from https://www.g2.com/categories/project-management for an AI agent workflow. Compare available scraping approaches, expected fields, rate limits, and reliability concerns.",
    answer: `
      <div class="terminal-answer terminal-answer-g2-scraping">
      <h3 data-reveal>Best Recommendation</h3>
      <p data-reveal>For an AI agent workflow, the best path is:</p>
      <ol class="terminal-number-list" data-reveal>
        <li><strong>Use G2’s official API / G2 MCP Server</strong> if you have access.</li>
        <li>If not, use a <strong>managed scraper provider</strong> like Apify/Web Scraper Cloud for category snapshots.</li>
        <li>Use direct browser scraping only as a fallback for small, infrequent research runs.</li>
      </ol>
      <p data-reveal>Do not build a high-volume direct scraper as the default. G2 pages are protected, dynamic, and likely to break or block automated traffic.</p>

      <h3 data-reveal>Why Official G2 API / MCP Is Best</h3>
      <p data-reveal>G2 now documents both a <strong>G2 API</strong> and <strong>G2 MCP Server.</strong> The MCP Server exposes:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li>Buyer Intent Signals</li>
        <li>Product Reviews</li>
        <li>Product Catalog</li>
        <li>Category Taxonomy</li>
        <li>Competitive Signals</li>
        <li>Review Analytics</li>
      </ul>
      <p data-reveal>G2’s documented MCP/API rate limit is <strong>100 requests per second globally</strong>; exceeding it blocks access for <strong>60 seconds</strong> before requests can resume. Access requires a valid G2 account and appropriate subscription permissions.</p>
      <p data-reveal>Best for: <strong>production agents, sales intelligence, competitive research, structured review analysis, repeatable workflows.</strong></p>
      <p data-reveal>Sources: G2 API <code>(https://documentation.g2.com/docs/g2-api)</code>, G2 MCP Server <code>(https://documentation.g2.com/docs/g2-mcp-server)</code>, G2 API docs <code>(https://data.g2.com/api/v2/docs/index.html)</code></p>

      <h3 data-reveal>Expected Fields</h3>
      <p data-reveal>From the official/API-style route, expect structured entities like:</p>
      <div class="compare-table g2-fields-table">
        <div class="compare-header" data-reveal><strong>Entity</strong><strong>Fields</strong></div>
        <div class="compare-row" data-reveal><strong>Category</strong><p>category_id, category_name, taxonomy, product list</p></div>
        <div class="compare-row" data-reveal><strong>Product</strong><p>product_id, product_name, vendor, categories, profile URL</p></div>
        <div class="compare-row" data-reveal><strong>Ratings</strong><p>average rating, review count, feature ratings</p></div>
        <div class="compare-row" data-reveal><strong>Reviews</strong><p>review text, pros, cons, rating, date, reviewer/company metadata where licensed</p></div>
        <div class="compare-row" data-reveal><strong>Buyer intent</strong><p>company_name, domain, visit_url, visit_type, buying_stage, activity_level, country, employee range</p></div>
        <div class="compare-row" data-reveal><strong>Competitors</strong><p>related products, comparison activity, competitive signals</p></div>
      </div>

      <p data-reveal>For <code>https://www.g2.com/categories/project-management</code>, indexed G2 data showed:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li><strong>663 products</strong></li>
        <li>Average rating around <strong>4.39/5</strong></li>
        <li>Recent review volume and buyer-segment breakdown</li>
        <li>Category-level product rankings</li>
      </ul>

      <h3 data-reveal>Scraping Approach Comparison</h3>
      <div class="scrape-table">
        <div class="scrape-header" data-reveal><strong>Approach</strong><strong>Best use</strong><strong>Expected fields</strong><strong>Rate / scale</strong><strong>Reliability</strong></div>
        <div class="scrape-row" data-reveal><strong>G2 API / G2 MCP</strong><p>Production agent workflow</p><p>Product catalog, category taxonomy, reviews, ratings, buyer intent, competitors</p><p>Documented 100 req/sec, 60-sec block if exceeded</p><p>Highest reliability; requires subscription/access</p></div>
        <div class="scrape-row" data-reveal><strong>Apify G2 scraper</strong><p>Market snapshots without building infra</p><p>Product name, URL, logo, vendor, rating, review count, price, description, pros/cons, segments, category</p><p>G2 shows ~15 listings/page; Apify actors support maxItems configs, e.g. 25 to 50K depending actor</p><p>Good, but dependent on third-party actor maintenance and G2 layout changes</p></div>
        <div class="scrape-row" data-reveal><strong>Web Scraper Cloud / Chrome extension</strong><p>No-code periodic extraction</p><p>listing_url, company_name, rating, review_count, category, website, founded year, industries, segment</p><p>Cloud-run dependent; page-by-page pagination</p><p>Medium; selectors can break</p></div>
        <div class="scrape-row" data-reveal><strong>Custom Playwright scraper</strong><p>Small internal research, custom fields</p><p>Anything visible on cards/detail pages</p><p>Keep slow: low concurrency, cache, backoff</p><p>Fragile; anti-bot/WAF risk</p></div>
        <div class="scrape-row" data-reveal><strong>Search-index extraction</strong><p>Lightweight discovery</p><p>product names, snippets, public metadata</p><p>Search API limits</p><p>Incomplete; not suitable for full category data</p></div>
      </div>
      </div>
    `,
  },
  {
    prompt: "Design an agent workflow that monitors electric vehicle battery startups using Google News, Crunchbase, Reddit, and company websites. Specify the data sources, update frequency, ranking logic, and final report structure.",
    answer: `
      <div class="terminal-answer terminal-answer-ev-battery">
      <h3 data-reveal>1. Current Signals Found</h3>
      <p data-reveal>In the past few months, EV battery startup signals have clustered around these categories:</p>
      <div class="product-table ev-signal-table">
        <div class="product-header" data-reveal><strong>Company / org</strong><strong>Category</strong><strong>Recent signal</strong></div>
        <div class="product-row" data-reveal><strong>cylib</strong><p>Battery recycling / sodium-ion recycling</p><p>Joined 25-partner German SIB:DE consortium to develop industrial sodium-ion battery recycling; claims 60,000 metric tons/year facility capacity and &gt;90% recovery efficiency for Li-ion materials.</p></div>
        <div class="product-row" data-reveal><strong>Emerald Battery Labs</strong><p>Sodium-ion</p><p>Raised just under <strong>$1.1M pre-seed</strong> for sodium-ion battery technology.</p></div>
        <div class="product-row" data-reveal><strong>QuantumScape</strong><p>Solid-state lithium-metal</p><p>Company site and recent coverage emphasize Eagle Line pilot production, anode-less solid-state design, Volkswagen/PowerCo licensing model.</p></div>
        <div class="product-row" data-reveal><strong>Factorial Energy</strong><p>Solid-state</p><p>Coverage highlights Mercedes/Stellantis validation, 375 Wh/kg FEST cells, 18-minute charging, and demonstration fleet plans.</p></div>
        <div class="product-row" data-reveal><strong>Solid Power</strong><p>Solid-state electrolyte / cell design</p><p>Recent analysis highlights Samsung SDI/BMW partnership, revenue signals, and liquidity after financing.</p></div>
        <div class="product-row" data-reveal><strong>Sila</strong><p>Silicon anode</p><p>Company site positions it as advanced silicon-anode material supplier for higher energy-density EV batteries.</p></div>
        <div class="product-row" data-reveal><strong>Group14</strong><p>Silicon-carbon anode</p><p>Mentioned as silicon-carbon composite material supplier with global manufacturing footprint.</p></div>
        <div class="product-row" data-reveal><strong>Redwood Materials / Ascend Elements</strong><p>Battery recycling</p><p>Still dominant in battery recycling funding/scale discussions, though most major raises were earlier than this six-month window.</p></div>
        <div class="product-row" data-reveal><strong>24M / Ampcera / Zeta Energy</strong><p>Advanced chemistries / DOE-linked R&D</p><p>Mentioned in advanced battery grants and fast-charging / sodium / solid-state related research contexts.</p></div>
      </div>

      <h3 data-reveal>2. Reddit Demand / Skepticism Signals</h3>
      <p data-reveal>Reddit results were more about market perception than company-specific tracking.</p>
      <p data-reveal>Recurring discussion themes:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li>Sodium-ion is seen as promising for <strong>stationary storage / cheaper vehicles</strong>, but users question EV energy density.</li>
        <li>Solid-state is seen as promising but repeatedly treated as <strong>“always a few years away.”</strong></li>
        <li>Users care about real-world metrics: cycle life, cold-weather performance, fast charging, degradation, safety, and pack cost.</li>
        <li>Battery recycling is viewed as technically possible, but Reddit users question whether end-of-life pack volume is high enough yet for near-term economics.</li>
        <li>CATL/BYD/Toyota news dominates user attention more than small startups.</li>
      </ul>

      <h3 data-reveal>3. Recommended Agent Workflow</h3>
      <p data-reveal>Use a six-agent pipeline.</p>
      <div class="compare-table agent-workflow-table">
        <div class="compare-header" data-reveal><strong>Agent</strong><strong>Job</strong></div>
        <div class="compare-row" data-reveal><strong>News Scout</strong><p>Daily scan of Google News / web for funding, partnerships, plants, pilot lines, DOE grants, OEM validation.</p></div>
        <div class="compare-row" data-reveal><strong>Crunchbase Analyst</strong><p>Weekly check for new funding rounds, investors, total funding, valuation, acquisition status.</p></div>
        <div class="compare-row" data-reveal><strong>Reddit Sentiment Analyst</strong><p>2-3x/week scan of r/electricvehicles, r/Batteries, r/cars, r/teslamotors for demand and skepticism.</p></div>
        <div class="compare-row" data-reveal><strong>Company Website Watcher</strong><p>Weekly diff of company /news, /press, /technology, /careers, /investors pages.</p></div>
        <div class="compare-row" data-reveal><strong>Technical Claims Extractor</strong><p>Pulls chemistry, energy density, cycle life, charging time, production capacity, validation stage.</p></div>
        <div class="compare-row" data-reveal><strong>Ranking + Report Agent</strong><p>Scores companies, flags changes, and produces weekly/monthly reports.</p></div>
      </div>

      <h3 data-reveal>4. Data Sources</h3>
      <div class="product-table ev-source-table">
        <div class="product-header" data-reveal><strong>Source</strong><strong>Use</strong><strong>Update frequency</strong></div>
        <div class="product-row" data-reveal><strong>Google News / web news</strong><p>Funding, pilot plants, partnerships, litigation, factory delays</p><p>Daily</p></div>
        <div class="product-row" data-reveal><strong>Crunchbase</strong><p>Funding rounds, investors, acquisition/funding status</p><p>Weekly</p></div>
        <div class="product-row" data-reveal><strong>Reddit</strong><p>User pain points, skepticism, demand themes</p><p>2-3x/week</p></div>
        <div class="product-row" data-reveal><strong>Company websites</strong><p>Official milestones, product claims, hiring, facility updates</p><p>Weekly</p></div>
      </div>
      </div>
    `,
  },
];

const cryptoConversations = [
  {
    prompt: "Analyze the wallet vitalik.eth over the last 30 days. Summarize major token transfers, balance changes, counterparties, transaction patterns, and any unusual activity.",
    answer: `
      <div class="terminal-answer terminal-answer-crypto">
      <p data-reveal>Using AgentKey live on-chain data, I analyzed <span class="crypto-value">vitalik.eth</span> for May 23-Jun 22, 2026.</p>

      <h3 data-reveal>Wallet</h3>
      <p data-reveal><span class="crypto-value">vitalik.eth</span> resolves to <span class="crypto-value">0xd8da6bf26964af9d7eed9e03e53415d37aa96045</span>, labelled by Surf as Vitalik Buterin.</p>

      <h3 data-reveal>Main Finding</h3>
      <p data-reveal>The recent visible activity is overwhelmingly unsolicited inbound spam/dust activity. I did not see evidence of a major intentional token movement in the returned transfer data. The wallet is being targeted with token mints, promotional memecoins, and tiny ETH dust, which is common for famous public wallets.</p>

      <h3 data-reveal>Major Visible Transfers</h3>
      <div class="crypto-table crypto-transfer-table">
        <div class="crypto-header" data-reveal><strong>Type</strong><strong>Direction</strong><strong>Amount</strong><strong>Counterparty</strong><strong>Notes</strong></div>
        <div class="crypto-row" data-reveal><strong>ETH</strong><p>In</p><p><span class="crypto-value">0.0017913568 ETH</span>, ~$3.16</p><p><span class="crypto-value">0xb69b...47b1</span></p><p>Tiny dust transfer on Jun 17</p></div>
        <div class="crypto-row" data-reveal><strong>ETH</strong><p>In</p><p><span class="crypto-value">0.000058732 ETH</span>, ~$0.10</p><p><span class="crypto-value">0xff7e...d323</span></p><p>Tiny dust transfer on Jun 19</p></div>
        <div class="crypto-row" data-reveal><strong>ETH</strong><p>In</p><p><span class="crypto-value">100,000 wei</span></p><p><span class="crypto-value">0xca11...ca11</span></p><p>Negligible dust</p></div>
        <div class="crypto-row" data-reveal><strong>wARS</strong><p>In</p><p><span class="crypto-value">10</span> twice</p><p><span class="crypto-value">0x0f77...b7cc</span></p><p>Repeated inbound token transfer</p></div>
        <div class="crypto-row" data-reveal><strong>Unknown ERC-20s</strong><p>In</p><p>often <span class="crypto-value">10,000,000</span> tokens</p><p>zero address / token contracts</p><p>Spam mint pattern</p></div>
        <div class="crypto-row" data-reveal><strong>SLF</strong><p>In</p><p><span class="crypto-value">1,000</span></p><p><span class="crypto-value">0x62b9...1fd8</span></p><p>Likely unsolicited</p></div>
        <div class="crypto-row" data-reveal><strong>Unknown ERC-20s</strong><p>In</p><p>multi-million/billion nominal amounts</p><p>unknown senders/contracts</p><p>No reliable USD value shown</p></div>
      </div>

      <h3 data-reveal>Balance Changes</h3>
      <p data-reveal>The token balance endpoint returned <span class="crypto-value">6,771</span> token entries. The visible page is mostly spam, dust, and unsolicited airdrops, not a clean portfolio view. A few recognizable token wrappers appeared, such as Aave-style <span class="crypto-value">aDAI</span> and <span class="crypto-value">aWETH</span>, but the available data did not provide a reliable 30-day historical balance delta.</p>
      <p data-reveal>Native ETH transfer data showed only tiny inbound dust transfers in the inspected result set. Aggregate wallet balance and full native transaction history were not available because the wallet detail/history endpoint returned upstream errors or partial results.</p>

      <h3 data-reveal>Counterparties</h3>
      <p data-reveal>The most common counterparties are not exchanges or known DeFi protocols. They are mostly:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li><span class="crypto-value">0x0000000000000000000000000000000000000000</span>, indicating token mints</li>
        <li>Unknown token deployer or sender wallets</li>
        <li>Spam-token contracts</li>
        <li>Tiny ETH dust senders</li>
      </ul>
      <p data-reveal>No clear recurring legitimate counterparty stood out in the returned data.</p>

      <h3 data-reveal>Transaction Pattern</h3>
      <p data-reveal>The pattern is classic public-wallet targeting:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li>High volume of inbound ERC-20 transfers</li>
        <li>Many zero-address mints directly to <span class="crypto-value">vitalik.eth</span></li>
        <li>Large nominal token amounts with no reliable market value</li>
        <li>Very small ETH dust</li>
        <li>No meaningful outbound activity visible from the returned transfer feed</li>
      </ul>

      <h3 data-reveal>Unusual Activity</h3>
      <p data-reveal>The unusual part is the volume and variety of unsolicited tokens, not any apparent action by the wallet owner. This looks like spam/visibility farming: projects send tokens to a famous ENS address so block explorers and token trackers show association with Vitalik.</p>
      <p data-reveal>Limitations: AgentKey's Surf wallet-history endpoint was temporarily unavailable, and some paginated transfer payloads were suppressed, so I would treat this as a transfer-feed analysis rather than a full forensic audit.</p>
      </div>
    `,
  },
  {
    prompt: "Analyze ETH over the last 24 hours. Compare spot price movement, trading volume, major exchange activity, derivative signals, and social sentiment from X and crypto news.",
    answer: `
      <div class="terminal-answer terminal-answer-crypto">
      <p data-reveal>Using live AgentKey data, window approx. <span class="crypto-value">2026-06-21 05:17 UTC</span> to <span class="crypto-value">2026-06-22 05:17 UTC</span>.</p>

      <h3 data-reveal>ETH 24H Snapshot</h3>
      <div class="crypto-table crypto-snapshot-table">
        <div class="crypto-header" data-reveal><strong>Area</strong><strong>Signal</strong></div>
        <div class="crypto-row" data-reveal><strong>Spot price</strong><p>Mostly flat to slightly positive</p></div>
        <div class="crypto-row" data-reveal><strong>Binance ETH/USDT</strong><p><span class="crypto-value">1736.53</span>, <span class="crypto-value">+0.264%</span> 24h</p></div>
        <div class="crypto-row" data-reveal><strong>OKX ETH/USDT</strong><p><span class="crypto-value">1736.60</span>, <span class="crypto-value">+0.282%</span> 24h</p></div>
        <div class="crypto-row" data-reveal><strong>Bybit ETH/USDT</strong><p><span class="crypto-value">1736.55</span>, <span class="crypto-value">+0.27%</span> 24h</p></div>
        <div class="crypto-row" data-reveal><strong>Coinbase ETH/USD</strong><p><span class="crypto-value">1734.15</span></p></div>
        <div class="crypto-row" data-reveal><strong>24h range on Binance</strong><p>High <span class="crypto-value">1759.84</span>, low <span class="crypto-value">1702.00</span></p></div>
        <div class="crypto-row" data-reveal><strong>Binance 1h candle period</strong><p>Open <span class="crypto-value">1733.46</span>, close <span class="crypto-value">1736.53</span>, roughly <span class="crypto-value">+0.18%</span> over inspected candles</p></div>
        <div class="crypto-row" data-reveal><strong>Binance spot volume</strong><p><span class="crypto-value">164,170 ETH</span>, about <span class="crypto-value">$285M</span> notional</p></div>
        <div class="crypto-row" data-reveal><strong>OKX spot volume</strong><p><span class="crypto-value">464,945 ETH</span>, about <span class="crypto-value">$807M</span> notional</p></div>
        <div class="crypto-row" data-reveal><strong>Bybit spot volume</strong><p><span class="crypto-value">75,223 ETH</span>, about <span class="crypto-value">$131M</span> notional</p></div>
      </div>

      <h3 data-reveal>Spot Price Movement</h3>
      <p data-reveal>ETH traded in a fairly wide but ultimately range-bound 24h band. It dipped toward <span class="crypto-value">1702</span>, then rebounded sharply, with the strongest hourly volume appearing during the rebound candle from roughly <span class="crypto-value">1727</span> to <span class="crypto-value">1744</span>. Price then cooled back toward the mid-<span class="crypto-value">1730s</span>.</p>
      <p data-reveal>Net read: <strong>short-term chop with a late recovery, not a clean trend breakout.</strong></p>

      <h3 data-reveal>Major Exchange Activity</h3>
      <p data-reveal>Among the checked venues, OKX showed the largest spot volume by far, followed by Binance, then Bybit. Combined visible spot volume across Binance, OKX, and Bybit was roughly <span class="crypto-value">704K ETH</span>, or about <span class="crypto-value">$1.22B</span> notional near current prices.</p>
      <p data-reveal>News/search signals also pointed to continuing discussion around ETH exchange flows, including reports of exchange outflows and low exchange reserves, but those need direct exchange-reserve validation before treating them as hard flow data.</p>

      <h3 data-reveal>Derivatives Signals</h3>
      <div class="crypto-table crypto-derivatives-table">
        <div class="crypto-header" data-reveal><strong>Metric</strong><strong>Binance</strong><strong>Bybit</strong></div>
        <div class="crypto-row" data-reveal><strong>Perp funding</strong><p><span class="crypto-value">0.003822%</span> per 8h</p><p><span class="crypto-value">0.00067%</span> per 8h</p></div>
        <div class="crypto-row" data-reveal><strong>Open interest</strong><p><span class="crypto-value">2.224M ETH</span>, about <span class="crypto-value">$3.86B</span></p><p><span class="crypto-value">713K ETH</span>, about <span class="crypto-value">$1.24B</span></p></div>
        <div class="crypto-row" data-reveal><strong>Mark price</strong><p><span class="crypto-value">1735.17</span></p><p><span class="crypto-value">1735.02</span></p></div>
        <div class="crypto-row" data-reveal><strong>Index price</strong><p><span class="crypto-value">1736.12</span></p><p><span class="crypto-value">1735.98</span></p></div>
      </div>
      <p data-reveal>Funding was positive but not overheated. Binance funding rose from <span class="crypto-value">0.000757%</span> to <span class="crypto-value">0.00388%</span> across recent funding records, suggesting mild long demand but not aggressive euphoria.</p>
      <p data-reveal>Long/short ratios were elevated:</p>
      <ul class="terminal-bullet-list" data-reveal>
        <li>Binance ranged around <span class="crypto-value">2.05-2.16</span></li>
        <li>Bybit ranged around <span class="crypto-value">2.46-2.55</span></li>
      </ul>
      <p data-reveal>That means more accounts were positioned long than short, but this can be crowded if price fails to reclaim resistance.</p>

      <h3 data-reveal>Liquidations</h3>
      <p data-reveal>24h ETH liquidations across tracked venues were about <span class="crypto-value">$44.4M</span>.</p>
      <div class="crypto-table crypto-liquidations-table">
        <div class="crypto-header" data-reveal><strong>Exchange</strong><strong>Total liquidations</strong><strong>Longs</strong><strong>Shorts</strong></div>
        <div class="crypto-row" data-reveal><strong>All</strong><p><span class="crypto-value">$44.4M</span></p><p><span class="crypto-value">$21.7M</span></p><p><span class="crypto-value">$22.7M</span></p></div>
        <div class="crypto-row" data-reveal><strong>Binance</strong><p><span class="crypto-value">$18.9M</span></p><p><span class="crypto-value">$9.6M</span></p><p><span class="crypto-value">$9.3M</span></p></div>
        <div class="crypto-row" data-reveal><strong>Bybit</strong><p><span class="crypto-value">$6.8M</span></p><p><span class="crypto-value">$3.7M</span></p><p><span class="crypto-value">$3.1M</span></p></div>
        <div class="crypto-row" data-reveal><strong>Gate</strong><p><span class="crypto-value">$5.1M</span></p><p><span class="crypto-value">$2.5M</span></p><p><span class="crypto-value">$2.6M</span></p></div>
      </div>
      </div>
    `,
  },
  {
    prompt: "Research restaking protocols from the last 30 days. Identify trending projects, TVL or fund metrics, token performance, major announcements, social narratives, and key risks.",
    answer: `
      <div class="terminal-answer terminal-answer-crypto">
      <p data-reveal>Using AgentKey live data for May 23-Jun 22, 2026.</p>

      <h3 data-reveal>Trending Projects</h3>
      <div class="crypto-table crypto-project-table">
        <div class="crypto-header" data-reveal><strong>Project</strong><strong>Why It Matters Now</strong><strong>Metrics / Performance</strong></div>
        <div class="crypto-row" data-reveal><strong>EigenLayer / EigenCloud</strong><p>Still the restaking category leader; narrative shifted from restaking to "verifiable cloud," AVS, AI, offchain compute</p><p>TVL fell from ~$4.50B to ~$2.99B, about <span class="crypto-value">-34%</span>; EIGEN price rose <span class="crypto-value">+53%</span></p></div>
        <div class="crypto-row" data-reveal><strong>Ether.fi</strong><p>Largest liquid restaking / LRT-related user-facing protocol in this sample; eBTC narrative links BTC staking with restaking routes</p><p>TVL fell from ~$4.07B to ~$3.20B, about <span class="crypto-value">-21%</span>; ETHFI price fell <span class="crypto-value">-4.7%</span></p></div>
        <div class="crypto-row" data-reveal><strong>Symbiotic</strong><p>Main EigenLayer competitor; modular, asset-agnostic restaking narrative</p><p>TVL fell from ~$451M to ~$329M, about <span class="crypto-value">-27%</span>; no liquid token performance captured</p></div>
        <div class="crypto-row" data-reveal><strong>Babylon</strong><p>Bitcoin staking/restaking narrative; benefits from BTCFi attention</p><p>BABY price fell <span class="crypto-value">-8.2%</span>; recent search results mention Upbit listing-driven rally earlier in June</p></div>
        <div class="crypto-row" data-reveal><strong>Renzo / REZ</strong><p>Legacy LRT beta to restaking sector</p><p>REZ price fell <span class="crypto-value">-25.6%</span>; TVL endpoint did not return clean rows</p></div>
        <div class="crypto-row" data-reveal><strong>Puffer</strong><p>LRT plus institutional/compliance restaking narrative</p><p>PUFFER price fell <span class="crypto-value">-30.3%</span>; TVL endpoint did not return clean rows</p></div>
        <div class="crypto-row" data-reveal><strong>Pendle</strong><p>Not a restaking protocol, but key venue for trading restaking yield/points</p><p>PENDLE price fell <span class="crypto-value">-21.7%</span>; still important as restaking yield speculation infrastructure</p></div>
        <div class="crypto-row" data-reveal><strong>Karak</strong><p>Multi-asset/universal restaking competitor, but recent searchable traction was weaker</p><p>No clean TVL or price result captured in this run</p></div>
      </div>

      <h3 data-reveal>Major Announcements / Catalysts</h3>
      <p data-reveal>EigenLayer's main narrative is now <strong>EigenCloud</strong>: restaking plus verifiable cloud, AI, AVSs, and offchain compute. Recent search results also highlighted an upcoming EIGEN unlock around July 1, 2026, which traders are watching as a supply-risk event.</p>
      <p data-reveal>Babylon showed up around BTC staking/restaking and BABY token attention. Recent results referenced an Upbit listing that reportedly triggered a strong BABY rally earlier in June, although the 30-day price series still ended down overall.</p>
      <p data-reveal>Ether.fi's visible narrative is eBTC: BTC exposure routed through Babylon staking plus restaking paths involving EigenLayer, Symbiotic, and Karak. This fits the broader BTCFi trend.</p>
      <p data-reveal>Symbiotic's social narrative remains strong around modular restaking: vault-level rules, flexible collateral, external rewards, and cross-chain shared security. Recent hard news was thinner in this query than EigenLayer/Babylon.</p>

      <h3 data-reveal>Token Performance, 30D</h3>
      <div class="crypto-table crypto-performance-table">
        <div class="crypto-header" data-reveal><strong>Token</strong><strong>30D Change</strong></div>
        <div class="crypto-row" data-reveal><strong>EIGEN</strong><p><span class="crypto-value">+53.1%</span></p></div>
        <div class="crypto-row" data-reveal><strong>ETHFI</strong><p><span class="crypto-value">-4.7%</span></p></div>
        <div class="crypto-row" data-reveal><strong>BABY</strong><p><span class="crypto-value">-8.2%</span></p></div>
        <div class="crypto-row" data-reveal><strong>PENDLE</strong><p><span class="crypto-value">-21.7%</span></p></div>
        <div class="crypto-row" data-reveal><strong>REZ</strong><p><span class="crypto-value">-25.6%</span></p></div>
        <div class="crypto-row" data-reveal><strong>PUFFER</strong><p><span class="crypto-value">-30.3%</span></p></div>
      </div>
      <p data-reveal>EIGEN was the clear outlier: token price rose despite TVL contraction. That suggests the market is trading the EigenCloud/AVS/AI narrative more than near-term restaked asset growth.</p>

      <h3 data-reveal>Social Narratives</h3>
      <p data-reveal>The recurring narratives are:</p>
      <ol class="terminal-number-list" data-reveal>
        <li>Restaking is moving from "extra APR" to a market for shared security.</li>
        <li>EigenLayer is still the category benchmark, but investors are questioning real AVS revenue.</li>
        <li>Symbiotic is framed as more modular and asset-agnostic than EigenLayer.</li>
        <li>Babylon is pulling restaking into BTCFi.</li>
        <li>LRT tokens remain weak because tokenomics, unlocks, and real yield are still unresolved.</li>
        <li>Pendle remains a picks-and-shovels trade for yield/points speculation.</li>
      </ol>
      </div>
    `,
  },
];

const conversationsByAudience = [
  productManagerConversations,
  conversations,
  growthMarketerConversations,
  investorConversations,
  cryptoConversations,
  agentBuilderConversations,
];

const playToggle = document.querySelector("#play-toggle");
const timeline = document.querySelector("#timeline");
const timecode = document.querySelector("#timecode");
const agentWindow = document.querySelector(".agent-window");
const audienceTabs = Array.from(document.querySelectorAll(".audience-tab"));
const scenarioCards = Array.from(document.querySelectorAll(".scenario-card"));
const audienceTitles = audienceTabs.map((tab) => tab.querySelector(".tab-content").textContent.trim());
const contentCreatorScenarios = [
  "Discover cross-platform content trends",
  "Turn social discussions into video ideas",
  "Analyze viral content across social platforms",
];
const scenarioTitlesByAudience = [
  [
    "Identify subscription product user pain points",
    "Compare marketplace product positioning strategies",
    "Extract product opportunities from reviews",
  ],
  contentCreatorScenarios,
  [
    "Compare competitor sentiment across communities",
    "Analyze competitor positioning and messaging",
    "Discover high-performing acquisition angles",
  ],
  [
    "Track funding, valuation, and milestones",
    "Analyze earnings and market reactions",
    "Discover emerging market investment themes",
  ],
  [
    "Track wallet activity and asset flows",
    "Analyze token markets and sentiment",
    "Discover emerging crypto market narratives",
  ],
  [
    "Compare tools for agent workflows",
    "Connect web data to agents",
    "Build agents with live research data",
  ],
];

const PROMPT_DELAY = 250;
const PROMPT_WORD_SPEED = 35;
const PROMPT_HOLD = 180;
const PROMPT_TO_STATUS_GAP = 13;
const STATUS_TO_RESPONSE_GAP = 18;
const DONE_HOLD = 180;
const RESPONSE_DURATION = 2500;
const FADE_DURATION = 300;
const CYCLE_GAP = 100;
const CONNECTOR_DRAW_DURATION = 200;
const LINES_PER_SECOND = 4.5;
const statusWidths = {
  "AgentKey successfully loaded": 228,
  "AgentKey.find_tools": 155,
  "AgentKey.describe_tool": 179,
  "AgentKey.execute_tool": 171,
};

const statusSegments = statuses.map((label) => {
  const speed = 800;
  return {
    label,
    duration: ((statusWidths[label] + 144) / speed) * 1000,
  };
});

function measureAudienceTitle(text) {
  const probe = document.createElement("span");
  probe.textContent = text;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.whiteSpace = "nowrap";
  probe.style.font = getComputedStyle(audienceTitleSlot).font;
  probe.style.letterSpacing = getComputedStyle(audienceTitleSlot).letterSpacing;
  document.body.append(probe);
  const width = Math.ceil(probe.getBoundingClientRect().width);
  probe.remove();
  return width;
}

const STATUS_DURATION = statusSegments.reduce((sum, item) => sum + item.duration, 0);
const LONGEST_PROMPT_WORDS = Math.max(...conversationsByAudience.flat().map((item) => item.prompt.trim().split(/\s+/).length));
const MAX_PROMPT_DURATION = LONGEST_PROMPT_WORDS / PROMPT_WORD_SPEED * 1000;
const STATUS_START = PROMPT_DELAY + MAX_PROMPT_DURATION + PROMPT_HOLD;
const RESPONSE_START = STATUS_START + STATUS_DURATION + DONE_HOLD;
const CYCLE_DURATION = RESPONSE_START + RESPONSE_DURATION + CYCLE_GAP;
const TAB_DURATION = CYCLE_DURATION * conversations.length;
const TOTAL_DURATION = TAB_DURATION * audienceTabs.length;

let isPlaying = true;
let currentTime = 0;
let previousFrameTime = performance.now();
let renderedConversation = -1;
let renderedAudienceTitle = 0;
let renderedScenarioAudience = -1;
let titleAnimationTimer = null;
let revealLines = [];
let promptText = null;
let promptCursor = null;
let dotsRunning = false;
let connectorCacheKey = "";

audienceTitleSlot.style.width = `${measureAudienceTitle(audienceTitles[0])}px`;
let activeAudience = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function easeOut(value) {
  return 1 - Math.pow(1 - value, 3);
}

function accelerate(value) {
  return value * value * value;
}

function renderCardGlow(card, localTime, isActive) {
  if (!isActive) {
    card.style.setProperty("--edge-proximity", "0");
    return;
  }

  const glowTime = localTime % 3600;
  const progress = glowTime / 3600;
  const angle = 110 + progress * 360;
  const path = edgePosition(progress);

  card.style.setProperty("--edge-proximity", "100");
  card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  card.style.setProperty("--inner-glow-x", `${path.x.toFixed(3)}%`);
  card.style.setProperty("--inner-glow-y", `${path.y.toFixed(3)}%`);
  card.style.setProperty("--inner-glow-width", path.width);
  card.style.setProperty("--inner-glow-height", path.height);
  card.style.setProperty("--inner-depth-direction", path.depthDirection);
  card.style.setProperty("--inner-axis-direction", path.axisDirection);
}

function edgePosition(progress) {
  const width = 524;
  const height = 96;
  const perimeter = 2 * (width + height);
  let distance = (progress * perimeter + width * 0.5 + height) % perimeter;
  const overscan = 8;

  if (distance < width) {
    return {
      x: distance / width * 100,
      y: -overscan,
      width: "220px",
      height: "78px",
      depthDirection: "to bottom",
      axisDirection: "90deg",
    };
  }

  distance -= width;
  if (distance < height) {
    return {
      x: 100 + overscan,
      y: distance / height * 100,
      width: "78px",
      height: "160px",
      depthDirection: "to left",
      axisDirection: "180deg",
    };
  }

  distance -= height;
  if (distance < width) {
    return {
      x: 100 - distance / width * 100,
      y: 100 + overscan,
      width: "220px",
      height: "78px",
      depthDirection: "to top",
      axisDirection: "90deg",
    };
  }

  distance -= width;
  return {
    x: -overscan,
    y: 100 - distance / height * 100,
    width: "78px",
    height: "160px",
    depthDirection: "to right",
    axisDirection: "180deg",
  };
}

function getConversation(audienceIndex, scenarioIndex) {
  return conversationsByAudience[audienceIndex]?.[scenarioIndex] || conversations[scenarioIndex];
}

function prepareConversation(audienceIndex, index) {
  renderedConversation = `${audienceIndex}:${index}`;
  prompt.innerHTML = `<span class="prompt-typed"></span><span class="prompt-cursor" aria-hidden="true"></span>`;
  promptText = prompt.querySelector(".prompt-typed");
  promptCursor = prompt.querySelector(".prompt-cursor");
  response.innerHTML = getConversation(audienceIndex, index).answer;
  revealLines = Array.from(response.querySelectorAll("[data-reveal]"));
}

function getFindToolsIcons(index, audienceIndex) {
  if (audienceIndex === 2 && index === 0) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon"><img src="assets/reddit.png" alt=""></span>
        <span class="tool-icon tool-x"><img src="assets/x.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 0 && index === 0) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-reddit"><img src="assets/reddit.png" alt=""></span>
        <span class="tool-icon tool-x"><img src="assets/x.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 0 && index === 1) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
        <span class="tool-icon tool-provider tool-firecrawl"><img src="logos/scrape/firecrawl.png" alt=""></span>
        <span class="tool-icon tool-provider tool-perplexity"><img src="logos/search/perplexity.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 0 && index === 2) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-amazon"><img src="assets/ecommerce-icons/amazon.png" alt=""></span>
        <span class="tool-icon tool-reddit"><img src="assets/reddit.png" alt=""></span>
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 3 && index === 0) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-crunchbase"><img src="assets/business-icons/crunchbase-apple-touch.png" alt=""></span>
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
        <span class="tool-icon tool-yahoo"><img src="assets/finance-icons/yahoo-finance.jpg" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 3 && index === 1) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-finnhub"><img src="assets/finance-icons/finnhub.png" alt=""></span>
        <span class="tool-icon tool-yahoo"><img src="assets/finance-icons/yahoo-finance.jpg" alt=""></span>
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 3 && index === 2) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
        <span class="tool-icon tool-producthunt">P</span>
        <span class="tool-icon tool-reddit"><img src="assets/reddit.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 4 && index === 0) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-naming"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M4 12H20M12 4C14 6 15 8.7 15 12C15 15.3 14 18 12 20M12 4C10 6 9 8.7 9 12C9 15.3 10 18 12 20"></path></svg></span>
        <span class="tool-icon tool-wallet"><svg viewBox="0 0 24 24"><path d="M5 8.5H19C20.1 8.5 21 9.4 21 10.5V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7C3 5.9 3.9 5 5 5H17"></path><path d="M17 13.5H21"></path><circle cx="17" cy="13.5" r="1"></circle></svg></span>
        <span class="tool-icon tool-token"><svg viewBox="0 0 24 24"><path d="M12 3.5L19.4 7.8V16.2L12 20.5L4.6 16.2V7.8L12 3.5Z"></path><circle cx="12" cy="12" r="3"></circle></svg></span>
      </span>
    `;
  }

  if (audienceIndex === 4 && index === 1) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-market"><svg viewBox="0 0 24 24"><path d="M5 19V10M12 19V5M19 19V13"></path><path d="M3.5 19H20.5"></path></svg></span>
        <span class="tool-icon tool-cex"><svg viewBox="0 0 24 24"><path d="M7 4V20M17 4V20"></path><rect x="4.5" y="8" width="5" height="7" rx="1.5"></rect><rect x="14.5" y="6" width="5" height="10" rx="1.5"></rect></svg></span>
        <span class="tool-icon tool-social"><svg viewBox="0 0 24 24"><path d="M5 17V13M10 17V8M15 17V11M20 17V6"></path><path d="M4 19H21"></path></svg></span>
        <span class="tool-icon tool-news"><svg viewBox="0 0 24 24"><path d="M6 4H15L19 8V20H6V4Z"></path><path d="M15 4V8H19M9 12H16M9 16H15"></path></svg></span>
      </span>
    `;
  }

  if (audienceIndex === 4 && index === 2) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-funds"><svg viewBox="0 0 24 24"><path d="M4 8H11L13 10H20V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V8Z"></path><path d="M7 14H17"></path></svg></span>
        <span class="tool-icon tool-market"><svg viewBox="0 0 24 24"><path d="M5 19V10M12 19V5M19 19V13"></path><path d="M3.5 19H20.5"></path></svg></span>
        <span class="tool-icon tool-news"><svg viewBox="0 0 24 24"><path d="M6 4H15L19 8V20H6V4Z"></path><path d="M15 4V8H19M9 12H16M9 16H15"></path></svg></span>
        <span class="tool-icon tool-social"><svg viewBox="0 0 24 24"><path d="M5 17V13M10 17V8M15 17V11M20 17V6"></path><path d="M4 19H21"></path></svg></span>
      </span>
    `;
  }

  if (audienceIndex === 5 && index === 0) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
        <span class="tool-icon tool-producthunt">P</span>
        <span class="tool-icon tool-exa"><img src="logos/search/exa.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 5 && index === 1) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-provider tool-firecrawl"><img src="logos/scrape/firecrawl.png" alt=""></span>
        <span class="tool-icon tool-brightdata"><img src="logos/scrape/brightdata.png" alt=""></span>
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 5 && index === 2) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
        <span class="tool-icon tool-crunchbase"><img src="assets/business-icons/crunchbase-apple-touch.png" alt=""></span>
        <span class="tool-icon tool-reddit"><img src="assets/reddit.png" alt=""></span>
        <span class="tool-icon tool-provider tool-firecrawl"><img src="logos/scrape/firecrawl.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 2 && index === 1) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-serper"><img src="logos/search/serper.png" alt=""></span>
        <span class="tool-icon tool-provider tool-firecrawl"><img src="logos/scrape/firecrawl.png" alt=""></span>
        <span class="tool-icon tool-provider tool-perplexity"><img src="logos/search/perplexity.png" alt=""></span>
      </span>
    `;
  }

  if (audienceIndex === 2 && index === 2) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-youtube">▶</span>
        <span class="tool-icon tool-reddit"><img src="assets/reddit.png" alt=""></span>
        <span class="tool-icon tool-producthunt">P</span>
        <span class="tool-icon tool-perplexity"><img src="logos/search/perplexity.png" alt=""></span>
      </span>
    `;
  }

  if (index === 1) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon"><img src="assets/reddit.png" alt=""></span>
        <span class="tool-icon tool-x"><img src="assets/x.png" alt=""></span>
        <span class="tool-icon"><img src="assets/hacker-news.svg" alt=""></span>
      </span>
    `;
  }

  if (index === 2) {
    return `
      <span class="tool-icons" aria-hidden="true">
        <span class="tool-icon tool-threads"><img src="assets/threads.png" alt=""></span>
        <span class="tool-icon tool-tiktok"><img src="assets/tiktok.png" alt=""></span>
        <span class="tool-icon"><img src="assets/bilibili.svg" alt=""></span>
        <span class="tool-icon"><img src="assets/youtube.svg" alt=""></span>
      </span>
    `;
  }

  return `
    <span class="tool-icons" aria-hidden="true">
      <span class="tool-icon tool-tiktok"><img src="assets/tiktok.png" alt=""></span>
      <span class="tool-icon tool-youtube">▶</span>
      <span class="tool-icon tool-instagram"><img src="assets/instagram.svg" alt=""></span>
      <span class="tool-icon tool-x"><img src="assets/x.png" alt=""></span>
    </span>
  `;
}

function createStatusRow(label, index, audienceIndex, active = false, iconProgress = 1) {
  const row = document.createElement("div");
  row.className = `status-row${active ? " active" : " completed"}`;
  row.innerHTML = `<span class="status-branch" aria-hidden="true"></span><span class="status-label">${label}</span>${label === "AgentKey.find_tools" ? getFindToolsIcons(index, audienceIndex) : ""}<span class="status-chevron" aria-hidden="true"></span>`;

  if (label === "AgentKey.find_tools") {
    const icons = row.querySelectorAll(".tool-icon");
    icons.forEach((icon, index) => {
      const reveal = clamp((iconProgress - index * 0.2) / 0.16, 0, 1);
      icon.style.opacity = reveal;
      icon.style.transform = `scale(${0.72 + reveal * 0.28})`;
    });
    const chevron = row.querySelector(".status-chevron");
    const lastIconReveal = clamp((iconProgress - (icons.length - 1) * 0.2) / 0.16, 0, 1);
    chevron.style.opacity = lastIconReveal >= 1 ? "1" : "0";
  } else {
    row.querySelector(".status-chevron").style.opacity = "1";
  }

  if (active) {
    const sweep = document.createElement("span");
    sweep.className = "status-sweep";
    row.append(sweep);
  }

  return row;
}

function renderStatus(time, index, audienceIndex, statusStart) {
  let cursor = statusStart;
  let activeIndex = -1;
  let activeProgress = 0;
  let activeSegmentProgress = 0;

  for (let segmentIndex = 0; segmentIndex < statusSegments.length; segmentIndex += 1) {
    const segment = statusSegments[segmentIndex];
    const end = cursor + segment.duration;
    if (time >= cursor && time < end) {
      activeIndex = segmentIndex;
      activeSegmentProgress = (time - cursor) / segment.duration;
      activeProgress = activeSegmentProgress;
      break;
    }
    cursor = end;
  }

  status.className = "status status-stack";
  status.textContent = "";
  if (time < statusStart) return;

  const completedCount = activeIndex >= 0 ? activeIndex : statusSegments.length;
  for (let rowIndex = 0; rowIndex < completedCount; rowIndex += 1) {
    status.append(createStatusRow(statusSegments[rowIndex].label, index, audienceIndex));
  }

  if (activeIndex >= 0) {
    const activeRow = createStatusRow(
      statusSegments[activeIndex].label,
      index,
      audienceIndex,
      true,
      activeIndex === 1 ? clamp(activeSegmentProgress, 0, 1) : 1,
    );
    activeRow.querySelector(".status-sweep").style.left = `calc(${activeProgress * 100}% - 36px)`;
    status.append(activeRow);
  }

  if (time >= statusStart + STATUS_DURATION) {
    status.append(createStatusRow("Done", index, audienceIndex));
  }
}

function resetStatusBeforeRender() {
  if (!status.classList.contains("status-stack")) {
    status.className = "status";
    status.textContent = "";
  }
}

function renderAudienceTitle(nextIndex) {
  if (renderedAudienceTitle === nextIndex) return;

  if (titleAnimationTimer) {
    clearTimeout(titleAnimationTimer);
    titleAnimationTimer = null;
  }

  Array.from(audienceTitleSlot.children).forEach((child) => {
    if (!child.classList.contains("active")) child.remove();
  });

  const current = audienceTitleSlot.querySelector("span.active") || audienceTitleSlot.querySelector("span");
  if (current) current.className = "active";

  const next = document.createElement("span");
  next.textContent = audienceTitles[nextIndex];
  next.className = "entering";
  audienceTitleSlot.append(next);
  audienceTitleSlot.style.width = `${measureAudienceTitle(audienceTitles[nextIndex])}px`;

  requestAnimationFrame(() => {
    if (current) {
      current.classList.remove("active", "entering");
      current.classList.add("leaving");
    }
    next.classList.remove("entering");
    next.classList.add("active");
  });

  titleAnimationTimer = setTimeout(() => {
    if (!next.isConnected || !next.classList.contains("active")) return;
    audienceTitleSlot.replaceChildren(next);
    titleAnimationTimer = null;
  }, 420);

  renderedAudienceTitle = nextIndex;
}

function renderScenarioTitles(audienceIndex) {
  if (renderedScenarioAudience === audienceIndex) return;

  const titles = scenarioTitlesByAudience[audienceIndex] || contentCreatorScenarios;
  scenarioCards.forEach((card, index) => {
    const title = card.querySelector("strong");
    title.textContent = titles[index] || contentCreatorScenarios[index];
  });
  renderedScenarioAudience = audienceIndex;
}

function renderPromptTyping(localTime, audienceIndex, index) {
  const text = getConversation(audienceIndex, index).prompt;
  const words = text.trim().split(/\s+/);
  const elapsed = Math.max(0, localTime - PROMPT_DELAY);
  const typedCount = Math.min(words.length, Math.floor(elapsed / 1000 * PROMPT_WORD_SPEED));
  const showPrompt = elapsed > 0;

  promptText.textContent = words.slice(0, typedCount).join(" ");
  prompt.classList.toggle("typing-complete", typedCount >= words.length);

  const promptProgress = clamp(elapsed / 120, 0, 1);
  const promptEased = easeOut(promptProgress);
  prompt.style.opacity = showPrompt ? "1" : "0";
  prompt.style.transform = `translateY(${4 * (1 - promptEased)}px)`;
  promptArrow.style.opacity = showPrompt ? "1" : "0";
  promptArrow.style.transform = `translateY(${4 * (1 - promptEased)}px)`;
}

function updateCliLayout() {
  const promptBottom = prompt.offsetTop + prompt.offsetHeight;
  output.style.top = `${promptBottom + PROMPT_TO_STATUS_GAP}px`;
  response.style.marginTop = `${STATUS_TO_RESPONSE_GAP}px`;

  const responseTop = response.offsetTop;
  agentDot.style.top = `${responseTop + 6}px`;
}

function getPromptDuration(audienceIndex, index) {
  return getConversation(audienceIndex, index).prompt.trim().split(/\s+/).length / PROMPT_WORD_SPEED * 1000;
}

function getStatusStart(audienceIndex, index) {
  return PROMPT_DELAY + getPromptDuration(audienceIndex, index) + PROMPT_HOLD;
}

function getResponseStart(audienceIndex, index) {
  return getStatusStart(audienceIndex, index) + STATUS_DURATION + DONE_HOLD;
}

function renderResponse(time, responseStart) {
  const elapsed = clamp(time - responseStart, 0, RESPONSE_DURATION);
  const visibleCount = time < responseStart
    ? 0
    : Math.min(revealLines.length, Math.floor(elapsed / 1000 * LINES_PER_SECOND) + 1);

  revealLines.forEach((line, index) => {
    line.classList.toggle("revealed", index < visibleCount);
  });

  if (!visibleCount) {
    conversation.style.transform = "translateY(0)";
    return;
  }

  conversation.style.transform = "translateY(0)";
  const latestLine = revealLines[visibleCount - 1];
  const conversationRect = conversation.getBoundingClientRect();
  const lineRect = latestLine.getBoundingClientRect();
  const overflow = Math.max(0, lineRect.bottom - conversationRect.top - (viewport.clientHeight - 20));
  const followProgress = easeOut(clamp(elapsed / (RESPONSE_DURATION + 1200), 0, 1));
  conversation.style.transform = `translateY(${-overflow * followProgress}px)`;
}

function renderAgentDots(localTime, statusStart, fadeStart, contentOpacity) {
  const shouldRun = localTime >= statusStart && localTime < fadeStart + FADE_DURATION;
  agentDots.style.opacity = shouldRun ? String(contentOpacity) : "0";

  if (shouldRun === dotsRunning) return;
  dotsRunning = shouldRun;
  agentDots.classList.toggle("is-running", shouldRun);
}

function renderScenarioConnector(localTime, scenarioIndex, fadeStart, contentOpacity) {
  const shouldShow = localTime < fadeStart + FADE_DURATION;
  scenarioConnector.style.opacity = shouldShow ? String(contentOpacity) : "0";

  if (!shouldShow) return;

  const containerRect = showcaseContent.getBoundingClientRect();
  const cardRect = scenarioCards[scenarioIndex].getBoundingClientRect();
  const windowRect = agentWindow.getBoundingClientRect();
  const startX = cardRect.right - containerRect.left - 1;
  const startY = cardRect.top - containerRect.top + cardRect.height / 2;
  const endX = windowRect.left - containerRect.left + 1;
  const endY = startY;
  const cacheKey = [
    scenarioIndex,
    Math.round(containerRect.width),
    Math.round(containerRect.height),
    Math.round(startX),
    Math.round(startY),
    Math.round(endX),
    Math.round(endY),
  ].join(":");

  if (cacheKey !== connectorCacheKey) {
    connectorCacheKey = cacheKey;
    connectorLine.setAttribute("d", `M ${startX.toFixed(2)} ${startY.toFixed(2)} L ${endX.toFixed(2)} ${endY.toFixed(2)}`);
    scenarioConnector.setAttribute("viewBox", `0 0 ${containerRect.width} ${containerRect.height}`);
  }

  const drawProgress = clamp(localTime / CONNECTOR_DRAW_DURATION, 0, 1);
  connectorLine.style.strokeDasharray = "1";
  connectorLine.style.strokeDashoffset = String(1 - drawProgress);
}

function renderAt(absoluteTime) {
  const wrappedTime = ((absoluteTime % TOTAL_DURATION) + TOTAL_DURATION) % TOTAL_DURATION;
  activeAudience = Math.floor(wrappedTime / TAB_DURATION);
  const tabTime = wrappedTime - activeAudience * TAB_DURATION;
  const index = Math.floor(tabTime / CYCLE_DURATION);
  const localTime = tabTime - index * CYCLE_DURATION;

  renderAudienceTitle(activeAudience);
  renderScenarioTitles(activeAudience);

  const conversationKey = `${activeAudience}:${index}`;
  if (renderedConversation !== conversationKey) prepareConversation(activeAudience, index);

  renderPromptTyping(localTime, activeAudience, index);
  updateCliLayout();

  const statusStart = getStatusStart(activeAudience, index);
  const responseStart = getResponseStart(activeAudience, index);

  resetStatusBeforeRender();
  renderStatus(localTime, index, activeAudience, statusStart);
  updateCliLayout();
  renderResponse(localTime, responseStart);
  agentDot.style.opacity = localTime >= responseStart ? "1" : "0";

  const fadeStart = responseStart + RESPONSE_DURATION - FADE_DURATION;
  const fadeProgress = clamp((localTime - fadeStart) / FADE_DURATION, 0, 1);
  const contentOpacity = 1 - accelerate(fadeProgress);
  conversation.style.opacity = contentOpacity;
  agentDot.style.opacity = localTime >= responseStart ? String(contentOpacity) : "0";
  renderAgentDots(localTime, statusStart, fadeStart, contentOpacity);
  renderScenarioConnector(localTime, index, fadeStart, contentOpacity);

  audienceTabs.forEach((tab, tabIndex) => {
    const isActive = tabIndex === activeAudience;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
    tab.style.setProperty("--tab-fill", isActive ? `${tabTime / TAB_DURATION * 100}%` : "0%");
  });

  scenarioCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === index;
    card.classList.toggle("active", isActive);
    card.classList.toggle("sweep-active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
    renderCardGlow(card, localTime, isActive);
  });

  timeline.value = String(Math.round(wrappedTime / TOTAL_DURATION * 1000));
  timecode.value = `${(wrappedTime / 1000).toFixed(2)} / ${(TOTAL_DURATION / 1000).toFixed(2)}s`;
}

function setPlaying(nextPlaying) {
  isPlaying = nextPlaying;
  playToggle.classList.toggle("paused", !isPlaying);
  playToggle.setAttribute("aria-label", isPlaying ? "Pause animation" : "Play animation");
  previousFrameTime = performance.now();
}

playToggle.addEventListener("click", () => setPlaying(!isPlaying));

timeline.addEventListener("pointerdown", () => setPlaying(false));
timeline.addEventListener("input", () => {
  currentTime = Number(timeline.value) / 1000 * TOTAL_DURATION;
  renderAt(currentTime);
});

audienceTabs.forEach((tab, tabIndex) => {
  tab.addEventListener("click", () => {
    activeAudience = tabIndex;
    currentTime = tabIndex * TAB_DURATION;
    renderedConversation = -1;
    setPlaying(true);
    renderAt(currentTime);
  });
});

scenarioCards.forEach((card, scenarioIndex) => {
  card.addEventListener("click", () => {
    currentTime = activeAudience * TAB_DURATION + scenarioIndex * CYCLE_DURATION;
    renderedConversation = -1;
    setPlaying(true);
    renderAt(currentTime);
  });
});

function tick(now) {
  if (isPlaying) {
    currentTime = (currentTime + now - previousFrameTime) % TOTAL_DURATION;
    renderAt(currentTime);
  }
  previousFrameTime = now;
  requestAnimationFrame(tick);
}

agentWindow.classList.add("timeline-controlled");
renderAt(0);
requestAnimationFrame(tick);
