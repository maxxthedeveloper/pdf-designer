---
description: Review the current PDF design against the design system
allowed-tools: Read, Glob, Grep
---

# Design Critique

Perform a systematic review of the active document against the design system.

## Step 1: Read Current State

Read these files:
- The active document definition (check `src/content/registry.ts` for which one)
- `src/styles/tokens.css`
- `src/styles/pdf-document.css`
- Any section components in `src/components/PdfDocument/sections/` that are relevant

## Step 2: Evaluate

Score each dimension (1-5) with specific findings:

**Typography Hierarchy**
- Are there exactly 3 tiers (display, reading, supporting)?
- Does weight differentiate roles within tiers (not just size)?
- Is tracking tighter at larger sizes, wider at smaller?
- Are all text elements using type role tokens, not raw values?

**Spacing & Rhythm**
- Are all spacing values on the 4px grid (`--space-*` tokens)?
- Is internal spacing always less than external spacing?
- Do dividers have balanced margin on both sides (min 20px)?
- Does the page feel spacious at 60-70% content density?

**Emphasis & Color**
- Does the 5-level emphasis hierarchy create 3 distinct visual zones?
- Are no more than 3 elements at the same emphasis level adjacent to each other?
- Does small text (<14px) meet WCAG AA contrast (4.5:1)?
- Is the Solana gradient accent limited to accent bar + card borders (10% rule)?

**Content & Layout**
- Does the document follow a narrative arc?
- Are feature descriptions concise (under 25 words)?
- Do cards feel distinct from the page surface?
- Is the footer minimal and unobtrusive?
- For multi-page: is content balanced across pages?

## Step 3: Recommendations

List the top 3-5 improvements ranked by visual impact:
- What to change (specific CSS property or content edit)
- Which file to modify
- Why it matters (which design system principle it violates)
