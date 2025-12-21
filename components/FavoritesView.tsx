
import React, { useMemo } from 'react';
import { BIBLE_BOOKS } from '../constants';

interface FavoritesViewProps {
  favoritedBooks: string[];
  favoritedChapters: Record<string, number[]>;
  onBookClick: (bookId: string) => void;
  onChapterClick: (bookId: string, chapter: number) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoritedBooks,
  favoritedChapters,
  onBookClick,
  onChapterClick
}) => {
  const hasAnyFavorites = useMemo(() => {
    return favoritedBooks.length > 0 || Object.values(favoritedChapters).some(chapters => chapters.length > 0);
  }, [favoritedBooks, favoritedChapters]);

  const favoritedBooksList = useMemo(() => {
    return favoritedBooks.map(id => BIBLE_BOOKS.find(b => b.id === id)).filter(Boolean);
  }, [favoritedBooks]);

  const favoritedChaptersList = useMemo(() => {
    return Object.entries(favoritedChapters)
      .filter(([, chapters]) => chapters.length > 0)
      .map(([bookId, chapters]) => ({
        book: BIBLE_BOOKS.find(b => b.id === bookId),
        chapters: chapters.sort((a, b) => a - b),
        bookId
      }))
      .filter(item => item.book);
  }, [favoritedChapters]);

  if (!hasAnyFavorites) {
    return (
      <div className="py-20 text-center">
        <div className="text-stone-300 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11.49 3.17c.75-1.48 2.82-1.48 3.57 0l2.005 3.955h4.6c1.657 0 2.357 2.009.856 2.969L17.799 13.75l2.007 3.955c.75 1.48-.258 2.681-1.643 2.681h-4.6l-2.005 3.954c-.75 1.48-2.803 1.48-3.556 0L9.591 20.35H5.038c-1.657 0-2.357-2.009-.856-2.969l3.654-2.662-2.007-3.954c-.75-1.48.258-2.681 1.643-2.681h4.6l2.007-3.954z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-stone-400 mb-2">No Favorites Yet</h3>
        <p className="text-stone-500">Mark books or chapters as favorites to see them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Favorited Books Section */}
      {favoritedBooksList.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Favorite Books ({favoritedBooksList.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoritedBooksList.map(book => (
              <button
                key={book?.id}
                onClick={() => onBookClick(book?.id || '')}
                className="p-4 text-left bg-white border-2 border-yellow-300 rounded-xl hover:shadow-md transition-all hover:border-yellow-400"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-stone-900 text-lg">{book?.name}</h4>
                    <p className="text-xs text-stone-500 mt-1">{book?.chapters} chapters</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Favorited Chapters Section */}
      {favoritedChaptersList.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Favorite Chapters
          </h3>
          <div className="space-y-4">
            {favoritedChaptersList.map(({ book, chapters, bookId }) => (
              <div key={bookId} className="bg-white border-2 border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-stone-900 mb-3">{book?.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {chapters.map(chapter => (
                    <button
                      key={chapter}
                      onClick={() => onChapterClick(bookId, chapter)}
                      className="px-3 py-2 text-sm font-semibold bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                    >
                      Chapter {chapter}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
