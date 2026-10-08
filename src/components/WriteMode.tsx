import React, { useState, useRef, useEffect } from "react";
import { VocabItem } from "../data/missionsData";
import { AccentBar } from "./AccentBar";
import { AudioButton } from "./AudioButton";
import { sound } from "../utils/soundEffects";
import confetti from "canvas-confetti";
import {
  PenTool,
  Check,
  X,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Info,
  Lightbulb,
} from "lucide-react";

interface WriteModeProps {
  words: VocabItem[];
  activeMissionTitle?: string;
  onRecordScore?: (score: number, total: number) => void;
}

function cleanString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.?!,:;]/g, "")
    .replace(/\s+/g, " ");
}

function stripAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export const WriteMode: React.FC<WriteModeProps> = ({
  words,
  activeMissionTitle,
  onRecordScore,
}) => {
  const [shuffledList, setShuffledList] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAccentClose, setIsAccentClose] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const list = [...words].sort(() => Math.random() - 0.5);
    setShuffledList(list);
    setCurrentIndex(0);
    setUserInput("");
    setHasChecked(false);
    setIsCorrect(false);
    setIsAccentClose(false);
    setScore(0);
    setCompleted(false);
  }, [words]);

  useEffect(() => {
    if (!completed && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex, completed]);

  const currentItem = shuffledList[currentIndex];

  const handleInsertChar = (char: string) => {
    setUserInput((prev) => prev + char);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentItem || hasChecked || !userInput.trim()) return;

    const target = cleanString(currentItem.french);
    const entered = cleanString(userInput);

    const targetVariants = [target];
    if (target.includes("(auto)bus")) targetVariants.push("autobus", "bus");
    if (target.includes("(le)")) {
      targetVariants.push(target.replace("(le)", "").trim());
      targetVariants.push(target.replace("(le)", "le").trim());
    }
    if (target.includes("(vision)")) {
      targetVariants.push(target.replace("(vision)", "").trim());
      targetVariants.push(target.replace("(vision)", "vision").trim());
    }
    if (target.includes("/")) {
      target.split("/").forEach((p) => targetVariants.push(cleanString(p)));
    }

    const exactMatch = targetVariants.some((v) => v === entered);

    if (exactMatch) {
      sound.playCorrect();
      setIsCorrect(true);
      setIsAccentClose(false);
      setScore((s) => s + 1);
    } else {
      const targetNoAccents = stripAccents(target);
      const enteredNoAccents = stripAccents(entered);
      const accentIssue = targetNoAccents === enteredNoAccents;

      sound.playIncorrect();
      setIsCorrect(false);
      setIsAccentClose(accentIssue);
    }

    setHasChecked(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < shuffledList.length) {
      setCurrentIndex((i) => i + 1);
      setUserInput("");
      setHasChecked(false);
      setIsCorrect(false);
      setIsAccentClose(false);
      setShowHint(false);
    } else {
      setCompleted(true);
      if (onRecordScore) {
        onRecordScore(score + (isCorrect ? 1 : 0), shuffledList.length);
      }
      if ((score / shuffledList.length) >= 0.7) {
        sound.playFanfare();
        confetti({ particleCount: 90, spread: 75 });
      }
    }
  };

  const handleRestart = () => {
    const list = [...words].sort(() => Math.random() - 0.5);
    setShuffledList(list);
    setCurrentIndex(0);
    setUserInput("");
    setHasChecked(false);
    setIsCorrect(false);
    setIsAccentClose(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const total = shuffledList.length;
    const pct = Math.round((score / total) * 100);

    return (
      <div className="max-w-xl mx-auto bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50 rounded-3xl p-8 border-4 border-emerald-300 text-center shadow-lg">
        <div className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-teal-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-4xl shadow-md rotate-6 animate-bounce">
          🎉
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-2">
          Schrijfoefening Afgerond!
        </h3>
        <p className="text-slate-600 font-medium text-sm mb-6">
          Je hebt alle {total} woorden geoefend zoals in de F-kolom van je lesblad!
        </p>

        <div className="p-5 bg-white rounded-2xl border-2 border-emerald-200 mb-6 inline-block min-w-[220px] shadow-sm">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
            Jouw Schrijfscore
          </span>
          <p className="text-4xl font-black text-emerald-600 mt-1">
            {score} / {total}
          </p>
          <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mt-2">
            {pct}% nauwkeurig
          </span>
        </div>

        <div>
          <button
            type="button"
            onClick={handleRestart}
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto active:scale-95"
          >
            <RotateCcw size={18} />
            <span>Nog eens oefenen ✍️</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Top Header & Counter */}
      <div className="bg-white p-3.5 rounded-3xl border-2 border-emerald-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-gradient-to-tr from-emerald-400 to-teal-500 text-white rounded-xl shadow-xs">
            <PenTool size={16} />
          </span>
          <div>
            <span className="text-sm font-black text-slate-900 block leading-tight">
              F-Kolom Schrijfoefening
            </span>
            <span className="text-[11px] font-semibold text-emerald-700">
              Schrijf net zoals op je werkblad 📝
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl">
            {currentIndex + 1} / {shuffledList.length}
          </span>
          <span className="text-xs font-black px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-xl">
            Juist: {score} ⭐
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
        <div
          className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${Math.round(((currentIndex) / shuffledList.length) * 100)}%` }}
        />
      </div>

      {/* Prompt Card */}
      <div className="bg-gradient-to-br from-white via-teal-50/40 to-emerald-50/40 rounded-3xl p-6 sm:p-8 border-4 border-emerald-200 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
            Nederlands (N-kolom)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowHint((h) => !h)}
              className="text-xs text-teal-700 hover:text-teal-900 font-black flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-xl border border-teal-200"
            >
              <Lightbulb size={14} className="text-amber-500 fill-amber-400" />
              <span>{showHint ? "Verberg hint" : "Hint"}</span>
            </button>
            <AudioButton text={currentItem.french} size="sm" label="Luister" />
          </div>
        </div>

        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 drop-shadow-2xs">
          {currentItem.dutch}
        </h3>

        {showHint && (
          <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-xs text-amber-900 mb-4 inline-flex items-center gap-2 shadow-2xs">
            <Info size={16} className="text-amber-600 shrink-0" />
            <span>
              Eerste letter: <strong className="text-base text-amber-950 font-black">{currentItem.french.charAt(0)}</strong> (totaal{" "}
              {currentItem.french.length} letters)
            </span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleCheck} className="space-y-4 mt-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
              Typ in het Frans (F-kolom):
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                disabled={hasChecked}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Typ het Franse woord hier..."
                className={`w-full px-5 py-4 text-xl font-black rounded-2xl border-4 transition-all outline-hidden ${
                  hasChecked
                    ? isCorrect
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950 ring-4 ring-emerald-200"
                      : "bg-rose-50 border-rose-500 text-rose-950 ring-4 ring-rose-200"
                    : "bg-white border-slate-300 focus:border-teal-500 text-slate-800 shadow-inner"
                }`}
              />

              {hasChecked && (
                <div className="absolute right-4 top-4">
                  {isCorrect ? (
                    <span className="p-1.5 bg-emerald-500 text-white rounded-full flex items-center justify-center animate-bounce shadow-xs">
                      <Check size={20} />
                    </span>
                  ) : (
                    <span className="p-1.5 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xs">
                      <X size={20} />
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Accent Helper Toolbar */}
          {!hasChecked && <AccentBar onInsert={handleInsertChar} />}

          {/* Feedback Section */}
          {hasChecked && (
            <div
              className={`p-4 rounded-2xl border-2 ${
                isCorrect
                  ? "bg-emerald-100 border-emerald-300 text-emerald-950"
                  : isAccentClose
                  ? "bg-amber-100 border-amber-300 text-amber-950"
                  : "bg-rose-100 border-rose-300 text-rose-950"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-black text-sm">
                    {isCorrect
                      ? "Wauw! Helemaal perfect geschreven! 🎉"
                      : isAccentClose
                      ? "Bijna helemaal juist! Let goed op het accent: 💡"
                      : "Niet helemaal juist. Bekijk de juiste spelling:"}
                  </p>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold opacity-75">Juiste schrijfwijze:</span>
                    <span className="text-lg font-black underline decoration-2">
                      {currentItem.french}
                    </span>
                    <AudioButton text={currentItem.french} size="sm" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Button actions */}
          <div>
            {!hasChecked ? (
              <button
                type="submit"
                disabled={!userInput.trim()}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 disabled:opacity-50 text-white font-black text-base rounded-2xl shadow-lg transition-all active:scale-95"
              >
                Controleer mijn spelling ↵
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>
                  {currentIndex + 1 === shuffledList.length
                    ? "Bekijk Eindresultaat 🏆"
                    : "Volgend Woord ➔"}
                </span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
