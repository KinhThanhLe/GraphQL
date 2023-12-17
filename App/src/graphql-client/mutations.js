import { gql } from '@apollo/client'

const addSingleBook = gql`
	mutation addSingleBookMutation(
		$book: BookInput!
	) {
		createBook(book: $book) {
			id
      name
      genre
      author{
        name
        id
      }
		}
	}
`

const addSingleAuthor = gql`
	mutation addSingleAuthorMutation($author: AuthorInput!) {
		createAuthor(author: $author) {
			id
			name
      age
		}
	}
`

export { addSingleBook, addSingleAuthor }
