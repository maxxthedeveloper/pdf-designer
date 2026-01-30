import type { DocumentDefinition } from '../types'
import { titleDataPage } from '../../library/templates/title-data-page'
import { dataPage } from '../../library/templates/data-page'
import { heroSplit } from '../../library/blocks/heroes/hero-split'
import { solanaAccentBar } from '../../library/blocks/navigation/solana-accent-bar'

export const document: DocumentDefinition = {
  meta: {
    title: 'Solana vs Base: Payments Infrastructure Comparison',
    exportFilename: 'Solana-vs-Base-Payments-Infrastructure-Comparison.pdf',
  },
  accentBar: solanaAccentBar.create(),
  pages: [
    // ── Page 1: Title + Executive Summary + Network Architecture ──
    {
      sections: titleDataPage.assemble({
        hero: heroSplit.create({
          title: 'Solana vs Base:\nPayments Infrastructure\nComparison',
          description:
            'A comprehensive comparison of Solana and Base for institutional payments infrastructure, covering architecture, performance, costs, reliability, and ecosystem maturity.',
        }),
        summary: {
          type: 'text-block',
          title: 'Executive Summary',
          body: 'For payments use cases requiring institutional-grade reliability, Solana maintains clear advantages in battle-tested infrastructure, throughput, finality, and ecosystem maturity. Base offers a compelling value proposition for teams prioritizing Coinbase distribution and EVM compatibility, but carries meaningful centralization risks and architectural constraints that institutions should weigh carefully.',
        },
        data: {
          type: 'table',
          title: '1. Network Architecture & Design Philosophy',
          columns: ['Dimension', 'Solana', 'Base'],
          rows: [
            ['Type', 'Layer 1', 'Layer 2 (Optimistic Rollup on Ethereum)'],
            ['Consensus', 'Proof of History + Tower BFT (Soon Alpenglow)', 'Inherits Ethereum security via OP Stack'],
            ['Confirmation', 'Native <1 sec optimistic finality, soon 150ms w/Alpenglow', 'Ethereum L1 (~13 min finality)'],
            ['Finality', 'Native ~12.8 sec finality, soon 150ms w/Alpenglow', 'Ethereum L1 (~13 min finality)'],
            ['Block Time', '400ms', '2 seconds'],
          ],
          footnote: 'Key Distinction: Solana processes and finalizes transactions natively. Base batches transactions to Ethereum, meaning "confirmed" on Base ≠ "final" until settled on L1. For payments requiring true finality (not just soft confirmation), this is a critical difference.',
        },
      }),
    },

    // ── Page 2: Throughput & Performance + Costs ──
    {
      sections: dataPage.assemble({
        data: [
          {
            type: 'table',
            title: '2. Throughput & Performance',
            columns: ['Metric', 'Solana', 'Base'],
            rows: [
              ['Real-World TPS', '~1,100-1,500 (avg 2025)', '~96 (current)'],
              ['Max Observed TPS', '5,289 (production)', '1,412 (max recorded)'],
              ['Theoretical Max TPS', '65,000 (100K+ in mainnet stress tests)', '3,571'],
              ['2025 Transactions', '121 billion', '~5.2 billion'],
            ],
            footnote: "Solana's August 2025 stress test demonstrated 107,000+ TPS, with Firedancer benchmarks exceeding 1M TPS in testnet. Helius Labs CEO stated $0,050-100,000 TPS is achievable in production for real operations like transfers and oracle updates. For payments: Solana's throughput is ~15x higher than Base in practice. This matters for high-frequency settlement, payroll distribution, or marketplace payouts at scale.",
          },
          {
            type: 'table',
            title: '3. Costs',
            columns: ['Metric', 'Solana', 'Base'],
            rows: [
              ['Average Transaction Fee', '$0.00025', '~$0.01'],
              ['Median Fee (Q1 2025)', '$0.0013', 'Varies with L1 congestion'],
              ['Fee Volatility', 'Low (localized fee markets)', 'Medium (tied to L1 gas)'],
            ],
            footnote: 'Solana fees are ~10x cheaper than Base and remain stable even during high load due to localized fee markets. Base fees can spike when Ethereum L1 is congested (as seen during October 2025 flash crash event when L2 fees spiked over 400x).',
          },
          {
            type: 'table',
            title: '4. Reliability & Uptime',
            description: 'Solana',
            columns: ['Period', 'Major Outages', 'Notes'],
            rows: [
              ['2021-2022', '7 major outages', 'Network maturation phase'],
              ['Feb 2024', '1 (5 hours)', 'LoadedPrograms bug'],
              ['Feb 2024 - Jan 2026', '0 major outages', '16+ months continuous uptime'],
            ],
          },
        ],
      }),
    },

    // ── Page 3: Reliability (Base) + Assessment + Decentralization ──
    {
      sections: dataPage.assemble({
        data: [
          {
            type: 'table',
            description: 'Base',
            columns: ['Date', 'Duration', 'Cause'],
            rows: [
              ['Sept 2023', '45 min', 'First outage post-launch'],
              ['Aug 2025', '29 min', '"Unsafe head delay" (sequencer fault)'],
              ['Oct 2025', '>100 min', 'AWS outage (infrastructure dependency)'],
            ],
            footnote: "The October 2025 AWS incident is particularly concerning: Base's centralized sequencer runs on AWS, creating a single point of failure. When AWS had DNS issues, Base experienced \"limited network capacity\" and degraded transaction inclusion.",
          },
          {
            type: 'text-block',
            title: 'Assessment',
            body: "Solana's historical outages are acknowledged, but 16+ months of continuous operation under record load demonstrates meaningful infrastructure maturation. Base's AWS dependency introduces correlated failure risk absent in Solana's distributed validator model.",
          },
          {
            type: 'table',
            title: '5. Decentralization & Censorship Resistance',
            columns: ['Metric', 'Solana', 'Base'],
            rows: [
              ['Nakamoto Coefficient', '20', '1'],
              ['Validators/Sequencers', '800+ consensus nodes', '1 (Coinbase)'],
              ['Geographic Distribution', '45+ countries, 200+ cities', 'AWS-dependent'],
              ['Censorship Resistance', 'Permissionless', 'Sequencer can censor'],
              ['Decentralization Stage', 'Native L1', 'Stage 1 (June 2025)'],
            ],
          },
          {
            type: 'text-block',
            title: 'Critical Risk for Base',
            body: [
              'A single sequencer (operated by Coinbase) orders all transactions. While Base achieved "Stage 1 Decentralization" in June 2025 (adding fault proofs and a security council), the sequencer remains centralized.',
              'Coinbase can theoretically censor transactions. Sequencer downtime = network downtime. No permissionless block production. Users must fall back to expensive L1 "escape hatch" if sequencer fails.',
            ],
          },
        ],
      }),
    },

    // ── Page 4: Decentralization analysis + Stablecoin Ecosystem ──
    {
      sections: dataPage.assemble({
        data: [
          {
            type: 'text-block',
            title: 'Decentralization Context',
            body: [
              'Base has announced an upcoming token and sequencer decentralization roadmap, but the timeline remains "five years" per November 2025 statements.',
              "Solana's Nakamoto Coefficient of 20 means 20 independent validators would need to collude to censor the network. Validators span 45+ countries across 100+ data center providers.",
            ],
          },
          {
            type: 'table',
            title: '6. Stablecoin Ecosystem (Payments Infrastructure)',
            description: 'Supply',
            columns: ['Metric', 'Solana', 'Base'],
            rows: [
              ['Stablecoin Market Cap', '$14.7B', '$4.6B'],
              ['USDC Supply', '$8B (54% dominance)', '$4.4B (95% dominance)'],
              ['YoY Growth', '+170%', 'Growing'],
            ],
          },
          {
            type: 'table',
            description: 'Volume & Activity',
            columns: ['Metric', 'Solana', 'Base'],
            rows: [
              ['2025 P2P Volume', '$1 trillion+', 'Not disclosed'],
              ['Monthly Transactions', '200M+ (stablecoins)', 'Lower'],
              ['Active Addresses (daily)', '3-4M (stablecoin users)', '~458K total'],
              ['USDC Transfer Volume', 'Surpassed Ethereum (Dec 2025)', 'N/A'],
            ],
            footnote: "Solana's stablecoin transaction volume surpassed Ethereum in late 2025 despite having 7x less USDC supply — indicating higher velocity and actual usage for payments vs. holding.",
          },
          {
            type: 'bullet-list',
            title: 'Payment Integrations',
            groups: [
              {
                label: 'Solana',
                items: [
                  'Visa stablecoin settlement (USDC, EURC) — production',
                  'Mastercard + MoonPay (3.5B cards linked)',
                  'Cash App USDC (Jack Dorsey\'s Block)',
                  'Helio + Shopify instant checkout',
                  'PayPal PYUSD (higher volume on Solana than Ethereum since July 2025)',
                  'Western Union USDPT (launching 2026)',
                  'Visa card providers: Rain, Bridge, Mercuryo',
                ],
              },
              {
                label: 'Base',
                items: [
                  'Coinbase ecosystem integration',
                  'Growing DeFi integrations',
                ],
              },
            ],
          },
        ],
      }),
    },

    // ── Page 5: Developer Ecosystem + Institutional Adoption ──
    {
      sections: dataPage.assemble({
        data: [
          {
            type: 'table',
            title: '7. Developer Ecosystem & Tooling',
            columns: ['Metric', 'Solana', 'Base'],
            rows: [
              ['Language', 'Rust', 'Solidity (EVM)'],
              ['New Developers (2024)', '7,600+', 'Growing'],
              ['Monthly Active Devs', '3,200+', '726'],
              ['DEX Market Share', '81%', 'Growing'],
            ],
            footnote: 'Solana requires Rust experience for onchain smart contract development but not for general integration work. Products like JPM commercial paper trade required zero smart contract development. Base leverages EVM\'s Solidity ecosystem, lowering barriers for Ethereum developers.',
          },
          {
            type: 'bullet-list',
            title: '8. Institutional Adoption',
            groups: [
              {
                label: 'Solana',
                items: [
                  'JPMorgan: $50M commercial paper trade (Oct 2025)',
                  'Visa: Production stablecoin settlement',
                  'PayPal: PYUSD primary chain',
                  'Franklin Templeton: Fund tokenization',
                  'State Street, Paxos, Cuptail: Infrastructure deployment',
                  'VanEck, Morgan Stanley: SOL ETF filings',
                ],
              },
              {
                label: 'Base',
                items: [
                  'Coinbase: Native integration advantage',
                  'Growing institutional interest',
                  '$4.7B TVL (third-largest L2)',
                ],
              },
            ],
          },
          {
            type: 'bullet-list',
            title: '9. Risk Assessment',
            groups: [
              {
                label: 'Solana Risks',
                items: [
                  'Validator concentration: Top 25 validators control 46% of stake (improving)',
                  'Client diversity: Jito client dominant (~88%), but Firedancer and Agave add diversity',
                  'Historical outages: Addressed, but reputational concern persists',
                  'Complexity: Rust learning curve for developers',
                ],
              },
              {
                label: 'Base Risks',
                items: [
                  'Centralization: Single sequencer is fundamental architectural risk',
                  'AWS dependency: Demonstrated vulnerability (Oct 2025)',
                  'Finality delays: 1+ min settlement for true finality',
                  'Regulatory: Coinbase as operator creates single regulatory target',
                  'Sequencer censorship: Possible until decentralization (years away)',
                  'No native token: Economic alignment unclear until token launches',
                ],
              },
            ],
          },
        ],
      }),
    },

    // ── Page 6: Recommendation Matrix + Conclusion ──
    {
      sections: dataPage.assemble({
        data: [
          {
            type: 'table',
            title: '10. Recommendation Matrix',
            columns: ['Use Case', 'Recommendation', 'Rationale'],
            rows: [
              ['High-volume payment rails', 'Solana', 'TPS, finality, cost, reliability'],
              ['Cross-border remittances', 'Solana', 'Fee structure, stablecoin volume'],
              ['Institutional settlement', 'Solana', 'Visa/JPM integrations, finality'],
              ['Coinbase targeted applications', 'Base', 'Distribution, UX integration'],
              ['EVM-compatible DeFi', 'Base', 'Tooling, liquidity bridges'],
              ['Censorship-sensitive payments', 'Solana', 'Decentralization, permissionless'],
              ['Regulatory-sensitive ops', 'Solana', 'Base has Coinbase compliance; Solana has assets launched in various jurisdictions around the world'],
            ],
          },
          {
            type: 'text-block',
            title: 'Conclusion',
            body: [
              'Solana has earned its position as the leading payments infrastructure chain through 16+ months of proven reliability, 1,000+ TPS sustained throughput, sub-cent fees, and deep integrations with Visa, PayPal, and major institutions. Its historical outage narrative is outdated — the network has demonstrably matured.',
              "Base offers genuine value for teams prioritizing Coinbase ecosystem integration and EVM compatibility. However, its single-sequencer architecture represents a fundamental centralization risk that institutions must weigh. The promise of future decentralization is not a substitute for present-day infrastructure resilience.",
              'For payment use cases where reliability, speed, cost, and censorship resistance matter, Solana is the objectively stronger choice today.',
            ],
          },
          {
            type: 'text-block',
            title: 'Sources',
            body: 'Solana Network Health Report (June 2025), Helius Research, DefiLlama, CoinDesk, Bloomberg, L2Beat, Artemis Analytics, Chainalysis',
          },
        ],
      }),
    },
  ],
}
