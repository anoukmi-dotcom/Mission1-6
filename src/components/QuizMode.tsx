import React, { useState, useEffect, useCallback } from "react";
import { VocabItem, ALL_WORDS } from "../data/missionsData";
import { AudioButton } from "./AudioButton";
import { sound } from "../utils/soundEffects";
import confetti from "canvas-confetti";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Flame,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

interface QuizModeProps {
  words: VocabItem[];
  activeMissionTitle?: string;
  onRecordScore?: (score: number, total: number) => void;
}

interface Question {
  item: VocabItem;
  questionText: string;
  questionLang: "fr" | "nl";
  correctAnswer: string;
  options: string[];
}

export const QuizMode: React.FC<QuizModeProps> = ({
  words,
  activeMissionTitle,
  onRecordScore,
}) => {
  const [direction, setDirection] = useState<"fr-nl" | "nl-fr" | "mixed">("mixed");
  const [questionCountChoice, setQuestionCountChoice] = useState<number>(10);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [missedItems, setMissedItems] = useState<VocabItem[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Generate Questions
  const generateQuestions = useCallback(
    (count: number, dir: "fr-nl" | "nl-fr" | "mixed", pool: VocabItem[]) => {
      if (pool.length === 0) return [];

      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const chosenPool = count >= shuffled.length ? shuffled : shuffled.slice(0, count);

      return chosenPool.map((item) => {
        let questionLang: "fr" | "nl" = "fr";
        if (dir === "fr-nl") questionLang = "fr";
        else if (dir === "nl-fr") questionLang = "nl";
        else questionLang = Math.random() > 0.5 ? "fr" : "nl";

        const questionText = questionLang === "fr" ? item.french : item.dutch;
        const correctAnswer = questionLang === "fr" ? item.dutch : item.french;

        const distractorPool = pool.length >= 4 ? pool : ALL_WORDS;
        const filteredDistractors = distractorPool.filter((w) => w.id !== item.id);
        const shuffledDistractors = [...filteredDistractors].sort(() => Math.random() - 0.5);

        const distractorOptions = shuffledDistractors.slice(0, 3).map((w) =>
          questionLang === "fr" ? w.dutch : w.french
        );

        const optionsSet = new Set<string>([correctAnswer, ...distractorOptions]);
        let options = Array.from(optionsSet);

        if (options.length < 4) {
          for (const w of ALL_WORDS) {
            const opt = questionLang === "fr" ? w.dutch : w.french;
            if (!options.includes(opt)) {
              options.push(opt);
              if (options.length === 4) break;
            }
          }
        }

        options = options.sort(() => Math.random() - 0.5);

        return {
          item,
          questionText,
          questionLang,
          correctAnswer,
          options,
        };
      });
    },
    []
  );

  const startQuiz = useCallback(
    (customPool?: VocabItem[]) => {
      const pool = customPool || words;
      const count = Math.min(questionCountChoice, pool.length);
      const qList = generateQuestions(count, direction, pool);
      setQuestions(qList);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setStreak(0);
      setHighestStreak(0);
      setMissedItems([]);
      setIsFinished(false);
      setIsStarted(true);
    },
    [words, questionCountChoice, direction, generateQuestions]
  );

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      sound.playCorrect();
      setScore((s) => s + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > highestStreak) {
        setHighestStreak(nextStreak);
      }
    } else {
      sound.playIncorrect();
      setStreak(0);
      setMissedItems((prev) => [...prev, currentQ.item]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedOption === questions[currentIndex].correctAnswer ? 0 : 0);
      if (onRecordScore) {
        onRecordScore(finalScore, questions.length);
      }
      if (finalScore / questions.length >= 0.7) {
        sound.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    }
  };

  // Welcome Screen before Quiz starts
  if (!isStarted) {
    const maxQuestions = words.length;
    return (
      <div className="max-w-xl mx-auto bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/40 rounded-3xl p-6 sm:p-8 border-4 border-indigo-200 shadow-md text-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md text-4xl rotate-3 animate-bounce">
          🎯
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-2">
          De Grote Franse Quiz!
        </h3>
        <p className="text-slate-600 font-medium text-sm mb-6">
          Kies de juiste antwoorden zoals in een echte quizshow! Verdien streak-vlammen 🔥 en XP-punten!
        </p>

        {/* Direction Selector */}
        <div className="text-left mb-6">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Richting van de vragen
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDirection("fr-nl")}
              className={`p-3 rounded-2xl border-2 text-xs font-black transition-all ${
                direction === "fr-nl"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-300"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              Frans ➔ Ned.
            </button>
            <button
              type="button"
              onClick={() => setDirection("nl-fr")}
              className={`p-3 rounded-2xl border-2 text-xs font-black transition-all ${
                direction === "nl-fr"
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm ring-2 ring-purple-300"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              Ned. ➔ Frans
            </button>
            <button
              type="button"
              onClick={() => setDirection("mixed")}
              className={`p-3 rounded-2xl border-2 text-xs font-black transition-all ${
                direction === "mixed"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-500 shadow-sm ring-2 ring-amber-300"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              Gemengd 🔀
            </button>
          </div>
        </div>

        {/* Question Count */}
        <div className="text-left mb-8">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Aantal vragen
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[10, 20, maxQuestions].map((count) => {
              const actual = Math.min(count, maxQuestions);
              const isSelected = questionCountChoice === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCountChoice(count)}
                  className={`p-3 rounded-2xl border-2 text-xs font-black transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-300"
                      : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                  }`}
                >
                  {count === maxQuestions ? `Alles (${maxQuestions})` : `${actual} vragen`}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => startQuiz()}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-lg font-black rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Zap size={22} className="animate-pulse" />
          <span>Start de Quiz! 🚀</span>
        </button>
      </div>
    );
  }

  // Finished Screen
  if (isFinished) {
    const totalQ = questions.length;
    const pct = Math.round((score / totalQ) * 100);
    let title = "Fantastique! 🌟";
    let subtitle = "Wat een topscore! Je kent deze Franse woorden uitstekend.";
    if (pct < 50) {
      title = "Blijf oefenen! 💪";
      subtitle = "Geen zorgen! Oefening baart kunst. Bekijk je gemiste woorden hieronder.";
    } else if (pct < 80) {
      title = "Très bien! 👍";
      subtitle = "Goed gedaan! Je bent al super ver op weg!";
    }

    return (
      <div className="max-w-xl mx-auto bg-gradient-to-br from-white via-amber-50/50 to-orange-50/50 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 rounded-3xl flex items-center justify-center mx-auto mb-4 rotate-6 shadow-md text-5xl">
          🏆
        </div>

        <h3 className="text-3xl font-black text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-600 font-medium text-sm mb-6">{subtitle}</p>

        {/* Score Card */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-white/90 rounded-2xl border-2 border-amber-200 mb-6 shadow-sm">
          <div className="text-center">
            <span className="text-xs font-bold text-slate-500">Jouw Score</span>
            <p className="text-3xl font-black text-blue-600">
              {score}/{totalQ}
            </p>
          </div>
          <div className="text-center border-x-2 border-amber-100">
            <span className="text-xs font-bold text-slate-500">Percentage</span>
            <p className="text-3xl font-black text-slate-800">{pct}%</p>
          </div>
          <div className="text-center">
            <span className="text-xs font-bold text-slate-500">Top Streak</span>
            <p className="text-3xl font-black text-orange-500 flex items-center justify-center gap-1">
              <Flame size={24} className="fill-orange-500" />
              {highestStreak}
            </p>
          </div>
        </div>

        {/* Missed Items Review */}
        {missedItems.length > 0 && (
          <div className="mb-6 text-left">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 mb-2 flex items-center gap-1">
              <span>Nog even herhalen ({missedItems.length}):</span>
            </h4>
            <div className="max-h-56 overflow-y-auto space-y-2 p-2 bg-rose-50/60 rounded-2xl border-2 border-rose-200">
              {missedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-rose-200 text-xs font-bold shadow-2xs"
                >
                  <div>
                    <span className="text-slate-900">{item.french}</span>
                    <span className="text-rose-500 mx-2">➔</span>
                    <span className="text-slate-600">{item.dutch}</span>
                  </div>
                  <AudioButton text={item.french} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {missedItems.length > 0 && (
            <button
              type="button"
              onClick={() => startQuiz(missedItems)}
              className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-105 text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-95"
            >
              Oefen enkel de gemiste woorden
            </button>
          )}
          <button
            type="button"
            onClick={() => startQuiz()}
            className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-105 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw size={18} />
            <span>Opnieuw Spelen 🔄</span>
          </button>
        </div>
      </div>
    );
  }

  // Active Question
  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  // Kahoot-style button themes
  const optionThemes = [
    {
      bg: "bg-gradient-to-r from-rose-500 to-red-600",
      symbol: "▲",
      letter: "A",
      border: "border-rose-400",
    },
    {
      bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
      symbol: "◆",
      letter: "B",
      border: "border-blue-400",
    },
    {
      bg: "bg-gradient-to-r from-amber-400 to-orange-500",
      symbol: "●",
      letter: "C",
      border: "border-amber-300",
    },
    {
      bg: "bg-gradient-to-r from-emerald-500 to-teal-600",
      symbol: "■",
      letter: "D",
      border: "border-emerald-400",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Quiz Top Bar */}
      <div className="bg-white p-3.5 rounded-3xl border-2 border-indigo-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black px-3 py-1 bg-indigo-100 text-indigo-800 rounded-xl">
            Vraag {currentIndex + 1} / {questions.length}
          </span>
          {streak >= 2 && (
            <span className="flex items-center gap-1.5 text-xs font-black text-white bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-xl shadow-xs animate-bounce">
              <Flame size={15} className="fill-white" />
              <span>{streak} streak! 🔥</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
            Score: <strong className="text-blue-600 text-sm">{score}</strong>
          </span>
          <button
            type="button"
            onClick={() => setIsStarted(false)}
            className="text-xs text-slate-400 hover:text-slate-600 font-bold underline"
          >
            Stoppen
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
        <div
          className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 rounded-3xl p-6 sm:p-8 border-4 border-indigo-200 shadow-md text-center relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-3 py-1 rounded-full">
            {currentQ.questionLang === "fr" ? "Vertaal naar het Nederlands:" : "Vertaal naar het Frans:"}
          </span>
          {currentQ.questionLang === "fr" && (
            <AudioButton text={currentQ.questionText} size="md" label="Luister" />
          )}
        </div>

        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 my-4 tracking-tight drop-shadow-2xs">
          {currentQ.questionText}
        </h3>

        {currentQ.questionLang === "nl" && (
          <p className="text-xs font-bold text-slate-500">Kies het juiste Franse woord hieronder 👇</p>
        )}
      </div>

      {/* Color-coded Options Grid (Gameshow Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQ.options.map((option, idx) => {
          const theme = optionThemes[idx % optionThemes.length];

          let customClasses = `${theme.bg} text-white hover:brightness-105 active:scale-98 shadow-md border-2 ${theme.border}`;

          if (isAnswered) {
            if (option === currentQ.correctAnswer) {
              customClasses = "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl ring-4 ring-emerald-300 scale-102 border-2 border-white animate-pulse";
            } else if (option === selectedOption) {
              customClasses = "bg-rose-600 text-white shadow-inner opacity-90 border-2 border-rose-800";
            } else {
              customClasses = "bg-slate-200 text-slate-400 opacity-40 border-2 border-slate-300";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(option)}
              className={`p-4 rounded-2xl font-black text-base sm:text-lg text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${customClasses}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/25 backdrop-blur-xs flex items-center justify-center text-sm font-black text-white shrink-0 shadow-xs">
                  {theme.symbol}
                </span>
                <span className="drop-shadow-2xs">{option}</span>
              </div>

              {isAnswered && option === currentQ.correctAnswer && (
                <CheckCircle2 size={24} className="text-white shrink-0 animate-bounce" />
              )}
              {isAnswered && option === selectedOption && option !== currentQ.correctAnswer && (
                <XCircle size={24} className="text-white shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Action when answered */}
      {isAnswered && (
        <div className="pt-2 animate-fade-in">
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>{currentIndex + 1 === questions.length ? "Bekijk Resultaat 🏆" : "Volgende Vraag ➔"}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
