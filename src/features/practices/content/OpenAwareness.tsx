import { Card, Steps } from "../components/Blocks";

export function AwarenessAbout() {
  return (
    <>
      Rather than focusing on one object, you widen attention to include everything — sounds,
      sensations, thoughts — without latching onto any of it. This builds the kind of{" "}
      <strong>flexible, wide-angle focus</strong> that helps you prioritize under pressure.
    </>
  );
}

export function AwarenessBody() {
  return (
    <div className="cards-grid">
      <Card label="The Practice">
        <Steps
          items={[
            "Sit comfortably. Begin with 2 minutes of anchor breathing to settle in.",
            "Gradually expand awareness outward: body → sounds → feeling of the room → thoughts as passing objects.",
            "Imagine your mind as a clear sky. Thoughts and feelings are weather passing through.",
            <>When pulled into a thought, notice the pull, then reopen. <em>That noticing is the practice.</em></>,
            "End by narrowing attention back to breath for 1–2 minutes before returning to work.",
          ]}
        />
      </Card>
      <Card label="Why It Builds Focus">
        <div className="why">
          <p>
            Open awareness trains the{" "}
            <strong>monitoring system in your prefrontal cortex</strong> — the part that notices
            you've drifted and redirects attention.
          </p>
          <p>Stronger monitoring = faster recovery from distractions during work.</p>
          <p>Think of focused attention as a spotlight, and open awareness as building the room itself.</p>
        </div>
      </Card>
    </div>
  );
}
