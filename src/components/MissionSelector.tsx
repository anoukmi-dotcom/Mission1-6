import React from "react";
import { MISSIONS_DATA } from "../data/missionsData";
import { Sparkles, Trophy } from "lucide-react";

interface MissionSelectorProps {
  selectedMissionId: number | null; // null means All Missions
  onSelectMission: (id: number | null) => void;
  masteredIds: Record<string, boolean>;
}

export const MissionSelector: React.FC<MissionSelectorProps> = ({
  selectedMissionId,
  onSelectMission,
  masteredIds,
}) => {
  const totalAllWords = MISSIONS_DATA.reduce((acc, m) => acc + m.words.length, 0);
  const totalAllMastered = Object.values(masteredIds).filter(Boolean).length;
  const totalXP = totalAllMastered * 10;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-sm border-2 border-indigo-100">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">🎯</span>
          <div>
            <h2 className="text-base font-black text-slate-800 tracking-tight">
              Kies je Franse Missie
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              Kies een missie of mix alle woorden door elkaar!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* XP Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-black text-xs shadow-xs">
            <Sparkles size={14} className="animate-spin" />
            <span>{totalXP} XP</span>
          </div>

          {/* Mastered Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-900 font-black text-xs">
            <Trophy size={14} className="text-indigo-600" />
            <span>{totalAllMastered}/{totalAllWords} woorden</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {/* All Missions Button */}
        <button
          type="button"
          onClick={() => onSelectMission(null)}
          className={`group flex flex-col items-start p-3.5 rounded-2xl border-2 text-left transition-all duration-200 transform hover:-translate-y-1 relative overflow-hidden ${
            selectedMissionId === null
              ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white border-transparent shadow-lg ring-4 ring-purple-200"
              : "bg-gradient-to-br from-slate-50 to-indigo-50/40 text-slate-700 hover:bg-white border-slate-200 hover:border-purple-300 shadow-2xs"
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-2xl filter drop-shadow-xs">🌟</span>
            <span
              className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                selectedMissionId === null
                  ? "bg-white/20 text-white"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              Mix
            </span>
          </div>
          <span className="font-black text-sm tracking-tight mt-1">Alle Missies</span>
          <span
            className={`text-xs font-semibold truncate max-w-full ${
              selectedMissionId === null ? "text-white/90" : "text-slate-500"
            }`}
          >
            1 t/m 6 (213 w.)
          </span>

          {/* Progress bar */}
          <div className="w-full mt-2.5 bg-black/15 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                selectedMissionId === null ? "bg-white" : "bg-purple-500"
              }`}
              style={{
                width: `${Math.round((totalAllMastered / totalAllWords) * 100)}%`,
              }}
            />
          </div>
        </button>

        {/* Individual Missions */}
        {MISSIONS_DATA.map((mission) => {
          const isSelected = selectedMissionId === mission.id;
          const wordsCount = mission.words.length;
          const masteredInMission = mission.words.filter(
            (w) => masteredIds[w.id]
          ).length;
          const pct = Math.round((masteredInMission / wordsCount) * 100);

          return (
            <button
              key={mission.id}
              type="button"
              onClick={() => onSelectMission(mission.id)}
              className={`group flex flex-col items-start p-3.5 rounded-2xl border-2 text-left transition-all duration-200 transform hover:-translate-y-1 relative overflow-hidden ${
                isSelected
                  ? `bg-gradient-to-br ${mission.themeColor.cardBg} text-white border-transparent shadow-lg ring-4 ring-blue-200`
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-blue-300 shadow-2xs"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-2xl filter drop-shadow-xs group-hover:scale-110 transition-transform">
                  {mission.emoji}
                </span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {masteredInMission}/{wordsCount}
                </span>
              </div>

              <span className="font-black text-sm tracking-tight mt-1">
                {mission.title}
              </span>
              <span
                className={`text-xs truncate w-full font-medium ${
                  isSelected ? "text-white/90" : "text-slate-500"
                }`}
                title={mission.subtitle}
              >
                {mission.subtitle}
              </span>

              {/* Progress mini bar */}
              <div className="w-full mt-2.5 bg-black/15 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isSelected ? "bg-amber-300" : "bg-emerald-500"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
