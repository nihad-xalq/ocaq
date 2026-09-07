export type LocalizedString = Record<"az" | "en" | "ru", string>;

export type ServiceId =
  | "individualGroup"
  | "hypnoPsychodrama"
  | "training";

export type FaqId =
  | "frequency"
  | "duration"
  | "groupSize"
  | "speaking"
  | "selection"
  | "communication"
  | "development";

export type Specialist = {
  id: string;
  /** Optional photo under /public */
  image?: string;
  dictionaryKey: string;
};

export type Book = {
  id: string;
  /** Path under /public, e.g. /library/example.pdf — empty means coming soon */
  pdfPath?: string;
  cover?: string;
  dictionaryKey: string;
};

export type WorkItem = {
  id: string;
  image?: string;
  dictionaryKey: string;
};
