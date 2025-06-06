import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Calendar, Plus } from 'lucide-react';
import { Goal } from '../../types';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goal: Omit<Goal, 'id' | 'progress' | 'daysCompleted'>) => void;
}

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [totalDays, setTotalDays] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [milestones, setMilestones] = useState<{ title: string; completed: boolean }[]>([]);
  const [milestoneInput, setMilestoneInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category,
      totalDays: parseInt(totalDays),
      startDate,
      endDate,
      status: 'active',
      milestones: milestones.map((m, index) => ({ ...m, id: index.toString() }))
    });
    onClose();
  };

  const handleAddMilestone = () => {
    if (milestoneInput.trim()) {
      setMilestones([...milestones, { title: milestoneInput.trim(), completed: false }]);
      setMilestoneInput('');
    }
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            className="relative w-full max-w-lg bg-white dark:bg-surface-800 rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-semibold">Create New Goal</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full pl-10 input"
                      placeholder="Enter goal title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full input min-h-[100px]"
                    placeholder="Describe your goal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full input"
                  >
                    <option value="">Select a category</option>
                    <option value="Writing Habit">Writing Habit</option>
                    <option value="Project Goals">Project Goals</option>
                    <option value="Mindfulness">Mindfulness</option>
                    <option value="Learning">Learning</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={totalDays}
                    onChange={(e) => setTotalDays(e.target.value)}
                    className="w-full input"
                    placeholder="Enter number of days"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-200" size={18} />
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full pl-10 input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-200" size={18} />
                      <input
                        type="date"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full pl-10 input"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Milestones</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={milestoneInput}
                      onChange={(e) => setMilestoneInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMilestone())}
                      className="flex-1 input"
                      placeholder="Add milestone"
                    />
                    <button
                      type="button"
                      onClick={handleAddMilestone}
                      className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  {milestones.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg bg-surface-50 dark:bg-surface-700/50"
                        >
                          <span className="text-sm">{milestone.title}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveMilestone(index)}
                            className="p-1 hover:text-error-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
                  Create Goal
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GoalModal; 