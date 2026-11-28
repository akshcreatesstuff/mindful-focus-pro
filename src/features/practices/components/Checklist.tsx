import type { ReactNode } from "react";
import { useProgress } from "../../progress/useProgress";

export default function Checklist({ id, items }: { id: string; items: ReactNode[] }) {
  const { progress, saveChecklist } = useProgress();
  const checked = items.map((_, index) => progress?.checklists[id]?.[index] ?? false);

  function toggle(index: number) {
    saveChecklist(id, checked.map((value, i) => (i === index ? !value : value)));
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
