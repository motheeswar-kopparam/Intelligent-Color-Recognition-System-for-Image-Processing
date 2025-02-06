import React from 'react';
import { findClosestColor } from '../utils/colorUtils';

interface ColorPaletteProps {
  colors: string[];
  onColorSelect: (color: string) => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, onColorSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {colors.map((color, index) => (
        <button
          key={index}
          onClick={() => onColorSelect(color)}
          className="group relative aspect-square rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
          <span className="absolute bottom-0 left-0 right-0 text-xs py-1 px-2 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {findClosestColor(color)}
          </span>
        </button>
      ))}
    </div>
  );
};