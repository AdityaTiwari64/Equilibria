import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  PenTool,
  BookOpen,
  Calendar,
  Target,
  ChevronLeft,
  DollarSign,
  GraduationCap
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut?: () => void;
  displayName?: string;
  photoURL?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSignOut, displayName, photoURL }) => {
  const location = useLocation();
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', active: location.pathname === '/' },
    { icon: DollarSign, label: 'Expenses', path: '/expenses', active: location.pathname === '/expenses' },
    { icon: GraduationCap, label: 'Academic', path: '/academic', active: location.pathname === '/academic' },
    { icon: PenTool, label: 'Write', path: '/write', active: location.pathname === '/write' },
    { icon: BookOpen, label: 'Entries', path: '/entries', active: location.pathname === '/entries' },
    { icon: Calendar, label: 'Goals', path: '/goals', active: location.pathname === '/goals', badge: 2 },
  ];
  const bottomNavItems = [
    { icon: Settings, label: 'Settings', path: '/settings', active: location.pathname === '/settings' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help', active: location.pathname === '/help' },
    { icon: LogOut, label: 'Log out', path: '/logout', active: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />
          {/* Sidebar Drawer */}
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 z-50 flex flex-col overflow-hidden"
          >
            <div className="h-[61px] flex items-center px-4 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600 text-white font-bold">E</div>
                <h1 className="text-xl font-semibold tracking-tight">Equilibria</h1>
              </div>
            </div>
            {displayName && (
              <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-200 dark:border-surface-700">
                <img
                  src={photoURL || 'https://ui-avatars.com/api/?name=User'}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover border"
                />
                {displayName && <span className="font-medium text-surface-700 dark:text-surface-200">{displayName}</span>}
              </div>
            )}
            <div className="flex-1 overflow-y-auto py-6 px-3">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      item.active 
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="whitespace-nowrap">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span 
                        className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 px-2 py-0.5 rounded-full"
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="px-3 text-xs font-medium text-surface-500 uppercase tracking-wider">
                  Categories
                </h3>
                <div className="mt-2 space-y-1">
                  <Link to="/category/personal" className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold mr-3">
                      P
                    </div>
                    <span>Personal</span>
                  </Link>
                  <Link to="/category/work" className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold mr-3">
                      W
                    </div>
                    <span>Work</span>
                  </Link>
                  <Link to="/category/goals" className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold mr-3">
                      G
                    </div>
                    <span>Goals</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-surface-200 dark:border-surface-700">
              <div className="space-y-1">
                {bottomNavItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50"
                  >
                    <item.icon size={18} className="mr-3" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </Link>
                ))}
              </div>
              <button
                onClick={onSignOut}
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-surface-100 dark:hover:bg-surface-700/50 w-full"
              >
                <LogOut size={18} className="mr-3" />
                <span className="whitespace-nowrap">Log out</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;