export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  source: string;
  lastChapter: string;
  lastUpdateTime: string;
  progress: number;
  chapters: Chapter[];
}

export interface TocItem {
  id: string;
  title: string;
  index: number;
  parent?: TocItem;
}

export interface Chapter {
  title: string;
  content: string;
}

export interface Settings {
  fontSize: number;
  fontFamily: string;
  backgroundColor: string;
  textColor: string;
  showKeyboardShortcuts: boolean;
  isFullscreen: boolean;
}

export const DARK_THEMES = [
  '#1a1a1a',  // 深灰
  '#332d20',  // 咖啡
  '#000000',  // 黑色
];

export const LIGHT_THEMES = [
  '#ffffff',  // 白色
  '#f5f5f5',  // 浅灰
  '#f0f9eb',  // 浅绿
];

export interface Shortcut {
  key: string;
  description: string;
}
