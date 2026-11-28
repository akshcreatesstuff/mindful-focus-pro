import type { ComponentType } from "react";
import { AnchorAbout, AnchorBody } from "./content/AnchorBreathing";
import { AttentionAbout, AttentionBody } from "./content/AttentionScan";
import { PomodoroAbout, PomodoroBody } from "./content/MindfulPomodoro";
import { AwarenessAbout, AwarenessBody } from "./content/OpenAwareness";
import { TransitionAbout, TransitionBody } from "./content/TransitionRitual";

export type Practice = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  About: ComponentType;
  Body: ComponentType;
};

// Adding a practice here creates its section and sidebar link
export const practices: Practice[] = [
  {
    id: "anchor",
    icon: "⚓",
    title: "Anchor Breathing",
    subtitle: "2–5 min · Pre-focus · Resets scattered attention",
    About: AnchorAbout,
    Body: AnchorBody,
  },
  {
    id: "pomodoro",
    icon: "🍅",
    title: "Mindful Pomodoro",
    subtitle: "25 min work · 5 min rest · Structured deep work",
    About: PomodoroAbout,
    Body: PomodoroBody,
  },
  {
    id: "attention",
    icon: "🔍",
    title: "Attention Scan",
    subtitle: "5–10 min · Morning or midday · Maps your mental state",
    About: AttentionAbout,
    Body: AttentionBody,
  },
  {
    id: "transition",
    icon: "🌊",
    title: "Transition Ritual",
    subtitle: "3 min · Between tasks · Clears cognitive residue",
    About: TransitionAbout,
    Body: TransitionBody,
  },
  {
    id: "awareness",
    icon: "🌐",
    title: "Open Awareness",
    subtitle: "10–20 min · Weekly · Builds meta-cognitive clarity",
    About: AwarenessAbout,
    Body: AwarenessBody,
  },
];
