import { useState, type ReactNode } from "react";

export default function Checklist({ items }: { items: ReactNode[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  function toggle(index: number) {
    setChecked((current) => current.map((value, i) => (i === index ? !value : value)));
  }

  return (
    <div className="checklist">
      {items.map((item, index) => (
        // The list never reorders, so the position is a stable key
        <button
          key={index}
          type="button"
          className={checked[index] ? "check-item checked" : "check-item"}
          aria-pressed={checked[index]}
          onClick={() => toggle(index)}
        >
          <div className="check-box">{checked[index] ? "✓" : ""}</div>
          <div>{item}</div>
        </button>
      ))}
    </div>
  );
}
