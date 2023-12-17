import React from 'react';
import './BookDetail.css';
import { Link } from "react-router-dom";

const BookDetail = () => {
  const book = {
    id: 1,
    title: 'Book Title',
    author: { name: 'Author Name', id: '1' },
    genre: 'Genre',
    publicationYear: 'Publication Year',
  };
  return (
    <div className="book-detail-container">
      <h2>Thông tin sách:</h2>
      <p>Tên sách: {book.title}</p>
      <p>Thể loại: {book.genre}</p>
      <p>Năm xuất bản: {book.publicationYear}</p>
      <p>Tác giả: <Link to={`/author/${book.author.id}`}>{book.author.name}</Link></p>
      <Link to="/book" >
        <button type="button" style={{ marginTop: 50 }}>
          Trở về danh sách
        </button>
      </Link>
    </div>
  );
};

export default BookDetail;
