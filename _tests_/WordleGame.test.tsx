import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WordleGame from "@/app/components/WordleGame";

describe("WordleGame Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Letters in the correct position are highlighted green", async () => {
    // Render the WordleGame component with a predefined correct word
    render(<WordleGame correctWord="water" />);

    // Close the introduction modal
    const startGameButton = screen.getByRole("button", { name: /start game/i });
    await userEvent.click(startGameButton);

    // Simulate typing the correct word
    await userEvent.keyboard("water{Enter}");

    // Wait for the success message
    await screen.findByText(/congratulations/i);

    // Verify each letter is highlighted green
    "water".split("").forEach((_, index) => {
      const letterBox = screen.getByTestId(`letter-0-${index}`);
      expect(letterBox).toHaveClass("bg-green-500");
    });
  });

  test("Extra letters do not get yellow highlight", async () => {
    render(<WordleGame correctWord="water" />);
  
    // Close the introduction modal
    const startGameButton = screen.getByRole("button", { name: /start game/i });
    await userEvent.click(startGameButton);
  
    // Simulate typing 'otter{Enter}'
    await userEvent.keyboard("otter{Enter}");
  
    // Now check the letter boxes
  
    // Index 0: 'o' should be gray
    const letterBox0 = screen.getByTestId("letter-0-0");
    expect(letterBox0).toHaveClass("bg-gray-400 text-black");
    expect(letterBox0).toHaveTextContent("o");
  
    // Index 1: 't' (first 't') should be gray (extra 't')
    const letterBox1 = screen.getByTestId("letter-0-1");
    expect(letterBox1).toHaveClass("bg-gray-400 text-black");
    expect(letterBox1).toHaveTextContent("t");
  
    // Index 2: 't' (second 't') should be green (correct position)
    const letterBox2 = screen.getByTestId("letter-0-2");
    expect(letterBox2).toHaveClass("bg-green-500 text-white");
    expect(letterBox2).toHaveTextContent("t");
  
    // Index 3: 'e' should be green (correct position)
    const letterBox3 = screen.getByTestId("letter-0-3");
    expect(letterBox3).toHaveClass("bg-green-500 text-white");
    expect(letterBox3).toHaveTextContent("e");
  
    // Index 4: 'r' should be green (correct position)
    const letterBox4 = screen.getByTestId("letter-0-4");
    expect(letterBox4).toHaveClass("bg-green-500 text-white");
    expect(letterBox4).toHaveTextContent("r");
  });
  
  
  
  
});
