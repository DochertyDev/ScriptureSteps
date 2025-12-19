
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
  completedBookIds: string[];
  lastUpdated: string;
}
