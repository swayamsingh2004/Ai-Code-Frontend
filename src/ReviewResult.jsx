import Editor from '@monaco-editor/react'
export default function ReviewResult({ result }) {
  if (!result) return null

  const severityColor = {
    critical:   'border-red-500 bg-red-950',
    warning:    'border-yellow-500 bg-yellow-950',
    suggestion: 'border-blue-500 bg-blue-950',
  }

  return (
    <div>
      {/* Score */}
      <div className="text-4xl font-bold text-center">
        {result.score}/10
      </div>

      {/* Summary */}
      <p>{result.summary}</p>

      {/* Issues */}
      {result.issues.map((issue, i) => (
        <div key={i} className={`border-l-4 p-3 ${severityColor[issue.severity]}`}>
          <div className="font-bold">{issue.severity.toUpperCase()} {issue.line ? `— Line ${issue.line}` : ''}</div>
          <div>{issue.message}</div>
          <div className="text-green-400">Fix: {issue.fix}</div>
        </div>
      ))}

      {/* Positives */}
      {result.positives.map((p, i) => (
        <div key={i} className="text-green-400">✅ {p}</div>
      ))}

      {/* Improved Code */}
      <Editor
        height="300px"
        value={result.improvedCode}
        theme="vs-dark"
        options={{ readOnly: true }}
      />
    </div>
  )
}