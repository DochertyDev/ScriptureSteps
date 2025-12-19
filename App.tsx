
import React, { useState, useEffect, useMemo } from 'react';
import { BIBLE_BOOKS, TOTAL_BIBLE_WORD_COUNT } from './constants';
import { Testament, UserProgress } from './types';
import { ProgressBar } from './components/ProgressBar';
import { BookCard } from './components/BookCard';
import { getDailyReflection } from './services/geminiService';

const LOCAL_STORAGE_KEY = 'scripture_steps_progress';

const App: React.FC = () => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTestament, setFilterTestament] = useState<'ALL' | Testament>('ALL');
  const [reflection, setReflection] = useState<string | null>(null);
  const [isLoadingReflection, setIsLoadingReflection] = useState(false);

  // Load progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: UserProgress = JSON.parse(saved);
        setCompletedIds(parsed.completedBookIds);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    const progress: UserProgress = {
      completedBookIds: completedIds,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  }, [completedIds]);

  const toggleBook = (id: string) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all progress? This cannot be undone.")) {
      setCompletedIds([]);
    }
  };

  const progressPercentage = useMemo(() => {
    const completedWeight = BIBLE_BOOKS
      .filter(book => completedIds.includes(book.id))
      .reduce((sum, book) => sum + book.wordCount, 0);
    return (completedWeight / TOTAL_BIBLE_WORD_COUNT) * 100;
  }, [completedIds]);

  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS.filter(book => {
      const matchesSearch = book.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterTestament === 'ALL' || book.testament === filterTestament;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterTestament]);

  const handleGetReflection = async () => {
    setIsLoadingReflection(true);
    const lastBookId = completedIds[completedIds.length - 1];
    const lastBookName = BIBLE_BOOKS.find(b => b.id === lastBookId)?.name;
    const text = await getDailyReflection(completedIds.length, BIBLE_BOOKS.length, lastBookName);
    setReflection(text);
    setIsLoadingReflection(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header & Sticky Progress */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-stone-900 mb-1">ScriptureSteps</h1>
              <p className="text-stone-500 font-medium tracking-wide">Accurate Bible Reading Tracker</p>
            </div>
            <div className="flex-1 max-w-md">
              <ProgressBar percentage={progressPercentage} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        {/* Controls */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search books (e.g. Genesis, Mark...)"
                className="block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-xl leading-5 bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex bg-stone-100 p-1 rounded-xl">
              {(['ALL', Testament.OLD, Testament.NEW] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTestament(tab)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    filterTestament === tab 
                    ? 'bg-white text-amber-700 shadow-sm' 
                    : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  {tab === 'ALL' ? 'Entire Bible' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
            <div className="flex gap-4 items-center">
              <div className="text-sm font-medium text-stone-500">
                <span className="text-stone-900 font-bold">{completedIds.length}</span> / 66 books completed
              </div>
              <button 
                onClick={handleGetReflection}
                className="text-xs px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold hover:bg-amber-200 transition-colors"
              >
                {isLoadingReflection ? 'Generating...' : 'Get Reflection'}
              </button>
            </div>
            <button 
              onClick={clearAll}
              className="text-sm text-stone-400 hover:text-red-600 transition-colors font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Progress
            </button>
          </div>
        </div>

        {/* Gemini Reflection Box */}
        {reflection && (
          <div className="mb-8 p-6 bg-stone-900 text-stone-100 rounded-2xl shadow-xl relative overflow-hidden group animate-in fade-in slide-in-from-top duration-500">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
               </svg>
             </div>
             <button 
              onClick={() => setReflection(null)}
              className="absolute top-2 right-2 text-stone-500 hover:text-white"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             <h4 className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Spiritual Reflection</h4>
             <p className="italic leading-relaxed serif text-lg">{reflection}</p>
          </div>
        )}

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                isCompleted={completedIds.includes(book.id)} 
                onToggle={toggleBook}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="text-stone-300 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-stone-400">No books found matching your search.</h3>
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-20 border-t border-stone-200 bg-white py-12 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-stone-400 text-sm mb-4">
            Total Weight: {TOTAL_BIBLE_WORD_COUNT.toLocaleString()} words.
          </p>
          <p className="text-stone-400 text-xs max-w-lg mx-auto leading-relaxed">
            Note: Percentages are calculated with precision using approximate word counts for each book. 
            Progress is saved locally to your browser's memory.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
