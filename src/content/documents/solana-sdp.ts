import type { DocumentDefinition } from '../types'
import { coverPage } from '../../library/templates/cover-page'
import { heroSplit } from '../../library/blocks/heroes/hero-split'
import { twoColWithDivider } from '../../library/blocks/features/two-col-with-divider'
import { solanaAccentBar } from '../../library/blocks/navigation/solana-accent-bar'

export const document: DocumentDefinition = {
  meta: {
    title: 'Solana Development Platform',
    exportFilename: 'Solana-Development-Platform.pdf',
  },
  accentBar: solanaAccentBar.create(),
  sections: coverPage.assemble({
    hero: heroSplit.create({
      title: 'Solana\nDevelopment\nPlatform',
      description:
        'SDP offers an API-driven, enterprise-grade gateway to Solana, allowing institutions to seamlessly launch and manage tokenized products, payments, and compliance.',
    }),
    content: [
      ...twoColWithDivider.create({
        dividerBefore: false,
        left: {
          title: 'Why SDP?',
          description:
            "SDP simplifies integration by unifying Solana's token standards, infrastructure, and developer tools into a single enterprise-ready platform.",
          features: [
            {
              icon: 'server',
              name: 'Standardized Environments',
              description:
                'Pre-configured devnet sandbox that mirrors production standards.',
            },
            {
              icon: 'component',
              name: 'Plug-and-play Infrastructure',
              description:
                'Direct access to vetted RPC providers, indexers, custody-ready API, and many more.',
            },
            {
              icon: 'shield-check',
              name: 'Enterprise-Focused Tooling',
              description:
                'Tools designed to support compliance, permissioning, privacy on a public high-speed rails.',
            },
          ],
        },
        right: {
          title: 'Potential Use Cases',
          description:
            "Unlock enterprise use cases like asset issuance, programmable payments, and stablecoin design with Solana's permissioning and speed.",
          features: [
            {
              icon: 'database',
              name: 'Asset Tokenization',
              description:
                'Issue and manage real world assets with automated compliance built in at the mint level.',
            },
            {
              icon: 'credit-card',
              name: 'Institutional Payments',
              description:
                'Deploy stablecoin-based payment logics with control, permissioning and sub-second finality.',
            },
            {
              icon: 'coin',
              name: 'Stablecoins',
              description:
                'Design a GENIUS-compliant stablecoin using allowlist, delegation and other permissioning tools.',
            },
          ],
        },
      }),
      ...twoColWithDivider.create({
        left: {
          title: 'The Commitment',
          features: [
            {
              icon: 'chat',
              name: 'Strategic Co-marketing',
              description:
                'Commit to a joint announcement during the SDP Launch (Target: Mid March). Your brand will be featured as a pioneer in our PR and global marketing materials.',
            },
            {
              icon: 'check-square',
              name: 'Sandbox Validation',
              description:
                'Gain early access to the v1 sandbox to test the environment and sub-second finality.',
            },
            {
              icon: 'compass',
              name: 'Collaborative Exploration',
              description:
                'Explore joint Go-To-Market (GTM) opportunities where SDP and our infrastructure design partners can assist in scaling your solution.',
            },
          ],
        },
        right: {
          title: 'Solana Foundation Support',
          description:
            'As a Design Partner, you are not building in a vacuum. The Solana Foundation will work closely with you to support:',
          features: [
            {
              icon: 'globe',
              name: 'Ecosystem Partnerships',
              description:
                'Direct introductions to infrastructure partners (custody, analytics, on-ramps).',
            },
            {
              icon: 'code',
              name: 'Technical Advisory',
              description:
                'Dedicated access to Foundation engineers to troubleshoot architectural design.',
            },
            {
              icon: 'target',
              name: 'Strategic Alignment',
              description:
                'Priority consideration for ecosystem growth initiatives and co-marketing budget.',
            },
          ],
        },
      }),
    ],
    cta: {
      type: 'cards',
      items: [
        {
          title: 'Design Partner Program',
          description:
            "We're working with a small number of institutions to shape SDP before general availability. If this document reached you, we'd like you to be one of them.",
        },
      ],
    },
  }),
}
