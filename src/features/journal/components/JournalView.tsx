import { Card } from "../../practices/components/Blocks";
import { maxEntryLength, type JournalAnalyst, type JournalRepository } from "../types";
import { useJournal } from "../useJournal";
import PlanView from "./PlanView";
import SupportNote from "./SupportNote";

type Props = {
  uid: string;
  repository: JournalRepository;
  analyst: JournalAnalyst | null;
};

export default function JournalView({ uid, repository, analyst }: Props) {
  const journal = useJournal(uid, repository, analyst);
  const busy = journal.busyId !== null;
  const empty = !journal.draft.trim();

  return (
    <div className="page">
      <h1>Journal</h1>

      <div className="journal-list">
        <Card label="How are you feeling? What's on your mind?">
          <textarea
            className="input"
            rows={7}
            maxLength={maxEntryLength}
            aria-label="Journal entry"
            placeholder="For example: I have five things to do today, they all feel important and I don't know where to start…"
            value={journal.draft}
            onChange={(e) => journal.setDraft(e.target.value)}
          />
          <p className="why">
            Your admin's app screens can't open your journal, but whoever manages the database
            can technically access stored entries.
          </p>

          {journal.aiAvailable ? (
            <label className="consent">
              <input
                type="checkbox"
                checked={journal.consent}
                onChange={(e) => journal.setConsent(e.target.checked)}
              />
              <span>
                Send this entry to Google's Gemini AI. On the free tier, Google may use it to
                improve its products and people may review it. Leave out names and private or
                sensitive details.
              </span>
            </label>
          ) : (
            <p className="why">AI summaries aren't set up yet (see the README).</p>
          )}

          <div className="journal-actions">
            <button
              type="button"
              className="btn primary"
              disabled={busy || empty || !journal.aiAvailable || !journal.consent}
              onClick={() => journal.save(true)}
            >
              {busy ? "Working…" : "Save and make a plan"}
            </button>
            <button
              type="button"
              className="btn"
              disabled={busy || empty}
              onClick={() => journal.save(false)}
            >
              Save only
            </button>
          </div>
          {journal.error && (
            <p className="save-error" role="alert">
              {journal.error}
            </p>
          )}
          <SupportNote />
        </Card>

        {journal.entries === null && !journal.error && <p className="why">Loading entries…</p>}
        {journal.entries?.length === 0 && <p className="why">Your saved entries will appear here.</p>}

        {journal.entries?.map((entry) => (
          <Card key={entry.id} label={new Date(entry.createdAt).toLocaleString()}>
            <p className="entry-text">{entry.text}</p>
            {entry.plan && <PlanView plan={entry.plan} />}
            <div className="journal-actions">
              {!entry.plan && journal.aiAvailable && (
                <button
                  type="button"
                  className="btn"
                  disabled={busy || !journal.consent}
                  title={journal.consent ? undefined : "Tick the AI box above first"}
                  onClick={() => journal.retryPlan(entry)}
                >
                  {journal.busyId === entry.id ? "Working…" : "Make a plan"}
                </button>
              )}
              <button
                type="button"
                className="btn"
                onClick={() => {
                  if (window.confirm("Delete this entry for good?")) journal.remove(entry.id);
                }}
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
