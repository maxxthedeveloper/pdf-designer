import type { ComponentType } from 'react'
import type { FooterSection, IconName } from '../../../content/types'
import { iconRegistry } from '../../../icons/registry'

interface FooterProps {
  section: FooterSection
}

export default function Footer({ section }: FooterProps) {
  let LogoComponent: ComponentType | null = null
  if (typeof section.logo === 'string') {
    LogoComponent = iconRegistry[section.logo as IconName] ?? null
  } else if (section.logo) {
    LogoComponent = section.logo
  }

  return (
    <div className="pdf-footer">
      <span className="footer-brand">{section.brand}</span>
      {LogoComponent && (
        <div className="footer-logo">
          <LogoComponent />
        </div>
      )}
    </div>
  )
}
