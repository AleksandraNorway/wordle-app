import React from "react";

interface IntroductionModalProps {
  onClose: () => void;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({ onClose }) => {
  return (
    <div
  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
      <div className="bg-white p-6 rounded shadow-lg max-w-md text-left">
      <h2 id="modal-title" className="text-2xl font-bold mb-4">Welcome to Wordle Game!</h2>
      <p id="modal-description" className="mb-2">
          <strong>How to Play:</strong>
        </p>
        <ul className="list-disc list-inside mb-4 text-left">
          <li>Guess the hidden 5-letter word within 5 attempts.</li>
          <li>
            Type a valid 5-letter word and press <strong>Enter</strong>.
          </li>
          <li>
            After each guess, the color of the tiles will change to show how
            close your guess was:
            <ul className="list-none ml-4">
              <li>
                <span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>
                <strong>Green:</strong> Correct letter in the correct spot.
              </li>
              <li>
                <span className="inline-block w-4 h-4 bg-yellow-500 mr-2"></span>
                <strong>Yellow:</strong> Correct letter in the wrong spot.
              </li>
              <li>
                <span className="inline-block w-4 h-4 bg-gray-300 mr-2"></span>
                <strong>Gray:</strong> Letter not in the word.
              </li>
            </ul>
          </li>
          <li>Use the on-screen keyboard or your physical keyboard.</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default IntroductionModal;
