import { Card } from 'antd';
import type { Book } from '../types';

interface BookListProps {
  books: Book[];
  selectedBook: Book | null;
  onBookSelect: (book: Book) => void;
}

export default function BookList({ books = [], selectedBook, onBookSelect }: BookListProps) {
  console.log('BookList - books:', books);
  console.log('BookList - selectedBook:', selectedBook);
  return (
    <Card title="书架">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {books.map((book) => (
          <div key={book.id}>
            <button
              onClick={() => onBookSelect(book)}
              style={{
                width: '100%',
                padding: '8px',
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                backgroundColor: selectedBook?.id === book.id ? '#1890ff' : 'white',
                color: selectedBook?.id === book.id ? 'white' : 'rgba(0, 0, 0, 0.85)',
                fontWeight: selectedBook?.id === book.id ? 'bold' : 'normal',
              }}
            >
              {book.title}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
