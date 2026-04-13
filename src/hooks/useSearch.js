import { useState, useCallback, useRef } from 'react';

const BASE = 'https://openlibrary.org';

export function useSearch() {
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [query, setQuery]       = useState('');
  const [searchType, setSearchType] = useState('title');
  const [total, setTotal]       = useState(0);
  const abortRef = useRef(null);

  const search = useCallback(async (q, type = 'title', page = 1) => {
    if (!q.trim()) return;

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setQuery(q);
    setSearchType(type);

    const param  = type === 'author' ? 'author' : 'title';
    const offset = (page - 1) * 12;
    const url    = `${BASE}/search.json?${param}=${encodeURIComponent(q)}&limit=12&offset=${offset}&fields=key,title,author_name,cover_i,first_publish_year,isbn,subject`;

    try {
      const res  = await fetch(url, { signal: abortRef.current.signal });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setResults(data.docs || []);
      setTotal(data.numFound || 0);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Could not fetch results. Please check your connection and try again.');
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResults([]);
    setQuery('');
    setTotal(0);
    setError(null);
  }, []);

  return { results, loading, error, query, searchType, total, search, clear };
}

export async function fetchBookDetail(workId) {
  const res  = await fetch(`${BASE}${workId}.json`);
  if (!res.ok) throw new Error('Book not found');
  return res.json();
}

export async function fetchAuthor(authorKey) {
  const res  = await fetch(`${BASE}${authorKey}.json`);
  if (!res.ok) return null;
  return res.json();
}

export function getCoverUrl(coverId, size = 'M') {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
