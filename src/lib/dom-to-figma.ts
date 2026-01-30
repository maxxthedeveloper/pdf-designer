/**
 * DOM-to-Figma serializer.
 *
 * Walks the rendered PDF document DOM and produces a JSON tree
 * that maps directly to Figma Plugin API node types. A companion
 * Figma plugin reads this JSON and creates editable layers.
 */

// ── Types ──────────────────────────────────────────────────

export interface FigmaColor {
  r: number
  g: number
  b: number
}

export interface FigmaRGBA extends FigmaColor {
  a: number
}

export interface FigmaSolidFill {
  type: 'SOLID'
  color: FigmaColor
  opacity: number
}

export interface FigmaGradientStop {
  color: FigmaRGBA
  position: number
}

export interface FigmaGradientFill {
  type: 'GRADIENT_LINEAR'
  gradientStops: FigmaGradientStop[]
  gradientTransform: [[number, number, number], [number, number, number]]
}

export type FigmaFill = FigmaSolidFill | FigmaGradientFill

export interface FigmaStroke {
  type: 'SOLID'
  color: FigmaColor
  opacity: number
}

export interface FigmaEffect {
  type: 'DROP_SHADOW'
  color: FigmaRGBA
  offset: { x: number; y: number }
  radius: number
  spread: number
  visible: boolean
}

export interface FigmaNode {
  type: 'FRAME' | 'TEXT' | 'SVG'
  name: string
  x: number
  y: number
  width: number
  height: number
  fills?: FigmaFill[]
  strokes?: FigmaStroke[]
  strokeWeight?: number
  opacity?: number
  topLeftRadius?: number
  topRightRadius?: number
  bottomRightRadius?: number
  bottomLeftRadius?: number
  effects?: FigmaEffect[]
  clipsContent?: boolean
  // Text
  characters?: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: number
  lineHeightPx?: number
  letterSpacingPx?: number
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED'
  textCase?: 'UPPER' | 'LOWER' | 'TITLE' | 'ORIGINAL'
  // SVG
  svg?: string
  // Children
  children?: FigmaNode[]
}

export interface FigmaExport {
  version: 1
  pages: FigmaNode[]
}

// ── Color parsing ──────────────────────────────────────────

function parseColor(css: string): FigmaRGBA | null {
  // Comma-separated: rgb(255, 0, 0) or rgba(255, 0, 0, 0.5)
  let m = css.match(
    /rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\s*\)/,
  )
  // Space-separated (CSS Color Level 4): rgb(255 0 0 / 0.5)
  if (!m) {
    m = css.match(
      /rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/,
    )
  }
  if (!m) return null
  const aVal = m[4]
    ? m[4].endsWith('%')
      ? parseFloat(m[4]) / 100
      : parseFloat(m[4])
    : 1
  return {
    r: parseFloat(m[1]) / 255,
    g: parseFloat(m[2]) / 255,
    b: parseFloat(m[3]) / 255,
    a: aVal,
  }
}

function isTransparent(c: FigmaRGBA): boolean {
  return c.a === 0
}

// ── Gradient parsing ───────────────────────────────────────

/** Split a CSS function argument list on commas, respecting nested parens. */
function splitParts(s: string): string[] {
  const parts: string[] = []
  let depth = 0
  let cur = ''
  for (const ch of s) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ',' && depth === 0) {
      parts.push(cur.trim())
      cur = ''
    } else {
      cur += ch
    }
  }
  if (cur.trim()) parts.push(cur.trim())
  return parts
}

function parseAngle(s: string): number | null {
  const deg = s.match(/([-\d.]+)deg/)
  if (deg) return parseFloat(deg[1])
  const rad = s.match(/([-\d.]+)rad/)
  if (rad) return (parseFloat(rad[1]) * 180) / Math.PI
  const turn = s.match(/([-\d.]+)turn/)
  if (turn) return parseFloat(turn[1]) * 360
  if (s === 'to right') return 90
  if (s === 'to left') return 270
  if (s === 'to bottom') return 180
  if (s === 'to top') return 0
  if (s.startsWith('to ')) return 180 // default fallback
  return null
}

function parseGradientStop(s: string): FigmaGradientStop | null {
  const color = parseColor(s)
  if (!color) return null
  const pct = s.match(/([\d.]+)%/)
  return {
    color,
    position: pct ? parseFloat(pct[1]) / 100 : NaN,
  }
}

function parseLinearGradient(bg: string): FigmaGradientFill | null {
  const m = bg.match(/linear-gradient\((.+)\)/)
  if (!m) return null

  const parts = splitParts(m[1])
  const angle = parseAngle(parts[0])
  if (angle === null) return null

  const stops: FigmaGradientStop[] = []
  for (let i = 1; i < parts.length; i++) {
    const stop = parseGradientStop(parts[i])
    if (stop) stops.push(stop)
  }
  if (stops.length < 2) return null

  // Distribute positions for stops that don't have explicit percentages
  const hasUnspecified = stops.some((s) => isNaN(s.position))
  if (hasUnspecified) {
    stops.forEach((s, i) => {
      if (isNaN(s.position)) s.position = i / (stops.length - 1)
    })
  }

  // Convert CSS angle to Figma gradient transform.
  // CSS: 0deg = bottom-to-top, 90deg = left-to-right.
  // Figma default gradient direction = left-to-right.
  // Rotation around center (0.5, 0.5) by α = (cssAngle - 90)°.
  const alpha = ((angle - 90) * Math.PI) / 180
  const cos = Math.cos(alpha)
  const sin = Math.sin(alpha)

  return {
    type: 'GRADIENT_LINEAR',
    gradientStops: stops,
    gradientTransform: [
      [cos, -sin, 0.5 * (1 - cos + sin)],
      [sin, cos, 0.5 * (1 - sin - cos)],
    ],
  }
}

// ── Fill parsing ───────────────────────────────────────────

function parseFills(style: CSSStyleDeclaration): FigmaFill[] {
  const fills: FigmaFill[] = []

  // Background color
  const bgColor = parseColor(style.backgroundColor)
  if (bgColor && !isTransparent(bgColor)) {
    const { r, g, b, a } = bgColor
    fills.push({ type: 'SOLID', color: { r, g, b }, opacity: a })
  }

  // Background image (gradients)
  const bgImage = style.backgroundImage
  if (bgImage && bgImage !== 'none') {
    const gradient = parseLinearGradient(bgImage)
    if (gradient) fills.push(gradient)
  }

  return fills
}

// ── Border parsing ─────────────────────────────────────────

function parseBorders(style: CSSStyleDeclaration): {
  strokes: FigmaStroke[]
  strokeWeight: number
} {
  const color = parseColor(style.borderColor || style.borderTopColor)
  const width = parseFloat(style.borderWidth || style.borderTopWidth) || 0
  if (!color || isTransparent(color) || width === 0) {
    return { strokes: [], strokeWeight: 0 }
  }
  const { r, g, b, a } = color
  return {
    strokes: [{ type: 'SOLID', color: { r, g, b }, opacity: a }],
    strokeWeight: width,
  }
}

function parseBorderRadius(style: CSSStyleDeclaration) {
  return {
    topLeftRadius: parseFloat(style.borderTopLeftRadius) || 0,
    topRightRadius: parseFloat(style.borderTopRightRadius) || 0,
    bottomRightRadius: parseFloat(style.borderBottomRightRadius) || 0,
    bottomLeftRadius: parseFloat(style.borderBottomLeftRadius) || 0,
  }
}

// ── Shadow parsing ─────────────────────────────────────────

function parseEffects(style: CSSStyleDeclaration): FigmaEffect[] {
  const shadow = style.boxShadow
  if (!shadow || shadow === 'none') return []

  const effects: FigmaEffect[] = []
  for (const part of splitParts(shadow)) {
    // Format: rgba(r,g,b,a) Xpx Ypx Bpx Spx
    const m = part.match(
      /rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\s*\)\s+([-\d.]+)px\s+([-\d.]+)px\s+([\d.]+)px(?:\s+([\d.]+)px)?/,
    )
    if (m) {
      effects.push({
        type: 'DROP_SHADOW',
        color: {
          r: parseFloat(m[1]) / 255,
          g: parseFloat(m[2]) / 255,
          b: parseFloat(m[3]) / 255,
          a: m[4] ? parseFloat(m[4]) : 1,
        },
        offset: { x: parseFloat(m[5]), y: parseFloat(m[6]) },
        radius: parseFloat(m[7]),
        spread: m[8] ? parseFloat(m[8]) : 0,
        visible: true,
      })
    }
  }
  return effects
}

// ── Element classification ─────────────────────────────────

function isVisible(el: HTMLElement): boolean {
  const style = getComputedStyle(el)
  if (style.display === 'none') return false
  if (style.visibility === 'hidden') return false
  if (parseFloat(style.opacity) === 0) return false
  const rect = el.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) return false
  return true
}

function isTextLeaf(el: HTMLElement): boolean {
  if (el.children.length > 0) return false
  const text = el.textContent?.trim()
  return !!text && text.length > 0
}

function isSvgElement(el: Element): el is SVGSVGElement {
  return el instanceof SVGSVGElement
}

function getNodeName(el: HTMLElement): string {
  // Use class name or tag
  const cls = el.className
  if (typeof cls === 'string' && cls) {
    // Take first meaningful class
    const first = cls
      .split(/\s+/)
      .find((c) => !c.startsWith('_') && c.length > 0)
    if (first) return first
  }
  return el.tagName.toLowerCase()
}

// ── Text alignment mapping ─────────────────────────────────

function mapTextAlign(
  align: string,
): 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED' {
  switch (align) {
    case 'center':
      return 'CENTER'
    case 'right':
    case 'end':
      return 'RIGHT'
    case 'justify':
      return 'JUSTIFIED'
    default:
      return 'LEFT'
  }
}

function mapTextTransform(
  transform: string,
): 'UPPER' | 'LOWER' | 'TITLE' | 'ORIGINAL' {
  switch (transform) {
    case 'uppercase':
      return 'UPPER'
    case 'lowercase':
      return 'LOWER'
    case 'capitalize':
      return 'TITLE'
    default:
      return 'ORIGINAL'
  }
}

// ── SVG handling ───────────────────────────────────────────

function serializeSvg(svg: SVGSVGElement, ox: number, oy: number): FigmaNode {
  const rect = svg.getBoundingClientRect()
  const style = getComputedStyle(svg)

  // Resolve currentColor in the SVG markup
  const color = style.color
  let markup = svg.outerHTML
  markup = markup.replace(/currentColor/g, color)

  return {
    type: 'SVG',
    name: 'icon',
    x: Math.round(rect.left - ox),
    y: Math.round(rect.top - oy),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    svg: markup,
  }
}

// ── Main serializer ────────────────────────────────────────

function serializeElement(
  el: HTMLElement,
  ox: number,
  oy: number,
): FigmaNode | null {
  if (!isVisible(el)) return null

  const rect = el.getBoundingClientRect()
  const style = getComputedStyle(el)

  const x = Math.round(rect.left - ox)
  const y = Math.round(rect.top - oy)
  const width = Math.round(rect.width)
  const height = Math.round(rect.height)

  // Text leaf → TEXT node
  if (isTextLeaf(el)) {
    const text = el.textContent!.trim()
    const color = parseColor(style.color)
    const fills: FigmaFill[] = color
      ? [{ type: 'SOLID', color: { r: color.r, g: color.g, b: color.b }, opacity: color.a }]
      : []

    const lh = parseFloat(style.lineHeight)
    const ls = parseFloat(style.letterSpacing)

    return {
      type: 'TEXT',
      name: getNodeName(el),
      x,
      y,
      width,
      height,
      characters: text,
      fontSize: Math.round(parseFloat(style.fontSize)),
      fontFamily: style.fontFamily.split(',')[0].trim().replace(/['"]/g, ''),
      fontWeight: parseInt(style.fontWeight) || 400,
      lineHeightPx: isNaN(lh) ? undefined : lh,
      letterSpacingPx: isNaN(ls) ? undefined : ls,
      textAlignHorizontal: mapTextAlign(style.textAlign),
      textCase: mapTextTransform(style.textTransform),
      fills,
    }
  }

  // Frame node
  const fills = parseFills(style)
  const { strokes, strokeWeight } = parseBorders(style)
  const radii = parseBorderRadius(style)
  const effects = parseEffects(style)
  const opacity = parseFloat(style.opacity)

  const node: FigmaNode = {
    type: 'FRAME',
    name: getNodeName(el),
    x,
    y,
    width,
    height,
    fills,
    strokes,
    strokeWeight,
    opacity: isNaN(opacity) ? 1 : opacity,
    clipsContent: style.overflow !== 'visible',
    ...radii,
    effects,
    children: [],
  }

  // Recurse children
  for (const child of el.children) {
    if (isSvgElement(child)) {
      node.children!.push(serializeSvg(child, rect.left, rect.top))
    } else if (child instanceof HTMLElement) {
      const childNode = serializeElement(child, rect.left, rect.top)
      if (childNode) node.children!.push(childNode)
    }
  }

  return node
}

/** Serialize all .pdf-page elements under the given root into Figma-compatible JSON. */
export function domToFigma(root: HTMLElement): FigmaExport {
  const pageEls = root.querySelectorAll<HTMLElement>('.pdf-page')
  const pages: FigmaNode[] = []

  for (const pageEl of pageEls) {
    const pageRect = pageEl.getBoundingClientRect()
    const node = serializeElement(pageEl, pageRect.left, pageRect.top)
    if (node) {
      node.x = 0
      node.y = 0
      pages.push(node)
    }
  }

  return { version: 1, pages }
}
