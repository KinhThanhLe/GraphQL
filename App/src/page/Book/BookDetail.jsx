import React from 'react';
import './BookDetail.css';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { getSingleBook } from '../../graphql-client/queries.js'
import { useEffect, useState } from 'react';
const BookDetail = () => {
  // const book = {
  //   id: 1,
  //   name: 'Book name',
  //   author: { name: 'Author Name', id: '1' },
  //   genre: 'Genre',
  //   publicationYear: 'Publication Year',
  // };
  const [book, setBook] = useState(null);
  const bookId = localStorage.getItem("bookId");
  const { data } = useQuery(getSingleBook, {
    variables: {
      id: bookId
    },
    skip: bookId === null
  })
  useEffect(() => {
    setBook(data?.book);
  }, [data]);
  return (
    <div className="book-detail-container">
      <h2>Thông tin sách:</h2>
      <p>Tên sách: {book?.name}</p>
      <p>Thể loại: {book?.genre}</p>
      <p>Năm xuất bản: {book?.publicationYear}</p>
      <p>Tác giả: <Link to={`/author/${book?.author.id}`} onClick={() => { localStorage.setItem("authorId", book?.author.id) }}>{book?.author.name}</Link></p>
      <Link to="/book" >
        <button type="button" style={{ marginTop: 50 }}>
          Trở về danh sách
        </button>
      </Link>
    </div>
  );
};

export default BookDetail;
