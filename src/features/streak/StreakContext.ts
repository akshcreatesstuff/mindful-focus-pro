import { createContext } from "react";

export const StreakContext = createContext({
  streak: 0,
  completeSession: () => {},
});
