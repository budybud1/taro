
import React from 'react';
import { TarotCardData } from '../types';

interface TarotCardProps {
  card: TarotCardData;
  isReversed: boolean;
  isFlipped: boolean;
  onClick?: () => void;
}

const TarotCard: React.FC<TarotCardProps> = ({ card, isReversed, isFlipped, onClick }) => {
  return (
    <div className="w-40 h-64 md:w-48 md:h-80 [perspective:1000px] cursor-pointer group" onClick={onClick}>
      <div 
        className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl bg-indigo-800 border-2 border-amber-300 shadow-lg shadow-purple-900/50 flex items-center justify-center p-4">
          <div className="w-full h-full border-2 border-amber-300/50 rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-300 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12a7 7 0 1114 0 7 7 0 01-14 0z" />
            </svg>
          </div>
        </div>

        {/* Card Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl bg-slate-800 border-2 border-slate-500 shadow-lg shadow-purple-900/50 flex flex-col justify-center items-center p-2 text-center">
          <div 
            className={`w-full h-full flex flex-col justify-center items-center transition-transform duration-500 ${isReversed ? 'rotate-180' : ''}`}
          >
            <div className="text-amber-300 font-bold text-lg leading-tight tracking-tight font-['Cinzel']">
              {card.name}
            </div>
             <div className="text-indigo-300 text-xs mt-1">
              {card.arcana} Arcana
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
