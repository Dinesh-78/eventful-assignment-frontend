'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp, 

  DollarSign,

  Activity,
  Bell,
  Settings,
  Download,
  Filter,
  PlayCircle,
  Instagram,
  Youtube,
  Twitter,
  Music,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock dashboard data
const dashboardData = {
  user: {
    name: "Emma Stone",
    category: "Hollywood Actress",
    avatar: "ES",
    isVerified: true
  },
  
  // Key metrics
  metrics: {
    totalFans: {
      value: 2400000,
      change: 12.5,
      trend: 'up'
    },
    profileViews: {
      value: 1850000,
      change: 8.3,
      trend: 'up'
    },
    engagement: {
      value: 94.2,
      change: -2.1,
      trend: 'down'
    },
    earnings: {
      value: 45000,
      change: 18.7,
      trend: 'up'
    }
  },

  // Recent activity
  recentActivity: [
    {
      id: 1,
      type: 'new_fan',
      message: '500 new fans joined today',
      timestamp: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      type: 'content',
      message: 'Your latest post reached 1.2M views',
      timestamp: '4 hours ago',
      icon: Eye
    },
    {
      id: 3,
      type: 'engagement',
      message: '15K new likes on your content',
      timestamp: '6 hours ago',
      icon: Heart
    },
    {
      id: 4,
      type: 'message',
      message: '23 new fan messages received',
      timestamp: '8 hours ago',
      icon: MessageCircle
    }
  ],

  // Platform stats
  platformStats: [
    {
      platform: 'Instagram',
      followers: '15.2M',
      engagement: '8.5%',
      posts: 847,
      reach: '12.3M',
      icon: Instagram,
      color: 'text-pink-600',
      growth: 5.2
    },
    {
      platform: 'YouTube',
      followers: '890K',
      engagement: '12.1%',
      posts: 45,
      reach: '2.1M',
      icon: Youtube,
      color: 'text-red-600',
      growth: 15.7
    },
    {
      platform: 'Twitter',
      followers: '2.1M',
      engagement: '6.8%',
      posts: 1234,
      reach: '5.4M',
      icon: Twitter,
      color: 'text-blue-600',
      growth: 3.1
    },
    {
      platform: 'Spotify',
      followers: '1.2M',
      engagement: '25.3%',
      posts: 12,
      reach: '890K',
      icon: Music,
      color: 'text-green-600',
      growth: 22.4
    }
  ],

  // Top content
  topContent: [
    {
      id: 1,
      title: 'Behind the scenes from Poor Things',
      type: 'video',
      platform: 'Instagram',
      views: '2.1M',
      likes: '450K',
      comments: '12K',
      shares: '5.2K',
      engagement: '21.4%'
    },
    {
      id: 2,
      title: 'La La Land memories',
      type: 'post',
      platform: 'Instagram',
      views: '1.8M',
      likes: '380K',
      comments: '8.9K',
      shares: '3.1K',
      engagement: '18.2%'
    },
    {
      id: 3,
      title: 'Q&A with fans',
      type: 'video',
      platform: 'YouTube',
      views: '950K',
      likes: '89K',
      comments: '4.5K',
      shares: '2.1K',
      engagement: '15.8%'
    }
  ],

  // Fan demographics
  fanDemographics: {
    ageGroups: [
      { range: '18-24', percentage: 35 },
      { range: '25-34', percentage: 40 },
      { range: '35-44', percentage: 20 },
      { range: '45+', percentage: 5 }
    ],
    topCountries: [
      { country: 'United States', percentage: 45 },
      { country: 'United Kingdom', percentage: 15 },
      { country: 'Canada', percentage: 12 },
      { country: 'Australia', percentage: 8 },
      { country: 'Germany', percentage: 6 }
    ]
  }
};

const Cdashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {dashboardData.user.name}
              </h1>
              <p className="text-gray-600">
                Here is what happening with your profile today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Time Period Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Time Period:</span>
            <div className="flex gap-1">
              {['24h', '7d', '30d', '90d'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Fans</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(dashboardData.metrics.totalFans.value)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2">
                {dashboardData.metrics.totalFans.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm ml-1 ${
                  dashboardData.metrics.totalFans.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {dashboardData.metrics.totalFans.change}%
                </span>
                <span className="text-sm text-gray-600 ml-1">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNumber(dashboardData.metrics.profileViews.value)}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 ml-1">
                  {dashboardData.metrics.profileViews.change}%
                </span>
                <span className="text-sm text-gray-600 ml-1">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.metrics.engagement.value}%
                  </p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-600 ml-1">
                  {Math.abs(dashboardData.metrics.engagement.change)}%
                </span>
                <span className="text-sm text-gray-600 ml-1">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${formatNumber(dashboardData.metrics.earnings.value)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 ml-1">
                  {dashboardData.metrics.earnings.change}%
                </span>
                <span className="text-sm text-gray-600 ml-1">vs last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>
                  Your performance across different social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.platformStats.map((platform, index) => {
                    const IconComponent = platform.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <IconComponent className={`h-6 w-6 ${platform.color}`} />
                          <div>
                            <h4 className="font-medium">{platform.platform}</h4>
                            <p className="text-sm text-gray-600">
                              {platform.followers} followers
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {platform.engagement} engagement
                            </Badge>
                            <div className="flex items-center">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600 ml-1">
                                {platform.growth}%
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {platform.reach} reach
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Content */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>
                  Your best performing posts from the last week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.topContent.map((content) => (
                    <div key={content.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <PlayCircle className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{content.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{content.views} views</span>
                          <span>{content.likes} likes</span>
                          <span>{content.comments} comments</span>
                          <Badge variant="outline">{content.engagement}</Badge>
                        </div>
                      </div>
                      <Badge variant="secondary">{content.platform}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Activity and Fan Demographics */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-gray-600">{activity.timestamp}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Fan Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Fan Demographics</CardTitle>
                <CardDescription>
                  Age groups of your fan base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.fanDemographics.ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{group.range}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${group.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{group.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>
                  Where your fans are located
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.fanDemographics.topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{country.country}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-600 rounded-full"
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{country.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cdashboard;
