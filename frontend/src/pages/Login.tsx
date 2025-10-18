import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ChefHat, AlertCircle } from 'lucide-react';
import { Card, CardBody, Button, Input } from '../components/ui';

/**
 * Login page component with authentication form
 */
export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formStatus === 'error') {
      setFormStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setFormStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    // Simulate login API call
    setTimeout(() => {
      // Simulate login failure for demo
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        // Success - in real app, redirect to dashboard
        console.log('Login successful');
        setFormStatus('idle');
      } else {
        setFormStatus('error');
        setErrorMessage('Invalid email or password. Try demo@example.com / password');
      }
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8 animate-gradient">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to discover amazing recipes
          </p>
        </div>

        {/* Login Form */}
        <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl animate-fade-in-up">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {formStatus === 'error' && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-4 flex items-start space-x-3 animate-shake">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Login Failed</p>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
                leftIcon={<Mail className="h-4 w-4" />}
                state={formStatus === 'error' ? 'error' : 'default'}
              />

              {/* Password Field */}
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your password"
                  leftIcon={<Lock className="h-4 w-4" />}
                  state={formStatus === 'error' ? 'error' : 'default'}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200"
                loading={formStatus === 'loading'}
              >
                {formStatus === 'loading' ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Demo Credentials */}
        <Card className="backdrop-blur-md bg-gradient-to-r from-orange-100/50 to-red-100/50 border-orange-200/30 animate-fade-in-up">
          <CardBody className="text-center space-y-3">
            <h3 className="font-semibold text-gray-800">Demo Credentials</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Email:</strong> demo@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
          </CardBody>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center animate-fade-in-up">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register"
              className="text-orange-600 hover:text-red-600 font-medium transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;