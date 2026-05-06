import Editor from '@monaco-editor/react'

export default function CodeEditor({ code, setCode, language }) {
  return (
    <Editor
      height="400px"
      language={language}
      value={code}
      onChange={(value) => setCode(value || '')}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: 'on',
      }}
    />
  )
}