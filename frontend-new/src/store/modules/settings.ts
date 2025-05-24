import type { AnyAction } from '@reduxjs/toolkit';
import type { Settings } from '../../types';
import { DARK_THEMES, LIGHT_THEMES } from '../../types';

const initialState: Settings = {
  fontSize: 16,
  fontFamily: 'Arial',
  backgroundColor: '#fff',
  textColor: '#000',
  showKeyboardShortcuts: false,
  isFullscreen: false,
};

export default function settingsReducer(state = initialState, action: AnyAction): Settings {
  switch (action.type) {
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    case 'SET_FONT_FAMILY':
      return { ...state, fontFamily: action.payload };
    case 'SET_BACKGROUND_COLOR': {
      const newBgColor = action.payload;
      // Only auto-update text color if it hasn't been manually set
      if (state.textColor === '#000' || state.textColor === '#fff') {
        const isDarkTheme = DARK_THEMES.includes(newBgColor);
        const textColor = isDarkTheme ? '#fff' : '#000';
        return { ...state, backgroundColor: newBgColor, textColor };
      }
      return { ...state, backgroundColor: newBgColor };
    }
    case 'SET_TEXT_COLOR':
      return { ...state, textColor: action.payload };
    case 'TOGGLE_KEYBOARD_SHORTCUTS':
      return { ...state, showKeyboardShortcuts: !state.showKeyboardShortcuts };
    default:
      return state;
  }
}

// Action Creators
export const setFontSize = (size: number) => ({
  type: 'SET_FONT_SIZE',
  payload: size,
});

export const setFontFamily = (family: string) => ({
  type: 'SET_FONT_FAMILY',
  payload: family,
});

export const setBackgroundColor = (color: string) => ({
  type: 'SET_BACKGROUND_COLOR',
  payload: color,
});

export const setTextColor = (color: string) => ({
  type: 'SET_TEXT_COLOR',
  payload: color,
});

export const toggleKeyboardShortcuts = () => ({
  type: 'TOGGLE_KEYBOARD_SHORTCUTS',
});

export const setCurrentPage = (page: number) => ({
  type: 'SET_CURRENT_PAGE',
  payload: page,
});

export const setTotalPages = (total: number) => ({
  type: 'SET_TOTAL_PAGES',
  payload: total,
});
