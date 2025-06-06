import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MetricsPanel from '../components/dashboard/MetricsPanel';
import AnalyticsPanel from '../components/dashboard/AnalyticsPanel';
import ActivityPanel from '../components/dashboard/ActivityPanel';
import ProjectsPanel from '../components/dashboard/ProjectsPanel';
import WriteModal from '../components/modals/WriteModal';
import { Clock, Trophy, Target, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const streakData = {
    currentStreak: 7,
    longestStreak: 15,
    pointsToday: 120,
    totalPoints: 1250,
  };

  return (
    <>
      <div className="p-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{getGreeting()}, John</h1>
                <p className="text-surface-600 dark:text-surface-400 flex items-center gap-2">
                  <Clock size={16} />
                  <span>Last journal entry was 2 hours ago</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-surface-800/50 rounded-xl backdrop-blur-sm border border-surface-200/50 dark:border-surface-700/50">
                  <Trophy size={20} className="text-primary-500" />
                  <div>
                    <div className="text-sm font-medium">Current Streak</div>
                    <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      {streakData.currentStreak} days
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsWriteModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
                >
                  Write Today's Entry
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div 
              className="card-glass"
              {...fadeIn}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-surface-600 dark:text-surface-400">Current Streak</p>
                  <h3 className="text-2xl font-bold mt-1">{streakData.currentStreak} days</h3>
                </div>
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Trophy size={24} className="text-primary-500" />
                </div>
              </div>
              <div className="mt-4 h-1 bg-surface-200 dark:bg-surface-700 rounded-full">
                <motion.div 
                  className="h-full bg-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(streakData.currentStreak / 15) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-surface-500 mt-2">8 days until next milestone</p>
            </motion.div>

            <motion.div 
              className="card-glass"
              {...fadeIn}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-surface-600 dark:text-surface-400">Points Today</p>
                  <h3 className="text-2xl font-bold mt-1">{streakData.pointsToday}</h3>
                </div>
                <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                  <Target size={24} className="text-accent-500" />
                </div>
              </div>
              <div className="mt-4 h-1 bg-surface-200 dark:bg-surface-700 rounded-full">
                <motion.div 
                  className="h-full bg-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="text-xs text-surface-500 mt-2">30 points until daily goal</p>
            </motion.div>

            <motion.div 
              className="card-glass"
              {...fadeIn}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-surface-600 dark:text-surface-400">Total Points</p>
                  <h3 className="text-2xl font-bold mt-1">{streakData.totalPoints}</h3>
                </div>
                <div className="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                  <TrendingUp size={24} className="text-secondary-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success-500">↑ 12%</span>
                  <span className="text-surface-500">vs last week</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="card-glass"
              {...fadeIn}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-surface-600 dark:text-surface-400">Longest Streak</p>
                  <h3 className="text-2xl font-bold mt-1">{streakData.longestStreak} days</h3>
                </div>
                <div className="p-2 bg-success-100 dark:bg-success-900/30 rounded-lg">
                  <Trophy size={24} className="text-success-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs text-surface-500">
                  Achieved on March 1, 2024
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              className="lg:col-span-2"
              {...fadeIn} 
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <AnalyticsPanel />
            </motion.div>
            
            <motion.div 
              {...fadeIn} 
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ProjectsPanel />
            </motion.div>
            
            <motion.div 
              {...fadeIn} 
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <ActivityPanel />
            </motion.div>
          </div>
        </div>
      </div>

      <WriteModal 
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
      />
    </>
  );
};

export default Dashboard;