'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MapPin, 
  Users, 
  Calendar, 
  PlayCircle, 
  Music, 
  Instagram, 
  Youtube, 
  Twitter, 
  Globe,
  Heart,
  MessageCircle,
  Share2,
  Verified,
  Trophy,
  Film,
  Headphones,
  Camera,
  ExternalLink
} from 'lucide-react';

// Mock celebrity data with platform integrations
const celebrityData = {
  id: 1,
  name: "Emma Stone",
  category: "Hollywood Actress",
  bio: "Academy Award-winning actress known for her versatile performances in films ranging from comedies to dramas. Best known for roles in La La Land, Easy A, and The Help.",
  location: "Los Angeles, CA",
  joinedDate: "2018-03-15",
  isVerified: true,
  fanCount: "2.4M",
  rating: 4.9,
  tags: ["Drama", "Comedy", "Award Winner", "La La Land", "Easy A"],
  
  // Platform stats
  platforms: {
    instagram: {
      followers: "15.2M",
      posts: 847,
      handle: "@emmastone",
      verified: true
    },
    twitter: {
      followers: "2.1M",
      tweets: 1234,
      handle: "@EmmaStone",
      verified: true
    },
    youtube: {
      subscribers: "890K",
      videos: 45,
      channel: "Emma Stone Official",
      verified: true
    },
    spotify: {
      monthlyListeners: "1.2M",
      tracks: 12,
      verified: true
    }
  },

  // Recent content from platforms
  recentContent: {
    instagram: [
      {
        id: 1,
        type: "post",
        caption: "Behind the scenes from my latest project! 🎬",
        likes: "1.2M",
        comments: "15.4K",
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        type: "story",
        caption: "Getting ready for tonight's premiere ✨",
        views: "890K",
        timestamp: "5 hours ago"
      }
    ],
    youtube: [
      {
        id: 1,
        title: "Emma Stone - Behind the Scenes Documentary",
        views: "2.1M",
        duration: "12:34",
        thumbnail: "/api/placeholder/300/200",
        uploadDate: "3 days ago"
      },
      {
        id: 2,
        title: "La La Land - Deleted Scenes Commentary",
        views: "890K",
        duration: "8:45",
        thumbnail: "/api/placeholder/300/200",
        uploadDate: "1 week ago"
      }
    ],
    spotify: [
      {
        id: 1,
        name: "City of Stars (From La La Land)",
        plays: "125M",
        duration: "2:51"
      },
      {
        id: 2,
        name: "Audition (The Fools Who Dream)",
        plays: "87M",
        duration: "3:48"
      }
    ]
  },

  // Professional achievements
  achievements: [
    {
      title: "Academy Award Winner",
      description: "Best Actress - La La Land (2017)",
      year: "2017",
      category: "Film"
    },
    {
      title: "Golden Globe Winner",
      description: "Best Actress in Motion Picture Musical/Comedy",
      year: "2017",
      category: "Film"
    },
    {
      title: "BAFTA Award Winner",
      description: "Best Leading Actress - La La Land",
      year: "2017",
      category: "Film"
    },
    {
      title: "Screen Actors Guild Award",
      description: "Outstanding Performance by a Female Actor",
      year: "2017",
      category: "Film"
    }
  ],

  // Recent projects/filmography from IMDB
  filmography: [
    {
      title: "Poor Things",
      year: "2023",
      role: "Bella Baxter",
      rating: 8.2,
      genre: "Comedy, Drama, Romance"
    },
    {
      title: "Cruella",
      year: "2021",
      role: "Estella/Cruella",
      rating: 7.3,
      genre: "Comedy, Crime, Drama"
    },
    {
      title: "La La Land",
      year: "2016",
      role: "Mia Dolan",
      rating: 8.0,
      genre: "Comedy, Drama, Music"
    }
  ]
};

const Cprofilepage = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 lg:w-48 lg:h-48 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-4xl lg:text-6xl font-bold text-blue-600">
                  {celebrityData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {celebrityData.name}
                    </h1>
                    {celebrityData.isVerified && (
                      <Verified className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <p className="text-xl text-blue-600 font-medium mb-2">
                    {celebrityData.category}
                  </p>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{celebrityData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {new Date(celebrityData.joinedDate).getFullYear()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    size="lg" 
                    onClick={() => setIsFollowing(!isFollowing)}
                    variant={isFollowing ? "outline" : "default"}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button size="lg" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{celebrityData.fanCount}</div>
                    <div className="text-sm text-gray-600">Fans</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold text-gray-900">{celebrityData.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{celebrityData.achievements.length}</div>
                    <div className="text-sm text-gray-600">Awards</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{celebrityData.filmography.length}</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </CardContent>
                </Card>
              </div>

              {/* Bio */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {celebrityData.bio}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {celebrityData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Links */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Instagram className="h-6 w-6 text-pink-600" />
                  <div>
                    <div className="font-semibold text-gray-900">{celebrityData.platforms.instagram.followers}</div>
                    <div className="text-sm text-gray-600">Instagram</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Youtube className="h-6 w-6 text-red-600" />
                  <div>
                    <div className="font-semibold text-gray-900">{celebrityData.platforms.youtube.subscribers}</div>
                    <div className="text-sm text-gray-600">YouTube</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Twitter className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">{celebrityData.platforms.twitter.followers}</div>
                    <div className="text-sm text-gray-600">Twitter</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Headphones className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">{celebrityData.platforms.spotify.monthlyListeners}</div>
                    <div className="text-sm text-gray-600">Spotify</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Recent Content</TabsTrigger>
            <TabsTrigger value="filmography">Filmography</TabsTrigger>
            <TabsTrigger value="achievements">Awards</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          {/* Recent Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Instagram Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    Instagram Posts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {celebrityData.recentContent.instagram.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <p className="font-medium mb-2">{post.caption}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </div>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* YouTube Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-600" />
                    YouTube Videos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {celebrityData.recentContent.youtube.map((video) => (
                    <div key={video.id} className="border rounded-lg p-4">
                      <div className="flex gap-3">
                        <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <PlayCircle className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{video.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{video.views} views</span>
                            <span>{video.duration}</span>
                            <span>{video.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Spotify Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-green-600" />
                  Spotify Tracks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {celebrityData.recentContent.spotify.map((track) => (
                    <div key={track.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Music className="h-8 w-8 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-medium">{track.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{track.plays} plays</span>
                          <span>{track.duration}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Filmography Tab */}
          <TabsContent value="filmography">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Recent Filmography
                </CardTitle>
                <CardDescription>
                  Recent projects and performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {celebrityData.filmography.map((film, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                        <Film className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{film.title}</h3>
                        <p className="text-gray-600">{film.role} • {film.year}</p>
                        <p className="text-sm text-gray-500">{film.genre}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{film.rating}</span>
                        </div>
                      </div>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Awards & Achievements
                </CardTitle>
                <CardDescription>
                  Professional recognition and accolades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {celebrityData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Trophy className="h-8 w-8 text-yellow-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                        <p className="text-gray-700 mb-1">{achievement.description}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Badge variant="outline">{achievement.year}</Badge>
                          <Badge variant="secondary">{achievement.category}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Media Gallery
                </CardTitle>
                <CardDescription>
                  Photos, videos, and press coverage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                      <Camera className="h-8 w-8 text-gray-600" />
                    </div>
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

export default Cprofilepage;
