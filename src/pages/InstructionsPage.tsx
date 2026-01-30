import styles from './InstructionsPage.module.css'

export default function InstructionsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>PDF Designer</h1>
        </header>

        <details className={styles.section} open>
          <summary className={styles.sectionTitle}>How it works</summary>
          <ol className={styles.list}>
            <li>Describe your PDF and share source material</li>
            <li>Preview updates live, tell Claude Code what to change</li>
            <li>Export PDF</li>
          </ol>
        </details>

        <details className={styles.section} open>
          <summary className={styles.sectionTitle}>Example prompts</summary>
          <div className={styles.prompts}>
            <div className={styles.prompt}>&ldquo;Add a section about our key initiatives with icons&rdquo;</div>
            <div className={styles.prompt}>&ldquo;Match the design tokens to our brand colors&rdquo;</div>
            <div className={styles.prompt}>&ldquo;Replace the content with the text from this document&rdquo;</div>
          </div>
        </details>

        <details className={styles.section}>
          <summary className={styles.sectionTitle}>Visual feedback with Agentation</summary>
          <p className={styles.sectionDesc}>
            Agentation is a React component that lets you annotate elements
            in the preview and copy structured feedback (with CSS selectors
            and positions) to paste into Claude Code.
          </p>
          <ol className={styles.list}>
            <li>Install: <code className={styles.code}>npm install agentation</code></li>
            <li>Add <code className={styles.code}>&lt;Agentation /&gt;</code> to your app root (dev only)</li>
            <li>Click elements in the preview to annotate them</li>
            <li>Copy the output and paste into Claude Code</li>
          </ol>
        </details>

        <details className={styles.section}>
          <summary className={styles.sectionTitle}>Export to Figma</summary>
          <ol className={styles.list}>
            <li>Install the Figma plugin from <code className={styles.code}>figma-plugin/manifest.json</code></li>
            <li>Click Export to Figma in the editor</li>
            <li>Paste the JSON in the Figma plugin, click Import</li>
          </ol>
        </details>
      </div>
    </div>
  )
}
