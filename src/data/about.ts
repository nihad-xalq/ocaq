export const founderImage = "/aliaga-hasanov.webp";

export const teamPhotos: { id: string; src: string }[] = [
  { id: "team-1", src: "/specialists/team-photo-1.webp" },
  { id: "team-2", src: "/specialists/team-photo-2.webp" },
  { id: "team-3", src: "/specialists/team-photo-3.webp" },
];

export const dutyIds = [
  "research",
  "education",
  "advances",
  "events",
] as const;

export type DutyId = (typeof dutyIds)[number];

export const formatIds = ["individual", "family", "group"] as const;

export type FormatId = (typeof formatIds)[number];

export const brochurePdf = "/ocaq-psixoterapiya-merkezi.pdf";
