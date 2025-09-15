import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
      <div className="w-16 h-16 border-4 border-t-4 border-amber-300 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-purple-300 text-lg">Gemini가 우주의 기운을 읽고 있습니다...</p>
    </div>
  );
};

export default LoadingSpinner;