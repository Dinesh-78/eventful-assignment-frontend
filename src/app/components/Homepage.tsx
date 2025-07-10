import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Globe, Clock, Headphones, Verified, Heart } from 'lucide-react';

// Mock celebrity data for demonstration
const celebrities = [
  {
    id: 1,
    name: "Emma Stone",
    category: "Hollywood Actor",
    fanbase: "2.4M",
    location: "Los Angeles, CA",
    rating: 4.9,
    isVerified: true,
    tags: ["Drama", "Comedy", "Award Winner"]
  },
  {
    id: 2,
    name: "Chris Evans",
    category: "Marvel Star",
    fanbase: "3.8M",
    location: "Boston, MA",
    rating: 4.8,
    isVerified: true,
    tags: ["Action", "Superhero", "Captain America"]
  },
  {
    id: 3,
    name: "Taylor Swift",
    category: "Music Artist",
    fanbase: "12.5M",
    location: "Nashville, TN",
    rating: 5.0,
    isVerified: true,
    tags: ["Pop", "Country", "Grammy Winner"]
  },
  {
    id: 4,
    name: "Ryan Reynolds",
    category: "Comedy Actor",
    fanbase: "4.2M",
    location: "Vancouver, BC",
    rating: 4.7,
    isVerified: true,
    tags: ["Comedy", "Action", "Deadpool"]
  },
  {
    id: 5,
    name: "Zendaya",
    category: "Multi-talent",
    fanbase: "6.1M",
    location: "Los Angeles, CA",
    rating: 4.9,
    isVerified: true,
    tags: ["Acting", "Fashion", "Spider-Man"]
  },
  {
    id: 6,
    name: "The Rock",
    category: "Action Star",
    fanbase: "8.7M",
    location: "Hawaii, USA",
    rating: 4.8,
    isVerified: true,
    tags: ["Action", "WWE", "Producer"]
  }
];

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Hero Section */}
      <section className="bg-white border-b py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connect with 
              <span className="text-blue-600"> Your Favorite Stars</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover and connect with celebrities from around the world. Get exclusive content, 
              personalized messages, and behind-the-scenes access to your favorite stars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Explore Celebrities
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Join as Creator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600">Celebrities</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">2M+</div>
                <div className="text-gray-600">Happy Fans</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600">Countries</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-gray-600">Support</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Celebrities Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Celebrities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with verified celebrities and get personalized content from your favorite stars
            </p>
          </div>

          {/* Celebrity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {celebrities.map((celebrity) => (
              <Card key={celebrity.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Celebrity Avatar */}
                <div className="relative h-64 bg-blue-100 flex items-center justify-center">
                  <div className="text-4xl font-bold text-blue-600">
                    {celebrity.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  {/* Verified Badge */}
                  {celebrity.isVerified && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white p-1.5 rounded-full">
                      <Verified className="h-4 w-4" />
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-1 shadow-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{celebrity.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Celebrity Info */}
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {celebrity.name}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {celebrity.category}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {celebrity.fanbase}
                      </div>
                      <div className="text-sm text-gray-600">Fans</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center text-sm font-medium text-gray-900 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {celebrity.location.split(',')[0]}
                      </div>
                      <div className="text-xs text-gray-600">Location</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {celebrity.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Connect
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button size="lg" className="px-8">
              View All Celebrities
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="mb-8">
            <Headphones className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Connect with Your Favorite Stars?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of fans getting exclusive content and personalized messages from celebrities
            </p>
            <Button size="lg" variant="secondary" className="px-8">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
