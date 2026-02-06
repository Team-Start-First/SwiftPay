import React, { useState } from 'react';
import { supabase } from "../supabase";


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
     setMessage(null);
    
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/ResetPassword",
        });
      
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setMessage(`If an account exists for ${email}, you will receive a reset link shortly.`);
    //   setEmail(''); // Clear input
      // }, 2000);
      setIsLoading(false);

  if (error) {
    setMessage(error.message);
    return;
  }

  setMessage(
    `If an account exists for this ${email}, you’ll receive a password reset link shortly.`
  );
  setEmail("");
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Icon / Logo */}
        <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 14l-1 1-1 1H3l2-2h3l2.293-2.293c-.63.63-.184 1.707.32 3.293M15 7a6 6 0 00-6 6v1" />
          </svg>
        </div>

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Success Message */}
          {message && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out`}
              >
                {isLoading ? 'Sending...' : 'Reset Password'}
              </button>
            </div>
          </form>

          {/* Footer Links: Remember Password & Sign Up */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-between text-sm">
               {/* Remember Password? Link */}
              <a href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Remember password? <span className="text-gray-900">Log in</span>
              </a>

              {/* Sign Up Link */}
              <a href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                New here? <span className="text-gray-900">Sign up</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;