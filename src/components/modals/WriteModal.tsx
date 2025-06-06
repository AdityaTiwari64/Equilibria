import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smile, Image, Link as LinkIcon } from 'lucide-react';

interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WriteModal: React.FC<WriteModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the journal entry submission here
    console.log({ title, content, mood });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <div className="relative w-full max-w-2xl bg-white dark:bg-surface-800 rounded-xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-semibold">Write Today's Entry</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                    placeholder="Give your entry a title..."
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-2">
                    Content
                  </label>
                  <div className="relative">
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                      className="w-full px-4 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                      placeholder="Write your thoughts..."
                    />
                    <div className="absolute bottom-2 right-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="p-1.5 rounded text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                      >
                        <Image size={18} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100"
                      >
                        <LinkIcon size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    How are you feeling?
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={mood}
                      onChange={(e) => setMood(parseInt(e.target.value))}
                      className="flex-1 h-2 rounded-full bg-surface-200 dark:bg-surface-700 appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex items-center gap-2 min-w-[4rem] px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-700">
                      <Smile size={18} className="text-primary-500" />
                      <span className="font-medium">{mood}/10</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WriteModal; 