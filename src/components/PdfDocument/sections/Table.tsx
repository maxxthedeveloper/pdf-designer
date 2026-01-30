import type { TableSection } from '../../../content/types'

interface TableProps {
  section: TableSection
}

export default function Table({ section }: TableProps) {
  return (
    <div className="comparison-table">
      {section.title && (
        <div className="section-head">
          <h2 className="section-title">{section.title}</h2>
          {section.description && (
            <p className="section-desc">{section.description}</p>
          )}
        </div>
      )}
      <table>
        <thead>
          <tr>
            {section.columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {section.footnote && (
        <p className="table-footnote">{section.footnote}</p>
      )}
    </div>
  )
}
