import React from 'react';

interface ColorDisplayProps {
  color: string;
  name: string;
}

export const ColorDisplay: React.FC<ColorDisplayProps> = ({ color, name }) => {
  return (
    <div className="space-y-6">
      <div 
        className="w-full h-32 rounded-lg shadow-inner"
        style={{ backgroundColor: color }}
      />
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Color Name</label>
          <p className="text-lg font-semibold">{name}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600">RGB Value</label>
          <p className="text-lg font-mono">{color}</p>
        </div>
      </div>
    </div>
  );
};