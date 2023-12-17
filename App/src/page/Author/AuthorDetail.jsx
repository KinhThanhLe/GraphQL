import React from 'react';
import "./AuthorDetail.css"
import { Link } from 'react-router-dom';

const AuthorDetail = () => {
  const author = {
    id: 1,
    name: 'Author Name',
    birthYear: 2002,
    genre: 'Genre',
    publicationYear: 'Publication Year',
  };
  const books = [{
    id: 1,
    title: 'Book Title',
  }, {
    id: 2,
    title: 'Vo Nhat',
  }];
  return (
    <div className="author-detail-container">
      <h2>Thông tin tác giả:</h2>
      <p>Tên tác giả: {author.name}</p>
      <p>Năm sinh: {author.birthYear}</p>

      <h3>Các quyển sách của tác giả:</h3>
      <ul>
        {books.map((book) => (
          <Link key={book.id} to={`/book/${book.id}`} onClick={() => { localStorage.setItem("bookId", book.id) }}>
            <li >{book.title}</li>
          </Link>
        ))}
      </ul>
      <Link to="/book" >
        <button type="button" style={{ marginTop: 50 }}>
          Trở về danh sách
        </button>
      </Link>
    </div>

  );
};

export default AuthorDetail;

