import { Highlight, Steps } from "../../practices/components/Blocks";
import type { JournalPlan } from "../types";
import SupportNote from "./SupportNote";

export default function PlanView({ plan }: { plan: JournalPlan }) {
  return (
    <div className="plan">
      <p>{plan.summary}</p>
      {plan.feelings.length > 0 && <p className="why">Feelings: {plan.feelings.join(", ")}</p>}

      {plan.needsSupport ? (
        <Highlight title="Please reach out">
          <SupportNote />
        </Highlight>
      ) : (
        <>
          {plan.startHere && (
            <Highlight title="Start here">
              <p>{plan.startHere}</p>
              <p className="why">{plan.startReason}</p>
            </Highlight>
          )}
          <Steps
            items={plan.steps.map((step) => (
              <>
                {step.task}
                {step.pomodoros > 0 && ` · ${step.pomodoros} × 25 min`}
                <div className="why">{step.why}</div>
              </>
            ))}
          />
          {plan.question && <p className="why">To refine this: {plan.question}</p>}
        </>
      )}
    </div>
  );
}
