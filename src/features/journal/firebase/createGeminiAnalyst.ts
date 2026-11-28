import type { FirebaseApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend, Schema } from "firebase/ai";
import { parsePlan } from "../parsePlan";
import { journalInstructions } from "../prompt";
import type { JournalAnalyst } from "../types";

const planSchema = Schema.object({
  properties: {
    summary: Schema.string(),
    feelings: Schema.array({ items: Schema.string() }),
    needsSupport: Schema.boolean(),
    startHere: Schema.string(),
    startReason: Schema.string(),
    question: Schema.string(),
    steps: Schema.array({
      items: Schema.object({
        properties: {
          task: Schema.string(),
          why: Schema.string(),
          pomodoros: Schema.integer(),
        },
      }),
    }),
  },
});

export function createGeminiAnalyst(app: FirebaseApp, modelName: string): JournalAnalyst {
  const model = getGenerativeModel(getAI(app, { backend: new GoogleAIBackend() }), {
    model: modelName,
    systemInstruction: journalInstructions,
    generationConfig: { responseMimeType: "application/json", responseSchema: planSchema },
  });

  return {
    async analyze(text) {
      const result = await model.generateContent(text);
      return parsePlan(result.response.text());
    },
  };
}
