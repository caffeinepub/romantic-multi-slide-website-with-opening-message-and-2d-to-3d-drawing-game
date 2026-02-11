import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { romanticSlides } from './RomanticTextSlides';

interface RomanticCarouselProps {
  onNavigateToGame: () => void;
}

export function RomanticCarousel({ onNavigateToGame }: RomanticCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < romanticSlides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onNavigateToGame();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentSlide = romanticSlides[currentIndex];

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-romantic-cream via-romantic-peach/20 to-romantic-rose/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-romantic-rose blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-romantic-coral blur-3xl animate-float-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-6">
        <Card className="bg-white/80 backdrop-blur-sm border-romantic-rose/20 shadow-romantic-lg">
          <CardContent className="p-12 md:p-16">
            <div className="text-center space-y-8">
              <Heart className="w-12 h-12 mx-auto text-romantic-rose animate-pulse-slow" fill="currentColor" />
              
              <p className="text-2xl md:text-4xl font-serif text-romantic-deep leading-relaxed animate-fade-in">
                {currentSlide.text}
              </p>

              {currentSlide.author && (
                <p className="text-lg text-romantic-deep/60 font-display italic">
                  — {currentSlide.author}
                </p>
              )}

              <div className="flex items-center justify-center gap-4 pt-8">
                <div className="flex gap-2">
                  {romanticSlides.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-romantic-rose'
                          : 'w-2 bg-romantic-rose/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            variant="outline"
            size="lg"
            className="rounded-full border-romantic-rose/30 text-romantic-deep hover:bg-romantic-rose/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="ml-2 hidden md:inline">Previous</span>
          </Button>

          <div className="text-romantic-deep/60 font-display">
            {currentIndex + 1} / {romanticSlides.length}
          </div>

          <Button
            onClick={handleNext}
            size="lg"
            className="rounded-full bg-romantic-rose hover:bg-romantic-coral text-white"
          >
            <span className="mr-2 hidden md:inline">
              {currentIndex === romanticSlides.length - 1 ? 'Play Game' : 'Next'}
            </span>
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
