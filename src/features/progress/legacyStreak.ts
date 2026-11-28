// The streak used to be kept only in the browser; it is carried into the database once
export function readLegacyStreak(userId: string) {
  try {
    return Number(localStorage.getItem(`mfStreak:${userId}`)) || 0;
  } catch {
    return 0;
  }
}
