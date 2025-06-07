
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { getDashboardStats, getChartData, getTeamMembers } from '../utils/dummyData';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import Chart from '../components/Chart';
import { 
  Users, 
  Briefcase, 
  Bell, 
  DollarSign, 
  CheckSquare,
  TrendingUp,
  Palette,
  Grid,
  List,
  User,
  Badge
} from 'lucide-react';

const Dashboard = () => {
  const { state, updateUser } = useUser();
  const user = state.user;
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats(getDashboardStats());
        setChartData(getChartData());
        setTeamMembers(getTeamMembers());
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const toggleLayout = () => {
    const newLayout = user?.dashboardLayout === 'grid' ? 'list' : 'grid';
    updateUser({ dashboardLayout: newLayout });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Loading your dashboard...
            </span>
          </div>
        </div>
      </div>
    );
  }

  const isGridLayout = user?.dashboardLayout === 'grid';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Palette className="h-4 w-4" />
                <span className="capitalize">{user?.theme} mode</span>
              </div>
              <button
                onClick={toggleLayout}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                {isGridLayout ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isGridLayout ? 'List View' : 'Grid View'}
                </span>
              </button>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-slate-700 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                <p className="font-medium text-gray-900 dark:text-white">{user?.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 dark:text-white">{user?.industry}</p>
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                    {user?.companySize}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`${isGridLayout ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6' : 'space-y-4'} mb-8`}>
            <StatsCard
              title="Team Members"
              value={stats?.teamMembers || 0}
              icon={Users}
              change="+12% from last month"
              changeType="positive"
            />
            <StatsCard
              title="Active Projects"
              value={stats?.activeProjects || 0}
              icon={Briefcase}
              change="+5% from last month"
              changeType="positive"
            />
            <StatsCard
              title="Notifications"
              value={stats?.notifications || 0}
              icon={Bell}
              change="3 unread"
              changeType="neutral"
            />
            <StatsCard
              title="Revenue Generated"
              value={`$${stats?.revenue?.toLocaleString() || 0}`}
              icon={DollarSign}
              change="+28% from last month"
              changeType="positive"
            />
            <StatsCard
              title="Tasks Pending"
              value={stats?.tasksPending || 0}
              icon={CheckSquare}
              change="-15% from last week"
              changeType="positive"
            />
          </div>

          {/* Charts Section */}
          <div className={`${isGridLayout ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'} mb-8`}>
            <Chart
              type="line"
              data={chartData?.weeklyActivity || []}
              title="Weekly Activity"
              dataKey="value"
              xAxisKey="day"
            />
            <Chart
              type="bar"
              data={chartData?.monthlyGrowth || []}
              title="Monthly Growth"
              dataKey="value"
              xAxisKey="month"
            />
            <Chart
              type="pie"
              data={chartData?.taskCompletion || []}
              title="Task Completion"
              dataKey="value"
            />
            <Chart
              type="area"
              data={chartData?.trafficData || []}
              title="Website Traffic"
              dataKey="visitors"
              xAxisKey="date"
            />
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </h2>
            <div className={`${isGridLayout ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}`}>
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="text-2xl">{member.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        member.status === 'online'
                          ? 'bg-emerald-500'
                          : member.status === 'away'
                          ? 'bg-yellow-500'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
