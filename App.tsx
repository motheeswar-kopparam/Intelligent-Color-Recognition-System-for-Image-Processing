import React, { useState, useEffect } from 'react';
import { Upload, Pipette, Image as ImageIcon, Palette } from 'lucide-react';
import { ColorDisplay } from './components/ColorDisplay';
import { ImageCanvas } from './components/ImageCanvas';
import { findClosestColor, getImageColors } from './utils/colorUtils';
import { ColorPalette } from './components/ColorPalette';

function App() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorName, setColorName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [dominantColors, setDominantColors] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      
      // Extract dominant colors
      const colors = await getImageColors(url);
      setDominantColors(colors);
      setIsAnalyzing(false);
    }
  };

  const handleColorPick = (color: string) => {
    setSelectedColor(color);
    const name = findClosestColor(color);
    setColorName(name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Color Detection App</h1>
          <p className="text-lg text-gray-600">
            Upload an image to analyze its color palette
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02]">
            <div className="mb-6">
              <label 
                htmlFor="image-upload" 
                className={`flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all duration-300 ${
                  isAnalyzing ? 'animate-pulse' : ''
                }`}
              >
                {!imageUrl ? (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600">
                      Upload an image
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <ImageCanvas 
                      imageUrl={imageUrl}
                      onColorPick={handleColorPick}
                    />
                  </div>
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {dominantColors.length > 0 && (
              <div className="mt-6 animate-fade-in">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Color Palette
                </h3>
                <ColorPalette colors={dominantColors} onColorSelect={handleColorPick} />
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold mb-6">Color Information</h2>
            {selectedColor ? (
              <ColorDisplay color={selectedColor} name={colorName} />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Pipette className="mx-auto h-12 w-12 mb-4 animate-bounce" />
                <p>Click anywhere on the image to detect colors</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App