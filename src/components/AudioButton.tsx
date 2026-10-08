import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { speakFrench } from "../data/missionsData";

interface AudioButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = "md",
  className = "",
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    speakFrench(text);
    setTimeout(() => {
      setIsPlaying(false);
    }, 1200);
  };

  const sizeClasses = {
    sm: "p-1 text-xs",
    md: "p-2 text-sm",
    lg: "p-3 text-base",
  };

  const iconSizes = {
    sm: 15,
    md: 18,
    lg: 22,
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Beluister de Franse uitspraak"
      aria-label={`Beluister ${text}`}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all active:scale-95 ${
        isPlaying
          ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-300 animate-pulse"
          : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 hover:border-blue-300"
      } ${sizeClasses[size]} ${className}`}
    >
      <Volume2 size={iconSizes[size]} className={isPlaying ? "scale-110" : ""} />
      {label && <span className="text-xs font-semibold">{label}</span>}
    </button>
  );
};
