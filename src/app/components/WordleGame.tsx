"use client";

import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import IntroductionModal from "./IntroductionModal";
import words from "./DbWords";
const keyboardLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Backspace", "z", "x", "c", "v", "b", "n", "m", "Enter"],
];

interface WordleGameProps {
  correctWord: string;
}

const WordleGame: React.FC<WordleGameProps> = ({ correctWord }) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [keyColors, setKeyColors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [colors, setColors] = useState<string[][]>([]);
  const [showIntroduction, setShowIntroduction] = useState<boolean>(true);
  const maxGuesses = 5;

  const handlePlayAgain = () => {
    setGuesses([]);
    setCurrentGuess("");
    setKeyColors({});
    setMessage("");
    setIsCorrect(false);
    setColors([]);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (showIntroduction || isCorrect || guesses.length >= maxGuesses) return;

      if (key === "enter") {
        handleSubmit();
      } else if (key === "backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentGuess, guesses, isCorrect, showIntroduction]);

  const handleVirtualKey = (key: string) => {
    if (showIntroduction || isCorrect || guesses.length >= maxGuesses) return;

    if (key === "Enter") {
      handleSubmit();
    } else if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key.toLowerCase());
    }
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 5) {
      setMessage("Guess must be exactly 5 letters.");
      return;
    }

    if (!words.includes(currentGuess)) {
      setMessage("Not a valid word.");
      return;
    }
  
    const newKeyColors = { ...keyColors };
    const resultColors: string[] = Array(5).fill("bg-gray-400 text-black");
    const correctWordUsage = Array(5).fill(false);
  
    currentGuess.split("").forEach((letter, index) => {
      if (letter === correctWord[index]) {
        resultColors[index] = "bg-green-500 text-white";
        correctWordUsage[index] = true;
        newKeyColors[letter] = "bg-green-500";
      }
    });
  
    currentGuess.split("").forEach((letter, index) => {
      if (resultColors[index] === "bg-gray-400 text-black") {
        const wrongPositionIndex = correctWord
          .split("")
          .findIndex(
            (l, i) => l === letter && !correctWordUsage[i] && i !== index
          );
  
        if (wrongPositionIndex !== -1) {
          resultColors[index] = "bg-yellow-500 text-black";
          correctWordUsage[wrongPositionIndex] = true;
          if (newKeyColors[letter] !== "bg-green-500") {
            newKeyColors[letter] = "bg-yellow-500";
          }
        } else {
          newKeyColors[letter] = "bg-gray-400";
        }
      }
    });
  
    setGuesses([...guesses, currentGuess]);
    setKeyColors(newKeyColors);
    setColors([...colors, resultColors]);
    setCurrentGuess("");
  
    if (currentGuess === correctWord) {
      setIsCorrect(true);
      setMessage("🎉 Congratulations! You guessed the word!");
    } else if (guesses.length + 1 === maxGuesses) {
      setMessage(`💀 Game over! The correct word was "${correctWord}".`);
    } else {
      setMessage(`Attempt ${guesses.length + 1} of ${maxGuesses}`);
    }
  };
  
  const getLetterClass = (colIndex: number, rowIndex: number): string => {
    if (rowIndex >= guesses.length) return "bg-slate-100"; // Empty rows
    const assignedClass = colors[rowIndex][colIndex] || "bg-gray-400 text-black"; // Default to gray if no color assigned
    return assignedClass;
  };
  
  const handleCloseIntroduction = () => {
    setShowIntroduction(false);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-8">
      {showIntroduction && <IntroductionModal onClose={handleCloseIntroduction} />}

      <div className="grid grid-rows-5 gap-4">
  {Array(maxGuesses)
    .fill("")
    .map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-2 grid-row">
        {Array(5)
          .fill("")
          .map((_, colIndex) => {
            const guess = guesses[rowIndex] || "";
            const letter =
              rowIndex === guesses.length
                ? currentGuess[colIndex] || ""
                : guess[colIndex] || "";
            return (
              <div
                key={colIndex}
                data-testid={`letter-${rowIndex}-${colIndex}`} 
                className={`w-12 h-12 flex border-2 border-slate-300 items-center justify-center text-lg font-bold rounded ${getLetterClass(
                  colIndex,
                  rowIndex
                )}`}
              >
                {letter}
              </div>
            );
          })}
      </div>
    ))}
</div>


      <Keyboard layout={keyboardLayout} keyColors={keyColors} onKeyPress={handleVirtualKey} />

      <div style={{ minHeight: "1.5rem" }}>
        <p className="text-sm text-gray-700">{message}</p>
      </div>

      <div style={{ minHeight: "3rem" }}>
        {(isCorrect || guesses.length >= maxGuesses) && (
          <button
            onClick={handlePlayAgain}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default WordleGame;
