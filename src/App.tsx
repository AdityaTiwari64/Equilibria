import React, { useState } from 'react';
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
import ChatbotButton from './components/ChatbotButton';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/auth\" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          
          <div className="flex-1 flex">
            <Sidebar isOpen={isSidebarOpen} />
            
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/academic" element={<Academic />} />
                <Route path="/write" element={<Write />} />
                <Route path="/entries" element={<Entries />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
                <Route path="*" element={<Navigate to="/\" replace />} />
              </Routes>
            </main>
          </div>
          
          <ChatbotButton />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;