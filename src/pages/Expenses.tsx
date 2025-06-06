import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Plus, Filter, Calendar, Tag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ExpenseModal from '../components/modals/ExpenseModal';
import { Expense } from '../types';

const expenseData = [
  { date: 'Mon', amount: 45 },
  { date: 'Tue', amount: 30 },
  { date: 'Wed', amount: 65 },
  { date: 'Thu', amount: 25 },
  { date: 'Fri', amount: 55 },
  { date: 'Sat', amount: 40 },
  { date: 'Sun', amount: 35 },
];

const categoryData = [
  { name: 'Food', value: 35, color: '#4F46E5' },
  { name: 'Transport', value: 25, color: '#0D9488' },
  { name: 'Entertainment', value: 20, color: '#F59E0B' },
  { name: 'Shopping', value: 15, color: '#EF4444' },
  { name: 'Others', value: 5, color: '#6B7280' },
];

const Expenses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    // TODO: Implement expense creation logic
    console.log('New expense:', expense);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Expense Tracker</h1>
            <p className="text-surface-600 dark:text-surface-400">
              Track and manage your daily expenses
            </p>
          </div>
          
          <button 
            onClick={() => setIsExpenseModalOpen(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Add Expense
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400">Total Spent</p>
                <h3 className="text-2xl font-bold">₹295.00</h3>
              </div>
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <IndianRupee className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="text-error-500 mr-1" size={16} />
              <span className="text-error-500 font-medium">12%</span>
              <span className="text-surface-600 dark:text-surface-400 ml-1">vs last week</span>
            </div>
          </motion.div>

          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400">Daily Average</p>
                <h3 className="text-2xl font-bold">₹42.14</h3>
              </div>
              <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                <Calendar className="text-secondary-600 dark:text-secondary-400" size={24} />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <ArrowDownRight className="text-success-500 mr-1" size={16} />
              <span className="text-success-500 font-medium">8%</span>
              <span className="text-surface-600 dark:text-surface-400 ml-1">vs last week</span>
            </div>
          </motion.div>

          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400">Categories</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                <Tag className="text-accent-600 dark:text-accent-400" size={24} />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-surface-600 dark:text-surface-400">Most spent on Food</span>
            </div>
          </motion.div>

          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400">Budget Status</p>
                <h3 className="text-2xl font-bold">59%</h3>
              </div>
              <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-lg">
                <IndianRupee className="text-success-600 dark:text-success-400" size={24} />
              </div>
            </div>
            <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full">
              <div className="h-full w-[59%] bg-success-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2 card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Expense Trend</h2>
              <select className="text-sm px-2 py-1 rounded-lg border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={expenseData}>
                  <defs>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#4F46E5" 
                    fillOpacity={1}
                    fill="url(#colorExpense)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Expense by Category</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
};

export default Expenses;