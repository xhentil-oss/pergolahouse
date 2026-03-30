<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
## 2026-03-30 — Full site fix & completion
- Fixed FAQ: replaced `hidden` wrapper + static items with interactive accordion (`FAQItem` now has open/close state)
- Fixed BenefitsGrid: removed `opacity-[0.01]` that made the entire section invisible
- Fixed ReviewsSlider: rewrote cards (removed opacity bug), made slider properly scrollable with nav buttons
- Fixed VideoSlider: proper thumbnails, added duration badges, improved play UI
- Fixed Footer: added proper 4-col grid layout with section titles, social icons, bottom bar
- Fixed PermitCheck: built interactive Bundesland + dimensions form with instant permit result
- Fixed HeroCountdown: set target to 14 days ahead (was in the past, showing 0)
- Fixed FontFamily: added `font-inter_tight` to root App wrapper
- Added `.no-scrollbar` utility in tailwind.css for clean sliders
- Key files: FAQ/index.tsx, BenefitsGrid/index.tsx, ReviewsSlider/*, VideoSlider/*, Footer/*, PermitCheck/index.tsx, HeroCountdown.tsx, App.tsx
</changelog>
