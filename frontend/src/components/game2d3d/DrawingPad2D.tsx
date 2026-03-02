import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Trash2 } from 'lucide-react';

interface DrawingPad2DProps {
  onConvert: (points: Array<{ x: number; y: number }>) => void;
}

export function DrawingPad2D({ onConvert }: DrawingPad2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#fef6f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#f4d4c8';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw points and lines
    if (points.length > 0) {
      ctx.strokeStyle = '#e85d75';
      ctx.fillStyle = '#e85d75';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      
      ctx.stroke();

      // Draw points
      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }, [points]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (coords) {
      setIsDrawing(true);
      setPoints([coords]);
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const coords = getCoordinates(e);
    if (coords) {
      setPoints((prev) => [...prev, coords]);
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setPoints([]);
  };

  const handleConvert = () => {
    if (points.length < 3) {
      alert('Please draw a shape with at least 3 points!');
      return;
    }
    onConvert(points);
  };

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="w-full aspect-square border-2 border-romantic-rose/30 rounded-lg cursor-crosshair touch-none"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
      
      <div className="flex gap-3">
        <Button
          onClick={handleClear}
          variant="outline"
          className="flex-1 border-romantic-rose/30 text-romantic-deep hover:bg-romantic-rose/10"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <Button
          onClick={handleConvert}
          disabled={points.length < 3}
          className="flex-1 bg-romantic-rose hover:bg-romantic-coral text-white"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Convert to 3D
        </Button>
      </div>

      <p className="text-sm text-romantic-deep/60 text-center font-serif">
        Draw a closed shape with your mouse or finger
      </p>
    </div>
  );
}
