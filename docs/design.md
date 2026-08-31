# Design

## Principle

The user opened Flick because they're tired of choosing. The
interface should reduce their cognitive load, not add to it.

That means no distractions, no clutter, no ornament that isn't
serving decision-making. Smart spacing, restrained color, quiet
animation, high contrast. Everything WCAG 2.2 AA at minimum. If a
design choice is between "expressive" and "invisible," invisible
wins.

## Color

Restrained palette using Tailwind tokens:

- **Brand:** `red-500` — used sparingly for primary actions and
  brand identity. Never as background.
- **Surface:** `gray-950` — page background, dark by default
- **Elevated surface:** `gray-900` — cards, modals, elevated panels
- **Text:** `gray-50` (primary), `gray-200` (secondary), `gray-400`
  (muted)

Dark mode is the default and only mode. Movies are watched in the
dark.

## Typography

Inter Variable, self-hosted (`apps/client/src/assets/fonts/`). Two
weights loaded: normal and italic, full weight range within each.
Tailwind's `font-sans` maps to Inter.

Titles: heavier weight, generous line-height. Body: comfortable
reading size, 1.5x line-height. Never below 14px effective size.

## Motion

Minimal.

- Card enter/exit on swipe: directional, ~200ms
- Modal appear/disappear: fade + slight scale, ~150ms
- Hover states: instant or near-instant

Motion library: `motion/react`. Respect `prefers-reduced-motion`
where implemented.

## Accessibility

**WCAG 2.2 Level AA is the floor, always.** No exceptions.

- Contrast ratios verified on all text/background pairs
- Focus states visible and distinct (never removed)
- Keyboard navigation supported for every interactive element
- ARIA labels on icon-only buttons

Interactive targets: 44px minimum on touch surfaces.

## Layout

Mobile-first. The discovery experience is designed for a phone in
one hand. Desktop scales up but shouldn't add complexity. The same
card, more breathing room, ambient background using the current
poster.

## Component library

- **shadcn/ui** for base primitives (dialog, popover, sheet, etc.)
- **lucide-react** for icons
- Custom components (`AuthModal`, `MovieOverlay`, `DiscoveryCard`,
  etc.) built on top

Everything under `apps/client/src/components/ui/` is generated
shadcn output and should generally not be manually edited.

## What Flick is not

- Not colorful
- Not playful with animation
- Not information-dense
- Not competing with IMDb on data richness

Every design decision compares against "does this help someone
decide what to watch tonight?" If the answer is no, cut it.