"use client";
import React from "react";

interface KeyboardProps {
  layout: string[][]; 
  keyColors: Record<string, string>; 
  onKeyPress: (key: string) => void; 
}

const Keyboard: React.FC<KeyboardProps> = ({ layout, keyColors, onKeyPress }) => {
  return (
    <div className="flex flex-col gap-2">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`w-12 h-12 flex items-center justify-center text-lg font-bold rounded ${
                keyColors[key.toLowerCase()] || "bg-gray-200"
              }`}
            >
              {key === "Backspace" ? "⌫" : key === "Enter" ? "⏎" : key.toUpperCase()}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
