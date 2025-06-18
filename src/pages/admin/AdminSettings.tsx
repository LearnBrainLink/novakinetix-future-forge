
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Shield, Users, Mail, Bell, Database, Lock, Eye, Edit, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

export default function AdminSettings() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('admins');

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admin users:', error);
    } finally {
      setLoading(false);
    }
  };

  const settingSections = [
    {
      id: 'admins',
      title: 'Admin Management',
      description: 'Manage administrator accounts and permissions',
      icon: Shield,
      color: 'red'
    },
    {
      id: 'users',
      title: 'User Settings',
      description: 'Global user settings and permissions',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Email and system notification settings',
      icon: Bell,
      color: 'yellow'
    },
    {
      id: 'email',
      title: 'Email Configuration',
      description: 'SMTP settings and email templates',
      icon: Mail,
      color: 'green'
    },
    {
      id: 'security',
      title: 'Security Settings',
      description: 'Authentication and security configurations',
      icon: Lock,
      color: 'purple'
    },
    {
      id: 'database',
      title: 'Database Management',
      description: 'Database maintenance and backups',
      icon: Database,
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'from-red-500 to-red-600',
      blue: 'from-blue-500 to-blue-600',
      yellow: 'from-yellow-500 to-yellow-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const renderAdminManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Administrator Accounts</h3>
          <p className="text-gray-600">Manage admin users and their permissions</p>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Admin
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
              </div>
            ) : (
              admins.map(admin => (
                <div key={admin.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {admin.full_name?.charAt(0) || admin.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{admin.full_name || 'No name'}</h4>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                      <p className="text-xs text-gray-500">
                        Added {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">System Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Settings</CardTitle>
            <CardDescription>General platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">User Registration</p>
                <p className="text-sm text-gray-600">Allow new user signups</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Verification</p>
                <p className="text-sm text-gray-600">Require email verification</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Internships</p>
                <p className="text-sm text-gray-600">Show internships to non-users</p>
              </div>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Security Settings</CardTitle>
            <CardDescription>Authentication and security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Require 2FA for admins</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-gray-600">Auto logout after inactivity</p>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>Never</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password Policy</p>
                <p className="text-sm text-gray-600">Minimum password requirements</p>
              </div>
              <Button size="sm" variant="outline">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-2">System configuration and administration</p>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingSections.map(section => (
          <Card 
            key={section.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              activeSection === section.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(section.color)} text-white`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Settings Content */}
      <Card>
        <CardContent className="p-6">
          {activeSection === 'admins' && renderAdminManagement()}
          
          {activeSection !== 'admins' && (
            <div className="text-center py-12">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {settingSections.find(s => s.id === activeSection)?.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {settingSections.find(s => s.id === activeSection)?.description}
              </p>
              <p className="text-sm text-gray-500">
                Configuration panel coming soon. Advanced settings will be available here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {activeSection === 'admins' && renderSystemSettings()}
    </div>
  );
}
