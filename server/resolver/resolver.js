const { books, authors } = require('../data/static')

const resolvers = {
  // QUERY
  Query: {
    books: () => books,
    book: (parent, args) => books.find(book => book.id.toString() === args.id),
    authors: () => authors,
    author: (parent, args) => authors.find(author => author.id.toString() === args.id),
    bookSearch: (parent, args) => books.filter(book => book.name.toLowerCase().includes(args.name.toLowerCase()))

  },
  Book: {
    author: (parent, args) => {
      return authors.find(author => author.id === parent.authorId)
    }
  },
  Author: {
    books: (parent, args) => {
      return books.filter(book => book.authorId === parent.id)
    }
  },
  Mutation: {
    createAuthor: (parent, args) => args,
    createBook: (parent, args) => args

  }

}

module.exports = resolvers
