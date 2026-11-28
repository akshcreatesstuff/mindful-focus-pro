export interface StreakStore {
  load(userId: string): number;
  save(userId: string, count: number): void;
}

const key = (userId: string) => `mfStreak:${userId}`;

// Saved in this browser only
export const localStreakStore: StreakStore = {
  load(userId) {
    try {
      return Number(localStorage.getItem(key(userId))) || 0;
    } catch {
      return 0;
    }
  },
  save(userId, count) {
    try {
      localStorage.setItem(key(userId), String(count));
    } catch {
      // Storage can be blocked; the count then lasts until the page is closed
    }
  },
};
