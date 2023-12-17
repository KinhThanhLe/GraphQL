import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client'
import { getBooks, searchBookByName, getAuthors } from '../../graphql-client/queries.js'
import { addSingleBook, addSingleAuthor } from '../../graphql-client/mutations'

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false); // State để kiểm soát hiển thị form
  const { data } = useQuery(getBooks);
  const { data: authorList } = useQuery(getAuthors);

  let { data: data1 } = useQuery(searchBookByName, {
    variables: { name: searchTerm },
    skip: searchTerm === ''

  });
  const [newBookData, setNewBookData] = useState({
    name: '',
    genre: '',
    publicationYear: '',
    author: '',
  });

  useEffect(() => {
    setBooks(data?.books);
  }, [data]);

  useEffect(() => {
    setAuthors(authorList?.authors);
  }, [authorList]);


  const [searchedBooks, setSearchedBooks] = useState([]);

  useEffect(() => {
    if (searchTerm !== '') {
      setSearchedBooks(data1?.books);
      setBooks(searchedBooks);
    } else {
      // Nếu searchTerm trở về rỗng, reset searchedBooks về mảng rỗng
      setBooks(data?.books);
    }
  }, [data?.books, data1?.books, searchTerm, searchedBooks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBookData({ ...newBookData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý thêm sách vào danh sách books
    const { name, genre } = newBookData;
    const authorId = newBookData.author;
    const newBook = {
      id: books.length + 1, // Đây là id tạm thời, bạn có thể tạo id theo cách khác
      ...newBookData,
    };
    console.log(newBookData);
    addBook({
      variables: { book: { name, genre, authorId } },
      refetchQueries: [{ query: getBooks }]
    })

    setBooks([...books, newBook]);
    setShowForm(false); // Ẩn form sau khi thêm sách thành công
    setNewBookData({
      name: '',
      genre: '',
      publicationYear: '',
      author: '',
    });
  };
  const [addBook, dataMutation] = useMutation(addSingleBook)


  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [newAuthorData, setNewAuthorData] = useState({
    name: '',
    birthYear: '',
  });

  const handleAuthorInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuthorData({ ...newAuthorData, [name]: value });
  };

  const handleAuthorSubmit = (e) => {
    e.preventDefault();
    // Xử lý thêm tác giả vào danh sách tác giả
    const { name } = newAuthorData;
    const age = parseInt(newAuthorData.age, 10)
    const newAuthor = {
      id: books.length + 1, // Đây là id tạm thời, bạn có thể tạo id theo cách khác
      ...newAuthorData,
    };
    // Thêm newAuthor vào danh sách tác giả (nếu có)
    setShowAuthorForm(false);
    setNewAuthorData({
      name: '',
      birthYear: '',
    });
    addAuthor({
      variables: { author: { name, age } },
      refetchQueries: [{ query: getAuthors }]
    })
  };
  const [addAuthor, dataMutationAuthor] = useMutation(addSingleAuthor)


  return (
    <div className="App">
      <h1>Danh sách Sách</h1>
      <input
        type="text"
        placeholder="Tìm kiếm sách"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {currentBooks
          ?.filter(book =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(book => (
            <Link key={book.id} to={`/book/${book.id}`} onClick={() => { localStorage.setItem("bookId", book.id) }}>
              <li >
                {book.name} - {book.author.name}
              </li>
            </Link>
          ))}
      </ul>
      <div>
        {Array.from({ length: Math.ceil(books?.length / booksPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <div>
        <button onClick={() => setShowForm(true)}>Thêm Sách</button>
        <button onClick={() => setShowAuthorForm(true)}>Thêm Tác Giả</button>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h2>Thêm Sách</h2>
              <label htmlFor="name">Tên sách:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newBookData.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="genre">Thể loại:</label>
              <select
                id="genre"
                name="genre"
                value={newBookData.genre}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn thể loại</option>
                <option value="Tiểu thuyết">Tiểu thuyết</option>
                <option value="Truyện ngắn">Truyện ngắn</option>
                <option value="Khoa học viễn tưởng">Khoa học viễn tưởng</option>
                <option value="Kỳ bí">Kỳ bí</option>
                <option value="Phiêu lưu">Phiêu lưu</option>
                <option value="Lịch sử">Lịch sử</option>
                <option value="Tự truyện">Tự truyện</option>
                <option value="Kinh điển">Kinh điển</option>
              </select>

              <label htmlFor="publicationYear">Năm xuất bản:</label>
              <input
                type="text"
                id="publicationYear"
                name="publicationYear"
                value={newBookData.publicationYear}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="author">Tác giả:</label>
              <select
                id="author"
                name="author"
                value={newBookData.author}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn tác giả</option>
                {authors?.map(author => (
                  <option key={author?.id} value={author?.id}>{author?.name}</option>
                ))}
              </select>


              <button type="submit" className="add-btn">
                Thêm
              </button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                Đóng
              </button>
            </form>
          </div>
        </div>
      )}
      {showAuthorForm && (
        <div className="overlay">
          <div className="form-container">
            <form onSubmit={handleAuthorSubmit}>
              <h2>Thêm Tác Giả</h2>
              <label htmlFor="authorName">Tên tác giả:</label>
              <input
                type="text"
                id="authorName"
                name="name"
                value={newAuthorData.name}
                onChange={handleAuthorInputChange}
                required
              />

              <label htmlFor="authorBirthYear">Tuổi:</label>
              <input
                type="text"
                id="authorBirthYear"
                name="age"
                value={newAuthorData.age}
                onChange={handleAuthorInputChange}
                required
              />

              <button type="submit" className="add-btn">
                Thêm
              </button>
              <button type="button" className="cancel-btn" onClick={() => setShowAuthorForm(false)}>
                Đóng
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookListPage;
