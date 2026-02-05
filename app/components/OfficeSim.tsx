'use client';

import { useState } from 'react';

type Option = {
  text: string;
  scoreDelta: number;
  feedback: string;
};

type Scene = {
  id: number;
  speaker: string;
  text: string;
  options: Option[];
};

const SCENARIO: Scene[] = [
  {
    id: 1,
    speaker: "Department Head Tanaka",
    text: "Ah, you must be the new hire. Welcome to the sales division.",
    options: [
      { text: "Yo! Nice to meet you.", scoreDelta: -20, feedback: "Too casual! Use Sonkeigo/Teineigo." },
      { text: "Nice to meet you. I am [Name].", scoreDelta: 5, feedback: "Acceptable, but standard." },
      { text: "It is an honor to meet you. I am [Name], humbled to be here.", scoreDelta: 20, feedback: "Perfect Kenjougo (Humble Language)." }
    ]
  },
  {
    id: 2,
    speaker: "Department Head Tanaka",
    text: "Please, have a seat.",
    options: [
      { text: "Okay, thanks.", scoreDelta: -10, feedback: "Rude." },
      { text: "Excuse me (Shitsurei shimasu).", scoreDelta: 10, feedback: "Correct standard phrase when sitting." },
      { text: "I will humbly partake in the sitting.", scoreDelta: -5, feedback: "Overly weird grammar." }
    ]
  },
  {
    id: 3,
    speaker: "Department Head Tanaka",
    text: "Did you bring the documents?",
    options: [
      { text: "Yeah, here.", scoreDelta: -20, feedback: "Terrible." },
      { text: "Yes, I have them right here.", scoreDelta: 5, feedback: "Polite (Teineigo)." },
      { text: "Yes, I have brought them (Haiken itashimashita... wait no).", scoreDelta: -5, feedback: "Wrong verb!" }, 
      { text: "Yes, here they are (Hai, o-mochi shimashita).", scoreDelta: 15, feedback: "Correct Humble form." }
    ]
  },
  {
    id: 4,
    speaker: "Department Head Tanaka",
    text: "Good work today. You may leave early.",
    options: [
      { text: "Sweet! Cya.", scoreDelta: -50, feedback: "You are fired." },
      { text: "Thank you. Excuse me (Shitsurei shimasu).", scoreDelta: 10, feedback: "Good." },
      { text: "I humbly receive your permission to vanish.", scoreDelta: 0, feedback: "A bit dramatic, but okay." }
    ]
  }
];

export default function OfficeSim() {
  const [step, setStep] = useState(0);
  const [respect, setRespect] = useState(50); // Start at 50/100
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentScene = SCENARIO[step];

  const handleChoice = (option: Option) => {
    const newRespect = Math.min(100, Math.max(0, respect + option.scoreDelta));
    setRespect(newRespect);
    setFeedback(option.feedback);

    if (newRespect <= 0) {
        setGameOver(true);
        setFeedback("You were fired for rudeness.");
        return;
    }

    setTimeout(() => {
        setFeedback(null);
        if (step < SCENARIO.length - 1) {
            setStep(step + 1);
        } else {
            setGameOver(true);
        }
    }, 2000);
  };

  const restart = () => {
    setStep(0);
    setRespect(50);
    setFeedback(null);
    setGameOver(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Respect Meter */}
      <div className="bg-gray-200 rounded-full h-6 w-full overflow-hidden border border-gray-400">
         <div 
            className={`h-full transition-all duration-500 ${respect < 30 ? 'bg-red-500' : respect < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${respect}%` }}
         ></div>
      </div>
      <div className="text-right text-xs font-mono text-gray-500">Reputation: {respect}/100</div>

      {/* Main Viewport */}
      <div className="aspect-video bg-gray-100 border-4 border-gray-800 rounded-lg relative overflow-hidden shadow-2xl">
         {/* Background (Office) */}
         <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#d1d5db_50%,#9ca3af_50%)] opacity-50"></div>
         <div className="absolute bottom-20 left-10 w-32 h-64 bg-gray-300 border border-gray-400 transform skew-x-12"></div>
         <div className="absolute bottom-20 right-10 w-32 h-64 bg-gray-300 border border-gray-400 transform -skew-x-12"></div>

         {/* NPC */}
         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-blue-900 rounded-t-full flex items-center justify-center">
             <div className="w-32 h-32 bg-amber-200 rounded-full mb-12 relative">
                 <div className="absolute top-10 left-6 w-4 h-4 bg-black rounded-full"></div>
                 <div className="absolute top-10 right-6 w-4 h-4 bg-black rounded-full"></div>
                 <div className="absolute bottom-6 left-10 w-12 h-2 bg-black/50 rounded-full"></div>
             </div>
             {/* Tie */}
             <div className="absolute bottom-0 w-8 h-24 bg-red-700"></div>
         </div>

         {/* Dialogue Overlay */}
         {feedback ? (
             <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-8 text-center animate-pulse">
                 <h2 className="text-2xl text-white font-bold">{feedback}</h2>
             </div>
         ) : gameOver ? (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-white gap-4">
                <h1 className="text-4xl font-bold">{respect > 60 ? "PROMOTION!" : "GAME OVER"}</h1>
                <p>Final Score: {respect}</p>
                <button onClick={restart} className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200">Try Again</button>
            </div>
         ) : (
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 border-t-4 border-blue-900 p-6 min-h-[160px]">
                <h3 className="font-bold text-blue-900 mb-2">{currentScene.speaker}</h3>
                <p className="text-lg text-gray-800 mb-6 font-serif">"{currentScene.text}"</p>
                
                <div className="grid grid-cols-1 gap-2">
                    {currentScene.options.map((opt, i) => (
                        <button 
                            key={i}
                            onClick={() => handleChoice(opt)}
                            className="bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left px-4 py-2 rounded text-blue-900 transition-colors"
                        >
                            ▶ {opt.text}
                        </button>
                    ))}
                </div>
            </div>
         )}
      </div>
    </div>
  );
}
