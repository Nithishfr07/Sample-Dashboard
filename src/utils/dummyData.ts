
import axios from 'axios';

// Dummy API simulation
export const simulateApiCall = async (endpoint: string, data?: any): Promise<any> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
  
  console.log(`API Call to ${endpoint}:`, data);
  
  // Simulate different responses based on endpoint
  switch (endpoint) {
    case '/login':
      return { success: true, message: 'Login successful', token: 'dummy-jwt-token' };
    case '/onboarding':
      return { success: true, message: 'Onboarding completed successfully' };
    case '/dashboard-stats':
      return getDashboardStats();
    default:
      return { success: true, data: data };
  }
};

export const getDashboardStats = () => ({
  teamMembers: 12,
  activeProjects: 8,
  notifications: 24,
  revenue: 45250,
  tasksPending: 18,
});

export const getChartData = () => ({
  weeklyActivity: [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 52 },
    { day: 'Wed', value: 38 },
    { day: 'Thu', value: 61 },
    { day: 'Fri', value: 55 },
    { day: 'Sat', value: 28 },
    { day: 'Sun', value: 35 },
  ],
  monthlyGrowth: [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
  ],
  taskCompletion: [
    { name: 'Completed', value: 70, color: '#10B981' },
    { name: 'In Progress', value: 20, color: '#6366F1' },
    { name: 'Pending', value: 10, color: '#F59E0B' },
  ],
  trafficData: [
    { date: '2024-01', visitors: 1200 },
    { date: '2024-02', visitors: 1900 },
    { date: '2024-03', visitors: 1700 },
    { date: '2024-04', visitors: 2400 },
    { date: '2024-05', visitors: 2100 },
    { date: '2024-06', visitors: 2800 },
  ],
});

export const getTeamMembers = () => [
  { id: 1, name: 'Priya Sharma', role: 'Product Manager', avatar: '👩‍💼', status: 'online' },
  { id: 2, name: 'Arjun Patel', role: 'Lead Developer', avatar: '👨‍💻', status: 'online' },
  { id: 3, name: 'Meera Reddy', role: 'UI/UX Designer', avatar: '🎨', status: 'away' },
  { id: 4, name: 'Vikram Singh', role: 'Data Analyst', avatar: '📊', status: 'offline' },
  { id: 5, name: 'Kavya Gupta', role: 'Marketing Lead', avatar: '📈', status: 'online' },
];

export const getNotifications = () => [
  {
    id: 1,
    message: 'New team member joined your workspace',
    timestamp: '2 minutes ago',
    type: 'info',
    read: false,
  },
  {
    id: 2,
    message: 'Project "Mobile App" deadline approaching',
    timestamp: '1 hour ago',
    type: 'warning',
    read: false,
  },
  {
    id: 3,
    message: 'Monthly report is ready for review',
    timestamp: '3 hours ago',
    type: 'success',
    read: true,
  },
];

export const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'E-commerce',
  'Manufacturing',
  'Real Estate',
  'Consulting',
  'Media & Entertainment',
  'Non-profit',
  'Other',
];

export const companySizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees',
];
