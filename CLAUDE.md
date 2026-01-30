# PDF Designer Agent

A generic, reusable PDF designer operated through Claude Code. The app is a preview/export engine; Claude Code is the design tool.

## How It Works

```
Claude Code (you)
  ├── Reads source documents (PDF, DOCX, images)
  ├── Generates/edits content definition (src/content/document.ts)
  ├── Creates/modifies icons (src/icons/)
  ├── Adjusts styles (src/styles/tokens.css)
  └── Uses browser preview for visual feedback

Local Web App (preview + export)
  ├── Renders document definition using component library
  ├── Live preview at localhost:5173
  ├── PDF export via html2canvas + jsPDF
```

## Quick Start

```bash
npm run dev     # Start preview at localhost:5173
```

Open the browser preview to see changes in real-time via hot reload.

## File Map

| File | Purpose |
|------|---------|
| `src/content/document.ts` | **The content definition** - edit this to change the PDF |
| `src/content/types.ts` | TypeScript types for the document schema |
| `src/styles/tokens.css` | Design tokens (colors, typography, spacing) |
| `src/styles/tokens-dark.css` | Dark mode token overrides |
| `src/styles/pdf-document.css` | PDF page layout & component styles |
| `src/icons/` | SVG icon components |
| `src/icons/registry.ts` | Maps icon names to components |
| `src/components/SectionRenderer/` | Maps section types to React components |
| `src/components/PdfDocument/sections/` | Section component implementations |

## Content Definition Reference

The document definition lives in `src/content/document.ts`. This is the single source of truth.

### Structure

```ts
export const document: DocumentDefinition = {
  meta: {
    title: "Document Title",
    exportFilename: "output.pdf",
  },
  accentBar: {                          // optional
    gradient: "linear-gradient(...)",
    height: 3,                          // px, optional
  },
  sections: [
    // Array of Section objects (see below)
  ],
}
```

### Section Types

#### `hero`
Full-width hero with title and description. Use `\n` in title for line breaks.

```ts
{ type: "hero", title: "Line 1\nLine 2", description: "..." }
```

#### `feature-list`
Section header + list of icon/name/description features.

```ts
{
  type: "feature-list",
  title: "Section Title",
  description: "Optional subtitle",   // optional
  features: [
    { icon: "server", name: "Feature Name", description: "..." },
  ],
}
```

#### `two-column`
Side-by-side layout containing two `feature-list` sections.

```ts
{
  type: "two-column",
  left: { type: "feature-list", ... },
  right: { type: "feature-list", ... },
}
```

#### `divider`
Horizontal line separator.

```ts
{ type: "divider" }
```

#### `cards`
Grid of card boxes with title and description.

```ts
{
  type: "cards",
  items: [
    { title: "Card Title", description: "..." },
  ],
}
```

#### `text-block`
Simple title + body text section.

```ts
{ type: "text-block", title: "...", body: "..." }
```

#### `image`
Full-width image.

```ts
{ type: "image", src: "/path/to/image.png", alt: "Description" }
```

#### `footer`
Bottom bar with brand text and optional logo.

```ts
{ type: "footer", brand: "Company Name", logo: "solana-logo" }
```

## Available Icons

Icons are referenced by name string in the document definition:

| Name | Description |
|------|-------------|
| `server` | Server/hosting |
| `component` | Components/modules |
| `shield-check` | Security/compliance |
| `database` | Data/storage |
| `credit-card` | Payments |
| `coin` | Currency/tokens |
| `chat` | Communication |
| `check-square` | Validation/checkmark |
| `compass` | Navigation/exploration |
| `globe` | Global/worldwide |
| `code` | Development/code |
| `target` | Goals/targeting |
| `solana-logo` | Solana brand logo |

### Creating New Icons

1. Create `src/icons/NewIcon.tsx`:

```tsx
export default function NewIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="..." stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
```

2. Export from `src/icons/index.ts`:
```ts
export { default as NewIcon } from './NewIcon'
```

3. Register in `src/icons/registry.ts`:
```ts
import { NewIcon } from './index'
// Add to iconRegistry:
'new-icon': NewIcon,
```

4. Add the `IconName` type in `src/content/types.ts`:
```ts
export type IconName = ... | 'new-icon'
```

## Style System

### Design Tokens (`src/styles/tokens.css`)

All visual properties use CSS custom properties. Key categories:

**Colors** (grayscale): `--gray-0` (white) through `--gray-950` (near-black)

**Emphasis** (text opacity levels):
- `--emphasis-extra-high` - Titles, primary content
- `--emphasis-high` - Body text, feature names
- `--emphasis-medium` - Descriptions, secondary text
- `--emphasis-low` - Tertiary text, subtle labels
- `--emphasis-extra-low` - Footer text, minimal emphasis

**Surfaces**:
- `--surface-page` - Page background
- `--surface-card` - Card backgrounds
- `--surface-card-border` - Card borders
- `--border-subtle` - Dividers, section borders
- `--icon-bg` / `--icon-border` - Icon box styling

**Typography**:
- Scale: `--text-2xs` through `--text-4xl`
- Weights: `--weight-light` (300) through `--weight-semibold` (600)
- Line heights: `--leading-tight` (1.1) through `--leading-relaxed` (1.625)

### Modifying Colors

To change the overall color scheme, edit `src/styles/tokens.css` (light) and `src/styles/tokens-dark.css` (dark). The dark theme is activated via `[data-theme="dark"]` selector.

### Accent Bar

The accent bar gradient is defined in the document definition's `accentBar.gradient` property. Change it there, not in CSS.

## PDF Export

The export pipeline: DOM -> html2canvas (3x scale) -> jsPDF (A4) -> download.

- Export filename comes from `document.meta.exportFilename`
- Resolution: 3x scale for print quality
- Format: A4 portrait (210mm width)
- Trigger: Export button in sidebar

## Workflow: Creating a New PDF

1. Read source material (PDF, DOCX, images provided by user)
2. Edit `src/content/document.ts` with new content
3. Add any needed icons to `src/icons/`
4. Adjust tokens in `src/styles/tokens.css` if brand colors differ
5. Preview at localhost:5173 (hot reload)
6. Use browser preview to verify layout
7. Export PDF when satisfied

## Workflow: Modifying Existing Content

1. Open `src/content/document.ts`
2. Find the section to modify
3. Update text, icons, or structure
4. Save - hot reload updates preview automatically

## Agentation Feedback

When receiving visual feedback annotations from the browser:

1. CSS selectors in feedback map to classes in `src/styles/pdf-document.css`
2. Component structure is in `src/components/PdfDocument/sections/`
3. Content changes go in `src/content/document.ts`
4. Style changes go in `src/styles/pdf-document.css` or `tokens.css`

Common selector-to-file mappings:
- `.hero`, `.hero-title`, `.hero-desc` -> Hero section / pdf-document.css
- `.section-title`, `.section-desc` -> FeatureList section / pdf-document.css
- `.feature`, `.feature-icon`, `.feature-name`, `.feature-desc` -> FeatureList / pdf-document.css
- `.bottom-cards`, `.card`, `.card-title`, `.card-desc` -> Cards section / pdf-document.css
- `.pdf-footer`, `.footer-brand`, `.footer-logo` -> Footer section / pdf-document.css
- `.accent-bar` -> PdfDocument / pdf-document.css (gradient in document.ts)
- `.divider` -> Divider / pdf-document.css
- `.two-col` -> Two-column layout / pdf-document.css
