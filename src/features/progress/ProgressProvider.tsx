import { useEffect, useState, type ReactNode } from "react";
import { readLegacyStreak } from "./legacyStreak";
import { ProgressContext } from "./ProgressContext";
import type { Progress, ProgressRepository } from "./types";

type Props = {
  user: { uid: string; email: string | null };
  repository: ProgressRepository;
  children: ReactNode;
};

// Loads one user's saved progress and keeps it up to date.
// Give it a key of the user ID so nothing carries over between accounts.
export default function ProgressProvider({ user, repository, children }: Props) {
  const { uid, email } = user;
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [unsaved, setUnsaved] = useState(0);
  const [attempt, setAttempt] = useState(0);

  useEffect(
    () =>
      repository.subscribe(
        { uid, email },
        readLegacyStreak(uid),
        (next) => {
          setProgress(next);
          setLoadError("");
        },
        (error) => {
          console.error(error);
          setLoadError("Couldn't load your saved data. Check your connection and try again.");
        },
      ),
    [repository, uid, email, attempt],
  );

  // Warn before closing the tab while a change is still on its way to the database
  useEffect(() => {
    if (unsaved === 0) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [unsaved]);

  function track(write: Promise<void>) {
    setUnsaved((count) => count + 1);
    write
      .then(() => setSaveError(""))
      .catch((error) => {
        console.error(error);
        setSaveError("Your last change couldn't be saved.");
      })
      .finally(() => setUnsaved((count) => count - 1));
  }

  return (
    <ProgressContext
      value={{
        progress,
        loadError,
        saveError,
        saveTimer: (kind, timer) => track(repository.saveTimer(uid, kind, timer)),
        completeTimer: (kind, timer, session) =>
          track(repository.completeTimer(uid, kind, timer, session)),
        saveChecklist: (listId, checked) =>
          track(repository.saveChecklist(uid, listId, checked)),
        reset: () => track(repository.reset(uid)),
        retry: () => {
          setLoadError("");
          setAttempt((count) => count + 1);
        },
      }}
    >
      {children}
    </ProgressContext>
  );
}
