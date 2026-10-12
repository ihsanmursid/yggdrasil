# Yggdrasil

An interactive, Diablo-style skill tree that visualises every feature of the
**Smartbag** school-management platform — the NestJS API (`api_nest`), the React
portals (`bbs`), and the wiki docs (`bbs-wiki`) — as one navigable tree.

Click any node to see its detail: description, CRUD/operations, parent and
children, and cross-module relationships. Perfect for giving non-technical
stakeholders a map of the whole product.

## Features

- **Collapsed overview** — opens on the nine top-level categories only, so the
  first view is ~9 nodes, not ~150. Click a category to expand its modules.
- **Focus + dim** — selecting a node brightens it, its ancestors, its children
  and its relationships, while the rest of the tree fades into the background.
- **Detail panel** — description, level, CRUD operations (CREATE / READ /
  UPDATE / DELETE / ACTION badges), source wiki file, and clickable links to the
  parent, children and related features.
- **Radial layout with collision resolution** — nodes are packed by angular
  span and separated on real axis-aligned boxes, so nothing overlaps.
- **Search + category filter**, pan/zoom canvas, minimap and breadcrumb.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Data model

All feature data lives in `src/data/yggdrasilData.ts`:

- `categories` — id, label and colour for each branch.
- `nodes` — one entry per feature: `id`, `title`, `category`, `description`,
  `level`, `parentId`, `crud[]`, `relatesTo[]`, `tags[]`, optional `apiRoute`.

To extend the tree, add a node and point its `parentId` at the right parent.
The layout recomputes automatically.

## Tech stack

React 18 + Vite + TypeScript (strict). No UI framework — the canvas and detail
panel are hand-rolled SVG/DOM for full control over the radial layout.
