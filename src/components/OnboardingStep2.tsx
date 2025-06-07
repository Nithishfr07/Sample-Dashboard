
import React, { useState } from 'react';
import { validateRequired, getValidationMessage } from '../utils/validation';
import { industryOptions, companySizeOptions } from '../utils/dummyData';
import { Building, Users, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';

interface Step2Data {
  company: string;
  industry: string;
  companySize: string;
}

interface OnboardingStep2Props {
  data: Step2Data;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = useState<Step2Data>(data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!validateRequired(formData.company)) {
      newErrors.company = 'Company name is required';
    }
    
    if (!validateRequired(formData.industry)) {
      newErrors.industry = 'Please select an industry';
    }
    
    if (!validateRequired(formData.companySize)) {
      newErrors.companySize = 'Please select company size';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Tell us about your company
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This helps us customize your dashboard experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                errors.company
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/10'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700'
              } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              placeholder="Enter your company name"
            />
          </div>
          {errors.company && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
          )}
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry
          </label>
          <div className="relative">
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none ${
                errors.industry
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/10'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700'
              } text-gray-900 dark:text-white cursor-pointer`}
            >
              <option value="">Select your industry</option>
              {industryOptions.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.industry}</p>
          )}
        </div>

        {/* Company Size */}
        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Size
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none ${
                errors.companySize
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/10'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700'
              } text-gray-900 dark:text-white cursor-pointer`}
            >
              <option value="">Select company size</option>
              {companySizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          {errors.companySize && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.companySize}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
