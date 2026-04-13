import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ReadingListContext = createContext(null);

const STORAGE_KEY = 'bookexplorer_reading_list';

export function ReadingListProvider({ children }) {
  const [books, setBooks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {
      console.warn('localStorage unavailable');
    }
  }, [books]);

  const addBook = useCallback((book) => {
    setBooks(prev => {
      if (prev.find(b => b.key === book.key)) return prev;
      return [{ ...book, savedAt: Date.now() }, ...prev];
    });
  }, []);

  const removeBook = useCallback((key) => {
    setBooks(prev => prev.filter(b => b.key !== key));
  }, []);

  const isInList = useCallback((key) => {
    return books.some(b => b.key === key);
  }, [books]);

  return (
    <ReadingListContext.Provider value={{ books, addBook, removeBook, isInList }}>
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  const ctx = useContext(ReadingListContext);
  if (!ctx) throw new Error('useReadingList must be used within ReadingListProvider');
  return ctx;
}
