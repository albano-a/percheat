# Design System & Philosophy

## Core Philosophy
This project follows a strict "Minimalist & Elegant" design directive. The goal is to create a sanctuary for code snippets where the interface recedes, allowing the content to take center stage.

- **Mantra**: "Simplicity is the ultimate sophistication."
- **Aesthetic**: Clean lines, generous whitespace, and high contrast typography.
- **Interaction**: Subtle hover states, smooth transitions, no "marketing fluff" (fake reviews, inflated stats).

## Typography
We utilize a dual-font stack optimized for readability and technical clarity.

- **Primary (UI & Headings)**: `Roboto`
  - Variable: `--font-roboto`
  - Usage: All general UI text, headings, and navigation.
- **Secondary (Code)**: `Roboto Mono`
  - Variable: `--font-roboto-mono`
  - Usage: Code snippets, technical identifiers, and terminal inputs.

## Color System
The color system is built on semantic Tailwind CSS variables, derived from Shadcn UI standards.

- **Base**: Zinc/Slate grayscale.
- **Theming**: Native Light/Dark mode support using `next-themes`.
- **Approach**: 
  - Avoid heavy use of "brand colors". 
  - Create hierarchy through contrast (`text-foreground` vs `text-muted-foreground`).
  - Use `bg-transparent` where possible to maintain an airy feel.

## Component Library
**Shadcn UI** serves as the foundation, with specific overrides to match the organic/minimalist feel.

- **Buttons**:
  - Primary actions: `rounded-full` (Organic, friendly).
  - Secondary actions: `variant="ghost"` or `variant="outline"` (Unobtrusive).
- **Cards**:
  - Often used purely for layout structure.
  - Style: `border-0 shadow-none bg-transparent` (Removes the "boxed in" feeling).
- **Navigation**:
  - Simple, top-level layout with clear hierarchy.

## Iconography
- **Library**: `react-icons` (Specifically `fa` - FontAwesome).
- **Usage**: Used sparingly as visual anchors for feature sections.
- **Constraint**: Do not use `lucide-react` (unless strictly necessary/hidden).

## Layout Patterns
1.  **Macro Spacing**: Large vertical padding (`py-24`, `py-32`) defines section boundaries without needing horizontal dividers.
2.  **Responsiveness**: 
    - Mobile: Single column stacks.
    - Desktop: Max-width centered containers (`max-w-4xl`, `max-w-6xl`) with 3-column grids.
3.  **Visual Hierarchy**:
    - H1: Extremely large, tracking-tight (`text-5xl md:text-8xl`).
    - H2: Bold, tracking-tight (`text-3xl`).
    - Body: Leading-relaxed for comfortable reading.

## Tech Stack References
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Theming**: `next-themes` (`suppressHydrationWarning` enabled in root)
