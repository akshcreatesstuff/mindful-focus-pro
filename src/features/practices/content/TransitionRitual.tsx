import { Card, Highlight } from "../components/Blocks";
import Checklist from "../components/Checklist";

export function TransitionAbout() {
  return (
    <>
      Cognitive residue — the mental "tabs" left open from a previous task — can reduce focus on
      new work by up to <strong>20%</strong>. A short transition ritual closes those tabs
      intentionally.
    </>
  );
}

export function TransitionBody() {
  return (
    <>
      <div className="cards-grid">
        <Card label="The 3-Minute Reset" full>
          <Checklist
            id="transition"
            items={[
              <><strong>Close (30s):</strong> Write one sentence completing the prior task: "I finished ___ and the next step is ___."</>,
              <><strong>Clear (60s):</strong> Stand up, walk to another room or look outside. Let your mind go blank.</>,
              <><strong>Breathe (60s):</strong> Take 5 slow box breaths: in 4 · hold 4 · out 4 · hold 4.</>,
              <><strong>Open (30s):</strong> Read your intention for the next task once before beginning.</>,
            ]}
          />
        </Card>
      </div>
      <Highlight title="When to use it">
        Switching between different types of work (email → deep coding → meetings), after an
        emotionally charged interaction, or any time you feel "full" heading into something
        important.
      </Highlight>
    </>
  );
}
