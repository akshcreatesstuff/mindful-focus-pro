import { Card } from "../../features/practices/components/Blocks";
import { streakOf, totalsFor } from "../../features/progress/progressModel";
import ProgressGate from "../../features/progress/ProgressGate";
import { useProgress } from "../../features/progress/useProgress";

export default function Analytics() {
  const { reset } = useProgress();

  function confirmReset() {
    const sure = window.confirm(
      "Reset your streak, timers, checklists and session history? This can't be undone. Journal entries are kept.",
    );
    if (sure) reset();
  }

  return (
    <div className="page">
      <h1>Your progress</h1>
      <ProgressGate>
        {(progress) => {
          const breath = totalsFor(progress, "breath");
          const focus = totalsFor(progress, "pomodoro");
          const ticked = Object.values(progress.checklists).flat().filter(Boolean).length;

          return (
            <>
              <div className="cards-grid">
                <Card label="Sessions completed" full>
                  <div className="timer-display">{streakOf(progress)}</div>
                  {progress.carriedOver > 0 && (
                    <p className="why">Includes {progress.carriedOver} from before data was saved online.</p>
                  )}
                </Card>
                <Card label="Anchor breathing">
                  <p className="why">{breath.count} sessions · {breath.minutes} minutes</p>
                </Card>
                <Card label="Focus sessions">
                  <p className="why">{focus.count} sessions · {focus.minutes} minutes</p>
                </Card>
                <Card label="Checklists" full>
                  <p className="why">{ticked} items ticked</p>
                </Card>
              </div>
              <button type="button" className="btn" onClick={confirmReset}>
                Reset my progress
              </button>
            </>
          );
        }}
      </ProgressGate>
    </div>
  );
}
