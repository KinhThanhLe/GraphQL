const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  input AuthorInput {
    name: String
    age: Int
  }

  input BookInput {
    name: String
    genre: String
    authorId: ID!
  }

  # ROOT TYPE
  type Query {
    books(limit: Int, page: Int, authorName: String, bookName: String): [Book]
    bookSearch(name: String): [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(author: AuthorInput!): Author
    createBook(book: BookInput!): Book
  }
`;

module.exports = typeDefs;
