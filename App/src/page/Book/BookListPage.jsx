import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false); // State để kiểm soát hiển thị form

  const [newBookData, setNewBookData] = useState({
    title: '',
    genre: '',
    publicationYear: '',
    author: '',
  });

  useEffect(() => {
    const sampleBooks = [
      { id: 1, title: 'Sách 1', author: 'Tác giả A' },
      { id: 2, title: 'Sách 2', author: 'Tác giả B' },
      { id: 3, title: 'Sách 3', author: 'Tác giả C' },
      { id: 4, title: 'Sách 4', author: 'Tác giả D' },
      { id: 5, title: 'Sách 5', author: 'Tác giả E' },
      { id: 16, title: 'Sách 16', author: 'Tác giả F' },
      { id: 17, title: 'Sách 17', author: 'Tác giả G' },
      { id: 18, title: 'Sách 18', author: 'Tác giả H' },
      { id: 19, title: 'Sách 19', author: 'Tác giả I' },
      { id: 20, title: 'Sách 20', author: 'Tác giả J' },
      { id: 21, title: 'Sách 21', author: 'Tác giả K' },
      { id: 22, title: 'Sách 22', author: 'Tác giả L' },
      { id: 23, title: 'Sách 23', author: 'Tác giả M' },
      { id: 24, title: 'Sách 24', author: 'Tác giả N' },
      { id: 25, title: 'Sách 25', author: 'Tác giả O' }
      // Thêm dữ liệu sách ở đây
    ];
    setBooks(sampleBooks);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBookData({ ...newBookData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý thêm sách vào danh sách books
    const newBook = {
      id: books.length + 1, // Đây là id tạm thời, bạn có thể tạo id theo cách khác
      ...newBookData,
    };
    setBooks([...books, newBook]);
    setShowForm(false); // Ẩn form sau khi thêm sách thành công
    setNewBookData({
      title: '',
      genre: '',
      publicationYear: '',
      author: '',
    });
  };


  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

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
  };


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
          .filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(book => (
            <Link key={book.id} to={`/book/${book.id}`} onClick={() => { localStorage.setItem("bookId", book.id) }}>
              <li >
                {book.title} - {book.author}
              </li>
            </Link>
          ))}
      </ul>
      <div>
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
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
              <label htmlFor="title">Tên sách:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBookData.title}
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
              <input
                type="text"
                id="author"
                name="author"
                value={newBookData.author}
                onChange={handleInputChange}
                required
              />

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

              <label htmlFor="authorBirthYear">Năm sinh:</label>
              <input
                type="text"
                id="authorBirthYear"
                name="birthYear"
                value={newAuthorData.birthYear}
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
