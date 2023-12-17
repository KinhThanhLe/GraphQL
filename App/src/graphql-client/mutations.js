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
	mutation addSingleAuthorMutation($name: String, $age: Int) {
		createAuthor(name: $name, age: $age) {
			id
			name
		}
	}
`

export { addSingleBook, addSingleAuthor }
