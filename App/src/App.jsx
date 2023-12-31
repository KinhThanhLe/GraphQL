import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import BookListPage from "./page/Book/BookListPage";
import BookDetail from "./page/Book/BookDetail";
import AuthorDetail from "./page/Author/AuthorDetail";
import "./App.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})
function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/"
            element={<BookListPage />}
          ></Route>
          <Route
            path="/book"
            element={<BookListPage />}
          ></Route>
          <Route
            path="/book/:bookId"
            element={<BookDetail />}
          >
          </Route>

          <Route
            path="/author/:authorId"
            element={<AuthorDetail />}
          />

          {/* <Route path="/errors" element={<ErrorPage />}>
              <Route path="not-found" element={<NotFoundPage />}></Route>
            </Route> */}
        </Routes>
      </ApolloProvider>
    </>
  )
}

export default App
