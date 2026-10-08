import React, { useState } from "react";
import { VocabItem, Mission } from "../data/missionsData";
import { AudioButton } from "./AudioButton";
import {
  Search,
  Printer,
  Eye,
  EyeOff,
  Check,
  Star,
  FileText,
} from "lucide-react";

interface WordListModeProps {
  words: VocabItem[];
  currentMission?: Mission | null;
  masteredIds: Record<string, boolean>;
  onToggleMastered: (id: string, mastered: boolean) => void;
}

export const WordListMode: React.FC<WordListModeProps> = ({
  words,
  currentMission,
  masteredIds,
  onToggleMastered,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hideFrench, setHideFrench] = useState(false);
  const [hideDutch, setHideDutch] = useState(false);
  const [practiceInputs, setPracticeInputs] = useState<Record<string, { f1: string; f2: string }>>({});

  const filteredWords = words.filter((w) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      w.french.toLowerCase().includes(q) ||
      w.dutch.toLowerCase().includes(q) ||
      (w.category && w.category.toLowerCase().includes(q))
    );
  });

  const handlePrint = () => {
    window.print();
  };

  const handleInputPractice = (id: string, col: "f1" | "f2", val: string) => {
    setPracticeInputs((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || { f1: "", f2: "" }),
        [col]: val,
      },
    }));
  };

  return (
    <div className="space-y-4">
      {/* Search & Actions Bar (Hidden on print) */}
      <div className="print:hidden bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek een woord of zin (NL of FR)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-hidden transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* View toggles & Print */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            type="button"
            onClick={() => setHideDutch((h) => !h)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border font-bold transition-all ${
              hideDutch
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
            title="Verberg Nederlands om jezelf te testen"
          >
            {hideDutch ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{hideDutch ? "NL verborgen" : "Verberg NL"}</span>
          </button>

          <button
            type="button"
            onClick={() => setHideFrench((h) => !h)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border font-bold transition-all ${
              hideFrench
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
            title="Verberg Frans om jezelf te testen"
          >
            {hideFrench ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{hideFrench ? "FR verborgen" : "Verberg FR"}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors"
            title="Druk deze woordenlijst af als werkblad"
          >
            <Printer size={15} />
            <span>Werkblad Afdrukken</span>
          </button>
        </div>
      </div>

      {/* Header for print / screen */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white p-5 rounded-3xl shadow-sm flex items-center justify-between print:bg-none print:text-black print:p-0 print:border-b-2">
        <div>
          <div className="flex items-center gap-2">
            {currentMission && <span className="text-2xl filter drop-shadow-xs">{currentMission.emoji}</span>}
            <h2 className="text-xl font-black">
              {currentMission ? (
                <span>
                  {currentMission.title}: {currentMission.subtitle}
                </span>
              ) : (
                <span>Alle Woorden & Zinnen (Missie 1 t/m 6)</span>
              )}
            </h2>
          </div>
          <p className="text-xs text-white/80 print:text-slate-500 mt-1 font-semibold">
            {filteredWords.length} woorden • Kolommen N (Nederlands) & F (Frans inoefenen)
          </p>
        </div>

        <div className="hidden print:block text-right text-xs text-slate-700">
          Naam: ______________________ Datum: ________
        </div>
      </div>

      {/* Table resembling the PDF sheet */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 text-xs font-black uppercase tracking-wider">
                <th className="py-3 px-3 w-10 text-center print:hidden">#</th>
                <th className="py-3 px-4 w-1/3">Frans</th>
                <th className="py-3 px-4 w-1/3 border-l border-slate-200">N (Nederlands)</th>
                <th className="py-3 px-3 w-1/6 border-l border-slate-200 text-center">F (Oefenen 1)</th>
                <th className="py-3 px-3 w-1/6 border-l border-slate-200 text-center">F (Oefenen 2)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredWords.map((item, index) => {
                const isMastered = !!masteredIds[item.id];
                const pVal = practiceInputs[item.id] || { f1: "", f2: "" };

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isMastered ? "bg-emerald-50/20" : ""
                    }`}
                  >
                    {/* Mastery checkbox */}
                    <td className="py-2.5 px-3 text-center print:hidden">
                      <button
                        type="button"
                        onClick={() => onToggleMastered(item.id, !isMastered)}
                        title={isMastered ? "Gekend" : "Klik om als gekend te markeren"}
                        className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                          isMastered
                            ? "bg-emerald-500 border-emerald-600 text-white"
                            : "border-slate-300 text-transparent hover:border-slate-400"
                        }`}
                      >
                        <Check size={14} />
                      </button>
                    </td>

                    {/* French column */}
                    <td className="py-2.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`${
                            hideFrench ? "blur-sm select-none hover:blur-none" : ""
                          }`}
                        >
                          {item.french}
                        </span>
                        <div className="print:hidden shrink-0">
                          <AudioButton text={item.french} size="sm" />
                        </div>
                      </div>
                    </td>

                    {/* Dutch column */}
                    <td className="py-2.5 px-4 text-slate-700 border-l border-slate-200 font-medium">
                      <span
                        className={`${
                          hideDutch ? "blur-sm select-none hover:blur-none" : ""
                        }`}
                      >
                        {item.dutch}
                      </span>
                    </td>

                    {/* Practice F column 1 */}
                    <td className="py-2 px-2 border-l border-slate-200 bg-slate-50/40">
                      <input
                        type="text"
                        value={pVal.f1}
                        onChange={(e) => handleInputPractice(item.id, "f1", e.target.value)}
                        placeholder="... F"
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded print:border-none print:bg-transparent print:placeholder-transparent text-slate-800 font-medium focus:border-blue-500 outline-hidden"
                      />
                    </td>

                    {/* Practice F column 2 */}
                    <td className="py-2 px-2 border-l border-slate-200 bg-slate-50/40">
                      <input
                        type="text"
                        value={pVal.f2}
                        onChange={(e) => handleInputPractice(item.id, "f2", e.target.value)}
                        placeholder="... F"
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded print:border-none print:bg-transparent print:placeholder-transparent text-slate-800 font-medium focus:border-blue-500 outline-hidden"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
