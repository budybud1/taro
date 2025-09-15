import React from 'react';

interface InterpretationProps {
  text: string;
}

const Interpretation: React.FC<InterpretationProps> = ({ text }) => {
  // Simple markdown-like formatter for paragraphs
  const formattedText = text.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
    <p key={index} className="mb-4 text-indigo-100 leading-relaxed">
      {paragraph}
    </p>
  ));

  return (
    <div className="mt-12 w-full max-w-4xl animate-fade-in">
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl border border-purple-500/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-amber-300">당신의 리딩</h2>
        <div className="prose prose-invert max-w-none prose-p:text-slate-300">
           {formattedText}
        </div>
        <p className="text-xs text-center mt-6 text-purple-300/70">Gemini가 생성한 해석입니다</p>
      </div>
    </div>
  );
};

export default Interpretation;