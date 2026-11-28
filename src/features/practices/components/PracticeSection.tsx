import type { Practice } from "../practices";

export default function PracticeSection({ practice }: { practice: Practice }) {
  const { id, icon, title, subtitle, About, Body } = practice;

  return (
    <section className="practice" id={id}>
      <div className="practice-header">
        <div className="practice-icon" aria-hidden="true">{icon}</div>
        <div className="practice-meta">
          <h2 className="practice-title">{title}</h2>
          <div className="practice-subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="practice-about">
        <About />
      </div>
      <Body />
    </section>
  );
}
