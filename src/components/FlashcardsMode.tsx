import React, { useState, useEffect, useCallback, useMemo } from "react";
import { VocabItem } from "../data/missionsData";
import { AudioButton } from "./AudioButton";
import { sound } from "../utils/soundEffects";
import {
  RotateCcw,
  Shuffle,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Sparkles,
  ArrowLeftRight,
  Star,
  PartyPopper,
} from "lucide-react";

interface FlashcardsModeProps {
  words: VocabItem[];
  masteredIds: Record<string, boolean>;
  onToggleMastered: (id: string, mastered: boolean) => void;
  activeMissionTitle?: string;
}

export const FlashcardsMode: React.FC<FlashcardsModeProps> = ({
  words,
  masteredIds,
  onToggleMastered,
  activeMissionTitle,
}) => {
  const [direction, setDirection] = useState<"fr-nl" | "nl-fr">("fr-nl");
  const [filter, setFilter] = useState<"all" | "learning" | "mastered">("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledWords, setShuffledWords] = useState<VocabItem[]>(words);

  // Filter words
  const activeWords = useMemo(() => {
    return shuffledWords.filter((w) => {
      const isMastered = !!masteredIds[w.id];
      if (filter === "learning") return !isMastered;
      if (filter === "mastered") return isMastered;
      return true;
    });
  }, [shuffledWords, filter, masteredIds]);

  // Sync shuffledWords when input words change
  useEffect(() => {
    setShuffledWords([...words]);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [words]);

  // Ensure index is within range if activeWords changes
  useEffect(() => {
    if (currentIndex >= activeWords.length && activeWords.length > 0) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [activeWords.length, currentIndex]);

  const currentWord = activeWords[currentIndex] || null;

  const handleFlip = useCallback(() => {
    sound.playFlip();
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    if (activeWords.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % activeWords.length);
  }, [activeWords.length]);

  const handlePrev = useCallback(() => {
    if (activeWords.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + activeWords.length) % activeWords.length);
  }, [activeWords.length]);

  const handleMarkMastered = useCallback(
    (mastered: boolean) => {
      if (!currentWord) return;
      if (mastered) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }
      onToggleMastered(currentWord.id, mastered);
      handleNext();
    },
    [currentWord, handleNext, onToggleMastered]
  );

  const handleShuffle = () => {
    sound.playFlip();
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "1") {
        handleMarkMastered(false);
      } else if (e.key === "2") {
        handleMarkMastered(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleMarkMastered]);

  const masteredCount = words.filter((w) => masteredIds[w.id]).length;

  if (activeWords.length === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-100 via-rose-100 to-purple-100 rounded-3xl p-8 border-4 border-amber-300 text-center max-w-lg mx-auto shadow-md">
        <div className="w-20 h-20 bg-amber-400 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-md rotate-6 animate-bounce">
          🎉
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">
          {filter === "learning"
            ? "Wauw, kampioen! Alles gekend! 🏆"
            : "Geen woorden gevonden met deze filter."}
        </h3>
        <p className="text-slate-700 font-medium mb-6 text-sm">
          {filter === "learning"
            ? "Je hebt alle woorden in deze selectie al helemaal onder de knie. Super gedaan!"
            : "Kies 'Alles' om alle woorden opnieuw te zien."}
        </p>
        <button
          type="button"
          onClick={() => setFilter("all")}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl transition-all shadow-md active:scale-95"
        >
          Toon alle kaarten 🗂️
        </button>
      </div>
    );
  }

  const isCurrentMastered = currentWord ? !!masteredIds[currentWord.id] : false;
  const progressPercent = Math.round(((currentIndex + 1) / activeWords.length) * 100);

  const frontText = direction === "fr-nl" ? currentWord.french : currentWord.dutch;
  const backText = direction === "fr-nl" ? currentWord.dutch : currentWord.french;
  const frontLang = direction === "fr-nl" ? "Français 🇫🇷" : "Nederlands 🇳🇱";
  const backLang = direction === "fr-nl" ? "Nederlands 🇳🇱" : "Français 🇫🇷";

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Playful Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-3xl border-2 border-indigo-100 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDirection((d) => (d === "fr-nl" ? "nl-fr" : "fr-nl"));
              setIsFlipped(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-xs hover:brightness-105 active:scale-95 transition-all"
            title="Wissel taalrichting"
          >
            <ArrowLeftRight size={14} />
            <span>{direction === "fr-nl" ? "FR ➔ NL" : "NL ➔ FR"}</span>
          </button>

          <button
            type="button"
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl shadow-xs hover:brightness-105 active:scale-95 transition-all"
            title="Schud alle kaarten"
          >
            <Shuffle size={14} />
            <span>Schudden 🔀</span>
          </button>
        </div>

        {/* Colorful Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl text-xs font-black">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-xl transition-all ${
              filter === "all"
                ? "bg-white text-indigo-700 shadow-xs ring-2 ring-indigo-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Alles ({words.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("learning")}
            className={`px-3 py-1 rounded-xl transition-all ${
              filter === "learning"
                ? "bg-amber-400 text-amber-950 shadow-xs ring-2 ring-amber-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Oefenen ({words.length - masteredCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("mastered")}
            className={`px-3 py-1 rounded-xl transition-all ${
              filter === "mastered"
                ? "bg-emerald-500 text-white shadow-xs ring-2 ring-emerald-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Gekend ({masteredCount}) ⭐
          </button>
        </div>
      </div>

      {/* Progress & Card Counter */}
      <div className="flex items-center justify-between text-xs font-black text-slate-600 px-2">
        <span className="flex items-center gap-1.5">
          <span className="text-base">🏷️</span>
          <span>
            {activeMissionTitle || "Flashcards"} • Kaart {currentIndex + 1} / {activeWords.length}
          </span>
        </span>
        <div className="flex items-center gap-2">
          {isCurrentMastered && (
            <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100 border-2 border-emerald-300 px-2.5 py-0.5 rounded-full font-black text-[11px] animate-pulse">
              <Star size={12} className="fill-emerald-600 text-emerald-600" /> Reeds gekend!
            </span>
          )}
          <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-black">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Chunky Animated Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 3D Big Colorful Flashcard */}
      <div
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={`Flashcard: ${isFlipped ? backText : frontText}. Klik om te draaien.`}
        className="cursor-pointer select-none group min-h-[320px] sm:min-h-[360px] perspective-1000 relative"
      >
        <div
          className={`w-full h-full min-h-[320px] sm:min-h-[360px] rounded-3xl transition-transform duration-500 transform-style-3d shadow-xl border-4 flex flex-col justify-between p-6 sm:p-8 relative ${
            isFlipped
              ? "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 border-amber-300 shadow-amber-100"
              : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 border-sky-300 group-hover:border-indigo-400 shadow-blue-100"
          }`}
        >
          {/* Card Top Tag & Audio */}
          <div className="flex items-center justify-between">
            <span
              className={`px-3.5 py-1 rounded-2xl text-xs font-black uppercase tracking-wider border-2 shadow-2xs ${
                isFlipped
                  ? "bg-amber-200 text-amber-900 border-amber-300"
                  : "bg-sky-200 text-sky-900 border-sky-300"
              }`}
            >
              {isFlipped ? backLang : frontLang}
              {currentWord.category ? ` • ${currentWord.category}` : ""}
            </span>

            {/* Audio Button */}
            <div onClick={(e) => e.stopPropagation()}>
              <AudioButton
                text={currentWord.french}
                size="md"
                label="Luister"
                className="shadow-sm border-2 border-blue-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Card Center Word */}
          <div className="my-auto text-center py-6">
            <h3
              className={`font-black tracking-tight leading-snug transition-colors drop-shadow-2xs ${
                isFlipped ? "text-amber-950" : "text-slate-900"
              } ${
                (isFlipped ? backText : frontText).length > 25
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl sm:text-4xl lg:text-5xl"
              }`}
            >
              {isFlipped ? backText : frontText}
            </h3>

            {isFlipped && (
              <div className="mt-5 pt-4 border-t-2 border-amber-200/80 inline-block px-4">
                <span className="text-sm font-bold text-amber-800">
                  {direction === "fr-nl" ? "Frans woord:" : "Nederlandse vertaling:"}{" "}
                  <strong className="text-amber-950 font-black text-base underline decoration-amber-400">
                    {frontText}
                  </strong>
                </span>
              </div>
            )}
          </div>

          {/* Card Bottom Hint */}
          <div className="text-center text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5 bg-white/70 backdrop-blur-xs py-1.5 px-4 rounded-full mx-auto border border-black/5 shadow-2xs">
            <RotateCcw size={14} className="text-indigo-600 group-hover:rotate-180 transition-transform duration-300" />
            <span>Tik op de kaart of druk spatie om om te draaien 🔄</span>
          </div>
        </div>
      </div>

      {/* Answer & Navigation Action Buttons (Kid-friendly & Chunky) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 font-black text-sm transition-all active:scale-95 shadow-xs"
        >
          <ArrowLeft size={18} />
          <span>Vorige</span>
        </button>

        <button
          type="button"
          onClick={() => handleMarkMastered(false)}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-sm transition-all active:scale-95 shadow-md"
          title="Nog herhalen (Sneltoets 1)"
        >
          <X size={20} />
          <span>Nog oefenen</span>
        </button>

        <button
          type="button"
          onClick={() => handleMarkMastered(true)}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm transition-all active:scale-95 shadow-md ring-2 ring-emerald-200"
          title="Ik ken dit! (Sneltoets 2)"
        >
          <Check size={20} />
          <span>Ik ken dit! ⭐</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 font-black text-sm transition-all active:scale-95 shadow-xs"
        >
          <span>Volgende</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
