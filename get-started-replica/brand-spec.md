# AgentKey Get Started Replica

## Reference

- Visual source: authenticated `https://console.agentkey.app/get-started`
- Captured viewport: 1243 × 768 browser window on 2026-07-30
- Scope: local, front-end-only reproduction of the visible Step 1 onboarding screen

## Brand assets

- Logo: `assets/agentkey-brand/logo.png`
- Agent card icons: copied from `../agentkey-new/integrations/local-assets/source-detail/agent-card-icons/` into `assets/source-detail/agent-card-icons/`
- Additional agent icons: `zcode.webp` from the user-provided Zcode logo file; `accio.webp` from the Accio Google Play high-resolution app icon
- Agent setup modal assets: downloaded from the latest Figma nodes into `assets/figma-agent-modal/` (`texture.png`, `claude-logo.svg`, `marketplace-icon.svg`, `marketplace-screenshot.png`, `copy-icon.svg`, `close-icon.svg`, `chevron-icon.svg`, `external-icon.svg`)
- UI font: local Geist files in `assets/agentkey-brand/fonts/`

## Design tokens

- Canvas: `#ffffff`
- Sidebar: `#fafafa`
- Primary text: `#171717`
- Secondary text: `#767676`
- Hairline: `#e6e6e6`
- Selected border: `#4a939d`
- Step accent: `#6549d7`
- Success: `#31b779`
- Primary button: `#202020`
- Base spacing: 4px
- Radius: 6px for controls, 10px for cards
- Shadow: selected card only, `0 0 0 1px rgba(31,116,128,.16)`
- Display calibration: `1.25` root zoom, matching the production console's apparent UI scale in the same Chrome window

## Safety and fidelity notes

- The account label is deliberately masked.
- No cookies, access tokens, API keys, or authenticated data are included.
- Local links are inert in this v0.
- The visible Step 1 layout is the production page source of truth.
