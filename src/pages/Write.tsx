import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Image, List, Bold, Italic, Link as LinkIcon } from 'lucide-react';

const Write: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  return (
    <div className="p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">New Entry</h1>
          <button className="btn btn-primary flex items-center gap-2">
            <Save size={18} />
            Save Entry
          </button>
        </div>
        
        <div className="card">
          <input
            type="text"
            placeholder="Entry Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl font-semibold bg-transparent border-0 focus:outline-none mb-4"
          />
          
          <div className="border-y border-surface-200 dark:border-surface-700 py-2 mb-4">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                <Bold size={18} />
              </button>
              <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                <Italic size={18} />
              </button>
              <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                <LinkIcon size={18} />
              </button>
              <div className="w-px h-6 bg-surface-200 dark:bg-surface-700 mx-2" />
              <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                <List size={18} />
              </button>
              <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded">
                <Image size={18} />
              </button>
            </div>
          </div>
          
          <textarea
            placeholder="Start writing your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[calc(100vh-400px)] bg-transparent border-0 focus:outline-none resize-none"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Write;