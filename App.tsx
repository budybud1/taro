import React, { useState, useEffect, useCallback } from 'react';
import { DrawnCard, TarotCardData } from './types';
import { tarotCards } from './data/tarotCards';
import { getTarotReading } from './services/geminiService';
import Header from './components/Header';
import CardSpread from './components/CardSpread';
import Interpretation from './components/Interpretation';
import LoadingSpinner from './components/LoadingSpinner';
import CardLibrary from './components/CardLibrary';
import Modal from './components/Modal';

type View = 'reading' | 'library';

const App: React.FC = () => {
  const [deck, setDeck] = useState<TarotCardData[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>('reading');
  const [selectedCard, setSelectedCard] = useState<TarotCardData | null>(null);

  const shuffleDeck = useCallback(() => {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
  }, []);

  useEffect(() => {
    shuffleDeck();
  }, [shuffleDeck]);

  const drawCards = (count: number): DrawnCard[] => {
    if (deck.length < count) {
      shuffleDeck();
    }
    const cardsToDraw = deck.slice(0, count);
    setDeck(deck.slice(count));
    return cardsToDraw.map(card => ({
      card,
      isReversed: Math.random() < 0.3, // 30% chance of being reversed
    }));
  };

  const handleDrawThreeCards = async () => {
    setIsLoading(true);
    setError(null);
    setInterpretation(null);
    setDrawnCards([]);

    // Animate card drawing
    setTimeout(async () => {
      const newDrawnCards = drawCards(3);
      setDrawnCards(newDrawnCards);
      
      try {
        const reading = await getTarotReading(newDrawnCards);
        setInterpretation(reading);
      } catch (e) {
        console.error(e);
        setError('Gemini로부터 해석을 받아오는 데 실패했습니다. API 키를 확인하고 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleReset = () => {
    setDrawnCards([]);
    setInterpretation(null);
    setError(null);
    shuffleDeck();
  };
  
  const handleCardClick = (card: TarotCardData) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 text-slate-200 selection:bg-purple-500 selection:text-white font-korean">
      <Header currentView={view} setView={setView} />
      <main className="container mx-auto px-4 py-8">
        {view === 'reading' && (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-amber-300">세 카드 스프레드</h1>
            <p className="text-center mb-8 max-w-2xl text-indigo-200">과거, 현재, 미래에 대한 통찰을 발견하세요. 아래 버튼을 클릭하여 덱에서 세 장의 카드를 뽑으세요.</p>
            
            <div className="mb-8">
              {drawnCards.length === 0 ? (
                <button 
                  onClick={handleDrawThreeCards}
                  disabled={isLoading}
                  className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {isLoading ? '카드를 섞는 중...' : '카드 뽑기'}
                </button>
              ) : (
                <button 
                  onClick={handleReset}
                  className="px-8 py-4 bg-amber-400 text-slate-900 font-bold rounded-lg shadow-lg hover:bg-amber-500 transition-all duration-300 transform hover:scale-105"
                >
                  다시 뽑기
                </button>
              )}
            </div>

            <CardSpread cards={drawnCards} onCardClick={handleCardClick} />
            
            {isLoading && <LoadingSpinner />}
            
            {error && <div className="mt-8 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}

            {interpretation && <Interpretation text={interpretation} />}
          </div>
        )}
        
        {view === 'library' && (
          <CardLibrary onCardClick={handleCardClick} />
        )}

      </main>
      <Modal card={selectedCard} onClose={handleCloseModal} />
    </div>
  );
};

export default App;