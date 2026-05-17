// Spoken languages with proficiency level.

export type LanguageLevel = "Native" | "Proficient" | "Conversational" | "Basic";

export type SpokenLanguage = {
  name: string;
  level: LanguageLevel;
};

export const spokenLanguages: SpokenLanguage[] = [
  { name: "English", level: "Native" },
  { name: "Burmese", level: "Native" },
  { name: "Chinese", level: "Proficient" },
];
