import React from "react";

interface AccentBarProps {
  onInsert: (char: string) => void;
}

const ACCENTS = ["é", "è", "ê", "ë", "à", "â", "ç", "î", "ï", "ô", "ù", "û", "œ", "'"];

export const AccentBar: React.FC<AccentBarProps> = ({ onInsert }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 rounded-lg border border-slate-200">
      <span className="text-xs font-semibold text-slate-500 mr-1 select-none">
        Franse tekens:
      </span>
      {ACCENTS.map((char) => (
        <button
          key={char}
          type="button"
          onClick={() => onInsert(char)}
          className="px-2.5 py-1 text-sm font-medium bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded border border-slate-300 hover:border-blue-400 active:scale-95 transition-all shadow-xs"
          title={`Voeg '${char}' toe`}
        >
          {char}
        </button>
      ))}
    </div>
  );
};
