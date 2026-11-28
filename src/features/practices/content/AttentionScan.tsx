import { Card, Highlight } from "../components/Blocks";
import Checklist from "../components/Checklist";

export function AttentionAbout() {
  return (
    <>
      Before jumping into work, spend a few minutes honestly assessing where your attention
      currently is. Like a <strong>diagnostic before starting an engine</strong> — you'll catch
      hidden drains on your focus.
    </>
  );
}

export function AttentionBody() {
  return (
    <>
      <div className="cards-grid">
        <Card label="Daily Attention Checklist" full>
          <Checklist
            id="attention"
            items={[
              <><strong>Body:</strong> Notice any physical tension holding attention hostage (jaw, shoulders, gut)</>,
              <><strong>Open loops:</strong> Are there 1–3 nagging tasks you haven't decided on? Write them down: do, defer, or drop.</>,
              <><strong>Energy level:</strong> Rate 1–5. If below 3, schedule rest instead of forcing focus.</>,
              <><strong>Emotional weather:</strong> Name the feeling without judgment — anxious, excited, flat. Naming reduces reactivity.</>,
              <><strong>Top 1 priority:</strong> Identify the single most important task. Everything else is secondary today.</>,
            ]}
          />
        </Card>
      </div>
      <Highlight title="When attention wanders during work">
        Use the acronym <b>STOP</b>: Stop what you're doing · Take a breath · Observe what pulled
        you away · Proceed with intention. This takes 10 seconds and resets the loop.
      </Highlight>
    </>
  );
}
