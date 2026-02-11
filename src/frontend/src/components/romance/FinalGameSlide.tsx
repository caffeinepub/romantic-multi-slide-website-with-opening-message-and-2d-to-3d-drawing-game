import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DrawingPad2D } from '../game2d3d/DrawingPad2D';
import { ThreeDViewer } from '../game2d3d/ThreeDViewer';
import { ChevronLeft, Sparkles, RotateCcw } from 'lucide-react';

interface FinalGameSlideProps {
  onBack: () => void;
}

export function FinalGameSlide({ onBack }: FinalGameSlideProps) {
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [showViewer, setShowViewer] = useState(false);

  const handleConvert = (drawnPoints: Array<{ x: number; y: number }>) => {
    setPoints(drawnPoints);
    setShowViewer(true);
  };

  const handleReset = () => {
    setPoints([]);
    setShowViewer(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-romantic-cream via-romantic-peach/20 to-romantic-rose/10 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="rounded-full border-romantic-rose/30 text-romantic-deep hover:bg-romantic-rose/10"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Slides
          </Button>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-romantic-deep">
            Create Your 3D Shape
          </h2>

          <div className="w-32" /> {/* Spacer for centering */}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Drawing area */}
          <Card className="bg-white/80 backdrop-blur-sm border-romantic-rose/20 shadow-romantic-lg">
            <CardHeader>
              <CardTitle className="text-romantic-deep font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-romantic-rose" />
                Draw Your Shape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DrawingPad2D onConvert={handleConvert} />
            </CardContent>
          </Card>

          {/* 3D viewer */}
          <Card className="bg-white/80 backdrop-blur-sm border-romantic-rose/20 shadow-romantic-lg">
            <CardHeader>
              <CardTitle className="text-romantic-deep font-display flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-romantic-rose" />
                  Your 3D Creation
                </span>
                {showViewer && (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-romantic-rose/30 text-romantic-deep hover:bg-romantic-rose/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showViewer ? (
                <ThreeDViewer points={points} />
              ) : (
                <div className="aspect-square flex items-center justify-center text-romantic-deep/40 font-serif text-lg">
                  Draw a shape and click "Convert to 3D" to see the magic ✨
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-romantic-deep/60 font-display">
          <p className="flex items-center justify-center gap-2">
            Built with <span className="text-romantic-rose">♥</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-romantic-rose hover:text-romantic-coral transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
