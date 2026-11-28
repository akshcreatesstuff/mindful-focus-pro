import type { JournalPlan } from "./types";

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

// Never trust the shape of an AI reply: check it before showing or saving it
export function parsePlan(reply: string): JournalPlan {
  const data = JSON.parse(reply) ?? {};
  const summary = text(data.summary);
  if (!summary) throw new Error("The reply has no summary");

  const needsSupport = data.needsSupport === true;
  const steps = needsSupport || !Array.isArray(data.steps) ? [] : data.steps;

  return {
    summary,
    needsSupport,
    feelings: Array.isArray(data.feelings) ? data.feelings.map(text).filter(Boolean) : [],
    startHere: needsSupport ? "" : text(data.startHere),
    startReason: needsSupport ? "" : text(data.startReason),
    question: needsSupport ? "" : text(data.question),
    steps: steps
      .map((step: Record<string, unknown>) => ({
        task: text(step?.task),
        why: text(step?.why),
        pomodoros: Math.min(8, Math.max(0, Math.round(Number(step?.pomodoros) || 0))),
      }))
      .filter((step: { task: string }) => step.task),
  };
}
