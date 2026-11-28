import { useState, type ReactNode } from "react";
import { StreakContext } from "./StreakContext";
import { localStreakStore, type StreakStore } from "./streakStore";

type Props = {
  userId: string;
  store?: StreakStore;
  children: ReactNode;
};

export default function StreakProvider({ userId, store = localStreakStore, children }: Props) {
  const [streak, setStreak] = useState(() => store.load(userId));

  function completeSession() {
    // Read the saved value so two timers finishing together are both counted
    const next = Math.max(store.load(userId), streak) + 1;
    store.save(userId, next);
    setStreak(next);
  }

  return <StreakContext value={{ streak, completeSession }}>{children}</StreakContext>;
}
