import React, { useState, useMemo } from 'react';
import { TarotCardData } from '../types';
import { tarotCards } from '../data/tarotCards';

interface CardLibraryProps {
    onCardClick: (card: TarotCardData) => void;
}

const CardLibrary: React.FC<CardLibraryProps> = ({ onCardClick }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = useMemo(() => {
        return tarotCards.filter(card => 
            card.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-300">타로 카드 도서관</h1>
            <p className="text-center mb-8 max-w-2xl text-indigo-200">타로 덱의 78개 카드 전체의 의미를 탐색해 보세요. 카드를 클릭하면 자세한 내용을 볼 수 있습니다.</p>
            
            <div className="mb-8 w-full max-w-md">
                <input 
                    type="text"
                    placeholder="카드를 검색하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-purple-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredCards.map(card => (
                    <div key={card.id} className="flex flex-col items-center gap-2" onClick={() => onCardClick(card)}>
                        <div className="w-32 h-52 [perspective:1000px] cursor-pointer group">
                             <div className="relative w-full h-full rounded-lg bg-slate-800 border-2 border-slate-500 shadow-lg shadow-purple-900/50 flex flex-col justify-center items-center p-2 text-center transform group-hover:scale-105 group-hover:shadow-amber-400/30 transition-all duration-300">
                                <div className="text-amber-300 font-bold text-sm leading-tight tracking-tight font-['Cinzel']">
                                    {card.name}
                                </div>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardLibrary;