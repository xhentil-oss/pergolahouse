<instructions>
This file powers chat suggestion chips. Keep it focused and actionable.

# Be proactive
- Suggest ideas and things the user might want to add *soon*. 
- Important things the user might be overlooking (SEO, more features, bug fixes). 
- Look specifically for bugs and edge cases the user might be missing (e.g., what if no user has logged in).

# Rules
- Each task must be wrapped in a "<todo id="todo-id">" and "</todo>" tag pair.
- Inside each <todo> block:
  - First line: title (required)
  - Second line: description (optional)
- The id must be a short stable identifier for the task and must not change when you rewrite the title or description.
- You should proactively review this file after each response, even if the user did not explicitly ask, maintain it if there were meaningful changes (new requirement, task completion, reprioritization, or stale task cleanup).
- Think BIG: suggest ambitious features, UX improvements, technical enhancements, and creative possibilities.
- Balance quick wins with transformative ideas — include both incremental improvements and bold new features.
- Aim for 3-5 high-impact tasks that would genuinely excite the user.
- Tasks should be specific enough to act on, but visionary enough to inspire.
- Remove or rewrite stale tasks when completed, obsolete, or clearly lower-priority than current work.
- Re-rank by impact and user value, not just urgency.
- Draw inspiration from the project's existing features — what would make them 10x better?
- Don't be afraid to suggest features the user hasn't explicitly mentioned.
</instructions>

<todo id="add-product-pages">
Add individual product detail pages
Each product (Pergola S3, Sundream S3, Skydance S3) needs a dedicated page with full specs, configurator, and buy flow
</todo>

<todo id="interactive-configurator">
Build a Pergola configurator
Let users pick size, color, accessories (screens, glass walls, LEDs) and see a live price update — core conversion feature
</todo>

<todo id="mobile-scroll-snap-reviews">
Improve mobile reviews slider with touch swipe indicators
Add dot pagination below the reviews slider on mobile for better UX
</todo>

<todo id="seo-meta-tags">
Add proper SEO meta tags and Open Graph data
The index.html only has a generic title — add description, OG tags, and correct lang="de"
</todo>

<todo id="showroom-map-page">
Build Showroom page with interactive map
The /pages/showroom-3-0 route should show a map with showroom locations across Germany
</todo>
