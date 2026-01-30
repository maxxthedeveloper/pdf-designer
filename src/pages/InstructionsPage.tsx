import styles from './InstructionsPage.module.css'

const steps = [
  {
    number: '1',
    title: 'Start a Claude Code session',
    description:
      'Open Claude Code and describe the PDF you want to create. Share your source material, text, or reference docs.',
  },
  {
    number: '2',
    title: 'Preview and iterate',
    description:
      'As Claude Code works, the preview updates live in the Editor tab. Give feedback, request changes, and iterate until it looks right.',
  },
  {
    number: '3',
    title: 'Export your PDF',
    description:
      'Head to the Editor tab and click Export PDF. Your document downloads ready to share.',
  },
]

const examplePrompts = [
  'Change the title to "Solana Mobile Roadmap"',
  'Add a section about our key initiatives with icons',
  'Update the design tokens to match our brand colors',
  'Add a new page with our team and contact info',
  'Replace the content with the text from this document',
]

const figmaSteps = [
  {
    number: '1',
    title: 'Install the companion plugin',
    description:
      'In Figma, go to Plugins \u2192 Development \u2192 Import plugin from manifest. Select the manifest.json file inside the figma-plugin/ folder.',
  },
  {
    number: '2',
    title: 'Export from the editor',
    description:
      'Open the Editor tab and click Export to Figma. The design is serialized and copied to your clipboard as JSON.',
  },
  {
    number: '3',
    title: 'Import into Figma',
    description:
      'Run the PDF Designer Import plugin in Figma, paste the JSON, and click Import Design. Editable layers appear on your canvas.',
  },
]

export default function InstructionsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Design polished PDFs with Claude Code
          </h1>
          <p className={styles.tagline}>
            No design tools needed. Describe what you want, preview it live, and export when ready.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={styles.steps}>
            {steps.map((step) => (
              <div key={step.number} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div>
                  <h3 className={styles.stepName}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Example prompts</h2>
          <div className={styles.prompts}>
            {examplePrompts.map((prompt, i) => (
              <div key={i} className={styles.prompt}>
                &ldquo;{prompt}&rdquo;
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Export to Figma</h2>
          <p className={styles.sectionDesc}>
            Bring your design into Figma as editable layers &mdash; text, icons, colors, and layout all transfer over.
          </p>
          <div className={styles.steps}>
            {figmaSteps.map((step) => (
              <div key={step.number} className={styles.step}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div>
                  <h3 className={styles.stepName}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
