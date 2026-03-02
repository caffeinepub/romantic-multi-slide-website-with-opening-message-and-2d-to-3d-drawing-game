import { useState } from 'react';
import { OpeningSlide } from './OpeningSlide';
import { RomanticCarousel } from './RomanticCarousel';
import { FinalGameSlide } from './FinalGameSlide';

type ViewState = 'opening' | 'carousel' | 'game';

export function RomanticSlidesExperience() {
  const [currentView, setCurrentView] = useState<ViewState>('opening');

  return (
    <div className="transition-all duration-500">
      {currentView === 'opening' && (
        <div className="animate-fade-in">
          <OpeningSlide onContinue={() => setCurrentView('carousel')} />
        </div>
      )}
      
      {currentView === 'carousel' && (
        <div className="animate-fade-in">
          <RomanticCarousel onNavigateToGame={() => setCurrentView('game')} />
        </div>
      )}
      
      {currentView === 'game' && (
        <div className="animate-fade-in">
          <FinalGameSlide onBack={() => setCurrentView('carousel')} />
        </div>
      )}
    </div>
  );
}
