import React from 'react';

interface HeaderProps {
  currentView: 'reading' | 'library';
  setView: (view: 'reading' | 'library') => void;
}

const NavButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold rounded-md transition-colors duration-300 font-korean ${
        isActive
          ? 'bg-amber-400 text-slate-900'
          : 'bg-transparent text-slate-300 hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-purple-900/20">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.586l-2.707 2.707A1 1 0 002 8v10a1 1 0 001 1h14a1 1 0 001-1V8a1 1 0 00-.293-.707L15 4.586V3a1 1 0 00-1-1H6a1 1 0 00-1-1zm10 5.414L13.586 6H6.414L5 7.414V17h10V7.414zM10 15a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="text-xl font-bold tracking-wider font-['Cinzel']">Gemini Tarot</span>
        </div>
        <div className="flex space-x-2">
          <NavButton isActive={currentView === 'reading'} onClick={() => setView('reading')}>
            타로점 보기
          </NavButton>
          <NavButton isActive={currentView === 'library'} onClick={() => setView('library')}>
            카드 도서관
          </NavButton>
        </div>
      </nav>
    </header>
  );
};

export default Header;