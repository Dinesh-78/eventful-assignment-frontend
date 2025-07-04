'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Bell, 
  Search, 
  Filter,
  Star,
  UserMinus,
  Settings,
  Bookmark,
  Calendar,
  Eye,
  TrendingUp,
  Music,
  Film,
  Camera,
  Award,
  MapPin,
  Clock,
  MoreVertical,
  Grid3X3,
  List,
  SortAsc,
  UserPlus
} from 'lucide-react';

// Mock fan dashboard data
const fanData = {
  user: {
    name: "Sarah Johnson",
    username: "@sarahj_fan",
    joinedDate: "2022-01-15",
    totalFollowing: 12,
    favoriteCount: 5,
    avatar: "SJ"
  },

  // Following statistics
  stats: {
    totalCelebrities: 12,
    activeToday: 8,
    newUpdates: 15,
    messagesReceived: 3
  },

  // Followed celebrities
  followedCelebrities: [
    {
      id: 1,
      name: "Emma Stone",
      category: "Hollywood Actress",
      handle: "@emmastone",
      followers: "15.2M",
      isOnline: true,
      isFavorite: true,
      followedDate: "2023-01-15",
      lastPost: "2 hours ago",
      newUpdates: 3,
      rating: 4.9,
      tags: ["Acting", "Drama", "Comedy"],
      recentActivity: "Posted behind-the-scenes from Poor Things"
    },
    {
      id: 2,
      name: "Taylor Swift",
      category: "Music Artist",
      handle: "@taylorswift",
      followers: "89.1M",
      isOnline: false,
      isFavorite: true,
      followedDate: "2023-02-20",
      lastPost: "1 day ago",
      newUpdates: 2,
      rating: 5.0,
      tags: ["Music", "Pop", "Country"],
      recentActivity: "Released new single 'Midnight Rain'"
    },
    {
      id: 3,
      name: "Chris Evans",
      category: "Marvel Actor",
      handle: "@chrisevans",
      followers: "18.5M",
      isOnline: true,
      isFavorite: false,
      followedDate: "2023-03-10",
      lastPost: "5 hours ago",
      newUpdates: 1,
      rating: 4.8,
      tags: ["Acting", "Marvel", "Action"],
      recentActivity: "Shared workout routine video"
    },
    {
      id: 4,
      name: "Zendaya",
      category: "Multi-talent",
      handle: "@zendaya",
      followers: "25.3M",
      isOnline: true,
      isFavorite: true,
      followedDate: "2023-04-05",
      lastPost: "30 minutes ago",
      newUpdates: 4,
      rating: 4.9,
      tags: ["Acting", "Fashion", "Music"],
      recentActivity: "Fashion week behind the scenes"
    },
    {
      id: 5,
      name: "Ryan Reynolds",
      category: "Comedy Actor",
      handle: "@vancityreynolds",
      followers: "20.7M",
      isOnline: false,
      isFavorite: false,
      followedDate: "2023-05-12",
      lastPost: "3 hours ago",
      newUpdates: 2,
      rating: 4.7,
      tags: ["Comedy", "Acting", "Deadpool"],
      recentActivity: "Funny Deadpool 3 set photos"
    },
    {
      id: 6,
      name: "Dua Lipa",
      category: "Music Artist",
      handle: "@dualipa",
      followers: "27.8M",
      isOnline: true,
      isFavorite: true,
      followedDate: "2023-06-01",
      lastPost: "1 hour ago",
      newUpdates: 3,
      rating: 4.8,
      tags: ["Music", "Pop", "Dance"],
      recentActivity: "Studio session for new album"
    }
  ],

  // Recent updates from followed celebrities
  recentUpdates: [
    {
      id: 1,
      celebrityName: "Zendaya",
      celebrityHandle: "@zendaya",
      type: "post",
      content: "Getting ready for tonight's premiere! ✨",
      timestamp: "30 minutes ago",
      likes: "890K",
      comments: "12.4K",
      platform: "Instagram"
    },
    {
      id: 2,
      celebrityName: "Emma Stone",
      celebrityHandle: "@emmastone",
      type: "video",
      content: "Behind the scenes from Poor Things filming",
      timestamp: "2 hours ago",
      likes: "1.2M",
      comments: "15.6K",
      platform: "Instagram"
    },
    {
      id: 3,
      celebrityName: "Taylor Swift",
      celebrityHandle: "@taylorswift",
      type: "music",
      content: "New single 'Midnight Rain' is now available!",
      timestamp: "1 day ago",
      likes: "2.1M",
      comments: "89.3K",
      platform: "Spotify"
    },
    {
      id: 4,
      celebrityName: "Chris Evans",
      celebrityHandle: "@chrisevans",
      type: "video",
      content: "Morning workout routine for Captain America shape",
      timestamp: "5 hours ago",
      likes: "675K",
      comments: "8.9K",
      platform: "YouTube"
    }
  ]
};

const Fdashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredCelebrities = fanData.followedCelebrities.filter(celebrity => {
    const matchesSearch = celebrity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         celebrity.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'favorites') return matchesSearch && celebrity.isFavorite;
    if (filterBy === 'online') return matchesSearch && celebrity.isOnline;
    return matchesSearch;
  });

  const toggleFavorite = (celebrityId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggle favorite for celebrity ${celebrityId}`);
  };

  const unfollowCelebrity = (celebrityId: number) => {
    // In a real app, this would update the backend
    console.log(`Unfollow celebrity ${celebrityId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {fanData.user.name}
              </h1>
              <p className="text-gray-600">
                Stay updated with your favorite celebrities
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{fanData.stats.totalCelebrities}</div>
              <div className="text-sm text-gray-600">Following</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{fanData.stats.activeToday}</div>
              <div className="text-sm text-gray-600">Active Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Bell className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{fanData.stats.newUpdates}</div>
              <div className="text-sm text-gray-600">New Updates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-6 w-6 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{fanData.stats.messagesReceived}</div>
              <div className="text-sm text-gray-600">Messages</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="following" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="updates">Recent Updates</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          {/* Following Tab */}
          <TabsContent value="following" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search celebrities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterBy === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterBy('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterBy === 'favorites' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterBy('favorites')}
                    >
                      Favorites
                    </Button>
                    <Button
                      variant={filterBy === 'online' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterBy('online')}
                    >
                      Online
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    >
                      {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Celebrities Grid/List */}
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredCelebrities.map((celebrity) => (
                <Card key={celebrity.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-600">
                            {celebrity.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {celebrity.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      {/* Celebrity Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 truncate">
                              {celebrity.name}
                            </h3>
                            <p className="text-sm text-gray-600">{celebrity.category}</p>
                            <p className="text-xs text-gray-500">{celebrity.handle}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleFavorite(celebrity.id)}
                            >
                              <Heart 
                                className={`h-4 w-4 ${
                                  celebrity.isFavorite ? 'fill-current text-red-500' : ''
                                }`} 
                              />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => unfollowCelebrity(celebrity.id)}
                            >
                              <UserMinus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {celebrity.followers}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            {celebrity.rating}
                          </div>
                          {celebrity.newUpdates > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {celebrity.newUpdates} new
                            </Badge>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {celebrity.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {celebrity.lastPost}
                          </div>
                          <p className="mt-1 truncate">{celebrity.recentActivity}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Updates Tab */}
          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
                <CardDescription>
                  Latest posts and activities from celebrities you follow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fanData.recentUpdates.map((update) => (
                    <div key={update.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">
                            {update.celebrityName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{update.celebrityName}</h4>
                            <span className="text-sm text-gray-500">{update.celebrityHandle}</span>
                            <Badge variant="outline" className="text-xs">
                              {update.platform}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mb-2">{update.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {update.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {update.comments}
                            </div>
                            <span className="text-xs">{update.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Celebrities</CardTitle>
                <CardDescription>
                  Quick access to your most loved stars
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fanData.followedCelebrities
                    .filter(celebrity => celebrity.isFavorite)
                    .map((celebrity) => (
                      <Card key={celebrity.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <span className="text-xl font-bold text-blue-600">
                                {celebrity.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900">{celebrity.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{celebrity.category}</p>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
                              <Users className="h-4 w-4" />
                              {celebrity.followers}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Fdashboard;
