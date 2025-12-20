
import React, { useState } from 'react';
import { BibleBook } from '../types';

interface BookCardProps {
  book: BibleBook;
  completedChapters: number[];
  isFullyCompleted: boolean;
  isPartiallyCompleted: boolean;
  onChapterToggle: (chapterNumber: number) => void;
  onToggleAll: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  completedChapters, 
  isFullyCompleted, 
  isPartiallyCompleted,
  onChapterToggle, 
  onToggleAll 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const wordCountPerChapter = Math.round(book.wordCount / book.chapters);

  const getBackgroundColor = () => {
    if (isFullyCompleted) return 'bg-amber-50';
    if (isPartiallyCompleted) return 'bg-amber-100 bg-opacity-30';
    return 'bg-white';
  };

  const getBorderColor = () => {
    if (isFullyCompleted) return 'border-amber-300';
    if (isPartiallyCompleted) return 'border-amber-200';
    return 'border-stone-200 hover:border-amber-200';
  };

  const getTitleColor = () => {
    if (isFullyCompleted) return 'text-amber-900';
    if (isPartiallyCompleted) return 'text-amber-800';
    return 'text-stone-800';
  };

  return (
    <div
      className={`
        rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden
        ${getBackgroundColor()} ${getBorderColor()} shadow-sm hover:shadow-md
      `}
    >
      {/* Header / Main Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex justify-between items-start mb-1">
          <h3 className={`font-semibold text-lg ${getTitleColor()}`}>
            {book.name}
          </h3>
          <div className="flex items-center gap-2">
            {isFullyCompleted && (
              <span className="text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            )}
            <span className="text-stone-400 transition-transform duration-300" style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
        <div className="text-xs text-stone-500 flex gap-3 uppercase tracking-tighter font-medium mb-2">
          <span>{completedChapters.length}/{book.chapters} Chapters</span>
          <span>{book.wordCount.toLocaleString()} Words</span>
        </div>
      </button>

      {/* Expanded Chapter List */}
      {isExpanded && (
        <div className="border-t border-stone-200 px-4 py-4 bg-opacity-50">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={onToggleAll}
              className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg transition-all
                bg-amber-100 text-amber-700 hover:bg-amber-200"
            >
              {isFullyCompleted ? 'Uncheck All' : 'Check All'}
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg transition-all
                bg-stone-100 text-stone-600 hover:bg-stone-200"
            >
              Done
            </button>
          </div>

          {/* Chapter Grid */}
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: book.chapters }, (_, i) => i + 1).map(chapterNum => (
              <button
                key={chapterNum}
                onClick={() => onChapterToggle(chapterNum)}
                className={`
                  h-8 rounded-lg text-xs font-semibold transition-all
                  ${completedChapters.includes(chapterNum)
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }
                `}
              >
                {chapterNum}
              </button>
            ))}
          </div>

          {/* Chapter Info */}
          <div className="mt-4 text-xs text-stone-500">
            Avg. {wordCountPerChapter.toLocaleString()} words per chapter
          </div>
        </div>
      )}

      {/* Visual Weight Indicator */}
      <div 
        className={`absolute bottom-0 left-0 h-1 transition-all duration-500
          ${isFullyCompleted ? 'bg-amber-500 w-full' : 
            isPartiallyCompleted ? 'bg-amber-300 transition-all' : 
            'bg-stone-200 w-4'}`}
        style={{width: isPartiallyCompleted ? `${(completedChapters.length / book.chapters) * 100}%` : undefined}}
      />
    </div>
  );
};
