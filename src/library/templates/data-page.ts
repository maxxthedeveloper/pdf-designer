import type { Section, HeroSection, TextBlockSection, FooterSection } from '../../content/types'
import type { TemplateDefinition } from '../template-types'
import { solanaFooter } from '../blocks/navigation/solana-footer'
import { solanaAccentBar } from '../blocks/navigation/solana-accent-bar'

interface DataPageSlots {
  heading?: HeroSection | TextBlockSection
  data: Section | Section[]
  footer?: FooterSection
}

export const dataPage: TemplateDefinition<DataPageSlots> = {
  meta: {
    id: 'data-page',
    name: 'Data Page',
    description: 'Analysis page with tables, bullet lists, and text blocks. Used for comparison documents.',
    category: 'comparison',
    slotNames: ['heading', 'data', 'footer'],
  },
  accentBar: solanaAccentBar.create(),
  slots: [
    {
      name: 'heading',
      description: 'Optional page title or hero',
      accepts: ['hero', 'text-block'],
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
    const sections: Section[] = []

    if (slots.heading) sections.push(slots.heading)

    const data = Array.isArray(slots.data) ? slots.data : [slots.data]
    sections.push(...data)

    sections.push(slots.footer ?? solanaFooter.create())

    return sections
  },
  preview: () => dataPage.assemble({
    heading: {
      type: 'text-block',
      title: 'Analysis Section',
      body: 'Detailed comparison data and supporting analysis for the topic at hand.',
    },
    data: [
      {
        type: 'table',
        title: 'Comparison',
        columns: ['Metric', 'Option A', 'Option B'],
        rows: [
          ['Throughput', '65,000 TPS', '15 TPS'],
          ['Finality', '400ms', '6 min'],
          ['Cost per Tx', '$0.00025', '$4.50'],
        ],
      },
      {
        type: 'bullet-list',
        title: 'Key Takeaways',
        groups: [
          { label: 'Advantages', items: ['Lower cost at scale', 'Faster settlement times'] },
          { label: 'Considerations', items: ['Network maturity', 'Tooling ecosystem'] },
        ],
      },
    ],
  }),
}
