import { useState } from 'react'
import { snapdom } from '@zumer/snapdom'

type Status = 'idle' | 'exporting' | 'copied' | 'error'

export function useExportJpg() {
  const [status, setStatus] = useState<Status>('idle')

  const copyJpg = async (pdfRef: React.RefObject<HTMLDivElement | null>) => {
    const container = pdfRef.current
    if (!container) return

    setStatus('exporting')

    try {
      await Promise.all([
        document.fonts.load('400 1em Inter'),
        document.fonts.load('500 1em Inter'),
        document.fonts.load('600 1em Inter'),
      ])
      await document.fonts.ready
      await new Promise(resolve => setTimeout(resolve, 100))

      const pageElements = container.querySelectorAll<HTMLElement>('.pdf-page')
      if (pageElements.length === 0) return

      const canvases: HTMLCanvasElement[] = []
      for (const page of pageElements) {
        const result = await snapdom(page, {
          scale: 3,
          outerShadows: true,
          embedFonts: true,
        })
        canvases.push(await result.toCanvas())
      }

      // Stitch canvases into a single tall image
      const width = canvases[0].width
      const totalHeight = canvases.reduce((sum, c) => sum + c.height, 0)
      const stitched = document.createElement('canvas')
      stitched.width = width
      stitched.height = totalHeight
      const ctx = stitched.getContext('2d')!
      let y = 0
      for (const c of canvases) {
        ctx.drawImage(c, 0, y)
        y += c.height
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        stitched.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('toBlob failed'))),
          'image/png',
        )
      })

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])

      setStatus('copied')
    } catch (err) {
      console.error('Copy as JPG failed:', err)
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 2000)
  }

  return { copyJpg, status }
}
