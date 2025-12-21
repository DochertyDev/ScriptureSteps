
import React from 'react';
import { BIBLE_BOOKS, DEFAULT_MAX_VERSES_PER_CHAPTER } from '../constants';
import { CurrentPlace } from '../types';

interface CurrentPlaceSelectorProps {
  currentPlace: CurrentPlace | null;
  onUpdatePlace: (bookId: string, chapter: number, verse: number) => void;
}

export const CurrentPlaceSelector: React.FC<CurrentPlaceSelectorProps> = ({
  currentPlace,
  onUpdatePlace
}) => {
  const selectedBook = currentPlace ? BIBLE_BOOKS.find(b => b.id === currentPlace.bookId) : null;
  const maxChapters = selectedBook?.chapters || 1;

  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bookId = e.target.value;
    const book = BIBLE_BOOKS.find(b => b.id === bookId);
    if (book) {
      onUpdatePlace(bookId, 1, 1);
    }
  };

  const handleChapterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chapter = Math.max(1, Math.min(maxChapters, parseInt(e.target.value) || 1));
    if (currentPlace) {
      onUpdatePlace(currentPlace.bookId, chapter, Math.min(currentPlace.verse, DEFAULT_MAX_VERSES_PER_CHAPTER));
    }
  };

  const handleVerseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const verse = Math.max(1, Math.min(DEFAULT_MAX_VERSES_PER_CHAPTER, parseInt(e.target.value) || 1));
    if (currentPlace) {
      onUpdatePlace(currentPlace.bookId, currentPlace.chapter, verse);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm mb-8">
      <h3 className="text-lg font-semibold text-stone-900 mb-4">Current Reading Place</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Book Selector */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
            Book
          </label>
          <select
            value={currentPlace?.bookId || ''}
            onChange={handleBookChange}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900"
          >
            <option value="">Select a book...</option>
            {BIBLE_BOOKS.map(book => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Input */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
            Chapter
          </label>
          <input
            type="number"
            min="1"
            max={maxChapters}
            value={currentPlace?.chapter || 1}
            onChange={handleChapterChange}
            disabled={!currentPlace}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 disabled:bg-stone-100 disabled:text-stone-400"
          />
          <p className="text-xs text-stone-500 mt-1">Max: {maxChapters}</p>
        </div>

        {/* Verse Input */}
        <div>
          <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-2">
            Verse
          </label>
          <input
            type="number"
            min="1"
            max={DEFAULT_MAX_VERSES_PER_CHAPTER}
            value={currentPlace?.verse || 1}
            onChange={handleVerseChange}
            disabled={!currentPlace}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 disabled:bg-stone-100 disabled:text-stone-400"
          />
          <p className="text-xs text-stone-500 mt-1">Max: {DEFAULT_MAX_VERSES_PER_CHAPTER}</p>
        </div>
      </div>

      {/* Current Place Display */}
      {currentPlace && selectedBook && (
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">Currently reading:</span> {selectedBook.name} {currentPlace.chapter}:{currentPlace.verse}
          </p>
        </div>
      )}
    </div>
  );
};
