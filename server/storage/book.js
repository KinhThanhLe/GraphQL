const Book = require("../models/book");

const Author = require("../models/author");

// Functions for querying data

class BookStore {
  fetchBooks = async function (args) {
    try {
      let query = {};

      if (args.authorName) {
        const author = await Author.findOne({
          name: { $regex: new RegExp(args.authorName, "i") },
        });

        if (author) {
          query.authorId = author.id;
        } else {
          return [];
        }
      }

      if (args.bookName) {
        query.name = { $regex: new RegExp(args.bookName, "i") };
      }

      /* const limit = args.limit || 10;
      const page = args.page || 1;

      const startIndex = (page - 1) * limit; */

      return await Book.find(query);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  fetchBookById = async function (bookId) {
    try {
      return await Book.findOne({ id: bookId });
    } catch (error) {
      console.error("Error fetching book:", error);
      throw error;
    }
  };

  searchBooks = async function (name) {
    try {
      return await Book.find({
        name: { $regex: new RegExp(name, "i") },
      });
    } catch (error) {
      console.error("Error searching books:", error);
      throw error;
    }
  };

  fetchBooksByAuthorId = async function (authorId) {
    try {
      return await Book.find({ authorId: authorId });
    } catch (error) {
      console.error("Error fetching books of author:", error);
      throw error;
    }
  };

  createNewBook = async function (args) {
    try {
      const authorCount = await Book.countDocuments();

      const newBook = new Book({
        id: authorCount + 1,
        name: args.book.name,
        genre: args.book.genre,
        authorId: args.book.authorId,
      });

      return await newBook.save();
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  };
}

module.exports = new BookStore();
