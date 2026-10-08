/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  MISSIONS_DATA,
  ALL_WORDS,
  VocabItem,
  Mission,
} from "./data/missionsData";
import { loadProgress, saveProgress, ProgressState } from "./utils/progressStore";
import { sound } from "./utils/soundEffects";
import { MissionSelector } from "./components/MissionSelector";
import { FlashcardsMode } from "./components/FlashcardsMode";
import { QuizMode } from "./components/QuizMode";
import { WriteMode } from "./components/WriteMode";
import { MemoryMode } from "./components/MemoryMode";
import { WordListMode } from "./components/WordListMode";
import {
  BookOpen,
  HelpCircle,
  PenTool,
  Gamepad2,
  TableProperties,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  RotateCcw,
  Flame,
  Award,
} from "lucide-react";

type Mode = "flashcards" | "quiz" | "write" | "memory" | "list";

export default function App() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(1); // Default to Mission 1
  const [activeMode, setActiveMode] = useState<Mode>("flashcards");

  useEffect(() => {
    saveProgress(progress);
    sound.setSoundEnabled(progress.soundEnabled);
  }, [progress]);

  const toggleSound = () => {
    setProgress((p) => ({
      ...p,
      soundEnabled: !p.soundEnabled,
    }));
  };

  const handleToggleMastered = (id: string, mastered: boolean) => {
    setProgress((prev) => ({
      ...prev,
      masteredWordIds: {
        ...prev.masteredWordIds,
        [id]: mastered,
      },
    }));
  };

  const handleRecordQuizScore = (score: number, total: number) => {
    const key = selectedMissionId ? `m${selectedMissionId}` : "all";
    setProgress((prev) => ({
      ...prev,
      missionHighScores: {
        ...prev.missionHighScores,
        [key]: {
          ...prev.missionHighScores[key],
          quizScore: Math.max(score, prev.missionHighScores[key]?.quizScore || 0),
          totalQuiz: total,
        },
      },
    }));
  };

  const handleRecordWriteScore = (score: number, total: number) => {
    const key = selectedMissionId ? `m${selectedMissionId}` : "all";
    setProgress((prev) => ({
      ...prev,
      missionHighScores: {
        ...prev.missionHighScores,
        [key]: {
          ...prev.missionHighScores[key],
          writeScore: Math.max(score, prev.missionHighScores[key]?.writeScore || 0),
          totalWrite: total,
        },
      },
    }));
  };

  const handleResetAllProgress = () => {
    if (window.confirm("Wil je al je verdiende sterren en gekende woorden opnieuw instellen?")) {
      const resetState: ProgressState = {
        masteredWordIds: {},
        starredWordIds: {},
        missionHighScores: {},
        soundEnabled: progress.soundEnabled,
      };
      setProgress(resetState);
      saveProgress(resetState);
    }
  };

  const currentMission = useMemo(() => {
    if (selectedMissionId === null) return null;
    return MISSIONS_DATA.find((m) => m.id === selectedMissionId) || null;
  }, [selectedMissionId]);

  const activeWords: VocabItem[] = useMemo(() => {
    if (currentMission) {
      return currentMission.words;
    }
    return ALL_WORDS;
  }, [currentMission]);

  const activeMissionTitle = currentMission
    ? `${currentMission.emoji} ${currentMission.title}: ${currentMission.subtitle}`
    : "🌟 Alle Missies (1 t/m 6)";

  const totalMasteredInView = activeWords.filter(
    (w) => progress.masteredWordIds[w.id]
  ).length;

  const totalMasteredAll = Object.values(progress.masteredWordIds).filter(Boolean).length;
  const totalXP = totalMasteredAll * 10;

  // Level determination for 10-11 year olds
  let levelName = "Beginner Speurneus 🔍";
  let levelNumber = 1;
  let levelColor = "from-blue-500 to-indigo-600";
  if (totalMasteredAll >= 150) {
    levelName = "Franse Woordenkampioen 🏆";
    levelNumber = 5;
    levelColor = "from-amber-400 to-yellow-500";
  } else if (totalMasteredAll >= 100) {
    levelName = "Taalmeester Frans 🌟";
    levelNumber = 4;
    levelColor = "from-purple-500 to-pink-500";
  } else if (totalMasteredAll >= 50) {
    levelName = "Franse Avonturier 🚀";
    levelNumber = 3;
    levelColor = "from-emerald-400 to-teal-500";
  } else if (totalMasteredAll >= 20) {
    levelName = "Woorden Ontdekker 🎒";
    levelNumber = 2;
    levelColor = "from-cyan-400 to-blue-500";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-pink-50/60 text-slate-800 flex flex-col font-sans pb-16">
      {/* Top Playful Navbar */}
      <header className="bg-white/90 backdrop-blur-md border-b-2 border-indigo-100 sticky top-0 z-40 print:hidden shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Brand & Mascot */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 text-white flex items-center justify-center shadow-md transform hover:rotate-6 transition-transform">
              <span className="text-2xl">🦁</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl text-slate-900 leading-tight">
                  Frans Oefenapp
                </h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                  🇫🇷 5de/6de Leerjaar
                </span>
              </div>
              <p className="text-xs text-slate-500 font-bold hidden sm:block">
                Oefen alle 6 de missies van je lesbundel!
              </p>
            </div>
          </div>

          {/* Right Status / Controls */}
          <div className="flex items-center gap-3">
            {/* Level & XP pill */}
            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 px-3 py-1.5 rounded-2xl shadow-2xs">
              <span className="text-sm">⭐</span>
              <div className="text-left leading-none">
                <span className="text-[10px] font-black uppercase text-amber-800 block">
                  Lvl {levelNumber}: {levelName}
                </span>
                <span className="text-xs font-black text-orange-600">
                  {totalXP} XP
                </span>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2.5 rounded-2xl border-2 transition-all active:scale-95 shadow-2xs ${
                progress.soundEnabled
                  ? "bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                  : "bg-rose-50 text-rose-600 border-rose-200"
              }`}
              title={progress.soundEnabled ? "Geluidseffecten dempen" : "Geluidseffecten aanzetten"}
            >
              {progress.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {/* Reset progress */}
            <button
              type="button"
              onClick={handleResetAllProgress}
              className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-colors"
              title="Scores resetten"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 flex-1 w-full space-y-5">
        {/* Kid-friendly Cheer Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden print:hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 animate-bounce">
                {currentMission ? currentMission.emoji : "🚀"}
              </div>
              <div>
                <span className="text-xs font-black tracking-wider uppercase bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full inline-block mb-1 shadow-2xs">
                  {currentMission ? currentMission.title : "Totaaloverzicht"}
                </span>
                <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-xs">
                  {currentMission ? currentMission.subtitle : "Alle Woorden & Zinnen Door Elkaar"}
                </h2>
                <p className="text-xs text-white/90 font-semibold mt-1">
                  {activeWords.length} woorden om te ontdekken • Luister naar de Franse uitspraak! 🎧
                </p>
              </div>
            </div>

            {/* Mini Progress Card */}
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 flex items-center gap-4 shrink-0 shadow-sm">
              <div className="text-right">
                <span className="text-[11px] font-bold text-white/80 block uppercase tracking-wide">
                  Gekend in deze missie
                </span>
                <span className="text-xl font-black text-amber-300">
                  {totalMasteredInView} / {activeWords.length}
                </span>
                <span className="text-xs text-white/90 font-bold block">
                  {Math.round((totalMasteredInView / activeWords.length) * 100)}% behaald!
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-sm rotate-3">
                ⭐
              </div>
            </div>
          </div>
        </section>

        {/* Mission Selection Grid */}
        <section className="print:hidden">
          <MissionSelector
            selectedMissionId={selectedMissionId}
            onSelectMission={(id) => setSelectedMissionId(id)}
            masteredIds={progress.masteredWordIds}
          />
        </section>

        {/* Vibrant Mode Switcher (Game Cartridge Buttons) */}
        <section className="print:hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {/* Flashcards */}
            <button
              type="button"
              onClick={() => setActiveMode("flashcards")}
              className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shadow-sm border-2 ${
                activeMode === "flashcards"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent ring-4 ring-indigo-200 shadow-md"
                  : "bg-white text-slate-700 hover:bg-indigo-50/50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <BookOpen size={18} className={activeMode === "flashcards" ? "text-white" : "text-indigo-600"} />
                <span>Woordkaarten</span>
              </div>
              <span className={`text-[10px] font-bold ${activeMode === "flashcards" ? "text-white/80" : "text-slate-400"}`}>
                3D Flashcards 🗂️
              </span>
            </button>

            {/* Quiz */}
            <button
              type="button"
              onClick={() => setActiveMode("quiz")}
              className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shadow-sm border-2 ${
                activeMode === "quiz"
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white border-transparent ring-4 ring-amber-200 shadow-md"
                  : "bg-white text-slate-700 hover:bg-amber-50/50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <HelpCircle size={18} className={activeMode === "quiz" ? "text-white" : "text-amber-500"} />
                <span>Quiz Game</span>
              </div>
              <span className={`text-[10px] font-bold ${activeMode === "quiz" ? "text-white/80" : "text-slate-400"}`}>
                Meerkeuze 🎯
              </span>
            </button>

            {/* Schrijven */}
            <button
              type="button"
              onClick={() => setActiveMode("write")}
              className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shadow-sm border-2 ${
                activeMode === "write"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent ring-4 ring-emerald-200 shadow-md"
                  : "bg-white text-slate-700 hover:bg-emerald-50/50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <PenTool size={18} className={activeMode === "write" ? "text-white" : "text-emerald-600"} />
                <span>F-Kolom Schrijven</span>
              </div>
              <span className={`text-[10px] font-bold ${activeMode === "write" ? "text-white/80" : "text-slate-400"}`}>
                Typ & Spell ✍️
              </span>
            </button>

            {/* Memory */}
            <button
              type="button"
              onClick={() => setActiveMode("memory")}
              className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shadow-sm border-2 ${
                activeMode === "memory"
                  ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white border-transparent ring-4 ring-pink-200 shadow-md"
                  : "bg-white text-slate-700 hover:bg-pink-50/50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Gamepad2 size={18} className={activeMode === "memory" ? "text-white" : "text-pink-600"} />
                <span>Memory Spel</span>
              </div>
              <span className={`text-[10px] font-bold ${activeMode === "memory" ? "text-white/80" : "text-slate-400"}`}>
                Koppel Kaartjes 🧩
              </span>
            </button>

            {/* Woordenlijst / PDF tabel */}
            <button
              type="button"
              onClick={() => setActiveMode("list")}
              className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 shadow-sm border-2 col-span-2 sm:col-span-1 ${
                activeMode === "list"
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-transparent ring-4 ring-sky-200 shadow-md"
                  : "bg-white text-slate-700 hover:bg-sky-50/50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <TableProperties size={18} className={activeMode === "list" ? "text-white" : "text-sky-600"} />
                <span>Woordenlijst</span>
              </div>
              <span className={`text-[10px] font-bold ${activeMode === "list" ? "text-white/80" : "text-slate-400"}`}>
                Lesblad & Print 📖
              </span>
            </button>
          </div>
        </section>

        {/* Active Practice Mode Component */}
        <section className="pt-2">
          {activeMode === "flashcards" && (
            <FlashcardsMode
              words={activeWords}
              masteredIds={progress.masteredWordIds}
              onToggleMastered={handleToggleMastered}
              activeMissionTitle={activeMissionTitle}
            />
          )}

          {activeMode === "quiz" && (
            <QuizMode
              words={activeWords}
              activeMissionTitle={activeMissionTitle}
              onRecordScore={handleRecordQuizScore}
            />
          )}

          {activeMode === "write" && (
            <WriteMode
              words={activeWords}
              activeMissionTitle={activeMissionTitle}
              onRecordScore={handleRecordWriteScore}
            />
          )}

          {activeMode === "memory" && (
            <MemoryMode
              words={activeWords}
              activeMissionTitle={activeMissionTitle}
            />
          )}

          {activeMode === "list" && (
            <WordListMode
              words={activeWords}
              currentMission={currentMission}
              masteredIds={progress.masteredWordIds}
              onToggleMastered={handleToggleMastered}
            />
          )}
        </section>
      </main>

      {/* Cheerful Footer */}
      <footer className="mt-auto pt-10 text-center text-xs font-bold text-slate-400 print:hidden">
        <p>🇫🇷 Frans Leren is een feestje! • Alle 6 Missies uit je lesbundel</p>
      </footer>
    </div>
  );
}
