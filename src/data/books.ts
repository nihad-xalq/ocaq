import type { Book } from "@/types/content";

/**
 * Place PDF files in public/library/ and set pdfPath, e.g. "/library/book-name.pdf".
 * Leave pdfPath empty to show "Coming soon".
 */
export const books: Book[] = [
  { id: "book-1", dictionaryKey: "placeholder1" },
  { id: "book-2", dictionaryKey: "placeholder2" },
  { id: "book-3", dictionaryKey: "placeholder3" },
];

export const booksPreviewCount = 3;
