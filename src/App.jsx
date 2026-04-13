import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReadingListProvider } from './context/ReadingListContext';
import Navbar          from './components/Navbar';
import Footer          from './components/Footer';
import HomePage        from './pages/HomePage';
import BookDetailPage  from './pages/BookDetailPage';
import ReadingListPage from './pages/ReadingListPage';
import NotFoundPage    from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ReadingListProvider>
        {/* Skip to main content — WCAG accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />

          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/"              element={<HomePage />} />
              <Route path="/book/:id"      element={<BookDetailPage />} />
              <Route path="/reading-list"  element={<ReadingListPage />} />
              <Route path="*"              element={<NotFoundPage />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </ReadingListProvider>
    </BrowserRouter>
  );
}
