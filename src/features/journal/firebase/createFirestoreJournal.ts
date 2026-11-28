import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  type Firestore,
} from "firebase/firestore";
import type { JournalEntry, JournalRepository } from "../types";

export function createFirestoreJournal(db: Firestore): JournalRepository {
  const entries = (uid: string) => collection(db, "users", uid, "journal");

  return {
    subscribe: (uid, onData, onError) =>
      onSnapshot(
        query(entries(uid), orderBy("createdAt", "desc"), limit(50)),
        (snapshot) =>
          onData(
            snapshot.docs.map((item) => ({ ...(item.data() as Omit<JournalEntry, "id">), id: item.id })),
          ),
        onError,
      ),

    async add(uid, text) {
      const entry = doc(entries(uid));
      await setDoc(entry, { text, createdAt: Date.now(), plan: null });
      return entry.id;
    },

    savePlan: (uid, entryId, plan) => updateDoc(doc(entries(uid), entryId), { plan }),

    remove: (uid, entryId) => deleteDoc(doc(entries(uid), entryId)),
  };
}
