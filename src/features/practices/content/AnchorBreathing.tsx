import { useProgress } from "../../progress/useProgress";
import { Card, Steps } from "../components/Blocks";
import BreathTimer from "../components/BreathTimer";

export function AnchorAbout() {
  return (
    <>
      Use the breath as an anchor to bring a wandering mind back to the present. Each return to
      the breath is a rep — it literally <strong>strengthens your attention muscle</strong>. Use
      this before deep work sessions.
    </>
  );
}

export function AnchorBody() {
  const { progress } = useProgress();

  return (
    <div className="cards-grid">
      <Card label="Guided Breath Timer">
        {progress && <BreathTimer timer={progress.timers.breath} />}
      </Card>
      <Card label="The Technique">
        <Steps
          items={[
            "Sit with your back straight, hands relaxed.",
            "Close your eyes or soften your gaze downward.",
            "Notice the natural rhythm of your breath — don't control it.",
            <>When a thought arises, gently label it: <em>"thinking"</em>, then return.</>,
            "The goal isn't zero thoughts — it's the return.",
          ]}
        />
      </Card>
    </div>
  );
}
