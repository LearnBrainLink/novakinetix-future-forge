
import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Mail, Lock, User, CheckCircle, Loader2, ArrowLeft, School, MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
    country: "",
    state: "",
    schoolName: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    relationship: "",
    role: "",
  });

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setFormData({ ...formData, role: value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    // Simulate form submission
    setTimeout(() => {
      setMessage({
        type: "success",
        text: "Account created successfully! Please check your email to verify your account.",
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm animate-bounce"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <Logo variant="large" className="mx-auto drop-shadow-2xl animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Join <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Novakinetix Academy</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Unlock your potential with cutting-edge education and innovation
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm font-medium text-white">
                🚀 Advanced Learning
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm font-medium text-white">
                🎓 Expert Instructors
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-sm font-medium text-white">
                🌟 Career Growth
              </div>
            </div>
          </div>

          {/* Sign Up Form */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="space-y-1 pb-6 text-center">
              <CardTitle className="text-3xl font-bold text-white">
                Create Your Account
              </CardTitle>
              <p className="text-blue-100 text-lg">
                Start your journey with us today
              </p>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              {message && (
                <div
                  className={`p-4 rounded-xl border ${
                    message.type === "success"
                      ? "border-green-400/50 bg-green-500/20 text-green-100"
                      : "border-red-400/50 bg-red-500/20 text-red-100"
                  }`}
                >
                  <div className="flex items-center">
                    {message.type === "success" ? (
                      <CheckCircle className="h-5 w-5 mr-3" />
                    ) : (
                      <Loader2 className="h-5 w-5 animate-spin mr-3" />
                    )}
                    <p className="text-sm font-medium">{message.text}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label htmlFor="role" className="text-white font-semibold text-lg flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    I am a... *
                  </Label>
                  <select
                    id="role"
                    name="role"
                    value={selectedRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-white/30 text-white bg-white/10 backdrop-blur-md placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    required
                  >
                    <option value="" className="text-blue-900 bg-white">Select your role</option>
                    <option value="student" className="text-blue-900 bg-white">Student</option>
                    <option value="teacher" className="text-blue-900 bg-white">Teacher</option>
                    <option value="parent" className="text-blue-900 bg-white">Parent</option>
                  </select>
                </div>

                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-white font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-white font-semibold">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-white font-semibold">
                      Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-white font-semibold">
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                        required
                      />
                    </div>
                  </div>
                </div>

                {selectedRole === "student" && (
                  <>
                    {/* Student Information */}
                    <div className="border-t border-white/20 pt-6 space-y-6">
                      <h3 className="text-2xl font-bold text-blue-100 flex items-center">
                        <School className="w-6 h-6 mr-2" />
                        Student Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="grade" className="text-white font-semibold">
                            Grade Level *
                          </Label>
                          <select
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            className="w-full py-3 px-4 rounded-xl border border-white/30 text-white bg-white/10 backdrop-blur-md placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                            required
                          >
                            <option value="" className="text-blue-900 bg-white">Select your grade</option>
                            <option value="5" className="text-blue-900 bg-white">5th Grade</option>
                            <option value="6" className="text-blue-900 bg-white">6th Grade</option>
                            <option value="7" className="text-blue-900 bg-white">7th Grade</option>
                            <option value="8" className="text-blue-900 bg-white">8th Grade</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="schoolName" className="text-white font-semibold">
                            School Name
                          </Label>
                          <Input
                            id="schoolName"
                            name="schoolName"
                            type="text"
                            placeholder="Your school's name"
                            value={formData.schoolName}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="country" className="text-white font-semibold flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            Country *
                          </Label>
                          <Input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="e.g. United States"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="state" className="text-white font-semibold flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            State/Province *
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            type="text"
                            placeholder="e.g. California"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Parent Information */}
                    <div className="border-t border-white/20 pt-6 space-y-6">
                      <h3 className="text-2xl font-bold text-blue-100 flex items-center">
                        <User className="w-6 h-6 mr-2" />
                        Parent/Guardian Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="parentName" className="text-white font-semibold">
                            Parent/Guardian Name *
                          </Label>
                          <Input
                            id="parentName"
                            name="parentName"
                            type="text"
                            placeholder="Parent's full name"
                            value={formData.parentName}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="parentEmail" className="text-white font-semibold">
                            Parent/Guardian Email *
                          </Label>
                          <Input
                            id="parentEmail"
                            name="parentEmail"
                            type="email"
                            placeholder="parent@email.com"
                            value={formData.parentEmail}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="parentPhone" className="text-white font-semibold">
                            Parent/Guardian Phone
                          </Label>
                          <Input
                            id="parentPhone"
                            name="parentPhone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.parentPhone}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl py-3"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="relationship" className="text-white font-semibold">
                            Relationship to Student *
                          </Label>
                          <select
                            id="relationship"
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleInputChange}
                            className="w-full py-3 px-4 rounded-xl border border-white/30 text-white bg-white/10 backdrop-blur-md placeholder:text-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                            required
                          >
                            <option value="" className="text-blue-900 bg-white">Select relationship</option>
                            <option value="mother" className="text-blue-900 bg-white">Mother</option>
                            <option value="father" className="text-blue-900 bg-white">Father</option>
                            <option value="guardian" className="text-blue-900 bg-white">Guardian</option>
                            <option value="other" className="text-blue-900 bg-white">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <User className="mr-3 h-5 w-5" />
                      Create Your Account
                    </>
                  )}
                </Button>

                <p className="text-sm text-blue-200 text-center pt-4">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="underline text-yellow-300 hover:text-yellow-200 transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline text-yellow-300 hover:text-yellow-200 transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>

              <div className="text-center pt-6">
                <Link
                  to="/"
                  className="text-blue-200 hover:text-white transition-colors inline-flex items-center font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Already have an account? Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
