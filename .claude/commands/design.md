---
description: Design a PDF document from a referenced content definition
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Design a PDF Document

You are executing the design workflow. The content structure and copy are already defined in the document file — your job is to make it look exceptional using the design system.

## Phase 1: Read the Source

Read the document definition referenced by the user: $ARGUMENTS

If no file is specified, check `src/content/registry.ts` for the active document, then read its definition file.

Also read these to ground yourself in the current system:
- `src/styles/tokens.css` — the token system (type roles, emphasis, spacing, surfaces)
- `src/styles/pdf-document.css` — current layout rules
- `src/content/types.ts` — the schema

## Phase 2: Evaluate Structure

Before touching code, assess the document's section composition:
- Does the section ordering follow a clear narrative arc? (Hero > context > detail > proof > CTA > footer)
- Are section types well-matched to the content? (e.g., comparisons should use `table`, not `text-block`)
- Is the page density right? A4 pages should feel spacious, not stuffed.
- For multi-page docs: does each page feel balanced, or is one page overloaded?

Propose any structural changes to the user. Wait for approval before modifying.

## Phase 3: Execute the Design

Apply the design system with precision:

**Typography**
- Every text element must use a type role token (`--type-display-*`, `--type-heading-*`, etc.)
- Never set raw font-size/weight/leading — always reference the token
- Verify the 3-tier emphasis hierarchy: Prominent (extra-high), Readable (high/medium), Decorative (low/extra-low)

**Spacing**
- All spacing values must use `--space-*` tokens (4px grid)
- Internal spacing (within a section) < external spacing (between sections)
- Dividers need balanced breathing room on both sides (min 20px)

**Layout**
- Two-column grids for feature-list pairs
- Cards push to bottom with `margin-top: auto` for page anchoring
- Hero is always 2-column: title left, description right

**Surfaces & Borders**
- Cards: `--surface-card` background, `--surface-card-border` border
- Accent bar: Solana gradient `#9945FF > #14F195 > #00C2FF`
- Card left-border uses same gradient via `border-image`

## Phase 4: Self-Critique

Before presenting to the user, check:
1. **Squint test** — blur your mental model. Are there exactly 3 visual weight layers?
2. **Emphasis audit** — no two adjacent elements share the same emphasis token
3. **Spacing rhythm** — consistent vertical rhythm, no cramped sections
4. **Token compliance** — zero raw values, everything uses the design system
5. **Content fit** — no text that would overflow or feel truncated on A4

Report what you built and any trade-offs you made.
