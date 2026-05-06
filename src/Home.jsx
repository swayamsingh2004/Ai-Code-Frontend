import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import CodeEditor from './CodeEditor'
import ReviewResult from './ReviewResult'

export default function Home() {
  const [code, setCode]         = useState('')
  const [language, setLanguage] = useState('javascript')
  const [result, setResult]     = useState(null)
  const [loading, setLoading]   = useState(false)

  async function handleReview() {
    if (!code.trim()) { toast.error('Paste some code first'); return }
    setLoading(true)
    try {
      const r = await axios.post('https://ai-code-xto9.onrender.com/api/review', { code, language })
      setResult(r.data.data)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Review failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="typescript">TypeScript</option>
      </select>

      <CodeEditor code={code} setCode={setCode} language={language} />

      <button onClick={handleReview} disabled={loading}>
        {loading ? 'Reviewing…' : '🔍 Review My Code'}
      </button>

      <ReviewResult result={result} />
    </div>
  )
}