import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Write from './pages/Write';
import Entries from './pages/Entries';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Auth from './pages/Auth';
import Expenses from './pages/Expenses';
import Academic from './pages/Academic';
import Chatbot from './components/Chatbot';
import { Menu } from 'lucide-react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setDisplayName(user?.displayName || user?.email || '');
      setPhotoURL(user?.photoURL || '');
    });
    return () => unsubscribe();
  }, []);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSignOut = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setDisplayName('');
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Header onMenuClick={openSidebar} onSignOut={handleSignOut} displayName={displayName} photoURL={photoURL} />
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} onSignOut={handleSignOut} displayName={displayName} photoURL={photoURL} />
          <main className="flex-1 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Dashboard displayName={displayName} />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/academic" element={<Academic />} />
              <Route path="/write" element={<Write />} />
              <Route path="/entries" element={<Entries />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Chatbot />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;