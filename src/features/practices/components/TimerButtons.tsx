import type { TimerStatus } from "../countdown";

type OptionsProps<T> = {
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
};

export function TimerOptions<T extends string | number>(props: OptionsProps<T>) {
  return (
    <div className="timer-options">
      {props.options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={value === props.selected ? "timer-btn active" : "timer-btn"}
          aria-pressed={value === props.selected}
          onClick={() => props.onSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

type ControlsProps = {
  status: TimerStatus;
  onToggle: () => void;
  onReset: () => void;
};

export function TimerControls({ status, onToggle, onReset }: ControlsProps) {
  const label = { idle: "Start", running: "Pause", paused: "Resume", done: "Start" };

  return (
    <div className="timer-controls">
      <button type="button" className="btn primary" onClick={onToggle}>
        {label[status]}
      </button>
      <button type="button" className="btn" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
