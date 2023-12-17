const BookStore = require("../storage/book");
const AuthorStore = require("../storage/author");

const resolvers = {
  Query: {
    books: async (parent, args) => BookStore.fetchBooks(args),
    book: async (parent, args) => BookStore.fetchBookById(args.id),
    authors: async () => AuthorStore.fetchAuthors(),
    author: async (parent, args) => AuthorStore.fetchAuthorById(args.id),
    bookSearch: async (parent, args) => BookStore.searchBooks(args.name),
  },
  Book: {
    author: async (parent) => AuthorStore.fetchAuthorById(parent.authorId),
  },
  Author: {
    books: async (parent) => BookStore.fetchBooksByAuthorId(parent.id),
  },
  Mutation: {
    createAuthor: async (parent, args) => AuthorStore.createNewAuthor(args),
    createBook: async (parent, args) => BookStore.createNewBook(args),
  },
};

module.exports = resolvers;
