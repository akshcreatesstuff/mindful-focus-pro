import { useContext } from "react";
import { StreakContext } from "./StreakContext";

export function useStreak() {
  return useContext(StreakContext);
}
