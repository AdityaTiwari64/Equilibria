import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Tag } from 'lucide-react';

const entries = [
  {
    id: '1',
    title: 'Morning Reflections',
    excerpt: 'Today started with a beautiful sunrise...',
    date: '2024-03-15',
    category: 'Personal',
    mood: 'Peaceful',
  },
  {
    id: '2',
    title: 'Project Milestones',
    excerpt: 'Made significant progress on the new feature...',
    date: '2024-03-14',
    category: 'Work',
    mood: 'Accomplished',
  },
  {
    id: '3',
    title: 'Weekly Goals Review',
    excerpt: 'Reviewing my progress towards monthly objectives...',
    date: '2024-03-13',
    category: 'Goals',
    mood: 'Focused',
  },
];

const Entries: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Journal Entries</h1>
          <p className="text-surface-600 dark:text-surface-400">
            Browse and search through your past journal entries
          </p>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search entries..."
              className="w-full pl-10 input"
            />
          </div>
          
          <button className="btn btn-outline flex items-center gap-2">
            <Filter size={18} />
            Filter
          </button>
        </div>
        
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ y: -2 }}
            >
              <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">{entry.excerpt}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-surface-500">
                  <Calendar size={14} />
                  <span>{entry.date}</span>
                </div>
                <div className="flex items-center gap-1 text-surface-500">
                  <Tag size={14} />
                  <span>{entry.category}</span>
                </div>
                <span className="text-surface-500">Mood: {entry.mood}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Entries;