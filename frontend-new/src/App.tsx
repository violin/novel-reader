import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { Layout, message } from 'antd';
import { fetchBookList, selectBook, fetchToc, fetchChapter, setCurrentChapterIdx, setCurrentPage } from './store/modules/books';
import { setFontSize, setFontFamily, setBackgroundColor, setTextColor, toggleKeyboardShortcuts } from './store/modules/settings';
import BookList from './components/BookList.tsx';
import Header from './components/Header.tsx';
import ChapterList from './components/ChapterList.tsx';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import type { Book, TocItem } from './types';

const { Content } = Layout;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { books, selectedBook, toc, currentChapter, currentChapterIdx } = useSelector((state: RootState) => state.books);
  const settings = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    dispatch(fetchBookList());
  }, [dispatch]);

  const handleBookSelect = (book: Book) => {
    console.log('Book selected:', book.id, book.title);
    dispatch(selectBook(book));
    dispatch(fetchToc(book.id));
  };

  const handleChapterSelect = (chapter: TocItem) => {
    console.log('Chapter selected:', chapter.id, chapter.title);
    if (selectedBook) {
      dispatch(fetchChapter(selectedBook.id, chapter.id));
    }
  };



  const handleFontSizeChange = (size: number) => {
    dispatch(setFontSize(size));
  };

  const handleFontFamilyChange = (family: string) => {
    dispatch(setFontFamily(family));
  };

  const handleBackgroundColorChange = (color: string) => {
    dispatch(setBackgroundColor(color));
  };

  const handleTextColorChange = (color: string) => {
    dispatch(setTextColor(color));
  };

  const toggleShortcuts = () => {
    dispatch(toggleKeyboardShortcuts());
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedBook || !toc || !toc.length) return;
    
    const { showKeyboardShortcuts } = settings;
    if (showKeyboardShortcuts && e.key !== 'Escape' && e.key !== '?') {
      return; // Ignore other keys when shortcuts help is shown
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'l':
        // Next chapter
        if (currentChapterIdx < toc.length - 1) {
          const nextChapter = toc[currentChapterIdx + 1];
          handleChapterSelect(nextChapter);
          dispatch(setCurrentChapterIdx(currentChapterIdx + 1));
        } else {
          message.info('已经是最后一章了');
        }
        break;
      
      case 'ArrowLeft':
      case 'h':
        // Previous chapter
        if (currentChapterIdx > 0) {
          const prevChapter = toc[currentChapterIdx - 1];
          handleChapterSelect(prevChapter);
          dispatch(setCurrentChapterIdx(currentChapterIdx - 1));
        } else {
          message.info('已经是第一章了');
        }
        break;
      
      case ' ':
        // Space for next page (placeholder for pagination)
        e.preventDefault(); // Prevent scrolling the page
        if (e.shiftKey) {
          // Shift+Space for previous page
          message.info('上一页');
        } else {
          // Space for next page
          message.info('下一页');
        }
        break;
      
      case 'f':
        // Toggle fullscreen
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(console.error);
        } else if (document.exitFullscreen) {
          document.exitFullscreen().catch(console.error);
        }
        break;
      
      case 'j':
        // Scroll down
        window.scrollBy(0, 100);
        break;
      
      case 'k':
        // Scroll up
        window.scrollBy(0, -100);
        break;
      
      case '?':
        // Toggle shortcuts help
        e.preventDefault();
        toggleShortcuts();
        break;
      
      case 'Escape':
        // Exit fullscreen or close modals
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(console.error);
        }
        break;
    }
  };

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBook, toc, currentChapterIdx, settings.showKeyboardShortcuts]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <KeyboardShortcuts />
      <Header 
        settings={settings} 
        onToggleShortcuts={toggleShortcuts}
        onFontSizeChange={handleFontSizeChange}
        onFontFamilyChange={handleFontFamilyChange}
        onBackgroundColorChange={handleBackgroundColorChange}
        onTextColorChange={handleTextColorChange}
      />
      <Content style={{ padding: '24px', display: 'flex', gap: '24px' }}>
        {/* Left sidebar - Book list and TOC */}
        <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <BookList
            books={books}
            selectedBook={selectedBook}
            onBookSelect={handleBookSelect}
          />
          {selectedBook && (
            <ChapterList
              chapters={toc}
              currentChapterIdx={currentChapterIdx}
              onChapterSelect={handleChapterSelect}
            />
          )}
        </div>
        
        {/* Main content area */}
        <div style={{ flex: 1, maxWidth: 'calc(100% - 324px)' }}>
          {currentChapter ? (
            <div style={{
              backgroundColor: settings.backgroundColor,
              padding: '32px',
              borderRadius: '8px',
              minHeight: 'calc(100vh - 180px)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ marginTop: 0, marginBottom: '24px', color: settings.textColor }}>
                {currentChapter.title}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: currentChapter.content || '' }}
                style={{
                  fontSize: `${settings.fontSize}px`,
                  fontFamily: settings.fontFamily,
                  lineHeight: 1.6,
                  color: settings.textColor,
                }}
              />
            </div>
          ) : (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              color: '#999',
              fontSize: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center'
            }}>
              请从左侧选择一本书并选择章节开始阅读
            </div>
          )}
        </div>
      </Content>
      {/* Settings have been moved to the Header dropdown */}
    </Layout>
  );
}

export default App;
