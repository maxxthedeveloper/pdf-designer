import type { DocumentDefinition } from './types'

export const document: DocumentDefinition = {
  meta: {
    title: 'Solana Development Platform',
    exportFilename: 'Solana-Development-Platform.pdf',
  },
  accentBar: {
    gradient: 'linear-gradient(90deg, #9945FF 0%, #14F195 50%, #00C2FF 100%)',
    height: 3,
  },
  sections: [
    {
      type: 'hero',
      title: 'Solana\nDevelopment\nPlatform',
      description:
        'SDP offers an API-driven, enterprise-grade gateway to Solana, allowing institutions to seamlessly launch and manage tokenized products, payments, and compliance.',
    },
    {
      type: 'two-column',
      left: {
        type: 'feature-list',
        title: 'Why Solana\nDevelopment Platform',
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
        type: 'feature-list',
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
    },
    { type: 'divider' },
    {
      type: 'two-column',
      left: {
        type: 'feature-list',
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
        type: 'feature-list',
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
    },
    {
      type: 'cards',
      items: [
        {
          title: 'The Design Partner Opportunity',
          description:
            "We are inviting a select group of Enterprise and Financial Institution clients to shape the future of Solana's institutional stack as SDP Design Partners.",
        },
        {
          title: 'Interested in becoming a Design Partner?',
          description:
            'Contact the Solana Foundation team to schedule a V1 Sandbox demo and discuss the March launch timeline.',
        },
      ],
    },
    {
      type: 'footer',
      brand: 'Solana Foundation',
      logo: 'solana-logo',
    },
  ],
}
