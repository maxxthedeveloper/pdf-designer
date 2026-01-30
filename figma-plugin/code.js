/**
 * PDF Designer Import — Figma Plugin (main thread)
 *
 * Receives serialized DOM JSON from the PDF Designer web app
 * and creates corresponding editable Figma layers.
 */

figma.showUI(__html__, { width: 420, height: 340 })

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'import') {
    try {
      const data = msg.data
      if (!data || !data.pages || !Array.isArray(data.pages)) {
        figma.ui.postMessage({ type: 'error', message: 'Invalid JSON format' })
        return
      }

      if (data.version !== 1) {
        figma.ui.postMessage({
          type: 'error',
          message: 'Unsupported format version: ' + data.version,
        })
        return
      }

      let xOffset = 0
      for (const pageData of data.pages) {
        pageData.x = xOffset
        pageData.y = 0
        const node = await createNode(pageData, figma.currentPage)
        if (node) xOffset += node.width + 100
      }

      figma.viewport.scrollAndZoomIntoView(figma.currentPage.children)
      figma.ui.postMessage({
        type: 'success',
        message: `Imported ${data.pages.length} page(s)`,
      })
    } catch (e) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Import failed: ' + (e.message || e),
      })
    }
  }
}

// ── Font weight → Figma style name mapping ──

const WEIGHT_MAP = {
  100: 'Thin',
  200: 'Extra Light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold',
  800: 'Extra Bold',
  900: 'Black',
}

function weightToStyle(weight) {
  if (WEIGHT_MAP[weight]) return WEIGHT_MAP[weight]
  const rounded = Math.round(weight / 100) * 100
  return WEIGHT_MAP[rounded] || 'Regular'
}

// ── Node creation ──

async function createNode(data, parent) {
  if (!data || !data.type) return null

  let node

  if (data.type === 'TEXT') {
    node = figma.createText()

    // Load the font before setting characters
    const weight = data.fontWeight || 400
    const style = weightToStyle(weight)
    const family = (data.fontFamily || 'Inter').split(',')[0].trim()

    try {
      await figma.loadFontAsync({ family, style })
      node.fontName = { family, style }
    } catch {
      // Fallback to Inter Regular if requested font is unavailable
      try {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
        node.fontName = { family: 'Inter', style: 'Regular' }
      } catch {
        await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' })
        node.fontName = { family: 'Roboto', style: 'Regular' }
      }
    }

    node.characters = data.characters || ' '

    if (data.fontSize) node.fontSize = data.fontSize

    if (data.lineHeightPx) {
      node.lineHeight = { value: data.lineHeightPx, unit: 'PIXELS' }
    }

    if (data.letterSpacingPx) {
      node.letterSpacing = { value: data.letterSpacingPx, unit: 'PIXELS' }
    }

    if (data.textAlignHorizontal) {
      node.textAlignHorizontal = data.textAlignHorizontal
    }

    if (data.textCase && data.textCase !== 'ORIGINAL') {
      node.textCase = data.textCase
    }

    // Resize text to match the source dimensions
    node.textAutoResize = 'NONE'
    node.resize(Math.max(1, data.width || 100), Math.max(1, data.height || 20))

    // Text color via fills
    if (data.fills && data.fills.length > 0) {
      node.fills = data.fills
    }
  } else if (data.type === 'SVG' && data.svg) {
    try {
      node = figma.createNodeFromSvg(data.svg)
      node.resize(Math.max(1, data.width || 24), Math.max(1, data.height || 24))
    } catch {
      // SVG import can fail; create a placeholder rectangle
      node = figma.createRectangle()
      node.resize(Math.max(1, data.width || 24), Math.max(1, data.height || 24))
      node.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
    }
  } else {
    // FRAME
    node = figma.createFrame()
    node.resize(Math.max(1, data.width || 100), Math.max(1, data.height || 100))
    node.clipsContent = data.clipsContent ?? false

    // Remove default white fill
    node.fills = []

    // Create children
    if (data.children && Array.isArray(data.children)) {
      for (const child of data.children) {
        await createNode(child, node)
      }
    }
  }

  // ── Common properties ──

  node.name = data.name || 'Layer'
  node.x = data.x || 0
  node.y = data.y || 0

  if (data.fills && data.type !== 'TEXT') {
    try {
      node.fills = data.fills
    } catch {
      // Some fill types may not be supported; skip
    }
  }

  if (data.strokes && data.strokes.length > 0) {
    try {
      node.strokes = data.strokes
    } catch {
      // Skip unsupported stroke configs
    }
  }

  if (data.strokeWeight !== undefined && data.strokeWeight > 0) {
    node.strokeWeight = data.strokeWeight
  }

  if (data.opacity !== undefined && data.opacity < 1) {
    node.opacity = data.opacity
  }

  // Border radius (frames only)
  if (node.type === 'FRAME') {
    if (data.topLeftRadius) node.topLeftRadius = data.topLeftRadius
    if (data.topRightRadius) node.topRightRadius = data.topRightRadius
    if (data.bottomRightRadius) node.bottomRightRadius = data.bottomRightRadius
    if (data.bottomLeftRadius) node.bottomLeftRadius = data.bottomLeftRadius
  }

  // Effects (shadows)
  if (data.effects && data.effects.length > 0) {
    try {
      node.effects = data.effects
    } catch {
      // Skip unsupported effects
    }
  }

  parent.appendChild(node)
  return node
}
