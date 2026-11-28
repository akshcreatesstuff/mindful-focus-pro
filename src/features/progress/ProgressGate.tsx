import type { ReactNode } from "react";
import type { Progress } from "./types";
import { useProgress } from "./useProgress";

// Shows its content only once saved data has loaded, so nothing can overwrite it early
export default function ProgressGate({ children }: { children: (progress: Progress) => ReactNode }) {
  const { progress, loadError, retry } = useProgress();

  if (loadError) {
    return (
      <div className="page" role="alert">
        <p>{loadError}</p>
        <button type="button" className="btn mt-3" onClick={retry}>
          Try again
        </button>
      </div>
    );
  }

  if (!progress) return <div className="page text-muted">Loading your data…</div>;

  return <>{children(progress)}</>;
}
