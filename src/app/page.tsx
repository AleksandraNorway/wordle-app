import WordleGame from "@/app/components/WordleGame";
import "@/app/globals.css";
import words from "@/app/components/DbWords";

export default function Home() {

  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
  const predefinedWord = getRandomWord();

  return (
    <div className="flex bg-slate-50 flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center space-y-12">
        <h1 className="font-bold text-6xl text-slate-500">Wordle</h1>
        <WordleGame predefinedWord={predefinedWord} />
      </main>
    </div>
  );
}