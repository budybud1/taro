import React, { useState, useEffect } from 'react';
import { DrawnCard, TarotCardData } from '../types';
import TarotCard from './TarotCard';

interface CardSpreadProps {
  cards: DrawnCard[];
  onCardClick: (card: TarotCardData) => void;
}

const spreadPositions = ['과거', '현재', '미래'];

const CardSpread: React.FC<CardSpreadProps> = ({ cards, onCardClick }) => {
  const [visibleCards, setVisibleCards] = useState<number>(0);

  useEffect(() => {
    if (cards.length > 0) {
      setVisibleCards(0);
      const timers = cards.map((_, index) => 
        setTimeout(() => {
          setVisibleCards(v => v + 1);
        }, index * 400)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [cards]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 py-8">
      {cards.map((drawnCard, index) => (
        <div
          key={drawnCard.card.id}
          className={`flex flex-col items-center gap-4 transition-all duration-500 ${index < visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-xl font-bold text-amber-300">{spreadPositions[index]}</h3>
          <TarotCard
            card={drawnCard.card}
            isReversed={drawnCard.isReversed}
            isFlipped={true}
            onClick={() => onCardClick(drawnCard.card)}
          />
        </div>
      ))}
    </div>
  );
};

export default CardSpread;