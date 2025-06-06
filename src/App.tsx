import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Academic from './pages/Academic';
import Write from './pages/Write';
import Entries from './pages/Entries';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Help from './pages/Help';
import ChatbotButton from './components/ChatbotButton';
import Auth from './components/Auth/Auth';

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/auth" replace />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated ? (
        <>
          <Header />
          <div className="flex-1 flex">
            <Sidebar />
            <main className="flex-1 transition-all duration-300 lg:ml-16">
              <Routes>
                <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/expenses" element={<ProtectedRoute element={<Expenses />} />} />
                <Route path="/academic" element={<ProtectedRoute element={<Academic />} />} />
                <Route path="/write" element={<ProtectedRoute element={<Write />} />} />
                <Route path="/entries" element={<ProtectedRoute element={<Entries />} />} />
                <Route path="/goals" element={<ProtectedRoute element={<Goals />} />} />
                <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
                <Route path="/help" element={<ProtectedRoute element={<Help />} />} />
              </Routes>
            </main>
          </div>
          <ChatbotButton />
        </>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;