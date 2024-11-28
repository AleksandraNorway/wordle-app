import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordleGame from '@/app/components/WordleGame';

// Mock DbWords to include the correct word
jest.mock('@/app/components/DbWords', () => ['water']);

describe('WordleGame Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Letters in the correct position are highlighted green', async () => {
    render(<WordleGame />);

    // Close the introduction modal
    const startGameButton = screen.getByRole('button', { name: /start game/i });
    await userEvent.click(startGameButton);

    // Simulate typing the correct word
    for (const letter of 'water') {
      await userEvent.keyboard(letter);
    }
    await userEvent.keyboard('{Enter}');

    // Wait for the success message
    await screen.findByText(/congratulations/i);

    // Verify each letter is highlighted green
    'water'.split('').forEach((_, index) => {
      const letterBox = screen.getByTestId(`letter-0-${index}`);
      expect(letterBox).toHaveClass('bg-green-500');
    });
  });


  test('Extra letters do not get yellow highlight', async () => {
    render(<WordleGame />);
  
    // Close the introduction modal
    const startGameButton = screen.getByRole('button', { name: /start game/i });
    await userEvent.click(startGameButton);
  
    // Simulate typing an incorrect word
    for (const letter of 'otter') {
      await userEvent.keyboard(letter);
    }
    await userEvent.keyboard('{Enter}');
  
    // Debugging: Check all letter boxes
    screen
      .getAllByTestId(/letter-0-\d/)
      .forEach((letterBox, index) =>
        console.log(`Letter box ${index}:`, letterBox.className)
      );
  
    // Verify the first letter is gray (not in the word)
    const firstLetterBox = screen.getByTestId('letter-0-0');
    expect(firstLetterBox).toHaveClass('bg-gray-400');
  });
  
});
