# /blog (archived)

Pulled out of the live site on a deploy when the post pipeline wasn't ready yet. Nothing here is broken — restore by reversing the moves below.

## Restore

```bash
# from the portfolio root
git mv .archive/blog/route app/[lang]/blog
git mv .archive/blog/blog.ts lib/content/blog.ts
```

Then re-add these lines:

- **`lib/content/index.ts`** — `export * from "./blog";`
- **`lib/content/nav.ts`** — the `{ href: "/blog", ... }` row in the `navResources` array (was between `nav.uses` and any other resource).
- **`components/dock/mobile-dock.tsx`** — the `{ href: "/blog", icon: "pen", labelKey: "nav.blog" }` row inside `SHEET_INTERNAL`.
- **`app/sitemap.ts`** — re-add `"/blog"` to the `STATIC_ROUTES` array.

Message keys (`nav.blog`, `blog.*`, `page.title.blog`, `page.description.blog`) were left in `lib/i18n/messages.ts` — they're harmless dead keys until the page comes back.
