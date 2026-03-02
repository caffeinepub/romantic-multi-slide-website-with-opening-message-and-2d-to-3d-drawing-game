import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface OpeningSlideProps {
  onContinue: () => void;
}

export function OpeningSlide({ onContinue }: OpeningSlideProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/romantic-bg.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-romantic-rose/40 via-romantic-peach/30 to-romantic-coral/40" />
      </div>

      {/* Decorative motif */}
      <div 
        className="absolute top-1/4 right-1/4 w-64 h-64 opacity-20 animate-float"
        style={{ backgroundImage: 'url(/assets/generated/heart-floral-motif.dim_1024x1024.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
      />
      <div 
        className="absolute bottom-1/4 left-1/4 w-48 h-48 opacity-15 animate-float-delayed"
        style={{ backgroundImage: 'url(/assets/generated/heart-floral-motif.dim_1024x1024.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="mb-8 animate-fade-in">
          <Heart className="w-16 h-16 mx-auto text-romantic-rose mb-6 animate-pulse-slow" fill="currentColor" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-romantic-deep mb-8 animate-fade-in-up leading-tight">
          My beautiful Wifeyyy
        </h1>
        
        <p className="text-xl md:text-2xl text-romantic-deep/80 mb-12 font-serif animate-fade-in-up-delayed">
          A journey through words of love
        </p>

        <Button 
          onClick={onContinue}
          size="lg"
          className="bg-romantic-rose hover:bg-romantic-coral text-white px-8 py-6 text-lg rounded-full shadow-romantic transition-all duration-300 hover:scale-105 animate-fade-in-up-more-delayed"
        >
          Begin Our Story
          <Heart className="ml-2 w-5 h-5" fill="currentColor" />
        </Button>
      </div>
    </div>
  );
}
