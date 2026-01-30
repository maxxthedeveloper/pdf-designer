import type { DocumentDefinition } from '../content/types'

export function exportDocumentAsJson(doc: DocumentDefinition): void {
  const json = JSON.stringify(doc, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = doc.meta.exportFilename.replace(/\.pdf$/i, '.json')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

interface ValidationSuccess {
  valid: true
  doc: DocumentDefinition
}

interface ValidationError {
  valid: false
  error: string
}

type ValidationResult = ValidationSuccess | ValidationError

const VALID_SECTION_TYPES = new Set([
  'hero',
  'feature-list',
  'two-column',
  'divider',
  'cards',
  'text-block',
  'table',
  'bullet-list',
  'image',
  'footer',
])

export function validateDocumentJson(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object') {
    return { valid: false, error: 'File is not a valid JSON object' }
  }

  const obj = raw as Record<string, unknown>

  if (!obj.meta || typeof obj.meta !== 'object') {
    return { valid: false, error: 'Missing "meta" object' }
  }

  const meta = obj.meta as Record<string, unknown>
  if (typeof meta.title !== 'string' || !meta.title) {
    return { valid: false, error: 'Missing "meta.title"' }
  }
  if (typeof meta.exportFilename !== 'string' || !meta.exportFilename) {
    return { valid: false, error: 'Missing "meta.exportFilename"' }
  }

  const sections = obj.sections ?? (obj.pages as unknown[])
  if (!Array.isArray(sections) && !Array.isArray(obj.pages)) {
    return { valid: false, error: 'Document must have "sections" or "pages" array' }
  }

  // Validate section types
  const allSections: unknown[] = []
  if (Array.isArray(obj.sections)) {
    allSections.push(...obj.sections)
  }
  if (Array.isArray(obj.pages)) {
    for (const page of obj.pages) {
      if (page && typeof page === 'object' && Array.isArray((page as Record<string, unknown>).sections)) {
        allSections.push(...(page as Record<string, unknown>).sections as unknown[])
      }
    }
  }

  for (const section of allSections) {
    if (!section || typeof section !== 'object') {
      return { valid: false, error: 'Invalid section: not an object' }
    }
    const type = (section as Record<string, unknown>).type
    if (typeof type !== 'string' || !VALID_SECTION_TYPES.has(type)) {
      return { valid: false, error: `Invalid section type: "${type}"` }
    }
  }

  return { valid: true, doc: raw as DocumentDefinition }
}

export function importDocumentFromFile(): Promise<DocumentDefinition> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.style.display = 'none'
    document.body.appendChild(input)

    input.addEventListener('change', () => {
      const file = input.files?.[0]
      document.body.removeChild(input)

      if (!file) {
        reject(new Error('No file selected'))
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string)
          const result = validateDocumentJson(parsed)
          if (result.valid) {
            resolve(result.doc)
          } else {
            reject(new Error(result.error))
          }
        } catch {
          reject(new Error('File is not valid JSON'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsText(file)
    })

    // Handle cancel (user closes file picker without selecting)
    input.addEventListener('cancel', () => {
      document.body.removeChild(input)
      reject(new Error('Import cancelled'))
    })

    input.click()
  })
}
