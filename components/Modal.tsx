import React from 'react';
import { TarotCardData } from '../types';

interface ModalProps {
  card: TarotCardData | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  const suitText = card.suit ? `- ${card.suit} 슈트` : '';

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 border border-purple-500/50 shadow-2xl relative animate-fade-in-scale font-korean"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-4xl font-bold text-amber-300 mb-2">{card.name}</h2>
        <p className="text-indigo-300 mb-6">{card.arcana} 아르카나 {suitText}</p>

        <p className="mb-6 text-slate-300 leading-relaxed">{card.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-amber-200 mb-2">정방향 의미</h3>
                <p className="text-slate-300">{card.meaning_up}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-red-300 mb-2">역방향 의미</h3>
                <p className="text-slate-300">{card.meaning_rev}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;