import { configureStore } from '@reduxjs/toolkit';
import { ThunkMiddleware } from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { Book } from '../types';
import booksReducer from './modules/books';
import settingsReducer from './modules/settings';
import { AnyAction } from 'redux';

const API_BASE = 'http://localhost:3000';

// Action creators
export const setFontSize = (size: number) => ({
  type: 'SET_FONT_SIZE' as const,
  payload: size,
});

export const setFontFamily = (family: string) => ({
  type: 'SET_FONT_FAMILY' as const,
  payload: family,
});

export const setBackgroundColor = (color: string) => ({
  type: 'SET_BACKGROUND_COLOR' as const,
  payload: color,
});

export const toggleKeyboardShortcuts = () => ({
  type: 'TOGGLE_KEYBOARD_SHORTCUTS' as const,
});

export const fetchBookList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'FETCH_BOOKS_REQUEST' });
    const res = await axios.get(`${API_BASE}/books`);
    dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_BOOKS_FAILURE' });
  }
};

export const selectBook = (book: Book) => ({
  type: 'SELECT_BOOK' as const,
  payload: book,
});

export const fetchToc = (bookId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'FETCH_TOC_REQUEST' });
    const res = await axios.get(`${API_BASE}/books/${bookId}/toc`);
    dispatch({ type: 'FETCH_TOC_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TOC_FAILURE' });
  }
};

export const fetchChapter = (bookId: string, chapterId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: 'FETCH_CHAPTER_REQUEST' });
    const res = await axios.get(`${API_BASE}/books/${bookId}/chapters/${chapterId}`);
    dispatch({ type: 'FETCH_CHAPTER_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CHAPTER_FAILURE' });
  }
};

export const setCurrentChapterIdx = (idx: number) => ({
  type: 'SET_CURRENT_CHAPTER_IDX' as const,
  payload: idx,
});

export const setCurrentPage = (page: number) => ({
  type: 'SET_CURRENT_PAGE' as const,
  payload: page,
});

export const setTotalPages = (total: number) => ({
  type: 'SET_TOTAL_PAGES' as const,
  payload: total,
});

export const store = configureStore({
  reducer: {
    books: booksReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;