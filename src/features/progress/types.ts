import type { TimerState } from "../practices/countdown";

export type PracticeKind = "breath" | "pomodoro";

/** One finished breathing or focus session. */
export type SessionRecord = { kind: PracticeKind; seconds: number; at: number };

export type Progress = {
  /** Sessions counted before progress was saved online. */
  carriedOver: number;
  /** Finished sessions, keyed by run ID so none is counted twice. */
  completed: Record<string, SessionRecord>;
  timers: Record<PracticeKind, TimerState>;
  checklists: Record<string, boolean[]>;
};

/** Where progress is kept. Changes arrive through subscribe, including your own. */
export interface ProgressRepository {
  subscribe(
    user: { uid: string; email: string | null },
    startingStreak: number,
    onData: (progress: Progress) => void,
    onError: (error: unknown) => void,
  ): () => void;
  saveTimer(uid: string, kind: PracticeKind, timer: TimerState): Promise<void>;
  /** Saves the finished timer and, if given, counts the session. */
  completeTimer(
    uid: string,
    kind: PracticeKind,
    timer: TimerState,
    session: SessionRecord | null,
  ): Promise<void>;
  saveChecklist(uid: string, listId: string, checked: boolean[]): Promise<void>;
  reset(uid: string): Promise<void>;
}
