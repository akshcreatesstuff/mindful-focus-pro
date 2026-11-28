import { createContext } from "react";
import type { JournalAnalyst, JournalRepository } from "../features/journal/types";
import type { ProgressRepository } from "../features/progress/types";

export type DataServices = {
  progress: ProgressRepository;
  journal: JournalRepository;
  analyst: JournalAnalyst | null;
};

// null means the database has not been configured
export const DataServicesContext = createContext<DataServices | null>(null);
