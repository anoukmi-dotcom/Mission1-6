import React, { useState, useEffect, useCallback } from "react";
import { VocabItem } from "../data/missionsData";
import { sound } from "../utils/soundEffects";
import { speakFrench } from "../data/missionsData";
import confetti from "canvas-confetti";
import {
  Gamepad2,
  RotateCcw,
  Clock,
  Trophy,
  CheckCircle2,
  Star,
} from "lucide-react";

interface MemoryModeProps {
  words: VocabItem[];
  activeMissionTitle?: string;
}

interface MemoryCard {
  id: string;
  pairId: string;
  text: string;
  lang: "fr" | "nl";
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_ICONS = ["🗼", "🥐", "🥖", "⚽", "🚲", "🎒", "🎨", "🐶", "⭐", "🧀", "🎪", "🚀"];

export const MemoryMode: React.FC<MemoryModeProps> = ({
  words,
  activeMissionTitle,
}) => {
  const [pairCount, setPairCount] = useState<6 | 8>(6);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWon, setIsWon] = useState(false);

  const initGame = useCallback(() => {
    if (words.length === 0) return;

    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const chosen = shuffledWords.slice(0, Math.min(pairCount, words.length));

    const cardList: MemoryCard[] = [];
    chosen.forEach((w, idx) => {
      const icon = CARD_ICONS[idx % CARD_ICONS.length];
      cardList.push({
        id: `${w.id}-fr`,
        pairId: w.id,
        text: w.french,
        lang: "fr",
        icon,
        isFlipped: false,
        isMatched: false,
      });
      cardList.push({
        id: `${w.id}-nl`,
        pairId: w.id,
        text: w.dutch,
        lang: "nl",
        icon,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(cardList.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsLocked(false);
    setSeconds(0);
    setIsRunning(true);
    setIsWon(false);
  }, [words, pairCount]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && !isWon) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isWon]);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    const clickedCard = cards[index];
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    sound.playFlip();

    if (clickedCard.lang === "fr") {
      speakFrench(clickedCard.text);
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        sound.playCorrect();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
          const nextMatched = matchedPairs + 1;
          setMatchedPairs(nextMatched);

          const totalPossiblePairs = Math.min(pairCount, words.length);
          if (nextMatched === totalPossiblePairs) {
            setIsWon(true);
            setIsRunning(false);
            sound.playFanfare();
            confetti({
              particleCount: 110,
              spread: 85,
              origin: { y: 0.6 },
            });
          }
        }, 500);
      } else {
        sound.playIncorrect();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 1100);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const totalPairsTarget = Math.min(pairCount, words.length);

  let stars = 3;
  if (moves > totalPairsTarget * 2.2) stars = 1;
  else if (moves > totalPairsTarget * 1.5) stars = 2;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Control bar */}
      <div className="bg-white p-3.5 rounded-3xl border-2 border-pink-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-gradient-to-tr from-pink-500 to-rose-500 text-white rounded-xl shadow-xs">
            <Gamepad2 size={18} />
          </span>
          <div>
            <span className="font-black text-sm text-slate-900 block leading-tight">
              Memory Koppelspel
            </span>
            <span className="text-[11px] font-semibold text-pink-700">
              Koppel Frans & Nederlands 🧩
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs font-black">
          <div className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            <Clock size={15} className="text-pink-600" />
            <span>{formatTime(seconds)}</span>
          </div>

          <div className="text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
            Zetten: <strong className="text-slate-900">{moves}</strong>
          </div>

          <div className="text-pink-800 bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-200">
            Gevonden: <strong>{matchedPairs}/{totalPairsTarget}</strong> ⭐
          </div>

          <button
            type="button"
            onClick={initGame}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors active:scale-95"
            title="Herstart met nieuwe kaartjes"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Grid Settings */}
      <div className="flex items-center justify-between text-xs font-black text-slate-600 px-2">
        <span>Aantal paren:</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPairCount(6)}
            className={`px-3 py-1 rounded-xl font-black transition-all ${
              pairCount === 6
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            6 paren (12 kaarten)
          </button>
          <button
            type="button"
            onClick={() => setPairCount(8)}
            className={`px-3 py-1 rounded-xl font-black transition-all ${
              pairCount === 8
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            8 paren (16 kaarten)
          </button>
        </div>
      </div>

      {/* Memory Grid */}
      <div
        className={`grid gap-3 ${
          cards.length <= 12
            ? "grid-cols-3 sm:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-4"
        }`}
      >
        {cards.map((card, idx) => {
          const isFlipped = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.id}
              type="button"
              disabled={isFlipped || isLocked}
              onClick={() => handleCardClick(idx)}
              className={`h-24 sm:h-28 rounded-2xl p-2.5 text-center flex flex-col items-center justify-center transition-all duration-300 transform select-none relative border-4 ${
                card.isMatched
                  ? "bg-emerald-100 border-emerald-400 text-emerald-950 scale-95 shadow-xs"
                  : isFlipped
                  ? card.lang === "fr"
                    ? "bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-400 text-blue-950 shadow-md rotate-0"
                    : "bg-gradient-to-br from-amber-100 to-orange-100 border-amber-400 text-amber-950 shadow-md rotate-0"
                  : "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-purple-300 text-white shadow-md hover:scale-103 hover:shadow-lg cursor-pointer"
              }`}
            >
              {isFlipped ? (
                <div className="w-full flex flex-col items-center justify-between h-full">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      card.lang === "fr"
                        ? "bg-blue-300 text-blue-950"
                        : "bg-amber-300 text-amber-950"
                    }`}
                  >
                    {card.lang === "fr" ? "Français 🇫🇷" : "Nederlands 🇳🇱"}
                  </span>
                  <span className="font-black text-xs sm:text-sm my-auto leading-tight line-clamp-3 drop-shadow-2xs">
                    {card.text}
                  </span>
                  {card.isMatched && (
                    <span className="text-emerald-700 animate-bounce">
                      <CheckCircle2 size={16} />
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-2xl sm:text-3xl filter drop-shadow-xs">
                    {card.icon}
                  </span>
                  <span className="text-[10px] font-black text-white/90 uppercase tracking-wider">
                    Draai om!
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Won Dialog */}
      {isWon && (
        <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-3xl p-6 sm:p-8 border-4 border-pink-300 shadow-xl text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-md text-4xl rotate-3">
            🏆
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-1">
            Gefeliciteerd, alles gevonden! 🎉
          </h3>
          <p className="text-slate-600 font-semibold text-sm mb-4">
            Je hebt alle Franse en Nederlandse paren gekoppeld in {formatTime(seconds)} en {moves} zetten!
          </p>

          <div className="flex justify-center gap-2 mb-6 text-4xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={
                  i < stars
                    ? "text-amber-400 drop-shadow-xs animate-bounce"
                    : "text-slate-300"
                }
              >
                ★
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={initGame}
            className="px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto active:scale-95"
          >
            <RotateCcw size={18} />
            <span>Nieuw Spelletje Spelen 🎮</span>
          </button>
        </div>
      )}
    </div>
  );
};
