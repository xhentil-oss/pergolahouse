<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
# Codebase Notes — Pergolux Clone

## Architecture
- React 18 + TypeScript + Vite + Tailwind CSS
- Path alias: `@/` → `src/` (configured in vite.config.ts + tsconfig.app.json)
- Font: `Inter Tight` loaded via @font-face in tailwind.css, used as `font-inter_tight` class

## Key Patterns
- All sections live in `src/sections/<SectionName>/index.tsx` (+ `components/` subfolder)
- Shared components: `src/components/` (CookieBanner, TrustBadge)
- Slider pattern: `useRef<HTMLUListElement>` + `scrollBy()` for nav, `snap-x snap-mandatory` on `<ul>`
- Hide scrollbar on sliders: `no-scrollbar` class (defined in tailwind.css)
- Image assets: hosted at `https://c.animaapp.com/mnd7yb7cX3zmke/assets/`

## Known Issues Fixed
- BenefitsGrid, ReviewsSlider had `opacity-[0.01]` from Anima export — requires removal
- FAQ content was wrapped in `display:none` div — needed full rewrite
- HeroCountdown target date was in the past — now dynamically set to 14 days ahead
- FooterLinks didn't support titles — added optional `title` prop

## Tailwind Config
- Custom color tokens (border, input, ring, etc.) using CSS vars
- `font-inter_tight` font family key
- No Tailwind plugins installed
</coder>
