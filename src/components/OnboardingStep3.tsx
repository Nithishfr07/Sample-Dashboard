
import React, { useState } from 'react';
import { Palette, Grid, List, Moon, Sun, ArrowLeft, CheckCircle } from 'lucide-react';

interface Step3Data {
  theme: 'light' | 'dark';
  dashboardLayout: 'grid' | 'list';
}

interface OnboardingStep3Props {
  data: Step3Data;
  onComplete: (data: Step3Data) => void;
  onBack: () => void;
  loading?: boolean;
}

const OnboardingStep3: React.FC<OnboardingStep3Props> = ({ data, onComplete, onBack, loading = false }) => {
  const [formData, setFormData] = useState<Step3Data>(data);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setFormData(prev => ({ ...prev, theme }));
  };

  const handleLayoutChange = (layout: 'grid' | 'list') => {
    setFormData(prev => ({ ...prev, dashboardLayout: layout }));
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Customize your experience
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose your preferred theme and dashboard layout
        </p>
      </div>

      <div className="space-y-8">
        {/* Theme Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Theme Preference</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleThemeChange('light')}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.theme === 'light'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Sun className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Light Mode</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Clean and bright interface</div>
                </div>
              </div>
              {formData.theme === 'light' && (
                <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary-500" />
              )}
            </button>

            <button
              onClick={() => handleThemeChange('dark')}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.theme === 'dark'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Moon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</div>
                </div>
              </div>
              {formData.theme === 'dark' && (
                <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary-500" />
              )}
            </button>
          </div>
        </div>

        {/* Layout Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Grid className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Layout</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleLayoutChange('grid')}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.dashboardLayout === 'grid'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Grid className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">Grid Layout</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cards in a grid view</div>
                </div>
              </div>
              {formData.dashboardLayout === 'grid' && (
                <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary-500" />
              )}
            </button>

            <button
              onClick={() => handleLayoutChange('list')}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.dashboardLayout === 'list'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <List className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">List Layout</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Vertical list view</div>
                </div>
              </div>
              {formData.dashboardLayout === 'list' && (
                <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={handleComplete}
          disabled={loading}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Complete Setup
              <CheckCircle className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep3;
