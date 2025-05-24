import type { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Book, TocItem, Chapter } from '../../types';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../index';

const API_BASE = 'http://127.0.0.1:8000/api';

interface BooksState {
  books: Book[];
  selectedBook: Book | null;
  toc: TocItem[];
  currentChapter: Chapter | null;
  currentChapterIdx: number;
  currentPage: number;
  totalPages: number;
  isFetching: boolean;
}

const initialState: BooksState = {
  books: [],
  selectedBook: null,
  toc: [],
  currentChapter: null,
  currentChapterIdx: 0,
  currentPage: 1,
  totalPages: 1,
  isFetching: false,
};

export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST' as const;
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS' as const;
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE' as const;
export const SELECT_BOOK = 'SELECT_BOOK' as const;
export const FETCH_TOC_REQUEST = 'FETCH_TOC_REQUEST' as const;
export const FETCH_TOC_SUCCESS = 'FETCH_TOC_SUCCESS' as const;
export const FETCH_TOC_FAILURE = 'FETCH_TOC_FAILURE' as const;
export const FETCH_CHAPTER_REQUEST = 'FETCH_CHAPTER_REQUEST' as const;
export const FETCH_CHAPTER_SUCCESS = 'FETCH_CHAPTER_SUCCESS' as const;
export const FETCH_CHAPTER_FAILURE = 'FETCH_CHAPTER_FAILURE' as const;
export const SET_CURRENT_CHAPTER_IDX = 'SET_CURRENT_CHAPTER_IDX' as const;
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE' as const;
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES' as const;

// Action Creators
export const fetchBookList = () => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });
  try {
    console.log('Fetching book list from backend...');
    const response = await axios.get(`${API_BASE}/books`);
    console.log('Book list response:', response.data);
    
    if (response.data && Array.isArray(response.data)) {
      // Transform the response data to match our Book type if needed
      const books = response.data.map((book: any) => ({
        id: book.id || book.filename || 'unknown',
        title: book.name || 'Untitled',
        author: book.author || 'Unknown',
        cover: book.cover || ''
      }));
      
      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
    } else {
      console.warn('Unexpected response format from /books endpoint:', response.data);
      // Fallback to mock data if the response format is unexpected
      const mockBook = {
        id: 'sample2.epub',
        title: 'Sample Book',
        author: 'Unknown',
        cover: ''
      };
      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: [mockBook] });
    }
  } catch (error) {
    console.error('Error fetching book list:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      // If the endpoint doesn't exist (404), use mock data
      if (error.response?.status === 404) {
        console.warn('Books endpoint not found. Using mock data instead.');
        const mockBook = {
          id: 'sample2.epub',
          title: 'Sample Book',
          author: 'Unknown',
          cover: ''
        };
        dispatch({ type: FETCH_BOOKS_SUCCESS, payload: [mockBook] });
        return;
      }
    }
    dispatch({ type: FETCH_BOOKS_FAILURE });
  }
};

export const selectBook = (book: Book) => ({
  type: SELECT_BOOK,
  payload: book,
});

export const fetchToc = (bookId: string) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: FETCH_TOC_REQUEST });
  try {
    console.log('Fetching TOC for book:', bookId);
    const res = await axios.get(`${API_BASE}/book/${bookId}/toc`);
    console.log('TOC API response:', res.data);
    dispatch({ type: FETCH_TOC_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('Error fetching TOC:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
    dispatch({ type: FETCH_TOC_FAILURE });
  }
};

export const fetchChapter = (bookId: string, chapterId: string) => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  dispatch({ type: FETCH_CHAPTER_REQUEST });
  try {
    console.log(`Fetching chapter ${chapterId} for book ${bookId}`);
    const res = await axios.get(`${API_BASE}/book/${bookId}/chapter/${chapterId}`);
    console.log('Chapter API response:', res.data);
    const chapter = res.data;
    
    // Calculate total pages based on content
    const viewportHeight = window.innerHeight;
    const headerHeight = 60;
    const footerHeight = 100;
    const availableHeight = viewportHeight - headerHeight - footerHeight;
    const fontSize = 16;
    const lineHeight = fontSize * 1.6;
    const linesPerPage = Math.floor(availableHeight / lineHeight);
    const wordsPerPage = linesPerPage * 16;
    const words = chapter.content.split(/\s+/).length;
    const totalPages = Math.ceil(words / wordsPerPage);

    dispatch({ type: FETCH_CHAPTER_SUCCESS, payload: chapter });
    dispatch({ type: SET_TOTAL_PAGES, payload: totalPages });
    dispatch({ type: SET_CURRENT_PAGE, payload: 1 });
  } catch (error) {
    console.error('Error fetching chapter:', error);
    dispatch({ type: FETCH_CHAPTER_FAILURE });
  }
};

export const setCurrentChapterIdx = (idx: number) => ({
  type: SET_CURRENT_CHAPTER_IDX,
  payload: idx,
});

export const setCurrentPage = (page: number) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setTotalPages = (total: number) => ({
  type: SET_TOTAL_PAGES,
  payload: total,
});

export default function booksReducer(state = initialState, action: AnyAction): BooksState {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.payload, isFetching: false };
    case FETCH_BOOKS_FAILURE:
      return { ...state, isFetching: false };
    case SELECT_BOOK:
      return { ...state, selectedBook: action.payload };
    case FETCH_TOC_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_TOC_SUCCESS:
      return { ...state, toc: action.payload, isFetching: false };
    case FETCH_TOC_FAILURE:
      return { ...state, isFetching: false };
    case FETCH_CHAPTER_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_CHAPTER_SUCCESS:
      return { 
        ...state, 
        currentChapter: action.payload, 
        isFetching: false,
        currentPage: 1,
        totalPages: 1
      };
    case FETCH_CHAPTER_FAILURE:
      return { ...state, isFetching: false };
    case SET_CURRENT_CHAPTER_IDX:
      return { ...state, currentChapterIdx: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    default:
      return state;
  }
}