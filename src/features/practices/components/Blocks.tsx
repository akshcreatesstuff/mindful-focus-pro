import type { ReactNode } from "react";

export function Card({ label, full, children }: { label: string; full?: boolean; children: ReactNode }) {
  return (
    <div className={full ? "card full" : "card"}>
      <div className="card-label">{label}</div>
      {children}
    </div>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <div className="steps">
      {items.map((item, index) => (
        <div className="step" key={index}>
          <div className="step-num">{index + 1}</div>
          <div className="step-text">{item}</div>
        </div>
      ))}
    </div>
  );
}

export function Highlight({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="highlight-box">
      <strong>{title}</strong>
      {children}
    </div>
  );
}
