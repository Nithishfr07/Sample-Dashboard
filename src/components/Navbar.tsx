
import React from 'react';
import { useUser } from '../context/UserContext';
import { Moon, Sun, LogOut, Settings, User, Download } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { state, updateUser, logout } = useUser();
  const user = state.user;

  const toggleTheme = () => {
    const newTheme = user?.theme === 'light' ? 'dark' : 'light';
    updateUser({ theme: newTheme });
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleDownloadData = () => {
    const userData = {
      name: user?.name,
      email: user?.email,
      company: user?.company,
      industry: user?.industry,
      companySize: user?.companySize,
      theme: user?.theme,
      dashboardLayout: user?.dashboardLayout,
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('User data downloaded successfully!');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            SaaS Dashboard
          </h1>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            title={`Switch to ${user?.theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {user?.theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          {/* Download Data */}
          <button
            onClick={handleDownloadData}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            title="Download user data"
          >
            <Download className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <NotificationDropdown />

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-slate-700">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.company}
              </p>
            </div>
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
              <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
