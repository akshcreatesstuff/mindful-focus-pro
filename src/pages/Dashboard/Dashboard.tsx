import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PracticeSection from "../../features/practices/components/PracticeSection";
import { practices } from "../../features/practices/practices";

export default function Dashboard() {
  const { hash, key } = useLocation();

  // Scroll to the practice chosen in the sidebar, even if it is clicked twice
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    }
  }, [hash, key]);

  return (
    <>
      <div className="hero">
        <div className="hero-eyebrow">Daily Practice</div>
        <h1>
          Mindful
          <br />
          <em>Focus</em>
        </h1>
        <p className="hero-sub">
          Five evidence-based practices to strengthen your attention, reduce cognitive residue,
          and build sustainable deep work habits.
        </p>
      </div>

      {practices.map((practice, index) => (
        <Fragment key={practice.id}>
          {index > 0 && <hr className="divider" />}
          <PracticeSection practice={practice} />
        </Fragment>
      ))}
    </>
  );
}
