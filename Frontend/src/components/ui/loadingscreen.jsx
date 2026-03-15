import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      
      {/* Main Center Loader (Spinner) */}
      <div className="relative w-20 h-20 mb-8">
        {/* Background track */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>

      {/* Loading Text */}
      <h2 className="text-2xl md:text-3xl font-medium text-white tracking-wide text-center animate-pulse">
        Applying the theme, please wait...
      </h2>

      {/* Bottom Secondary Loader (Progress Dots) */}
      <div className="flex space-x-2 mt-6">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>

    </div>
  );
};

export default LoadingScreen;