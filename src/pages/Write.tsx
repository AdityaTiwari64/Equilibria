import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Image, List, Bold, Italic, Link as LinkIcon } from 'lucide-react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

async function analyzeWithGemini(text: string) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY;
  const prompt = `Summarize the following text and give a mood rating (e.g., Happy, Sad, Neutral, etc.):\n\n${text}`;
  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error('Gemini API error');
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
}

const Write: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Toolbar actions (for demo, just insert markdown-like tags)
  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = document.getElementById('main-write-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const newText = content.substring(0, start) + before + selected + after + content.substring(end);
    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = end + before.length;
    }, 0);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const analysis = await analyzeWithGemini(content);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-surface-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Write</h2>
      <input
        className="w-full mb-4 p-2 border rounded-lg text-xl font-semibold"
        placeholder="Title (optional)"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="border-y border-surface-200 dark:border-surface-700 py-2 mb-4">
        <div className="flex items-center gap-2">
          <button type="button" className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded" onClick={() => insertAtCursor('**', '**')} title="Bold"><Bold size={18} /></button>
          <button type="button" className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded" onClick={() => insertAtCursor('_', '_')} title="Italic"><Italic size={18} /></button>
          <button type="button" className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded" onClick={() => insertAtCursor('- ')} title="List"><List size={18} /></button>
          <button type="button" className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded" onClick={() => insertAtCursor('![alt text](image-url)')} title="Image"><Image size={18} /></button>
          <button type="button" className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded" onClick={() => insertAtCursor('[', '](url)')} title="Link"><LinkIcon size={18} /></button>
        </div>
      </div>
      <textarea
        id="main-write-textarea"
        className="w-full h-60 p-3 border rounded-lg bg-white dark:bg-surface-700 resize-y"
        placeholder="Start writing your thoughts..."
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <div className="flex gap-4 mt-4">
        <button
          className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2"
          disabled={loading || !content.trim()}
        >
          <Save size={18} />
          Save Entry
        </button>
        <button
          type="button"
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          disabled={loading || !content.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze with Gemini'}
        </button>
      </div>
      {result && (
        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">Gemini Analysis</h3>
          <pre className="whitespace-pre-wrap text-primary-900 dark:text-primary-100">{result}</pre>
        </div>
      )}
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
};

export default Write;