import React, { useRef, useEffect } from 'react';

interface ImageCanvasProps {
  imageUrl: string;
  onColorPick: (color: string) => void;
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageUrl, onColorPick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    contextRef.current = context;
    const image = new Image();
    image.src = imageUrl;
    
    image.onload = () => {
      // Calculate aspect ratio to maintain image proportions
      const aspectRatio = image.width / image.height;
      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvasWidth / aspectRatio;
      
      // Set canvas dimensions
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // Draw image
      context.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    };
  }, [imageUrl]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const pixel = context.getImageData(x, y, 1, 1).data;
    const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    
    onColorPick(color);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="w-full h-full object-contain cursor-crosshair"
    />
  );
};