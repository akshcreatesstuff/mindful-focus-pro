import { useStreak } from "../../streak/useStreak";
import { Card } from "../components/Blocks";
import Checklist from "../components/Checklist";
import PomodoroTimer from "../components/PomodoroTimer";

export function PomodoroAbout() {
  return (
    <>
      The standard Pomodoro with an intention-setting layer: before each session you name a{" "}
      <strong>single focus</strong>; during breaks you practice a short body scan instead of
      reaching for your phone.
    </>
  );
}

export function PomodoroBody() {
  const { completeSession } = useStreak();

  return (
    <div className="cards-grid">
      <Card label="Session Timer">
        <PomodoroTimer onWorkComplete={completeSession} />
      </Card>
      <Card label="Mindful Pomodoro Protocol">
        <Checklist
          items={[
            'Set a single intention: "I will work on ___"',
            "Remove all notifications; close unused tabs",
            "Start timer; return to intention when distracted",
            "At break: stand, stretch, take 3 slow breaths",
            "Note one thing you accomplished before next session",
          ]}
        />
      </Card>
    </div>
  );
}
