const agents = [
  { id: "claude-code", name: "Claude code", description: "Anthropic's terminal agent for editing, testing, and understanding codebases.", icon: "claude.png" },
  { id: "claude-desktop", name: "Claude Desktop", description: "Anthropic's desktop app for writing, research, and everyday personal workflows.", icon: "claude.png" },
  { id: "claude-cowork", name: "Claude Cowork", description: "Anthropic's desktop AI assistant for collaborative work and shared tasks.", icon: "claude.png" },
  { id: "codex", name: "Codex", description: "OpenAI's coding agent for editing, running, and understanding software projects.", icon: "codex.png" },
  { id: "chatgpt", name: "ChatGPT", description: "OpenAI's versatile assistant for writing, coding, research, and daily tasks.", icon: "chatgpt.png" },
  { id: "windsurf", name: "Windsurf", description: "An AI development environment that helps developers build software collaboratively.", icon: "windsurf.png" },
  { id: "cursor", name: "Cursor", description: "An AI code editor built for fast, context-aware software development.", icon: "cursor.png" },
  { id: "cursor-cli", name: "Cursor CLI", description: "Cursor's command-line tool for AI-assisted coding inside terminal workflows daily.", icon: "cursor.png" },
  { id: "gemini-cli", name: "Gemini CLI", description: "Google's command-line AI assistant for coding, research, and developer workflows.", icon: "gemini.png" },
  { id: "opencode", name: "OpenCode", description: "A terminal coding agent that understands natural language project requests.", icon: "opencode.png" },
  { id: "openclaw", name: "OpenClaw", description: "A chat-based agent for coding, automation, and developer task workflows.", icon: "openclaw.png" },
  { id: "hermes", name: "Hermes", description: "A conversational AI assistant for reasoning, writing, and task support.", icon: "hermes.png" },
  { id: "antigravity", name: "Antigravity", description: "An AI workspace for planning, exploring, and completing complex tasks.", icon: "antigravity.png" },
  { id: "warp", name: "Warp", description: "A modern terminal with AI assistance for developer productivity work.", icon: "warp.png" },
  { id: "trae", name: "Trae", description: "An AI coding assistant built around chat-based development workflows productively.", icon: "trae.png" },
  { id: "kimi-cli", name: "Kimi CLI", description: "A command-line assistant for coding, search, and practical task execution.", icon: "kimi.png" },
  { id: "qwen-code", name: "Qwen Code", description: "Qwen's coding agent for building, editing, and understanding software projects.", icon: "qwen-code.png" },
  { id: "kiro-cli", name: "Kiro CLI", description: "A CLI agent for structured coding and developer task automation.", icon: "kiro.png" },
  { id: "zcode", name: "Zcode", description: "An AI coding workspace for planning, coding, reviewing, and deploying software.", icon: "zcode.webp" },
  { id: "accio", name: "Accio", description: "Alibaba's AI agent for sourcing, product research, and business workflows.", icon: "accio.webp" },
  { id: "amp", name: "Amp", description: "An AI coding agent for navigating and improving large codebases.", icon: "amp.png" },
  { id: "crush", name: "Crush", description: "A terminal-based AI assistant for quick coding and project work.", icon: "crush.png" },
  { id: "iflow-cli", name: "iFlow CLI", description: "A command-line agent for coding, workflows, and task execution efficiently.", icon: "iflow.png" },
  { id: "qoder", name: "Qoder", description: "An AI assistant for coding, reasoning, and solving developer tasks.", icon: "qoder.png" },
  { id: "workbuddy", name: "WorkBuddy", description: "An AI assistant for workplace productivity and everyday team tasks.", icon: "workbuddy.png" },
  { id: "pi", name: "Pi", description: "A conversational AI companion for personal questions and everyday support.", icon: "pi.png" }
];

const grid = document.querySelector("#agent-grid");
const search = document.querySelector("#agent-search");
const searchWrap = search.closest(".search-wrap");
const searchClear = document.querySelector("#agent-search-clear");
const count = document.querySelector("#agent-count");
const emptyState = document.querySelector("#empty-state");
const notice = document.querySelector("#notice");
const promptCopy = document.querySelector(".prompt-copy");
const agentRequest = document.querySelector(".agent-request");
const agentRequestInput = agentRequest.querySelector("input");
const agentRequestButton = agentRequest.querySelector("button");
const promptCopyAction = promptCopy.querySelector(".prompt-copy-action");
const promptCopyIconMarkup = promptCopyAction.innerHTML;
const agentModalOverlay = document.querySelector("#agent-modal");
const agentModal = document.querySelector(".agent-modal");
const agentModalScrollBody = document.querySelector(".agent-modal-scroll-body");
const agentModalScrollbar = document.querySelector(".agent-modal-scrollbar");
const agentModalScrollThumb = document.querySelector(".agent-modal-scroll-thumb");
const modalAgentName = document.querySelector("#modal-agent-name");
const modalAgentDescription = document.querySelector("#modal-agent-description");
const modalAgentLogo = document.querySelector("#modal-agent-logo");
const modalDotMatrix = document.querySelector("#agent-modal-dotmatrix");
const installTabs = [...document.querySelectorAll(".install-tab")];
const installPanel = document.querySelector("#install-panel");
const onboardingOverlay = document.querySelector("#onboarding-modal");
const onboardingModal = document.querySelector(".onboarding-modal");
const onboardingImage = document.querySelector("#onboarding-image");
const onboardingProgressSegments = [...document.querySelectorAll(".onboarding-progress span")];
const onboardingTitle = document.querySelector("#onboarding-title");
const onboardingDescription = document.querySelector("#onboarding-description");
const onboardingPrev = document.querySelector("#onboarding-prev");
const onboardingNext = document.querySelector("#onboarding-next");
let promptCopyResetTimer;
const modalCopyResetTimers = new WeakMap();
let activeAgent = agents[0];
let activeInstallTab = "marketplace";
let examplesExpanded = false;
let examplesTransition = "idle";
let activeOs = "mac";
let dotMatrixFrame = 0;
let dotMatrixStartedAt = 0;
let modalScrollHideTimer = 0;
let examplesTransitionTimer = 0;
let examplesScrollFrame = 0;
let pendingPillTransition = { installTab: null, os: null };
let onboardingStep = 0;

let noticeTimer;

const onboardingSteps = [
  {
    title: "How to install AgentKey for your agent",
    description: "We support multiple agents, each with at least two installation options.",
    image: "./assets/figma-onboarding/step-0-install-agentkey.png",
    completedSegments: 1
  },
  {
    title: "1.  Find and select your agent from the list",
    description: "Find or search for your agent in the list. If it’s not there, don’t worry—we’ll show you what to do in Step 3.",
    image: "./assets/figma-onboarding/step-1-select-agent.png",
    completedSegments: 2
  },
  {
    title: "2. Follow the installation steps in the pop-up",
    description: "Each agent includes 2–3 installation options. Choose your preferred method and follow the steps—it only takes a few minutes.",
    image: "./assets/figma-onboarding/step-2-install-popup.png",
    completedSegments: 3
  },
  {
    title: "3. Use the universal prompt if you can’t find your agent",
    description: "If your agent isn’t listed, scroll to the bottom and paste the universal installation prompt into it. You can also tell us your agent’s name to help us improve.",
    image: "./assets/figma-onboarding/step-3-universal-prompt.png",
    completedSegments: 4
  }
];

const agentColors = {
  "claude-code": "#d97757",
  "claude-desktop": "#d97757",
  "claude-cowork": "#d97757",
  codex: "#6673ff",
  chatgpt: "#111111",
  windsurf: "#111111",
  cursor: "#18181b",
  "cursor-cli": "#18181b",
  "gemini-cli": "#4285f4",
  opencode: "#111827",
  openclaw: "#c43a32",
  hermes: "#202020",
  antigravity: "#4285f4",
  warp: "#050505",
  trae: "#2fe889",
  "kimi-cli": "#202020",
  "qwen-code": "#5947c8",
  "kiro-cli": "#9040ff",
  zcode: "#050505",
  accio: "#10bff0",
  amp: "#202020",
  crush: "#7050ff",
  "iflow-cli": "#3050f0",
  qoder: "#2fdb61",
  workbuddy: "#10d0a0",
  pi: "#202020"
};

const transparentModalLogos = new Set([
  "claude.png"
]);

function updateModalScrollbar() {
  const scrollHeight = agentModalScrollBody.scrollHeight;
  const clientHeight = agentModalScrollBody.clientHeight;
  const maxScroll = Math.max(1, scrollHeight - clientHeight);
  const hasScroll = scrollHeight > clientHeight + 1;

  agentModal.classList.toggle("has-scroll", hasScroll);
  if (!hasScroll) {
    window.clearTimeout(modalScrollHideTimer);
    agentModal.classList.remove("is-scrolling");
    agentModalScrollThumb.style.height = "0px";
    agentModalScrollThumb.style.transform = "translateY(0)";
    return;
  }

  const trackHeight = agentModalScrollbar.clientHeight;
  const thumbHeight = Math.max(36, Math.round(trackHeight * clientHeight / scrollHeight));
  const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
  const thumbTop = Math.round(maxThumbTop * agentModalScrollBody.scrollTop / maxScroll);
  agentModalScrollThumb.style.height = `${thumbHeight}px`;
  agentModalScrollThumb.style.transform = `translateY(${thumbTop}px)`;
}

function syncBodyModalLock() {
  const agentOpen = agentModalOverlay && !agentModalOverlay.hidden;
  const onboardingOpen = onboardingOverlay && !onboardingOverlay.hidden;
  document.body.classList.toggle("modal-open", agentOpen || onboardingOpen);
}

function renderOnboardingStep(animate = true, direction = "next") {
  if (!onboardingOverlay) return;
  const step = onboardingSteps[onboardingStep];
  if (animate) {
    onboardingModal.classList.remove("is-step-changing-next", "is-step-changing-prev");
    onboardingModal.offsetHeight;
    onboardingModal.classList.add(direction === "prev" ? "is-step-changing-prev" : "is-step-changing-next");
  }
  onboardingTitle.textContent = step.title;
  onboardingDescription.textContent = step.description;
  onboardingImage.src = step.image;
  onboardingProgressSegments.forEach((segment, index) => {
    segment.classList.toggle("is-complete", index < step.completedSegments);
  });
  const isLastStep = onboardingStep === onboardingSteps.length - 1;
  onboardingPrev.disabled = onboardingStep === 0;
  onboardingNext.disabled = false;
  onboardingNext.classList.toggle("is-final", isLastStep);
  onboardingNext.setAttribute("aria-label", isLastStep ? "Close onboarding" : "Next step");
}

function showOnboardingModal() {
  if (!onboardingOverlay) return;
  onboardingStep = 0;
  onboardingOverlay.hidden = false;
  renderOnboardingStep(false);
  syncBodyModalLock();
}

function closeOnboardingModal() {
  if (!onboardingOverlay) return;
  onboardingOverlay.hidden = true;
  syncBodyModalLock();
}

function moveOnboardingStep(direction) {
  const nextStep = Math.min(onboardingSteps.length - 1, Math.max(0, onboardingStep + direction));
  if (nextStep === onboardingStep) return;
  onboardingStep = nextStep;
  renderOnboardingStep(true, direction < 0 ? "prev" : "next");
}

function updateSetupStepLines() {
  document.querySelectorAll(".setup-steps").forEach((steps) => {
    const badges = [...steps.querySelectorAll(".step-badge")];
    if (badges.length < 2) {
      steps.style.setProperty("--step-line-top", "0px");
      steps.style.setProperty("--step-line-bottom", "100%");
      return;
    }

    const stepsRect = steps.getBoundingClientRect();
    const firstBadge = badges[0].getBoundingClientRect();
    const lastBadge = badges[badges.length - 1].getBoundingClientRect();
    const haloGap = 6;
    const lineTop = Math.round(firstBadge.bottom - stepsRect.top + haloGap);
    const lineEnd = Math.round(lastBadge.top - stepsRect.top - haloGap);
    const lineBottom = Math.max(0, Math.round(stepsRect.height - lineEnd));

    steps.style.setProperty("--step-line-top", `${lineTop}px`);
    steps.style.setProperty("--step-line-bottom", `${lineBottom}px`);
  });
}

function syncModalLayout() {
  updateTabPills();
  updateSetupStepLines();
  updateModalScrollbar();
}

function setPillToElement(container, active) {
  const containerRect = container.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  container.style.setProperty("--pill-left", `${activeRect.left - containerRect.left}px`);
  container.style.setProperty("--pill-width", `${activeRect.width}px`);
  container.style.setProperty("--pill-height", `${activeRect.height}px`);
  container.style.setProperty("--pill-top", `${activeRect.top - containerRect.top}px`);
}

function updatePillFor(container, activeSelector) {
  if (!container) return;

  const active = container.querySelector(activeSelector);
  if (!active) return;
  setPillToElement(container, active);
}

function animatePillFrom(container, fromElement, toElement) {
  if (!container || !fromElement || !toElement) {
    updatePillFor(container, ".is-active");
    return;
  }

  container.classList.add("pill-no-transition");
  setPillToElement(container, fromElement);
  container.getBoundingClientRect();
  container.classList.remove("pill-no-transition");
  setPillToElement(container, toElement);
}

function updateTabPills() {
  const installTabsElement = document.querySelector(".install-tabs");
  if (pendingPillTransition.installTab) {
    animatePillFrom(
      installTabsElement,
      installTabsElement?.querySelector(`[data-install-tab="${pendingPillTransition.installTab}"]`),
      installTabsElement?.querySelector(".install-tab.is-active")
    );
    pendingPillTransition.installTab = null;
  } else {
    updatePillFor(installTabsElement, ".install-tab.is-active");
  }

  document.querySelectorAll(".os-toggle").forEach((toggle) => {
    if (pendingPillTransition.os) {
      animatePillFrom(
        toggle,
        toggle.querySelector(`[data-os="${pendingPillTransition.os}"]`),
        toggle.querySelector("button.is-active")
      );
      pendingPillTransition.os = null;
      return;
    }
    updatePillFor(toggle, "button.is-active");
  });
}

function revealPromptExamples() {
  const maxScroll = agentModalScrollBody.scrollHeight - agentModalScrollBody.clientHeight;

  agentModalScrollBody.scrollTo({
    top: Math.max(0, maxScroll),
    behavior: "auto"
  });
  revealModalScrollbar();
}

function pinModalScrollToBottom(duration = 260) {
  window.cancelAnimationFrame(examplesScrollFrame);
  const startedAt = performance.now();

  const tick = (timestamp) => {
    revealPromptExamples();
    if (timestamp - startedAt < duration) {
      examplesScrollFrame = window.requestAnimationFrame(tick);
      return;
    }
    examplesScrollFrame = 0;
  };

  examplesScrollFrame = window.requestAnimationFrame(tick);
}

function revealModalScrollbar() {
  if (!agentModal.classList.contains("has-scroll")) return;

  window.clearTimeout(modalScrollHideTimer);
  agentModal.classList.add("is-scrolling");
  modalScrollHideTimer = window.setTimeout(() => {
    agentModal.classList.remove("is-scrolling");
  }, 700);
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16)
  };
}

function agentColor(agent) {
  return agentColors[agent.id] || "#1f7480";
}

function drawDotMatrix(timestamp = performance.now()) {
  if (agentModalOverlay.hidden) return;

  const ctx = modalDotMatrix.getContext("2d");
  const rect = modalDotMatrix.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));

  if (modalDotMatrix.width !== width || modalDotMatrix.height !== height) {
    modalDotMatrix.width = width;
    modalDotMatrix.height = height;
  }

  ctx.clearRect(0, 0, width, height);

  const { r, g, b } = hexToRgb(agentColor(activeAgent));
  const columns = 61;
  const rows = 23;
  const stepX = width / (columns - 1);
  const stepY = height / (rows - 1);
  const centerCol = (columns - 1) / 2;
  const centerRow = (rows - 1) * 0.56;
  const maxRing = Math.sqrt(centerCol * centerCol + Math.max(centerRow, rows - 1 - centerRow) ** 2);
  const baseDot = Math.min(stepX, stepY) * 0.42;
  const t = (timestamp - dotMatrixStartedAt) / 1000;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const x = col * stepX;
      const y = row * stepY;
      const dx = Math.abs(col - centerCol);
      const dy = Math.abs(row - centerRow);
      const circularRing = Math.sqrt(dx * dx + dy * dy);
      const ringProgress = circularRing / maxRing;
      if (ringProgress > 1) continue;

      const field = Math.pow(1 - ringProgress, 1.18);
      const phase = ((circularRing - t * 7.2) % 12 + 12) % 12;
      const primaryEcho = Math.exp(-Math.pow(phase - 1.15, 2) / 1.8);
      const secondaryEcho = 0.48 * Math.exp(-Math.pow(phase - 6.25, 2) / 4.6);
      const parityShimmer = 0.9 + 0.1 * Math.sin(t * 3.1 + (Math.round(circularRing) % 2) * Math.PI);
      const echo = Math.min(1, primaryEcho + secondaryEcho) * parityShimmer;
      const alpha = Math.min(0.62, 0.035 + field * 0.1 + echo * (0.14 + field * 0.38));
      const size = baseDot * (0.78 + field * 0.18 + echo * 0.42);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  dotMatrixFrame = window.requestAnimationFrame(drawDotMatrix);
}

function startDotMatrix() {
  window.cancelAnimationFrame(dotMatrixFrame);
  dotMatrixStartedAt = performance.now();
  dotMatrixFrame = window.requestAnimationFrame(drawDotMatrix);
}

function stopDotMatrix() {
  window.cancelAnimationFrame(dotMatrixFrame);
  dotMatrixFrame = 0;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getIconMarkup(agent) {
  const style = agent.iconBg ? ` style="background:${agent.iconBg}"` : "";
  return `<span class="agent-icon"${style}><img class="agent-logo" src="./assets/source-detail/agent-card-icons/${agent.icon}" alt="" /></span>`;
}

function arrowSvg() {
  return '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.875 13.125L13.125 6.875M8.438 6.875H13.125V11.563" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function modalCopyIcon() {
  return '<img src="./assets/figma-agent-modal/copy-icon.svg" alt="" />';
}

function modalCopiedMarkup() {
  return '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11.667 3.5L5.25 9.917 2.333 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>COPIED!</span>';
}

function modalLogoSrc(agent) {
  if (agent.id.startsWith("claude")) return "./assets/figma-agent-modal/claude-logo.svg";
  return `./assets/source-detail/agent-card-icons/${agent.icon}`;
}

function renderAgents() {
  const query = search.value.trim().toLowerCase();
  const visibleAgents = agents.filter((agent) => {
    return !query || agent.name.toLowerCase().includes(query);
  });

  grid.innerHTML = visibleAgents.map((agent) => `
    <button
      class="agent-card"
      type="button"
      data-agent-id="${agent.id}"
    >
      ${getIconMarkup(agent)}
      <span class="agent-copy">
        <span class="agent-name">${escapeHtml(agent.name)}</span>
        <span class="agent-description">${escapeHtml(agent.description)}</span>
      </span>
      <span class="agent-arrow" aria-hidden="true">
        ${arrowSvg()}
      </span>
    </button>
  `).join("");

  count.textContent = `${visibleAgents.length} of ${agents.length}`;
  emptyState.hidden = visibleAgents.length !== 0;
}

function updateSearchClear() {
  searchWrap.classList.toggle("has-value", search.value.length > 0);
}

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("is-visible");
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => notice.classList.remove("is-visible"), 1800);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  if (!copied) throw new Error("Copy failed");
}

function setupPromptFor(agent, os = activeOs) {
  const installLine = `Install the AgentKey skill from ClawHub: https://clawhub.ai/chainbase/agentkey`;
  if (os === "windows") {
    return `${installLine}\nAfter installing, read the skill's metadata and help me finish setup for ${agent.name} based only on what you can verify there. Ask before making any broader changes.`;
  }
  return `${installLine}\nAfter installing, read the skill's metadata and help me finish setup based only on what you can verify there. Ask before making any broader changes.`;
}

function commandFor(agent, os = activeOs) {
  const slug = agent.id || agent.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (os === "windows") {
    return `irm https://agentkey.app/install.ps1 | iex # ${slug}`;
  }
  return `curl -fsSL https://agentkey.app/install.sh | bash ${slug}`;
}

function renderStep(number, body, { subcopy = "", expandable = false } = {}) {
  return `
    <div class="setup-step${subcopy ? " is-top" : ""}">
      <span class="step-badge">${number}</span>
      <div class="step-copy">
        ${body}
        ${subcopy ? `<div class="step-subcopy">${subcopy}</div>` : ""}
      </div>
      ${expandable ? `
        <button class="step-expand${examplesExpanded ? " is-open" : ""}" type="button" aria-label="${examplesExpanded ? "Collapse examples" : "Expand examples"}" data-expand-examples>
          <img src="./assets/figma-agent-modal/chevron-icon.svg" alt="" />
        </button>
      ` : ""}
    </div>
  `;
}

function renderPromptExamples() {
  const examples = [
    ["Social", "Use AgentKey to fetch @elonmusk's tweets from the last hour and summarize what he's been talking about."],
    ["Markets", "With AgentKey, pull the current price of BTC and ETH and tell me the 24h change for each."],
    ["Web", "Use AgentKey to search the web for today's top AI news and give me the 3 biggest stories as bullets."]
  ];
  const stateClass = examplesExpanded ? "is-expanded" : "is-collapsed";
  const transitionClass = examplesTransition === "idle" ? "" : ` is-${examplesTransition}`;

  return `
    <div class="prompt-examples-shell ${stateClass}${transitionClass}" aria-hidden="${!examplesExpanded}">
      <div class="prompt-examples">
        ${examples.map(([label, text]) => `
          <div class="prompt-example">
            <span class="prompt-label">${label}</span>
            <div class="prompt-example-row">
              <p>${escapeHtml(text)}</p>
              <button class="modal-copy-icon modal-copy-button" type="button" aria-label="Copy prompt" data-copy-label="Copy prompt" data-copy-text="${escapeHtml(text)}">
                ${modalCopyIcon()}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderOsToggle() {
  return `
    <div class="os-toggle" role="tablist" aria-label="Operating system">
      <button class="${activeOs === "mac" ? "is-active" : ""}" type="button" role="tab" aria-selected="${activeOs === "mac"}" data-os="mac">Mac</button>
      <button class="${activeOs === "windows" ? "is-active" : ""}" type="button" role="tab" aria-selected="${activeOs === "windows"}" data-os="windows">Windows</button>
    </div>
  `;
}

function renderInlineCodeCard({ title, code }) {
  return `
    <div class="inline-code-card">
      <div class="inline-code-head">
        <div class="inline-code-title">${escapeHtml(title)}</div>
        ${renderOsToggle()}
      </div>
      <div class="code-box">
        <div class="code-box-inner">
          <code>${escapeHtml(code)}</code>
          <button class="modal-copy-icon modal-copy-button" type="button" aria-label="Copy ${escapeHtml(title.toLowerCase())}" data-copy-label="Copy ${escapeHtml(title.toLowerCase())}" data-copy-text="${escapeHtml(code)}">
            ${modalCopyIcon()}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderMarketplacePanel() {
  const agentLabel = escapeHtml(activeAgent.name);
  return `
    <div class="marketplace-panel">
      <div class="marketplace-shot">
        <img src="./assets/figma-agent-modal/marketplace-screenshot.png" alt="" />
      </div>
      <div class="setup-steps">
        ${renderStep(1, `Open <strong>${agentLabel}</strong> and go to the <strong>/plugin marketplace.</strong>`)}
        ${renderStep(2, `Search <strong>“AgentKey”</strong> and click Install.`)}
        ${renderStep(3, `Sign in when prompted — your key syncs automatically, no copy-paste.`)}
        ${renderStep(4, `Activate with your first command.`, { expandable: true })}
        ${renderPromptExamples()}
      </div>
      <button class="modal-primary" type="button">
        <span>Open ${agentLabel} Marketplace</span>
        <img src="./assets/figma-agent-modal/marketplace-arrow.svg" alt="" />
      </button>
    </div>
  `;
}

function renderPromptPanel() {
  return `
    <div class="compact-panel">
      <div class="setup-steps">
        ${renderStep(1, `Open a <strong>new chat</strong> in ${escapeHtml(activeAgent.name)}.`)}
        ${renderStep(2, `Paste the setup prompt below as your first message.`, {
          subcopy: `${escapeHtml(activeAgent.name)} installs AgentKey and confirms once it's ready.`
        })}
        ${renderInlineCodeCard({ title: "Setup prompt", code: setupPromptFor(activeAgent) })}
        ${renderStep(3, `Activate with your first command.`, { expandable: true })}
        ${renderPromptExamples()}
      </div>
    </div>
  `;
}

function renderCommandPanel() {
  return `
    <div class="compact-panel">
      <div class="setup-steps">
        ${renderStep(1, `Open your <strong>terminal</strong>.`)}
        ${renderStep(2, `Paste the command below and run it.`, {
          subcopy: `AgentKey registers the MCP server and writes your key into ~/.claude/.<br />Takes ~10 seconds. Idempotent — safe to re-run if anything looks off.`
        })}
        ${renderInlineCodeCard({ title: "Command", code: commandFor(activeAgent) })}
        ${renderStep(3, `Activate with your first command.`, { expandable: true })}
        ${renderPromptExamples()}
      </div>
    </div>
  `;
}

function renderInstallPanel(transition = "panel") {
  installPanel.dataset.transition = transition;

  installTabs.forEach((tab) => {
    const isActive = tab.dataset.installTab === activeInstallTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    const icon = tab.querySelector("img");
    if (icon && tab.dataset.installTab === "marketplace") {
      icon.src = isActive
        ? "./assets/figma-agent-modal/marketplace-icon-brand.svg"
        : "./assets/figma-agent-modal/marketplace-icon-gray.svg";
    }
  });

  if (activeInstallTab === "prompt") {
    installPanel.innerHTML = renderPromptPanel();
    requestAnimationFrame(syncModalLayout);
    return;
  }

  if (activeInstallTab === "command") {
    installPanel.innerHTML = renderCommandPanel();
    requestAnimationFrame(syncModalLayout);
    return;
  }

  installPanel.innerHTML = renderMarketplacePanel();
  requestAnimationFrame(syncModalLayout);
}

function openAgentModal(agent) {
  activeAgent = agent;
  activeInstallTab = "marketplace";
  examplesExpanded = false;
  activeOs = "mac";
  modalAgentName.textContent = agent.name;
  modalAgentDescription.textContent = agent.description;
  agentModal.style.setProperty("--modal-agent-color", agentColor(agent));
  modalAgentLogo.src = modalLogoSrc(agent);
  modalAgentLogo.alt = `${agent.name} logo`;
  modalAgentLogo.closest(".agent-modal-logo-frame")?.classList.toggle(
    "has-transparent-logo",
    transparentModalLogos.has(agent.icon)
  );
  window.clearTimeout(modalScrollHideTimer);
  agentModal.classList.remove("is-scrolling");
  renderInstallPanel("none");
  agentModalOverlay.hidden = false;
  syncBodyModalLock();
  agentModalScrollBody.scrollTop = 0;
  requestAnimationFrame(syncModalLayout);
  startDotMatrix();
}

function closeAgentModal() {
  agentModalOverlay.hidden = true;
  syncBodyModalLock();
  stopDotMatrix();
  window.clearTimeout(modalScrollHideTimer);
  window.clearTimeout(examplesTransitionTimer);
  window.cancelAnimationFrame(examplesScrollFrame);
  agentModal.classList.remove("is-scrolling");
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".agent-card");
  if (!card) return;

  const selected = agents.find((agent) => agent.id === card.dataset.agentId);
  if (selected) openAgentModal(selected);
});

agentModalOverlay.addEventListener("click", async (event) => {
  if (event.target.closest("[data-modal-close]")) {
    closeAgentModal();
    return;
  }

  const tab = event.target.closest("[data-install-tab]");
  if (tab) {
    if (tab.dataset.installTab === activeInstallTab) return;
    pendingPillTransition.installTab = activeInstallTab;
    activeInstallTab = tab.dataset.installTab;
    examplesExpanded = false;
    examplesTransition = "idle";
    activeOs = "mac";
    renderInstallPanel("panel");
    return;
  }

  if (event.target.closest("[data-expand-examples]")) {
    const willExpand = !examplesExpanded;
    window.clearTimeout(examplesTransitionTimer);
    window.cancelAnimationFrame(examplesScrollFrame);
    examplesTransition = willExpand ? "opening" : "closing";
    examplesExpanded = willExpand;
    renderInstallPanel("none");
    if (willExpand) {
      requestAnimationFrame(() => {
        syncModalLayout();
        pinModalScrollToBottom();
      });
      examplesTransitionTimer = window.setTimeout(() => {
        examplesTransition = "idle";
        const shell = installPanel.querySelector(".prompt-examples-shell");
        shell?.classList.remove("is-opening");
        syncModalLayout();
      }, 260);
    } else {
      examplesTransitionTimer = window.setTimeout(() => {
        examplesTransition = "idle";
        const shell = installPanel.querySelector(".prompt-examples-shell");
        shell?.classList.remove("is-closing");
        syncModalLayout();
      }, 240);
    }
    return;
  }

  const osButton = event.target.closest("[data-os]");
  if (osButton) {
    if (osButton.dataset.os === activeOs) return;
    pendingPillTransition.os = activeOs;
    activeOs = osButton.dataset.os;
    renderInstallPanel("code");
    return;
  }

  const copyButton = event.target.closest("[data-copy-text]");
  if (copyButton) {
    try {
      await copyText(copyButton.dataset.copyText);
      window.clearTimeout(modalCopyResetTimers.get(copyButton));
      copyButton.classList.add("is-copied");
      copyButton.setAttribute("aria-label", "Copied");
      copyButton.innerHTML = modalCopiedMarkup();
      const resetTimer = window.setTimeout(() => {
        copyButton.classList.remove("is-copied");
        copyButton.innerHTML = modalCopyIcon();
        copyButton.setAttribute("aria-label", copyButton.dataset.copyLabel || "Copy");
        modalCopyResetTimers.delete(copyButton);
      }, 1200);
      modalCopyResetTimers.set(copyButton, resetTimer);
    } catch (error) {
      showNotice("Copy failed. Select the text manually.");
      console.warn("Unable to copy modal text", error);
    }
  }
});

onboardingOverlay.addEventListener("click", (event) => {
  if (event.target.closest("[data-onboarding-close]")) {
    closeOnboardingModal();
  }
});

onboardingPrev.addEventListener("click", () => moveOnboardingStep(-1));
onboardingNext.addEventListener("click", () => {
  if (onboardingStep === onboardingSteps.length - 1) {
    closeOnboardingModal();
    return;
  }
  moveOnboardingStep(1);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (onboardingOverlay && !onboardingOverlay.hidden) {
    closeOnboardingModal();
    return;
  }
  if (!agentModalOverlay.hidden) closeAgentModal();
});

agentModalScrollBody.addEventListener("scroll", () => {
  updateModalScrollbar();
  revealModalScrollbar();
}, { passive: true });
window.addEventListener("resize", syncModalLayout);

search.addEventListener("input", () => {
  renderAgents();
  updateSearchClear();
});

searchClear.addEventListener("click", () => {
  search.value = "";
  renderAgents();
  updateSearchClear();
  search.focus();
});

function updateAgentRequestButton() {
  agentRequestButton.classList.toggle("is-active", agentRequestInput.value.trim().length > 0);
}

agentRequestInput.addEventListener("input", updateAgentRequestButton);

promptCopy.addEventListener("click", async () => {
  const promptText = promptCopy.querySelector(".prompt-copy-text").textContent.trim();
  try {
    await copyText(promptText);
    window.clearTimeout(promptCopyResetTimer);
    promptCopy.classList.add("is-copied");
    promptCopy.setAttribute("aria-label", "Copied");
    promptCopyAction.innerHTML = '<svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11.667 3.5L5.25 9.917 2.333 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>COPIED!</span>';
    promptCopyResetTimer = window.setTimeout(() => {
      promptCopy.classList.remove("is-copied");
      promptCopy.setAttribute("aria-label", "Copy setup prompt");
      promptCopyAction.innerHTML = promptCopyIconMarkup;
    }, 1200);
  } catch (error) {
    showNotice("Copy failed. Select the prompt manually.");
    console.warn("Unable to copy setup prompt", error);
  }
});

agentRequest.addEventListener("submit", (event) => {
  event.preventDefault();
  showNotice("Agent request captured locally.");
});

document.querySelectorAll(".nav-item:not(.is-active), .legal-links button, .help-links button, .chat-button")
  .forEach((button) => {
    button.addEventListener("click", () => showNotice("This local v0 keeps external navigation inactive."));
  });

renderAgents();
updateSearchClear();
updateAgentRequestButton();
showOnboardingModal();
