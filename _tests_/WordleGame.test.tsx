import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WordleGame from "@/app/components/WordleGame";

describe("WordleGame Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Letters in the correct position are highlighted green", async () => {

    render(<WordleGame correctWord="water" />);

    const startGameButton = screen.getByRole("button", { name: /start game/i });
    await userEvent.click(startGameButton);


    await userEvent.keyboard("water{Enter}");


    await screen.findByText(/congratulations/i);

    "water".split("").forEach((_, index) => {
      const letterBox = screen.getByTestId(`letter-0-${index}`);
      expect(letterBox).toHaveClass("bg-green-500");
    });
  });

  test("Extra letters do not get yellow highlight", async () => {
    render(<WordleGame correctWord="water" />);
  
 
    const startGameButton = screen.getByRole("button", { name: /start game/i });
    await userEvent.click(startGameButton);
  

    await userEvent.keyboard("otter{Enter}");

    const letterBox0 = screen.getByTestId("letter-0-0");
    expect(letterBox0).toHaveClass("bg-gray-400 text-black");
    expect(letterBox0).toHaveTextContent("o");
  

    const letterBox1 = screen.getByTestId("letter-0-1");
    expect(letterBox1).toHaveClass("bg-gray-400 text-black");
    expect(letterBox1).toHaveTextContent("t");
  

    const letterBox2 = screen.getByTestId("letter-0-2");
    expect(letterBox2).toHaveClass("bg-green-500 text-white");
    expect(letterBox2).toHaveTextContent("t");
  
 
    const letterBox3 = screen.getByTestId("letter-0-3");
    expect(letterBox3).toHaveClass("bg-green-500 text-white");
    expect(letterBox3).toHaveTextContent("e");
  

    const letterBox4 = screen.getByTestId("letter-0-4");
    expect(letterBox4).toHaveClass("bg-green-500 text-white");
    expect(letterBox4).toHaveTextContent("r");
  });
  
  
  
  
});
