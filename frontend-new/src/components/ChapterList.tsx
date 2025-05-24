import { Card, List } from 'antd';
import type { TocItem } from '../types';

interface ChapterListProps {
  chapters: TocItem[];
  currentChapterIdx: number;
  onChapterSelect: (chapter: TocItem) => void;
}

export default function ChapterList({ chapters = [], currentChapterIdx, onChapterSelect }: ChapterListProps) {
  return (
    <Card title="章节列表">
      <List
        dataSource={chapters}
        renderItem={(chapter, index) => (
          <List.Item 
            key={chapter.id}
            onClick={() => onChapterSelect(chapter)}
            style={{
              cursor: 'pointer',
              backgroundColor: currentChapterIdx === index ? '#f0f7ff' : 'transparent',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            {chapter.title}
          </List.Item>
        )}
      />
    </Card>
  );
}
