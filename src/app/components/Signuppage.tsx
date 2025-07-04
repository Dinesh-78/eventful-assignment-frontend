'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, User, MapPin, Star, Camera, Music, Film, Tv, Gamepad2, Palette, Search, Users } from 'lucide-react';

// Celebrity categories with icons
const categories = [
  { value: 'actor', label: 'Actor/Actress', icon: Film },
  { value: 'musician', label: 'Musician', icon: Music },
  { value: 'athlete', label: 'Athlete', icon: Star },
  { value: 'influencer', label: 'Social Media Influencer', icon: Camera },
  { value: 'tv-host', label: 'TV Host', icon: Tv },
  { value: 'gamer', label: 'Gaming Content Creator', icon: Gamepad2 },
  { value: 'artist', label: 'Visual Artist', icon: Palette },
  { value: 'other', label: 'Other', icon: User },
];

// Celebrity search interfaces
interface Celebrity {
  id: string;
  name: string;
  profession: string;
  description: string;
  photoUrl: string;
  country: string;
  achievements: string[];
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  matchScore: number;
}

interface CelebritySearchResponse {
  query: string;
  celebrities: Celebrity[];
  totalResults: number;
  searchTime: number;
}

// Celebrity search API function
const searchCelebrities = async (introduction: string): Promise<CelebritySearchResponse> => {
  try {
    console.log('Searching celebrities with:', introduction);
    
    const response = await fetch('http://localhost:3000/celebrities/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ introduction }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HTTP error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('Celebrity search successful:', data);
    return data;
  } catch (error) {
    console.error('Celebrity search failed:', error);
    
    // Show user-friendly error message
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error: Cannot connect to backend server. Make sure the backend is running on port 3000.');
    }
    
    // Return mock data as fallback
    return {
      query: introduction,
      celebrities: [
        {
          id: 'mock_1',
          name: 'Diljit Dosanjh',
          profession: 'Punjabi Singer & Actor',
          description: 'Popular Punjabi singer and actor who has performed internationally including at Coachella 2023. (Note: This is mock data - backend connection failed)',
          photoUrl: 'https://ui-avatars.com/api/?name=Diljit+Dosanjh&size=400&background=ff6b35&color=fff',
          country: 'India',
          achievements: ['Coachella 2023 Performance', 'Multiple Filmfare Awards'],
          socialMedia: { instagram: '@diljitdosanjh' },
          matchScore: 95,
        },
        {
          id: 'mock_2',
          name: 'AP Dhillon',
          profession: 'Punjabi Singer & Producer',
          description: 'Indo-Canadian Punjabi singer and music producer known for contemporary Punjabi music. (Note: This is mock data - backend connection failed)',
          photoUrl: 'https://ui-avatars.com/api/?name=AP+Dhillon&size=400&background=8b5cf6&color=fff',
          country: 'Canada/India',
          achievements: ['International Chart Success', 'Sold-out Tours'],
          socialMedia: { instagram: '@apdhillon' },
          matchScore: 85,
        },
      ],
      totalResults: 2,
      searchTime: 1000,
    };
  }
};

// Mock AI auto-fill function (in production, this would call your AI service)
const mockAIAutoFill = (introduction: string) => {
  // Simulate AI processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple keyword-based auto-fill logic (in production, use actual AI)
      const intro = introduction.toLowerCase();
      
      let suggestedData = {
        name: '',
        category: '',
        location: '',
        bio: '',
        specialties: [] as string[],
      };

      // Extract potential name patterns
      const nameMatch = introduction.match(/(?:I'm|I am|My name is|This is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
      if (nameMatch) {
        suggestedData.name = nameMatch[1];
      }

      // Determine category based on keywords
      if (intro.includes('actor') || intro.includes('actress') || intro.includes('acting') || intro.includes('movie') || intro.includes('film')) {
        suggestedData.category = 'actor';
        suggestedData.specialties = ['Drama', 'Comedy'];
      } else if (intro.includes('singer') || intro.includes('musician') || intro.includes('music') || intro.includes('album') || intro.includes('song')) {
        suggestedData.category = 'musician';
        suggestedData.specialties = ['Pop', 'Rock'];
      } else if (intro.includes('athlete') || intro.includes('sports') || intro.includes('olympic') || intro.includes('championship')) {
        suggestedData.category = 'athlete';
        suggestedData.specialties = ['Professional Sports'];
      } else if (intro.includes('influencer') || intro.includes('instagram') || intro.includes('youtube') || intro.includes('tiktok')) {
        suggestedData.category = 'influencer';
        suggestedData.specialties = ['Social Media', 'Content Creation'];
      }

      // Extract location
      const locationMatch = introduction.match(/(?:from|in|based in|living in)\s+([A-Z][a-z]+(?:,?\s+[A-Z][a-z]+)*)/i);
      if (locationMatch) {
        suggestedData.location = locationMatch[1];
      }

      // Generate bio based on introduction
      suggestedData.bio = `${introduction} I'm passionate about connecting with my fans and sharing my journey with the world.`;

      resolve(suggestedData);
    }, 1500);
  });
};

const Signuppage = () => {
  const [formData, setFormData] = useState({
    introduction: '',
    name: '',
    category: '',
    location: '',
    bio: '',
    specialties: [] as string[],
    contactEmail: '',
    socialMedia: {
      instagram: '',
      twitter: '',
      youtube: '',
    }
  });

  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [celebritySearchResults, setCelebritySearchResults] = useState<CelebritySearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleCelebritySearch = async () => {
    const trimmedIntroduction = formData.introduction.trim();
    if (!trimmedIntroduction) return;
    
    if (trimmedIntroduction.length < 5) {
      alert('Please enter at least 5 characters for a meaningful search.');
      return;
    }
    
    setIsSearching(true);
    setShowSearchResults(true);
    try {
      const searchResults = await searchCelebrities(trimmedIntroduction);
      setCelebritySearchResults(searchResults);
    } catch (error) {
      console.error('Celebrity search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAIAutoFill = async () => {
    if (!formData.introduction.trim()) return;
    
    setIsAIProcessing(true);
    try {
      const aiSuggestions = await mockAIAutoFill(formData.introduction) as any;
      setFormData(prev => ({
        ...prev,
        ...aiSuggestions,
      }));
      setStep(2);
    } catch (error) {
      console.error('AI auto-fill failed:', error);
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const addSpecialty = (specialty: string) => {
    if (!formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Celebrity Network
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Let AI help you create your perfect profile in minutes. Just tell us about yourself!
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 rounded-full ${step >= 2 ? 'bg-violet-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <div className={`w-16 h-1 rounded-full ${step >= 3 ? 'bg-violet-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: AI Introduction */}
        {step === 1 && (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Tell Us About Yourself</CardTitle>
              <CardDescription>
                Write a brief introduction and let our AI auto-fill your profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="introduction">One-line Introduction</Label>
                <Textarea
                  id="introduction"
                  placeholder="e.g., I'm Emma Stone, a Hollywood actress known for La La Land and Easy A, based in Los Angeles"
                  value={formData.introduction}
                  onChange={(e) => handleInputChange('introduction', e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <p className="text-sm text-gray-500">
                  Include your name, profession, notable work, and location for best results (minimum 5 characters)
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    onClick={handleCelebritySearch}
                    disabled={!formData.introduction.trim() || formData.introduction.trim().length < 5 || isSearching}
                    variant="outline"
                    className="w-full border-violet-200 hover:bg-violet-50"
                    size="lg"
                  >
                    {isSearching ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Searching...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4" />
                        <span>Search Celebrities</span>
                      </div>
                    )}
                  </Button>

                  <Button 
                    onClick={handleAIAutoFill}
                    disabled={!formData.introduction.trim() || formData.introduction.trim().length < 5 || isAIProcessing}
                    className="w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700"
                    size="lg"
                  >
                    {isAIProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>AI is analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Auto-fill with AI</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Celebrity Search Results */}
                {showSearchResults && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>Celebrity Suggestions</span>
                      </CardTitle>
                      <CardDescription>
                        {celebritySearchResults 
                          ? `Found ${celebritySearchResults.totalResults} celebrities matching your description`
                          : 'Searching for celebrities that match your description...'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isSearching ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : celebritySearchResults ? (
                        <div className="grid gap-4">
                          {celebritySearchResults.celebrities.map((celebrity) => (
                            <div key={celebrity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                              <img 
                                src={celebrity.photoUrl} 
                                alt={celebrity.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-gray-900 dark:text-white">{celebrity.name}</h4>
                                  <Badge variant="secondary" className="ml-2">
                                    {celebrity.matchScore}% match
                                  </Badge>
                                </div>
                                <p className="text-sm text-violet-600 dark:text-violet-400">{celebrity.profession}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{celebrity.description}</p>
                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                  <span className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {celebrity.country}
                                  </span>
                                  {celebrity.achievements.length > 0 && (
                                    <span className="flex items-center">
                                      <Star className="w-3 h-3 mr-1" />
                                      {celebrity.achievements.slice(0, 2).join(', ')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">No results found</p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Review & Edit AI Suggestions */}
        {step === 2 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Review and edit the AI-generated details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                          <SelectItem key={cat.value} value={cat.value}>
                            <div className="flex items-center space-x-2">
                              <IconComponent className="w-4 h-4" />
                              <span>{cat.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell your fans about yourself..."
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialties & Contact</CardTitle>
                <CardDescription>Add your specialties and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Specialties</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100"
                        onClick={() => removeSpecialty(specialty)}
                      >
                        {specialty} ×
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a specialty"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          if (target.value.trim()) {
                            addSpecialty(target.value.trim());
                            target.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Social Media (Optional)</Label>
                  <Input
                    placeholder="Instagram username"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                  />
                  <Input
                    placeholder="Twitter/X username"
                    value={formData.socialMedia.twitter}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                  />
                  <Input
                    placeholder="YouTube channel"
                    value={formData.socialMedia.youtube}
                    onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        {step === 2 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="px-8"
            >
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="px-8 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 3: Final Review & Submit */}
        {step === 3 && (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Review Your Profile</CardTitle>
              <CardDescription>
                Everything looks good? Submit your application to join our network!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-900/20 dark:to-pink-900/20 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{formData.name}</h3>
                  <p className="text-violet-600 dark:text-violet-400">
                    {categories.find(c => c.value === formData.category)?.label}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {formData.location}
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">{formData.bio}</p>
                
                {formData.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Edit Profile
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700"
                  onClick={() => {
                    // Handle form submission here
                    alert('Profile submitted successfully! We will review your application and get back to you soon.');
                  }}
                >
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Signuppage;
