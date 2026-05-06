# Recreate this build from scratch

This guide is the operational checklist to rebuild the entire BrightStart tutorial: a Figma design → Storyblok content model + draft stories + assets → Next.js front end → GitHub repo → Netlify deploy → live preview.

It assumes you have the same Figma file and an empty (or fresh) Storyblok space. Replace fileKey / space_id with yours.

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 20+ | for Next.js 16 |
| `gh` CLI | any | logged in (`gh auth status`) |
| `netlify` CLI | 26+ | logged in (`netlify status`) |
| `storyblok` CLI | latest | logged in (`storyblok login`) |
| Storyblok MCP | server configured | for Management API ops |
| Figma MCP | server configured | for design context reads |
| GitHub MCP | server configured | for PR creation |
| Netlify MCP | server configured | for env-var ops |

Tokens you'll need:
- Storyblok delivery API token (per space, in space Settings → Access Tokens)
- Figma personal access token (optional — only for the bulk REST snapshot script; the MCP works without it)
- The Storyblok PAT lives at `~/.storyblok/credentials.json` after `storyblok login`. The `password` field is a 467-char token, NOT a plaintext password.

---

## Step 1 — Read Figma + propose Storyblok model

1. Pull the Figma file structure via the Figma MCP. Start with `get_metadata` on a known page node (extract from a Figma URL — `?node-id=6-2` becomes nodeId `6:2`).
2. Walk only one level deep to enumerate page frames, then drill into each page once via `get_design_context` to capture the section list AND the real copy / image asset URLs in a single call per frame.
3. Cache the response to `~/projects/.figma-cache/<fileKey>/`:
   - `metadata.json` — pages + asset placeholder nodes
   - `copy.json` — extracted real copy (titles, subtitles, FAQ items, contact info)
4. Apply the `storyblok-content-modeling` skill to classify each pattern as nestable / content type / singleton.
5. Write the proposal to `storyblok/_plan.md` grouped by category, with reasoning. **Don't create anything in Storyblok yet.** Get user approval first.

Key principles to apply (from the skill):
- Default to Nestable; promote to Universal only when justified.
- `snake_case` technical names. Don't use `content` standalone.
- Don't add `title` / `slug` to schemas — they're built-in story fields.
- Restrict every Blocks field with `restrict_components` + `component_whitelist` + min/max.
- **Merge shape-twin wrappers.** If two or more components share the same outer shape (title + subtitle + one nested slot) and only differ in *what* they nest, collapse them into one block with a `variant` Option. Example: `cta_section` + `case_study_section` + `featured_post_section` → one `feature_section` with variant = `cta` / `case_study` / `featured_post`.
- **Tabs are for things separate from content.** General is the implicit content tab — never declare a "Content" tab. Reserve tabs for SEO / Variants / Styles / Advanced.

---

## Step 2 — Create components + datasource

1. Snapshot the existing space components so you can revert: `storyblok components pull --space <space_id> --separate-files`. Move the result from `.storyblok/components/<space_id>/` into `storyblok/_components-snapshot/`.
2. Generate one JSON file per component under `storyblok/components/<name>.json`. Schema gotchas:
   - Content types need `is_root: true, is_nestable: false`.
   - For internal-story references, use `type: "option"` (single) or `type: "options"` (multi) with `source: "internal_stories"` and `filter_content_type: ["<type>"]`.
   - For datasource-backed dropdowns, `type: "option", source: "internal", datasource_slug: "<slug>"`.
   - For tabs: define the tab field with `type: "tab", display_name: "<Name>", keys: [...field-names]`. Member fields are defined separately in the schema in the order they should appear.
3. Stage files into `.storyblok/components/<space_id>/` (the path the CLI's `--separate-files` push reads from): `cp storyblok/components/*.json .storyblok/components/<space_id>/`.
4. Push: `storyblok components push --space <space_id> --separate-files`. The CLI does graph-based dependency resolution automatically.
5. Seed the `post_categories` datasource via the Storyblok MCP:
   - `mcp__Storyblok__execute_mutating createDatasource` with `{name, slug}`.
   - Then `createDatasourceEntry` for each entry; capture the `datasource_id` from step 1.

---

## Step 3 — Pull assets from Figma → push to Storyblok

1. For each section that contains imagery, call `mcp__figma__get_design_context` once at the **section level** (not per image). The response includes Figma asset URLs for every image fill in that subtree.
2. Download each unique URL via `curl` to `storyblok/assets/<descriptive-name>.png`. The URLs expire in 7 days, so do this in the same session.
3. Push each asset: `storyblok assets push <file> --space <space_id>`. The CLI accepts one file per call — wrap in a `for` loop.
4. Fetch the resulting asset list via MCP `listAssets` to capture each file's `id` + S3 `filename` URL. Save the figma-node-id → SB-asset-id map to `storyblok/_assets-manifest.json` for steps 4 + 5.

Skip icons + decorative SVGs — those go in the frontend with an icon library, not Storyblok.

---

## Step 4 — Create stories as drafts

Order matters because pages reference services/posts/case_studies via UUIDs.

1. Create folders first: `services`, `case-studies`, `blog`, `globals`. All with `is_folder: true`. Capture each folder's `id`.
2. Create leaf content (services, case study, posts) inside their folders. Capture each story's `uuid` for use in page bodies.
3. For Storyblok references in body fields:
   - `option` (single) → store the UUID as a string.
   - `options` (multi) → store an array of UUID strings.
   - The frontend client auto-resolves these to full story objects when `resolve_relations` is set on the query — see step 5.
4. Create globals: `globals/header` (`site_header`), `globals/footer` (`site_footer`).
5. Create / update page stories. **Folder-with-content (`/blog`) gotcha:**
   - The Storyblok delivery API does NOT serve a root-level folder's content via `cdn/stories/<slug>` — returns 404.
   - It also rejects `is_startpage: true` on a root-level folder ("For a startpage a parent folder is required").
   - Pattern that works: keep the folder empty, create a child story `<folder>/index` with `is_startpage: true` carrying the body. The folder's URL resolves to that startpage automatically.
6. Leave everything as drafts (`published: false`). Walk through them in the Storyblok app before publishing.
7. Save id + uuid + slug for every story to `storyblok/_stories-manifest.json`.

Each Blocks field item needs a `_uid` — any unique string within the story is fine.

---

## Step 5 — Build the Next.js frontend

1. **Read the project first.** Confirm framework version (`package.json`), routing (App Router vs Pages), styling system, and JS vs TS (`tsconfig.json` vs `jsconfig.json`). Match the project's existing conventions even if your saved memory says otherwise.
2. Install Tailwind 4: `npm install -D tailwindcss @tailwindcss/postcss`. Add `postcss.config.mjs` and import `tailwindcss` in `globals.css`. Define design tokens via `@theme { --color-...; --radius-...; ... }`.
3. **Tailwind 4 + plain CSS rules pitfall:** `body { background: var(--color-cream) }` in plain CSS will resolve to `#fff` because the `@theme` token isn't always defined when the body rule is processed. Use a Tailwind utility class on the JSX element instead: `<body className="bg-cream">`.
4. Configure `next/image` for the Storyblok asset CDN — `images.remotePatterns` in `next.config.mjs` must include `a.storyblok.com` and `s3.amazonaws.com`.
5. Build one React component per registered Storyblok block. Atoms first, sections next, content types and globals last. Each component takes `{ blok }` as a prop and uses `storyblokEditable(blok)` for live preview.
6. Register every component in `src/lib/storyblok.js`'s `components: { ... }` map. **Don't forget content types** — `post`, `service`, `case_study` need their own renderers because they have URLs of their own. Without a registered component, navigating to `/blog/<post-slug>` logs `Component <name> doesn't exist`.
7. Wire the catch-all dynamic route `[[...slug]]/page.js`:
   - Fetch page + header + footer **in parallel** with `Promise.all`.
   - Pass `resolve_relations: 'services_grid.services,posts_grid.posts,feature_section.reference'` and `version: 'draft'` on the page fetch.
   - **Don't post-process `data.rels`.** The `@storyblok/react` apiPlugin already substitutes the resolved story objects into `body[*].services` etc. If you walk the body and re-map UUIDs through `data.rels` you'll silently zero out the field, because the values are already objects, not strings.
8. Run with HTTPS: `next dev --experimental-https`. The Storyblok visual editor's preview iframe refuses HTTP (mixed-content block).

---

## Step 6 — Ship for review

1. **Set up `main` as a clean baseline** (just `.gitignore` + `README.md` + `LICENSE`). Put the full build on a branch like `figma-to-storyblok/<short-slug>`. The PR diff = the work, which is what the user reviews.
2. Push both branches. Use `gh repo create <owner>/<repo> --public` to create the GitHub repo — the GitHub MCP's `create_repository` tool sometimes rejects boolean params.
3. **PAUSE** to install the Netlify GitHub App on the new repo. Wait for "connected" before continuing.
4. Create the Netlify site **with GitHub repo wired in one shot:**
   ```bash
   netlify api createSiteInTeam --data '{
     "account_slug": "<team>",
     "body": {
       "name": "<site-name>",
       "repo": {"provider":"github","repo":"<owner>/<repo>","branch":"main","cmd":"npm run build","dir":".next"}
     }
   }'
   ```
   Don't use the MCP `create-new-project` operation — it creates an empty site with no GitHub linkage.
5. Set required env vars on the Netlify site: `STORYBLOK_DELIVERY_API_TOKEN`, `STORYBLOK_REGION`. **Do NOT set `envVarIsSecret: true`** — that's a paid-plan feature and the MCP returns "Environment variable upserted" silently even when it failed. After setting, verify by listing all env vars (`getAllEnvVars: true`) and asserting each key is present.
6. Open a PR via the GitHub MCP from the feature branch into `main`. Description should summarize the schemas, stories, and Figma source.
7. Poll Netlify `listSiteDeploys` for a `deploy-preview` deploy whose `review_id` matches the PR number. Wait for state=ready.
8. Save the current Storyblok `space.domain` to `storyblok/_revert.json`, then PUT the deploy-preview URL:
   ```bash
   TOKEN=$(jq -r '.["api.storyblok.com"].password' ~/.storyblok/credentials.json)
   curl -X PUT https://mapi.storyblok.com/v1/spaces/<space_id> \
     -H "Authorization: $TOKEN" -H "Content-Type: application/json" \
     -d '{"space":{"domain":"<preview-url>/"}}'
   ```
   The Storyblok MCP does NOT expose `updateSpace`, so curl is the path.

---

## On merge — `merge-for-launch`

1. Squash-merge the PR.
2. Wait for the production deploy on `main` to be ready (it can finish in ~10s for small repos — check `listSiteDeploys` against the merge commit SHA before assuming it didn't trigger).
3. Verify production URL serves real content — match a copy phrase, not just HTTP 200.
4. PUT production URL into `space.domain` via the same curl call above. Verify with `getSpace`.

Don't restore the literal `previous_value` from `_revert.json` (often `https://localhost:3000/`, the local dev default) — the user wants production after merge, not their dev URL.

---

## Files this process produces

| Path | Purpose |
|---|---|
| `storyblok/_plan.md` | Approved content-model proposal + reasoning |
| `storyblok/components/*.json` | Source for every Storyblok block schema |
| `storyblok/_components-snapshot/` | Pre-existing space components captured before push |
| `storyblok/_components-manifest.json` | `name → file → deps` |
| `storyblok/assets/*.png` | Photos pulled from Figma fills |
| `storyblok/_assets-manifest.json` | `figma_node → local file → SB asset id + URL` |
| `storyblok/_stories-manifest.json` | Every story's slug, id, uuid |
| `storyblok/_revert.json` | Prior `space.domain` for revert on merge |

These manifests are the contract between steps. Each step reads the previous step's manifest instead of re-querying Figma or the Storyblok API.

---

## Common failure modes (and what to check)

- **`/blog` returns 500** → Folder needs a child story with `is_startpage: true` carrying the body (see step 4).
- **Service / post cards don't render** → You're double-resolving `data.rels`. Pass `pageRes.data.story` straight through (see step 5).
- **Body background is white instead of cream** → You used `var(--color-cream)` in plain CSS body rule. Use the utility class on `<body>` (see step 5).
- **First Netlify build has no Storyblok token** → `envVarIsSecret: true` silently dropped on Free plans. Verify with `getAllEnvVars: true` and re-set without the secret flag (see step 6).
- **Visual editor iframe is blank** → Dev server is HTTP. Add `--experimental-https` to the dev script.
- **`Component post doesn't exist`** → You forgot to register the content-type renderer (post / service / case_study) in `src/lib/storyblok.js`'s components map.
