import { useEffect, useState } from "react";
import type { JournalAnalyst, JournalEntry, JournalRepository } from "./types";

// State and actions of the journal page, with no markup
export function useJournal(
  uid: string,
  repository: JournalRepository,
  analyst: JournalAnalyst | null,
) {
  const [entries, setEntries] = useState<JournalEntry[] | null>(null);
  const [draft, setDraft] = useState("");
  const [consent, setConsent] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(
    () =>
      repository.subscribe(uid, setEntries, (cause) => {
        console.error(cause);
        setError("Couldn't load your journal. Check your connection and reload the page.");
      }),
    [repository, uid],
  );

  async function createPlan(entryId: string, text: string) {
    if (!analyst) return;
    try {
      await repository.savePlan(uid, entryId, await analyst.analyze(text));
    } catch (cause) {
      console.error(cause);
      setError("Your entry is saved, but a plan couldn't be created. Try again from the entry.");
    }
  }

  // The entry is saved before the AI is asked, so writing is never lost
  async function save(withPlan: boolean) {
    const text = draft.trim();
    if (!text) return;
    setError("");
    setBusyId("new");
    try {
      const id = await repository.add(uid, text);
      setDraft("");
      if (withPlan) await createPlan(id, text);
    } catch (cause) {
      console.error(cause);
      setError("Couldn't save your entry. Your text is still here; try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function retryPlan(entry: JournalEntry) {
    setError("");
    setBusyId(entry.id);
    await createPlan(entry.id, entry.text);
    setBusyId(null);
  }

  function remove(entryId: string) {
    repository.remove(uid, entryId).catch((cause) => {
      console.error(cause);
      setError("Couldn't delete that entry.");
    });
  }

  return {
    entries,
    draft,
    setDraft,
    consent,
    setConsent,
    busyId,
    error,
    aiAvailable: analyst !== null,
    save,
    retryPlan,
    remove,
  };
}
