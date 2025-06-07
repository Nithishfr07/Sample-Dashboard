
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { simulateApiCall } from '../utils/dummyData';
import OnboardingStep1 from '../components/OnboardingStep1';
import OnboardingStep2 from '../components/OnboardingStep2';
import OnboardingStep3 from '../components/OnboardingStep3';
import toast from 'react-hot-toast';

interface OnboardingData {
  name: string;
  email: string;
  company: string;
  industry: string;
  companySize: string;
  theme: 'light' | 'dark';
  dashboardLayout: 'grid' | 'list';
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { state, completeOnboarding } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: state.user?.name || '',
    email: state.user?.email || '',
    company: '',
    industry: '',
    companySize: '',
    theme: 'light',
    dashboardLayout: 'grid',
  });

  const handleStep1Complete = (data: { name: string; email: string }) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: { company: string; industry: string; companySize: string }) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3Complete = async (data: { theme: 'light' | 'dark'; dashboardLayout: 'grid' | 'list' }) => {
    setLoading(true);
    
    try {
      const finalData = { ...onboardingData, ...data };
      
      // Simulate API call to save onboarding data
      await simulateApiCall('/onboarding', finalData);
      
      // Update user context
      completeOnboarding(finalData);
      
      toast.success('Welcome to your dashboard! 🎉');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToStep1 = () => setCurrentStep(1);
  const handleBackToStep2 = () => setCurrentStep(2);

  const getProgressPercentage = () => (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setup Your Account</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStep} of 3
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round(getProgressPercentage())}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-8 space-x-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                  step <= currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-16 h-1 mx-2 transition-all duration-200 ${
                    step < currentStep ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Onboarding Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {currentStep === 1 && (
            <OnboardingStep1
              data={{ name: onboardingData.name, email: onboardingData.email }}
              onNext={handleStep1Complete}
            />
          )}
          {currentStep === 2 && (
            <OnboardingStep2
              data={{
                company: onboardingData.company,
                industry: onboardingData.industry,
                companySize: onboardingData.companySize,
              }}
              onNext={handleStep2Complete}
              onBack={handleBackToStep1}
            />
          )}
          {currentStep === 3 && (
            <OnboardingStep3
              data={{
                theme: onboardingData.theme,
                dashboardLayout: onboardingData.dashboardLayout,
              }}
              onComplete={handleStep3Complete}
              onBack={handleBackToStep2}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
