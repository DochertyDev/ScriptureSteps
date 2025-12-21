
export enum Testament {
  OLD = 'Old Testament',
  NEW = 'New Testament'
}

export interface BibleBook {
  id: string;
  name: string;
  testament: Testament;
  wordCount: number; // Approximate word count for weighting
  chapters: number;
}

export interface CurrentPlace {
  bookId: string;
  chapter: number;
  verse: number;
}

export interface UserProgress {
  completedChapters: Record<string, number[]>;
  favoritedChapters: Record<string, number[]>;
  favoritedBooks: string[]; // Array of book IDs
  completedDates: Record<string, string>; // ISO date strings
  currentPlace: CurrentPlace | null; // Current reading position
  lastUpdated: string;
}

export interface LegacyUserProgress {
  completedBookIds: string[];
  lastUpdated: string;
}
