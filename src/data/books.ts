import type { Book } from "@/types/content";

/**
 * Place PDF files in public/library/ and set pdfPath, e.g. "/library/book-name.pdf".
 * Leave pdfPath empty to show "Coming soon".
 */
export const books: Book[] = [
  {
    id: "nossrat-pezeshkian",
    dictionaryKey: "nossratPezeshkian",
    pdfPath: "/library/nossrat-pezeshkian.pdf",
    coverTone: "slate",
  },
  {
    id: "antoni-kempinski",
    dictionaryKey: "antoniKempinski",
    pdfPath: "/library/antoni-kempinski.pdf",
    coverTone: "teal",
  },
];

export const booksPreviewCount = 2;
