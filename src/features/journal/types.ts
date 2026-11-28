export type PlanStep = {
  task: string;
  why: string;
  pomodoros: number; // 25-minute focus blocks; 0 for things like rest
};

export type JournalPlan = {
  summary: string;
  feelings: string[];
  /** True when the entry suggests the writer may be unsafe; no task plan is shown then. */
  needsSupport: boolean;
  startHere: string;
  startReason: string;
  steps: PlanStep[];
  question: string;
};

export type JournalEntry = {
  id: string;
  text: string;
  createdAt: number;
  plan: JournalPlan | null;
};

export interface JournalRepository {
  subscribe(
    uid: string,
    onData: (entries: JournalEntry[]) => void,
    onError: (error: unknown) => void,
  ): () => void;
  /** Returns the new entry's ID. */
  add(uid: string, text: string): Promise<string>;
  savePlan(uid: string, entryId: string, plan: JournalPlan): Promise<void>;
  remove(uid: string, entryId: string): Promise<void>;
}

/** The AI that reads an entry. */
export interface JournalAnalyst {
  analyze(text: string): Promise<JournalPlan>;
}

export const maxEntryLength = 5000;
