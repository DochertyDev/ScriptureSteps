
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

export interface UserProgress {
  completedChapters: Record<string, number[]>;
  favoritedChapters: Record<string, number[]>;
  completedDates: Record<string, string>; // ISO date strings
  lastUpdated: string;
}

export interface LegacyUserProgress {
  completedBookIds: string[];
  lastUpdated: string;
}
