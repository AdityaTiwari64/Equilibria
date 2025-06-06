import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, IndianRupee, Calendar, Tag } from 'lucide-react';
import { Expense } from '../../types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      category,
      description,
      date,
      paymentMethod,
      tags
    });
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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
              <h2 className="text-xl font-semibold">Add New Expense</h2>
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
                  <label className="block text-sm font-medium mb-2">Amount</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-10 input"
                      placeholder="0.00"
                    />
                  </div>
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
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full input"
                    placeholder="Enter expense description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-200" size={18} />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full input"
                  >
                    <option value="">Select payment method</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Mobile Payment">Mobile Payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="w-full pl-10 input"
                        placeholder="Add tags"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium"
                    >
                      Add
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="p-0.5 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            <X size={14} />
                          </button>
                        </span>
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
                  Add Expense
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExpenseModal; 