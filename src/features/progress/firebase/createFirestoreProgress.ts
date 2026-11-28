import {
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Firestore,
} from "firebase/firestore";
import { emptyProgress, normalizeProgress } from "../progressModel";
import type { ProgressRepository } from "../types";

export function createFirestoreProgress(db: Firestore): ProgressRepository {
  const progressDoc = (uid: string) => doc(db, "users", uid, "data", "progress");

  return {
    subscribe({ uid, email }, startingStreak, onData, onError) {
      let stop = () => {};
      let cancelled = false;

      async function connect() {
        // Lets the admin see which account each ID belongs to. Not awaited: offline,
        // it would never finish and no error would be shown.
        setDoc(doc(db, "users", uid), { email, lastSeenAt: serverTimestamp() }).catch(
          console.error,
        );

        // A transaction checks the server first, so saved data is never overwritten
        await runTransaction(db, async (transaction) => {
          const snapshot = await transaction.get(progressDoc(uid));
          if (!snapshot.exists()) {
            transaction.set(progressDoc(uid), emptyProgress(startingStreak));
          }
        });

        if (cancelled) return;
        stop = onSnapshot(
          progressDoc(uid),
          (snapshot) => {
            if (snapshot.exists()) onData(normalizeProgress(snapshot.data()));
          },
          onError,
        );
      }

      connect().catch((error) => {
        if (!cancelled) onError(error);
      });

      return () => {
        cancelled = true;
        stop();
      };
    },

    saveTimer: (uid, kind, timer) =>
      updateDoc(progressDoc(uid), { [`timers.${kind}`]: timer }),

    completeTimer: (uid, kind, timer, session) =>
      updateDoc(progressDoc(uid), {
        [`timers.${kind}`]: timer,
        ...(session ? { [`completed.${timer.runId}`]: session } : {}),
      }),

    saveChecklist: (uid, listId, checked) =>
      updateDoc(progressDoc(uid), { [`checklists.${listId}`]: checked }),

    reset: (uid) => setDoc(progressDoc(uid), emptyProgress()),
  };
}
