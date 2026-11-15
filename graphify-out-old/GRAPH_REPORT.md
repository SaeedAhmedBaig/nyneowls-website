# Graph Report - nyneowls  (2026-11-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 331 nodes · 720 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c5cb2751`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 13
- Community 14
- Community 15

## God Nodes (most connected - your core abstractions)
1. `next` - 24 edges
2. `Reveal()` - 21 edges
3. `react` - 21 edges
4. `Hero()` - 19 edges
5. `Section()` - 19 edges
6. `SectionHead()` - 17 edges
7. `Faq()` - 16 edges
8. `compilerOptions` - 16 edges
9. `lucide-react` - 15 edges
10. `CardGrid()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `AboutAside()`  [EXTRACTED]
  app/about/page.tsx → components/blocks/HeroVisuals.tsx
- `CreativeStudioPage()` --calls--> `StudioAside()`  [EXTRACTED]
  app/creative-studio/page.tsx → components/blocks/HeroVisuals.tsx
- `DigitalGoodsPage()` --calls--> `GoodsStack()`  [EXTRACTED]
  app/digital-goods/page.tsx → components/blocks/HeroVisuals.tsx
- `DigitalSolutionsPage()` --calls--> `ProductStatus()`  [EXTRACTED]
  app/digital-solutions/page.tsx → components/blocks/HeroVisuals.tsx
- `HomePage()` --calls--> `HeroTiles()`  [EXTRACTED]
  app/page.tsx → components/blocks/HeroTiles.tsx

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (37): AboutPage(), metadata, CreativeStudioPage(), metadata, DigitalGoodsPage(), metadata, DigitalSolutionsPage(), metadata (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (49): clean(), POST(), schema, eslintConfig, dependencies, gsap@^3.15.1, @gsap/react@^2.1.2, @hookform/resolvers@^7.0.6 (+41 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (34): generateMetadata(), LegalRoute(), LegalRouteContent(), inter, metadata, orgSchema, RootLayout(), siteSchema (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (15): Card(), CardItem, colClass, Facts(), HeroTiles(), tiles, PathItem, Paths() (+7 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (11): projects, caseStudies, founder, services, CaseStudy, Founder, Image, Project (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.16
Nodes (13): metadata, ContactForm(), Form(), Status, Values, tracks, WorkAside(), Props (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.20
Nodes (5): Button(), buttonVariants, SheetContent(), SheetOverlay(), SheetPortal()

### Community 9 - "Community 9"
Cohesion: 0.24
Nodes (3): SelectContent(), SelectScrollDownButton(), SelectScrollUpButton()

### Community 10 - "Community 10"
Cohesion: 0.42
Nodes (8): AboutAside(), ContactAside(), GoodsStack(), Label(), ProductStatus(), SeriesCover(), StoriesAside(), StudioAside()

### Community 13 - "Community 13"
Cohesion: 0.29
Nodes (4): TabsList(), tabsListVariants, class-variance-authority@^0.7.1, class-variance-authority

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (3): alt, contentType, size

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 6`, `Community 10`, `Community 15`?**
  _High betweenness centrality (0.200) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14675052410901468 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Community 3` to `Community 0`, `Community 1`, `Community 2`, `Community 6`, `Community 8`, `Community 9`, `Community 11`, `Community 12`, `Community 14`?**
  _High betweenness centrality (0.176) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05203619909502263 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Community 3` to `Community 0`, `Community 1`, `Community 2`, `Community 6`, `Community 8`, `Community 9`, `Community 11`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07653061224489796 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._