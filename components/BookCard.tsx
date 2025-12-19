
import React from 'react';
import { BibleBook } from '../types';

interface BookCardProps {
  book: BibleBook;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, isCompleted, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(book.id)}
      className={`
        p-4 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden group
        ${isCompleted 
          ? 'bg-amber-50 border-amber-300 shadow-sm' 
          : 'bg-white border-stone-200 hover:border-amber-200 hover:bg-stone-50 shadow-sm hover:shadow-md'}
      `}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className={`font-semibold text-lg ${isCompleted ? 'text-amber-900' : 'text-stone-800'}`}>
          {book.name}
        </h3>
        {isCompleted && (
          <span className="text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </div>
      <div className="text-xs text-stone-500 flex gap-3 uppercase tracking-tighter font-medium">
        <span>{book.chapters} Chapters</span>
        <span>{book.wordCount.toLocaleString()} Words</span>
      </div>
      
      {/* Visual Weight Indicator */}
      <div 
        className={`absolute bottom-0 left-0 h-1 transition-all duration-500 
          ${isCompleted ? 'bg-amber-500 w-full' : 'bg-stone-200 w-4 group-hover:w-12'}`} 
      />
    </button>
  );
};
