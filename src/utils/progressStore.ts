export interface ProgressState {
  masteredWordIds: Record<string, boolean>; // wordId -> boolean
  starredWordIds: Record<string, boolean>; // favorite/pinned words for extra practice
  missionHighScores: Record<string, { quizScore?: number; totalQuiz?: number; writeScore?: number; totalWrite?: number }>;
  soundEnabled: boolean;
}

const STORAGE_KEY = "frans_oefenapp_progress_v1";

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") {
    return {
      masteredWordIds: {},
      starredWordIds: {},
      missionHighScores: {},
      soundEnabled: true,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to load progress from localStorage", e);
  }
  return {
    masteredWordIds: {},
    starredWordIds: {},
    missionHighScores: {},
    soundEnabled: true,
  };
}

export function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save progress to localStorage", e);
  }
}
