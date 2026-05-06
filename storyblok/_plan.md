# Storyblok Content Model — BrightStart Tutorial

**Source:** Figma `qHNBv6MpCm5FgxoodtGC8G` (Storyblok Demo — Minimal Site)
**Target space:** `292311154382898` (EU)
**Date:** 2026-05-05
**Status:** APPROVED + REFACTORED 2026-05-06 — `cta_section`, `case_study_section`, `featured_post_section` merged into one `feature_section` (variant Option chooses layout). SEO fields moved to a dedicated SEO tab on `page` and `post`.

This proposal applies the `storyblok-content-modeling` principles: default to Nestable, snake_case names, don't duplicate built-in `title`/`slug`, restrict Blocks fields, prefer flat schemas, use References instead of deep nesting where possible.

The design has 5 pages: Homepage, About, Blog, FAQ, Contact. Two recurring shells: `Nav` and `Footer` on every page. Services and Case Studies are promoted to content types so they can be authored once and referenced across pages.

---

## 1. Atoms — small reusable nestables

| Technical name | Display | Why this shape | Fields | Used in |
|---|---|---|---|---|
| `cta_button` | CTA Button | Both Primary and Ghost CTAs share label + link; the only difference is visual. Single block with a `style` option keeps the editor surface small. | `label` (Text, required) · `link` (Multilink) · `style` (Option: `primary`, `ghost` — default `primary`) | Hero, Case Study, CTA Section, CTA Strip, Contact Form |
| `value_card` | Value Card | Photo-less, optional icon. Specific shape — keeps schemas clean. | `icon` (Text, optional — icon library name) · `title` (Text, required) · `description` (Textarea) | About → Values |
| `team_member` | Team Member | Photo-led, narrow layout. | `name` (Text, required) · `role` (Text) · `photo` (Asset) · `link` (Multilink, optional) | About → Team |
| `faq_item` | FAQ Item | Q/A pair. Answer benefits from rich-text formatting. | `question` (Text, required) · `answer` (Rich text) | FAQ list |
| `form_field` | Form Field | Configurable so editors can edit Contact form fields without code. | `label` (Text, required) · `name` (Text, required — submission key) · `type` (Option: `text`, `email`, `textarea` — default `text`) · `placeholder` (Text) · `required` (Boolean) | Contact form |
| `info_block` | Info Block | Address/phone/email line in Contact's right column. | `icon` (Text, optional) · `title` (Text, required) · `value` (Text, required) · `link` (Multilink, optional) | Contact info column |
| `nav_link` | Nav Link | Used by Header and Footer link lists. Resilient to page renames. | `label` (Text, required) · `link` (Multilink, required) | Header, Footer |

**Removed from earlier draft:** generic `card` nestable. With Services and Posts both modelled as content types, no inline-card use case remains. Easy to add later if needed.

---

## 2. Section blocks — nestables for page bodies

| Technical name | Display | Why this shape | Key fields | Used in |
|---|---|---|---|---|
| `hero_intro` | Hero Intro | Homepage hero with eyebrow, headline, subhead, paired CTAs. | `eyebrow` (Text) · `headline` (Text, required) · `subhead` (Textarea) · `ctas` (Blocks: `cta_button`, max 2) | Homepage |
| `page_header` | Page Header | One block covers both the small Blog/FAQ/Contact header and the larger About intro via a `size` option. | `eyebrow` (Text) · `title` (Text, required) · `description` (Textarea) · `size` (Option: `small`, `large` — default `small`) · `cta` (Blocks: `cta_button`, max 1) | About (large), Blog/FAQ/Contact (small) |
| `banner_image` | Banner Image | Same shape on Homepage (Hero Banner) and About (Team Banner). | `image` (Asset, required) · `alt_text` (Text) · `aspect` (Option: `wide`, `tall` — default `wide`) | Homepage, About |
| `services_grid` | Services Grid | References services so the same service can appear on multiple pages and edits propagate. | `eyebrow` (Text) · `title` (Text) · `description` (Textarea) · `services` (References: `service`, multi, min 1, max 12) | Homepage |
| `feature_section` | Feature Section | **Merged wrapper** replacing `cta_section`, `case_study_section`, `featured_post_section`. Three shape-twins collapsed into one with a variant Option. Content tab: `title`, `subtitle`, `ctas` (Blocks: `cta_button`, max 2), `reference` (single internal_stories ref filtered to `post`/`case_study`). Variants tab: `variant` (`cta` / `featured_post` / `case_study`). | See description | Homepage CTA panel + Case Study, Blog Featured Post |
| `cta_strip` | CTA Strip | Slim full-width strip. Kept separate because the layout differs structurally from feature_section's panel. | `title` (Text, required) · `cta` (Blocks: `cta_button`, max 1) | FAQ |
| `values_section` | Values Section | Heading + value-card repeater. | `title` (Text, required) · `values` (Blocks: `value_card`, min 1, max 6) | About |
| `team_section` | Team Section | Heading + team-member repeater. | `title` (Text, required) · `members` (Blocks: `team_member`, min 1, max 12) | About |
| `posts_grid` | Posts Grid | Six post previews. References to `post` keeps blog content DRY. | `title` (Text, optional) · `posts` (References: `post`, multi, min 1, max 24) | Blog |
| `faq_list` | FAQ List | Heading optional, items repeater. | `title` (Text, optional) · `items` (Blocks: `faq_item`, min 1, max 20) | FAQ |
| `contact_form` | Contact Form | Configurable form with submit label. | `title` (Text) · `fields` (Blocks: `form_field`, min 1, max 10) · `submit_label` (Text, default "Send") · `success_message` (Text) | Contact |
| `contact_info` | Contact Info | Right column on Contact: info blocks + a "prefer email?" sub-block (kept flat as fields). | `info_blocks` (Blocks: `info_block`, max 6) · `email_title` (Text) · `email_description` (Textarea) · `email_address` (Text) | Contact |

---

## 3. Content types — story-level

| Technical name | Display | Why a content type | Key fields |
|---|---|---|---|
| `page` | Page | Generic wrapper for Home, About, Blog, FAQ, Contact. Content fields stay on the implicit **General** tab; SEO fields live in a dedicated **SEO** tab. | `body` (Blocks: any section block from §2, min 0, max 50) |
| `post` | Post | Blog posts have their own semantics (excerpt, author, publish date, category). Content stays on **General**; SEO fields in a dedicated **SEO** tab. | `excerpt` (Textarea) · `featured_image` (Asset) · `content` (Rich text) · `author` (Text) · `published_at` (Date/time) · `category` (Option, sourced from `post_categories` Datasource) |
| `service` | Service | Promoted from inline cards so services can be authored once and referenced (Homepage Services Grid, plus future pages). | `eyebrow` (Text, optional) · `title` (Text, required) · `description` (Textarea) · `image` (Asset) · `link` (Multilink, optional) |
| `case_study` | Case Study | Promoted so case studies can have their own detail pages later. The Homepage section just references one. | `image` (Asset, required) · `eyebrow` (Text) · `title` (Text, required) · `summary` (Textarea) · `content` (Rich text, optional — for future detail page) · `cta` (Blocks: `cta_button`, max 1) |

Notes:
- **Don't add `title` / `slug`** — they exist as built-in story fields.
- `service` and `case_study` stories live under folders `services/` and `case-studies/` so the editor sidebar stays organized.

---

## 4. Globals / singletons — content types stored at known slugs

| Technical name | Display | Stored at | Fields |
|---|---|---|---|
| `site_header` | Site Header | `globals/header` | `logo` (Asset) · `nav_links` (Blocks: `nav_link`, max 8) · `cta` (Blocks: `cta_button`, max 1) |
| `site_footer` | Site Footer | `globals/footer` | `tagline` (Textarea) · `nav_links` (Blocks: `nav_link`, max 8) · `social_links` (Blocks: `nav_link`, max 6) · `copyright` (Text) |

The dynamic Next.js route at step 5 fetches `page` + `globals/header` + `globals/footer` in parallel.

---

## 5. Datasources

| Slug | Purpose | Seed values |
|---|---|---|
| `post_categories` | Powers the `category` Option field on `post`. Centralized so adding a new category is one edit, not a per-post update. | `brand`, `strategy`, `design`, `development` (editable later) |

---

## 6. Resolved decisions

1. **JS, not TS.** Project stays JavaScript. `.jsx` blocks in step 5. The TS preference applies to future projects.
2. **Blog uses `post` references** (`featured_post_section` + `posts_grid`).
3. **Services and Case Studies are content types**, not inline blocks. Sections reference them.
4. **`post_categories` datasource is seeded** with starter values listed above.
5. **`nav_link` blocks** (label + multilink) for Header/Footer — resilient to page renames.

---

## 7. Final component count

- **7 atoms:** `cta_button`, `nav_link`, `value_card`, `team_member`, `faq_item`, `form_field`, `info_block`
- **12 sections:** `hero_intro`, `page_header`, `banner_image`, `services_grid`, `posts_grid`, `feature_section`, `cta_strip`, `values_section`, `team_section`, `faq_list`, `contact_form`, `contact_info`
- **4 content types:** `page` (SEO tab), `post` (SEO tab), `service`, `case_study`
- **2 singletons:** `site_header`, `site_footer`
- **1 datasource:** `post_categories` (4 entries)

**Total: 25 components in the space.**

The CLI handles dependency ordering automatically via its graph-based push.

## 8. Refactor decisions captured (post-approval)

- `cta_section` + `case_study_section` + `featured_post_section` → merged into **`feature_section`** with variant Option in a Variants tab. Reasoning: they were shape-twins (title/subtitle + one nested-content slot) differing only in nested type. The merge follows the new "merge shape-twin wrapper components" principle now in `storyblok-content-modeling`.
- SEO fields on `page` and `post` moved to a dedicated **SEO tab** using Storyblok's `type: tab` schema field. Content stays on the implicit **General** tab — never create a "Content" tab, since General already serves that role.
- Skill updated with these two principles for future projects.
