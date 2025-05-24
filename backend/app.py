from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ebooklib import epub
import ebooklib
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 开发阶段可全放开
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BOOKS_DIR = os.path.join(os.path.dirname(__file__), "books")

@app.get("/api/books")
def list_books():
    files = [f for f in os.listdir(BOOKS_DIR) if f.endswith('.epub')]
    return [{"id": f, "name": f} for f in files]

@app.get("/api/book/{book_id}/toc")
def get_toc(book_id: str):
    path = os.path.join(BOOKS_DIR, book_id)
    if not os.path.exists(path):
        raise HTTPException(404, "Book not found")
    book = epub.read_epub(path)
    toc = []

    def parse_nav(nav_list, parent=None):
        for nav_point in nav_list:
            if isinstance(nav_point, epub.Link):
                toc.append({
                    "title": nav_point.title,
                    "href": nav_point.href,
                    "parent": parent
                })
            elif isinstance(nav_point, tuple) and len(nav_point) == 3:
                # (epub.Link, [children], _)
                link, children, _ = nav_point
                toc.append({
                    "title": link.title,
                    "href": link.href,
                    "parent": parent
                })
                parse_nav(children, parent=link.title)

    parse_nav(book.toc)
    # 给每个章节加唯一 id
    for idx, item in enumerate(toc):
        item["id"] = idx
    return toc

@app.get("/api/book/{book_id}/chapter/{chapter_idx}")
def get_chapter(book_id: str, chapter_idx: int):
    path = os.path.join(BOOKS_DIR, book_id)
    if not os.path.exists(path):
        raise HTTPException(404, "Book not found")
    book = epub.read_epub(path)
    docs = list(book.get_items_of_type(ebooklib.ITEM_DOCUMENT))
    if chapter_idx < 0 or chapter_idx >= len(docs):
        raise HTTPException(404, "Chapter not found")
    item = docs[chapter_idx]
    return {"title": item.get_name(), "content": item.get_content().decode("utf-8")}