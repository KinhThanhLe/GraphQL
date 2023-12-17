import React from 'react';
import "./AuthorDetail.css"
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { getSingleAuthor } from '../../graphql-client/queries.js'
import { useEffect, useState } from 'react';
const AuthorDetail = () => {

  const [author, setAuthor] = useState(null);

  const authorId = localStorage.getItem("authorId");

  const { data } = useQuery(getSingleAuthor, {
    variables: {
      id: authorId
    },
    skip: authorId === null
  })
  useEffect(() => {
    setAuthor(data?.author);
  }, [data]);
  return (
    <div className="author-detail-container">
      <h2>Thông tin tác giả:</h2>
      <p>Tên tác giả: {author?.name}</p>
      <p>Tuổi: {author?.age}</p>

      <h3>Các quyển sách của tác giả:</h3>
      <ul>
        {author?.books.map((book) => (
          <Link key={book.id} to={`/book/${book.id}`} onClick={() => { localStorage.setItem("bookId", book.id) }}>
            <li >{book.name}</li>
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

