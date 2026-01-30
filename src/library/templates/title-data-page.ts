import type { Section, HeroSection, TextBlockSection, FooterSection } from '../../content/types'
import type { TemplateDefinition } from '../template-types'
import { solanaFooter } from '../blocks/navigation/solana-footer'
import { solanaAccentBar } from '../blocks/navigation/solana-accent-bar'

interface TitleDataPageSlots {
  hero: HeroSection
  summary?: TextBlockSection
  data: Section | Section[]
  footer?: FooterSection
}

export const titleDataPage: TemplateDefinition<TitleDataPageSlots> = {
  meta: {
    id: 'title-data-page',
    name: 'Title + Data Page',
    description: 'Title page with hero, optional executive summary, and data sections. Used as the first page of comparison documents.',
    category: 'comparison',
    slotNames: ['hero', 'summary', 'data', 'footer'],
  },
  accentBar: solanaAccentBar.create(),
  slots: [
    {
      name: 'hero',
      description: 'Hero section with document title and overview',
      accepts: ['hero'],
      required: true,
    },
    {
      name: 'summary',
      description: 'Executive summary text block',
      accepts: ['text-block'],
      required: false,
    },
    {
      name: 'data',
      description: 'Data sections — tables, bullets, analysis text',
      accepts: ['table', 'bullet-list', 'text-block', 'divider'],
      required: true,
      multi: true,
    },
    {
      name: 'footer',
      description: 'Page footer',
      accepts: ['footer'],
      required: false,
      default: solanaFooter.create(),
    },
  ],
  assemble: (slots) => {
    const sections: Section[] = [slots.hero]

    if (slots.summary) sections.push(slots.summary)

    const data = Array.isArray(slots.data) ? slots.data : [slots.data]
    sections.push(...data)

    sections.push(slots.footer ?? solanaFooter.create())

    return sections
  },
  preview: () => titleDataPage.assemble({
    hero: {
      type: 'hero',
      title: 'Comparison\nReport',
      description: 'A structured analysis comparing platforms across key dimensions.',
    },
    summary: {
      type: 'text-block',
      title: 'Executive Summary',
      body: 'This report examines the technical and economic trade-offs between the two leading platforms.',
    },
    data: {
      type: 'table',
      title: 'Overview',
      columns: ['Dimension', 'Platform A', 'Platform B'],
      rows: [
        ['Speed', 'Fast', 'Moderate'],
        ['Cost', 'Low', 'High'],
        ['Ecosystem', 'Growing', 'Mature'],
      ],
      footnote: 'Data as of Q1 2025.',
    },
  }),
}
