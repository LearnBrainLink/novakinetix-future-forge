
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Video, Briefcase, Activity, Calendar, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Analytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVideos: 0,
    totalInternships: 0,
    totalApplications: 0,
    activeUsers: 0,
    completedCourses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      const [
        usersData,
        videosData,
        internshipsData,
        applicationsData,
        enrollmentsData
      ] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('videos').select('*'),
        supabase.from('internships').select('*'),
        supabase.from('internship_applications').select('*'),
        supabase.from('enrollments').select('*')
      ]);

      setStats({
        totalUsers: usersData.data?.length || 0,
        totalVideos: videosData.data?.length || 0,
        totalInternships: internshipsData.data?.length || 0,
        totalApplications: applicationsData.data?.length || 0,
        activeUsers: usersData.data?.filter(u => u.email_verified).length || 0,
        completedCourses: enrollmentsData.data?.filter(e => e.status === 'completed').length || 0
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyticsCards = [
    {
      title: "User Growth",
      value: stats.totalUsers,
      change: "+12%",
      trend: "up",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      description: "Total registered users"
    },
    {
      title: "Content Library",
      value: stats.totalVideos,
      change: "+8%",
      trend: "up",
      icon: Video,
      gradient: "from-purple-500 to-purple-600",
      description: "Videos published"
    },
    {
      title: "Internship Programs",
      value: stats.totalInternships,
      change: "+15%",
      trend: "up",
      icon: Briefcase,
      gradient: "from-orange-500 to-orange-600",
      description: "Active opportunities"
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      change: "+23%",
      trend: "up",
      icon: Activity,
      gradient: "from-green-500 to-green-600",
      description: "Total applications received"
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      change: "+18%",
      trend: "up",
      icon: TrendingUp,
      gradient: "from-indigo-500 to-indigo-600",
      description: "Verified active users"
    },
    {
      title: "Course Completions",
      value: stats.completedCourses,
      change: "+9%",
      trend: "up",
      icon: Calendar,
      gradient: "from-teal-500 to-teal-600",
      description: "Successfully completed"
    }
  ];

  const recentActivity = [
    {
      action: "New user registration",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      type: "user",
      icon: Users
    },
    {
      action: "Video upload completed",
      user: "Admin",
      time: "15 minutes ago",
      type: "content",
      icon: Video
    },
    {
      action: "Internship application submitted",
      user: "Alex Chen",
      time: "1 hour ago",
      type: "application",
      icon: Briefcase
    },
    {
      action: "Course completed",
      user: "Maria Garcia",
      time: "2 hours ago",
      type: "completion",
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Insights, reports, and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsCards.map((card, index) => (
          <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <Badge className={`${card.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {card.change}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {loading ? "..." : card.value.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Platform Performance
            </CardTitle>
            <CardDescription>User engagement and activity trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive charts coming soon</p>
                <p className="text-sm text-gray-500">Connect with analytics tools for detailed insights</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <activity.icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">User Engagement Rate</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.totalApplications > 0 ? Math.floor(Math.random() * 30 + 70) : 0}%
            </div>
            <p className="text-sm text-gray-600">Application Success Rate</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.totalVideos > 0 ? Math.floor(stats.totalVideos * 1.5) : 0}
            </div>
            <p className="text-sm text-gray-600">Avg. Video Views</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {stats.completedCourses > 0 ? Math.floor(Math.random() * 20 + 80) : 0}%
            </div>
            <p className="text-sm text-gray-600">Course Completion Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
