# 小说阅读器 (Novel Reader)

一个基于 React + TypeScript + Vite 构建的现代化小说阅读器应用。

## 功能特性

- 📚 多本书籍管理
- 📖 章节列表浏览
- 🎨 自定义阅读体验
  - 调整字体大小
  - 切换字体
  - 更改背景颜色
  - 自定义文字颜色
- ⌨️ 键盘快捷键支持
- 🌓 暗黑/亮色主题适配
- 📱 响应式设计

## 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| → 或 l | 下一章 |
| ← 或 h | 上一章 |
| 空格键 | 向下翻页 |
| Shift + 空格 | 向上翻页 |
| j | 向下滚动 |
| k | 向上滚动 |
| f | 全屏切换 |
| ? | 显示/隐藏快捷键帮助 |
| Esc | 退出全屏/关闭弹窗 |

## 技术栈

- ⚡ Vite - 快速的前端构建工具
- ⚛️ React 18 - 用于构建用户界面
- 🔵 TypeScript - 类型安全的JavaScript超集
- 🎨 Ant Design - 企业级UI设计语言
- 🔄 Redux - 状态管理
- 📱 响应式设计 - 适配不同设备

## 开发指南

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 预览生产版本

```bash
npm run preview
# 或
yarn preview
```

## 项目结构

```
src/
├── components/     # 可复用组件
├── store/         # Redux store 和 reducers
├── types/         # TypeScript 类型定义
└── App.tsx        # 主应用组件
```

## 许可证

MIT
